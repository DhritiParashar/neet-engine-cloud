// ==============================================================================
// GOALISB NEET UG MASTER — COMPLETE 6-TAB NATIVE ENGINE (ZERO GRE/IPMAT LEGACY)
// ==============================================================================
(function () {
  const EXAM = "NEET";
  const IS_JEE = (EXAM === "JEE");
  const MODES = [{'label': 'NEET UG Full 180-Q (720 Marks)', 'sub': '(NTA Standard)', 'sections': 'Physics (45 Qs) &bull; Chemistry (45 Qs) &bull; Botany (45 Qs) &bull; Zoology (45 Qs)'}, {'label': 'NCERT Line-by-Line Biology Vault', 'sub': '(360 Marks Core)', 'sections': 'Class 11 & 12 Botany + Zoology Verbatim NCERT Statements, Diagrams & Cycles'}, {'label': 'Assertion-Reason & Statement Clinic', 'sub': '(Trap Clinic)', 'sections': 'Statement I & II + Assertion-Reason Drills across Biology, Organic & Inorganic'}];
  const TABS = ['1. Physics, Chem & Biology (12x12)', '2. NCERT Line-by-Line Bio Vault', '3. Assertion-Reason Studio', '4. 180-Q / 720-Mark NEET Mock', '5. Subject Practice Mocks', '6. Trap Doctor & AI Doubts', '7. NEET AIR & AIIMS/GMC Forecaster'];

  function enforceScienceBrand(force) {
    if (window._BRAND_ENFORCED && !force) return;
    window._BRAND_ENFORCED = true;
    document.documentElement.classList.remove("dark"); document.body.classList.remove("dark"); document.title = "GOALisB NEET UG Master";
    document.querySelectorAll("div, span, h1, p").forEach(el => {
      const t = (el.textContent || "").trim();
      if (el.children.length === 0) {
        if (t === "GRE") el.textContent = "NEET";
        else if (t === "GOALisB GRE Master") el.textContent = "GOALisB NEET UG Master";
        else if (t === "GRE GENERAL") el.textContent = "NEET UG MEDICAL";
        else if (t.startsWith("Quant (27 Qs")) el.innerHTML = `Physics (45 Qs &bull; 180m) &bull; Chemistry (45 Qs &bull; 180m) &bull; Biology: Botany &amp; Zoology (90 Qs &bull; 360m) &bull; 720 Marks Scale`;
        else if (t.includes("Target: 332/340")) el.innerHTML = `Target: 685/720 (AIIMS / Top GMC) &bull; Readiness: 632/720 (~AIR 4,800)`;
      }
      if (t.startsWith("Exam Sections: Quant")) el.innerHTML = `<span class="font-bold">Exam Sections:</span> ${MODES[0].sections}`;
      else if (t.startsWith("Pattern: 54 Qs")) el.innerHTML = `<span class="font-bold">Pattern:</span> 180 Qs | 180 Mins (3 Hrs) | NTA OMR / CBT Scale`;
      else if (t.startsWith("Marking: MCQ +1/0")) el.innerHTML = `<span class="font-bold text-rose-600">Marking:</span> All 180 Compulsory MCQs: +4 Correct | -1 Incorrect`;
    });

    document.querySelectorAll("button").forEach(btn => {
      const txt = (btn.textContent || "").trim();
      if (txt.includes("GRE General Standard")) btn.innerHTML = `${MODES[0].label} <span class="opacity-80 font-normal">${MODES[0].sub}</span>`;
      else if (txt.includes("Quant 170 Perfection")) btn.innerHTML = `${MODES[1].label} <span class="opacity-80 font-normal">${MODES[1].sub}</span>`;
      else if (txt.includes("Verbal 165+")) btn.innerHTML = `${MODES[2].label} <span class="opacity-80 font-normal">${MODES[2].sub}</span>`;
      else if (txt.startsWith("1. Quantitative Reasoning")) btn.textContent = TABS[0];
      else if (txt.startsWith("2. Data Interpretation")) btn.textContent = TABS[1];
      else if (txt.startsWith("3. Verbal Studio")) btn.textContent = TABS[2];
      else if (txt.startsWith("4. Section-Adaptive Mock")) btn.textContent = TABS[3];
      else if (txt.startsWith("5. Trap Doctor")) btn.textContent = TABS[5];
      else if (txt.startsWith("6. GRE Score Forecaster")) btn.textContent = TABS[6];
    });

    // Hide any lingering legacy PYQ vault container outside main-workspace
    document.querySelectorAll("section, div").forEach(box => {
      const h = box.querySelector("h3");
      if (h && (h.textContent || "").includes("Live PostgreSQL Worked PYQs")) {
        box.style.display = "none";
      }
    });
  }

  window._SCI_MODULES = [];
  window._SCI_QUESTIONS = [];
  window._SCI_HYDRATED = false;
  window._SCI_MOD_IDX = 0;
  window._SCI_SUB = "THEORY";
  window._SCI_QIDX = 0;
  window._SCI_ATT = {};
  window._SCI_MOCK_ANS = {};
  window._SCI_MOCK_SUBMITTED = false;

  async function hydrateFromNeon() {
    if (window._SCI_HYDRATED && window._SCI_MODULES.length) return;
    try {
      const [mRes, qRes] = await Promise.all([
        fetch("/api/science/modules?exam=" + EXAM),
        fetch("/api/science/questions?exam=" + EXAM + "&limit=2500")
      ]);
      if (mRes.ok) {
        const md = await mRes.json();
        if (md.ok && Array.isArray(md.modules) && md.modules.length) {
          window._SCI_MODULES = md.modules.map(m => ({
            ...m,
            laws: typeof m.laws_json === "string" ? JSON.parse(m.laws_json) : (m.laws_json || []),
            worked_examples: typeof m.worked_examples_json === "string" ? JSON.parse(m.worked_examples_json) : (m.worked_examples_json || [])
          }));
        }
      }
      if (qRes.ok) {
        const qd = await qRes.json();
        if (qd.ok && Array.isArray(qd.questions) && qd.questions.length) {
          window._SCI_QUESTIONS = qd.questions.map(q => ({
            ...q,
            options_json: typeof q.options_json === "string" ? JSON.parse(q.options_json) : q.options_json
          }));
        }
      }
      if (window._SCI_MODULES.length) window._SCI_HYDRATED = true;
    } catch (_) {}
  }

  function getTarget(el) {
    return el || document.getElementById("main-workspace") || document.getElementById("tab-content") || document.querySelector("main");
  }

  // ============================================================================
  // TAB 1: 12x12 NCERT PCM / PCB MASTER MODULES & WORKED EXAMPLES + DRILLS
  // ============================================================================
  window.renderScienceTab1 = async function (el) {
    enforceScienceBrand();
    const target = getTarget(el);
    if (!target) return;
    await hydrateFromNeon();

    const mods = window._SCI_MODULES.filter(x => !String(x.module_code || "").startsWith("NEET-T2-"));
    if (!mods.length) {
      target.innerHTML = `<div class="p-8 text-center text-sm font-bold text-slate-500">Connecting to Neon PostgreSQL Science Bank...</div>`;
      return;
    }

    const modIdx = Math.min(mods.length - 1, Math.max(0, Number(window._SCI_MOD_IDX || 0)));
    const m = mods[modIdx];
    const modPrefix = String(m.module_code || "").replace(/-MOD$/, "");
    let drills = window._SCI_QUESTIONS.filter(q => String(q.question_code || "").startsWith(modPrefix));
    if (!drills.length) drills = window._SCI_QUESTIONS.filter(q => q.subject === m.subject && Number(q.ncert_class) === Number(m.ncert_class));
    if (!drills.length) drills = window._SCI_QUESTIONS.filter(q => q.subject === m.subject);

    const qIdx = Math.min(Math.max(0, drills.length - 1), Math.max(0, Number(window._SCI_QIDX || 0)));
    const d = drills[qIdx];
    const attMap = window._SCI_ATT[modIdx] || {};

    target.innerHTML = `
      <div class="max-w-7xl mx-auto pt-4 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div class="lg:col-span-4 space-y-2.5">
          <div class="text-xs font-extrabold uppercase tracking-wider text-emerald-600">NEET PCB MODULES (6 CHAPTERS • 12x12 NEON BANK)</div>
          ${mods.map((item, idx) => `
            <button type="button" onclick="window._SCI_MOD_IDX=${idx}; window._SCI_QIDX=0; window.renderScienceTab1();"
              class="w-full text-left p-4 rounded-2xl border cursor-pointer ${idx === modIdx
                ? "bg-emerald-50/90 dark:bg-emerald-950/60 border-emerald-500 shadow-sm"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300"}">
              <div class="text-[10px] font-extrabold uppercase text-emerald-600">${item.subject} &bull; NCERT CLASS ${item.ncert_class}</div>
              <div class="font-extrabold text-sm text-slate-900 dark:text-white leading-snug mt-0.5">${item.chapter_title}</div>
              <div class="text-xs text-slate-500 mt-1">${item.subtitle}</div>
            </button>
          `).join("")}
        </div>

        <div class="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
          <span class="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">${m.subject} &bull; NCERT CLASS ${m.ncert_class}</span>
          <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">${m.chapter_title}</h2>

          <div class="flex flex-wrap items-center gap-2">
            <button type="button" onclick="window._SCI_SUB='THEORY'; window.renderScienceTab1();"
              class="px-4 py-2 rounded-full text-xs font-bold cursor-pointer ${window._SCI_SUB === "THEORY" ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"}">
              NCERT Master Guide & 12 Worked Examples (${m.worked_examples.length})
            </button>
            <button type="button" onclick="window._SCI_SUB='DRILLS'; window.renderScienceTab1();"
              class="px-4 py-2 rounded-full text-xs font-bold cursor-pointer ${window._SCI_SUB === "DRILLS" ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"}">
              Practice Drills (${drills.length} Items &bull; +4 / -1)
            </button>
          </div>

          ${window._SCI_SUB === "THEORY" ? `
            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <div class="flex items-center justify-between">
                <span class="font-extrabold uppercase text-[11px] text-emerald-600">COMPREHENSIVE CHAPTER OVERVIEW &amp; CONCEPT BRIDGE</span>
                <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">12&times;12 Master Guide</span>
              </div>
              <p>${m.overview}</p>
              <p><strong>Concept Bridge:</strong> ${m.concept_bridge}</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div class="p-3 rounded-xl border bg-slate-50 dark:bg-slate-950"><div class="text-[10px] font-bold uppercase text-slate-400">Exam Weightage</div><div class="font-extrabold mt-0.5">${m.weightage_label}</div></div>
              <div class="p-3 rounded-xl border bg-slate-50 dark:bg-slate-950"><div class="text-[10px] font-bold uppercase text-slate-400">Target Pace</div><div class="font-extrabold text-emerald-600 mt-0.5">${m.target_pace}</div></div>
              <div class="p-3 rounded-xl border bg-slate-50 dark:bg-slate-950"><div class="text-[10px] font-bold uppercase text-slate-400">Core Strategy</div><div class="font-extrabold text-amber-600 mt-0.5">${m.strategy_tag}</div></div>
            </div>

            <div class="space-y-2">
              ${m.laws.map(r => `
                <div class="p-3.5 rounded-xl border bg-white dark:bg-slate-950 text-xs">
                  <div class="font-extrabold">${r.name}</div>
                  <div class="text-slate-600 dark:text-slate-300 mt-0.5">${r.desc}</div>
                </div>
              `).join("")}
            </div>

            <div class="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-3">
              <div class="text-xs font-extrabold uppercase text-emerald-800 dark:text-emerald-300">GRADED WORKED EXAMPLES (${m.worked_examples.length} SOLVED STEP-BY-STEP)</div>
              ${m.worked_examples.map(w => `
                <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                  <div class="flex items-center justify-between gap-2">
                    <span class="font-extrabold text-slate-900 dark:text-white">${w.p}</span>
                    <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold shrink-0">${w.tier}</span>
                  </div>
                  <div class="text-slate-600 dark:text-slate-300 whitespace-pre-line">${w.s}</div>
                </div>
              `).join("")}
            </div>
          ` : (d ? `
            <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div class="text-xs font-extrabold uppercase tracking-wider text-emerald-600">INTERACTIVE PRACTICE WORKBENCH (${drills.length} ITEMS &bull; NEON POSTGRESQL)</div>
                  <div class="text-xs text-slate-500 mt-0.5">Attempted: <strong>${Object.keys(attMap).length}/${drills.length}</strong> &bull; Correct: <strong class="text-emerald-600">${Object.values(attMap).filter(Boolean).length}</strong></div>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  ${drills.map((_, i) => `
                    <button type="button" onclick="window._SCI_QIDX=${i}; window.renderScienceTab1();"
                      class="w-7 h-7 rounded-lg text-xs font-bold border cursor-pointer ${i === qIdx ? "bg-emerald-600 text-white border-emerald-600" : (attMap[i] ? "bg-emerald-600 text-white border-emerald-600" : "bg-white dark:bg-slate-900 border-slate-300")}">${i + 1}</button>
                  `).join("")}
                </div>
              </div>

              <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-extrabold text-emerald-600">${d.question_code} &bull; Question ${qIdx + 1} of ${drills.length}</span>
                  <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">${d.question_type} &bull; +4 / -1</span>
                </div>
                <div class="text-sm font-bold text-slate-900 dark:text-white leading-relaxed whitespace-pre-line">${d.prompt}</div>

                ${d.question_type === "NUMERICAL_INT" ? `
                  <div class="flex flex-wrap items-center gap-2 pt-1">
                    <input id="sci-num-input" type="text" placeholder="Enter exact numerical value..." class="rounded-xl border border-slate-300 dark:border-slate-700 px-3.5 py-2 text-sm font-mono font-bold" />
                    <button type="button" onclick="const v=(document.getElementById('sci-num-input').value||'').trim(); const ok=(v==='${d.correct_answer}'); window._SCI_ATT[${modIdx}]=window._SCI_ATT[${modIdx}]||{}; window._SCI_ATT[${modIdx}][${qIdx}]=ok; const s=document.getElementById('sci-t1-sol'); s.classList.remove('hidden'); s.innerHTML='<strong>'+(ok?'Correct (+4)! ':'Incorrect (-1). Expected: ${d.correct_answer} — ')+'</strong>'+s.dataset.exp;"
                      class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold cursor-pointer">Submit Numerical (+4 / -1)</button>
                  </div>
                ` : `
                  <div class="grid grid-cols-1 gap-2 text-xs">
                    ${(d.options_json || []).map((opt, oi) => `
                      <button type="button" onclick="const ok=(String(${oi})==='${d.correct_answer}'); window._SCI_ATT[${modIdx}]=window._SCI_ATT[${modIdx}]||{}; window._SCI_ATT[${modIdx}][${qIdx}]=ok; document.getElementById('sci-t1-sol').classList.remove('hidden'); this.classList.add(ok ? 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold' : 'bg-rose-100 border-rose-400 text-rose-900');"
                        class="text-left p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 font-medium cursor-pointer"><strong>(${String.fromCharCode(65 + oi)})</strong> ${opt}</button>
                    `).join("")}
                  </div>
                `}

                <div id="sci-t1-sol" data-exp="${String(d.explanation || '').replace(/"/g, '&quot;')}" class="hidden p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                  <strong>Official Solution:</strong> ${d.explanation}
                </div>
                <div class="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button type="button" onclick="if(window._SCI_QIDX>0){window._SCI_QIDX--; window.renderScienceTab1();}" class="px-3.5 py-1.5 rounded-xl border text-xs font-bold cursor-pointer">&larr; Previous</button>
                  <button type="button" onclick="if(window._SCI_QIDX<${drills.length - 1}){window._SCI_QIDX++; window.renderScienceTab1();}" class="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer">Next Question &rarr;</button>
                </div>
              </div>
            </div>
          ` : `<div class="text-xs text-slate-500">Loading items...</div>`)}
        </div>
      </div>
    `;
  };

  // ============================================================================
  // TAB 2: ORGANIC & DERIVATION LAB (JEE) / NCERT BIO LINE-BY-LINE VAULT (NEET)
  // ============================================================================
  window._NT2_MOD_IDX = 0;
  window._NT2_SUB = "THEORY";
  window._NT2_QIDX = 0;
  window._NT2_ATT = {};

  window.renderScienceTab2 = async function (el) {
    enforceScienceBrand();
    const target = getTarget(el);
    if (!target) return;
    await hydrateFromNeon();

    const mods = window._SCI_MODULES.filter(x => String(x.module_code || "").startsWith("NEET-T2-"));
    if (!mods.length) {
      target.innerHTML = `<div class="p-8 text-center text-sm font-bold text-slate-500">Loading NCERT Line-by-Line Biology Vault from Neon...</div>`;
      return;
    }

    const modIdx = Math.min(mods.length - 1, Math.max(0, Number(window._NT2_MOD_IDX || 0)));
    const m = mods[modIdx];
    const modPrefix = String(m.module_code || "").replace(/-MOD$/, "");
    const drills = window._SCI_QUESTIONS.filter(q => String(q.question_code || "").startsWith(modPrefix));
    const qIdx = Math.min(Math.max(0, drills.length - 1), Math.max(0, Number(window._NT2_QIDX || 0)));
    const d = drills[qIdx];
    const attMap = window._NT2_ATT[modIdx] || {};

    target.innerHTML = `
      <div class="max-w-7xl mx-auto pt-4 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div class="lg:col-span-4 space-y-2.5">
          <div class="text-xs font-extrabold uppercase tracking-wider text-emerald-600">NCERT LINE-BY-LINE BIO VAULT (6 CHAPTERS &bull; 12&times;12 NEON BANK)</div>
          ${mods.map((item, idx) => `
            <button type="button" onclick="window._NT2_MOD_IDX=${idx}; window._NT2_QIDX=0; window.renderScienceTab2();"
              class="w-full text-left p-4 rounded-2xl border cursor-pointer ${idx === modIdx
                ? "bg-emerald-50/90 border-emerald-500 shadow-sm"
                : "bg-white border-slate-200 hover:border-emerald-300"}">
              <div class="text-[10px] font-extrabold uppercase text-emerald-600">${item.subject} &bull; NCERT CLASS ${item.ncert_class}</div>
              <div class="font-extrabold text-sm text-slate-900 leading-snug mt-0.5">${item.chapter_title}</div>
              <div class="text-xs text-slate-500 mt-1">${item.subtitle}</div>
            </button>
          `).join("")}
        </div>

        <div class="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <span class="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">${m.subject} &bull; NCERT CLASS ${m.ncert_class}</span>
          <h2 class="text-xl font-extrabold text-slate-900">${m.chapter_title}</h2>

          <div class="flex flex-wrap items-center gap-2">
            <button type="button" onclick="window._NT2_SUB='THEORY'; window.renderScienceTab2();"
              class="px-4 py-2 rounded-full text-xs font-bold cursor-pointer ${window._NT2_SUB === "THEORY" ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 text-slate-700"}">
              NCERT Master Guide &amp; 12 Worked Examples (${m.worked_examples.length})
            </button>
            <button type="button" onclick="window._NT2_SUB='DRILLS'; window.renderScienceTab2();"
              class="px-4 py-2 rounded-full text-xs font-bold cursor-pointer ${window._NT2_SUB === "DRILLS" ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 text-slate-700"}">
              Practice Drills (${drills.length} Items &bull; +4 / -1)
            </button>
          </div>

          ${window._NT2_SUB === "THEORY" ? `
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs leading-relaxed text-slate-700">
              <div class="flex items-center justify-between">
                <span class="font-extrabold uppercase text-[11px] text-emerald-600">EXHAUSTIVE NCERT OVERVIEW &amp; CONCEPT BRIDGE</span>
                <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">12&times;12 Bio Vault</span>
              </div>
              <p>${m.overview}</p>
              <p><strong>Concept Bridge:</strong> ${m.concept_bridge}</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div class="p-3 rounded-xl border bg-slate-50"><div class="text-[10px] font-bold uppercase text-slate-400">Exam Weightage</div><div class="font-extrabold mt-0.5">${m.weightage_label}</div></div>
              <div class="p-3 rounded-xl border bg-slate-50"><div class="text-[10px] font-bold uppercase text-slate-400">Target Pace</div><div class="font-extrabold text-emerald-600 mt-0.5">${m.target_pace}</div></div>
              <div class="p-3 rounded-xl border bg-slate-50"><div class="text-[10px] font-bold uppercase text-slate-400">Core Strategy</div><div class="font-extrabold text-amber-600 mt-0.5">${m.strategy_tag}</div></div>
            </div>

            <div class="space-y-2">
              ${m.laws.map(r => `
                <div class="p-3.5 rounded-xl border bg-white text-xs">
                  <div class="font-extrabold">${r.name}</div>
                  <div class="text-slate-600 mt-0.5">${r.desc}</div>
                </div>
              `).join("")}
            </div>

            <div class="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
              <div class="text-xs font-extrabold uppercase text-emerald-800">GRADED WORKED EXAMPLES (${m.worked_examples.length} SOLVED STEP-BY-STEP)</div>
              ${m.worked_examples.map(w => `
                <div class="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-1.5">
                  <div class="flex items-center justify-between gap-2">
                    <span class="font-extrabold text-slate-900">${w.p}</span>
                    <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold shrink-0">${w.tier}</span>
                  </div>
                  <div class="text-slate-600 whitespace-pre-line">${w.s}</div>
                </div>
              `).join("")}
            </div>
          ` : (d ? `
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div class="text-xs font-extrabold uppercase tracking-wider text-emerald-600">INTERACTIVE PRACTICE WORKBENCH (${drills.length} ITEMS &bull; NEON POSTGRESQL)</div>
                  <div class="text-xs text-slate-500 mt-0.5">Attempted: <strong>${Object.keys(attMap).length}/${drills.length}</strong> &bull; Correct: <strong class="text-emerald-600">${Object.values(attMap).filter(Boolean).length}</strong></div>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  ${drills.map((_, i) => `
                    <button type="button" onclick="window._NT2_QIDX=${i}; window.renderScienceTab2();"
                      class="w-7 h-7 rounded-lg text-xs font-bold border cursor-pointer ${i === qIdx ? "bg-emerald-600 text-white border-emerald-600" : (attMap[i] ? "bg-emerald-700 text-white border-emerald-700" : "bg-white border-slate-300")}">${i + 1}</button>
                  `).join("")}
                </div>
              </div>

              <div class="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-extrabold text-emerald-600">${d.question_code} &bull; Question ${qIdx + 1} of ${drills.length}</span>
                  <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">${d.question_type} &bull; +4 / -1</span>
                </div>
                <div class="text-sm font-bold text-slate-900 leading-relaxed whitespace-pre-line">${d.prompt}</div>

                <div class="grid grid-cols-1 gap-2 text-xs">
                  ${(d.options_json || []).map((opt, oi) => `
                    <button type="button" onclick="const ok=(String(${oi})==='${d.correct_answer}'); window._NT2_ATT[${modIdx}]=window._NT2_ATT[${modIdx}]||{}; window._NT2_ATT[${modIdx}][${qIdx}]=ok; document.getElementById('nt2-sol').classList.remove('hidden'); this.classList.add(ok ? 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold' : 'bg-rose-100 border-rose-400 text-rose-900');"
                      class="text-left p-3 rounded-xl border border-slate-200 hover:border-emerald-500 font-medium cursor-pointer"><strong>(${String.fromCharCode(65 + oi)})</strong> ${opt}</button>
                  `).join("")}
                </div>

                <div id="nt2-sol" class="hidden p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                  <strong>NCERT Solution:</strong> ${d.explanation}
                </div>
                <div class="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button type="button" onclick="if(window._NT2_QIDX>0){window._NT2_QIDX--; window.renderScienceTab2();}" class="px-3.5 py-1.5 rounded-xl border text-xs font-bold cursor-pointer">&larr; Previous</button>
                  <button type="button" onclick="if(window._NT2_QIDX<${drills.length - 1}){window._NT2_QIDX++; window.renderScienceTab2();}" class="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer">Next Question &rarr;</button>
                </div>
              </div>
            </div>
          ` : `<div class="text-xs text-slate-500">Loading items...</div>`)}
        </div>
      </div>
    `;
  };

  // ============================================================================
  // TAB 3: INTERACTIVE ASSERTION-REASON & STATEMENT I/II STUDIO (+4 / -1)
  // ============================================================================
  window._NT3_SUBJ = "ALL";
  window._NT3_TYPE = "ALL";
  window._NT3_ANS = {};
  window._NT3_RES = {};

  window.renderScienceTab3 = async function (el) {
    enforceScienceBrand();
    const target = getTarget(el);
    if (!target) return;
    await hydrateFromNeon();

    const allAR = window._SCI_QUESTIONS.filter(q =>
      q.question_type === "ASSERTION_REASON" || q.question_type === "STATEMENT_I_II"
    );
    const filtered = allAR.filter(q =>
      (window._NT3_SUBJ === "ALL" || q.subject === window._NT3_SUBJ) &&
      (window._NT3_TYPE === "ALL" || q.question_type === window._NT3_TYPE)
    );

    const attempted = Object.keys(window._NT3_RES).length;
    const correct = Object.values(window._NT3_RES).filter(Boolean).length;
    const wrong = attempted - correct;
    const netScore = correct * 4 - wrong;

    target.innerHTML = `
      <div class="max-w-6xl mx-auto pt-4 pb-10 space-y-4">
        <div class="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div class="text-xs font-extrabold uppercase tracking-wider text-emerald-600">NTA NEET UG ASSERTION-REASON &amp; STATEMENT I/II CLINIC (${allAR.length} NEON ITEMS)</div>
              <h2 class="text-xl font-extrabold text-slate-900 mt-0.5">3. Assertion-Reason Studio (+4 Correct / -1 Incorrect)</h2>
            </div>
            <div class="flex flex-wrap items-center gap-2 text-xs">
              <span class="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 font-extrabold text-emerald-900">Net Score: ${netScore} (${correct}/${attempted} Correct)</span>
              <button type="button" onclick="window._NT3_ANS={}; window._NT3_RES={}; window.renderScienceTab3();" class="px-3 py-1.5 rounded-xl border border-slate-300 font-bold hover:bg-slate-50 cursor-pointer">Reset Studio</button>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
            <div class="flex flex-wrap gap-1.5">
              ${["ALL", "BOTANY", "ZOOLOGY", "CHEMISTRY", "PHYSICS"].map(s => `
                <button type="button" onclick="window._NT3_SUBJ='${s}'; window.renderScienceTab3();"
                  class="px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer ${window._NT3_SUBJ === s ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}">${s}</button>
              `).join("")}
            </div>
            <div class="flex flex-wrap gap-1.5">
              ${[["ALL", "All Formats"], ["ASSERTION_REASON", "Assertion-Reason"], ["STATEMENT_I_II", "Statement I & II"]].map(([k, lbl]) => `
                <button type="button" onclick="window._NT3_TYPE='${k}'; window.renderScienceTab3();"
                  class="px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer ${window._NT3_TYPE === k ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}">${lbl}</button>
              `).join("")}
            </div>
          </div>

          ${!filtered.length ? `
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <div class="text-sm font-bold text-slate-700">No items match this specific subject + format filter yet.</div>
              <button type="button" onclick="window._NT3_SUBJ='ALL'; window._NT3_TYPE='ALL'; window.renderScienceTab3();" class="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-extrabold cursor-pointer">Show All ${allAR.length} Assertion-Reason &amp; Statement Items</button>
            </div>
          ` : `
            <div class="space-y-4">
              ${filtered.map((q, idx) => {
                const qKey = q.question_code;
                const evaluated = (qKey in window._NT3_RES);
                const chosen = window._NT3_ANS[qKey];
                const isOk = window._NT3_RES[qKey];
                return `
                  <div class="p-5 rounded-2xl border ${evaluated ? (isOk ? "border-emerald-400 bg-emerald-50/30" : "border-rose-400 bg-rose-50/30") : "border-slate-200 bg-slate-50"} space-y-3 text-xs">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                      <span class="font-extrabold text-emerald-700">#${idx + 1} &bull; ${q.question_code} &bull; ${q.subject} (Class ${q.ncert_class})</span>
                      <span class="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 font-bold text-slate-600">${q.question_type} &bull; ${q.difficulty_tier}</span>
                    </div>
                    <div class="text-sm font-bold text-slate-900 leading-relaxed whitespace-pre-line">${q.prompt}</div>

                    <div class="grid grid-cols-1 gap-2 pt-1">
                      ${(q.options_json || []).map((opt, oi) => {
                        let btnCls = "bg-white border-slate-200 hover:border-emerald-500 text-slate-900";
                        if (evaluated) {
                          if (String(oi) === String(q.correct_answer)) btnCls = "bg-emerald-100 border-emerald-500 text-emerald-950 font-extrabold";
                          else if (String(oi) === String(chosen)) btnCls = "bg-rose-100 border-rose-500 text-rose-950 font-bold";
                        }
                        return `
                          <button type="button" onclick="window._NT3_ANS['${qKey}']='${oi}'; window._NT3_RES['${qKey}']=(String(${oi})==='${q.correct_answer}'); window.renderScienceTab3();"
                            class="text-left p-3 rounded-xl border cursor-pointer ${btnCls}">
                            <strong>(${String.fromCharCode(65 + oi)})</strong> ${opt}
                          </button>
                        `;
                      }).join("")}
                    </div>

                    ${evaluated ? `
                      <div class="p-3.5 rounded-xl bg-white border border-emerald-200 text-xs text-slate-800 leading-relaxed">
                        <strong class="${isOk ? "text-emerald-700" : "text-rose-700"}">${isOk ? "✓ Correct (+4 Marks):" : "✗ Incorrect (-1 Mark):"}</strong> ${q.explanation}
                      </div>
                    ` : ""}
                  </div>
                `;
              }).join("")}
            </div>
          `}
        </div>
      </div>
    `;
  };

  // ============================================================================
  // TAB 4: FULL-LENGTH NTA MOCK SIMULATOR + DIFFICULTY CALIBRATION + LEDGER (v46)
  // ============================================================================
  const LOG_KEY = IS_JEE ? "goalisb_jee_full_mock_ledger_v1" : "goalisb_neet_full_mock_ledger_v1";
  const SYNC_KEY = IS_JEE ? "goalisb_jee_verified_standing_v1" : "goalisb_neet_verified_standing_v1";
  const REQUIRED_QS = IS_JEE ? 75 : 180;
  const MAX_MARKS = IS_JEE ? 300 : 720;

  window._MOCK_DIFF = window._MOCK_DIFF || "MODERATE";

  function getDiffMeta(diffCode) {
    const d = (diffCode || window._MOCK_DIFF || "MODERATE").toUpperCase();
    if (d === "TOUGH") {
      const adj = IS_JEE ? 14 : 15;
      return { code: "TOUGH", adj, label: IS_JEE ? `Tough Shift (+${adj} Eq.)` : `Tough Paper (+${adj} Eq.)`, short: "TOUGH" };
    }
    if (d === "EASY") {
      const adj = IS_JEE ? -12 : -10;
      return { code: "EASY", adj, label: IS_JEE ? `High-Cutoff Shift (${adj} Eq.)` : `High-Cutoff Paper (${adj} Eq.)`, short: "EASY" };
    }
    return { code: "MODERATE", adj: 0, label: "Standard NTA Paper (0 Eq.)", short: "STANDARD" };
  }

  window.setFullMockDifficulty = function (diffCode) {
    if (window._CBT_STARTED && !window._CBT_SUBMITTED) {
      alert("Finish or Abort your active session before changing Paper Difficulty.");
      return;
    }
    window._MOCK_DIFF = diffCode;
    window._ACTIVE_MOCK_PAPER = null;
    window._ACTIVE_MOCK_PAPER_ID = null;
    window.renderScienceTab4();
  };

  function newSerialId() {
    const num = Math.floor(1000 + Math.random() * 9000);
    return (IS_JEE ? "JEE-2026-" : "NEET-2026-") + num;
  }

  function getCandidateName() {
    try {
      const raw = localStorage.getItem("ipm_user_profile") || localStorage.getItem("goalisb_exam_prep_profile_v1") || localStorage.getItem("ipm_user");
      if (raw) {
        const u = JSON.parse(raw);
        if (u && (u.full_name || u.name)) return u.full_name || u.name;
      }
    } catch (_) {}
    return "Senapati Roy";
  }

  function getVerifiedFullMockLogs() {
    try {
      const raw = JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
      return Array.isArray(raw)
        ? raw.filter(x => x && x.status === "SUBMITTED" && Number(x.totalQuestions) === REQUIRED_QS && Number(x.maxScore) === MAX_MARKS)
        : [];
    } catch (_) {
      return [];
    }
  }

  function saveVerifiedFullMock(entry) {
    if (!entry || entry.status !== "SUBMITTED" || Number(entry.totalQuestions) !== REQUIRED_QS) return;
    const logs = getVerifiedFullMockLogs();
    logs.unshift(entry);
    localStorage.setItem(LOG_KEY, JSON.stringify(logs.slice(0, 30)));
    localStorage.setItem(SYNC_KEY, JSON.stringify(entry));
  }

  window._MOCK_SERIAL_ID = window._MOCK_SERIAL_ID || newSerialId();
  window._CBT_STARTED = !!window._CBT_STARTED;
  window._CBT_IDX = Number(window._CBT_IDX || 0);
  window._CBT_ANS = window._CBT_ANS || {};
  window._CBT_REVIEW = window._CBT_REVIEW || {};
  window._CBT_VISITED = window._CBT_VISITED || { 0: true };
  window._CBT_SUBMITTED = !!window._CBT_SUBMITTED;
  if (typeof window._CBT_SEC_LEFT !== "number") window._CBT_SEC_LEFT = 180 * 60;
  window._CBT_TIMER_ID = window._CBT_TIMER_ID || null;

  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickWeightedPool(pool, count, diffCode) {
    if (!pool.length) return [];
    let prioritized = pool.slice();
    if (diffCode === "TOUGH") {
      const hard = pool.filter(q => q.difficulty_tier === "AIR_TOP_500" || q.difficulty_tier === "CONTENDER_98_650");
      if (hard.length >= Math.min(count, 10)) prioritized = hard;
    } else if (diffCode === "EASY") {
      const base = pool.filter(q => q.difficulty_tier === "FOUNDATION" || q.difficulty_tier === "CONTENDER_98_650");
      if (base.length >= Math.min(count, 10)) prioritized = base;
    }
    const out = [];
    while (out.length < count) {
      const batch = shuffleArray(prioritized);
      for (let i = 0; i < batch.length && out.length < count; i++) out.push(batch[i]);
    }
    return out;
  }

  function buildFullMockPaper() {
    const dMeta = getDiffMeta();
    const cacheKey = window._MOCK_SERIAL_ID + "_" + dMeta.code;
    if (window._ACTIVE_MOCK_PAPER && window._ACTIVE_MOCK_PAPER_ID === cacheKey && window._ACTIVE_MOCK_PAPER.length === REQUIRED_QS) {
      return window._ACTIVE_MOCK_PAPER;
    }
    let paper = [];
    if (IS_JEE) {
      ["PHYSICS", "CHEMISTRY", "MATHEMATICS"].forEach(subj => {
        const mcqs = window._SCI_QUESTIONS.filter(q => q.subject === subj && q.question_type !== "NUMERICAL_INT");
        const nums = window._SCI_QUESTIONS.filter(q => q.subject === subj && q.question_type === "NUMERICAL_INT");
        pickWeightedPool(mcqs, 20, dMeta.code).forEach(base => paper.push({ ...base, mock_sec: "Section A (MCQ)", mock_subj: subj }));
        pickWeightedPool(nums, 5, dMeta.code).forEach(base => paper.push({ ...base, mock_sec: "Section B (Numerical)", mock_subj: subj }));
      });
    } else {
      [["PHYSICS", 45], ["CHEMISTRY", 45], ["BOTANY", 45], ["ZOOLOGY", 45]].forEach(([subj, count]) => {
        const pool = window._SCI_QUESTIONS.filter(q => q.subject === subj && Array.isArray(q.options_json) && q.options_json.length >= 4);
        pickWeightedPool(pool, count, dMeta.code).forEach(base => paper.push({ ...base, mock_sec: "Compulsory MCQ", mock_subj: subj }));
      });
    }
    if (paper.length === REQUIRED_QS) {
      window._ACTIVE_MOCK_PAPER = paper;
      window._ACTIVE_MOCK_PAPER_ID = cacheKey;
    }
    return paper;
  }

  function ensureMockTimer() {
    if (window._CBT_TIMER_ID) return;
    window._CBT_TIMER_ID = setInterval(() => {
      if (!window._CBT_STARTED || window._CBT_SUBMITTED) return;
      const el = document.getElementById("cbt-clock");
      if (!el) return;
      if (window._CBT_SEC_LEFT > 0) window._CBT_SEC_LEFT--;
      const h = String(Math.floor(window._CBT_SEC_LEFT / 3600)).padStart(2, "0");
      const m = String(Math.floor((window._CBT_SEC_LEFT % 3600) / 60)).padStart(2, "0");
      const s = String(window._CBT_SEC_LEFT % 60).padStart(2, "0");
      el.textContent = `${h}:${m}:${s}`;
    }, 1000);
  }

  function evaluateMockPaper(paper) {
    const dMeta = getDiffMeta();
    let totalScore = 0, totalCorrect = 0, totalWrong = 0, totalAttempted = 0;
    const subjStats = IS_JEE
      ? { PHYSICS: { c: 0, w: 0, s: 0, max: 100 }, CHEMISTRY: { c: 0, w: 0, s: 0, max: 100 }, MATHEMATICS: { c: 0, w: 0, s: 0, max: 100 } }
      : { PHYSICS: { c: 0, w: 0, s: 0, max: 180 }, CHEMISTRY: { c: 0, w: 0, s: 0, max: 180 }, BOTANY: { c: 0, w: 0, s: 0, max: 180 }, ZOOLOGY: { c: 0, w: 0, s: 0, max: 180 } };

    const itemsAudit = paper.map((item, idx) => {
      const rawAns = window._CBT_ANS[idx];
      const hasAns = rawAns !== undefined && String(rawAns).trim() !== "";
      let statusLabel = "Unattempted (0 Marks)", userText = "(No response submitted)", isCorrect = false;
      const officialText = (item.question_type === "NUMERICAL_INT" || !Array.isArray(item.options_json))
        ? String(item.correct_answer)
        : `(${String.fromCharCode(65 + Number(item.correct_answer))}) ${item.options_json[Number(item.correct_answer)] || item.correct_answer}`;

      if (hasAns) {
        totalAttempted++;
        if (item.question_type === "NUMERICAL_INT" || !Array.isArray(item.options_json)) {
          userText = String(rawAns).trim();
          isCorrect = (Number(userText) === Number(item.correct_answer)) || (userText === String(item.correct_answer).trim());
        } else {
          const oi = Number(rawAns);
          userText = `(${String.fromCharCode(65 + oi)}) ${item.options_json[oi] || rawAns}`;
          isCorrect = (String(oi) === String(item.correct_answer).trim());
        }
        if (isCorrect) {
          totalScore += 4; totalCorrect++; subjStats[item.mock_subj].c++; subjStats[item.mock_subj].s += 4; statusLabel = "Correct (+4 Marks)";
        } else {
          totalScore -= 1; totalWrong++; subjStats[item.mock_subj].w++; subjStats[item.mock_subj].s -= 1; statusLabel = "Incorrect (-1 Mark)";
        }
      }
      return { num: idx + 1, subj: item.mock_subj, sec: item.mock_sec, chapter: item.chapter_name || "", prompt: item.prompt || "", statusLabel, isCorrect, hasAns, userText, officialText, explanation: item.explanation || "" };
    });

    const unattempted = paper.length - totalAttempted;
    const accuracy = totalAttempted > 0 ? ((totalCorrect / totalAttempted) * 100).toFixed(1) : "0.0";
    const elapsedSec = Math.max(1, 180 * 60 - window._CBT_SEC_LEFT);
    const pacePerQ = (elapsedSec / Math.max(1, paper.length)).toFixed(1) + "s/Q";
    const minsTaken = Math.floor(elapsedSec / 60) + "m " + (elapsedSec % 60) + "s";

    // Corroborate calibrated score with selected Paper Difficulty / NTA Shift offset
    const effScore = Math.min(MAX_MARKS, Math.max(0, totalScore + dMeta.adj));
    const verdict = totalAttempted < Math.round(paper.length * 0.35)
      ? `Under-Attempted (${dMeta.label})`
      : (Number(accuracy) >= 82 ? `High Precision on ${dMeta.label}` : `Moderate Accuracy (${dMeta.label} — Audit Traps in Tab 6)`);

    const projection = IS_JEE
      ? (effScore >= 265 ? "99.95+ %ile (AIR 350–850 • Top IIT / NIT Trichy CSE)" : effScore >= 235 ? "99.72 %ile (AIR 2,200–3,800 • Top NIT CSE)" : effScore >= 210 ? "99.35 %ile (AIR 6,500–9,200 • Top NITs Core)" : effScore >= 180 ? "98.45 %ile (AIR 16,000–22,000 • Top IIIT / NIT)" : effScore >= 145 ? "96.20 %ile (JEE Adv Cutoff Cleared)" : "Below 94 %ile (Foundation Rebuild Needed)")
      : (effScore >= 705 ? "AIR 1–150 (AIIMS New Delhi / MAMC)" : effScore >= 685 ? "AIR 400–1,800 (Top AIIMS & JIPMER)" : effScore >= 660 ? "AIR 2,800–6,500 (Premier Govt Medical College)" : effScore >= 630 ? "AIR 11,000–21,000 (Govt MBBS AIQ)" : effScore >= 595 ? "AIR 26,000–42,000 (State Quota MBBS)" : "Below Govt Cutoff (NCERT Bio 345+ Sprint Needed)");

    return { totalScore, effScore, diffCode: dMeta.code, diffLabel: dMeta.label, diffAdj: dMeta.adj, totalCorrect, totalWrong, totalAttempted, unattempted, accuracy, pacePerQ, verdict, subjStats, projection, minsTaken, itemsAudit };
  }

  async function fetchDynamicMockFromPostgres() {
    const dMeta = getDiffMeta();
    try {
      const res = await fetch("/api/science/mock-paper?exam=" + EXAM + "&scope=FULL&difficulty=" + dMeta.code + "&ts=" + Date.now(), { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.ok && Array.isArray(data.paper) && data.paper.length === REQUIRED_QS) {
          window._ACTIVE_MOCK_PAPER = data.paper.map(q => ({
            ...q,
            options_json: typeof q.options_json === "string" ? JSON.parse(q.options_json) : q.options_json
          }));
          window._ACTIVE_MOCK_PAPER_ID = window._MOCK_SERIAL_ID + "_" + dMeta.code;
          return true;
        }
      }
    } catch (_) {}
    return false;
  }

  window.launchProctoredMockSession = function () {
    const chk = document.getElementById("cbt-launch-decl");
    if (chk && !chk.checked) {
      alert("Please check the NTA Candidate Honor-Code Declaration box before launching the session.");
      return;
    }
    window._CBT_STARTED = true;
    window._CBT_SUBMITTED = false;
    window._CBT_SEC_LEFT = 180 * 60;
    window._CBT_IDX = 0;
    window._CBT_VISITED = { 0: true };
    window.renderScienceTab4();
    fetchDynamicMockFromPostgres().then(ok => {
      if (ok && window._CBT_STARTED && !window._CBT_SUBMITTED && Object.keys(window._CBT_ANS).length === 0) {
        window.renderScienceTab4();
      }
    });
  };

  window.submitMockAndSync = function () {
    const paper = buildFullMockPaper();
    const res = evaluateMockPaper(paper);
    if (res.totalAttempted < 5) {
      const ok = confirm(`You answered only ${res.totalAttempted}/${REQUIRED_QS} questions. Submitting records Raw ${res.totalScore}/${MAX_MARKS} (Calibrated ${res.effScore}/${MAX_MARKS} under ${res.diffLabel}) in the Ledger and Tab 7 Forecaster. Proceed?`);
      if (!ok) return;
    }
    window._CBT_SUBMITTED = true;
    saveVerifiedFullMock({
      sessionId: window._MOCK_SERIAL_ID,
      timestamp: new Date().toLocaleString(),
      blueprint: IS_JEE ? `Full JEE Main CBT (75 Qs • ${res.diffLabel})` : `Full NEET UG OMR (180 Qs • ${res.diffLabel})`,
      difficulty: res.diffCode,
      diffLabel: res.diffLabel,
      diffAdj: res.diffAdj,
      candidate: getCandidateName(),
      status: "SUBMITTED",
      totalQuestions: REQUIRED_QS,
      timeTaken: res.minsTaken,
      pacePerQ: res.pacePerQ,
      accuracy: res.accuracy,
      verdict: res.verdict,
      counts: `${res.totalCorrect}C / ${res.totalWrong}W / ${res.unattempted}U`,
      totalScore: res.totalScore,
      effScore: res.effScore,
      maxScore: MAX_MARKS,
      projection: res.projection,
      subjects: res.subjStats,
      itemsAudit: res.itemsAudit
    });
    window.renderScienceTab4();
  };

  window.openResetDeclarationModal = function (mode) {
    window._RESET_MODAL_MODE = mode;
    window.renderScienceTab4();
  };

  window.confirmResetWithDeclaration = function () {
    const chk = document.getElementById("cbt-reset-decl-chk");
    if (!chk || !chk.checked) {
      alert("Please tick the Candidate Reset Declaration checkbox to confirm.");
      return;
    }
    const mode = window._RESET_MODAL_MODE;
    window._RESET_MODAL_MODE = null;
    if (mode === "CLEAR_LEDGER") {
      localStorage.removeItem(LOG_KEY);
      localStorage.removeItem(SYNC_KEY);
      window._T6_SYNCED_ID = null;
      window._T6_MODE = "TARGET";
      window.renderScienceTab4();
      return;
    }
    window._MOCK_SERIAL_ID = newSerialId();
    window._CBT_STARTED = false;
    window._CBT_ANS = {};
    window._CBT_REVIEW = {};
    window._CBT_VISITED = { 0: true };
    window._CBT_SUBMITTED = false;
    window._CBT_SEC_LEFT = 180 * 60;
    window._CBT_IDX = 0;
    window.renderScienceTab4();
  };

  window.startFreshMockReset = function () {
    window._MOCK_SERIAL_ID = newSerialId();
    window._CBT_STARTED = false;
    window._CBT_ANS = {};
    window._CBT_REVIEW = {};
    window._CBT_VISITED = { 0: true };
    window._CBT_SUBMITTED = false;
    window._CBT_SEC_LEFT = 180 * 60;
    window._CBT_IDX = 0;
    window.renderScienceTab4();
  };

  window.downloadMockPdfReport = function (sessionId) {
    const logs = getVerifiedFullMockLogs();
    const rec = logs.find(x => x.sessionId === sessionId) || logs[0];
    if (!rec) {
      alert("Only completed & officially submitted Full-Length Mocks generate an Official Marksheet PDF.");
      return;
    }
    const w = window.open("", "_blank", "width=960,height=820");
    if (!w) {
      alert("Please allow popups for this site to download your PDF marksheet.");
      return;
    }
    const esc = (s) => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const subjRows = Object.entries(rec.subjects || {}).map(([k, v]) => `
      <tr>
        <td style="padding:8px;border:1px solid #cbd5e1;font-weight:700;">${esc(k)}</td>
        <td style="padding:8px;border:1px solid #cbd5e1;font-weight:800;">${v.s} / ${v.max}</td>
        <td style="padding:8px;border:1px solid #cbd5e1;color:#047857;">${v.c} (+${v.c * 4})</td>
        <td style="padding:8px;border:1px solid #cbd5e1;color:#be123c;">${v.w} (-${v.w})</td>
      </tr>
    `).join("");

    const auditItems = Array.isArray(rec.itemsAudit) ? rec.itemsAudit : [];
    const itemsHtml = auditItems.map(it => {
      const badgeColor = !it.hasAns ? "#475569" : (it.isCorrect ? "#047857" : "#be123c");
      const badgeBg = !it.hasAns ? "#f1f5f9" : (it.isCorrect ? "#ecfdf5" : "#fff1f2");
      return `
        <div style="border:1px solid #cbd5e1;border-radius:8px;padding:12px;margin-bottom:10px;page-break-inside:avoid;">
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;margin-bottom:6px;">
            <strong style="color:#1e293b;">Question ${it.num} of ${auditItems.length} &bull; ${esc(it.subj)} (${esc(it.chapter)})</strong>
            <span style="padding:2px 8px;border-radius:999px;background:${badgeBg};color:${badgeColor};font-weight:800;">${esc(it.sec)} &bull; ${esc(it.statusLabel)}</span>
          </div>
          <div style="font-size:12px;font-weight:600;color:#0f172a;margin-bottom:6px;white-space:pre-line;">${esc(it.prompt)}</div>
          <div style="font-size:11px;color:#334155;margin-bottom:3px;"><strong>Your Submitted Response:</strong> ${esc(it.userText)}</div>
          <div style="font-size:11px;color:#047857;margin-bottom:4px;"><strong>Official Answer:</strong> ${esc(it.officialText)}</div>
          <div style="font-size:11px;color:#1e293b;background:#f8fafc;padding:6px 8px;border-radius:6px;"><strong>Solution:</strong> ${esc(it.explanation)}</div>
        </div>
      `;
    }).join("");

    const effDisplay = rec.effScore !== undefined ? rec.effScore : rec.totalScore;
    w.document.write(`<!DOCTYPE html><html><head><title>${esc(rec.sessionId)} - GOALisB Official Diagnostic Marksheet</title></head>
      <body style="font-family:system-ui,-apple-system,sans-serif;padding:28px;color:#0f172a;max-width:860px;margin:auto;">
        <div style="border-bottom:3px solid #4338ca;padding-bottom:12px;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <div style="font-size:11px;font-weight:800;color:#4338ca;text-transform:uppercase;">GOALisB ${IS_JEE ? "JEE" : "NEET UG"} Evaluation Engine</div>
            <h1 style="margin:4px 0 0;font-size:20px;">${IS_JEE ? "OFFICIAL NTA JEE MAIN 75-Q DIAGNOSTIC MARKSHEET" : "OFFICIAL NTA NEET UG 180-Q DIAGNOSTIC MARKSHEET"}</h1>
          </div>
          <div style="text-align:right;font-size:11px;">
            <div><strong>Assessment Serial ID:</strong> ${esc(rec.sessionId)}</div>
            <div><strong>Timestamp:</strong> ${esc(rec.timestamp)}</div>
            <div><strong>Paper Level:</strong> ${esc(rec.diffLabel || "Standard NTA Paper")}</div>
          </div>
        </div>

        <div style="margin:14px 0;padding:12px 14px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;display:grid;grid-template-columns:repeat(4,1fr);gap:10px;font-size:12px;">
          <div><div style="color:#64748b;font-size:10px;font-weight:700;">CANDIDATE</div><strong>${esc(rec.candidate)}</strong></div>
          <div><div style="color:#64748b;font-size:10px;font-weight:700;">RAW / SHIFT-EQ SCORE</div><strong style="font-size:14px;color:#047857;">${rec.totalScore} / ${rec.maxScore}</strong><div style="font-size:10px;color:#4338ca;">Calibrated: ${effDisplay}/${rec.maxScore}</div></div>
          <div><div style="color:#64748b;font-size:10px;font-weight:700;">ACCURACY &amp; SPLIT</div><strong>${esc(rec.accuracy || "0.0")}% (${esc(rec.counts || "")})</strong></div>
          <div><div style="color:#64748b;font-size:10px;font-weight:700;">TIME &amp; PACE</div><strong>${esc(rec.timeTaken)} (${esc(rec.pacePerQ || "-")})</strong></div>
        </div>

        <div style="margin-bottom:14px;padding:10px 14px;background:#ecfdf5;border:1px solid #6ee7b7;border-radius:8px;font-size:12px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <div><strong>Calibrated Standing:</strong> ${esc(rec.projection)}</div>
          <div><strong>Paper Tier:</strong> ${esc(rec.diffLabel || "Standard NTA Paper")}</div>
        </div>

        <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:18px;">
          <thead>
            <tr style="background:#f1f5f9;text-align:left;">
              <th style="padding:8px;border:1px solid #cbd5e1;">Subject</th>
              <th style="padding:8px;border:1px solid #cbd5e1;">Net Marks</th>
              <th style="padding:8px;border:1px solid #cbd5e1;">Correct (+4)</th>
              <th style="padding:8px;border:1px solid #cbd5e1;">Incorrect (-1)</th>
            </tr>
          </thead>
          <tbody>${subjRows}</tbody>
        </table>

        <div style="page-break-before:always;border-top:2px solid #4338ca;padding-top:12px;margin-top:16px;">
          <h2 style="font-size:15px;margin:0 0 10px;color:#1e1b4b;">COMPLETE QUESTION-BY-QUESTION RESPONSE &amp; SOLUTION AUDIT (${auditItems.length} QUESTIONS)</h2>
          ${itemsHtml}
        </div>
        <script>window.onload = function(){ setTimeout(function(){ window.print(); }, 300); };</script>
      </body></html>`);
    w.document.close();
  };

  window.renderScienceTab4 = async function (el) {
    const accent = IS_JEE ? "indigo" : "emerald";
    const target = getTarget(el);
    if (!target) return;
    if (!window._SCI_HYDRATED && window._CBT_STARTED) await hydrateFromNeon(); else if (!window._SCI_HYDRATED) hydrateFromNeon();
    ensureMockTimer();

    const dMeta = getDiffMeta();
    window._MOCK_SERIAL_ID = window._MOCK_SERIAL_ID || newSerialId();
    window._CBT_ANS = window._CBT_ANS || {};
    window._CBT_REVIEW = window._CBT_REVIEW || {};
    window._CBT_VISITED = window._CBT_VISITED || { 0: true };
    if (typeof window._CBT_SEC_LEFT !== "number") window._CBT_SEC_LEFT = 180 * 60;

    const paper = buildFullMockPaper();
    if (!paper.length) {
      target.innerHTML = `<div class="p-8 text-center text-sm font-bold text-slate-500">Assembling Full NTA Mock Paper from Neon...</div>`;
      return;
    }

    const totalQs = paper.length;
    const logs = getVerifiedFullMockLogs();

    const diffPills = [
      ["TOUGH", IS_JEE ? "Tough Shift (+14 Eq.)" : "Tough Paper (+15 Eq.)", "AIR Top-500 Discriminator Weighting"],
      ["MODERATE", "Standard NTA Paper (0 Eq.)", "Balanced Multi-Tier NTA Blueprint"],
      ["EASY", IS_JEE ? "High-Cutoff Shift (-12 Eq.)" : "High-Cutoff Paper (-10 Eq.)", "High-Speed Accuracy / Inflated Cutoff"]
    ];

    const resetDeclHtml = window._RESET_MODAL_MODE ? `
      <div class="bg-rose-50 border-2 border-rose-400 rounded-2xl p-5 space-y-3 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-extrabold uppercase text-rose-700">${window._RESET_MODAL_MODE === "CLEAR_LEDGER" ? "PERMANENT FULL-MOCK LEDGER PURGE DECLARATION" : "ABORT SESSION WITHOUT SUBMISSION & RESET DECLARATION"}</span>
          <button type="button" onclick="window._RESET_MODAL_MODE=null; window.renderScienceTab4();" class="text-xs font-bold text-slate-600 cursor-pointer">Cancel &times;</button>
        </div>
        <label class="flex items-start gap-2.5 text-xs font-semibold text-rose-950 cursor-pointer">
          <input id="cbt-reset-decl-chk" type="checkbox" class="mt-0.5 w-4 h-4 accent-rose-600" />
          <span>${window._RESET_MODAL_MODE === "CLEAR_LEDGER"
            ? "I declare that I wish to permanently erase all verified Full-Length Mock records from this browser."
            : "I declare that I am aborting Serial ID " + window._MOCK_SERIAL_ID + " without submission. Because only complete Full Mocks are calibrated, this aborted attempt will NOT be logged or synced to Tab 7."}</span>
        </label>
        <div class="flex gap-2">
          <button type="button" onclick="window.confirmResetWithDeclaration();" class="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-extrabold cursor-pointer">Confirm &amp; Reset</button>
          <button type="button" onclick="window._RESET_MODAL_MODE=null; window.renderScienceTab4();" class="px-4 py-2 rounded-xl bg-white border text-xs font-bold cursor-pointer">Keep Session</button>
        </div>
      </div>` : "";

    const ledgerHtml = `
      <div class="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div class="text-xs font-extrabold uppercase tracking-wider text-${accent}-600">VERIFIED FULL-MOCK ASSESSMENT LEDGER (COMPLETE ${REQUIRED_QS}-Q SUBMISSIONS ONLY)</div>
            <h3 class="text-xl font-extrabold text-slate-900 mt-0.5">Serial Mock ID, Paper Difficulty &amp; Calibrated Standing (${logs.length} Full Mocks Logged)</h3>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <button type="button" onclick="window.selectUnifiedTab(7);" class="px-4 py-2 rounded-xl bg-${accent}-50 border border-${accent}-200 text-${accent}-700 text-xs font-extrabold cursor-pointer">View Forecaster in Tab 7 &rarr;</button>
            <button type="button" onclick="window.openResetDeclarationModal('CLEAR_LEDGER');" class="px-4 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-extrabold cursor-pointer">Clear Log</button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500">
                <th class="py-2.5 pr-3">SERIAL MOCK ID</th><th class="py-2.5 pr-3">DATE &amp; TIME</th><th class="py-2.5 pr-3">PAPER LEVEL</th><th class="py-2.5 pr-3">RAW / CALIBRATED SCORE</th><th class="py-2.5 pr-3">ACCURACY</th><th class="py-2.5">MARKSHEET &amp; SYNC</th>
              </tr>
            </thead>
            <tbody>
              ${!logs.length ? `<tr><td colspan="6" class="py-4 text-slate-500">No full-length mocks submitted yet. Select a Paper Difficulty Level above and complete a ${REQUIRED_QS}-question exam to calibrate Tab 7.</td></tr>`
              : logs.map(lg => {
                const effVal = lg.effScore !== undefined ? lg.effScore : lg.totalScore;
                const dBadge = lg.diffLabel || "Standard NTA Paper";
                return `<tr class="border-b border-slate-100"><td class="py-3 pr-3 font-mono font-extrabold text-slate-900">${lg.sessionId}</td><td class="py-3 pr-3 text-slate-600">${lg.timestamp}</td><td class="py-3 pr-3"><span class="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 font-extrabold text-[10px]">${dBadge}</span></td><td class="py-3 pr-3 font-black">${lg.totalScore} / ${lg.maxScore} <span class="text-[11px] font-bold text-emerald-700">(Eq: ${effVal})</span></td><td class="py-3 pr-3 font-bold">${lg.accuracy}% (${lg.counts})</td><td class="py-3 flex gap-1.5"><button type="button" onclick="window.downloadMockPdfReport('${lg.sessionId}');" class="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold cursor-pointer">PDF Marksheet</button><button type="button" onclick="window.applySyncedMockToTab6('${lg.sessionId}'); window.selectUnifiedTab(7, true);" class="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold cursor-pointer">&#8635; Sync Tab 7</button></td></tr>`;
              }).join("")}
            </tbody>
          </table>
        </div>
      </div>`;

    if (!window._CBT_STARTED && !window._CBT_SUBMITTED) {
      target.innerHTML = `
        <div class="max-w-7xl mx-auto pt-4 pb-10 space-y-5">
          ${resetDeclHtml}
          <div class="bg-white border-2 border-${accent}-200 rounded-2xl p-6 space-y-5 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="space-y-1">
                <div class="flex flex-wrap items-center gap-2.5">
                  <span class="px-3 py-1 rounded-full bg-${accent}-100 text-${accent}-800 text-[11px] font-extrabold uppercase">${IS_JEE ? "FULL 300-MARK NTA CBT MOCK • READY TO LAUNCH" : "FULL 720-MARK NTA OMR MOCK • READY TO LAUNCH"}</span>
                  <span class="text-xs font-mono font-bold text-slate-600">Next Serial ID: <strong>${window._MOCK_SERIAL_ID}</strong></span>
                </div>
                <h2 class="text-2xl font-black text-slate-900 pt-1">${IS_JEE ? "1. Full JEE Main Standard CBT Mock (75 Qs • 180 Mins)" : "1. Full NEET UG Compulsory OMR Mock (180 Qs • 180 Mins)"}</h2>
                <p class="text-xs text-slate-600">Select the NTA Paper Difficulty / Shift Tier below. Both the question mix and your calibrated Percentile/AIR in Tab 7 corroborate your chosen level.</p>
              </div>
              <button type="button" onclick="window.launchProctoredMockSession();" class="px-6 py-3.5 rounded-2xl bg-${accent}-600 hover:bg-${accent}-500 text-white text-sm font-extrabold shadow-md cursor-pointer">&#9654; Start Proctored Full Mock (180 Mins)</button>
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <span class="text-[11px] font-extrabold uppercase tracking-wider text-${accent}-700">SELECT PAPER DIFFICULTY / NTA SHIFT CALIBRATION TIER</span>
                <span class="text-[11px] font-semibold text-slate-500">Syncs directly with Tab 7 Normalization Dropdown</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                ${diffPills.map(([dCode, dTitle, dSub]) => `
                  <button type="button" onclick="window.setFullMockDifficulty('${dCode}');"
                    class="text-left p-3.5 rounded-xl border cursor-pointer ${dMeta.code === dCode
                      ? `bg-${accent}-600 text-white border-${accent}-600 shadow-sm`
                      : "bg-white text-slate-800 border-slate-200 hover:border-slate-400"}">
                    <div class="text-xs font-extrabold">${dTitle}</div>
                    <div class="text-[11px] mt-0.5 ${dMeta.code === dCode ? "text-white/90" : "text-slate-500"}">${dSub}</div>
                  </button>
                `).join("")}
              </div>
            </div>

            <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200"><div class="text-[10px] font-extrabold uppercase text-slate-400">QUESTION COUNT</div><div class="text-base font-black text-slate-900 mt-0.5">${totalQs} Compulsory Qs</div></div>
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200"><div class="text-[10px] font-extrabold uppercase text-slate-400">SELECTED PAPER TIER</div><div class="text-sm font-black text-${accent}-700 mt-0.5">${dMeta.label}</div></div>
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200"><div class="text-[10px] font-extrabold uppercase text-slate-400">LEDGER POLICY</div><div class="text-base font-black text-indigo-700 mt-0.5">Full Mocks Only</div></div>
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200"><div class="text-[10px] font-extrabold uppercase text-slate-400">POSTGRESQL BANK</div><div class="text-base font-black text-emerald-600 mt-0.5">${window._SCI_QUESTIONS.length} Items (${(window._SCI_QUESTIONS.length / REQUIRED_QS).toFixed(1)}&times; Mock)</div></div>
            </div>
            <label class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input id="cbt-launch-decl" type="checkbox" checked class="mt-0.5 w-4 h-4 accent-${accent}-600" />
              <span><strong>Candidate Honor-Code Declaration:</strong> I confirm that I am attempting Serial ID <strong>${window._MOCK_SERIAL_ID}</strong> (<strong>${dMeta.label}</strong>) as a full ${REQUIRED_QS}-question NTA mock under proctored conditions (+4/-1).</span>
            </label>
          </div>
          ${ledgerHtml}
        </div>`;
      return;
    }

    const qIdx = Math.min(totalQs - 1, Math.max(0, Number(window._CBT_IDX || 0)));
    window._CBT_VISITED[qIdx] = true;
    const q = paper[qIdx];
    const activeSubj = q.mock_subj;
    const h = String(Math.floor(window._CBT_SEC_LEFT / 3600)).padStart(2, "0");
    const m = String(Math.floor((window._CBT_SEC_LEFT % 3600) / 60)).padStart(2, "0");
    const s = String(window._CBT_SEC_LEFT % 60).padStart(2, "0");
    const evalRes = window._CBT_SUBMITTED ? evaluateMockPaper(paper) : null;
    const subjTabs = IS_JEE ? [["PHYSICS", 0, 25], ["CHEMISTRY", 25, 25], ["MATHEMATICS", 50, 25]] : [["PHYSICS", 0, 45], ["CHEMISTRY", 45, 45], ["BOTANY", 90, 45], ["ZOOLOGY", 135, 45]];

    target.innerHTML = `
      <div class="max-w-7xl mx-auto pt-4 pb-10 space-y-4">
        ${resetDeclHtml}
        <div class="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-300 font-mono text-xs font-extrabold">${window._MOCK_SERIAL_ID}</span>
            <span class="px-2.5 py-1.5 rounded-xl bg-amber-100 text-amber-950 text-[11px] font-extrabold">${dMeta.label}</span>
            ${subjTabs.map(([subName, startIdx, cnt]) => `<button type="button" onclick="window._CBT_IDX=${startIdx}; window.renderScienceTab4();" class="px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer ${activeSubj === subName ? `bg-${accent}-600 text-white` : "bg-slate-100 text-slate-700"}">${subName} (${cnt} Qs)</button>`).join("")}
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <div class="px-3.5 py-1.5 rounded-xl bg-slate-900 text-amber-300 font-mono text-sm font-extrabold"><span id="cbt-clock">${h}:${m}:${s}</span></div>
            ${!window._CBT_SUBMITTED ? `
              <button type="button" onclick="window.openResetDeclarationModal('EXIT_SESSION');" class="px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 text-xs font-extrabold cursor-pointer">Abort &amp; Reset</button>
              <button type="button" onclick="window.submitMockAndSync();" class="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-extrabold cursor-pointer">Submit Full Mock &amp; Sync Tab 7</button>
            ` : `
              <button type="button" onclick="window.downloadMockPdfReport('${window._MOCK_SERIAL_ID}');" class="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold cursor-pointer">Download PDF Marksheet</button>
              <button type="button" onclick="window.applySyncedMockToTab6('${window._MOCK_SERIAL_ID}'); window.selectUnifiedTab(7, true);" class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-extrabold cursor-pointer">View Calibrated Standing in Tab 7 &rarr;</button>
              <button type="button" onclick="window.startFreshMockReset();" class="px-3.5 py-2 rounded-xl border text-xs font-extrabold cursor-pointer">New Full Mock</button>
            `}
          </div>
        </div>

        ${window._CBT_SUBMITTED && evalRes ? `
          <div class="bg-white border-2 border-emerald-500 rounded-2xl p-6 space-y-4 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div class="text-xs font-extrabold uppercase text-emerald-700">VERIFIED FULL-MOCK SCORECARD &bull; ${evalRes.diffLabel.toUpperCase()}</div>
                <h3 class="text-2xl font-black text-slate-900">Raw: ${evalRes.totalScore}/${MAX_MARKS} &bull; Calibrated: ${evalRes.effScore}/${MAX_MARKS} &rarr; ${evalRes.projection}</h3>
              </div>
              <div class="text-xs font-bold text-slate-600">Accuracy: <span class="text-indigo-700 font-extrabold">${evalRes.accuracy}%</span> &bull; Pace: <span class="font-extrabold">${evalRes.pacePerQ}</span></div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-${IS_JEE ? 3 : 4} gap-3 text-xs">
              ${Object.entries(evalRes.subjStats).map(([sn, st]) => `<div class="p-4 rounded-xl bg-slate-50 border border-slate-200"><div class="font-extrabold text-${accent}-700">${sn}</div><div class="text-lg font-black text-slate-900 mt-0.5">${st.s} / ${st.max}</div><div class="text-slate-600 mt-0.5">Correct: ${st.c} &bull; Incorrect: ${st.w}</div></div>`).join("")}
            </div>
          </div>` : ""}

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div class="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div><span class="text-xs font-extrabold uppercase text-${accent}-600">Question ${qIdx + 1} of ${totalQs} &bull; ${q.mock_subj} &bull; ${q.mock_sec}</span><div class="text-[11px] text-slate-500">Code: ${q.question_code} &bull; Tier: ${q.difficulty_tier || "STANDARD"} &bull; ${q.chapter_name}</div></div>
              <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">+4 Correct / -1 Incorrect</span>
            </div>
            <div class="text-sm font-bold text-slate-900 leading-relaxed whitespace-pre-line min-h-[90px]">${q.prompt}</div>
            ${q.question_type === "NUMERICAL_INT" ? `
              <div class="space-y-2 pt-2"><label class="block text-xs font-extrabold text-slate-600">Enter Exact Numerical Value (Section B):</label><input id="cbt-num-box" type="text" value="${window._CBT_ANS[qIdx] || ""}" onchange="window._CBT_ANS[${qIdx}]=this.value.trim();" placeholder="Type numerical answer..." class="w-56 rounded-xl border border-slate-300 px-4 py-2.5 text-base font-mono font-extrabold" /></div>
            ` : `
              <div class="grid grid-cols-1 gap-2.5 text-xs pt-1">
                ${(q.options_json || []).map((opt, oi) => {
                  const selected = String(window._CBT_ANS[qIdx]) === String(oi);
                  return `<button type="button" onclick="window._CBT_ANS[${qIdx}]='${oi}'; window.renderScienceTab4();" class="text-left p-3.5 rounded-xl border cursor-pointer ${selected ? `bg-${accent}-600 text-white border-${accent}-600 font-bold shadow-sm` : "bg-slate-50 border-slate-200 text-slate-900"}"><strong>(${String.fromCharCode(65 + oi)})</strong> ${opt}</button>`;
                }).join("")}
              </div>
            `}
            ${window._CBT_SUBMITTED ? `<div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950"><strong>Official Answer:</strong> ${q.options_json ? q.options_json[Number(q.correct_answer)] : q.correct_answer}<br/><strong>Solution:</strong> ${q.explanation}</div>` : ""}
            <div class="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-slate-100">
              <div class="flex flex-wrap gap-2">
                <button type="button" onclick="const nb=document.getElementById('cbt-num-box'); if(nb) window._CBT_ANS[${qIdx}]=nb.value.trim(); if(window._CBT_IDX<${totalQs - 1}) window._CBT_IDX++; window.renderScienceTab4();" class="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-extrabold cursor-pointer">Save &amp; Next</button>
                <button type="button" onclick="const nb=document.getElementById('cbt-num-box'); if(nb) window._CBT_ANS[${qIdx}]=nb.value.trim(); window._CBT_REVIEW[${qIdx}]=true; if(window._CBT_IDX<${totalQs - 1}) window._CBT_IDX++; window.renderScienceTab4();" class="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-extrabold cursor-pointer">Mark for Review &amp; Next</button>
                <button type="button" onclick="delete window._CBT_ANS[${qIdx}]; delete window._CBT_REVIEW[${qIdx}]; window.renderScienceTab4();" class="px-3.5 py-2 rounded-xl border text-xs font-bold cursor-pointer">Clear Response</button>
              </div>
              <div class="flex gap-1.5">
                <button type="button" onclick="if(window._CBT_IDX>0){window._CBT_IDX--; window.renderScienceTab4();}" class="px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer">&larr; Prev</button>
                <button type="button" onclick="if(window._CBT_IDX<${totalQs - 1}){window._CBT_IDX++; window.renderScienceTab4();}" class="px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer">Next &rarr;</button>
              </div>
            </div>
          </div>
          <div class="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
            <div class="text-xs font-extrabold uppercase text-slate-700">QUESTION PALETTE (${totalQs} Qs)</div>
            <div class="grid grid-cols-2 gap-2 text-[11px] font-bold">
              <div class="flex items-center gap-1.5"><span class="w-3.5 h-3.5 rounded bg-emerald-600 inline-block"></span> Answered (${Object.keys(window._CBT_ANS).filter(k => String(window._CBT_ANS[k]).trim() !== "").length})</div>
              <div class="flex items-center gap-1.5"><span class="w-3.5 h-3.5 rounded bg-purple-600 inline-block"></span> Marked (${Object.keys(window._CBT_REVIEW).length})</div>
              <div class="flex items-center gap-1.5"><span class="w-3.5 h-3.5 rounded bg-rose-500 inline-block"></span> Skipped</div>
              <div class="flex items-center gap-1.5"><span class="w-3.5 h-3.5 rounded bg-slate-200 inline-block"></span> Unvisited</div>
            </div>
            <div class="max-h-[340px] overflow-y-auto pr-1 grid grid-cols-6 gap-1.5">
              ${paper.map((_, idx) => {
                const hasAns = window._CBT_ANS[idx] !== undefined && String(window._CBT_ANS[idx]).trim() !== "";
                const isRev = !!window._CBT_REVIEW[idx], isVis = !!window._CBT_VISITED[idx];
                let cls = isRev ? "bg-purple-600 text-white border-purple-600" : hasAns ? "bg-emerald-600 text-white border-emerald-600" : isVis ? "bg-rose-500 text-white border-rose-500" : "bg-slate-100 text-slate-700 border-slate-300";
                if (idx === qIdx) cls += " ring-2 ring-indigo-500 ring-offset-1";
                return `<button type="button" onclick="window._CBT_IDX=${idx}; window.renderScienceTab4();" class="h-7 rounded-lg text-[11px] font-extrabold border cursor-pointer ${cls}">${idx + 1}</button>`;
              }).join("")}
            </div>
          </div>
        </div>
        ${ledgerHtml}
      </div>`;
  };

  // ============================================================================
  // TAB 5: DEDICATED SUBJECT-WISE & SECTIONAL TIMED PRACTICE MOCK ARENA (v47)
  // ============================================================================
  const PRAC_LOG_KEY = IS_JEE ? "goalisb_jee_practice_mock_ledger_v1" : "goalisb_neet_practice_mock_ledger_v1";
  window._PM_SCOPE = window._PM_SCOPE || (IS_JEE ? "PHYSICS" : "BIOLOGY");
  window._PM_SERIAL = window._PM_SERIAL || ((IS_JEE ? "JEE-PRAC-" : "NEET-PRAC-") + Math.floor(1000 + Math.random() * 9000));
  window._PM_STARTED = !!window._PM_STARTED;
  window._PM_SUBMITTED = !!window._PM_SUBMITTED;
  window._PM_IDX = Number(window._PM_IDX || 0);
  window._PM_ANS = window._PM_ANS || {};
  window._PM_REVIEW = window._PM_REVIEW || {};
  window._PM_VISITED = window._PM_VISITED || { 0: true };
  if (typeof window._PM_SEC_LEFT !== "number") window._PM_SEC_LEFT = (IS_JEE ? 60 : 90) * 60;
  window._PM_TIMER_ID = window._PM_TIMER_ID || null;

  function getPracticeMeta(sc) {
    const scope = (sc || window._PM_SCOPE || (IS_JEE ? "PHYSICS" : "BIOLOGY")).toUpperCase();
    if (IS_JEE) {
      if (scope === "CHEMISTRY") return { scope: "CHEMISTRY", label: "Chemistry Sectional Practice Mock (25 Qs)", qs: 25, maxMarks: 100, mins: 60 };
      if (scope === "MATHEMATICS") return { scope: "MATHEMATICS", label: "Mathematics Sectional Practice Mock (25 Qs)", qs: 25, maxMarks: 100, mins: 60 };
      return { scope: "PHYSICS", label: "Physics Sectional Practice Mock (25 Qs)", qs: 25, maxMarks: 100, mins: 60 };
    } else {
      if (scope === "PHYSICS") return { scope: "PHYSICS", label: "Physics Sectional Practice Mock (45 Qs)", qs: 45, maxMarks: 180, mins: 45 };
      if (scope === "CHEMISTRY") return { scope: "CHEMISTRY", label: "Chemistry Sectional Practice Mock (45 Qs)", qs: 45, maxMarks: 180, mins: 45 };
      if (scope === "BOTANY") return { scope: "BOTANY", label: "Botany Sectional Practice Mock (45 Qs)", qs: 45, maxMarks: 180, mins: 45 };
      if (scope === "ZOOLOGY") return { scope: "ZOOLOGY", label: "Zoology Sectional Practice Mock (45 Qs)", qs: 45, maxMarks: 180, mins: 45 };
      return { scope: "BIOLOGY", label: "Full Biology (Botany + Zoology) Practice Mock (90 Qs)", qs: 90, maxMarks: 360, mins: 90 };
    }
  }

  function getPracticeLogs() {
    try {
      const arr = JSON.parse(localStorage.getItem(PRAC_LOG_KEY) || "[]");
      return Array.isArray(arr) ? arr : [];
    } catch (_) { return []; }
  }

  function savePracticeLog(entry) {
    const logs = getPracticeLogs();
    logs.unshift(entry);
    localStorage.setItem(PRAC_LOG_KEY, JSON.stringify(logs.slice(0, 40)));
  }

  function ensurePracticeTimer() {
    if (window._PM_TIMER_ID) return;
    window._PM_TIMER_ID = setInterval(() => {
      if (!window._PM_STARTED || window._PM_SUBMITTED) return;
      const el = document.getElementById("pm-clock");
      if (!el) return;
      if (window._PM_SEC_LEFT > 0) window._PM_SEC_LEFT--;
      const h = String(Math.floor(window._PM_SEC_LEFT / 3600)).padStart(2, "0");
      const m = String(Math.floor((window._PM_SEC_LEFT % 3600) / 60)).padStart(2, "0");
      const s = String(window._PM_SEC_LEFT % 60).padStart(2, "0");
      el.textContent = `${h}:${m}:${s}`;
    }, 1000);
  }

  function pickPracticePool(pool, count) {
    if (!pool.length) return [];
    const out = [];
    while (out.length < count) {
      const batch = shuffleArray(pool);
      for (let i = 0; i < batch.length && out.length < count; i++) out.push(batch[i]);
    }
    return out;
  }

  function buildPracticePaper() {
    const meta = getPracticeMeta();
    const key = window._PM_SERIAL + "_" + meta.scope;
    if (window._PM_PAPER && window._PM_PAPER_KEY === key && window._PM_PAPER.length === meta.qs) {
      return window._PM_PAPER;
    }
    let paper = [];
    if (IS_JEE) {
      const mcqs = window._SCI_QUESTIONS.filter(q => q.subject === meta.scope && q.question_type !== "NUMERICAL_INT");
      const nums = window._SCI_QUESTIONS.filter(q => q.subject === meta.scope && q.question_type === "NUMERICAL_INT");
      pickPracticePool(mcqs, 20).forEach(b => paper.push({ ...b, mock_sec: "Section A (MCQ)", mock_subj: meta.scope }));
      pickPracticePool(nums, 5).forEach(b => paper.push({ ...b, mock_sec: "Section B (Numerical)", mock_subj: meta.scope }));
    } else {
      const subjs = meta.scope === "BIOLOGY" ? ["BOTANY", "ZOOLOGY"] : [meta.scope];
      subjs.forEach(s => {
        const pool = window._SCI_QUESTIONS.filter(q => q.subject === s && Array.isArray(q.options_json) && q.options_json.length >= 4);
        pickPracticePool(pool, 45).forEach(b => paper.push({ ...b, mock_sec: "Compulsory MCQ", mock_subj: s }));
      });
    }
    if (paper.length === meta.qs) {
      window._PM_PAPER = paper;
      window._PM_PAPER_KEY = key;
    }
    return paper;
  }

  window.setPracticeScope = function (sc) {
    if (window._PM_STARTED && !window._PM_SUBMITTED) {
      alert("Submit or Reset your active practice mock before changing subject.");
      return;
    }
    window._PM_SCOPE = sc;
    window._PM_PAPER = null;
    window._PM_SUBMITTED = false;
    window._PM_ANS = {};
    window._PM_REVIEW = {};
    window._PM_IDX = 0;
    window._PM_SEC_LEFT = getPracticeMeta(sc).mins * 60;
    window.renderScienceTab5();
  };

  window.launchPracticeMock = function () {
    const meta = getPracticeMeta();
    window._PM_STARTED = true;
    window._PM_SUBMITTED = false;
    window._PM_SEC_LEFT = meta.mins * 60;
    window._PM_IDX = 0;
    window._PM_VISITED = { 0: true };
    window.renderScienceTab5();
    fetch("/api/science/mock-paper?exam=" + EXAM + "&scope=" + meta.scope + "&ts=" + Date.now(), { cache: "no-store" })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data && data.ok && Array.isArray(data.paper) && data.paper.length === meta.qs && window._PM_STARTED && !window._PM_SUBMITTED && Object.keys(window._PM_ANS).length === 0) {
          window._PM_PAPER = data.paper.map(q => ({
            ...q,
            options_json: typeof q.options_json === "string" ? JSON.parse(q.options_json) : q.options_json
          }));
          window._PM_PAPER_KEY = window._PM_SERIAL + "_" + meta.scope;
          window.renderScienceTab5();
        }
      }).catch(() => {});
  };

  window.downloadPracticePdfReport = function (sessionId) {
    const logs = getPracticeLogs();
    const rec = logs.find(x => x.sessionId === sessionId) || logs[0];
    if (!rec) { alert("No submitted practice mock found to export."); return; }
    const w = window.open("", "_blank", "width=960,height=820");
    if (!w) { alert("Please allow popups to download your PDF marksheet."); return; }
    const esc = (s) => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const auditItems = Array.isArray(rec.itemsAudit) ? rec.itemsAudit : [];
    const itemsHtml = auditItems.map(it => `<div style="border:1px solid #cbd5e1;border-radius:8px;padding:10px;margin-bottom:8px;page-break-inside:avoid;"><div style="font-size:11px;font-weight:800;margin-bottom:4px;">Q${it.num}/${auditItems.length} &bull; ${esc(it.subj)} (${esc(it.chapter)}) &mdash; ${esc(it.statusLabel)}</div><div style="font-size:12px;margin-bottom:4px;white-space:pre-line;">${esc(it.prompt)}</div><div style="font-size:11px;"><strong>Your Response:</strong> ${esc(it.userText)} | <strong style="color:#047857;">Official:</strong> ${esc(it.officialText)}</div><div style="font-size:11px;background:#f8fafc;padding:5px;margin-top:4px;"><strong>Solution:</strong> ${esc(it.explanation)}</div></div>`).join("");
    w.document.write(`<!DOCTYPE html><html><head><title>${esc(rec.sessionId)} - GOALisB Practice Marksheet</title></head><body style="font-family:system-ui,sans-serif;padding:24px;color:#0f172a;max-width:860px;margin:auto;"><div style="border-bottom:3px solid #4338ca;padding-bottom:10px;display:flex;justify-content:space-between;"><div><div style="font-size:11px;font-weight:800;color:#4338ca;">GOALisB ${IS_JEE ? "JEE" : "NEET UG"} PRACTICE ARENA</div><h1 style="margin:4px 0 0;font-size:19px;">${esc(rec.blueprint).toUpperCase()} — DIAGNOSTIC MARKSHEET</h1></div><div style="text-align:right;font-size:11px;"><div><strong>Practice ID:</strong> ${esc(rec.sessionId)}</div><div><strong>Date:</strong> ${esc(rec.timestamp)}</div><div><strong>Scope:</strong> ${esc(rec.scope)}</div></div></div><div style="margin:12px 0;padding:10px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;display:grid;grid-template-columns:repeat(4,1fr);gap:8px;font-size:12px;"><div><strong>Candidate:</strong><br/>${esc(rec.candidate || "Senapati Roy")}</div><div><strong>Score:</strong><br/><strong style="color:#047857;font-size:14px;">${rec.totalScore}/${rec.maxScore}</strong></div><div><strong>Accuracy:</strong><br/>${esc(rec.accuracy)}% (${esc(rec.counts)})</div><div><strong>Time Taken:</strong><br/>${esc(rec.timeTaken)}</div></div><div style="padding-top:6px;"><h2 style="font-size:14px;margin-bottom:8px;">QUESTION-BY-QUESTION RESPONSE &amp; SOLUTION AUDIT (${auditItems.length} QUESTIONS)</h2>${itemsHtml || "<p>Detailed item audit recorded for newly submitted sessions.</p>"}</div><script>window.onload=function(){setTimeout(function(){window.print();},250);};</script></body></html>`);
    w.document.close();
  };

  window.submitPracticeMock = function () {
    const meta = getPracticeMeta();
    const paper = buildPracticePaper();
    let score = 0, c = 0, w = 0, att = 0;
    const itemsAudit = paper.map((item, idx) => {
      const raw = window._PM_ANS[idx];
      const hasAns = raw !== undefined && String(raw).trim() !== "";
      let statusLabel = "Unattempted (0 Marks)", userText = "(No response submitted)", isCorrect = false;
      const officialText = (item.question_type === "NUMERICAL_INT" || !Array.isArray(item.options_json))
        ? String(item.correct_answer)
        : `(${String.fromCharCode(65 + Number(item.correct_answer))}) ${item.options_json[Number(item.correct_answer)] || item.correct_answer}`;
      if (hasAns) {
        att++;
        if (item.question_type === "NUMERICAL_INT" || !Array.isArray(item.options_json)) {
          userText = String(raw).trim();
          isCorrect = (Number(userText) === Number(item.correct_answer)) || (userText === String(item.correct_answer).trim());
        } else {
          const oi = Number(raw);
          userText = `(${String.fromCharCode(65 + oi)}) ${item.options_json[oi] || raw}`;
          isCorrect = (String(oi) === String(item.correct_answer).trim());
        }
        if (isCorrect) { score += 4; c++; statusLabel = "Correct (+4 Marks)"; }
        else { score -= 1; w++; statusLabel = "Incorrect (-1 Mark)"; }
      }
      return {
        num: idx + 1, subj: item.mock_subj || meta.scope, chapter: item.chapter_name || "",
        prompt: item.prompt || "", statusLabel, isCorrect, hasAns, userText, officialText,
        explanation: item.explanation || ""
      };
    });
    const unatt = paper.length - att;
    const acc = att > 0 ? ((c / att) * 100).toFixed(1) : "0.0";
    const elapsed = Math.max(1, meta.mins * 60 - window._PM_SEC_LEFT);
    window._PM_SUBMITTED = true;
    savePracticeLog({
      sessionId: window._PM_SERIAL,
      timestamp: new Date().toLocaleString(),
      candidate: getCandidateName(),
      blueprint: meta.label,
      scope: meta.scope,
      totalScore: score,
      maxScore: meta.maxMarks,
      accuracy: acc,
      counts: `${c}C / ${w}W / ${unatt}U`,
      timeTaken: Math.floor(elapsed / 60) + "m " + (elapsed % 60) + "s",
      itemsAudit
    });
    window.renderScienceTab5();
  };

  window.resetPracticeMock = function () {
    window._PM_SERIAL = (IS_JEE ? "JEE-PRAC-" : "NEET-PRAC-") + Math.floor(1000 + Math.random() * 9000);
    window._PM_PAPER = null;
    window._PM_STARTED = false;
    window._PM_SUBMITTED = false;
    window._PM_ANS = {};
    window._PM_REVIEW = {};
    window._PM_VISITED = { 0: true };
    window._PM_IDX = 0;
    window._PM_SEC_LEFT = getPracticeMeta().mins * 60;
    window.renderScienceTab5();
  };

  window.renderScienceTab5 = async function (el) {
    const accent = IS_JEE ? "indigo" : "emerald";
    const target = getTarget(el);
    if (!target) return;
    if (!window._SCI_HYDRATED && window._PM_STARTED) await hydrateFromNeon(); else if (!window._SCI_HYDRATED) hydrateFromNeon();
    ensurePracticeTimer();

    const meta = getPracticeMeta();
    const paper = buildPracticePaper();
    const pLogs = getPracticeLogs();
    const scopes = IS_JEE
      ? [["PHYSICS", "Physics Sectional (25 Qs • 60m)"], ["CHEMISTRY", "Chemistry Sectional (25 Qs • 60m)"], ["MATHEMATICS", "Mathematics Sectional (25 Qs • 60m)"]]
      : [["BIOLOGY", "Full Biology 90-Q (Bot+Zoo • 90m)"], ["PHYSICS", "Physics Sectional (45 Qs • 45m)"], ["CHEMISTRY", "Chemistry Sectional (45 Qs • 45m)"], ["BOTANY", "Botany Sectional (45 Qs • 45m)"], ["ZOOLOGY", "Zoology Sectional (45 Qs • 45m)"]];

    const scopeBar = `
      <div class="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div class="text-xs font-extrabold uppercase tracking-wider text-${accent}-600">5. SUBJECT-WISE &amp; SECTIONAL TIMED PRACTICE MOCKS (NEON RANDOM EXTRACTION)</div>
            <h2 class="text-xl font-black text-slate-900 mt-0.5">Isolated Sectional Practice Arena (Does Not Alter Tab 4 Full-Mock Ledger or Tab 7 Forecast)</h2>
          </div>
          <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold">Practice Mode (+4 / -1)</span>
        </div>
        <div class="flex flex-wrap gap-2 pt-1">
          ${scopes.map(([k, lbl]) => `
            <button type="button" onclick="window.setPracticeScope('${k}');"
              class="px-4 py-2 rounded-xl text-xs font-extrabold border cursor-pointer ${meta.scope === k
                ? `bg-${accent}-600 text-white border-${accent}-600 shadow-sm`
                : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400"}">${lbl}</button>
          `).join("")}
        </div>
      </div>`;

    const pracLedger = `
      <div class="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-extrabold text-slate-900">Subject Practice Mock History (${pLogs.length} Sessions)</h3>
          <button type="button" onclick="localStorage.removeItem('${PRAC_LOG_KEY}'); window.renderScienceTab5();" class="px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold cursor-pointer">Clear Practice Log</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead><tr class="border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500"><th class="py-2 pr-3">PRACTICE ID</th><th class="py-2 pr-3">DATE &amp; TIME</th><th class="py-2 pr-3">SUBJECT BLUEPRINT</th><th class="py-2 pr-3">SCORE</th><th class="py-2 pr-3">ACCURACY</th><th class="py-2 pr-3">TIME</th><th class="py-2">MARKSHEET</th></tr></thead>
            <tbody>
              ${!pLogs.length ? `<tr><td colspan="7" class="py-4 text-slate-500">No subject practice mocks completed yet. Select a subject above and launch a timed practice mock.</td></tr>`
              : pLogs.map(x => `<tr class="border-b border-slate-100"><td class="py-2.5 pr-3 font-mono font-extrabold">${x.sessionId}</td><td class="py-2.5 pr-3 text-slate-600">${x.timestamp}</td><td class="py-2.5 pr-3 font-bold">${x.blueprint}</td><td class="py-2.5 pr-3 font-black text-${accent}-700">${x.totalScore} / ${x.maxScore}</td><td class="py-2.5 pr-3 font-semibold">${x.accuracy}% (${x.counts})</td><td class="py-2.5 pr-3">${x.timeTaken}</td><td class="py-2.5"><button type="button" onclick="window.downloadPracticePdfReport('${x.sessionId}');" class="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold cursor-pointer">Download PDF Marksheet</button></td></tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>`;

    if (!window._PM_STARTED && !window._PM_SUBMITTED) {
      target.innerHTML = `
        <div class="max-w-7xl mx-auto pt-4 pb-10 space-y-5">
          ${scopeBar}
          <div class="bg-white border-2 border-${accent}-200 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div class="space-y-1">
              <span class="px-3 py-1 rounded-full bg-${accent}-100 text-${accent}-800 text-[11px] font-extrabold uppercase">READY TO LAUNCH &bull; ${window._PM_SERIAL}</span>
              <h3 class="text-2xl font-black text-slate-900 pt-1">${meta.label} (${meta.mins} Mins)</h3>
              <p class="text-xs text-slate-600">Dynamically extracts ${meta.qs} random ${meta.scope} items from Neon PostgreSQL (${window._SCI_QUESTIONS.length} live bank items).</p>
            </div>
            <button type="button" onclick="window.launchPracticeMock();" class="px-6 py-3.5 rounded-2xl bg-${accent}-600 hover:bg-${accent}-500 text-white text-sm font-extrabold shadow-md cursor-pointer">&#9654; Start ${meta.scope} Practice Mock (${meta.mins} Mins)</button>
          </div>
          ${pracLedger}
        </div>`;
      return;
    }

    if (!paper.length) {
      target.innerHTML = `<div class="p-8 text-center text-sm font-bold text-slate-500">Connecting to Neon PostgreSQL Practice Bank...</div>`;
      await hydrateFromNeon();
      if (buildPracticePaper().length) return window.renderScienceTab5(target);
      return;
    }

    const totalQs = paper.length;
    const qIdx = Math.min(totalQs - 1, Math.max(0, Number(window._PM_IDX || 0)));
    window._PM_VISITED[qIdx] = true;
    const q = paper[qIdx];
    const h = String(Math.floor(window._PM_SEC_LEFT / 3600)).padStart(2, "0");
    const m = String(Math.floor((window._PM_SEC_LEFT % 3600) / 60)).padStart(2, "0");
    const s = String(window._PM_SEC_LEFT % 60).padStart(2, "0");

    target.innerHTML = `
      <div class="max-w-7xl mx-auto pt-4 pb-10 space-y-4">
        <div class="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1.5 rounded-xl bg-slate-100 border font-mono text-xs font-extrabold">${window._PM_SERIAL}</span>
            <span class="px-3 py-1.5 rounded-xl bg-${accent}-600 text-white text-xs font-extrabold">${meta.label}</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="px-3.5 py-1.5 rounded-xl bg-slate-900 text-amber-300 font-mono text-sm font-extrabold"><span id="pm-clock">${h}:${m}:${s}</span></div>
            ${!window._PM_SUBMITTED ? `
              <button type="button" onclick="window.resetPracticeMock();" class="px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 text-xs font-extrabold cursor-pointer">Abort &amp; Reset</button>
              <button type="button" onclick="window.submitPracticeMock();" class="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-extrabold cursor-pointer">Submit Practice Mock</button>
            ` : `
              <button type="button" onclick="window.downloadPracticePdfReport('${window._PM_SERIAL}');" class="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold cursor-pointer">Download PDF Marksheet</button>
              <button type="button" onclick="window.resetPracticeMock();" class="px-4 py-2 rounded-xl bg-${accent}-600 text-white text-xs font-extrabold cursor-pointer">New Practice Mock</button>
            `}
          </div>
        </div>

        ${window._PM_SUBMITTED ? (() => {
          const latest = getPracticeLogs().find(x => x.sessionId === window._PM_SERIAL) || getPracticeLogs()[0];
          return latest ? `
            <div class="bg-white border-2 border-emerald-500 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-3 shadow-sm">
              <div>
                <div class="text-xs font-extrabold uppercase text-emerald-700">PRACTICE MOCK SCORECARD &bull; ${latest.sessionId}</div>
                <div class="text-xl font-black text-slate-900 mt-0.5">Score: ${latest.totalScore} / ${latest.maxScore} &bull; Accuracy: ${latest.accuracy}% (${latest.counts})</div>
              </div>
              <button type="button" onclick="window.downloadPracticePdfReport('${latest.sessionId}');" class="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold shadow-sm cursor-pointer">Download PDF Marksheet</button>
            </div>` : "";
        })() : ""}

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div class="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div><span class="text-xs font-extrabold uppercase text-${accent}-600">Question ${qIdx + 1} of ${totalQs} &bull; ${q.mock_subj} &bull; ${q.mock_sec}</span><div class="text-[11px] text-slate-500">Code: ${q.question_code} &bull; ${q.chapter_name}</div></div>
              <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">+4 / -1</span>
            </div>
            <div class="text-sm font-bold text-slate-900 leading-relaxed whitespace-pre-line min-h-[90px]">${q.prompt}</div>
            ${q.question_type === "NUMERICAL_INT" ? `
              <div class="space-y-2 pt-2"><label class="block text-xs font-extrabold text-slate-600">Enter Exact Numerical Value:</label><input id="pm-num-box" type="text" value="${window._PM_ANS[qIdx] || ""}" onchange="window._PM_ANS[${qIdx}]=this.value.trim();" placeholder="Type numerical answer..." class="w-56 rounded-xl border border-slate-300 px-4 py-2.5 text-base font-mono font-extrabold" /></div>
            ` : `
              <div class="grid grid-cols-1 gap-2.5 text-xs pt-1">
                ${(q.options_json || []).map((opt, oi) => {
                  const selected = String(window._PM_ANS[qIdx]) === String(oi);
                  return `<button type="button" onclick="window._PM_ANS[${qIdx}]='${oi}'; window.renderScienceTab5();" class="text-left p-3.5 rounded-xl border cursor-pointer ${selected ? `bg-${accent}-600 text-white border-${accent}-600 font-bold` : "bg-slate-50 border-slate-200 text-slate-900"}"><strong>(${String.fromCharCode(65 + oi)})</strong> ${opt}</button>`;
                }).join("")}
              </div>
            `}
            ${window._PM_SUBMITTED ? `<div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950"><strong>Official Answer:</strong> ${q.options_json ? q.options_json[Number(q.correct_answer)] : q.correct_answer}<br/><strong>Solution:</strong> ${q.explanation}</div>` : ""}
            <div class="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-slate-100">
              <div class="flex gap-2">
                <button type="button" onclick="const nb=document.getElementById('pm-num-box'); if(nb) window._PM_ANS[${qIdx}]=nb.value.trim(); if(window._PM_IDX<${totalQs - 1}) window._PM_IDX++; window.renderScienceTab5();" class="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-extrabold cursor-pointer">Save &amp; Next</button>
                <button type="button" onclick="window._PM_REVIEW[${qIdx}]=true; if(window._PM_IDX<${totalQs - 1}) window._PM_IDX++; window.renderScienceTab5();" class="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-extrabold cursor-pointer">Mark &amp; Next</button>
                <button type="button" onclick="delete window._PM_ANS[${qIdx}]; delete window._PM_REVIEW[${qIdx}]; window.renderScienceTab5();" class="px-3.5 py-2 rounded-xl border text-xs font-bold cursor-pointer">Clear</button>
              </div>
              <div class="flex gap-1.5">
                <button type="button" onclick="if(window._PM_IDX>0){window._PM_IDX--; window.renderScienceTab5();}" class="px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer">&larr; Prev</button>
                <button type="button" onclick="if(window._PM_IDX<${totalQs - 1}){window._PM_IDX++; window.renderScienceTab5();}" class="px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer">Next &rarr;</button>
              </div>
            </div>
          </div>
          <div class="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
            <div class="text-xs font-extrabold uppercase text-slate-700">PRACTICE PALETTE (${totalQs} Qs)</div>
            <div class="max-h-[340px] overflow-y-auto pr-1 grid grid-cols-6 gap-1.5">
              ${paper.map((_, idx) => {
                const hasAns = window._PM_ANS[idx] !== undefined && String(window._PM_ANS[idx]).trim() !== "";
                const isRev = !!window._PM_REVIEW[idx], isVis = !!window._PM_VISITED[idx];
                let cls = isRev ? "bg-purple-600 text-white border-purple-600" : hasAns ? "bg-emerald-600 text-white border-emerald-600" : isVis ? "bg-rose-500 text-white border-rose-500" : "bg-slate-100 text-slate-700 border-slate-300";
                if (idx === qIdx) cls += " ring-2 ring-indigo-500 ring-offset-1";
                return `<button type="button" onclick="window._PM_IDX=${idx}; window.renderScienceTab5();" class="h-7 rounded-lg text-[11px] font-extrabold border cursor-pointer ${cls}">${idx + 1}</button>`;
              }).join("")}
            </div>
          </div>
        </div>
        ${pracLedger}
      </div>`;
  };

  // ============================================================================
  // TAB 7: SET TARGET LOCK + ACHIEVEMENT VS. DEFICIENCY REMAINING MATRIX (v50)
  // ============================================================================
  const TARGET_KEY = IS_JEE ? "goalisb_jee_self_target_v1" : "goalisb_neet_self_target_v1";

  function getDefaultSelfTarget() {
    return IS_JEE
      ? { p: 82, c: 80, m: 78, shift: "MODERATE", cat: "GEN" }
      : { p: 165, c: 170, b: 175, z: 175, diff: "MODERATE", cat: "GEN" };
  }

  function loadSavedSelfTarget() {
    try {
      const raw = JSON.parse(localStorage.getItem(TARGET_KEY) || "null");
      if (raw && typeof raw === "object") return { ...getDefaultSelfTarget(), ...raw };
    } catch (_) {}
    return getDefaultSelfTarget();
  }

  function saveSelfTarget(obj) {
    try { localStorage.setItem(TARGET_KEY, JSON.stringify(obj)); } catch (_) {}
  }

  window._T6_MODE = "TARGET";
  window._T6_TARGET_LOCKED_MSG = "";
  window._T6_JEE = loadSavedSelfTarget();
  window._T6_NEET = loadSavedSelfTarget();

  window.commitCurrentAsTarget = function () {
    if (IS_JEE) {
      saveSelfTarget({ ...window._T6_JEE });
    } else {
      saveSelfTarget({ ...window._T6_NEET });
    }
    window._T6_MODE = "TARGET";
    window._T6_TARGET_LOCKED_MSG = "Target Saved (" + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + ")";
    window.renderScienceTab7();
  };

  window.switchToDesiredTargetMode = function () {
    const saved = loadSavedSelfTarget();
    if (IS_JEE) window._T6_JEE = { ...saved };
    else window._T6_NEET = { ...saved };
    window._T6_MODE = "TARGET";
    window._T6_TARGET_LOCKED_MSG = "";
    window.renderScienceTab7();
  };

  window.resetDesiredTargetToDefault = function () {
    const def = getDefaultSelfTarget();
    saveSelfTarget(def);
    if (IS_JEE) window._T6_JEE = { ...def };
    else window._T6_NEET = { ...def };
    window._T6_MODE = "TARGET";
    window._T6_TARGET_LOCKED_MSG = "Reset to Default Benchmark";
    window.renderScienceTab7();
  };

  window.applySyncedMockToTab6 = function (sessionId) {
    try {
      const logs = getVerifiedFullMockLogs();
      const rec = sessionId ? logs.find(x => x.sessionId === sessionId) : logs[0];
      if (!rec || !rec.subjects) {
        window._T6_SYNCED_ID = null;
        return false;
      }
      if (IS_JEE && rec.subjects.PHYSICS && rec.subjects.CHEMISTRY && rec.subjects.MATHEMATICS) {
        window._T6_JEE.p = Math.max(0, Number(rec.subjects.PHYSICS.s) || 0);
        window._T6_JEE.c = Math.max(0, Number(rec.subjects.CHEMISTRY.s) || 0);
        window._T6_JEE.m = Math.max(0, Number(rec.subjects.MATHEMATICS.s) || 0);
        if (rec.difficulty) window._T6_JEE.shift = rec.difficulty;
        window._T6_SYNCED_ID = rec.sessionId;
        window._T6_MODE = "VERIFIED";
        window._T6_TARGET_LOCKED_MSG = "";
        return true;
      }
      if (!IS_JEE && rec.subjects.PHYSICS && rec.subjects.CHEMISTRY && rec.subjects.BOTANY && rec.subjects.ZOOLOGY) {
        window._T6_NEET.p = Math.max(0, Number(rec.subjects.PHYSICS.s) || 0);
        window._T6_NEET.c = Math.max(0, Number(rec.subjects.CHEMISTRY.s) || 0);
        window._T6_NEET.b = Math.max(0, Number(rec.subjects.BOTANY.s) || 0);
        window._T6_NEET.z = Math.max(0, Number(rec.subjects.ZOOLOGY.s) || 0);
        if (rec.difficulty) window._T6_NEET.diff = rec.difficulty;
        window._T6_SYNCED_ID = rec.sessionId;
        window._T6_MODE = "VERIFIED";
        window._T6_TARGET_LOCKED_MSG = "";
        return true;
      }
    } catch (_) {}
    return false;
  };

  function buildAchievementVsDeficiencyHtml(savedTarget, latestMock) {
    const accent = IS_JEE ? "indigo" : "emerald";
    const maxSub = IS_JEE ? 100 : 180;
    const subjects = IS_JEE
      ? [
          { name: "Physics", tgt: Number(savedTarget.p || 0), act: latestMock && latestMock.subjects && latestMock.subjects.PHYSICS ? Number(latestMock.subjects.PHYSICS.s || 0) : null },
          { name: "Chemistry", tgt: Number(savedTarget.c || 0), act: latestMock && latestMock.subjects && latestMock.subjects.CHEMISTRY ? Number(latestMock.subjects.CHEMISTRY.s || 0) : null },
          { name: "Mathematics", tgt: Number(savedTarget.m || 0), act: latestMock && latestMock.subjects && latestMock.subjects.MATHEMATICS ? Number(latestMock.subjects.MATHEMATICS.s || 0) : null }
        ]
      : [
          { name: "Physics", tgt: Number(savedTarget.p || 0), act: latestMock && latestMock.subjects && latestMock.subjects.PHYSICS ? Number(latestMock.subjects.PHYSICS.s || 0) : null },
          { name: "Chemistry", tgt: Number(savedTarget.c || 0), act: latestMock && latestMock.subjects && latestMock.subjects.CHEMISTRY ? Number(latestMock.subjects.CHEMISTRY.s || 0) : null },
          { name: "Botany", tgt: Number(savedTarget.b || 0), act: latestMock && latestMock.subjects && latestMock.subjects.BOTANY ? Number(latestMock.subjects.BOTANY.s || 0) : null },
          { name: "Zoology", tgt: Number(savedTarget.z || 0), act: latestMock && latestMock.subjects && latestMock.subjects.ZOOLOGY ? Number(latestMock.subjects.ZOOLOGY.s || 0) : null }
        ];

    const totalTgt = subjects.reduce((s, r) => s + r.tgt, 0);
    const totalAct = latestMock ? subjects.reduce((s, r) => s + (r.act || 0), 0) : null;
    const totalDef = totalAct !== null ? (totalTgt - totalAct) : null;

    return `
      <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div class="text-xs font-extrabold uppercase tracking-wider text-${accent}-700">ACHIEVEMENT VS. DEFICIENCY REMAINING MATRIX</div>
            <div class="text-[11px] text-slate-600">${latestMock
              ? `Comparing Locked Target (${totalTgt}/${MAX_MARKS}) against Verified Mock <strong>${latestMock.sessionId}</strong> (${totalAct}/${MAX_MARKS})`
              : `Locked Target: <strong>${totalTgt}/${MAX_MARKS}</strong> &bull; Complete a Full Mock in Tab 4 to populate Actual Achievement`}</div>
          </div>
          ${totalDef !== null ? `
            <span class="px-3 py-1 rounded-full text-xs font-extrabold ${totalDef <= 0 ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"}">
              ${totalDef <= 0 ? `Target Surpassed (+${Math.abs(totalDef)} Marks)` : `Total Deficiency: ${totalDef} Marks`}
            </span>
          ` : `<span class="px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-[11px] font-bold">0 Full Mocks Logged</span>`}
        </div>

        <div class="overflow-x-auto bg-white rounded-xl border border-slate-200">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="border-b border-slate-200 bg-slate-50 text-[10px] font-extrabold uppercase text-slate-500">
                <th class="py-2 px-3">Subject</th>
                <th class="py-2 px-3">Locked Target</th>
                <th class="py-2 px-3">Achieved (Mock)</th>
                <th class="py-2 px-3">Deficiency / Surplus</th>
                <th class="py-2 px-3 w-32">Completion</th>
              </tr>
            </thead>
            <tbody>
              ${subjects.map(r => {
                const def = r.act !== null ? (r.tgt - r.act) : null;
                const pctBar = r.act !== null && r.tgt > 0 ? Math.min(100, Math.max(0, Math.round((r.act / r.tgt) * 100))) : 0;
                return `
                  <tr class="border-b border-slate-100">
                    <td class="py-2.5 px-3 font-extrabold text-slate-900">${r.name}</td>
                    <td class="py-2.5 px-3 font-bold text-${accent}-700">${r.tgt} / ${maxSub}</td>
                    <td class="py-2.5 px-3 font-extrabold text-slate-900">${r.act !== null ? `${r.act} / ${maxSub}` : "&mdash;"}</td>
                    <td class="py-2.5 px-3 font-extrabold ${def === null ? "text-slate-400" : (def <= 0 ? "text-emerald-700" : "text-rose-700")}">
                      ${def === null ? "Pending Mock" : (def <= 0 ? `+${Math.abs(def)} Surplus` : `-${def} Remaining`)}
                    </td>
                    <td class="py-2.5 px-3">
                      <div class="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div class="h-full ${def !== null && def <= 0 ? "bg-emerald-600" : `bg-${accent}-600`}" style="width:${pctBar}%"></div>
                      </div>
                    </td>
                  </tr>
                `;
              }).join("")}
              <tr class="bg-slate-50 font-black text-slate-900">
                <td class="py-2.5 px-3">OVERALL TOTAL</td>
                <td class="py-2.5 px-3 text-${accent}-700">${totalTgt} / ${MAX_MARKS}</td>
                <td class="py-2.5 px-3">${totalAct !== null ? `${totalAct} / ${MAX_MARKS}` : "&mdash;"}</td>
                <td class="py-2.5 px-3 ${totalDef === null ? "text-slate-400" : (totalDef <= 0 ? "text-emerald-700" : "text-amber-800")}">
                  ${totalDef === null ? "Pending Mock" : (totalDef <= 0 ? `+${Math.abs(totalDef)} Surplus` : `-${totalDef} Remaining`)}
                </td>
                <td class="py-2.5 px-3 text-[11px] font-extrabold text-slate-600">${totalAct !== null && totalTgt > 0 ? Math.min(100, Math.max(0, Math.round((totalAct / totalTgt) * 100))) + "%" : "0%"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.updateScienceTab6 = function () {
    const out = document.getElementById("t6-live-results");
    if (!out) return;
    const isTargetMode = (window._T6_MODE !== "VERIFIED");
    const vLogs = getVerifiedFullMockLogs();
    const latestMock = vLogs[0] || null;
    const savedTarget = loadSavedSelfTarget();
    const matrixHtml = buildAchievementVsDeficiencyHtml(savedTarget, latestMock);

    if (IS_JEE) {
      const st = window._T6_JEE;
      const rawTotal = st.p + st.c + st.m;
      const targetTotal = (savedTarget.p || 0) + (savedTarget.c || 0) + (savedTarget.m || 0);
      const shiftAdj = st.shift === "TOUGH" ? 14 : (st.shift === "EASY" ? -12 : 0);
      const catBonus = st.cat === "SCST" ? 45 : (st.cat === "OBC" ? 14 : (st.cat === "EWS" ? 10 : 0));
      const eff = Math.min(300, Math.max(0, rawTotal + shiftAdj));
      const cutoffEff = Math.min(300, eff + catBonus);

      let pct = "5.00 %ile", air = "AIR ~13,20,000+", tier = "Below Qualifying Cutoff (Foundation Rebuild Needed)";
      if (eff <= 0) { pct = "0.00 %ile"; air = "AIR ~14,00,000+"; tier = "0 Marks — Attempt Mock in Tab 4 or Raise Target Sliders"; }
      else if (eff >= 265) { pct = "99.95+ %ile"; air = "AIR 350 – 850"; tier = "Top 5 IITs & NIT Trichy CSE Tier"; }
      else if (eff >= 235) { pct = "99.72 %ile"; air = "AIR 2,200 – 3,800"; tier = "NIT Trichy/Surathkal CSE & Top IIT Core"; }
      else if (eff >= 210) { pct = "99.35 %ile"; air = "AIR 6,500 – 9,200"; tier = "Top NITs (ECE/EE) & IIT Qualifying Safe"; }
      else if (eff >= 180) { pct = "98.45 %ile"; air = "AIR 16,000 – 22,000"; tier = "Top 10 NITs Core & IIITs"; }
      else if (eff >= 145) { pct = "96.20 %ile"; air = "AIR 40,000 – 52,000"; tier = "NIT North-East / IIITs / JEE Adv Cutoff Cleared"; }
      else if (eff >= 110) { pct = "93.40 %ile"; air = "AIR 62,000 – 78,000"; tier = "JEE Advanced Borderline / State Govt Core"; }
      else if (eff >= 80) { pct = "86.50 %ile"; air = "AIR ~1,65,000 – 1,95,000"; tier = "State Govt Engineering / Top Private Universities"; }
      else if (eff >= 50) { pct = "72.40 %ile"; air = "AIR ~3,40,000 – 3,90,000"; tier = "State Counselling / Private Engineering Colleges"; }
      else if (eff >= 25) { pct = "48.00 %ile"; air = "AIR ~6,80,000 – 7,40,000"; tier = "Below Cutoff — Focus on High-Yield NCERT Chapters"; }
      else { pct = (eff * 1.8).toFixed(2) + " %ile"; air = "AIR ~10,50,000+"; tier = "Below Qualifying Cutoff — Concept & Accuracy Rebuild"; }

      const colleges = [
        { inst: "IIT Bombay / Delhi / Madras / Kanpur", branch: "CSE / MnC / EE (via JEE Adv Top 1,200)", status: cutoffEff >= 245 ? "Achievable at This Score" : "Need +" + (245 - cutoffEff) + " Eq." },
        { inst: "NIT Trichy / Surathkal / Warangal", branch: "Computer Science & Engineering (CSE)", status: cutoffEff >= 235 ? "Achievable at This Score" : "Need +" + (235 - cutoffEff) + " Eq." },
        { inst: "NIT Trichy / Surathkal / Rourkela / Calicut", branch: "ECE / Electrical / Mechanical", status: cutoffEff >= 195 ? "Achievable at This Score" : "Need +" + (195 - cutoffEff) + " Eq." },
        { inst: "IIIT Hyderabad / IIIT Bangalore / DTU / NSUT", branch: "CSE / AI & Data Science", status: cutoffEff >= 215 ? "Competitive at This Score" : "Need +" + (215 - cutoffEff) + " Eq." }
      ];

      const weakest = [["Physics", st.p], ["Chemistry", st.c], ["Mathematics", st.m]].sort((a, b) => a[1] - b[1])[0];
      const diag = document.getElementById("t6-bottleneck");
      if (diag) {
        const gap = targetTotal - rawTotal;
        diag.innerHTML = !isTargetMode
          ? `<div class="font-extrabold">Actual Strength vs. Locked Target (${targetTotal}/300): ${gap > 0 ? `Deficiency of ${gap} Marks Remaining` : "Target Achieved!"}</div>
             <div>Weakest Verified Subject: <strong>${weakest[0]} (${weakest[1]}/100)</strong>. Locked Targets: P ${savedTarget.p}, C ${savedTarget.c}, M ${savedTarget.m}.</div>`
          : `<div class="font-extrabold">Previewing Target Balance &bull; Lowest Subject: ${weakest[0]} (${weakest[1]}/100)</div>
             <div>Click <strong>Set Target</strong> to lock these subject marks as your official benchmark, or click <strong>Sync Mock</strong> to inspect your actual strength.</div>`;
      }

      out.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="p-4 rounded-2xl ${isTargetMode ? "bg-indigo-50 border-indigo-200" : "bg-emerald-50 border-emerald-200"} border">
            <div class="text-[10px] font-extrabold uppercase ${isTargetMode ? "text-indigo-700" : "text-emerald-700"}">${isTargetMode ? "Target Preview Total" : "Actual Verified Score"}</div>
            <div class="text-2xl font-black text-slate-900 mt-0.5">${rawTotal} <span class="text-xs font-bold text-slate-500">/ 300</span></div>
            <div class="text-[11px] font-bold ${isTargetMode ? "text-indigo-700" : "text-emerald-700"} mt-0.5">Shift-Eq: ${eff}/300</div>
          </div>
          <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div class="text-[10px] font-extrabold uppercase text-emerald-700">${isTargetMode ? "Tentative Expected Percentile" : "Actual Projected Percentile"}</div>
            <div class="text-2xl font-black text-emerald-900 mt-0.5">${pct}</div>
            <div class="text-[11px] font-bold text-emerald-700 mt-0.5">Est. CRL: ${air}</div>
          </div>
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div class="text-[10px] font-extrabold uppercase text-slate-500">${isTargetMode ? "Expected Admission Tier" : "Actual Admission Tier"} (${st.cat}${catBonus > 0 ? " +" + catBonus + " Quota Eq." : ""})</div>
            <div class="text-xs font-extrabold text-slate-900 mt-1 leading-snug">${tier}</div>
          </div>
        </div>
        ${matrixHtml}
        <div class="space-y-2 pt-1">
          <div class="text-xs font-extrabold uppercase tracking-wider text-slate-700">${isTargetMode ? "Tentative Institute & Branch Outcome at Selected Target" : "Actual Institute & Branch Readiness from Synced Mock"} (${st.cat}${catBonus > 0 ? " +" + catBonus + " Quota Eq." : ""})</div>
          ${colleges.map(c => `
            <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div><div class="font-extrabold text-slate-900">${c.inst}</div><div class="text-slate-600">${c.branch}</div></div>
              <span class="px-3 py-1 rounded-full bg-white border border-slate-300 font-extrabold text-indigo-700">${c.status}</span>
            </div>
          `).join("")}
        </div>
      `;
    } else {
      const st = window._T6_NEET;
      const rawTotal = st.p + st.c + st.b + st.z;
      const targetTotal = (savedTarget.p || 0) + (savedTarget.c || 0) + (savedTarget.b || 0) + (savedTarget.z || 0);
      const bioTotal = st.b + st.z;
      const diffAdj = st.diff === "TOUGH" ? 15 : (st.diff === "EASY" ? -10 : 0);
      const catBonus = st.cat === "SCST" ? 85 : (st.cat === "OBC" ? 12 : (st.cat === "EWS" ? 10 : 0));
      const eff = Math.min(720, Math.max(0, rawTotal + diffAdj));
      const quotaEff = Math.min(720, eff + catBonus);

      let air = "AIR > 22,00,000", tier = "Below Qualifying Cutoff (NCERT Bio 340+ Rebuild Needed)";
      if (eff <= 0) { air = "AIR > 23,50,000"; tier = "0 Marks — Attempt Mock in Tab 4 or Raise Target Sliders"; }
      else if (eff >= 705) { air = "AIR 1 – 150"; tier = "AIIMS New Delhi / MAMC / VMMC Delhi"; }
      else if (eff >= 685) { air = "AIR 400 – 1,800"; tier = "Top AIIMS (Bhopal, Jodhpur, Rishikesh) & JIPMER"; }
      else if (eff >= 660) { air = "AIR 2,800 – 6,500"; tier = "Premier State Govt Medical Colleges (AIQ)"; }
      else if (eff >= 630) { air = "AIR 11,000 – 21,000"; tier = "All-India Quota (15%) & State Govt MBBS"; }
      else if (eff >= 595) { air = "AIR 26,000 – 42,000"; tier = "State Quota Govt MBBS (85% Domicile)"; }
      else if (eff >= 520) { air = "AIR 75,000 – 1,35,000"; tier = "Private Medical Colleges / Deemed MBBS & Govt BDS"; }
      else if (eff >= 400) { air = "AIR 2,40,000 – 4,10,000"; tier = "BAMS / BHMS / Private BDS & Allied Health"; }
      else if (eff >= 200) { air = "AIR 7,50,000 – 12,00,000"; tier = "Qualifying Cutoff Zone — Intensive NCERT Drill Needed"; }
      else { air = "AIR > 15,00,000"; tier = "Below NTA Qualifying Percentile — Foundation Rebuild"; }

      const colleges = [
        { inst: "AIIMS New Delhi / MAMC / VMMC", quota: "All India Quota (15%) • Target 700+", status: quotaEff >= 700 ? "Achievable at This Score" : "Need +" + (700 - quotaEff) + " Marks" },
        { inst: "AIIMS Bhopal / Jodhpur / Bhubaneswar / JIPMER", quota: "All India Quota (15%) • Target 680+", status: quotaEff >= 680 ? "Achievable at This Score" : "Need +" + (680 - quotaEff) + " Marks" },
        { inst: "Top State Govt Medical Colleges (GMC)", quota: "AIQ & 85% State Quota • Target 645+", status: quotaEff >= 645 ? "Achievable at This Score" : "Need +" + (645 - quotaEff) + " Marks" },
        { inst: "Govt MBBS Seat (" + st.cat + " Quota)", quota: "85% State Quota • Target 610+", status: quotaEff >= 610 ? "Within Cutoff" : "Need +" + (610 - quotaEff) + " Marks" }
      ];

      const weakest = [["Physics", st.p], ["Chemistry", st.c], ["Botany", st.b], ["Zoology", st.z]].sort((a, b) => a[1] - b[1])[0];
      const diag = document.getElementById("t6-bottleneck");
      if (diag) {
        const gap = targetTotal - rawTotal;
        diag.innerHTML = !isTargetMode
          ? `<div class="font-extrabold">Actual Strength vs. Locked Target (${targetTotal}/720): ${gap > 0 ? `Deficiency of ${gap} Marks Remaining` : "Target Achieved!"}</div>
             <div>Weakest Verified Subject: <strong>${weakest[0]} (${weakest[1]}/180)</strong>. Locked Targets: P ${savedTarget.p}, C ${savedTarget.c}, B ${savedTarget.b}, Z ${savedTarget.z}.</div>`
          : `<div class="font-extrabold">Previewing Biology Anchor: ${bioTotal}/360 &bull; Lowest Subject: ${weakest[0]} (${weakest[1]}/180)</div>
             <div>Click <strong>Set Target</strong> to lock these subject marks as your official benchmark, or click <strong>Sync Mock</strong> to inspect your actual strength.</div>`;
      }

      out.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="p-4 rounded-2xl ${isTargetMode ? "bg-indigo-50 border-indigo-200" : "bg-emerald-50 border-emerald-200"} border">
            <div class="text-[10px] font-extrabold uppercase ${isTargetMode ? "text-indigo-700" : "text-emerald-700"}">${isTargetMode ? "Target Preview Score" : "Actual Verified Score"}</div>
            <div class="text-2xl font-black text-slate-900 mt-0.5">${rawTotal} <span class="text-xs font-bold text-slate-500">/ 720</span></div>
            <div class="text-[11px] font-bold ${isTargetMode ? "text-indigo-700" : "text-emerald-700"} mt-0.5">Diff-Eq: ${eff}/720 &bull; Bio: ${bioTotal}/360</div>
          </div>
          <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div class="text-[10px] font-extrabold uppercase text-emerald-700">${isTargetMode ? "Tentative Expected AIR" : "Actual Projected AIR"}</div>
            <div class="text-xl font-black text-emerald-950 mt-0.5">${air}</div>
            <div class="text-[11px] font-bold text-emerald-700 mt-0.5">MCC / State (${st.cat}${catBonus > 0 ? " +" + catBonus + " Quota Eq." : ""})</div>
          </div>
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div class="text-[10px] font-extrabold uppercase text-slate-500">${isTargetMode ? "Expected Medical Tier" : "Actual Medical Tier"}</div>
            <div class="text-xs font-extrabold text-slate-900 mt-1 leading-snug">${tier}</div>
          </div>
        </div>
        ${matrixHtml}
        <div class="space-y-2 pt-1">
          <div class="text-xs font-extrabold uppercase tracking-wider text-slate-700">${isTargetMode ? "Tentative AIIMS & GMC Outcome at Selected Target" : "Actual AIIMS & GMC Readiness from Synced Mock"} (${st.cat}${catBonus > 0 ? " +" + catBonus + " Quota Eq." : ""})</div>
          ${colleges.map(c => `
            <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div><div class="font-extrabold text-slate-900">${c.inst}</div><div class="text-slate-600">${c.quota}</div></div>
              <span class="px-3 py-1 rounded-full bg-white border border-slate-300 font-extrabold text-emerald-700">${c.status}</span>
            </div>
          `).join("")}
        </div>
      `;
    }
  };

  window.syncT6Val = function (key, rawVal) {
    const maxV = IS_JEE ? 100 : 180;
    const v = Math.min(maxV, Math.max(0, Math.round(Number(rawVal) || 0)));
    if (IS_JEE) window._T6_JEE[key] = v;
    else window._T6_NEET[key] = v;

    if (window._T6_MODE === "VERIFIED") {
      window._T6_MODE = "TARGET";
      const pill = document.getElementById("t6-mode-badge");
      if (pill) {
        pill.textContent = "MODE: DESIRED SELF-TARGET (CLICK SET TARGET TO LOCK)";
        pill.className = "inline-block px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-extrabold uppercase";
      }
    }
    const rEl = document.getElementById("t6-rng-" + key);
    const nEl = document.getElementById("t6-num-" + key);
    if (rEl && Number(rEl.value) !== v) rEl.value = v;
    if (nEl && Number(nEl.value) !== v) nEl.value = v;
    const setBtn = document.getElementById("t6-set-target-btn");
    if (setBtn) {
      const tot = IS_JEE ? (window._T6_JEE.p + window._T6_JEE.c + window._T6_JEE.m) : (window._T6_NEET.p + window._T6_NEET.c + window._T6_NEET.b + window._T6_NEET.z);
      setBtn.innerHTML = "&#127919; Set Target (Lock " + tot + "/" + MAX_MARKS + ")";
    }
    window.updateScienceTab6();
  };

  window.renderScienceTab7 = function (el) {
    const target = getTarget(el);
    if (!target) return;

    const accent = IS_JEE ? "indigo" : "emerald";
    const maxSub = IS_JEE ? 100 : 180;
    const isTargetMode = (window._T6_MODE !== "VERIFIED");

    if (isTargetMode && !window._T6_DIRTY_PREVIEW) {
      const saved = loadSavedSelfTarget();
      if (IS_JEE) window._T6_JEE = { ...saved };
      else window._T6_NEET = { ...saved };
    }

    const rows = IS_JEE
      ? [["Physics", "p", window._T6_JEE.p], ["Chemistry", "c", window._T6_JEE.c], ["Mathematics", "m", window._T6_JEE.m]]
      : [["Physics", "p", window._T6_NEET.p], ["Chemistry", "c", window._T6_NEET.c], ["Botany", "b", window._T6_NEET.b], ["Zoology", "z", window._T6_NEET.z]];

    const ladder = IS_JEE ? [
      ["260+ / 300", "99.93+ %ile", "AIR < 1,000", "NIT Trichy CSE / Top IIT Adv Contender"],
      ["230 – 259", "99.65 – 99.92 %ile", "AIR 1,000 – 4,500", "Top 3 NITs CSE / IIIT-H & IIIT-B"],
      ["200 – 229", "99.10 – 99.64 %ile", "AIR 4,500 – 11,500", "Top NITs ECE/EE & All-India IIITs"],
      ["165 – 199", "97.80 – 99.09 %ile", "AIR 11,500 – 28,000", "Mid-Tier NITs / DTU / NSUT Core"],
      ["115 – 164", "93.50 – 97.79 %ile", "AIR 28,000 – 80,000", "JEE Advanced Cutoff Qualified (Gen)"]
    ] : [
      ["700 – 720", "AIR 1 – 350", "AIIMS New Delhi / MAMC / JIPMER"],
      ["680 – 699", "AIR 350 – 2,500", "AIIMS Bhopal, Jodhpur, Rishikesh & Top GMCs"],
      ["650 – 679", "AIR 2,500 – 10,500", "Premier State Govt Medical Colleges (AIQ)"],
      ["615 – 649", "AIR 10,500 – 28,000", "Govt MBBS Seats (AIQ & State Quota)"],
      ["575 – 614", "AIR 28,000 – 55,000", "State Domicile MBBS / Semi-Govt Quota"]
    ];

    const vLogs = getVerifiedFullMockLogs();
    const avgScore = vLogs.length ? Math.round(vLogs.reduce((a, b) => a + Number(b.totalScore || 0), 0) / vLogs.length) : null;
    const bestScore = vLogs.length ? Math.max(...vLogs.map(b => Number(b.totalScore || 0))) : null;

    const syncBannerHtml = isTargetMode
      ? `<div id="t6-sync-pill" class="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 space-y-1">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span><strong>&#127919; Self-Target Goal Mode:</strong> Adjust sliders &amp; click <strong>Set Target</strong> to lock your goal, or click <strong>Sync Mock</strong> to inspect actual achievement.</span>
            ${vLogs.length ? `<button type="button" onclick="if(window.applySyncedMockToTab6()){ window.renderScienceTab7(); }" class="underline font-extrabold text-emerald-700 cursor-pointer">Load Actual Mock Strength &rarr;</button>` : ""}
          </div>
          <div class="text-[11px] opacity-90">${vLogs.length
            ? `Verified Full Mocks Logged: <strong>${vLogs.length}</strong> &bull; Latest: <strong>${vLogs[0].sessionId} (${vLogs[0].totalScore}/${MAX_MARKS})</strong> &bull; Best: <strong>${bestScore}/${MAX_MARKS}</strong>`
            : `No Full ${REQUIRED_QS}-Q Mock submitted in Tab 4 yet. Submit a Full Mock in Tab 4 to populate Achievement vs. Deficiency.`}</div>
        </div>`
      : `<div id="t6-sync-pill" class="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 space-y-1">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span><strong>&#10003; Actual Strength Achieved:</strong> Sliders show verified marks from Full Mock <strong>${window._T6_SYNCED_ID}</strong></span>
            <button type="button" onclick="window.switchToDesiredTargetMode();" class="underline font-extrabold text-indigo-700 cursor-pointer">Back to My Locked Target</button>
          </div>
          <div class="text-[11px] opacity-90">Full Mocks Completed: <strong>${vLogs.length}</strong> &bull; Rolling Average: <strong>${avgScore}/${MAX_MARKS}</strong> &bull; Best Full Mock: <strong>${bestScore}/${MAX_MARKS}</strong></div>
        </div>`;

    target.innerHTML = `
      <div class="max-w-7xl mx-auto pt-4 pb-10 space-y-5">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div class="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div class="flex items-start justify-between gap-2">
              <div class="space-y-1">
                <span id="t6-mode-badge" class="inline-block px-2.5 py-1 rounded-full ${isTargetMode ? "bg-indigo-100 text-indigo-800" : "bg-emerald-100 text-emerald-800"} text-[10px] font-extrabold uppercase">
                  ${isTargetMode ? (window._T6_TARGET_LOCKED_MSG ? "✓ " + window._T6_TARGET_LOCKED_MSG : "MODE: DESIRED SELF-TARGET") : "MODE: SYNCED ACTUAL STRENGTH"}
                </span>
                <h2 class="text-xl font-extrabold text-slate-900 pt-0.5">${isTargetMode ? "Set Desired Subject Target Marks" : "Actual Subject Strength Achieved"}</h2>
                <div class="text-[11px] font-semibold text-slate-600">${isTargetMode
                  ? "Adjust sliders & dropdowns, then click Set Target to lock your goal and compare against your actual Tab 4 achievement."
                  : "Showing your actual verified Full-Mock marks alongside your Locked Target & Deficiency Matrix."}</div>
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;justify-content:flex-end;">
                <button id="t6-set-target-top" type="button" onclick="window.commitCurrentAsTarget();"
                  style="background:#4f46e5;color:#ffffff;border:none;border-radius:10px;padding:8px 12px;font-size:12px;font-weight:800;cursor:pointer;">
                  &#127919; Set Target
                </button>
                <button type="button" onclick="window.resetDesiredTargetToDefault();"
                  style="background:#f1f5f9;color:#1e293b;border:1px solid #cbd5e1;border-radius:10px;padding:8px 11px;font-size:12px;font-weight:800;cursor:pointer;">
                  Reset Target
                </button>
                <button type="button" onclick="if(window.applySyncedMockToTab6()){ window.renderScienceTab7(); } else { alert('No submitted Tab 4 Full Mock found in ledger yet. Submit a complete Tab 4 Full Mock first.'); }"
                  style="background:#059669;color:#ffffff;border:none;border-radius:10px;padding:8px 12px;font-size:12px;font-weight:800;cursor:pointer;">
                  &#8635; Sync Mock
                </button>
              </div>
            </div>

            ${rows.map(([lbl, key, val]) => `
              <div class="space-y-1.5">
                <div class="flex items-center justify-between text-xs font-extrabold">
                  <span>${lbl} ${isTargetMode ? "Target" : "Achieved"} (0 – ${maxSub})</span>
                  <div class="flex items-center gap-1">
                    <input id="t6-num-${key}" type="number" min="0" max="${maxSub}" value="${val}"
                      oninput="window.syncT6Val('${key}', this.value);"
                      class="w-16 rounded-lg border border-slate-300 px-2 py-1 text-right font-mono font-extrabold text-${accent}-700" />
                    <span class="text-slate-500">/ ${maxSub}</span>
                  </div>
                </div>
                <input id="t6-rng-${key}" type="range" min="0" max="${maxSub}" step="1" value="${val}"
                  oninput="window.syncT6Val('${key}', this.value);"
                  class="w-full accent-${accent}-600 cursor-pointer" />
              </div>
            `).join("")}

<div id="t6-target-action-bar" style="display:flex;gap:8px;align-items:center;padding-top:6px;">
              <button id="t6-set-target-btn" type="button" onclick="window.commitCurrentAsTarget();"
                style="flex:1;background:#4f46e5;color:#ffffff;border:none;border-radius:12px;padding:10px 14px;font-size:12px;font-weight:800;cursor:pointer;">
                &#127919; Set Target (Lock ${IS_JEE ? (window._T6_JEE.p + window._T6_JEE.c + window._T6_JEE.m) + "/300" : (window._T6_NEET.p + window._T6_NEET.c + window._T6_NEET.b + window._T6_NEET.z) + "/720"})
              </button>
              <button type="button" onclick="window.resetDesiredTargetToDefault();"
                style="background:#f1f5f9;color:#1e293b;border:1px solid #cbd5e1;border-radius:12px;padding:10px 14px;font-size:12px;font-weight:800;cursor:pointer;">
                Reset Target
              </button>
            </div>
            <div class="grid grid-cols-2 gap-3 pt-1 text-xs">
              <div>
                <label class="block font-extrabold text-slate-600 mb-1">${IS_JEE ? "NTA Shift Normalization" : "Paper Difficulty Level"}</label>
                <select onchange="if(${IS_JEE}){ window._T6_JEE.shift=this.value; } else { window._T6_NEET.diff=this.value; } window.updateScienceTab6();" class="w-full rounded-xl border border-slate-300 px-3 py-2 font-bold">
                  <option value="TOUGH" ${(IS_JEE ? window._T6_JEE.shift : window._T6_NEET.diff) === "TOUGH" ? "selected" : ""}>Tough Paper (+${IS_JEE ? 14 : 15} Eq.)</option>
                  <option value="MODERATE" ${(IS_JEE ? window._T6_JEE.shift : window._T6_NEET.diff) === "MODERATE" ? "selected" : ""}>Standard NTA Paper (0 Eq.)</option>
                  <option value="EASY" ${(IS_JEE ? window._T6_JEE.shift : window._T6_NEET.diff) === "EASY" ? "selected" : ""}>High-Cutoff Paper (-${IS_JEE ? 12 : 10} Eq.)</option>
                </select>
              </div>
              <div>
                <label class="block font-extrabold text-slate-600 mb-1">${IS_JEE ? "Admission Category" : "Counselling Quota"}</label>
                <select onchange="if(${IS_JEE}){ window._T6_JEE.cat=this.value; } else { window._T6_NEET.cat=this.value; } window.updateScienceTab6();" class="w-full rounded-xl border border-slate-300 px-3 py-2 font-bold">
                  <option value="GEN" ${(IS_JEE ? window._T6_JEE.cat : window._T6_NEET.cat) === "GEN" ? "selected" : ""}>General (OPEN)</option>
                  <option value="EWS" ${(IS_JEE ? window._T6_JEE.cat : window._T6_NEET.cat) === "EWS" ? "selected" : ""}>GEN-EWS</option>
                  <option value="OBC" ${(IS_JEE ? window._T6_JEE.cat : window._T6_NEET.cat) === "OBC" ? "selected" : ""}>OBC-NCL</option>
                  <option value="SCST" ${(IS_JEE ? window._T6_JEE.cat : window._T6_NEET.cat) === "SCST" ? "selected" : ""}>SC / ST</option>
                </select>
              </div>
            </div>

            ${syncBannerHtml}
            <div id="t6-bottleneck" class="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1"></div>
          </div>

          <div class="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div id="t6-live-results" class="space-y-4"></div>

            <div class="overflow-x-auto pt-2 border-t border-slate-100">
              <div class="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">${IS_JEE ? "NTA JEE Main Marks vs. Percentile Calibration Ladder" : "NTA NEET UG Marks vs. AIR Calibration Ladder"}</div>
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="border-b border-slate-200 text-slate-500">
                    ${IS_JEE
                      ? '<th class="py-2 pr-3">Score Band</th><th class="py-2 pr-3">Percentile</th><th class="py-2 pr-3">CRL AIR</th><th class="py-2">Target Outcome</th>'
                      : '<th class="py-2 pr-3">Score Band (720)</th><th class="py-2 pr-3">Projected AIR</th><th class="py-2">Medical College Allocation</th>'}
                  </tr>
                </thead>
                <tbody>
                  ${ladder.map(r => `
                    <tr class="border-b border-slate-100">
                      <td class="py-2 pr-3 font-extrabold text-slate-900">${r[0]}</td>
                      <td class="py-2 pr-3 font-bold text-emerald-700">${r[1]}</td>
                      <td class="py-2 ${IS_JEE ? 'pr-3 font-semibold' : 'text-slate-600'}">${r[2]}</td>
                      ${IS_JEE ? `<td class="py-2 text-slate-600">${r[3]}</td>` : ""}
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
    window.updateScienceTab6();
  };

  // ============================================================================
  // TAB 6: SUBJECT & CHAPTER-WISE TRAP DOCTOR (12 TRAPS PER CHAPTER) + AUTOPSY
  // ============================================================================
  window._T6_TD_SUBJ = window._T6_TD_SUBJ || (IS_JEE ? "PHYSICS" : "BOTANY");
  window._T6_TD_CHAP_IDX = Number(window._T6_TD_CHAP_IDX || 0);
  window._T6_TD_VIEW = window._T6_TD_VIEW || "LIBRARY";
  window._T6_TD_MASTERED = window._T6_TD_MASTERED || {};

  function getChapterTrapCatalog() {
    if (IS_JEE) {
      return {
        PHYSICS: [
          {
            chapter: "Rotational Motion & Gravitation",
            traps: [
              { title: "Rolling vs. Sliding Kinetic Energy", lure: "Using KE = 1/2 mv^2 for a rolling body.", fix: "For pure rolling, KE_total = 1/2 mv^2 (1 + I/mR^2): 3/4 mv^2 (solid cylinder), 7/10 mv^2 (solid sphere), mv^2 (ring)." },
              { title: "Axis Shift Direction in Parallel Axis Theorem", lure: "Applying I = I_1 + Md^2 between two arbitrary non-COM axes.", fix: "I = I_cm + Md^2 ONLY holds when I_cm passes through the exact Center of Mass." },
              { title: "Friction Direction on Accelerated Rolling Body", lure: "Assuming static friction always opposes linear motion.", fix: "If torque is applied at axle, friction acts forward; if force acts above COM (h > I/mR), friction acts forward." },
              { title: "Angular Momentum Conservation Pivot Choice", lure: "Conserving L about a moving point with external torque.", fix: "Choose the pivot point where the line of action of the impulsive external force passes (r x F = 0)." },
              { title: "Escape Velocity vs. Orbital Velocity Factor", lure: "Confusing v_e = sqrt(gR) with v_o = sqrt(2gR).", fix: "v_orbital = sqrt(GM/R) = sqrt(gR), whereas v_escape = sqrt(2GM/R) = sqrt(2) * v_orbital." },
              { title: "Altitude vs. Depth Gravity Formula", lure: "Using g(1 - 2h/R) when h is comparable to R.", fix: "Use binomial g(1 - 2h/R) ONLY for h << R; for large h, use exact g * [R/(R+h)]^2. Inside Earth, g(d) = g(1 - d/R)." },
              { title: "Gravitational Potential Inside a Hollow Shell", lure: "Setting potential V = 0 because field E = 0 inside.", fix: "Inside a spherical shell, E = 0 everywhere, so potential is constant and non-zero: V = -GM/R." },
              { title: "Time Period of Satellite Independent of Mass", lure: "Scaling T^2 with satellite mass m.", fix: "Kepler's 3rd Law T^2 = (4pi^2 / GM) r^3 depends ONLY on central planet mass M, never on satellite mass m." },
              { title: "Instantaneous Axis of Rotation (IAOR) Speed", lure: "Using v = omega * R for the topmost point of a rolling wheel.", fix: "Topmost point is at distance 2R from bottom IAOR, so v_top = 2 * v_cm = 2 * omega * R." },
              { title: "Kepler's 2nd Law Areal Velocity Sign", lure: "Equating linear speed v at perihelion and aphelion.", fix: "r_p * v_p = r_a * v_a (angular momentum conserved), so speed is maximum at perihelion (closest approach)." },
              { title: "Total Energy Sign of Bound Orbit", lure: "Reporting binding energy as negative or total energy as positive.", fix: "For bound circular orbit: KE = +GMm/2r, PE = -GMm/r, Total E = -GMm/2r, Binding Energy = +GMm/2r." },
              { title: "Moment of Inertia of Hollow vs. Solid Sphere", lure: "Swapping 2/5 MR^2 and 2/3 MR^2.", fix: "Solid sphere has mass closer to center -> smaller I = 2/5 MR^2; Hollow spherical shell -> larger I = 2/3 MR^2." }
            ]
          },
          {
            chapter: "Electrostatics & Current Electricity",
            traps: [
              { title: "Electric Field vs. Potential Inside Conductor", lure: "Assuming V = 0 inside a charged conductor because E = 0.", fix: "Inside a conductor in electrostatic equilibrium, E = 0, so V is constant throughout and equals V_surface." },
              { title: "Gauss's Law Flux vs. Field Contribution", lure: "Thinking E on Gaussian surface depends only on q_enclosed.", fix: "Flux phi = q_enc / eps_0 depends only on enclosed charge, but E at any point depends on ALL charges (inside + outside)." },
              { title: "Dielectric Insertion: Battery Connected vs. Disconnected", lure: "Using Q = const when battery remains connected.", fix: "Battery connected -> V = const, Q increases K times, U increases K times. Battery disconnected -> Q = const, V & U decrease by 1/K." },
              { title: "Dipole Torque vs. Potential Energy Extremes", lure: "Assuming unstable equilibrium occurs at theta = 90 deg.", fix: "At theta = 90 deg, torque is max (pE) and U = 0; unstable equilibrium is at theta = 180 deg (U = +pE, torque = 0)." },
              { title: "Stretching a Wire to n Times Length", lure: "Multiplying resistance by n instead of n^2.", fix: "Volume V = A*L is constant: if L -> nL, area A -> A/n, so R_new = n^2 * R_old." },
              { title: "Terminal Voltage During Charging vs. Discharging", lure: "Always writing V = E - Ir.", fix: "During discharging V = E - Ir; during charging (current enters +ve terminal) V = E + Ir." },
              { title: "Ammeter & Voltmeter Ideal Resistance Swap", lure: "Connecting low-resistance ammeter in parallel.", fix: "Ideal ammeter has R = 0 (series); ideal voltmeter has R = infinity (parallel)." },
              { title: "Power Dissipation: Series vs. Parallel Bulb Rating", lure: "Assuming higher wattage bulb glows brighter in series.", fix: "In parallel (same V), P = V^2/R -> higher wattage glows brighter. In series (same I), P = I^2 R -> lower wattage (higher R) glows brighter." },
              { title: "Wheatstone Bridge Non-Null Deflection", lure: "Simplifying bridge when R1/R2 != R3/R4.", fix: "Never drop the galvanometer branch unless R1*R4 == R2*R3; use nodal analysis or delta-star otherwise." },
              { title: "Self-Energy of a Uniformly Charged Solid Sphere", lure: "Using kQ^2 / 2R (which is for a conducting shell).", fix: "Conducting/hollow shell self-energy = 1/2 kQ^2/R; uniformly charged non-conducting solid sphere = 3/5 kQ^2/R." },
              { title: "RC Circuit Steady-State Capacitor Behavior", lure: "Treating capacitor as short circuit at t = infinity.", fix: "At t = 0 (uncharged), capacitor acts as short circuit; at t = infinity (steady state), capacitor acts as open circuit (I = 0)." },
              { title: "Temperature Coefficient of Semiconductors vs. Metals", lure: "Applying positive alpha to Silicon/Germanium.", fix: "Metals have positive alpha (R rises with T); semiconductors/electrolytes have negative alpha (R drops with T)." }
            ]
          },
          {
            chapter: "Ray & Wave Optics",
            traps: [
              { title: "Cartesian Sign Convention for Mirror & Lens", lure: "Forgetting negative sign for object distance u.", fix: "Incident light goes left-to-right: u is negative for all real objects; f is +ve for convex lens/mirror, -ve for concave lens/mirror." },
              { title: "Lens Immersed in Liquid of Higher Refractive Index", lure: "Assuming convex lens always stays converging.", fix: "If mu_liquid > mu_lens, 1/f = (mu_lens/mu_liq - 1)(1/R1 - 1/R2) flips sign: convex lens becomes diverging!" },
              { title: "Cutting a Lens Horizontally vs. Vertically", lure: "Halving focal length when cut along principal axis.", fix: "Horizontal cut (along principal axis) keeps f unchanged (brightness halves); vertical cut (symmetrical) doubles focal length (f -> 2f)." },
              { title: "Total Internal Reflection (TIR) Medium Direction", lure: "Checking sin(theta_c) = mu_denser / mu_rarer (> 1).", fix: "TIR ONLY happens from denser to rarer medium, and sin(theta_c) = mu_rarer / mu_denser < 1." },
              { title: "YDSE Fringe Width in Liquid Medium", lure: "Leaving wavelength unchanged when apparatus is submerged.", fix: "In liquid of refractive index mu, lambda' = lambda / mu, so fringe width beta' = beta / mu shrinks." },
              { title: "Intensity Ratio I_max / I_min Formula", lure: "Using (I1 + I2) / (I1 - I2) instead of amplitudes.", fix: "I_max / I_min = (sqrt(I1) + sqrt(I2))^2 / (sqrt(I1) - sqrt(I2))^2." },
              { title: "Power of Lens in Diopters Unit Trap", lure: "Computing P = 1 / f_cm without converting to meters.", fix: "P (in Diopters) = 100 / f(cm) = 1 / f(m)." },
              { title: "Silvered Lens Effective Focal Length", lure: "Adding powers with wrong sign for mirror reflection.", fix: "1/f_eq = 1/f_mirror - 2/f_lens (using Cartesian signs, effective system acts as a mirror)." },
              { title: "Minimum Deviation in Prism Condition", lure: "Assuming i1 = i2 holds for any angle of incidence.", fix: "Minimum deviation delta_m occurs ONLY when i1 = i2 and r1 = r2 = A/2." },
              { title: "Diffraction Central Maxima Width vs. YDSE", lure: "Using lambda*D/d for central diffraction maximum.", fix: "Central diffraction bright fringe has angular width 2*lambda/a (linear width 2*lambda*D/a)—twice that of secondary fringes." },
              { title: "Malus's Law Unpolarized Light First Polarizer", lure: "Applying I_0 cos^2(theta) to unpolarized incident light.", fix: "Unpolarized light passing through the first polarizer ALWAYS becomes I_0 / 2 regardless of polarizer angle." },
              { title: "Plane Mirror Object Velocity Component", lure: "Doubling parallel velocity component of image.", fix: "Only the perpendicular velocity component reverses (v_im,perp = -v_obj,perp); parallel velocity stays identical." }
            ]
          },
          {
            chapter: "Thermodynamics & Modern Physics",
            traps: [
              { title: "Kelvin Conversion in Stefan-Boltzmann & Carnot", lure: "Plugging Celsius temperatures directly into T^4 or 1 - T2/T1.", fix: "ALWAYS convert Celsius to Kelvin (T_K = T_C + 273) in PV=nRT, Carnot efficiency, and radiation laws." },
              { title: "Physics vs. Chemistry First Law Sign Convention", lure: "Using Delta_U = Q + W in Physics problems.", fix: "In Physics, dQ = dU + dW where W > 0 for expansion; in Chemistry, Delta_U = q + w where w < 0 for expansion." },
              { title: "Molar Specific Heat in Polytropic Process", lure: "Using C_v for non-isochoric processes.", fix: "For PV^x = const, molar heat capacity is C = C_v + R / (1 - x)." },
              { title: "RMS Speed vs. Average vs. Most Probable Speed", lure: "Ordering v_mp > v_avg > v_rms.", fix: "v_rms (sqrt(3RT/M)) > v_avg (sqrt(8RT/piM)) > v_mp (sqrt(2RT/M)) -> ratio 1.73 : 1.60 : 1.41." },
              { title: "Photoelectric Stopping Potential vs. Intensity", lure: "Increasing stopping potential V_0 when light intensity doubles.", fix: "Intensity increases photocurrent (electron count); stopping potential V_0 depends ONLY on frequency and work function." },
              { title: "De Broglie Wavelength of Accelerated Charge", lure: "Using same wavelength for proton and electron at same V.", fix: "lambda = h / sqrt(2 m q V): at same accelerating voltage V, heavier proton has much shorter wavelength." },
              { title: "Bohr Radius & Energy Scaling with Z and n", lure: "Multiplying energy by Z instead of Z^2.", fix: "Radius r_n proportional to n^2 / Z; Energy E_n = -13.6 * (Z^2 / n^2) eV." },
              { title: "Spectral Lines Number from Level n to Ground", lure: "Writing n(n+1)/2 instead of n(n-1)/2.", fix: "Maximum distinct emission lines from level n to n=1 is n(n - 1) / 2." },
              { title: "Radioactive Mean Life vs. Half-Life", lure: "Equating tau = T_1/2.", fix: "Mean life tau = 1 / lambda = T_1/2 / 0.693 = 1.44 * T_1/2 (mean life is longer than half-life)." },
              { title: "Nuclear Radius Proportionality", lure: "Scaling nuclear radius R with A instead of A^(1/3).", fix: "R = R_0 * A^(1/3), so nuclear density is constant and independent of mass number A." },
              { title: "Zener Diode Breakdown Region Biasing", lure: "Operating Zener voltage regulator in forward bias.", fix: "A Zener diode regulates voltage ONLY when connected in REVERSE bias in the breakdown region." },
              { title: "Adiabatic Bulk Modulus vs. Isothermal", lure: "Using B = P for rapid sound waves in air.", fix: "Isothermal B_iso = P; Adiabatic (sound propagation) B_adi = gamma * P." }
            ]
          }
        ],
        CHEMISTRY: [
          {
            chapter: "Chemical & Ionic Equilibrium",
            traps: [
              { title: "Pure Solids & Liquids in Kp / Kc Expressions", lure: "Including CaCO3(s) or H2O(l) in equilibrium constant.", fix: "Active mass of pure solids and pure liquids is unity (1); omit them from Kp, Kc, and Delta_n_g." },
              { title: "Delta_n_g Sign & Kelvin T in Kp = Kc(RT)^Delta_n_g", lure: "Using Celsius T or counting solid moles in Delta_n_g.", fix: "Delta_n_g = (gaseous product moles) - (gaseous reactant moles), and T MUST be in Kelvin." },
              { title: "pH of 10^-8 M Strong Acid (HCl)", lure: "Answering pH = 8 (basic!) for dilute HCl.", fix: "Include water auto-ionization [H+] = 10^-8 + 10^-7 = 1.1 x 10^-7 M -> pH = 6.96 (always < 7)." },
              { title: "Inert Gas Addition at Constant Volume vs. Pressure", lure: "Shifting equilibrium when inert gas is added at constant V.", fix: "At constant V, partial pressures don't change -> NO shift. At constant P, volume rises -> shifts toward more gas moles." },
              { title: "Solubility Product Ksp of AB2 / A2B3 Salts", lure: "Using Ksp = s^2 for CaF2 or Ag2CrO4.", fix: "For AB2/A2B: Ksp = 4s^3; for AB3: Ksp = 27s^4; for A2B3: Ksp = 108s^5." },
              { title: "Buffer Capacity Maximum Condition", lure: "Assuming buffer works best when [Salt]/[Acid] = 10.", fix: "Maximum buffer capacity occurs at [Salt] = [Acid] (pH = pKa), effective within pKa +/- 1." },
              { title: "Salt Hydrolysis pH of Weak Acid + Weak Base", lure: "Making pH depend on concentration C.", fix: "For WA + WB salt (e.g. CH3COONH4), pH = 7 + 1/2(pKa - pKb), completely independent of concentration C." },
              { title: "Ostwald Dilution Law Validity", lure: "Applying alpha = sqrt(Ka/C) when alpha > 0.1.", fix: "If sqrt(Ka/C) > 0.1, solve the exact quadratic Ka = C*alpha^2 / (1 - alpha)." },
              { title: "Temperature Effect on Ionic Product Kw", lure: "Assuming neutral water always has pH = 7 at 60 C.", fix: "Water dissociation is endothermic: at 60 C, Kw ~ 10^-13, so neutral water has pH = pOH = 6.5." },
              { title: "Reversing or Multiplying Equilibrium Equation", lure: "Multiplying K by n instead of raising K^n.", fix: "Multiplying equation by n -> K_new = K^n; reversing equation -> K_new = 1/K." },
              { title: "Common Ion Effect on Ksp Value", lure: "Changing Ksp when NaCl is added to AgCl.", fix: "Common ion lowers molar solubility s, but Ksp is a thermodynamic constant that changes ONLY with temperature." },
              { title: "Conjugate Acid-Base Ka * Kb Relation", lure: "Using Ka + Kb = 14 instead of pKa + pKb = 14.", fix: "For a conjugate acid-base pair at 25 C: Ka * Kb = Kw = 10^-14 => pKa + pKb = 14." }
            ]
          },
          {
            chapter: "Electrochemistry & Chemical Kinetics",
            traps: [
              { title: "Standard Electrode Potential E0 is Intensive", lure: "Doubling E0 when cell reaction is multiplied by 2.", fix: "E0 is an intensive property (never multiplied by stoichiometric coefficients), whereas Delta_G0 = -nFE0 is extensive." },
              { title: "Nernst Equation Log Base & 0.0591 Factor", lure: "Using 0.0591 with natural log ln(Q) instead of log10(Q).", fix: "At 298 K: E = E0 - (0.0591 / n) * log10(Q)." },
              { title: "Cathode vs. Anode Sign in Galvanic vs. Electrolytic", lure: "Defining cathode by + or - sign instead of redox.", fix: "Oxidation ALWAYS occurs at Anode; Reduction ALWAYS occurs at Cathode (in both galvanic and electrolytic cells)." },
              { title: "Electrolysis of Aqueous NaCl Products", lure: "Producing Na metal and O2 gas at electrodes.", fix: "In aqueous NaCl, H2O reduces to H2(g) at cathode, and Cl- oxidizes to Cl2(g) at anode (overpotential effect)." },
              { title: "Molar Conductivity vs. Specific Conductivity on Dilution", lure: "Assuming both kappa and Lambda_m increase on dilution.", fix: "Specific conductance kappa decreases on dilution (fewer ions/mL), while molar conductivity Lambda_m increases." },
              { title: "Zero-Order vs. First-Order Half-Life Dependence", lure: "Assuming t_1/2 is independent of [A]_0 for all orders.", fix: "Zero order: t_1/2 = [A]_0 / 2k; First order: t_1/2 = 0.693 / k (independent of [A]_0); Second order: t_1/2 = 1 / (k[A]_0)." },
              { title: "First-Order Gas Phase Total Pressure Formula", lure: "Plugging total pressure P_t directly as reactant pressure.", fix: "For A(g) -> B(g) + C(g), P_A = 2P_0 - P_t, so k = (2.303/t) log10[P_0 / (2P_0 - P_t)]." },
              { title: "Arrhenius Plot Slope Sign", lure: "Taking slope of ln(k) vs. 1/T as +Ea/R.", fix: "ln(k) = ln(A) - (Ea/R)(1/T), so the slope is negative: -Ea / R (or -Ea / 2.303R for log10)." },
              { title: "Catalyst Effect on Delta_H and Equilibrium Constant", lure: "Assuming catalyst increases equilibrium yield or Delta_H.", fix: "Catalyst lowers Ea for forward and reverse equally -> faster equilibrium, zero change in Delta_H, Delta_G, or K_eq." },
              { title: "Molecularity vs. Order of Reaction", lure: "Allowing molecularity to be zero or fractional.", fix: "Order is experimental (can be 0, fractional, negative); molecularity applies only to elementary steps (positive integer 1, 2, 3)." },
              { title: "Faraday's First Law Charge Calculation", lure: "Using current in mA or time in minutes.", fix: "Q (Coulombs) = I (Amperes) * t (seconds); 1 Faraday = 96,500 C deposits 1 gram-equivalent." },
              { title: "Kohlrausch Law for Weak Electrolyte Lambda_m0", lure: "Extrapolating Lambda_m vs sqrt(C) linearly for CH3COOH.", fix: "Strong electrolytes extrapolate linearly; weak electrolytes require Kohlrausch's Law: Lambda0(CH3COOH) = Lambda0(CH3COONa) + Lambda0(HCl) - Lambda0(NaCl)." }
            ]
          },
          {
            chapter: "Organic Mechanisms & Named Reactions",
            traps: [
              { title: "Anisole Cleavage with HI (1 Equiv)", lure: "Forming iodobenzene + methanol.", fix: "Aryl-O bond has partial double-bond character: cleavage gives Phenol + CH3I (never iodobenzene)." },
              { title: "Carbocation Rearrangement in SN1 & E1", lure: "Attaching nucleophile without checking 1,2-hydride/methyl shift.", fix: "Whenever a 1 deg or 2 deg carbocation forms next to a 3 deg/4 deg carbon, 1,2-shift occurs before nucleophile attack." },
              { title: "SN2 Inversion vs. Retention of Configuration", lure: "Assuming chiral center always switches R to S.", fix: "SN2 gives 100% backside inversion of stereochemistry, though CIP priority rules may keep R/S label same or flip it." },
              { title: "Hoffmann Bromamide Degradation Carbon Count", lure: "Keeping same number of carbons in product amine.", fix: "R-CONH2 + Br2 + 4KOH -> R-NH2 (product primary amine has ONE carbon less than parent amide)." },
              { title: "Aldol vs. Cannizzaro Alpha-Hydrogen Requirement", lure: "Running Cannizzaro on acetaldehyde (CH3CHO).", fix: "Alpha-H present -> Aldol condensation; NO alpha-H (HCHO, PhCHO, R3C-CHO) -> Cannizzaro disproportionation." },
              { title: "Reimer-Tiemann Electrophile Identity", lure: "Thinking chloroform acts as a nucleophile.", fix: "CHCl3 + OH- generates neutral singlet dichlorocarbene (:CCl2) electrophile -> ortho-salicylaldehyde major." },
              { title: "Gabriel Phthalimide Synthesis Limitation", lure: "Using Gabriel synthesis to prepare aniline.", fix: "Aryl halides do not undergo SN2 with potassium phthalimide -> prepares ONLY pure aliphatic primary amines." },
              { title: "Anti-Markovnikov Peroxide Effect Scope", lure: "Applying peroxide effect to HCl and HI.", fix: "Kharasch peroxide radical addition works ONLY with HBr (for HCl and HI, one propagation step is endothermic)." },
              { title: "Grignard Reagent with Acidic Proton Sources", lure: "Getting nucleophilic addition in presence of -OH, -NH, or -SH.", fix: "RMgX reacts faster as a base with any active H (H2O, ROH, RCOOH, terminal alkyne) to form alkane R-H." },
              { title: "Sandmeyer vs. Gattermann Reagent Difference", lure: "Confusing Cu2Cl2/HCl with Cu powder/HCl.", fix: "Sandmeyer uses Cu2X2/HX (higher yield); Gattermann uses Cu powder/HX." },
              { title: "Lucas Test Reactivity Order", lure: "Thinking primary alcohol gives immediate turbidity.", fix: "3 deg alcohol -> immediate turbidity; 2 deg -> 5 mins; 1 deg -> no turbidity at room temperature." },
              { title: "Ozonolysis Reductive vs. Oxidative Workup", lure: "Stopping at aldehyde when H2O2 is present.", fix: "Zn/H2O or Me2S gives aldehydes/ketones; H2O2 oxidizes aldehydes further to carboxylic acids." }
            ]
          },
          {
            chapter: "Chemical Bonding & Coordination Compounds",
            traps: [
              { title: "O2, O2+, O2-, O2^2- Bond Order & Magnetism", lure: "Assuming O2 is diamagnetic because it has even electrons (16).", fix: "MOT places 2 unpaired electrons in pi*2p -> O2 is paramagnetic (BO = 2.0); O2^2- is diamagnetic (BO = 1.0)." },
              { title: "Bent's Rule & Lone Pair Position in Trigonal Bipyramidal", lure: "Placing lone pairs in axial positions of SF4 or ClF3.", fix: "In sp3d (TBP), lone pairs ALWAYS occupy equatorial positions to minimize 90-degree repulsions." },
              { title: "Back Bonding in BF3 vs. BCl3 vs. BBr3 Lewis Acidity", lure: "Ranking BF3 as strongest Lewis acid due to F electronegativity.", fix: "2p-2p back bonding in BF3 reduces electron deficiency -> Lewis acid strength: BI3 > BBr3 > BCl3 > BF3." },
              { title: "Strong Field vs. Weak Field Ligand Pairing in d4-d7", lure: "Pairing electrons in [FeF6]^3- or [CoF6]^3-.", fix: "F- is weak field (Delta_o < P) -> high spin; CN-, CO, en are strong field (Delta_o > P) -> low spin." },
              { title: "Square Planar [Ni(CN)4]^2- vs. Tetrahedral [NiCl4]^2-", lure: "Assigning sp3 to [Ni(CN)4]^2-.", fix: "[Ni(CN)4]^2- is dsp2 square planar (diamagnetic); [NiCl4]^2- is sp3 tetrahedral (paramagnetic, 2 unpaired e-)." },
              { title: "Geometrical Isomerism in Tetrahedral Complexes", lure: "Counting cis/trans isomers for [Ma2b2] tetrahedral.", fix: "Tetrahedral complexes NEVER show geometrical isomerism because all 4 positions are adjacent (109.5 deg)." },
              { title: "Jahn-Teller Distortion in Octahedral Complexes", lure: "Expecting strong distortion in t2g^3 or t2g^6.", fix: "Strong Jahn-Teller elongation occurs when eg orbitals are asymmetrically filled (d9 Cu^2+, high-spin d4 Cr^2+)." },
              { title: "Dipole Moment of NH3 vs. NF3", lure: "Giving NF3 higher dipole moment because F is more electronegative.", fix: "In NH3, lone pair and N-H dipoles reinforce (1.47 D); in NF3, they oppose (0.23 D)." },
              { title: "Chelate Effect Entropic Stability", lure: "Attributing chelate stability solely to enthalpy.", fix: "Polydentate ligands (en, EDTA) release more solvent/ligand molecules -> large positive Delta_S drives stability." },
              { title: "EAN (Effective Atomic Number) Rule", lure: "Forgetting to subtract oxidation state before adding 2 * CN.", fix: "EAN = Z - (Oxidation State) + 2 * (Coordination Number)." },
              { title: "Ambidentate Ligands Linkage Isomerism", lure: "Missing NO2- (nitro/nitrito) or SCN- (thiocyanato/isothiocyanato).", fix: "Linkage isomerism occurs whenever a monodentate ligand has two different donor atoms." },
              { title: "Ortho-Nitrophenol vs. Para-Nitrophenol Boiling Point", lure: "Giving ortho-nitrophenol higher boiling point.", fix: "Ortho-nitrophenol has intramolecular H-bonding (steam volatile, lower bp); para-nitrophenol has intermolecular H-bonding (higher bp)." }
            ]
          }
        ],
        MATHEMATICS: [
          {
            chapter: "Definite Integration & Differential Equations",
            traps: [
              { title: "King's Property f(a + b - x) Identification", lure: "Expanding sin^n(x)/(sin^n(x)+cos^n(x)) via substitution.", fix: "Whenever I = integral_a^b f(x)dx has symmetry f(a+b-x), add I + I = integral_a^b [f(x)+f(a+b-x)]dx -> instant (b-a)/2." },
              { title: "Even vs. Odd Function on Symmetric Limits [-a, a]", lure: "Integrating odd functions manually or forgetting to split.", fix: "Check f(-x): if f(-x) = -f(x), integral on [-a, a] is immediately 0; if f(-x) = f(x), it is 2 * integral_0^a f(x)dx." },
              { title: "Leibniz Rule Variable Limits Derivative", lure: "Forgetting chain rule g'(x) when differentiating integral limits.", fix: "d/dx [integral_{h(x)}^{g(x)} f(t)dt] = f(g(x))*g'(x) - f(h(x))*h'(x)." },
              { title: "Modulus & Greatest Integer Function [x] Splitting", lure: "Integrating |x - c| or [x] across discontinuities without splitting.", fix: "Break the interval at every integer (for [x]) and every root (for |x - c|)." },
              { title: "Integrating Factor Sign in Linear DE dy/dx + Py = Q", lure: "Dropping negative sign in P(x) when computing e^(integral P dx).", fix: "Include the sign of P(x) in IF = e^(integral P(x)dx), and write y * (IF) = integral Q * (IF) dx + C." },
              { title: "Order vs. Degree of Differential Equation", lure: "Defining degree when derivatives are inside sin(dy/dx) or e^(y').", fix: "Order is always defined; degree is defined ONLY when the DE is a polynomial equation in derivatives." },
              { title: "Area Under Curve Below X-Axis Sign", lure: "Letting negative definite integral cancel positive area.", fix: "Geometric area is always positive: Area = integral_a^b |y| dx." },
              { title: "Substitution Limit Change Trap", lure: "Evaluating new antiderivative at old x-limits.", fix: "Either convert limits to u-values immediately or back-substitute u = g(x) before applying original limits." },
              { title: "Periodic Function Definite Integral Property", lure: "Ignoring period T in integral_0^{nT} f(x) dx.", fix: "If f(x + T) = f(x), then integral_0^{nT} f(x)dx = n * integral_0^T f(x)dx." },
              { title: "Bernoulli DE Reduction to Linear Form", lure: "Dividing by y^n without substituting v = y^(1-n).", fix: "Divide dy/dx + Py = Q y^n by y^n and set v = y^(1-n) -> dv/dx + (1-n)Pv = (1-n)Q." },
              { title: "Walli's Formula Odd vs. Even Power pi/2 Factor", lure: "Multiplying by pi/2 when n is odd in integral_0^{pi/2} sin^n(x)dx.", fix: "Multiply by pi/2 ONLY when n is EVEN; when n is odd, the final factor is 1." },
              { title: "Arbitrary Constants Count in General Solution", lure: "Leaving extra constants in an n-th order DE.", fix: "General solution of an n-th order ODE contains exact n independent arbitrary constants." }
            ]
          },
          {
            chapter: "Matrices, Determinants & Vectors",
            traps: [
              { title: "Scalar Factor in Determinant |kA|", lure: "Writing |kA| = k|A| for an n x n matrix.", fix: "Every row contributes a factor k: |kA| = k^n |A| for an n x n matrix." },
              { title: "Adjoint Determinant |adj(A)| Power", lure: "Using |adj(A)| = |A|^n instead of |A|^(n-1).", fix: "For an n x n invertible matrix: |adj(A)| = |A|^(n-1), and |adj(adj(A))| = |A|^((n-1)^2)." },
              { title: "Matrix Multiplication Non-Commutativity in (A+B)^2", lure: "Expanding (A + B)^2 = A^2 + 2AB + B^2.", fix: "(A + B)^2 = A^2 + AB + BA + B^2; equals A^2 + 2AB + B^2 ONLY if AB = BA." },
              { title: "Reversal Law for Transpose & Inverse", lure: "Writing (AB)^-1 = A^-1 B^-1.", fix: "(AB)^-1 = B^-1 A^-1 and (AB)^T = B^T A^T (order always reverses)." },
              { title: "Skew-Symmetric Odd-Order Determinant", lure: "Expanding a 3x3 or 5x5 skew-symmetric determinant manually.", fix: "Determinant of ANY odd-order skew-symmetric matrix is ALWAYS 0." },
              { title: "Cramer's Rule Delta = 0 Consistency Check", lure: "Concluding no solution whenever Delta = 0.", fix: "If Delta = 0 and all Delta_i = 0, system can have infinitely many solutions (check rank/planes)." },
              { title: "Scalar Triple Product [a b c] Coplanarity", lure: "Checking a . b = 0 for coplanarity.", fix: "Three vectors a, b, c are coplanar iff their scalar triple product [a b c] = 0." },
              { title: "Vector Triple Product a x (b x c) Expansion", lure: "Confusing bracket order in BAC - CAB rule.", fix: "a x (b x c) = (a . c)b - (a . b)c (middle vector minus outer vector)." },
              { title: "Projection of Vector a on Vector b", lure: "Dividing by |a| instead of |b|.", fix: "Scalar projection of a onto b is (a . b) / |b| (divide by magnitude of target vector b)." },
              { title: "Shortest Distance Between Skew vs. Parallel Lines", lure: "Using |(a2 - a1) . (b1 x b2)| / |b1 x b2| when b1 || b2.", fix: "When b1 x b2 = 0 (parallel lines), shortest distance is |(a2 - a1) x b| / |b|." },
              { title: "Trace of Matrix Product tr(AB) = tr(BA)", lure: "Assuming tr(ABC) = tr(ACB).", fix: "Trace is invariant under cyclic permutations: tr(ABC) = tr(BCA) = tr(CAB), NOT arbitrary swaps." },
              { title: "Area of Triangle vs. Parallelogram Using Cross Product", lure: "Forgetting 1/2 factor for triangle area.", fix: "Parallelogram area = |a x b|; Triangle area = 1/2 |a x b|." }
            ]
          },
          {
            chapter: "Limits, Continuity & Differentiability",
            traps: [
              { title: "1^infinity Indeterminate Form Formula", lure: "Evaluating lim f(x)^g(x) as 1 when f(x) -> 1 and g(x) -> infinity.", fix: "For 1^infinity form, limit = exp(lim [f(x) - 1] * g(x))." },
              { title: "L'Hopital's Rule Non-0/0 Application", lure: "Differentiating numerator/denominator when limit is NOT 0/0 or inf/inf.", fix: "Verify 0/0 or inf/inf BEFORE every single application of L'Hopital's Rule." },
              { title: "Limit of sin(x)/x as x -> infinity", lure: "Writing lim_{x -> infinity} sin(x)/x = 1.", fix: "sin(x)/x -> 1 ONLY as x -> 0; as x -> infinity, |sin(x)| <= 1 so sin(x)/x -> 0." },
              { title: "Differentiability of |f(x)| at Simple Roots", lure: "Assuming |x - a| is differentiable because it is continuous.", fix: "|x - a| is continuous everywhere, but non-differentiable at sharp corner x = a (LHD = -1 != RHD = +1)." },
              { title: "Continuity Does Not Imply Differentiability", lure: "Skipping LHD = RHD check once LHL = RHL = f(a) holds.", fix: "Differentiability implies continuity, but continuous functions (like |x| or x^(1/3)) can fail differentiability." },
              { title: "Rolle's & Lagrange MVT Open vs. Closed Interval", lure: "Requiring differentiability at endpoints [a, b].", fix: "MVT requires continuity on closed [a, b] and differentiability on open (a, b)." },
              { title: "Inverse Function Derivative (f^-1)'(y)", lure: "Evaluating 1 / f'(y) instead of 1 / f'(x).", fix: "If f(a) = b, then (f^-1)'(b) = 1 / f'(a) (evaluate denominator at x = a, NOT b)." },
              { title: "Logarithmic Differentiation for f(x)^g(x)", lure: "Using power rule g(x) * f(x)^(g(x)-1) * f'(x).", fix: "When both base and exponent depend on x, take ln(y) = g(x) ln(f(x)) before differentiating." },
              { title: "Standard Exponential Limit (1 + a/x)^(bx)", lure: "Missing product a*b in exponent.", fix: "lim_{x -> infinity} (1 + a/x)^(bx) = e^(ab)." },
              { title: "Point of Inflection Second Derivative Sign Change", lure: "Declaring inflection wherever f''(x) = 0.", fix: "f''(x) = 0 (or undefined) is necessary, AND f''(x) MUST change sign across that point." },
              { title: "Local Extrema at Critical Points Where f'(x) DNE", lure: "Checking only f'(x) = 0 and ignoring sharp corners.", fix: "Critical points include BOTH f'(x) = 0 AND points in domain where f'(x) does not exist." },
              { title: "Parametric Second Derivative d^2y/dx^2", lure: "Writing (d^2y/dt^2) / (d^2x/dt^2).", fix: "d^2y/dx^2 = [d/dt (dy/dx)] / (dx/dt) (must divide by dx/dt a second time)." }
            ]
          },
          {
            chapter: "Conic Sections, Sequences & Probability",
            traps: [
              { title: "AM >= GM Inequality Positive Numbers Condition", lure: "Applying AM >= GM to negative or zero variables.", fix: "AM >= GM holds strictly for POSITIVE real numbers only." },
              { title: "Infinite GP Sum |r| < 1 Condition", lure: "Using a / (1 - r) when |r| >= 1.", fix: "Infinite geometric series converges ONLY when -1 < r < 1." },
              { title: "Focal Distance of Point on Parabola y^2 = 4ax", lure: "Using x1 instead of x1 + a.", fix: "Focal distance SP = PM = x1 + a for y^2 = 4ax." },
              { title: "Ellipse a > b vs. b > a Eccentricity Swap", lure: "Always using b^2 = a^2(1 - e^2) when b > a.", fix: "Always divide smaller semi-axis squared by larger semi-axis squared: e = sqrt(1 - minor^2 / major^2)." },
              { title: "Hyperbola Eccentricity Sign", lure: "Using 1 - b^2/a^2 instead of 1 + b^2/a^2.", fix: "For hyperbola, e > 1 and e = sqrt(1 + b^2 / a^2)." },
              { title: "Director Circle Radius for Ellipse & Hyperbola", lure: "Using a^2 + b^2 for hyperbola director circle.", fix: "Ellipse director circle: x^2 + y^2 = a^2 + b^2; Hyperbola director circle: x^2 + y^2 = a^2 - b^2 (real only if a > b)." },
              { title: "Independent vs. Mutually Exclusive Events", lure: "Confusing P(A cap B) = 0 with P(A cap B) = P(A)P(B).", fix: "Two non-empty mutually exclusive events can NEVER be independent." },
              { title: "Bayes' Theorem Denominator Partition", lure: "Forgetting one mutually exclusive path in total probability.", fix: "Sum P(E_i) * P(A | E_i) over ALL exhaustive partitions in the denominator." },
              { title: "Binomial Distribution Variance vs. Mean", lure: "Writing Variance = np instead of npq.", fix: "For Binomial(n, p): Mean = np, Variance = npq (always Mean > Variance since q < 1)." },
              { title: "Number of Terms in (x + y + z)^n Multinomial", lure: "Using n + 1 instead of (n + 1)(n + 2)/2.", fix: "Number of distinct terms in (x1 + x2 + ... + xk)^n is C(n + k - 1, k - 1)." },
              { title: "Circular Permutation Necklace vs. Table", lure: "Using (n - 1)! when clockwise/anticlockwise are identical.", fix: "Seated people: (n - 1)!; Beads in a necklace/garland: (n - 1)! / 2." },
              { title: "AGP (Arithmetico-Geometric Series) Multiplication", lure: "Subtracting S - rS without shifting terms by one slot.", fix: "Multiply S by common ratio r, shift right by 1 term, and subtract (1 - r)S." }
            ]
          }
        ]
      };
    } else {
      return {
        BOTANY: [
          {
            chapter: "Molecular Basis of Inheritance",
            traps: [
              { title: "Chargaff's Rule Single-Stranded vs. Double-Stranded DNA", lure: "Applying %A = %T and %G = %C to ssDNA or RNA.", fix: "Chargaff's rule (%A = %T, %G = %C, A+G = 50%) holds ONLY for double-stranded DNA." },
              { title: "Template (3'->5') vs. Coding (5'->3') Strand Polarity", lure: "Transcribing mRNA sequence from coding strand with T->U without checking polarity.", fix: "RNA polymerase reads template strand 3'->5' and synthesizes mRNA 5'->3' (same sequence as coding strand with U replacing T)." },
              { title: "Leading vs. Lagging Strand Replication Direction", lure: "Assuming DNA polymerase synthesizes 3'->5' on lagging strand.", fix: "ALL DNA polymerases synthesize strictly in 5'->3' direction; lagging strand is simply made discontinuously as Okazaki fragments." },
              { title: "AUG Dual Role & Stop Codon Count", lure: "Counting AUG as a stop codon or forgetting its dual role.", fix: "AUG codes for Methionine AND acts as initiator codon; UAA, UAG, UGA are the 3 stop codons (code for no amino acid)." },
              { title: "Lac Operon Inducer Identity (Allolactose/Lactose)", lure: "Thinking glucose induces the lac operon.", fix: "Lactose/allolactose binds the repressor to induce transcription; high glucose actually lowers cAMP and reduces lac expression." },
              { title: "Eukaryotic RNA Polymerases I, II, III", lure: "Assigning mRNA synthesis to RNA Pol I.", fix: "RNA Pol I -> rRNAs (28S, 18S, 5.8S); RNA Pol II -> hnRNA/mRNA; RNA Pol III -> tRNA, 5S rRNA, snRNAs." },
              { title: "Histone Basic Amino Acids (Lysine & Arginine)", lure: "Calling histones acidic or rich in glutamate/aspartate.", fix: "Histones are positively charged basic proteins rich in Lysine and Arginine residues." },
              { title: "Hershey-Chase Radioactive Labels (32P vs. 35S)", lure: "Swapping 32P to protein and 35S to DNA.", fix: "DNA contains Phosphorus (32P) and no sulfur; Protein coat contains Sulfur (35S) and no phosphorus." },
              { title: "VNTR Satellite DNA in DNA Fingerprinting", lure: "Using coding exons instead of non-coding VNTRs.", fix: "Alec Jeffreys' DNA fingerprinting uses non-coding repetitive VNTR (minisatellite) sequences." },
              { title: "Splicing Removes Introns, Joins Exons", lure: "Saying exons are removed during hnRNA processing.", fix: "Introns (intervening non-coding) are spliced out; Exons (expressed) are joined together with 5'-methylguanosine cap and 3'-poly-A tail." },
              { title: "Okazaki Fragment Primer Composition", lure: "Assuming DNA primer initiates replication.", fix: "Primase lays down a short RNA primer first, which is later replaced with DNA by DNA Polymerase I." },
              { title: "Human Genome Project Largest Gene & Chromosome", lure: "Confusing Chromosome 1 with Y chromosome gene count.", fix: "Chromosome 1 has most genes (2,968); Y chromosome has fewest (231); Dystrophin is the largest human gene (2.4 million bases)." }
            ]
          },
          {
            chapter: "Cell Cycle, Cell Division & Biomolecules",
            traps: [
              { title: "S-Phase DNA Doubles (2C->4C), Chromosome Number Stays 2n", lure: "Doubling chromosome number during S-phase.", fix: "In S-phase, DNA content doubles (2C -> 4C), while chromosome number remains constant (2n -> 2n)." },
              { title: "Centromere Splitting: Anaphase vs. Anaphase I vs. Anaphase II", lure: "Splitting centromeres in Anaphase I of Meiosis.", fix: "Homologous chromosomes separate in Anaphase I (centromeres do NOT split); centromeres split in Mitotic Anaphase and Meiotic Anaphase II." },
              { title: "Crossing Over Stage: Pachytene of Prophase I", lure: "Placing crossing over in Zygotene or Diplotene.", fix: "Synapsis = Zygotene; Crossing over (recombinase) = Pachytene; Chiasmata X-shape visible = Diplotene; Terminalisation = Diakinesis." },
              { title: "G0 Quiescent Stage Metabolic Activity", lure: "Thinking cells in G0 are metabolically dead/inactive.", fix: "G0 cells (heart/nerve cells) exit proliferation but remain metabolically active." },
              { title: "Zwitterion Net Charge at Isoelectric Point", lure: "Assigning +1 or -1 net charge to zwitterion.", fix: "At isoelectric pH, zwitterion has both -NH3+ and -COO-, giving net charge = 0." },
              { title: "Competitive vs. Non-Competitive Enzyme Inhibition", lure: "Increasing Km and lowering Vmax for competitive inhibitor.", fix: "Competitive inhibitor (malonate on succinate dehydrogenase) increases Km while Vmax stays unchanged." },
              { title: "Most Abundant Protein in Biosphere vs. Animal World", lure: "Confusing Collagen and RuBisCO.", fix: "RuBisCO is the most abundant protein in the whole biosphere; Collagen is the most abundant protein in the animal world." },
              { title: "Reducing vs. Non-Reducing Sugars (Sucrose Trap)", lure: "Calling sucrose a reducing sugar.", fix: "Sucrose has glycosidic bond between C1 of glucose and C2 of fructose (no free aldehyde/ketone) -> NON-reducing sugar." },
              { title: "Chitin Homopolymer of N-Acetylglucosamine", lure: "Calling chitin a heteropolymer or protein.", fix: "Chitin (fungal cell wall & arthropod exoskeleton) is a complex homopolymer of N-acetylglucosamine (NAG)." },
              { title: "80S vs. 70S Ribosome Subunits", lure: "Adding 60S + 40S = 100S.", fix: "Eukaryotic 80S = 60S + 40S; Prokaryotic/Mitochondrial/Chloroplast 70S = 50S + 30S (Svedberg sedimentation is non-additive)." },
              { title: "Endomembrane System Organelle Inclusion", lure: "Including mitochondria, chloroplasts, or peroxisomes.", fix: "Endomembrane system includes ONLY ER, Golgi complex, lysosomes, and vacuoles (coordinated function)." },
              { title: "Middle Lamella Calcium Pectate Composition", lure: "Assigning cellulose or suberin to middle lamella.", fix: "Middle lamella glues adjacent plant cells together and is made primarily of Calcium pectate." }
            ]
          },
          {
            chapter: "Plant Physiology & Ecology",
            traps: [
              { title: "C4 Plants Lack Photorespiration (Kranz Anatomy)", lure: "Placing RuBisCO in mesophyll cells of C4 leaves.", fix: "In C4 plants (maize, sorghum), PEPcase is in mesophyll cells; RuBisCO is exclusively in bundle sheath cells (high CO2 prevents photorespiration)." },
              { title: "ATP & NADPH Required per CO2 Fixed in C3 vs. C4", lure: "Using 3 ATP + 2 NADPH for C4 plants.", fix: "C3 cycle uses 3 ATP + 2 NADPH per CO2 (18 ATP + 12 NADPH per glucose); C4 uses 5 ATP + 2 NADPH per CO2 (30 ATP + 12 NADPH per glucose)." },
              { title: "Cyclic vs. Non-Cyclic Photophosphorylation Products", lure: "Generating NADPH or O2 in cyclic photophosphorylation.", fix: "Cyclic photophosphorylation (PS I only, stroma lamellae) produces ONLY ATP—no NADPH and no O2 evolution." },
              { title: "Chemiosmotic Proton Accumulation: Thylakoid Lumen vs. Mitochondrial Matrix", lure: "Accumulating H+ in chloroplast stroma.", fix: "In chloroplasts, H+ accumulates inside the thylakoid lumen; in mitochondria, H+ accumulates in the intermembrane space." },
              { title: "Net ATP Yield in Aerobic Respiration (38 vs. 36)", lure: "Forgetting 2 ATP spent in glycolysis.", fix: "Glycolysis nets 2 ATP + 2 NADH; complete aerobic oxidation yields 38 ATP (prokaryotes/heart) or 36 ATP (malate-aspartate/glycerol shuttle)." },
              { title: "RQ (Respiratory Quotient) of Fats, Proteins & Organic Acids", lure: "Assigning RQ = 1 to tripalmitin fat.", fix: "Carbohydrates RQ = 1.0; Fats (tripalmitin) RQ = 0.7 (< 1); Proteins RQ = 0.9; Organic acids RQ > 1." },
              { title: "Auxin vs. Cytokinin Apical Dominance & Tissue Culture", lure: "Using high auxin to promote shoot formation.", fix: "High auxin : cytokinin ratio -> Root initiation; High cytokinin : auxin ratio -> Shoot bud initiation & overcomes apical dominance." },
              { title: "Gibberellin Bolting vs. Abscisic Acid Stress Hormone", lure: "Calling ethylene a growth promoter only.", fix: "Gibberellins cause bolting (internode elongation) and malting; ABA closes stomata under water stress and induces seed dormancy." },
              { title: "10% Energy Law & Inverted Pyramid of Biomass in Sea", lure: "Assuming all ecological pyramids are always upright.", fix: "Pyramid of energy is ALWAYS upright; Pyramid of biomass in sea/ocean is INVERTED (zooplankton biomass > phytoplankton standing crop)." },
              { title: "GPP vs. NPP Equation", lure: "Writing GPP = NPP - R.", fix: "NPP = GPP - R (Net Primary Productivity = Gross Primary Productivity minus Respiration losses)." },
              { title: "Species-Area Relationship Slope Z Value", lure: "Using Z = 1.15 for normal regional areas.", fix: "For small/regional areas Z = 0.1–0.2; for entire continents Z = 0.6–1.2 (frugivorous birds/mammals Z = 1.15)." },
              { title: "In-Situ vs. Ex-Situ Biodiversity Conservation", lure: "Classifying botanical gardens or seed banks as in-situ.", fix: "National parks, biosphere reserves, sacred groves = In-situ; Zoological parks, botanical gardens, cryopreservation, seed banks = Ex-situ." }
            ]
          }
        ],
        ZOOLOGY: [
          {
            chapter: "Human Physiology & Circulation",
            traps: [
              { title: "SA Node Pacemaker Rate & Cardiac Cycle 0.8s", lure: "Assigning 0.8s to atrial systole.", fix: "Cardiac cycle = 0.8s (at 75 bpm): Atrial systole = 0.1s, Ventricular systole = 0.3s, Joint diastole = 0.4s." },
              { title: "Lubb vs. Dubb Heart Sound Valve Closure", lure: "Linking Lubb to semilunar valves.", fix: "First sound 'Lubb' = closure of tricuspid & bicuspid (AV) valves; Second sound 'Dubb' = closure of semilunar valves." },
              { title: "Fetal Erythroblastosis Foetalis Rh Incompatibility", lure: "Occurring when mother is Rh+ and fetus is Rh-.", fix: "Occurs ONLY when mother is Rh-negative and fetus is Rh-positive (affects 2nd Rh+ pregnancy unless anti-D antibodies given)." },
              { title: "Oxygen Dissociation Curve Right Shift Factors", lure: "Shifting O2 curve right at high pH or low temperature.", fix: "Right shift (O2 unloading in tissues) is caused by HIGH pCO2, HIGH [H+] (low pH), HIGH 2,3-BPG, and HIGH temperature." },
              { title: "CO2 Transport Percentage Breakdown", lure: "Saying most CO2 travels as carbamino-haemoglobin.", fix: "~70% of CO2 is transported as Bicarbonate (HCO3-), 20–25% as carbamino-Hb, and ~7% dissolved in plasma." },
              { title: "Juxtaglomerular Apparatus (JGA) & RAAS Activation", lure: "Thinking ANF activates RAAS.", fix: "Low GFR/BP triggers JG cells to release Renin -> Angiotensin II -> Aldosterone (raises BP); ANF from atria opposes RAAS (vasodilation)." },
              { title: "Counter-Current Multiplier: Henle's Loop vs. Vasa Recta", lure: "Making descending limb permeable to NaCl.", fix: "Descending limb of Henle is permeable ONLY to water; Ascending limb is impermeable to water and actively transports NaCl." },
              { title: "Resting Membrane Potential & Depolarization Ions", lure: "Attributing depolarization to K+ efflux.", fix: "Resting potential (-70 mV) maintained by Na+/K+ pump (3 Na+ out, 2 K+ in); Depolarization = rapid Na+ influx; Repolarization = K+ efflux." },
              { title: "Sarcomere Band Width During Muscle Contraction", lure: "Shortening the A-band during contraction.", fix: "During contraction, I-band and H-zone shorten, Z-lines come closer, while the A-band (myosin length) remains CONSTANT." },
              { title: "Anterior vs. Posterior Pituitary Hormone Synthesis", lure: "Thinking posterior pituitary synthesizes oxytocin and ADH.", fix: "Oxytocin and ADH (vasopressin) are synthesized in the Hypothalamus and merely stored/released by the posterior pituitary." },
              { title: "Steroid vs. Peptide Hormone Receptor Location", lure: "Placing steroid receptors on the plasma membrane.", fix: "Peptide hormones (insulin, FSH) bind membrane receptors (second messengers cAMP/IP3); Steroid & thyroid hormones bind intracellular/nuclear receptors." },
              { title: "Organ of Corti Location & Otolith Equilibrium", lure: "Placing Organ of Corti in semicircular canals.", fix: "Organ of Corti (hearing) sits on the basilar membrane of the cochlea; Crista & Macula (vestibular apparatus) maintain balance." }
            ]
          },
          {
            chapter: "Human Reproduction & Reproductive Health",
            traps: [
              { title: "Spermatogenesis vs. Oogenesis Polar Body & Gamete Count", lure: "Producing 4 functional ova from 1 primary oocyte.", fix: "1 primary spermatocyte -> 4 functional haploid sperms; 1 primary oocyte -> 1 functional ovum + polar bodies." },
              { title: "Meiosis II Completion in Human Oocyte", lure: "Completing Meiosis II before ovulation.", fix: "Primary oocyte arrests at Diplotene of Prophase I until puberty; Secondary oocyte arrests at Metaphase II and completes Meiosis II ONLY upon sperm entry." },
              { title: "LH Surge Triggering Ovulation on Day 14", lure: "Attributing ovulation directly to progesterone surge.", fix: "Mid-cycle LH surge (Day 14) ruptures the Graafian follicle; Corpus luteum then secretes Progesterone to maintain endometrium." },
              { title: "Placental vs. Ovarian Hormones in Pregnancy", lure: "Saying hCG, hPL, and relaxin are secreted in non-pregnant women.", fix: "hCG, hPL, and relaxin are produced ONLY during pregnancy (hCG & hPL by placenta; relaxin mainly by ovary)." },
              { title: "Implantation Stage: Blastocyst at Day 7", lure: "Implanting as a 16-cell morula.", fix: "Implantation occurs at the Blastocyst stage (trophoblast attaches to endometrium, inner cell mass forms embryo)." },
              { title: "Copper-Releasing vs. Hormone-Releasing IUDs", lure: "Saying CuT suppresses ovulation.", fix: "CuT, Cu7, Multiload 375 release Cu ions that suppress sperm motility & fertilizing capacity; LNG-20 & Progestasert make uterus unsuitable & cervix hostile." },
              { title: "MTP Amendment Act Gestational Limits", lure: "Thinking MTP is illegal after 8 weeks.", fix: "MTP is safe in 1st trimester (up to 12 weeks) on 1 doctor's opinion, and permitted up to 24 weeks under specific medical grounds with 2 doctors' opinion." },
              { title: "Amniocentesis Chromosomal Disorder Detection", lure: "Using amniocentesis to detect bacterial STIs.", fix: "Amniocentesis analyzes fetal cells in amniotic fluid for chromosomal abnormalities (Down, Klinefelter, Turner) and metabolic disorders." },
              { title: "ZIFT vs. GIFT Embryo Transfer Site", lure: "Transferring >8-blastomere embryo into fallopian tube.", fix: "Zygote or up to 8 blastomeres -> Fallopian tube (ZIFT); >8 blastomeres -> Uterus (IUT); Ovum from donor into fallopian tube -> GIFT." },
              { title: "Colostrum IgA Passive Immunity", lure: "Naming IgG as the antibody in colostrum.", fix: "Colostrum (first yellowish milk) is rich in IgA antibodies providing natural passive immunity to the newborn." },
              { title: "Acrosomal Reaction Enzymes (Hyaluronidase)", lure: "Placing mitochondria in sperm head.", fix: "Sperm head has haploid nucleus + acrosome (digestive enzymes); middle piece has spiral mitochondria for tail motility." },
              { title: "Curable vs. Non-Curable STIs in NCERT", lure: "Listing Hepatitis-B, Genital herpes, or HIV as curable.", fix: "Hepatitis-B, Genital herpes, and HIV infections are NOT completely curable (early detection helps manage them)." }
            ]
          },
          {
            chapter: "Biotechnology & Evolution",
            traps: [
              { title: "EcoRI Palindromic Recognition Sequence (5'-GAATTC-3')", lure: "Cutting between A and A instead of G and A.", fix: "EcoRI recognizes 5'-GAATTC-3' and cuts between G and A on both strands, creating sticky ends." },
              { title: "Gel Electrophoresis DNA Migration Direction", lure: "Moving DNA fragments toward the negative cathode.", fix: "DNA is negatively charged (phosphate backbone) and moves toward the POSITIVE anode; smaller fragments move faster/farther." },
              { title: "Insertional Inactivation of lacZ (Blue-White Screening)", lure: "Picking blue colonies as recombinants.", fix: "Recombinant plasmids disrupt beta-galactosidase (lacZ) -> WHITE colonies; non-recombinants retain intact enzyme -> BLUE colonies." },
              { title: "PCR Taq Polymerase Thermostability Source", lure: "Using E. coli DNA polymerase in PCR.", fix: "PCR uses thermostable Taq polymerase isolated from Thermus aquaticus (survives 94 C denaturation step)." },
              { title: "Downstream Processing Definition", lure: "Including gene cloning inside downstream processing.", fix: "Downstream processing refers strictly to separation and purification of the biosynthetic product AFTER fermentation." },
              { title: "Bt Cotton Cry Genes (cryIAc & cryIIAb vs. cryIAb)", lure: "Using cryIAb for cotton bollworm.", fix: "cryIAc and cryIIAb control cotton bollworms; cryIAb controls corn borer." },
              { title: "RNA Interference (RNAi) Double-Stranded RNA Silencing", lure: "Using RNAi to amplify nematode mRNA.", fix: "RNAi silences specific mRNA via complementary dsRNA (using Agrobacterium vectors against Meloidogyne incognita in tobacco)." },
              { title: "ADA Deficiency First Gene Therapy (1990)", lure: "Giving permanent cure via mature lymphocyte infusion.", fix: "Mature lymphocytes have finite lifespan (require periodic infusion); permanent cure requires introducing ADA gene at early embryonic stage." },
              { title: "Homologous vs. Analogous Organs Evolution Type", lure: "Calling sweet potato & potato homologous.", fix: "Homologous (forelimbs of whales/bats/humans, thorns of Bougainvillea & tendrils of Cucurbita) = Divergent evolution; Analogous (eye of octopus & mammal, sweet potato & potato) = Convergent evolution." },
              { title: "Hardy-Weinberg Equilibrium p^2 + 2pq + q^2 = 1", lure: "Using q as frequency of homozygous recessive individuals.", fix: "q is recessive ALLELE frequency; q^2 is homozygous recessive GENOTYPE frequency; 2pq is heterozygous carrier frequency." },
              { title: "Miller-Urey Experiment Gas Mixture (CH4, NH3, H2, H2O at 800 C)", lure: "Including free O2 in primitive reducing atmosphere.", fix: "Miller's flask contained CH4, NH3, H2 (2:1:2) and water vapor at 800 C with NO free O2 (reducing atmosphere)." },
              { title: "Human Ancestor Cranial Capacity Order", lure: "Placing Homo habilis at 1400 cc.", fix: "Homo habilis (650–800 cc) -> Homo erectus (900 cc) -> Neanderthal man (1400 cc) -> Homo sapiens." }
            ]
          }
        ]
      };
    }
  }

  window.toggleTrapMastered = function (trapKey) {
    window._T6_TD_MASTERED[trapKey] = !window._T6_TD_MASTERED[trapKey];
    window.renderScienceTab6();
  };

  window.renderScienceTab6 = function (el) {
    const accent = IS_JEE ? "indigo" : "emerald";
    const target = getTarget(el);
    if (!target) return;

    const catalog = getChapterTrapCatalog();
    const subjects = Object.keys(catalog);
    if (!catalog[window._T6_TD_SUBJ]) window._T6_TD_SUBJ = subjects[0];
    const chapters = catalog[window._T6_TD_SUBJ] || [];
    const chapIdx = Math.min(chapters.length - 1, Math.max(0, Number(window._T6_TD_CHAP_IDX || 0)));
    const activeChap = chapters[chapIdx];

    const fullLogs = typeof getVerifiedFullMockLogs === "function" ? getVerifiedFullMockLogs() : [];
    const pracLogs = typeof getPracticeLogs === "function" ? getPracticeLogs() : [];
    const wrongItems = [];
    fullLogs.forEach(lg => {
      (lg.itemsAudit || []).forEach(it => {
        if (it.hasAns && !it.isCorrect) wrongItems.push({ source: "Full Mock", session: lg.sessionId, ...it });
      });
    });
    pracLogs.forEach(lg => {
      (lg.itemsAudit || []).forEach(it => {
        if (it.hasAns && !it.isCorrect) wrongItems.push({ source: "Subject Practice", session: lg.sessionId, ...it });
      });
    });

    const totalCatalogTraps = subjects.reduce((acc, s) => acc + catalog[s].reduce((a, c) => a + c.traps.length, 0), 0);
    const masteredCount = Object.values(window._T6_TD_MASTERED).filter(Boolean).length;

    target.innerHTML = `
      <div class="max-w-7xl mx-auto pt-4 pb-10 space-y-5">
        <div class="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div class="text-xs font-extrabold uppercase tracking-wider text-${accent}-600">6. SUBJECT &amp; CHAPTER-WISE NTA TRAP DOCTOR (${totalCatalogTraps} VERIFIED TRAPS &bull; 12 PER CHAPTER)</div>
              <h2 class="text-2xl font-black text-slate-900 mt-0.5">${IS_JEE ? "JEE Main / Adv Chapter-Wise -1 Trap Vault & Mock Autopsy" : "NEET UG NCERT Chapter-Wise -1 Trap Vault & Mock Autopsy"}</h2>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <button type="button" onclick="window._T6_TD_VIEW='LIBRARY'; window.renderScienceTab6();"
                class="px-4 py-2 rounded-xl text-xs font-extrabold border cursor-pointer ${window._T6_TD_VIEW === "LIBRARY" ? `bg-${accent}-600 text-white border-${accent}-600` : "bg-slate-50 text-slate-700 border-slate-200"}">
                Chapter Trap Vault (${totalCatalogTraps} Traps • ${masteredCount} Mastered)
              </button>
              <button type="button" onclick="window._T6_TD_VIEW='AUTOPSY'; window.renderScienceTab6();"
                class="px-4 py-2 rounded-xl text-xs font-extrabold border cursor-pointer ${window._T6_TD_VIEW === "AUTOPSY" ? "bg-rose-600 text-white border-rose-600" : "bg-rose-50 text-rose-800 border-rose-200"}">
                My Logged Mock -1 Errors (${wrongItems.length})
              </button>
            </div>
          </div>

          ${window._T6_TD_VIEW === "LIBRARY" ? `
            <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
              <span class="text-[11px] font-extrabold uppercase text-slate-500 mr-1">Subject:</span>
              ${subjects.map(s => `
                <button type="button" onclick="window._T6_TD_SUBJ='${s}'; window._T6_TD_CHAP_IDX=0; window.renderScienceTab6();"
                  class="px-4 py-2 rounded-xl text-xs font-extrabold border cursor-pointer ${window._T6_TD_SUBJ === s ? `bg-${accent}-600 text-white border-${accent}-600 shadow-sm` : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400"}">
                  ${s} (${catalog[s].length * 12} Traps)
                </button>
              `).join("")}
            </div>
          ` : ""}
        </div>

        ${window._T6_TD_VIEW === "LIBRARY" ? `
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div class="lg:col-span-4 space-y-2.5">
              <div class="text-xs font-extrabold uppercase tracking-wider text-${accent}-600">${window._T6_TD_SUBJ} CHAPTERS (12 TRAPS EACH)</div>
              ${chapters.map((ch, idx) => {
                const chDone = ch.traps.filter((_, ti) => window._T6_TD_MASTERED[`${window._T6_TD_SUBJ}_${idx}_${ti}`]).length;
                return `
                  <button type="button" onclick="window._T6_TD_CHAP_IDX=${idx}; window.renderScienceTab6();"
                    class="w-full text-left p-4 rounded-2xl border cursor-pointer ${idx === chapIdx ? `bg-${accent}-50 border-${accent}-500 shadow-sm` : "bg-white border-slate-200 hover:border-slate-300"}">
                    <div class="flex items-center justify-between text-[10px] font-extrabold uppercase text-${accent}-600">
                      <span>CHAPTER ${idx + 1} &bull; 12 NTA TRAPS</span>
                      <span class="text-emerald-700">${chDone}/12 Mastered</span>
                    </div>
                    <div class="font-extrabold text-sm text-slate-900 mt-1">${ch.chapter}</div>
                  </button>
                `;
              }).join("")}
            </div>

            <div class="lg:col-span-8 space-y-3">
              <div class="bg-white border border-slate-200 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-2 shadow-sm">
                <div>
                  <div class="text-[11px] font-extrabold uppercase text-${accent}-600">${window._T6_TD_SUBJ} &bull; CHAPTER ${chapIdx + 1} OF ${chapters.length}</div>
                  <h3 class="text-lg font-black text-slate-900">${activeChap.chapter} (12 High-Frequency -1 Traps)</h3>
                </div>
                <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold">12 Verified Traps</span>
              </div>

              ${activeChap.traps.map((tp, ti) => {
                const tKey = `${window._T6_TD_SUBJ}_${chapIdx}_${ti}`;
                const isDone = !!window._T6_TD_MASTERED[tKey];
                return `
                  <div class="bg-white border ${isDone ? "border-emerald-400 bg-emerald-50/20" : "border-slate-200"} rounded-2xl p-5 space-y-2 text-xs shadow-sm">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                      <span class="font-extrabold text-sm text-slate-900">Trap #${ti + 1}: ${tp.title}</span>
                      <button type="button" onclick="window.toggleTrapMastered('${tKey}');"
                        class="px-3 py-1 rounded-full text-[11px] font-extrabold border cursor-pointer ${isDone ? "bg-emerald-600 text-white border-emerald-600" : "bg-slate-50 text-slate-700 border-slate-300"}">
                        ${isDone ? "✓ Trap Mastered" : "Mark Trap Mastered"}
                      </button>
                    </div>
                    <div class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900"><strong>Why 80% Lose -1 Mark:</strong> ${tp.lure}</div>
                    <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950"><strong>Exact NTA / NCERT Rule:</strong> ${tp.fix}</div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        ` : `
          ${!wrongItems.length ? `
            <div class="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-2 shadow-sm">
              <div class="text-base font-extrabold text-slate-800">Zero -1 Mock Errors Recorded Yet</div>
              <p class="text-xs text-slate-500">Submit a Full Mock in Tab 4 or a Subject Practice Mock in Tab 5 with any incorrect response to populate your personalized negative-marking autopsy here.</p>
            </div>
          ` : `
            <div class="space-y-3">
              ${wrongItems.slice(0, 40).map((it, idx) => `
                <div class="bg-white border border-rose-200 rounded-2xl p-5 space-y-2 text-xs shadow-sm">
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <span class="font-extrabold text-rose-700">#${idx + 1} &bull; [${it.source}] ${it.session} &bull; ${it.subj} (${it.chapter})</span>
                    <span class="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-extrabold">-1 Mark Lost</span>
                  </div>
                  <div class="text-sm font-bold text-slate-900 whitespace-pre-line">${it.prompt}</div>
                  <div class="text-rose-700"><strong>Your Response:</strong> ${it.userText}</div>
                  <div class="text-emerald-700"><strong>Official Answer:</strong> ${it.officialText}</div>
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700"><strong>Concept Fix &amp; Rule:</strong> ${it.explanation}</div>
                </div>
              `).join("")}
            </div>
          `}
        `}
      </div>
    `;
  };

  // Lock all 6 tab renderers so legacy scripts can never hijack them
  const tabMap = {
    renderTab1: window.renderScienceTab1,
    renderQuantTab: window.renderScienceTab1,
    renderTab2: window.renderScienceTab2,
    renderTab3: window.renderScienceTab3,
    renderVerbalStudio3: window.renderScienceTab3,
    renderTab4: window.renderScienceTab4,
    renderMockSimulator4: window.renderScienceTab4,
    renderTab5: window.renderScienceTab5,
    renderTrapClinic5: window.renderScienceTab5,
    renderTab6: window.renderScienceTab6,
    renderTab7: window.renderScienceTab7,
    renderScienceTab7: window.renderScienceTab7
  };
  Object.entries(tabMap).forEach(([k, fn]) => {
    Object.defineProperty(window, k, { get: () => fn, set: () => {}, configurable: true });
  });

  // ============================================================================
  // SINGLE-CLICK CAPTURE-PHASE 7-TAB ROUTER (ZERO-LAG v38)
  // ============================================================================
  window._ACTIVE_SCI_TAB = window._ACTIVE_SCI_TAB || 1;
  window._TAB_BAR_BUILT = false;

  function ensureSevenTabButtons() {
    if (window._TAB_BAR_BUILT) return;
    let tab1Btn = null;
    document.querySelectorAll("button").forEach(btn => {
      const t = (btn.textContent || "").trim();
      if (t.startsWith("1. ")) tab1Btn = btn;
    });
    if (!tab1Btn || !tab1Btn.parentElement) return;
    const bar = tab1Btn.parentElement;

    Array.from(bar.querySelectorAll("button")).forEach(b => {
      const txt = (b.textContent || "").trim();
      if (/^[2-7]\.\s+/.test(txt)) b.remove();
    });

    for (let i = 1; i < TABS.length; i++) {
      const clone = tab1Btn.cloneNode(true);
      clone.textContent = TABS[i];
      bar.appendChild(clone);
    }
    window._TAB_BAR_BUILT = true;
  }

  function syncTabPillVisuals(tabNum) {
    ensureSevenTabButtons();
    const isJee = (EXAM === "JEE");
    const bgActive = isJee ? "#4f46e5" : "#059669";
    document.querySelectorAll("button").forEach(btn => {
      const txt = (btn.textContent || "").trim();
      const m = txt.match(/^([1-7])\.\s+/);
      if (!m) return;
      const n = Number(m[1]);
      if (TABS[n - 1] && txt !== TABS[n - 1]) btn.textContent = TABS[n - 1];
      btn.style.transition = "none";
      if (n === tabNum) {
        btn.style.setProperty("background-color", bgActive, "important");
        btn.style.setProperty("color", "#ffffff", "important");
        btn.style.setProperty("border-color", bgActive, "important");
      } else {
        btn.style.setProperty("background-color", "#ffffff", "important");
        btn.style.setProperty("color", "#334155", "important");
        btn.style.setProperty("border-color", "#e2e8f0", "important");
      }
    });
  }

  window.selectUnifiedTab = function (tabNum, keepSyncMode) {
    const n = Math.min(7, Math.max(1, Number(tabNum) || 1));
    if (n === 7 && !keepSyncMode) { window._T6_MODE = "TARGET"; }
    window._ACTIVE_SCI_TAB = n;
    syncTabPillVisuals(n);
    const target = getTarget();
    const fns = {
      1: window.renderScienceTab1,
      2: window.renderScienceTab2,
      3: window.renderScienceTab3,
      4: window.renderScienceTab4,
      5: window.renderScienceTab5,
      6: window.renderScienceTab6,
      7: window.renderScienceTab7
    };
    if (typeof fns[n] === "function") fns[n](target);
  };

  document.addEventListener("click", function (ev) {
    const btn = ev.target && ev.target.closest ? ev.target.closest("button") : null;
    if (!btn) return;
    const txt = (btn.textContent || "").trim();
    const m = txt.match(/^([1-7])\.\s+/);
    if (!m) return;
    ev.preventDefault();
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    window.selectUnifiedTab(Number(m[1]));
  }, true);

  window.addEventListener("DOMContentLoaded", () => {
    enforceScienceBrand();
    ensureSevenTabButtons();
    if (window._ACTIVE_SCI_TAB === 1) {
      window.selectUnifiedTab(1);
    }
    setTimeout(() => {
      enforceScienceBrand();
      window._TAB_BAR_BUILT = false;
      ensureSevenTabButtons();
      syncTabPillVisuals(window._ACTIVE_SCI_TAB || 1);
    }, 300);
  });
})();
