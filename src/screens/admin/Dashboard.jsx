import { useMemo, useState } from 'react'
import {
  Bell,
  Building2,
  CheckCircle2,
  Cog,
  Shield,
  Users,
  Wrench,
} from 'lucide-react'
import ScreenHeader from '../../components/ScreenHeader'
import { screenById } from '../../data/screens'
import { Badge, Button, Card, CardBody, CardHeader, Field, Select, StatusPill, Table } from '../../components/ui'

const metrics = [
  { label: 'Active students', value: '312', tone: 'success' },
  { label: 'Open requests', value: '18', tone: 'warning' },
  { label: 'Policy alerts', value: '4', tone: 'danger' },
  { label: 'Buildings online', value: '6', tone: 'success' },
]

const requests = [
  { id: 'RQ-1042', student: 'Jordan Brooks', topic: 'Room swap', priority: 'High', status: 'In review' },
  { id: 'RQ-1041', student: 'Avery Chen', topic: 'Meal plan change', priority: 'Medium', status: 'Queued' },
  { id: 'RQ-1039', student: 'Mia Patel', topic: 'Accessibility note', priority: 'High', status: 'Needs action' },
  { id: 'RQ-1036', student: 'Noah Lee', topic: 'Move-in exception', priority: 'Low', status: 'Resolved' },
]

const buildings = [
  { name: 'South Campus Village', occupancy: 94, alerts: 1, status: 'Healthy' },
  { name: 'Kahlert Village', occupancy: 88, alerts: 0, status: 'Healthy' },
  { name: 'Legacy Village', occupancy: 97, alerts: 2, status: 'Watch' },
  { name: 'Meldrum Court', occupancy: 81, alerts: 1, status: 'Healthy' },
]

function toneForStatus(status) {
  if (status === 'Healthy' || status === 'Resolved') return 'success'
  if (status === 'Watch' || status === 'Queued' || status === 'In review') return 'warning'
  return 'danger'
}

export default function AdminDashboard() {
  const screen = screenById('D-01')

  const [defaultTerm, setDefaultTerm] = useState('Fall 2026')
  const [autoAssign, setAutoAssign] = useState('Enabled')
  const [notifications, setNotifications] = useState('High priority only')
  const [maintenanceWindow, setMaintenanceWindow] = useState('Sun 2:00 AM')

  const overview = useMemo(
    () => [
      { label: 'Default term', value: defaultTerm },
      { label: 'Auto-assign', value: autoAssign },
      { label: 'Alerts', value: notifications },
      { label: 'Maintenance', value: maintenanceWindow },
    ],
    [defaultTerm, autoAssign, notifications, maintenanceWindow]
  )

  return (
    <div className="space-y-6">
      <ScreenHeader screen={screen} />

      <Card>
        <CardHeader
          title="Admin dashboard"
          subtitle="Operations overview and settings for the housing system prototype."
          icon={<Shield className="h-4 w-4" />}
        />
        <CardBody>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-line p-4">
                <div className="text-sm text-muted">{metric.label}</div>
                <div className="mt-2 text-3xl font-semibold tnum text-ink">{metric.value}</div>
                <div className="mt-2">
                  <StatusPill tone={metric.tone}>{metric.label}</StatusPill>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <Card>
          <CardHeader
            title="Open requests"
            subtitle="A sample queue for staff triage."
            icon={<Users className="h-4 w-4" />}
          />
          <CardBody>
            <Table>
              <thead>
                <tr>
                  <th>Request</th>
                  <th>Student</th>
                  <th>Topic</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id}>
                    <td className="tnum">{req.id}</td>
                    <td>{req.student}</td>
                    <td>{req.topic}</td>
                    <td>
                      <Badge tone={req.priority === 'High' ? 'danger' : req.priority === 'Medium' ? 'warning' : 'neutral'}>
                        {req.priority}
                      </Badge>
                    </td>
                    <td>
                      <StatusPill tone={toneForStatus(req.status)}>{req.status}</StatusPill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Settings"
            subtitle="Prototype controls for common admin defaults."
            icon={<Cog className="h-4 w-4" />}
          />
          <CardBody>
            <div className="space-y-4">
              <Select label="Default term" value={defaultTerm} onChange={(e) => setDefaultTerm(e.target.value)}>
                <option>Fall 2026</option>
                <option>Spring 2027</option>
                <option>Summer 2027</option>
              </Select>

              <Select label="Auto assignment" value={autoAssign} onChange={(e) => setAutoAssign(e.target.value)}>
                <option>Enabled</option>
                <option>Disabled</option>
              </Select>

              <Select
                label="Notification level"
                value={notifications}
                onChange={(e) => setNotifications(e.target.value)}
              >
                <option>High priority only</option>
                <option>All events</option>
                <option>Critical only</option>
              </Select>

              <Select
                label="Maintenance window"
                value={maintenanceWindow}
                onChange={(e) => setMaintenanceWindow(e.target.value)}
              >
                <option>Sun 2:00 AM</option>
                <option>Mon 1:00 AM</option>
                <option>Sat 11:00 PM</option>
              </Select>

              <div className="flex flex-wrap gap-2">
                <Button type="button">Save settings</Button>
                <Button type="button" variant="secondary">
                  Reset defaults
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader
            title="Building status"
            subtitle="Occupancy snapshot across facilities."
            icon={<Building2 className="h-4 w-4" />}
          />
          <CardBody>
            <div className="space-y-3">
              {buildings.map((building) => (
                <div key={building.name} className="rounded-2xl border border-line p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-medium text-ink">{building.name}</div>
                      <div className="text-sm text-muted">
                        Occupancy: <span className="tnum">{building.occupancy}%</span>
                      </div>
                    </div>
                    <StatusPill tone={toneForStatus(building.status)}>{building.status}</StatusPill>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-muted">
                    <span>Alerts</span>
                    <span className="tnum">{building.alerts}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Overview settings"
            subtitle="Summary of current administrative defaults."
            icon={<Bell className="h-4 w-4" />}
          />
          <CardBody>
            <div className="grid gap-3 sm:grid-cols-2">
              {overview.map((item) => (
                <div key={item.label} className="rounded-2xl border border-line p-4">
                  <div className="text-sm text-muted">{item.label}</div>
                  <div className="mt-1 font-medium text-ink">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-line bg-canvas p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-ink">
                <CheckCircle2 className="h-4 w-4" />
                System health
              </div>
              <div className="text-sm text-muted">
                Housing services are operational. A few items need review, but there are no blocking issues.
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <StatusPill tone="success">Operational</StatusPill>
                <StatusPill tone="warning">Minor alerts</StatusPill>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button type="button">
                <Wrench className="mr-2 h-4 w-4" />
                Run maintenance
              </Button>
              <Button type="button" variant="secondary">
                Export report
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
