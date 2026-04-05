// @onelightsystem/light-time — Pure logic functions (no React dependency)
// Extracted & generalized from olsme.com LightTime.tsx, OLSCalendar.tsx, MiniLightTimeToggle.tsx

import {
  LIGHT_TIME_MAP,
  CoordinatesSchema,
  type LightHourResult,
  type LightDayInfo,
  type LightTimeConfig,
  type Coordinates,
} from "./types";

const DEFAULT_EPOCH = "2024-12-22";
const DEFAULT_LIGHT_YEAR_BASE = 3406;

// ─── Light Hour ───────────────────────────────────────────

/**
 * Get the current Light Time label for a given hour index (0–23).
 * Returns validated LightHourResult.
 */
export function getLightHour(hourIndex?: number): LightHourResult {
  const idx = hourIndex ?? new Date().getHours();
  const clamped = Math.max(0, Math.min(23, Math.floor(idx)));
  const entry = LIGHT_TIME_MAP[clamped];

  if (!entry) {
    return { lightTime: "7dh", isDarkHour: true, isLightHour: false, hourIndex: 0 };
  }

  const isDarkHour = entry.lightTime.endsWith("dh");
  return {
    lightTime: entry.lightTime,
    isDarkHour,
    isLightHour: !isDarkHour,
    hourIndex: clamped,
  };
}

/**
 * Get the full 24-entry Light Time conversion table.
 */
export function getLightTimeTable() {
  return LIGHT_TIME_MAP;
}

// ─── Light Day (Proper Day) ──────────────────────────────

/**
 * Calculate the Proper Day number relative to the epoch (Winter Solstice).
 * Also returns quarter and light year.
 */
export function getLightDay(
  date?: Date,
  config?: LightTimeConfig
): LightDayInfo {
  const epochStr = config?.epochDate ?? DEFAULT_EPOCH;
  const lightYearBase = config?.lightYearBase ?? DEFAULT_LIGHT_YEAR_BASE;

  // Parse epochStr as local calendar date to avoid UTC ±1 day shift from YYYY-MM-DD parsing.
  // Using Number() + isNaN guards ensures malformed epoch strings fall back to the default epoch.
  const defaultParts = DEFAULT_EPOCH.split("-").map(Number);
  const parts = epochStr.split("-").map(Number);
  const defaultEy = defaultParts[0]!;
  const defaultEm = defaultParts[1]!;
  const defaultEd = defaultParts[2]!;
  const ey = !isNaN(parts[0]!) ? parts[0]! : defaultEy;
  const em = !isNaN(parts[1]!) ? parts[1]! : defaultEm;
  const ed = !isNaN(parts[2]!) ? parts[2]! : defaultEd;
  const target = date ?? new Date();

  // Use Date.UTC day numbers (integer days since Unix epoch in UTC) to diff calendar days.
  // Extracting local Y/M/D from `target` and feeding into Date.UTC eliminates DST 23/25-hour days.
  const epochDayNum = Date.UTC(ey, em - 1, ed) / 86400000;
  const targetDayNum =
    Date.UTC(target.getFullYear(), target.getMonth(), target.getDate()) / 86400000;

  const day = Math.floor(targetDayNum - epochDayNum) + 1;

  // Quarter boundaries: Q1 = 1-84, Q2 = 85-176, Q3 = 177-267, Q4 = 268-365
  const dayInYear = ((day - 1) % 365) + 1;
  let quarter: number;
  if (dayInYear <= 84) quarter = 1;
  else if (dayInYear <= 176) quarter = 2;
  else if (dayInYear <= 267) quarter = 3;
  else quarter = 4;

  const yearOffset = Math.floor((day - 1) / 365);

  return {
    day,
    quarter,
    quarterLabel: `Q${quarter}`,
    year: lightYearBase + yearOffset,
  };
}

// ─── Coordinate Validation ────────────────────────────────

/**
 * Validate latitude/longitude coordinates using Zod schema.
 * Returns validated Coordinates or throws ZodError.
 */
export function validateCoordinates(lat: number, lng: number): Coordinates {
  return CoordinatesSchema.parse({ lat, lng });
}

// ─── Formatting Helpers ───────────────────────────────────

/**
 * Format a Light Time label for display.
 * e.g. "3LH" → "3 LH (Light Hour)" or "9dh" → "9 dh (dark hour)"
 */
export function formatLightTime(lightTime: string, verbose = false): string {
  const match = lightTime.match(/^(\d{1,2})(LH|dh)$/);
  if (!match) return lightTime;

  const [, num, suffix] = match;
  if (!verbose) return `${num} ${suffix}`;
  return suffix === "LH"
    ? `${num} LH (Light Hour)`
    : `${num} dh (dark hour)`;
}

/**
 * Format a Proper Day for display.
 * e.g. "Day 102 · Q2 · Year 3406"
 */
export function formatLightDay(info: LightDayInfo): string {
  return `Day ${info.day} · ${info.quarterLabel} · Year ${info.year}`;
}
