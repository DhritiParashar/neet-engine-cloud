// ==============================================================================
// GOALisB UNIFIED 7-TAB HEADER + SYSTEMATIC SERIAL ID ENGINE (JEE & NEET)
// - Enforces 7-Tab Navigation Bar (4: Full Mock, 5: Subject Practice, 6: Trap Doctor, 7: Forecaster)
// - Standardizes Serial IDs to [EXAM]-[TRACK]-[YYYYMMDD]-#[ATTEMPT]
// ==============================================================================
(function () {
  const HOST = (window.location.hostname || "").toLowerCase();
  const TITLE = (document.title || "").toUpperCase();
  const PORTAL = HOST.includes("neet") || TITLE.includes("NEET") ? "NEET" : "JEE";

  function detectSubTrack() {
    if (PORTAL === "NEET") {
      const pill = Array.from(document.querySelectorAll("header button"))
        .find(b => b.className && (b.className.includes("bg-indigo-600") || b.className.includes("bg-emerald-600")) && /NEET|NCERT|Assertion/i.test(b.textContent || ""));
      const txt = (pill ? pill.textContent : "").toUpperCase();
      if (txt.includes("NCERT") || txt.includes("BIO")) return "BIO360";
      if (txt.includes("ASSERTION") || txt.includes("TRAP")) return "AR-CLINIC";
      return "FULL180";
    }
    const mode = String(window._ACTIVE_JEE_MODE || window._ACTIVE_EXAM_MODE || "").toUpperCase();
    const pill = Array.from(document.querySelectorAll("header button"))
      .find(b => b.className && b.className.includes("bg-indigo-600") && /JEE|Advanced|Main|Section B/i.test(b.textContent || ""));
    const pillTxt = (pill ? pill.textContent : mode).toUpperCase();
    if (pillTxt.includes("ADV")) return "ADV-FULL54";
    if (pillTxt.includes("SECTION B") || pillTxt.includes("NUMERICAL")) return "SECB-15Q";
    return "MAIN-FULL75";
  }

  window.buildSystematicSerialId = function (portalOverride, trackOverride, isPractice, practiceCode) {
    const p = (portalOverride || PORTAL).toUpperCase();
    const now = new Date();
    const ymd = now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0");

    const track = isPractice
      ? `PRAC-${String(practiceCode || "SUBJ").toUpperCase()}`
      : (trackOverride || detectSubTrack());

    const prefixBase = `${p}-${track}-`;
    let priorCount = 0;
    const histKeys = ["ipm_mock_history_v1", "jee_mock_history_v1", "neet_mock_history_v1"];
    for (const k of histKeys) {
      try {
        const arr = JSON.parse(localStorage.getItem(k) || "[]");
        if (Array.isArray(arr)) {
          priorCount += arr.filter(h => {
            if (!h) return false;
            const sid = String(h.serialId || "");
            if (sid.startsWith(prefixBase)) return true;
            if (!isPractice && Number(h.score || 0) > 0 && !sid.includes("PRAC-")) {
              if (p === "JEE" && track.startsWith("ADV")) return /adv/i.test(String(h.blueprint || sid));
              if (p === "JEE" && track.startsWith("MAIN")) return !/adv/i.test(String(h.blueprint || sid));
              return true;
            }
            return false;
          }).length;
        }
      } catch (_) {}
    }

    const attemptNum = String(priorCount + 1).padStart(2, "0");
    return `${p}-${track}-${ymd}-#${attemptNum}`;
  };

  // Rewrite any legacy random JEE-2026-XXXX or NEET-2026-XXXX in the live workspace DOM
  function normalizeLiveSerialStrings() {
    const ws = document.getElementById("main-workspace") || document.body;
    if (!ws) return;
    const html = ws.innerHTML;
    if (/\b(?:JEE|NEET)-2026-\d{4}\b/.test(html)) {
      const systematic = window.buildSystematicSerialId(PORTAL, null, false, "");
      const walker = document.createTreeWalker(ws, NodeFilter.SHOW_TEXT, null);
      let node;
      while ((node = walker.nextNode())) {
        if (/\b(?:JEE|NEET)-2026-\d{4}\b/.test(node.nodeValue)) {
          node.nodeValue = node.nodeValue.replace(/\b(?:JEE|NEET)-2026-\d{4}\b/g, systematic);
        }
      }
    }
  }

  // Enforce the complete 7-Tab Navigation Bar (Tabs 1..7) on both JEE and NEET
  const LABELS = PORTAL === "NEET"
    ? [
        "1. Physics, Chem & Biology (12x12)",
        "2. NCERT Line-by-Line Bio Vault",
        "3. Assertion-Reason Studio",
        "4. 180-Q / 720-Mark NEET Mock",
        "5. Subject Practice Mocks",
        "6. Trap Doctor & AI Doubts",
        "7. NEET Percentile & AIR Forecaster"
      ]
    : [
        "1. Physics, Chem & Math (12x12)",
        "2. Organic & Derivation Lab",
        "3. Section B Numerical Studio",
        "4. 75-Q NTA CBT Mock",
        "5. Subject Practice Mocks",
        "6. Trap Doctor & AI Doubts",
        "7. JEE Percentile & IIT/NIT Forecaster"
      ];

  window.ensureJeeNeetSevenTabs = function () {
    const navBtns = Array.from(document.querySelectorAll("header button")).filter(b => /^[1-7]\./.test((b.textContent || "").trim()));
    if (!navBtns.length) return;
    const container = navBtns[0].parentElement;
    if (!container) return;

    const activeBtn = navBtns.find(b => b.className && (b.className.includes("bg-indigo-600") || b.className.includes("bg-emerald-600")));
    const detectedNum = activeBtn ? Number((activeBtn.textContent.trim().match(/^([1-7])\./) || [0, 1])[1]) : Number(window._JN_ACTIVE_TAB || 1);
    const curNum = Number(window._JN_ACTIVE_TAB || detectedNum || 1);

    const isNeet = PORTAL === "NEET";
    const activeCls = isNeet ? "bg-emerald-600 text-white shadow-sm" : "bg-indigo-600 text-white shadow-sm";

    container.innerHTML = LABELS.map((lbl, i) => {
      const n = i + 1;
      const isAct = n === curNum;
      return `<button type="button" onclick="window.selectJeeNeetTab(${n})"
        class="px-3.5 py-2 rounded-full text-xs font-bold transition cursor-pointer ${isAct ? activeCls : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-indigo-500'}">
        ${lbl}
      </button>`;
    }).join("");
  };

  window.selectJeeNeetTab = function (tabNum) {
    const n = Number(tabNum);
    window._JN_ACTIVE_TAB = n;
    window.ACTIVE_TAB = n;
    window.scrollTo(0, 0);

    const el = document.getElementById("main-workspace") || document.querySelector("main") || document.getElementById("tab-content");
    if (!el) return;
    el.id = "main-workspace";

    if (n === 1 && typeof window.renderTab1 === "function") window.renderTab1(el);
    else if (n === 2 && typeof window.renderTab2 === "function") window.renderTab2(el);
    else if (n === 3 && typeof window.renderVerbalStudio3 === "function") window.renderVerbalStudio3(el);
    else if (n === 4) {
      if (typeof window.renderMockSimulator4 === "function") window.renderMockSimulator4(el);
      else if (typeof window.renderTab4 === "function") window.renderTab4(el);
    } else if (n === 5) {
      if (typeof window.renderSubjectPractice5 === "function") window.renderSubjectPractice5(el);
      else if (typeof window.renderPracticeMocks5 === "function") window.renderPracticeMocks5(el);
      else if (typeof window.renderTab5 === "function") window.renderTab5(el);
    } else if (n === 6) {
      if (typeof window.renderTrapClinic5 === "function") window.renderTrapClinic5(el);
      else if (typeof window.renderTrapClinic6 === "function") window.renderTrapClinic6(el);
    } else if (n === 7) {
      if (typeof window.renderForecaster7 === "function") window.renderForecaster7(el);
      else if (typeof window.renderTab7 === "function") window.renderTab7(el);
      else if (typeof window.renderTab6 === "function") window.renderTab6(el);
    }

    window.ensureJeeNeetSevenTabs();
    setTimeout(normalizeLiveSerialStrings, 30);
  };

  const origRenderHeader = window.renderCleanHeader;
  if (typeof origRenderHeader === "function") {
    window.renderCleanHeader = function () {
      origRenderHeader.apply(this, arguments);
      window.ensureJeeNeetSevenTabs();
      normalizeLiveSerialStrings();
    };
  }

  document.addEventListener("click", function (ev) {
    const btn = ev.target && ev.target.closest ? ev.target.closest("button") : null;
    if (!btn) return;
    const txt = (btn.textContent || "").trim();
    if (/^(JEE|NEET|NCERT|Assertion|Section B)/i.test(txt)) {
      setTimeout(() => {
        window.ensureJeeNeetSevenTabs();
        normalizeLiveSerialStrings();
      }, 60);
    }
  });

  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      window.ensureJeeNeetSevenTabs();
      normalizeLiveSerialStrings();
    }, 120);
  });
  setTimeout(() => {
    window.ensureJeeNeetSevenTabs();
    normalizeLiveSerialStrings();
  }, 400);
})();
