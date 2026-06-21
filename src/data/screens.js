// ============================================================================
//  THE SCREEN REGISTRY  —  this is the one file you edit to claim/track work.
// ============================================================================
//  Pure data. The navigation, the role dashboards, the "My Work" panel, the
//  routes, and every screen's on-page checklist are all generated from here.
//
//  To work on your screen:
//    1. Find your row below (Ctrl/Cmd-F your name in `owner`).
//    2. Open its file in src/screens/… and build the UI (copy athlete/Dashboard.jsx).
//    3. Change this screen's `status` to 'in-progress', then 'done' when finished.
//  You do NOT need to touch routing — every screen is already wired up.
//
//  Fields:
//    id          stable screen code (S-01, A-03, …) — DO NOT change
//    title       human name shown in nav + cards
//    role        Auth | Athlete | Coach | Manager | Admin  (which tab it lives under)
//    owner       Mike | Ellie | Patrick | Nick   (must match src/data/team.js)
//    sourceReq   the Milestone 1 requirement this screen traces back to
//    path        its URL
//    status      'todo' | 'in-progress' | 'done'
//    keyElements the must-have pieces, lifted from the M1 requirement
// ============================================================================

export const ROLES = ['Auth', 'Athlete', 'Coach', 'Manager', 'Admin']

