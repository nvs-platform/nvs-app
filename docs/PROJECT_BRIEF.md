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

| Phase                           | Scope                                                                                                                                                                                                                                                                                                                              |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1 — Basic version (current)** | Core app on the device: Home / Today, exercise player (rest, completion), program progress, calendar and manual records, notes, exercise library, reflex guide, settings (reminders). Data is stored **locally on the device**. Exercise **videos are bundled in the app**. There is **no backend, no login and no gamification**. |
| **2 — Later**                   | **Backend and accounts:** sign-in, registration, password reset and data sync. **Videos are served from the backend.** **Child profiles:** one parent, several children, switched via the avatar. **Gamification:** motivating elements for the family; the form is not designed yet. Other extensions as decided.                 |

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

- **Program = 12 series.** Each **series = 7 days**. Each **day = 4 exercises**, with a
  short rest period between exercises.
- The program starts with **Series 1**. A new series unlocks only after all required
  exercises in the previous series have been recorded as completed.
- Upcoming days stay **accessible** and must not look disabled.
- A day counts as **completed only when all 4 exercises were completed or explicitly
  skipped**. If the parent leaves mid-session, the day is not completed.
- The app does **not** automatically move to the next day or series.
- The 7-day structure must not imply that the family has to exercise every calendar day.
  The **calendar records actual exercise dates**, not a required schedule.
- Parents can **record exercise manually**, including for a **past date**. Today is
  preselected. Only the exercises the parent confirms are recorded.
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

- Header with the avatar on the left. The avatar is for switching between child profiles;
  in phase 1 it is only a placeholder. See „Navigation and headers" in [DESIGN.md](DESIGN.md).
- Heading „Dnes" with a short warm sentence (for example „3. den z cyklu").
- Prominent primary button **„Cvičíme dnes"** with a play icon. This is the main action.
- The „Dnes" card holds only the heading, the day („3. den z cyklu") and „Cvičíme dnes".
  There is no manual-record shortcut on Home: manual records live in „Kalendář". It's
  easier to add a shortcut later if parents look for it than to take one away.
- One icon never has two meanings across the app: the pencil means notes, the plus means
  "add something".
- A list of **7 day cards** („1. den" … „7. den"). Each card has a thumbnail, the day label
  and a status. There are three visual states:
  - completed: soft green, no checkmark
  - current day: warm cream or apricot accent
  - upcoming: neutral beige, still readable
- **Menu:** a **bottom tab bar** with 5 tabs: **Domů · Kalendář · Poznámky · Průvodce ·
  Profil**. The exercise library is not a tab; it opens from „Průvodce". The tab bar is for
  switching screens only; actions like „Cvičíme dnes" stay on the screen.
- **Settings are not a tab.** A three-dots icon on the right of the header (shared by all tabs) opens the
  „Více" menu (see below). On the left of the header is a heart icon.
- The welcome screen and the exercise player do not show the tab bar.

### Series detail (concept)

„Série 1" with „Přehled cvičení na 7 dní". Lists 7 day cards, each with „4 cviky" or four
small indicators, and a „Cvičit" button for the available day. A compact note says this is
one of 12 series. There is no big progress dashboard.

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
- A subtle hint about what comes next, for example „Následuje: Chvilka odpočinku (20 s)".
- **Info panel** („Poznámka pro rodiče" / „Instrukce pro rodiče", „Na co si dát pozor")
  opens over the video and has a „Zpět k videu" action. Opening it or pausing must
  **not reset the video position**.
- **Rest state** „Chvilka odpočinku": large calm countdown (for example 00:20), a breathing
  cue, „Odpočiňte si, než budete pokračovat.", „Pokračovat", „Přeskočit odpočinek".
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
  Days with a note get a tiny pencil icon.
- **Selected-date panel**: two separate cards. The day card has the date in small text
  (for example „12. října") and the status in bold, larger text: „Odcvičeno" (card in the
  same soft green as the calendar marker) or „Zatím bez záznamu" (neutral card). Below it,
  if the day has one, the note card (full text, pencil, tap to edit).
- „+ Přidat poznámku" button, only on exercised days without a note: a note belongs to an
  exercise.
- „Zaznamenat cvičení" button (secondary style) that opens the manual record. This is the
  only way into it.

### Manual record — „Zaznamenat cvičení"

„Cvičili jste mimo aplikaci? Záznam můžeš doplnit i zpětně." The form has:

- a date picker „Kdy jste cvičili?" with the options Dnes, Včera, recent days and
  „Vybrat v kalendáři"
- rows Cvik 1–4, each with a control to mark the exercise as done
- „Uložit záznam" and „Zrušit"

### Notes — „Poznámky"

Notes are written after the exercise, as a calm reflection of how it went (not a plan of
what to watch). Intro: „Jak se dnes cvičilo? Zapište si, co se povedlo, co bylo těžší nebo
co vás potěšilo." Notes are cards with a date, a short preview and an edit action. There
is at most one note per day; adding a note for a day that already has one opens the
existing note for editing. There is a „+ Přidat poznámku" button and an empty state:
„Zatím tu nemáte žádné poznámky. Po cvičení si sem můžete zapsat, jak to šlo."

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
exercise records with the therapist. Without this consent the app is not linked.

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
- **Program:** 12 series. Each series has 7 days and each day has 4 exercises.
- **Exercise:** id, name, short description, video (a bundled asset in phase 1 and a URL in
  phase 2), instructions for the parent,
  „Na co si dát pozor" (safety notes), and duration.
- **Exercise record:** date (can be in the past), series, day, exercise, and status
  (completed or skipped).
- **Note:** date and text.
- **Derived values:** day completed, series unlocked, and the current day.

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
- Stitch has several duplicate variants of the player and rest screens. One screen,
  „Cvičení a deník reflexů", is just a copy of the welcome screen.
- Some Stitch screens have leftover English or unaccented labels („Auth Login",
  „Exercise Calendar", „Zaznam Cviceni").
- Home vs. Series detail: the series detail was a concept. It is not decided whether it
  replaces the 7-day list on Home.
- Bundled videos increase the app size. See the limits in section 7 and check them once
  the real videos exist.
- Sound in exercise videos (none, music or voice instructions) is not decided.
- Notes: should the „Přidat poznámku" button on the „Poznámky" tab stay? Notes belong to an
  exercise and can be added (also backdated) from „Kalendář", and the tab button currently
  allows a note for today even without an exercise. The pencil marker in the month grid is
  postponed (it needs a custom day component).
- Phase 2: backend, auth provider, video hosting, and what gamification will look like. It has to fit the
  calm tone of the app.
