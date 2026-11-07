# Design — Hravé reflexy na doma

Visual direction for the app. Product rules are in [PROJECT_BRIEF.md](PROJECT_BRIEF.md).

The starting values come from the Stitch design system "Playful Reflexes Home System".
Stitch is inspiration, so the direction below matters more than matching any mockup.

## Direction

- Calm, warm, natural and minimalist, with a subtle Montessori feel. Think soft organic
  shapes and wooden toys, not a clinic and not a game.
- Trustworthy and clear for parents, friendly and safe for children aged 4–6.
- Use generous whitespace and simple screens a busy parent understands at a glance. The
  parent often holds the phone in one hand while guiding the child with the other.
- **Avoid:** clutter, many colors, decorative bubbles, strong gradients, heavy shadows,
  mascots, loud animations and checkmarks everywhere.
- Gamification comes in phase 2. When it's designed, it should keep this calm tone.
- Illustrations are subtle, soft and hand-drawn, in palette tones, and used only where
  they help.

## Colors — ⚠️ NOT FINAL

The palette is still being decided. Use the tokens below as working values, keep all
colors in one theme file, and never hardcode hex values in components.

**Current working palette** (Stitch design system):

| Role          | Value                 | Use                                                         |
| ------------- | --------------------- | ----------------------------------------------------------- |
| Primary       | `#1E7F96` (deep teal) | primary buttons, active controls, progress, timer fill      |
| Secondary     | `#788A6D` (sage)      | info badges, tags, secondary states, active chips           |
| Tertiary      | `#E9B69A` (apricot)   | encouragement, completion, gentle highlights                |
| Background    | `#FFFFFF` (white)     | screen background, the same on every screen                 |
| Card          | `#FFFDF8`             | cards and raised surfaces                                   |
| Muted surface | `#E8EDE3`             | tracks, segmented controls, tip callouts, secondary buttons |
| Beige         | `#E8E1D5`             | inactive chips, recessed or completed items                 |
| Text          | `#303F49` / `#42483E` | body text and icons. Never use pure black.                  |
| Error         | `#BA1A1A`             | errors                                                      |

**Alternatives explored in the prompts:**

- **E — azure and mandarin:** background `#FFF9F0`, azure `#35AFCB`, mandarin `#F28B55`,
  soft yellow `#F5D875`, text `#303F49`. The feel is fresh, positive, warm and playful.
- **G — azure, navy and lime:** background `#F5FAF9`, azure `#25A8C7`, navy `#315B78`,
  lime `#C8D96B`, text `#273B49`. The feel is fresh, modern and a bit sportier.
- **Sage-led:** sage `#788A6D` as the primary color, with `#E8EDE3`, `#E9B69A`, `#E8E1D5`
  and text `#42483E`. The first brief said _not_ to use sage as the main color, but the
  later screens did. The current mix uses cyan as primary and sage as secondary.

Whatever palette wins, the colors must keep good contrast (body text at least WCAG AA).

## Typography

- **Nunito Sans** only: rounded, friendly, with full Czech diacritics.
  In Expo, load it with `@expo-google-fonts/nunito-sans`.
- Type scale (size/line height in px, then weight):

| Token       | Size / line | Weight | Note                                                |
| ----------- | ----------- | ------ | --------------------------------------------------- |
| display-lg  | 34/42       | 800    | completion and openers only; letter-spacing −0.02em |
| headline-lg | 26/34       | 700    |                                                     |
| headline-md | 22/28       | 700    |                                                     |
| headline-sm | 19/26       | 600    |                                                     |
| body-lg     | 17/26       | 400    |                                                     |
| body-md     | 15/22       | 400    |                                                     |
| body-sm     | 13/18       | 500    |                                                     |
| label-lg    | 15/20       | 700    | buttons                                             |
| label-md    | 13/16       | 600    |                                                     |
| label-sm    | 11/14       | 600    |                                                     |

- Body text stays at regular weight (400). Headings and step titles use 600–700.

## Spacing and layout

- Base rhythm of 8 px. Tokens: 2xs 4, xs 8, sm 12, md 16, lg 24, xl 32, 2xl 48.
- Screen side margin is 20 px on phones (token `spacing.screen`) and 32 px on tablets.
- Tab screens whose content starts with a page title (Poznámky, Průvodce, Profil) have
  32 px (`xl`) above the title, so it doesn't sit on the header. Domů and Kalendář are
  laid out differently and keep 24 px.
