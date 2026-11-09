# Project Brief — Hravé reflexy na doma

Product context for building the app. Visual rules live in [DESIGN.md](DESIGN.md).

The first version of this brief came from early design exploration in Google Stitch
(project `1659365077091035402`, Oct 2026). Treat Stitch as **inspiration, not a spec**.
The rules in sections 1–4 are intended product behavior. The screen descriptions in
section 5 are a starting point that can change during implementation.

## 1. The app

- **Name:** Hravé reflexy (na doma). Tagline: _„Malé krůčky, společný čas"_.
- **What it does:** helps parents of preschool children (about **4–6 years**) do short,
  regular movement exercises at home, following a prepared program that supports the
  integration of **primary (primitive) reflexes**.
- **Users:** the **parent** is the main user and operates the app. The **child** mainly
  watches the exercise videos.
- **Child profiles (phase 2):** one parent with several children uses one app. Each child
  has their own profile with their own program progress, and the parent switches between
  them with the avatar in the header. A profile holds **only a nickname** (it doesn't have
  to be the real name) **and an avatar picture**, nothing else. They are built in
  phase 2; phase 1 only prepares for them (avatar placeholder, records that can later be
  assigned to a profile).
  When creating a profile, the parent **picks the avatar from a set of animal avatars**
  (idea from 2026-11-07). Phase 1 uses the cat from that set as the header placeholder.
- **Feel:** trustworthy and clear for adults, friendly and safe for small children.
  It should feel like a quality tool for parents, **not a game for toddlers**. Exercise is
  framed as a calm daily ritual, not as therapy.
- **Platform:** mobile-first, portrait phone only, the video player included (portrait
  9:16 videos, see section 7). Tablet is secondary.
- **UI language:** Czech only. All visible text must be in Czech.
- **Form of address: vykání.** Address the parent formally (for example „Vítejte",
  „Vyberte si čas", „Prohlédněte si cviky"). This is the current decision and may still be
  revisited. Many strings quoted in section 5 come from mockups in tykání. Convert them to
  vykání when implementing.
- **No data about children.** The app never asks for or stores a child's name, age or any
  other child data. The one exception is the child profile: a nickname and an avatar
  picture, nothing more (no age, birth date, photo or health data).

## 2. Phases

The app is built in phases. Build the basic version first and keep later phases in mind,
but don't implement them early.

| Phase                           | Scope                                                                                                                                                                                                                                                                                                                        |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1 — Basic version (current)** | Core app on the device: Home / Today, exercise player (completion), program progress, calendar and manual records, notes, exercise library, reflex guide, settings (reminders). Data is stored **locally on the device**. Exercise **videos are bundled in the app**. There is **no backend, no login and no gamification**. |
| **2 — Later**                   | **Backend and accounts:** sign-in, registration, password reset and data sync. **Videos are served from the backend.** **Child profiles:** one parent, several children, switched via the avatar. **Gamification:** motivating elements for the family; the form is not designed yet. Other extensions as decided.           |

Keep phase 1 code ready for phase 2:

- Keep data access behind a small storage module (for example `data/` or `storage/`) so it
  can later be swapped for an API.
- Resolve video sources in one place (for example `video` on each exercise in `data/`) so
  bundled files can later become URLs.
- Record progress per exercise and per day with dates, which gamification will need later.

## 3. Rules (apply everywhere)

- **Gamification is not in phase 1.** Don't add points, badges, streaks, percentages or
  similar yet. It is planned for later, so don't build anything that would block it.
