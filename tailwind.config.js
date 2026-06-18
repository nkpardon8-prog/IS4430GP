/** @type {import('tailwindcss').Config} */
// Design tokens for the IS4430GP athlete-housing UI.
// Semantic names only — components reference `bg-primary`, `text-ink`, etc.
// (never raw hex), so the whole look can be retuned from this one file.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand — University of Utah crimson
        primary: { DEFAULT: '#BE0000', hover: '#9A0000', soft: '#FBEAEA' },
        // Neutrals
        ink: '#18181B', // primary text
        muted: '#57534E', // secondary text
        surface: '#FFFFFF',
        canvas: '#FAFAF9', // page background
        line: '#E7E5E4', // borders / dividers
        // Status
        success: { DEFAULT: '#15803D', soft: '#E7F4EC' },
        warning: { DEFAULT: '#B45309', soft: '#FBF0E2' },
        danger: { DEFAULT: '#DC2626', soft: '#FBE9E9' },
        info: { DEFAULT: '#1D4ED8', soft: '#E8EDFB' },
        // Per-role accents (used as small labelled badges only, never color-alone)
        role: {
          athlete: '#BE0000',
          coach: '#1D4ED8',
          manager: '#7C3AED',
          admin: '#334155',
          auth: '#57534E',
        },
      },
      fontFamily: {
        display: ['"EB Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(24,24,27,0.04), 0 1px 3px rgba(24,24,27,0.06)',
        pop: '0 4px 12px rgba(24,24,27,0.08), 0 2px 4px rgba(24,24,27,0.06)',
      },
      borderRadius: {
        lg: '0.625rem',
      },
    },
  },
  plugins: [],
}
