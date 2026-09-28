// @onelightsystem/light-time — Public API barrel export

// Core functions (framework-agnostic, zero dependencies except zod)
export { getLightHour, getLightDay, getLightTimeTable, validateCoordinates, formatLightTime, formatLightDay, getQuarterColor } from "./core";

// React hook (peer dependency — tree-shaken if not imported)
export { useLightTime } from "./useLightTime";

// Snippet generator
export { generateSnippet } from "./snippets";
export type { SnippetMode } from "./snippets";

// Types & schemas
export type { LightTimeEntry, Coordinates, LightHourResult, LightDayInfo, LightTimeConfig } from "./types";
export type { QuarterKey, LightQuarterLabel } from "./types";
export { LIGHT_TIME_MAP, LIGHT_TIME_MAP_Q22, LIGHT_TIME_MAP_Q23, getActiveQuarter, getTimeData, LightTimeEntrySchema, CoordinatesSchema, QUARTER_COLORS } from "./types";
