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
  /** Day number since the Light Calendar epoch (Dec 22, 2024 by default) */
  day: number;
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
  /** Calendar epoch start date. Default: 2024-12-22 (Winter Solstice) */
  epochDate?: string;
  /** Light Year base. Default: 3406 */
  lightYearBase?: number;
  /** Refresh interval in ms for widgets. Default: 60000 (1 min) */
  refreshInterval?: number;
}

// ─── Static Data ──────────────────────────────────────────
export const LIGHT_TIME_MAP: readonly LightTimeEntry[] = [
  { old12: "12:00AM", old24: "00:00", lightTime: "7dh" },
  { old12: "1:00AM", old24: "1:00", lightTime: "8dh" },
  { old12: "2:00AM", old24: "2:00", lightTime: "9dh" },
  { old12: "3:00AM", old24: "3:00", lightTime: "10dh" },
  { old12: "4:00AM", old24: "4:00", lightTime: "11dh" },
  { old12: "5:00AM", old24: "5:00", lightTime: "12dh" },
  { old12: "6:00AM", old24: "6:00", lightTime: "1LH" },
  { old12: "7:00AM", old24: "7:00", lightTime: "2LH" },
  { old12: "8:00AM", old24: "8:00", lightTime: "3LH" },
  { old12: "9:00AM", old24: "9:00", lightTime: "4LH" },
  { old12: "10:00AM", old24: "10:00", lightTime: "5LH" },
  { old12: "11:00AM", old24: "11:00", lightTime: "6LH" },
  { old12: "12:00PM", old24: "12:00", lightTime: "7LH" },
  { old12: "1:00PM", old24: "13:00", lightTime: "8LH" },
  { old12: "2:00PM", old24: "14:00", lightTime: "9LH" },
  { old12: "3:00PM", old24: "15:00", lightTime: "10LH" },
  { old12: "4:00PM", old24: "16:00", lightTime: "11LH" },
  { old12: "5:00PM", old24: "17:00", lightTime: "12LH" },
  { old12: "6:00PM", old24: "18:00", lightTime: "1dh" },
  { old12: "7:00PM", old24: "19:00", lightTime: "2dh" },
  { old12: "8:00PM", old24: "20:00", lightTime: "3dh" },
  { old12: "9:00PM", old24: "21:00", lightTime: "4dh" },
  { old12: "10:00PM", old24: "22:00", lightTime: "5dh" },
  { old12: "11:00PM", old24: "23:00", lightTime: "6dh" },
] as const;
