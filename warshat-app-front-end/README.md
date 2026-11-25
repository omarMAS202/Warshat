# Warshat — Frontend

React and TypeScript web application for the Warshat home-maintenance services platform.

This document covers the frontend application only. For the overall product and repository setup, see the [root README](../README.md). For Laravel API setup and endpoints, see the [Backend README](../warshat-app-back-end/README.md).

## Frontend at a Glance

| Area | Implementation |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5.9 |
| Build tool | Vite 7 |
| Routing | React Router DOM 7 |
| API client | Axios |
| Client state | Zustand 5 |
| Query provider | TanStack Query 5 |
| Forms and validation libraries | React Hook Form, Zod, `@hookform/resolvers` |
| Styling | Tailwind CSS 4 |
| UI primitives | Radix UI |
| Icons | Lucide React |
| Motion | Framer Motion |
| Notifications | Sonner, React Hot Toast |

## Application Areas

The current route configuration in `src/App.tsx` includes:

| Route | Screen |
|---|---|
| `/` | Login |
| `/register` | Client registration |
| `/home` | Home screen and section search |
| `/services` | Service-section listing |
| `/services/:id` | Services within a selected section |
| `/service/:id/experts` | Experts associated with a selected service |
| `/about` | About page |
| `/contact` | Contact page |
| `/logout` | Logout flow |
| `*` | Redirects to `/` |

The interface is Arabic-first and uses the Cairo font. The styling includes right-to-left layout conventions and responsive page components.

## Frontend Architecture

```text
Browser
  │
  ▼
React application (src/main.tsx)
  │
  ├── BrowserRouter (React Router)
  ├── QueryClientProvider (TanStack Query)
  └── App routes (src/App.tsx)
        │
        ├── Pages
        ├── Shared components and dialogs
        ├── Zustand stores
        └── Axios API client (src/lib/api.ts)
                 │
                 └── /api → Vite proxy → Laravel backend
```

## Project Structure

```text
warshat-app-front-end/
├── public/
├── src/
│   ├── assets/                 # Logos and static assets
│   ├── components/
│   │   ├── experts/            # Expert profile dialog
│   │   ├── layout/             # Navbar, footer, scroll behavior
│   │   ├── profile/            # Client profile dialog
│   │   └── ui/                 # Reusable UI primitives
│   ├── lib/                    # Axios API client and QueryClient
│   ├── pages/
│   │   ├── auth/               # Login, register, logout
│   │   └── ...                 # Home, services, experts, about, contact
│   ├── store/                  # Zustand auth, service, expert, and UI stores
│   ├── styles/                 # Global styles
│   ├── utils/                  # Formatting, JWT, and class utilities
│   ├── App.tsx                 # Route composition
│   └── main.tsx                # Application providers and entry point
├── .env.example
├── package.json
├── package-lock.json
└── vite.config.ts
```

## Requirements

- Node.js (LTS recommended).
- npm.
- The Warshat Laravel backend running locally if you want to use API-backed features.

## Local Setup

Run the commands from this directory (`warshat-app-front-end`).

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the API base URL

The Axios client uses `/api` by default. The Vite development server proxies `/api` requests to `http://127.0.0.1:8000` as configured in `vite.config.ts`.

For the default local setup, no environment file is required. To make the setting explicit, copy the example file:

```bash
# Windows PowerShell
Copy-Item .env.example .env

# macOS / Linux
cp .env.example .env
```

The example contains:

```env
VITE_API_BASE_URL=/api
```

If the API is hosted at another address, set `VITE_API_BASE_URL` to the appropriate API base URL and configure the backend CORS policy accordingly.

### 3. Start the development server

```bash
npm run dev
```

Vite prints the local development URL in the terminal (normally `http://localhost:5173`).

## Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Run TypeScript project builds and create a production bundle |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the built frontend locally |

The current `package.json` does not define a dedicated test script.

## API Integration

The Axios client is configured in `src/lib/api.ts`:

- API base URL: `import.meta.env.VITE_API_BASE_URL || "/api"`.
- Authentication: reads the access token from browser `localStorage` and attaches it as a Bearer token.
- Development proxy: Vite forwards `/api` to `http://127.0.0.1:8000`.

The current stores call these backend endpoints:

| Frontend area | API request |
|---|---|
| Authentication | `POST /login`, `POST /register`, `POST /logout` |
| Client profile | `GET /client/profile`, `PUT /client/profile` |
| Service sections | `GET /sections`, `GET /sections/{id}` |
| Service experts | `GET /services/{id}` |

The corresponding API routes and access requirements are documented in the [Backend README](../warshat-app-back-end/README.md).

## State and UI Organization

- **Zustand:** authentication, service data, expert data, and UI state are organized in dedicated stores.
- **TanStack Query:** a shared `QueryClient` and provider are configured at the application entry point.
- **Axios:** centralized API client and request interceptor.
- **Reusable UI:** shared buttons, inputs, labels, cards, badges, dialogs, and avatar components.
- **Notifications:** Sonner toaster is mounted at the application root; React Hot Toast is also included as a dependency.

## Quality Checks

Run the checks available in `package.json`:

```bash
npm run lint
npm run build
```

The build script runs `tsc -b` before `vite build`. These commands should be run locally or in CI to verify the current checkout; this README does not claim that they have already passed.

## Implementation Notes

- The application is a React single-page app using React Router, not a Next.js application.
- The default API base URL is `/api`; local proxy behavior is configured in `vite.config.ts`.
- The access token is stored in `localStorage` and attached to API requests by an Axios interceptor.
- The current repository includes client registration/login, service browsing, expert discovery, and profile screens.
- Booking, appointment scheduling, and payment flows are not represented by the current API routes.
