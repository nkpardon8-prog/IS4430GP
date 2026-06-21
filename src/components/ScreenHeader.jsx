import Badge from './ui/Badge'
import { memberByKey } from '../data/team'
import { requirementFor } from '../data/requirements'
import { useViewMode } from '../context/ViewMode'

// ScreenHeader — the consistent title block every screen starts with.
// In SUBMISSION view it renders a clean product title only. In TEAM view it adds
// the dev meta (screen id, role badge, owner, "Traces to REQ-…"). This is how the
// same screen reads as a real product for the grader and as a tracked task for the
// team — without any screen file having to change.
export default function ScreenHeader({ screen }) {
  const mode = useViewMode()

  if (mode === 'submission') {
    return (
      <div className="mb-6 border-b border-line pb-5">
        <h1 className="font-display text-3xl font-semibold text-ink">{screen.title}</h1>
      </div>
    )
  }

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
