import { authGuide } from './authGuide'
import { backendApplicationGuide } from './backendApplicationGuide'
import { cachingGuide } from './cachingGuide'
import { clientHttpGuide } from './clientHttpGuide'
import { databaseGuide } from './databaseGuide'
import { responseGuide } from './responseGuide'
import { reverseProxyGuide } from './reverseProxyGuide'
import type { Guide } from './types'

export const guides: Record<string, Guide> = {
  [clientHttpGuide.id]: clientHttpGuide,
  [reverseProxyGuide.id]: reverseProxyGuide,
  [backendApplicationGuide.id]: backendApplicationGuide,
  [authGuide.id]: authGuide,
  [cachingGuide.id]: cachingGuide,
  [databaseGuide.id]: databaseGuide,
  [responseGuide.id]: responseGuide,
}
