// M-01 · Manager Dashboard · Owner: Nick · Traces to REQ-ROLE-004 §3.3
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, CheckCircle2, XCircle, Timer, ArrowRight } from 'lucide-react'
import { screenById } from '../../data/screens'
import { REQUESTS, athleteById, SPORTS } from '../../data/sampleData'
import { money, outOfPocket } from '../../lib/format'
import ScreenHeader from '../../components/ScreenHeader'
import StatCard from '../../components/StatCard'
import RequestStatusBadge from '../../components/RequestStatusBadge'
import { Card, CardHeader, CardBody, Badge, Button, Select, Field, Table } from '../../components/ui'

const STATUSES = ['All', 'Submitted', 'Pending Review', 'Approved', 'Rejected', 'Cancelled']

export default function ManagerDashboard() {
  const [sport, setSport] = useState('All')
  const [status, setStatus] = useState('Pending Review')
  const [q, setQ] = useState('')

  const count = (s) => REQUESTS.filter((r) => r.status === s).length

  const filtered = REQUESTS.filter((r) => {
    const a = athleteById(r.athleteId)
    if (sport !== 'All' && a.sport !== sport) return false
    if (status !== 'All' && r.status !== status) return false
    if (q && !`${a.name} ${r.residence}`.toLowerCase().includes(q.toLowerCase())) return false
    return true
  })

  return (
    <div>
      <ScreenHeader screen={screenById('M-01')} />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Clock} label="Pending review" value={count('Pending Review')} />
        <StatCard icon={CheckCircle2} label="Approved this month" value={count('Approved')} />
        <StatCard icon={XCircle} label="Rejected this month" value={count('Rejected')} />
        <StatCard icon={Timer} label="Avg decision time" value="1.8 days" />
      </div>

      <Card>
        <CardHeader title="Residence requests" subtitle="Approve or reject pending submissions" />
        <CardBody>
          <div className="mb-4 grid gap-3 sm:grid-cols-3">
            <Select label="Sport" value={sport} onChange={(e) => setSport(e.target.value)} options={['All', ...SPORTS]} />
            <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)} options={STATUSES} />
            <Field label="Search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Athlete or residence…" />
          </div>

          {filtered.length > 0 ? (
            <Table
              columns={['Athlete', 'Sport', 'Residence', 'Rent', 'Out of pocket', 'Coach rec', 'Status', '']}
              rows={filtered.map((r) => {
                const a = athleteById(r.athleteId)
                const oop = outOfPocket(r.rent, a.budget)
                return [
                  a.name,
                  a.sport,
                  r.residence,
                  <span key="rent" className="tnum">{money(r.rent)}</span>,
                  <span key="oop" className={`tnum ${oop > 0 ? 'text-danger' : 'text-success'}`}>{money(oop)}</span>,
                  r.coachRec ? <Badge key="cr" tone="neutral">{r.coachRec}</Badge> : <span key="cr" className="text-muted">—</span>,
                  <RequestStatusBadge key="st" status={r.status} />,
                  <Button key="act" as={Link} to="/manager/decision" size="sm">
                    Review &amp; decide
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>,
                ]
              })}
            />
          ) : (
            <p className="py-6 text-center text-sm text-muted">
              No requests match these filters.{' '}
              <button
                className="font-medium text-primary hover:text-primary-hover"
                onClick={() => { setSport('All'); setStatus('All'); setQ('') }}
              >
                Reset filters
              </button>
            </p>
          )}
        </CardBody>
      </Card>
    </div>
  )
}
