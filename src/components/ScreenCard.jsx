import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Card from './ui/Card'
import Badge from './ui/Badge'
import StatusPill from './ui/StatusPill'
import { memberByKey } from '../data/team'

// ScreenCard — the standard tile for a screen. Used on role dashboards,
// the Home "My Work" panel, and the progress overview. Shows the traceability
// (screen id + source requirement) graders look for.
export default function ScreenCard({ screen }) {
  const owner = memberByKey(screen.owner)
  return (
    <Card className="flex flex-col transition-shadow duration-150 hover:shadow-pop">
      <div className="flex items-start justify-between gap-3 px-4 pt-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-canvas px-1.5 py-0.5 text-xs font-semibold tracking-wide text-muted">
            {screen.id}
          </span>
          <Badge role={screen.role}>{screen.role}</Badge>
        </div>
        <StatusPill status={screen.status} />
      </div>

      <div className="px-4 pb-4 pt-2">
        <h3 className="text-base font-semibold leading-snug text-ink">{screen.title}</h3>
        <p className="mt-1 text-xs text-muted">
          Owner: <span className="font-medium text-ink">{owner?.name ?? screen.owner}</span>
          {' · '}Traces to <span className="font-mono">{screen.sourceReq}</span>
        </p>
        {screen.keyElements?.length > 0 && (
          <p className="mt-2 line-clamp-2 text-sm text-muted">
            {screen.keyElements.join(' · ')}
          </p>
        )}
      </div>

      <div className="mt-auto border-t border-line px-4 py-2.5">
        <Link
          to={screen.path}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover"
        >
          Open screen
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  )
}
