// Type definition for grid status quo components
export interface GridComponent {
  name: string;
  value: number;
  color: string;
  quantity: number;
  displayQuantity: number; // The significant digits to animate (e.g., 35 for 35,000)
  quantitySuffix: string; // The trailing zeros as string (e.g., ",000" for 35,000)
  unit: string;
  icon: "cable" | "utility-pole" | "transformer" | "building" | "toggle-left";
}

// Data from sankey_data.csv - Grid status quo visualization
export const sankeyData = [
  { source: "cables", target: "grid status quo", value: 22.810845 },
  { source: "overhead lines", target: "grid status quo", value: 33.119467 },
  { source: "substations", target: "grid status quo", value: 1.190287 },
  { source: "switchgears", target: "grid status quo", value: 0.976579 },
  { source: "transformers", target: "grid status quo", value: 3.602809 },
  { source: "aluminum", target: "cables", value: 14.722362 },
  { source: "copper", target: "cables", value: 2.680742 },
  { source: "iron & steel", target: "cables", value: 0.498592 },
  { source: "other materials", target: "cables", value: 0.388332 },
  { source: "plastics", target: "cables", value: 4.520817 },
  { source: "aluminum", target: "overhead lines", value: 16.560927 },
  { source: "concrete", target: "overhead lines", value: 2.643481 },
  { source: "copper", target: "overhead lines", value: 1.367915 },
  { source: "iron & steel", target: "overhead lines", value: 11.960192 },
  { source: "other materials", target: "overhead lines", value: 0.579535 },
  { source: "plastics", target: "overhead lines", value: 0.007417 },
  { source: "concrete", target: "substations", value: 0.198398 },
  { source: "iron & steel", target: "substations", value: 0.991889 },
  { source: "SF6", target: "switchgears", value: 0.510412 },
  { source: "aluminum", target: "switchgears", value: 0.342959 },
  { source: "copper", target: "switchgears", value: 0.044025 },
  { source: "iron & steel", target: "switchgears", value: 0.042919 },
  { source: "other materials", target: "switchgears", value: 0.036265 },
  { source: "aluminum", target: "transformers", value: 0.770595 },
  { source: "copper", target: "transformers", value: 0.485718 },
  { source: "iron & steel", target: "transformers", value: 1.790604 },
  { source: "other materials", target: "transformers", value: 0.555892 },
  { source: "SF6", target: "aluminum", value: 0.001297 },
  { source: "aluminum (process emissions)", target: "aluminum", value: 4.644015 },
  { source: "clinker", target: "aluminum", value: 0.072822 },
  { source: "coal", target: "aluminum", value: 2.705392 },
  { source: "electricity", target: "aluminum", value: 15.854897 },
  { source: "heat", target: "aluminum", value: 5.498787 },
  { source: "iron & steel (process emissions)", target: "aluminum", value: 0.198324 },
  { source: "other processes", target: "aluminum", value: 0.862385 },
  { source: "transport", target: "aluminum", value: 2.558925 },
  { source: "SF6", target: "concrete", value: 0.000013 },
  { source: "aluminum (process emissions)", target: "concrete", value: 0.005191 },
  { source: "clinker", target: "concrete", value: 1.896094 },
  { source: "coal", target: "concrete", value: 0.090911 },
  { source: "electricity", target: "concrete", value: 0.296020 },
  { source: "heat", target: "concrete", value: 0.058783 },
  { source: "iron & steel (process emissions)", target: "concrete", value: 0.025931 },
  { source: "other processes", target: "concrete", value: 0.131390 },
  { source: "transport", target: "concrete", value: 0.331684 },
  { source: "SF6", target: "copper", value: 0.000222 },
  { source: "aluminum (process emissions)", target: "copper", value: 0.023653 },
  { source: "clinker", target: "copper", value: 0.153578 },
  { source: "coal", target: "copper", value: 0.201761 },
  { source: "electricity", target: "copper", value: 2.166626 },
  { source: "heat", target: "copper", value: 0.441867 },
  { source: "iron & steel (process emissions)", target: "copper", value: 0.084928 },
  { source: "other processes", target: "copper", value: 0.824657 },
  { source: "transport", target: "copper", value: 0.681107 },
  { source: "SF6", target: "iron & steel", value: 0.000061 },
  { source: "aluminum (process emissions)", target: "iron & steel", value: 0.006308 },
  { source: "clinker", target: "iron & steel", value: 0.228674 },
  { source: "coal", target: "iron & steel", value: 2.571040 },
  { source: "electricity", target: "iron & steel", value: 1.754544 },
  { source: "heat", target: "iron & steel", value: 0.407935 },
  { source: "iron & steel (process emissions)", target: "iron & steel", value: 7.932718 },
  { source: "other processes", target: "iron & steel", value: 0.836103 },
  { source: "transport", target: "iron & steel", value: 1.546813 },
  { source: "SF6", target: "other materials", value: 0.489719 },
  { source: "aluminum (process emissions)", target: "other materials", value: 0.003654 },
  { source: "clinker", target: "other materials", value: 0.026594 },
  { source: "coal", target: "other materials", value: 0.059143 },
  { source: "electricity", target: "other materials", value: 0.530170 },
  { source: "heat", target: "other materials", value: 0.265903 },
  { source: "iron & steel (process emissions)", target: "other materials", value: 0.031784 },
  { source: "other processes", target: "other materials", value: 0.412076 },
  { source: "transport", target: "other materials", value: 0.257254 },
  { source: "SF6", target: "plastics", value: 0.000056 },
  { source: "aluminum (process emissions)", target: "plastics", value: 0.006892 },
  { source: "clinker", target: "plastics", value: 0.027833 },
  { source: "coal", target: "plastics", value: 0.210877 },
  { source: "electricity", target: "plastics", value: 1.191607 },
  { source: "heat", target: "plastics", value: 0.161514 },
  { source: "iron & steel (process emissions)", target: "plastics", value: 0.068675 },
  { source: "other processes", target: "plastics", value: 2.605654 },
  { source: "transport", target: "plastics", value: 0.255126 },
];

