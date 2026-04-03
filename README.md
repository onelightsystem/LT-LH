# @onelightsystem/LT-LH

> OLS Sun Light Time system — Light Time and Light Hour / dark hour conversion, Proper Day counter, and embeddable widgets for the OneLightSystem Light Calendar.

[![npm version](https://img.shields.io/npm/v/@olsystem/lt-lh)](https://www.npmjs.com/package/@olsystem/lt-lh)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](./LICENSE)

---

## What Is Light Time?

The **OLS Light Calendar** redefines time measurement around the Sun's natural cycle. Instead of arbitrary AM/PM hours, it uses:

**LT-LH** (Light Time – Light Hour)
- **LH (Light Hours):** 1LH–12LH → 6:00 AM to 5:00 PM (sun hours)
- **dh (dark hours):** 1dh–12dh → 6:00 PM to 5:00 AM (dark hours)

**LT-LD** (Light Time – Light Day)
- **Light Day (LD):** Day count since the Winter Solstice (shortest day) epoch (Dec 22, 2024)
- **Light Year 3406:** Counting from the first known Sun Light Meditation

## Installation

```bash
npm install @olsystem/lt-lh
```

## Quick Start

### Pure JavaScript (no framework)

```js
import { getLightHour, getLightDay, formatLightTime, formatLightDay } from "@olsystem/lt-lh";

const hour = getLightHour();
console.log(hour.lightTime);     // "3LH"
console.log(hour.isLightHour);   // true

const day = getLightDay();
console.log(formatLightDay(day)); // "Day 102 · Q2 · Year 3406"
```

### React Hook

```tsx
import { useLightTime } from "@olsystem/lt-lh";

function LightTimeDisplay() {
  const { hour, day } = useLightTime();

  return (
    <div>
      <span>{hour.lightTime}</span>
      <span>Day {day.day} · {day.quarterLabel} · Year {day.year}</span>
    </div>
  );
}
```

### Embeddable Widget (HTML)

No build tools needed — drop into any HTML page:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@olsystem/lt-lh/dist/widgets/ols-lighttime-widget.css">
<div id="ols-lighttime-widget"></div>
<script src="https://cdn.jsdelivr.net/npm/@olsystem/lt-lh/dist/widgets/ols-lighttime-widget.js"></script>
```

### Light Day Widget (HTML)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@olsystem/lt-lh/dist/widgets/ols-calendar-widget.css">
<div id="ols-calendar-widget" data-start-date="2024-12-22"></div>
<script src="https://cdn.jsdelivr.net/npm/@olsystem/lt-lh/dist/widgets/ols-calendar-widget.js"></script>
```

## API Reference

### `getLightHour(hourIndex?: number): LightHourResult`

Returns the Light Time – Light Hour (LT-LH) label for a given hour (0–23). Defaults to current hour.

### `getLightDay(date?: Date, config?: LightTimeConfig): LightDayInfo`

Returns Light Time – Light Day (LT-LD) info: Light Day number, quarter, and Light Year for a given date. Display shows LD by default; quarter and year are optional.

### `getLightTimeTable(): LightTimeEntry[]`

Returns the full 24-entry conversion table.

### `validateCoordinates(lat: number, lng: number): Coordinates`

Validates latitude (-90 to 90) and longitude (-180 to 180) via Zod. Throws on invalid input.

### `formatLightTime(lightTime: string, verbose?: boolean): string`

Formats a Light Time label. `verbose=true` → `"3 LH (Light Hour)"`.

### `formatLightDay(info: LightDayInfo): string`

Formats day info for display: `"LD 102"` or with options: `"LD 102 · Q2 · LY 3406"`.

### `useLightTime(config?: LightTimeConfig): UseLightTimeReturn` (React)

Hook that auto-refreshes Light Time every 60s (configurable). Returns `{ hour, day, refresh }`.

### Types

```ts
interface LightTimeConfig {
  epochDate?: string;      // Default: "2024-12-22"
  lightYearBase?: number;  // Default: 3406
  refreshInterval?: number; // Default: 60000 (ms)
}
```

## Light Time Reference

| Old 12h  | Old 24h | Light Time |
|----------|---------|------------|
| 12:00 AM | 00:00   | 7dh        |
| 1:00 AM  | 01:00   | 8dh        |
| 2:00 AM  | 02:00   | 9dh        |
| 3:00 AM  | 03:00   | 10dh       |
| 4:00 AM  | 04:00   | 11dh       |
| 5:00 AM  | 05:00   | 12dh       |
| 6:00 AM  | 06:00   | **1LH**    |
| 7:00 AM  | 07:00   | **2LH**    |
| 8:00 AM  | 08:00   | **3LH**    |
| 9:00 AM  | 09:00   | **4LH**    |
| 10:00 AM | 10:00   | **5LH**    |
| 11:00 AM | 11:00   | **6LH**    |
| 12:00 PM | 12:00   | **7LH**    |
| 1:00 PM  | 13:00   | **8LH**    |
| 2:00 PM  | 14:00   | **9LH**    |
| 3:00 PM  | 15:00   | **10LH**   |
| 4:00 PM  | 16:00   | **11LH**   |
| 5:00 PM  | 17:00   | **12LH**   |
| 6:00 PM  | 18:00   | 1dh        |
| 7:00 PM  | 19:00   | 2dh        |
| 8:00 PM  | 20:00   | 3dh        |
| 9:00 PM  | 21:00   | 4dh        |
| 10:00 PM | 22:00   | 5dh        |
| 11:00 PM | 23:00   | 6dh        |

## Browser Support

- Modern browsers (Chrome 80+, Firefox 78+, Safari 14+, Edge 80+)
- Widgets work in any browser supporting ES5 (IE11 compatible)
- CSP-friendly: no `eval()`, no inline styles via JS

## License

[MIT](./LICENSE) — OneLightSystem OLS · Belmont, CA · [olsme.com](https://www.olsme.com)