- Everything pressable dims to 70 % opacity while the finger is down (buttons scale
  instead, see below). Gutter is 16 px on phones
  and 24 px on tablets.
- Around illustrations and step instructions, lean toward `xl` (32 px).
- Touch targets are large. The primary button is at least 56 px tall.

## Shapes

- Very rounded with no sharp corners.
- Cards and panels use a 32 px radius; large routine cards use 48 px.
- Buttons, inputs, chips and badges are full pills (radius 9999).
- Smaller elements use 8 px (sm) or 16 px (default).

## Depth

- Show depth through layered surface tones (background → card → muted surface), not
  heavy shadows.
- Floating controls and key cards may use a soft shadow:
  `0 8px 24px -4px rgba(48,63,73,0.06), 0 2px 6px -1px rgba(48,63,73,0.03)`.
- Separate elements with 1 px hairline borders, for example
  `rgba(120,138,109,0.15)`, instead of dark dividers.

## Navigation and headers

Agreed with the user. Built: the tab bar, the shared tab header (avatar and three dots),
the back arrow on detail screens, and the headerless exercise player.

- **Bottom tab bar** as the main navigation (Domů · Kalendář · Poznámky · Průvodce ·
  Profil). The exercise library is not a tab; it opens from „Průvodce".
- **Top-level screens** (the tabs) have no back arrow. The header has the **avatar on the
  left** and a three-dots icon on the right that opens Nastavení (a soft grey circle with a dark outline heart icon; not primary, so it doesn't
  compete with the main button). The avatar is for **switching
  between child profiles** (one parent, several children), not a way to Nastavení. In phase 1 it is only a placeholder
  with no action. A large title or a short greeting fits here.
- **Detail screens** (exercise detail, one note, a guide chapter) get the standard back
  arrow on the left of the header. The bottom „Zpět" links go away.
