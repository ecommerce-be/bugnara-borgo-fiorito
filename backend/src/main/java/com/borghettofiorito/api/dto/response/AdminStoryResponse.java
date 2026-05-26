package com.borghettofiorito.api.dto.response;

import com.borghettofiorito.api.domain.enums.PublicationStatus;

import java.time.Instant;
import java.time.LocalDate;

public record AdminStoryResponse(
        Long id,
        String title,
        String slug,
        String excerpt,
        String contentMarkdown,
        String coverImageUrl,
        String authorName,
        LocalDate publishedAt,
        PublicationStatus status,
        Instant createdAt,
        Instant updatedAt
) {
}
