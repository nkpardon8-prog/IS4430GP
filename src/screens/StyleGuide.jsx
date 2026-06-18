import { Button, Card, CardBody, CardHeader, Badge, StatusPill, Field, Select, Table } from '../components/ui'

const SWATCHES = [
  { name: 'primary (crimson)', cls: 'bg-primary', hex: '#BE0000' },
  { name: 'ink (text)', cls: 'bg-ink', hex: '#18181B' },
  { name: 'muted (text)', cls: 'bg-muted', hex: '#57534E' },
  { name: 'canvas (page)', cls: 'bg-canvas border border-line', hex: '#FAFAF9' },
  { name: 'line (border)', cls: 'bg-line', hex: '#E7E5E4' },
  { name: 'success', cls: 'bg-success', hex: '#15803D' },
  { name: 'warning', cls: 'bg-warning', hex: '#B45309' },
  { name: 'danger', cls: 'bg-danger', hex: '#DC2626' },
  { name: 'info', cls: 'bg-info', hex: '#1D4ED8' },
]

function Section({ title, children }) {
  return (
    <section>
      <h2 className="mb-3 font-display text-xl font-semibold text-ink">{title}</h2>
      {children}
    </section>
  )
}

export default function StyleGuide() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink">Style Guide</h1>
        <p className="mt-1 max-w-2xl text-muted">
          The shared look for every screen. Use these tokens and components so the whole app stays
          consistent — don’t introduce new colors, fonts, or button styles.
        </p>
      </div>

      <Section title="Colors">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {SWATCHES.map((s) => (
            <div key={s.name} className="rounded-lg border border-line bg-surface p-2">
              <div className={`h-14 w-full rounded-md ${s.cls}`} />
              <p className="mt-2 text-xs font-medium text-ink">{s.name}</p>
              <p className="text-xs text-muted tnum">{s.hex}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <Card>
          <CardBody className="space-y-3">
            <p className="font-display text-3xl font-semibold text-ink">EB Garamond — headings</p>
            <p className="font-sans text-base text-ink">
              Inter — body & UI text. Used for everything interactive and for data.
            </p>
            <p className="font-sans text-ink tnum">
              Tabular numbers for money: $1,250 · $980 · $2,000 (add the <code className="text-xs">tnum</code> class).
            </p>
          </CardBody>
        </Card>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section title="Badges & status">
        <div className="flex flex-wrap items-center gap-2">
          <Badge role="Athlete">Athlete</Badge>
          <Badge role="Coach">Coach</Badge>
          <Badge role="Manager">Manager</Badge>
          <Badge role="Admin">Admin</Badge>
          <Badge tone="success">Approved</Badge>
          <Badge tone="warning">Pending</Badge>
          <Badge tone="danger">Rejected</Badge>
          <StatusPill status="todo" />
          <StatusPill status="in-progress" />
          <StatusPill status="done" />
        </div>
      </Section>

      <Section title="Form fields">
        <Card>
          <CardBody className="grid max-w-xl gap-4">
            <Field label="University UID" required placeholder="u1234567" helper="Your campus UID." />
            <Field label="Password" type="password" required error="UID or password is incorrect." />
            <Select
              label="Residence type"
              options={['Any', 'Apartment', 'House']}
            />
          </CardBody>
        </Card>
      </Section>

      <Section title="Cards & tables">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader title="Card with header" subtitle="Use for grouped content" />
            <CardBody>
              <p className="text-sm text-muted">Card body content goes here.</p>
            </CardBody>
          </Card>
          <Table
            columns={['Source', 'Status', 'Last run']}
            rows={[
              ['Zillow', <Badge key="z" tone="success">Active</Badge>, 'Today 9:00 AM'],
              ['Craigslist', <Badge key="c" tone="warning">Disabled</Badge>, '—'],
            ]}
          />
        </div>
      </Section>
    </div>
  )
}
