import { Link, useLocation } from 'react-router-dom'

// ViewSwitcher — the slim top strip that flips between the clean product
// (Submission view, /) and the team dashboard (Team view, /team). Shown on both.
export default function ViewSwitcher() {
  const { pathname } = useLocation()
  const isTeam = pathname === '/team' || pathname.startsWith('/team/')

  const tab = (active) =>
    `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
      active ? 'bg-primary text-white' : 'text-muted hover:text-ink'
    }`

  return (
    <div className="border-b border-line bg-canvas">
      <div className="mx-auto flex h-11 max-w-6xl items-center justify-between px-4">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          University of Utah · Athlete Housing
        </span>
        <div className="flex items-center gap-0.5 rounded-lg border border-line bg-surface p-0.5">
          <Link to="/" className={tab(!isTeam)}>Submission view</Link>
          <Link to="/team" className={tab(isTeam)}>Team view</Link>
        </div>
      </div>
    </div>
  )
}
