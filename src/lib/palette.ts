/**
 * Chart palette — the single source of truth for every data-series color.
 *
 * See DESIGN.md ("Colors → Tertiary / Data series"). Five data hue families, each
 * with a softer and a deeper step, all held near mid-lightness so a series keeps
 * its identity on both the near-white and the near-black substrate.
 *
 * Rules that live here rather than in a comment somewhere else:
 * - Verdigris is the accent. In data it marks the subject only: grid
 *   infrastructure, the grid node, the headline scenario. Never a side series.
 * - Slate is always the baseline / business-as-usual series.
 * - Nothing else in the app may be green; a second green would read as a second
 *   accent.
 */

export const chartPalette = {
  /** The accent, and the subject series. Held at a mid value that reads on both grounds. */
  verdigris: "#2fb894",

  arc: "#2e9bd6",
  arcSoft: "#6dbde6",
  arcDeep: "#1f6f9e",

  copper: "#dd8a3c",
  copperSoft: "#ecb173",
  copperDeep: "#a9631f",

  filament: "#e05a6d",
  filamentSoft: "#ec8d99",
  filamentDeep: "#a83a4b",

  violet: "#8a6fd8",
  violetSoft: "#b3a0e8",
  violetDeep: "#5b47a3",

  slate: "#8a94a6",
  slateSoft: "#b3bac6",
  slateDeep: "#5c6675",
} as const;

/** Grid components — the metric cards, the breakdown bars, the Sankey's right column. */
export const gridComponentColors: Record<string, string> = {
  "Overhead lines": chartPalette.arc,
  Cables: chartPalette.copper,
  Transformers: chartPalette.violet,
  Substations: chartPalette.filament,
  Switchgears: chartPalette.slate,
};

/** Expansion scenarios — Static (BAU) stays the quietest line; 1.5 °C is the subject. */
export const scenarioColors = {
  static: chartPalette.slate,
  npi: chartPalette.filament,
  pkBudg1000: chartPalette.arc,
  pkBudg650: chartPalette.verdigris,
} as const;

/** The same three scenarios keyed the way the contribution charts name them. */
export const scenarioSeriesColors = {
  BAU: chartPalette.slate,
  scen3: chartPalette.filament,
  scen2: chartPalette.arc,
  scen15: chartPalette.verdigris,
} as const;

/** Electricity generation mix — grid infrastructure is the subject, so it takes the accent. */
export const generationColors: Record<string, string> = {
  Coal: chartPalette.slateDeep,
  Gas: chartPalette.copperDeep,
  Oil: chartPalette.filamentDeep,
  Wind: chartPalette.arc,
  Solar: chartPalette.copperSoft,
  Biomass: chartPalette.violetSoft,
  Nuclear: chartPalette.filamentSoft,
  Hydro: chartPalette.arcSoft,
  Hydrogen: chartPalette.filament,
  Other: chartPalette.slateSoft,
  "Grid infrastructure": chartPalette.verdigris,
};

/**
 * Materials and upstream processes — the Sankey's middle and left columns.
 * Each column is internally unique, and no column shares a color with the column
 * it links to; a color may repeat two columns apart, where no link connects them.
 */
export const materialColors: Record<string, string> = {
  aluminum: chartPalette.slateSoft,
  copper: chartPalette.copperDeep,
  "iron & steel": chartPalette.arcDeep,
  plastics: chartPalette.violetDeep,
  concrete: chartPalette.slateDeep,
  SF6: chartPalette.filamentSoft,
  "other materials": chartPalette.copperSoft,
};

export const processColors: Record<string, string> = {
  electricity: chartPalette.violet,
  heat: chartPalette.copper,
  transport: chartPalette.arcSoft,
  coal: chartPalette.slate,
  clinker: chartPalette.arc,
  "aluminum (process emissions)": chartPalette.filament,
  "iron & steel (process emissions)": chartPalette.filamentDeep,
  "other processes": chartPalette.violetSoft,
};

/** Fallback for any series the maps above do not name. */
export const seriesFallback = chartPalette.slate;
