-- =================================================================
-- V3__seed_data.sql
-- Inserts a small set of demo data so the site has something to show
-- as soon as it boots. All coordinates are around Bugnara (AQ),
-- 42.0247° N, 13.8622° E.
--
-- The admin password is the BCrypt hash of "changeme123".
-- IMPORTANT: change this on the very first login in production!
-- =================================================================

-- ---------- Demo participants ----------
INSERT INTO participants (display_name, bio, show_on_site) VALUES
('Famiglia esempio 1', 'Famiglia storica del borgo, abita in Via del Castello.', TRUE),
('Gruppo Volontari Piazza', 'Gruppo di volontari che cura la piazza centrale.', TRUE);

-- ---------- Demo flowered spots ----------
-- Spot 1: a private house (with consent already granted)
INSERT INTO flowered_spots (
    title, description, type, status,
    latitude, longitude, address_hint,
    consent_given, consent_date, show_participants
) VALUES (
    'Casa fiorita in Via del Castello',
    'Una casa accogliente abbellita con gerani e bouganville. Un piccolo angolo di colore nel cuore del borgo.',
    'PRIVATE_HOUSE', 'PUBLISHED',
    42.024700, 13.862200, 'Via del Castello',
    TRUE, CURRENT_DATE, TRUE
);

-- Spot 2: a public space
INSERT INTO flowered_spots (
    title, description, type, status,
    latitude, longitude, address_hint,
    consent_given, consent_date, show_participants
) VALUES (
    'Piazza con fontana fiorita',
    'La piazza principale, decorata con vasi di fiori intorno alla fontana storica.',
    'PUBLIC_SPACE', 'PUBLISHED',
    42.025100, 13.861900, 'Piazza del Municipio',
    FALSE, NULL, TRUE
);

-- ---------- Link participants to spots ----------
INSERT INTO spot_participants (spot_id, participant_id) VALUES (1, 1);
INSERT INTO spot_participants (spot_id, participant_id) VALUES (2, 2);

-- ---------- Demo story ----------
INSERT INTO stories (
    title, slug, excerpt, content_markdown,
    author_name, published_at, status
) VALUES (
    'Come è nata Bugnara Fiorito',
    'come-e-nata-bugnara-fiorito',
    'L''iniziativa di due ragazzi che hanno coinvolto tutto il borgo nel progetto di riqualificazione.',
    '## Una mattina d''inverno\n\nTutto è cominciato con una semplice idea: e se ogni casa del borgo avesse un suo angolo fiorito?\n\nDa lì, la voce si è sparsa, le famiglie hanno aderito, e oggi la mappa che vedete è il risultato di mesi di lavoro condiviso.',
    'Redazione Bugnara Fiorito',
    CURRENT_DATE,
    'PUBLISHED'
);

-- ---------- Default admin user ----------
-- Password: changeme123  (BCrypt $2a$10$...)
INSERT INTO admin_users (username, password_hash, display_name, email, role, enabled) VALUES
('admin',
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'Amministratore', 'admin@bugnarafiorito.local', 'ADMIN', TRUE);
