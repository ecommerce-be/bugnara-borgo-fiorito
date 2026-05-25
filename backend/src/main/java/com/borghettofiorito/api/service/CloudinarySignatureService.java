package com.borghettofiorito.api.service;

import com.borghettofiorito.api.config.CloudinaryProperties;
import com.borghettofiorito.api.dto.response.CloudinarySignatureResponse;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.TreeMap;

/**
 * Generates short-lived signatures for direct browser-to-Cloudinary uploads.
 *
 * How Cloudinary signed uploads work:
 *  - The client must send: file, api_key, timestamp, upload_preset, folder,
 *    and a signature computed by the server.
 *  - The signature is SHA1 of all the parameters (alphabetically sorted,
 *    in key=value&key=value form, with NO api_key/file/signature) concatenated
 *    with the api_secret.
 *  - Cloudinary recomputes the signature on its end with the same api_secret
 *    and refuses the upload if they don't match.
 *
 * This keeps the api_secret on the server only — the browser never sees it.
 */
@Service
public class CloudinarySignatureService {

    private final CloudinaryProperties props;

    public CloudinarySignatureService(CloudinaryProperties props) {
        this.props = props;
    }

    /**
     * Generate a signature for an upload into a specific folder under our
     * configured preset.
     *
     * @param subfolder e.g. "spots/12" — appended to "bugnara-borgo-fiorito/"
     */
    public CloudinarySignatureResponse buildSignature(String subfolder) {
        if (!props.isConfigured()) {
            throw new IllegalStateException(
                "Cloudinary is not configured. Set app.cloudinary.* properties.");
        }

        long timestamp = Instant.now().getEpochSecond();
        String folder = "bugnara-borgo-fiorito/" + (subfolder == null ? "misc" : subfolder);

        // Cloudinary requires the parameters to sign to be sorted alphabetically
        // and joined with "&" in key=value form. Use a TreeMap to keep order.
        TreeMap<String, String> toSign = new TreeMap<>();
        toSign.put("folder", folder);
        toSign.put("timestamp", String.valueOf(timestamp));
        toSign.put("upload_preset", props.getUploadPreset());

        StringBuilder canonical = new StringBuilder();
        for (var entry : toSign.entrySet()) {
            if (canonical.length() > 0) canonical.append('&');
            canonical.append(entry.getKey()).append('=').append(entry.getValue());
        }
        // Append api_secret directly (NOT as a key=value)
        canonical.append(props.getApiSecret());

        String signature = sha1Hex(canonical.toString());

        return new CloudinarySignatureResponse(
                props.getCloudName(),
                props.getApiKey(),
                props.getUploadPreset(),
                folder,
                timestamp,
                signature
        );
    }

    private static String sha1Hex(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-1");
            byte[] bytes = md.digest(input.getBytes(StandardCharsets.UTF_8));
            StringBuilder hex = new StringBuilder(bytes.length * 2);
            for (byte b : bytes) {
                hex.append(String.format("%02x", b));
            }
            return hex.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-1 not available", e);
        }
    }
}
