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
  // RATIONAL FULL-MOCK-ONLY LEDGER & VERIFIED PRESENT-LEVEL FORECASTER (v24)
  // ============================================================================
  const LOG_KEY = IS_JEE ? "goalisb_jee_full_mock_ledger_v1" : "goalisb_neet_full_mock_ledger_v1";
  const SYNC_KEY = IS_JEE ? "goalisb_jee_verified_standing_v1" : "goalisb_neet_verified_standing_v1";
  const REQUIRED_QS = IS_JEE ? 75 : 180;
  const MAX_MARKS = IS_JEE ? 300 : 720;

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

  // Strictly returns ONLY complete, officially submitted Full-Length Mocks
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
  window._CBT_DECL_ACCEPTED = !!window._CBT_DECL_ACCEPTED;
  window._CBT_IDX = 0;
  window._CBT_ANS = window._CBT_ANS || {};
  window._CBT_REVIEW = window._CBT_REVIEW || {};
  window._CBT_VISITED = window._CBT_VISITED || { 0: true };
  window._CBT_SUBMITTED = !!window._CBT_SUBMITTED;
  if (typeof window._CBT_SEC_LEFT !== "number") window._CBT_SEC_LEFT = 180 * 60;
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
    let totalScore = 0, totalCorrect = 0, totalWrong = 0, totalAttempted = 0;
    const subjStats = IS_JEE
      ? { PHYSICS: { c: 0, w: 0, s: 0, max: 100 }, CHEMISTRY: { c: 0, w: 0, s: 0, max: 100 }, MATHEMATICS: { c: 0, w: 0, s: 0, max: 100 } }
      : { PHYSICS: { c: 0, w: 0, s: 0, max: 180 }, CHEMISTRY: { c: 0, w: 0, s: 0, max: 180 }, BOTANY: { c: 0, w: 0, s: 0, max: 180 }, ZOOLOGY: { c: 0, w: 0, s: 0, max: 180 } };

    const itemsAudit = paper.map((item, idx) => {
      const rawAns = window._CBT_ANS[idx];
      const hasAns = rawAns !== undefined && String(rawAns).trim() !== "";
      let statusLabel = "Unattempted (0 Marks)";
      let userText = "(No response submitted)";
      let isCorrect = false;

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
          totalScore += 4; totalCorrect++;
          subjStats[item.mock_subj].c++; subjStats[item.mock_subj].s += 4;
          statusLabel = "Correct (+4 Marks)";
        } else {
          totalScore -= 1; totalWrong++;
          subjStats[item.mock_subj].w++; subjStats[item.mock_subj].s -= 1;
          statusLabel = "Incorrect (-1 Mark)";
        }
      }

      return {
        num: idx + 1,
        subj: item.mock_subj,
        sec: item.mock_sec,
        chapter: item.chapter_name || "",
        prompt: item.prompt || "",
        statusLabel,
        isCorrect,
        hasAns,
        userText,
        officialText,
        explanation: item.explanation || ""
      };
    });

    const unattempted = paper.length - totalAttempted;
    const accuracy = totalAttempted > 0 ? ((totalCorrect / totalAttempted) * 100).toFixed(1) : "0.0";
    const elapsedSec = Math.max(1, 180 * 60 - window._CBT_SEC_LEFT);
    const pacePerQ = (elapsedSec / Math.max(1, paper.length)).toFixed(1) + "s/Q";
    const minsTaken = Math.floor(elapsedSec / 60) + "m " + (elapsedSec % 60) + "s";
    const verdict = totalAttempted < Math.round(paper.length * 0.35)
      ? "Under-Attempted Full Paper (Low Stamina / Pacing Deficit)"
      : (Number(accuracy) >= 82 ? "High Precision (AIR / 99+%ile Trajectory)" : "Moderate Accuracy (Audit -1 Traps in Tab 5)");

    const projection = IS_JEE
      ? (totalScore >= 250 ? "99.92+ %ile (NIT Trichy CSE / Adv Top 1,500)" : totalScore >= 210 ? "99.35 %ile (Top NITs Core)" : totalScore >= 170 ? "98.10 %ile (Top IIIT / NIT)" : totalScore >= 120 ? "94.50+ %ile (JEE Adv Cutoff Zone)" : "Below 92 %ile (Foundation Rebuild Needed)")
      : (totalScore >= 695 ? "AIR < 350 (AIIMS New Delhi / MAMC)" : totalScore >= 660 ? "AIR ~3,200 (Top State Govt Medical College)" : totalScore >= 625 ? "AIR ~14,500 (Govt MBBS AIQ)" : totalScore >= 575 ? "AIR ~35,000 (State Quota MBBS)" : "Below Govt Cutoff (NCERT Bio 345+ Sprint Needed)");

    return {
      totalScore, totalCorrect, totalWrong, totalAttempted, unattempted, accuracy,
      pacePerQ, verdict, subjStats, projection, minsTaken, itemsAudit
    };
  }

  window.launchProctoredMockSession = function () {
    const chk = document.getElementById("cbt-launch-decl");
    if (chk && !chk.checked) {
      alert("Please check the NTA Candidate Honor-Code Declaration box before launching the proctored session.");
      return;
    }
    window._CBT_DECL_ACCEPTED = true;
    window._CBT_STARTED = true;
    window._CBT_SUBMITTED = false;
    window._CBT_SEC_LEFT = 180 * 60;
    window._CBT_IDX = 0;
    window._CBT_VISITED = { 0: true };
    window.renderScienceTab4();
  };

  window.submitMockAndSync = function () {
    const paper = buildFullMockPaper();
    if (paper.length !== REQUIRED_QS) {
      alert(`Full NTA Mock requires all ${REQUIRED_QS} questions to be assembled before scoring.`);
      return;
    }
    const res = evaluateMockPaper(paper);
    if (res.totalAttempted < 5) {
      const ok = confirm(`You have answered only ${res.totalAttempted} out of ${REQUIRED_QS} questions. Submitting an under-attempted Full Mock will record ${res.totalScore}/${MAX_MARKS} as your official present standing in the Persistent Assessment Ledger and Tab 6 Forecaster. Proceed with official submission?`);
      if (!ok) return;
    }
    window._CBT_SUBMITTED = true;
    saveVerifiedFullMock({
      sessionId: window._MOCK_SERIAL_ID,
      timestamp: new Date().toLocaleString(),
      blueprint: IS_JEE ? "Full JEE Main CBT (75 Qs • 300 Marks)" : "Full NEET UG OMR (180 Qs • 720 Marks)",
      candidate: getCandidateName(),
      status: "SUBMITTED",
      totalQuestions: REQUIRED_QS,
      timeTaken: res.minsTaken,
      pacePerQ: res.pacePerQ,
      accuracy: res.accuracy,
      verdict: res.verdict,
      counts: `${res.totalCorrect}C / ${res.totalWrong}W / ${res.unattempted}U`,
      totalScore: res.totalScore,
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
      window._T6_MODE = "VERIFIED";
      window.renderScienceTab4();
      return;
    }
    // Abort unsubmitted session cleanly WITHOUT polluting the Full-Mock Ledger or Tab 6 Forecaster
    window._MOCK_SERIAL_ID = newSerialId();
    window._CBT_STARTED = false;
    window._CBT_DECL_ACCEPTED = false;
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
    window._CBT_DECL_ACCEPTED = false;
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
      alert("Only completed & officially submitted Full-Length Mocks generate an Official Diagnostic Marksheet PDF.");
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
            <div><strong>Verification:</strong> VERIFIED FULL MOCK (${REQUIRED_QS} Qs)</div>
          </div>
        </div>

        <div style="margin:14px 0;padding:12px 14px;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;display:grid;grid-template-columns:repeat(4,1fr);gap:10px;font-size:12px;">
          <div><div style="color:#64748b;font-size:10px;font-weight:700;">CANDIDATE</div><strong>${esc(rec.candidate)}</strong></div>
          <div><div style="color:#64748b;font-size:10px;font-weight:700;">SCORE AWARDED</div><strong style="font-size:15px;color:#047857;">${rec.totalScore} / ${rec.maxScore}</strong></div>
          <div><div style="color:#64748b;font-size:10px;font-weight:700;">ACCURACY &amp; SPLIT</div><strong>${esc(rec.accuracy || "0.0")}% (${esc(rec.counts || "")})</strong></div>
          <div><div style="color:#64748b;font-size:10px;font-weight:700;">TIME &amp; PACE</div><strong>${esc(rec.timeTaken)} (${esc(rec.pacePerQ || "-")})</strong></div>
        </div>

        <div style="margin-bottom:14px;padding:10px 14px;background:#ecfdf5;border:1px solid #6ee7b7;border-radius:8px;font-size:12px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <div><strong>Verified Present Standing:</strong> ${esc(rec.projection)}</div>
          <div><strong>Behavioral Verdict:</strong> ${esc(rec.verdict || "Standard Pacing")}</div>
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
    enforceScienceBrand();
    const target = getTarget(el);
    if (!target) return;
    await hydrateFromNeon();
    ensureMockTimer();

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

    const resetDeclarationBanner = window._RESET_MODAL_MODE ? `
      <div class="bg-rose-50 border-2 border-rose-400 rounded-2xl p-5 space-y-3 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-extrabold uppercase tracking-wider text-rose-700">
            ${window._RESET_MODAL_MODE === "CLEAR_LEDGER" ? "PERMANENT FULL-MOCK LEDGER PURGE DECLARATION" : "ABORT SESSION WITHOUT SUBMISSION & RESET DECLARATION"}
          </span>
          <button type="button" onclick="window._RESET_MODAL_MODE=null; window.renderScienceTab4();" class="text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer">Cancel &times;</button>
        </div>
        <label class="flex items-start gap-2.5 text-xs font-semibold text-rose-950 cursor-pointer">
          <input id="cbt-reset-decl-chk" type="checkbox" class="mt-0.5 w-4 h-4 accent-rose-600" />
          <span>${window._RESET_MODAL_MODE === "CLEAR_LEDGER"
            ? "I declare that I wish to permanently erase all verified Full-Length Mock records and Tab 6 calibration history from this browser."
            : "I declare that I am aborting Serial ID " + window._MOCK_SERIAL_ID + " without final submission. Because only complete Full-Length Mocks are calibrated, this aborted attempt will NOT be logged or synced to Tab 6."}</span>
        </label>
        <div class="flex gap-2">
          <button type="button" onclick="window.confirmResetWithDeclaration();" class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold cursor-pointer">Confirm &amp; Execute Reset</button>
          <button type="button" onclick="window._RESET_MODAL_MODE=null; window.renderScienceTab4();" class="px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold cursor-pointer">Keep Current Session</button>
        </div>
      </div>
    ` : "";

    const ledgerHtml = `
      <div class="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div class="text-xs font-extrabold uppercase tracking-wider text-${accent}-600">VERIFIED FULL-MOCK ASSESSMENT LEDGER (COMPLETE ${REQUIRED_QS}-Q SUBMISSIONS ONLY)</div>
            <h3 class="text-xl font-extrabold text-slate-900 mt-0.5">Serial Mock ID &amp; Verified Present Standing (${logs.length} Full Mocks Logged)</h3>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <button type="button" onclick="window.applySyncedMockToTab6(); window.selectUnifiedTab(6);"
              class="px-4 py-2 rounded-xl bg-${accent}-50 hover:bg-${accent}-100 border border-${accent}-200 text-${accent}-700 text-xs font-extrabold cursor-pointer">
              View Present Forecast in Tab 6 &rarr;
            </button>
            <button type="button" onclick="window.openResetDeclarationModal('CLEAR_LEDGER');"
              class="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-extrabold cursor-pointer">
              Clear Log
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500">
                <th class="py-2.5 pr-3">SERIAL MOCK ID</th>
                <th class="py-2.5 pr-3">DATE &amp; TIME</th>
                <th class="py-2.5 pr-3">FULL EXAM BLUEPRINT</th>
                <th class="py-2.5 pr-3">VERIFIED SCORE</th>
                <th class="py-2.5 pr-3">ACCURACY</th>
                <th class="py-2.5">MARKSHEET &amp; TAB 6 SYNC</th>
              </tr>
            </thead>
            <tbody>
              ${!logs.length ? `
                <tr><td colspan="6" class="py-4 text-slate-500">No full-length mocks submitted yet. Partial exits and short drills are excluded so your Tab 6 Rank/Percentile forecast reflects only true ${REQUIRED_QS}-question exam performance.</td></tr>
              ` : logs.map(lg => `
                <tr class="border-b border-slate-100">
                  <td class="py-3 pr-3 font-mono font-extrabold text-slate-900">${lg.sessionId}</td>
                  <td class="py-3 pr-3 text-slate-600">${lg.timestamp}</td>
                  <td class="py-3 pr-3 font-semibold text-slate-800">${lg.blueprint}<div class="text-[10px] font-bold text-emerald-700">VERIFIED FULL SUBMISSION</div></td>
                  <td class="py-3 pr-3 font-black text-slate-900">${lg.totalScore} / ${lg.maxScore}</td>
                  <td class="py-3 pr-3 font-bold text-slate-700">${lg.accuracy || "0.0"}% <span class="text-slate-400">(${lg.counts || ""})</span></td>
                  <td class="py-3 flex flex-wrap gap-1.5">
                    <button type="button" onclick="window.downloadMockPdfReport('${lg.sessionId}');" class="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer">PDF Marksheet</button>
                    <button type="button" onclick="window.applySyncedMockToTab6('${lg.sessionId}'); window.selectUnifiedTab(6);" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer">&#8635; Sync Tab 6</button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // PRE-LAUNCH PROCTORED LOBBY
    if (!window._CBT_STARTED && !window._CBT_SUBMITTED) {
      target.innerHTML = `
        <div class="max-w-7xl mx-auto pt-4 pb-10 space-y-5">
          ${resetDeclarationBanner}
          <div class="bg-white border-2 border-${accent}-200 rounded-2xl p-6 space-y-5 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="space-y-1">
                <div class="flex flex-wrap items-center gap-2.5">
                  <span class="px-3 py-1 rounded-full bg-${accent}-100 text-${accent}-800 text-[11px] font-extrabold uppercase tracking-wider">
                    ${IS_JEE ? "FULL 300-MARK NTA CBT MOCK • READY TO LAUNCH" : "FULL 720-MARK NTA OMR MOCK • READY TO LAUNCH"}
                  </span>
                  <span class="text-xs font-mono font-bold text-slate-600">Next Serial ID: <strong>${window._MOCK_SERIAL_ID}</strong></span>
                </div>
                <h2 class="text-2xl font-black text-slate-900 pt-1">
                  ${IS_JEE ? "1. Full JEE Main Standard CBT Mock (75 Qs • 180 Mins)" : "1. Full NEET UG Compulsory OMR Mock (180 Qs • 180 Mins)"}
                </h2>
                <p class="text-xs text-slate-600">
                  Only complete ${REQUIRED_QS}-question official submissions are logged in the Assessment Ledger and calibrated in Tab 6. Short drills &amp; aborted runs never distort your rank forecast.
                </p>
              </div>

              <button type="button" onclick="window.launchProctoredMockSession();"
                class="px-6 py-3.5 rounded-2xl bg-${accent}-600 hover:bg-${accent}-500 text-white text-sm font-extrabold shadow-md cursor-pointer shrink-0">
                &#9654; Start Proctored Full Mock (180 Mins)
              </button>
            </div>

            <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div class="text-[10px] font-extrabold uppercase text-slate-400">FULL EXAM BLUEPRINT</div>
                <div class="text-base font-black text-slate-900 mt-0.5">${totalQs} Compulsory Qs</div>
              </div>
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div class="text-[10px] font-extrabold uppercase text-slate-400">PROCTORED CLOCK</div>
                <div class="text-base font-black text-amber-600 mt-0.5">180:00 Minutes (Paused)</div>
              </div>
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div class="text-[10px] font-extrabold uppercase text-slate-400">LEDGER CALIBRATION</div>
                <div class="text-base font-black text-indigo-700 mt-0.5">Full Submissions Only</div>
              </div>
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div class="text-[10px] font-extrabold uppercase text-slate-400">POSTGRESQL LIVE BANK</div>
                <div class="text-base font-black text-emerald-600 mt-0.5">${window._SCI_QUESTIONS.length} Live DB Items Loaded</div>
              </div>
            </div>

            <label class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input id="cbt-launch-decl" type="checkbox" checked class="mt-0.5 w-4 h-4 accent-${accent}-600" />
              <span><strong>Candidate Honor-Code Declaration:</strong> I confirm that I am attempting Serial ID <strong>${window._MOCK_SERIAL_ID}</strong> as a full ${REQUIRED_QS}-question NTA mock under proctored conditions (+4/-1) to calibrate my true present standing in Tab 6.</span>
            </label>
          </div>

          ${ledgerHtml}
        </div>
      `;
      return;
    }

    // ACTIVE OR SUBMITTED FULL MOCK WORKSPACE
    const qIdx = Math.min(totalQs - 1, Math.max(0, Number(window._CBT_IDX || 0)));
    window._CBT_VISITED[qIdx] = true;
    const q = paper[qIdx];
    const activeSubj = q.mock_subj;

    const h = String(Math.floor(window._CBT_SEC_LEFT / 3600)).padStart(2, "0");
    const m = String(Math.floor((window._CBT_SEC_LEFT % 3600) / 60)).padStart(2, "0");
    const s = String(window._CBT_SEC_LEFT % 60).padStart(2, "0");

    const evalRes = window._CBT_SUBMITTED ? evaluateMockPaper(paper) : null;
    const subjTabs = IS_JEE
      ? [["PHYSICS", 0, 25], ["CHEMISTRY", 25, 25], ["MATHEMATICS", 50, 25]]
      : [["PHYSICS", 0, 45], ["CHEMISTRY", 45, 45], ["BOTANY", 90, 45], ["ZOOLOGY", 135, 45]];

    target.innerHTML = `
      <div class="max-w-7xl mx-auto pt-4 pb-10 space-y-4">
        ${resetDeclarationBanner}

        <div class="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-300 font-mono text-xs font-extrabold text-slate-800">
              Serial ID: ${window._MOCK_SERIAL_ID}
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
              <button type="button" onclick="window.openResetDeclarationModal('EXIT_SESSION');"
                class="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-700 text-xs font-extrabold cursor-pointer">Abort &amp; Reset (Do Not Log)</button>
              <button type="button" onclick="window.submitMockAndSync();"
                class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-sm cursor-pointer">Submit Full Mock &amp; Sync Tab 6</button>
            ` : `
              <button type="button" onclick="window.downloadMockPdfReport('${window._MOCK_SERIAL_ID}');"
                class="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-sm cursor-pointer">Download Full PDF Marksheet</button>
              <button type="button" onclick="window.applySyncedMockToTab6('${window._MOCK_SERIAL_ID}'); window.selectUnifiedTab(6);"
                class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-sm cursor-pointer">View Present Standing in Tab 6 &rarr;</button>
              <button type="button" onclick="window.startFreshMockReset();"
                class="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-extrabold cursor-pointer">New Full Mock Session</button>
            `}
          </div>
        </div>

        ${window._CBT_SUBMITTED && evalRes ? `
          <div class="bg-white border-2 border-emerald-500 rounded-2xl p-6 space-y-4 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div class="text-xs font-extrabold uppercase text-emerald-700">VERIFIED FULL-MOCK SCORECARD &bull; SERIAL ${window._MOCK_SERIAL_ID} &bull; CALIBRATED IN TAB 6</div>
                <h3 class="text-2xl font-black text-slate-900">Total Score: ${evalRes.totalScore} / ${MAX_MARKS} &bull; ${evalRes.projection}</h3>
              </div>
              <div class="text-xs font-bold text-slate-600">Accuracy: <span class="text-indigo-700 font-extrabold">${evalRes.accuracy}%</span> &bull; Pace: <span class="font-extrabold">${evalRes.pacePerQ}</span></div>
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

        ${ledgerHtml}
      </div>
    `;
  };

  window._T6_MODE = window._T6_MODE || "VERIFIED"; // "VERIFIED" or "WHATIF"

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
        window._T6_SYNCED_ID = rec.sessionId;
        window._T6_MODE = "VERIFIED";
        return true;
      }
      if (!IS_JEE && rec.subjects.PHYSICS && rec.subjects.CHEMISTRY && rec.subjects.BOTANY && rec.subjects.ZOOLOGY) {
        window._T6_NEET.p = Math.max(0, Number(rec.subjects.PHYSICS.s) || 0);
        window._T6_NEET.c = Math.max(0, Number(rec.subjects.CHEMISTRY.s) || 0);
        window._T6_NEET.b = Math.max(0, Number(rec.subjects.BOTANY.s) || 0);
        window._T6_NEET.z = Math.max(0, Number(rec.subjects.ZOOLOGY.s) || 0);
        window._T6_SYNCED_ID = rec.sessionId;
        window._T6_MODE = "VERIFIED";
        return true;
      }
    } catch (_) {}
    return false;
  };


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
    window._T6_MODE = "WHATIF";
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
            <div class="flex items-start justify-between gap-2">
              <div>
                <div class="text-xs font-extrabold uppercase tracking-wider text-${accent}-600">${IS_JEE ? "NTA JEE MAIN & ADVANCED CALIBRATOR" : "NTA NEET UG 720-MARK CALIBRATOR"}</div>
                <h2 class="text-xl font-extrabold text-slate-900 mt-0.5">${IS_JEE ? "Subject Marks & Shift Simulator" : "PCB Subject Marks & AIR Simulator"}</h2>
                <div class="text-[11px] font-semibold text-emerald-700 mt-1">Synced with Tab 4 Mock Ledger (Adjust sliders or click Sync Mock)</div>
              </div>
              <button type="button" onclick="if(window.applySyncedMockToTab6()){ window.renderScienceTab6(); } else { alert('No submitted Tab 4 mock found in ledger yet. Submit a Tab 4 mock first.'); }"
                class="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-sm cursor-pointer shrink-0">
                &#8635; Sync Mock
              </button>
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

            ${(() => {
              const vLogs = getVerifiedFullMockLogs();
              const avgScore = vLogs.length ? Math.round(vLogs.reduce((a, b) => a + Number(b.totalScore || 0), 0) / vLogs.length) : null;
              const bestScore = vLogs.length ? Math.max(...vLogs.map(b => Number(b.totalScore || 0))) : null;
              if (!vLogs.length) {
                return `<div id="t6-sync-pill" class="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 flex flex-wrap items-center justify-between gap-2">
                  <span><strong>Present Standing Uncalibrated:</strong> 0 Full ${REQUIRED_QS}-Q Mocks submitted yet. Currently previewing What-If Sandbox.</span>
                  <button type="button" onclick="window.selectUnifiedTab(4);" class="px-3 py-1 rounded-lg bg-amber-600 text-white font-extrabold cursor-pointer">Take Full Mock in Tab 4 &rarr;</button>
                </div>`;
              }
              return `<div id="t6-sync-pill" class="p-3.5 rounded-xl ${window._T6_MODE === "VERIFIED" ? "bg-emerald-50 border-emerald-300 text-emerald-950" : "bg-indigo-50 border-indigo-300 text-indigo-950"} border text-xs space-y-1">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <span>${window._T6_MODE === "VERIFIED"
                    ? `<strong>&#10003; Verified Present Level:</strong> Calibrated from Full Mock <strong>${window._T6_SYNCED_ID}</strong>`
                    : `<strong>What-If Target Sandbox:</strong> Comparing target against Full Mock <strong>${window._T6_SYNCED_ID}</strong>`}</span>
                  ${window._T6_MODE !== "VERIFIED"
                    ? `<button type="button" onclick="window.applySyncedMockToTab6(); window.renderScienceTab6();" class="underline font-extrabold cursor-pointer">Restore Present Level</button>`
                    : `<span class="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-extrabold">OFFICIAL STANDING</span>`}
                </div>
                <div class="text-[11px] opacity-90">Full Mocks Completed: <strong>${vLogs.length}</strong> &bull; Rolling Average: <strong>${avgScore}/${MAX_MARKS}</strong> &bull; Best Full Mock: <strong>${bestScore}/${MAX_MARKS}</strong></div>
              </div>`;
            })()}
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
