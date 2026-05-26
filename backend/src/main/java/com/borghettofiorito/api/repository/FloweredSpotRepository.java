package com.borghettofiorito.api.repository;

import com.borghettofiorito.api.domain.entity.FloweredSpot;
import com.borghettofiorito.api.domain.enums.PublicationStatus;
import com.borghettofiorito.api.domain.enums.SpotType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FloweredSpotRepository extends JpaRepository<FloweredSpot, Long> {

    // ============= Public-side queries (existing) =============

    /**
     * Fetches all published spots eagerly loading photos and participants
     * to avoid N+1 queries when the controller serializes them.
     */
    @Query("""
           SELECT DISTINCT s FROM FloweredSpot s
           LEFT JOIN FETCH s.photos
           LEFT JOIN FETCH s.participants
           WHERE s.status = :status
           ORDER BY s.createdAt DESC
           """)
    List<FloweredSpot> findAllPublishedWithRelations(@Param("status") PublicationStatus status);

    /**
     * Single spot detail (public): only returns if the requested spot
     * is in the requested status. Used to ensure DRAFT/ARCHIVED spots
     * are not visible to the public.
     */
    @Query("""
           SELECT s FROM FloweredSpot s
           LEFT JOIN FETCH s.photos
           LEFT JOIN FETCH s.participants
           WHERE s.id = :id AND s.status = :status
           """)
    Optional<FloweredSpot> findByIdAndStatus(@Param("id") Long id,
                                              @Param("status") PublicationStatus status);

    // ============= Admin-side queries (new in Phase 5B) =============

    List<FloweredSpot> findAllByStatus(PublicationStatus status);

    List<FloweredSpot> findAllByStatusAndType(PublicationStatus status, SpotType type);

    long countByStatus(PublicationStatus status);

    long countByStatusAndType(PublicationStatus status, SpotType type);
}
