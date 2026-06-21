import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import TabNav from './TabNav'
import Footer from './Footer'
import ViewSwitcher from './ViewSwitcher'
import { ViewModeProvider } from '../context/ViewMode'

// Team view layout — the project-management dashboard. Provides ViewMode='team'
// so screens render with full dev meta (owner / req / progress).
export default function Layout() {
  const { pathname } = useLocation()
  // Scroll to top on route change (predictable back/forward behavior).
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <ViewModeProvider mode="team">
      <div className="flex min-h-dvh flex-col">
        <ViewSwitcher />
        <TabNav />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ViewModeProvider>
  )
}
