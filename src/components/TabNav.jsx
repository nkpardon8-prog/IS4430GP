import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, Home as HomeIcon } from 'lucide-react'

// Team view lives under /team, so every tab is prefixed.
const TABS = [
  { to: '/team', label: 'Home', end: true },
  { to: '/team/athlete', label: 'Athlete' },
  { to: '/team/coach', label: 'Coach' },
  { to: '/team/manager', label: 'Manager' },
  { to: '/team/admin', label: 'Admin' },
  { to: '/team/style-guide', label: 'Style Guide' },
]

function tabClass({ isActive }) {
  return `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-primary-soft text-primary' : 'text-muted hover:bg-canvas hover:text-ink'
  }`
}

export default function TabNav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Brand */}
        <Link to="/team" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary font-display text-lg font-bold text-white">
            U
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold text-ink">Athlete Housing</span>
            <span className="block text-xs text-muted">University of Utah · IS4430GP</span>
          </span>
        </Link>

        {/* Desktop tabs */}
        <nav className="hidden items-center gap-1 md:flex">
          {TABS.map((t) => (
            <NavLink key={t.to} to={t.to} end={t.end} className={tabClass}>
              {t.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-ink hover:bg-canvas md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-line bg-surface px-4 py-2 md:hidden">
          {TABS.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive ? 'bg-primary-soft text-primary' : 'text-muted hover:bg-canvas'
                }`
              }
            >
              {t.label === 'Home' && <HomeIcon className="h-4 w-4" />}
              {t.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
