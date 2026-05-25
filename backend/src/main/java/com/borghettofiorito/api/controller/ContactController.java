package com.borghettofiorito.api.controller;

import com.borghettofiorito.api.dto.request.ContactMessageRequest;
import com.borghettofiorito.api.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> submit(@Valid @RequestBody ContactMessageRequest request) {
        Long id = contactService.submit(request);
        return ResponseEntity.accepted().body(Map.of(
                "id", id,
                "status", "received"
        ));
    }
}
