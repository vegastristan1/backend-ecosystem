import { AppShell } from './components/AppShell'
import { GuideVisual } from './components/GuideVisual'
import { starterVisuals } from './content/starterVisuals'

function App() {
  return (
    <AppShell>
      <h1>Backend Ecosystem</h1>
      <section className="starter-visuals" aria-labelledby="starter-visuals-title">
        <div className="starter-visuals-heading">
          <p className="eyebrow">Learn through static diagrams</p>
          <h2 id="starter-visuals-title">Three parts of a backend request</h2>
        </div>
        {Object.entries(starterVisuals).map(([id, visual]) => (
          <GuideVisual id={id} key={id} visual={visual} />
        ))}
      </section>
    </AppShell>
  )
}

export default App
