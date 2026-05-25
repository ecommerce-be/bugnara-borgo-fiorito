package com.borghettofiorito.api.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Temporary security guard for /api/v1/admin/* endpoints.
 *
 * Until Phase 5 introduces proper JWT login, we protect admin endpoints
 * with a static API key configured via the APP_ADMIN_API_KEY env var.
 * The caller must send it in the X-Admin-Key request header.
 *
 * NOTE: this is intentionally simple. We replace it with JWT in Phase 5,
 * which will give us per-user identity, roles, and expiry.
 */
@Component
public class AdminApiKeyFilter extends OncePerRequestFilter {

    private static final String HEADER = "X-Admin-Key";
    private static final String PROTECTED_PREFIX = "/api/v1/admin/";

    private final String expectedKey;

    public AdminApiKeyFilter(@Value("${app.admin-api-key:}") String expectedKey) {
        this.expectedKey = expectedKey;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        String path = request.getRequestURI();

        // Only guard admin endpoints; let everything else pass.
        if (!path.startsWith(PROTECTED_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        // If no key is configured server-side, refuse all admin traffic
        // (safer than accidentally exposing endpoints).
        if (expectedKey == null || expectedKey.isBlank()) {
            response.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
            response.setContentType("application/json");
            response.getWriter().write(
                "{\"error\":\"Admin API not configured. Set APP_ADMIN_API_KEY.\"}"
            );
            return;
        }

        String provided = request.getHeader(HEADER);
        if (provided == null || !provided.equals(expectedKey)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write(
                "{\"error\":\"Missing or invalid X-Admin-Key header.\"}"
            );
            return;
        }

        chain.doFilter(request, response);
    }
}
