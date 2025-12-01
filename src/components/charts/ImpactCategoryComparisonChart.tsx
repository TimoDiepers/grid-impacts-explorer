import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ReferenceLine, ResponsiveContainer } from "recharts";
import { expansionComparisonData } from "@/data";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const chartConfig = {
  base: {
    label: "3°C scenario",
    color: "#6b7280",
  },
  pkBudg1000: {
    label: "2°C scenario",
    color: "#3b82f6",
  },
  pkBudg650: {
    label: "1.5°C scenario",
    color: "#8b5cf6",
  },
} satisfies ChartConfig;

export function ImpactCategoryComparisonChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);
  
  const fullData = expansionComparisonData.impactCategories.map((item) => ({
    ...item,
    base: item.base * 100,
    pkBudg1000: item.pkBudg1000 * 100,
    pkBudg650: item.pkBudg650 * 100,
  }));

  // Use zeroed data until in view
  const chartData = hasAnimated 
    ? fullData 
    : fullData.map(d => ({ ...d, base: 0, pkBudg1000: 0, pkBudg650: 0 }));

  return (
    <div ref={ref} className="w-full">
      {/* Custom legend at top to avoid overflow */}
      <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 gap-y-1 text-[9px] sm:text-xs mb-2 sm:mb-3 px-2">
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
      <div className="w-full overflow-x-auto -mx-2 px-2">
        <ChartContainer config={chartConfig} className="h-[320px] sm:h-[400px] md:h-[500px] min-w-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 15, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#374151" />
              <XAxis
                type="number"
                domain={[-35, 25]}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value > 0 ? "+" : ""}${value}%`}
                tick={{ fontSize: 8, fill: "#9ca3af" }}
              />
              <YAxis
                type="category"
                dataKey="category"
                width={75}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 8, fill: "#9ca3af" }}
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
                          {typeof value === "number"
                            ? `${value > 0 ? "+" : ""}${value.toFixed(1)}%`
                            : value}
                        </span>
                      </div>
                    )}
                  />
                }
              />
              <ReferenceLine x={0} stroke="#6b7280" strokeDasharray="3 3" />
              <Bar
                dataKey="base"
                fill="var(--color-base)"
                radius={8}
                isAnimationActive={true}
                animationDuration={1200}
                animationBegin={0}
              />
              <Bar
                dataKey="pkBudg1000"
                fill="var(--color-pkBudg1000)"
                radius={8}
                isAnimationActive={true}
                animationDuration={1200}
                animationBegin={200}
              />
              <Bar
                dataKey="pkBudg650"
                fill="var(--color-pkBudg650)"
                radius={8}
                isAnimationActive={true}
                animationDuration={1200}
                animationBegin={400}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}
