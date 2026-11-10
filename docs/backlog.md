# Backlog

Living queue of work outside the current scope. Roadmap-level items (knowledge checks, exercises, learning progress, comparisons, the AI assistant decision) live in the README's "Later additions" and "AI assistant decision" sections — this file holds the operational backlog: items found while building, plus guide candidates to prioritize from observed learner needs (usage analytics and giscus feedback decide which one gets built next).

**Maintenance:** append an item during any phase with a short source note; promote it into a TODO phase when it is scheduled; delete it once shipped.

## New guides

Three of the six journey steps have no deep dive yet (client/request, backend application, response), and the curriculum defines 20 topics for 3 guides.

- Client and HTTP request — journey step 1; methods, headers, status codes (README curriculum step 1).
- Backend application and API — journey step 3; routing and business logic (README curriculum step 5).
- Response, errors, and API contracts — journey step 6; failure behavior (README curriculum step 13).
- Authentication and authorization (README curriculum step 7; auth guides deferred in README).
- Background jobs and message queues (README curriculum step 12; grouped after the response in decisions.md).

## New scenarios

- Failure-path place-order scenario: the same journey when the cache or database fails — the current request flow shows the success path only.
- More example architectures and request scenarios (README "Later additions").

## Accessibility

- Focus management on hash-route changes: SPA navigation currently leaves focus wherever it was, so screen-reader learners get no cue that the page changed — move focus to the new page's heading and announce the route.
- Honor `prefers-reduced-motion` for the remaining 160 ms transitions; decisions.md already promises instant swaps for reduced-motion users.

## Visual refinements

- Step-controlled animation for guide-page diagrams (README "Later additions" and decisions.md; the request flow is already step-controlled and guide diagrams keep static fallbacks).
- Open Graph social preview image: `index.html` has a title and description but no `og:image`, so shared links show no preview.
