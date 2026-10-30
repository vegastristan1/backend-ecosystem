import type { Guide } from './types'

/**
 * Starter guide for the reverse-proxy step in the place-order journey.
 * Keep this as a draft until the content and terminology review is complete.
 */
export const reverseProxyGuide: Guide = {
  id: 'reverse-proxy',
  name: 'NGINX and reverse proxies',
  category: 'networking',
  tags: ['reverse proxy', 'routing', 'nginx', 'http', 'web server'],
  status: 'draft',
  concept: 'A reverse proxy is a server that receives a client request and forwards it to an application server on the client’s behalf.',
  problemSolved:
    'It gives clients one public entry point while hiding, routing, and optionally balancing traffic across backend services.',
  position:
    'It commonly sits at the edge of the system, after the client connection and before the backend application.',
  howItWorks: [
    {
      id: 'receive-request',
      title: 'Receive the request',
      explanation:
        'The browser sends an HTTP request to the public website address. NGINX accepts the connection and reads the request.',
      visualState: 'request-received',
    },
    {
      id: 'match-route',
      title: 'Match a configured route',
      explanation:
        'NGINX checks its server and location rules to decide whether the request should be served directly or forwarded elsewhere.',
      visualState: 'route-matched',
    },
    {
      id: 'forward-to-app',
      title: 'Forward to the application',
      explanation:
        'For a proxied route, NGINX sends the request to an upstream backend such as an application listening on a private port.',
      visualState: 'request-forwarded',
    },
    {
      id: 'return-response',
      title: 'Return the response',
      explanation:
        'NGINX receives the backend response and sends it back to the browser as the public server’s response.',
      visualState: 'response-returned',
    },
  ],
  visual: {
    kind: 'request-flow',
    title: 'How a reverse proxy routes a request',
    description:
      'Follow one request from the browser to the public NGINX entry point, then to the backend application, and back to the browser.',
    fallback:
      'Browser sends POST /orders → NGINX receives the request → NGINX forwards it to the backend application → the application returns a response → NGINX sends that response back to the browser.',
    steps: [
      {
        id: 'browser-to-nginx',
        title: 'Browser → NGINX',
        explanation: 'The browser sends the order request to the public host.',
        visualState: 'client-to-proxy',
      },
      {
        id: 'nginx-to-application',
        title: 'NGINX → application',
        explanation: 'NGINX forwards the request to the configured backend service.',
        visualState: 'proxy-to-app',
      },
      {
        id: 'application-to-browser',
        title: 'Application → browser',
        explanation: 'The response travels back through NGINX to the client.',
        visualState: 'response-to-client',
      },
    ],
  },
  example: {
    scenario:
      'A learner clicks “Place order,” and the browser sends POST /orders to shop.example.com.',
    request: 'POST /orders → public NGINX server → backend application at http://backend:3000',
    outcome:
      'NGINX routes the request to the application. The application validates the order and returns a success or error response, which NGINX passes back to the browser.',
  },
  benefits: [
    'Provides one public entry point for backend services.',
    'Keeps internal application addresses private from clients.',
    'Can route different paths to different services.',
    'Can support TLS termination, static files, and load balancing when those capabilities are needed.',
  ],
  tradeoffs: [
    'Adds another configuration layer that can make routing problems harder to diagnose.',
    'Incorrect path or header handling can change what the backend receives.',
    'It is not automatically a security boundary; authentication, authorization, and input validation still belong in the appropriate layers.',
    'A single proxy can become a bottleneck or availability risk unless it is operated redundantly.',
  ],
  alternatives: ['Caddy', 'HAProxy', 'A managed cloud load balancer', 'A backend application serving traffic directly for a small system'],
  prerequisites: ['client-http'],
  relatedGuides: ['caching', 'database'],
  learnNext: ['backend-application'],
  aliases: ['nginx', 'NGINX', 'reverse proxy', 'proxy server', 'web proxy'],
  searchProblems: [
    'How do I route browser requests to my backend?',
    'How can multiple backend services share one public address?',
    'What sits in front of an application server?',
  ],
  sources: [
    {
      title: 'NGINX Beginner’s Guide: Setting Up a Simple Proxy Server',
      url: 'https://nginx.org/en/docs/beginners_guide.html',
      publisher: 'NGINX',
      accessedAt: '2026-10-30',
    },
    {
      title: 'NGINX ngx_http_proxy_module documentation',
      url: 'https://nginx.org/en/docs/http/ngx_http_proxy_module.html',
      publisher: 'NGINX',
      accessedAt: '2026-10-30',
    },
    {
      title: 'Overview of HTTP',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview',
      publisher: 'MDN Web Docs',
      accessedAt: '2026-10-30',
    },
  ],
  lastReviewed: '2026-10-30',
  publicationReview: {
    toolNameConfidence: 'confirmed',
    requiresReview: true,
    reviewNotes:
      'Draft completed. Review the wording, routing visual, alternatives, and source links before publication.',
  },
}

