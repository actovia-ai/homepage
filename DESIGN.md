---
name: Actovia (marketing site)
description: A working document of the product — a run being made, in a calm technical register.
colors:
  paper: "#f5f5f3"
  panel: "#fbfbfa"
  sunk: "#ececea"
  ink: "#141413"
  graphite: "#5f5f5b"
  hairline: "#dcdcd8"
  coal: "#141413"
  term: "#0f0f0e"
  term-2: "#1b1b1a"
  term-ink: "#ededeb"
  term-dim: "#8f8f8a"
  sun: "#ffc928"
  sun-deep: "#f5a300"
  go: "#1f9d6b"
  paper-dark: "#0e0e0d"
  panel-dark: "#161615"
  sunk-dark: "#1c1c1b"
  ink-dark: "#efefec"
  graphite-dark: "#a3a39e"
  hairline-dark: "#2c2c2a"
  term-dark: "#050505"
  go-dark: "#3fc48f"
typography:
  display:
    fontFamily: "Sofia Sans Extra Condensed, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 6.4vw, 5.75rem)"
    fontWeight: 200
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Sofia Sans Extra Condensed, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 5vw, 4.25rem)"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Sofia Sans Extra Condensed, Arial Narrow, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 3.6vw, 3.25rem)"
    fontWeight: 300
    lineHeight: 1
  tile:
    fontFamily: "Sofia Sans, -apple-system, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.8vw, 1.625rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "Sofia Sans, -apple-system, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.3vw, 1.1875rem)"
    fontWeight: 300
    lineHeight: 1.6
  body:
    fontFamily: "Sofia Sans, -apple-system, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  code:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
  wordmark:
    fontFamily: "Fredoka, ui-rounded, SF Pro Rounded, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 600
    lineHeight: 1
rounded:
  tag: "2px"
  button: "3px"
  control: "4px"
  terminal: "6px"
  window: "8px"
  card: "10px"
  full: "9999px"
spacing:
  gutter-sm: "20px"
  gutter: "32px"
  cell: "48px"
  section: "144px"
  container: "1328px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.button}"
    padding: "14px 24px"
    typography: "{typography.body}"
  button-primary-nav:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.button}"
    padding: "8px 16px"
  button-source:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "6px 14px"
  step-pill:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "8px 14px"
  step-pill-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "8px 14px"
  tag:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.coal}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "0.45em 0.6em"
  terminal:
    backgroundColor: "{colors.term}"
    textColor: "{colors.term-ink}"
    typography: "{typography.code}"
    rounded: "{rounded.terminal}"
    padding: "16px"
  sheet-cell:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    padding: "{spacing.cell}"
  run-card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "20px 24px"
  chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.control}"
    padding: "4px 10px"
---

# Design System: Actovia (marketing site)

