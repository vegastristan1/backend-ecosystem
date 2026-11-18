# Backend Ecosystem TODO

This is the step-by-step implementation checklist for the first release. Complete each phase in order, but revisit earlier tasks when user feedback or technical discoveries require it.

Phases 0–11 are shipped (MVP released and maintained). Phases 12–17 are the roadmap promoted from `docs/backlog.md` on 2026-11-18: 12–16 are scheduled work, 17 is an unscheduled placeholder for later content waves.

## Phase 0: Confirm the foundation

- [x] Choose the project name and basic visual direction.
- [x] Choose the implementation stack, repository structure, and hosting target.
- [x] Confirm the primary audience: backend beginners, frontend developers, or both.
- [x] Choose the first scenario: for example, placing an order in a shopping application.
- [x] Define the smallest successful MVP and record anything explicitly deferred.
- [x] Create a short decision log for changes to scope, content, and architecture.

## Phase 1: Define the learning journey

- [x] Write the complete request journey from client request to response.
- [x] Select the steps that appear in the first interactive flow.
- [x] Decide which infrastructure topics are shown around the request flow.
- [x] Define what the learner should understand after each step.
- [x] Map prerequisites, related guides, and recommended next topics.
- [x] Sketch the home page, request journey, guide page, and search experience.
- [x] Check that the journey explains concepts before naming products.

## Phase 2: Design the content model

- [x] Turn the content model into a concrete schema or data format.
- [x] Add fields for guide status, sources, and `lastReviewed`.
- [x] Decide how diagrams and request-flow steps are represented in data.
- [x] Define categories, tags, aliases, and searchable problem descriptions.
- [x] Define how uncertain tool names are reviewed before publication.
- [x] Create a content template based on purpose, position, visual explanation, example, tradeoffs, prerequisites, and related guides.

## Phase 3: Create and review the starter content

- [x] Draft the NGINX / reverse proxy guide.
- [x] Draft the caching / Redis guide.
- [x] Draft the database guide.
- [x] Create the request-routing visual.
- [x] Create the cache hit / miss visual.
- [x] Create the database read / write visual.
- [x] Add plain-language examples and explain the relevant tradeoffs.
- [x] Add alternatives, prerequisites, related guides, and source links.
- [x] Review every guide for accuracy, consistent terminology, and beginner readability.

## Phase 4: Build the application shell

- [x] Set up the application, development workflow, and deployment preview.
- [x] Implement the shared layout, navigation, typography, colors, and responsive behavior.
- [x] Implement accessible headings, focus states, keyboard navigation, and semantic structure.
- [x] Add diagram text alternatives and a non-animated fallback for every visual.
- [x] Add a reusable guide-page layout driven by structured content.

## Phase 5: Build the MVP experience

- [x] Build the home page and explain the purpose of the learning journey.
- [x] Build the interactive or step-controlled request flow.
- [x] Highlight the active component as the learner moves through the request.
- [x] Link each component to its guide and related concepts.
- [x] Build the three starter guide pages.
- [x] Add search by tool name, concept, and problem solved.
- [x] Add related guides and "learn next" links.
- [x] Add loading, empty, error, and no-results states.
- [x] Verify the experience on mobile, tablet, and desktop layouts.

## Phase 6: Validate the first release

- [x] Test the complete request journey from the home page through all starter guides.
- [x] Test search aliases such as "Redis," "cache," and "make repeated reads faster."
- [x] Test keyboard-only navigation and screen-reader-friendly descriptions.
- [x] Check links, source references, diagrams, and responsive layouts.
- [x] Ask representative learners to explain each starter component in their own words.
  - Deferred within Phase 6: no real learners yet — Tristan's personal dry run counts. Representative learners reopen in Phase 7 with the feedback feature (Phase 7 item 2), using `docs/learner-review.md`.
- [x] Record where learners hesitate, misunderstand, or skip content.
  - Recorded 2026-11-09 from Tristan's personal dry run: no breadcrumbs, no back-to-top, header nav not always visible (persistent side nav wanted), color/contrast question — full dated notes in the Obsidian project note.
- [x] Fix the highest-impact content and usability issues.
  - Five fixes, one commit each: breadcrumbs `80e3d51`, back-to-top `e50c060`, sticky header + anchor offsets `a652e8d`, persistent sidebar `d54c5d2`, WCAG shade fixes `a210bb8`. Contrast audit and keyboard/SR regression both pass after the changes.
