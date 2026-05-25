package com.borghettofiorito.api.service;

import com.borghettofiorito.api.domain.entity.FloweredSpot;
import com.borghettofiorito.api.domain.enums.PublicationStatus;
import com.borghettofiorito.api.dto.response.FloweredSpotMarkerResponse;
import com.borghettofiorito.api.dto.response.FloweredSpotResponse;
import com.borghettofiorito.api.exception.ResourceNotFoundException;
import com.borghettofiorito.api.mapper.FloweredSpotMapper;
import com.borghettofiorito.api.repository.FloweredSpotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Read-only public operations on flowered spots.
 * Admin-only mutations will live in a separate FloweredSpotAdminService in Phase 5.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FloweredSpotService {

    private final FloweredSpotRepository spotRepository;
    private final FloweredSpotMapper mapper;

    /**
     * Returns all the spots that should appear on the public map.
     * Each result is a lightweight marker payload — full details are
     * fetched on demand when the user opens a popup.
     */
    public List<FloweredSpotMarkerResponse> getPublicMapMarkers() {
        List<FloweredSpot> spots =
                spotRepository.findAllPublishedWithRelations(PublicationStatus.PUBLISHED);
        return spots.stream()
                .map(mapper::toMarker)
                .toList();
    }

    /**
     * Returns the full detail of a single published spot, or 404 if not found.
     */
    public FloweredSpotResponse getPublicSpotById(Long id) {
        FloweredSpot spot = spotRepository
                .findByIdAndStatus(id, PublicationStatus.PUBLISHED)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Spot not found with id " + id));
        return mapper.toDetail(spot);
    }
}
