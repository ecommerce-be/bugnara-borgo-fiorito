package com.borghettofiorito.api.dto.response;

public record LoginResponse(
        String accessToken,
        String tokenType,      // always "Bearer"
        long expiresInMs,
        AdminUserInfo user
) {
    public record AdminUserInfo(
            Long id,
            String username,
            String displayName,
            String role
    ) {}
}
