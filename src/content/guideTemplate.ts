import type { Guide } from './types'

/**
 * Structural template for future guides. Replace the placeholder values before
 * changing status from draft to review or published.
 */
export const guideTemplate: Guide = {
  id: 'guide-id',
  name: 'Guide name',
  category: 'foundation',
  tags: ['concept'],
  status: 'draft',
  concept: 'The underlying concept this guide teaches.',
  problemSolved: 'The problem this concept or tool helps solve.',
  position: 'Where this component commonly appears in a system.',
  howItWorks: [
    {
      id: 'step-1',
      title: 'First step',
      explanation: 'Explain one observable step in plain language.',
      visualState: 'initial',
    },
  ],
  visual: {
    kind: 'sequence',
    title: 'Visual explanation',
    description: 'Explain what the learner should see in the visual.',
    fallback: 'Provide the same explanation as readable text for non-animated use.',
  },
  example: {
    scenario: 'A small concrete scenario.',
    outcome: 'What happens and why.',
  },
  benefits: ['Benefit of using this concept or tool.'],
  tradeoffs: ['Complexity or limitation to consider.'],
  alternatives: ['A reasonable alternative.'],
  prerequisites: [],
  relatedGuides: [],
  learnNext: [],
  aliases: [],
  searchProblems: [],
  sources: [],
  lastReviewed: '2026-10-30',
  publicationReview: {
    toolNameConfidence: 'confirmed',
    requiresReview: true,
    reviewNotes: 'Replace the template values and verify product names before publication.',
  },
}

