package com.borghettofiorito.api.controller;

import com.borghettofiorito.api.dto.request.StoryUpsertRequest;
import com.borghettofiorito.api.dto.response.AdminStoryResponse;
import com.borghettofiorito.api.service.AdminStoryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/stories")
public class AdminStoryController {

    private final AdminStoryService service;

    public AdminStoryController(AdminStoryService service) {
        this.service = service;
    }

    @GetMapping
    public List<AdminStoryResponse> list() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public AdminStoryResponse getOne(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<AdminStoryResponse> create(@Valid @RequestBody StoryUpsertRequest req) {
        return ResponseEntity.status(201).body(service.create(req));
    }

    @PutMapping("/{id}")
    public AdminStoryResponse update(@PathVariable Long id,
                                      @Valid @RequestBody StoryUpsertRequest req) {
        return service.update(id, req);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
