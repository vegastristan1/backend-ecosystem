import { useEffect, useState } from 'react'
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
