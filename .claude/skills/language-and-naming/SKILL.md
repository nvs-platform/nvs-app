---
name: language-and-naming
description: Language and naming rules for this repo — every user-facing text in the app is written in correct standard Czech (spisovná čeština), while code, file names, folders, variables, components, comments and commits are in English and follow React Native / Expo Router conventions. Use this whenever you write or review any JSX text, button label, title, error message, notification or program content, whenever you create or rename a file, component, route, hook, variable or folder, and when the user says things like "oprav texty", "jak to pojmenovat", "přejmenuj", "zkontroluj češtinu" — even if they don't mention language or naming.
---

# Language and naming

One simple rule: **what the parent sees is Czech, everything else is English.**

| Czech (spisovná čeština)                                | English                                       |
| ------------------------------------------------------- | --------------------------------------------- |
| texts in `<Text>`, buttons, titles, headers, tab labels | file and folder names                         |
| error and empty-state messages, alerts, notifications   | components, functions, variables, hooks       |
| exercise names and descriptions in `data/` (the values) | object keys in `data/`, route paths           |
| `accessibilityLabel` and `accessibilityHint`            | comments, console logs, commit messages, docs |

## Part 1: Czech texts in the app

### Write standard Czech

- Use **spisovná čeština**, not colloquial forms: „dobrý den", not „dobrej"; „jsme
  připraveni", not „sme připravený"; „cvičení", not „cvičko".
- Always use full **diacritics** (háčky a čárky). Text without them is a bug.
- Write short, calm sentences. One thought per sentence.
- Use **vykání** (address the parent formally): „Vyberte si cvik", „Pokračujte zítra".
  Write „vy/váš" in lowercase, as is usual in apps.
- Avoid gendered past tense aimed at the parent („Dokončil/a jste"). Rephrase it so that it
  works for everyone: „Hotovo, dnešní cvičení je dokončené." or „Skvělá práce!"
- Don't use medical claims or diagnoses (see the `hrave-reflexy` skill).

### Czech typography

- **Quotation marks:** „takto" (low-high), never "takto".
- **Dash:** use the en dash with spaces for ranges and pauses: „4–6 let", „Den 3 – Série 1".
  Don't use a hyphen `-` in its place.
- **Non-breaking space** after one-letter prepositions and conjunctions (k, s, v, z, o, u,
  a, i) when the text could wrap: in JSX write `{'v kalendáři'}` or put a literal
  non-breaking space in the string.
- **Numbers:** thousands separated by a space („1 000"), decimal comma („2,5 minuty").
- **Dates and time:** „17. 10. 2026", „17. října", 24-hour time „18:30". Weekdays and months
  are lowercase („pondělí", „říjen").
- **Capitalization:** only the first word of a title or button is capitalized: „Primární
  reflexy", „Začít cvičení" — not „Primární Reflexy".
- No full stop at the end of buttons, titles and short labels. Full sentences in body
  text end with a full stop.

### Plurals

Czech has three forms. Pick by the number:

- 1 → „1 cvik", „1 den", „1 série"
- 2–4 → „3 cviky", „2 dny", „4 série"
- 0 and 5+ → „5 cviků", „7 dní", „12 sérií"

A tiny helper is fine when a number changes at runtime:

```js
function pluralize(count, one, few, many) {
  if (count === 1) return one
  if (count >= 2 && count <= 4) return few
  return many
}

// pluralize(days, 'den', 'dny', 'dní')
```

### Where texts live

- In phase 1, keep texts directly in the JSX of the screen. Don't add a translation library.
- Program and exercise content goes in `data/` with **English keys and Czech values**:

  ```js
  { id: 'starfish', title: 'Hvězdice', description: 'Dítě leží na zádech…' }
  ```

## Part 2: English names in code

### Naming conventions

| What                                 | Convention                                 | Example                                                         |
| ------------------------------------ | ------------------------------------------ | --------------------------------------------------------------- |
| Route files in `app/`                | lowercase, kebab-case (it becomes the URL) | `app/today.jsx`, `app/reflex-guide.jsx`, `app/library/[id].jsx` |
| Layout files                         | Expo Router name                           | `app/_layout.jsx`                                               |
| Component files in `components/`     | PascalCase, same as the component          | `components/PrimaryButton.jsx`                                  |
| Components                           | PascalCase                                 | `PrimaryButton`, `ExerciseCard`                                 |
| Screen component inside a route file | PascalCase + `Screen`                      | `TodayScreen`, `CalendarScreen`                                 |
| Functions and variables              | camelCase                                  | `currentDay`, `loadNotes()`                                     |
| Imported images and other assets     | camelCase (a value, not a component)       | `import lightLogo from '../assets/img/logo-light.png'`          |
| Booleans                             | `is` / `has` / `can` prefix                | `isDone`, `hasNotes`                                            |
| Event handlers                       | `handle…` inside, `on…` as a prop          | `handlePress`, `onPress={handlePress}`                          |
| Hooks                                | `use…`                                     | `useProgress`                                                   |
| Hook files in `hooks/`               | camelCase, same as the hook, `.js`         | `hooks/useExercisePlayer.js`                                    |
| Real constants                       | UPPER_SNAKE_CASE                           | `EXERCISES_PER_DAY = 4`                                         |
| Style keys in `StyleSheet.create`    | camelCase                                  | `container`, `buttonText`                                       |
| Other folders                        | lowercase                                  | `components/`, `theme/`, `data/`, `assets/img/`                 |
| Asset files                          | lowercase, kebab-case                      | `assets/img/logo-light.png`, `star-fish.png`                    |

### Translate the domain, don't transliterate

Use real English words, not Czech words in code (`cviceni`, `poznamky`) and not
abbreviations nobody knows. Glossary for this app:

| Czech                         | In code                                          |
| ----------------------------- | ------------------------------------------------ |
| cvik                          | `exercise`                                       |
| cvičení (dnešní program)      | `workout`                                        |
| série                         | `series`                                         |
| den                           | `day`                                            |
| primární reflex               | `reflex`                                         |
| neurovývojová stimulace (NVS) | `nvs` (short) or `neurodevelopmentalStimulation` |
| poznámka                      | `note`                                           |
| kalendář                      | `calendar`                                       |
| nastavení                     | `settings`                                       |
| knihovna cviků                | `library`                                        |
| přehrávač                     | `player`                                         |
| rodič / dítě                  | `parent` / `child`                               |

When a new domain word appears, add it to this table so the names stay the same everywhere.

### Comments, logs and commits

- Write comments, `console.log` messages, commit messages and docs in English.
- Comment only what isn't obvious from the code.

## Checklist before handing back

- [ ] Every visible text is in Czech, with diacritics, vykání and Czech quotation marks.
- [ ] Plurals match the number.
- [ ] No Czech words in file names, variables or components.
- [ ] New route files are lowercase kebab-case and new components are PascalCase. Screen
      components end with `Screen` (`HomeScreen`); `Layout` is only for `_layout.jsx` files.
- [ ] The user is a junior and is learning. When her code or a name she suggests breaks a
      rule here, point it out even if she asked about something else: say the convention,
      why it exists, and the correct name.
- [ ] If you find an old file that breaks these rules (for example a camelCase route file), tell
      the user and ask before renaming it. A rename changes the route URL, so every `Link`
      that points to it must change too.
