import { CheckCircle2, CircleDashed, Circle } from 'lucide-react'
import Badge from './Badge'

// StatusPill — renders a build-status ('todo' | 'in-progress' | 'done') as a
// labelled pill with an icon. Used on cards and in My Work.
const MAP = {
  done: { tone: 'success', label: 'Done', Icon: CheckCircle2 },
  'in-progress': { tone: 'warning', label: 'In progress', Icon: CircleDashed },
  todo: { tone: 'neutral', label: 'To do', Icon: Circle },
}

export default function StatusPill({ status = 'todo' }) {
  const { tone, label, Icon } = MAP[status] ?? MAP.todo
  return (
    <Badge tone={tone}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </Badge>
  )
}
