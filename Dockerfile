# ===============================================================
# Bugnara Borgo Fiorito - Production Docker image
# ===============================================================
# Multi-stage build producing ONE container that serves both the
# Spring Boot API and the compiled React frontend as static files.
#
# Why a single container:
#   - Same origin -> no CORS friction
#   - One service to deploy/monitor/scale on Railway
#   - Simpler env management
# ===============================================================

# ---------- STAGE 1: build the frontend ----------
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend

# Copy package files first to leverage Docker layer cache:
# only re-run npm ci when these change, not on every code edit.
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

# Copy the rest of the frontend source and build
COPY frontend/ ./
RUN npm run build
# After this stage, the compiled site is at /app/frontend/dist/


# ---------- STAGE 2: build the backend (and embed the frontend) ----------
FROM maven:3.9-eclipse-temurin-21 AS backend-build
WORKDIR /app

# Cache Maven dependencies
COPY backend/pom.xml ./pom.xml
RUN mvn -B -ntp dependency:go-offline

# Copy backend source
COPY backend/src ./src

# Copy frontend artifacts from the previous stage into Spring's static folder.
# Spring Boot automatically serves everything under classpath:/static/ as
# static resources, so /index.html, /assets/*, etc. become available.
COPY --from=frontend-build /app/frontend/dist/ ./src/main/resources/static/

# Build the JAR (skip tests; the CI on GitHub already runs them)
RUN mvn -B -ntp clean package -DskipTests


# ---------- STAGE 3: minimal runtime image ----------
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy only the fat JAR — keep the runtime image small.
COPY --from=backend-build /app/target/*.jar app.jar

# Railway injects PORT at runtime. We default to 8080 for local docker runs.
ENV PORT=8080
EXPOSE 8080

# JVM tuning for small container (Railway free tier has limited RAM).
# -XX:MaxRAMPercentage=75 lets the JVM use up to 75% of the container memory.
ENTRYPOINT ["sh", "-c", "java -XX:MaxRAMPercentage=75 -Dserver.port=${PORT} -jar app.jar"]
