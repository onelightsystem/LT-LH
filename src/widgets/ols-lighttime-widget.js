// OLS Light Time Widget – v1.0 (standalone, no framework required)
// @onelightsystem/light-time/widgets/light-time
// License: MIT — https://github.com/onelightsystem/Stime-light
// CSP-friendly: no inline styles injected via JS, no eval()

(function () {
  "use strict";

  // Light Time mapping: hour index (0-23) → Light Time label
  var lightTimeMap = [
    "7dh", "8dh", "9dh", "10dh", "11dh", "12dh",   // 12AM-5AM
    "1LH", "2LH", "3LH", "4LH",  "5LH",  "6LH",   // 6AM-11AM
    "7LH", "8LH", "9LH", "10LH", "11LH", "12LH",   // 12PM-5PM
    "1dh", "2dh", "3dh", "4dh",  "5dh",  "6dh"      // 6PM-11PM
  ];

  var sunSVG =
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

  function getCurrentLightTime() {
    var hours = new Date().getHours();
    return lightTimeMap[hours] || lightTimeMap[0];
  }

  function initOLSLightTimeWidget() {
    var container = document.getElementById("ols-lighttime-widget");
    if (!container) return;

    function render() {
      var lt = getCurrentLightTime();
      var isDh = lt.indexOf("dh") !== -1;
      var modeClass = isDh ? "ols-lighttime-toggle--dh" : "ols-lighttime-toggle--lh";

      container.innerHTML =
        '<a href="https://www.olsme.com/OLSCalendarTime" target="_blank" rel="noopener noreferrer" ' +
        'class="ols-lighttime-link" ' +
        'title="Current Light Time: ' + lt + ' – View OLS Calendar Time" ' +
        'aria-label="Current Light Time: ' + lt + '. Click to view OLS Calendar Time">' +
        sunSVG +
        '<div class="ols-lighttime-toggle ' + modeClass + '">' + lt + "</div>" +
        "</a>";
    }

    render();
    setInterval(render, 60000);
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    initOLSLightTimeWidget();
  } else {
    document.addEventListener("DOMContentLoaded", initOLSLightTimeWidget);
  }
})();
