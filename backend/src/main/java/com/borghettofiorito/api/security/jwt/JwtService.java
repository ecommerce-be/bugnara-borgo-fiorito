package com.borghettofiorito.api.security.jwt;

import com.borghettofiorito.api.config.JwtProperties;
import com.borghettofiorito.api.domain.entity.AdminUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

/**
 * Builds and verifies JWT access tokens.
 *
 * Token shape (after Base64-decoding):
 *   header:  { "alg": "HS256", "typ": "JWT" }
 *   payload: {
 *     "iss": "bugnara-borgo-fiorito",
 *     "sub": "<username>",          // subject = who the token is for
 *     "uid": 42,                    // numeric admin user id
 *     "role": "ADMIN",              // ADMIN | EDITOR
 *     "iat": 1700000000,            // issued at (epoch seconds)
 *     "exp": 1700086400             // expires at
 *   }
 *   signature: HMAC-SHA256(header + "." + payload, secret)
 *
 * Why HMAC-SHA256 (HS256)?
 *   - Symmetric key, simplest deployment (single server)
 *   - Resistant to common JWT pitfalls when used through JJWT
 *   - If we later split into multiple services that need to verify
 *     tokens, we can switch to RS256 (asymmetric) without API changes.
 */
@Service
public class JwtService {

    private static final Logger log = LoggerFactory.getLogger(JwtService.class);

    private final JwtProperties props;
    private final SecretKey signingKey;

    public JwtService(JwtProperties props) {
        this.props = props;
        if (!props.isConfigured()) {
            throw new IllegalStateException(
                "JWT not configured: app.jwt.secret must be at least 32 chars. " +
                "Set JWT_SECRET in your .env file.");
        }
        this.signingKey = Keys.hmacShaKeyFor(
                props.getSecret().getBytes(StandardCharsets.UTF_8));
    }

    /**
     * Mint a fresh access token for the given user.
     */
    public String generateAccessToken(AdminUser user) {
        Instant now = Instant.now();
        Instant exp = now.plusMillis(props.getExpirationMs());

        return Jwts.builder()
                .issuer(props.getIssuer())
                .subject(user.getUsername())
                .claim("uid", user.getId())
                .claim("role", user.getRole().name())
                .claim("name", user.getDisplayName())
                .issuedAt(Date.from(now))
                .expiration(Date.from(exp))
                .signWith(signingKey, Jwts.SIG.HS256)
                .compact();
    }

    /**
     * Parse and validate a token. Returns the claims if valid.
     * Throws if the signature is wrong, the token is malformed, or expired.
     */
    public Claims parseAndValidate(String token) {
        try {
            Jws<Claims> jws = Jwts.parser()
                    .verifyWith(signingKey)
                    .requireIssuer(props.getIssuer())
                    .build()
                    .parseSignedClaims(token);
            return jws.getPayload();
        } catch (SignatureException e) {
            log.warn("JWT signature invalid: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            log.debug("JWT validation failed: {}", e.getMessage());
            throw e;
        }
    }

    public long getExpirationMs() {
        return props.getExpirationMs();
    }
}
