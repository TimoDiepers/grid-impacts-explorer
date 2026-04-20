import { useRef, useState, lazy } from "react";
import { useTheme } from "@/hooks/useTheme";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { electricityImpactData, gridStatusQuoComponents, expansionYearlyData, expansionComparisonData } from "@/data";
import { CountUp } from "@/components/CountUp";

// Lazy load chart components to improve initial page load
const GridStatusQuoChart = lazy(() => import("@/components/charts/GridStatusQuoChart").then(m => ({ default: m.GridStatusQuoChart })));
const MaterialContributionChart = lazy(() => import("@/components/charts/MaterialContributionChart").then(m => ({ default: m.MaterialContributionChart })));
const ExpansionTimelineChart = lazy(() => import("@/components/charts/ExpansionTimelineChart").then(m => ({ default: m.ExpansionTimelineChart })));
const ImpactCategoryComparisonChart = lazy(() => import("@/components/charts/ImpactCategoryComparisonChart").then(m => ({ default: m.ImpactCategoryComparisonChart })));
const ElectricityDonutChart = lazy(() => import("@/components/charts/ElectricityDonutChart").then(m => ({ default: m.ElectricityDonutChart })));
const SankeyVisualization = lazy(() => import("@/components/charts/SankeyVisualization").then(m => ({ default: m.SankeyVisualization })));
import {
  Zap,
  TrendingUp,
  TrendingDown,
  Layers,
  BarChart3,
  ChartBar,
  ChevronDown,
  ArrowDown,
  ExternalLink,
  Cable,
  Sigma,
  ArrowDownToDot,
  UtilityPole,
  Unplug,
  Building2,
  ToggleLeft,
  Sun,
  Moon,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { GridComponent } from "@/data";

// ─── Shared animation variants ───────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ─── Helper ──────────────────────────────────────────────────────────────────

const getComponentIcon = (icon: GridComponent["icon"]) => {
  const iconMap = {
    "utility-pole": UtilityPole,
    cable: Cable,
    transformer: Unplug,
    building: Building2,
    "toggle-left": ToggleLeft,
  };
  return iconMap[icon];
};

// ─── Reusable section wrapper with scroll-triggered reveal ───────────────────

function RevealSection({
  children,
  className = "",
  id,
  fullBleed = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullBleed?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }}
      className={`${fullBleed ? "full-bleed" : ""} ${className}`}
    >
      {children}
    </motion.section>
  );
}

// ─── Chapter-style section header ────────────────────────────────────────────

function ChapterHeader({
  step,
  title,
  subtitle,
}: {
  step: number;
  title: string;
  subtitle: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="mb-10 sm:mb-14"
    >
      <motion.div variants={fadeUp} className="flex items-center gap-4 mb-5">
        <span className="font-mono text-violet-600/70 dark:text-violet-400/70 text-sm tracking-wider">
          {String(step).padStart(2, "0")}
        </span>
        <div className="section-rule flex-1" />
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-neutral-100 tracking-tight mb-4 leading-tight"
      >
        {title}
      </motion.h2>
      <motion.p variants={fadeUp} className="text-neutral-500 text-base sm:text-lg max-w-2xl leading-relaxed">
        {subtitle}
      </motion.p>
    </motion.div>
  );
}

// ─── Section takeaway ────────────────────────────────────────────────────────

