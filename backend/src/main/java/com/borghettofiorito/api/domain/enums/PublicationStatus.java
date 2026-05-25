package com.borghettofiorito.api.domain.enums;

/**
 * Publication lifecycle for content that admins create:
 *  - DRAFT     : work in progress, only visible in the admin area
 *  - PUBLISHED : visible to the public on the website
 *  - ARCHIVED  : hidden from the public but kept in the DB for history
 */
public enum PublicationStatus {
    DRAFT,
    PUBLISHED,
    ARCHIVED
}
