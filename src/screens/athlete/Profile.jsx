import { useMemo, useState } from 'react'
import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Edit3,
  FileText,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import ScreenHeader from '../../components/ScreenHeader'
import { screenById } from '../../data/screens'
import { Badge, Button, Card, CardBody, CardHeader, Field, Select, StatusPill, Table } from '../../components/ui'

const initialProfile = {
  name: 'Jordan Brooks',
  pronouns: 'they/them',
  sport: 'Track & Field',
  year: 'Junior',
  major: 'Kinesiology',
  email: 'jordan.brooks@utah.edu',
  phone: '(801) 555-0142',
  ucid: 'U1234567',
  residency: 'South Campus Village',
  room: 'SCV 3-214',
  eligibility: 'Eligible',
  mealPlan: 'Level 2',
  scholarship: 'Active',
}

const documents = [
  { name: 'Government ID', status: 'Verified', updated: 'May 18, 2026' },
  { name: 'Athletics clearance', status: 'Verified', updated: 'Jun 01, 2026' },
  { name: 'Housing agreement', status: 'Pending review', updated: 'Jun 16, 2026' },
  { name: 'Emergency contact form', status: 'Verified', updated: 'May 29, 2026' },
]

const activity = [
  { date: 'Jun 16, 2026', action: 'Updated room preference', detail: 'Requested quiet floor and study desk' },
  { date: 'Jun 12, 2026', action: 'Submitted housing agreement', detail: 'Waiting for staff review' },
  { date: 'Jun 08, 2026', action: 'Verified eligibility', detail: 'Cleared for fall housing assignment' },
]

function toneForStatus(status) {
  if (status === 'Verified' || status === 'Eligible' || status === 'Active') return 'success'
  if (status === 'Pending review') return 'warning'
  return 'neutral'
}

export default function Profile() {
  const screen = screenById('A-06')
  const [preferredBuilding, setPreferredBuilding] = useState('South Campus Village')
  const [roomType, setRoomType] = useState('Double')
  const [quietFloor, setQuietFloor] = useState('Yes')
  const [profile] = useState(initialProfile)

  const highlights = useMemo(
    () => [
      { label: 'Status', value: profile.eligibility, icon: <ShieldCheck className="h-4 w-4" /> },
      { label: 'Scholarship', value: profile.scholarship, icon: <CreditCard className="h-4 w-4" /> },
      { label: 'Move-in', value: 'Aug 18, 2026', icon: <CalendarDays className="h-4 w-4" /> },
    ],
    [profile]
  )

  return (
    <div className="space-y-6">
      <ScreenHeader screen={screen} />

      <Card>
        <CardHeader
          title={profile.name}
          subtitle={`${profile.pronouns} · ${profile.sport} · ${profile.year}`}
          icon={<UserRound className="h-4 w-4" />}
        />
        <CardBody>
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {highlights.map((item) => (
                  <Badge key={item.label} tone="neutral">
                    <span className="mr-1 inline-flex items-center">{item.icon}</span>
                    {item.label}: {item.value}
                  </Badge>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-sm font-medium text-ink">Email</div>
                  <div className="text-sm text-muted">{profile.email}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-ink">Phone</div>
                  <div className="text-sm text-muted">{profile.phone}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-ink">University ID</div>
                  <div className="text-sm text-muted tnum">{profile.ucid}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-ink">Assigned housing</div>
                  <div className="text-sm text-muted">
                    {profile.residency} · {profile.room}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-canvas p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-ink">
                <Edit3 className="h-4 w-4" />
                Quick actions
              </div>
              <div className="space-y-3">
                <Button type="button" className="w-full">
                  Update profile
                </Button>
                <Button type="button" variant="secondary" className="w-full">
                  Review documents
                </Button>
                <Button type="button" variant="secondary" className="w-full">
                  Contact housing
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader
            title="Housing preferences"
            subtitle="Sample values for the prototype."
            icon={<FileText className="h-4 w-4" />}
          />
          <CardBody>
            <div className="grid gap-4 md:grid-cols-3">
              <Select label="Preferred building" value={preferredBuilding} onChange={(e) => setPreferredBuilding(e.target.value)}>
                <option>South Campus Village</option>
                <option>Kahlert Village</option>
                <option>Legacy Village</option>
              </Select>

              <Select label="Room type" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                <option>Double</option>
                <option>Single</option>
                <option>Suite</option>
              </Select>

              <Select label="Quiet floor preference" value={quietFloor} onChange={(e) => setQuietFloor(e.target.value)}>
                <option>Yes</option>
                <option>No preference</option>
              </Select>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="neutral">Preferred building: {preferredBuilding}</Badge>
              <Badge tone="neutral">Room type: {roomType}</Badge>
              <Badge tone="neutral">Quiet floor: {quietFloor}</Badge>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Emergency & billing"
            subtitle="Reference details shown as read-only sample data."
            icon={<CreditCard className="h-4 w-4" />}
          />
          <CardBody>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <div className="text-sm font-medium text-ink">Emergency contact</div>
                <div className="text-sm text-muted">Taylor Brooks · (801) 555-0199</div>
              </div>
              <div>
                <div className="text-sm font-medium text-ink">Billing method</div>
                <div className="text-sm text-muted">Campus account · Auto-pay enabled</div>
              </div>
              <div>
                <div className="text-sm font-medium text-ink">Meal plan</div>
                <div className="text-sm text-muted">{profile.mealPlan}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-ink">Insurance</div>
                <div className="text-sm text-muted">On file</div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <StatusPill tone="success">Profile complete</StatusPill>
              <StatusPill tone={toneForStatus(profile.eligibility)}>{profile.eligibility}</StatusPill>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Document status"
          subtitle="A simple checklist of the items tied to this profile."
          icon={<CheckCircle2 className="h-4 w-4" />}
        />
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Document</th>
                <th>Status</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.name}>
                  <td>{doc.name}</td>
                  <td>
                    <StatusPill tone={toneForStatus(doc.status)}>{doc.status}</StatusPill>
                  </td>
                  <td>{doc.updated}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Recent activity"
          subtitle="A lightweight timeline for the prototype."
          icon={<CalendarDays className="h-4 w-4" />}
        />
        <CardBody>
          <div className="space-y-4">
            {activity.map((item) => (
              <div key={item.date + item.action} className="flex gap-4 rounded-2xl border border-line p-4">
                <div className="min-w-24 text-sm font-medium text-ink tnum">{item.date}</div>
                <div>
                  <div className="font-medium text-ink">{item.action}</div>
                  <div className="text-sm text-muted">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
