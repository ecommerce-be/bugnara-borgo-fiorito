package com.borghettofiorito.api.dto.response;

import com.borghettofiorito.api.domain.enums.ContactSubject;

import java.time.Instant;

public record AdminContactMessageResponse(
        Long id,
        String name,
        String email,
        String phone,
        ContactSubject subject,
        String message,
        boolean read,
        boolean archived,
        Instant createdAt
) {
}
