# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See `AGENTS.md` for the general Expo rules (always check versioned docs, use `npx expo install`, never hand-edit `ios/`/`android/`). Key facts below are specific to this repo.

## Product & design

- **Read `docs/PROJECT_BRIEF.md` before building features** — what the app is, screens, program rules (12 series × 7 days × 4 exercises), phases (phase 1 = basic app stored locally; backend, login and gamification come in phase 2), and constraints (Czech UI, not a medical tool).
- **Read `docs/DESIGN.md` before styling anything** — palette (not final: keep colors in one theme file, never hardcode), Nunito Sans type scale, spacing, shapes, components.
- Project skill `hrave-reflexy` (`.claude/skills/hrave-reflexy/`) holds the design principles and the workflow for building features and screens.
- **After changing a screen or component, run the `mobile-ux-reviewer` agent** (`.claude/agents/`) and fix its 🔴 findings before handing the work back.
- Early mockups live in Google Stitch (project ID `1659365077091035402`, `stitch` MCP server). They are inspiration, not a 1:1 spec.

## Stack

- Expo SDK 58 (`expo ~58.0.x`), React Native 0.88, React 19.3 — docs: https://docs.expo.dev/versions/v58.0.0/
- Expo Router (file-based routing), plain JavaScript/JSX — there is no `tsconfig.json`, so `npx tsc --noEmit` does not apply.
- Package manager is **npm** (`package-lock.json`); use `npx`, not `bunx`.
- No test framework and no ESLint config are set up yet. `npx expo lint` will offer to scaffold one on first run.
- Prettier is set up (`.prettierrc`: no semicolons, single quotes); `npm run format` formats the whole repo.

## Commands

```bash
npm start                # expo start (dev server; Expo Go works — no custom native modules yet)
npm run android | ios | web
npm run emulator         # start Android emulator (lightweight AVD Light_Phone_API_33, cold boot) and move its window on-screen (scripts/emulator.ps1)
npx expo start --tunnel ngrok  # tunnel mode without an Expo login (@expo/ngrok is a dependency); plain --tunnel needs `npx expo login` since SDK 58
npx expo install <pkg>   # add dependencies
npx expo-doctor          # check dependency/config health
```

## Architecture

- **Entry point is `expo-router/entry`** (`package.json` `main`). Routes live in the top-level `app/` directory (not `src/app/` as AGENTS.md describes). `app/index.jsx` is the welcome screen, and its „Pokračovat" button leads to the tabs in `app/(tabs)/` (Domů, Kalendář, Poznámky, Průvodce, Profil; tab bar in `app/(tabs)/_layout.jsx`). Detail screens (`workout`, `done`, `settings`, `library`, `library/starfish`, `notes/[date]`, …) live outside the tabs, in the root Stack.
- Notes: one note per day, so the date is its id. `app/notes/[date].jsx` (dynamic route, e.g. `/notes/2026-10-24`) writes a new note or edits/deletes the existing one; it opens from „Přidat poznámku" and from `components/NoteCard.jsx`, which is shared by the Poznámky tab and the calendar.
- The header above the tabs is set on the `(tabs)` screen in the root Stack (`app/_layout.jsx`): the cat avatar (`assets/img/avatar-cat.svg`) on the left, an `Ellipsis` icon on the right that opens `/settings`. Detail screens get only a back arrow and their title.
- `app/_layout.jsx` is the root layout: it loads Nunito Sans (400, 500, 600 and 700, plus 800 only for the „Hotovo" title) with `useFonts` and renders a `Stack` with a themed header; only `index` (the welcome screen) has `headerShown: false`.
- Design tokens (colors, fonts, typography, spacing, radius) are in `constants/theme.js`. Screens use tokens, never font names or sizes written by hand: `fonts.bold`, `...typography.headlineLg` for page titles, `spacing.screen` (20) for the side margin.
- App content (not user records) lives in `data/`, e.g. `data/workoutVideos.js` with today's exercise videos; the whole program will go there later.
- User records are read and written only through `storage/records.js` (AsyncStorage, JSON). Screens never call AsyncStorage directly, so phase 2 can swap the module for a backend. It holds exercised days (`getExercisedDates`, `addExercisedDate`) and notes (`getNotes`, `saveNote` — adds or replaces the day's note — `deleteNote`). Dates are stored as `'yyyy-MM-dd'` strings, which also sort and compare correctly as plain text; format and parse them with `date-fns` (`format`, `parseISO`, `cs` locale), not by hand.
- Screens in `app/` are the "smart" part (state, storage, logic); components in `components/` are "dumb" (props in, UI out; no `storage/records.js`, no data state). Reusable logic lives in custom hooks in `hooks/` (e.g. `hooks/useExercisePlayer.js`, used by `app/workout.jsx` together with `components/PlayerControls.jsx`); a hook gets navigation as a callback and never calls `router` or storage itself. Details in the `hrave-reflexy` skill („Smart screens, dumb components").
- Tab screens stay mounted when you switch tabs, so a tab that shows saved data loads it with `useFocusEffect` + `useCallback` (from `expo-router`), not `useEffect`. Detail screens in the root Stack are created fresh each time, so `useEffect` is enough there (e.g. `done.jsx` saves today's date on open).
- Screen conventions (page container, back links, detail screens in folders) are in the `hrave-reflexy` skill; naming and Czech text rules are in the `language-and-naming` skill.
- App config is in `app.json`: deep-link scheme `nvsapp`, portrait-only, `userInterfaceStyle: "light"` (set for development; production will use `"automatic"` so the dark palette in `constants/theme.js` turns on), plugins `expo-router`, `expo-status-bar`, `expo-font` and `expo-video`.
- On Windows PowerShell, plain `npx` can fail with "running scripts is disabled"; use `npx.cmd` (or set `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`).
- Web doesn't run yet: `react-native-web` isn't installed (`react-dom` is, pinned to the `react` version). Don't install it without asking.
