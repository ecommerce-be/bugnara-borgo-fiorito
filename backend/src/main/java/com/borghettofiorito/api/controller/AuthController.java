package com.borghettofiorito.api.controller;

import com.borghettofiorito.api.dto.request.LoginRequest;
import com.borghettofiorito.api.dto.response.LoginResponse;
import com.borghettofiorito.api.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Authentication endpoints.
 *
 *  POST /api/v1/auth/login -> public, returns JWT
 *  GET  /api/v1/auth/me    -> requires a valid token, returns who you are
 */
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    /**
     * Returns info about the currently authenticated user.
     * Useful for the frontend to check "am I still logged in?"
     * on page reload, without storing user info in localStorage.
     */
    @GetMapping("/me")
    public Map<String, Object> me() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return Map.of("authenticated", false);
        }

        Object principal = auth.getPrincipal();
        String username = (principal instanceof UserDetails ud) ? ud.getUsername() : auth.getName();
        String role = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("ROLE_EDITOR");

        return Map.of(
                "authenticated", true,
                "username", username,
                "role", role.replace("ROLE_", "")
        );
    }
}
