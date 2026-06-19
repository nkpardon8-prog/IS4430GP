// ============================================================================
//  Shared MOCK fixtures for Milestone 2 screens.
//  Static demo data only — no backend. Screens import these read-only and render.
//  Keeping one fixture set means the same athlete (e.g. Jordan Rivera) shows up
//  coherently in the coach queue, the manager queue, and the budget table.
// ============================================================================

export const COACH = { name: 'Coach Daniels', sport: 'Track & Field' }
export const MANAGER = { name: 'Manager Olsen' }
export const SPORTS = ['Track & Field', 'Basketball', 'Soccer', 'Gymnastics']

export const ATHLETES = [
  { id: 'a1', name: 'Jordan Rivera', uid: 'u0900001', sport: 'Track & Field', email: 'jordan.rivera@utah.edu', classYear: 'Junior', budget: 1400, housingStatus: 'Pending Review', coach: 'Coach Daniels' },
  { id: 'a2', name: 'Maya Chen', uid: 'u0900002', sport: 'Track & Field', email: 'maya.chen@utah.edu', classYear: 'Sophomore', budget: 1300, housingStatus: 'Approved', coach: 'Coach Daniels' },
  { id: 'a3', name: 'Devon Brooks', uid: 'u0900003', sport: 'Track & Field', email: 'devon.brooks@utah.edu', classYear: 'Senior', budget: 1500, housingStatus: 'Pending Review', coach: 'Coach Daniels' },
  { id: 'a4', name: "Liam O'Connor", uid: 'u0900004', sport: 'Basketball', email: 'liam.oconnor@utah.edu', classYear: 'Freshman', budget: 1600, housingStatus: 'Rejected', coach: 'Coach Tanaka' },
  { id: 'a5', name: 'Sofia Martinez', uid: 'u0900005', sport: 'Soccer', email: 'sofia.martinez@utah.edu', classYear: 'Junior', budget: 1350, housingStatus: 'Approved', coach: 'Coach Tanaka' },
  { id: 'a6', name: 'Aisha Bello', uid: 'u0900006', sport: 'Gymnastics', email: 'aisha.bello@utah.edu', classYear: 'Sophomore', budget: 1250, housingStatus: 'Cancelled', coach: 'Coach Reyes' },
]

// Residence requests across the full lifecycle (Submitted/Pending/Approved/Rejected/Cancelled).
export const REQUESTS = [
  { id: 'r1', athleteId: 'a1', residence: 'Sunnyside Apartments — 2 Bed', rent: 1250, source: 'Zillow', status: 'Pending Review', submitted: '2026-06-14', decided: null, reviewer: null, coachRec: 'Recommended', reason: null, notes: 'Close to the track facility; easy walk to campus.' },
  { id: 'r2', athleteId: 'a3', residence: 'Foothill Townhomes — 3 Bed', rent: 1700, source: 'Apartments.com', status: 'Pending Review', submitted: '2026-06-15', decided: null, reviewer: null, coachRec: 'Recommend with reservations', reason: null, notes: 'Over budget but shared with two teammates.' },
  { id: 'r3', athleteId: 'a2', residence: 'Stadium View Lofts — Studio', rent: 1100, source: 'Zillow', status: 'Approved', submitted: '2026-06-08', decided: '2026-06-10', reviewer: 'Manager Olsen', coachRec: 'Recommended', reason: 'Within budget, quiet building.', notes: '' },
  { id: 'r4', athleteId: 'a5', residence: 'Liberty Park Apartments — 2 Bed', rent: 1300, source: 'Craigslist', status: 'Approved', submitted: '2026-06-05', decided: '2026-06-07', reviewer: 'Manager Olsen', coachRec: 'Recommended', reason: 'Good value near practice fields.', notes: '' },
  { id: 'r5', athleteId: 'a4', residence: 'Downtown High-Rise — 1 Bed', rent: 1950, source: 'Zillow', status: 'Rejected', submitted: '2026-06-03', decided: '2026-06-06', reviewer: 'Manager Olsen', coachRec: 'Do not recommend', reason: 'Exceeds budget by a wide margin.', notes: 'Athlete requested anyway.' },
  { id: 'r6', athleteId: 'a6', residence: 'Sugarhouse Flats — Studio', rent: 1200, source: 'Apartments.com', status: 'Cancelled', submitted: '2026-06-01', decided: '2026-06-02', reviewer: 'Manager Olsen', coachRec: 'Recommended', reason: 'Athlete withdrew the request.', notes: '' },
  { id: 'r7', athleteId: 'a1', residence: 'University Gardens — 1 Bed', rent: 1400, source: 'Facebook', status: 'Submitted', submitted: '2026-06-16', decided: null, reviewer: null, coachRec: null, reason: null, notes: 'Backup option if Sunnyside is denied.' },
  { id: 'r8', athleteId: 'a3', residence: 'Red Butte Apartments — 2 Bed', rent: 1500, source: 'Zillow', status: 'Approved', submitted: '2026-05-28', decided: '2026-05-30', reviewer: 'Manager Olsen', coachRec: 'Recommended', reason: 'On budget, renewed lease.', notes: '' },
]

// Seed audit trail for budget changes (REQ-BUDGET-003 §31, REQ-SEC-005 §56).
export const BUDGET_HISTORY = [
  { id: 'b1', athleteId: 'a1', oldValue: 1200, newValue: 1400, changedBy: 'System Admin', date: '2026-06-10', reason: 'Annual adjustment' },
  { id: 'b2', athleteId: 'a3', oldValue: 1400, newValue: 1500, changedBy: 'System Admin', date: '2026-06-09', reason: 'Sport equity review' },
  { id: 'b3', athleteId: 'a4', oldValue: 1500, newValue: 1600, changedBy: 'System Admin', date: '2026-06-04', reason: 'Cost-of-living update' },
  { id: 'b4', athleteId: 'a5', oldValue: 1200, newValue: 1350, changedBy: 'System Admin', date: '2026-05-20', reason: 'Imported from university source' },
  { id: 'b5', athleteId: 'a2', oldValue: 1100, newValue: 1300, changedBy: 'System Admin', date: '2026-05-15', reason: 'Initial allocation' },
]

// --- helpers ---------------------------------------------------------------
export const athleteById = (id) => ATHLETES.find((a) => a.id === id)
export const requestsByAthlete = (athleteId) => REQUESTS.filter((r) => r.athleteId === athleteId)
export const assignedAthletes = (coachName = COACH.name) => ATHLETES.filter((a) => a.coach === coachName)
export const assignedAthleteIds = (coachName = COACH.name) => assignedAthletes(coachName).map((a) => a.id)
