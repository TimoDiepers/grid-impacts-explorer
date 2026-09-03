---
name: Grid Impacts Explorer
description: A scrollytelling explorer for the climate impacts of Germany's electricity grid — engineered, charged, precise.
colors:
  verdigris: "#0c6e56"
  verdigris-dark-mode: "#3fc9a2"
  verdigris-strong: "#0a5946"
  verdigris-surface: "rgba(12, 110, 86, 0.07)"
  verdigris-border: "rgba(12, 110, 86, 0.3)"
  page-bg-light: "#fafafa"
  page-bg-dark: "#0a0a0a"
  surface-light: "rgba(255, 255, 255, 0.7)"
  surface-dark: "rgba(20, 20, 20, 0.6)"
  surface-secondary-light: "#f0f0f0"
  surface-secondary-dark: "#1a1a1a"
  border-light: "#e5e5e5"
  border-dark: "#262626"
  ink: "#171717"
  ink-inverse: "#e5e5e5"
  ink-secondary: "#525252"
  ink-muted: "#737373"
  chart-verdigris: "#2fb894"
  chart-arc: "#2e9bd6"
  chart-arc-soft: "#6dbde6"
  chart-arc-deep: "#1f6f9e"
  chart-copper: "#dd8a3c"
  chart-copper-soft: "#ecb173"
  chart-copper-deep: "#a9631f"
  chart-filament: "#e05a6d"
  chart-filament-soft: "#ec8d99"
  chart-filament-deep: "#a83a4b"
  chart-violet: "#8a6fd8"
  chart-violet-soft: "#b3a0e8"
  chart-violet-deep: "#5b47a3"
  chart-slate: "#8a94a6"
  chart-slate-soft: "#b3bac6"
  chart-slate-deep: "#5c6675"
  warning: "#f59e0b"
  info: "#94a3b8"
  destructive: "#dc2626"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(3rem, 8vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 5vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  micro:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.2em"
  numeral:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "clamp(3rem, 9vw, 8rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.02em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section: "80px"
  section-lg: "128px"
components:
  button-primary:
    backgroundColor: "{colors.verdigris}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "8px 20px"
    height: "40px"
    typography: "{typography.title}"
  button-primary-hover:
    backgroundColor: "{colors.verdigris-strong}"
    textColor: "#ffffff"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.md}"
    padding: "8px 20px"
    height: "40px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.md}"
    padding: "8px 20px"
    height: "40px"
  card:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
  card-accent:
    backgroundColor: "{colors.verdigris-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
  badge:
    backgroundColor: "{colors.verdigris-surface}"
    textColor: "{colors.verdigris}"
    rounded: "{rounded.md}"
    padding: "2px 8px"
    typography: "{typography.label}"
  toggle-item-on:
    backgroundColor: "{colors.verdigris-surface}"
    textColor: "{colors.verdigris}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: "32px"
  toggle-item-off:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: "32px"
---

# Design System: Grid Impacts Explorer

## Overview

**Creative North Star: "The Lit Grid"**

Infrastructure rendered as something electric and alive. The page sits on a near-black (dark) or near-white (light) substrate with a 64px blueprint grid drawn across it at half-pixel weight and masked to a soft radial ellipse — the schematic that engineers actually draw the grid on, dimmed to atmosphere. A single current, **Verdigris**, runs through the whole system: the hero word, the chapter numerals, the big stat moments, the focus ring, the selection highlight, the grid lines themselves. Nothing else glows. It is the blue-green that copper conductors oxidize to — the material's own color after decades on a pylon, not a sustainability signal borrowed from the category.

The register is engineered, charged, and precise, never decorative. Every measured quantity is set in JetBrains Mono and counts up like a meter when it scrolls into view; every heading is Space Grotesk, tracked tight and set close, so the numbers and the headlines read as instruments rather than marketing. Surfaces are flat and translucent, separated by hairline borders, so the grid substrate stays faintly visible behind the content. Depth comes from tone and transparency, not from shadow.

This is a scientific instrument that has been lit, not a dashboard that has been dressed up. The design's job is to make a peer-reviewed prospective LCA legible to a journalist without making a researcher distrust it. Charts arrive plainly, captions carry the finding, and the accent appears only where the reader should look.

**Key Characteristics:**
- 64px radially masked blueprint grid as permanent, breathing atmosphere (8s pulse)
- One accent, Verdigris, on a strictly rationed budget — and the only green anywhere
- Monospace for every number, unit, chapter marker, and eyebrow — no exceptions
- Flat translucent surfaces, hairline borders, no shadow vocabulary
- Scroll reveal as narrative punctuation: content enters once, from 30–40px below, and stays
- Full-bleed typographic stat moments that break the reading container between chapters

