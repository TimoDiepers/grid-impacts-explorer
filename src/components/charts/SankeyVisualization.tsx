import { Sankey, Tooltip, Layer, Rectangle } from "recharts";
import { sankeyData } from "@/data";

// Node colors - organized by category
const NODE_COLORS: Record<string, string> = {
  // Grid (final target)
  "grid status quo": "#17becf",
  // Components
  "cables": "#f97316",
  "overhead lines": "#2563eb",
  "transformers": "#22c55e",
  "substations": "#ef4444",
  "switchgears": "#a855f7",
  // Materials
  "aluminum": "#60a5fa",
  "copper": "#f87171",
  "iron & steel": "#4ade80",
  "plastics": "#c084fc",
  "concrete": "#9ca3af",
  "SF6": "#fbbf24",
  "other materials": "#a3e635",
  // Processes
  "electricity": "#64748b",
  "heat": "#fcd34d",
  "transport": "#22d3ee",
  "coal": "#1e293b",
  "clinker": "#65a30d",
  "aluminum (process emissions)": "#d97706",
  "iron & steel (process emissions)": "#dc2626",
  "other processes": "#a855f7",
};

// Build Sankey data structure
function buildSankeyData() {
  // Create unique nodes
  const nodeSet = new Set<string>();
  sankeyData.forEach((d) => {
    nodeSet.add(d.source);
    nodeSet.add(d.target);
  });

  // Convert to array and create index map
  const nodes = Array.from(nodeSet).map((name) => ({
    name,
    fill: NODE_COLORS[name] || "#9ca3af",
  }));

  const nodeIndexMap = new Map<string, number>();
  nodes.forEach((node, index) => {
    nodeIndexMap.set(node.name, index);
  });

  // Create links
  const links = sankeyData
    .filter((d) => d.value > 0.1) // Filter small flows for clarity
    .map((d) => ({
      source: nodeIndexMap.get(d.source)!,
      target: nodeIndexMap.get(d.target)!,
      value: d.value,
      sourceName: d.source,
      targetName: d.target,
    }));

  return { nodes, links };
}

const { nodes, links } = buildSankeyData();

// Custom node component for the Sankey diagram
interface SankeyNodeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
  payload?: {
    name: string;
    fill: string;
    value?: number;
  };
}

function SankeyNode({ x = 0, y = 0, width = 0, height = 0, payload }: SankeyNodeProps) {
  if (!payload) return null;
  
  const isProcessNode = [
    "electricity", "heat", "transport", "coal", "clinker",
    "aluminum (process emissions)", "iron & steel (process emissions)", "other processes"
  ].includes(payload.name);
  
  const isGridNode = payload.name === "grid status quo";

  return (
    <Layer>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={payload.fill}
        fillOpacity={0.9}
        rx={2}
        ry={2}
      />
      {height > 12 && (
        <text
          x={isProcessNode ? x + width + 4 : (isGridNode ? x - 4 : x + width / 2)}
          y={y + height / 2}
          textAnchor={isProcessNode ? "start" : (isGridNode ? "end" : "middle")}
          dominantBaseline="middle"
          className="fill-gray-300 text-[8px] sm:text-[9px] font-medium"
          style={{ fontSize: "8px" }}
        >
          {payload.name.length > 10 
            ? payload.name.substring(0, 10) + "..." 
            : payload.name}
        </text>
      )}
    </Layer>
  );
}

// Custom link component
interface SankeyLinkProps {
  sourceX?: number;
  targetX?: number;
  sourceY?: number;
  targetY?: number;
  sourceControlX?: number;
  targetControlX?: number;
  linkWidth?: number;
  payload?: {
    source: number;
    target: number;
    value: number;
    sourceName: string;
    targetName: string;
  };
}

