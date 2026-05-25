package com.borghettofiorito.api.controller;

import com.borghettofiorito.api.dto.HealthResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

/**
 * Simple health endpoint to verify the API is up and reachable.
 *
 * Spring Boot Actuator already exposes /actuator/health, but we want
 * a custom endpoint under /api/v1/* with a friendly response shape
 * that the frontend can call to confirm the wiring works.
 */
@RestController
@RequestMapping("/api/v1")
public class HealthController {

    @GetMapping("/health")
    public HealthResponse health() {
        return new HealthResponse(
                "ok",
                "Borghetto Fiorito API",
                Instant.now()
        );
    }
}
