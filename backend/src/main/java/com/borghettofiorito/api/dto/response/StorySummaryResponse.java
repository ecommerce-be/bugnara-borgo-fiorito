package com.borghettofiorito.api.dto.response;

import java.time.LocalDate;

public record StorySummaryResponse(
        Long id,
        String title,
        String slug,
        String excerpt,
        String coverImageUrl,
        String authorName,
        LocalDate publishedAt
) {
}
