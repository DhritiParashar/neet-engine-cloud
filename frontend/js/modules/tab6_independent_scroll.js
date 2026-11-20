
// ==============================================================================
// INDEPENDENT 3-PANE SCROLLING FOR TAB 6 (LEFT CHAPTERS | CENTER TRAPS | RIGHT AI)
// ==============================================================================
(function () {
  function applyThreePaneScroll() {
    const splitGrid = document.getElementById("jn-tab6-split-grid");
    const leftTraps = document.getElementById("jn-tab6-left-traps");
    const rightAi = document.getElementById("jn-ai-doubts-card");

    if (splitGrid && leftTraps && rightAi) {
      // Find the inner 2-column chapter + trap grid inside leftTraps
      const innerGrid = Array.from(leftTraps.querySelectorAll("div.grid")).find(g => g.children.length >= 2);
      if (innerGrid && innerGrid.children.length >= 2) {
        const chapterCol = innerGrid.children[0];
        const trapListCol = innerGrid.children[1];
        chapterCol.style.maxHeight = "calc(100vh - 230px)";
        chapterCol.style.overflowY = "auto";
        chapterCol.style.paddingRight = "6px";

        trapListCol.style.maxHeight = "calc(100vh - 230px)";
        trapListCol.style.overflowY = "auto";
        trapListCol.style.paddingRight = "6px";
      } else {
        leftTraps.style.maxHeight = "calc(100vh - 230px)";
        leftTraps.style.overflowY = "auto";
        leftTraps.style.paddingRight = "6px";
      }

      rightAi.style.maxHeight = "calc(100vh - 230px)";
      rightAi.style.overflowY = "auto";
    }

    // Also ensure CAT Tab 6 left trap grid and right AI breakdown scroll independently
    const catTrapHeading = Array.from(document.querySelectorAll("h2,h3,div"))
      .find(el => el.children.length === 0 && /AI Doubt & Trap Breakdown/i.test(el.textContent || ""));
    if (catTrapHeading && !splitGrid) {
      const rightPanel = catTrapHeading.closest("div.rounded-2xl, div.border");
      const outerGrid = rightPanel && rightPanel.parentElement && rightPanel.parentElement.parentElement;
      if (outerGrid && outerGrid.children.length >= 2) {
        const leftPane = outerGrid.children[0];
        const rightPane = outerGrid.children[1];
        leftPane.style.maxHeight = "calc(100vh - 230px)";
        leftPane.style.overflowY = "auto";
        leftPane.style.paddingRight = "6px";

        rightPane.style.maxHeight = "calc(100vh - 230px)";
        rightPane.style.overflowY = "auto";
      }
    }
  }

  setInterval(applyThreePaneScroll, 500);
})();
