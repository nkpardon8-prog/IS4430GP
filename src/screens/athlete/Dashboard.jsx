import { Link } from 'react-router-dom'
import { Search, MapPin, ArrowRight, Wallet, Clock } from 'lucide-react'
import { screenById } from '../../data/screens'
import ScreenHeader from '../../components/ScreenHeader'
import { Button, Card, CardBody, CardHeader, Badge, Field } from '../../components/ui'

// ============================================================================
//  A-01 · Athlete Dashboard  —  WORKED EXAMPLE / TEMPLATE
//  ----------------------------------------------------------------------------
//  This is a finished screen. Copy its shape when you build yours:
//    1. <ScreenHeader screen={screenById('YOUR-ID')} />  ← keeps the title block consistent
//    2. Lay out content with <Card>/<CardHeader>/<CardBody> in a responsive grid
//    3. Use <Button> <Badge> <Field> etc. from '../../components/ui' — no new styles
//  Data here is hard-coded sample data — Milestone 2 is a visual prototype, the
//  buttons don't need to work.
// ============================================================================

// Sample data (stand-in — a real build would load this).
const ATHLETE = { name: 'Jordan Rivera', sport: 'Track & Field', budget: 1400 }
const ACTIVE_REQUEST = {
  residence: 'Sunnyside Apartments — 2 Bed',
  rent: 1250,
  status: 'Pending Review',
  submitted: 'Jun 14, 2026',
}
const RECENT = [
  { what: 'Submitted residence choice', when: '3 days ago' },
  { what: 'Saved “Foothill Townhomes” to favorites', when: '4 days ago' },
  { what: 'Budget assigned by athletic department', when: '1 week ago' },
]

export default function AthleteDashboard() {
  const screen = screenById('A-01')
  const outOfPocket = Math.max(0, ACTIVE_REQUEST.rent - ATHLETE.budget)

  return (
    <div>
      <ScreenHeader screen={screen} />

      <p className="mb-6 text-lg text-ink">
        Welcome back, <span className="font-semibold">{ATHLETE.name}</span>{' '}
        <span className="text-muted">· {ATHLETE.sport}</span>
      </p>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Active request status */}
        <Card className="lg:col-span-2">
          <CardHeader
            title="Your active request"
            subtitle="Track your current residence submission"
            right={<Badge tone="warning">{ACTIVE_REQUEST.status}</Badge>}
          />
          <CardBody>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
              <div>
                <p className="font-medium text-ink">{ACTIVE_REQUEST.residence}</p>
                <p className="text-sm text-muted">Submitted {ACTIVE_REQUEST.submitted}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-canvas p-3">
                <p className="text-xs text-muted">Monthly rent</p>
                <p className="text-lg font-semibold text-ink tnum">${ACTIVE_REQUEST.rent}</p>
              </div>
              <div className="rounded-lg bg-canvas p-3">
                <p className="text-xs text-muted">Your budget</p>
                <p className="text-lg font-semibold text-ink tnum">${ATHLETE.budget}</p>
              </div>
              <div className="rounded-lg bg-canvas p-3">
                <p className="text-xs text-muted">Out of pocket</p>
                <p className={`text-lg font-semibold tnum ${outOfPocket > 0 ? 'text-danger' : 'text-success'}`}>
                  ${outOfPocket}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button as={Link} to="/athlete/status" size="sm">
                View status & history
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button as={Link} to="/athlete/details" variant="secondary" size="sm">
                View residence details
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Quick search + budget */}
        <div className="space-y-6">
          <Card>
            <CardHeader title="Find a residence" />
            <CardBody className="space-y-3">
              <Field label="Search near campus" placeholder="Neighborhood, address…" />
              <Button as={Link} to="/athlete/search" className="w-full">
                <Search className="h-4 w-4" aria-hidden="true" />
                Search residences
              </Button>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-primary">
                <Wallet className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm text-muted">Housing budget</p>
                <p className="text-xl font-semibold text-ink tnum">${ATHLETE.budget}/mo</p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Recent activity */}
      <Card className="mt-6">
        <CardHeader title="Recent activity" />
        <CardBody>
          <ul className="divide-y divide-line">
            {RECENT.map((r) => (
              <li key={r.what} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <span className="flex items-center gap-2 text-sm text-ink">
                  <Clock className="h-4 w-4 text-muted" aria-hidden="true" />
                  {r.what}
                </span>
                <span className="text-sm text-muted">{r.when}</span>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  )
}
