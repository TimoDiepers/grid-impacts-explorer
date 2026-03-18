import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GridStatusQuoChart,
  MaterialContributionChart,
  ExpansionTimelineChart,
  ImpactCategoryComparisonChart,
  ElectricityDonutChart,
  SankeyVisualization,
} from "@/components/charts";
import { electricityImpactData, gridStatusQuoComponents } from "@/data";
import { CountUp } from "@/components/CountUp";
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
        <span className="font-mono text-violet-400/70 text-sm tracking-wider">
          {String(step).padStart(2, "0")}
        </span>
        <div className="section-rule flex-1" />
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="font-display text-3xl sm:text-4xl md:text-5xl text-neutral-100 tracking-tight mb-4 leading-tight"
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
      className="mt-8 sm:mt-10 p-4 sm:p-5 rounded-lg border border-neutral-800/60 bg-neutral-900/30"
    >
      <div className="flex gap-3 items-start">
        <ArrowDown className="h-4 w-4 text-violet-400/70 mt-0.5 flex-shrink-0 rotate-[-90deg]" />
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
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
              className="p-2.5 rounded-lg mb-3 bg-neutral-800/80"
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
            <div className="text-[10px] sm:text-xs text-neutral-600">
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
        <div className="flex items-center gap-2 text-violet-400 mb-2">
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
          className="text-4xl sm:text-5xl font-semibold font-mono text-violet-400 mb-2 block"
        />
        <div className="text-sm text-neutral-500 mb-4">
          Megatonnes of CO₂ equivalent
        </div>
        <div className="p-3 bg-violet-950/20 rounded-lg border border-violet-900/30">
          <p className="text-xs sm:text-sm text-neutral-400">
            ≈ <strong className="text-violet-400">4.6 g CO₂-eq/kWh</strong>{" "}
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
        <div className="font-mono text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-violet-400 mb-6 flex items-center justify-center gap-4 sm:gap-6">
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
      transition={{ delay: 1.2, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-neutral-600 text-[10px] uppercase tracking-[0.2em] font-mono">
        Scroll
      </span>
      <ArrowDown className="h-4 w-4 text-neutral-600 scroll-indicator" />
    </motion.div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// APP
// ═════════════════════════════════════════════════════════════════════════════

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

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 overflow-x-hidden relative">
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
            className="font-mono text-xs sm:text-sm text-violet-400/60 mb-5 tracking-[0.2em] uppercase"
          >
            Prospective Life Cycle Assessment
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-neutral-100 tracking-tighter leading-[0.9] mb-6"
          >
            Climate Impacts 
            <br />
            of <span className="text-violet-400">Grid Expansion</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-neutral-500 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Exploring the environmental impact of electricity grid expansion
            through 2045 for the case of Germany
          </motion.p>
        </motion.div>

        <ScrollIndicator />
      </section>

      {/* ─── STUDY INTRO — appears after hero ─── */}
      <RevealSection className="full-bleed border-y border-neutral-800/60">
        <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="font-display text-lg sm:text-xl md:text-2xl text-neutral-200 tracking-tight mb-4 leading-snug"
            >
              About this study
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-neutral-500 text-sm sm:text-base leading-relaxed"
            >
              Germany's energy transition requires a massive expansion of its electricity grid. But building new infrastructure has environmental costs of its own. This interactive explorer presents results from a{" "}
              <span className="text-neutral-300 font-medium">prospective life cycle assessment</span>{" "}
              that models the climate impact of grid expansion through{" "}
              <span className="text-neutral-300 font-medium">2045</span>{" "}
              under three different climate policy scenarios — comparing conventional static LCA with a forward-looking approach that accounts for how industrial background systems will change over time.
            </motion.p>
          </motion.div>
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
              subtitle="Today, fossil fuel combustion dominates electricity's carbon footprint. As generation decarbonizes, the relative importance of grid infrastructure — cables, transformers, substations — grows dramatically."
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
                              <span className="text-base font-medium text-neutral-300">
                                Scenario
                              </span>
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
                                className="gap-0 rounded-md border border-neutral-800 overflow-hidden bg-neutral-900/60"
                              >
                                <ToggleGroupItem
                                  value="pkBudg650_2045"
                                  aria-label="1.5 degree scenario"
                                  className="font-medium text-xs border-r border-neutral-800 rounded-none"
                                >
                                  1.5°C
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                  value="pkBudg1000_2045"
                                  aria-label="2 degree scenario"
                                  className="font-medium text-xs border-r border-neutral-800 rounded-none"
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
                        <div className="flex items-center gap-3 rounded-md border border-violet-500/30 bg-violet-950/30 px-3 py-2 text-left">
                          <span className="relative flex h-2 w-2 flex-shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
                          </span>
                          <div className="leading-tight">
                            <div className="text-[10px] uppercase tracking-wide text-violet-400/70 font-mono">
                              Grid share
                            </div>
                            <div className="flex items-center gap-2 text-xs text-neutral-200">
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

        {/* ─── BIG STAT: 1% → 22% ─── */}
        <div ref={gridGrowthRef}>
          <BigStatMoment
            caption="Grid infrastructure's share of total electricity impact increases from ~1% today to over 22% in the 1.5°C scenario — a fundamental shift in where environmental burden lies."
          >
            <span className="text-neutral-600">1%</span>
            <span className="text-neutral-700 text-3xl sm:text-5xl md:text-6xl">→</span>
            <CountUp
              target={22}
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
              Grid infrastructure is becoming a{" "}
              <span className="text-neutral-300 font-medium">
                dominant driver
              </span>{" "}
              of electricity's environmental footprint. But where exactly do
              these emissions come from? To answer this, we first examine{" "}
              <span className="text-violet-400 font-medium">
                today's grid
              </span>{" "}
              and its material composition, then model how{" "}
              <span className="text-neutral-300 font-medium">
                expansion scenarios
              </span>{" "}
              shape the future, and finally assess how the energy transition{" "}
              <span className="text-neutral-300 font-medium">
                redistributes environmental burdens
              </span>{" "}
              across impact categories.
            </motion.p>
          </div>
        </RevealSection>

        {/* Section 2: Grid Status Quo */}
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <RevealSection id="status-quo">
            <ChapterHeader
              step={2}
              title="Today's Grid Infrastructure"
              subtitle="Germany's electricity grid is a vast network of overhead lines, underground cables, transformers, substations, and switchgear. Together, they add up to a significant material stock — and a measurable climate impact."
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
                  <div className="flex items-center gap-2 text-violet-400 mb-2">
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
              <strong className="text-neutral-300">Takeaway:</strong> Overhead lines and transformers are the largest contributors to the grid's climate footprint today, together accounting for the majority of the total {totalGridImpact.toFixed(1)} Mt CO₂-eq impact.
            </SectionTakeaway>
          </RevealSection>
        </div>

        {/* Section 3: Material Flows */}
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <RevealSection>
            <ChapterHeader
              step={3}
              title="Material & Process Analysis"
              subtitle="What makes grid infrastructure carbon-intensive? By tracing impact flows from industrial processes through raw materials to finished components, we can identify the hotspots that drive the grid's footprint."
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
              <strong className="text-neutral-300">Takeaway:</strong> Aluminum production (for overhead lines) and steel/iron processing (for transformers) are the dominant material hotspots. These are the processes where decarbonization of background systems will have the largest effect.
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
              Now that we understand{" "}
              <span className="text-neutral-300 font-medium">
                where today's emissions come from
              </span>
              , the question becomes: what happens when Germany massively expands
              its grid to support the energy transition? The next sections model{" "}
              <span className="text-violet-400 font-medium">
                future expansion scenarios
              </span>{" "}
              and their cumulative impact through 2045.
            </motion.p>
          </div>
        </RevealSection>

        {/* Section 4: Grid Expansion Scenarios */}
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <RevealSection>
            <ChapterHeader
              step={4}
              title="Grid Expansion Scenarios"
              subtitle="Germany's grid must grow substantially to integrate renewables. Using prospective LCA, we compare the cumulative impact of expansion under different climate policy pathways — from business-as-usual to ambitious 1.5°C targets."
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8"
            >
              {[
                {
                  name: "Static (BAU)",
                  value: "34.5",
                  change: "Baseline",
                  desc: "Business as usual",
                  highlight: false,
                },
                {
                  name: "3°C Scenario",
                  value: "30.4",
                  change: "-12%",
                  desc: "National policies",
                  highlight: false,
                },
                {
                  name: "2°C Scenario",
                  value: "28.3",
                  change: "-18%",
                  desc: "1000 Gt budget",
                  highlight: false,
                },
                {
                  name: "1.5°C Scenario",
                  value: "26.3",
                  change: "-23%",
                  desc: "650 Gt budget",
                  highlight: true,
                },
              ].map((scenario) => (
                <motion.div key={scenario.name} variants={fadeUp}>
                  <Card
                    className={
                      scenario.highlight ? "border-violet-900/40" : ""
                    }
                  >
                    <CardContent className="pt-5 text-center">
                      <div className="text-xs text-neutral-500 mb-1 font-mono">
                        {scenario.name}
                      </div>
                      <div
                        className={`text-2xl sm:text-3xl font-semibold font-mono mb-1 ${
                          scenario.highlight
                            ? "text-violet-400"
                            : "text-neutral-200"
                        }`}
                      >
                        {scenario.value}
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
                  <CardTitle className="text-lg">Expansion Timeline</CardTitle>
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
              <strong className="text-neutral-300">Takeaway:</strong> The choice of climate scenario matters. Using prospective LCA — which accounts for background system changes like cleaner steel and aluminum production — reduces the estimated cumulative grid expansion impact by up to 23% compared to static assessment.
            </SectionTakeaway>
          </RevealSection>
        </div>

        {/* Section 5: Future Contributions Explorer */}
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <RevealSection>
            <ChapterHeader
              step={5}
              title="Future Contributions Explorer"
              subtitle="Which materials, components, and processes drive the difference between scenarios? This interactive explorer lets you decompose the impact by category and time period to pinpoint where the largest reductions occur."
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
              <strong className="text-neutral-300">Takeaway:</strong> The reductions are not uniform — they are concentrated in specific materials and time periods. Aluminum and steel processing see the largest absolute improvements as their background production systems decarbonize.
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
              So far, we've focused on{" "}
              <span className="text-neutral-300 font-medium">
                climate change
              </span>{" "}
              as the impact category. But does the energy transition simply shift
              environmental burdens elsewhere? The final analysis looks beyond
              CO₂ to assess{" "}
              <span className="text-violet-400 font-medium">
                trade-offs across multiple impact dimensions
              </span>
              .
            </motion.p>
          </div>
        </RevealSection>

        {/* Section 6: Impact Categories */}
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <RevealSection>
            <ChapterHeader
              step={6}
              title="Shifting Environmental Burdens"
              subtitle="The energy transition doesn't just reduce emissions — it reshapes the entire environmental profile. Here we compare prospective vs. static LCA results across all impact categories to reveal where burdens decrease, and where new trade-offs emerge."
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8"
            >
              <motion.div variants={fadeUp}>
                <Card variant="success" className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-emerald-400 text-base">
                      Most Improved
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "Climate Change", value: "-23%" },
                        { name: "Energy Resources", value: "-22%" },
                        { name: "Eutrophication", value: "-13%" },
                      ].map((item) => (
                        <div
                          key={item.name}
                          className="flex justify-between items-center"
                        >
                          <span className="text-xs sm:text-sm text-neutral-400">
                            {item.name}
                          </span>
                          <Badge variant="success" className="text-[10px]">
                            {item.value}
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
                    <CardTitle className="text-violet-400 text-base">
                      Trade-offs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-neutral-400">
                          Land Use
                        </span>
                        <Badge variant="warning" className="text-[10px]">
                          +18%
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-neutral-400">
                          Material Resources
                        </span>
                        <Badge variant="outline" className="text-[10px]">
                          +1%
                        </Badge>
                      </div>
                    </div>
                    <p className="mt-3 text-[10px] sm:text-xs text-neutral-600">
                      Minor increases due to expanded renewable infrastructure
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-neutral-300 text-base">
                      Key Insight
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs sm:text-sm text-neutral-400">
                      Prospective LCA reveals{" "}
                      <strong className="text-neutral-200">
                        significant reductions
                      </strong>{" "}
                      across most environmental impact categories, with only minor
                      trade-offs in land use.
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
              <strong className="text-neutral-300">Takeaway:</strong> The energy transition delivers improvements across most environmental dimensions, not just climate change. The main trade-off is a moderate increase in land use — a small price for broad environmental gains.
            </SectionTakeaway>
          </RevealSection>
        </div>

        {/* ─── BIG STAT: -23% ─── */}
        <BigStatMoment caption="The 1.5°C pathway reveals potential to reduce grid expansion emissions by nearly a quarter compared to static assessment — a strong case for prospective LCA.">
          <span className="text-emerald-500">-23%</span>
        </BigStatMoment>

        {/* Section 7: Key Findings */}
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <RevealSection id="key-findings">
            <ChapterHeader
              step={7}
              title="Key Findings"
              subtitle="Three core insights emerge from this prospective life cycle assessment of Germany's grid expansion through 2045."
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-4 sm:gap-5"
            >
              {[
                {
                  icon: <TrendingUp className="h-5 w-5" />,
                  title: "23% Reduction Achievable",
                  description:
                    "Prospective LCA reveals potential to reduce estimated grid expansion impact by up to 23% compared to static assessment methods.",
                },
                {
                  icon: <Zap className="h-5 w-5" />,
                  title: "Growing Grid Share",
                  description:
                    "As electricity generation decarbonizes, grid infrastructure's relative contribution to total impact increases significantly.",
                },
                {
                  icon: <Layers className="h-5 w-5" />,
                  title: "Material Hotspots",
                  description:
                    "Overhead lines (aluminum) and transformers (steel/iron) are the largest contributors to grid infrastructure impact.",
                },
              ].map((finding) => (
                <motion.div key={finding.title} variants={fadeUp}>
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <div className="text-violet-400 mb-4">{finding.icon}</div>
                      <h3 className="text-base sm:text-lg font-semibold text-neutral-200 mb-2">
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
      <footer className="border-t border-neutral-800/50">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Cable className="h-4 w-4 text-violet-400/60" />
              <span className="text-sm text-neutral-600">
                PLCA Grid Expansion Explorer
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 text-center">
              Data from:{" "}
              <span className="text-neutral-400">
                Prospective Life Cycle Assessment of Germany's Electricity Grid
                Expansion
              </span>
            </p>
            <Button variant="ghost" size="sm" className="text-neutral-500">
              <ExternalLink className="h-4 w-4 mr-1.5" />
              View Paper
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