export const SCREENS = [
  // --- Shared / Auth --------------------------------------------------------
  {
    id: 'S-01', title: 'Login (UID + Password)', role: 'Auth', owner: 'Ellie',
    sourceReq: 'REQ-AUTH-001', path: '/login', status: 'done',
    keyElements: ['UID field', 'Password field', 'Error state for invalid login'],
  },
  {
    id: 'S-02', title: 'Access Denied', role: 'Auth', owner: 'Ellie',
    sourceReq: 'REQ-ROLE-004 §3.6, REQ-SEC-005', path: '/access-denied', status: 'done',
    keyElements: ['Clean "no details" message', 'Return-to-login action'],
  },

  // --- Athlete --------------------------------------------------------------
  {
    id: 'A-01', title: 'Athlete Dashboard', role: 'Athlete', owner: 'Mike',
    sourceReq: 'REQ-NOTIFY-012 FR-4', path: '/athlete/dashboard', status: 'done',
    keyElements: ['Active request status', 'Recent activity', 'Quick search'],
    notes: 'Built as the worked example — copy this file when building your own screen.',
  },
  {
    id: 'A-02', title: 'Residence Search + Filter', role: 'Athlete', owner: 'Patrick',
    sourceReq: 'REQ-SEARCH-009', path: '/athlete/search', status: 'done',
    keyElements: ['Filter rail', 'Sort controls', 'Result cards', 'Budget-fit badge'],
  },
  {
    id: 'A-03', title: 'Residence Details + Budget Comparison', role: 'Athlete', owner: 'Mike',
    sourceReq: 'REQ-DETAIL-010', path: '/athlete/details', status: 'done',
    keyElements: ['Photos', 'Attributes', 'Source link', 'Out-of-pocket calculation'],
  },
  {
    id: 'A-04', title: 'Residence Submission Form', role: 'Athlete', owner: 'Mike',
    sourceReq: 'REQ-SUBMIT-011', path: '/athlete/submit', status: 'done',
    keyElements: ['Prefilled summary', 'Out-of-pocket confirm checkbox', 'Optional notes'],
  },
  {
    id: 'A-05', title: 'Request Status / History', role: 'Athlete', owner: 'Mike',
    sourceReq: 'REQ-NOTIFY-012 FR-5', path: '/athlete/status', status: 'done',
    keyElements: ['Lifecycle timeline', 'Cancel-pending action'],
  },
  {
    id: 'A-06', title: 'Athlete Profile', role: 'Athlete', owner: 'Patrick',
    sourceReq: 'REQ-ROLE-004 §3.1', path: '/athlete/profile', status: 'done',
    keyElements: ['Profile fields', 'Assigned budget', 'Status history'],
  },

  // --- Coach ----------------------------------------------------------------
  {
    id: 'C-01', title: 'Coach Dashboard', role: 'Coach', owner: 'Nick',
    sourceReq: 'REQ-ROLE-004 §3.2', path: '/coach/dashboard', status: 'done',
    keyElements: ['Assigned-athlete submissions queue'],
  },
  {
    id: 'C-02', title: 'Submission Review + Comment', role: 'Coach', owner: 'Nick',
    sourceReq: 'REQ-ROLE-004 §3.2', path: '/coach/review', status: 'done',
    keyElements: ['Read-only request', 'Add recommendation (no approve/reject)'],
  },
  {
    id: 'C-03', title: 'Assigned Athlete Profile / Budget', role: 'Coach', owner: 'Nick',
    sourceReq: 'REQ-ROLE-004 §3.2', path: '/coach/athlete', status: 'done',
    keyElements: ['Scoped athlete view (only assigned athletes)'],
  },

  // --- Manager --------------------------------------------------------------
  {
    id: 'M-01', title: 'Manager Dashboard', role: 'Manager', owner: 'Nick',
    sourceReq: 'REQ-ROLE-004 §3.3', path: '/manager/dashboard', status: 'done',
    keyElements: ['All-pending queue', 'Filters'],
  },
  {
    id: 'M-02', title: 'Request Review + Decision', role: 'Manager', owner: 'Mike',
    sourceReq: 'REQ-SUBMIT-011 FR-6/7', path: '/manager/decision', status: 'todo',
    keyElements: ['Single decision view', 'Approve / reject', 'Comment / reason'],
  },
  {
    id: 'M-03', title: 'Request Status History (All)', role: 'Manager', owner: 'Nick',
    sourceReq: 'REQ-ROLE-004 §3.3', path: '/manager/history', status: 'done',
    keyElements: ['Full managed-athlete history'],
  },

  // --- Admin ----------------------------------------------------------------
  {
    id: 'D-01', title: 'Admin Dashboard / Settings', role: 'Admin', owner: 'Patrick',
    sourceReq: 'REQ-ROLE-004 §3.4', path: '/admin/dashboard', status: 'done',
    keyElements: ['System settings', 'Collection health summary'],
  },
  {
    id: 'D-02', title: 'User + Role Management', role: 'Admin', owner: 'Ellie',
    sourceReq: 'REQ-ROLE-004 §3.5', path: '/admin/users', status: 'done',
    keyElements: ['User table', 'Role dropdown', 'Change-history note'],
  },
  {
    id: 'D-03', title: 'Housing Budget Management', role: 'Admin', owner: 'Nick',
    sourceReq: 'REQ-BUDGET-003, REQ-SEC-005', path: '/admin/budgets', status: 'done',
    keyElements: ['Budget edit', 'Old/new value audit capture'],
  },
  {
    id: 'D-04', title: 'Approved Website Management', role: 'Admin', owner: 'Ellie',
    sourceReq: 'REQ-SITE-006', path: '/admin/websites', status: 'done',
    keyElements: ['Add / edit / disable / remove', 'Active / inactive status'],
  },
  {
    id: 'D-05', title: 'Listing Collection History', role: 'Admin', owner: 'Patrick',
    sourceReq: 'REQ-LISTING-007 §3.6', path: '/admin/collection', status: 'done',
    keyElements: ['Per-source status', 'Last run', 'Failure log'],
  },
  {
    id: 'D-06', title: 'Audit / System History', role: 'Admin', owner: 'Ellie',
    sourceReq: 'REQ-SEC-005 §3.5', path: '/admin/audit', status: 'done',
    keyElements: ['Read-only event log'],
  },
]

// --- Derived helpers (used by nav, dashboards, My Work) ---------------------
export function screenById(id) {
  return SCREENS.find((s) => s.id === id)
}
export function screensByRole(role) {
  return SCREENS.filter((s) => s.role === role)
}
export function screensByOwner(owner) {
  return SCREENS.filter((s) => s.owner === owner)
}
export function progress() {
  const done = SCREENS.filter((s) => s.status === 'done').length
  return { done, total: SCREENS.length, pct: Math.round((done / SCREENS.length) * 100) }
}
