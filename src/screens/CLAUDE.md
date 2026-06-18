# src/screens — one file per screen

This is where you build your assigned screens. Each file = one screen.

## To build a screen

1. Open your file (e.g. `athlete/Details.jsx`). It currently renders
   `<PlaceholderScreen id="A-03" />`.
2. Replace that with your real UI. **Copy `athlete/Dashboard.jsx` (A-01)** as your
   template — it shows the expected pattern:
   - `<ScreenHeader screen={screenById('YOUR-ID')} />` first (keeps titles uniform)
   - layout with `Card` / `CardHeader` / `CardBody` from `../../components/ui`
   - `Button`, `Badge`, `Field`, `Select`, `Table` from the same place
3. In `../data/screens.js`, set this screen's `status` to `'done'`.

## Rules

- Use only the shared `../../components/ui` building blocks and the Tailwind
  tokens (`text-ink`, `bg-primary`, `bg-canvas`, …). No new colors/fonts, no emoji
  icons (use `lucide-react`). Add `tnum` to money/number text.
- Hard-coded sample data is fine — this is a visual prototype, buttons needn't work.
- Only edit the screen file(s) you own (`owner` field in `../data/screens.js`).
  `RoleIndex.jsx`, `Home.jsx`, and `StyleGuide.jsx` are shared — leave them alone
  unless the group agrees.
- Run `npm run build` before pushing; a broken build blocks everyone's deploy.
