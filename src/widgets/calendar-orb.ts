// @olsystem/lt-lh — Calendar Orb modal (vanilla DOM)
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

  // Four predefined ring variants — all values are hardcoded so no dynamic attribute
  // injection occurs. SVG presentation attributes (stroke, width, height) and SVG
  // animation attributes (dur) are part of the SVG/XML spec and are NOT CSS inline
  // styles; they are not controlled by CSP style-src. Consumers can override ring
  // appearance by targeting .ols-orb-ring--1 through .ols-orb-ring--4 in their CSS.
  const ringsHtml = `
    <svg class="ols-orb-ring ols-orb-ring--1" width="260" height="260" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(82,196,26,0.28)" stroke-width="2" vector-effect="non-scaling-stroke">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 50 50" to="360 50 50" dur="14s" repeatCount="indefinite" />
      </circle>
    </svg>
    <svg class="ols-orb-ring ols-orb-ring--2" width="200" height="200" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(255,215,0,0.35)" stroke-width="2" vector-effect="non-scaling-stroke">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="360 50 50" to="0 50 50" dur="9s" repeatCount="indefinite" />
      </circle>
    </svg>
    <svg class="ols-orb-ring ols-orb-ring--3" width="148" height="148" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(82,196,26,0.5)" stroke-width="2" vector-effect="non-scaling-stroke">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 50 50" to="360 50 50" dur="5s" repeatCount="indefinite" />
      </circle>
    </svg>
    <svg class="ols-orb-ring ols-orb-ring--4" width="100" height="100" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(255,215,0,0.65)" stroke-width="2" vector-effect="non-scaling-stroke">
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="360 50 50" to="0 50 50" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>`;

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
          <div class="ols-orb-sub">Q${dayInfo.quarter} · ${dayInfo.quarterLabel} · ${dayInfo.year} · olsme.com</div>
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
