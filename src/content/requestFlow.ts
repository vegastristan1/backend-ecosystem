import type { RequestFlow } from './types'

export const orderRequestFlow: RequestFlow = {
  id: 'place-order',
  title: 'Place an order',
  description:
    'Follow an order request from the browser through the backend and back to the client.',
  steps: [
    {
      id: 'client-request',
      order: 1,
      title: 'Client and HTTP request',
      componentId: 'client',
      explanation: 'The browser sends an HTTP request describing the order action.',
      visualState: 'request-created',
      guideId: 'client-http',
    },
    {
      id: 'reverse-proxy',
      order: 2,
      title: 'Reverse proxy',
      componentId: 'reverse-proxy',
      explanation: 'The reverse proxy accepts the connection and routes it to the application.',
      visualState: 'request-routed',
      guideId: 'reverse-proxy',
    },
    {
      id: 'backend-application',
      order: 3,
      title: 'Backend application',
      componentId: 'backend-application',
      explanation: 'Application code validates the request and applies the order rules.',
      visualState: 'business-logic',
      guideId: 'backend-application',
    },
    {
      id: 'cache',
      order: 4,
      title: 'Cache',
      componentId: 'cache',
      explanation: 'The application checks whether useful data is already available for reuse.',
      visualState: 'cache-checked',
      guideId: 'caching',
    },
    {
      id: 'database',
      order: 5,
      title: 'Database',
      componentId: 'database',
      explanation: 'The database provides durable data when a read or write is required.',
      visualState: 'database-read-write',
      guideId: 'database',
    },
    {
      id: 'response',
      order: 6,
      title: 'Response',
      componentId: 'response',
      explanation: 'The backend returns a success or failure response to the browser.',
      visualState: 'response-returned',
      guideId: 'response',
    },
  ],
}

// Failure-path variant (Phase 15): the database write fails mid-request.
// A cache failure is absorbed by cache-aside and changes nothing the
// client sees, so the database is the failure point with a lesson per step.
export const orderFailureFlow: RequestFlow = {
  id: 'place-order-failure',
  title: 'Place an order when the database fails',
  description:
    'The same place-order request, but the database fails during the write. See what each part does and what the client sees.',
  steps: [
    {
      id: 'failure-client-request',
      order: 1,
      title: 'Client and HTTP request',
      componentId: 'client',
      explanation:
        'The browser sends the same order request — nothing about the request itself reveals that anything will go wrong.',
      visualState: 'request-created',
      guideId: 'client-http',
    },
    {
      id: 'failure-reverse-proxy',
      order: 2,
      title: 'Reverse proxy',
      componentId: 'reverse-proxy',
      explanation:
        'The proxy accepts and routes the request as usual; the failure has not happened yet, so the edge layer needs no special behavior.',
      visualState: 'request-routed',
      guideId: 'reverse-proxy',
    },
    {
      id: 'failure-backend-application',
      order: 3,
      title: 'Backend application',
      componentId: 'backend-application',
      explanation:
        'Validation and order rules pass, but the write fails. The handler reports the failure honestly instead of inventing a success, and rolls the transaction back.',
      visualState: 'business-logic',
      guideId: 'backend-application',
    },
    {
      id: 'failure-cache',
      order: 4,
      title: 'Cache',
      componentId: 'cache',
      explanation:
        'The cache read may have succeeded, but nothing is written to it: the order never committed, so there is no new value to store and nothing stale to invalidate.',
      visualState: 'cache-checked',
      guideId: 'caching',
    },
    {
      id: 'failure-database',
      order: 5,
      title: 'Database',
      componentId: 'database',
      explanation:
        'The write fails — a timeout or lost connection. The transaction rolls back, so no partial order is stored and the source of truth stays consistent.',
      visualState: 'database-read-write',
      guideId: 'database',
    },
    {
      id: 'failure-response',
      order: 6,
      title: 'Response',
      componentId: 'response',
      explanation:
        'Instead of 201 Created, the client receives 503 Service Unavailable with an error body it can display — and it may safely retry the same request.',
      visualState: 'error-returned',
      guideId: 'response',
    },
  ],
}

