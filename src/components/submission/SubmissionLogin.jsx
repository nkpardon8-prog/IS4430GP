import { Link } from 'react-router-dom'
import { ViewModeProvider } from '../../context/ViewMode'
import ViewSwitcher from '../ViewSwitcher'
import Login from '../../screens/auth/Login'
import { Button } from '../ui'

// SubmissionLogin — the front door of the graded product. Shows the team's real
// Login screen (S-01, Ellie's, unchanged), but the actual way in is the role
// chooser + visible demo credentials below — there is NO real auth gate, so the
// professor can always get in.
const ROLE_ENTRY = [
  ['Athlete', '/athlete/dashboard'],
  ['Coach', '/coach/dashboard'],
  ['Manager', '/manager/dashboard'],
  ['Admin', '/admin/dashboard'],
]

export default function SubmissionLogin() {
  return (
    <ViewModeProvider mode="submission">
      <div className="flex min-h-dvh flex-col">
        <ViewSwitcher />
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
          <div className="rounded-lg border border-primary/20 bg-primary-soft p-5">
            <h2 className="font-display text-lg font-semibold text-ink">
              Demo access — Student-Athlete Housing System
            </h2>
            <p className="mt-1 text-sm text-ink">
              This is a UI prototype for IS4430. Pick a role to enter the system — no password
              needed:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {ROLE_ENTRY.map(([role, to]) => (
                <Button key={role} as={Link} to={to} size="sm">
                  Enter as {role}
                </Button>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted">
              You can also use the sign-in form below. Demo credentials: UID{' '}
              <span className="font-mono text-ink">u1505426</span>, password{' '}
              <span className="font-mono text-ink">demo</span> — any input works, nothing is
              actually verified.
            </p>
          </div>

          <Login />
        </main>
      </div>
    </ViewModeProvider>
  )
}
