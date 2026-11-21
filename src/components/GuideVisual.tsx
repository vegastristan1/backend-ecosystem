import { useState } from 'react'
import type { GuideVisual as GuideVisualData } from '../content/types'

interface GuideVisualProps {
  id: string
  visual: GuideVisualData
}

export function GuideVisual({ id, visual }: GuideVisualProps) {
  const steps = visual.steps ?? []
  const hasSteps = steps.length > 0
  // Keyed by guide id in GuidePage, so a stale index can't outlive its guide;
  // still guard in case a future caller skips the key.
  const [activeIndex, setActiveIndex] = useState(0)
  const safeIndex = Math.min(activeIndex, steps.length - 1)
  const isFirst = safeIndex <= 0
  const isLast = safeIndex >= steps.length - 1

  return (
    <figure className="guide-visual" aria-labelledby={`${id}-title`}>
      <figcaption className="visual-caption">
        <p className="eyebrow">{hasSteps ? 'Step-through diagram' : 'Static diagram'}</p>
        <h2 id={`${id}-title`}>{visual.title}</h2>
        <p>{visual.description}</p>
      </figcaption>

      {hasSteps && (
        <p className="journey-progress" aria-live="polite">
          Step {safeIndex + 1} of {steps.length}
        </p>
      )}

      {hasSteps && (
        <ol className="visual-steps">
          {steps.map((step, index) => (
            <li key={step.id}>
              <button
                type="button"
                className={
                  index === safeIndex
                    ? 'visual-step visual-step--active'
                    : 'visual-step'
                }
                aria-current={index === safeIndex ? 'step' : undefined}
                onClick={() => setActiveIndex(index)}
              >
                <span className="step-title">{step.title}</span>
                <span>{step.explanation}</span>
              </button>
            </li>
          ))}
        </ol>
      )}

      {hasSteps && (
        <div className="journey-controls">
          <button type="button" disabled={isFirst} onClick={() => setActiveIndex(safeIndex - 1)}>
            Previous step
          </button>
          <button type="button" disabled={isLast} onClick={() => setActiveIndex(safeIndex + 1)}>
            Next step <span aria-hidden="true">→</span>
          </button>
        </div>
      )}

      <p className="visual-fallback">
        <strong>Text alternative:</strong> {visual.fallback}
      </p>
    </figure>
  )
}
