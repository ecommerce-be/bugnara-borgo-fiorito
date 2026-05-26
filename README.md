# 🌸 Bugnara Borgo Fiorito

Mappa partecipativa del borgo di Bugnara (AQ, Valle Peligna), dove ogni puntino rappresenta una casa o uno spazio pubblico abbellito dalla comunità.

---

## Architettura

```
bugnara-borgo-fiorito/
├── backend/        # Spring Boot 3.3 + Java 21 + PostgreSQL/H2 + Flyway
├── frontend/       # React 18 + TypeScript + Vite + Tailwind + Leaflet
├── Dockerfile      # Multi-stage build per deploy in produzione
├── railway.json    # Configurazione Railway
└── docker-compose.yml  # Solo PostgreSQL per sviluppo locale
```

## Sviluppo locale

### Prerequisiti
- Java 21 (Temurin / Adoptium consigliato)
- Maven 3.9+
- Node.js 20+
- (opzionale) Docker per PostgreSQL locale

### Setup
1. Copia `.env.example` in `.env` e compila le variabili
2. Avvia il backend:
   ```powershell
   .\bugnara-env.ps1
   .\load-env.ps1
   cd backend
   mvn spring-boot:run
   ```
3. In un altro terminale, avvia il frontend:
   ```powershell
   cd frontend
   npm install
   npm run dev
   ```
4. Apri http://localhost:5173

### Variabili d'ambiente principali
Vedi `.env.example` per la lista completa. Le più importanti:
- `JWT_SECRET`: stringa di almeno 32 caratteri per firmare i JWT
- `CLOUDINARY_*`: credenziali per upload foto
- `RESEND_*`: credenziali per email transazionali

## Deploy in produzione (Railway)

### Architettura prod
Un singolo container Docker che contiene:
- Backend Spring Boot in esecuzione sulla porta `$PORT`
- Frontend React compilato in `classpath:/static/`, servito direttamente da Spring

Stesso origine → niente CORS in produzione.

### Step deploy

1. Crea un account su https://railway.app (login con GitHub)
2. **New Project** → **Deploy from GitHub repo** → seleziona `bugnara-borgo-fiorito`
3. **Add Service** → **Database** → **PostgreSQL**
4. Configura le variabili d'ambiente nel servizio backend (vedi sotto)
5. Railway deployerà automaticamente a ogni push su `main`

### Variabili d'ambiente richieste in prod

```
SPRING_PROFILES_ACTIVE=prod
JWT_SECRET=<64 caratteri random>
APP_CORS_ALLOWED_ORIGINS=https://<tuo-dominio-railway>.up.railway.app
CLOUDINARY_CLOUD_NAME=<...>
CLOUDINARY_API_KEY=<...>
CLOUDINARY_API_SECRET=<...>
CLOUDINARY_UPLOAD_PRESET=bugnara_spots
RESEND_API_KEY=<...>
RESEND_FROM=Bugnara Borgo Fiorito <onboarding@resend.dev>
RESEND_ADMIN_INBOX=<email destinatario>
```

Le variabili `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` vengono iniettate automaticamente da Railway quando colleghi il servizio PostgreSQL.

## CI

GitHub Actions esegue su ogni push:
- Backend: `mvn verify` (compila + testa)
- Frontend: `npm ci` + `typecheck` + `build`

## Licenza

Progetto comunitario di e per Bugnara. Codice aperto, contenuti dei cittadini.
