// @onelightsystem/light-time — Core data & types
// Extracted from olsme.com internal timeData.ts

import { z } from "zod";

// ─── Schemas ──────────────────────────────────────────────
export const LightTimeEntrySchema = z.object({
  old12: z.string(),
  old24: z.string(),
  lightTime: z.string().regex(/^\d{1,2}(LH|dh)$/, "Must be e.g. 7LH or 3dh"),
});

export const CoordinatesSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

// ─── Types ────────────────────────────────────────────────
export type LightTimeEntry = z.infer<typeof LightTimeEntrySchema>;
export type Coordinates = z.infer<typeof CoordinatesSchema>;

export interface LightDayInfo {
  /** Day number since the Light Calendar epoch (2025-12-23 by default) */
  day: number;
  /** Day number within the current Light Year (1–365) */
  dayOfYear: number;
  /** Quarter number (1–4) */
  quarter: number;
  /** Quarter label, e.g. "Q2" */
  quarterLabel: string;
  /** Light year number */
  year: number;
}

export interface LightHourResult {
  /** Current Light Time label, e.g. "3LH" or "9dh" */
  lightTime: string;
  /** Whether current hour is a dark hour */
  isDarkHour: boolean;
  /** Whether current hour is a Light Hour */
  isLightHour: boolean;
  /** Index (0-23) of the hour */
  hourIndex: number;
}

// ─── Configuration ────────────────────────────────────────
export interface LightTimeConfig {
  /** Calendar epoch start date. Default: 2025-12-23 (Proper Day epoch) */
  epochDate?: string;
  /** Light Year base. Default: 3406 */
  lightYearBase?: number;
  /** Refresh interval in ms for widgets. Default: 60000 (1 min) */
  refreshInterval?: number;
}

// ─── Quarter types ─────────────────────────────────────────
export type QuarterKey = "Q2.2" | "Q2.3";

// ─── Q2.2: Mar 20 – Apr 22 ─────────────────────────────────
// 13LH (6AM–6PM), 11dh total, midnight = 7dh
export const LIGHT_TIME_MAP_Q22: readonly LightTimeEntry[] = [
  { old12: "12:00AM", old24: "00:00", lightTime: "7dh" },
  { old12: "1:00AM",  old24: "1:00",  lightTime: "8dh" },
  { old12: "2:00AM",  old24: "2:00",  lightTime: "9dh" },
  { old12: "3:00AM",  old24: "3:00",  lightTime: "10dh" },
  { old12: "4:00AM",  old24: "4:00",  lightTime: "11dh" },
  { old12: "5:00AM",  old24: "5:00",  lightTime: "12dh" },
  { old12: "6:00AM",  old24: "6:00",  lightTime: "1LH" },
  { old12: "7:00AM",  old24: "7:00",  lightTime: "2LH" },
  { old12: "8:00AM",  old24: "8:00",  lightTime: "3LH" },
  { old12: "9:00AM",  old24: "9:00",  lightTime: "4LH" },
  { old12: "10:00AM", old24: "10:00", lightTime: "5LH" },
  { old12: "11:00AM", old24: "11:00", lightTime: "6LH" },
  { old12: "12:00PM", old24: "12:00", lightTime: "7LH" },
  { old12: "1:00PM",  old24: "13:00", lightTime: "8LH" },
  { old12: "2:00PM",  old24: "14:00", lightTime: "9LH" },
  { old12: "3:00PM",  old24: "15:00", lightTime: "10LH" },
  { old12: "4:00PM",  old24: "16:00", lightTime: "11LH" },
  { old12: "5:00PM",  old24: "17:00", lightTime: "12LH" },
  { old12: "6:00PM",  old24: "18:00", lightTime: "13LH" },
  { old12: "7:00PM",  old24: "19:00", lightTime: "1dh" },
  { old12: "8:00PM",  old24: "20:00", lightTime: "2dh" },
  { old12: "9:00PM",  old24: "21:00", lightTime: "3dh" },
  { old12: "10:00PM", old24: "22:00", lightTime: "4dh" },
  { old12: "11:00PM", old24: "23:00", lightTime: "5dh" },
] as const;

