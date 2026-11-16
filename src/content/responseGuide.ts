import type { Guide } from './types'

/**
 * Guide for journey step 6 (curriculum step 13): how results and failures
 * return to the client. Completes the six-step journey — every step now has
 * a deep dive.
 */
export const responseGuide: Guide = {
  id: 'response',
  name: 'Response, errors, and API contracts',
  category: 'application',
  tags: ['response', 'status codes', 'errors', 'error handling', 'api contract', 'json'],
  status: 'review',
  concept:
    'An HTTP response is the server’s reply to a request: a status code saying what happened, headers describing the reply, and usually a JSON body carrying the result or the error.',
  problemSolved:
    'It explains how success and failure travel back to the client, so learners can read status codes, return predictable errors, and keep the API contract that frontends depend on.',
  position:
    'It is the last step of the journey: after the application and data layers do their work, everything the client learns — success, failure, or redirect — arrives in the response.',
  howItWorks: [
    {
      id: 'choose-status',
      title: 'Choose the status code',
      explanation:
        'The handler picks a code that states the outcome: 200 or 201 for success, 400/401/404/422 when the client asked for something invalid, and 500/503 when the server itself failed.',
      visualState: 'status-chosen',
    },
    {
      id: 'build-body',
      title: 'Build the JSON body',
      explanation:
        'A success response carries the resource or a confirmation. A failure response carries a stable error shape — a machine-readable code plus a human-readable message — so clients can react without guessing.',
      visualState: 'body-built',
    },
    {
      id: 'set-headers',
      title: 'Set the response headers',
      explanation:
        'Content-Type tells the client how to read the body, caching headers say how long the reply may be reused, and rate-limit headers explain remaining quota.',
      visualState: 'headers-set',
    },
    {
      id: 'client-reads',
      title: 'The client reads the reply',
      explanation:
        'The status code selects the branch — show the result, show a validation message, or retry later — and the body supplies the data for that branch.',
      visualState: 'response-read',
    },
    {
      id: 'failures-travel',
      title: 'Failures use the same channel',
      explanation:
        'A missing field answers 400, an unknown order answers 404, an outage answers 503 — each with the same error shape, so the frontend can map every failure to a clear message.',
      visualState: 'error-returned',
    },
  ],
  visual: {
    kind: 'sequence',
    title: 'How a response reaches the client',
    description:
      'Compare the success path with the failure path: both travel back as a status code, headers, and a JSON body.',
    fallback:
      'Success → 201 Created, application/json body with the new resource → client shows the result. Failure → 4xx or 500-class status with a stable error body (code + message) → client shows a matching message. Both paths use the same status/header/body structure.',
    steps: [
      {
        id: 'success-path',
        title: 'Success path',
        explanation: 'A 2xx status and a data body let the client complete its flow.',
        visualState: 'response-returned',
      },
      {
        id: 'client-error-path',
        title: 'Client error path',
        explanation: 'A 4xx status tells the client its request was wrong; the error body says exactly what to fix.',
        visualState: 'error-returned',
      },
      {
        id: 'server-error-path',
        title: 'Server error path',
        explanation: 'A 5xx status means the server failed; the client may retry or report a temporary problem.',
        visualState: 'error-returned',
      },
    ],
  },
  example: {
    scenario:
      'The learner’s place-order request finishes — once correctly, once with a missing field.',
    request:
      'Valid: POST /orders → 201 Created {"orderId":123}. Missing quantity → 400 Bad Request {"error":{"code":"invalid_request","message":"quantity is required"}}',
    outcome:
      'The browser shows the confirmation on 201, and the specific validation message on 400 — because the status selected the branch and the error body explained what to fix.',
  },
  benefits: [
    'Status codes give every outcome a standard meaning that any client already understands.',
    'A stable error shape lets frontends handle failures programmatically instead of parsing prose.',
    'One contract for success and failure keeps behavior predictable across endpoints.',
    'Caching and rate-limit headers let clients and proxies behave correctly without extra negotiation.',
  ],
  tradeoffs: [
    'Choosing the wrong status (200 for a failure, 404 for a permission bug) misleads every client and monitor.',
    'Error messages that leak internals help attackers more than users.',
    'Contracts evolve: adding fields is safe, changing or removing them breaks clients.',
    'Over-detailed error bodies cost bandwidth and can duplicate what logs already capture.',
  ],
  alternatives: [
    'gRPC status codes and structured error details',
    'A schema-first contract such as OpenAPI or protobuf',
    'HTML error pages for server-rendered sites',
    'GraphQL’s single-errors array instead of per-field HTTP statuses',
  ],
  prerequisites: ['client-http', 'backend-application'],
  relatedGuides: ['backend-application', 'reverse-proxy'],
  learnNext: ['testing'],
  aliases: [
    'response',
    'status code',
    'http status',
    'error',
    'errors',
    'error handling',
    'api contract',
    '404',
    '500',
    '201 created',
    'json',
  ],
  searchProblems: [
    'Why did my API return a 404 or 500?',
    'What is the difference between 4xx and 5xx status codes?',
    'How should an API return errors?',
    'What does 201 Created mean?',
    'How do clients know whether a request succeeded?',
  ],
  sources: [
    {
      title: 'HTTP response status codes',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status',
      publisher: 'MDN Web Docs',
      accessedAt: '2026-11-17',
    },
    {
      title: 'HTTP response headers',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers',
      publisher: 'MDN Web Docs',
      accessedAt: '2026-11-17',
    },
    {
      title: 'RFC 9110: HTTP Semantics (status codes, §15)',
      url: 'https://www.rfc-editor.org/rfc/rfc9110.html',
      publisher: 'IETF',
      accessedAt: '2026-11-17',
    },
    {
      title: 'Working with JSON',
      url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON',
      publisher: 'MDN Web Docs',
      accessedAt: '2026-11-17',
    },
    {
      title: 'OpenAPI Specification',
      url: 'https://swagger.io/specification/',
      publisher: 'Swagger',
      accessedAt: '2026-11-17',
    },
  ],
  lastReviewed: '2026-11-17',
  publicationReview: {
    toolNameConfidence: 'confirmed',
    requiresReview: false,
    reviewNotes:
      'Phase 10 content review completed; sources are MDN, the RFC editor, and the OpenAPI specification. Revisit with the next scheduled review.',
  },
}
