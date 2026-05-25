package com.borghettofiorito.api.service;

import com.borghettofiorito.api.domain.entity.FloweredSpot;
import com.borghettofiorito.api.domain.entity.SpotPhoto;
import com.borghettofiorito.api.dto.request.AttachPhotoRequest;
import com.borghettofiorito.api.dto.response.SpotPhotoResponse;
import com.borghettofiorito.api.exception.ResourceNotFoundException;
import com.borghettofiorito.api.repository.FloweredSpotRepository;
import com.borghettofiorito.api.repository.SpotPhotoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AdminPhotoService {

    private final FloweredSpotRepository spotRepository;
    private final SpotPhotoRepository photoRepository;

    public AdminPhotoService(FloweredSpotRepository spotRepository,
                             SpotPhotoRepository photoRepository) {
        this.spotRepository = spotRepository;
        this.photoRepository = photoRepository;
    }

    /**
     * After the frontend uploads a file to Cloudinary and receives back the
     * public URL, it calls this method to register the photo against a spot.
     */
    public SpotPhotoResponse attach(Long spotId, AttachPhotoRequest req) {
        FloweredSpot spot = spotRepository.findById(spotId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Spot not found with id " + spotId));

        SpotPhoto photo = new SpotPhoto();
        photo.setSpot(spot);
        photo.setImageUrl(req.imageUrl());
        photo.setCaption(req.caption());
        photo.setBeforePhoto(req.isBeforePhoto());
        photo.setDisplayOrder(req.displayOrder());

        // addPhoto keeps both sides of the bidirectional relation in sync
        spot.addPhoto(photo);

        SpotPhoto saved = photoRepository.save(photo);

        return new SpotPhotoResponse(
                saved.getId(),
                saved.getImageUrl(),
                saved.getCaption(),
                saved.isBeforePhoto(),
                saved.getDisplayOrder()
        );
    }

    public void delete(Long photoId) {
        SpotPhoto photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Photo not found with id " + photoId));

        // Detach from spot so JPA correctly removes it from the photos collection
        FloweredSpot spot = photo.getSpot();
        if (spot != null) {
            spot.removePhoto(photo);
        }
        photoRepository.delete(photo);

        // Note: we do NOT delete the file from Cloudinary here.
        // That would require an authenticated Cloudinary API call.
        // For now, orphaned files stay in Cloudinary; they cost almost nothing.
        // We can add a cleanup job in Phase 6 if needed.
    }
}
