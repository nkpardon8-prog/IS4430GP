import { Outlet, useLocation, NavLink, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { LogOut } from 'lucide-react'
import { SCREENS, screensByRole } from '../../data/screens'
import { ViewModeProvider } from '../../context/ViewMode'
import ViewSwitcher from '../ViewSwitcher'

// SubmissionLayout — clean product chrome for the graded view. The top bar shows
// the brand, a "signed in as {role}" label, a sign-out link, and a nav of the
// current role's screens. The role is inferred from the URL, so navigating into
// any screen shows that role's menu — like real software.
export default function SubmissionLayout() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])

  const current = SCREENS.find((s) => s.path === pathname)
  const role = current && current.role !== 'Auth' ? current.role : null
  const navScreens = role ? screensByRole(role) : []

  return (
    <ViewModeProvider mode="submission">
      <div className="flex min-h-dvh flex-col">
        <ViewSwitcher />
        <header className="sticky top-0 z-30 border-b border-line bg-surface/90 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex h-14 items-center justify-between">
              <Link to="/" className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary font-display text-base font-bold text-white">
                  U
                </span>
                <span className="font-display text-base font-semibold text-ink">Athlete Housing</span>
              </Link>
              <div className="flex items-center gap-3 text-sm text-muted">
                {role && (
                  <span className="hidden sm:inline">
                    Signed in as <span className="font-medium text-ink">{role}</span>
                  </span>
                )}
                <Link to="/" className="inline-flex items-center gap-1.5 hover:text-ink">
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Sign out
                </Link>
              </div>
            </div>
            {navScreens.length > 0 && (
              <nav className="-mb-px flex gap-1 overflow-x-auto">
                {navScreens.map((s) => (
                  <NavLink
                    key={s.id}
                    to={s.path}
                    end
                    className={({ isActive }) =>
                      `whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted hover:text-ink'
                      }`
                    }
                  >
                    {s.title}
                  </NavLink>
                ))}
              </nav>
            )}
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
          <Outlet />
        </main>
      </div>
    </ViewModeProvider>
  )
}
