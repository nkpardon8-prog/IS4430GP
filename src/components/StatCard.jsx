import Card, { CardBody } from './ui/Card'

// StatCard — the dashboard stat tile (icon + label + number). Mirrors the budget
// tile pattern from A-01. Pass a lucide icon component as `icon`.
export default function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <Card>
      <CardBody className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
          {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
        </span>
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="text-xl font-semibold text-ink tnum">{value}</p>
          {hint && <p className="text-xs text-muted">{hint}</p>}
        </div>
      </CardBody>
    </Card>
  )
}
