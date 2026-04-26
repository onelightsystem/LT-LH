import { describe, it, expect } from "vitest";
import { getLightHour, getLightDay, validateCoordinates, formatLightTime, formatLightDay, getLightTimeTable } from "../core";
import { getActiveQuarter, getTimeData } from "../types";

describe("getLightHour", () => {
  it("returns 7dh for hour 0 (midnight) on Q2.2 date", () => {
    const result = getLightHour(0, new Date(2026, 3, 1));
    expect(result.lightTime).toBe("7dh");
    expect(result.isDarkHour).toBe(true);
  });

  it("returns 1LH for hour 6 (6 AM)", () => {
    const result = getLightHour(6);
    expect(result.lightTime).toBe("1LH");
    expect(result.isLightHour).toBe(true);
  });

  it("returns 7LH for hour 12 (noon)", () => {
    const result = getLightHour(12);
    expect(result.lightTime).toBe("7LH");
    expect(result.isLightHour).toBe(true);
  });

  it("returns 13LH for hour 18 (6 PM) in Q2.2/Q2.3", () => {
    const result = getLightHour(18, new Date(2026, 3, 1));
    expect(result.lightTime).toBe("13LH");
    expect(result.isLightHour).toBe(true);
  });

  it("returns 1dh for hour 19 (7 PM)", () => {
    const result = getLightHour(19, new Date(2026, 3, 1));
    expect(result.lightTime).toBe("1dh");
    expect(result.isDarkHour).toBe(true);
  });

  it("clamps out-of-range input", () => {
    expect(getLightHour(-1).hourIndex).toBe(0);
    expect(getLightHour(99).hourIndex).toBe(23);
  });

  it("defaults to current hour when no argument", () => {
    const result = getLightHour();
    expect(result.hourIndex).toBeGreaterThanOrEqual(0);
    expect(result.hourIndex).toBeLessThanOrEqual(23);
  });

  it("getLightHour at midnight on Apr 23 returns 6dh (Q2.3)", () => {
    const result = getLightHour(0, new Date(2026, 3, 23));
    expect(result.lightTime).toBe("6dh");
    expect(result.isDarkHour).toBe(true);
  });

  it("getLightHour at midnight on Apr 1 returns 7dh (Q2.2)", () => {
    const result = getLightHour(0, new Date(2026, 3, 1));
    expect(result.lightTime).toBe("7dh");
  });
});

describe("getActiveQuarter", () => {
  it("returns Q2.2 on Apr 1", () => {
    expect(getActiveQuarter(new Date(2026, 3, 1))).toBe("Q2.2");
  });

  it("returns Q2.3 on Apr 23", () => {
    expect(getActiveQuarter(new Date(2026, 3, 23))).toBe("Q2.3");
  });
});

describe("getTimeData", () => {
  it("midnight on Apr 23 is 6dh (Q2.3)", () => {
    expect(getTimeData(new Date(2026, 3, 23))[0]!.lightTime).toBe("6dh");
  });

  it("midnight on Apr 1 is 7dh (Q2.2)", () => {
    expect(getTimeData(new Date(2026, 3, 1))[0]!.lightTime).toBe("7dh");
  });
});

describe("getLightDay", () => {
  it("returns day 1 for epoch date", () => {
    const result = getLightDay(new Date("2025-12-23"));
    expect(result.day).toBe(1);
    expect(result.quarter).toBe(1);
    expect(result.year).toBe(3406);
  });

  it("returns Q2 for spring equinox (day 85)", () => {
    const epoch = new Date("2025-12-23");
    const equinox = new Date(epoch.getTime() + 84 * 24 * 60 * 60 * 1000);
    const result = getLightDay(equinox);
    expect(result.quarter).toBe(2);
  });

  it("returns correct quarterLabel format", () => {
    const result = getLightDay(new Date("2025-12-23"));
    expect(result.quarterLabel).toBe("Q1");
  });

  it("respects custom config", () => {
    const result = getLightDay(new Date("2025-12-23"), {
      epochDate: "2025-12-23",
      lightYearBase: 1000,
    });
    expect(result.year).toBe(1000);
  });

  it("returns day 1 for epoch using local-date constructor (timezone-safe)", () => {
    // new Date(y, m-1, d) creates local midnight, so getDate() always returns 23
    // regardless of the runtime timezone — verifying no UTC ±1 day shift occurs.
    const epochLocal = new Date(2025, 11, 23); // Dec 23, 2025 local midnight
    const result = getLightDay(epochLocal);
    expect(result.day).toBe(1);
    expect(result.quarter).toBe(1);
    expect(result.year).toBe(3406);
  });

  it("epochDate string is parsed as local calendar date (timezone-safe)", () => {
    // Both the date arg (local midnight via new Date(y,m-1,d)) and the epochDate
    // string ("2025-12-23" split on '-') resolve to Dec 23, so day must be 1
    // regardless of runtime timezone.
    const epochLocal = new Date(2025, 11, 23); // Dec 23, 2025 local midnight
    const result = getLightDay(epochLocal, { epochDate: "2025-12-23" });
    expect(result.day).toBe(1);
  });

  it("returns 125LD on Apr 26, 2026", () => {
    const result = getLightDay(new Date(2026, 3, 26));
    expect(result.day).toBe(125);
  });
});

describe("validateCoordinates", () => {
  it("accepts valid coordinates", () => {
    const c = validateCoordinates(37.52, -122.27);
    expect(c.lat).toBe(37.52);
    expect(c.lng).toBe(-122.27);
  });

  it("rejects lat > 90", () => {
    expect(() => validateCoordinates(91, 0)).toThrow();
  });

  it("rejects lat < -90", () => {
    expect(() => validateCoordinates(-91, 0)).toThrow();
  });

  it("rejects lng < -180", () => {
    expect(() => validateCoordinates(0, -181)).toThrow();
  });

  it("rejects lng > 180", () => {
    expect(() => validateCoordinates(0, 181)).toThrow();
  });
});

describe("formatLightTime", () => {
  it("formats compact Light Hour", () => {
    expect(formatLightTime("3LH")).toBe("3 LH");
  });

  it("formats compact dark hour", () => {
    expect(formatLightTime("9dh")).toBe("9 dh");
  });

  it("formats verbose Light Hour", () => {
    expect(formatLightTime("3LH", true)).toBe("3 LH (Light Hour)");
  });

  it("formats verbose dark hour", () => {
    expect(formatLightTime("9dh", true)).toBe("9 dh (dark hour)");
  });

  it("returns input for invalid format", () => {
    expect(formatLightTime("invalid")).toBe("invalid");
  });
});

describe("formatLightDay", () => {
  it("formats day info correctly", () => {
    const info = { day: 102, quarter: 2, quarterLabel: "Q2", year: 3406 };
    expect(formatLightDay(info)).toBe("Day 102 · Q2 · Year 3406");
  });
});

describe("getLightTimeTable", () => {
  it("returns 24 entries", () => {
    const table = getLightTimeTable();
    expect(table).toHaveLength(24);
  });

  it("first entry is midnight (7dh) on Q2.2 date", () => {
    const table = getLightTimeTable(new Date(2026, 3, 1));
    expect(table[0]?.lightTime).toBe("7dh");
  });

  it("last entry is 11PM (5dh)", () => {
    const table = getLightTimeTable();
    expect(table[23]?.lightTime).toBe("5dh");
  });
});
