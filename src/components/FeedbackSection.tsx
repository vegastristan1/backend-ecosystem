import { useEffect, useRef, useState } from 'react'
import { guides } from '../content/guides'

// Hash-routed site: giscus "pathname" mapping would put every page in one
// thread, so each route maps to a stable human-readable term instead.
function termFromHash(hash: string): string {
  if (hash.startsWith('#guide/')) {
    const id = hash.slice('#guide/'.length)
    return guides[id]?.name ?? `Unknown guide (${id})`
  }
  if (hash === '#guides') return 'Guides'
  if (hash === '#search') return 'Search'
  return 'Home'
}

export function FeedbackSection() {
  const [term, setTerm] = useState(() => termFromHash(window.location.hash))
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleHashChange() {
      setTerm(termFromHash(window.location.hash))
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Re-inject the giscus script whenever the route (term) changes.
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.innerHTML = ''
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.setAttribute('data-repo', 'vegastristan1/backend-ecosystem')
    script.setAttribute('data-repo-id', 'R_kgDOVakXFw')
    script.setAttribute('data-category', 'General')
    script.setAttribute('data-category-id', 'DIC_kwDOVakXF84DKydu')
    script.setAttribute('data-mapping', 'specific')
    script.setAttribute('data-term', term)
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', 'light')
    script.setAttribute('data-lang', 'en')
    script.setAttribute('crossorigin', 'anonymous')
    container.appendChild(script)

    return () => {
      container.innerHTML = ''
    }
  }, [term])

  return (
    <section className="feedback-section" aria-labelledby="feedback-title">
      <h2 id="feedback-title">Feedback on this page</h2>
      <p>
        Share a question, a correction, or what didn’t click. Comments are
        stored as GitHub Discussions and need a free GitHub account.
      </p>
      <div className="giscus-container" ref={containerRef} />
    </section>
  )
}
