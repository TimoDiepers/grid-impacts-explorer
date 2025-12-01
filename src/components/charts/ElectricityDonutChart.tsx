import { Pie, PieChart, Cell, Label } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface ElectricityDonutChartProps {
  data: {
    year: number;
    scenario?: string;
    totalGCO2e: number;
    gridShare: number;
    generation: Record<string, { share: number; impact: number }>;
  };
}

const COLORS: Record<string, string> = {
  Coal: "#52525b",
  Gas: "#f97316",
  Wind: "#3b82f6",
  Solar: "#eab308",
  Biomass: "#22c55e",
  Nuclear: "#fbbf24",
  Hydro: "#06b6d4",
  Hydrogen: "#a855f7",
  Other: "#9ca3af",
  "Grid infrastructure": "#1e40af",
};

export function ElectricityDonutChart({ data }: ElectricityDonutChartProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);
  
  const pieData = Object.entries(data.generation).map(([name, values]) => ({
    name,
    value: values.impact,
    share: values.share,
    fill: COLORS[name] || "#9ca3af",
  }));

  // Add grid infrastructure
  pieData.push({
    name: "Grid infrastructure",
    value: data.gridShare,
    share: 0,
    fill: COLORS["Grid infrastructure"],
  });

  // Sort by value descending, but keep Grid infrastructure at the end
  const sortedData = [
    ...pieData
      .filter((d) => d.name !== "Grid infrastructure")
      .sort((a, b) => b.value - a.value),
    pieData.find((d) => d.name === "Grid infrastructure")!,
  ];

  // Use zeroed data until in view
  const chartData = hasAnimated 
    ? sortedData 
    : sortedData.map(d => ({ ...d, value: 0 }));

  // Build chart config dynamically
  const chartConfig = sortedData.reduce((acc, item) => {
    acc[item.name] = {
      label: item.name,
      color: item.fill,
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <div ref={ref} className="flex flex-col items-center w-full">
      {/* Half-circle chart with proper aspect ratio to remove wasted space */}
      <ChartContainer config={chartConfig} className="mx-auto w-full max-w-[200px] sm:max-w-[280px] aspect-[2/1]">
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => (
                  <div className="flex items-center justify-between gap-2 sm:gap-4">
                    <span className="text-gray-400 text-xs">{name}</span>
                    <span className="font-mono font-medium text-gray-100 text-xs">
                      {typeof value === "number" ? value.toFixed(1) : value}%
                    </span>
                  </div>
                )}
              />
            }
          />
          <Pie
            data={chartData}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius="55%"
            outerRadius="100%"
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            isAnimationActive={true}
            animationDuration={1200}
            animationBegin={0}
          >
            {sortedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.fill}
                stroke="transparent"
                strokeWidth={1}
              />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 20}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) - 28}
                        className="fill-gray-100 text-sm sm:text-lg font-bold"
                      >
                        {data.totalGCO2e} g
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) - 14}
                        className="fill-gray-400 text-[7px] sm:text-[9px]"
                      >
                        CO₂-eq/kWh
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      {/* Legend - compact and wrapping */}
      <div className="flex flex-wrap justify-center gap-x-1.5 sm:gap-x-2 gap-y-0.5 text-[7px] sm:text-[9px] px-1 mt-1.5 sm:mt-2 max-w-[200px] sm:max-w-[280px]">
        {sortedData.slice(0, 6).map((entry) => (
          <div key={entry.name} className="flex items-center gap-0.5 sm:gap-1 whitespace-nowrap">
            <div
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-sm flex-shrink-0"
              style={{ backgroundColor: entry.fill }}
            />
            <span className="text-gray-400 truncate max-w-[40px] sm:max-w-[60px]">{entry.name}</span>
          </div>
        ))}
      </div>
      {data.scenario && (
        <div className="text-[10px] sm:text-xs font-semibold text-center mt-1 text-gray-300">
          {data.scenario}
        </div>
      )}
    </div>
  );
}
