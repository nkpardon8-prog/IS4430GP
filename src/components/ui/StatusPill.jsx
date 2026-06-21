import { CheckCircle2, CircleDashed, Circle } from 'lucide-react'
import Badge from './Badge'

// StatusPill — two ways to use it (both supported):
//   1. build status:  <StatusPill status="done" />  → icon + "Done" pill
//   2. free label + tone:  <StatusPill tone="success">Open</StatusPill>
const MAP = {
  done: { tone: 'success', label: 'Done', Icon: CheckCircle2 },
  'in-progress': { tone: 'warning', label: 'In progress', Icon: CircleDashed },
  todo: { tone: 'neutral', label: 'To do', Icon: Circle },
}

export default function StatusPill({ status, tone, children }) {
  // Free-form mode: caller supplied their own tone and/or label text.
  if (tone !== undefined || children !== undefined) {
    return <Badge tone={tone ?? 'neutral'}>{children}</Badge>
  }
  const { tone: t, label, Icon } = MAP[status] ?? MAP.todo
  return (
    <Badge tone={t}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </Badge>
  )
}