function SankeyLink({
  sourceX = 0,
  targetX = 0,
  sourceY = 0,
  targetY = 0,
  sourceControlX = 0,
  targetControlX = 0,
  linkWidth = 0,
  payload,
}: SankeyLinkProps) {
  if (!payload) return null;
  
  const sourceNode = nodes[payload.source];
  const gradientId = `gradient-${payload.source}-${payload.target}`;

  return (
    <Layer>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={sourceNode?.fill || "#9ca3af"} stopOpacity={0.5} />
          <stop offset="100%" stopColor={sourceNode?.fill || "#9ca3af"} stopOpacity={0.2} />
        </linearGradient>
      </defs>
      <path
        d={`
          M${sourceX},${sourceY}
          C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}
          L${targetX},${targetY + linkWidth}
          C${targetControlX},${targetY + linkWidth} ${sourceControlX},${sourceY + linkWidth} ${sourceX},${sourceY + linkWidth}
          Z
        `}
        fill={`url(#${gradientId})`}
        strokeWidth={0}
        className="hover:opacity-80 transition-opacity cursor-pointer"
      />
    </Layer>
  );
}

// Custom tooltip content
interface TooltipPayloadItem {
  payload?: {
    sourceName?: string;
    targetName?: string;
    value?: number;
    name?: string;
  };
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayloadItem[] }) {
  if (!active || !payload || payload.length === 0) return null;
  
  const data = payload[0]?.payload;
  if (!data) return null;

  if (data.sourceName && data.targetName) {
    return (
      <div className="bg-gray-800 p-2 sm:p-3 rounded-lg shadow-lg border border-gray-700">
        <p className="font-medium text-gray-100 text-xs sm:text-sm">
          {data.sourceName} → {data.targetName}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {data.value?.toFixed(2)} Mt CO₂-eq
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-2 sm:p-3 rounded-lg shadow-lg border border-gray-700">
      <p className="font-medium text-gray-100 text-xs sm:text-sm">{data.name}</p>
    </div>
  );
}

export function SankeyVisualization() {
  return (
    <div className="w-full">
      <div className="mb-3 sm:mb-4">
        <p className="text-xs sm:text-sm text-gray-400">
          Total climate impact: <strong className="text-gray-100">64.76 Mt CO₂-eq</strong>
        </p>
        <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
          Flow from processes → materials → components → grid
        </p>
      </div>
      
      {/* Responsive Sankey container */}
      <div className="w-full overflow-x-auto -mx-2 px-2">
        <div className="min-w-[500px] sm:min-w-[600px]">
          <Sankey
            width={700}
            height={400}
            data={{ nodes, links }}
            node={<SankeyNode />}
            link={<SankeyLink />}
            nodePadding={20}
            nodeWidth={10}
            margin={{ top: 15, right: 120, bottom: 15, left: 120 }}
          >
            <Tooltip content={<CustomTooltip />} />
          </Sankey>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 text-[10px] sm:text-xs">
        <div>
          <p className="font-medium text-gray-300 mb-1 sm:mb-2">Components</p>
          <div className="space-y-0.5 sm:space-y-1">
            {["overhead lines", "cables", "transformers", "substations", "switchgears"].map((name) => (
              <div key={name} className="flex items-center gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded" style={{ backgroundColor: NODE_COLORS[name] }} />
                <span className="text-gray-400 capitalize truncate">{name}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="font-medium text-gray-300 mb-1 sm:mb-2">Materials</p>
          <div className="space-y-0.5 sm:space-y-1">
            {["aluminum", "iron & steel", "copper", "plastics", "concrete", "SF6"].map((name) => (
              <div key={name} className="flex items-center gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded" style={{ backgroundColor: NODE_COLORS[name] }} />
                <span className="text-gray-400 capitalize truncate">{name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1 md:col-span-2">
          <p className="font-medium text-gray-300 mb-1 sm:mb-2">Key Processes</p>
          <div className="grid grid-cols-2 gap-0.5 sm:gap-1">
            {["electricity", "heat", "coal", "transport"].map((name) => (
              <div key={name} className="flex items-center gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded" style={{ backgroundColor: NODE_COLORS[name] }} />
                <span className="text-gray-400 capitalize truncate">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
