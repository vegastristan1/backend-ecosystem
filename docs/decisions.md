# Phase 0 Decisions

## Project identity

- Name: Backend Ecosystem
- Visual direction: Calm, technical, beginner-friendly.
- Primary visual language: Request-flow diagrams that show one step at a time.

## Audience

- Primary audience: Backend beginners.
- Secondary audience: Frontend developers who want to understand what happens after a request leaves the browser.

## Learning scenario

- First scenario: A customer placing an order in a shopping application.
- The journey follows the request from browser to backend, cache/database, and response.

## Implementation

- Stack: React, TypeScript, and Vite.
- Content: Structured local data files; no CMS or database for the MVP.
- Repository structure:
  - `src/components/` — reusable UI components
  - `src/pages/` — application pages
  - `src/content/` — guide and journey data
  - `src/types/` — shared TypeScript types
  - `docs/` — project decisions and planning
- Hosting: Vercel.

## MVP

The MVP includes:

1. One complete beginner request journey.
2. Three starter deep-dive guides:
   - Reverse proxy / NGINX
   - Caching / Redis
   - Databases
3. A learning foundation that briefly introduces the browser and HTTP request, reverse proxy, backend API, cache, database, and response.
4. Step-by-step visuals with accessible text alternatives.
5. Search by tool, concept, and problem solved.
6. Related guides and “learn next” links.

The three starter guides are the first detailed guides, not the entire beginner foundation. The request journey introduces the basic flow first, then directs learners to the relevant deep dive.

## Explicitly deferred

- AI assistant
- User accounts
- Analytics
- Kubernetes and advanced cloud architecture
- Exhaustive technology coverage
- CMS or backend content management

## Decision log

### 2026-10-28

- Chose beginners as the primary audience to keep explanations focused.
- Chose a shopping-order scenario because it naturally demonstrates routing, application logic, caching, persistence, and responses.
- Chose structured local content because the MVP does not require user-generated or frequently edited content.
- Chose Vercel because it provides a simple deployment path for a Vite frontend.
