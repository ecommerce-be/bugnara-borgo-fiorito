package com.borghettofiorito.api.service;

import com.borghettofiorito.api.domain.entity.ContactMessage;
import com.borghettofiorito.api.dto.response.AdminContactMessageResponse;
import com.borghettofiorito.api.exception.ResourceNotFoundException;
import com.borghettofiorito.api.mapper.ContactMessageMapper;
import com.borghettofiorito.api.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AdminContactService {

    private final ContactMessageRepository repo;
    private final ContactMessageMapper mapper;

    public AdminContactService(ContactMessageRepository repo, ContactMessageMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @Transactional(readOnly = true)
    public List<AdminContactMessageResponse> findInbox() {
        return repo.findAllByArchivedFalseOrderByCreatedAtDesc().stream()
                .map(mapper::toAdmin)
                .toList();
    }

    @Transactional(readOnly = true)
    public long countUnread() {
        return repo.countByReadFalseAndArchivedFalse();
    }

    public AdminContactMessageResponse markAsRead(Long id) {
        ContactMessage m = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found: " + id));
        m.setRead(true);
        return mapper.toAdmin(m);
    }

    public AdminContactMessageResponse archive(Long id) {
        ContactMessage m = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found: " + id));
        m.setArchived(true);
        m.setRead(true);
        return mapper.toAdmin(m);
    }
}
