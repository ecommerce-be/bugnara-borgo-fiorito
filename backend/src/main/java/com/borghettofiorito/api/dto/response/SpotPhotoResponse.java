package com.borghettofiorito.api.dto.response;

public record SpotPhotoResponse(
        Long id,
        String imageUrl,
        String caption,
        boolean isBeforePhoto,
        int displayOrder
) {
}