function SectionTakeaway({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mt-8 sm:mt-10 p-4 sm:p-5 rounded-lg border border-neutral-200/60 bg-neutral-100/30 dark:border-neutral-800/60 dark:bg-neutral-900/30"
    >
      <div className="flex gap-3 items-start">
        <ArrowDown className="h-4 w-4 text-violet-600/70 dark:text-violet-400/70 mt-0.5 flex-shrink-0 rotate-[-90deg]" />
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {children}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Grid component card ─────────────────────────────────────────────────────

function GridComponentCard({
  component,
  index,
}: {
  component: GridComponent;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(cardRef, { once: true, margin: "0px 0px -10% 0px" });
  const IconComponent = getComponentIcon(component.icon);

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      transition={{ delay: index * 0.06 }}
    >
      <Card>
        <CardContent className="pt-5 pb-4 px-3 sm:px-4">
          <div className="flex flex-col items-center text-center">
            <div
              className="p-2.5 rounded-lg mb-3 bg-neutral-100 dark:bg-neutral-800/80"
              style={{ color: component.color }}
            >
              <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 mb-1">
              {component.name}
            </div>
            <CountUp
              target={component.displayQuantity}
              start={isInView}
              duration={1}
              suffix={component.quantitySuffix}
              className="text-xl sm:text-2xl font-semibold font-mono"
              style={{ color: component.color }}
            />
            <div className="text-[10px] sm:text-xs text-neutral-400 dark:text-neutral-600">
              {component.unit}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Total impact card ───────────────────────────────────────────────────────

function TotalImpactCard({ totalGridImpact }: { totalGridImpact: number }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(cardRef, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <Card ref={cardRef} className="lg:col-span-2 w-full min-w-0">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 mb-2">
          <Sigma className="h-5 w-5" />
          <CardTitle>Total Impact (2023)</CardTitle>
        </div>
        <CardDescription>
          Combined climate impact of all grid components
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CountUp
          target={totalGridImpact}
          start={isInView}
          duration={1}
          decimals={2}
          className="text-4xl sm:text-5xl font-semibold font-mono text-violet-600 dark:text-violet-400 mb-2 block"
        />
        <div className="text-sm text-neutral-500 mb-4">
          Megatonnes of CO₂ equivalent
        </div>
        <div className="p-3 bg-violet-50/50 dark:bg-violet-950/20 rounded-lg border border-violet-200/50 dark:border-violet-900/30">
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            ≈ <strong className="text-violet-600 dark:text-violet-400">{(electricityImpactData.statusQuo.totalGCO2e * electricityImpactData.statusQuo.gridShare / 100).toFixed(1)} g CO₂-eq/kWh</strong>{" "}
            contribution to Germany's electricity carbon footprint
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Full-viewport typographic moment ────────────────────────────────────────

function BigStatMoment({
  children,
  caption,
}: {
  children: React.ReactNode;
  caption: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div
      ref={ref}
      className="full-bleed flex flex-col items-center justify-center py-24 sm:py-32 md:py-40 px-4 relative"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center"
      >
        <div className="font-mono text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-violet-600 dark:text-violet-400 mb-6 flex items-center justify-center gap-4 sm:gap-6">
          {children}
        </div>
        <p className="text-neutral-500 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          {caption}
        </p>
      </motion.div>
    </div>
  );
}

// ─── Scroll indicator ────────────────────────────────────────────────────────

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-neutral-400 dark:text-neutral-600 text-[10px] uppercase tracking-[0.2em] font-mono">
        Scroll
      </span>
      <ArrowDown className="h-4 w-4 text-neutral-400 dark:text-neutral-600 scroll-indicator" />
    </motion.div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// APP
// ═════════════════════════════════════════════════════════════════════════════

function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-2.5 rounded-full border border-neutral-200 bg-white/80 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-400 dark:hover:bg-neutral-800 backdrop-blur-sm transition-colors duration-200 shadow-sm"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}

function App() {
  const totalGridImpact = gridStatusQuoComponents.reduce(
    (sum, c) => sum + c.value,
    0
  );
  const gridGrowthRef = useRef<HTMLDivElement | null>(null);
  const gridGrowthInView = useInView(gridGrowthRef, {
    once: true,
    margin: "0px 0px -10% 0px",
  });
  const expansionScenarioStatsRef = useRef<HTMLDivElement | null>(null);
  const expansionScenarioStatsInView = useInView(expansionScenarioStatsRef, {
    once: true,
    margin: "0px 0px -10% 0px",
  });
  const [selectedScenario, setSelectedScenario] = useState<
    "npi2045" | "pkBudg1000_2045" | "pkBudg650_2045"
  >("pkBudg650_2045");
  const baseGridShare = electricityImpactData.statusQuo.gridShare;

  // Hero parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);

  const formatGridDelta = (gridShare: number) => {
    const delta = gridShare - baseGridShare;
    if (Math.abs(delta) < 0.05) return "Baseline";
    const sign = delta > 0 ? "+" : "";
    return `${sign}${delta.toFixed(1)} pts vs 2023`;
  };


  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-neutral-800 dark:text-neutral-200 overflow-x-hidden relative transition-colors duration-300">
      <ThemeToggle />
      {/* Fixed grid background */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0" />

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="h-screen flex items-center justify-center px-4 relative overflow-hidden"
      >
        {/* Brighter hero grid */}
        <div className="absolute inset-0 bg-grid-hero pointer-events-none" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="text-center max-w-4xl mx-auto relative z-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-mono text-xs sm:text-sm text-violet-600/60 dark:text-violet-400/60 mb-5 tracking-[0.2em] uppercase"
          >
            Prospective Life Cycle Assessment
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-neutral-900 dark:text-neutral-100 tracking-tighter leading-[0.9] mb-6"
          >
            Climate Impacts of
            <br />
            <span className="text-violet-600 dark:text-violet-400">Grid Expansion</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-neutral-500 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            How electricity grid infrastructure shapes the environmental impacts of
            future power systems — a prospective LCA for Germany through 2045. Based on {" "}
            <a
              href="https://doi.org/10.1038/s41467-026-00000-0"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-neutral-400/40 underline-offset-2 hover:text-neutral-600 dark:hover:text-neutral-300 hover:decoration-neutral-400/60 transition-colors"
            >
              Diepers et al. (2026)
            </a>
            .
          </motion.p>
        </motion.div>

        <ScrollIndicator />
      </section>

      {/* ─── STUDY INTRO — appears after hero ─── */}
      <RevealSection className="full-bleed">
        <div className="max-w-3xl mx-auto px-4 py-20 sm:py-28 text-center">
          <motion.p
            variants={fadeUp}
            className="text-neutral-500 text-sm sm:text-base md:text-lg leading-relaxed"
          >
            The transition to renewable electricity simultaneously reduces
            climate impacts of generation and helps{" "}
            <span className="text-neutral-700 dark:text-neutral-300 font-medium">
              decarbonize the production
            </span>{" "}
            of grid infrastructure. However, the extensive{" "}
            <span className="text-violet-600 dark:text-violet-400 font-medium">
              grid expansion
            </span>{" "}
            necessary to support increasing shares of renewables creates a
            trade-off, increasing the{" "}
            <span className="text-neutral-700 dark:text-neutral-300 font-medium">
              future relevance of grid-related impacts
            </span>
            .
          </motion.p>
        </div>
      </RevealSection>

      {/* ─── MAIN CONTENT ─── */}
      <main className="relative z-10">
        {/* Section 1: Electricity Mix */}
        <div className="max-w-5xl mx-auto px-4 pt-24 sm:pt-32 pb-8">
          <RevealSection id="electricity-evolution">
            <ChapterHeader
              step={1}
              title="Electricity's Climate Impact"
              subtitle="In 2023, grid infrastructure accounts for just 1% of electricity's climate impact. But as generation shifts to renewables, a 'decarbonization gap' emerges: direct emissions from generation are abated faster than the embodied emissions in grid materials."
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-stretch"
            >
              {[
                {
                  ...electricityImpactData.statusQuo,
                  scenario: "Status Quo",
                  impactLabel: `${electricityImpactData.statusQuo.totalGCO2e} g CO₂/kWh`,
                },
                {
                  ...electricityImpactData[selectedScenario],
                  scenario:
                    selectedScenario === "npi2045"
                      ? "3°C Scenario"
                      : selectedScenario === "pkBudg1000_2045"
                        ? "2°C Scenario"
                        : "1.5°C Scenario",
                  impactLabel: `${electricityImpactData[selectedScenario].totalGCO2e} g CO₂/kWh`,
                },
              ].map((scenario, index) => (
                <motion.div
                  key={`electricity-card-${index}`}
                  variants={fadeUp}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader className="p-4 sm:p-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex flex-col gap-1 flex-1 min-w-0">
                        {scenario.scenario !== "Status Quo" ? (
                          <>
                            <div className="flex flex-wrap items-center gap-2 text-neutral-400 mb-2">
                              <TrendingUp className="h-4 w-4" />
                              <CardTitle className="text-base">
                                Scenario
                              </CardTitle>
                              <ToggleGroup
                                type="single"
                                value={selectedScenario}
                                accent="violet"
                                onValueChange={(value) =>
                                  value &&
                                  setSelectedScenario(
                                    value as typeof selectedScenario
                                  )
                                }
                                className="gap-0 rounded-md border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white/60 dark:bg-neutral-900/60"
                              >
                                <ToggleGroupItem
                                  value="pkBudg650_2045"
                                  aria-label="1.5 degree scenario"
                                  className="font-medium text-xs border-r border-neutral-200 dark:border-neutral-800 rounded-none"
                                >
                                  1.5°C
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                  value="pkBudg1000_2045"
                                  aria-label="2 degree scenario"
                                  className="font-medium text-xs border-r border-neutral-200 dark:border-neutral-800 rounded-none"
                                >
                                  2°C
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                  value="npi2045"
                                  aria-label="3 degree scenario"
                                  className="font-medium text-xs rounded-none"
                                >
                                  3°C
                                </ToggleGroupItem>
                              </ToggleGroup>
                            </div>
                            <CardDescription>Impact shares in 2045</CardDescription>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 text-neutral-400 mb-2">
                              <ArrowDownToDot className="h-4 w-4" />
                              <CardTitle className="text-base">
                                {scenario.scenario}
                              </CardTitle>
                            </div>
                            <CardDescription>Impact shares in 2023</CardDescription>
                          </>
                        )}
                      </div>

                      <div className="flex items-start flex-shrink-0 w-full sm:w-auto sm:justify-end pt-1 sm:pt-0">
                        <div className="flex items-center gap-3 rounded-md border border-violet-300/30 bg-violet-50/30 dark:border-violet-500/30 dark:bg-violet-950/30 px-3 py-2 text-left">
                          <span className="relative flex h-2 w-2 flex-shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-500 dark:bg-violet-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500 dark:bg-violet-400" />
                          </span>
                          <div className="leading-tight">
                            <div className="text-[10px] uppercase tracking-wide text-violet-600/70 dark:text-violet-400/70 font-mono">
                              Grid share
                            </div>
                            <div className="flex items-center gap-2 text-xs text-neutral-800 dark:text-neutral-200">
                              <span className="font-semibold font-mono">
                                {scenario.gridShare.toFixed(1)}%
                              </span>
                              <span className="text-[10px] text-neutral-500">
                                {formatGridDelta(scenario.gridShare)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="px-2 pb-4 flex-1 flex items-center justify-center h-[320px] sm:h-[380px] md:h-[440px]">
                      <ElectricityDonutChart data={scenario as any} />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </RevealSection>
        </div>

        {/* ─── BIG STAT: grid share growth ─── */}
        <div ref={gridGrowthRef}>
          <BigStatMoment
            caption={`Grid infrastructure's share of electricity's climate impact rises from ${Math.round(electricityImpactData.statusQuo.gridShare)}% in 2023 to ${Math.round(electricityImpactData.pkBudg650_2045.gridShare)}% in the 1.5°C scenario — making it the third largest contributor behind wind and solar generation.`}
          >
            <span className="text-neutral-400 dark:text-neutral-600">{Math.round(electricityImpactData.statusQuo.gridShare)}%</span>
            <span className="text-neutral-300 dark:text-neutral-700 text-3xl sm:text-5xl md:text-6xl">→</span>
            <CountUp
              target={Math.round(electricityImpactData.pkBudg650_2045.gridShare)}
              start={gridGrowthInView}
              duration={3}
              delay={0}
              startValue={2}
              className="inline-block"
              suffix="%"
            />
          </BigStatMoment>
        </div>

        {/* ─── NARRATIVE TRANSITION ─── */}
        <RevealSection className="full-bleed">
          <div className="max-w-3xl mx-auto px-4 py-20 sm:py-28 text-center">
            <motion.p
              variants={fadeUp}
              className="text-neutral-500 text-sm sm:text-base md:text-lg leading-relaxed"
            >
              Understanding{" "}
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                where grid emissions originate
              </span>{" "}
              is essential for identifying mitigation levers. We trace impacts
              from{" "}
              <span className="text-violet-600 dark:text-violet-400 font-medium">
                today's grid infrastructure
              </span>{" "}
              through its material and process supply chains, then examine how{" "}
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                future grid expansion
              </span>{" "}
              evolves under different climate scenarios, and finally assess
              whether decarbonization{" "}
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                shifts environmental burdens
              </span>{" "}
              to other impact categories.
            </motion.p>
          </div>
        </RevealSection>

        {/* Section 2: Grid Status Quo */}
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <RevealSection id="status-quo">
            <ChapterHeader
              step={2}
              title="Today's Grid Infrastructure"
              subtitle="Germany's electricity grid comprises overhead lines, underground cables, transformers, substations, and switchgear across four voltage levels. Based on installed component data reported by grid operators for 2023, we quantify the life-cycle climate impact of this infrastructure."
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5 mb-6 sm:mb-8"
            >
              {gridStatusQuoComponents.map((component, index) => (
                <GridComponentCard
                  key={component.name}
                  component={component}
                  index={index}
                />
              ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5">
              <TotalImpactCard totalGridImpact={totalGridImpact} />
              <Card className="lg:col-span-3 w-full min-w-0">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 mb-2">
                    <ChartBar className="h-5 w-5" />
                    <CardTitle className="text-lg">Component Breakdown</CardTitle>
                  </div>
                  <CardDescription>
                    Climate impact by infrastructure type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GridStatusQuoChart />
                </CardContent>
              </Card>
            </div>

            <SectionTakeaway>
              <strong className="text-neutral-700 dark:text-neutral-300">Takeaway:</strong> Over 90% of the grid's climate impact comes from conducting equipment — overhead lines (54%) and cables (37%).
            </SectionTakeaway>
          </RevealSection>
        </div>

        {/* Section 3: Material Flows */}
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <RevealSection>
            <ChapterHeader
              step={3}
              title="Material & Process Analysis"
              subtitle="The actual sources of grid emissions largely lie not in the materials themselves, but in upstream supply chain processes. By tracing impacts from emitting processes through materials to components, we reveal the dominant emission sources."
            />

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-neutral-400 mb-2">
                  <Layers className="h-5 w-5" />
                  <CardTitle>Impact Sankey Diagram</CardTitle>
                </div>
                <CardDescription>
                  Climate impact flows from processes → materials → components →
                  grid
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SankeyVisualization />
              </CardContent>
            </Card>

            <SectionTakeaway>
              <strong className="text-neutral-700 dark:text-neutral-300">Takeaway:</strong> Three upstream sectors dominate grid impacts: electricity generation (35%), iron & steel process emissions (14%), and heat supply (11%). Since all three are prominent targets for decarbonization, future grid components can benefit from their transformation.
            </SectionTakeaway>
          </RevealSection>
        </div>

        {/* ─── TRANSITION: Today → Future ─── */}
        <RevealSection className="full-bleed">
          <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center">
            <motion.p
              variants={fadeUp}
              className="text-neutral-500 text-sm sm:text-base md:text-lg leading-relaxed"
            >
              With {" "}
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                electricity, heat, and steel
              </span>{" "}
              as the dominant emission sourcesin grid supply chains, the question is: {" "}
              <span className="text-violet-600 dark:text-violet-400 font-medium">
                how much will these
              sectors decarbonize
              </span> as Germany expands its grid?
              Using prospective LCA with Integrated Assessment Model
              scenarios, we model grid expansion under three climate pathways
              through 2045.
            </motion.p>
          </div>
        </RevealSection>

        {/* Section 4: Grid Expansion Scenarios */}
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <RevealSection>
            <ChapterHeader
              step={4}
              title="Grid Expansion Scenarios"
              subtitle="We model Germany's planned grid expansion across multiple periods, accounting for projected supply chain developments. Components built later benefit from progressively cleaner production systems — the 2040–2045 expansion has less than half the impact of business-as-usual."
            />

            <motion.div
              ref={expansionScenarioStatsRef}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8"
            >
              {(() => {
                const staticTotal = expansionYearlyData.reduce((sum, d) => sum + d.static, 0);
                const npiTotal = expansionYearlyData.reduce((sum, d) => sum + d.npi, 0);
                const pkBudg1000Total = expansionYearlyData.reduce((sum, d) => sum + d.pkBudg1000, 0);
                const pkBudg650Total = expansionYearlyData.reduce((sum, d) => sum + d.pkBudg650, 0);
                const pctChange = (val: number) => `${Math.round((val / staticTotal - 1) * 100)}%`;
                return [
                  { name: "Static (BAU)", value: staticTotal, change: "Baseline", desc: "Business as usual", highlight: false },
                  { name: "3°C Scenario", value: npiTotal, change: pctChange(npiTotal), desc: "National policies implemented", highlight: false },
                  { name: "2°C Scenario", value: pkBudg1000Total, change: pctChange(pkBudg1000Total), desc: "1000 Gt budget", highlight: false },
                  { name: "1.5°C Scenario", value: pkBudg650Total, change: pctChange(pkBudg650Total), desc: "650 Gt budget", highlight: true },
                ];
              })().map((scenario) => (
                <motion.div key={scenario.name} variants={fadeUp}>
                  <Card
                    className={
                      scenario.highlight ? "border-violet-300/40 dark:border-violet-900/40" : ""
                    }
                  >
                    <CardContent className="pt-5 text-center">
                      <div className="text-xs text-neutral-500 mb-1 font-mono">
                        {scenario.name}
                      </div>
                      <div
                        className={`text-2xl sm:text-3xl font-semibold font-mono mb-1 ${
                          scenario.highlight
                            ? "text-violet-600 dark:text-violet-400"
                            : "text-neutral-800 dark:text-neutral-200"
                        }`}
                      >
                        <CountUp
                          target={scenario.value}
                          start={expansionScenarioStatsInView}
                          duration={1.2}
                          decimals={1}
                        />
                      </div>
                      <div className="text-[10px] sm:text-xs text-neutral-600 mb-2">
                        Mt CO₂-eq
                      </div>
                      <Badge
                        variant={
                          scenario.change === "Baseline" ? "outline" : "success"
                        }
                        className="text-[10px]"
                      >
                        {scenario.change}
                      </Badge>
                      <div className="text-[10px] text-neutral-600 mt-2">
                        {scenario.desc}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-neutral-400 mb-2">
                  <TrendingUp className="h-5 w-5" />
                  <CardTitle className="text-lg">Grid Expansion Impacts</CardTitle>
                </div>
                <CardDescription>
                  Cumulative climate impact of grid expansion from 2025 to 2045
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ExpansionTimelineChart />
              </CardContent>
            </Card>

            <SectionTakeaway>
              <strong className="text-neutral-700 dark:text-neutral-300">Takeaway:</strong> Most impact occurs in early expansion periods, when the bulk of construction is scheduled and supply chains have not yet fully decarbonized. Later periods benefit significantly from cleaner electricity, heat, and steel production.
            </SectionTakeaway>
          </RevealSection>
        </div>

        {/* Section 5: Future Contributions Explorer */}
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <RevealSection>
            <ChapterHeader
              step={5}
              title="Future Contributions Explorer"
              subtitle="Decompose the impact of grid expansion by component, material, process, and time period. Explore how supply chain decarbonization affects different parts of the grid's environmental footprint."
            />

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-neutral-400 mb-2">
                  <BarChart3 className="h-5 w-5" />
                  <CardTitle className="text-lg">
                    Scenario Comparison by Category
                  </CardTitle>
                </div>
                <CardDescription>
                  Toggle categories and scenarios to see how shares shift over
                  time
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2 sm:p-5 sm:pt-2">
                <MaterialContributionChart />
              </CardContent>
            </Card>

            <SectionTakeaway>
              <strong className="text-neutral-700 dark:text-neutral-300">Takeaway:</strong> Most future climate impact reduction is driven by decarbonizing electricity. This extends to reductions in aluminium and copper production, which rely on electricity. Comparing time periods reveals how later grid expansion increasingly benefit from progressive decarbonization.
            </SectionTakeaway>
          </RevealSection>
        </div>

        {/* ─── TRANSITION: Scenarios → Burden shifting ─── */}
        <RevealSection className="full-bleed">
          <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center">
            <motion.p
              variants={fadeUp}
              className="text-neutral-500 text-sm sm:text-base md:text-lg leading-relaxed"
            >
              Reducing climate change impact is the main motivation behind
              the energy transition — but transitions to{" "}
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                low-carbon systems
              </span>{" "}
              can shift environmental burdens to other categories. Do the
              supply chain transformations that reduce grid emissions come with{" "}
              <span className="text-violet-600 dark:text-violet-400 font-medium">
                unintended environmental trade-offs
              </span>
              ?
            </motion.p>
          </div>
        </RevealSection>

        {/* Section 6: Impact Categories */}
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <RevealSection>
            <ChapterHeader
              step={6}
              title="Shifting Environmental Burdens"
              subtitle="Comparing prospective scenarios against a static BAU baseline across 16 environmental impact categories. Burden shifting occurs in only 2 of 16 categories, while the phase-out of coal delivers co-benefits across most others."
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8"
            >
              {(() => {
                const cats = expansionComparisonData.impactCategories;
                const improved = cats
                  .filter((c) => c.pkBudg650 < -0.05)
                  .sort((a, b) => a.pkBudg650 - b.pkBudg650)
                  .slice(0, 3);
                const tradeoffs = cats
                  .filter((c) => c.pkBudg650 > 0)
                  .sort((a, b) => b.pkBudg650 - a.pkBudg650);
                const fmtPct = (v: number) => `${v > 0 ? "+" : ""}${Math.round(v * 100)}%`;
                const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());
                return (
                  <>
                    <motion.div variants={fadeUp}>
                      <Card variant="success" className="h-full">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-emerald-600 dark:text-emerald-400 text-base">
                            Most Improved
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {improved.map((item) => (
                              <div
                                key={item.category}
                                className="flex justify-between items-center"
                              >
                                <span className="text-xs sm:text-sm text-neutral-400">
                                  {titleCase(item.category)}
                                </span>
                                <Badge variant="success" className="text-[10px]">
                                  {fmtPct(item.pkBudg650)}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                      <Card variant="warning" className="h-full">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-violet-600 dark:text-violet-400 text-base">
                            Trade-offs
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {tradeoffs.map((item) => (
                              <div
                                key={item.category}
                                className="flex justify-between items-center"
                              >
                                <span className="text-xs sm:text-sm text-neutral-400">
                                  {titleCase(item.category)}
                                </span>
                                <Badge
                                  variant={item.pkBudg650 >= 0.05 ? "warning" : "outline"}
                                  className="text-[10px]"
                                >
                                  {fmtPct(item.pkBudg650)}
                                </Badge>
                              </div>
                            ))}
                          </div>
                          <p className="mt-3 text-[10px] sm:text-xs text-neutral-600">
                            From bio-based energy carriers and increased renewable deployment
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </>
                );
              })()}

              <motion.div variants={fadeUp}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-neutral-700 dark:text-neutral-300 text-base">
                      Key Insight
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs sm:text-sm text-neutral-400">
                      Burden shifting occurs in{" "}
                      <strong className="text-neutral-800 dark:text-neutral-200">
                        only 2 of 16
                      </strong>{" "}
                      impact categories. Land use increases due to bio-based energy carriers, while mineral depletion rises from renewable energy deployment. Most other categories show co-benefits from coal phase-out.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-neutral-400 mb-2">
                  <TrendingDown className="h-5 w-5" />
                  <CardTitle>Impact Category Comparison</CardTitle>
                </div>
                <CardDescription>
                  Relative change vs. business-as-usual (BAU) across all
                  categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImpactCategoryComparisonChart />
              </CardContent>
            </Card>

            <SectionTakeaway>
              <strong className="text-neutral-700 dark:text-neutral-300">Takeaway:</strong> The climate-driven transition towards renewables mainly brings environmental co-benefits in other impact categories. Especially coal phase-out reduces energy resource depletion, eutrophication and particulate matter emissions. Burden shifting is limited to land use (from biomass) and mineral resources (from renewables), affecting only 2 of 16 assessed categories.
            </SectionTakeaway>
          </RevealSection>
        </div>

        {/* Section 7: Key Findings */}
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <RevealSection id="key-findings">
            <ChapterHeader
              step={7}
              title="Key Findings"
              subtitle="Three core insights emerge from this prospective life cycle assessment of Germany's grid infrastructure through 2045."
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-4 sm:gap-5"
            >
              {(() => {
                const futureGridShare = Math.round(electricityImpactData.pkBudg650_2045.gridShare);
                return [
                  {
                    icon: <Zap className="h-5 w-5" />,
                    title: `Grid Share Rises to ${futureGridShare}%`,
                    description:
                      "As generation decarbonizes faster than grid supply chains, infrastructure shifts from a marginal concern to a central pillar of electricity's climate impact.",
                  },
                  {
                    icon: <Layers className="h-5 w-5" />,
                    title: "Persistent Emission Sources",
                    description:
                      "Even under ambitious decarbonization, electricity and heat generation for aluminium production remain dominant drivers of grid-related impacts - and are therefor major levers for future mitigation.",
                  },
                  {
                    icon: <TrendingUp className="h-5 w-5" />,
                    title: "Limited Burden Shifting",
                    description:
                      "Supply chain decarbonization delivers co-benefits across most impact categories, with burden shifting limited to land use and mineral resources — only 2 of 16 categories assessed.",
                  },
                ];
              })().map((finding) => (
                <motion.div key={finding.title} variants={fadeUp}>
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <div className="text-violet-600 dark:text-violet-400 mb-4">{finding.icon}</div>
                      <h3 className="text-base sm:text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                        {finding.title}
                      </h3>
                      <p className="text-sm text-neutral-500 leading-relaxed">
                        {finding.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </RevealSection>
        </div>

        {/* Back to Top */}
        <div className="text-center pb-16">
          <Button
            variant="outline"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Top
            <ChevronDown className="ml-2 h-4 w-4 rotate-180" />
          </Button>
        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-neutral-200/50 dark:border-neutral-800/50">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Cable className="h-4 w-4 text-violet-600/60 dark:text-violet-400/60" />
              <span className="text-sm text-neutral-400 dark:text-neutral-600">
                PLCA Grid Expansion Explorer
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 dark:text-neutral-600 text-center">
              Based on: Diepers et al.,{" "}
              <span className="text-neutral-600 dark:text-neutral-400 italic">
                Emerging environmental impacts of future electricity grid infrastructure
              </span>
              , Nature Communications (2026)
            </p>
            <a
              href="https://doi.org/10.1038/s41467-026-00000-0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="sm" className="text-neutral-500">
                <ExternalLink className="h-4 w-4 mr-1.5" />
                Read Paper
              </Button>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
