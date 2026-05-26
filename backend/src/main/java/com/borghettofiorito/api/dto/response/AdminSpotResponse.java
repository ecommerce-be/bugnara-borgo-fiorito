package com.borghettofiorito.api.dto.response;

import com.borghettofiorito.api.domain.enums.PublicationStatus;
import com.borghettofiorito.api.domain.enums.SpotType;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

/**
 * Full spot payload for the admin UI — includes ALL fields (also the
 * private ones not exposed to the public API).
 */
public record AdminSpotResponse(
        Long id,
        String title,
        String description,
        SpotType type,
        PublicationStatus status,
        BigDecimal latitude,
        BigDecimal longitude,
        String addressHint,
        boolean consentGiven,
        LocalDate consentDate,
        boolean showParticipants,
        List<SpotPhotoResponse> photos,
        Instant createdAt,
        Instant updatedAt
) {
}
