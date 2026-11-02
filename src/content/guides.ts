import { cachingGuide } from './cachingGuide'
import { databaseGuide } from './databaseGuide'
import { reverseProxyGuide } from './reverseProxyGuide'
import type { Guide } from './types'

export const guides: Record<string, Guide> = {
  [reverseProxyGuide.id]: reverseProxyGuide,
  [cachingGuide.id]: cachingGuide,
  [databaseGuide.id]: databaseGuide,
}
