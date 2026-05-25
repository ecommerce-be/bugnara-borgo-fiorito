package com.borghettofiorito.api.repository;

import com.borghettofiorito.api.domain.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {

    List<ContactMessage> findAllByArchivedFalseOrderByCreatedAtDesc();

    long countByReadFalseAndArchivedFalse();
}
