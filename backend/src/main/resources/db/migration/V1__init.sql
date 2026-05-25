-- V1__init.sql
-- ============================================
-- Phase 1: scaffolding only.
-- Real domain tables (events, places, bookings, contacts, admins)
-- will be added in Phase 2 as V2__*.sql, V3__*.sql, etc.
--
-- Flyway requires at least one migration to consider the schema
-- initialized, so we create a tiny housekeeping table here.
-- ============================================

CREATE TABLE schema_meta (
    id          BIGINT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO schema_meta (id, description) VALUES (1, 'Initial schema bootstrap');
