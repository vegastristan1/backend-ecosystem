import { useState } from 'react'
import type { RequestFlow } from '../content/types'

interface RequestFlowExplorerProps {
  flow: RequestFlow
}

export function RequestFlowExplorer({ flow }: RequestFlowExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStep = flow.steps[activeIndex]
  const isFirstStep = activeIndex === 0
  const isLastStep = activeIndex === flow.steps.length - 1

  function moveStep(direction: -1 | 1) {
    setActiveIndex((currentIndex) => currentIndex + direction)
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
        </div>
      </div>

      <ol className="journey-step-list" aria-label="Request journey steps">
        {flow.steps.map((step, index) => (
          <li key={step.id}>
            <button
              className={index === activeIndex ? 'journey-step-button journey-step-button--active' : 'journey-step-button'}
              type="button"
              aria-current={index === activeIndex ? 'step' : undefined}
              onClick={() => setActiveIndex(index)}
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
