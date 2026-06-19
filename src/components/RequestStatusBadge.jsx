import Badge from './ui/Badge'

// RequestStatusBadge — a residence request's lifecycle status as a colored pill.
// Statuses come from REQ-NOTIFY-012 §3.5. This is DISTINCT from ui/StatusPill,
// which shows screen BUILD status (todo/in-progress/done) — don't mix them up.
const TONE = {
  Submitted: 'info',
  'Pending Review': 'warning',
  Approved: 'success',
  Rejected: 'danger',
  Cancelled: 'neutral',
}

export default function RequestStatusBadge({ status }) {
  return <Badge tone={TONE[status] ?? 'neutral'}>{status}</Badge>
}
