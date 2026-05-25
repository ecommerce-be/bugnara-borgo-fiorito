package com.borghettofiorito.api.controller;

import com.borghettofiorito.api.dto.response.FloweredSpotMarkerResponse;
import com.borghettofiorito.api.dto.response.FloweredSpotResponse;
import com.borghettofiorito.api.service.FloweredSpotService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/spots")
@RequiredArgsConstructor
public class FloweredSpotController {

    private final FloweredSpotService spotService;

    /**
     * GET /api/v1/spots
     * List of map markers (light payload) for all published spots.
     */
    @GetMapping
    public List<FloweredSpotMarkerResponse> listMarkers() {
        return spotService.getPublicMapMarkers();
    }

    /**
     * GET /api/v1/spots/{id}
     * Full detail of a single published spot. 404 if not found.
     */
    @GetMapping("/{id}")
    public FloweredSpotResponse getOne(@PathVariable Long id) {
        return spotService.getPublicSpotById(id);
    }
}
