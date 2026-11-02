import { AppShell } from './components/AppShell'
import { GuidePage } from './components/GuidePage'
import { reverseProxyGuide } from './content/reverseProxyGuide'

function App() {
  return (
    <AppShell>
      <GuidePage guide={reverseProxyGuide} />
    </AppShell>
  )
}

export default App
