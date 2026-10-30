import type { Guide } from './types'

/**
 * Starter guide for the database step in the place-order journey.
 * Keep this as a draft until the content and terminology review is complete.
 */
export const databaseGuide: Guide = {
  id: 'database',
  name: 'Databases and durable persistence',
  category: 'data',
  tags: ['database', 'persistence', 'sql', 'postgresql', 'transactions'],
  status: 'draft',
  concept:
    'A database stores application data in a structured form so it can be queried, changed, protected, and recovered over time.',
  problemSolved:
    'It provides a durable source of truth for records that must survive individual requests, application restarts, and cache expiration.',
  position:
    'The application reads from and writes to the database when it needs durable data. A cache may sit in front of some reads, but the database remains the primary store.',
  howItWorks: [
    {
      id: 'model-data',
      title: 'Model the data',
      explanation:
        'The team defines records, fields, relationships, and rules that describe the application data it needs to keep.',
      visualState: 'data-modeled',
    },
    {
      id: 'read-data',
      title: 'Read existing data',
      explanation:
        'The application sends a query to find the records needed for the current request, such as a product or customer order.',
      visualState: 'database-read',
    },
    {
      id: 'start-write',
      title: 'Begin a related change',
      explanation:
        'For a write, the application groups related changes so the database can apply them as one logical operation.',
      visualState: 'transaction-started',
    },
    {
      id: 'commit-or-rollback',
      title: 'Commit or roll back',
      explanation:
        'If all required changes succeed, the application commits them. If a required step fails, it can roll the transaction back instead of leaving a partial result.',
      visualState: 'transaction-completed',
    },
    {
      id: 'return-result',
      title: 'Return the result',
      explanation:
        'The backend uses the saved or retrieved data to build a success or failure response for the client.',
      visualState: 'database-result',
    },
  ],
  visual: {
    kind: 'read-write',
    title: 'Database reads and writes',
    description:
      'Show the application reading durable data and grouping related writes into a transaction before returning a response.',
    fallback:
      'Application requests data → database returns matching records. For a write, the application begins a transaction → updates the related records → commits all changes if successful or rolls them back if a required step fails → application returns the result.',
    steps: [
      {
        id: 'read-path',
        title: 'Read path',
        explanation: 'The application queries the database and receives durable records.',
        visualState: 'read',
      },
      {
        id: 'write-path',
        title: 'Write path',
        explanation: 'The application sends an insert or update to change durable state.',
        visualState: 'write',
      },
      {
        id: 'transaction-path',
        title: 'Transaction boundary',
        explanation: 'Related changes commit together or roll back together when the operation requires that guarantee.',
        visualState: 'transaction',
      },
    ],
  },
  example: {
    scenario:
      'A learner places an order. The backend must create the order record and reduce the available inventory without leaving only one of those changes applied.',
    request:
      'Begin transaction → insert order → update inventory → commit → return order confirmation',
    outcome:
      'If both changes succeed, the database commits them together. If inventory cannot be reduced, the transaction can roll back so the order is not recorded as completed with inconsistent inventory.',
  },
  benefits: [
    'Keeps important records after a request finishes or an application restarts.',
    'Supports queries that find and combine related data.',
    'Can enforce rules such as required fields, unique values, and relationships.',
    'Can use transactions to keep related changes consistent.',
  ],
  tradeoffs: [
    'Queries and data models need deliberate design as the amount of data and traffic grows.',
    'Indexes, locks, and transactions improve correctness or speed but add concepts to understand and operate.',
    'A database is slower and more expensive to query repeatedly than an appropriate in-memory cache.',
    'Schema changes, backups, migrations, access control, and recovery require ongoing operational work.',
    'A relational model is not the best fit for every access pattern or data shape.',
  ],
  alternatives: [
    'PostgreSQL or MySQL for relational data and SQL queries',
    'A document database for flexible document-shaped records',
    'A managed database service for hosted operations and backups',
    'Object storage for large files rather than storing file contents in ordinary records',
  ],
  prerequisites: ['backend-application'],
  relatedGuides: ['caching', 'reverse-proxy'],
  learnNext: ['file-storage', 'background-jobs'],
  aliases: ['database', 'DB', 'data store', 'persistence', 'SQL database', 'PostgreSQL', 'Postgres'],
  searchProblems: [
    'Where does backend data persist after a request ends?',
    'How do I store orders and other application records?',
    'How can related database changes succeed or fail together?',
    'What is the difference between a database and a cache?',
  ],
  sources: [
    {
      title: 'PostgreSQL Tutorial',
      url: 'https://www.postgresql.org/docs/current/tutorial.html',
      publisher: 'PostgreSQL',
      accessedAt: '2026-10-30',
    },
    {
      title: 'PostgreSQL: Transactions',
      url: 'https://www.postgresql.org/docs/18/tutorial-transactions.html',
      publisher: 'PostgreSQL',
      accessedAt: '2026-10-30',
    },
    {
      title: 'PostgreSQL: Table Basics and Data Integrity',
      url: 'https://www.postgresql.org/docs/current/ddl-basics.html',
      publisher: 'PostgreSQL',
      accessedAt: '2026-10-30',
    },
  ],
  lastReviewed: '2026-10-30',
  publicationReview: {
    toolNameConfidence: 'confirmed',
    requiresReview: true,
    reviewNotes:
      'Draft completed. Review transaction wording, relational versus document-database comparisons, alternatives, and source links before publication.',
  },
}

