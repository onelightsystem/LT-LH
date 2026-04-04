// @olsystem/lt-lh — Solar Day Arc modal (vanilla DOM)
// Renders an LH progress arc showing how far through the solar day the user is.
// CSP-friendly: uses CSS classes only, no eval().

import { getLightHour } from "../core";

export interface SolarDayArcOptions {
  /** Container element id. Default: "ols-solar-day-arc" */
  containerId?: string;
  /** Callback when the modal is dismissed */
  onClose?: () => void;
}

/** Step marker in the solar arc */
interface ArcStep {
  label: string;
  desc: string;
  active: boolean;
}

/**
 * Render a Solar Day Arc modal showing Light Hour progress through the day.
 *
 * Call `destroy()` on the returned object to remove it.
 */
export function createSolarDayArc(options?: SolarDayArcOptions) {
  const containerId = options?.containerId ?? "ols-solar-day-arc";
  const container = document.getElementById(containerId);
  if (!container) return null;

  const hourInfo = getLightHour();
  const displayHour = hourInfo.lightTime;

  function parseSolarHourNumber(
    lightTime: string,
    suffix: "LH" | "DH"
  ): number | null {
    const match = lightTime.match(
      new RegExp(`^\\s*(\\d{1,2})\\s*${suffix}\\s*$`, "i")
    );
    if (!match) return null;

    const solarHour = Number(match[1]);
    return solarHour >= 1 && solarHour <= 12 ? solarHour : null;
  }

  function getSolarDayProgressPct(): number {
    const maxLh = 12;

    if (hourInfo.isLightHour) {
      const currentLh = parseSolarHourNumber(displayHour, "LH");
      return currentLh !== null
        ? Math.min(100, Math.round((currentLh / maxLh) * 100))
        : 0;
    }

    const currentDh = parseSolarHourNumber(displayHour, "DH");
    if (currentDh === null) return 0;

    // Dark hours 1DH-6DH are after dusk (solar day completed),
    // while 7DH-12DH are before dawn (next solar day not started yet).
    return currentDh <= 6 ? 100 : 0;
  }

  const progressPct = getSolarDayProgressPct();
  const steps: ArcStep[] = [
    { label: "1LH", desc: "Dawn", active: false },
    { label: displayHour, desc: "Now", active: true },
    { label: "12LH", desc: "Dusk", active: false },
  ];

  const stepsHtml = steps
    .map(
      (s) =>
        `<div class="ols-arc-step${s.active ? " ols-arc-step--active" : ""}">
          <div class="ols-arc-step-bubble">${s.label}</div>
          <div class="ols-arc-step-label">${s.desc}</div>
        </div>`
    )
    .join("");

  const phaseText =
    progressPct >= 50 ? "past midday" : "before midday";
  const activityHint =
    progressPct < 30
      ? "gentle movement"
      : progressPct < 60
        ? "focused work or meditation"
        : "wind-down & reflection";

  const html = `
    <div class="ols-arc-backdrop" role="dialog" aria-modal="true" aria-label="Light Hour progress through the solar day">
      <div class="ols-arc-box">
        <button class="ols-arc-close" aria-label="Close light hour view">&times;</button>
        <div class="ols-arc-header">☀ Your solar day progress</div>
        <div class="ols-arc-pct">${progressPct}% of daylight complete</div>
        <div class="ols-arc-steps">${stepsHtml}</div>
        <div class="ols-arc-track">
          <div class="ols-arc-track-bg"></div>
          <progress class="ols-arc-track-fill" max="100" value="${progressPct}" aria-label="Daylight complete">
            ${progressPct}% of daylight complete
          </progress>
          <div class="ols-arc-track-labels">
            <span>Sunrise</span><span>Midday</span><span>Sunset</span>
          </div>
        </div>
        <div class="ols-arc-advice">
          <span class="ols-arc-advice-hour">${displayHour}</span>
          = ${phaseText} — ideal for ${activityHint}
        </div>
        <div class="ols-arc-hint">tap anywhere to close</div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Event handlers
  const backdrop = container.querySelector<HTMLElement>(".ols-arc-backdrop");
  const closeBtn = container.querySelector<HTMLElement>(".ols-arc-close");

  function dismiss() {
    container!.innerHTML = "";
    options?.onClose?.();
  }

  backdrop?.addEventListener("click", dismiss);
  closeBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    dismiss();
  });

  const box = container.querySelector<HTMLElement>(".ols-arc-box");
  box?.addEventListener("click", (e) => e.stopPropagation());

  return {
    destroy: dismiss,
    hourInfo,
    progressPct,
  };
}

// Expose for vanilla script usage
if (typeof window !== "undefined") {
  (window as unknown as Record<string, unknown>).createSolarDayArc = createSolarDayArc;
}
