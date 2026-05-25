# 🌸 Bugnara Borgo Fiorito

> La mappa partecipativa del borgo che sboccia.

Sito web ufficiale dell'iniziativa **Bugnara Borgo Fiorito**: una mappa interattiva che racconta come la comunità del piccolo borgo di Bugnara (AQ, Valle Peligna) stia riqualificando le proprie case e gli spazi pubblici, casa per casa, vicolo per vicolo.

Progetto nato da un'idea di due ragazzi del paese, che ha coinvolto l'intera popolazione.

---

## 🧱 Stack tecnico

**Backend**
- Java 21 LTS + Spring Boot 3.3
- Spring Web, Validation, Data JPA, Actuator
- Flyway per le migrazioni del database
- H2 in dev (in-memory), PostgreSQL 16 in prod

**Frontend**
- React 18 + TypeScript + Vite
- TanStack Query per le chiamate API
- React Router v6
- Tailwind CSS con design system editoriale
- Framer Motion per le animazioni
- react-i18next (italiano + inglese)
- Leaflet + Stadia Maps (mappa acquerello)
- ReactMarkdown per le storie

**Infrastruttura**
- Docker Compose per Postgres locale
- GitHub Actions per CI

---

## 📁 Struttura del repository

```
borghetto-fiorito/
├── backend/                 # Spring Boot API
│   ├── src/main/java/       # Codice Java
│   ├── src/main/resources/  # application.yml, migrazioni Flyway
│   ├── src/test/            # Test integrazione
│   └── pom.xml
├── frontend/                # React app
│   ├── src/
│   │   ├── components/      # UI riutilizzabile (layout, map, forms, decorative)
│   │   ├── pages/           # Le pagine del sito
│   │   ├── hooks/           # React Query hooks
│   │   ├── i18n/            # Traduzioni IT/EN
│   │   ├── lib/             # API client
│   │   └── types/           # TypeScript types
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── .github/workflows/       # CI
├── docker-compose.yml       # Postgres locale
├── .gitignore
├── .env.example             # Template variabili d'ambiente
└── README.md
```

---

## 🚀 Quick start

### Prerequisiti
- Java 21 LTS
- Node.js 20+
- Maven 3.9+
- Docker (opzionale, solo per Postgres locale)

### 1. Backend

```bash
cd backend
mvn spring-boot:run
```

L'API parte su `http://localhost:8080`.

In dev usa H2 in memoria, quindi non serve installare niente. Console H2:
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:borghetto`
- User: `sa` — Password: (vuota)

### 2. Frontend

In un altro terminale:

```bash
cd frontend
npm install
npm run dev
```

Apri `http://localhost:5173`.

### 3. PostgreSQL locale (opzionale)

```bash
docker compose up -d postgres
```

Avvia il backend in profilo prod:
```bash
SPRING_PROFILES_ACTIVE=prod \
DATABASE_URL=jdbc:postgresql://localhost:5432/borghetto \
DATABASE_USERNAME=borghetto \
DATABASE_PASSWORD=borghetto \
mvn spring-boot:run
```

---

## 🔌 API endpoints (pubblici)

| Metodo | Endpoint | Descrizione |
|---|---|---|
| GET | `/api/v1/health` | Health check |
| GET | `/api/v1/stats` | Statistiche aggregate per la home |
| GET | `/api/v1/spots` | Lista marker della mappa |
| GET | `/api/v1/spots/{id}` | Dettaglio di uno spot fiorito |
| GET | `/api/v1/stories` | Lista delle storie pubblicate |
| GET | `/api/v1/stories/{slug}` | Dettaglio di una singola storia |
| POST | `/api/v1/contact` | Invio messaggio dal form contatti |

---

## 🛠️ Comandi utili

| Cosa | Comando |
|---|---|
| Avviare backend | `cd backend && mvn spring-boot:run` |
| Test backend | `cd backend && mvn test` |
| Build backend | `cd backend && mvn clean package` |
| Avviare frontend | `cd frontend && npm run dev` |
| Type-check frontend | `cd frontend && npm run typecheck` |
| Build frontend | `cd frontend && npm run build` |
| Postgres locale | `docker compose up -d postgres` |

---

## 🔐 Sicurezza

- Le credenziali admin di default (`admin` / `changeme123`) sono **solo per lo sviluppo**. Vanno cambiate al primo login in produzione.
- Tutte le credenziali di produzione passano da variabili d'ambiente, mai hardcoded.
- Il file `.env` con le credenziali reali è ignorato da Git (`.gitignore`). Usa `.env.example` come template.
- I dati personali dei partecipanti sono pubblicati solo previo consenso esplicito (campo `consentGiven` + `consentDate`).

---

## 🗺️ Roadmap

- [x] **Fase 1** — Setup scaffolding, hello world end-to-end
- [x] **Fase 2** — Modello dati, API REST pubbliche, Flyway
- [x] **Fase 3A** — Design system editoriale + home
- [x] **Fase 3B** — Mappa interattiva, storie, partecipa, chi siamo
- [ ] **Fase 4** — Upload foto (Cloudinary) + email notifiche
- [ ] **Fase 5** — Area admin con login JWT
- [ ] **Fase 6** — Deploy in produzione (Railway/Render) + dominio custom

---

## 🤝 Crediti

Sito sviluppato per la comunità di Bugnara (AQ).
Mappe: [Stadia Maps](https://stadiamaps.com/) + [Stamen Watercolor](https://stamen.com/) + [OpenStreetMap](https://www.openstreetmap.org/).
Font: Fraunces + Cormorant Garamond + Inter (Google Fonts).
