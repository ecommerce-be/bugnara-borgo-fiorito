package com.borghettofiorito.api.service;

import com.borghettofiorito.api.domain.entity.ContactMessage;
import com.borghettofiorito.api.dto.request.ContactMessageRequest;
import com.borghettofiorito.api.repository.ContactMessageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
public class ContactService {

    private final ContactMessageRepository messageRepository;
    private final EmailService emailService;

    public ContactService(ContactMessageRepository messageRepository,
                          EmailService emailService) {
        this.messageRepository = messageRepository;
        this.emailService = emailService;
    }

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

        // Fire-and-forget email notification on a background thread.
        // If Resend isn't configured, the service silently logs a warning.
        emailService.notifyAdminOfNewContact(
                saved.getName(),
                saved.getEmail(),
                saved.getSubject().name(),
                saved.getMessage(),
                saved.getId()
        );

        return saved.getId();
    }
}
