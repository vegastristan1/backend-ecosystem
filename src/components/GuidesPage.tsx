import type { Guide } from '../content/types'
import { Breadcrumbs } from './Breadcrumbs'

interface GuidesPageProps {
  guides: Guide[]
}

export function GuidesPage({ guides }: GuidesPageProps) {
  return (
    <div className="guides-page">
      <Breadcrumbs items={[{ label: 'Home', href: '#top' }, { label: 'Guides' }]} />
      <header className="guides-page-heading">
        <p className="eyebrow">Starter guides</p>
        <h1>Learn the parts behind the request.</h1>
        <p>
          Start with the idea, then explore how each part helps a backend handle a place-order request.
        </p>
      </header>

      <div className="guide-card-grid">
        {guides.map((guide) => (
          <a className="guide-card" href={`#guide/${guide.id}`} key={guide.id}>
            <span className="guide-card-category">{guide.category}</span>
            <h2>{guide.name}</h2>
            <p>{guide.concept}</p>
            <span className="guide-card-action">Read guide <span aria-hidden="true">→</span></span>
          </a>
        ))}
      </div>
    </div>
  )
}
