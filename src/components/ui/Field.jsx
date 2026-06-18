// Field — a labelled text input with optional helper + error text.
// Always render a visible <label> (not placeholder-only) for accessibility.
import { useId } from 'react'

export default function Field({
  label,
  type = 'text',
  required = false,
  helper,
  error,
  className = '',
  ...props
}) {
  const id = useId()
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-danger">*</span>}
      </label>
      <input
        id={id}
        type={type}
        aria-invalid={!!error}
        className={`h-10 w-full rounded-lg border bg-white px-3 text-sm text-ink placeholder:text-muted/60 transition-colors ${
          error ? 'border-danger' : 'border-line focus:border-primary'
        }`}
        {...props}
      />
      {error ? (
        <p className="mt-1 text-sm text-danger" role="alert">{error}</p>
      ) : helper ? (
        <p className="mt-1 text-sm text-muted">{helper}</p>
      ) : null}
    </div>
  )
}
