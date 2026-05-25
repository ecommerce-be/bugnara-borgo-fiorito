package com.borghettofiorito.api.dto.response;

import java.time.LocalDate;

public record StoryDetailResponse(
        Long id,
        String title,
        String slug,
        String excerpt,
        String contentMarkdown,
        String coverImageUrl,
        String authorName,
        LocalDate publishedAt
) {
}
