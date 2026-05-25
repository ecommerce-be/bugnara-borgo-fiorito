package com.borghettofiorito.api.controller;

import com.borghettofiorito.api.dto.response.PublicStatsResponse;
import com.borghettofiorito.api.service.StatsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/stats")
public class StatsController {

    private final StatsService statsService;

    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping
    public PublicStatsResponse getStats() {
        return statsService.getPublicStats();
    }
}
