import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Cell, ResponsiveContainer } from "recharts";
import { gridStatusQuoComponents } from "@/data";
import { gridComponentColors, seriesFallback } from "@/lib/palette";
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

const chartConfig = {
  value: {
    label: "Climate Impact",
  },
  "Overhead lines": {
    label: "Overhead lines",
    color: gridComponentColors["Overhead lines"],
  },
  Cables: {
    label: "Cables",
    color: gridComponentColors.Cables,
  },
  Transformers: {
    label: "Transformers",
    color: gridComponentColors.Transformers,
  },
  Substations: {
    label: "Substations",
    color: gridComponentColors.Substations,
  },
  Switchgears: {
    label: "Switchgears",
    color: gridComponentColors.Switchgears,
  },
} satisfies ChartConfig;

const COLORS = gridComponentColors;

export function GridStatusQuoChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // Use empty data until in view to prevent early animation
  const chartData = hasAnimated ? gridStatusQuoComponents : gridStatusQuoComponents.map(d => ({ ...d, value: 0 }));

  return (
    <div ref={ref}>
      <ChartContainer config={chartConfig} className="h-48 sm:h-64 md:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            barSize={20}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--chart-grid)" />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              tick={{ fontSize: 11, fill: "var(--chart-tick)" }}
              domain={[0, "auto"]}
            />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              width={90}
              tick={{ fontSize: 11, fill: "var(--chart-label)" }}
            />
            <ChartTooltip
              cursor={{ fill: "var(--chart-cursor)" }}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => (
                    <div className="flex items-center justify-between gap-2 sm:gap-4">
                      <span className="text-[var(--tooltip-muted)] text-xs">{name}</span>
                      <span className="font-mono font-medium text-[var(--tooltip-text)] text-xs">
                        {typeof value === "number" ? value.toFixed(2) : value} Mt CO₂-eq
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Bar 
              dataKey="value" 
              radius={[0, 8, 8, 0]}
              isAnimationActive={true}
              animationDuration={1200}
              animationBegin={0}
            >
              {gridStatusQuoComponents.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name] || seriesFallback} />
              ))}
            </Bar>
            <ChartLegend
              verticalAlign="top"
              content={<ChartLegendContent className="text-[11px]" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
