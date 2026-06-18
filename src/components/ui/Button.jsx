// Button — the one button everyone should use. Pick a variant; don't restyle.
const VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-hover shadow-card',
  secondary: 'bg-white text-ink border border-line hover:bg-canvas',
  ghost: 'bg-transparent text-ink hover:bg-line/60',
  danger: 'bg-danger text-white hover:opacity-90 shadow-card',
}
const SIZES = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  className = '',
  children,
  ...props
}) {
  const Tag = as
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
