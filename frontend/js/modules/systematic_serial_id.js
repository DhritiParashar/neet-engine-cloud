// ==============================================================================
// GOALisB UNIFIED 7-TAB + SYSTEMATIC SERIAL ID + AI DOUBTS ENGINE (JEE & NEET v10)
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
    return `${p}-${track}-${ymd}-#${String(priorCount + 1).padStart(2, "0")}`;
  };

  function normalizeLiveSerialStrings() {
    if (!/\b(?:JEE|NEET)-2026-\d{4}\b/.test(document.body.innerHTML)) return;
    const systematic = window.buildSystematicSerialId(PORTAL, null, false, "");
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    let node;
    while ((node = walker.nextNode())) {
      if (/\b(?:JEE|NEET)-2026-\d{4}\b/.test(node.nodeValue)) {
        node.nodeValue = node.nodeValue.replace(/\b(?:JEE|NEET)-2026-\d{4}\b/g, systematic);
      }
    }
  }

  // ----------------------------------------------------------------------------
  // AI SOCRATIC DOUBT SOLVER (DIRECTLY ANCHORED TO TRAP VAULT BANNER IN TAB 6)
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
      alert("Please enter or paste your question / concept doubt first.");
      return;
    }
    const topic = topicEl ? topicEl.value : `${PORTAL} Core Concept`;
    const attempt = attEl ? attEl.value.trim() : "";

    if (btnEl) { btnEl.disabled = true; btnEl.textContent = "Analyzing Concept & NTA Trap..."; }
    outEl.style.display = "block";
    outEl.innerHTML = `<div class="text-xs font-bold text-indigo-600">Generating step-by-step Socratic derivation, NTA -1 trap check &amp; 30-second shortcut...</div>`;

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
        <div class="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">${formatted}</div>
      `;
    } catch (err) {
      outEl.innerHTML = `<div class="text-xs font-bold text-rose-600">Error contacting AI Doubt Engine: ${err.message}</div>`;
    } finally {
      if (btnEl) { btnEl.disabled = false; btnEl.textContent = "🧠 Ask AI Socratic Tutor"; }
    }
  };

  window.injectAiDoubtsIntoTab6 = function () {
    // Locate the Trap Vault heading anywhere on the page regardless of container ID
    const trapHeading = Array.from(document.querySelectorAll("h1, h2, h3, div"))
      .find(el => el.children.length === 0 && /Chapter-Wise -1 Trap Vault/i.test(el.textContent || ""));
    if (!trapHeading) return;
    if (document.getElementById("jn-ai-doubts-card")) return;

    const bannerCard = trapHeading.closest("div.rounded-2xl, section, div.bg-white") || trapHeading.parentElement;
    if (!bannerCard || !bannerCard.parentElement) return;

    // Add quick-jump pill next to "My Logged Mock -1 Errors"
    const errBtn = Array.from(bannerCard.querySelectorAll("button"))
      .find(b => /My Logged Mock -1 Errors/i.test(b.textContent || ""));
    if (errBtn && errBtn.parentElement && !document.getElementById("jn-ai-pill-btn")) {
      const pill = document.createElement("button");
      pill.id = "jn-ai-pill-btn";
      pill.type = "button";
      pill.className = "px-4 py-2 rounded-full text-xs font-extrabold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm cursor-pointer transition";
      pill.textContent = "🧠 Ask AI Socratic Doubt";
      pill.onclick = () => {
        const c = document.getElementById("jn-ai-doubts-card");
        if (c) { c.scrollIntoView({ behavior: "smooth", block: "center" }); document.getElementById("jn-ai-doubt-q")?.focus(); }
      };
      errBtn.parentElement.appendChild(pill);
    }

    const topics = PORTAL === "NEET"
      ? ["Botany — Molecular Basis & Genetics", "Zoology — Human Physiology & Reproduction", "Physics — Electrostatics, Optics & Modern Physics", "Chemistry — Organic Mechanisms & Equilibrium"]
      : ["Physics — Rotational Motion, Electrodynamics & Modern Physics", "Chemistry — Organic Named Reactions, Thermodynamics & Coordination", "Mathematics — Calculus, Vectors/3D, Conics & Probability"];

    const card = document.createElement("div");
    card.id = "jn-ai-doubts-card";
    card.className = "bg-white dark:bg-slate-900 border-2 border-indigo-500/30 rounded-2xl p-6 shadow-sm space-y-4 my-5";
    card.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span class="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-extrabold uppercase">SOCRATIC AI DOUBT SOLVER &bull; STEP-BY-STEP + 30-SEC SHORTCUT</span>
          <h3 class="text-lg font-extrabold text-slate-900 dark:text-white mt-1">Ask Any ${PORTAL} Concept, Numerical, or Mock Question Doubt</h3>
          <p class="text-xs text-slate-500">Paste any tricky problem or mock question below for the NCERT/JEE core rule, -1 trap warning, and fastest solving shortcut.</p>
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
          <input id="jn-ai-doubt-att" type="text" placeholder="e.g., Confused between isothermal vs adiabatic work sign convention..."
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

    bannerCard.insertAdjacentElement("afterend", card);
  };

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
    const isTrapView = !!document.getElementById('jn-ai-doubts-card'); const curNum = isTrapView ? 6 : Number(window._JN_ACTIVE_TAB || detectedNum || 1);

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
    if (el) {
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
    }

    window.ensureJeeNeetSevenTabs();
    setTimeout(() => {
      normalizeLiveSerialStrings();
      window.injectAiDoubtsIntoTab6();
    }, 30);
  };

  document.addEventListener("click", function () {
    setTimeout(() => {
      window.ensureJeeNeetSevenTabs();
      normalizeLiveSerialStrings();
      window.injectAiDoubtsIntoTab6();
    }, 50);
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      window.ensureJeeNeetSevenTabs();
      normalizeLiveSerialStrings();
      window.injectAiDoubtsIntoTab6();
    }, 150);
  });
})();

// ==============================================================================
// EXACT CAT-STYLE TRAP DOCTOR & AI DOUBT SOLVER FOR JEE & NEET (v15)
// - Fixes Tab 6 active pill snapping back to Tab 1 on click
// - Guarantees Socratic AI Breakdown persists & scrolls into view cleanly
// ==============================================================================
(function () {
  const HOST = (window.location.hostname || "").toLowerCase();
  const TITLE = (document.title || "").toUpperCase();
  const PORTAL = HOST.includes("neet") || TITLE.includes("NEET") ? "NEET" : "JEE";

  window.askAiAboutTrapCard = function (trapTitle, trapBodyText, ev) {
    if (ev && ev.stopPropagation) ev.stopPropagation();
    window._JN_ACTIVE_TAB = 6;
    const topicEl = document.getElementById("jn-ai-doubt-topic");
    const qEl = document.getElementById("jn-ai-doubt-q");
    if (topicEl) topicEl.value = trapTitle;
    if (qEl) {
      qEl.value = `Explain this ${PORTAL} trap with a worked example and show how to avoid it under exam pressure:\n${trapTitle}\n${trapBodyText}`;
    }
    window.submitJeeNeetAiDoubt();
  };

  window.submitJeeNeetAiDoubt = async function (ev) {
    if (ev && ev.stopPropagation) ev.stopPropagation();
    window._JN_ACTIVE_TAB = 6;
    const topicEl = document.getElementById("jn-ai-doubt-topic");
    const qEl = document.getElementById("jn-ai-doubt-q");
    const outEl = document.getElementById("jn-ai-doubt-out");
    const btnEl = document.getElementById("jn-ai-doubt-btn");
    if (!qEl || !outEl) return;

    const question = qEl.value.trim();
    if (!question) {
      alert(`Paste any ${PORTAL} question or click 'Ask AI Doubt Doctor About This Trap' on a card first.`);
      return;
    }
    const topic = (topicEl && topicEl.value.trim()) || `${PORTAL} • Boundary & Distractor Check`;

    if (btnEl) { btnEl.disabled = true; btnEl.textContent = "⏳ Generating Socratic Breakdown..."; }
    outEl.style.display = "block";
    outEl.dataset.lockedOutput = "1";
    outEl.innerHTML = `<div class="text-xs font-bold text-indigo-600">Analyzing trap mechanics, worked example &amp; 30s shortcut...</div>`;

    try {
      const res = await fetch("/api/doubt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          track: PORTAL === "NEET" ? "NEET_UG_720" : "JEE_MAIN_ADV_300",
          topic: topic,
          question: question,
          student_attempt: ""
        })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const rawText = (data && (data.solution || data.feedback || data.detail)) || "";
      if (!rawText.trim()) throw new Error("Empty response from /api/doubt");

      const formatted = String(rawText)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br>");
      outEl.style.display = "block";
      outEl.innerHTML = `
        <div class="text-[10px] font-extrabold uppercase text-emerald-700 mb-1.5">✓ Socratic Breakdown &amp; 30s Antidote</div>
        <div class="text-xs text-slate-800 dark:text-slate-200 leading-relaxed space-y-1.5">${formatted}</div>
      `;
      outEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (err) {
      // Deterministic Socratic fallback if API key is rate-limited or offline
      const lines = question.split("\n").filter(Boolean);
      const titleLine = lines[1] || topic;
      const detailLine = lines.slice(2).join(" ") || question;
      outEl.style.display = "block";
      outEl.innerHTML = `
        <div class="text-[10px] font-extrabold uppercase text-emerald-700 mb-1.5">✓ Socratic Trap Breakdown &amp; 30s Antidote</div>
        <div class="text-xs text-slate-800 dark:text-slate-200 leading-relaxed space-y-2">
          <p><strong>1. Why Students Lose -1 Mark (${titleLine}):</strong><br>${detailLine}</p>
          <p><strong>2. Exam-Hall Verification Protocol:</strong><br>Before bubbling or locking your final option, verify domain/boundary conditions, strand/sign polarity, and units against the exact NCERT/NTA rule highlighted in green on the card.</p>
          <p><strong>3. 30-Second Antidote:</strong><br>Eliminate the two extreme/unqualified distractors first, then test one concrete boundary value to confirm the exact option in under 30 seconds.</p>
        </div>
      `;
      outEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } finally {
      if (btnEl) { btnEl.disabled = false; btnEl.textContent = "✨ Analyze Trap & Generate 30s Shortcut"; }
    }
  };

  window.mountTab6AiDoubtBox = function () {
    const trapH = Array.from(document.querySelectorAll("h1,h2,h3,div"))
      .find(el => el.children.length === 0 && /Chapter-Wise -1 Trap Vault/i.test(el.textContent || ""));
    if (!trapH) return;

    // Keep Tab 6 highlighted in the top bar whenever Trap Vault is active on screen
    window._JN_ACTIVE_TAB = 6;

    const bannerCard = trapH.closest("div.rounded-2xl, div.rounded-3xl, section, div.bg-white") || trapH.parentElement;
    if (!bannerCard || !bannerCard.parentElement) return;
    const rootWrap = bannerCard.parentElement;

    let splitGrid = document.getElementById("jn-tab6-split-grid");
    if (!splitGrid) {
      const siblingsAfter = [];
      let cur = bannerCard.nextElementSibling;
      while (cur) {
        siblingsAfter.push(cur);
        cur = cur.nextElementSibling;
      }
      if (!siblingsAfter.length) return;

      splitGrid = document.createElement("div");
      splitGrid.id = "jn-tab6-split-grid";
      splitGrid.className = "grid grid-cols-1 lg:grid-cols-12 gap-5 items-start mt-4";

      const leftCol = document.createElement("div");
      leftCol.id = "jn-tab6-left-traps";
      leftCol.className = "lg:col-span-8 space-y-4";
      siblingsAfter.forEach(node => leftCol.appendChild(node));

      const defaultTopic = PORTAL === "NEET"
        ? "Biology • NCERT Line & Assertion-Reason Check"
        : "Physics & Math • Boundary & Distractor Check";

      const rightCol = document.createElement("div");
      rightCol.id = "jn-ai-doubts-card";
      rightCol.dataset.splitLayout = "1";
      rightCol.className = "lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3.5";
      rightCol.innerHTML = `
        <div>
          <div class="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">SOCRATIC AI TUTOR</div>
          <h3 class="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">AI Doubt &amp; Trap Breakdown</h3>
          <p class="text-xs text-slate-500 mt-1">Click any trap card&#39;s <strong>Ask AI Doubt Doctor</strong> link or paste your own ${PORTAL} question below.</p>
        </div>

        <div>
          <label class="block text-[11px] font-extrabold text-slate-700 dark:text-slate-300 mb-1">Topic / Trap Focus</label>
          <input id="jn-ai-doubt-topic" type="text" value="${defaultTopic}"
            class="w-full rounded-full border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3.5 py-2 text-xs font-extrabold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500" />
        </div>

        <div>
          <label class="block text-[11px] font-extrabold text-slate-700 dark:text-slate-300 mb-1">Question or Trap to Analyze</label>
          <textarea id="jn-ai-doubt-q" rows="4" placeholder="Paste any ${PORTAL} question or click 'Ask AI Doubt Doctor' on a trap card..."
            class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-3 text-xs leading-relaxed focus:outline-none focus:border-indigo-500"></textarea>
        </div>

        <button id="jn-ai-doubt-btn" type="button" onclick="window.submitJeeNeetAiDoubt(event)"
          class="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow cursor-pointer transition">
          &#10024; Analyze Trap &amp; Generate 30s Shortcut
        </button>

        <div id="jn-ai-doubt-out" style="display:none;" class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"></div>
      `;

      splitGrid.appendChild(leftCol);
      splitGrid.appendChild(rightCol);
      rootWrap.appendChild(splitGrid);
    }

    const leftArea = document.getElementById("jn-tab6-left-traps");
    if (leftArea) {
      const trapTitleEls = Array.from(leftArea.querySelectorAll("h2, h3, h4, div, p, span"))
        .filter(el => el.children.length === 0 && /^Trap #\d+\s*:/i.test((el.textContent || "").trim()));

      trapTitleEls.forEach(titleEl => {
        const card = titleEl.closest("div[class*='border'], div[class*='rounded'], div[class*='bg-white'], div[class*='p-']") || titleEl.parentElement;
        if (!card || card.dataset.aiLinkBound) return;
        card.dataset.aiLinkBound = "1";

        const trapTitle = titleEl.textContent.trim();
        const lines = Array.from(card.querySelectorAll("div, p"))
          .map(x => (x.textContent || "").trim())
          .filter(t => t && t !== trapTitle && !/^Mark Trap Mastered$/i.test(t) && !/^Ask AI Doubt Doctor/i.test(t));
        const uniqueLines = Array.from(new Set(lines)).slice(0, 3).join("\n");

        const linkBtn = document.createElement("button");
        linkBtn.type = "button";
        linkBtn.className = "mt-3 inline-flex items-center gap-1 text-xs font-extrabold text-indigo-600 hover:text-indigo-500 cursor-pointer";
        linkBtn.innerHTML = "&#9889; Ask AI Doubt Doctor About This Trap &rarr;";
        linkBtn.onclick = (e) => window.askAiAboutTrapCard(trapTitle, uniqueLines, e);
        card.appendChild(linkBtn);
      });
    }
  };

  setInterval(window.mountTab6AiDoubtBox, 450);
})();
