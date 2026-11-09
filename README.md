# Hravé reflexy na doma

_„Malé krůčky, společný čas"_

A mobile app for parents of preschool children (about 4–6 years). It guides them through
short, regular movement exercises at home that support the integration of primary
(primitive) reflexes. The app UI is in Czech.

This is not a medical tool. It does not ask for or store any data about children.

## Status

**Phase 1: basic version.** The app runs on the device and stores data locally. Exercise
videos are bundled in the app. There is no backend, no login and no gamification yet. These
come in phase 2. See [docs/PROJECT_BRIEF.md](docs/PROJECT_BRIEF.md) for details.

## Getting started

You need [Node.js](https://nodejs.org/) and npm.

```bash
npm install
npm start
```

Then open the app in **Expo Go** on your phone (scan the QR code), or press `a` for Android.
Expo Go must support the project's SDK (58). The web version doesn't run yet.

Other commands:

```bash
npm run android    # start and open on Android
npm run ios        # start and open on iOS
npm run emulator   # start the Android emulator (Windows, scripts/emulator.ps1)
npx expo start --tunnel ngrok   # tunnel mode, when the phone is on a different network
```

On Windows PowerShell, if `npx` fails with "running scripts is disabled", use `npx.cmd`
instead.

To add a dependency, use `npx expo install <package>` so the version matches the Expo SDK.

## Tech stack

- [Expo](https://docs.expo.dev/versions/v58.0.0/) SDK 58, React Native 0.88, React 19.3
- [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing)
- Plain JavaScript (JSX), no TypeScript
- Font: Nunito Sans
- [react-native-calendars](https://github.com/wix/react-native-calendars): the month grid
  in „Kalendář" and in the record window
- [Expo UI](https://docs.expo.dev/versions/latest/sdk/ui/drop-in-replacements/bottomsheet/)
  (`@expo/ui`): the bottom sheet of the record window „Zaznamenat cvičení"
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/): saves user
  records on the device
- [date-fns](https://date-fns.org/): formats dates (`'yyyy-MM-dd'`, „24. října" with the
  `cs` locale)

## Project structure

```
app/            screens (each file is one route)
  _layout.jsx   root layout: loads fonts, sets up navigation
  index.jsx     welcome screen
  (tabs)/       screens with the bottom tab bar (Domů, Kalendář, Poznámky, Průvodce, Profil)
  library/      exercise library and exercise detail screens
  notes/
    [date].jsx  write, edit or delete the note for one day (/notes/2026-10-24)
  settings.jsx  settings, opened from the three-dots icon in the header
assets/         icons, splash screen and images
components/     shared components (ThemedText, ThemedView, ThemedCard, NoteCard, …)
constants/
  theme.js      design tokens: colors, fonts, spacing, radius
  calendarLocale.js  Czech month and day names for all calendars
docs/           product and design documentation
scripts/        helper scripts (Android emulator)
storage/
  records.js    reads and writes user records on the device (AsyncStorage): exercise
                records (date and series) and notes (one note per day)
```

To format the code, run `npm run format` (Prettier, settings in `.prettierrc`), or press
Shift+Alt+F in VS Code.

## Documentation

- [docs/PROJECT_BRIEF.md](docs/PROJECT_BRIEF.md): what the app is, screens, program rules
  and phases
- [docs/DESIGN.md](docs/DESIGN.md): colors, typography, spacing and components
- [CLAUDE.md](CLAUDE.md) and [AGENTS.md](AGENTS.md): instructions for AI coding assistants