## Colors

A monochrome neutral field carrying a single electric accent, with a separate, deliberately calmer palette reserved for data series.

### Primary
- **Verdigris** (`#0c6e56` light / `#3fc9a2` dark): The only current in the system, and the only green in it. It marks findings and wayfinding, nothing else: hero emphasis word, chapter numerals (`01`–`07`), the big stat numerals, the total-impact figure, the grid pattern itself (at 13–20% alpha), the section rule gradient, the focus ring, `::selection` at 25% alpha, and the "improvement" state that used to be a separate emerald. The two values are one token, `--accent`, swapped per theme so text clears contrast on both grounds (≈5.4:1 on `#fafafa`, ≈10.2:1 on `#0a0a0a`).

### Neutral
- **Substrate** (`#fafafa` light / `#0a0a0a` dark): The page ground. The grid pattern is drawn directly on it; it is never a card color.
- **Veiled Surface** (`rgba(255,255,255,0.7)` light / `rgba(20,20,20,0.6)` dark): Every card and panel. The translucency is load-bearing — the grid must remain faintly readable through content.
- **Recessed Surface** (`#f0f0f0` light / `#1a1a1a` dark): Inset wells, secondary chips, muted fills.
- **Hairline** (`#e5e5e5` light / `#262626` dark): All borders and dividers, always 1px, frequently at 50–60% alpha.
- **Ink** (`#171717` light / `#e5e5e5` dark): Headlines and primary figures.
- **Ink Secondary** (`#525252`): Emphasized body text inside prose.
- **Ink Muted** (`#737373`): Default body copy, captions, units, axis ticks.

### Tertiary — Data series
Six mid-lightness hues chosen to separate in both themes and to sit under, not compete with, the accent. Series colors are the one place where more than one hue is allowed on screen.

Five families of three (base / soft / deep), plus the accent standing in for the subject.

- **Chart Verdigris** (`#2fb894`): The subject only — grid infrastructure in the mix, the `grid status quo` node, the headline 1.5 °C scenario. Never a side series.
- **Arc Blue** (`#2e9bd6`): Transmission and overhead lines; wind; transport.
- **Copper** (`#dd8a3c`): Cables, copper and conductor materials, heat supply.
- **Filament Rose** (`#e05a6d`): Substations, hydrogen, process emissions, and the 3 °C worst case.
- **Violet** (`#8a6fd8`): Transformers, plastics, electricity as an upstream process. A plain categorical hue now that it no longer carries the brand.
- **Slate** (`#8a94a6`): Baseline, reference, and business-as-usual — always the quietest line on the chart.

### Status
- **Success** (`#4ade80`), **Warning** (`#f59e0b`), **Info** (`#94a3b8`), **Destructive** (`#dc2626`): reserved for state, never for data encoding.

### Named Rules

**The One Current Rule.** Verdigris marks what the reader should look at: one finding, one numeral, one control state per viewport. If two violet things compete inside a single screenful, one of them is decoration and must be neutral instead.

**The Quiet Baseline Rule.** In any scenario chart, the reference or business-as-usual series is Slate. The reader must be able to find the baseline without reading the legend.

**The One Green Rule.** Verdigris is the accent, so nothing else in the system may be green — not a success state, not a chart series, not a badge. Improvement and the subject share the accent precisely because they mean the same thing here. A second green reads as a second brand.

**The Substrate Rule.** The blueprint grid belongs to the page, never to a component. Cards, charts, and panels never draw their own grid; they let the page's grid show through their translucency.

## Typography

**Display Font:** Space Grotesk (with `system-ui, sans-serif`) — weights 400–700
**Body Font:** Inter (with `system-ui, -apple-system, sans-serif`) — weights 400–700
**Label / Numeral Font:** JetBrains Mono (with `ui-monospace, monospace`) — weights 400–600

**Character:** Space Grotesk's squared-off geometry gives the headlines an engineered edge without turning technical; Inter keeps long explanatory passages neutral and effortless; JetBrains Mono makes every measured quantity look like a reading off an instrument. All headings carry `-0.025em` tracking; the hero pushes to `-0.04em` with `0.9` line-height so the two-line title locks into a block.

