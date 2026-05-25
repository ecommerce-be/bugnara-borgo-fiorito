package com.borghettofiorito.api.controller;

import com.borghettofiorito.api.dto.response.StoryDetailResponse;
import com.borghettofiorito.api.dto.response.StorySummaryResponse;
import com.borghettofiorito.api.service.StoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stories")
@RequiredArgsConstructor
public class StoryController {

    private final StoryService storyService;

    @GetMapping
    public List<StorySummaryResponse> list() {
        return storyService.getPublishedStories();
    }

    @GetMapping("/{slug}")
    public StoryDetailResponse getBySlug(@PathVariable String slug) {
        return storyService.getStoryBySlug(slug);
    }
}