Scope: the marketing homepage, `app/(site)` and `app/_components`. The docs
under `/docs` use Fumadocs' own theme and are out of scope; nothing here
applies to them. The world was pinned by the owner (derived from
impeccable.style's design) and is recorded here as built.

## Overview

**Creative North Star: "The Working Document"**

The page is a document of the product at work, not a keynote about it. Its
proof is the mechanism itself, drawn in HTML: a run with its question, its
tool steps, its commands and the start of its answer, annotated like a
technical diagram. Everything around that proof is quiet: a pale neutral
ground, near-black ink, hairlines between regions, and one accent used the
way a reviewer uses a highlighter.

Typography carries the voice. A thin extra-condensed display face is set
large and left-aligned; light open body copy sits beside it; a monospace
appears only where the app or its CLI actually types something. Density is
generous: wide section rhythm, long measures capped in `ch`, and grids divided
by one-pixel rules rather than separated into floating cards.

The world explicitly rejects the centred-icon, centred-headline,
black-chapter Apple pastiche it replaced.

**Key Characteristics:**
- Pale neutral ground and near-black ink; one sunflower accent as a marker.
- Thin, large, left-set extra-condensed display type.
- Hairline-ruled sheets instead of card walls.
- Black terminal blocks for anything typed; black in both schemes.
- Small radii; restrained, ambient shadow only on the two "object" surfaces.
- Dark scheme mirrors the roles on a warm near-black, by token redefinition.

## Colors

A warm-neutral greyscale with a single sunflower accent and one functional green.

### Primary
- **Sunflower** (`sun`): Ody's yellow. Marker tags and callouts in the hero,
  the active step dot in the run panel, highlighted command tokens and SQL
  keywords inside terminals, the arrow in the black primary button, text
  selection.
- **Deep Sunflower** (`sun-deep`): the line and dot of callout leaders, the
  "section in view" dot in the nav, the focus outline and the caret.

### Neutral
- **Paper** (`paper`): the page ground; also the fill of chips, step icons and
  unselected pills so they read as "of the page" inside a panel.
- **Panel** (`panel`): raised surfaces — sheet cells, the run card, the run
  panel, the mobile menu.
- **Sunk** (`sunk`): recessed fills — the user's question bubble, the run
  panel's preview well, the footer, the Privacy band (at 60%).
- **Ink** (`ink`): text, and the fill of the primary button and the active pill.
- **Graphite** (`graphite`): secondary text, ledes, captions, inactive nav links.
- **Hairline** (`hairline`): every border, divider and the 1px gaps of a ruled sheet.
- **Coal** (`coal`): text on sunflower; does not change with the scheme.
- **Terminal** (`term`, `term-2`, `term-ink`, `term-dim`): the black block
  family, near-identical in both schemes (`term` drops to `#050505` in dark).

### Tertiary
- **Go Green** (`go`): status only — the "On this Mac" dot and completed-step
  checks. Lightens to `go-dark` in the dark scheme.

### Named Rules
**The Highlighter Rule.** Sunflower is a marker, never text on the light
ground: yellow on pale grey fails contrast. It appears as a fill (tag,
selection, dot, leader) with coal on it, or as text only on the black terminal.

**The One Accent Rule.** There is one accent. Green is a status signal, not a
second brand colour; nothing decorative is coloured.

**The Mirror Rule.** Dark mode redefines the same tokens under
`prefers-color-scheme: dark`; components never carry their own `dark:` colours.

## Typography

**Display Font:** Sofia Sans Extra Condensed 200/300 (with Arial Narrow)
**Body Font:** Sofia Sans 300–600 (with the system UI stack)
**Label/Mono Font:** JetBrains Mono 400/500
**Wordmark:** Fredoka 600, wordmark only

**Character:** A thin, tall, condensed display voice that reads as drafting
rather than shouting, paired with its own family's light sans so the two
agree; the mono is the product's own voice, not decoration.

### Hierarchy
- **Display** (200, clamp 3.5–5.75rem, 0.95): the hero headline only.
- **Headline** (300, clamp 2.75–4.25rem, 1): every section heading, left-set,
  capped at ~10–16ch.
- **Title** (300, clamp 2.25–3.25rem, 1): secondary display. The run panel's
  step titles go lighter still (200, clamp 3–5rem).
- **Tile** (Sofia Sans 400, clamp 1.375–1.625rem, 1.2): sheet-cell titles,
  privacy items, download step titles.
- **Lede** (300, clamp 1.0625–1.1875rem, 1.6): the paragraph under a heading,
  in graphite, 34–52ch.
- **Body** (400, 17px, 1.6): running text; cell copy drops to weight 300 in graphite.
- **Code** (JetBrains Mono, 0.8125rem, 1.7): terminal content, tool names inline.
- **Label** (JetBrains Mono 500, 0.75rem): the sunflower tag; also small mono
  captions (terminal labels, "your model · your key").

### Named Rules
**The Thin-and-Large Rule.** Display type is only ever light (200–300), large
and left-aligned with near-zero tracking; it never goes bold and never centres.

**The Mono-Means-Typed Rule.** JetBrains Mono appears only for commands, tool
names, SQL and file names — text the app or CLI really types.

**The Small Wordmark Rule.** Fredoka is used for the "Actovia" wordmark in the
nav and footer only, at wordmark size.

## Layout

One container, `max-width: 1328px`, with 20px gutters on phones and 32px from
`sm`. Sections breathe on a 112px / 144px vertical rhythm (`py-28 sm:py-36`);
feature panels use 96px / 128px. Content sits on a 12-column grid at `lg`
(6 at `md`), typically a 4–5 column text side against a 7–8 column proof side,
alternating sides with `flip`. Headings and ledes are capped in `ch`, not in
pixels.

The first viewport is two columns at `lg` — the annotated run card left, the
headline, lede, action and provider marks right — collapsing to a single
column (text first) below. Callout tags leave the card on leader lines only
at `xl`; below that they are hidden. Regions are separated by a full-width
top hairline (`border-t`), never by background colour bands, with the Privacy
band (sunk at 60%) and the sunk footer as the exceptions.

**The Ruled Sheet Rule.** A group of items is one sheet: a hairline-coloured
grid with `gap: 1px` and panel-filled cells, so the rules are the gaps.

## Elevation & Depth

Flat by default, with tonal layering doing most of the work: paper ground,
panel raised, sunk recessed. Shadows exist only on the surfaces that stand
for an object — the run card, the run panel and the window mock-ups — and
they are long, soft and pulled in by a negative spread, so they read as
ambient lift, never as a border.

### Shadow Vocabulary
- **Object lift** (`box-shadow: 0 24px 60px -28px rgb(0 0 0 / 0.28)`): the hero run card.
- **Panel lift** (`box-shadow: 0 30px 70px -50px rgb(0 0 0 / 0.35)`): the run panel.
- **Window lift** (`box-shadow: 0 20px 44px -28px rgb(0 0 0 / 0.3)`): the run-story window mock-up.
- **Menu** (`box-shadow: 0 16px 40px -20px rgb(0 0 0 / 0.35)`): the mobile nav popover.

The sticky nav is `paper` at 80% with `backdrop-blur-md` and a bottom hairline.

**The Flat Sheet Rule.** Sheets, cells, spec rows and download steps carry no
shadow; only things that depict an object (a run, a window) lift.

## Shapes

Corners are small and squared-off: 2px for tags, 3px for buttons, 4px for
pills, chips and tabs, 6px for terminals and keycaps, 8px for window mock-ups,
10px for the run card and panel. Full circles are reserved for status dots,
step icons and numbered markers, plus the one pill-shaped "Source" link. The
user's question bubble is the one asymmetric shape: 10px with a 3px
bottom-right corner. Keycaps carry a 3px bottom border as their only depth.

## Components

### Buttons
- **Shape:** squared-off (3px).
- **Primary:** ink fill, paper text, Sofia Sans 500, 14×24px in the hero
  (8×16px in the nav), with a sunflower `ArrowRight` that slides 4px on hover.
- **Hover / Active:** opacity to 90% (85% in the nav); press scales to 0.97 over 150ms.
- **Text link:** ink text with a hairline-coloured underline at 0.3em offset
  that darkens to the text colour on hover.
- **Source:** a hairline-bordered pill with the GitHub mark, panel fill on hover.

### Tags (signature)
- **Style:** sunflower fill, coal JetBrains Mono 500 at 0.75rem, 2px radius, no wrap.
- **With a leader:** a 1px deep-sunflower line and a 6px dot pointing at what
  the tag names. Used for hero callouts and in-cell annotations.

### Chips
- **Style:** paper fill, hairline border, 4px radius, graphite or ink text at
  `text-sm`. Static labels only (memory sections, tool lists).

### Run panel step pills (signature interaction)
- **Unselected:** paper fill, hairline border, ink text, a hairline dot.
- **Selected:** ink fill, paper text, a sunflower dot.
- **Behaviour:** a keyboard-reachable tablist; switching swaps the preview, the
  step's huge title and its terminal with a 360ms blur-and-rise (`panel-swap`).

### Terminal (signature)
- **Style:** `term` black in both schemes, 6px radius, a white/6% ring, an
  optional mono label row over a white/8% rule, 16px padding.
- **Content:** `$` or `›` prompts in `term-dim`; the token that matters in
  sunflower on a sunflower/15% wash (2px radius); SQL keywords in sunflower.

### Cards / Containers
- **Run card:** panel fill, hairline border, 10px radius, object lift; a title
  bar with a green status dot and mono meta, steps with circular paper icon
  wells and green checks, and an answer section under a hairline.
- **Sheet cells:** panel fill, 32px / 48px padding, no radius of their own (the
  sheet clips), tile title and light graphite body; captures bleed off the
  cell's bottom-right edge.

### Navigation
- Sticky 64px bar: Ody icon and Fredoka wordmark left; section links in
  graphite at 15px, ink when current with a deep-sunflower dot that scales in;
  then Source and the black Download button. Below `lg` the links fold into a
  `<details>` menu in a panel popover.

### Accordion (download steps)
- Numbered circle markers, tile-size titles (graphite when closed), a chevron
  that rotates 180° in 200ms, body indented to the title.

## Do's and Don'ts

### Do:
- **Do** prove a claim with a drawn piece of the product (a run, a command, a
  query, a key combination), labelled as an example where it is one.
- **Do** set every section heading in the display face at weight 300, left, capped in `ch`.
- **Do** put sunflower behind coal text, or inside a terminal; nowhere else as text.
- **Do** divide grouped items with a 1px hairline sheet rather than separate cards.
- **Do** keep terminals black in both schemes and redefine tokens, not components, for dark mode.
- **Do** ease everything with `cubic-bezier(0.23, 1, 0.32, 1)` and keep UI transitions at 150–360ms.

### Don't:
- **Don't** centre the hero or chapter headings, or build black full-bleed
  "chapter" sections in the Apple-keynote manner this page replaced.
- **Don't** set display type bold, or use the display face below title size.
- **Don't** add a second accent colour or colour anything decoratively.
- **Don't** use JetBrains Mono for decoration, kickers or labels that are not typed text.
- **Don't** use Fredoka beyond the wordmark.
- **Don't** invent numbers, testimonials, customer logos or screenshots; placeholders stay placeholders.
