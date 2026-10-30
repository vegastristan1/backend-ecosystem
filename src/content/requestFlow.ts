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
    },
  ],
}

