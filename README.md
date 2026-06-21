# The Wild Oasis — Hotel Admin Dashboard

A full admin dashboard for a small hotel/resort, built with React, TypeScript, and Supabase. Staff can manage cabins, bookings, and guest check-in/check-out, and get an overview of recent activity and sales from the dashboard.

## Tech stack

- **React 19** + **TypeScript** + **Vite**
- **styled-components** for styling
- **React Router 6** for routing
- **TanStack React Query 4** for server-state (fetching, caching, mutations)
- **React Hook Form** for forms
- **Supabase** for the database, auth, and file storage
- **Recharts** for the dashboard charts
- **react-hot-toast** for notifications

## Getting started

```bash
bun install
bun run dev
```

## Available scripts

| Command         | Description                                    |
| --------------- | ---------------------------------------------- |
| `bun dev`       | Start the Vite dev server                      |
| `bun run build` | Type-check (`tsc -b`) and build for production |

## Features

- **Authentication** — Supabase-backed login, protected routes, per-user account settings.
- **Cabins** — list, create, edit, duplicate, and delete cabins, with image upload and discount pricing.
- **Bookings** — filter by status (unconfirmed / checked-in / checked-out), sort by date or amount, paginated table, full booking detail view.
- **Check-in / check-out** — guided check-in flow with optional breakfast add-on, one-click check-out.
- **Dashboard** — recent bookings stats, today's arrivals/departures, a stay-duration pie chart, and a sales-over-time area chart.
- **Settings** — hotel-wide settings such as breakfast price, max booking length, and guest capacity.
- **Dark mode** — app-wide theme toggle, persisted across sessions.

## Project structure

```
src/
├─ context/        # React context providers (dark mode, sidebar drawer state)
├─ features/        # Feature-grouped components, hooks, and API calls
│  ├─ authentication/
│  ├─ bookings/
│  ├─ cabins/
│  ├─ check-in-out/
│  ├─ dashboard/
│  └─ settings/
├─ hooks/           # Shared custom hooks
├─ pages/           # Top-level route components
├─ services/        # Supabase client + API functions
├─ styles/          # Global styles and CSS variables
├─ types/           # Shared TypeScript types
├─ ui/              # Reusable, presentational UI components (Table, Modal, Form, etc.)
└─ utils/           # Formatting helpers and constants
```

## Responsive design

The app is fully responsive across desktop, tablet, and mobile:

- The sidebar collapses into an off-canvas drawer (with a hamburger toggle and backdrop) below 1100px.
- The bookings and cabins tables restructure into stacked cards below 600px instead of squeezing into unreadable columns.
- The dashboard grid collapses from 4 → 2 → 1 columns as the viewport narrows, and the stay-duration pie chart moves its legend below the chart on small screens.
- Modals, forms, and the login page all shrink to fit the viewport instead of forcing horizontal scroll.
- A custom themed scrollbar is applied app-wide and adapts automatically in dark mode.

## Credits

Based on "The Wild Oasis" project from Jonas Schmedtmann's _The Ultimate React Course_, customized and ported to TypeScript.
