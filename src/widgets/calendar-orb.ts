// @onelightsystem/light-time — Calendar Orb modal (vanilla DOM)
// Renders concentric animated rings around a Light Day number.
// CSP-friendly: uses CSS classes only, no eval().

import { getLightDay } from "../core";
import type { LightTimeConfig } from "../types";

export interface CalendarOrbOptions {
  /** Container element id. Default: "ols-calendar-orb" */
  containerId?: string;
  /** Custom epoch / light year config */
  config?: LightTimeConfig;
  /** Optional center image URL (e.g. OLS calendar graphic) */
  centerImageUrl?: string;
  /** Alt text for center image */
  centerImageAlt?: string;
  /** Callback when the orb is dismissed */
  onClose?: () => void;
}

/**
 * Render a Calendar Orb modal showing the current Light Day
 * with concentric animated rings.
 *
 * Call `destroy()` on the returned object to remove it.
 */
export function createCalendarOrb(options?: CalendarOrbOptions) {
  const containerId = options?.containerId ?? "ols-calendar-orb";
  const config = options?.config;
  const dayInfo = getLightDay(undefined, config);
  const dayInYear = ((dayInfo.day - 1) % 365) + 1;

  const container = document.getElementById(containerId);
  if (!container) return null;

  const quarter = Math.ceil((dayInYear / 365) * 4);

  // Build ring markup without inline styles to remain compatible with strict CSP.
  const rings = [
    {
      size: 260,
      color: "rgba(82,196,26,0.28)",
      speed: "14s",
      dir: "cw",
      from: "0 50 50",
      to: "360 50 50",
    },
    {
      size: 200,
      color: "rgba(255,215,0,0.35)",
      speed: "9s",
      dir: "ccw",
      from: "360 50 50",
      to: "0 50 50",
    },
    {
      size: 148,
      color: "rgba(82,196,26,0.5)",
      speed: "5s",
      dir: "cw",
      from: "0 50 50",
      to: "360 50 50",
    },
    {
      size: 100,
      color: "rgba(255,215,0,0.65)",
      speed: "3s",
      dir: "ccw",
      from: "360 50 50",
      to: "0 50 50",
    },
  ];

  const ringsHtml = rings
    .map((r) => {
      const radius = 50 - 1;
      return `
        <svg
          class="ols-orb-ring ols-orb-ring--${r.dir}"
          width="${r.size}"
          height="${r.size}"
          viewBox="0 0 100 100"
          aria-hidden="true"
          focusable="false"
        >
          <circle
            cx="50"
            cy="50"
            r="${radius}"
            fill="none"
            stroke="${r.color}"
            stroke-width="2"
            vector-effect="non-scaling-stroke"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="${r.from}"
              to="${r.to}"
              dur="${r.speed}"
              repeatCount="indefinite"
            />
          </circle>
        </svg>`;
    })
    .join("");

  const centerContent = options?.centerImageUrl
    ? `<img class="ols-orb-center-img" src="${encodeURI(options.centerImageUrl)}" alt="${options.centerImageAlt ?? "OLS Calendar"}" decoding="async" />`
    : `<div class="ols-orb-center-text">${dayInYear}LD</div>`;

  const html = `
    <div class="ols-orb-backdrop" role="dialog" aria-modal="true" aria-label="Calendar orb — Light Day detail">
      <div class="ols-orb-container">
        ${ringsHtml}
        <div class="ols-orb-core">
          ${centerContent}
        </div>
        <div class="ols-orb-meta">
          <div class="ols-orb-day">${dayInYear}LD</div>
          <div class="ols-orb-sub">Q${quarter} · ${dayInfo.year} · olsme.com</div>
        </div>
        <button class="ols-orb-close" aria-label="Close calendar orb">&times;</button>
      </div>
      <div class="ols-orb-hint">tap anywhere to close</div>
    </div>
  `;

  container.innerHTML = html;

  // Event handlers
  const backdrop = container.querySelector<HTMLElement>(".ols-orb-backdrop");
  const closeBtn = container.querySelector<HTMLElement>(".ols-orb-close");

  function dismiss() {
    container!.innerHTML = "";
    options?.onClose?.();
  }

  backdrop?.addEventListener("click", dismiss);
  closeBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    dismiss();
  });

  // Prevent clicks inside the orb container from dismissing
  const orbContainer = container.querySelector<HTMLElement>(".ols-orb-container");
  orbContainer?.addEventListener("click", (e) => e.stopPropagation());

  return {
    destroy: dismiss,
    dayInfo,
    dayInYear,
  };
}

// Expose for vanilla script usage
(window as unknown as Record<string, unknown>).createCalendarOrb = createCalendarOrb;
