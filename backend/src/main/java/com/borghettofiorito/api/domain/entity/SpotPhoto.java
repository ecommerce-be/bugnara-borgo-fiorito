package com.borghettofiorito.api.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * A photo attached to a FloweredSpot.
 *
 * We don't store the binary in the DB. Instead, we keep the URL
 * (or storage key) of the file as uploaded to a separate object
 * store. This is the standard, cloud-friendly pattern: in dev we'll
 * use the local filesystem under /uploads, in prod we'll use a
 * cloud bucket (e.g. Cloudflare R2, AWS S3) — same column, different
 * URL scheme.
 */
@Entity
@Table(name = "spot_photos")
@Getter
@Setter
@NoArgsConstructor
public class SpotPhoto extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "spot_id", nullable = false)
    private FloweredSpot spot;

    /**
     * Public-facing URL of the photo. Either a full https URL when on a
     * cloud bucket, or a /uploads/... path when served by the backend in dev.
     */
    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @Column(length = 250)
    private String caption;

    /**
     * Marks "before" photos so the frontend can build a before/after gallery.
     */
    @Column(name = "is_before_photo", nullable = false)
    private boolean isBeforePhoto = false;

    /**
     * Sort order in the gallery; lower numbers appear first.
     * Defaults to 0; admins can drag-and-drop to reorder.
     */
    @Column(name = "display_order", nullable = false)
    private int displayOrder = 0;
}
