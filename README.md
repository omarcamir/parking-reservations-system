# Parking Reservation Frontend

## Project Overview
A **Next.js 15 / React frontend** for a Parking Reservation System.  
The system supports:

- Gate screen: visitor/subscriber check-in with real-time zone updates.
- Checkpoint screen: employee checkout with breakdown of rates and amounts.
- Admin dashboard: manage zones, categories, rush hours, vacations, and view live audit log.
- WebSocket integration for real-time updates of zones and admin actions.

---

## Features
- Visitor and subscriber check-in flow with server-computed availability.
- Ticket modal after check-in for printing or review.
- Employee checkpoint screen with ticket lookup and checkout breakdown.
- Admin dashboard with control panel:
  - Open/close zones
  - Update category rates
  - Add rush hours and vacations
  - Live audit log of admin actions
- Real-time updates via WebSocket subscriptions.
- Authentication for employees and admins using JWT.

---

## Tech Stack
- **Frontend Framework:** Next.js 15 (App Router)
- **State Management & Data Fetching:** Redux Toolkit Query (RTK Query)
- **Styling:** Tailwind CSS v4
- **Design Pattern:** Atomic Design (atoms, molecules, organisms)
- **WebSocket:** Minimal subscription for real-time updates
- **TypeScript** for type safety

---

## Project Structure
```
src/
├─ app/           # Next.js App Router pages
│  ├─ admin/      # Admin-related pages (audit-log, categories, etc.)
│  ├─ components/ # Atoms, Molecules, Organisms (Atomic Design)
│  ├─ layouts/    # Layout components (layout.tsx)
│  └─ pages/      # Individual page files (page.tsx)
├─ components/    # Shared React components (Atoms, Molecules, Organisms)
│  ├─ atoms/
│  ├─ molecules/
│  └─ organisms/
├─ hooks/         # Custom React hooks
├─ lib/           # API-related functions, services
├─ services/      # API calls, backend communication
├─ slices/        # Redux slices (state management)
├─ types/         # TypeScript types
├─ utils/         # Utility functions and helpers
├─ styles/        # Tailwind CSS or other global styles
├─ rtkQuery/      # RTK query configuration
└─ .env           # Environment variables
```

---

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/omarcamir/parking-reservations-system.git
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root:

```
NEXT_PUBLIC_BASE_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:3000/api/v1/ws
```

4. Run the development server:

```bash
npm run dev

```

5. Open in browser