- **Exercise player** has no header: the video fills the whole screen and the controls
  float over it in glass — a round back arrow at the top and one capsule at the bottom
  (see „Exercise player" below).
- **Overflow menu** (`⋮` on Android, `⋯` on iOS) only when a screen has 2+ secondary
  actions. No empty menu „just in case".

## Components

- **Primary button:** pill shape, at least 56 px tall, primary fill, white `label-lg` text,
  soft tinted shadow. Scales to 0.98 when pressed.
- **Secondary button:** pill shape, muted surface fill, dark text, hairline border, no
  shadow.
- **Encouragement button:** apricot fill with dark text. Use it only for completion and
  rest moments.
- **Chips:** pill shape, 36 px tall, icon plus label. Inactive chips are beige; active
  chips are sage with white text.
- **Home „Dnes" card:** card fill, 32 px radius, `lg` padding. Heading „Dnes" with a
  calendar-plus icon on the right (Lucide `CalendarPlus`, `text` color, in a 36 px muted
  surface circle with a hairline border; touch area at least 44 px; accessibility label
  „Zaznamenat cvičení"), then the day line in body text, then the full-width primary
  button „Cvičíme dnes". It stays the strongest element on Home.
- **Home series card:** white (background color, not tinted, so it doesn't blend with the
  rows), 32 px radius, hairline border. Heading „Série 1" with a primary-colored text link
  „Vaše cesta ›" on the right. Below, 7 slim day rows (about 32 px tall, 16 px radius,
  4 px apart, no thumbnails): completed = grey with „odcvičeno" in muted text, current =
  green with a 1.5 px darker green border and „dnes", upcoming = soft pink with dark text.
  Upcoming rows are never shown as disabled. The pink is a new color: add it to
  `constants/theme.js` as a token like the others.
- **Note card** (`components/NoteCard.jsx`, used in „Poznámky" and „Kalendář"): card fill,
  32 px radius, a 1 px `textAlt` border (darker than hairline on purpose, so the notes
  stand out from the white page), title on the left and an outline pencil on the right,
  then the text. The whole card is tappable; the pencil is only a visual hint.
- **Calendar day card:** small date, then the status in bold 19 px. An exercised day has
  the muted surface (soft green) fill, the same color as its marker in the month grid.
- **Parent tip callout:** muted surface fill, 32 px radius, small leaf or lightbulb icon.
- **Inputs:** 52 px tall, 20 px horizontal padding, pill or heavily rounded, card fill,
  2 px primary focus ring. A multiline note field is at least 200 px tall, 16 px radius,
  with a 1 px `textAlt` border like the note card.
- **Checkbox and radio:** 24 px circles. Checked state is a primary fill with a white
  check.
- **Player controls:** see „Exercise player" below.
- **Rest timer:** a large circular dial with a muted track, a primary fill and rounded
  bold numerals.
- **Week progress:** gentle rounded "pebbles", not a hard progress bar or percentages.
- **Icons:** [Lucide](https://lucide.dev) (`lucide-react-native`, needs `react-native-svg`),
  agreed on 2026-10-31. One set for the whole app: outline, 2 px rounded strokes, no
  filled variants. Pass the icon as a component (`icon={Plus}` on `ThemedButton`).
  - Tab bar: `House`, `CalendarDays`, `NotebookPen`, `Compass`, `CircleUser`. The active tab
    is shown by color (primary) and a stroke of 2.5 instead of 2.
  - Header: `Heart` (avatar), `Ellipsis` (Nastavení).
  - Buttons and cards: `Plus`, `Play`, `Trash2`, `Pencil` (notes only), `CalendarPlus`
    (manual record).
  - Player: `ChevronLeft`, `RotateCcw`, `Play` / `Pause` and `SkipForward`; play, pause
    and skip are filled (`fill` = the icon color) so they read as media buttons.
  - Good fits for later: `Leaf`, `Lightbulb` (parent tips), `Sprout` (progress), `Timer`
    (rest).

## Exercise player

Agreed with the user on 2026-10-31: variant **B — glass capsule**. The child should watch
the character, not the controls, so everything the parent needs sits in one frosted
capsule at the bottom and a small row at the top. Mockups of all variants (B is the
chosen one) are on the design canvas „Přehrávač cvičení – návrhy".

- **Video** fills the whole screen, like a standard video player. Nothing covers the
  character in the middle of the screen.
- **Glass surfaces:** every control over the video uses the same look, chosen with the
  user on 2026-11-01 — a milky white fill (`glass`, `rgba(255,255,255,0.7)`) and a 1 px
  soft dark border (`glassBorder`, `rgba(48,63,73,0.12)`), both in `constants/theme.js`.
  Icons on glass are `text`, never white and never pure black. The surfaces are
  `BlurView`s from `expo-blur` (`blurTarget` = the `BlurTargetView` around the video,
  `intensity` 80, `blurReductionFactor` 1, because Android otherwise divides the
  intensity by 4). Blur is **off on Android for now** (`blurMethod="none"`): at 70 %
  white the difference was hardly visible. Open: switch it on
  (`dimezisBlurViewSdk31Plus`) or drop `expo-blur`. `tint="light"` is fixed for now;
  when dark mode is switched on (`"automatic"` in `app.json`), it should follow the color
  scheme like `glass` does.
- **Top row** (16 px under the top safe area, 20 px from the side): a round **back
  arrow**, 44 px, glass, lucide `ChevronLeft`. It is `router.back()`, so the icon points
  back, not to a house. It is required, because iPhone has no system back button. No
  exercise name and no settings button for now (later, if needed).
- **Bottom capsule**, centred, 300 px wide (never wider than the screen minus 2 × 20 px),
  24 px above the bottom safe area so it doesn't clash with the system home gesture.
  Radius `radius.card` (32 px), padding `spacing.md` (16 px) top and sides, `spacing.sm`
  (12 px) bottom, two rows with `spacing.sm` (12 px) between:
  1. **Progress segments** — one per exercise of the day, 4 px tall, fully rounded, 4 px
     gap; a finished exercise is a full primary bar, the current one fills with primary
     as the video plays, upcoming ones are a `track` (`text` at 18 % opacity). The
     elapsed time and „1/4" were left out for now.
  2. **Controls row**, centred with 32 px gaps: **restart** (48 px, no background,
     `RotateCcw`) · **play/pause** (60 px primary circle, filled `Play` / `Pause` in
     `onPrimary`) · **skip** (48 px, no background, filled `SkipForward`). No other
     buttons in the capsule.
- **Hiding:** while the video plays, the back arrow and the whole capsule hide after
  2 seconds (shorter on purpose, so they don't distract the child); only the video stays.
  Tapping anywhere on the video shows them again. When paused, they stay visible. Today
  they disappear at once; a soft fade of about 200 ms (no sliding or bouncing) is planned.
- **Touch targets** stay at least 44 px even where the icon is smaller.
