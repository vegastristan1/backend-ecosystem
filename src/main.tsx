import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import App from './App'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Analytics must mount first: its effect installs window.va, which App's
        initial page_view needs — effects run in tree order. */}
    <Analytics />
    <App />
  </StrictMode>,
)
