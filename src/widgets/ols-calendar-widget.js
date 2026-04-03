// OLS Sun Light Calendar Widget – v2.0 (standalone, no framework required)
// @onelightsystem/light-time/widgets/calendar
// License: MIT — https://github.com/onelightsystem/Stime-light
// CSP-friendly: no inline styles via JS, no eval()

(function () {
  "use strict";

  function initOLSWidget() {
    var container = document.getElementById("ols-calendar-widget");
    if (!container) return;

    var startStr = container.getAttribute("data-start-date") || "2024-12-22";
    var startDate = new Date(startStr);
    var today = new Date();
    var timeDiff = today.getTime() - startDate.getTime();
    var daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

    var sunSVG =
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

    container.innerHTML =
      '<a href="https://www.olsme.com" target="_blank" rel="noopener noreferrer" ' +
      'class="ols-calendar-link" ' +
      'title="Day ' + daysDiff + ' of Sun Light Civilization – Join at olsme.com" ' +
      'aria-label="Day ' + daysDiff + ' of OLS Sun Light Calendar – Visit OneLightSystem OLS">' +
      sunSVG +
      '<div class="ols-calendar-day">Day ' + daysDiff + "</div>" +
      "</a>";
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    initOLSWidget();
  } else {
    document.addEventListener("DOMContentLoaded", initOLSWidget);
  }
})();
