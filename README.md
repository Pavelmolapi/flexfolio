<h1 align="center">FlexFolio</h1>
<p align="center"><strong>Full‑stack portfolio & experience management platform</strong></p>

<p align="center">
React (frontend) · Spring Boot (backend) · PostgreSQL · JWT Auth · Multi‑Portfolio · Docker
</p>

---

## 1. Overview
FlexFolio lets authenticated users build and manage multiple professional portfolios containing Experiences and Educations (with future extensions for Skills/Languages). It implements secure JWT authentication, consistent backend–frontend field mapping, and a multi‑portfolio context layer with CRUD operations.

## 2. Tech Stack
| Layer | Technologies |
|-------|-------------|
| Frontend | React 18, React Router v6, MUI, Axios |
| Backend | Spring Boot 3, Spring Security, Spring Data JPA |
| Auth | JWT (HMAC SHA‑256, 24h expiry) |
| Database | PostgreSQL (dev via Docker; H2 optional) |
| Build/Runtime | Maven, Java 17 |
| DevOps | Docker & root docker‑compose (db + backend + frontend) |

## 3. Architecture
```
Browser ─ React (Context: Auth + Profile/Portfolios)
          │
          ▼
Axios → /api/* (JWT in Authorization header)
          │
          ▼
Spring Boot (Controllers → Services → Repositories → PostgreSQL)
```

Core backend entities (DTOs returned to frontend):
• Portfolio: id, userId, experiences[], educations[]
• Experience: id, position, employer, city, country, startDate, endDate, responsibilities, ongoing, portfolioId
• Education: id, titleOfQualification, training, city, country, startDate, endDate, ongoing, portfolioId

## 4. Authentication & Security
Public endpoints: `/api/auth/register`, `/api/auth/login`, `/api/auth/validate`.
Protected endpoints require `Authorization: Bearer <token>`.
Token includes: `accessToken`, `tokenType`, `userId`, `email`, `expiresIn` (ms).
Stateless security (no HTTP session). Automatic 401 on invalid/expired token.

## 5. Multi‑Portfolio System
ProfileContext manages an array of portfolios plus `activePortfolioId`. Each portfolio contains arrays for experiences & educations (skills/languages currently local only). Operations:
• createPortfolio(name) – creates & activates
• updatePortfolio(id, updates) – rename
• deletePortfolio(id) – guarded (cannot remove last)
• switchPortfolio(id) – activate another

## 6. CRUD & ID Mapping Fix
Original mismatch: backend used `id` while frontend expected `idExp` / `idEdu`. Resolved by transforming responses:
• Experiences mapped: `id -> idExp`
• Educations mapped: `id -> idEdu`
All update/delete operations now reference correct IDs, preventing silent failures.

## 7. Key Frontend Context Responsibilities
AuthContext: stores token, user info, login/logout, token validation.
ProfileContext: portfolios, active portfolio selection, CRUD wrappers calling `portfolioService` (Axios). Local-only profile metadata (fullName, jobTitle, etc.) kept in localStorage.

## 8. API Summary
```
POST   /api/auth/register            (public)
POST   /api/auth/login               (public)
POST   /api/auth/validate            (public)

GET    /api/portfolios               (auth)
GET    /api/portfolios/{id}          (auth)
POST   /api/portfolios/{userId}      (auth)
PUT    /api/portfolios/{id}          (auth)
DELETE /api/portfolios/{id}          (auth)

POST   /api/experiences/{portfolioId}  (auth)
PUT    /api/experiences/{id}           (auth)
DELETE /api/experiences/{id}           (auth)

POST   /api/educations/{portfolioId}   (auth)
PUT    /api/educations/{id}            (auth)
DELETE /api/educations/{id}            (auth)
```

## 9. Docker & Environment
Root `docker-compose.yml` orchestrates Postgres, backend, frontend.
Frontend uses `REACT_APP_API_BASE_URL` (set to `http://localhost:8080/api` in Docker) and falls back to relative `/api` with CRA proxy for local dev.
Backend `application.yml` reads datasource/env overrides:
```
SPRING_DATASOURCE_URL
SPRING_DATASOURCE_USERNAME
SPRING_DATASOURCE_PASSWORD
SPRING_JPA_HIBERNATE_DDL_AUTO
```

### Quick Start (Docker)
```bash
docker compose up --build
# Frontend: http://localhost:3000
# Backend:  http://localhost:8080
```

### Local Dev
```bash
# Backend
cd backend
mvn spring-boot:run

# Frontend (in another terminal)
cd frontend
npm install
npm start
```

## 10. Testing Guidelines
Use Postman (or curl) for auth + protected resource verification:
```bash
curl -X POST http://localhost:8080/api/auth/register -H 'Content-Type: application/json' -d '{"email":"user@example.com","password":"pass"}'
curl -X POST http://localhost:8080/api/auth/login    -H 'Content-Type: application/json' -d '{"email":"user@example.com","password":"pass"}'
curl -H 'Authorization: Bearer <TOKEN>' http://localhost:8080/api/portfolios
```

Frontend manual tests:
• Create portfolio → add experience → refresh → persists.
• Rename portfolio → selector updates.
• Delete non-active portfolio → list shrinks.
• Attempt delete last portfolio → blocked with warning.
• Edit experience → verify update reflected.

## 11. Future Roadmap
| Feature | Description |
|---------|-------------|
| Skills/Languages backend | Add entities & endpoints mirroring local-only data |
| Public portfolio share | Generate public read-only portfolio page |
| Project entity | Support project showcases with links & media |
| Refresh tokens | Enhance auth security stance |
| Role-based auth | Admin vs user permissions |
| Export/Import | JSON export/import of portfolio data |

## 12. Contribution
Fork → branch (`feature/...` or `fix/...`) → PR. Follow conventional commits (e.g., `feat:`, `fix:`, `chore:`).

## 13. License
MIT License (add license file if not present).

---
**Status:** Active development. Multi‑portfolio, JWT auth, Docker orchestration functional. Skills/Languages currently local-only.

```
