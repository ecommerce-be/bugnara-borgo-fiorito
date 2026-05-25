package com.borghettofiorito.api.domain.enums;

/**
 * The kind of flowered spot on the map.
 *
 * The distinction matters because PRIVATE_HOUSE spots require
 * explicit owner consent before publishing (GDPR / privacy),
 * while PUBLIC_SPACE spots do not.
 */
public enum SpotType {
    PRIVATE_HOUSE,
    PUBLIC_SPACE
}
