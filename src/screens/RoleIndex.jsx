import { screensByRole } from '../data/screens'
import ScreenCard from '../components/ScreenCard'
import Badge from '../components/ui/Badge'

// RoleIndex — landing page for a role (Athlete/Coach/Manager/Admin). Lists every
// screen in that role as a card. App.jsx renders one of these per role tab.
const ROLE_INTRO = {
  Athlete:
    'What a student-athlete sees: find a residence, compare it to their housing budget, submit a choice, and track the decision.',
  Coach:
    'Coaches review their assigned athletes’ submissions and add a recommendation. They do not make the final approve/reject decision.',
  Manager:
    'Athletic managers see all pending requests and make the approve / reject decision, with an optional comment or reason.',
  Admin:
    'System admins manage users and roles, housing budgets, approved rental websites, listing collection, and the audit log.',
}

export default function RoleIndex({ role }) {
  const screens = screensByRole(role)
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Badge role={role}>{role}</Badge>
          <span className="text-sm text-muted">{screens.length} screens</span>
        </div>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink">{role} screens</h1>
        <p className="mt-1 max-w-2xl text-muted">{ROLE_INTRO[role]}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {screens.map((s) => (
          <ScreenCard key={s.id} screen={s} />
        ))}
      </div>
    </div>
  )
}
