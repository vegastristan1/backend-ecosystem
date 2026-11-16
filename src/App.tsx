import { useEffect, useRef, useState } from 'react'
import { track } from '@vercel/analytics'
import { AppShell } from './components/AppShell'
import { GuidePage } from './components/GuidePage'
import { GuidesPage } from './components/GuidesPage'
import { HomePage } from './components/HomePage'
import { SearchPage } from './components/SearchPage'
import { guides } from './content/guides'

function guideIdFromHash(hash: string) {
  const match = hash.match(/^#guide\/(.+)$/)
  return match?.[1] ?? null
}

function isGuidesPage(hash: string) {
  return hash === '#guides'
}

function isSearchPage(hash: string) {
  return hash === '#search'
}

function GuideNotFound({ id }: { id: string }) {
  return (
    <div className="search-page">
      <header className="guides-page-heading">
        <p className="eyebrow">Not found</p>
        <h1>We couldn’t find that guide.</h1>
        <p>
          No guide matches “{id}” yet. The starter set covers the reverse proxy,
          caching, and databases.
        </p>
      </header>
      <div className="search-no-results">
        <a className="guide-back-link" href="#guides">
          Browse all guides <span aria-hidden="true">→</span>
        </a>
        <a className="guide-back-link" href="#search">
          Search guides <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  )
}

function App() {
  const [currentHash, setCurrentHash] = useState(() => window.location.hash)

  useEffect(() => {
    function handleHashChange() {
      setCurrentHash(window.location.hash)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const guideId = guideIdFromHash(currentHash)
  const guide = guideId ? guides[guideId] : undefined
  const showGuides = isGuidesPage(currentHash)
  const showSearch = isSearchPage(currentHash)
  const route = guideId
    ? `guide/${guideId}`
    : showGuides
      ? 'guides'
      : showSearch
        ? 'search'
        : 'home'

  // Hash routing: the library's automatic pageview only fires on full loads,
  // so route changes are tracked manually with a stable route label.
  useEffect(() => {
    track('page_view', { route })
  }, [currentHash, route])

  // Screen-reader cue for route changes: move focus to the new page's heading
  // so the page change is announced. Skips the first run so page load does not
  // steal focus, and skips same-route hash changes (in-page anchors).
  const previousRoute = useRef<string | null>(null)
  useEffect(() => {
    if (previousRoute.current !== null && previousRoute.current !== route) {
      const heading = document.querySelector<HTMLElement>('main h1')
      if (heading) {
        heading.tabIndex = -1
        heading.focus()
      }
    }
    previousRoute.current = route
  }, [route])

  return (
    <AppShell>
      {guide ? (
        <GuidePage guide={guide} />
      ) : showGuides ? (
        <GuidesPage guides={Object.values(guides)} />
      ) : showSearch ? (
        <SearchPage guides={Object.values(guides)} />
      ) : guideId ? (
        <GuideNotFound id={guideId} />
      ) : (
        <HomePage />
      )}
    </AppShell>
  )
}

export default App
