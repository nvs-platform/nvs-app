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
- Screen side margin is 20 px on phones and 32 px on tablets. Gutter is 16 px on phones
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

Agreed with the user. Built: the tab bar, the shared tab header (avatar and three dots)
and the back arrow on detail screens. Not built yet: the headerless exercise player.

- **Bottom tab bar** as the main navigation (Domů · Kalendář · Poznámky · Průvodce ·
  Profil). The exercise library is not a tab; it opens from „Průvodce".
- **Top-level screens** (the tabs) have no back arrow. The header has the **avatar on the
  left** and a three-dots icon on the right that opens Nastavení (a soft grey circle with a dark outline heart icon; not primary, so it doesn't
  compete with the main button). The avatar is for **switching
  between child profiles** (one parent, several children), not a way to Nastavení. In phase 1 it is only a placeholder
  with no action. A large title or a short greeting fits here.
- **Detail screens** (exercise detail, one note, a guide chapter) get the standard back
  arrow on the left of the header. The bottom „Zpět" links go away.
- **Exercise player** has no header: the video goes to the top with floating round
  buttons (back, more) over it.
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
- **Routine and day card:** card fill, 48 px radius, 24 px padding, hairline border,
  thumbnail in a soft rounded mask. States are completed (soft green), current
  (cream/apricot accent) and upcoming (neutral beige, never shown as disabled).
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
- **Player controls:** restart, a large central play/pause and skip, styled like a clean
  modern cassette deck. They are always visible in both portrait and landscape.
- **Rest timer:** a large circular dial with a muted track, a primary fill and rounded
  bold numerals.
- **Week progress:** gentle rounded "pebbles", not a hard progress bar or percentages.
- **Icons:** simple outline icons. Stitch used Material Symbols names such as
  `play_arrow`, `replay`, `skip_next`, `spa`, `edit_note` and `menu_book`.
