package com.borghettofiorito.api.service;

import com.borghettofiorito.api.config.ResendProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

/**
 * Email service powered by Resend (https://resend.com).
 *
 * Why Resend (recap):
 *  - Modern, simple HTTP API; one POST to /emails
 *  - Generous free tier (3000 mails/month, 100/day)
 *  - Good deliverability and dashboard
 *
 * Sending is fire-and-forget on a background thread via @Async, so the
 * user's contact form submission isn't delayed by SMTP latency.
 *
 * If Resend is not configured, the service logs a warning and silently
 * skips the send — useful in dev when no API key is available yet.
 */
@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    private static final String RESEND_ENDPOINT = "https://api.resend.com/emails";

    private final ResendProperties props;
    private final RestClient http;

    public EmailService(ResendProperties props) {
        this.props = props;
        this.http = RestClient.builder().build();
    }

    /**
     * Asynchronously send a plain-text email.
     * Returns immediately; failure is logged but does not propagate.
     */
    @Async
    public void send(String to, String subject, String htmlBody, String textBody) {
        if (!props.isConfigured()) {
            log.warn("Resend not configured — would have sent email to {} with subject '{}'",
                    to, subject);
            return;
        }

        Map<String, Object> payload = Map.of(
                "from", props.getFrom(),
                "to", new String[]{to},
                "subject", subject,
                "html", htmlBody,
                "text", textBody
        );

        try {
            String response = http.post()
                    .uri(RESEND_ENDPOINT)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + props.getApiKey())
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(payload)
                    .retrieve()
                    .body(String.class);
            log.info("Resend send OK to={} subject='{}' response={}", to, subject, response);
        } catch (Exception e) {
            // Don't crash the caller; just log. Admins will see the message in DB anyway.
            log.error("Resend send FAILED to={} subject='{}': {}", to, subject, e.getMessage());
        }
    }

    /**
     * Send the standard "new contact message" notification to the admins.
     */
    @Async
    public void notifyAdminOfNewContact(String fromName, String fromEmail,
                                        String subject, String message, Long contactId) {
        if (!props.isConfigured()) {
            log.warn("Resend not configured — skipping admin notification for contact id={}",
                    contactId);
            return;
        }

        String emailSubject = "Nuovo messaggio da " + fromName + " — " + subjectLabel(subject);
        String html = buildHtmlBody(fromName, fromEmail, subject, message, contactId);
        String text = buildTextBody(fromName, fromEmail, subject, message, contactId);

        send(props.getAdminInbox(), emailSubject, html, text);
    }

    private static String subjectLabel(String code) {
        return switch (code) {
            case "JOIN_INITIATIVE" -> "Vuole aderire";
            case "SUGGEST_SPOT"    -> "Suggerisce un luogo";
            case "GENERIC_INFO"    -> "Info generiche";
            default                -> "Altro";
        };
    }

    private static String buildHtmlBody(String name, String email, String subject,
                                        String message, Long contactId) {
        return """
            <!doctype html>
            <html><body style="font-family: Georgia, serif; max-width: 600px; margin: 24px auto; color: #2b2620;">
              <h2 style="font-family: Georgia, serif; color: #a55a4a;">Nuovo messaggio · Bugnara Borgo Fiorito</h2>
              <p style="color: #7a6e62; font-size: 13px; text-transform: uppercase; letter-spacing: 0.15em;">
                Messaggio #%d · %s
              </p>
              <table style="margin: 16px 0; font-size: 14px;">
                <tr><td style="padding: 4px 12px 4px 0; color: #7a6e62;">Da:</td><td><strong>%s</strong></td></tr>
                <tr><td style="padding: 4px 12px 4px 0; color: #7a6e62;">Email:</td><td><a href="mailto:%s">%s</a></td></tr>
              </table>
              <hr style="border: none; border-top: 1px solid #d9cdb8; margin: 20px 0;"/>
              <div style="white-space: pre-wrap; font-size: 16px; line-height: 1.6;">%s</div>
            </body></html>
            """.formatted(contactId, subjectLabel(subject),
                          escape(name), escape(email), escape(email), escape(message));
    }

    private static String buildTextBody(String name, String email, String subject,
                                        String message, Long contactId) {
        return """
            Nuovo messaggio · Bugnara Borgo Fiorito
            Messaggio #%d · %s
            
            Da: %s
            Email: %s
            
            ---
            %s
            """.formatted(contactId, subjectLabel(subject), name, email, message);
    }

    private static String escape(String s) {
        if (s == null) return "";
        return s.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;");
    }
}
