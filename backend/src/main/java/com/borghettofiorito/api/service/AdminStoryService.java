package com.borghettofiorito.api.service;

import com.borghettofiorito.api.domain.entity.Story;
import com.borghettofiorito.api.dto.request.StoryUpsertRequest;
import com.borghettofiorito.api.dto.response.AdminStoryResponse;
import com.borghettofiorito.api.exception.ResourceNotFoundException;
import com.borghettofiorito.api.mapper.StoryMapper;
import com.borghettofiorito.api.repository.StoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AdminStoryService {

    private final StoryRepository repo;
    private final StoryMapper mapper;

    public AdminStoryService(StoryRepository repo, StoryMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @Transactional(readOnly = true)
    public List<AdminStoryResponse> findAll() {
        return repo.findAll().stream().map(mapper::toAdmin).toList();
    }

    @Transactional(readOnly = true)
    public AdminStoryResponse findById(Long id) {
        return repo.findById(id)
                .map(mapper::toAdmin)
                .orElseThrow(() -> new ResourceNotFoundException("Story not found: " + id));
    }

    public AdminStoryResponse create(StoryUpsertRequest req) {
        if (repo.existsBySlug(req.slug())) {
            throw new IllegalArgumentException("Slug already in use: " + req.slug());
        }
        Story story = new Story();
        applyRequest(story, req);
        Story saved = repo.save(story);
        return mapper.toAdmin(saved);
    }

    public AdminStoryResponse update(Long id, StoryUpsertRequest req) {
        Story story = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Story not found: " + id));

        // If the slug changed, check uniqueness
        if (!story.getSlug().equals(req.slug()) && repo.existsBySlug(req.slug())) {
            throw new IllegalArgumentException("Slug already in use: " + req.slug());
        }

        applyRequest(story, req);
        return mapper.toAdmin(story);
    }

    public void delete(Long id) {
        Story story = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Story not found: " + id));
        repo.delete(story);
    }

    private void applyRequest(Story story, StoryUpsertRequest req) {
        story.setTitle(req.title());
        story.setSlug(req.slug());
        story.setExcerpt(req.excerpt());
        story.setContentMarkdown(req.contentMarkdown());
        story.setCoverImageUrl(req.coverImageUrl());
        story.setAuthorName(req.authorName());
        story.setPublishedAt(req.publishedAt());
        story.setStatus(req.status());
    }
}
