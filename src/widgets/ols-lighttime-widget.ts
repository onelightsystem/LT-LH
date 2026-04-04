// OLS Light Time Widget – v1.1 (standalone, no framework required)
// @onelightsystem/light-time/widgets/light-time
// License: MIT — https://github.com/onelightsystem/light-time
// CSP-friendly: no inline styles injected via JS, no eval()

/** Light Time labels indexed by 24h clock (0 = midnight, 23 = 11 PM) */
const lightTimeMap: readonly string[] = [
  "7dh", "8dh", "9dh", "10dh", "11dh", "12dh",   // 12AM-5AM
  "1LH", "2LH", "3LH", "4LH",  "5LH",  "6LH",   // 6AM-11AM
  "7LH", "8LH", "9LH", "10LH", "11LH", "12LH",   // 12PM-5PM
  "1dh", "2dh", "3dh", "4dh",  "5dh",  "6dh",     // 6PM-11PM
] as const;

const sunSVG =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ols-lighttime-sun" aria-hidden="true">' +
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

function getCurrentLightTime(): string {
  const hours = new Date().getHours();
  return lightTimeMap[hours] ?? lightTimeMap[0] ?? "7dh";
}

export interface LightTimeWidgetOptions {
  /** Container element id. Default: "ols-lighttime-widget" */
  containerId?: string;
  /** Auto-refresh interval in ms. Default: 60000 (1 min) */
  refreshInterval?: number;
  /** Link target URL. Default: "https://www.olsme.com/OLSCalendarTime" */
  linkUrl?: string;
}

/**
 * Initialize the OLS Light Time vanilla widget inside a given container.
 * Renders the current Light Hour / dark hour toggle with auto-refresh.
 */
export function initLightTimeWidget(options?: LightTimeWidgetOptions): void {
  const containerId = options?.containerId ?? "ols-lighttime-widget";
  const refreshInterval = options?.refreshInterval ?? 60_000;
  const linkUrl = options?.linkUrl ?? "https://www.olsme.com/OLSCalendarTime";

  const container = document.getElementById(containerId);
  if (!container) return;

  function render(): void {
    if (!container) return;
    const lt = getCurrentLightTime();
    const isDh = lt.includes("dh");
    const modeClass = isDh ? "ols-lighttime-toggle--dh" : "ols-lighttime-toggle--lh";

    container.innerHTML =
      `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" ` +
      `class="ols-lighttime-link" ` +
      `title="Current Light Time: ${lt} – View OLS Calendar Time" ` +
      `aria-label="Current Light Time: ${lt}. Click to view OLS Calendar Time">` +
      sunSVG +
      `<div class="ols-lighttime-toggle ${modeClass}">${lt}</div>` +
      "</a>";
  }

  render();
  setInterval(render, refreshInterval);
}

// Expose for direct script usage (vanilla <script> tag)
if (typeof window !== "undefined") {
  (window as unknown as Record<string, unknown>).initLightTimeWidget = initLightTimeWidget;
}
