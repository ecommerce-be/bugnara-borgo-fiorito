package com.borghettofiorito.api.dto.response;

/**
 * Aggregated public counters shown on the home page.
 * Cheap to compute (a few COUNT queries) and cached at the React layer.
 */
public record PublicStatsResponse(
        long publishedSpots,
        long privateHouseSpots,
        long publicSpaceSpots,
        long participants,
        long publishedStories
) {
}
