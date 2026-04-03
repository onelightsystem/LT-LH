// @onelightsystem/light-time — React hook for live Light Time updates
// Optional — only imported when React is available

import { useState, useEffect, useCallback } from "react";
import { getLightHour, getLightDay } from "./core";
import type { LightHourResult, LightDayInfo, LightTimeConfig } from "./types";

interface UseLightTimeReturn {
  /** Current Light Hour info */
  hour: LightHourResult;
  /** Current Proper Day info */
  day: LightDayInfo;
  /** Force a manual refresh */
  refresh: () => void;
}

/**
 * React hook that returns live Light Time data, auto-refreshing every interval.
 *
 * @param config - Optional LightTimeConfig for epoch, year base, refresh interval
 * @returns Live hour and day info with a manual refresh callback
 *
 * @example
 * ```tsx
 * import { useLightTime } from "@onelightsystem/light-time";
 *
 * function MyWidget() {
 *   const { hour, day } = useLightTime();
 *   return <div>{hour.lightTime} — Day {day.day}</div>;
 * }
 * ```
 */
export function useLightTime(config?: LightTimeConfig): UseLightTimeReturn {
  const interval = config?.refreshInterval ?? 60_000;

  const compute = useCallback(() => ({
    hour: getLightHour(),
    day: getLightDay(undefined, config),
  }), [config?.epochDate, config?.lightYearBase]);

  const [state, setState] = useState(compute);

  const refresh = useCallback(() => {
    setState(compute());
  }, [compute]);

  useEffect(() => {
    const id = setInterval(refresh, interval);
    return () => clearInterval(id);
  }, [refresh, interval]);

  return { ...state, refresh };
}
