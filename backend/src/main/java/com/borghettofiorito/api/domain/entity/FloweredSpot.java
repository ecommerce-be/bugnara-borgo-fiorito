package com.borghettofiorito.api.domain.entity;

import com.borghettofiorito.api.domain.enums.PublicationStatus;
import com.borghettofiorito.api.domain.enums.SpotType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * A "flowered spot" on the map of Bugnara.
 *
 * Can be either:
 *  - a private house whose owner decorated it with flowers/plants
 *  - a public space (square, alley, fountain corner) that was beautified
 *
 * Privacy note:
 *  When type == PRIVATE_HOUSE, the spot can only transition to PUBLISHED
 *  if consentGiven == true and consentDate is set. This is enforced in
 *  the service layer (FloweredSpotService).
 *
 * Coordinates are stored as BigDecimal(9,6) — that gives ~11 cm precision,
 * which is plenty for a small village, and avoids floating-point drift.
 */
@Entity
@Table(name = "flowered_spots")
@Getter
@Setter
@NoArgsConstructor
public class FloweredSpot extends BaseEntity {

    @Column(nullable = false, length = 150)
    private String title;

    /**
     * Free-form description shown in the spot detail panel.
     * Markdown is allowed; rendering happens on the frontend.
     */
    @Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private SpotType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PublicationStatus status = PublicationStatus.DRAFT;

    /**
     * Latitude in WGS84. For Bugnara, values are around 42.02.
     * Precision: 6 decimals (~11 cm), more than enough for a village.
     */
    @Column(name = "latitude", nullable = false, precision = 9, scale = 6)
    private BigDecimal latitude;

    /**
     * Longitude in WGS84. For Bugnara, values are around 13.86.
     */
    @Column(name = "longitude", nullable = false, precision = 9, scale = 6)
    private BigDecimal longitude;

    /**
     * Optional postal address shown for context (without house number for privacy).
     * E.g. "Via del Castello" — not "Via del Castello 12".
     */
    @Column(name = "address_hint", length = 200)
    private String addressHint;

    /**
     * GDPR consent flag. Only meaningful when type == PRIVATE_HOUSE.
     * Must be true for the spot to be PUBLISHED.
     */
    @Column(name = "consent_given", nullable = false)
    private boolean consentGiven = false;

    /**
     * Date on which the homeowner provided the publication consent.
     * Kept for our records in case of disputes.
     */
    @Column(name = "consent_date")
    private LocalDate consentDate;

    /**
     * If false, hide participant names on the public site even when the
     * relationship table contains some — for cases where the family wants
     * the spot shown but not their names.
     */
    @Column(name = "show_participants", nullable = false)
    private boolean showParticipants = false;

    @OneToMany(
        mappedBy = "spot",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    @OrderBy("displayOrder ASC, id ASC")
    private List<SpotPhoto> photos = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "spot_participants",
        joinColumns = @JoinColumn(name = "spot_id"),
        inverseJoinColumns = @JoinColumn(name = "participant_id")
    )
    @Setter(AccessLevel.NONE)
    private Set<Participant> participants = new HashSet<>();

    // ---------- helpers to keep both sides of the relationships in sync ----------

    public void addPhoto(SpotPhoto photo) {
        photos.add(photo);
        photo.setSpot(this);
    }

    public void removePhoto(SpotPhoto photo) {
        photos.remove(photo);
        photo.setSpot(null);
    }

    public void addParticipant(Participant participant) {
        participants.add(participant);
        participant.getSpots().add(this);
    }

    public void removeParticipant(Participant participant) {
        participants.remove(participant);
        participant.getSpots().remove(this);
    }
}
