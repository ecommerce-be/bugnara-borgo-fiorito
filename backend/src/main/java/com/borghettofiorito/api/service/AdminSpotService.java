package com.borghettofiorito.api.service;

import com.borghettofiorito.api.domain.entity.FloweredSpot;
import com.borghettofiorito.api.domain.enums.PublicationStatus;
import com.borghettofiorito.api.domain.enums.SpotType;
import com.borghettofiorito.api.dto.request.SpotUpsertRequest;
import com.borghettofiorito.api.dto.response.AdminSpotResponse;
import com.borghettofiorito.api.exception.ResourceNotFoundException;
import com.borghettofiorito.api.mapper.FloweredSpotMapper;
import com.borghettofiorito.api.repository.FloweredSpotRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Admin-side spot management.
 *
 * Business rules enforced here:
 *  - A PRIVATE_HOUSE spot cannot transition to PUBLISHED without consentGiven.
 *  - Setting consentGiven=true auto-fills consentDate if missing.
 */
@Service
@Transactional
public class AdminSpotService {

    private final FloweredSpotRepository repo;
    private final FloweredSpotMapper mapper;

    public AdminSpotService(FloweredSpotRepository repo, FloweredSpotMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @Transactional(readOnly = true)
    public List<AdminSpotResponse> findAll(Optional<PublicationStatus> statusFilter,
                                            Optional<SpotType> typeFilter) {
        List<FloweredSpot> spots;
        if (statusFilter.isPresent() && typeFilter.isPresent()) {
            spots = repo.findAllByStatusAndType(statusFilter.get(), typeFilter.get());
        } else if (statusFilter.isPresent()) {
            spots = repo.findAllByStatus(statusFilter.get());
        } else {
            spots = repo.findAll();
        }
        return spots.stream().map(mapper::toAdmin).toList();
    }

    @Transactional(readOnly = true)
    public AdminSpotResponse findById(Long id) {
        return repo.findById(id)
                .map(mapper::toAdmin)
                .orElseThrow(() -> new ResourceNotFoundException("Spot not found: " + id));
    }

    public AdminSpotResponse create(SpotUpsertRequest req) {
        validateBusinessRules(req);

        FloweredSpot spot = new FloweredSpot();
        applyRequest(spot, req);
        FloweredSpot saved = repo.save(spot);
        return mapper.toAdmin(saved);
    }

    public AdminSpotResponse update(Long id, SpotUpsertRequest req) {
        FloweredSpot spot = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Spot not found: " + id));

        validateBusinessRules(req);
        applyRequest(spot, req);
        return mapper.toAdmin(spot);
    }

    public void delete(Long id) {
        FloweredSpot spot = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Spot not found: " + id));
        repo.delete(spot);
    }

    /**
     * Business invariant: a private house can be PUBLISHED only with consent.
     */
    private void validateBusinessRules(SpotUpsertRequest req) {
        if (req.status() == PublicationStatus.PUBLISHED
                && req.type() == SpotType.PRIVATE_HOUSE
                && !req.consentGiven()) {
            throw new IllegalArgumentException(
                "Cannot publish a private house spot without consent. " +
                "Set consentGiven=true or change status to DRAFT/ARCHIVED.");
        }
    }

    private void applyRequest(FloweredSpot spot, SpotUpsertRequest req) {
        spot.setTitle(req.title());
        spot.setDescription(req.description());
        spot.setType(req.type());
        spot.setStatus(req.status());
        spot.setLatitude(req.latitude());
        spot.setLongitude(req.longitude());
        spot.setAddressHint(req.addressHint());
        spot.setConsentGiven(req.consentGiven());
        spot.setShowParticipants(req.showParticipants());

        // Auto-fill consent date if consent given but date missing
        if (req.consentGiven() && req.consentDate() == null) {
            spot.setConsentDate(LocalDate.now());
        } else {
            spot.setConsentDate(req.consentDate());
        }
    }
}
