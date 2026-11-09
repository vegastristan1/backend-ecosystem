import { orderRequestFlow } from '../content/requestFlow'
import { RequestFlowExplorer } from './RequestFlowExplorer'

const starterTopics = ['Reverse proxy', 'Cache', 'Database']

export function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <p className="eyebrow">A beginner-friendly backend learning guide</p>
        <h1 id="home-title">Follow one request through a backend system.</h1>
        <p className="home-intro">
          See what happens after someone clicks “Place order.” Learn what each
          part does, why it is there, and how the request gets back to the
          browser.
        </p>
        <div className="home-actions">
          <a className="primary-action" href="#journey-preview">
            Start the journey <span aria-hidden="true">↓</span>
          </a>
          <span className="scenario-label">Example: placing an order</span>
        </div>
      </section>

      <section className="home-principle" aria-labelledby="home-principle-title">
        <span className="principle-mark" aria-hidden="true">01</span>
        <div>
          <h2 id="home-principle-title">Understand the idea before the tool.</h2>
          <p>
            First learn what a cache is and why an application might use one.
            Then meet Redis as one example—not a technology every system must
            use.
          </p>
        </div>
      </section>

      <RequestFlowExplorer flow={orderRequestFlow} />

      <section
        className="journey-preview"
        id="journey-preview"
        aria-labelledby="journey-preview-title"
      >
        <div className="section-intro">
          <p className="eyebrow">One request, in order</p>
          <h2 id="journey-preview-title">{orderRequestFlow.title}</h2>
          <p>{orderRequestFlow.description}</p>
        </div>
        <ol className="home-flow-list">
          {orderRequestFlow.steps.map((step) => (
            <li className="home-flow-step" key={step.id}>
              <span className="home-flow-order" aria-hidden="true">
                {String(step.order).padStart(2, '0')}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.explanation}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="preview-note">
          This is a simplified example to help build a mental model. Real
          systems can be arranged differently and may not need every part.
        </p>
      </section>

      <section className="starting-points" aria-labelledby="starting-points-title">
        <div className="section-intro">
          <p className="eyebrow">Choose where to begin</p>
          <h2 id="starting-points-title">Learn at your own pace.</h2>
        </div>
        <div className="starting-point-grid">
          <a className="starting-point starting-point--link" href="#journey-preview">
            <span className="starting-point-kicker">Start here</span>
            <h3>Trace a request</h3>
            <p>Get the big picture, from browser request to response.</p>
            <span className="starting-point-action">See the preview <span aria-hidden="true">→</span></span>
          </a>
          <a className="starting-point starting-point--link" href="#guides">
            <span className="starting-point-kicker">Three deep dives</span>
            <h3>Explore starter guides</h3>
            <p>{starterTopics.join(' · ')}</p>
            <span className="starting-point-action">Browse guides <span aria-hidden="true">→</span></span>
          </a>
          <a className="starting-point starting-point--link" href="#search">
            <span className="starting-point-kicker">Find a topic</span>
            <h3>Search by idea or problem</h3>
            <p>Look up a tool, a concept, or something you want to solve.</p>
            <span className="starting-point-action">Search guides <span aria-hidden="true">→</span></span>
          </a>
        </div>
      </section>
    </div>
  )
}
