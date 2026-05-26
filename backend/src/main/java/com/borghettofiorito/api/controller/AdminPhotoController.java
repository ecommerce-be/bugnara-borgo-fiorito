package com.borghettofiorito.api.controller;

import com.borghettofiorito.api.dto.request.AttachPhotoRequest;
import com.borghettofiorito.api.dto.response.CloudinarySignatureResponse;
import com.borghettofiorito.api.dto.response.SpotPhotoResponse;
import com.borghettofiorito.api.service.AdminPhotoService;
import com.borghettofiorito.api.service.CloudinarySignatureService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Admin endpoints for managing photos.
 * Protected by AdminApiKeyFilter (X-Admin-Key header required).
 */
@RestController
@RequestMapping("/api/v1/admin")
public class AdminPhotoController {

    private final CloudinarySignatureService signatureService;
    private final AdminPhotoService photoService;

    public AdminPhotoController(CloudinarySignatureService signatureService,
                                AdminPhotoService photoService) {
        this.signatureService = signatureService;
        this.photoService = photoService;
    }

    /**
     * Returns the signed parameters the frontend needs to upload a photo
     * directly to Cloudinary. The signature is short-lived (~1 hour by default).
     */
    @GetMapping("/photos/upload-signature")
    public CloudinarySignatureResponse getUploadSignature(
            @RequestParam(required = false, defaultValue = "spots") String subfolder) {
        return signatureService.buildSignature(subfolder);
    }

    /**
     * Registers an already-uploaded Cloudinary photo against a flowered spot.
     */
    @PostMapping("/spots/{spotId}/photos")
    public ResponseEntity<SpotPhotoResponse> attachPhoto(
            @PathVariable Long spotId,
            @Valid @RequestBody AttachPhotoRequest req) {
        SpotPhotoResponse saved = photoService.attach(spotId, req);
        return ResponseEntity.status(201).body(saved);
    }

    @DeleteMapping("/photos/{photoId}")
    public ResponseEntity<Void> deletePhoto(@PathVariable Long photoId) {
        photoService.delete(photoId);
        return ResponseEntity.noContent().build();
    }
}
