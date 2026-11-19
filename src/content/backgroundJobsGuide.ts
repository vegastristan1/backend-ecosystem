import type { Guide } from './types'

/**
 * Guide for README curriculum step 12: how slow or independent work
 * continues after the response. Not a journey step — linked from the
 * database (learn next) and response (related) guides instead.
 */
export const backgroundJobsGuide: Guide = {
  id: 'background-jobs',
  name: 'Background jobs and message queues',
  category: 'asynchronous-work',
  tags: [
    'background jobs',
    'message queue',
    'queues',
    'workers',
    'async',
    'asynchronous',
    'rabbitmq',
    'kafka',
    'sqs',
    'events',
    'pub-sub',
    'producers',
    'consumers',
    'task queue',
    'retries',
    'idempotency',
    'decoupling',
  ],
  status: 'review',
  concept:
    'Work that is slow or independent of the caller — sending an email, generating a report — should not keep the client waiting. A message queue holds that work as messages, and a worker process picks it up and finishes it after the HTTP response has already been sent.',
  problemSolved:
    'It explains how an API can answer immediately while slow work continues in the background: enqueue a job, let a worker process it, and know what happens when retries, duplicates, or failures occur.',
  position:
    'It sits behind the backend application: once the handler decides what must happen, it writes a message to a queue and responds to the client at once. A separate worker reads the queue and does the slow work without holding the request open.',
  howItWorks: [
    {
      id: 'slow-work-decided',
      title: 'The handler decides the slow work',
      explanation:
        'After validating a place-order request, the application still has to send a confirmation email and refresh a stock report. Neither is needed for the response, and neither should keep the client waiting.',
      visualState: 'work-decided',
    },
    {
      id: 'job-enqueued',
      title: 'The job is enqueued',
      explanation:
        'The handler writes a small message to the queue — a job type and its payload, such as the order id — then returns 201 Created immediately. From that moment the queue owns the work.',
      visualState: 'job-enqueued',
    },
    {
      id: 'worker-receives',
      title: 'A worker receives the message',
      explanation:
        'A separate worker process waits for messages, receives one, and marks it invisible to other workers while it runs (the visibility timeout), so two workers do not process the same job at the same time.',
      visualState: 'worker-received',
    },
    {
      id: 'work-completes',
      title: 'The work completes and is acknowledged',
      explanation:
        'The worker sends the email, updates the report, and then acknowledges the message so it is removed from the queue. The client already has its response — this happened later, on its own schedule.',
      visualState: 'work-completed',
    },
    {
      id: 'retry-on-failure',
      title: 'Failure triggers a retry',
      explanation:
        'If the worker crashes or the message is not acknowledged in time, the message returns to the queue for another attempt. After repeated failures it moves to a dead-letter queue, where a human can inspect it instead of the same job failing forever.',
      visualState: 'retried-or-dead-lettered',
    },
  ],
  visual: {
    kind: 'sequence',
    title: 'One place-order request, then the queued work',
    description:
      'Follow the place-order request: the response returns first, and the queued job runs afterwards on a worker.',
    fallback:
      'POST /orders → handler validates → message (job type + order id) written to the queue → 201 Created returned to the client immediately → worker receives the message (invisible to other workers while it runs) → email and report work finishes → message acknowledged and removed. Worker failure → message returns for a retry → repeated failure → dead-letter queue for inspection.',
    steps: [
      {
        id: 'enqueue-step',
        title: 'Enqueue and respond',
        explanation:
          'The handler stores the job on the queue and answers the client without doing the slow work itself.',
        visualState: 'job-enqueued',
      },
      {
        id: 'process-step',
        title: 'Worker processes the job',
        explanation:
          'A worker pulls the message and performs the slow work after the response is already gone.',
        visualState: 'worker-received',
      },
      {
        id: 'ack-step',
        title: 'Acknowledge or retry',
        explanation:
          'Success removes the message; failure returns it for a retry, eventually landing in a dead-letter queue.',
        visualState: 'work-completed',
      },
    ],
  },
  example: {
    scenario:
      'A customer places an order, and the notification service is slow at that moment.',
    request:
      'POST /orders → 201 Created {"orderId":42} immediately; queue message {"job":"send-confirmation","orderId":42} → worker sends the email one second later',
    outcome:
      'The client gets its order confirmation as soon as the order is stored, unaffected by the slow email service; if the first send attempt fails, the queue redelivers the message so the email still goes out.',
  },
  benefits: [
    'The client gets its response immediately; slow work never delays the request.',
    'Workers scale independently of web servers — add consumers when the backlog grows.',
    'Bursts of work are buffered, so a traffic spike does not overwhelm downstream services.',
    'Retries with delays handle transient failures without the user ever seeing an error.',
  ],
  tradeoffs: [
    'The result is eventually consistent: the email or report arrives after the response, and the client cannot watch its progress.',
    'A queue and its workers are extra services to deploy, monitor, and keep alive.',
    'At-least-once delivery means a job can run twice, so handlers must be idempotent (a duplicate email is the mild case).',
    'Debugging spans two places — the request logs and the queue/worker logs — and ordering is not guaranteed across queues.',
  ],
  alternatives: [
    'Run the slow work inside the request and accept a slower response',
    'A scheduled job (cron) that batches work on an interval instead of per event',
    'A jobs table in the application’s own store, polled by a worker',
    'A framework’s built-in background task or webhook delivery',
  ],
  prerequisites: ['backend-application', 'database'],
  relatedGuides: ['backend-application', 'database', 'response'],
  learnNext: ['response'],
  aliases: [
    'background job',
    'background jobs',
    'message queue',
    'job queue',
    'task queue',
    'queue',
    'queues',
    'worker',
    'workers',
    'rabbitmq',
    'kafka',
    'apache kafka',
    'sqs',
    'amazon sqs',
    'async',
    'asynchronous',
    'event',
    'events',
    'pub/sub',
    'publish subscribe',
    'producer',
    'consumer',
    'message broker',
    'celery',
    'outbox',
  ],
  searchProblems: [
    'How do I run slow work without slowing down the response?',
    'What is a message queue and when should I use one?',
    'How do background jobs work?',
    'Should I use RabbitMQ, Kafka, or SQS?',
    'Why did the email send only after the API responded?',
    'How do I process work after the response is sent?',
    'What happens when a background job fails?',
    'How do I stop slow work from blocking my API?',
  ],
  sources: [
    {
      title: 'Introduction to Apache Kafka',
      url: 'https://kafka.apache.org/intro',
      publisher: 'Apache Software Foundation',
      accessedAt: '2026-11-19',
    },
    {
      title: 'What is Amazon Simple Queue Service?',
      url: 'https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html',
      publisher: 'Amazon Web Services',
      accessedAt: '2026-11-19',
    },
    {
      title: 'RabbitMQ documentation',
      url: 'https://www.rabbitmq.com/docs',
      publisher: 'RabbitMQ',
      accessedAt: '2026-11-19',
    },
    {
      title: 'RabbitMQ tutorials: work queues and publish/subscribe',
      url: 'https://www.rabbitmq.com/tutorials',
      publisher: 'RabbitMQ',
      accessedAt: '2026-11-19',
    },
    {
      title: 'Azure Queue storage documentation',
      url: 'https://learn.microsoft.com/en-us/azure/storage/queues/',
      publisher: 'Microsoft',
      accessedAt: '2026-11-19',
    },
  ],
  lastReviewed: '2026-11-19',
  publicationReview: {
    toolNameConfidence: 'confirmed',
    requiresReview: false,
    reviewNotes:
      'Phase 14 content review completed; sources are Apache, AWS, RabbitMQ, and Microsoft documentation. Revisit with the next scheduled review.',
  },
}
