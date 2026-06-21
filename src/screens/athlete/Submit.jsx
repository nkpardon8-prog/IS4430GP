// A-04 · Residence Submission Form
// Owner: Mike · Traces to REQ-SUBMIT-011
// TODO (Mike): replace <PlaceholderScreen/> with the real screen. Build it with
// components from '../../components/ui'; copy src/screens/athlete/Dashboard.jsx
// (A-01) as a starting point. Then set status: 'done' in src/data/screens.js.
import { Link } from 'react-router-dom'
import { Lock, Clock, Send, ArrowLeft, Info } from 'lucide-react'
import { screenById } from '../../data/screens'
import { ATHLETES } from '../../data/sampleData'
import { money, outOfPocket } from '../../lib/format'
import ScreenHeader from '../../components/ScreenHeader'
import { Button, Card, CardBody, CardHeader, Badge } from '../../components/ui'

// ============================================================================
//  A-04 · Residence Submission Form  (REQ-SUBMIT-011)
//  ----------------------------------------------------------------------------
//  Confirms a selected residence and submits it for athletic-department review.
//  The listing details are shown read-only (the athlete cannot edit collected
//  source data); only the notes and the out-of-pocket confirmation are inputs.
//  Visual prototype: the Submit button just routes to the status screen.
// ============================================================================

// Same athlete + listing as A-03, so the flow Details -> Submit stays coherent.
const ATHLETE = ATHLETES[0] // Jordan Rivera, budget 1400
const SELECTION = {
  residence: 'Sunnyside Court Apartments — Unit 204',
  rent: 1650,
  source: 'Zillow',
}

export default function Submit() {
  const screen = screenById('A-04')
  const oop = outOfPocket(SELECTION.rent, ATHLETE.budget)
  const overBudget = oop > 0

  // FR-2: the fields captured on the submission record, shown read-only here.
  const summary = [
    ['Athlete', ATHLETE.name],
    ['UID', ATHLETE.uid],
    ['Residence', SELECTION.residence],
    ['Source website', SELECTION.source],
    ['Monthly rent', money(SELECTION.rent)],
    ['Your budget', money(ATHLETE.budget)],
  ]

  return (
    <div>
      <ScreenHeader screen={screen} />

      <Button as={Link} to="/athlete/details" variant="ghost" size="sm" className="mb-4">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to listing
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Submit residence for review"
            subtitle="Confirm the details below. The athletic department will review your request."
          />
          <CardBody>
            {/* Read-only request summary (FR-2). Athletes cannot edit collected
                listing data, so these are plain text, not inputs (NFR). */}
            <div className="rounded-lg border border-line bg-canvas p-4">
              <p className="mb-3 flex items-center gap-1.5 text-xs font-medium text-muted">
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                Request summary (read-only)
              </p>
              <dl className="space-y-2">
                {summary.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-3 text-sm">
                    <dt className="text-muted">{k}</dt>
                    <dd className="font-medium text-ink tnum">{v}</dd>
                  </div>
                ))}
                {/* Out-of-pocket is derived, shown as the bottom line of the summary */}
                <div className="flex items-center justify-between gap-3 border-t border-line pt-2 text-sm">
                  <dt className={overBudget ? 'text-danger' : 'text-success'}>
                    Estimated out-of-pocket
                  </dt>
                  <dd className={`font-semibold tnum ${overBudget ? 'text-danger' : 'text-success'}`}>
                    {money(oop)}/mo
                  </dd>
                </div>
              </dl>
            </div>

            {/* Optional athlete notes (FR-2). No shared Textarea component exists,
                so this is a bare textarea styled to match the Field input. */}
            <div className="mt-5">
              <label htmlFor="athlete-notes" className="mb-1 block text-sm font-medium text-ink">
                Notes for reviewer <span className="font-normal text-muted">(optional)</span>
              </label>
              <textarea
                id="athlete-notes"
                rows={3}
                placeholder="Add any context for the athletic department…"
                className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-muted/60 focus:border-primary"
              />
            </div>

            {/* Out-of-pocket confirmation (FR-3). Only required when the rent is
                above budget, since that is the amount paid out of pocket. */}
            {overBudget && (
              <label className="mt-4 flex items-start gap-3 rounded-lg border border-warning/30 bg-warning-soft p-3">
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-primary" />
                <span className="text-sm text-warning">
                  I understand that the{' '}
                  <span className="font-semibold tnum">{money(oop)}/mo</span> above my assigned
                  housing budget will be paid out of pocket.
                </span>
              </label>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-4">
              {/* FR-4: a real submit would save with status Pending Review. */}
              <Button as={Link} to="/athlete/status">
                <Send className="h-4 w-4" aria-hidden="true" />
                Submit request
              </Button>
              <Button as={Link} to="/athlete/details" variant="secondary">
                Cancel
              </Button>
              <span className="ml-auto flex items-center gap-1.5 text-xs text-muted">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                Saves as Pending Review
              </span>
            </div>
          </CardBody>
        </Card>

        {/* Side panel: what happens after submitting */}
        <Card className="h-fit">
          <CardHeader title="What happens next" icon={<Info className="h-4 w-4" />} />
          <CardBody className="space-y-3 text-sm text-muted">
            <p>
              Your request is created as{' '}
              <Badge tone="warning">Pending Review</Badge> and sent to the Athletic Manager.
            </p>
            <p>
              You can cancel it from{' '}
              <span className="font-medium text-ink">Request status</span> while it is still
              pending.
            </p>
            <p>You'll be emailed when it is approved or rejected.</p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}