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
- Selected the initial interactive flow: client, HTTP request, reverse proxy, backend application, cache, database, and response. This is an initial MVP decision and may change as new information emerges.
- Approved the first example journey: a learner clicks "Place Order," the browser creates an HTTP request, the reverse proxy routes it, the backend validates and processes it, the cache is checked, the database is read or updated, and the response returns to the browser. This journey may be revised as new information emerges.
- Grouped supporting infrastructure around the main journey: DNS and TLS before the flow, containers, cloud hosting, and monitoring around the running system, and background jobs or queues as optional asynchronous work after the response.
- Defined the learner outcomes for the journey: understand client requests and responses, routing at the reverse proxy, validation and business rules in the backend, cache speed and staleness tradeoffs, durable database storage, success and failure responses, and the supporting role of infrastructure topics.

### 2026-10-30

- Added a typed local content model in `src/content/types.ts` for guides, sources, publication review, diagrams, and request-flow steps.
- Chose explicit guide statuses: `draft`, `review`, `published`, and `archived`.
- Represented visuals as structured data with a diagram kind, explanation, fallback text, and optional step states so every visual can support accessible non-animated use.
- Added aliases and searchable problem descriptions to support search by product, concept, or learner goal.
- Added publication-review metadata for uncertain tool names. A guide must record whether names are confirmed, whether review is still required, and any review notes.
- Added the approved place-order request flow and a reusable guide template under `src/content/`.

### 2026-11-02

- Added a reusable application shell for the site header, main content area, and footer. Journey, Guides, and Search appear as non-clickable “Coming soon” items until their destinations are built in Phase 5, avoiding dead links.
- Chose a system sans-serif font stack and CSS color variables so the shell has consistent styling without an external font dependency.
- Made the header and navigation stack on narrow screens while retaining a horizontal layout on wider screens.
- Added a keyboard-visible “Skip to content” link and a focusable main landmark so keyboard users can bypass the header. Kept future navigation entries as non-focusable text until their pages exist.
- Rendered the three starter diagrams as static figures with ordered text steps and a visible text alternative. Kept visual descriptions available in the normal page reading order; diagrams do not rely on animation or color to communicate their content.
- Added a reusable guide page driven by the typed `Guide` content. It presents the concept, position, visual, steps, example, benefits, tradeoffs, alternatives, guide relationships, sources, review status, and review date. Related-guide names remain plain text until Phase 5 implements navigation.
- Built the home page around the approved place-order scenario and concept-before-product principle. Its “Start the journey” action scrolls to a static preview of the structured request flow; interactive step controls remain a separate Phase 5 task. Guide and search destinations stay labeled as coming soon until implemented.

### 2026-11-09

- Visuals support both modes: step-controlled (the learner clicks Previous/Next or selects a step) and the existing static text fallback. No autoplay animation anywhere; a step transition may animate only in response to user input, and `prefers-reduced-motion` users get instant swaps. Step-controlled animation for guide-page diagrams is deferred to the backlog; the request flow is already step-controlled and guide diagrams already have static fallbacks.
- Source and review process (lightweight): sources must be official documentation or vendor blogs (tutorials may not be primary sources); guides move `draft` → `review` → `published`, with publishing gated on the Phase 6 learner review; a published guide whose `lastReviewed` is older than six months drops back to `review`; uncertain tool names stay flagged and unpublished until confirmed against a clearer source.
- Resolved all five README open decisions: name/identity, stack/hosting, visual mode, review cadence, and scope fallback (backend beginners + place-order scenario).

### 2026-11-10

- Next guide topic (Phase 7): **Client and HTTP request** — provisional decision. No real-learner usage data exists yet (analytics and giscus feedback shipped but are not on `master`), and Tristan's Phase 6 personal dry run surfaced no gaps, so the pick rests on structural observation: journey step 1 and curriculum step 1 have no deep dive, and all three existing guides assume HTTP knowledge. Revisit once usage data accumulates (search/page_view/guide_view events plus any giscus comments); if observed needs point elsewhere, revise this decision.
- AI assistant re-evaluation (Phase 7): the condition for re-evaluating is not met, so the deferral stands. Checked: giscus has no learner comments yet, analytics has no usage data (tracking not yet on `master`), the dry run raised no questions, and the content gaps that do exist are curriculum gaps queued in `docs/backlog.md` — not questions the content failed to answer. Re-evaluate when a specific gap appears: recurring giscus questions the guides do not answer, or `search` events with `hasResults: false` clustering on one problem. The README "AI assistant decision" constraints apply at that point (grounded in published guide content; no arbitrary backend Q&A).
