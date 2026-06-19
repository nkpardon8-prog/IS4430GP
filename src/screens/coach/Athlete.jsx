// C-03 · Assigned Athlete Profile / Budget · Owner: Nick · Traces to REQ-ROLE-004 §3.2
import { useState } from 'react'
import { Lock, Info } from 'lucide-react'
import { screenById } from '../../data/screens'
import { assignedAthletes, athleteById, requestsByAthlete } from '../../data/sampleData'
import { money } from '../../lib/format'
import ScreenHeader from '../../components/ScreenHeader'
import RequestStatusBadge from '../../components/RequestStatusBadge'
import { Card, CardHeader, CardBody, Badge, Select, Table } from '../../components/ui'

const ROSTER = assignedAthletes()

function Field({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-2">
      <span className="text-sm text-muted">{label}</span>
      <span className="text-right text-sm font-medium text-ink">{value}</span>
    </div>
  )
}

export default function CoachAthlete() {
  const [selectedId, setSelectedId] = useState(ROSTER[0].id)
  const a = athleteById(selectedId)
  const history = requestsByAthlete(selectedId)

  return (
    <div>
      <ScreenHeader screen={screenById('C-03')} />

      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <Select
          label="Assigned athlete"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          options={ROSTER.map((r) => ({ value: r.id, label: `${r.name} · ${r.sport}` }))}
          className="w-full max-w-xs"
        />
        <span className="inline-flex items-center gap-1.5 text-sm text-muted">
          <Info className="h-4 w-4" aria-hidden="true" />
          You see only your assigned athletes.
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Profile" />
          <CardBody>
            <div className="divide-y divide-line">
              <Field label="Name" value={a.name} />
              <Field label="UID" value={a.uid} />
              <Field label="Sport" value={a.sport} />
              <Field label="University email" value={a.email} />
              <Field label="Class year" value={a.classYear} />
              <Field label="Housing status" value={<RequestStatusBadge status={a.housingStatus} />} />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Housing budget"
            right={
              <span className="inline-flex items-center gap-1 text-xs text-muted">
                <Lock className="h-3.5 w-3.5" aria-hidden="true" /> View only
              </span>
            }
          />
          <CardBody>
            <p className="text-3xl font-semibold text-ink tnum">{money(a.budget)}<span className="text-base font-normal text-muted">/mo</span></p>
            <p className="mt-2 text-sm text-muted">
              Coaches can view but not edit budgets. Budgets are managed by a System Admin
              (screen D-03).
            </p>
          </CardBody>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader title="Residence request history" subtitle={`${history.length} request(s)`} />
        <CardBody>
          {history.length > 0 ? (
            <Table
              columns={['Residence', 'Submitted', 'Status']}
              rows={history.map((r) => [
                r.residence,
                <span key="d" className="tnum">{r.submitted}</span>,
                <RequestStatusBadge key="s" status={r.status} />,
              ])}
            />
          ) : (
            <p className="py-6 text-center text-sm text-muted">No requests yet.</p>
          )}
        </CardBody>
      </Card>
    </div>
  )
}
