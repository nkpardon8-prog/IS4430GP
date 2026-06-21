import { createContext, useContext } from 'react'

// ViewMode — 'submission' (the clean product for grading) or 'team' (the
// project-management dashboard with owner/req/progress meta). Each layout sets
// it; shared components like ScreenHeader read it to decide how much to show.
const ViewModeContext = createContext('submission')

export function ViewModeProvider({ mode, children }) {
  return <ViewModeContext.Provider value={mode}>{children}</ViewModeContext.Provider>
}

export function useViewMode() {
  return useContext(ViewModeContext)
}
