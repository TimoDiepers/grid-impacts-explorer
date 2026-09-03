# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three confirmed audiences, all arriving at a single public URL, all in one sitting:

- **LCA and energy-system researchers** — peers reading or citing the study, who open the site to inspect results beyond the static journal figures.
- **Policy and grid planners** — TSO, ministry, and NGO analysts who need the scenario numbers and the trade-off they imply, not the LCA method.
- **Journalists and the general public** — non-experts arriving from a press release or a shared link, scrolling once for the story.

No login, no return visits assumed. The same page must serve the expert who wants the underlying numbers and the newcomer who has never heard of prospective LCA.

## Product Purpose

An interactive scrollytelling companion to Diepers et al., *Emerging environmental impacts of future electricity grid infrastructure* (Nature Communications, 2026): a prospective life cycle assessment of Germany's electricity grid and its expansion through 2045.

Confirmed success, all three at once:

1. Someone leaves understanding the study's core findings without reading the full paper.
2. The site drives reads of the paper itself.
3. Users explore the data themselves — scenarios, grid components, impact categories — rather than only reading a narrative.

## Positioning

The site's substance is the study's own result: as generation decarbonizes, direct emissions from electricity fall faster than the embodied emissions in grid infrastructure, so grid-related impacts rise from ~1% of electricity's climate impact in 2023 to a materially larger share by 2045 — a "decarbonization gap" created by the very expansion renewables require. No neighboring visualization can claim these numbers; they come from this peer-reviewed prospective LCA and its data files.

## Operating Context

- Single-page, scroll-driven narrative in four chapters: Electricity's Climate Impact → Grid Status Quo (2023) → Future Grid Expansion to 2045 → Impact Category Comparison.
- Read on desktop and on phones; also plausibly shown from a link in a press kit or a paper's data-availability statement.
- Static hosting (`dist/`), no backend, no accounts, no analytics assumed.
- Interactions that carry meaning: scenario switcher (business as usual, national policies implemented, 1.5 °C / 2 °C / 3 °C budget scenarios), cumulative-vs-year-specific toggle on the expansion timeline, dark/light theme toggle.

## Capabilities and Constraints

- React 19 + TypeScript, Vite, Tailwind CSS v4, Radix/shadcn-style primitives, Framer Motion, Recharts, d3-sankey. Charts are lazy-loaded; `@/*` aliases `./src/*`.
- All values are imported from `src/data` (JSON + CSV exported through `src/data/index.ts`, typed in `src/data/plotData.ts`). Figures shown in the UI must trace back to these files.
- No automated tests exist; `npm run build` and manual exercise of the flows is the current check.
- Domain terminology future work must use correctly and not smooth away: prospective LCA, impact category, climate change / GWP, cumulative vs. year-specific impacts, grid components (overhead lines, cables, transformers, substations, switchgear), materials (aluminum, copper, iron & steel, plastics, concrete), scenario names as the study labels them.
- Undecided / not established: German localization, accessibility target level, whether raw data download or methods detail should be exposed.

## Brand Commitments

- Names in use: page title "Grid Expansion Impacts"; footer identity "PLCA Grid Expansion Explorer"; repo "Grid Impacts Explorer". Not yet consolidated into one confirmed name.
- Attribution to Diepers et al. and Nature Communications appears in the hero and the footer and must remain.
- No institutional logo, funder acknowledgement, or affiliation is required — confirmed open.

## Evidence on Hand

- Real study data in `src/data/` (sankey material flows, component results, expansion timelines, all impact categories).
- Paper citation: Diepers et al., *Emerging environmental impacts of future electricity grid infrastructure*, Nature Communications (2026).
- **The DOI currently in the code — `10.1038/s41467-026-00000-0` — is a placeholder.** The paper is not yet live at that address. Future work must not present it as a working link, must not fabricate a real DOI, and must not add publication dates, volume/issue numbers, or press coverage that do not exist.
- No testimonials, user counts, funders, endorsements, or institutional claims exist. Do not invent them.

## Product Principles

1. **The numbers are the product.** Every figure on screen traces to `src/data`. Never round, relabel, or dramatize a value for visual effect.
2. **One page, two reading depths.** A newcomer must get the story from headlines and chart captions alone; an expert must be able to reach the underlying breakdown without leaving the page.
3. **The paper is the destination, not a footnote.** Paths to the publication stay visible and honest about its unpublished status.
4. **Interaction must teach.** Every control (scenario, cumulative/yearly, component) exists because switching it reveals a finding — not to demonstrate interactivity.
5. **Say what is uncertain.** This is prospective LCA over scenarios to 2045; the design must not make projections look like measurements.

## Accessibility & Inclusion

No product-specific standard was established. Baseline expectation only: content legible and operable in both themes, and meaning never carried by color alone in the charts — which serve a general-public audience alongside experts.
