// The 12 Milestone 1 requirements, for reference + traceability.
// Each screen in screens.js points back to one of these via `sourceReq`.
export const REQUIREMENTS = [
  { id: 'REQ-AUTH-001', title: 'Athlete UID Login, Logout, and Session Security', priority: 'High — Must Have' },
  { id: 'REQ-PROFILE-002', title: 'Athlete Profile Management', priority: 'High — Must Have' },
  { id: 'REQ-BUDGET-003', title: 'Housing Budget Management', priority: 'High — Must Have' },
  { id: 'REQ-ROLE-004', title: 'Tiered Role and Permission Management', priority: 'High — Must Have' },
  { id: 'REQ-SEC-005', title: 'Student Data Storage and Security', priority: 'High — Must Have' },
  { id: 'REQ-SITE-006', title: 'Approved Rental Website Management', priority: 'High — Must Have' },
  { id: 'REQ-LISTING-007', title: 'Automated Residence Listing Collection', priority: 'High — Must Have' },
  { id: 'REQ-DATA-008', title: 'Listing Data Quality and Duplicate Handling', priority: 'Medium — Should Have' },
  { id: 'REQ-SEARCH-009', title: 'Residence Search and Filtering', priority: 'High — Must Have' },
  { id: 'REQ-DETAIL-010', title: 'Residence Details and Budget Comparison', priority: 'Medium — Should Have' },
  { id: 'REQ-SUBMIT-011', title: 'Residence Selection Submission and Review Workflow', priority: 'High — Must Have' },
  { id: 'REQ-NOTIFY-012', title: 'Email Notification and Status Tracking', priority: 'High — Must Have' },
]

// Look up a requirement by the (possibly section-qualified) sourceReq string,
// e.g. "REQ-ROLE-004 §3.6" -> the REQ-ROLE-004 record.
export function requirementFor(sourceReq) {
  if (!sourceReq) return undefined
  const baseId = sourceReq.split(/[ ,]/)[0]
  return REQUIREMENTS.find((r) => r.id === baseId)
}