- No mascots, no visual clutter, no loud animations.
- No pressure: missing a day has no penalties („Bez spěchu a sankcí").
- **Not a medical tool:** no screening tests, symptom checklists, diagnostic scores or
  promises of treatment outcomes. Educational content is general and does not replace
  an assessment by a doctor or physiotherapist.
- Exercise names, descriptions and instructions are **placeholders**. The final content
  will be supplied and reviewed by a qualified specialist.
- Do not invent extra features beyond what is described here.

## 4. Program structure and business rules

Agreed with the user on 2026-11-08 (replaces the earlier „12 series × 7 days").

- **Program = series in a fixed order** (Série 1, Série 2, …). How many series there are
  is not final; it depends on the content from the specialist.
- **A series = a set of exercises, usually 4.** The family does the same set every day it
  exercises, for a period of **about 30 days**. In real therapy the therapist then reviews
  the progress and assigns the next series.
- **The parent moves to the next series themselves.** The app never switches on its own,
  not even after 30 days. The 30 days are only a guide, so the parent has time to talk it
  over with the therapist first. Phase 1 has no therapist account, so the switch is a
  manual step in the app (where it lives is not designed yet, probably „Vaše cesta").
- **Switching to the next series deletes all notes** (agreed 2026-11-08), ticked or not:
  the new series brings new exercises, so old notes would only add chaos, and a question
  the parent never asked was probably not important. Before the switch the parent
  confirms a dialog (working text, final wording later): „Přechod do další série je
  vhodné probrat s vaším terapeutem. Cviky z této série už nebudou k dispozici a všechny
  poznámky se smažou. Chcete přejít do další série?" with „Přejít do další série" and
  „Zrušit". In phase 2 the same happens when the therapist assigns the next series.
- A series can be repeated or kept longer than 30 days; that's never shown as a failure.
- **No breaks between exercises in the app.** The rest moments are part of the exercise
  videos, so the player goes straight from one exercise to the next.
- A day counts as **exercised when all exercises of the day were completed or explicitly
  skipped**. If the parent leaves mid-session, the day is not exercised.
- The 30 days must not imply that the family has to exercise every calendar day. The
  **calendar records actual exercise dates**, not a required schedule.
- Parents can **record exercise manually**, including for a **past date**. Today is
  preselected. Only the day is recorded, not single exercises (see „Manual record").
- **Reminders:** on first launch (in phase 2, on first sign-in), ask whether the parent wants exercise reminders and at
  what time. This can be changed later in Settings.
- **Out of scope for phase 1:** backend, accounts and login, gamification (see section 2), multiple child profiles, therapist accounts, subscriptions or
  payments, social login, advanced notification schedules, search, filters and sorting in
  the exercise library.

## 5. Screens

### Auth (phase 2)

Not built in phase 1. In phase 1 the app opens straight to Home. A short welcome on first launch is optional.

| Screen         | Content                                                                                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Welcome        | App name, „Malé krůčky, společný čas", „Jednoduché pohybové aktivity pro společné chvíle doma.", illustration of a parent and child moving together, buttons „Přihlásit se" (primary) and „Vytvořit účet" (secondary) |
| Sign in        | „Vítej zpátky", fields E-mail and Heslo, „Zapomněli jste heslo?", „Přihlásit se", „Ještě nemáš účet? Vytvořit účet"                                                                                                   |
| Register       | „Vytvoř si účet", fields E-mail, Heslo (at least 8 characters) and Potvrdit heslo, checkbox „Souhlasím s podmínkami používání a zásadami ochrany osobních údajů.", „Vytvořit účet", „Už máš účet? Přihlásit se"       |
| Password reset | „Obnovení hesla", „Zadej svůj e-mail a pošleme ti instrukce k obnovení hesla.", „Odeslat instrukce", „Zpět na přihlášení", success state „Instrukce odeslány"                                                         |

### Home — „Domů"

Agreed with the user on 2026-11-07. Home is the **parent's** screen: at a glance it shows
what we exercise today and where we are in the program. The child's moments are the player
and „Hotovo", not Home. Top to bottom:

- **Header:** avatar on the left (switching between child profiles; in phase 1 only a
  placeholder, see „Navigation and headers" in [DESIGN.md](DESIGN.md)), the child's
  **nickname** in the middle and the three dots on the right. In phase 1 the nickname is a
  fixed placeholder („Miuška"); in phase 2 it comes from the child profile (nickname only,
  see section 1). The earlier idea of a changing greeting („Dobré odpoledne") was dropped
  on 2026-11-08.
- **„Dnes" card** (first on the screen): heading „Dnes", the line „Série 1 · 3. den · asi 5
  minut" and the wide primary button **„Cvičíme dnes"** with a play icon. This is the main
  action. On the right, level with the heading, a small **calendar-plus icon** opens the
  manual record („Zaznamenat cvičení"). It is the only way into it from the tabs.
- **„Série 1" card** below it: the heading „Série 1" and, on the right, a link
  **„Vaše cesta ›"** to an overview of all series (not designed yet). Home shows only the
  current series, so the program doesn't feel like a long road.
- Inside the series card, **7 slim rows**, one per exercise of the series in order
  („1. cvičení", „2. cvičení", …), not per calendar day (see „Manual record" below). No
  pictures: every exercise of a series is the same set of 4 exercises. The rows are split
  **by week**, so the parent never sees 30 rows at once: Home shows only the week of the
  next free exercise (1–7, then 8–14, …), with no week label and no paging back (agreed
  2026-11-09). The list is an overview; only the row with the calendar-plus icon can be
  tapped. States:
  - done: with „odcvičeno"
  - today: green with a border, with „dnes"
  - upcoming: soft pink, plain label, still readable (never looks disabled; no
    „Plánováno", which would suggest a schedule)
  - once today is done: the next free row stays pink and gets the calendar-plus icon,
    which opens the manual record
- **After exercising:** when the parent finishes the day (reaches „Hotovo") or records it
  manually, the date is saved to „Kalendář" and, on Home, that day's row turns grey
  („odcvičeno"). Both come from the same exercise record, so they always match.
- **„Dnes" card when today is already exercised** (look agreed 2026-11-08): the app
  doesn't jump to the next exercise on its own. The card keeps **the same size**, so
  nothing below it moves, but its content is rebuilt and **centred**: no heading and no
  „Série 1 · …" line, only a soft green circle with a checkmark, „Dnes máte hotovo" in
  bold and below it „Další cvičení série na vás počká." (no „zítra", which would suggest
  exercising every day). A checkmark, not a sun: Home is the parent's screen, the sun
  belongs to the child's celebration (which picks one of five pictures at random), and
  green already means „exercised" in „Kalendář". The calendar-plus icon leaves the card
  and moves to the next free row of the series (see „Manual record"). The next exercise
  becomes the current one on a later date.
- **Testing reset (development only):** while the app is being built, the tab header has a
  small dark „dev" button with a skull (`components/DevButton.jsx`) that deletes the saved
  exercise records and reopens the tabs, so the cycle can be run through again and again.
  Two hardcoded test records (`MOCK_EXERCISE_RECORDS` in `storage/records.js`) always
  stay, so Home and „Kalendář" are never empty while testing. It is shown only in
  development builds (`__DEV__`) and never reaches parents; both are deleted before
  release.
- A day left in the middle is not completed; next time it starts again from the first
  exercise (the player lets the parent skip exercises).
- One icon never has two meanings across the app: the pencil means notes, the plus means
  "add something". That's why the manual record uses the calendar-plus icon, not a pencil.
- Later: the „Vaše cesta" screen, including how the parent moves to the next series.
- **Menu:** a **bottom tab bar** with 5 tabs: **Domů · Kalendář · Poznámky · Průvodce ·
  Profil**. The exercise library is not a tab; it opens from „Průvodce". The tab bar is for
  switching screens only; actions like „Cvičíme dnes" stay on the screen.
- **Settings are not a tab.** A three-dots icon on the right of the header (shared by all tabs) opens the
  „Více" menu (see below). On the left of the header is the avatar (the cat).
- The welcome screen and the exercise player do not show the tab bar.

### Exercise player (core screen)

- **The video is the focus:** it fills the whole screen, with no header and no text over
  it.
- At the top: a round glass **back arrow** on the left. At the bottom: one glass
  **capsule** with the progress segments (one per exercise of the day) and the controls:
  - **restart** the current exercise
  - large central **play/pause**
  - **skip** to the next exercise

  While the video plays, the controls hide after 2 seconds and come back on a tap. The
  exact layout is in „Exercise player" in [DESIGN.md](DESIGN.md).

- **Later (not built yet):** the exercise name, the elapsed time and „1/4", „Série 1 ·
  1. den" and an info icon for the parent. The info
     icon comes together with the exercise library, which holds the same exercise texts.
     Where both go in the fullscreen player is not decided.
- **No rest screen.** The breaks between exercises are part of the videos, so the player
  goes straight to the next exercise (decided 2026-11-08).
- **Info panel** („Poznámka pro rodiče" / „Instrukce pro rodiče", „Na co si dát pozor")
  opens over the video and has a „Zpět k videu" action. Opening it or pausing must
  **not reset the video position**.
- **Completion** („Hotovo" screen): a short, cheerful celebration, the moment when the
  child hands the exercise back to the parent. A short animation plays once (about 3 s:
  soft turning rays, a confetti burst, a circle with an icon that moves) and one big title
  appears („Hurá!"), then the button. No subtitle, no numbers, no streaks and no
  collecting; the guide girl says goodbye in the video, so there is no mascot here. For
  now there are five (sun, star, balloon, rocket, paw), picked at random; more celebrations and
  a melody may come later (see [CELEBRATION_PLAN.md](CELEBRATION_PLAN.md)). No „Přidat poznámku" here: this screen is
  for the child; notes are added from „Poznámky" and „Kalendář". Afterwards the calendar
  shows today recorded.

### Calendar — „Kalendář"

- Monthly grid with Czech weekdays (Po Út St Čt Pá So Ne) and month navigation
  (for example „Říjen 2026").
- Today is highlighted subtly. Days with recorded exercise get a soft green marker.
  A marker for days with notes is postponed (it needs a custom day component).
- **Selected-date panel**: the day card has the date in small text (for example
  „12. října") and the status in bold, larger text: „Odcvičeno" (card in the same soft
  green as the calendar marker) or „Zatím bez záznamu" (neutral card).
- **Invitation to notes** (agreed 2026-11-08): this is the main place where notes are
  written, right after exercising. On an exercised day, below the day card, a calm card
  asks „Napadlo vás při cvičení něco pro terapeuta?" with a secondary button „Zapsat
  poznámky". It opens the notes panel (see „Notes") for that day. Notes written that day
  are listed in the card. No daily diary: nothing nudges the parent to write how it went.
- No „Zaznamenat cvičení" button here (changed 2026-11-08): „Kalendář" is a view of how
  the family is doing, the manual record opens from Home. The tab gets redesigned later
  (open: maybe a calm overview or „Vaše cesta"; no streaks or percentages, see section 3).

### Manual record — „Zaznamenat cvičení"

Agreed with the user on 2026-11-08, built on 2026-11-09 (`components/RecordSheet.jsx`, look in
DESIGN.md „Record window"). A safety net for exercise done **outside the app**
(for example three days at grandma's). It has the same effect as finishing the workout in
the app, only with a choice of the day.

- **Opens only from the calendar-plus icon on Home** as a window over the screen. Today is
  preselected (or the latest free day) and the parent can change it.
- **„Hotovo" is not a way in.** After „Hotovo" the parent lands on „Kalendář" (as now),
  where today is marked as exercised (with a small animation, agreed in the code review on
  2026-11-07) and a note can be added. The finished workout is saved automatically; the
  parent doesn't confirm anything.
- **„Kalendář" has no „Zaznamenat cvičení" button** (changed 2026-11-08): the tab shows
  how the family is doing. What else it shows (maybe a calm overview or „Vaše cesta") is
  decided when the tab is redesigned.
- **The window asks only for the day** (title „Zaznamenat cvičení", hint „Vyberte den, kdy
  jste cvičili mimo aplikaci.") in the **same month calendar as „Kalendář"** (changed
  2026-11-09 from a separate 14-day grid), with the recorded days in the same soft green,
  so the parent sees at once where the gap is. Only today and the 14 days before it can be
  picked. Today is preselected while it is free. No ticking of single exercises: a
  recorded day counts as a whole exercise. Then „Uložit záznam" and „Zrušit". After saving
  the window closes and Home shows the new row at once.
- **Why a window and not a jump to „Kalendář"** (asked 2026-11-09): recording is a short
  task after which the parent stays on Home and sees the new row at once. A jump to
  another tab would leave them without a way back and turn the overview tab into a form.
- **Only today or the past**, never the future. A day that already has a record can't be
  picked again (one day = one exercise).
- **At most 14 days back** (the user suggested „a week or two"; 14 is the working value).
  It is enough for a family that exercised a little before installing the app. The ~30
  days of a series count from its **first recorded exercise**, not from the day the app
  was installed.
- **Today recorded:** the „Dnes" card turns grey with the calm line (the same as after
  „Hotovo") and the next free row of the series is filled.
- **A past day recorded:** the „Dnes" card stays ready for today; only the next free row
  of the series is filled.
- **Series rows are the order of exercises** („1. cvičení", „2. cvičení", …), not
  calendar days, so a record always fills the next free row. The order doesn't have to
  match the dates: every exercise of a series is the same.
- **Where the calendar-plus icon is:** in the „Dnes" card while today is free. Once today
  is done, it moves to the next free row of the series, so more past days can still be
  added, one after another.
- **Later:** opening the notes panel from this window (a separate task), recording several
  days in one go, and several versions of the same series' videos so the child doesn't get bored.

### Notes — „Poznámky"

Agreed with the user on 2026-11-08 (replaces the earlier „one reflection per day").

**Purpose.** Notes are the parent's own preparation for the next visit to the therapist:
questions and observations they don't want to forget („Děláme tenhle cvik správně?",
„Tenhle cvik ho nebaví", „Stěžoval si na bolest v lýtku"). When the therapist asks how it
went, the parent opens the tab and has everything written down. It is **not a diary**:
the app never asks the parent to write how the exercise went.

- **Private.** Notes are never shared with the therapist, not even in phase 2. Things
  change and the parent may no longer want to ask, so every note can be edited or deleted.
- **A note** is one short point with a date (the day it was written, set automatically)
  and an optional **label**: one exercise of the current series, or „Obecně" when it has
  none. A day can have any number of notes.
- **Tab layout:** title „Na konzultaci" (working title) and the line „Vidíte je jen vy."
  Notes are grouped under their label: „Obecně" first, then the exercises in program
  order. Each note is a row with a round checkbox („probráno", the parent ticks it off
  during or after the visit; a ticked note is crossed out), the text (at most 2 lines,
  longer text ends with „…") and the date in small text. At the bottom the primary button
  „Přidat poznámky".
- **Edit and delete:** tapping a note opens the notes panel with its full text, its label
  and „Smazat" (with a confirmation). No three-dots menu for now (maybe later).
- **The notes panel** is a bottom sheet (agreed 2026-11-08). At the top, tabs with the
  labels: „Obecně" (selected first) and the exercises of the current series. Each tab has
  its own text field, and a tab that already has text shows a small dot, so the parent can
  write several notes into several labels at once. One „Uložit" saves every filled tab
  as a separate note. The same panel opens from „Zapsat poznámky" in „Kalendář" (dated
  that day) and from „Přidat poznámky" in the tab (dated today).
- **Deleting:** in phase 1 the parent ticks off and deletes notes themselves. All notes
  are deleted when the parent switches to the next series (see section 4), and in phase 2
  when the therapist assigns the next series.
- **Empty state** (working text): „Zatím nic k probrání. Když vás při cvičení něco
  napadne, zapište si to. Na konzultaci pak na nic nezapomenete." with „Přidat poznámky".
- Notes are free text written by the parent. The app offers no symptom lists or prompts
  about the child's health (see „Not a medical tool").

### Guide — „Průvodce"

The one place where the parent reads background information. A short list of cards that
lead to:

- **Co je neurovývojová stimulace:** what the method is and how the program works.
- **Primární reflexy:** the reflex guide below.
- **Knihovna cviků:** the exercise library below.
- **Další terapie a odborníci:** general information on when and whom to ask for help.
  No tests, checklists or statements about the child (see „Not a medical tool").
- **Můj terapeut** (phase 2).

### Reflex guide — „Primární reflexy" (Průvodce reflexy)

- One continuous scrollable educational page.
- Intro „Co jsou primární reflexy?" with an illustration and „Více o primárních reflexech"
  (expanded by default), followed by a parent disclaimer.
- „Přehled témat" lists chapter cards that scroll to the matching section. Each section
  ends with a „Zpět na přehled" link.
- Placeholder chapters:
  1. Jak reflexy fungují
  2. Vývoj dítěte a pohyb
  3. Přehled jednotlivých reflexů
  4. Časté otázky rodičů
- Content is placeholder until it is reviewed by an expert.

### Exercise library — „Cviky" / „Knihovna cviků"

- „Prohlédni si cviky a seznam se s tím, jak se provádějí."
- Grid of cards in a photo-gallery style, about 3 per row, showing only the thumbnail and
  the name.
- Placeholder exercises: Houpání v klubíčku, Pomalé převalování, Pohyb do stran,
  Klidné natažení, Kočičí protažení, Hnízdečko v lehu.
- **Detail:** large video preview, title, short description, a „Jak na to" section with
  room for instructions and safety notes, and a back link „Zpět do knihovny".

### My therapist — „Můj terapeut" (phase 2)

Contact for the family's therapist: name, address and phone (tap to call).

Before the app is linked to a therapist, the parent must confirm consent to share their
exercise records with the therapist. Without this consent the app is not linked. Notes
are never shared (see „Notes").

When the therapist ends the therapy, the plan disappears from the app and the parent sees
a short message: „Program máte odcvičený. Další postup proberte se svým terapeutem."

### More menu — „Více"

Opens from the three-dots icon in the tab header. It is a plain screen with a list of
links, without the tab bar. More items may be added later.

- **Připomínky:** a toggle „Připomínat cvičení" and a time picker „Čas upozornění"
  (default 18:00), with „Vyber si čas, který vám doma vyhovuje." The time picker is
  inactive when reminders are off.
- **Nastavení:** in phase 1 it is almost empty. In phase 2 it holds **Můj účet**: the
  signed-in e-mail, „Údaje účtu", „Změna hesla", „Odhlásit se".
- **O aplikaci:** „O aplikaci Hravé reflexy", „Zásady ochrany osobních údajů",
  „Podmínky používání".

## 6. Data model (derived)

In phase 1 everything is stored locally on the device with AsyncStorage, behind the
`storage/records.js` module. So far it saves only the list of days with exercise
(`'yyyy-MM-dd'` strings), written when the „Hotovo" screen opens. The full exercise record
below (series, day, exercise, status) replaces it when the manual record is built.

- **Settings:** reminder enabled and reminder time.
- **Account (family)** (phase 2): e-mail and password. Settings and records sync to it.
- **Child profile** (phase 2): nickname and avatar picture only. Exercise
  records and program progress belong to a profile.
- **Program:** series in a fixed order. Each series has a set of exercises (usually 4)
  and a guide length of about 30 days.
- **Current series:** which series the parent has chosen and the date they started it.
- **Exercise:** id, name, short description, video (a bundled asset in phase 1 and a URL in
  phase 2), instructions for the parent,
  „Na co si dát pozor" (safety notes), and duration.
- **Exercise record:** date (can be in the past), series, exercise, and status
  (completed or skipped).
- **Note:** id, date (the day it was written), text, label (an exercise of the current
  series, or none for „Obecně") and ticked („probráno") yes/no. A day can have several.
  All notes are deleted when the series changes.
- **Derived values:** day exercised and how many days the current series has been running.

## 7. Exercise videos

Rules for filming and preparing the real exercise videos. The files in `assets/videos/`
are placeholders from Pexels (author Ivan S) and will be replaced.

**Filming**

- **Portrait, 9:16** (phone held upright). The player fills the whole portrait screen
  (`contentFit="cover"`), so phones with a taller screen crop a little at the sides.
- The child (and the parent, if they help) is fully in frame for the whole exercise.
  Keep a little space around them, nothing important at the edges: the progress segments
  and the back arrow sit over the top of the video and the controls over the bottom.
- The same calm background, light and camera position for all exercises, so the videos
  look consistent.
- The phone stands on a tripod, not hand-held.
- One exercise per video, 20–40 s. It starts directly with the movement: no intro, logo
  or outro.
- No text in the video. The name and instructions are shown in the app.
- Record in 1080p or 4K and keep the originals outside the repository. The app only gets
  compressed copies.

**Export for the app**

- MP4, H.264, 720×1280 (portrait), 24–30 fps, no sound track. Sound is not decided yet; if voice
  instructions are added, use AAC mono at 96 kbit/s.
- Target size is about **2–3 MB per 30 s** of video.
- File names in English, lowercase, kebab-case, named after the exercise
  (`starfish.mp4`).
- ffmpeg command used for the placeholders:

  ```bash
  ffmpeg -i original.mp4 -an -vf scale=720:1280 -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart starfish.mp4
  ```

**App size**

- Keep all bundled videos together **under about 100 MB**. App stores get stricter above
  about 200 MB for the whole download.
- Estimate: 30 different exercises × 2.5 MB ≈ 75 MB.
- If the total grows past 100 MB, don't lower the quality further. Load the videos from the
  backend instead (planned for phase 2).
- Videos make the git repository grow. Commit only the final compressed files, never the
  originals.

## 8. Open questions and known inconsistencies

- **Colors are not final.** See [DESIGN.md](DESIGN.md).
- Exercise detail, reflex guide chapters and „Na co si dát pozor" contain placeholder or
  garbage text in Stitch. The guide shows 4 chapters in the overview but 5 in the body.
- Stitch has several duplicate variants of the player and rest screens (the rest screen
  is not built: the breaks are in the videos). One screen,
  „Cvičení a deník reflexů", is just a copy of the welcome screen.
- Some Stitch screens have leftover English or unaccented labels („Auth Login",
  „Exercise Calendar", „Zaznam Cviceni").
- „Vaše cesta" (all series, and the step to the next series) is still to design. The
  separate series detail screen was dropped.
- Colors on Home: green means „today" there, while in „Kalendář" the same soft green
  means „exercised". Chosen on purpose; revisit if parents find it confusing.
- Bundled videos increase the app size. See the limits in section 7 and check them once
  the real videos exist.
- Sound in exercise videos (none, music or voice instructions) is not decided.
- Notes (concept agreed 2026-11-08, see „Notes"): the exercise names for the labels are
  placeholders until the real program exists; the final tab title („Na konzultaci"?) and
  texts; a marker for days with notes in the month grid (needs a custom day component);
  maybe a three-dots menu on a note later.
- **Next tasks** (agreed 2026-11-07, each one on its own):
  - **Lock today after „Hotovo".** Once today is exercised, Home shouldn't offer
    „Cvičíme dnes" again. Open: a calm message instead of the button (suggested, for
    example „Dnes máte odcvičeno. Další cvičení vás čeká zítra.") or a disabled button;
    whether single videos in the exercise library stay playable; an unfinished workout
    (back arrow in the player) doesn't lock the day.
  - **No way back to the welcome screen.** `app/index.jsx` pushes `/home`, so the welcome
    screen stays at the bottom of the history and Android's back button returns to it.
    Leave it with `dismissTo` or `replace`, like „Hotovo" does.
  - **Build the new Home** from the design in section 5 and [DESIGN.md](DESIGN.md).
- **Avatar from a photo (idea, phase 2).** It would be nice if the parent could also take a
  photo for the profile instead of picking an animal. Open: this goes against the „No data
  about children" rule in section 1 (no photo). If it is ever allowed, it needs a decision
  on whose photo it is, keeping it only on the device (never uploaded) and the parent's
  consent.
- Phase 2: backend, auth provider, video hosting, and what gamification will look like. It has to fit the
  calm tone of the app.