### Hierarchy
- **Display** (700, `clamp(3rem, 8vw, 6rem)`, `0.9`, `-0.04em`): Hero title only. One per page.
- **Headline** (600, `clamp(1.875rem, 5vw, 3rem)`, `1.15`, `-0.025em`): Chapter titles, in Space Grotesk, preceded by a mono numeral and a hairline rule.
- **Title** (600, `1.125rem`, `1.25`, `-0.025em`): Card titles, in Inter.
- **Body** (400, `1rem`–`1.125rem`, `1.625`): All prose, in Ink Muted, capped at `max-w-2xl`/`max-w-3xl` (≈65–70ch). Key phrases inside prose lift to Ink Secondary or Verdigris at weight 500.
- **Label** (500, `0.75rem`, `0.2em` tracking, uppercase, mono): The scroll cue, chart-block labels ("Generation mix"), badges, units, axis ticks. Never a kicker above a heading.
- **Micro** (500, `0.6875rem`/11px): The smallest step in the system — inline deltas, chip meta, the scroll cue. Never used for a full sentence, and never below 11px.
- **Numeral** (700, `clamp(3rem, 9vw, 8rem)`, mono): Full-bleed stat moments and the total-impact figure. Always animated with a count-up on first view.

### Named Rules

**The Instrument Rule.** Every number a reader could quote — a value, a year, a percentage, a unit, a chapter index — is set in JetBrains Mono. Sans-serif digits inside a data context are a bug.

**The Two-Depth Rule.** A newcomer must get the whole story from display, headline, and caption alone. If a finding exists only inside body prose or only inside a chart tooltip, the hierarchy has failed.

## Layout

A single centered column that narrows for reading and breaks wide for data. Prose and headers sit in `max-w-3xl` (768px); chapters and chart blocks in `max-w-5xl` (1024px); the hero in `max-w-4xl` (896px). Horizontal padding is a constant `16px` at every breakpoint.

Vertical rhythm is chapter-scaled, not element-scaled: sections open at `96px`/`128px` top padding (`pt-24 sm:pt-32`), stat moments breathe at `96px`–`160px` (`py-24 sm:py-32 md:py-40`), chapter headers close with `40px`–`56px`, and card grids gap at `16px`–`20px`. Inside cards, padding is `20px` rising to `24px` at `sm`.

The `.full-bleed` escape (`width: 100vw; margin-left: calc(50% - 50vw)`) is the layout's one dramatic move: stat moments and section breaks leave the reading column entirely while the grid substrate keeps running underneath. Card grids collapse `1 → 2` at `md` (768px) and `→ 4/5` at `lg` (1024px) for the component row; charts always keep full column width and scroll horizontally rather than shrink below legibility. Breakpoints are Tailwind defaults: `sm` 640, `md` 768, `lg` 1024, `xl` 1280.

**The Reading Width Rule.** Body prose never exceeds `max-w-3xl`, even when its section is full-bleed. Data may span the viewport; sentences may not.

## Elevation & Depth

**This system has no shadow vocabulary.** Surfaces are flat by doctrine. Depth is built from three things instead: translucency (cards at 60–70% opacity over the substrate), hairline borders at partial alpha, and the radially masked grid, which recedes toward the page edges and makes the center feel nearer. The lone exception is the fixed theme toggle, which carries `shadow-sm` and `backdrop-blur-sm` because it floats over scrolling content and must read as detached.

Layering is tonal: Substrate → Veiled Surface (cards) → Recessed Surface (wells inside cards) → hairline border between any two of them. Tinted variants (`accent`, `success`, `warning`) are the same flat card with a 4–6% color wash and a matching border, never a raised one.

**The Flat-By-Default Rule.** A new surface earns a shadow only if it is fixed or floating above the scroll. Everything in the document flow separates with tone and a hairline.

## Shapes

One quiet radius family, applied consistently: `6px` (`rounded-md`) on interactive elements — buttons, badges, toggles, select triggers, tooltips; `8px` (`rounded-lg`) on cards, panels, wells, and inset callouts; `9999px` only on the circular theme toggle. Nothing is square, nothing is pill-shaped except that one control.

Borders are always exactly 1px and usually translucent (`/50`, `/60`) so edges read as drawn lines rather than boxes. The recurring geometry beyond the rectangle is linear: the 64px grid, the `section-rule` (a 1px gradient that fades from transparent through 35% accent and back), and the hairline that trails every chapter numeral. Icons are Lucide at 16–24px, stroked, never filled.

**The Drawn Line Rule.** Separation is a 1px line that fades at its ends, not a block of contrasting fill.

## Components

