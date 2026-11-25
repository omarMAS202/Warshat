# Warshat — Backend

Laravel REST API for the Warshat home-maintenance services platform.

This document covers the backend application only. For the full product overview and local setup of both applications, see the [root README](../README.md). For the React application, see the [Frontend README](../warshat-app-front-end/README.md).

## Backend at a Glance

| Area | Implementation |
|---|---|
| Framework | Laravel 12 |
| Language | PHP 8.2+ |
| API | Laravel API routes (`routes/api.php`) |
| Authentication | Laravel Sanctum bearer tokens |
| Authorization | Custom role middleware |
| ORM | Eloquent |
| Database | MySQL (as configured in `.env.example`) |
| Tests | PHPUnit / Laravel test runner |

## Capabilities

The current API provides:

- Client registration and login, with Sanctum token issuance.
- Authenticated logout and token revocation.
- Role-protected client and expert route groups.
- Client profile retrieval and updates.
- Expert listing, expert details, and filtering by service.
- Service-section listing and section details with related services.
- Service details with experts associated through `ExpertProfile`.
- Expert profile retrieval and update routes.

> The current route file does not define booking, appointment, payment, admin-management, or full service/section CRUD endpoints. Controller placeholders are not treated as available API functionality.

## Application Architecture

```text
HTTP Request
    │
    ▼
Laravel API Router (routes/api.php)
    │
    ├── Public routes
    │     ├── POST /register
    │     └── POST /login
    │
    └── Protected routes (auth:sanctum)
          │
          ├── role:client
          │     ├── Client profile
          │     ├── Sections and services
          │     └── Expert discovery
          │
          └── role:expert
                └── Expert profile
          │
          ▼
Controllers → Eloquent Models → MySQL
```

## Project Structure

```text
warshat-app-back-end/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── ClientController.php
│   │   │   ├── ExpertController.php
│   │   │   ├── SectionController.php
│   │   │   └── ServiceController.php
│   │   └── Middleware/
│   │       └── RoleMiddleware.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── ExpertProfile.php
│   │   ├── Section.php
│   │   └── Service.php
│   └── Providers/
├── bootstrap/
├── config/
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
├── routes/
│   ├── api.php
│   └── web.php
├── tests/
│   ├── Feature/
│   └── Unit/
├── .env.example
├── artisan
├── composer.json
└── composer.lock
```

## Requirements

- PHP 8.2 or later.
- Composer.
- MySQL.
- PHP extensions required by Laravel 12 and the installed Composer dependencies.

## Local Setup

Run the following commands from this directory (`warshat-app-back-end`).

### 1. Install PHP dependencies

```bash
composer install
```

### 2. Create the environment file

```bash
# Windows PowerShell
Copy-Item .env.example .env

# macOS / Linux
cp .env.example .env
```

### 3. Generate the application key

```bash
php artisan key:generate
```

### 4. Configure MySQL

Create a database named `warshat`, then review the database settings in `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=warshat
DB_USERNAME=root
DB_PASSWORD=
```

Update the username and password to match your local database installation.

### 5. Run migrations

```bash
php artisan migrate
```

### 6. (Optional) Seed local demo data

```bash
php artisan db:seed
```

The seeder creates sample users, service sections, services, and expert profiles. The sample accounts use the password `password`; use them only with a local development database. Never deploy these demo credentials.

### 7. Start the API server

```bash
php artisan serve
```

The API is served at `http://127.0.0.1:8000`. API routes are prefixed with `/api`.

## Environment Configuration

The committed `.env.example` provides the starting configuration. Important settings include:

| Variable | Purpose |
|---|---|
| `APP_ENV` | Laravel environment |
| `APP_DEBUG` | Debug output; keep disabled in production |
| `APP_KEY` | Application encryption key; generate locally with `php artisan key:generate` |
| `APP_URL` | Base URL of the backend |
| `DB_CONNECTION` | Database driver; configured as `mysql` |
| `DB_HOST` | Database host |
| `DB_PORT` | Database port |
| `DB_DATABASE` | Database name; example uses `warshat` |
| `DB_USERNAME` / `DB_PASSWORD` | Database credentials |
| `CACHE_STORE` | Laravel cache store |
| `SESSION_DRIVER` | Session storage driver |
| `QUEUE_CONNECTION` | Queue connection |

Never commit a populated `.env` file, credentials, application keys, or production secrets.

## API Reference

All endpoints below are defined in `routes/api.php`.

### Public routes

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/register` | Register a client account and issue a token |
| `POST` | `/api/login` | Authenticate and issue a token |

### Authenticated routes

These endpoints require `Authorization: Bearer <access_token>`.

| Method | Endpoint | Role | Description |
|---|---|---|---|
| `POST` | `/api/logout` | Authenticated | Revoke the user's tokens |
| `GET` | `/api/client/profile` | Client | Retrieve the authenticated client profile |
| `PUT` | `/api/client/profile` | Client | Update client profile details |
| `GET` | `/api/experts` | Client | List experts; accepts optional `service_id` query parameter |
| `GET` | `/api/experts/{id}` | Client | Retrieve one expert and their profile |
| `GET` | `/api/sections` | Client | List service sections |
| `GET` | `/api/sections/{section}` | Client | Retrieve a section with its services |
| `GET` | `/api/services/{id}` | Client | Retrieve service information and associated experts |
| `GET` | `/api/expert/profile` | Expert | Retrieve the authenticated expert profile |
| `PUT` | `/api/expert/profile` | Expert | Update expert and expert-profile details |

Example request header:

```http
Authorization: Bearer <access_token>
Accept: application/json
```

## Data Model

- **User:** account identity and role (`admin`, `expert`, or `client`).
- **ExpertProfile:** profile details associated with a user and a service.
- **Section:** a category/section containing services.
- **Service:** a service belonging to a section.

The route definitions currently expose role-protected groups for `client` and `expert`. The `admin` role exists in the model/seeder, but an admin API route group is not present in `routes/api.php`.

## Tests

Run the backend test suite:

```bash
php artisan test
```

The current test files cover login validation, logout authentication and token revocation, and client authorization/access to section endpoints, alongside Laravel example tests. Passing test results have not been asserted in this document; run the suite in your environment to verify the current checkout.

## Known Implementation Notes

- `GET /api/expert/profile` is registered, but the current `ExpertController::profile()` attempts to call `load()` on a JSON response. The relationship should be loaded on the user model before returning the JSON response.
- `store`, `update`, and `destroy` methods in the section/service controllers contain placeholders and are not registered as API routes in the current route file.
- The `AuthController` contains profile methods while the route file maps client profile operations to `ClientController`; review/remove unused duplicate methods as part of future cleanup.
- The API does not currently include booking, appointment scheduling, or payment endpoints.

## Security Notes

- Keep `APP_DEBUG=false` in production.
- Use a unique generated `APP_KEY` per environment.
- Do not use seeded demo accounts outside local development.
- Configure database credentials and allowed origins for the deployment environment.
- Do not commit `.env` or any secret values.
