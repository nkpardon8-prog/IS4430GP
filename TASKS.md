# Milestone 2 — Screen Assignments

20 screens, each traced to a Milestone 1 requirement. Build your screen in the
file shown, then set its `status` in `src/data/screens.js`. The A-01 example is
already done — copy it.

## Mike — 5 screens
- [x] **A-01** Athlete Dashboard — `src/screens/athlete/Dashboard.jsx` — REQ-NOTIFY-012 FR-4 — 
- [x] **A-03** Residence Details + Budget Comparison — `src/screens/athlete/Details.jsx` — REQ-DETAIL-010
- [ ] **A-04** Residence Submission Form — `src/screens/athlete/Submit.jsx` — REQ-SUBMIT-011
- [ ] **A-05** Request Status / History — `src/screens/athlete/Status.jsx` — REQ-NOTIFY-012 FR-5
- [ ] **M-02** Request Review + Decision — `src/screens/manager/Decision.jsx` — REQ-SUBMIT-011 FR-6/7

## Ellie Choi — 5 screens
- [ ] **S-01** Login (UID + Password) — `src/screens/auth/Login.jsx` — REQ-AUTH-001
- [ ] **S-02** Access Denied — `src/screens/auth/AccessDenied.jsx` — REQ-ROLE-004 §3.6, REQ-SEC-005
- [ ] **D-02** User + Role Management — `src/screens/admin/Users.jsx` — REQ-ROLE-004 §3.5
- [ ] **D-04** Approved Website Management — `src/screens/admin/Websites.jsx` — REQ-SITE-006
- [ ] **D-06** Audit / System History — `src/screens/admin/Audit.jsx` — REQ-SEC-005 §3.5

## Patrick Hopes — 4 screens
- [ ] **A-02** Residence Search + Filter — `src/screens/athlete/Search.jsx` — REQ-SEARCH-009
- [ ] **A-06** Athlete Profile — `src/screens/athlete/Profile.jsx` — REQ-ROLE-004 §3.1
- [ ] **D-01** Admin Dashboard / Settings — `src/screens/admin/Dashboard.jsx` — REQ-ROLE-004 §3.4
- [ ] **D-05** Listing Collection History — `src/screens/admin/Collection.jsx` — REQ-LISTING-007 §3.6

## Nick — 6 screens ✅ all built
- [x] **C-01** Coach Dashboard — `src/screens/coach/Dashboard.jsx` — REQ-ROLE-004 §3.2
- [x] **C-02** Submission Review + Comment — `src/screens/coach/Review.jsx` — REQ-ROLE-004 §3.2
- [x] **C-03** Assigned Athlete Profile / Budget — `src/screens/coach/Athlete.jsx` — REQ-ROLE-004 §3.2
- [x] **M-01** Manager Dashboard — `src/screens/manager/Dashboard.jsx` — REQ-ROLE-004 §3.3
- [x] **M-03** Request Status History (All) — `src/screens/manager/History.jsx` — REQ-ROLE-004 §3.3
- [x] **D-03** Housing Budget Management — `src/screens/admin/Budgets.jsx` — REQ-BUDGET-003, REQ-SEC-005

---

To reassign a screen, change its `owner` in `src/data/screens.js` and update this
file. Names must match `src/data/team.js` (Mike, Ellie, Patrick, Nick).
