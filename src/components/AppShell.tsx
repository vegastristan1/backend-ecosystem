import type { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
}

const upcomingSections = ['Journey', 'Guides', 'Search']

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell" id="top">
      <header className="site-header">
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true">BE</span>
          <span>Backend Ecosystem</span>
        </a>
        <nav aria-label="Main navigation">
          <ul className="navigation-list">
            {upcomingSections.map((section) => (
              <li className="navigation-item" key={section}>
                <span>{section}</span>
                <span className="coming-soon">Coming soon</span>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="main-content">{children}</main>
      <footer className="site-footer">
        <p>Understand the problems. Follow the request. Learn the system.</p>
      </footer>
    </div>
  )
}
