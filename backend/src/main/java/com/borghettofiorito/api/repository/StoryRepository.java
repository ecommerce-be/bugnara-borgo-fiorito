package com.borghettofiorito.api.repository;

import com.borghettofiorito.api.domain.entity.Story;
import com.borghettofiorito.api.domain.enums.PublicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {

    List<Story> findAllByStatusOrderByPublishedAtDesc(PublicationStatus status);

    Optional<Story> findBySlugAndStatus(String slug, PublicationStatus status);

    boolean existsBySlug(String slug);
}
