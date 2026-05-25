package com.borghettofiorito.api.service;

import com.borghettofiorito.api.domain.enums.PublicationStatus;
import com.borghettofiorito.api.domain.enums.SpotType;
import com.borghettofiorito.api.dto.response.PublicStatsResponse;
import com.borghettofiorito.api.repository.FloweredSpotRepository;
import com.borghettofiorito.api.repository.ParticipantRepository;
import com.borghettofiorito.api.repository.StoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class StatsService {

    private final FloweredSpotRepository spotRepository;
    private final ParticipantRepository participantRepository;
    private final StoryRepository storyRepository;

    public StatsService(FloweredSpotRepository spotRepository,
                        ParticipantRepository participantRepository,
                        StoryRepository storyRepository) {
        this.spotRepository = spotRepository;
        this.participantRepository = participantRepository;
        this.storyRepository = storyRepository;
    }

    public PublicStatsResponse getPublicStats() {
        long publishedSpots = spotRepository.countByStatus(PublicationStatus.PUBLISHED);
        long privateSpots = spotRepository.countByStatusAndType(
                PublicationStatus.PUBLISHED, SpotType.PRIVATE_HOUSE);
        long publicSpots = spotRepository.countByStatusAndType(
                PublicationStatus.PUBLISHED, SpotType.PUBLIC_SPACE);
        long participants = participantRepository
                .findAllByShowOnSiteTrueOrderByDisplayNameAsc().size();
        long publishedStories = storyRepository
                .findAllByStatusOrderByPublishedAtDesc(PublicationStatus.PUBLISHED).size();

        return new PublicStatsResponse(
                publishedSpots, privateSpots, publicSpots, participants, publishedStories);
    }
}
