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
  // TAB 4: FULL 180-QUESTION / 720-MARK NEET UG OMR MOCK SIMULATOR (NO SECTION B)
  // ============================================================================
  window._NOMR_IDX = 0;
  window._NOMR_ANS = {};
  window._NOMR_REVIEW = {};
  window._NOMR_VISITED = { 0: true };
  window._NOMR_SUBMITTED = false;
  window._NOMR_SEC_LEFT = 180 * 60;
  window._NOMR_TIMER_ID = window._NOMR_TIMER_ID || null;

  function build180NeetPaper() {
    const sections = [
      ["PHYSICS", 45],
      ["CHEMISTRY", 45],
      ["BOTANY", 45],
      ["ZOOLOGY", 45]
    ];
    const paper = [];
    sections.forEach(([subj, count]) => {
      const pool = window._SCI_QUESTIONS.filter(q => q.subject === subj && Array.isArray(q.options_json) && q.options_json.length >= 4);
      for (let i = 0; i < count; i++) {
        const base = pool[i % Math.max(1, pool.length)];
        if (base) paper.push({ ...base, omr_subj: subj });
      }
    });
    return paper;
  }

  function ensureNeetTimer() {
    if (window._NOMR_TIMER_ID) return;
    window._NOMR_TIMER_ID = setInterval(() => {
      if (window._NOMR_SUBMITTED) return;
      const el = document.getElementById("nomr-clock");
      if (!el) return;
      if (window._NOMR_SEC_LEFT > 0) window._NOMR_SEC_LEFT--;
      const h = String(Math.floor(window._NOMR_SEC_LEFT / 3600)).padStart(2, "0");
      const m = String(Math.floor((window._NOMR_SEC_LEFT % 3600) / 60)).padStart(2, "0");
      const s = String(window._NOMR_SEC_LEFT % 60).padStart(2, "0");
      el.textContent = `${h}:${m}:${s}`;
    }, 1000);
  }

  window.renderScienceTab4 = async function (el) {
    enforceScienceBrand();
    const target = getTarget(el);
    if (!target) return;
    await hydrateFromNeon();
    ensureNeetTimer();

    const paper = build180NeetPaper();
    if (!paper.length) {
      target.innerHTML = `<div class="p-8 text-center text-sm font-bold text-slate-500">Assembling 180-Question / 720-Mark NEET Paper from Neon...</div>`;
      return;
    }

    const qIdx = Math.min(paper.length - 1, Math.max(0, Number(window._NOMR_IDX || 0)));
    window._NOMR_VISITED[qIdx] = true;
    const q = paper[qIdx];
    const activeSubj = q.omr_subj;

    const h = String(Math.floor(window._NOMR_SEC_LEFT / 3600)).padStart(2, "0");
    const m = String(Math.floor((window._NOMR_SEC_LEFT % 3600) / 60)).padStart(2, "0");
    const s = String(window._NOMR_SEC_LEFT % 60).padStart(2, "0");

    let totalScore = 0, totalCorrect = 0, totalWrong = 0;
    const subjStats = {
      PHYSICS: { c: 0, w: 0, s: 0 },
      CHEMISTRY: { c: 0, w: 0, s: 0 },
      BOTANY: { c: 0, w: 0, s: 0 },
      ZOOLOGY: { c: 0, w: 0, s: 0 }
    };
    if (window._NOMR_SUBMITTED) {
      paper.forEach((item, idx) => {
        const ans = window._NOMR_ANS[idx];
        if (ans !== undefined && String(ans) !== "") {
          if (String(ans) === String(item.correct_answer)) {
            totalScore += 4; totalCorrect++;
            subjStats[item.omr_subj].c++; subjStats[item.omr_subj].s += 4;
          } else {
            totalScore -= 1; totalWrong++;
            subjStats[item.omr_subj].w++; subjStats[item.omr_subj].s -= 1;
          }
        }
      });
    }

    const airEst = totalScore >= 695 ? "AIR < 350 (AIIMS New Delhi / MAMC)"
      : totalScore >= 660 ? "AIR ~3,200 (Top State Govt Medical College)"
      : totalScore >= 625 ? "AIR ~14,500 (Govt MBBS All-India Quota)"
      : totalScore >= 560 ? "AIR ~48,000 (State Quota / Semi-Govt MBBS)"
      : "Target 345+ in Biology to unlock 640+";

    target.innerHTML = `
      <div class="max-w-7xl mx-auto pt-4 pb-10 space-y-4">
        <!-- NTA NEET UG 180-Q Top Strip -->
        <div class="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div class="flex flex-wrap items-center gap-2">
            ${[["PHYSICS", 0], ["CHEMISTRY", 45], ["BOTANY", 90], ["ZOOLOGY", 135]].map(([subName, startIdx]) => `
              <button type="button" onclick="window._NOMR_IDX=${startIdx}; window.renderScienceTab4();"
                class="px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer ${activeSubj === subName ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}">
                ${subName} (45 Qs)
              </button>
            `).join("")}
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <div class="px-3.5 py-1.5 rounded-xl bg-slate-900 text-amber-300 font-mono text-sm font-extrabold">
              Time Left: <span id="nomr-clock">${h}:${m}:${s}</span>
            </div>
            ${!window._NOMR_SUBMITTED ? `
              <button type="button" onclick="window._NOMR_SUBMITTED=true; window.renderScienceTab4();"
                class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-sm cursor-pointer">Submit 180-Q OMR Sheet</button>
            ` : `
              <button type="button" onclick="window._NOMR_ANS={}; window._NOMR_REVIEW={}; window._NOMR_VISITED={0:true}; window._NOMR_SUBMITTED=false; window._NOMR_SEC_LEFT=10800; window._NOMR_IDX=0; window.renderScienceTab4();"
                class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-extrabold cursor-pointer">Retake Fresh 720-Mark Mock</button>
            `}
          </div>
        </div>

        ${window._NOMR_SUBMITTED ? `
          <div class="bg-white border-2 border-emerald-500 rounded-2xl p-6 space-y-4 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div class="text-xs font-extrabold uppercase text-emerald-700">OFFICIAL NTA NEET UG 720-MARK SCORECARD</div>
                <h3 class="text-2xl font-black text-slate-900">Total Score: ${totalScore} / 720 &bull; ${airEst}</h3>
              </div>
              <div class="text-xs font-bold text-slate-600">Correct: <span class="text-emerald-700 font-extrabold">${totalCorrect} (+${totalCorrect * 4})</span> &bull; Incorrect: <span class="text-rose-700 font-extrabold">${totalWrong} (-${totalWrong})</span></div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              ${["PHYSICS", "CHEMISTRY", "BOTANY", "ZOOLOGY"].map(sn => `
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="font-extrabold text-emerald-700">${sn}</div>
                  <div class="text-lg font-black text-slate-900 mt-0.5">${subjStats[sn].s} / 180</div>
                  <div class="text-slate-600 mt-0.5">Correct: ${subjStats[sn].c} &bull; Wrong: ${subjStats[sn].w}</div>
                </div>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Main OMR Question + 180-Bubble Palette -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div class="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span class="text-xs font-extrabold uppercase text-emerald-600">Question ${qIdx + 1} of 180 (Compulsory) &bull; ${q.omr_subj}</span>
                <div class="text-[11px] text-slate-500">Code: ${q.question_code} &bull; Chapter: ${q.chapter_name}</div>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">+4 Correct / -1 Incorrect</span>
            </div>

            <div class="text-sm font-bold text-slate-900 leading-relaxed whitespace-pre-line min-h-[90px]">${q.prompt}</div>

            <!-- Interactive OMR Bubble Strip -->
            <div class="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 flex flex-wrap items-center justify-between gap-3">
              <span class="text-xs font-extrabold uppercase tracking-wider text-rose-800">OMR Response Bubble (Q.${qIdx + 1}):</span>
              <div class="flex items-center gap-3">
                ${[0, 1, 2, 3].map(oi => {
                  const isFilled = String(window._NOMR_ANS[qIdx]) === String(oi);
                  return `
                    <button type="button" onclick="window._NOMR_ANS[${qIdx}]='${oi}'; window.renderScienceTab4();"
                      class="w-9 h-9 rounded-full border-2 font-black text-xs flex items-center justify-center transition cursor-pointer ${isFilled ? "bg-slate-900 border-slate-900 text-white scale-105 shadow" : "bg-white border-rose-400 text-rose-700 hover:bg-rose-100"}">
                      ${String.fromCharCode(65 + oi)}
                    </button>
                  `;
                }).join("")}
              </div>
            </div>

            <div class="grid grid-cols-1 gap-2.5 text-xs pt-1">
              ${(q.options_json || []).map((opt, oi) => {
                const selected = String(window._NOMR_ANS[qIdx]) === String(oi);
                return `
                  <button type="button" onclick="window._NOMR_ANS[${qIdx}]='${oi}'; window.renderScienceTab4();"
                    class="text-left p-3.5 rounded-xl border transition cursor-pointer ${selected ? "bg-emerald-600 text-white border-emerald-600 font-bold shadow-sm" : "bg-slate-50 border-slate-200 hover:border-emerald-400 text-slate-900"}">
                    <strong>(${String.fromCharCode(65 + oi)})</strong> ${opt}
                  </button>
                `;
              }).join("")}
            </div>

            ${window._NOMR_SUBMITTED ? `
              <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                <strong>Official Answer:</strong> (${String.fromCharCode(65 + Number(q.correct_answer))}) ${q.options_json ? q.options_json[Number(q.correct_answer)] : q.correct_answer}<br/>
                <strong>NCERT Explanation:</strong> ${q.explanation}
              </div>
            ` : ""}

            <div class="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-slate-100">
              <div class="flex flex-wrap gap-2">
                <button type="button" onclick="if(window._NOMR_IDX<179) window._NOMR_IDX++; window.renderScienceTab4();"
                  class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold cursor-pointer">Save &amp; Next</button>
                <button type="button" onclick="window._NOMR_REVIEW[${qIdx}]=true; if(window._NOMR_IDX<179) window._NOMR_IDX++; window.renderScienceTab4();"
                  class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold cursor-pointer">Mark for Review &amp; Next</button>
                <button type="button" onclick="delete window._NOMR_ANS[${qIdx}]; delete window._NOMR_REVIEW[${qIdx}]; window.renderScienceTab4();"
                  class="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold cursor-pointer">Clear Bubble</button>
              </div>
              <div class="flex gap-1.5">
                <button type="button" onclick="if(window._NOMR_IDX>0){window._NOMR_IDX--; window.renderScienceTab4();}" class="px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer">&larr; Prev</button>
                <button type="button" onclick="if(window._NOMR_IDX<179){window._NOMR_IDX++; window.renderScienceTab4();}" class="px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer">Next &rarr;</button>
              </div>
            </div>
          </div>

          <!-- Right 180-Question OMR Sheet Palette -->
          <div class="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
            <div class="text-xs font-extrabold uppercase tracking-wider text-slate-700">NTA NEET 180-Q OMR PALETTE</div>
            <div class="grid grid-cols-2 gap-2 text-[11px] font-bold">
              <div class="flex items-center gap-1.5"><span class="w-3.5 h-3.5 rounded-full bg-emerald-600 inline-block"></span> Bubbled (${Object.keys(window._NOMR_ANS).length}/180)</div>
              <div class="flex items-center gap-1.5"><span class="w-3.5 h-3.5 rounded-full bg-purple-600 inline-block"></span> Marked (${Object.keys(window._NOMR_REVIEW).length})</div>
              <div class="flex items-center gap-1.5"><span class="w-3.5 h-3.5 rounded-full bg-rose-500 inline-block"></span> Skipped</div>
              <div class="flex items-center gap-1.5"><span class="w-3.5 h-3.5 rounded-full bg-slate-200 inline-block"></span> Unvisited</div>
            </div>

            <div class="max-h-[380px] overflow-y-auto pr-1 grid grid-cols-6 gap-1.5">
              ${paper.map((_, idx) => {
                const hasAns = window._NOMR_ANS[idx] !== undefined;
                const isRev = !!window._NOMR_REVIEW[idx];
                const isVis = !!window._NOMR_VISITED[idx];
                let cls = "bg-slate-100 text-slate-700 border-slate-300";
                if (isRev) cls = "bg-purple-600 text-white border-purple-600";
                else if (hasAns) cls = "bg-emerald-600 text-white border-emerald-600";
                else if (isVis) cls = "bg-rose-500 text-white border-rose-500";
                if (idx === qIdx) cls += " ring-2 ring-emerald-500 ring-offset-1";
                return `<button type="button" onclick="window._NOMR_IDX=${idx}; window.renderScienceTab4();" class="h-7 rounded-full text-[11px] font-extrabold border cursor-pointer ${cls}">${idx + 1}</button>`;
              }).join("")}
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // ============================================================================
  // TAB 5: TRAP DOCTOR & AI DOUBT SOLVER
  // ============================================================================
  window.renderScienceTab5 = function (el) {
    const target = getTarget(el);
    if (!target) return;
    target.innerHTML = `
      <div class="max-w-4xl mx-auto pt-4 pb-10">
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <div class="text-xs font-extrabold uppercase text-emerald-600">AI CONCEPT &amp; DERIVATION DOUBT TUTOR</div>
          <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">${TABS[4]}</h2>
          <p class="text-xs text-slate-600 dark:text-slate-300">Paste any ${IS_JEE ? "JEE Physics, Chemistry, or Mathematics" : "NEET Physics, Chemistry, Botany, or Zoology"} question or NCERT line below for a step-by-step derivation and trap check.</p>
          <textarea id="sci-doubt-q" rows="4" class="w-full rounded-2xl border border-slate-300 dark:border-slate-700 p-3.5 text-sm" placeholder="Enter your PCM/PCB problem or NCERT doubt..."></textarea>
          <button type="button" onclick="(async()=>{const box=document.getElementById('sci-doubt-out'); const q=document.getElementById('sci-doubt-q').value.trim(); if(!q)return; box.classList.remove('hidden'); box.textContent='Solving with GOALisB Science Tutor...'; try{const r=await fetch('/api/doubt',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q,exam:EXAM})}); const d=await r.json(); box.textContent=d.answer||d.response||JSON.stringify(d);}catch(e){box.textContent='Check connection and retry.';}})();"
            class="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold cursor-pointer">Solve Step-by-Step</button>
          <div id="sci-doubt-out" class="hidden p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border text-xs whitespace-pre-line leading-relaxed"></div>
        </div>
      </div>
    `;
  };

  // ============================================================================
  // TAB 6: JEE PERCENTILE / IIT-NIT FORECASTER OR NEET AIR / AIIMS-GMC FORECASTER
  // ============================================================================
  window.renderScienceTab6 = function (el) {
    const target = getTarget(el);
    if (!target) return;
    target.innerHTML = `
      <div class="max-w-4xl mx-auto pt-4 pb-10">
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <div class="text-xs font-extrabold uppercase text-emerald-600">${IS_JEE ? "NTA JEE MAIN PERCENTILE & IIT/NIT ADMISSION PREDICTOR" : "NTA NEET UG ALL INDIA RANK (AIR) & AIIMS/GMC PREDICTOR"}</div>
          <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">${TABS[5]}</h2>
          <div class="flex flex-wrap items-center gap-3">
            <input id="sci-score-in" type="number" min="0" max="${IS_JEE ? 300 : 720}" value="${IS_JEE ? 215 : 655}" class="rounded-xl border px-4 py-2 text-base font-extrabold w-40" />
            <button type="button" onclick="const s=Number(document.getElementById('sci-score-in').value||0); const out=document.getElementById('sci-rank-out'); out.innerHTML = ${IS_JEE} ? ('Projected JEE Main Percentile: <strong>' + (s>=250?'99.92+ %ile (Top NIT CSE / Adv AIR < 1500)':s>=210?'99.35 %ile (NIT Trichy/Surathkal Core)':s>=170?'98.10 %ile (Top IIIT / NIT)':'94.5+ %ile') + '</strong>') : ('Projected NEET UG Standing: <strong>' + (s>=695?'AIR < 350 (AIIMS New Delhi / MAMC)':s>=660?'AIR ~3,200 (Top State Govt Medical College)':s>=625?'AIR ~14,500 (Govt MBBS All-India Quota)':'Focus on NCERT Bio 345+ Sprint') + '</strong>');"
              class="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold cursor-pointer">Predict Rank &amp; Colleges</button>
          </div>
          <div id="sci-rank-out" class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-950">
            ${IS_JEE ? "Projected JEE Main Percentile: <strong>99.35 %ile (NIT Trichy / Surathkal / Warangal Core)</strong>" : "Projected NEET UG Standing: <strong>AIR ~3,800 (Top State Govt Medical College / AIIMS)</strong>"}
          </div>
        </div>
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