// Grid expansion component results
export { default as expansionComponentResults } from "./expansion_component_results.json";
export { default as expansionAllImpactCategories } from "./expansion_all_impact_categories.json";
export { default as distributedComponents } from "./distributed_components.json";

// Aggregated sankey data for easier visualization
export const gridStatusQuoComponents: GridComponent[] = [
  { name: "Overhead lines", value: 33.12, color: "#1f77b4", quantity: 35000, displayQuantity: 35, quantitySuffix: ",000", unit: "km", icon: "utility-pole" },
  { name: "Cables", value: 22.81, color: "#ff7f0e", quantity: 580000, displayQuantity: 580, quantitySuffix: ",000", unit: "km", icon: "cable" },
  { name: "Transformers", value: 3.60, color: "#2ca02c", quantity: 850000, displayQuantity: 850, quantitySuffix: ",000", unit: "units", icon: "transformer" },
  { name: "Substations", value: 1.19, color: "#d62728", quantity: 8500, displayQuantity: 8, quantitySuffix: ",500", unit: "units", icon: "building" },
  { name: "Switchgears", value: 0.98, color: "#9467bd", quantity: 12000, displayQuantity: 12, quantitySuffix: ",000", unit: "units", icon: "toggle-left" },
];

export const materialContributions = [
  { name: "Aluminum", cables: 16.12, overheadLines: 18.13, transformers: 0.84, substations: 0, switchgears: 0.34 },
  { name: "Iron & Steel", cables: 0.50, overheadLines: 11.96, transformers: 1.79, substations: 0.99, switchgears: 0.04 },
  { name: "Copper", cables: 2.69, overheadLines: 1.37, transformers: 0.49, substations: 0, switchgears: 0.04 },
  { name: "Plastics", cables: 4.52, overheadLines: 0.01, transformers: 0, substations: 0, switchgears: 0 },
  { name: "Concrete", cables: 0, overheadLines: 2.64, transformers: 0, substations: 0.20, switchgears: 0 },
  { name: "SF6", cables: 0, overheadLines: 0, transformers: 0, substations: 0, switchgears: 0.51 },
  { name: "Other", cables: 0.39, overheadLines: 0.58, transformers: 0.56, substations: 0, switchgears: 0.04 },
];

