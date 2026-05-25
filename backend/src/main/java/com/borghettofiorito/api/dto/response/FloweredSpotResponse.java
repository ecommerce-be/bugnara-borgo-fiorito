package com.borghettofiorito.api.dto.response;

import com.borghettofiorito.api.domain.enums.SpotType;

import java.math.BigDecimal;
import java.util.List;

/**
 * Public response payload for a flowered spot.
 *
 * Privacy decisions baked here:
 *  - we never expose consentGiven or consentDate (internal data)
 *  - we never include the exact street address with house number
 *  - participants are filtered upstream by SpotMapper based on
 *    spot.showParticipants AND participant.showOnSite
 */
public record FloweredSpotResponse(
        Long id,
        String title,
        String description,
        SpotType type,
        BigDecimal latitude,
        BigDecimal longitude,
        String addressHint,
        List<SpotPhotoResponse> photos,
        List<ParticipantSummaryResponse> participants
) {
}
