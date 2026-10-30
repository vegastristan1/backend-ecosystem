# Phase 1: Learning journey

This document turns the Backend Ecosystem proposal into a concrete learning path for the MVP. It is a curriculum map, not a prescription that every production system must contain every component.

## Learner path

The primary path follows a learner investigating what happens after clicking **Place order**:

1. **Client and HTTP request** — establish that a browser sends a method, URL, headers, and body, then receives a status and response body.
2. **DNS and domain** — explain how a readable domain is translated into a destination.
3. **Network connection and TLS** — explain connection security and why HTTPS protects the request in transit.
4. **Edge routing** — introduce the concept of accepting and forwarding traffic. Only then name a reverse proxy such as NGINX.
5. **Backend application** — show where route handling, validation, and order rules run.
6. **Cache** — explain reusable temporary data, cache hits and misses, and freshness. Only then name Redis as one implementation.
7. **Database** — explain durable records, reads, writes, and transactions. Only then name PostgreSQL as one implementation.
8. **Response and optional asynchronous work** — complete the request/response cycle, then show that queues and workers can continue slow work after the response.

Supporting infrastructure is introduced around this path: containers and deployment explain how the application runs, while monitoring explains how a running system is observed. They are not prerequisites for understanding the first request.

## Prerequisites, related guides, and recommended next topics

| Topic / guide | Prerequisites | Related guides | Recommended next topic |
|---|---|---|---|
| Client and HTTP request | None | Response and API contracts | DNS and domain |
| DNS and domain | Client and HTTP request | TLS, edge routing | Network connection and TLS |
| Network connection and TLS | Client and HTTP request, DNS | Edge routing, security practices | Edge routing |
| Reverse proxy / NGINX | HTTP request, DNS, basic networking | Load balancing, TLS, backend application | Backend application and API |
| Backend application and API | HTTP request, one programming language | Middleware, validation, authentication | Middleware and validation |
| Cache / Redis | Backend application, basic data access | Database, invalidation, queues | Database and persistence |
| Database | Backend application, basic data modeling | Cache, transactions, backups | File and object storage or background jobs |
| Response and API contracts | HTTP request, backend application | Errors, testing, frontend integration | Testing and code quality |
| Background jobs and queues | Backend application, database basics | Response behavior, workers, retries | Containers and runtime packaging |
| Containers and runtime packaging | Backend application basics | Deployment, cloud hosting | Deployment and CI/CD |
| Observability and operations | A running application and basic deployment | Reliability, monitoring, debugging | Reliability and security practices |

The three MVP deep dives are Reverse proxy / NGINX, Cache / Redis, and Database. Foundation topics are short journey steps with links into those deep dives where appropriate. Every guide should expose its prerequisites, two or three related guides, and one recommended next topic so learners always have a clear continuation.

## Concept-before-product rule

Each topic is introduced in this order:

1. State the problem in plain language.
2. Show where the concept sits in the request journey.
3. Explain the smallest useful behavior with a concrete example.
4. Name one or more products that implement the concept.
5. Compare tradeoffs and alternatives.

For example, the journey teaches **caching** before mentioning **Redis**. Product names are examples and search aliases, not learning objectives or mandatory stack choices.

## Page sketches

### Home page

**Purpose:** orient a beginner and start the request journey.

**Layout:**

- Header: project name, short purpose, and links to Journey, Guides, and Search.
- Hero: “Follow one request through a backend system,” with a primary **Start the journey** action.
- Brief explanation of the Place order scenario and the concept-before-product principle.
- Compact journey preview showing the major stages, with the first stage active.
- “Choose a starting point” cards for the journey, starter guides, and search.

**Key behavior:** the primary action opens the journey at step 1; cards preserve the learner’s context by showing prerequisites and destination.

### Request journey page

**Purpose:** let the learner trace one request from client to response.

**Layout:**

- Page heading with the current scenario and a short progress indicator.
- Main diagram with one highlighted component at a time.
- Step panel containing: what happens, why it matters, a small example, and a link to a guide.
- Previous/Next controls plus a visible list of all steps for direct navigation.
- Supporting-infrastructure panel for DNS/TLS, deployment, containers, and monitoring.
- Text-only journey summary available without animation.

**Key behavior:** changing steps updates the diagram highlight, explanation, progress state, and related guide link. The URL should preserve the selected step when practical.

### Guide page

**Purpose:** provide a focused, reusable explanation of one concept or tool.

**Layout:**

- Breadcrumb and label showing the concept before the example product.
- Purpose/problem statement and position in the request journey.
- Step-by-step visual with an always-visible text explanation and non-animated fallback.
- Small concrete example.
- Benefits, tradeoffs, and alternatives.
- Prerequisites, related guides, and a prominent **Learn next** link.
- Sources and `lastReviewed` metadata when the content model is implemented.

**Key behavior:** a learner can enter from the journey, search, or a related guide and return without losing their place.

### Search page

**Purpose:** help learners find a guide by product name, concept, or problem.

**Layout:**

- Search field with examples such as “Redis,” “cache,” and “make repeated reads faster.”
- Optional category filters and a clear result count.
- Result cards showing concept, example tools, problem solved, prerequisites, and recommended next topic.
- Empty state with suggested searches and a no-results state with links back to the journey.

**Key behavior:** aliases and problem descriptions resolve to the same guide; selecting a result opens the guide with a back link to the search query.

## Phase 1 acceptance checks

- A beginner can start at Home and identify the first request step without knowing a product name.
- The journey introduces caching before Redis and durable persistence before a database vendor.
- Every MVP starter guide has explicit prerequisites, related guides, and a next topic.
- Home, Journey, Guide, and Search each have a clear purpose, primary action, and accessible non-animated path.
