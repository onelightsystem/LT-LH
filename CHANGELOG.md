# Changelog

All notable changes to `@olsystem/lt-lh` are documented here.

---

## [0.2.3] — 2026-04-26

### Added
- **Seasonal table support** — `getLightHour()` and `getLightTimeTable()` now auto-select the correct season table based on the current date.
- Two named season tables: `LIGHT_TIME_MAP_Q22` (Q2.2: Mar 20 – Apr 22) and `LIGHT_TIME_MAP_Q23` (Q2.3: Apr 23 – ~May 4).
- New public API: `getActiveQuarter(date?)`, `getTimeData(date?)`, `QuarterKey` type.
- Date-aware overloads: `getLightHour(hourIndex?, date?)` and `getLightTimeTable(date?)`.

### Changed
- **13LH season active** — 6:00 PM is now `13LH` (not `1dh`) during Q2.2 and Q2.3. Dark hours reduce to 11dh; midnight shifts to `6dh` in Q2.3.
- **Corrected Proper Day epoch** — `getLightDay()` now counts from **Dec 23, 2025** (aligns with `olsme.com`). Apr 26, 2026 = **125LD**. Previously used Dec 22, 2024 which returned 491LD.

### Backward compatible
- `LIGHT_TIME_MAP` still exported — returns the current season's table.
- All existing `getLightHour(hourIndex)` and `getLightTimeTable()` call sites continue to work without changes.

---

## [0.1.2] — 2025

### Added
- Cleaner large toggles (only numbers — `6LH` / `103LD`)
- Elegant modals: click LD → glowing calendar orb, click LH → solar day arc diagram
- Draggable toggles + bottom Settings drawer
- Font size control + TypeScript snippet generator inside Settings
- Enhanced About section with circadian rhythm explanation and roadmap
- All widgets converted to TypeScript with proper types and option interfaces
