# FlexFolio — Backend & Frontend Summary

This repository contains the FlexFolio full-stack application: a React frontend and a Spring Boot backend. The README below focuses on the backend implementation, how the pieces fit together, how to run the project, and what to do to remove large/unnecessary tracked files (for example `backend/data`).

---

## Quick Status
- Project: FlexFolio
- Backend: Spring Boot (Java 17)
- Frontend: React
- DB: PostgreSQL (Docker-friendly)
- Auth: JWT (JJWT + Spring Security)

---

## What this project contains (high-level)
- Entities: User, Portfolio, Experience, Education
- DTO layer with mappers (Entity ↔ DTO)
- Repositories: Spring Data JPA repositories for each entity
- Services: Business logic, validation, transactional boundaries
- Controllers: REST endpoints for auth, users, portfolios, experiences, educations
- Security: JWT token provider, authentication filter, security config
- Postman collections and API guides in project root

---

## Project flow (A → Z)
1. Client (React or Postman) sends HTTP request (JSON).
2. Controller receives DTO, validates input, calls Service.
3. Service contains business logic, uses Mapper to convert DTO ↔ Entity, calls Repository.
4. Repository persists Entities to PostgreSQL.
5. Mapper converts Entities to DTOs returned by controllers.
6. Security: AuthenticationController issues JWT on login; Jwt filter validates token on protected routes.

---

## Key Files & Structure (backend)
- `src/main/java/com/flexfolio/backend/model/` — Entities:
  - `UserEntity` (table `User_`) — id, email (unique), password (BCrypt), createdAt, portfolios
  - `PortfolioEntity` (`Portfolio`) — idPortfolio, user (ManyToOne), experiences (OneToMany), educations (OneToMany)
  - `ExperienceEntity` (`Experience`) — idExp, position, employer, city, country, startDate, endDate, ongoing, responsibilities, portfolio (ManyToOne)
  - `EducationEntity` (`Education`) — idEdu, titleOfQualification, training, ongoing, city, country, startDate, endDate, portfolio
- `repository/` — Spring Data JPA repositories for each entity
- `service/` — Services encapsulating business logic
- `controller/` — REST controllers (AuthenticationController handles register/login)
- `dto/` and `mapper/` — DTO classes and EntityMapper to convert between DTOs and Entities
- `security/` — `JwtTokenProvider`, `JwtAuthenticationFilter`, `CustomUserDetailsService`, `SecurityConfig`

---

## Important Implementation Notes
- DTOs are used in controllers to avoid exposing JPA entities directly.
- The `EntityMapper` converts between Entities and DTOs, formats dates, and prevents circular references.
- `PortfolioEntity` cascades deletes to experiences and educations (cascade = ALL, orphanRemoval = true).
- `ExperienceEntity` and `EducationEntity` include `ongoing` logic (if ongoing is true, `endDate` is set to null).
- Passwords must be saved encoded via BCrypt. Authentication endpoints are centralized in `AuthenticationController`.
- JWT: ensure the JJWT dependency version matches the code (use 0.11.x or later for `Jwts.parserBuilder()` and related APIs).

---

## How to run (backend)
Prerequisites:
- Java 17
- Maven
- Docker (recommended for PostgreSQL)

1) Start PostgreSQL (via docker-compose in `backend/docker-compose.yml`) or run a local Postgres instance.

2) Build & run backend:

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

By default the app runs on `http://localhost:8080`.

---

## Common Postman flows (short)
1. Register: POST `/api/auth/register` — body: `{ "email":"...","password":"..." }`.
2. Login: POST `/api/auth/login` — body: `{ "email":"...","password":"..." }`. Response must include a JWT (token) in the response body (or in an `Authorization` header). Copy token.
3. Use protected endpoints: include header `Authorization: Bearer <token>`.

Endpoints you will typically use:
- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/validate`
- Users: CRUD endpoints (protected except register)
- Portfolios: CRUD endpoints (protected)
- Experiences: CRUD endpoints (protected)
- Educations: CRUD endpoints (protected)

---