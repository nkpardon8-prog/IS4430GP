# IS4430GP — Guide for Contributors (and Claude Code)

University of Utah student-athlete housing system — the Milestone 2 UI prototype
for our IS4430 group project. This file tells you (or your AI assistant) how to
work in this repo without breaking anyone else's part.

- **Live site:** https://is4430gp.netlify.app (auto-deploys on every push to `main`)
- **Detailed task list:** see `TASKS.md` · **Project overview:** see `README.md`

---

## The one thing to understand: this app is registry-driven

`src/data/screens.js` is the single source of truth. It lists all 20 screens with
their owner, status, and the requirement each traces to. The navigation, the role
dashboards, the Home "My Work" panel, and the routes are **all generated from
it**. You almost never touch routing or nav — you edit your screen and that file.

---

## How to do your part (3 steps)

1. **Find your screens.** Open `TASKS.md`, or run the site → Home → *My Work* →
   your name. Each screen has its own file under `src/screens/…`.
2. **Build your screen.** Open your file and replace `<PlaceholderScreen/>` with
   real UI. **Copy `src/screens/athlete/Dashboard.jsx` (A-01)** — it's the
   finished example. Use the shared components in `src/components/ui`.
3. **Mark it done.** In `src/data/screens.js`, change your screen's
   `status: 'todo'` → `'in-progress'` → `'done'`. Commit and push; it goes live.

---

## House rules (keep the app consistent)

- **Use the shared components.** Import from `src/components/ui`: `Button`, `Card`
  (+ `CardHeader`/`CardBody`), `Badge`, `StatusPill`, `Field`, `Select`, `Table`.
  Don't hand-roll buttons or inputs.
- **Start every screen with `<ScreenHeader screen={screenById('YOUR-ID')} />`** so
  the title block stays uniform. See A-01.
- **No new colors or fonts.** Use the Tailwind tokens (`bg-primary`, `text-ink`,
  `text-muted`, `bg-canvas`, `border-line`, `text-success/warning/danger`, …)
  defined in `tailwind.config.js`. The full palette is on the **Style Guide** tab.
- **Icons:** use `lucide-react` (SVG). No emoji as icons.
- **Numbers** (rent, budgets): add the `tnum` class for tabular figures.
- **Accessibility:** real `<label>`s on inputs (the `Field` component handles
  this), keep text readable, don't remove focus rings.
- **It's a visual prototype.** Buttons don't need to actually work — use
  hard-coded sample data like A-01 does.

## Don't touch (unless the group agrees)

- `src/App.jsx` routing and the `COMPONENTS` map — already wired for every screen.
- `tailwind.config.js` tokens, `src/components/ui/*`, `src/components/Layout*` —
  shared infrastructure. Changing these affects everyone.
- Another person's screen file (check the `owner` in `screens.js`).

## Don't break the build

Every push to `main` triggers a Netlify build. If the build fails, the site
doesn't update. Before pushing, run it locally:

```bash
npm install      # first time only
npm run dev      # preview while you work
npm run build    # must succeed before you push
```

## Ownership (full list in TASKS.md)

Mike · Ellie Choi · Patrick Hopes · Nick. To reassign a screen, change its
`owner` in `src/data/screens.js` (and update `TASKS.md`). Names must match
`src/data/team.js`.
