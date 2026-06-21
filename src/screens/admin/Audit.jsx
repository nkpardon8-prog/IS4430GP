// D-06 · Audit / System History
// Owner: Ellie · Traces to REQ-SEC-005 §3.5
import { useState } from 'react'
import { ClipboardList, UserCog, Wallet, FileCheck2, ShieldAlert } from 'lucide-react'
import { screenById } from '../../data/screens'
import ScreenHeader from '../../components/ScreenHeader'
import { Card, CardHeader, CardBody, Badge, Select } from '../../components/ui'

// ============================================================================
//  D-06 · Audit / System History — read-only event log covering budget
//  changes, role changes, submissions, approvals, and rejections
//  (REQ-SEC-005 FR-56). Sample events; filter is local state only.
// ============================================================================

const EVENT_TYPES = {
  role: { label: 'Role change', tone: 'info', Icon: UserCog },
  budget: { label: 'Budget change', tone: 'warning', Icon: Wallet },
  submission: { label: 'Submission', tone: 'primary', Icon: ClipboardList },
  approval: { label: 'Approval', tone: 'success', Icon: FileCheck2 },
  rejection: { label: 'Rejection', tone: 'danger', Icon: ShieldAlert },
}

const EVENTS = [
  { id: 'e1', type: 'submission', actor: 'Jordan Rivera', detail: 'Submitted residence request for Sunnyside Apartments — 2 Bed', when: 'Jun 17, 2026 · 9:42 AM' },
  { id: 'e2', type: 'approval', actor: 'Devon Pierce', detail: 'Approved request #1042 for Jordan Rivera', when: 'Jun 17, 2026 · 2:15 PM' },
  { id: 'e3', type: 'budget', actor: 'Ellie Choi', detail: 'Updated Sam Okafor budget from $1,200 to $1,350', when: 'Jun 16, 2026 · 11:03 AM' },
  { id: 'e4', type: 'rejection', actor: 'Devon Pierce', detail: 'Rejected request #1039 for Maya Chen — over budget, no waiver on file', when: 'Jun 15, 2026 · 4:30 PM' },
  { id: 'e5', type: 'role', actor: 'Ellie Choi', detail: 'Changed Maria Lopez role from Athlete to Athletic Coach', when: 'Jun 14, 2026 · 10:12 AM' },
  { id: 'e6', type: 'submission', actor: 'Sam Okafor', detail: 'Submitted residence request for Foothill Townhomes', when: 'Jun 13, 2026 · 8:05 PM' },
  { id: 'e7', type: 'budget', actor: 'Ellie Choi', detail: 'Imported housing budgets from university data source (24 athletes)', when: 'Jun 10, 2026 · 7:00 AM' },
]

export default function AuditHistory() {
  const screen = screenById('D-06')
  const [filter, setFilter] = useState('All')

  const filterOptions = ['All', ...Object.values(EVENT_TYPES).map((t) => t.label)]
  const visible =
    filter === 'All' ? EVENTS : EVENTS.filter((e) => EVENT_TYPES[e.type].label === filter)

  return (
    <div>
      <ScreenHeader screen={screen} />

      <Card>
        <CardHeader
          title="System event log"
          subtitle="Read-only history of budget changes, role changes, submissions, approvals, and rejections"
          right={
            <Select
              aria-label="Filter by event type"
              options={filterOptions}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-48"
            />
          }
        />
        <CardBody>
          <ul className="divide-y divide-line">
            {visible.map((e) => {
              const meta = EVENT_TYPES[e.type]
              const Icon = meta.Icon
              return (
                <li key={e.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-canvas text-muted">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone={meta.tone}>{meta.label}</Badge>
                      <span className="text-sm font-medium text-ink">{e.actor}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{e.detail}</p>
                  </div>
                  <span className="shrink-0 whitespace-nowrap text-xs text-muted">{e.when}</span>
                </li>
              )
            })}
            {visible.length === 0 && (
              <li className="py-6 text-center text-sm text-muted">
                No events match this filter.
              </li>
            )}
          </ul>
        </CardBody>
      </Card>

      <p className="mt-4 text-xs text-muted">
        This log is visible to approved staff users only and cannot be edited from this screen
        (REQ-SEC-005 FR-56, NFR-59).
      </p>
    </div>
  )
}