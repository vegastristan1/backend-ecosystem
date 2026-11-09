import type { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
}

const navigationItems = [
  { label: 'Journey', href: '#journey-preview' },
  { label: 'Guides', href: '#guides' },
  { label: 'Search', href: '#search' },
]

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell" id="top">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true">BE</span>
          <span>Backend Ecosystem</span>
        </a>
        <nav aria-label="Main navigation">
          <ul className="navigation-list">
            {navigationItems.map((item) => (
              <li className="navigation-item" key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="main-content" id="main-content" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <p>Understand the problems. Follow the request. Learn the system.</p>
        <button type="button" className="back-to-top" onClick={() => window.scrollTo({ top: 0 })}>
          Back to top <span aria-hidden="true">↑</span>
        </button>
      </footer>
    </div>
  )
}
