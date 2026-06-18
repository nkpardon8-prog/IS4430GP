import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Search, ClipboardList, ShieldCheck } from 'lucide-react'
import { TEAM, CURRENT_MEMBER } from '../data/team'
import { SCREENS, screensByOwner, screensByRole, progress } from '../data/screens'
import ScreenCard from '../components/ScreenCard'
import { Button, Card, CardBody } from '../components/ui'

export default function Home() {
  const [selected, setSelected] = useState(CURRENT_MEMBER.key)
  const mine = screensByOwner(selected)
  const { done, total, pct } = progress()

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section>
        <p className="text-sm font-medium uppercase tracking-wide text-primary">
          IS4430 Group Project · Milestone 2
        </p>
        <h1 className="mt-2 max-w-3xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          University of Utah Student-Athlete Housing System
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          A prototype interface that helps student-athletes find a place to live near campus,
          compare it against their housing budget, and submit it to the athletic department for
          approval. This site is the shared UI baseline — each teammate builds their assigned
          screens on top of it.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button as={Link} to="/athlete">
            Browse Athlete screens
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button as={Link} to="/style-guide" variant="secondary">
            View the style guide
          </Button>
        </div>

        {/* Progress */}
        <div className="mt-8 max-w-md">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-ink">Screens built</span>
            <span className="text-muted tnum">{done}/{total}</span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </section>

      {/* My Work — the no-dig entry point */}
      <section>
        <h2 className="font-display text-2xl font-semibold text-ink">My Work</h2>
        <p className="mt-1 text-muted">
          Pick your name to see only the screens you own. Defaults to you ({CURRENT_MEMBER.name}).
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {TEAM.map((m) => {
            const count = screensByOwner(m.key).length
            const active = m.key === selected
            return (
              <button
                key={m.key}
                onClick={() => setSelected(m.key)}
                className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  active
                    ? 'border-primary bg-primary-soft text-primary'
                    : 'border-line bg-surface text-muted hover:bg-canvas'
                }`}
              >
                {m.name} <span className="text-xs opacity-70">· {count}</span>
              </button>
            )
          })}
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mine.map((s) => (
            <ScreenCard key={s.id} screen={s} />
          ))}
        </div>
      </section>

      {/* How the system works (scenario) */}
      <section>
        <h2 className="font-display text-2xl font-semibold text-ink">How the system works</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            {
              Icon: Search,
              title: '1. Athlete finds a residence',
              body: 'The system collects listings from approved rental sites. Athletes search, filter, and compare rent against their assigned housing budget.',
            },
            {
              Icon: ClipboardList,
              title: '2. Athlete submits a choice',
              body: 'The athlete submits a residence for approval, confirming any cost above their budget is paid out of pocket.',
            },
            {
              Icon: ShieldCheck,
              title: '3. Department decides',
              body: 'A coach reviews and recommends; a manager approves or rejects. The athlete is notified by email and can track status.',
            },
          ].map(({ Icon, title, body }) => (
            <Card key={title}>
              <CardBody>
                <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="mt-3 text-base font-semibold text-ink">{title}</h3>
                <p className="mt-1 text-sm text-muted">{body}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Shared / Auth screens */}
      <section>
        <h2 className="font-display text-2xl font-semibold text-ink">Shared screens</h2>
        <p className="mt-1 text-muted">Used across every role.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {screensByRole('Auth').map((s) => (
            <ScreenCard key={s.id} screen={s} />
          ))}
        </div>
      </section>

      {/* Team */}
      <section>
        <h2 className="font-display text-2xl font-semibold text-ink">The team</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m) => (
            <Card key={m.key}>
              <CardBody>
                <p className="font-semibold text-ink">{m.name}</p>
                <p className="text-sm text-muted">UID {m.uid}</p>
                <p className="mt-2 text-sm text-muted tnum">
                  {screensByOwner(m.key).length} screens
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted">
          Total: {SCREENS.length} screens across Athlete, Coach, Manager, Admin, and shared Auth.
        </p>
      </section>
    </div>
  )
}
