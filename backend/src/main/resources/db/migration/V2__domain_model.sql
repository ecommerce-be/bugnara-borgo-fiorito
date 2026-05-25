-- =================================================================
-- V2__domain_model.sql
-- Creates all the domain tables for Bugnara Fiorito Phase 2.
-- Compatible with both H2 (MODE=PostgreSQL) and real PostgreSQL.
-- =================================================================

-- ---------- flowered_spots ----------
CREATE TABLE flowered_spots (
    id                  BIGSERIAL PRIMARY KEY,
    title               VARCHAR(150) NOT NULL,
    description         VARCHAR(2000),
    type                VARCHAR(30)  NOT NULL,
    status              VARCHAR(20)  NOT NULL DEFAULT 'DRAFT',
    latitude            NUMERIC(9,6) NOT NULL,
    longitude           NUMERIC(9,6) NOT NULL,
    address_hint        VARCHAR(200),
    consent_given       BOOLEAN      NOT NULL DEFAULT FALSE,
    consent_date        DATE,
    show_participants   BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_spot_type
        CHECK (type IN ('PRIVATE_HOUSE', 'PUBLIC_SPACE')),
    CONSTRAINT chk_spot_status
        CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED'))
);

CREATE INDEX idx_spots_status ON flowered_spots(status);
CREATE INDEX idx_spots_type   ON flowered_spots(type);

-- ---------- spot_photos ----------
CREATE TABLE spot_photos (
    id                BIGSERIAL PRIMARY KEY,
    spot_id           BIGINT       NOT NULL,
    image_url         VARCHAR(500) NOT NULL,
    caption           VARCHAR(250),
    is_before_photo   BOOLEAN      NOT NULL DEFAULT FALSE,
    display_order     INT          NOT NULL DEFAULT 0,
    created_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_photo_spot
        FOREIGN KEY (spot_id) REFERENCES flowered_spots(id) ON DELETE CASCADE
);

CREATE INDEX idx_photos_spot ON spot_photos(spot_id);

-- ---------- participants ----------
CREATE TABLE participants (
    id             BIGSERIAL PRIMARY KEY,
    display_name   VARCHAR(150) NOT NULL,
    bio            VARCHAR(1000),
    show_on_site   BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ---------- spot_participants (join table) ----------
CREATE TABLE spot_participants (
    spot_id         BIGINT NOT NULL,
    participant_id  BIGINT NOT NULL,
    PRIMARY KEY (spot_id, participant_id),
    CONSTRAINT fk_sp_spot
        FOREIGN KEY (spot_id) REFERENCES flowered_spots(id) ON DELETE CASCADE,
    CONSTRAINT fk_sp_participant
        FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE
);

-- ---------- stories ----------
CREATE TABLE stories (
    id                  BIGSERIAL PRIMARY KEY,
    title               VARCHAR(200) NOT NULL,
    slug                VARCHAR(220) NOT NULL,
    excerpt             VARCHAR(500),
    content_markdown    TEXT,
    cover_image_url     VARCHAR(500),
    author_name         VARCHAR(150),
    published_at        DATE,
    status              VARCHAR(20)  NOT NULL DEFAULT 'DRAFT',
    created_at          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_stories_slug UNIQUE (slug),
    CONSTRAINT chk_story_status
        CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED'))
);

CREATE INDEX idx_stories_status ON stories(status);

-- ---------- contact_messages ----------
CREATE TABLE contact_messages (
    id            BIGSERIAL PRIMARY KEY,
    name          VARCHAR(150) NOT NULL,
    email         VARCHAR(200) NOT NULL,
    phone         VARCHAR(30),
    subject       VARCHAR(30)  NOT NULL DEFAULT 'GENERIC_INFO',
    message       TEXT         NOT NULL,
    is_read       BOOLEAN      NOT NULL DEFAULT FALSE,
    is_archived   BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_contact_subject
        CHECK (subject IN ('GENERIC_INFO', 'JOIN_INITIATIVE', 'SUGGEST_SPOT', 'OTHER'))
);

CREATE INDEX idx_messages_read     ON contact_messages(is_read);
CREATE INDEX idx_messages_archived ON contact_messages(is_archived);

-- ---------- admin_users ----------
CREATE TABLE admin_users (
    id              BIGSERIAL PRIMARY KEY,
    username        VARCHAR(100) NOT NULL,
    password_hash   VARCHAR(100) NOT NULL,
    display_name    VARCHAR(150) NOT NULL,
    email           VARCHAR(200),
    role            VARCHAR(20)  NOT NULL DEFAULT 'EDITOR',
    enabled         BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_admin_username UNIQUE (username),
    CONSTRAINT chk_admin_role
        CHECK (role IN ('ADMIN', 'EDITOR'))
);
