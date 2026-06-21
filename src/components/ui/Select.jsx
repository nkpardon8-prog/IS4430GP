// Select — a labelled dropdown.
// Two ways to supply options (both supported):
//   1. options prop:  <Select options={['A','B']} />  or  [{value,label}]
//   2. <option> children:  <Select><option value="A">A</option></Select>
import { useId } from 'react'

export default function Select({ label, options, className = '', children, ...props }) {
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
        {children ??
          (options ?? []).map((o) => {
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
