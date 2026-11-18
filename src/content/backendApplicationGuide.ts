import type { Guide } from './types'

/**
 * Guide for journey step 3 (curriculum step 5): what application code does
 * with a request. Referenced as a prerequisite/learn-next by the reverse
 * proxy, caching, and database guides.
 */
export const backendApplicationGuide: Guide = {
  id: 'backend-application',
  name: 'Backend application and API',
  category: 'application',
  tags: ['backend', 'application', 'api', 'routing', 'rest', 'business logic', 'validation'],
  status: 'review',
  concept:
    'A backend application is the program that receives a client’s request, decides what the request means, performs the work, and sends back an HTTP response.',
  problemSolved:
    'It shows what happens to a request inside the code that owns the business rules — where routing, validation, and decisions live — before the journey moves on to data storage.',
  position:
    'It sits after the reverse proxy and before the cache and database: the request has reached the code that decides what should happen.',
  howItWorks: [
    {
      id: 'match-route',
      title: 'Match the route',
      explanation:
        'The application reads the method and path of the incoming request — for example POST /orders — and looks up the handler registered for that combination.',
      visualState: 'route-matched',
    },
    {
      id: 'validate-input',
      title: 'Validate the request',
      explanation:
        'The handler checks required fields, types, and limits before trusting any input, and rejects a bad request with a 4xx status instead of processing it.',
      visualState: 'input-validated',
    },
    {
      id: 'apply-rules',
      title: 'Apply the business rules',
      explanation:
        'The code performs the actual work of the endpoint: calculating totals, checking stock, or deciding whether the order is allowed to proceed.',
      visualState: 'business-logic',
    },
    {
      id: 'coordinate-data',
      title: 'Read or write the data it needs',
      explanation:
        'When the work depends on stored data, the application talks to the cache and database layers and continues once the data is available.',
      visualState: 'data-coordinated',
    },
    {
      id: 'send-response',
      title: 'Send the response',
      explanation:
        'The handler returns a status code and usually a JSON body — 201 Created with the new order id on success, a 4xx or 5xx status on failure.',
      visualState: 'response-returned',
    },
  ],
  visual: {
    kind: 'sequence',
    title: 'How the application handles one request',
    description:
      'Follow one order request through the backend application: route matching, validation, business rules, data work, and the response.',
    fallback:
      'POST /orders arrives → route matched to a handler → input validated → business rules applied → data read or written → 201 Created JSON response. If validation fails, the handler answers 400 without touching the data layers.',
    steps: [
      {
        id: 'route-and-validate',
        title: 'Route and validate',
        explanation: 'The method and path select a handler, and the handler refuses invalid input with a 4xx status.',
        visualState: 'route-matched',
      },
      {
        id: 'decide-and-act',
        title: 'Decide and act',
        explanation: 'Business rules run and coordinate with the cache and database to do the real work.',
        visualState: 'business-logic',
      },
      {
        id: 'answer',
        title: 'Answer',
        explanation: 'A status code and JSON body tell the client what happened.',
        visualState: 'response-returned',
      },
    ],
  },
  example: {
    scenario:
      'A learner clicks “Place order,” and the backend receives POST /orders with the order as JSON.',
    request:
      'POST /orders {"productId":42,"quantity":1} → route handler → validate → apply order rules → data layers → 201 Created {"orderId":123}',
    outcome:
      'If quantity is missing or not a number, the handler answers 400 with an error message and never touches the database. On success, the client receives the new order id and can show the confirmation.',
  },
  benefits: [
    'Keeps business rules in one place instead of duplicating them in every client.',
    'Separates what the system does from how the HTTP transport delivers it.',
    'Validation at the boundary stops bad data before it reaches storage.',
    'A clear API contract lets any client — browser, mobile app, or another service — use the same rules.',
  ],
  tradeoffs: [
    'A bug in business logic affects every client at once.',
    'Choosing an API style (REST or GraphQL) shapes how clients ask for data; changing it later is costly.',
    'Validation must be kept in sync with both the data model and the API contract.',
    'An application that grows without clear boundaries becomes hard to change, test, and reason about.',
  ],
  alternatives: [
    'A serverless function per endpoint',
    'A framework-free server built on the language’s standard library',
    'GraphQL resolvers instead of REST routes',
    'A monolith that may split into services later',
  ],
  prerequisites: ['client-http'],
  relatedGuides: ['reverse-proxy', 'caching', 'database'],
  learnNext: ['caching', 'database', 'auth'],
  aliases: [
    'backend',
    'api',
    'rest',
    'express',
    'django',
    'spring boot',
    'fastapi',
    'asp.net',
    'endpoint',
    'handler',
    'business logic',
    'validation',
  ],
  searchProblems: [
    'Where does my code handle the incoming request?',
    'What is the difference between a route and a handler?',
    'Where should request data be validated?',
    'How does a backend application decide what to do with a request?',
    'Should my API use REST or GraphQL?',
  ],
  sources: [
    {
      title: 'Express routing guide',
      url: 'https://expressjs.com/en/guide/routing.html',
      publisher: 'Express',
      accessedAt: '2026-11-17',
    },
    {
      title: 'Using Express middleware',
      url: 'https://expressjs.com/en/guide/using-middleware.html',
      publisher: 'Express',
      accessedAt: '2026-11-17',
    },
    {
      title: 'Django request and response objects',
      url: 'https://docs.djangoproject.com/en/stable/ref/request-response/',
      publisher: 'Django',
      accessedAt: '2026-11-17',
    },
    {
      title: 'Spring Boot: Servlet Web Applications',
      url: 'https://docs.spring.io/spring-boot/reference/web/servlet.html',
      publisher: 'Spring',
      accessedAt: '2026-11-17',
    },
  ],
  lastReviewed: '2026-11-17',
  publicationReview: {
    toolNameConfidence: 'confirmed',
    requiresReview: false,
    reviewNotes:
      'Phase 9 content review completed; tool names taken from official documentation. Revisit with the next scheduled review.',
  },
}