- [x] Confirm the success criteria in the proposal before calling the MVP complete.
  - All six README success criteria confirmed by Tristan on 2026-11-09: criteria 2–6 evidenced by the Phase 6 test runs; criterion 1 (own-words explanations) confirmed via his personal dry run, with real-learner confirmation deferred to Phase 7 per item 5.

## Phase 7: Release and maintain

- [x] Publish the first release and verify the production deployment.
  - Merged `phase-7-release-maintain` → `master` (`803f2fb`), pushed, Vercel deployed the new build. Production checks 8/8: home/journey, sidebar + sticky header, feedback section, breadcrumbs, search by problem phrase, live giscus iframe, 375px no-overflow with sidebar hidden. Live at https://backend-ecosystem.vercel.app/.
- [x] Add a lightweight way to collect learner feedback.
  - giscus comments on every page (`FeedbackSection.tsx`): per-route threads via specific mapping (Home/Guides/Search/guide name), reactions enabled, GitHub Discussions backend. Discussions enabled on the repo; category "General". Verified 19/19 + keyboard/SR and contrast regressions green.
  - Resolved 2026-11-16: giscus GitHub App installed on the repo; end-to-end check passed (comment via live site landed in Discussions → General → Home). [#2](https://github.com/vegastristan1/backend-ecosystem/issues/2) closed.
- [x] Track which guides, searches, and request-flow steps are used.
  - Vercel Web Analytics (cookieless, enabled in dashboard; `@vercel/analytics@2.0.1`): `<Analytics />` in `main.tsx` + custom events `page_view` (per hash route), `search` (debounced 800 ms), `guide_view`, `journey_step`. Verified 11/11 locally + journey/keyboard/contrast/feedback regressions green; production data lands after merge+push.
- [x] Schedule source and content reviews using `lastReviewed`.
  - `docs/review-schedule.md` documents the approved 6-month cadence (from `docs/decisions.md`), what a review covers (content + source links), and how to record it. `npm run reviews` (`scripts/check-reviews.mjs`, zero-dep) reads `lastReviewed` from every guide registered in `src/content/guides.ts` and prints on track/OVERDUE with exit 1 when due — CI-ready. Self-checked both paths (today → on track/exit 0; `REVIEWS_TODAY=2027-05-01` → OVERDUE/exit 1).
- [x] Maintain a backlog for new guides, scenarios, accessibility improvements, and visual refinements.
  - `docs/backlog.md`: operational queue in the four categories — guide candidates for the three unguided journey steps plus README-deferred topics, failure-path scenario, route-change focus management + reduced-motion guard (both verified gaps), step-controlled guide animation and OG social preview. Roadmap items stay in README's "Later additions" (linked, not duplicated); maintenance rule documented in the file.
- [x] Decide which later topic should be added based on observed learner needs.
  - Provisional decision recorded in `docs/decisions.md` (2026-11-10): next guide = **Client and HTTP request** (journey step 1 / curriculum step 1; assumed knowledge of all existing guides). Basis: no usage data yet (tracking not on `master`), dry run surfaced no gaps, structural dead-end observed. Revisit trigger: analytics + giscus data — revise if observed needs point elsewhere.
- [x] Re-evaluate the AI assistant only after the content and feedback show a specific gap.
  - Condition evaluated in `docs/decisions.md` (2026-11-10): not met — no giscus comments, no analytics data yet, dry run raised no questions; existing gaps are curriculum items in the backlog, not unanswered learner questions. Deferral stands; concrete re-evaluation triggers recorded (recurring unanswered giscus questions, or `search` events with `hasResults: false` clustering).

## Phase 8: Client and HTTP request guide

- [x] Draft the Client and HTTP request guide (journey step 1 / README curriculum step 1).
  - `src/content/clientHttpGuide.ts`: methods, headers, status codes, JSON, request/response cycle; 5 MDN sources verified live (HTTP 200) and dated 2026-11-16.
- [x] Register the guide and link it from journey step 1.
  - Added to `src/content/guides.ts` (flows automatically into sidebar, guides page, search, feedback terms); `guideId: 'client-http'` on step 1 of `requestFlow.ts` — removes the step-1 structural dead-end. `reverseProxyGuide.prerequisites: ['client-http']` now resolves to a link automatically.
- [x] Verify build, review schedule, and search regressions.
  - `npm run build` green; `npm run reviews` shows 4/4 guides on track (new guide next due 2027-05-16); new guide's searchable fields contain no "cache"/"redis"/"repeated reads" tokens, so existing search tests are unaffected.
- [x] Remove the shipped item from the backlog and mark the decision shipped.
  - Backlog "New guides" list now starts at backend application; `docs/decisions.md` 2026-11-10 entry annotated as shipped.

## Phase 9: Backend application and API guide

- [x] Draft the Backend application and API guide (journey step 3 / README curriculum step 5).
  - `src/content/backendApplicationGuide.ts`: route matching, validation, business rules, data coordination, response; 4 official sources verified live (HTTP 200, Django 404 candidate dropped) and dated 2026-11-17; `status: 'review'` consistent with the other guides.
- [x] Register the guide and link it from journey step 3.
  - Added to `src/content/guides.ts`; `guideId: 'backend-application'` on step 3 of `requestFlow.ts`. The reverse-proxy learn-next and the caching/database prerequisites now resolve to real links instead of plain text.
- [x] Verify build, review schedule, and search regressions.
  - `npm run build` green; `npm run reviews` shows 5/5 guides on track (new guide next due 2027-05-17); searchable fields contain no "cache"/"redis"/"nginx"/"repeated reads" tokens, and the "route browser requests" query still fails the new guide on browser/requests.
- [x] Update the documents that reference the guide set.
  - `README.md` MVP list (was stale since Phase 8: three → five guides), `docs/learning-journey.md` deep-dives paragraph (same staleness), `docs/backlog.md` (item shipped; one unguided step left, 5 guides), `docs/decisions.md` new 2026-11-17 section recording the Phase 9 pick.

## Phase 10: Response, errors, and API contracts guide

- [x] Draft the Response, errors, and API contracts guide (journey step 6 / README curriculum step 13).
  - `src/content/responseGuide.ts`: status-code selection, JSON success/error bodies, response headers, 4xx/5xx failure paths; 5 sources verified live (HTTP 200 — MDN status codes/headers/JSON, RFC 9110, OpenAPI specification) and dated 2026-11-17; `status: 'review'` consistent with the other guides. One `title` colon typo caught by `tsc` and fixed before commit.
- [x] Register the guide and link it from journey step 6.
  - Added to `src/content/guides.ts`; `guideId: 'response'` on step 6 of `requestFlow.ts`. Every journey step now links to its guide — no "coming later" notes remain in the flow.
- [x] Verify build, review schedule, and search regressions.
  - `npm run build` green; `npm run reviews` shows 6/6 guides on track (new guide next due 2027-05-17); searchable fields contain no "cache"/"redis"/"nginx"/"repeated reads"/"database" tokens.
- [x] Update the documents that reference the guide set.
  - `README.md` MVP list now names all six journey-step guides, `docs/learning-journey.md` deep-dives paragraph states full coverage, `docs/backlog.md` (all six steps covered; 6 guides — auth and message-queue candidates remain), `docs/decisions.md` Phase 10 pick recorded under 2026-11-17.

## Phase 11: Accessibility — route focus and reduced motion

- [x] Move focus to the new page's heading on route changes.
  - `App.tsx`: route label derived once in the component; an effect focuses `main h1` (inline `tabIndex=-1`) when the route actually changes. First run skipped so page load does not steal focus; same-route hash changes (in-page anchors like `#journey-preview`) do not refire it.
- [x] Fix the skip link so it no longer routes home — bug found during this phase, filed as [#4](https://github.com/vegastristan1/backend-ecosystem/issues/4).
  - `AppShell.tsx`: `onClick` calls `preventDefault()` and focuses `#main-content` directly; the URL no longer changes, root cause fixed once in the shared shell (skip links should never mutate the hash).
- [x] Honor `prefers-reduced-motion` for the remaining 160 ms transitions.
  - `styles.css`: a `prefers-reduced-motion: reduce` block zeroes transition/animation durations and forces instant scrolling — covers the journey-chip rule (the only transition in the file) and any future ones, as promised in `docs/decisions.md`.
- [x] Verify the build.
  - `npm run build` green (tsc + vite).
- [x] Browser-check the three behaviors at the gate (skip link stays on page · route change announces the heading · reduced-motion swaps are instant).
  - Tristan approved the gate on 2026-11-17; production bundle verified serving the skip-link handler and `prefers-reduced-motion` CSS.

## Phase 12: Review learner data and pick the next guide

Decision gate promised in `docs/decisions.md` (2026-11-10): every "next guide" pick has a usage-data revisit trigger — analytics and giscus are live in production, so observed needs decide before structural picks.

- [x] Review Vercel analytics (search, page_view, guide_view, journey_step) and giscus comments for observed learner needs.
  - Giscus: 1 discussion, 1 comment — Tristan's own test (2026-11-10), reactions on test thread; zero learner feedback. Vercel aggregate (30d): 16 visitors / 17 views / 94% bounce, all on `/`, referrers bing 1 / github 1. Custom events sent but Events panel is Pro-only on Hobby — event-level review impossible; filed [#5](https://github.com/vegastristan1/backend-ecosystem/issues/5).
- [x] Confirm or revise the next-guide pick (structural default: Authentication and authorization) and record it in `docs/decisions.md`.
  - Confirmed (no external learner data to override it); recorded under 2026-11-18 in `docs/decisions.md`, including the reduced triggers (giscus + aggregate until events are reviewable).
- [x] Reorder Phases 13–14 if the data points elsewhere.
  - No reorder — data pointed nowhere; structural order stands.

## Phase 13: Authentication and authorization guide

- [x] Draft the Authentication and authorization guide (README curriculum step 7).
  - `src/content/authGuide.ts`: authn vs authz, session cookie vs signed token, 401 vs 403, issue/refresh/revoke; 5 sources verified live (HTTP 200 — MDN HTTP authentication, RFC 6265 cookies, RFC 6749 OAuth 2.0, RFC 7519 JWT, OpenID Connect Core 1.0) and dated 2026-11-18; `status: 'review'` consistent with the other guides.
- [x] Register the guide and link it from the related guides (prerequisites / learn-next — auth has no journey step of its own).
  - Added to `src/content/guides.ts` (sidebar, guides page, search, feedback terms pick it up); `backend-application` learn-next adds `auth`, `response` related-guides adds `auth`; auth's prerequisites are client-http + backend-application.
- [x] Verify build, review schedule, and search regressions.
  - `npm run build` green (tsc + vite); `npm run reviews` shows 7/7 guides on track (new guide next due 2027-05-18); bundled search check ALL PASS — the 7 regression queries (`redis`, `cache`, `make repeated reads faster`, `nginx`, `database`, `route browser requests`, nonsense) return identical results without the new guide, and `jwt`/`login`/`401`/`sessions` find it.
- [x] Update the documents that reference the guide set.
  - `README.md` "Later additions" (authentication removed — shipped), `docs/learning-journey.md` deep-dives paragraph (auth deep dive noted), `docs/backlog.md` (item shipped; message queues remain), `docs/decisions.md` Phase 13 pick recorded under 2026-11-18.

## Phase 14: Background jobs and message queues guide

- [ ] Draft the Background jobs and message queues guide (README curriculum step 12).
- [ ] Register the guide and link it from the related guides (prerequisites / learn-next).
- [ ] Verify build, review schedule, and search regressions.
- [ ] Update the documents that reference the guide set.

## Phase 15: Failure-path place-order scenario

- [ ] Design the failure-path journey (cache or database fails mid-request — what each step does and what the client sees).
- [ ] Implement the failure variant of the request flow alongside the existing success path.
- [ ] Add accessible text alternatives and keep the no-autoplay / reduced-motion rules.
- [ ] Test the failure journey end-to-end (build, keyboard, responsive, search unaffected).

## Phase 16: Visual refinements

- [ ] Step-controlled animation for guide-page diagrams (no autoplay; static text fallback preserved; `prefers-reduced-motion` swaps stay instant).
- [ ] Open Graph social preview image (`og:image` in `index.html`) so shared links show a preview.
- [ ] Verify the build and accessibility regressions.

## Phase 17: Next content wave (roadmap, unscheduled)

Placeholder so the roadmap lives in one file — details defined when scheduled into a real phase.

- [ ] Schedule the next batch from README "Later additions": containers, cloud hosting, CI/CD, and monitoring guides, plus more example architectures and request scenarios.

## Definition of done for the MVP

- [x] A learner can start at the home page and complete one end-to-end request journey.
- [x] The three starter guides are published, linked, sourced, and reviewed.
- [x] Search finds guides by tool, concept, and problem.
- [x] Every visual has an accessible text explanation and a usable fallback.
- [x] The application works on mobile and desktop.
- [x] The success criteria can be demonstrated with a small learner review.
