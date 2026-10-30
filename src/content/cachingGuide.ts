import type { Guide } from './types'

/**
 * Starter guide for the cache step in the place-order journey.
 * Keep this as a draft until the content and terminology review is complete.
 */
export const cachingGuide: Guide = {
  id: 'caching',
  name: 'Caching with Redis',
  category: 'data',
  tags: ['cache', 'caching', 'redis', 'cache-aside', 'performance'],
  status: 'draft',
  concept:
    'A cache is a fast temporary copy of data that an application can reuse instead of repeating the slower primary lookup every time.',
  problemSolved:
    'Caching reduces repeated database work and can make frequently requested reads respond faster, while accepting that cached data may be briefly out of date.',
  position:
    'The application checks the cache during its read path, usually before asking the database for the same data.',
  howItWorks: [
    {
      id: 'check-cache',
      title: 'Check the cache',
      explanation:
        'The application creates a predictable key for the data it needs and asks Redis whether that key has a value.',
      visualState: 'cache-checked',
    },
    {
      id: 'cache-hit',
      title: 'Return a cache hit',
      explanation:
        'If Redis has a usable value, the application returns it without querying the primary database.',
      visualState: 'cache-hit',
    },
    {
      id: 'cache-miss',
      title: 'Handle a cache miss',
      explanation:
        'If the key is missing or expired, the application reads the current value from the database.',
      visualState: 'cache-miss',
    },
    {
      id: 'store-with-ttl',
      title: 'Store a temporary copy',
      explanation:
        'The application puts the database result in Redis with an expiration time, then returns the result to the client.',
      visualState: 'cache-filled',
    },
    {
      id: 'invalidate-on-write',
      title: 'Invalidate changed data',
      explanation:
        'When the underlying record changes, the application can remove the related cache key so a later read loads fresh data.',
      visualState: 'cache-invalidated',
    },
  ],
  visual: {
    kind: 'state',
    title: 'How a cache hit and miss work',
    description:
      'Compare the fast cache-hit path with the database fallback used when the requested value is not available in Redis.',
    fallback:
      'Request data → check Redis → on a hit, return the cached value → on a miss, read the database → store the result in Redis with a TTL → return the value. When the source data changes, invalidate the related cache key.',
    steps: [
      {
        id: 'cache-hit-path',
        title: 'Cache hit',
        explanation: 'Redis has the requested value, so the application can skip the database read.',
        visualState: 'hit',
      },
      {
        id: 'cache-miss-path',
        title: 'Cache miss',
        explanation: 'Redis has no usable value, so the application reads the database and repopulates the cache.',
        visualState: 'miss',
      },
      {
        id: 'cache-expiration',
        title: 'Expiration or invalidation',
        explanation: 'A TTL or an explicit delete prevents an old value from remaining indefinitely.',
        visualState: 'expired',
      },
    ],
  },
  example: {
    scenario:
      'A learner places an order, and the application needs to read the current product details before completing the order.',
    request:
      'GET product:42 → Redis → on miss, database → SET product:42 with a short TTL → return product details',
    outcome:
      'Repeated product reads can use Redis instead of repeating the same database query. The database remains the durable source of truth, and the cache entry is refreshed or invalidated when needed.',
  },
  benefits: [
    'Can reduce repeated reads against the primary database.',
    'Can lower response time for frequently requested data.',
    'Can scale read-heavy paths by keeping a working set in memory.',
    'Lets the application cache only data that is actually requested when using cache-aside.',
  ],
  tradeoffs: [
    'Cached data can be stale until its TTL expires or the application invalidates it.',
    'Every cache key needs a naming, expiration, and invalidation strategy.',
    'A cache miss adds a fallback database read, and many simultaneous misses can create a cache stampede.',
    'Redis is additional infrastructure to operate, monitor, secure, and size correctly.',
    'A cache should not be treated as the only durable copy of important application data.',
  ],
  alternatives: [
    'An in-process application cache for a single instance',
    'Memcached for simple key/value caching',
    'A database query or index without a separate cache',
    'A CDN or HTTP cache for cacheable public responses',
  ],
  prerequisites: ['backend-application', 'database'],
  relatedGuides: ['reverse-proxy', 'database'],
  learnNext: ['database'],
  aliases: ['cache', 'caching', 'Redis cache', 'cache hit', 'cache miss', 'TTL'],
  searchProblems: [
    'How can I make repeated reads faster?',
    'What is the difference between a cache hit and a cache miss?',
    'How can I reduce repeated database queries?',
    'How do I keep cached data from staying stale forever?',
  ],
  sources: [
    {
      title: 'Redis cache-aside',
      url: 'https://redis.io/docs/latest/develop/use-cases/cache-aside/',
      publisher: 'Redis',
      accessedAt: '2026-10-30',
    },
    {
      title: 'Redis data types',
      url: 'https://redis.io/docs/latest/develop/data-types/',
      publisher: 'Redis',
      accessedAt: '2026-10-30',
    },
    {
      title: 'Keys and values: key expiration and TTL',
      url: 'https://redis.io/docs/latest/develop/using-commands/keyspace/',
      publisher: 'Redis',
      accessedAt: '2026-10-30',
    },
  ],
  lastReviewed: '2026-10-30',
  publicationReview: {
    toolNameConfidence: 'confirmed',
    requiresReview: true,
    reviewNotes:
      'Draft completed. Review cache consistency wording, TTL examples, alternatives, and source links before publication.',
  },
}

