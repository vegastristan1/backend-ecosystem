import { guides } from '../content/guides'

export function Sidebar() {
  return (
    <aside className="sidebar">
      <nav aria-label="Sidebar navigation" className="sidebar-nav">
        <div className="sidebar-group">
          <p className="sidebar-label">Start here</p>
          <a href="#journey-preview">Trace a request</a>
        </div>
        <div className="sidebar-group">
          <p className="sidebar-label">Starter guides</p>
          {Object.values(guides).map((guide) => (
            <a href={`#guide/${guide.id}`} key={guide.id}>
              {guide.name}
            </a>
          ))}
          <a href="#guides">All guides</a>
        </div>
        <div className="sidebar-group">
          <p className="sidebar-label">Find a topic</p>
          <a href="#search">Search</a>
        </div>
      </nav>
    </aside>
  )
}
