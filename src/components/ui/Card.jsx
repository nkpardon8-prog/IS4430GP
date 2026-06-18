// Card — a white surface with consistent radius + shadow. Compose freely.
export default function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`rounded-lg border border-line bg-surface shadow-card ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, right, className = '' }) {
  return (
    <div className={`flex items-start justify-between gap-4 border-b border-line px-5 py-4 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold leading-tight text-ink">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
      </div>
      {right}
    </div>
  )
}

export function CardBody({ className = '', children }) {
  return <div className={`px-5 py-4 ${className}`}>{children}</div>
}
