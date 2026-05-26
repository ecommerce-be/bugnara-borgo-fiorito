package com.borghettofiorito.api.controller;

import com.borghettofiorito.api.domain.enums.PublicationStatus;
import com.borghettofiorito.api.domain.enums.SpotType;
import com.borghettofiorito.api.dto.request.SpotUpsertRequest;
import com.borghettofiorito.api.dto.response.AdminSpotResponse;
import com.borghettofiorito.api.service.AdminSpotService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/admin/spots")
public class AdminSpotController {

    private final AdminSpotService service;

    public AdminSpotController(AdminSpotService service) {
        this.service = service;
    }

    @GetMapping
    public List<AdminSpotResponse> list(
            @RequestParam(required = false) PublicationStatus status,
            @RequestParam(required = false) SpotType type) {
        return service.findAll(Optional.ofNullable(status), Optional.ofNullable(type));
    }

    @GetMapping("/{id}")
    public AdminSpotResponse getOne(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<AdminSpotResponse> create(@Valid @RequestBody SpotUpsertRequest req) {
        AdminSpotResponse created = service.create(req);
        return ResponseEntity.status(201).body(created);
    }

    @PutMapping("/{id}")
    public AdminSpotResponse update(@PathVariable Long id,
                                     @Valid @RequestBody SpotUpsertRequest req) {
        return service.update(id, req);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
