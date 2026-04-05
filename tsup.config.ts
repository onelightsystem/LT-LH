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
  // Vanilla widgets — ESM for bundlers (deps kept external to avoid duplicates)
  {
    entry: {
      "widgets/ols-lighttime-widget": "src/widgets/ols-lighttime-widget.ts",
      "widgets/ols-calendar-widget": "src/widgets/ols-calendar-widget.ts",
      "widgets/calendar-orb": "src/widgets/calendar-orb.ts",
      "widgets/solar-day-arc": "src/widgets/solar-day-arc.ts",
    },
    format: ["esm"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: false,
    treeshake: true,
    define: {
      __OLS_IIFE_BUILD__: "false",
    },
  },
  // Vanilla widgets — IIFE for <script> tags (all deps bundled for standalone use)
  {
    entry: {
      "widgets/ols-lighttime-widget.global":
        "src/widgets/ols-lighttime-widget.ts",
      "widgets/ols-calendar-widget.global": "src/widgets/ols-calendar-widget.ts",
      "widgets/calendar-orb.global": "src/widgets/calendar-orb.ts",
      "widgets/solar-day-arc.global": "src/widgets/solar-day-arc.ts",
    },
    format: ["iife"],
    dts: false,
    splitting: false,
    sourcemap: true,
    clean: false,
    treeshake: true,
    define: {
      __OLS_IIFE_BUILD__: "true",
    },
    noExternal: [/.*/],
    define: {
      __OLS_IIFE_BUILD__: "true",
    },
  },
]);
