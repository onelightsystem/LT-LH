# @olsystem/lt-lh

> OLS Sun Light Time system — Light Hour (LH) / dark hour (dh) conversion, Proper Day (LD) counter, and embeddable widgets for the OneLightSystem Light Calendar.

[![npm version](https://img.shields.io/npm/v/@olsystem/lt-lh)](https://www.npmjs.com/package/@olsystem/lt-lh)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](./LICENSE)

---

## What Is Light Time?

The **OLS Light Calendar** helps you align with the Sun's natural rhythm instead of arbitrary clock time.

- **Light Hour (LH)**: 1LH–13LH = 6:00 AM to 6:00 PM (your natural daylight energy window)
- **Dark Hour (dh)**: 1dh–11dh = 7:00 PM to 5:00 AM (rest and recovery window, Q2.3)
- **Light Day (LD)**: Day count since Winter Solstice (Dec 23, 2025)
- **Light Year**: Currently 3406 (starting from the first known Sun Light Meditation)

At 11:25 AM traditional time you may already be in **6LH** — halfway through your natural light day. This simple awareness supports better circadian health, meditation timing, and daily energy flow.

## Installation

```bash
npm install @olsystem/lt-lh
```

## Quick Start

### React Hook (Recommended)

```tsx
import { useLightTime } from '@olsystem/lt-lh';

function LightTimeDisplay() {
  const { hour, day } = useLightTime();

  return (
    <div>
      <div className="light-time-value">{hour.lightTime}</div>
      <div>Light Day {day.day} • {day.quarterLabel} • Year {day.year}</div>
    </div>
  );
}

// Add this to your app stylesheet:
// .light-time-value {
//   font-size: 3rem;
//   font-weight: 800;
// }
```

### TypeScript / JavaScript

```ts
import { getLightHour, getLightDay } from '@olsystem/lt-lh';

const hour = getLightHour();
console.log(hour.lightTime);        // "6LH"
console.log(hour.isLightHour);      // true

const day = getLightDay();
console.log(`Day ${day.day} • ${day.quarterLabel} • Year ${day.year}`);
```

### Embeddable Vanilla Widgets (No build tools)

```html
<!-- Light Hour Widget -->
<div id="ols-lighttime-widget"></div>
<script src="https://cdn.jsdelivr.net/npm/@olsystem/lt-lh/dist/widgets/ols-lighttime-widget.global.js"></script>
<script>initLightTimeWidget();</script>

<!-- Proper Day Widget -->
<div id="ols-calendar-widget" data-start-date="2024-12-22"></div>
<script src="https://cdn.jsdelivr.net/npm/@olsystem/lt-lh/dist/widgets/ols-calendar-widget.global.js"></script>
<script>initCalendarWidget();</script>
```

> **Styling note:** No CSS is shipped with this package. The widgets render semantic HTML with BEM-style class names (`ols-lighttime-*`, `ols-calendar-*`, `ols-orb-*`, `ols-arc-*`). Your host page must provide the styles for these class names.

## API Reference

| Function | Description |
|---|---|
| `getLightHour(hourIndex?, date?)` | Current Light Hour result (season-aware) |
| `getLightDay(date?, config?)` | Proper Day + quarter + year |
| `useLightTime(config?)` | React hook with auto-refresh (default 60s) |
| `getLightTimeTable(date?)` | Full 24-entry conversion table (season-aware) |
| `formatLightTime(lightTime, verbose?)` | Format Light Time label for display |
| `formatLightDay(info)` | Format day info for display |
| `validateCoordinates(lat, lng)` | Validate lat/lng via Zod schema |
| `generateSnippet(mode)` | Copy-ready TypeScript snippet (`"lh"` or `"lh+ld"`) |
| `getActiveQuarter(date?)` | Returns active `QuarterKey` e.g. `"Q2.3"` |
| `getTimeData(date?)` | Returns the season table for a given date |

### Types

```ts
interface LightTimeConfig {
  epochDate?: string;       // Default: "2024-12-22"
  lightYearBase?: number;   // Default: 3406
  refreshInterval?: number; // Default: 60000 (ms)
}
```

## New in v0.2.3

- **Seasonal table support** — `getLightHour()` and `getLightTimeTable()` now auto-select the correct season table based on the current date (Q2.2 / Q2.3)
- **13LH season** — 6:00 PM is now `13LH` (not `1dh`) during Q2.2 and Q2.3; dark hours reduce to 11dh, midnight shifts to `6dh`
- **Corrected Proper Day epoch** — `getLightDay()` now counts from Dec 23, 2025 (matching `olsme.com`); today (Apr 26, 2026) correctly returns **125LD**
- **New public API** — `getActiveQuarter()`, `getTimeData(date?)`, `LIGHT_TIME_MAP_Q22`, `LIGHT_TIME_MAP_Q23`, `QuarterKey` type
- **Date-aware overloads** — `getLightHour(hourIndex?, date?)` and `getLightTimeTable(date?)` accept an optional date for testing and historical queries
- **`LIGHT_TIME_MAP` backward-compatible** — still exported; returns current season's table

## New in v0.1.2

- Cleaner large toggles (only numbers — `6LH` / `103LD`)
- Elegant modals: click LD → glowing calendar orb, click LH → solar day arc diagram
- Draggable toggles + bottom Settings drawer
- Font size control + TypeScript snippet generator inside Settings
- Enhanced About section with circadian rhythm explanation and roadmap
- All widgets converted to TypeScript with proper types and option interfaces

## Light Time Reference Table

| Old 12h  | Old 24h | Light Time |
|----------|---------|------------|
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
| 6:00 PM  | 18:00   | **13LH**   |
| 7:00 PM  | 19:00   | 1dh        |

*(Full table available via `getLightTimeTable()`. Season tables: Q2.2 midnight=7dh · Q2.3 midnight=6dh)*

## Browser Support

- Modern browsers (Chrome 80+, Firefox 78+, Safari 14+, Edge 80+)
- Vanilla widgets are intended for the same modern browser baseline; ES5 output is not currently guaranteed by the build configuration
- No `eval()` and no network calls; the shipped vanilla widgets do not rely on inline `style` attributes, so they do not require `style-src 'unsafe-inline'` on that basis

## For Everyone

Install `@olsystem/lt-lh` on any website, browser extension, or desktop widget.
No tracking. No login. Just sunlight truth.

**Why it matters:** At `6LH` you have already lived half your natural daylight window. This helps individuals align sleep, activity, and Sun Light Meditation with real solar cycles — supporting better circadian health.

## License

[MIT](./LICENSE) — OneLightSystem OLS · [olsme.com](https://www.olsme.com)
