// D-03 · Housing Budget Management · Owner: Nick · Traces to REQ-BUDGET-003, REQ-SEC-005
import { useState, useRef } from 'react'
import { Users, DollarSign, History as HistoryIcon, Download, Pencil } from 'lucide-react'
import { screenById } from '../../data/screens'
import { ATHLETES, BUDGET_HISTORY, athleteById } from '../../data/sampleData'
import { money } from '../../lib/format'
import ScreenHeader from '../../components/ScreenHeader'
import StatCard from '../../components/StatCard'
import { Card, CardHeader, CardBody, Button, Field, Table } from '../../components/ui'

export default function Budgets() {
  // Live, editable copies seeded from the fixtures (never mutates the fixtures).
  const [budgets, setBudgets] = useState(() =>
    Object.fromEntries(ATHLETES.map((a) => [a.id, a.budget])),
  )
  const [auditLog, setAuditLog] = useState(BUDGET_HISTORY) // newest-first
  const [editingId, setEditingId] = useState(null)
  const [draftValue, setDraftValue] = useState('')
  const [draftReason, setDraftReason] = useState('')
  const nextId = useRef(1000) // above the seeded b1..b5 ids — never collides

  const totalAllocated = Object.values(budgets).reduce((s, v) => s + v, 0)
  const lastChangeFor = (athleteId) => auditLog.find((e) => e.athleteId === athleteId)
  const editing = editingId ? athleteById(editingId) : null

  function startEdit(athleteId) {
    setEditingId(athleteId)
    setDraftValue(String(budgets[athleteId]))
    setDraftReason('')
  }
  function cancelEdit() {
    setEditingId(null)
    setDraftValue('')
    setDraftReason('')
  }
  function saveEdit() {
    const oldValue = budgets[editingId] // live state, so repeat edits chain correctly
    const newValue = Number(draftValue)
    if (!Number.isFinite(newValue) || newValue < 0) return
    setAuditLog([
      {
        id: `b${nextId.current++}`,
        athleteId: editingId,
        oldValue,
        newValue,
        changedBy: 'System Admin',
        date: '2026-06-18',
        reason: draftReason || '—',
      },
      ...auditLog,
    ])
    setBudgets({ ...budgets, [editingId]: newValue })
    cancelEdit()
  }

  return (
    <div>
      <ScreenHeader screen={screenById('D-03')} />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard icon={Users} label="Athletes with budgets" value={ATHLETES.length} />
        <StatCard icon={DollarSign} label="Total allocated / mo" value={money(totalAllocated)} />
        <StatCard icon={HistoryIcon} label="Budget changes logged" value={auditLog.length} />
      </div>

      {/* Editor panel (sibling of the table, shown when editing) */}
      {editing && (
        <Card className="mb-6 border-primary/30">
          <CardHeader title={`Edit budget — ${editing.name}`} subtitle={editing.sport} />
          <CardBody>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="mb-1 text-sm font-medium text-ink">Current (old) value</p>
                <p className="flex h-10 items-center text-lg font-semibold text-muted tnum">
                  {money(budgets[editingId])}
                </p>
              </div>
              <Field
                label="New budget"
                type="number"
                min="0"
                value={draftValue}
                onChange={(e) => setDraftValue(e.target.value)}
              />
              <Field
                label="Reason"
                value={draftReason}
                onChange={(e) => setDraftReason(e.target.value)}
                placeholder="e.g. Annual adjustment"
              />
            </div>
            <div className="mt-4 flex gap-2">
              <Button onClick={saveEdit}>Save change</Button>
              <Button variant="secondary" onClick={cancelEdit}>Cancel</Button>
            </div>
          </CardBody>
        </Card>
      )}

      <Card>
        <CardHeader
          title="Athlete housing budgets"
          subtitle="Only a System Admin can edit budgets"
          right={
            <Button variant="secondary" size="sm">
              <Download className="h-4 w-4" aria-hidden="true" />
              Import from university source
            </Button>
          }
        />
        <CardBody>
          {/* Hand-rolled table (the shared <Table> can't host per-row Edit buttons) */}
          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-canvas text-left text-muted">
                  <th className="px-4 py-2.5 font-medium">Athlete</th>
                  <th className="px-4 py-2.5 font-medium">Sport</th>
                  <th className="px-4 py-2.5 font-medium">Current budget</th>
                  <th className="px-4 py-2.5 font-medium">Last changed</th>
                  <th className="px-4 py-2.5 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {ATHLETES.map((a) => {
                  const lc = lastChangeFor(a.id)
                  return (
                    <tr key={a.id} className="border-b border-line last:border-0 hover:bg-canvas/60">
                      <td className="px-4 py-2.5 font-medium text-ink">{a.name}</td>
                      <td className="px-4 py-2.5 text-ink">{a.sport}</td>
                      <td className="px-4 py-2.5 text-ink tnum">{money(budgets[a.id])}</td>
                      <td className="px-4 py-2.5 text-muted">
                        {lc ? `${lc.date} · ${lc.changedBy}` : '—'}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <Button variant="ghost" size="sm" onClick={() => startEdit(a.id)}>
                          <Pencil className="h-4 w-4" aria-hidden="true" />
                          Edit
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      <Card className="mt-6">
        <CardHeader
          title="Budget change history"
          subtitle="Audit trail (REQ-SEC-005) — old value, new value, who, when, and why"
        />
        <CardBody>
          <Table
            columns={['Athlete', 'Old → New', 'Changed by', 'Date', 'Reason']}
            rows={auditLog.map((e) => [
              athleteById(e.athleteId)?.name ?? e.athleteId,
              <span key="on" className="tnum">{money(e.oldValue)} → {money(e.newValue)}</span>,
              e.changedBy,
              <span key="d" className="tnum">{e.date}</span>,
              e.reason,
            ])}
          />
        </CardBody>
      </Card>
    </div>
  )
}
