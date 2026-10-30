export type GuideStatus = 'draft' | 'review' | 'published' | 'archived'

export type GuideCategory =
  | 'foundation'
  | 'networking'
  | 'application'
  | 'data'
  | 'asynchronous-work'
  | 'delivery'
  | 'operations'
  | 'security'

export type DiagramKind = 'request-flow' | 'sequence' | 'state' | 'read-write'

export type ToolNameConfidence = 'confirmed' | 'uncertain'

export interface SourceReference {
  title: string
  url: string
  publisher?: string
  accessedAt?: string
}

export interface PublicationReview {
  toolNameConfidence: ToolNameConfidence
  requiresReview: boolean
  reviewNotes?: string
}

export interface HowItWorksStep {
  id: string
  title: string
  explanation: string
  visualState?: string
}

export interface GuideVisual {
  kind: DiagramKind
  title: string
  description: string
  fallback: string
  steps?: HowItWorksStep[]
}

export interface GuideExample {
  scenario: string
  request?: string
  outcome: string
}

export interface Guide {
  id: string
  name: string
  category: GuideCategory
  tags: string[]
  status: GuideStatus
  concept: string
  problemSolved: string
  position: string
  howItWorks: HowItWorksStep[]
  visual: GuideVisual
  example: GuideExample
  benefits: string[]
  tradeoffs: string[]
  alternatives: string[]
  prerequisites: string[]
  relatedGuides: string[]
  learnNext: string[]
  aliases: string[]
  searchProblems: string[]
  sources: SourceReference[]
  lastReviewed: string
  publicationReview: PublicationReview
}

export interface RequestFlowStep {
  id: string
  order: number
  title: string
  componentId: string
  explanation: string
  visualState?: string
  guideId?: string
}

export interface RequestFlow {
  id: string
  title: string
  description: string
  steps: RequestFlowStep[]
}

