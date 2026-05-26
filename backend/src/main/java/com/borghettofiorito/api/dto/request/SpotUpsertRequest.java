package com.borghettofiorito.api.dto.request;

import com.borghettofiorito.api.domain.enums.PublicationStatus;
import com.borghettofiorito.api.domain.enums.SpotType;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Payload sent by the admin UI to create or update a flowered spot.
 *
 * Coordinate ranges are restricted to a sensible bounding box around
 * Bugnara to prevent accidental input errors (typos, misplaced clicks).
 */
public record SpotUpsertRequest(

        @NotBlank @Size(max = 150)
        String title,

        @Size(max = 2000)
        String description,

        @NotNull
        SpotType type,

        @NotNull
        PublicationStatus status,

        @NotNull
        @DecimalMin(value = "41.9", message = "latitude out of Bugnara bounds")
        @DecimalMax(value = "42.1", message = "latitude out of Bugnara bounds")
        BigDecimal latitude,

        @NotNull
        @DecimalMin(value = "13.7", message = "longitude out of Bugnara bounds")
        @DecimalMax(value = "14.0", message = "longitude out of Bugnara bounds")
        BigDecimal longitude,

        @Size(max = 200)
        String addressHint,

        boolean consentGiven,

        LocalDate consentDate,

        boolean showParticipants
) {
}
