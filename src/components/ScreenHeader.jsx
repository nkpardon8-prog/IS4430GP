import Badge from './ui/Badge'
import { memberByKey } from '../data/team'
import { requirementFor } from '../data/requirements'

// ScreenHeader — the consistent title block every screen should start with.
// Real screens and placeholders both use it, so the app stays cohesive.
export default function ScreenHeader({ screen }) {
  const owner = memberByKey(screen.owner)
  const req = requirementFor(screen.sourceReq)
  return (
    <div className="mb-6 border-b border-line pb-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded bg-canvas px-2 py-0.5 text-xs font-semibold tracking-wide text-muted">
          {screen.id}
        </span>
        <Badge role={screen.role}>{screen.role}</Badge>
      </div>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">{screen.title}</h1>
      <p className="mt-1 text-sm text-muted">
        Owner: <span className="font-medium text-ink">{owner?.name ?? screen.owner}</span>
        {' · '}Traces to <span className="font-mono">{screen.sourceReq}</span>
        {req && <> — {req.title}</>}
      </p>
    </div>
  )
}
