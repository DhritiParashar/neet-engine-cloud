// ==============================================================================
// GOALisB UNIFIED 7-TAB + SYSTEMATIC SERIAL ID + AI DOUBTS ENGINE (JEE & NEET v9)
// - Enforces 7-Tab Navigation Bar (Tabs 1..7) on both JEE and NEET
// - Restores the Socratic AI Doubts Solver inside Tab 6 alongside the 144-Trap Vault
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

  function normalizeLiveSerialStrings() {
    const ws = document.getElementById("main-workspace") || document.body;
    if (!ws) return;
    if (/\b(?:JEE|NEET)-2026-\d{4}\b/.test(ws.innerHTML)) {
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

  // ----------------------------------------------------------------------------
  // INJECT SOCRATIC AI DOUBTS PANEL INTO TAB 6 ALONGSIDE THE 144-TRAP VAULT
  // ----------------------------------------------------------------------------
  window.submitJeeNeetAiDoubt = async function () {
    const topicEl = document.getElementById("jn-ai-doubt-topic");
    const qEl = document.getElementById("jn-ai-doubt-q");
    const attEl = document.getElementById("jn-ai-doubt-att");
    const outEl = document.getElementById("jn-ai-doubt-out");
    const btnEl = document.getElementById("jn-ai-doubt-btn");
    if (!qEl || !outEl) return;

    const question = qEl.value.trim();
    if (!question) {
      alert("Please paste or type your Physics, Chemistry, Biology, or Mathematics doubt first.");
      return;
    }
    const topic = topicEl ? topicEl.value : (PORTAL === "NEET" ? "NEET Biology / Physics / Chemistry" : "JEE Physics / Chemistry / Mathematics");
    const attempt = attEl ? attEl.value.trim() : "";

    if (btnEl) { btnEl.disabled = true; btnEl.textContent = "Analyzing Concept & Trap..."; }
    outEl.style.display = "block";
    outEl.innerHTML = `<div class="text-xs font-bold text-indigo-600 animate-pulse">Generating step-by-step Socratic derivation, NTA -1 trap check &amp; 30-second shortcut...</div>`;

    try {
      const res = await fetch("/api/doubt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          track: PORTAL === "NEET" ? "NEET_UG_720" : "JEE_MAIN_ADV_300",
          topic: topic,
          question: question,
          student_attempt: attempt
        })
      });
      const data = await res.json();
      const rawText = (data && (data.solution || data.feedback || data.detail)) || "No solution returned.";
      const formatted = String(rawText)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br>");
      outEl.innerHTML = `
        <div class="text-[11px] font-extrabold uppercase text-emerald-700 mb-2">✓ Socratic AI Resolution &amp; NTA Negative-Marking Guard</div>
        <div class="text-xs text-slate-800 dark:text-slate-200 leading-relaxed space-y-2">${formatted}</div>
      `;
    } catch (err) {
      outEl.innerHTML = `<div class="text-xs font-bold text-rose-600">Error contacting AI Doubt Engine: ${err.message}</div>`;
    } finally {
      if (btnEl) { btnEl.disabled = false; btnEl.textContent = "🧠 Ask AI Socratic Tutor"; }
    }
  };

  window.toggleAiDoubtsDrawer = function (openState) {
    const panel = document.getElementById("jn-ai-doubts-card");
    if (!panel) return;
    const show = openState !== undefined ? openState : (panel.style.display === "none");
    panel.style.display = show ? "block" : "none";
    if (show) panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  function injectAiDoubtsIntoTab6() {
    const ws = document.getElementById("main-workspace");
    if (!ws) return;
    const cur = Number(window._JN_ACTIVE_TAB || 1);
    if (cur !== 6 && !ws.innerHTML.includes("Trap Vault &amp; Mock Autopsy") && !ws.innerHTML.includes("Trap Vault & Mock Autopsy")) return;
    if (document.getElementById("jn-ai-doubts-card")) return;

    // Add "🧠 Ask AI Socratic Doubt" pill next to "My Logged Mock -1 Errors" if header pill bar exists
    const errBtn = Array.from(ws.querySelectorAll("button")).find(b => (b.textContent || "").includes("My Logged Mock -1 Errors"));
    if (errBtn && errBtn.parentElement && !document.getElementById("jn-ai-pill-btn")) {
      const aiPill = document.createElement("button");
      aiPill.id = "jn-ai-pill-btn";
      aiPill.type = "button";
      aiPill.className = "px-4 py-2 rounded-full text-xs font-extrabold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm cursor-pointer transition";
      aiPill.textContent = "🧠 AI Socratic Doubt Solver";
      aiPill.onclick = () => window.toggleAiDoubtsDrawer(true);
      errBtn.parentElement.appendChild(aiPill);
    }

    const topics = PORTAL === "NEET"
      ? ["Botany — Molecular Basis & Genetics", "Zoology — Human Physiology & Reproduction", "Physics — Electrostatics, Optics & Modern Physics", "Chemistry — Organic Mechanisms & Equilibrium"]
      : ["Physics — Rotational Motion, Electrodynamics & Modern Physics", "Chemistry — Organic Named Reactions, Thermodynamics & Coordination", "Mathematics — Calculus, Vectors/3D, Conics & Probability"];

    const card = document.createElement("div");
    card.id = "jn-ai-doubts-card";
    card.className = "max-w-7xl mx-auto mt-5 mb-6 bg-white dark:bg-slate-900 border-2 border-indigo-500/30 rounded-2xl p-6 shadow-sm space-y-4";
    card.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span class="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-extrabold uppercase">SOCRATIC AI DOUBT ENGINE &bull; STEP-BY-STEP + 30-SEC SHORTCUT</span>
          <h3 class="text-lg font-extrabold text-slate-900 dark:text-white mt-1">Ask Any ${PORTAL} Concept, Numerical, or Mock Question Doubt</h3>
          <p class="text-xs text-slate-500">Paste any tricky problem or mock question below to get the core NCERT/JEE principle, common -1 trap warning, and fastest solution method.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label class="block text-[11px] font-extrabold text-slate-600 mb-1">Subject &amp; Chapter Track</label>
          <select id="jn-ai-doubt-topic" class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-xs font-bold">
            ${topics.map(t => `<option value="${t}">${t}</option>`).join("")}
          </select>
        </div>
        <div class="md:col-span-2">
          <label class="block text-[11px] font-extrabold text-slate-600 mb-1">Your Attempt / Where You Got Stuck (Optional)</label>
          <input id="jn-ai-doubt-att" type="text" placeholder="e.g., Applied conservation of mechanical energy instead of angular momentum..."
            class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-xs" />
        </div>
      </div>

      <div>
        <label class="block text-[11px] font-extrabold text-slate-600 mb-1">Question Stem / Concept Doubt</label>
        <textarea id="jn-ai-doubt-q" rows="3" placeholder="Paste the full question or describe the concept you want broken down step-by-step..."
          class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-3 text-xs"></textarea>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="text-[11px] text-slate-400">Powered by GOALisB Socratic Tutor (/api/doubt)</span>
        <button id="jn-ai-doubt-btn" type="button" onclick="window.submitJeeNeetAiDoubt()"
          class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow cursor-pointer">
          🧠 Ask AI Socratic Tutor
        </button>
      </div>

      <div id="jn-ai-doubt-out" style="display:none;" class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"></div>
    `;

    // Insert right above the 12-chapter grid or at the top of Tab 6 below the banner
    const firstSection = ws.firstElementChild;
    if (firstSection && firstSection.firstElementChild) {
      firstSection.insertBefore(card, firstSection.children[1] || null);
    } else {
      ws.prepend(card);
    }
  }

  // ----------------------------------------------------------------------------
  // PERSISTENT 7-TAB NAVIGATION BAR (TABS 1..7 FOR BOTH JEE & NEET)
  // ----------------------------------------------------------------------------
  const LABELS = PORTAL === "NEET"
    ? [
        "1. Physics, Chem & Biology (12x12)",
        "2. NCERT Line-by-Line Bio Vault",
        "3. Assertion-Reason Studio",
        "4. 180-Q / 720-Mark NEET Mock",
        "5. Subject Practice Mocks",
        "6. Trap Doctor & AI Doubts",
        "7. NEET AIR & AIIMS/GMC Forecaster"
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
      setTimeout(injectAiDoubtsIntoTab6, 20);
    } else if (n === 7) {
      if (typeof window.renderForecaster7 === "function") window.renderForecaster7(el);
      else if (typeof window.renderTab7 === "function") window.renderTab7(el);
      else if (typeof window.renderTab6 === "function") window.renderTab6(el);
    }

    window.ensureJeeNeetSevenTabs();
    setTimeout(() => {
      normalizeLiveSerialStrings();
      injectAiDoubtsIntoTab6();
    }, 40);
  };

  const origRenderHeader = window.renderCleanHeader;
  if (typeof origRenderHeader === "function") {
    window.renderCleanHeader = function () {
      origRenderHeader.apply(this, arguments);
      window.ensureJeeNeetSevenTabs();
      normalizeLiveSerialStrings();
      injectAiDoubtsIntoTab6();
    };
  }

  // Wrap Trap Clinic renderers so AI Doubts always stays attached on Tab 6
  ["renderTrapClinic5", "renderTrapClinic6"].forEach(fnName => {
    const origFn = window[fnName];
    if (typeof origFn === "function") {
      window[fnName] = function () {
        const res = origFn.apply(this, arguments);
        setTimeout(injectAiDoubtsIntoTab6, 20);
        return res;
      };
    }
  });

  document.addEventListener("click", function (ev) {
    const btn = ev.target && ev.target.closest ? ev.target.closest("button") : null;
    if (!btn) return;
    const txt = (btn.textContent || "").trim();
    if (/^(JEE|NEET|NCERT|Assertion|Section B)/i.test(txt)) {
      setTimeout(() => {
        window.ensureJeeNeetSevenTabs();
        normalizeLiveSerialStrings();
        injectAiDoubtsIntoTab6();
      }, 60);
    }
  });

  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      window.ensureJeeNeetSevenTabs();
      normalizeLiveSerialStrings();
      injectAiDoubtsIntoTab6();
    }, 120);
  });
  setTimeout(() => {
    window.ensureJeeNeetSevenTabs();
    normalizeLiveSerialStrings();
    injectAiDoubtsIntoTab6();
  }, 450);
})();
