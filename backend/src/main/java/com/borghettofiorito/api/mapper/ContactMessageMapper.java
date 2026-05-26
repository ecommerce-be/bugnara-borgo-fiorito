package com.borghettofiorito.api.mapper;

import com.borghettofiorito.api.domain.entity.ContactMessage;
import com.borghettofiorito.api.dto.response.AdminContactMessageResponse;
import org.springframework.stereotype.Component;

@Component
public class ContactMessageMapper {

    public AdminContactMessageResponse toAdmin(ContactMessage m) {
        return new AdminContactMessageResponse(
                m.getId(),
                m.getName(),
                m.getEmail(),
                m.getPhone(),
                m.getSubject(),
                m.getMessage(),
                m.isRead(),
                m.isArchived(),
                m.getCreatedAt()
        );
    }
}
