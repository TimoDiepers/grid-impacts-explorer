import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { expansionYearlyData } from "@/data";
import { scenarioColors } from "@/lib/palette";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

type ExpansionTimelineMode = "cumulative" | "yearly";

const chartConfig = {
  static: {
    label: "Static (BAU)",
    color: scenarioColors.static,
  },
  npi: {
    label: "3°C scenario",
    color: scenarioColors.npi,
  },
  pkBudg1000: {
    label: "2°C scenario",
    color: scenarioColors.pkBudg1000,
  },
  pkBudg650: {
    label: "1.5°C scenario",
    color: scenarioColors.pkBudg650,
  },
} satisfies ChartConfig;

// Build cumulative expansion-only data (no status quo baseline)
function buildCumulativeData() {
  const cumulative: { year: number; static: number; npi: number; pkBudg1000: number; pkBudg650: number }[] = [];

  let sumStatic = 0;
  let sumNpi = 0;
  let sumPkBudg1000 = 0;
  let sumPkBudg650 = 0;

  for (const d of expansionYearlyData) {
    sumStatic += d.static;
    sumNpi += d.npi;
    sumPkBudg1000 += d.pkBudg1000;
    sumPkBudg650 += d.pkBudg650;
    cumulative.push({
      year: d.year,
      static: parseFloat(sumStatic.toFixed(2)),
      npi: parseFloat(sumNpi.toFixed(2)),
      pkBudg1000: parseFloat(sumPkBudg1000.toFixed(2)),
      pkBudg650: parseFloat(sumPkBudg650.toFixed(2)),
    });
  }

  return cumulative;
}

const cumulativeData = buildCumulativeData();

function buildZeroData(data: typeof cumulativeData) {
  return data.map((d) => ({
    year: d.year,
    static: 0,
    npi: 0,
    pkBudg1000: 0,
    pkBudg650: 0,
  }));
}

export function ExpansionTimelineChart({
  mode = "cumulative",
}: {
  mode?: ExpansionTimelineMode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const chartData = mode === "cumulative" ? cumulativeData : expansionYearlyData;
  const displayedData = hasAnimated ? chartData : buildZeroData(chartData);

  return (
    <div ref={ref} className="w-full">
      <ChartContainer config={chartConfig} className="h-44 sm:h-56 md:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={displayedData}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="fillStatic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={scenarioColors.static} stopOpacity={0.15} />
                <stop offset="100%" stopColor={scenarioColors.static} stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="fillNpi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={scenarioColors.npi} stopOpacity={0.15} />
                <stop offset="100%" stopColor={scenarioColors.npi} stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="fillPkBudg1000" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={scenarioColors.pkBudg1000} stopOpacity={0.15} />
                <stop offset="100%" stopColor={scenarioColors.pkBudg1000} stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="fillPkBudg650" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={scenarioColors.pkBudg650} stopOpacity={0.15} />
                <stop offset="100%" stopColor={scenarioColors.pkBudg650} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 11, fill: "var(--chart-tick)" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              tickFormatter={(value) => `${value}`}
              tick={{ fontSize: 11, fill: "var(--chart-tick)" }}
              width={52}
              domain={[0, 'auto']}
              label={{
                value: "Mt CO₂-eq",
                angle: -90,
                position: "insideLeft",
                offset: 4,
                style: { fontSize: 11, fill: "var(--chart-tick)", textAnchor: "middle" },
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => (
                    <div className="flex items-center justify-between gap-2 sm:gap-4">
                      <span className="text-[var(--tooltip-muted)] text-xs">
                        {chartConfig[name as keyof typeof chartConfig]?.label || name}
                      </span>
                      <span className="font-mono font-medium text-[var(--tooltip-text)] text-xs">
                        {typeof value === "number" ? value.toFixed(1) : value} Mt CO₂-eq
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="static"
              stroke="var(--color-static)"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="url(#fillStatic)"
              dot={{ fill: "var(--color-static)", r: 2 }}
              activeDot={{ r: 4 }}
              isAnimationActive={true}
              animationDuration={1500}
              animationBegin={0}
            />
            <Area
              type="monotone"
              dataKey="npi"
              stroke="var(--color-npi)"
              strokeWidth={2}
              fill="url(#fillNpi)"
              dot={{ fill: "var(--color-npi)", r: 2 }}
              activeDot={{ r: 4 }}
              isAnimationActive={true}
              animationDuration={1500}
              animationBegin={200}
            />
            <Area
              type="monotone"
              dataKey="pkBudg1000"
              stroke="var(--color-pkBudg1000)"
              strokeWidth={2}
              fill="url(#fillPkBudg1000)"
              dot={{ fill: "var(--color-pkBudg1000)", r: 2 }}
              activeDot={{ r: 4 }}
              isAnimationActive={true}
              animationDuration={1500}
              animationBegin={400}
            />
            <Area
              type="monotone"
              dataKey="pkBudg650"
              stroke="var(--color-pkBudg650)"
              strokeWidth={2}
              fill="url(#fillPkBudg650)"
              dot={{ fill: "var(--color-pkBudg650)", r: 2 }}
              activeDot={{ r: 4 }}
              isAnimationActive={true}
              animationDuration={1500}
              animationBegin={600}
            />
            <ChartLegend
              verticalAlign="top"
              content={<ChartLegendContent className="text-[11px]" />}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
