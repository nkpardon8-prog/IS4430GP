import { Link } from 'react-router-dom'
import { Check, Clock, CircleDashed, Ban, MapPin, ArrowRight } from 'lucide-react'
import { screenById } from '../../data/screens'
import { ATHLETES, requestsByAthlete } from '../../data/sampleData'
import { money } from '../../lib/format'
import ScreenHeader from '../../components/ScreenHeader'
import { Button, Card, CardBody, CardHeader, Table } from '../../components/ui'
import RequestStatusBadge from '../../components/RequestStatusBadge'

// ============================================================================
//  A-05 · Request Status / History  (REQ-NOTIFY-012 FR-5)
//  ----------------------------------------------------------------------------
//  Lets the athlete track a residence request across its lifecycle and cancel it
//  while it is still pending. Shows only this athlete's own records (data
//  isolation, REQ-SEC-005). Visual prototype: actions don't mutate state.
// ============================================================================

const ATHLETE = ATHLETES[0] // Jordan Rivera
const HISTORY = requestsByAthlete(ATHLETE.id) // his requests only (isolation)

// The request to highlight up top: the pending one if there is one, else newest.
const ACTIVE = HISTORY.find((r) => r.status === 'Pending Review') ?? HISTORY[0]

// Lifecycle steps for the active request (statuses from REQ-NOTIFY-012 §3.5).
// 'done' = completed, 'current' = where it sits now, 'upcoming' = not yet.
const STEPS = [
  { label: 'Submitted', detail: ACTIVE.submitted, state: 'done' },
  {
    label: 'Pending Review',
    detail: 'With the Athletic Manager',
    state: ACTIVE.status === 'Pending Review' ? 'current' : 'done',
  },
  {
    label: 'Decision',
    detail: ACTIVE.decided ?? 'Awaiting manager decision',
    state: ACTIVE.decided ? 'done' : 'upcoming',
  },
]

// Map each step state to its icon + color treatment.
const STEP_STYLE = {
  done: { Icon: Check, ring: 'border-success bg-success-soft text-success' },
  current: { Icon: CircleDashed, ring: 'border-warning bg-warning-soft text-warning' },
  upcoming: { Icon: Clock, ring: 'border-line bg-canvas text-muted' },
}

export default function Status() {
  const screen = screenById('A-05')
  const canCancel = ACTIVE.status === 'Pending Review' // FR: cancel while pending

  return (
    <div>
      <ScreenHeader screen={screen} />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Active request + lifecycle timeline */}
        <Card className="lg:col-span-2">
          <CardHeader
            title="Current request"
            subtitle="Track your submission across its lifecycle"
            right={<RequestStatusBadge status={ACTIVE.status} />}
          />
          <CardBody>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-medium text-ink">{ACTIVE.residence}</p>
                <p className="text-sm text-muted">
                  <span className="tnum">{money(ACTIVE.rent)}</span>/mo · Source: {ACTIVE.source}
                </p>
              </div>
            </div>

            {/* Vertical lifecycle timeline */}
            <ol className="mt-6">
              {STEPS.map((step, i) => {
                const { Icon, ring } = STEP_STYLE[step.state]
                const isLast = i === STEPS.length - 1
                return (
                  <li key={step.label} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className={`grid h-8 w-8 place-items-center rounded-full border ${ring}`}>
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      {!isLast && <span className="my-1 h-6 w-px bg-line" />}
                    </div>
                    <div className="pb-4 pt-1">
                      <p className={`text-sm font-medium ${step.state === 'upcoming' ? 'text-muted' : 'text-ink'}`}>
                        {step.label}
                      </p>
                      <p className="text-xs text-muted tnum">{step.detail}</p>
                    </div>
                  </li>
                )
              })}
            </ol>

            {/* Cancel-pending action (only while Pending Review) */}
            {canCancel && (
              <div className="flex flex-wrap items-center gap-3 border-t border-line pt-4">
                <Button variant="danger" size="sm">
                  <Ban className="h-4 w-4" aria-hidden="true" />
                  Cancel request
                </Button>
                <p className="text-xs text-muted">
                  Allowed only while the request is still pending review.
                </p>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Side panel: keep browsing */}
        <Card className="h-fit">
          <CardHeader title="Still looking?" />
          <CardBody className="space-y-3">
            <p className="text-sm text-muted">
              You can keep browsing listings while this request is under review.
            </p>
            <Button as={Link} to="/athlete/search" variant="secondary" className="w-full">
              Search residences
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </CardBody>
        </Card>
      </div>

      {/* Full request history (FR-5: all lifecycle statuses retained) */}
      <Card className="mt-6">
        <CardHeader title="Request history" subtitle="All of your residence requests" />
        <Table className="rounded-none border-0 border-t border-line">
          <thead>
            <tr>
              <th>Residence</th>
              <th className="text-right">Rent</th>
              <th>Source</th>
              <th>Submitted</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {HISTORY.map((r) => (
              <tr key={r.id}>
                <td className="font-medium">{r.residence}</td>
                <td className="text-right tnum">{money(r.rent)}</td>
                <td className="text-muted">{r.source}</td>
                <td className="text-muted tnum">{r.submitted}</td>
                <td><RequestStatusBadge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  )
}