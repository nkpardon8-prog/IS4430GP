// S-02 · Access Denied
// Owner: Ellie · Traces to REQ-ROLE-004 §3.6, REQ-SEC-005
import { Link } from 'react-router-dom'
import { ShieldOff, ArrowLeft } from 'lucide-react'
import { Button, Card, CardBody } from '../../components/ui'

// ============================================================================
//  S-02 · Access Denied — shown when a logged-in user (or a logged-out
//  visitor) hits a page their role doesn't permit. Deliberately shows no
//  details about why or what's behind the page (REQ-SEC-005 NFR-58).
// ============================================================================

export default function AccessDenied() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-danger-soft text-danger">
          <ShieldOff className="h-7 w-7" aria-hidden="true" />
        </span>

        <h1 className="mt-5 font-display text-2xl font-semibold text-ink">
          You don&rsquo;t have access to this page
        </h1>
        <p className="mt-2 text-sm text-muted">
          Your account doesn&rsquo;t have permission to view this content. If you
          think this is a mistake, contact your athletic department administrator.
        </p>

        <Card className="mt-6 text-left">
          <CardBody className="py-3 text-xs text-muted">
            No further details are shown for this page, in line with the
            system&rsquo;s data security rules.
          </CardBody>
        </Card>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button as={Link} to="/login" size="md">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Return to login
          </Button>
          <Button as={Link} to="/" variant="secondary" size="md">
            Go to home
          </Button>
        </div>
      </div>
    </div>
  )
}