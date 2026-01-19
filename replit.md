# Aliquippa Wash n Fold

## Overview

A laundry pickup and delivery service website for Aliquippa Wash n Fold. Customers can view pricing, get laundry tips, and schedule pickup orders through an online form. The application calculates estimated prices based on weight, bag count, and delivery distance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for smooth entry and interaction animations
- **Forms**: React Hook Form with Zod resolver for validation
- **State Management**: TanStack Query (React Query) for server state

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript with ESM modules
- **Build Tool**: esbuild for server bundling, Vite for client
- **API Pattern**: REST endpoints with Zod schema validation

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema-to-validation integration
- **Migrations**: Drizzle Kit (`db:push` for schema sync)

### Key Design Decisions

1. **Shared Schema Pattern**: The `shared/` directory contains database schemas and API route definitions used by both client and server, ensuring type safety across the stack.

2. **Price Calculation**: Estimated prices are calculated both client-side (for preview) and server-side (for security). Pricing: $1.50/lb + $0.50/bag + delivery fee based on distance tier.

3. **Distance Tiers**: Orders are categorized by distance (less than 5 miles, 5-20 miles, or 20+ miles). The 20+ mile tier requires a phone call rather than online ordering.

4. **Monorepo Structure**:
   - `client/` - React frontend application
   - `server/` - Express backend API
   - `shared/` - Common types, schemas, and route definitions

### Build & Development
- Development: `npm run dev` runs tsx with hot reload
- Production: `npm run build` bundles server with esbuild, client with Vite
- Database: `npm run db:push` syncs schema to PostgreSQL

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **connect-pg-simple**: Session storage (available but sessions not currently implemented)

### UI/Frontend Libraries
- **Radix UI**: Accessible component primitives (dialogs, dropdowns, forms, etc.)
- **Embla Carousel**: Carousel/slider functionality
- **Lucide React**: Icon library
- **date-fns**: Date formatting utilities

### Development Tools
- **Vite**: Frontend build tool with HMR
- **Drizzle Kit**: Database migration tooling
- **TypeScript**: Type checking across the entire codebase

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay for development
- **@replit/vite-plugin-cartographer**: Development tooling (dev only)