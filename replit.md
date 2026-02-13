# Developer Portfolio

## Overview

A modern, responsive developer portfolio website built with React, Vite, and Tailwind CSS. The design follows a dark mode, minimalist, futuristic aesthetic with glassmorphism effects. The portfolio showcases projects with video demos, displays a tech stack marquee, and includes a contact form with backend API support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom dark theme and glassmorphism effects
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for smooth entrance animations and hover effects
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints under `/api` prefix
- **Development Server**: Vite dev server with HMR proxied through Express

### Data Storage
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `shared/schema.ts` contains all database table definitions
- **Current Storage**: In-memory storage implementation (`MemStorage` class) as a fallback when database is not provisioned
- **Database Migrations**: Drizzle Kit for schema migrations (output to `./migrations`)

### Project Structure
```
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/   # React components including UI primitives
│   │   ├── constants/    # Static data (projects, tech stack, content)
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions and API client
│   │   └── pages/        # Page components
├── server/           # Backend Express application
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Data storage abstraction
│   └── vite.ts       # Vite dev server integration
├── shared/           # Shared code between client and server
│   └── schema.ts     # Database schema and Zod validation schemas
```

### Key Design Decisions

1. **Monorepo Structure**: Client and server share the same repository with shared code in the `shared/` directory, enabling type-safe API contracts through shared Zod schemas.

2. **Content as Data**: All portfolio content (projects, tech stack, about content) is stored in `client/src/constants/index.ts` as a data file, making it easy to update without touching component code.

3. **Glassmorphism Theme**: CSS variables in `client/src/index.css` define a dark theme with electric blue/purple accents, supporting the futuristic aesthetic described in design guidelines.

4. **Video Modal Pattern**: Projects support video demos through a reusable `VideoModal` component that overlays the page.

5. **API Abstraction**: The `apiRequest` function in `lib/queryClient.ts` provides a consistent interface for all API calls with error handling.

## External Dependencies

### Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **framer-motion**: Animation library for UI transitions
- **lucide-react**: Icon library
- **react-icons**: Additional icons (social media brands)
- **wouter**: Lightweight router
- **react-hook-form**: Form state management
- **zod**: Schema validation (shared with backend)

### Backend Libraries
- **express**: Web framework
- **drizzle-orm**: Database ORM
- **drizzle-zod**: Zod schema generation from Drizzle tables
- **connect-pg-simple**: PostgreSQL session store (available when database is provisioned)

### Database
- **PostgreSQL**: Primary database (requires `DATABASE_URL` environment variable)
- Schema push command: `npm run db:push`

### Build Tools
- **esbuild**: Server bundling for production
- **vite**: Frontend bundling and dev server
- **tsx**: TypeScript execution for development

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required for database features)
- `NODE_ENV`: Environment mode (development/production)