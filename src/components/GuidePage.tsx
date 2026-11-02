import type { Guide, GuideStatus } from '../content/types'
import { GuideVisual } from './GuideVisual'

interface GuidePageProps {
  guide: Guide
}

const statusLabels: Record<GuideStatus, string> = {
  draft: 'Draft',
  review: 'Content review',
  published: 'Published',
  archived: 'Archived',
}

function formatId(value: string) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="guide-list">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}

function ReferenceSection({ title, ids }: { title: string; ids: string[] }) {
  if (ids.length === 0) return null

  return (
    <section className="guide-reference" aria-label={title}>
      <h2>{title}</h2>
      <ul className="reference-list">
        {ids.map((id) => <li key={id}>{formatId(id)}</li>)}
      </ul>
    </section>
  )
}

export function GuidePage({ guide }: GuidePageProps) {
  const pageId = `guide-${guide.id}`

  return (
    <article className="guide-page" aria-labelledby={`${pageId}-title`}>
      <header className="guide-heading">
        <div>
          <p className="eyebrow">{formatId(guide.category)} guide</p>
          <p className="guide-concept">{guide.concept}</p>
          <h1 id={`${pageId}-title`}>{guide.name}</h1>
          <p className="guide-summary">{guide.problemSolved}</p>
        </div>
        <span className={`guide-status guide-status--${guide.status}`}>
          {statusLabels[guide.status]}
        </span>
      </header>

      <a className="guide-back-link" href="#journey-preview">
        ← Back to the request journey
      </a>

      <aside className="guide-position" aria-label="Where this fits">
        <strong>Where it fits</strong>
        <p>{guide.position}</p>
      </aside>

      <GuideVisual id={`${pageId}-visual`} visual={guide.visual} />

      <section className="guide-section" aria-labelledby={`${pageId}-steps-title`}>
        <p className="eyebrow">From request to response</p>
        <h2 id={`${pageId}-steps-title`}>How it works</h2>
        <ol className="guide-steps">
          {guide.howItWorks.map((step) => (
            <li key={step.id}>
              <div>
                <h3>{step.title}</h3>
                <p>{step.explanation}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="guide-example guide-section" aria-labelledby={`${pageId}-example-title`}>
        <p className="eyebrow">Put it in context</p>
        <h2 id={`${pageId}-example-title`}>A place-order example</h2>
        <p>{guide.example.scenario}</p>
        {guide.example.request && (
          <pre><code>{guide.example.request}</code></pre>
        )}
        <p>{guide.example.outcome}</p>
      </section>

      <div className="guide-columns">
        <section className="guide-section" aria-labelledby={`${pageId}-benefits-title`}>
          <p className="eyebrow">Why use it?</p>
          <h2 id={`${pageId}-benefits-title`}>Benefits</h2>
          <BulletList items={guide.benefits} />
        </section>
        <section className="guide-section" aria-labelledby={`${pageId}-tradeoffs-title`}>
          <p className="eyebrow">What to consider</p>
          <h2 id={`${pageId}-tradeoffs-title`}>Tradeoffs</h2>
          <BulletList items={guide.tradeoffs} />
        </section>
      </div>

      <section className="guide-section" aria-labelledby={`${pageId}-alternatives-title`}>
        <p className="eyebrow">Other approaches</p>
        <h2 id={`${pageId}-alternatives-title`}>Alternatives</h2>
        <BulletList items={guide.alternatives} />
      </section>

      <div className="guide-references">
        <ReferenceSection title="Prerequisites" ids={guide.prerequisites} />
        <ReferenceSection title="Related guides" ids={guide.relatedGuides} />
        <ReferenceSection title="Learn next" ids={guide.learnNext} />
      </div>

      <section className="guide-section guide-sources" aria-labelledby={`${pageId}-sources-title`}>
        <p className="eyebrow">Further reading</p>
        <h2 id={`${pageId}-sources-title`}>Sources</h2>
        <ul className="source-list">
          {guide.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noreferrer">
                {source.title}
              </a>
              {source.publisher && <span>{source.publisher}</span>}
            </li>
          ))}
        </ul>
        <p className="review-date">
          Last reviewed <time dateTime={guide.lastReviewed}>{guide.lastReviewed}</time>
        </p>
      </section>
    </article>
  )
}
