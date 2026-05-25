package com.borghettofiorito.api.domain.entity;

import com.borghettofiorito.api.domain.enums.PublicationStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

/**
 * Long-form content: project origin, interviews with participants,
 * news from the initiative.
 * <p>
 * The slug is the URL-friendly identifier used in the frontend
 * (e.g. "come-e-nata-l-idea") so we have nice URLs like
 * /storie/come-e-nata-l-idea instead of /storie/42.
 */
@Entity
@Table(name = "stories")
@Getter
@Setter
@NoArgsConstructor
public class Story extends BaseEntity {

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, unique = true, length = 220)
    private String slug;

    /**
     * Short summary shown in listings and meta tags (~160 chars max).
     */
    @Column(length = 500)
    private String excerpt;

    /**
     * Full markdown body. Stored as LOB because it can be long.
     */
    @Column(columnDefinition = "TEXT")
    private String contentMarkdown;

    @Column(name = "cover_image_url", length = 500)
    private String coverImageUrl;

    @Column(name = "author_name", length = 150)
    private String authorName;

    @Column(name = "published_at")
    private LocalDate publishedAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PublicationStatus status = PublicationStatus.DRAFT;
}