### Buttons
- **Shape:** Softly rounded (`6px`), never pill.
- **Primary:** Verdigris fill, white text, `40px` tall, `20px` horizontal padding, 14px/500 Inter.
- **Hover / Focus:** Background lightens one step over `200ms`; focus shows a 2px accent ring at 50% alpha with a 2px offset against the page ground.
- **Ghost:** The default for in-page navigation and the footer's "Read Paper" — muted ink, neutral wash on hover. This is the most-used variant on the site; primary fill is rare by design.
- **Outline / Secondary:** Hairline border or neutral fill for equal-weight alternatives.
- **Link:** Verdigris text, underline on hover with `4px` offset.
- **Sizes:** `sm` 32px / `default` 40px / `lg` 44px / `icon` 40×40.

### Badges
- **Style:** Mono, 12px/500, `6px` radius, 1px translucent border, 4–8% tinted fill in the variant's hue, `2px 8px` padding.
- **Use:** Units, scenario tags, and short metadata. Badges carry facts, never calls to action.

### Cards / Containers
- **Corner Style:** `8px`.
- **Background:** Veiled Surface (70% white / 60% near-black), so the grid stays faintly visible through it.
- **Shadow Strategy:** None. See Elevation & Depth.
- **Border:** 1px hairline; tinted variants match their wash hue at 40–60% alpha.
- **Internal Padding:** `20px`, `24px` at `sm`. Header and content share the padding scale, with content clearing the header's bottom pad (`pt-0`).
- **Variants:** `default`, `accent` (accent wash — reserved for the section's key figure), `success` (the same wash; improvement is the accent), `warning`.

### Toggles / Segmented controls
- **Style:** Transparent track, `6px` items, `32px` tall, `12px` horizontal padding, gap `4px`.
- **State:** Off is Ink Muted on transparent. On is an accent wash with accent text. The selected state is the only place a control carries the accent.
- **Use:** Scenario switching and the cumulative/year-specific toggle — both change what the data means, which is why they get the accent.

### Navigation
There is no persistent nav. Wayfinding is the scroll itself: numbered chapter headers, the animated scroll cue in the hero, and a single ghost "Back to Top" at the end. The only fixed chrome is the circular theme toggle at `top-4 right-4`, `40px`, hairline border, translucent fill, backdrop blur.

### Signature: Chart Frame
Every chart is a lazily loaded chunk, so every chart sits in a frame that reserves its height. While the chunk is in flight the frame shows a dashed-border panel with a travelling accent bar and `Loading <chart name>` in mono (`role="status"`, `aria-live="polite"`). If the chunk never arrives the same panel states what failed, that the rest of the page is unaffected, and that the figures are in the paper — with a reload button. Recovery is a reload rather than an in-place retry because `React.lazy` caches a rejected import for the module's lifetime; a reload also picks up fresh asset hashes, which is the real fix after a redeploy. A chart failure never escapes its own card.

### Signature: Conductor Rail
A transmission line down the left margin (`xl` and up, `left-8`, `58vh`, 1px) that energizes with reading position: a Verdigris fill grows from the top, and one 6px diamond node marks each chapter — filled once passed, hollow on the page ground while ahead, `1.5×` at the current chapter. Hovering or focusing a node reveals its number and title on a hairline chip; clicking jumps to that chapter (`scroll-mt-24` on the anchor). The rail is dormant over the hero and fades in as the first chapter arrives, so the page is literally energized by being read. Below `xl` there is no clear margin, so the same value reads as a 1px hairline across the top of the viewport, `aria-hidden` because the vertical rail is the accessible one (`<nav aria-label="Chapters">` with per-chapter buttons and `aria-current`). Chapter anchors come from `ChapterHeader`, which carries `data-chapter` and `data-chapter-title` — the rail has no second list to keep in sync.

### Signature: Chapter Header
A mono chapter numeral (`01`, zero-padded, accent at 70% alpha, `0.05em` tracking) followed by a `section-rule` hairline that fills the remaining width, then a Space Grotesk headline and a muted subtitle capped at `max-w-2xl`. The whole block staggers in at `0.08s` per child on first view. This is the system's structural signature — every new section uses it, and the numeral is never skipped or reordered.

### Signature: Stat Moment
A full-bleed block, `96–160px` of vertical air, holding one mono numeral at `clamp(3rem, 9vw, 8rem)` in the accent with a `max-w-xl` caption beneath. Enters with `opacity 0 → 1` and `scale 0.92 → 1` over `1s`. Used to punctuate between chapters, never inside one, and never more than one figure per moment.

### Signature: Metric Card
Icon in a `10px`-padded recessed tile tinted with the series color, the component name in muted 12–14px, then a count-up mono numeral at 20–24px in that same series color, then the unit at 10–12px in the faintest ink. Count-up runs once, on entry, over `1s`.

### Signature: Findings Row
The closing three findings sit in equal-height panels on the standard card surface (`8px` radius, 1px hairline, Veiled Surface), three across at `md` and stacked below it. Each holds a Space Grotesk statement (`1.25`–`1.5rem`) over one muted sentence — no icon, no eyebrow, no badge. They are the terminal payoff of the scroll, so they take the card surface rather than the fainter takeaway wash, which disappears at this size.

### Signature: Section Takeaway
A recessed, hairline-bordered `8px` panel closing each chapter: an accent arrow rotated `-90°`, then one 14–16px sentence stating the finding in plain language. Every chapter ends with exactly one.

### Motion
One easing curve carries the site: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`. Sections reveal on `useInView({ once: true })` with a `-60/-80px` margin, from `y: 30–40px`, over `0.6–0.8s`, staggering children at `0.08s`. Color and theme transitions run `200–300ms`. Three ambient loops persist: the hero grid breathes (`8s`), the scroll cue pulses (`2s`), and the grid-share pie segment pulses (`2.4s`). The hero parallaxes to `y: 120px` and fades out across its own scroll range. On viewports under `768px`, ambient loops slow to `4s` and sections take `contain: layout style paint`.

**The Earned Response Rule.** Motion answers something the reader did or something the data says. The rail charges because the reader descended; the numerals count because a value arrived. Nothing on this page congratulates an ordinary click.

**The Arrive-Once Rule.** Reveals fire once (`once: true`) and never replay on scroll-back. Nothing in the document flow animates on a loop; only the three named ambient elements do.

## Do's and Don'ts

### Do:
- **Do** set every quotable number in JetBrains Mono, and animate the headline figures with a one-second count-up on first view.
- **Do** end every chapter with exactly one Section Takeaway stating the finding in a single plain sentence.
- **Do** keep Verdigris to one subject per viewport: a finding, a numeral, or an active control state.
- **Do** let the substrate grid show through surfaces — cards stay at 60–70% opacity.
- **Do** use `.full-bleed` for stat moments and section breaks, while keeping prose inside `max-w-3xl`.
- **Do** give charts a Slate baseline series and label meaning in text as well as color.
- **Do** let the reader's position be legible on a page this long — the conductor rail is wayfinding first and atmosphere second.
- **Do** reach for the ghost button first; a filled accent button is a rare event on this page.

### Don't:
- **Don't** add shadows to in-flow surfaces. Depth is tone, translucency, and a 1px line.
- **Don't** introduce a second accent hue. Additional color enters only as a data series, from the six documented chart colors.
- **Don't** write a literal color into a chart file. Every series color comes from `src/lib/palette.ts` (`gridComponentColors`, `scenarioColors`, `generationColors`, `materialColors`, `processColors`); a new series earns a named entry there, not a hex at the call site.
- **Don't** write a Tailwind color utility for the accent. It lives in `--accent` and reaches components as `text-accent`, `bg-accent-surface`, `border-accent-border`, `ring-accent`; those swap per theme, a `green-600` class does not.
- **Don't** introduce a second green anywhere — including a "success" or "positive" state. See The One Green Rule.
- **Don't** add a component variant that renders identically to one that exists. The dead aliases (`button.gradient`, `card.gradient`, `card.glass`, and ten of the twelve `ToggleGroup` accents) have been removed; `ToggleGroup` now has exactly two accents, `accent` and `neutral`.
- **Don't** set type below 11px, and don't invent a step between `micro` (11px) and `label` (12px).
- **Don't** put a kicker or eyebrow above a heading. The heading carries its own weight; if the label holds real information, it belongs in the subhead.
- **Don't** put a decorative icon above a card's heading. A row of icon + heading + paragraph cards is the category's default page scaffold; if a container is warranted, the type carries it alone — see Signature: Findings Row.
- **Don't** encode meaning in color alone — these charts are read by a general-public audience alongside experts.
- **Don't** loop an animation on anything in the document flow, and don't replay reveals on scroll-back. Under `prefers-reduced-motion` the three ambient loops stop entirely and Motion is bound by `MotionConfig reducedMotion="user"`.
- **Don't** render a lazily loaded chart without a Chart Frame. An unframed chunk reflows the page while it loads and takes the whole document down when it fails.
- **Don't** touch `localStorage` outside a `try`/`catch`. Blocked site data must cost the reader a stored preference, never the page.
- **Don't** let a chart shrink below legibility on mobile; scroll it horizontally instead.
- **Don't** dramatize a value for visual effect. Every figure traces to `src/data`.
