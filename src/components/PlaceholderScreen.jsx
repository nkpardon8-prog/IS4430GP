import { Link } from 'react-router-dom'
import { Hammer, ListChecks, ArrowRight, FileCode } from 'lucide-react'
import { screenById } from '../data/screens'
import { memberByKey } from '../data/team'
import ScreenHeader from './ScreenHeader'
import { Card, CardBody, CardHeader, Button } from './ui'

// PlaceholderScreen — what an unbuilt screen renders. It tells the owner
// exactly what to build (key elements lifted from the Milestone 1 requirement)
// and how to build it. No digging through the doc required.
export default function PlaceholderScreen({ id }) {
  const screen = screenById(id)
  if (!screen) {
    return <p className="text-danger">Unknown screen id: {id}</p>
  }
  const owner = memberByKey(screen.owner)

  return (
    <div>
      <ScreenHeader screen={screen} />

      {/* Whose job this is */}
      <div className="mb-6 flex items-center gap-3 rounded-lg border border-primary/20 bg-primary-soft px-4 py-3">
        <Hammer className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-sm text-ink">
          This screen is a <span className="font-semibold">placeholder</span>.{' '}
          <span className="font-semibold">{owner?.name ?? screen.owner}</span> owns it — build it
          out in the file shown below.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* What to build */}
        <Card>
          <CardHeader
            title="What this screen needs"
            subtitle="From the Milestone 1 requirement"
          />
          <CardBody>
            <ul className="space-y-2">
              {(screen.keyElements ?? []).map((el) => (
                <li key={el} className="flex items-start gap-2 text-sm text-ink">
                  <ListChecks className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {el}
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        {/* How to build it */}
        <Card>
          <CardHeader title="How to build it" subtitle="Three steps — no routing changes needed" />
          <CardBody className="space-y-3 text-sm text-ink">
            <p className="flex items-center gap-2">
              <FileCode className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
              Edit <code className="rounded bg-canvas px-1.5 py-0.5 text-xs">src/screens{screen.path}.jsx</code>
            </p>
            <ol className="ml-1 list-inside list-decimal space-y-1.5 text-muted">
              <li>Replace the <code className="text-xs">&lt;PlaceholderScreen/&gt;</code> with your UI.</li>
              <li>Build it with the shared components (copy the A-01 example).</li>
              <li>Set this screen's <code className="text-xs">status: 'done'</code> in <code className="text-xs">src/data/screens.js</code>.</li>
            </ol>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button as={Link} to="/athlete/dashboard" variant="secondary" size="sm">
                View A-01 example
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button as={Link} to="/style-guide" variant="ghost" size="sm">
                Style guide
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
