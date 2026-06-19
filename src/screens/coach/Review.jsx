// C-02 · Submission Review + Comment · Owner: Nick · Traces to REQ-ROLE-004 §3.2
import { useState } from 'react'
import { MapPin, ExternalLink, Info, ArrowRight } from 'lucide-react'
import { screenById } from '../../data/screens'
import { REQUESTS, athleteById } from '../../data/sampleData'
import { money, outOfPocket } from '../../lib/format'
import ScreenHeader from '../../components/ScreenHeader'
import { Card, CardHeader, CardBody, Button, Select, Badge } from '../../components/ui'

// Show the first Pending-Review request — the same one the C-01 queue links to.
const REQUEST = REQUESTS.find((r) => r.status === 'Pending Review')

function Row({ label, children }) {
  return (
    <div className="flex justify-between gap-4 py-2">
      <span className="text-sm text-muted">{label}</span>
      <span className="text-right text-sm font-medium text-ink">{children}</span>
    </div>
  )
}

export default function Review() {
  const a = athleteById(REQUEST.athleteId)
  const oop = outOfPocket(REQUEST.rent, a.budget)
  const [recommendation, setRecommendation] = useState('Recommend')
  const [comment, setComment] = useState('')

  return (
    <div>
      <ScreenHeader screen={screenById('C-02')} />

      <div className="mb-6 flex items-start gap-3 rounded-lg border border-info/20 bg-info-soft px-4 py-3">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-info" aria-hidden="true" />
        <p className="text-sm text-ink">
          Coaches <span className="font-semibold">recommend</span>; the Athletic Manager makes the
          final approve/reject decision.
          <span className="ml-1 inline-flex items-center gap-1 text-muted">
            (You <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /> Manager
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /> Decision)
          </span>
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Read-only submission */}
        <Card>
          <CardHeader
            title="Submission details"
            subtitle="Read-only"
            right={<Badge tone="warning">{REQUEST.status}</Badge>}
          />
          <CardBody>
            <div className="flex items-start gap-2 border-b border-line pb-3">
              <MapPin className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
              <div>
                <p className="font-medium text-ink">{REQUEST.residence}</p>
                <a href="#" className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-hover">
                  View on {REQUEST.source} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="divide-y divide-line">
              <Row label="Athlete">{a.name}</Row>
              <Row label="Sport">{a.sport}</Row>
              <Row label="Monthly rent"><span className="tnum">{money(REQUEST.rent)}</span></Row>
              <Row label="Assigned budget"><span className="tnum">{money(a.budget)}</span></Row>
              <Row label="Out of pocket">
                <span className={`tnum ${oop > 0 ? 'text-danger' : 'text-success'}`}>{money(oop)}</span>
              </Row>
              <Row label="Athlete notes">{REQUEST.notes || '—'}</Row>
            </div>
          </CardBody>
        </Card>

        {/* Recommendation form */}
        <Card>
          <CardHeader title="Your recommendation" subtitle="Sent to the manager with the request" />
          <CardBody className="space-y-4">
            <Select
              label="Recommendation"
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              options={['Recommend', 'Recommend with reservations', 'Do not recommend']}
            />
            <div>
              <label htmlFor="rec-comment" className="mb-1 block text-sm font-medium text-ink">
                Comments for the manager
              </label>
              <textarea
                id="rec-comment"
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add context to support your recommendation…"
                className="w-full rounded-lg border border-line bg-white p-3 text-sm text-ink placeholder:text-muted/60 focus:border-primary"
              />
            </div>
            <Button>Submit recommendation</Button>
            <p className="text-xs text-muted">
              This is a Milestone 2 prototype — submitting is illustrative only.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
