import type { Guide } from './types'

/**
 * Guide for journey step 1 (curriculum step 1): what a client sends and what
 * the server returns. Prerequisite for all three existing guides.
 */
export const clientHttpGuide: Guide = {
  id: 'client-http',
  name: 'Client and HTTP request',
  category: 'foundation',
  tags: ['http', 'request', 'response', 'methods', 'headers', 'status codes', 'json'],
  status: 'review',
  concept:
    'An HTTP request is a structured message a client sends to a server to ask for something, and the server replies with an HTTP response carrying a status, headers, and usually a body.',
  problemSolved:
    'It explains exactly what a browser or app sends to a backend and what comes back, so every later topic — proxies, APIs, status codes — has a foundation to build on.',
  position:
    'It is the first step of the journey: everything the backend receives arrives as an HTTP request from a client, and everything it returns leaves as an HTTP response.',
  howItWorks: [
    {
      id: 'build-request',
      title: 'Build the request',
      explanation:
        'The client combines a scheme, host, and path into a URL and picks a method that states its intent — GET to read, POST to create, PUT to replace, DELETE to remove.',
      visualState: 'request-built',
    },
    {
      id: 'add-headers',
      title: 'Add headers',
      explanation:
        'Headers carry metadata around the request: which host is being contacted, what format the body uses (Content-Type: application/json), what the client accepts back, and any cookie or authorization credentials.',
      visualState: 'headers-added',
    },
    {
      id: 'send-body',
      title: 'Send the body when there is one',
      explanation:
        'POST and PUT requests usually carry a JSON body holding the data to process, such as the order details. GET and DELETE requests usually have no body.',
      visualState: 'body-attached',
    },
    {
      id: 'server-replies',
      title: 'The server reads and replies',
      explanation:
        'The backend reads the method, path, headers, and body, decides what to do, and returns a status code plus response headers and usually a JSON body.',
      visualState: 'response-returned',
    },
    {
      id: 'client-acts',
      title: 'The client acts on the response',
      explanation:
        'The client checks the status — 200 means success, 404 means not found, 500 means the server failed — then reads the response body and updates the page or app.',
      visualState: 'response-read',
    },
  ],
  visual: {
    kind: 'sequence',
    title: 'How one request and response travel',
    description:
      'Follow a single order request from the moment the client builds it to the moment it reads the response status and body.',
    fallback:
      'Client builds a URL and method, adds headers and an optional JSON body → the request travels to the server → the server returns a status code, headers, and a JSON body → the client reads the status and renders the result.',
    steps: [
      {
        id: 'client-side',
        title: 'Client builds the request',
        explanation: 'URL, method, headers, and optional JSON body are assembled before anything is sent.',
        visualState: 'request-built',
      },
      {
        id: 'server-side',
        title: 'Server reads and answers',
        explanation: 'The backend reads the request, performs the work, and returns a status code with a body.',
        visualState: 'response-returned',
      },
      {
        id: 'back-to-client',
        title: 'Client reads the response',
        explanation: 'The status code tells the client whether to show the result or handle an error.',
        visualState: 'response-read',
      },
    ],
  },
  example: {
    scenario:
      'A learner clicks “Place order,” and the browser sends the order to the shop’s backend as JSON.',
    request:
      'POST https://shop.example.com/orders + headers (Content-Type: application/json, Authorization: Bearer …) + body {"productId":42,"quantity":1} → backend application',
    outcome:
      'The server validates the order and answers with 201 Created and a JSON body containing the new order id. If the productId is unknown, it answers 404 or 422 instead, and the browser shows the matching error.',
  },
  benefits: [
    'Gives every backend interaction one standard, human-readable message format.',
    'Methods and status codes let clients and servers agree on intent and outcome without extra conventions.',
    'Headers keep metadata separate from the payload, so proxies, caches, and applications can act on it.',
    'JSON bodies carry structured data that nearly every language and tool can read.',
  ],
  tradeoffs: [
    'HTTP is text-based, so large payloads cost more bandwidth than a binary protocol would.',
    'Client and server must agree on headers, formats, and error shapes; a mismatch is a bug.',
    'Status codes and headers are easy to misuse — for example, caching a response that should not be cached.',
    'Real requests also pass through DNS, TLS, and proxies, which this guide only points at.',
  ],
  alternatives: [
    'gRPC for service-to-service calls that favor speed over readability',
    'GraphQL when one endpoint should serve many different query shapes',
    'WebSockets for long-lived two-way connections',
    'Message queues for work that can continue after the response is sent',
  ],
  prerequisites: [],
  relatedGuides: ['reverse-proxy'],
  learnNext: ['reverse-proxy', 'backend-application'],
  aliases: ['http', 'https', 'request', 'response', 'get', 'post', 'put', 'delete', 'headers', 'status code', 'json', 'fetch', 'curl'],
  searchProblems: [
    'How do I send a request to my backend?',
    'What is the difference between GET and POST?',
    'What do HTTP status codes like 200, 404, and 500 mean?',
    'How do I send JSON data to an API?',
    'What is inside an HTTP request?',
  ],
  sources: [
    {
      title: 'An overview of HTTP',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview',
      publisher: 'MDN Web Docs',
      accessedAt: '2026-11-16',
    },
    {
      title: 'HTTP request methods',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods',
      publisher: 'MDN Web Docs',
      accessedAt: '2026-11-16',
    },
    {
      title: 'HTTP request headers',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers',
      publisher: 'MDN Web Docs',
      accessedAt: '2026-11-16',
    },
    {
      title: 'HTTP response status codes',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status',
      publisher: 'MDN Web Docs',
      accessedAt: '2026-11-16',
    },
    {
      title: 'Using the Fetch API',
      url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_fetch',
      publisher: 'MDN Web Docs',
      accessedAt: '2026-11-16',
    },
  ],
  lastReviewed: '2026-11-16',
  publicationReview: {
    toolNameConfidence: 'confirmed',
    requiresReview: false,
    reviewNotes:
      'Phase 8 content review completed. No uncertain tool names in this guide; revisit with the next scheduled review.',
  },
}
