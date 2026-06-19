// C-01 · Coach Dashboard · Owner: Nick · Traces to REQ-ROLE-004 §3.2
import { Link } from 'react-router-dom'
import { ClipboardCheck, Users, ThumbsUp, ArrowRight, Info } from 'lucide-react'
import { screenById } from '../../data/screens'
import { REQUESTS, athleteById, assignedAthleteIds, assignedAthletes } from '../../data/sampleData'
import { money, outOfPocket } from '../../lib/format'
import ScreenHeader from '../../components/ScreenHeader'
import StatCard from '../../components/StatCard'
import RequestStatusBadge from '../../components/RequestStatusBadge'
import { Card, CardHeader, CardBody, Badge, Button, Table } from '../../components/ui'

export default function CoachDashboard() {
  const myAthleteIds = assignedAthleteIds()
  const pending = REQUESTS.filter(
    (r) => myAthleteIds.includes(r.athleteId) && r.status === 'Pending Review',
  )

  const rows = pending.map((req) => {
    const a = athleteById(req.athleteId)
    const oop = outOfPocket(req.rent, a.budget)
    return [
      a.name,
      a.sport,
      req.residence,
      <span key="rb" className="tnum">
        {money(req.rent)}{' '}
        {oop > 0 ? (
          <Badge tone="danger">{money(oop)} over</Badge>
        ) : (
          <Badge tone="success">In budget</Badge>
        )}
      </span>,
      <RequestStatusBadge key="s" status={req.status} />,
      <Button key="a" as={Link} to="/coach/review" size="sm">
        Review &amp; recommend
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>,
    ]
  })

  return (
    <div>
      <ScreenHeader screen={screenById('C-01')} />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard icon={ClipboardCheck} label="Awaiting your recommendation" value={pending.length} />
        <StatCard icon={Users} label="Assigned athletes" value={assignedAthletes().length} />
        <StatCard icon={ThumbsUp} label="Recommended this week" value={4} />
      </div>

      <Card>
        <CardHeader
          title="Submissions awaiting your recommendation"
          subtitle="Your assigned athletes who have submitted a residence for review"
        />
        <CardBody>
          {rows.length > 0 ? (
            <Table
              columns={['Athlete', 'Sport', 'Residence', 'Rent vs budget', 'Status', '']}
              rows={rows}
            />
          ) : (
            <p className="py-6 text-center text-sm text-muted">
              No submissions are waiting on you right now.
            </p>
          )}
        </CardBody>
      </Card>

      <div className="mt-6 flex items-start gap-3 rounded-lg border border-info/20 bg-info-soft px-4 py-3">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-info" aria-hidden="true" />
        <p className="text-sm text-ink">
          Coaches add a <span className="font-semibold">recommendation</span> for each request. The
          Athletic Manager makes the final approve or reject decision.
        </p>
      </div>
    </div>
  )
}
