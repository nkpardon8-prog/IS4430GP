// M-03 · Request Status History (All) · Owner: Nick · Traces to REQ-ROLE-004 §3.3, REQ-NOTIFY-012 §3.5
import { useState } from 'react'
import { screenById } from '../../data/screens'
import { REQUESTS, athleteById, SPORTS } from '../../data/sampleData'
import ScreenHeader from '../../components/ScreenHeader'
import RequestStatusBadge from '../../components/RequestStatusBadge'
import { Card, CardHeader, CardBody, Select, Table } from '../../components/ui'

const STATUSES = ['All', 'Submitted', 'Pending Review', 'Approved', 'Rejected', 'Cancelled']
const LEGEND = ['Submitted', 'Pending Review', 'Approved', 'Rejected', 'Cancelled']

export default function History() {
  const [status, setStatus] = useState('All')
  const [sport, setSport] = useState('All')

  const filtered = REQUESTS.filter((r) => {
    const a = athleteById(r.athleteId)
    if (status !== 'All' && r.status !== status) return false
    if (sport !== 'All' && a.sport !== sport) return false
    return true
  })

  return (
    <div>
      <ScreenHeader screen={screenById('M-03')} />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted">Statuses:</span>
        {LEGEND.map((s) => (
          <RequestStatusBadge key={s} status={s} />
        ))}
      </div>

      <Card>
        <CardHeader title="All residence requests" subtitle="Full status history across managed athletes" />
        <CardBody>
          <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:max-w-lg">
            <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)} options={STATUSES} />
            <Select label="Sport" value={sport} onChange={(e) => setSport(e.target.value)} options={['All', ...SPORTS]} />
          </div>

          {filtered.length > 0 ? (
            <Table
              columns={['Athlete', 'Residence', 'Submitted', 'Decided', 'Status', 'Reviewer', 'Reason / comment']}
              rows={filtered.map((r) => {
                const a = athleteById(r.athleteId)
                return [
                  a.name,
                  r.residence,
                  <span key="sub" className="tnum">{r.submitted}</span>,
                  <span key="dec" className="tnum">{r.decided ?? '—'}</span>,
                  <RequestStatusBadge key="st" status={r.status} />,
                  r.reviewer ?? '—',
                  r.reason ?? '—',
                ]
              })}
            />
          ) : (
            <p className="py-6 text-center text-sm text-muted">No requests match these filters.</p>
          )}
        </CardBody>
      </Card>
    </div>
  )
}
