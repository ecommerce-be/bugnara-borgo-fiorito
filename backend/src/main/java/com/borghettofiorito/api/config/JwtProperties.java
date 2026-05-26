package com.borghettofiorito.api.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * JWT configuration.
 *
 * Properties loaded from app.jwt.* (see application.yml and .env.example).
 *
 *  - secret: HMAC-SHA256 signing key. MUST be at least 32 bytes long
 *            and kept private. Stored as a string in .env.
 *  - expirationMs: how long an access token is valid (default 24h).
 *  - issuer: the "iss" claim, helps if you have multiple services.
 */
@Configuration
@ConfigurationProperties(prefix = "app.jwt")
public class JwtProperties {

    private String secret;
    private long expirationMs = 86_400_000L; // 24h default
    private String issuer = "bugnara-borgo-fiorito";

    public String getSecret() { return secret; }
    public void setSecret(String secret) { this.secret = secret; }

    public long getExpirationMs() { return expirationMs; }
    public void setExpirationMs(long expirationMs) { this.expirationMs = expirationMs; }

    public String getIssuer() { return issuer; }
    public void setIssuer(String issuer) { this.issuer = issuer; }

    public boolean isConfigured() {
        return secret != null && secret.length() >= 32;
    }
}
