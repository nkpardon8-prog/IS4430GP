// Select — a labelled dropdown. Pass options as [{value, label}] or strings.
import { useId } from 'react'

export default function Select({ label, options = [], className = '', ...props }) {
  const id = useId()
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <select
        id={id}
        className="h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-primary"
        {...props}
      >
        {options.map((o) => {
          const value = typeof o === 'string' ? o : o.value
          const text = typeof o === 'string' ? o : o.label
          return (
            <option key={value} value={value}>
              {text}
            </option>
          )
        })}
      </select>
    </div>
  )
}
