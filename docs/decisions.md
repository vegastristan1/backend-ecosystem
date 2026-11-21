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

- Next guide topic (Phase 7): **Client and HTTP request** — provisional decision. No real-learner usage data exists yet (analytics and giscus feedback shipped but are not on `master`), and Tristan's Phase 6 personal dry run surfaced no gaps, so the pick rests on structural observation: journey step 1 and curriculum step 1 have no deep dive, and all three existing guides assume HTTP knowledge. Revisit once usage data accumulates (search/page_view/guide_view events plus any giscus comments); if observed needs point elsewhere, revise this decision. Shipped as the Phase 8 guide on 2026-11-16.
- AI assistant re-evaluation (Phase 7): the condition for re-evaluating is not met, so the deferral stands. Checked: giscus has no learner comments yet, analytics has no usage data (tracking not yet on `master`), the dry run raised no questions, and the content gaps that do exist are curriculum gaps queued in `docs/backlog.md` — not questions the content failed to answer. Re-evaluate when a specific gap appears: recurring giscus questions the guides do not answer, or `search` events with `hasResults: false` clustering on one problem. The README "AI assistant decision" constraints apply at that point (grounded in published guide content; no arbitrary backend Q&A).

### 2026-11-17

- Next guide topic (Phase 9): **Backend application and API** — structural basis again, same terms as the Phase 7 decision: journey step 3 / curriculum step 5 has no deep dive, and the reverse proxy, caching, and database guides already reference `backend-application` as a prerequisite or learn-next, so the guide turns three plain-text references into links. The usage-data revisit trigger from the 2026-11-10 decision stands unchanged. Shipped as the Phase 9 guide on 2026-11-17.
- Next guide topic (Phase 10): **Response, errors, and API contracts** — structural basis again: journey step 6 / curriculum step 13 was the last unguided journey step, so this guide completes deep-dive coverage of the whole place-order journey. The usage-data revisit trigger stands unchanged. Shipped as the Phase 10 guide on 2026-11-17.

### 2026-11-18

- Roadmap promoted into TODO: operational backlog items became Phases 12–17 — Phase 12 is the usage-data decision gate (the standing revisit trigger from 2026-11-10, now actionable since analytics and giscus are live), Phases 13–14 are the auth and message-queue guides, Phase 15 the failure-path scenario, Phase 16 the visual refinements (step-controlled guide animation, OG image), and Phase 17 an unscheduled placeholder for the next content wave. README delivery stages updated to match; promoted items removed from `docs/backlog.md`.
- Phase 12 usage-data gate outcome: **confirm Authentication and authorization** as the next guide (Phase 13); Phases 13–14 not reordered. Evidence: giscus has zero learner comments (one test comment by Tristan, 2026-11-10); Vercel aggregate shows 16 visitors / 17 page views / 94% bounce over 30 days, every visit on `/`, referrers bing.com (1) and github.com (1) — no observable learner behavior. Limitation: custom events (`search`, `guide_view`, `journey_step`) cannot be reviewed on the Hobby plan — the Events panel is Pro-only although the events are still sent — so the `hasResults: false` and journey-step triggers could not be evaluated; filed as [#5](https://github.com/vegastristan1/backend-ecosystem/issues/5). The next-guide revisit trigger and the AI-assistant event trigger are reduced to giscus + aggregate signals (bounce, `/`-only visits) until events become reviewable; no Pro upgrade until traffic justifies it.
- Next guide topic (Phase 13): **Authentication and authorization** — the pick confirmed at the Phase 12 data gate above (no learner data to override the structural basis: curriculum step 7, the first guide after the backend layer where identity checks run). Linked from the backend application guide (learn next) and the response guide (related), because auth has no journey step of its own. Shipped as the Phase 13 guide on 2026-11-18.

### 2026-11-19

- Next guide topic (Phase 14): **Background jobs and message queues** — the second guide promoted at the 2026-11-18 roadmap promotion and the last scheduled one (README curriculum step 12; no journey step, like auth). No learner data existed to reorder it — the Phase 12 gate evidence stands (zero giscus comments, aggregate-only Vercel data, event-level review blocked by [#5](https://github.com/vegastristan1/backend-ecosystem/issues/5)). Linked from the database guide (learn next — its `background-jobs` reference was already plain text) and the response guide (related), because queues sit after the response. Shipped as the Phase 14 guide on 2026-11-19.
- Failure-path scenario (Phase 15): **the database fails mid-request** — chosen over a cache failure, which cache-aside absorbs (the request still succeeds and the client sees nothing to explain). The database failure gives every step its own behavior and a client-visible outcome: the client sends the same request, the proxy routes it unchanged, the handler maps the failure to 5xx and rolls back, the cache gains nothing and nothing is invalidated, and the client receives 503 + an error body it may safely retry. Implemented as a second `RequestFlow` (`orderFailureFlow`) rendered beside the success path; the explorer's heading id and system-map label are now flow-scoped so two explorers coexist without duplicate DOM ids. Follow-up on review feedback (2026-11-19): two visually identical cards read as redundant, so the failure card got a red theme (`journey-explorer--failure`) plus a **"Failure path"** eyebrow — the label is the non-color signal (WCAG 1.4.1), and all red/text pairs are contrast-verified to clear AA. Tabs were considered and rejected as ~3× the change for the same signal.

### 2026-11-21

- Step-controlled guide diagrams (Phase 16): **highlight-in-place, not one-step-at-a-time** — all steps stay visible as the diagram, the active step gets the accent tint/border, and Previous/Next plus direct card selection move the highlight (no autoplay; state changes only on user input, per the 2026-11-09 visual-modes decision). Reuses the journey explorer's `journey-controls` and progress patterns so the two step UIs behave identically; step state is keyed by guide id so it resets on guide navigation. The 160 ms highlight transition is covered by the existing `prefers-reduced-motion` block (verified instant under reduce). Active-tint contrast: explanation 4.7:1, counter 6.6:1 (accent-dark override — accent alone is 4.3:1 on the tint), title 11.6:1.
- OG social preview (Phase 16): **static 1200×630 PNG from a regenerable HTML source** — `scripts/og-card.html` screenshotted once via headless Chrome into `public/og.png` (no new dependencies; the site palette/type only). `index.html` carries the og:* tags with the absolute production URL plus `twitter:card=summary_large_image`; a single image covers every route because the app is a hash-routed SPA sharing one `index.html`.
