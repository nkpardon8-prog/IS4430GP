// Single source of truth for the Team-view URL prefix. Submission view is
// unprefixed (the product); Team view lives under TEAM_BASE. Use teamPath() to
// build a team-view link for any screen so the prefix never drifts.
export const TEAM_BASE = '/team'
export const teamPath = (path) => `${TEAM_BASE}${path}`
