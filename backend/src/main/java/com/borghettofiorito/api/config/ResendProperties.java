package com.borghettofiorito.api.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "app.resend")
public class ResendProperties {

    /** Resend API key (re_xxxxxxx). */
    private String apiKey;

    /** Sender email (e.g. "Bugnara Borgo Fiorito <onboarding@resend.dev>"). */
    private String from;

    /** Recipient inbox where contact form notifications are delivered. */
    private String adminInbox;

    public String getApiKey() { return apiKey; }
    public void setApiKey(String apiKey) { this.apiKey = apiKey; }

    public String getFrom() { return from; }
    public void setFrom(String from) { this.from = from; }

    public String getAdminInbox() { return adminInbox; }
    public void setAdminInbox(String adminInbox) { this.adminInbox = adminInbox; }

    public boolean isConfigured() {
        return apiKey != null && !apiKey.isBlank()
            && from != null && !from.isBlank()
            && adminInbox != null && !adminInbox.isBlank();
    }
}
