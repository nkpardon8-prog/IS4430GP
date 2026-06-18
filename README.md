# IS4430GP — Student-Athlete Housing UI (Milestone 2)

Shared UI baseline for the IS4430 group project: a University of Utah
student-athlete housing system. This is the **prototype interface** for
Milestone 2 — realistic screens built from our Milestone 1 requirements. The
buttons don't need to actually work; the screens need to look real.

**Live site:** https://is4430gp.netlify.app
**Repo:** https://github.com/nkpardon8-prog/IS4430GP

---

## HOW TO DO YOUR PART (read this first)

You each own a set of screens. You do **not** need to understand the whole repo —
just your screens.

1. **Find your screens.** Open the app → Home → **My Work**, click your name. Or
   open `src/data/screens.js` and search for your name in the `owner` field.
2. **Open your screen's file.** Every screen has its own file under
   `src/screens/…`. The file path is shown right on the placeholder page. For
   example, `A-03` lives at `src/screens/athlete/Details.jsx`.
3. **Build it.** Replace the `<PlaceholderScreen/>` with your UI. Copy
   **`src/screens/athlete/Dashboard.jsx`** (the A-01 worked example) as your
   starting point, and use the shared components from `src/components/ui`
   (`Button`, `Card`, `Badge`, `Field`, `Select`, `Table`, …). Don't invent new
   colors or fonts — see the **Style Guide** tab.
4. **Mark it done.** In `src/data/screens.js`, change your screen's
   `status: 'todo'` to `'in-progress'` or `'done'`. That updates the progress bar
   and your card's badge.
5. **Push.** Committing to `main` auto-deploys to Netlify within a minute or two.

That's it. Routing, navigation, and the layout are already wired — you only touch
your own screen file (and one `status` line).

---

## Run it locally

```bash
npm install
npm run dev      # open the printed localhost URL
```

Other commands: `npm run build` (production build → `dist/`), `npm run preview`
(serve the built site).

## How it's organized

```
src/
  data/screens.js        ← the screen registry (owners, status, traceability) — edit this
  data/team.js           ← the 4 of us
  data/requirements.js   ← the 12 Milestone 1 requirements
  components/ui/          ← shared building blocks (Button, Card, Badge, Field, …)
  components/             ← Layout, TabNav, ScreenCard, PlaceholderScreen, ScreenHeader
  screens/               ← one file per screen (this is where you work)
    athlete/Dashboard.jsx  ← A-01, the finished example to copy
```

The whole app is **registry-driven**: the nav, the role dashboards, the "My Work"
panel, and the routes are all generated from `src/data/screens.js`. Add or
reassign a screen by editing that one file.

## Tech

Vite + React + Tailwind CSS, React Router, lucide-react icons. Deployed on
Netlify with continuous deployment from this repo's `main` branch.

## Who owns what

See `TASKS.md` for the full per-person checklist with requirement traceability.
