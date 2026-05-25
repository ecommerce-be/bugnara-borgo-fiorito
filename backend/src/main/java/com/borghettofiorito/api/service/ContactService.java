package com.borghettofiorito.api.service;

import com.borghettofiorito.api.domain.entity.ContactMessage;
import com.borghettofiorito.api.dto.request.ContactMessageRequest;
import com.borghettofiorito.api.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactService {

    private final ContactMessageRepository messageRepository;

    @Transactional
    public Long submit(ContactMessageRequest request) {
        ContactMessage message = new ContactMessage();
        message.setName(request.name().trim());
        message.setEmail(request.email().trim());
        message.setPhone(request.phone() == null ? null : request.phone().trim());
        message.setSubject(request.subject());
        message.setMessage(request.message().trim());

        ContactMessage saved = messageRepository.save(message);
        log.info("Contact message persisted id={} subject={}", saved.getId(), saved.getSubject());

        // In Phase 4 we'll plug in email notifications to admins from here.
        return saved.getId();
    }
}
