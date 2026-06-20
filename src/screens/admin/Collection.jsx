import { useMemo, useState } from 'react'
import {
  Archive,
  CalendarDays,
  Clock3,
  Filter,
  History,
  ListChecks,
  MapPinned,
  Search,
} from 'lucide-react'
import ScreenHeader from '../../components/ScreenHeader'
import { screenById } from '../../data/screens'
import { Badge, Button, Card, CardBody, CardHeader, Field, Select, StatusPill, Table } from '../../components/ui'

const history = [
  {
    id: 'L-4021',
    title: 'South Campus Village — Unit 3B',
    owner: 'Patrick Hopes',
    status: 'Archived',
    collected: 'Jun 17, 2026',
    source: 'Fall 2026 intake',
    tags: ['Apartment', 'Quiet floor'],
  },
  {
    id: 'L-4018',
    title: 'Kahlert Village — Double Room',
    owner: 'Mike',
    status: 'Collected',
    collected: 'Jun 16, 2026',
    source: 'Transfer request',
    tags: ['Residence hall', 'Meal plan'],
  },
  {
    id: 'L-4012',
    title: 'Legacy Village — 4BR Suite',
    owner: 'Ellie Choi',
    status: 'Collected',
    collected: 'Jun 15, 2026',
    source: 'Roster sync',
    tags: ['Apartment', 'Accessible'],
  },
  {
    id: 'L-4008',
    title: 'Meldrum Court — Townhome',
    owner: 'Nick',
    status: 'Flagged',
    collected: 'Jun 14, 2026',
    source: 'Manual review',
    tags: ['Townhome', 'Pet friendly'],
  },
  {
    id: 'L-4002',
    title: 'Downtown Housing — Studio',
    owner: 'Patrick Hopes',
    status: 'Archived',
    collected: 'Jun 13, 2026',
    source: 'Spring carryover',
    tags: ['Studio', 'Graduate'],
  },
]

const summaryCards = [
  { label: 'Collected this week', value: '18', tone: 'success' },
  { label: 'Archived listings', value: '12', tone: 'neutral' },
  { label: 'Flagged items', value: '3', tone: 'warning' },
  { label: 'Reviewed by staff', value: '100%', tone: 'success' },
]

function toneForStatus(status) {
  if (status === 'Collected') return 'success'
  if (status === 'Archived') return 'neutral'
  if (status === 'Flagged') return 'warning'
  return 'neutral'
}

export default function Collection() {
  const screen = screenById('D-05')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [owner, setOwner] = useState('All')
  const [timeframe, setTimeframe] = useState('Last 30 days')

  const owners = useMemo(() => ['All', ...new Set(history.map((item) => item.owner))], [])
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return history.filter((item) => {
      const matchesQuery =
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.owner.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q))

      const matchesStatus = status === 'All' || item.status === status
      const matchesOwner = owner === 'All' || item.owner === owner
      return matchesQuery && matchesStatus && matchesOwner
    })
  }, [query, status, owner])

  return (
    <div className="space-y-6">
      <ScreenHeader screen={screen} />

      <Card>
        <CardHeader
          title="Listing collection history"
          subtitle="Review how listings were gathered, grouped, and archived for the prototype."
          icon={<History className="h-4 w-4" />}
        />
        <CardBody>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-line p-4">
                <div className="text-sm text-muted">{card.label}</div>
                <div className="mt-2 text-3xl font-semibold text-ink tnum">{card.value}</div>
                <div className="mt-2">
                  <StatusPill tone={card.tone}>{card.label}</StatusPill>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Filters"
          subtitle="Search by listing, owner, source, or tag."
          icon={<Filter className="h-4 w-4" />}
        />
        <CardBody>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Field
              label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Listing, owner, source..."
            />

            <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="All">All statuses</option>
              <option value="Collected">Collected</option>
              <option value="Archived">Archived</option>
              <option value="Flagged">Flagged</option>
            </Select>

            <Select label="Owner" value={owner} onChange={(e) => setOwner(e.target.value)}>
              {owners.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>

            <Select label="Timeframe" value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Current term</option>
            </Select>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button">
              <Search className="mr-2 h-4 w-4" />
              Apply filters
            </Button>
            <Button type="button" variant="secondary">
              Reset
            </Button>
            <Badge tone="neutral">{filtered.length} results</Badge>
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <Card>
          <CardHeader
            title="History table"
            subtitle="Chronological record of collected listings."
            icon={<ListChecks className="h-4 w-4" />}
          />
          <CardBody>
            <Table>
              <thead>
                <tr>
                  <th>Listing</th>
                  <th>Owner</th>
                  <th>Status</th>
                  <th>Collected</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="font-medium text-ink">{item.title}</div>
                      <div className="text-sm text-muted tnum">{item.id}</div>
                    </td>
                    <td>{item.owner}</td>
                    <td>
                      <StatusPill tone={toneForStatus(item.status)}>{item.status}</StatusPill>
                    </td>
                    <td className="tnum">{item.collected}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Collection details"
            subtitle="Sample metadata shown for the selected history set."
            icon={<Archive className="h-4 w-4" />}
          />
          <CardBody>
            <div className="space-y-4">
              <div className="rounded-2xl border border-line p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-ink">
                  <CalendarDays className="h-4 w-4" />
                  Review window
                </div>
                <div className="mt-2 text-sm text-muted">{timeframe}</div>
              </div>

              <div className="rounded-2xl border border-line p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-ink">
                  <Clock3 className="h-4 w-4" />
                  Latest sync
                </div>
                <div className="mt-2 text-sm text-muted tnum">Jun 17, 2026 · 4:30 PM</div>
              </div>

              <div className="rounded-2xl border border-line p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-ink">
                  <MapPinned className="h-4 w-4" />
                  Source coverage
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge tone="neutral">Fall intake</Badge>
                  <Badge tone="neutral">Transfers</Badge>
                  <Badge tone="neutral">Manual review</Badge>
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-canvas p-4">
                <div className="text-sm font-medium text-ink">Notes</div>
                <p className="mt-2 text-sm text-muted">
                  This is a static prototype view showing how listing collection history can be audited by
                  staff.
                </p>
              </div>

              <Button type="button" className="w-full">
                Export history
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
