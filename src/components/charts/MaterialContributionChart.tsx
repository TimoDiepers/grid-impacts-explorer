import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { materialContributions } from "@/data";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const chartConfig = {
  overheadLines: {
    label: "Overhead Lines",
    color: "#2563eb",
  },
  cables: {
    label: "Cables",
    color: "#f97316",
  },
  transformers: {
    label: "Transformers",
    color: "#22c55e",
  },
  substations: {
    label: "Substations",
    color: "#ef4444",
  },
  switchgears: {
    label: "Switchgears",
    color: "#a855f7",
  },
} satisfies ChartConfig;

export function MaterialContributionChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // Use zeroed data until in view
  const chartData = hasAnimated 
    ? materialContributions 
    : materialContributions.map(d => ({ 
        ...d, 
        overheadLines: 0, 
        cables: 0, 
        transformers: 0, 
        substations: 0, 
        switchgears: 0 
      }));

  return (
    <div ref={ref} className="w-full">
      {/* Custom legend at top */}
      <div className="flex flex-wrap justify-center gap-x-2 sm:gap-x-3 gap-y-1 text-[9px] sm:text-xs mb-2 sm:mb-3 px-2">
        {Object.entries(chartConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-1 sm:gap-1.5">
            <div
              className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm flex-shrink-0"
              style={{ backgroundColor: config.color }}
            />
            <span className="text-gray-400">{config.label}</span>
          </div>
        ))}
      </div>
      <ChartContainer config={chartConfig} className="h-48 sm:h-64 md:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 0, bottom: 35 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={35}
              tickMargin={5}
              tick={{ fontSize: 8, fill: "#9ca3af" }}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tickMargin={2}
              tick={{ fontSize: 9, fill: "#9ca3af" }}
              width={25}
              domain={[0, 'auto']}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => (
                    <div className="flex items-center justify-between gap-2 sm:gap-4">
                      <span className="text-gray-400 text-xs">
                        {chartConfig[name as keyof typeof chartConfig]?.label || name}
                      </span>
                      <span className="font-mono font-medium text-gray-100 text-xs">
                        {typeof value === "number" ? value.toFixed(2) : value} Mt CO₂-eq
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Bar
              dataKey="overheadLines"
              stackId="a"
              fill="var(--color-overheadLines)"
              radius={0}
              isAnimationActive={true}
              animationDuration={1200}
              animationBegin={0}
            />
            <Bar
              dataKey="cables"
              stackId="a"
              fill="var(--color-cables)"
              radius={0}
              isAnimationActive={true}
              animationDuration={1200}
              animationBegin={100}
            />
            <Bar
              dataKey="transformers"
              stackId="a"
              fill="var(--color-transformers)"
              radius={0}
              isAnimationActive={true}
              animationDuration={1200}
              animationBegin={200}
            />
            <Bar
              dataKey="substations"
              stackId="a"
              fill="var(--color-substations)"
              radius={0}
              isAnimationActive={true}
              animationDuration={1200}
              animationBegin={300}
            />
            <Bar
              dataKey="switchgears"
              stackId="a"
              fill="var(--color-switchgears)"
              radius={[8, 8, 0, 0]}
              isAnimationActive={true}
              animationDuration={1200}
              animationBegin={400}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
