package com.borghettofiorito.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Sent by the frontend after a successful Cloudinary upload, to register
 * the new photo against a flowered spot in our database.
 */
public record AttachPhotoRequest(

        @NotBlank @Size(max = 500)
        String imageUrl,

        @Size(max = 250)
        String caption,

        boolean isBeforePhoto,

        int displayOrder
) {
}