// ─── Q2.3: Apr 23 – ~May 4 ─────────────────────────────────
// 13LH (6AM–6PM), 11dh total, midnight = 6dh
export const LIGHT_TIME_MAP_Q23: readonly LightTimeEntry[] = [
  { old12: "12:00AM", old24: "00:00", lightTime: "6dh" },
  { old12: "1:00AM",  old24: "1:00",  lightTime: "7dh" },
  { old12: "2:00AM",  old24: "2:00",  lightTime: "8dh" },
  { old12: "3:00AM",  old24: "3:00",  lightTime: "9dh" },
  { old12: "4:00AM",  old24: "4:00",  lightTime: "10dh" },
  { old12: "5:00AM",  old24: "5:00",  lightTime: "11dh" },
  { old12: "6:00AM",  old24: "6:00",  lightTime: "1LH" },
  { old12: "7:00AM",  old24: "7:00",  lightTime: "2LH" },
  { old12: "8:00AM",  old24: "8:00",  lightTime: "3LH" },
  { old12: "9:00AM",  old24: "9:00",  lightTime: "4LH" },
  { old12: "10:00AM", old24: "10:00", lightTime: "5LH" },
  { old12: "11:00AM", old24: "11:00", lightTime: "6LH" },
  { old12: "12:00PM", old24: "12:00", lightTime: "7LH" },
  { old12: "1:00PM",  old24: "13:00", lightTime: "8LH" },
  { old12: "2:00PM",  old24: "14:00", lightTime: "9LH" },
  { old12: "3:00PM",  old24: "15:00", lightTime: "10LH" },
  { old12: "4:00PM",  old24: "16:00", lightTime: "11LH" },
  { old12: "5:00PM",  old24: "17:00", lightTime: "12LH" },
  { old12: "6:00PM",  old24: "18:00", lightTime: "13LH" },
  { old12: "7:00PM",  old24: "19:00", lightTime: "1dh" },
  { old12: "8:00PM",  old24: "20:00", lightTime: "2dh" },
  { old12: "9:00PM",  old24: "21:00", lightTime: "3dh" },
  { old12: "10:00PM", old24: "22:00", lightTime: "4dh" },
  { old12: "11:00PM", old24: "23:00", lightTime: "5dh" },
] as const;

// ─── Season selector ────────────────────────────────────────
// Add new quarter rows here as seasons progress.
const QUARTER_TABLE: Array<{
  from: [number, number]; // [month 0-indexed, day] inclusive
  to:   [number, number];
  key:  QuarterKey;
}> = [
  { from: [2, 20], to: [3, 22], key: 'Q2.2' }, // Mar 20 – Apr 22
  { from: [3, 23], to: [4,  4], key: 'Q2.3' }, // Apr 23 – May 4
];

const QUARTER_DATA: Record<QuarterKey, readonly LightTimeEntry[]> = {
  'Q2.2': LIGHT_TIME_MAP_Q22,
  'Q2.3': LIGHT_TIME_MAP_Q23,
};

export function getActiveQuarter(now: Date = new Date()): QuarterKey {
  const m = now.getMonth();
  const d = now.getDate();
  for (const q of QUARTER_TABLE) {
    const afterFrom = m > q.from[0] || (m === q.from[0] && d >= q.from[1]);
    const beforeTo  = m < q.to[0]   || (m === q.to[0]   && d <= q.to[1]);
    if (afterFrom && beforeTo) return q.key;
  }
  return 'Q2.3'; // default: latest known quarter
}

export function getTimeData(now: Date = new Date()): readonly LightTimeEntry[] {
  return QUARTER_DATA[getActiveQuarter(now)];
}

// Backward-compatible alias — snapshot of the active quarter at module import time.
// This value does not update automatically in long-running processes; use
// `getTimeData(now?)` for dynamic, date/season-aware behavior.
export const LIGHT_TIME_MAP: readonly LightTimeEntry[] = getTimeData();
