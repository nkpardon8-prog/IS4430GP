// The four group members. `key` must match the `owner` field used in screens.js.
// `current` marks whose machine this is — drives the default "My Work" filter.
export const TEAM = [
  { key: 'Nick', name: 'Nick', uid: 'u1505426', accent: 'role.manager', current: true },
  { key: 'Mike', name: 'Mike', uid: 'u1476733', accent: 'role.athlete', current: false },
  { key: 'Ellie', name: 'Ellie Choi', uid: 'u1429275', accent: 'role.admin', current: false },
  { key: 'Patrick', name: 'Patrick Hopes', uid: 'u0612718', accent: 'role.coach', current: false },
]

export const CURRENT_MEMBER = TEAM.find((m) => m.current) ?? TEAM[0]

export function memberByKey(key) {
  return TEAM.find((m) => m.key === key)
}
