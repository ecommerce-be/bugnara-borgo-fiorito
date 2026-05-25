package com.borghettofiorito.api.dto.response;

import com.borghettofiorito.api.domain.enums.SpotType;

import java.math.BigDecimal;

/**
 * Lightweight payload used to populate the map: we only need the
 * minimum data to draw a marker. The full detail (description, photos,
 * participants) is fetched on demand when the user clicks the marker.
 *
 * This keeps the initial map payload tiny even when there are
 * hundreds of spots.
 */
public record FloweredSpotMarkerResponse(
        Long id,
        String title,
        SpotType type,
        BigDecimal latitude,
        BigDecimal longitude,
        String thumbnailUrl
) {
}
