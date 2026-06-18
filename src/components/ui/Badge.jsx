// Badge — small labelled tag. `tone` sets the color; the label is always text
// (never rely on color alone to carry meaning).
const TONES = {
  neutral: 'bg-line/60 text-ink',
  primary: 'bg-primary-soft text-primary',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
  info: 'bg-info-soft text-info',
}

// Per-role tints, so a screen's role reads at a glance.
const ROLE_TONES = {
  Auth: 'bg-line/60 text-muted',
  Athlete: 'bg-primary-soft text-primary',
  Coach: 'bg-info-soft text-info',
  Manager: 'bg-[#F1EAFB] text-[#7C3AED]',
  Admin: 'bg-[#EEF1F4] text-[#334155]',
}

export default function Badge({ tone = 'neutral', role, className = '', children }) {
  const cls = role ? ROLE_TONES[role] : TONES[tone]
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${cls} ${className}`}
    >
      {children}
    </span>
  )
}
