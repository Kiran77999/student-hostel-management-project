# HostelHub — Student Hostel Management System

A React + Java 17 / Spring Boot application for hostel administration and resident self-service. Created for Boda Kiran's project submission on 26 October 2026.

## What is implemented

- Administrator and student login with BCrypt passwords, server-side sessions, CSRF protection and role checks.
- Student registration and administrator-created residents.
- Rooms, capacities, monthly fees, allocations and vacating. Transactions and row locks prevent overbooking.
- Fee invoices, offline payment references, printable receipts and outstanding balances. No online payment gateway is claimed.
- Student complaints with administrator responses and status updates.
- Leave requests with overlap validation and approval/rejection.
- Daily attendance with one record per student per date.
- Notice publishing and removal.
- Dashboard, searches, CSV exports and administrative audit history.
- Password changes and responsive layouts.

## Repository layout

The repository's original `frontend`, `backend`, `designs` and `features` are preserved. They implement a React/Express/MongoDB campus portal, with some mock UI data and unrelated academic/marketplace modules. The new deployable hostel system is entirely inside `hostel-app/`. Those legacy modules are not part of this Java release.

## Fastest local demonstration

If you received the runnable ZIP, install Java 17 or later and run the bundled JAR:

```bash
java -jar hostel-1.0.0.jar --spring.profiles.active=demo
```

Open http://localhost:8080. Demo data is persisted in `data/hostel.mv.db` relative to where you run the command. All sample residents are fictional demonstration records.

| Role | Email | Password |
|---|---|---|
| Administrator | admin@hostel.local | Admin@12345 |
| Student | student@hostel.local | Student@12345 |

Demo credentials are for local demonstration only. The production profile has no default password and does not create demo students.

## Build from source (macOS / Linux)

Prerequisites: Java **17+**, Node.js **22.12+** and internet access for the first dependency download. Maven is downloaded by the included wrapper.

From `hostel-app`:

```bash
bash scripts/build.sh
bash scripts/run-demo.sh
```

For frontend development run `npm ci && npm run dev` in `frontend/`; start Spring Boot on port 8080 in a second terminal with `./mvnw spring-boot:run` in `backend/`. Vite proxies `/api` to the backend.

For Windows, use `mvnw.cmd` in `backend`, `npm ci` / `npm run build` in `frontend`, copy `frontend/dist` into `backend/src/main/resources/static`, then run `mvnw.cmd package` and `java -jar target/hostel-1.0.0.jar`.

## Run with MySQL

With Docker Desktop installed:

```bash
cp .env.example .env
# Edit .env and replace each password placeholder.
docker compose up --build
```

Open http://localhost:8080 and sign in with the administrator credentials from `.env`. MySQL uses a named persistent volume. `docker compose down` keeps it; do not use `down -v` unless you intend to delete the database.

## Deploy on Render

`Dockerfile` builds the React frontend, packages it inside the Spring Boot JAR, and starts Java as a non-root user. The entire application shares one HTTPS origin. PostgreSQL stores records outside the application container.

1. Create a PostgreSQL 17 database in the same Render region as the web service.
2. Create a Docker Web Service from this repository's deployment branch.
3. Dockerfile path: `hostel-app/Dockerfile`. Docker context: `hostel-app`.
4. Set `SPRING_PROFILES_ACTIVE=production`, `DATABASE_URL` to the database's internal PostgreSQL URL, `ADMIN_EMAIL` to your administrator email, and a strong `ADMIN_PASSWORD` of at least 12 characters. Do not put credentials in GitHub.
5. Set the health-check path to `/api/health` if the dashboard offers it, and deploy.
6. Sign in with your configured administrator account. Create rooms and residents, allocate rooms and issue fees. Residents can also register themselves.

The included `render.yaml` is an alternative Blueprint configuration. If deploying the `hostel-app` folder as a standalone repository, change `rootDir: hostel-app` to `rootDir: .` in that file.

Render's free web service sleeps after idle periods. Its free PostgreSQL database expires after 30 days; plan an upgrade/migration and export records if retaining the project. These are hosting limitations, not application persistence guarantees. See https://render.com/docs/free.

For another MySQL host use `SPRING_PROFILES_ACTIVE=production`, `DB_URL=jdbc:mysql://HOST:3306/DATABASE`, `DB_USER`, `DB_PASSWORD`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`. For external MySQL configure TLS according to your provider. Do not set `DATABASE_URL` for MySQL.

## Architecture

React components → same-origin HTTPS API → Spring Security → REST controller → transactional service → Spring JDBC → SQL database.

- `SecurityConfig`: credentials, sessions, authorization, CSRF.
- `Requests`: validated request DTOs.
- `HostelController`: API routing.
- `HostelService`: business rules, transactions, row locks and data queries.
- `schema.sql`: MySQL/H2 schema; `schema-postgres.sql`: PostgreSQL schema.
- `SeedData`: first-run administrator creation; fictional demo records only in demo profile.

This is a layered monolith. It uses **Spring JDBC, not Hibernate/JPA**, and **server-side sessions, not JWT**. Describe the actual implementation accurately in your viva.

The relational tables are users, rooms, allocations, invoices, complaints, leave_requests, attendance, notices and audit_log. Foreign keys protect relationships; unique constraints prevent duplicate emails, roll numbers, room labels and daily attendance.

## Demonstration sequence

1. Administrator: show dashboard, room capacity and residents.
2. Add a new room and resident; allocate the resident to the room.
3. Issue a fee, record an offline payment reference and print its receipt.
4. Student: sign in, confirm room and own fees; submit a complaint and leave request.
5. Administrator: resolve the complaint, review the leave and mark attendance.
6. Student: verify the updates. Administrator: export CSV and show audit history.

For faculty outputs capture the dashboard, rooms, allocations, fee receipt, complaint/leave decisions, attendance and reports. Demo screenshots show fictional sample data, not real college records.

## Tests

From `backend`: `./mvnw test`. The integration suite covers sessions, CSRF, role restrictions, student data isolation, validation, room capacity and concurrent allocation, duplicate payment, leave overlap, registration privilege protection and attendance uniqueness. Test results are in `target/surefire-reports`.

## Limits

This is an academic application covering the workflows listed above. It does not implement online payment processing, email/password recovery, SMS, biometric attendance, marketplace or academic records. Database schema creation uses `CREATE TABLE IF NOT EXISTS`; use versioned migrations for later production schema changes. Sessions are in memory, so users sign in again after a server restart. Production deployment starts with an empty operational database and one administrator.
