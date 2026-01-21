# Aliquippa Wash n Fold

## Overview

A static website for a local laundromat business in Aliquippa, PA. The site serves as a landing page with an order form for wash & fold services. It's designed to be a simple, no-backend solution that handles form submissions via FormSubmit email relay service.

**Key Features:**
- Single-page marketing website with pricing information
- Order form for wash & fold pickup/delivery services
- Same-day service option with 9:00 AM ET cutoff
- Commercial service quote requests
- Mobile-friendly with click-to-call functionality

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Static HTML/CSS/JS**: The core website uses plain HTML, CSS, and vanilla JavaScript without frameworks
- **Tailwind CSS**: Used for styling via CDN in the static pages and as a build tool in the client folder
- **Dual Structure**: The project contains both static files (index.html, styles.css, script.js) at the root and a more complex React/Vite setup in the client folder
  - Root level: Pure static site deployable to GitHub Pages
  - Client folder: React + Vite + TypeScript setup with shadcn/ui components

### Form Handling
- **FormSubmit Integration**: Forms submit to FormSubmit.co service which emails order details to the business
- **No Backend Required**: All form processing happens via third-party email relay
- **Anti-Spam**: Honeypot field implementation to prevent bot submissions
- **Client-Side Validation**: Pricing calculations and time-based restrictions run in the browser

### Styling Approach
- **shadcn/ui Components**: New York style variant configured for the React app
- **CSS Variables**: Theme colors defined using HSL values for easy customization
- **Custom Animations**: Fade-in effects and smooth scrolling implemented in vanilla CSS

### Key Design Decisions
1. **Static-First Architecture**: Chosen to eliminate hosting complexity and enable GitHub Pages deployment
2. **FormSubmit over Backend**: Avoids need for server infrastructure, databases, or secrets management
3. **Time-Zone Aware Logic**: Same-day service cutoff uses Intl.DateTimeFormat for ET timezone handling
4. **Progressive Enhancement**: Core functionality works without JavaScript; enhanced with client-side features

## External Dependencies

### Third-Party Services
- **FormSubmit.co**: Email relay service for form submissions (sends to zeugenesmith@gmail.com)
- **Google Fonts**: Outfit font family loaded via CDN
- **Tailwind CDN**: Used in static HTML pages for utility-first styling

### Build Tools (for React app)
- **Vite**: Frontend build tool and dev server
- **esbuild**: Server-side bundling for production builds
- **PostCSS + Autoprefixer**: CSS processing pipeline

### UI Libraries (React app)
- **shadcn/ui**: Component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework

### Potential Database Integration
- **Drizzle ORM**: Configured in build script but not actively used; project is currently static-only
- The build script references pg (PostgreSQL) as a bundled dependency for future use