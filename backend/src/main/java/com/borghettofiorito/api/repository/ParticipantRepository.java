package com.borghettofiorito.api.repository;

import com.borghettofiorito.api.domain.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    List<Participant> findAllByShowOnSiteTrueOrderByDisplayNameAsc();
}
