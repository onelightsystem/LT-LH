// @onelightsystem/light-time — Public API barrel export

// Core functions (framework-agnostic, zero dependencies except zod)
export { getLightHour, getLightDay, getLightTimeTable, validateCoordinates, formatLightTime, formatLightDay } from "./core";

// React hook (peer dependency — tree-shaken if not imported)
export { useLightTime } from "./useLightTime";

// Snippet generator
export { generateSnippet } from "./snippets";
export type { SnippetMode } from "./snippets";

// Types & schemas
export type { LightTimeEntry, Coordinates, LightHourResult, LightDayInfo, LightTimeConfig } from "./types";
export { LIGHT_TIME_MAP, LightTimeEntrySchema, CoordinatesSchema } from "./types";