// Electricity impact data for donut charts
export const electricityImpactData = {
  statusQuo: {
    year: 2023,
    totalGCO2e: 373.54,
    gridShare: 1.22,
    generation: {
      Biomass: { share: 7.7, impact: 0.77 },
      Coal: { share: 19.5, impact: 69.8 },
      Gas: { share: 17.6, impact: 22.9 },
      Hydro: { share: 3.8, impact: 0 },
      Hydrogen: { share: 0, impact: 0 },
      Nuclear: { share: 6.1, impact: 0 },
      Oil: { share: 0.6, impact: 1.59 },
      Solar: { share: 13.8, impact: 1.77 },
      Wind: { share: 30.6, impact: 1.86 },
    }
  },
  npi2045: {
    year: 2045,
    scenario: "3°C scenario",
    totalGCO2e: 70.97,
    gridShare: 5.35,
    generation: {
      Biomass: { share: 2.8, impact: 0.9 },
      Coal: { share: 0.0, impact: 0 },
      Gas: { share: 10.3, impact: 71.9 },
      Hydro: { share: 3.2, impact: 0.5 },
      Hydrogen: { share: 0.0, impact: 0 },
      Nuclear: { share: 0.0, impact: 0 },
      Oil: { share: 0.0, impact: 0 },
      Solar: { share: 36.7, impact: 10.9 },
      Wind: { share: 46.6, impact: 10.4 },
    }
  },
  pkBudg1000_2045: {
    year: 2045,
    scenario: "2°C scenario",
    totalGCO2e: 30.13,
    gridShare: 12.36,
    generation: {
      Biomass: { share: 2.1, impact: 1.3 },
      Coal: { share: 0.0, impact: 0 },
      Gas: { share: 2.0, impact: 41.6 },
      Hydro: { share: 2.7, impact: 0.9 },
      Hydrogen: { share: 0.3, impact: 0.7 },
      Nuclear: { share: 0.0, impact: 0 },
      Oil: { share: 0.0, impact: 0 },
      Solar: { share: 38.5, impact: 20.8 },
      Wind: { share: 54.0, impact: 22.3 },
    }
  },
  pkBudg650_2045: {
    year: 2045,
    scenario: "1.5°C scenario",
    totalGCO2e: 16.78,
    gridShare: 21,
    generation: {
      Biomass: { share: 2.4, impact: 1.6 },
      Coal: { share: 0.0, impact: 0 },
      Gas: { share: 0.6, impact: 15 },
      Hydro: { share: 2.3, impact: 1.2 },
      Hydrogen: { share: 1.7, impact: 4.7 },
      Nuclear: { share: 0.0, impact: 0 },
      Oil: { share: 0.0, impact: 0 },
      Solar: { share: 37.4, impact: 27.8 },
      Wind: { share: 55.3, impact: 29 },
    }
  }
};

// Expansion comparison data - relative to BAU
export const expansionComparisonData = {
  impactCategories: [
    { category: "acidification", base: -0.04, pkBudg1000: -0.05, pkBudg650: -0.05 },
    { category: "climate change", base: -0.14, pkBudg1000: -0.20, pkBudg650: -0.23 },
    { category: "ecotoxicity: freshwater", base: -0.02, pkBudg1000: -0.02, pkBudg650: -0.02 },
    { category: "energy resources", base: -0.13, pkBudg1000: -0.18, pkBudg650: -0.22 },
    { category: "eutrophication: freshwater", base: -0.09, pkBudg1000: -0.12, pkBudg650: -0.13 },
    { category: "eutrophication: marine", base: -0.08, pkBudg1000: -0.09, pkBudg650: -0.11 },
    { category: "eutrophication: terrestrial", base: -0.07, pkBudg1000: -0.09, pkBudg650: -0.11 },
    { category: "human toxicity: carcinogenic", base: 0.00, pkBudg1000: 0.00, pkBudg650: 0.00 },
    { category: "human toxicity: non-carcinogenic", base: 0.00, pkBudg1000: 0.00, pkBudg650: 0.00 },
    { category: "ionising radiation", base: -0.04, pkBudg1000: -0.05, pkBudg650: -0.02 },
    { category: "land use", base: 0.03, pkBudg1000: 0.10, pkBudg650: 0.18 },
    { category: "material resources", base: 0.01, pkBudg1000: 0.01, pkBudg650: 0.01 },
    { category: "ozone depletion", base: -0.02, pkBudg1000: -0.03, pkBudg650: -0.03 },
    { category: "particulate matter", base: -0.09, pkBudg1000: -0.11, pkBudg650: -0.12 },
    { category: "photochemical oxidant", base: -0.06, pkBudg1000: -0.08, pkBudg650: -0.10 },
    { category: "water use", base: -0.03, pkBudg1000: -0.03, pkBudg650: -0.03 },
  ]
};

// Grid expansion yearly data
export const expansionYearlyData = [
  { year: 2025, static: 3.15, npi: 3.15, pkBudg1000: 3.15, pkBudg650: 3.15 },
  { year: 2030, static: 7.88, npi: 7.70, pkBudg1000: 7.65, pkBudg650: 7.64 },
  { year: 2035, static: 7.88, npi: 6.82, pkBudg1000: 6.43, pkBudg650: 6.21 },
  { year: 2037, static: 3.15, npi: 2.45, pkBudg1000: 2.19, pkBudg650: 1.93 },
  { year: 2040, static: 4.67, npi: 3.99, pkBudg1000: 3.50, pkBudg650: 3.00 },
  { year: 2045, static: 7.78, npi: 6.28, pkBudg1000: 5.35, pkBudg650: 4.39 },
];
