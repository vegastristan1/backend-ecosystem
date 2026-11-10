# Backend Ecosystem TODO

This is the step-by-step implementation checklist for the first release. Complete each phase in order, but revisit earlier tasks when user feedback or technical discoveries require it.

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
- [x] Track which guides, searches, and request-flow steps are used.
  - Vercel Web Analytics (cookieless, enabled in dashboard; `@vercel/analytics@2.0.1`): `<Analytics />` in `main.tsx` + custom events `page_view` (per hash route), `search` (debounced 800 ms), `guide_view`, `journey_step`. Verified 11/11 locally + journey/keyboard/contrast/feedback regressions green; production data lands after merge+push.
- [x] Schedule source and content reviews using `lastReviewed`.
  - `docs/review-schedule.md` documents the approved 6-month cadence (from `docs/decisions.md`), what a review covers (content + source links), and how to record it. `npm run reviews` (`scripts/check-reviews.mjs`, zero-dep) reads `lastReviewed` from every guide registered in `src/content/guides.ts` and prints on track/OVERDUE with exit 1 when due — CI-ready. Self-checked both paths (today → on track/exit 0; `REVIEWS_TODAY=2027-05-01` → OVERDUE/exit 1).
- [x] Maintain a backlog for new guides, scenarios, accessibility improvements, and visual refinements.
  - `docs/backlog.md`: operational queue in the four categories — guide candidates for the three unguided journey steps plus README-deferred topics, failure-path scenario, route-change focus management + reduced-motion guard (both verified gaps), step-controlled guide animation and OG social preview. Roadmap items stay in README's "Later additions" (linked, not duplicated); maintenance rule documented in the file.
- [ ] Decide which later topic should be added based on observed learner needs.
- [ ] Re-evaluate the AI assistant only after the content and feedback show a specific gap.

## Definition of done for the MVP

- [ ] A learner can start at the home page and complete one end-to-end request journey.
- [ ] The three starter guides are published, linked, sourced, and reviewed.
- [ ] Search finds guides by tool, concept, and problem.
- [ ] Every visual has an accessible text explanation and a usable fallback.
- [ ] The application works on mobile and desktop.
- [ ] The success criteria can be demonstrated with a small learner review.
