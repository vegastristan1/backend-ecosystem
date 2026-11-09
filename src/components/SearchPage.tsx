import { useState } from 'react'
import { searchGuides } from '../content/search'
import type { Guide } from '../content/types'
import { Breadcrumbs } from './Breadcrumbs'

interface SearchPageProps {
  guides: Guide[]
}

const exampleQueries = ['Redis', 'cache', 'make repeated reads faster']

export function SearchPage({ guides }: SearchPageProps) {
  const [query, setQuery] = useState('')
  const trimmed = query.trim()
  const results = searchGuides(guides, query)

  return (
    <div className="search-page">
      <Breadcrumbs items={[{ label: 'Home', href: '#top' }, { label: 'Search' }]} />
      <header className="guides-page-heading">
        <p className="eyebrow">Search</p>
        <h1>Find a guide by tool, concept, or problem.</h1>
        <p>
          Search for a product name like Redis, an idea like caching, or the problem you want to solve.
        </p>
      </header>

      <form className="search-form" role="search" onSubmit={(event) => event.preventDefault()}>
        <label className="search-label" htmlFor="guide-search">
          Search the guides
        </label>
        <input
          id="guide-search"
          className="search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="For example: make repeated reads faster"
          autoComplete="off"
        />
      </form>

      <div className="search-results">
        <p className="search-status" role="status">
          {trimmed === ''
            ? 'Type a tool, concept, or problem to see matching guides.'
            : results.length === 0
              ? `No guides found for “${trimmed}”.`
              : `${results.length} ${results.length === 1 ? 'guide' : 'guides'} found for “${trimmed}”.`}
        </p>

        {trimmed === '' && (
          <div className="search-empty">
            <p>Not sure where to start? Try one of these:</p>
            <ul className="search-examples">
              {exampleQueries.map((example) => (
                <li key={example}>
                  <button type="button" onClick={() => setQuery(example)}>
                    {example}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {trimmed !== '' && results.length === 0 && (
          <div className="search-no-results">
            <p>
              The starter set covers the reverse proxy, caching, and databases. Try a
              related word, or browse every guide.
            </p>
            <a className="guide-back-link" href="#guides">
              Browse all guides <span aria-hidden="true">→</span>
            </a>
          </div>
        )}

        {results.length > 0 && (
          <div className="guide-card-grid">
            {results.map((guide) => (
              <a className="guide-card" href={`#guide/${guide.id}`} key={guide.id}>
                <span className="guide-card-category">{guide.category}</span>
                <h2>{guide.name}</h2>
                <p>{guide.concept}</p>
                <span className="guide-card-action">
                  Read guide <span aria-hidden="true">→</span>
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
