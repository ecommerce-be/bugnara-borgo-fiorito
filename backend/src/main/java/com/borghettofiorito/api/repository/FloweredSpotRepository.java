package com.borghettofiorito.api.repository;

import com.borghettofiorito.api.domain.entity.FloweredSpot;
import com.borghettofiorito.api.domain.enums.PublicationStatus;
import com.borghettofiorito.api.domain.enums.SpotType;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FloweredSpotRepository extends JpaRepository<FloweredSpot, Long> {

    /**
     * All spots ready for the public map.
     * Uses an entity graph to also load photos and participants in one go,
     * avoiding the classic N+1 problem (one extra query per spot).
     */
    @EntityGraph(attributePaths = {"photos", "participants"})
    @Query("SELECT s FROM FloweredSpot s WHERE s.status = :status")
    List<FloweredSpot> findAllPublishedWithRelations(PublicationStatus status);

    List<FloweredSpot> findAllByStatus(PublicationStatus status);

    List<FloweredSpot> findAllByStatusAndType(PublicationStatus status, SpotType type);

    /**
     * Detail view: a single published spot with its photos and participants.
     */
    @EntityGraph(attributePaths = {"photos", "participants"})
    Optional<FloweredSpot> findByIdAndStatus(Long id, PublicationStatus status);

    long countByStatus(PublicationStatus status);

    long countByStatusAndType(PublicationStatus status, SpotType type);
}
