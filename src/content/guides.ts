import { authGuide } from './authGuide'
import { backendApplicationGuide } from './backendApplicationGuide'
import { backgroundJobsGuide } from './backgroundJobsGuide'
import { cachingGuide } from './cachingGuide'
import { clientHttpGuide } from './clientHttpGuide'
import { containersGuide } from './containersGuide'
import { databaseGuide } from './databaseGuide'
import { deploymentGuide } from './deploymentGuide'
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
  [backgroundJobsGuide.id]: backgroundJobsGuide,
  [containersGuide.id]: containersGuide,
  [deploymentGuide.id]: deploymentGuide,
}
