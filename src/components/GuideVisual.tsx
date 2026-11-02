import type { GuideVisual as GuideVisualData } from '../content/types'

interface GuideVisualProps {
  id: string
  visual: GuideVisualData
}

export function GuideVisual({ id, visual }: GuideVisualProps) {
  return (
    <figure className="guide-visual" aria-labelledby={`${id}-title`}>
      <figcaption className="visual-caption">
        <p className="eyebrow">Static diagram</p>
        <h2 id={`${id}-title`}>{visual.title}</h2>
        <p>{visual.description}</p>
      </figcaption>

      {visual.steps && visual.steps.length > 0 && (
        <ol className="visual-steps">
          {visual.steps.map((step) => (
            <li className="visual-step" key={step.id}>
              <span className="step-title">{step.title}</span>
              <span>{step.explanation}</span>
            </li>
          ))}
        </ol>
      )}

      <p className="visual-fallback">
        <strong>Text alternative:</strong> {visual.fallback}
      </p>
    </figure>
  )
}
