// OLS Sun Light Calendar Widget – v2.1 (standalone, no framework required)
// @olsystem/lt-lh/widgets/calendar
// License: MIT — https://github.com/olsystem/lt-lh
// CSP-friendly: no inline styles via JS, no eval()

const DEFAULT_EPOCH = "2024-12-22";

const sunSVG =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ols-calendar-sun" aria-hidden="true">' +
  '<circle cx="12" cy="12" r="5" fill="#ffcc00"/>' +
  '<path d="M12 1V3" stroke="#ffcc00" stroke-width="2" stroke-linecap="round"/>' +
  '<path d="M12 21V23" stroke="#ffcc00" stroke-width="2" stroke-linecap="round"/>' +
  '<path d="M4.22 4.22L5.64 5.64" stroke="#ffcc00" stroke-width="2" stroke-linecap="round"/>' +
  '<path d="M18.36 18.36L19.78 19.78" stroke="#ffcc00" stroke-width="2" stroke-linecap="round"/>' +
  '<path d="M1 12H3" stroke="#ffcc00" stroke-width="2" stroke-linecap="round"/>' +
  '<path d="M21 12H23" stroke="#ffcc00" stroke-width="2" stroke-linecap="round"/>' +
  '<path d="M4.22 19.78L5.64 18.36" stroke="#ffcc00" stroke-width="2" stroke-linecap="round"/>' +
  '<path d="M18.36 5.64L19.78 4.22" stroke="#ffcc00" stroke-width="2" stroke-linecap="round"/>' +
  "</svg>";

export interface CalendarWidgetOptions {
  /** Container element id. Default: "ols-calendar-widget" */
  containerId?: string;
  /** Epoch start date (ISO string). Default: "2024-12-22" */
  epochDate?: string;
  /** Link target URL. Default: "https://www.olsme.com" */
  linkUrl?: string;
}

/**
 * Initialize the OLS Sun Light Calendar vanilla widget.
 * Renders the current Proper Day number since the Winter Solstice epoch.
 */
export function initCalendarWidget(options?: CalendarWidgetOptions): void {
  const containerId = options?.containerId ?? "ols-calendar-widget";
  const linkUrl = options?.linkUrl ?? "https://www.olsme.com";

  const container = document.getElementById(containerId);
  if (!container) return;

  const startStr = container.getAttribute("data-start-date") ?? options?.epochDate ?? DEFAULT_EPOCH;
  const [sy, sm, sd] = startStr.split("-").map(Number);
  const now = new Date();
  const todayUtcDay = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000;
  const startUtcDay = Date.UTC(sy!, sm! - 1, sd!) / 86400000;
  const totalDays = Math.floor(todayUtcDay - startUtcDay) + 1;
  const dayInYear = ((totalDays - 1) % 365) + 1;

  container.innerHTML =
    `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" ` +
    `class="ols-calendar-link" ` +
    `title="${dayInYear}LD — Sun Light Civilization – Join at olsme.com" ` +
    `aria-label="${dayInYear}LD of OLS Sun Light Calendar – Visit OneLightSystem OLS">` +
    sunSVG +
    `<div class="ols-calendar-day">${dayInYear}LD</div>` +
    "</a>";
}

function shouldExposeCalendarWidgetGlobally(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  const currentScript = document.currentScript;
  if (!(currentScript instanceof HTMLScriptElement)) {
    return false;
  }

  return currentScript.type !== "module";
}

// Expose for direct script usage (vanilla <script> tag) without adding
// a global side effect for ESM/module consumers.
if (shouldExposeCalendarWidgetGlobally()) {
  (window as unknown as Record<string, unknown>).initCalendarWidget = initCalendarWidget;
}
