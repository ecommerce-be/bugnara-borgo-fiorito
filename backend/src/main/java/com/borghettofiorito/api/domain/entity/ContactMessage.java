package com.borghettofiorito.api.domain.entity;

import com.borghettofiorito.api.domain.enums.ContactSubject;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * A message left by a visitor through the public contact form.
 * Admins triage them by reading and possibly archiving.
 */
@Entity
@Table(name = "contact_messages")
@Getter
@Setter
@NoArgsConstructor
public class ContactMessage extends BaseEntity {

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, length = 200)
    private String email;

    @Column(length = 30)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ContactSubject subject = ContactSubject.GENERIC_INFO;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    /**
     * Flipped to true once an admin opens the message.
     */
    @Column(name = "is_read", nullable = false)
    private boolean read = false;

    /**
     * Archived messages are hidden from the inbox view but kept in DB.
     */
    @Column(name = "is_archived", nullable = false)
    private boolean archived = false;
}
