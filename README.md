# Grid Impacts Explorer

An interactive, scrollytelling data visualization for exploring the **climate impacts of Germany's electricity grid infrastructure** and its planned expansion through 2045. Built to accompany [Diepers et al. (2026)](https://doi.org/10.1038/s41467-026-00000-0), a prospective life cycle assessment (LCA) study of the German electricity grid.

## What it does

The app guides users through the key findings of the study across four narrative sections:

1. **Electricity's Climate Impact** — Compares the carbon footprint of electricity today against future scenarios (1.5 °C, 2 °C, 3 °C targets), showing how the grid's share of total emissions grows as generation decarbonizes.
2. **Grid Status Quo** — Breaks down the current (2023) climate impact of each grid component (transmission lines, cables, transformers, substations, switchgear) using animated cards, a Sankey material-flow diagram, and a stacked bar chart of contributing processes.
3. **Future Grid Expansion** — Visualizes cumulative and yearly climate impacts of grid expansion through 2045 across multiple policy scenarios, with an interactive timeline chart and scenario switcher.
4. **Impact Category Comparison** — Shows how different expansion scenarios compare across multiple environmental impact categories (beyond just climate change).

The app features smooth scroll-triggered animations (Framer Motion), a toggleable dark/light theme, and lazy-loaded chart components.

## Tech stack

- **Framework**: React 19 + TypeScript, bundled with Vite
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts (bar/line/donut charts), D3 Sankey
- **Animation**: Framer Motion
- **UI primitives**: Radix UI, shadcn/ui-style components

## Project structure

```
src/
├── App.tsx                  # Main page layout and all section components
├── index.css                # Global styles, Tailwind tokens, dark theme
├── main.tsx                 # App entry point
├── assets/                  # Static assets (images, icons)
├── components/
│   ├── charts/              # Chart components (Sankey, bar, donut, timeline…)
│   ├── ui/                  # Reusable UI primitives (Button, Card, Badge…)
│   └── CountUp.tsx          # Animated number counter
├── data/                    # JSON and CSV data files + typed exports
├── hooks/                   # Custom hooks (e.g. useTheme)
└── lib/                     # Utility functions
```

## Getting started

**Prerequisites**: Node.js 18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the development server (hot reload on http://localhost:5173)
npm run dev
```

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with hot module reload |
| `npm run build` | Type-check and build the production bundle to `dist/` |
| `npm run preview` | Serve the production build locally to verify output |
| `npm run lint` | Run ESLint across all TypeScript/TSX files |

## Hosting / deployment

The app builds to a fully static site (`dist/`) and can be hosted on any static file host.

**GitHub Pages** (via the `gh-pages` package or a GitHub Actions workflow):
```bash
npm run build
# deploy the dist/ folder to your gh-pages branch
```

**Netlify / Vercel**: Connect the repository and set the build command to `npm run build` and the publish directory to `dist/`. No server-side configuration is required.

**Self-hosted**: Copy the contents of `dist/` to any web server (nginx, Apache, S3, etc.). The app is a single-page application; if you add client-side routing in the future, configure the server to serve `index.html` for all routes.

## Data

All underlying data lives in `src/data/` as JSON and CSV files and is imported as typed TypeScript modules via `src/data/index.ts`. To update the visualizations, replace or edit these files and update the corresponding type definitions in `src/data/plotData.ts`.
