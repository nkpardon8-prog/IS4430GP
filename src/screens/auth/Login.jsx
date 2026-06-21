// S-01 · Login (UID + Password)
// Owner: Ellie · Traces to REQ-AUTH-001
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, AlertCircle } from 'lucide-react'
import { Button, Card, CardBody, Field } from '../../components/ui'

// ============================================================================
//  S-01 · Login — visual prototype only. Submitting with the sample invalid
//  UID below shows the error state called out in REQ-AUTH-001 (FR-3, NFR-13).
//  No real auth — this just flips local state to demonstrate both states.
// ============================================================================

export default function Login() {
  const [uid, setUid] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // Sample-data demo: any UID containing "invalid" triggers the error state,
    // so the screen can show both outcomes without a real backend.
    setError(uid.trim().toLowerCase().includes('invalid') || uid.trim() === '')
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary">
            <ShieldCheck className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 className="mt-4 font-display text-2xl font-semibold text-ink">
            Athlete Housing Sign In
          </h1>
          <p className="mt-1 text-sm text-muted">
            University of Utah Athletics &middot; sign in with your University UID
          </p>
        </div>

        <Card>
          <CardBody>
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <Field
                label="University UID"
                placeholder="u1234567"
                required
                autoComplete="username"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                error={error ? ' ' : undefined}
              />
              <Field
                label="Password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-lg border border-danger/30 bg-danger-soft px-3 py-2.5 text-sm text-danger"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    We couldn&rsquo;t sign you in. Check your UID and password and try
                    again.
                  </span>
                </div>
              )}

              <Button type="submit" className="w-full" size="lg">
                Sign in
              </Button>
            </form>

            <p className="mt-4 text-center text-xs text-muted">
              Having trouble? Contact the Athletic Department IT desk.
            </p>
          </CardBody>
        </Card>

        <p className="mt-6 text-center text-xs text-muted">
          Try an invalid UID to preview the error state &middot;{' '}
          <Link to="/access-denied" className="font-medium text-primary hover:underline">
            View Access Denied screen
          </Link>
        </p>
      </div>
    </div>
  )
}