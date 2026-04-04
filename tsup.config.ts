import { defineConfig } from "tsup";

export default defineConfig([
  // Main library (ESM + CJS + types)
  {
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ["react", "react-dom"],
    treeshake: true,
  },
  // Vanilla widgets (IIFE for <script> tags + ESM for bundlers)
  {
    entry: {
      "widgets/ols-lighttime-widget": "src/widgets/ols-lighttime-widget.ts",
      "widgets/ols-calendar-widget": "src/widgets/ols-calendar-widget.ts",
      "widgets/calendar-orb": "src/widgets/calendar-orb.ts",
      "widgets/solar-day-arc": "src/widgets/solar-day-arc.ts",
    },
    format: ["esm", "iife"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: false,
    treeshake: true,
    noExternal: [/.*/],
  },
]);
