package com.borghettofiorito.api.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Cloudinary credentials, read from the "app.cloudinary.*" properties
 * which in turn are populated from environment variables in production
 * (see application.yml and .env.example).
 */
@Configuration
@ConfigurationProperties(prefix = "app.cloudinary")
public class CloudinaryProperties {

    private String cloudName;
    private String apiKey;
    private String apiSecret;
    private String uploadPreset;

    public String getCloudName() { return cloudName; }
    public void setCloudName(String cloudName) { this.cloudName = cloudName; }

    public String getApiKey() { return apiKey; }
    public void setApiKey(String apiKey) { this.apiKey = apiKey; }

    public String getApiSecret() { return apiSecret; }
    public void setApiSecret(String apiSecret) { this.apiSecret = apiSecret; }

    public String getUploadPreset() { return uploadPreset; }
    public void setUploadPreset(String uploadPreset) { this.uploadPreset = uploadPreset; }

    public boolean isConfigured() {
        return cloudName != null && !cloudName.isBlank()
            && apiKey != null && !apiKey.isBlank()
            && apiSecret != null && !apiSecret.isBlank();
    }
}
