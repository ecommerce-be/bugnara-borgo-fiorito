package com.borghettofiorito.api.mapper;

import com.borghettofiorito.api.domain.entity.Story;
import com.borghettofiorito.api.dto.response.StoryDetailResponse;
import com.borghettofiorito.api.dto.response.StorySummaryResponse;
import org.springframework.stereotype.Component;

@Component
public class StoryMapper {

    public StorySummaryResponse toSummary(Story story) {
        return new StorySummaryResponse(
                story.getId(),
                story.getTitle(),
                story.getSlug(),
                story.getExcerpt(),
                story.getCoverImageUrl(),
                story.getAuthorName(),
                story.getPublishedAt()
        );
    }

    public StoryDetailResponse toDetail(Story story) {
        return new StoryDetailResponse(
                story.getId(),
                story.getTitle(),
                story.getSlug(),
                story.getExcerpt(),
                story.getContentMarkdown(),
                story.getCoverImageUrl(),
                story.getAuthorName(),
                story.getPublishedAt()
        );
    }
}
