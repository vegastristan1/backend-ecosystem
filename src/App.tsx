import { useEffect, useState } from 'react'
import { AppShell } from './components/AppShell'
import { GuidePage } from './components/GuidePage'
import { GuidesPage } from './components/GuidesPage'
import { HomePage } from './components/HomePage'
import { guides } from './content/guides'

function guideIdFromHash(hash: string) {
  const match = hash.match(/^#guide\/(.+)$/)
  return match?.[1] ?? null
}

function isGuidesPage(hash: string) {
  return hash === '#guides'
}

function App() {
  const [guideId, setGuideId] = useState(() => guideIdFromHash(window.location.hash))

  useEffect(() => {
    function handleHashChange() {
      setGuideId(guideIdFromHash(window.location.hash))
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const guide = guideId ? guides[guideId] : undefined
  const showGuides = isGuidesPage(window.location.hash)

  return (
    <AppShell>
      {guide ? <GuidePage guide={guide} /> : showGuides ? <GuidesPage guides={Object.values(guides)} /> : <HomePage />}
    </AppShell>
  )
}

export default App
