import { progress } from '../data/screens'

export default function Footer() {
  const { done, total } = progress()
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center">
        <p>
          IS4430 Group Project · Milestone 2 UI baseline ·{' '}
          <span className="font-medium text-ink">{done}/{total}</span> screens built
        </p>
        <p>University of Utah Student-Athlete Housing System</p>
      </div>
    </footer>
  )
}
