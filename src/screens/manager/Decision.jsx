import { Link } from 'react-router-dom'
import {
  Check, X, ArrowLeft, MapPin, User, Wallet, MessageSquare, ExternalLink,
} from 'lucide-react'
import { screenById } from '../../data/screens'
import { REQUESTS, athleteById } from '../../data/sampleData'
import { money, outOfPocket } from '../../lib/format'
import ScreenHeader from '../../components/ScreenHeader'
import { Button, Card, CardBody, CardHeader } from '../../components/ui'
import RequestStatusBadge from '../../components/RequestStatusBadge'

// M-02 · Request Review + Decision  (REQ-SUBMIT-011 FR-6/7)
// The Athletic Manager's single-screen decision view: everything needed to
// approve or reject a pending request without navigating away (NFR-3).

const REQUEST = REQUESTS.find((r) => r.id === 'r2') ?? REQUESTS[0]
const ATHLETE = athleteById(REQUEST.athleteId)
const OOP = outOfPocket(REQUEST.rent, ATHLETE.budget)
const OVER_BUDGET = OOP > 0

const FACTS = [
  { icon: User, label: 'Athlete', value: ATHLETE.name + ' · ' + ATHLETE.sport },
  { icon: User, label: 'UID / Class', value: ATHLETE.uid + ' · ' + ATHLETE.classYear },
  { icon: MapPin, label: 'Residence', value: REQUEST.residence },
  { icon: ExternalLink, label: 'Source', value: REQUEST.source },
  { icon: Wallet, label: 'Monthly rent', value: money(REQUEST.rent) },
  { icon: Wallet, label: 'Assigned budget', value: money(ATHLETE.budget) },
]

export default function Decision() {
  const screen = screenById('M-02')

  return (
    <div>
      <ScreenHeader screen={screen} />

      <Button as={Link} to="/manager/dashboard" variant="ghost" size="sm" className="mb-4">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to pending queue
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Residence request"
            subtitle={'Submitted ' + REQUEST.submitted}
            right={<RequestStatusBadge status={REQUEST.status} />}
          />
          <CardBody>
            <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {FACTS.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-3 border-b border-line pb-2"
                >
                  <dt className="flex items-center gap-2 text-sm text-muted">
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {label}
                  </dt>
                  <dd className="text-right text-sm font-medium text-ink tnum">{value}</dd>
                </div>
              ))}
            </dl>

            <div
              className={
                'mt-4 flex items-center justify-between rounded-lg p-3 ' +
                (OVER_BUDGET ? 'bg-danger-soft' : 'bg-success-soft')
              }
            >
              <span
                className={
                  'text-sm font-medium ' + (OVER_BUDGET ? 'text-danger' : 'text-success')
                }
              >
                {OVER_BUDGET
                  ? 'Over budget — athlete pays out of pocket'
                  : 'Within assigned budget'}
              </span>
              <span
                className={
                  'text-lg font-semibold tnum ' + (OVER_BUDGET ? 'text-danger' : 'text-success')
                }
              >
                {money(OOP)}/mo
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-start gap-2">
                <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-ink">Coach recommendation</p>
                  <p className="text-sm text-muted">
                    {REQUEST.coachRec || 'No recommendation submitted'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-ink">Athlete notes</p>
                  <p className="text-sm text-muted">{REQUEST.notes || 'None provided'}</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="h-fit">
          <CardHeader title="Decision" subtitle="Approve or reject this request" />
          <CardBody>
            <label htmlFor="decision-note" className="mb-1 block text-sm font-medium text-ink">
              Comment or reason <span className="font-normal text-muted">(optional)</span>
            </label>
            <textarea
              id="decision-note"
              rows={4}
              placeholder="Add an approval comment or a rejection reason..."
              className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-muted/60 focus:border-primary"
            />

            <div className="mt-4 space-y-2">
              <Button as={Link} to="/manager/dashboard" className="w-full">
                <Check className="h-4 w-4" aria-hidden="true" />
                Approve request
              </Button>
              <Button as={Link} to="/manager/dashboard" variant="danger" className="w-full">
                <X className="h-4 w-4" aria-hidden="true" />
                Reject request
              </Button>
            </div>

            <p className="mt-3 text-xs text-muted">
              The athlete is emailed the decision and the status updates on their dashboard.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}