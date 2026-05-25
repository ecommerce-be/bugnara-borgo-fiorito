package com.borghettofiorito.api.dto;

import java.time.Instant;

/**
 * Response payload for the /api/v1/health endpoint.
 *
 * Using a Java record: immutable, auto-generates constructor,
 * getters, equals, hashCode, and toString. Perfect for DTOs.
 */
public record HealthResponse(
        String status,
        String service,
        Instant timestamp
) {
}
