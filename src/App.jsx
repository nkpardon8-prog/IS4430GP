import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import SubmissionLayout from './components/submission/SubmissionLayout'
import SubmissionLogin from './components/submission/SubmissionLogin'
import Home from './screens/Home'
import StyleGuide from './screens/StyleGuide'
import RoleIndex from './screens/RoleIndex'
import { SCREENS } from './data/screens'
import { Button } from './components/ui'
import { TEAM_BASE } from './lib/routes'

// Every screen's component, keyed by its registry id.
import Login from './screens/auth/Login'
import AccessDenied from './screens/auth/AccessDenied'
import AthleteDashboard from './screens/athlete/Dashboard'
import Search from './screens/athlete/Search'
import Details from './screens/athlete/Details'
import Submit from './screens/athlete/Submit'
import Status from './screens/athlete/Status'
import Profile from './screens/athlete/Profile'
import CoachDashboard from './screens/coach/Dashboard'
import Review from './screens/coach/Review'
import CoachAthlete from './screens/coach/Athlete'
import ManagerDashboard from './screens/manager/Dashboard'
import Decision from './screens/manager/Decision'
import History from './screens/manager/History'
import AdminDashboard from './screens/admin/Dashboard'
import Users from './screens/admin/Users'
import Budgets from './screens/admin/Budgets'
import Websites from './screens/admin/Websites'
import Collection from './screens/admin/Collection'
import Audit from './screens/admin/Audit'

const COMPONENTS = {
  'S-01': Login, 'S-02': AccessDenied,
  'A-01': AthleteDashboard, 'A-02': Search, 'A-03': Details,
  'A-04': Submit, 'A-05': Status, 'A-06': Profile,
  'C-01': CoachDashboard, 'C-02': Review, 'C-03': CoachAthlete,
  'M-01': ManagerDashboard, 'M-02': Decision, 'M-03': History,
  'D-01': AdminDashboard, 'D-02': Users, 'D-03': Budgets,
  'D-04': Websites, 'D-05': Collection, 'D-06': Audit,
}

function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="font-display text-3xl font-semibold text-ink">Page not found</h1>
      <p className="mt-2 text-muted">That route doesn’t exist in the prototype.</p>
      <Button as={Link} to="/" className="mt-6">Back to sign in</Button>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      {/* ---------- Submission view (default, clean product) ---------- */}
      {/* Front door: login + role chooser */}
      <Route path="/" element={<SubmissionLogin />} />
      <Route path="/login" element={<Navigate to="/" replace />} />
      {/* All non-auth screens at their own paths, in the clean product chrome */}
      <Route element={<SubmissionLayout />}>
        {SCREENS.filter((s) => s.role !== 'Auth').map((s) => {
          const Comp = COMPONENTS[s.id]
          return <Route key={s.id} path={s.path} element={<Comp />} />
        })}
        <Route path="/access-denied" element={<AccessDenied />} />
      </Route>

      {/* ---------- Team view (project-management dashboard) ---------- */}
      <Route path={TEAM_BASE} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="style-guide" element={<StyleGuide />} />
        <Route path="athlete" element={<RoleIndex role="Athlete" />} />
        <Route path="coach" element={<RoleIndex role="Coach" />} />
        <Route path="manager" element={<RoleIndex role="Manager" />} />
        <Route path="admin" element={<RoleIndex role="Admin" />} />
        {SCREENS.map((s) => {
          const Comp = COMPONENTS[s.id]
          // s.path is absolute ('/athlete/dashboard'); make it relative to /team
          return <Route key={s.id} path={s.path.slice(1)} element={<Comp />} />
        })}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
