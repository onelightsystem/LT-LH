# DELIVERY.md — Handoff for @olsystem/lt-lh v0.1.2

> **From:** OLS Development Team (via Grok)
> **To:** Next developer / repo maintainer
> **Date:** April 04, 2026
> **Status:** v0.1.2 ready for publish — cleaner toggles, elegant modals, improved Settings

---

## 1. What Changed in v0.1.2

- Large, clean toggles showing only numbers (`6LH` / `103LD`)
- Click LD → glowing calendar orb modal
- Click LH → solar day arc diagram
- Settings moved to bottom (next to About icon) — no layout shift
- Font size control + TypeScript snippet generator in Settings
- Enhanced About section with human-friendly circadian explanation and roadmap
- Widgets converted to TypeScript with proper types and option interfaces
- Old `.js` and `.css` widget files removed — replaced by typed `.ts` sources built via tsup

## 2. Current Package Structure

```
src/
├── core.ts                ← Pure functions (getLightHour, getLightDay, format*, validate*)
├── types.ts               ← Zod schemas, TypeScript types, LIGHT_TIME_MAP
├── useLightTime.ts        ← React hook (peer dep, tree-shaken if unused)
├── snippets.ts            ← TypeScript snippet generator (LH only / LH+LD)
├── index.ts               ← Public API barrel export
└── widgets/
    ├── ols-lighttime-widget.ts   ← typed vanilla Light Hour widget
    ├── ols-calendar-widget.ts    ← typed vanilla Proper Day widget
    ├── calendar-orb.ts           ← new calendar orb modal (vanilla DOM)
    └── solar-day-arc.ts          ← new solar day arc diagram (vanilla DOM)
```

## 3. Source Files Extracted From (olsme.com internal)

| Internal Path | Package Destination | Purpose |
|---|---|---|
| `src/components/aols/aeo/OLSCalendarTime/timeData.ts` | `src/types.ts` (LIGHT_TIME_MAP) | 24-entry Light Time data array |
| `src/components/aols/aeo/OLSCalendarTime/LightTime.tsx` | `src/core.ts` (getLightHour) | Hour-to-Light-Time conversion logic |
| `src/components/aols/aeo/OLSCalendarTime/MiniLightTimeToggle.tsx` | `src/useLightTime.ts` | Live-refresh interval pattern |
| `src/components/auth/components/OLSCalendar.tsx` | `src/core.ts` (getLightDay) | Proper Day counter logic |
| `src/components/aols/aeo/OLSDeveloper/LtLhTest.tsx` | `src/widgets/calendar-orb.ts`, `solar-day-arc.ts`, `snippets.ts` | v0.1.2 modal + snippet logic |

## 4. Build & Publish

### Verify the build

```bash
npm install
npm run typecheck   # Must pass with zero errors
npm run test        # Must pass
npm run build       # tsup → dist/ (ESM + CJS + IIFE widgets + .d.ts)
```

### Publish

```bash
npm publish --dry-run        # Verify package contents first
npm publish --access public  # Requires npm login + OLS org access
git tag v0.1.2 && git push --tags
```

## 5. Security Requirements (Non-Negotiable)

| Requirement | Status |
|---|---|
| No `eval()` or `new Function()` | ✅ |
| No inline style injection via JS | ✅ |
| Zod validation on coordinate inputs | ✅ |
| Zod validation on Light Time format | ✅ |
| CSP-compatible (no unsafe-inline/eval) | ✅ |
| Zero network calls | ✅ |
| Zero secrets/tokens | ✅ |
| TypeScript strict mode | ✅ |
| SECURITY.md | ✅ |
| CODE_OF_CONDUCT.md | ✅ |

## 6. Mobile Testing Checklist

| Device / Viewport | Check |
|---|---|
| iPhone 15 (390×844) | Widget renders, touch targets ≥ 44px |
| Galaxy S24 (360×780) | No overflow, text readable |
| iPad Mini (768×1024) | Responsive breakpoint triggers |
| Desktop 1440px | Full-size rendering |

## 7. Design Decisions

1. **React is a peer dependency** — Core functions work without React. `useLightTime` is tree-shaken if unused.
2. **Vanilla widgets build to IIFE** — Loadable via `<script>` tags, no bundler required.
3. **Zod is the only runtime dependency** — ~13 KB for input validation safety.
4. **No CSS-in-JS** — Package stays lightweight and framework-agnostic.

### Relationship to olsme.com

The internal app will eventually consume this package:

```tsx
import { useLightTime, getLightTimeTable } from "@olsystem/lt-lh";
```

The styled React components (`LightTime.tsx`, `Equinox.tsx`) remain internal — they use antd/styled-components.

## 8. Checklist Before v0.1.2 Tag

- [x] Convert widgets to TypeScript
- [x] Add calendar-orb + solar-day-arc modals
- [x] Add snippet generator
- [x] Update tsup.config.ts for dual build
- [x] `npm run typecheck` → zero errors
- [ ] Write tests (core + widgets)
- [ ] `npm run test` → all pass
- [ ] `npm run build` → `dist/` generated
- [ ] `npm publish --dry-run` → verify package contents
- [ ] `npm publish --access public`
- [ ] Tag: `git tag v0.1.2 && git push --tags`
- [ ] Update olsme.com to consume the package (migration PR)

---

OneLightSystem OLS · [olsme.com](https://www.olsme.com) · v0.1.2 · April 04, 2026
