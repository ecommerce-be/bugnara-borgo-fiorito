package com.borghettofiorito.api.service;

import com.borghettofiorito.api.domain.entity.Story;
import com.borghettofiorito.api.domain.enums.PublicationStatus;
import com.borghettofiorito.api.dto.response.StoryDetailResponse;
import com.borghettofiorito.api.dto.response.StorySummaryResponse;
import com.borghettofiorito.api.exception.ResourceNotFoundException;
import com.borghettofiorito.api.mapper.StoryMapper;
import com.borghettofiorito.api.repository.StoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StoryService {

    private final StoryRepository storyRepository;
    private final StoryMapper mapper;

    public List<StorySummaryResponse> getPublishedStories() {
        return storyRepository
                .findAllByStatusOrderByPublishedAtDesc(PublicationStatus.PUBLISHED)
                .stream()
                .map(mapper::toSummary)
                .toList();
    }

    public StoryDetailResponse getStoryBySlug(String slug) {
        Story story = storyRepository
                .findBySlugAndStatus(slug, PublicationStatus.PUBLISHED)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Story not found with slug " + slug));
        return mapper.toDetail(story);
    }
}
