import { useState } from 'react'
import { track } from '@vercel/analytics'
import { guides } from '../content/guides'
import type { RequestFlow } from '../content/types'

interface RequestFlowExplorerProps {
  flow: RequestFlow
}

export function RequestFlowExplorer({ flow }: RequestFlowExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStep = flow.steps[activeIndex]
  const activeGuide = activeStep.guideId ? guides[activeStep.guideId] : undefined
  const isFirstStep = activeIndex === 0
  const isLastStep = activeIndex === flow.steps.length - 1

  function selectStep(index: number) {
    track('journey_step', { step: flow.steps[index].title, index: index + 1 })
    setActiveIndex(index)
  }

  function moveStep(direction: -1 | 1) {
    selectStep(activeIndex + direction)
  }

  return (
    <section className="journey-explorer" aria-labelledby="journey-explorer-title">
      <div className="section-intro">
        <p className="eyebrow">Step through the request</p>
        <h2 id="journey-explorer-title">{flow.title}</h2>
        <p>{flow.description}</p>
      </div>

      <div className="journey-progress" aria-live="polite">
        Step {activeIndex + 1} of {flow.steps.length}
      </div>

      <ol className="journey-system-map" aria-label="Backend system map">
        {flow.steps.map((step, index) => (
          <li className="journey-system-map-item" key={step.componentId}>
            <span
              className={index === activeIndex ? 'journey-component journey-component--active' : 'journey-component'}
              aria-current={index === activeIndex ? 'step' : undefined}
            >
              {step.title}
            </span>
            {index < flow.steps.length - 1 && (
              <span className="journey-system-connector" aria-hidden="true">→</span>
            )}
          </li>
        ))}
      </ol>

      <div className="journey-step-panel" aria-labelledby="active-step-title">
        <span className="journey-step-number" aria-hidden="true">
          {String(activeStep.order).padStart(2, '0')}
        </span>
        <div>
          <p className="eyebrow">Current step</p>
          <h3 id="active-step-title">{activeStep.title}</h3>
          <p>{activeStep.explanation}</p>
          {activeGuide ? (
            <div className="journey-guide-links">
              <a className="journey-guide-link" href={`#guide/${activeGuide.id}`}>
                Read the {activeGuide.name} guide <span aria-hidden="true">→</span>
              </a>
              {activeGuide.relatedGuides.length > 0 && (
                <span className="journey-related-links">
                  Related:{' '}
                  {activeGuide.relatedGuides.map((guideId, index) => {
                    const relatedGuide = guides[guideId]
                    if (!relatedGuide) return null
                    return (
                      <span key={guideId}>
                        {index > 0 && ', '}
                        <a href={`#guide/${relatedGuide.id}`}>{relatedGuide.name}</a>
                      </span>
                    )
                  })}
                </span>
              )}
            </div>
          ) : (
            <p className="journey-concept-note">A dedicated guide for this concept is coming later.</p>
          )}
        </div>
      </div>

      <ol className="journey-step-list" aria-label="Request journey steps">
        {flow.steps.map((step, index) => (
          <li key={step.id}>
            <button
              className={index === activeIndex ? 'journey-step-button journey-step-button--active' : 'journey-step-button'}
              type="button"
              aria-current={index === activeIndex ? 'step' : undefined}
              onClick={() => selectStep(index)}
            >
              <span aria-hidden="true">{String(step.order).padStart(2, '0')}</span>
              {step.title}
            </button>
          </li>
        ))}
      </ol>

      <div className="journey-controls">
        <button type="button" onClick={() => moveStep(-1)} disabled={isFirstStep}>
          Previous step
        </button>
        <button type="button" onClick={() => moveStep(1)} disabled={isLastStep}>
          Next step <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}
