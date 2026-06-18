import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import TabNav from './TabNav'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()
  // Scroll to top on route change (predictable back/forward behavior).
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-dvh flex-col">
      <TabNav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
