// ==============================================================================
// GOALISB NEET UG MASTER — COMPLETE 6-TAB NATIVE ENGINE (ZERO GRE/IPMAT LEGACY)
// ==============================================================================
(function () {
  const EXAM = "NEET";
  const IS_JEE = (EXAM === "JEE");
  const MODES = [{'label': 'NEET UG Full 180-Q (720 Marks)', 'sub': '(NTA Standard)', 'sections': 'Physics (45 Qs) &bull; Chemistry (45 Qs) &bull; Botany (45 Qs) &bull; Zoology (45 Qs)'}, {'label': 'NCERT Line-by-Line Biology Vault', 'sub': '(360 Marks Core)', 'sections': 'Class 11 & 12 Botany + Zoology Verbatim NCERT Statements, Diagrams & Cycles'}, {'label': 'Assertion-Reason & Statement Clinic', 'sub': '(Trap Clinic)', 'sections': 'Statement I & II + Assertion-Reason Drills across Biology, Organic & Inorganic'}];
  const TABS = ['1. Physics, Chem & Biology (12x12)', '2. NCERT Line-by-Line Bio Vault', '3. Assertion-Reason Studio', '4. 180-Q / 720-Mark NEET Mock', '5. Trap Doctor & AI Doubts', '6. NEET AIR & AIIMS/GMC Forecaster'];

  function enforceScienceBrand() {
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
      else if (txt.startsWith("5. Trap Doctor")) btn.textContent = TABS[4];
      else if (txt.startsWith("6. GRE Score Forecaster")) btn.textContent = TABS[5];
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
        fetch("/api/science/questions?exam=" + EXAM + "&limit=500")
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
              class="w-full text-left p-4 rounded-2xl border transition cursor-pointer ${idx === modIdx
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
              class="w-full text-left p-4 rounded-2xl border transition cursor-pointer ${idx === modIdx
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
                            class="text-left p-3 rounded-xl border transition cursor-pointer ${btnCls}">
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
  // SHARED SESSION LOGS, PDF GENERATOR & TAB 4 <-> TAB 6 REAL SYNC ENGINE
  // ============================================================================
  const LOG_KEY = IS_JEE ? "goalisb_jee_mock_logs_v1" : "goalisb_neet_mock_logs_v1";
  const SYNC_KEY = IS_JEE ? "goalisb_jee_latest_sync_v1" : "goalisb_neet_latest_sync_v1";

  function newSessionId() {
    const d = new Date();
    const ymd = d.getFullYear() + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0");
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return (IS_JEE ? "JEE-CBT-" : "NEET-OMR-") + ymd + "-" + rand;
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

  function getMockLogs() {
    try { return JSON.parse(localStorage.getItem(LOG_KEY) || "[]"); } catch (_) { return []; }
  }

  function saveMockLog(entry) {
    const logs = getMockLogs();
    logs.unshift(entry);
    localStorage.setItem(LOG_KEY, JSON.stringify(logs.slice(0, 25)));
    if (entry.status === "SUBMITTED") {
      localStorage.setItem(SYNC_KEY, JSON.stringify(entry));
    }
  }

  window.clearScienceMockLogs = function () {
    localStorage.removeItem(LOG_KEY);
    localStorage.removeItem(SYNC_KEY);
    window.renderScienceTab4();
  };

  window.downloadMockPdfReport = function (sessionId) {
    const logs = getMockLogs();
    const rec = logs.find(x => x.sessionId === sessionId) || logs[0];
    if (!rec) {
      alert("No mock session record found yet. Complete or exit a mock session first.");
      return;
    }
    const w = window.open("", "_blank", "width=920,height=780");
    if (!w) {
      alert("Please allow popups for this site to download your PDF scorecard.");
      return;
    }
    const subjRows = Object.entries(rec.subjects || {}).map(([k, v]) => `
      <tr>
        <td style="padding:8px;border:1px solid #cbd5e1;font-weight:700;">${k}</td>
        <td style="padding:8px;border:1px solid #cbd5e1;">${v.s} / ${v.max}</td>
        <td style="padding:8px;border:1px solid #cbd5e1;color:#047857;">${v.c} (+${v.c * 4})</td>
        <td style="padding:8px;border:1px solid #cbd5e1;color:#be123c;">${v.w} (-${v.w})</td>
      </tr>
    `).join("");

    w.document.write(`<!DOCTYPE html><html><head><title>${rec.sessionId} - GOALisB Official Scorecard</title></head>
      <body style="font-family:system-ui,-apple-system,sans-serif;padding:32px;color:#0f172a;max-width:820px;margin:auto;">
        <div style="border-bottom:3px solid #4338ca;padding-bottom:14px;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <div style="font-size:12px;font-weight:800;color:#4338ca;text-transform:uppercase;">GOALisB Cloud Assessment Engine</div>
            <h1 style="margin:4px 0 0;font-size:22px;">${IS_JEE ? "NTA JEE Main 75-Q CBT Official Scorecard" : "NTA NEET UG 180-Q OMR Official Scorecard"}</h1>
          </div>
          <div style="text-align:right;font-size:12px;">
            <div><strong>Session ID:</strong> ${rec.sessionId}</div>
            <div><strong>Timestamp:</strong> ${rec.timestamp}</div>
            <div><strong>Status:</strong> ${rec.status}</div>
          </div>
        </div>
        <div style="margin:18px 0;padding:14px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px;display:flex;justify-content:space-between;font-size:13px;">
          <div><strong>Candidate:</strong> ${rec.candidate}</div>
          <div><strong>Time Taken:</strong> ${rec.timeTaken}</div>
          <div><strong>Total Score:</strong> <span style="font-size:16px;font-weight:900;color:#047857;">${rec.totalScore} / ${rec.maxScore}</span></div>
        </div>
        <div style="margin-bottom:18px;padding:12px 14px;background:#ecfdf5;border:1px solid #6ee7b7;border-radius:10px;font-size:13px;">
          <strong>Projected Standing:</strong> ${rec.projection}
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px;">
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
        <div style="font-size:11px;color:#64748b;border-top:1px solid #e2e8f0;padding-top:10px;">
          Generated by GOALisB ${IS_JEE ? "JEE" : "NEET UG"} Cloud Engine &bull; Synchronized with Tab 6 Forecaster (${rec.sessionId}).
        </div>
        <script>window.onload = function(){ setTimeout(function(){ window.print(); }, 250); };</script>
      </body></html>`);
    w.document.close();
  };

  window._MOCK_SESSION_ID = window._MOCK_SESSION_ID || newSessionId();
  window._CBT_IDX = 0;
  window._CBT_ANS = {};
  window._CBT_REVIEW = {};
  window._CBT_VISITED = { 0: true };
  window._CBT_SUBMITTED = false;
  window._CBT_SEC_LEFT = 180 * 60;
  window._CBT_TIMER_ID = window._CBT_TIMER_ID || null;

  function buildFullMockPaper() {
    if (IS_JEE) {
      const subjects = ["PHYSICS", "CHEMISTRY", "MATHEMATICS"];
      const paper = [];
      subjects.forEach(subj => {
        const mcqs = window._SCI_QUESTIONS.filter(q => q.subject === subj && q.question_type !== "NUMERICAL_INT");
        const nums = window._SCI_QUESTIONS.filter(q => q.subject === subj && q.question_type === "NUMERICAL_INT");
        for (let i = 0; i < 20; i++) {
          const base = mcqs[i % Math.max(1, mcqs.length)];
          if (base) paper.push({ ...base, mock_sec: "Section A (MCQ)", mock_subj: subj });
        }
        for (let i = 0; i < 5; i++) {
          const base = nums[i % Math.max(1, nums.length)];
          if (base) paper.push({ ...base, mock_sec: "Section B (Numerical)", mock_subj: subj });
        }
      });
      return paper;
    } else {
      const sections = [["PHYSICS", 45], ["CHEMISTRY", 45], ["BOTANY", 45], ["ZOOLOGY", 45]];
      const paper = [];
      sections.forEach(([subj, count]) => {
        const pool = window._SCI_QUESTIONS.filter(q => q.subject === subj && Array.isArray(q.options_json) && q.options_json.length >= 4);
        for (let i = 0; i < count; i++) {
          const base = pool[i % Math.max(1, pool.length)];
          if (base) paper.push({ ...base, mock_sec: "Compulsory MCQ", mock_subj: subj });
        }
      });
      return paper;
    }
  }

  function ensureMockTimer() {
    if (window._CBT_TIMER_ID) return;
    window._CBT_TIMER_ID = setInterval(() => {
      if (window._CBT_SUBMITTED) return;
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
    let totalScore = 0, totalCorrect = 0, totalWrong = 0;
    const subjStats = IS_JEE
      ? { PHYSICS: { c: 0, w: 0, s: 0, max: 100 }, CHEMISTRY: { c: 0, w: 0, s: 0, max: 100 }, MATHEMATICS: { c: 0, w: 0, s: 0, max: 100 } }
      : { PHYSICS: { c: 0, w: 0, s: 0, max: 180 }, CHEMISTRY: { c: 0, w: 0, s: 0, max: 180 }, BOTANY: { c: 0, w: 0, s: 0, max: 180 }, ZOOLOGY: { c: 0, w: 0, s: 0, max: 180 } };

    paper.forEach((item, idx) => {
      const ans = window._CBT_ANS[idx];
      if (ans !== undefined && String(ans).trim() !== "") {
        const ok = (String(ans).trim() === String(item.correct_answer).trim()) ||
                   (item.question_type === "NUMERICAL_INT" && Number(ans) === Number(item.correct_answer));
        if (ok) {
          totalScore += 4; totalCorrect++;
          subjStats[item.mock_subj].c++; subjStats[item.mock_subj].s += 4;
        } else {
          totalScore -= 1; totalWrong++;
          subjStats[item.mock_subj].w++; subjStats[item.mock_subj].s -= 1;
        }
      }
    });

    const projection = IS_JEE
      ? (totalScore >= 250 ? "99.92+ %ile (NIT Trichy CSE / Adv Top 1,500)" : totalScore >= 210 ? "99.35 %ile (Top NITs Core)" : totalScore >= 170 ? "98.10 %ile (Top IIIT / NIT)" : "94.50+ %ile")
      : (totalScore >= 695 ? "AIR < 350 (AIIMS New Delhi / MAMC)" : totalScore >= 660 ? "AIR ~3,200 (Top State Govt Medical College)" : totalScore >= 625 ? "AIR ~14,500 (Govt MBBS AIQ)" : "State Quota / NCERT Bio Sprint");

    const elapsed = Math.max(1, 180 * 60 - window._CBT_SEC_LEFT);
    const minsTaken = Math.floor(elapsed / 60) + "m " + (elapsed % 60) + "s";

    return { totalScore, totalCorrect, totalWrong, subjStats, projection, minsTaken };
  }

  window.submitMockAndSync = function () {
    const paper = buildFullMockPaper();
    const res = evaluateMockPaper(paper);
    window._CBT_SUBMITTED = true;
    saveMockLog({
      sessionId: window._MOCK_SESSION_ID,
      timestamp: new Date().toLocaleString(),
      candidate: getCandidateName(),
      status: "SUBMITTED",
      timeTaken: res.minsTaken,
      totalScore: res.totalScore,
      maxScore: IS_JEE ? 300 : 720,
      projection: res.projection,
      subjects: res.subjStats
    });
    window.renderScienceTab4();
  };

  window.exitMockWithoutSubmission = function () {
    const attemptedCount = Object.keys(window._CBT_ANS).filter(k => String(window._CBT_ANS[k]).trim() !== "").length;
    const paper = buildFullMockPaper();
    const res = evaluateMockPaper(paper);
    saveMockLog({
      sessionId: window._MOCK_SESSION_ID,
      timestamp: new Date().toLocaleString(),
      candidate: getCandidateName(),
      status: "EXITED_UNSUBMITTED (" + attemptedCount + "/" + paper.length + " Qs)",
      timeTaken: res.minsTaken,
      totalScore: res.totalScore,
      maxScore: IS_JEE ? 300 : 720,
      projection: "Partial Exit — Not Synced to Tab 6",
      subjects: res.subjStats
    });
    // Reset active exam scope cleanly
    window._MOCK_SESSION_ID = newSessionId();
    window._CBT_ANS = {};
    window._CBT_REVIEW = {};
    window._CBT_VISITED = { 0: true };
    window._CBT_SUBMITTED = false;
    window._CBT_SEC_LEFT = 180 * 60;
    window._CBT_IDX = 0;
    window.renderScienceTab4();
  };

  window.startFreshMockReset = function () {
    window._MOCK_SESSION_ID = newSessionId();
    window._CBT_ANS = {};
    window._CBT_REVIEW = {};
    window._CBT_VISITED = { 0: true };
    window._CBT_SUBMITTED = false;
    window._CBT_SEC_LEFT = 180 * 60;
    window._CBT_IDX = 0;
    window.renderScienceTab4();
  };

  window.renderScienceTab4 = async function (el) {
    const accent = IS_JEE ? "indigo" : "emerald";
    enforceScienceBrand();
    const target = getTarget(el);
    if (!target) return;
    await hydrateFromNeon();
    ensureMockTimer();

    const paper = buildFullMockPaper();
    if (!paper.length) {
      target.innerHTML = `<div class="p-8 text-center text-sm font-bold text-slate-500">Assembling Full NTA Mock Paper from Neon...</div>`;
      return;
    }

    const totalQs = paper.length;
    const qIdx = Math.min(totalQs - 1, Math.max(0, Number(window._CBT_IDX || 0)));
    window._CBT_VISITED[qIdx] = true;
    const q = paper[qIdx];
    const activeSubj = q.mock_subj;

    const h = String(Math.floor(window._CBT_SEC_LEFT / 3600)).padStart(2, "0");
    const m = String(Math.floor((window._CBT_SEC_LEFT % 3600) / 60)).padStart(2, "0");
    const s = String(window._CBT_SEC_LEFT % 60).padStart(2, "0");

    const evalRes = window._CBT_SUBMITTED ? evaluateMockPaper(paper) : null;
    const logs = getMockLogs();
    const subjTabs = IS_JEE
      ? [["PHYSICS", 0, 25], ["CHEMISTRY", 25, 25], ["MATHEMATICS", 50, 25]]
      : [["PHYSICS", 0, 45], ["CHEMISTRY", 45, 45], ["BOTANY", 90, 45], ["ZOOLOGY", 135, 45]];

    target.innerHTML = `
      <div class="max-w-7xl mx-auto pt-4 pb-10 space-y-4">
        <!-- Session Telemetry & Control Bar -->
        <div class="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-300 font-mono text-xs font-extrabold text-slate-800">
              Session ID: ${window._MOCK_SESSION_ID}
            </span>
            ${subjTabs.map(([subName, startIdx, cnt]) => `
              <button type="button" onclick="window._CBT_IDX=${startIdx}; window.renderScienceTab4();"
                class="px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer ${activeSubj === subName ? `bg-${accent}-600 text-white shadow-sm` : "bg-slate-100 text-slate-700 hover:bg-slate-200"}">
                ${subName} (${cnt} Qs)
              </button>
            `).join("")}
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <div class="px-3.5 py-1.5 rounded-xl bg-slate-900 text-amber-300 font-mono text-sm font-extrabold">
              <span id="cbt-clock">${h}:${m}:${s}</span>
            </div>
            ${!window._CBT_SUBMITTED ? `
              <button type="button" onclick="window.exitMockWithoutSubmission();"
                title="Log partial attempt without submitting and reset exam state"
                class="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-700 text-xs font-extrabold cursor-pointer">Exit Without Submission &amp; Reset</button>
              <button type="button" onclick="window.submitMockAndSync();"
                class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-sm cursor-pointer">Submit &amp; Sync to Tab 6</button>
            ` : `
              <button type="button" onclick="window.downloadMockPdfReport('${window._MOCK_SESSION_ID}');"
                class="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-sm cursor-pointer">Download PDF Scorecard</button>
              <button type="button" onclick="window.selectUnifiedTab(6);"
                class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-sm cursor-pointer">Open Synced Tab 6 Forecaster &rarr;</button>
              <button type="button" onclick="window.startFreshMockReset();"
                class="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-extrabold cursor-pointer">New Session Reset</button>
            `}
          </div>
        </div>

        ${window._CBT_SUBMITTED && evalRes ? `
          <div class="bg-white border-2 border-emerald-500 rounded-2xl p-6 space-y-4 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div class="text-xs font-extrabold uppercase text-emerald-700">OFFICIAL SCORECARD &bull; SESSION ${window._MOCK_SESSION_ID} &bull; SYNCED TO TAB 6</div>
                <h3 class="text-2xl font-black text-slate-900">Total Score: ${evalRes.totalScore} / ${IS_JEE ? 300 : 720} &bull; ${evalRes.projection}</h3>
              </div>
              <div class="text-xs font-bold text-slate-600">Correct: <span class="text-emerald-700 font-extrabold">${evalRes.totalCorrect} (+${evalRes.totalCorrect * 4})</span> &bull; Incorrect: <span class="text-rose-700 font-extrabold">${evalRes.totalWrong} (-${evalRes.totalWrong})</span></div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-${IS_JEE ? 3 : 4} gap-3 text-xs">
              ${Object.entries(evalRes.subjStats).map(([sn, st]) => `
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="font-extrabold text-${accent}-700">${sn}</div>
                  <div class="text-lg font-black text-slate-900 mt-0.5">${st.s} / ${st.max}</div>
                  <div class="text-slate-600 mt-0.5">Correct: ${st.c} &bull; Incorrect: ${st.w}</div>
                </div>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Main Question Workspace + Palette -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div class="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span class="text-xs font-extrabold uppercase text-${accent}-600">Question ${qIdx + 1} of ${totalQs} &bull; ${q.mock_subj} &bull; ${q.mock_sec}</span>
                <div class="text-[11px] text-slate-500">Code: ${q.question_code} &bull; Chapter: ${q.chapter_name}</div>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">+4 Correct / -1 Incorrect</span>
            </div>

            <div class="text-sm font-bold text-slate-900 leading-relaxed whitespace-pre-line min-h-[90px]">${q.prompt}</div>

            ${q.question_type === "NUMERICAL_INT" ? `
              <div class="space-y-2 pt-2">
                <label class="block text-xs font-extrabold text-slate-600">Enter Exact Numerical Value (Section B):</label>
                <input id="cbt-num-box" type="text" value="${window._CBT_ANS[qIdx] || ""}" onchange="window._CBT_ANS[${qIdx}]=this.value.trim();"
                  placeholder="Type numerical answer..." class="w-56 rounded-xl border border-slate-300 px-4 py-2.5 text-base font-mono font-extrabold" />
              </div>
            ` : `
              <div class="grid grid-cols-1 gap-2.5 text-xs pt-1">
                ${(q.options_json || []).map((opt, oi) => {
                  const selected = String(window._CBT_ANS[qIdx]) === String(oi);
                  return `
                    <button type="button" onclick="window._CBT_ANS[${qIdx}]='${oi}'; window.renderScienceTab4();"
                      class="text-left p-3.5 rounded-xl border transition cursor-pointer ${selected ? `bg-${accent}-600 text-white border-${accent}-600 font-bold shadow-sm` : "bg-slate-50 border-slate-200 hover:border-indigo-400 text-slate-900"}">
                      <strong>(${String.fromCharCode(65 + oi)})</strong> ${opt}
                    </button>
                  `;
                }).join("")}
              </div>
            `}

            ${window._CBT_SUBMITTED ? `
              <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                <strong>Official Answer:</strong> ${q.options_json ? q.options_json[Number(q.correct_answer)] : q.correct_answer}<br/>
                <strong>Solution:</strong> ${q.explanation}
              </div>
            ` : ""}

            <div class="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-slate-100">
              <div class="flex flex-wrap gap-2">
                <button type="button" onclick="const nb=document.getElementById('cbt-num-box'); if(nb) window._CBT_ANS[${qIdx}]=nb.value.trim(); if(window._CBT_IDX<${totalQs - 1}) window._CBT_IDX++; window.renderScienceTab4();"
                  class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold cursor-pointer">Save &amp; Next</button>
                <button type="button" onclick="const nb=document.getElementById('cbt-num-box'); if(nb) window._CBT_ANS[${qIdx}]=nb.value.trim(); window._CBT_REVIEW[${qIdx}]=true; if(window._CBT_IDX<${totalQs - 1}) window._CBT_IDX++; window.renderScienceTab4();"
                  class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold cursor-pointer">Mark for Review &amp; Next</button>
                <button type="button" onclick="delete window._CBT_ANS[${qIdx}]; delete window._CBT_REVIEW[${qIdx}]; window.renderScienceTab4();"
                  class="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold cursor-pointer">Clear Response</button>
              </div>
              <div class="flex gap-1.5">
                <button type="button" onclick="if(window._CBT_IDX>0){window._CBT_IDX--; window.renderScienceTab4();}" class="px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer">&larr; Prev</button>
                <button type="button" onclick="if(window._CBT_IDX<${totalQs - 1}){window._CBT_IDX++; window.renderScienceTab4();}" class="px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer">Next &rarr;</button>
              </div>
            </div>
          </div>

          <div class="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
            <div class="text-xs font-extrabold uppercase tracking-wider text-slate-700">QUESTION PALETTE (${totalQs} Qs)</div>
            <div class="grid grid-cols-2 gap-2 text-[11px] font-bold">
              <div class="flex items-center gap-1.5"><span class="w-3.5 h-3.5 rounded bg-emerald-600 inline-block"></span> Answered (${Object.keys(window._CBT_ANS).filter(k => String(window._CBT_ANS[k]).trim() !== "").length})</div>
              <div class="flex items-center gap-1.5"><span class="w-3.5 h-3.5 rounded bg-purple-600 inline-block"></span> Marked (${Object.keys(window._CBT_REVIEW).length})</div>
              <div class="flex items-center gap-1.5"><span class="w-3.5 h-3.5 rounded bg-rose-500 inline-block"></span> Skipped</div>
              <div class="flex items-center gap-1.5"><span class="w-3.5 h-3.5 rounded bg-slate-200 inline-block"></span> Unvisited</div>
            </div>
            <div class="max-h-[340px] overflow-y-auto pr-1 grid grid-cols-6 gap-1.5">
              ${paper.map((_, idx) => {
                const hasAns = window._CBT_ANS[idx] !== undefined && String(window._CBT_ANS[idx]).trim() !== "";
                const isRev = !!window._CBT_REVIEW[idx];
                const isVis = !!window._CBT_VISITED[idx];
                let cls = "bg-slate-100 text-slate-700 border-slate-300";
                if (isRev) cls = "bg-purple-600 text-white border-purple-600";
                else if (hasAns) cls = "bg-emerald-600 text-white border-emerald-600";
                else if (isVis) cls = "bg-rose-500 text-white border-rose-500";
                if (idx === qIdx) cls += " ring-2 ring-indigo-500 ring-offset-1";
                return `<button type="button" onclick="window._CBT_IDX=${idx}; window.renderScienceTab4();" class="h-7 rounded-lg text-[11px] font-extrabold border cursor-pointer ${cls}">${idx + 1}</button>`;
              }).join("")}
            </div>
          </div>
        </div>

        <!-- Session Audit Log & PDF Export History -->
        <div class="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div class="text-xs font-extrabold uppercase tracking-wider text-${accent}-600">PERSISTENT MOCK SESSION AUDIT LOG &amp; PDF ARCHIVE</div>
              <div class="text-xs text-slate-500">Tracks both submitted tests (synced to Tab 6) and exited partial attempts.</div>
            </div>
            ${logs.length ? `<button type="button" onclick="window.clearScienceMockLogs();" class="px-3 py-1.5 rounded-xl border border-rose-300 text-rose-700 text-xs font-bold hover:bg-rose-50 cursor-pointer">Reset Session Logs</button>` : ""}
          </div>

          ${!logs.length ? `
            <div class="text-xs text-slate-500 py-2">No sessions logged yet. Submit a mock or click <strong>Exit Without Submission &amp; Reset</strong> to generate your first Session ID log.</div>
          ` : `
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="border-b border-slate-200 text-slate-500">
                    <th class="py-2 pr-3">Session ID</th><th class="py-2 pr-3">Timestamp</th><th class="py-2 pr-3">Status</th><th class="py-2 pr-3">Score</th><th class="py-2 pr-3">Time</th><th class="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${logs.map(lg => `
                    <tr class="border-b border-slate-100">
                      <td class="py-2 pr-3 font-mono font-extrabold text-slate-900">${lg.sessionId}</td>
                      <td class="py-2 pr-3 text-slate-600">${lg.timestamp}</td>
                      <td class="py-2 pr-3 font-bold ${lg.status === "SUBMITTED" ? "text-emerald-700" : "text-amber-700"}">${lg.status}</td>
                      <td class="py-2 pr-3 font-extrabold">${lg.totalScore} / ${lg.maxScore}</td>
                      <td class="py-2 pr-3 text-slate-600">${lg.timeTaken}</td>
                      <td class="py-2 flex gap-2">
                        <button type="button" onclick="window.downloadMockPdfReport('${lg.sessionId}');" class="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-bold cursor-pointer">PDF Report</button>
                        ${lg.status === "SUBMITTED" ? `<button type="button" onclick="window.applySyncedMockToTab6('${lg.sessionId}'); window.selectUnifiedTab(6);" class="px-2.5 py-1 rounded-lg bg-${accent}-600 text-white font-bold cursor-pointer">Sync Tab 6</button>` : ""}
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `}
        </div>
      </div>
    `;
  };

  window.applySyncedMockToTab6 = function (sessionId) {
    try {
      const logs = getMockLogs();
      const rec = sessionId ? logs.find(x => x.sessionId === sessionId) : JSON.parse(localStorage.getItem(SYNC_KEY) || "null");
      if (!rec || !rec.subjects) return false;
      if (IS_JEE && rec.subjects.PHYSICS && rec.subjects.CHEMISTRY && rec.subjects.MATHEMATICS) {
        window._T6_JEE.p = Math.max(0, Number(rec.subjects.PHYSICS.s) || 0);
        window._T6_JEE.c = Math.max(0, Number(rec.subjects.CHEMISTRY.s) || 0);
        window._T6_JEE.m = Math.max(0, Number(rec.subjects.MATHEMATICS.s) || 0);
        window._T6_SYNCED_ID = rec.sessionId;
        return true;
      }
      if (!IS_JEE && rec.subjects.PHYSICS && rec.subjects.CHEMISTRY && rec.subjects.BOTANY && rec.subjects.ZOOLOGY) {
        window._T6_NEET.p = Math.max(0, Number(rec.subjects.PHYSICS.s) || 0);
        window._T6_NEET.c = Math.max(0, Number(rec.subjects.CHEMISTRY.s) || 0);
        window._T6_NEET.b = Math.max(0, Number(rec.subjects.BOTANY.s) || 0);
        window._T6_NEET.z = Math.max(0, Number(rec.subjects.ZOOLOGY.s) || 0);
        window._T6_SYNCED_ID = rec.sessionId;
        return true;
      }
    } catch (_) {}
    return false;
  };


  // ============================================================================
  // TAB 5: TRAP DOCTOR (20 TRAPS/SUBJECT) & AI CONCEPT/DERIVATION DOUBT STUDIO
  // ============================================================================
  window._T5_SUBJ = "ALL";
  window._T5_QUERY = "";

  window.renderScienceTab5 = function (el) {
    const accent = IS_JEE ? "indigo" : "emerald";
    enforceScienceBrand();
    const target = getTarget(el);
    if (!target) return;

    const traps = IS_JEE ? (window.JEE_TRAPS_BANK || []) : (window.NEET_TRAPS_BANK || []);
    const subjs = IS_JEE ? ["ALL", "PHYSICS", "CHEMISTRY", "MATHEMATICS"] : ["ALL", "BOTANY", "ZOOLOGY", "CHEMISTRY", "PHYSICS"];
    const qLower = String(window._T5_QUERY || "").trim().toLowerCase();
    const visibleTraps = traps.filter(t =>
      (window._T5_SUBJ === "ALL" || t.subj === window._T5_SUBJ) &&
      (!qLower || t.title.toLowerCase().includes(qLower) || t.trap.toLowerCase().includes(qLower) || t.fix.toLowerCase().includes(qLower))
    );
    const samplePrompts = IS_JEE ? [
      "Derive the minimum coefficient of static friction required for pure rolling of a solid sphere down an incline of angle theta.",
      "Why is chlorobenzene less reactive than benzene toward electrophilic substitution yet ortho/para directing?",
      "Explain how King's Property evaluates integral from 0 to pi/2 of sin^5(x)/(sin^5(x)+cos^5(x)) dx."
    ] : [
      "Explain why a basal level of lac operon expression is essential in E. coli even in the absence of lactose.",
      "Compare the partial pressures of O2 and CO2 in alveoli, oxygenated blood, deoxygenated blood, and tissues.",
      "Explain insertional inactivation of tetR at the BamHI site in cloning vector pBR322."
    ];

    target.innerHTML = `
      <div class="max-w-7xl mx-auto pt-4 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-5">
        <!-- Left 7 Cols: Curated NTA Trap Doctor Matrix (20 per Subject) -->
        <div class="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div class="text-xs font-extrabold uppercase tracking-wider text-rose-600">NEGATIVE-MARKING PREVENTION CLINIC (${traps.length} NTA TRAPS &bull; 20/SUBJECT)</div>
              <h2 class="text-xl font-extrabold text-slate-900 mt-0.5">High-Frequency NTA Concept Traps</h2>
            </div>
            <input type="text" value="${String(window._T5_QUERY || "").replace(/"/g, '&quot;')}" oninput="window._T5_QUERY=this.value; window.renderScienceTab5();"
              placeholder="Search traps (e.g., Nernst, Henle, EcoRI, rolling)..."
              class="w-full sm:w-64 rounded-xl border border-slate-300 px-3 py-1.5 text-xs font-medium" />
          </div>

          <div class="flex flex-wrap gap-1.5">
            ${subjs.map(s => {
              const cnt = s === "ALL" ? traps.length : traps.filter(x => x.subj === s).length;
              return `
                <button type="button" onclick="window._T5_SUBJ='${s}'; window.renderScienceTab5();"
                  class="px-3 py-1 rounded-full text-xs font-bold cursor-pointer ${window._T5_SUBJ === s ? `bg-${accent}-600 text-white` : "bg-slate-100 text-slate-700 hover:bg-slate-200"}">${s} (${cnt})</button>
              `;
            }).join("")}
          </div>

          <div class="space-y-3 max-h-[760px] overflow-y-auto pr-1">
            ${visibleTraps.map((item, idx) => `
              <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                <div class="flex items-center justify-between gap-2">
                  <span class="font-extrabold text-sm text-slate-900">${idx + 1}. ${item.title}</span>
                  <span class="px-2.5 py-0.5 rounded-full bg-${accent}-100 text-${accent}-800 text-[10px] font-extrabold shrink-0">${item.subj}</span>
                </div>
                <div class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
                  <strong>Common Trap (-1):</strong> ${item.trap}
                </div>
                <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                  <strong>NTA Reality (+4):</strong> ${item.fix}
                </div>
                <div class="pt-0.5">
                  <button type="button" onclick="const box=document.getElementById('sci-doubt-q'); if(box){box.value='Give me a solved practice problem testing this concept: ${item.title.replace(/'/g, "")}'; box.focus();}"
                    class="text-[11px] font-extrabold text-${accent}-700 hover:underline cursor-pointer">Ask AI Tutor for a Worked Variation &rarr;</button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
        <!-- Right 5 Cols: Interactive AI Doubt & Derivation Solver -->
        <div class="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm h-fit">
          <div>
            <div class="text-xs font-extrabold uppercase tracking-wider text-${accent}-600">24/7 STEP-BY-STEP DERIVATION &amp; NCERT TUTOR</div>
            <h2 class="text-xl font-extrabold text-slate-900 mt-0.5">AI Doubt &amp; Concept Solver</h2>
            <p class="text-xs text-slate-600 mt-1">Paste any ${IS_JEE ? "JEE Physics, Chemistry, or Mathematics" : "NEET Physics, Chemistry, Botany, or Zoology"} problem or NCERT line for a step-by-step derivation and trap audit.</p>
          </div>

          <div class="space-y-1.5">
            <div class="text-[11px] font-extrabold uppercase text-slate-500">Quick-Load Sample Questions:</div>
            ${samplePrompts.map(sp => `
              <button type="button" onclick="document.getElementById('sci-doubt-q').value=this.dataset.q;" data-q="${sp.replace(/"/g, '&quot;')}"
                class="w-full text-left p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:border-${accent}-400 text-[11px] font-medium text-slate-700 cursor-pointer">
                &ldquo;${sp}&rdquo;
              </button>
            `).join("")}
          </div>

          <textarea id="sci-doubt-q" rows="4" class="w-full rounded-2xl border border-slate-300 p-3.5 text-sm" placeholder="Type or paste your ${IS_JEE ? "PCM" : "PCB"} doubt here..."></textarea>

          <button type="button" onclick="(async()=>{const out=document.getElementById('sci-doubt-out'); const q=(document.getElementById('sci-doubt-q').value||'').trim(); if(!q)return; out.classList.remove('hidden'); out.innerHTML='<strong>Analyzing with GOALisB Science Tutor...</strong>'; try{const r=await fetch('/api/doubt',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q,exam:EXAM})}); const d=await r.json(); const ans=d.answer||d.response||d.explanation||JSON.stringify(d); out.innerHTML='<div class=\'font-extrabold text-${accent}-700 mb-1\'>Step-by-Step Resolution:</div>'+ans;}catch(e){out.textContent='Unable to reach AI endpoint right now. Please retry.';}})();"
            class="w-full py-2.5 rounded-xl bg-${accent}-600 hover:bg-${accent}-500 text-white text-xs font-extrabold shadow-sm cursor-pointer">
            Solve Step-by-Step &amp; Audit Traps
          </button>

          <div id="sci-doubt-out" class="hidden p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs whitespace-pre-line leading-relaxed text-slate-800"></div>
        </div>
      </div>
    `;
  };

  // ============================================================================
  // TAB 6: SMOOTH IN-PLACE MULTI-SUBJECT PERCENTILE / AIR & COLLEGE FORECASTER
  // ============================================================================
  window._T6_JEE = { p: 76, c: 74, m: 68, shift: "MODERATE", cat: "GEN" };
  window._T6_NEET = { p: 155, c: 160, b: 175, z: 170, diff: "MODERATE", cat: "GEN" };

  window.updateScienceTab6 = function () {
    const out = document.getElementById("t6-live-results");
    if (!out) return;

    if (IS_JEE) {
      const st = window._T6_JEE;
      const rawTotal = st.p + st.c + st.m;
      const shiftAdj = st.shift === "TOUGH" ? 14 : (st.shift === "EASY" ? -12 : 0);
      const catBonus = st.cat === "SCST" ? 45 : (st.cat === "OBC" ? 14 : (st.cat === "EWS" ? 10 : 0));
      const eff = Math.min(300, Math.max(0, rawTotal + shiftAdj));
      const cutoffEff = Math.min(300, eff + catBonus);

      let pct = "91.80 %ile", air = "AIR ~72,000 – 90,000", tier = "State Govt / Top Private Engineering Colleges";
      if (eff >= 265) { pct = "99.95+ %ile"; air = "AIR 350 – 850"; tier = "Top 5 IITs & NIT Trichy CSE Tier"; }
      else if (eff >= 235) { pct = "99.72 %ile"; air = "AIR 2,200 – 3,800"; tier = "NIT Trichy/Surathkal CSE & Top IIT Core"; }
      else if (eff >= 210) { pct = "99.35 %ile"; air = "AIR 6,500 – 9,200"; tier = "Top NITs (ECE/EE) & IIT Qualifying Safe"; }
      else if (eff >= 180) { pct = "98.45 %ile"; air = "AIR 16,000 – 22,000"; tier = "Top 10 NITs Core & IIITs"; }
      else if (eff >= 145) { pct = "96.20 %ile"; air = "AIR 40,000 – 52,000"; tier = "NIT North-East / IIITs / JEE Adv Cutoff Cleared"; }
      else if (eff >= 110) { pct = "93.40 %ile"; air = "AIR 62,000 – 78,000"; tier = "JEE Advanced Borderline / State Govt Core"; }

      const colleges = [
        { inst: "IIT Bombay / Delhi / Madras / Kanpur", branch: "CSE / MnC / EE (via JEE Adv Top 1,200)", status: cutoffEff >= 245 ? "High Readiness" : "Need +" + (245 - cutoffEff) + " Eq." },
        { inst: "NIT Trichy / Surathkal / Warangal", branch: "Computer Science & Engineering (CSE)", status: cutoffEff >= 235 ? "Safe Target" : "Need +" + (235 - cutoffEff) + " Eq." },
        { inst: "NIT Trichy / Surathkal / Rourkela / Calicut", branch: "ECE / Electrical / Mechanical", status: cutoffEff >= 195 ? "Safe Target" : "Need +" + (195 - cutoffEff) + " Eq." },
        { inst: "IIIT Hyderabad / IIIT Bangalore / DTU / NSUT", branch: "CSE / AI & Data Science", status: cutoffEff >= 215 ? "Competitive" : "Need +" + (215 - cutoffEff) + " Eq." }
      ];

      const weakest = [["Physics", st.p], ["Chemistry", st.c], ["Mathematics", st.m]].sort((a, b) => a[1] - b[1])[0];
      const diag = document.getElementById("t6-bottleneck");
      if (diag) {
        diag.innerHTML = `<div class="font-extrabold">Bottleneck Diagnostic: ${weakest[0]} (${weakest[1]}/100)</div>
          <div>Eliminating just <strong>4 negative-marking errors</strong> (+20 marks) lifts your shift-normalized score to <strong>${Math.min(300, eff + 20)}/300</strong>.</div>`;
      }

      out.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200">
            <div class="text-[10px] font-extrabold uppercase text-indigo-700">Raw / Normalized Total</div>
            <div class="text-2xl font-black text-slate-900 mt-0.5">${rawTotal} <span class="text-xs font-bold text-slate-500">/ 300</span></div>
            <div class="text-[11px] font-bold text-indigo-700 mt-0.5">Shift-Eq: ${eff}/300</div>
          </div>
          <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div class="text-[10px] font-extrabold uppercase text-emerald-700">Projected NTA Percentile</div>
            <div class="text-2xl font-black text-emerald-900 mt-0.5">${pct}</div>
            <div class="text-[11px] font-bold text-emerald-700 mt-0.5">Est. CRL: ${air}</div>
          </div>
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div class="text-[10px] font-extrabold uppercase text-slate-500">JoSAA Admission Tier (${st.cat})</div>
            <div class="text-xs font-extrabold text-slate-900 mt-1 leading-snug">${tier}</div>
          </div>
        </div>
        <div class="space-y-2 pt-2">
          <div class="text-xs font-extrabold uppercase tracking-wider text-slate-700">Target Institute &amp; Branch Readiness Matrix (${st.cat})</div>
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
      const bioTotal = st.b + st.z;
      const diffAdj = st.diff === "TOUGH" ? 15 : (st.diff === "EASY" ? -10 : 0);
      const catBonus = st.cat === "SCST" ? 85 : (st.cat === "OBC" ? 12 : (st.cat === "EWS" ? 10 : 0));
      const eff = Math.min(720, Math.max(0, rawTotal + diffAdj));
      const quotaEff = Math.min(720, eff + catBonus);

      let air = "AIR ~45,000 – 68,000", tier = "State Quota / Semi-Govt MBBS & BDS";
      if (eff >= 705) { air = "AIR 1 – 150"; tier = "AIIMS New Delhi / MAMC / VMMC Delhi"; }
      else if (eff >= 685) { air = "AIR 400 – 1,800"; tier = "Top AIIMS (Bhopal, Jodhpur, Rishikesh) & JIPMER"; }
      else if (eff >= 660) { air = "AIR 2,800 – 6,500"; tier = "Premier State Govt Medical Colleges (AIQ)"; }
      else if (eff >= 630) { air = "AIR 11,000 – 21,000"; tier = "All-India Quota (15%) & State Govt MBBS"; }
      else if (eff >= 595) { air = "AIR 26,000 – 42,000"; tier = "State Quota Govt MBBS (85% Domicile)"; }

      const colleges = [
        { inst: "AIIMS New Delhi / MAMC / VMMC", quota: "All India Quota (15%) • Target 700+", status: quotaEff >= 700 ? "Safe Contender" : "Need +" + (700 - quotaEff) + " Marks" },
        { inst: "AIIMS Bhopal / Jodhpur / Bhubaneswar / JIPMER", quota: "All India Quota (15%) • Target 680+", status: quotaEff >= 680 ? "Safe Contender" : "Need +" + (680 - quotaEff) + " Marks" },
        { inst: "Top State Govt Medical Colleges (GMC)", quota: "AIQ & 85% State Quota • Target 645+", status: quotaEff >= 645 ? "High Probability" : "Need +" + (645 - quotaEff) + " Marks" },
        { inst: "Govt MBBS Seat (" + st.cat + " Quota)", quota: "85% State Quota • Target 610+", status: quotaEff >= 610 ? "Within Cutoff" : "Need +" + (610 - quotaEff) + " Marks" }
      ];

      const weakest = [["Physics", st.p], ["Chemistry", st.c], ["Botany", st.b], ["Zoology", st.z]].sort((a, b) => a[1] - b[1])[0];
      const diag = document.getElementById("t6-bottleneck");
      if (diag) {
        diag.innerHTML = `<div class="font-extrabold">Biology Anchor: ${bioTotal}/360 &bull; Weakest Subject: ${weakest[0]} (${weakest[1]}/180)</div>
          <div>Avoiding just <strong>5 NCERT Assertion-Reason traps</strong> (+25 marks) boosts your effective score to <strong>${Math.min(720, eff + 25)}/720</strong>.</div>`;
      }

      out.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div class="text-[10px] font-extrabold uppercase text-emerald-700">Total NEET Score</div>
            <div class="text-2xl font-black text-slate-900 mt-0.5">${rawTotal} <span class="text-xs font-bold text-slate-500">/ 720</span></div>
            <div class="text-[11px] font-bold text-emerald-700 mt-0.5">Biology: ${bioTotal}/360</div>
          </div>
          <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-200">
            <div class="text-[10px] font-extrabold uppercase text-indigo-700">Projected All India Rank</div>
            <div class="text-xl font-black text-indigo-950 mt-0.5">${air}</div>
            <div class="text-[11px] font-bold text-indigo-700 mt-0.5">MCC / State (${st.cat})</div>
          </div>
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div class="text-[10px] font-extrabold uppercase text-slate-500">Medical College Tier</div>
            <div class="text-xs font-extrabold text-slate-900 mt-1 leading-snug">${tier}</div>
          </div>
        </div>
        <div class="space-y-2 pt-2">
          <div class="text-xs font-extrabold uppercase tracking-wider text-slate-700">AIIMS &amp; Government Medical College Readiness (${st.cat})</div>
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
    const rEl = document.getElementById("t6-rng-" + key);
    const nEl = document.getElementById("t6-num-" + key);
    if (rEl && Number(rEl.value) !== v) rEl.value = v;
    if (nEl && Number(nEl.value) !== v) nEl.value = v;
    window.updateScienceTab6();
  };

  window.renderScienceTab6 = function (el) {
    enforceScienceBrand();
    window.applySyncedMockToTab6();
    const target = getTarget(el);
    if (!target) return;

    const accent = IS_JEE ? "indigo" : "emerald";
    const maxSub = IS_JEE ? 100 : 180;
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

    target.innerHTML = `
      <div class="max-w-7xl mx-auto pt-4 pb-10 space-y-5">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div class="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div>
              <div class="text-xs font-extrabold uppercase tracking-wider text-${accent}-600">${IS_JEE ? "NTA JEE MAIN & ADVANCED CALIBRATOR" : "NTA NEET UG 720-MARK CALIBRATOR"}</div>
              <h2 class="text-xl font-extrabold text-slate-900 mt-0.5">${IS_JEE ? "Subject Marks & Shift Simulator" : "PCB Subject Marks & AIR Simulator"}</h2>
            </div>

            ${rows.map(([lbl, key, val]) => `
              <div class="space-y-1.5">
                <div class="flex items-center justify-between text-xs font-extrabold">
                  <span>${lbl} (0 – ${maxSub})</span>
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

            <div class="grid grid-cols-2 gap-3 pt-1 text-xs">
              <div>
                <label class="block font-extrabold text-slate-600 mb-1">${IS_JEE ? "NTA Shift Normalization" : "Paper Difficulty Level"}</label>
                <select onchange="if(${IS_JEE}) window._T6_JEE.shift=this.value; else window._T6_NEET.diff=this.value; window.updateScienceTab6();" class="w-full rounded-xl border border-slate-300 px-3 py-2 font-bold">
                  <option value="TOUGH">Tough Paper (+${IS_JEE ? 14 : 15} Eq.)</option>
                  <option value="MODERATE" selected>Standard NTA Paper</option>
                  <option value="EASY">High-Cutoff Paper (-${IS_JEE ? 12 : 10} Eq.)</option>
                </select>
              </div>
              <div>
                <label class="block font-extrabold text-slate-600 mb-1">${IS_JEE ? "Admission Category" : "Counselling Quota"}</label>
                <select onchange="if(${IS_JEE}) window._T6_JEE.cat=this.value; else window._T6_NEET.cat=this.value; window.updateScienceTab6();" class="w-full rounded-xl border border-slate-300 px-3 py-2 font-bold">
                  <option value="GEN" selected>General (OPEN)</option>
                  <option value="EWS">GEN-EWS</option>
                  <option value="OBC">OBC-NCL</option>
                  <option value="SCST">SC / ST</option>
                </select>
              </div>
            </div>

            <div id="t6-sync-pill" class="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 flex items-center justify-between gap-2">
              <span>${window._T6_SYNCED_ID ? `Synced with Mock Session <strong>${window._T6_SYNCED_ID}</strong>` : "Manual What-If Mode (Submit a Tab 4 mock to auto-sync real scores)"}</span>
              ${window._T6_SYNCED_ID ? `<button type="button" onclick="window._T6_SYNCED_ID=null; window.renderScienceTab6();" class="underline font-bold cursor-pointer">What-If Mode</button>` : ""}
            </div>
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
    renderTab6: window.renderScienceTab6
  };
  Object.entries(tabMap).forEach(([k, fn]) => {
    Object.defineProperty(window, k, { get: () => fn, set: () => {}, configurable: true });
  });

  window.addEventListener("DOMContentLoaded", () => {
    enforceScienceBrand();
    window.renderScienceTab1();
    setTimeout(() => { enforceScienceBrand(); window.renderScienceTab1(); }, 350);
  });
})();
