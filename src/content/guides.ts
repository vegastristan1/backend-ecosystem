import { cachingGuide } from './cachingGuide'
import { clientHttpGuide } from './clientHttpGuide'
import { databaseGuide } from './databaseGuide'
import { reverseProxyGuide } from './reverseProxyGuide'
import type { Guide } from './types'

export const guides: Record<string, Guide> = {
  [clientHttpGuide.id]: clientHttpGuide,
  [reverseProxyGuide.id]: reverseProxyGuide,
  [cachingGuide.id]: cachingGuide,
  [databaseGuide.id]: databaseGuide,
}
