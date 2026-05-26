package com.borghettofiorito.api.mapper;

import com.borghettofiorito.api.domain.entity.FloweredSpot;
import com.borghettofiorito.api.domain.entity.Participant;
import com.borghettofiorito.api.domain.entity.SpotPhoto;
import com.borghettofiorito.api.dto.response.AdminSpotResponse;
import com.borghettofiorito.api.dto.response.FloweredSpotMarkerResponse;
import com.borghettofiorito.api.dto.response.FloweredSpotResponse;
import com.borghettofiorito.api.dto.response.ParticipantSummaryResponse;
import com.borghettofiorito.api.dto.response.SpotPhotoResponse;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;

/**
 * Maps FloweredSpot entities to both public and admin DTOs.
 *
 * Public mapping applies privacy rules (filtered participants,
 * sensitive fields removed). Admin mapping exposes everything.
 */
@Component
public class FloweredSpotMapper {

    public FloweredSpotMarkerResponse toMarker(FloweredSpot spot) {
        String thumbnail = spot.getPhotos().stream()
                .filter(p -> !p.isBeforePhoto())
                .min(Comparator.comparingInt(SpotPhoto::getDisplayOrder))
                .map(SpotPhoto::getImageUrl)
                .orElse(null);

        return new FloweredSpotMarkerResponse(
                spot.getId(),
                spot.getTitle(),
                spot.getType(),
                spot.getLatitude(),
                spot.getLongitude(),
                thumbnail
        );
    }

    public FloweredSpotResponse toDetail(FloweredSpot spot) {
        List<SpotPhotoResponse> photos = spot.getPhotos().stream()
                .sorted(Comparator
                        .comparingInt(SpotPhoto::getDisplayOrder)
                        .thenComparing(SpotPhoto::getId))
                .map(this::toPhotoResponse)
                .toList();

        List<ParticipantSummaryResponse> participants = spot.isShowParticipants()
                ? spot.getParticipants().stream()
                    .filter(Participant::isShowOnSite)
                    .sorted(Comparator.comparing(Participant::getDisplayName))
                    .map(p -> new ParticipantSummaryResponse(p.getId(), p.getDisplayName()))
                    .toList()
                : List.of();

        return new FloweredSpotResponse(
                spot.getId(),
                spot.getTitle(),
                spot.getDescription(),
                spot.getType(),
                spot.getLatitude(),
                spot.getLongitude(),
                spot.getAddressHint(),
                photos,
                participants
        );
    }

    /**
     * Admin view — exposes ALL fields including consent, status, etc.
     * Used only by admin-protected endpoints.
     */
    public AdminSpotResponse toAdmin(FloweredSpot spot) {
        List<SpotPhotoResponse> photos = spot.getPhotos().stream()
                .sorted(Comparator
                        .comparingInt(SpotPhoto::getDisplayOrder)
                        .thenComparing(SpotPhoto::getId))
                .map(this::toPhotoResponse)
                .toList();

        return new AdminSpotResponse(
                spot.getId(),
                spot.getTitle(),
                spot.getDescription(),
                spot.getType(),
                spot.getStatus(),
                spot.getLatitude(),
                spot.getLongitude(),
                spot.getAddressHint(),
                spot.isConsentGiven(),
                spot.getConsentDate(),
                spot.isShowParticipants(),
                photos,
                spot.getCreatedAt(),
                spot.getUpdatedAt()
        );
    }

    private SpotPhotoResponse toPhotoResponse(SpotPhoto photo) {
        return new SpotPhotoResponse(
                photo.getId(),
                photo.getImageUrl(),
                photo.getCaption(),
                photo.isBeforePhoto(),
                photo.getDisplayOrder()
        );
    }
}
