// D-02 · User + Role Management
// Owner: Ellie · Traces to REQ-ROLE-004 §3.5
import { useState } from 'react'
import { Users, History } from 'lucide-react'
import { screenById } from '../../data/screens'
import ScreenHeader from '../../components/ScreenHeader'
import { Card, CardHeader, CardBody, Badge, Select } from '../../components/ui'

// ============================================================================
//  D-02 · User + Role Management — System Admin assigns/changes roles
//  (REQ-ROLE-004 FR-48). Sample data only; role changes update local state
//  and a faux "logged" note so the change-history requirement (NFR-51) reads
//  clearly, even though nothing actually persists.
// ============================================================================

const ROLE_OPTIONS = ['Athlete', 'Athletic Coach', 'Athletic Manager', 'System Admin']

const INITIAL_USERS = [
  { id: 'u1', name: 'Jordan Rivera', uid: 'u1023456', email: 'j.rivera@utah.edu', role: 'Athlete' },
  { id: 'u2', name: 'Sam Okafor', uid: 'u1044821', email: 's.okafor@utah.edu', role: 'Athlete' },
  { id: 'u3', name: 'Maria Lopez', uid: 'u1099213', email: 'm.lopez@utah.edu', role: 'Athletic Coach' },
  { id: 'u4', name: 'Devon Pierce', uid: 'u1077634', email: 'd.pierce@utah.edu', role: 'Athletic Manager' },
  { id: 'u5', name: 'Ellie Choi', uid: 'u1012987', email: 'e.choi@utah.edu', role: 'System Admin' },
]

function roleTone(role) {
  if (role === 'System Admin') return 'neutral'
  if (role === 'Athletic Manager') return 'info'
  if (role === 'Athletic Coach') return 'warning'
  return 'primary'
}

export default function UserManagement() {
  const screen = screenById('D-02')
  const [users, setUsers] = useState(INITIAL_USERS)
  const [lastChange, setLastChange] = useState(null)

  function handleRoleChange(userId, newRole) {
    const target = users.find((u) => u.id === userId)
    if (!target || target.role === newRole) return
    setLastChange({
      user: target.name,
      from: target.role,
      to: newRole,
      when: 'just now',
    })
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)))
  }

  return (
    <div>
      <ScreenHeader screen={screen} />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="System users"
            subtitle="Assign or change a user's role"
            right={
              <span className="flex items-center gap-1.5 text-sm text-muted">
                <Users className="h-4 w-4" aria-hidden="true" />
                {users.length} users
              </span>
            }
          />
          <CardBody>
            <div className="overflow-x-auto rounded-lg border border-line">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line bg-canvas text-left text-muted">
                    <th className="px-4 py-2.5 font-medium">Name</th>
                    <th className="px-4 py-2.5 font-medium">UID</th>
                    <th className="px-4 py-2.5 font-medium">Email</th>
                    <th className="px-4 py-2.5 font-medium">Current role</th>
                    <th className="px-4 py-2.5 font-medium">Change role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-line last:border-0 hover:bg-canvas/60">
                      <td className="px-4 py-2.5 font-medium text-ink">{u.name}</td>
                      <td className="px-4 py-2.5 font-mono text-xs text-muted">{u.uid}</td>
                      <td className="px-4 py-2.5 text-muted">{u.email}</td>
                      <td className="px-4 py-2.5">
                        <Badge tone={roleTone(u.role)}>{u.role}</Badge>
                      </td>
                      <td className="px-4 py-2.5">
                        <Select
                          aria-label={`Change role for ${u.name}`}
                          options={ROLE_OPTIONS}
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          className="w-44"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Change history"
            subtitle="Most recent role change"
            right={<History className="h-4 w-4 text-muted" aria-hidden="true" />}
          />
          <CardBody>
            {lastChange ? (
              <div className="rounded-lg bg-canvas p-3 text-sm">
                <p className="font-medium text-ink">{lastChange.user}</p>
                <p className="mt-1 text-muted">
                  <Badge tone={roleTone(lastChange.from)} className="mr-1">
                    {lastChange.from}
                  </Badge>
                  &rarr;
                  <Badge tone={roleTone(lastChange.to)} className="ml-1">
                    {lastChange.to}
                  </Badge>
                </p>
                <p className="mt-2 text-xs text-muted">Changed {lastChange.when} by Ellie Choi</p>
              </div>
            ) : (
              <p className="text-sm text-muted">
                No role changes yet this session. Change a role in the table to see it
                logged here.
              </p>
            )}
            <p className="mt-4 text-xs text-muted">
              All role changes are recorded in system history per REQ-ROLE-004 (NFR-51).
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}