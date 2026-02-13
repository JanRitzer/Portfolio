# janritzer.dev

My personal developer portfolio — built with React, TypeScript, and Tailwind CSS, deployed on Vercel.

**Live:** [janritzer.dev](https://janritzer.dev)

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Contact API:** Vercel Serverless Function + Resend
- **Hosting:** Vercel (auto-deploys from `main`)

## Features

- Bilingual support (English / German)
- Project showcase with search and tech filtering
- Work experience timeline with company logos
- Contact form with email notifications
- 3D tilt effects and scroll-triggered animations
- Fully responsive, dark theme

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run check` | TypeScript type checking |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | API key for contact form email delivery |

## Project Structure

```
client/          → React SPA (Vite root)
  src/
    components/  → Section components + shadcn/ui primitives
    constants/   → Portfolio content (projects, skills, experience)
    hooks/       → useLanguage (i18n), useMobile, useToast
    lib/         → API client, utilities
    pages/       → Home, 404
shared/          → Zod schemas shared between client and API
api/             → Vercel serverless functions
attached_assets/ → Images and logos
```
