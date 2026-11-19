window.switchTab = function (tabId) {
  window.IPM_STATE.activeTab = tabId;
  document.querySelectorAll("[data-tab-btn]").forEach(btn => {
    const active = btn.getAttribute("data-tab-btn") === tabId;
    btn.className = active
      ? "px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow"
      : "px-3.5 py-2 rounded-xl bg-slate-900 text-slate-300 hover:bg-slate-800 text-xs font-semibold border border-slate-800";
  });
  window.renderActiveTab();
};

window.renderActiveTab = function () {
  const el = document.getElementById("tab-content");
  if (!el) return;
  const tab = window.IPM_STATE.activeTab;
  if (tab === "tab1") window.renderTab1(el);
  else if (tab === "tab2") window.renderTab2(el);
  else if (tab === "tab3") window.renderTab3(el);
  else if (tab === "tab4") window.renderTab4(el);
  else if (tab === "tab5") window.renderTab5(el);
  else if (tab === "tab6") window.renderTab6(el);
  else if (tab === "tab7") window.renderTab7(el);
  else if (tab === "tab8") window.renderTab8(el);
  else if (tab === "tab9") window.renderTab9(el);
};

document.addEventListener("DOMContentLoaded", () => {
  window.renderExamSwitcher();
  window.switchTab("tab1");
});

// Universal Independent Left & Right Scroll Enforcer across Tabs 1, 2 & 3
window.applySplitPaneScroll = function () {
  // Skip Tabs 4, 5, 6 (Mock Simulator, Trap Doctor, Forecaster)
  const activeTabBtn = Array.from(document.querySelectorAll("button")).find(b =>
    ((b.className || "").includes("bg-indigo-600") || b.classList.contains("active")) && /^[1-6]\./.test((b.textContent || "").trim())
  );
  const tabNum = activeTabBtn ? parseInt((activeTabBtn.textContent || "").trim()[0], 10) : 1;
  if (tabNum > 3) return;

  const roots = [document.getElementById("main-workspace"), document.getElementById("tab-content")].filter(Boolean);
  roots.forEach(root => {
    const candidates = root.querySelectorAll("div");
    candidates.forEach(container => {
      if (container.children.length !== 2) return;
      const cls = container.className || "";
      const isTwoColLayout =
        cls.includes("lg:grid-cols-") ||
        cls.includes("md:grid-cols-") ||
        cls.includes("lg:flex-row") ||
        cls.includes("md:flex-row");
      if (!isTwoColLayout) return;

      const left = container.children[0];
      const right = container.children[1];
      // Verify left looks like a chapter/module list and right is the study workspace
      const hasChapterHeading = (left.textContent || "").includes("MODULES") || (left.textContent || "").includes("CHAPTERS") || left.querySelectorAll("button, [onclick]").length >= 3;
      const hasStudyPanel = (right.textContent || "").includes("Refresher") || (right.textContent || "").includes("OVERVIEW") || (right.textContent || "").includes("Drills") || right.innerHTML.length > 600;
      if (hasChapterHeading && hasStudyPanel) {
        container.classList.add("split-pane-layout");
        left.classList.add("split-pane-left", "pane-scroll");
        right.classList.add("split-pane-right", "pane-scroll");
      }
    });
  });
};

document.addEventListener("click", (e) => {
  const leftCard = e.target.closest(".split-pane-left button, .split-pane-left [onclick]");
  if (leftCard) {
    setTimeout(() => {
      const rightPane = document.querySelector("#main-workspace .split-pane-right");
      if (rightPane) rightPane.scrollTop = 0;
    }, 30);
  }
});

const _splitObs = new MutationObserver(() => {
  if (typeof window.applySplitPaneScroll === "function") window.applySplitPaneScroll();
});
window.addEventListener("DOMContentLoaded", () => {
  const ws = document.getElementById("main-workspace");
  if (ws) _splitObs.observe(ws, { childList: true, subtree: true });
  setTimeout(() => window.applySplitPaneScroll(), 200);
});