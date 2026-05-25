package com.borghettofiorito.api.domain.enums;

/**
 * Admin role.
 *  - ADMIN  : full access, can manage users and configuration
 *  - EDITOR : can manage content (spots, stories, photos) but not users
 */
public enum AdminRole {
    ADMIN,
    EDITOR
}
