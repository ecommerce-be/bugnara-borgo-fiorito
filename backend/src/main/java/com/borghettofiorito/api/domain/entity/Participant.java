package com.borghettofiorito.api.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

/**
 * A person or family that took part in the initiative.
 *
 * Privacy:
 *  - showOnSite: if false, the participant exists in our records
 *    (e.g. for the admins to remember who did what) but is never
 *    exposed on the public website.
 */
@Entity
@Table(name = "participants")
@Getter
@Setter
@NoArgsConstructor
public class Participant extends BaseEntity {

    /**
     * Display name: a person ("Maria Rossi"), a family ("Famiglia De Sanctis"),
     * a group ("Gruppo Volontari Via del Castello"), or an association.
     */
    @Column(name = "display_name", nullable = false, length = 150)
    private String displayName;

    @Column(length = 1000)
    private String bio;

    /**
     * Whether this participant agreed to appear on the public site.
     * When false, they are kept private regardless of the spot's settings.
     */
    @Column(name = "show_on_site", nullable = false)
    private boolean showOnSite = false;

    @ManyToMany(mappedBy = "participants", fetch = FetchType.LAZY)
    private Set<FloweredSpot> spots = new HashSet<>();
}
