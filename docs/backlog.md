# Backlog

Living queue of work outside the current scope. Roadmap-level items (knowledge checks, exercises, learning progress, comparisons, the AI assistant decision) live in the README's "Later additions" and "AI assistant decision" sections — this file holds the operational backlog: items found while building, plus guide candidates to prioritize from observed learner needs (usage analytics and giscus feedback decide which one gets built next).

**Maintenance:** append an item during any phase with a short source note; promote it into a TODO phase when it is scheduled; delete it once shipped.

## New guides

All six journey steps have a deep dive; the curriculum defines 20 topics for 6 guides.

- Authentication and authorization (README curriculum step 7; auth guides deferred in README).
- Background jobs and message queues (README curriculum step 12; grouped after the response in decisions.md).

## New scenarios

- Failure-path place-order scenario: the same journey when the cache or database fails — the current request flow shows the success path only.
- More example architectures and request scenarios (README "Later additions").

## Visual refinements

- Step-controlled animation for guide-page diagrams (README "Later additions" and decisions.md; the request flow is already step-controlled and guide diagrams keep static fallbacks).
- Open Graph social preview image: `index.html` has a title and description but no `og:image`, so shared links show no preview.
