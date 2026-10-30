import { cachingGuide } from './cachingGuide'
import { databaseGuide } from './databaseGuide'
import { reverseProxyGuide } from './reverseProxyGuide'
import type { GuideVisual } from './types'

/**
 * Reusable visual definitions for the three Phase 3 starter guides.
 * Phase 4 can render these definitions as interactive or step-controlled diagrams.
 */
export const starterVisuals: Record<string, GuideVisual> = {
  requestRouting: reverseProxyGuide.visual,
  cacheHitMiss: cachingGuide.visual,
  databaseReadWrite: databaseGuide.visual,
}

