// ==============================================================================
// GOALISB NEET UG MASTER — AUTHORITATIVE 12x12 NEON SUITE & BRAND HEADER
// ==============================================================================
(function () {
  const EXAM = "NEET";
  const MODES = [{'label': 'NEET UG Full 180-Q (720 Marks)', 'sub': '(NTA Standard)', 'sections': 'Physics (45 Qs) &bull; Chemistry (45 Qs) &bull; Botany (45 Qs) &bull; Zoology (45 Qs)'}, {'label': 'NCERT Line-by-Line Biology Vault', 'sub': '(360 Marks Core)', 'sections': 'Class 11 & 12 Botany + Zoology Verbatim NCERT Statements, Diagrams & Cycles'}, {'label': 'Assertion-Reason & Statement Clinic', 'sub': '(Trap Clinic)', 'sections': 'Statement I & II + Assertion-Reason Drills across Biology, Organic & Inorganic'}];
  const TABS = ['1. Physics, Chem & Biology (12x12)', '2. NCERT Line-by-Line Bio Vault', '3. Assertion-Reason Studio', '4. 180-Q / 720-Mark NEET Mock', '5. Trap Doctor & AI Doubts', '6. NEET AIR & AIIMS/GMC Forecaster'];

  function enforceScienceBrand() {
    document.title = "GOALisB NEET UG Master";
    document.querySelectorAll("*").forEach(el => {
      if (el.children.length === 0 && el.textContent) {
        const t = el.textContent.trim();
        if (t === "GRE") el.textContent = "NEET";
        else if (t === "GOALisB GRE Master") el.textContent = "GOALisB NEET UG Master";
        else if (t === "GRE GENERAL") el.textContent = "NEET UG MEDICAL";
        else if (t.startsWith("Quant (27 Qs")) el.innerHTML = `Physics (45 Qs &bull; 180m) &bull; Chemistry (45 Qs &bull; 180m) &bull; Biology: Botany &amp; Zoology (90 Qs &bull; 360m) &bull; 720 Marks Scale`;
        else if (t.startsWith("Exam Sections: Quant")) el.innerHTML = `Exam Sections: ${MODES[0].sections}`;
        else if (t.startsWith("Pattern: 54 Qs")) el.textContent = "Pattern: 180 Qs | 180 Mins (3 Hrs) | NTA OMR / CBT Scale";
        else if (t.startsWith("Marking: MCQ +1/0")) el.textContent = "Marking: All 180 Compulsory MCQs: +4 Correct | -1 Incorrect";
      }
    });

    // Replace mode buttons if GRE labels are still present
    document.querySelectorAll("button").forEach(btn => {
      const txt = (btn.textContent || "").trim();
      if (txt.includes("GRE General Standard")) {
        btn.innerHTML = `${MODES[0].label} <span class="opacity-80 font-normal">${MODES[0].sub}</span>`;
      } else if (txt.includes("Quant 170 Perfection")) {
        btn.innerHTML = `${MODES[1].label} <span class="opacity-80 font-normal">${MODES[1].sub}</span>`;
      } else if (txt.includes("Verbal 165+")) {
        btn.innerHTML = `${MODES[2].label} <span class="opacity-80 font-normal">${MODES[2].sub}</span>`;
      } else if (txt.startsWith("1. Quantitative Reasoning")) {
        btn.textContent = TABS[0];
      } else if (txt.startsWith("2. Data Interpretation")) {
        btn.textContent = TABS[1];
      } else if (txt.startsWith("3. Verbal Studio")) {
        btn.textContent = TABS[2];
      } else if (txt.startsWith("4. Section-Adaptive Mock")) {
        btn.textContent = TABS[3];
      } else if (txt.startsWith("5. Trap Doctor")) {
        btn.textContent = TABS[4];
      } else if (txt.startsWith("6. GRE Score Forecaster")) {
        btn.textContent = TABS[5];
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

  window.renderScienceMasterTab1 = async function (el) {
    enforceScienceBrand();
    const target = el || document.getElementById("main-workspace") || document.getElementById("tab-content") || document.querySelector("main");
    if (!target) return;
    await hydrateFromNeon();

    const mods = window._SCI_MODULES;
    if (!mods.length) {
      target.innerHTML = `<div class="p-8 text-center text-sm font-bold text-slate-500">Connecting to Neon PostgreSQL Science Bank...</div>`;
      return;
    }

    const modIdx = Math.min(mods.length - 1, Math.max(0, Number(window._SCI_MOD_IDX || 0)));
    const m = mods[modIdx];

    // Match drills strictly to the selected module prefix (e.g. PHY-11-ROT, PHY-12-ELC, CHM-11-EQM, BIO-12-GEN)
    const modPrefix = String(m.module_code || "").replace(/-MOD$/, "");
    let drills = window._SCI_QUESTIONS.filter(q => String(q.question_code || "").startsWith(modPrefix));
    if (!drills.length) {
      drills = window._SCI_QUESTIONS.filter(q => q.subject === m.subject && Number(q.ncert_class) === Number(m.ncert_class));
    }
    if (!drills.length) {
      drills = window._SCI_QUESTIONS.filter(q => q.subject === m.subject);
    }

    const qIdx = Math.min(Math.max(0, drills.length - 1), Math.max(0, Number(window._SCI_QIDX || 0)));
    const d = drills[qIdx];
    const attMap = window._SCI_ATT[modIdx] || {};

    target.innerHTML = `
      <div class="max-w-7xl mx-auto pt-4 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div class="lg:col-span-4 space-y-2.5">
          <div class="text-xs font-extrabold uppercase tracking-wider text-emerald-600">NEET PCB MODULES (6 CHAPTERS • 12x12 NEON BANK)</div>
          ${mods.map((item, idx) => `
            <button type="button" onclick="window._SCI_MOD_IDX=${idx}; window._SCI_QIDX=0; window.renderScienceMasterTab1();"
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
            <button type="button" onclick="window._SCI_SUB='THEORY'; window.renderScienceMasterTab1();"
              class="px-4 py-2 rounded-full text-xs font-bold cursor-pointer ${window._SCI_SUB === "THEORY" ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"}">
              NCERT Master Guide & 12 Worked Examples (${m.worked_examples.length})
            </button>
            <button type="button" onclick="window._SCI_SUB='DRILLS'; window.renderScienceMasterTab1();"
              class="px-4 py-2 rounded-full text-xs font-bold cursor-pointer ${window._SCI_SUB === "DRILLS" ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"}">
              Practice Drills (${drills.length} Items &bull; +4 / -1)
            </button>
          </div>

          ${window._SCI_SUB === "THEORY" ? `
            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
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
                    <button type="button" onclick="window._SCI_QIDX=${i}; window.renderScienceMasterTab1();"
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
                  <button type="button" onclick="if(window._SCI_QIDX>0){window._SCI_QIDX--; window.renderScienceMasterTab1();}" class="px-3.5 py-1.5 rounded-xl border text-xs font-bold cursor-pointer">&larr; Previous</button>
                  <button type="button" onclick="if(window._SCI_QIDX<${drills.length - 1}){window._SCI_QIDX++; window.renderScienceMasterTab1();}" class="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer">Next Question &rarr;</button>
                </div>
              </div>
            </div>
          ` : `<div class="text-xs text-slate-500">Loading items...</div>`)}
        </div>
      </div>
    `;
  };

  // Override all Tab 1 entry points so tab1_mastery.js never overwrites with GRE
  window.renderTab1 = window.renderScienceMasterTab1;
  window.renderQuantTab = window.renderScienceMasterTab1;
  window.addEventListener("DOMContentLoaded", () => {
    enforceScienceBrand();
    setTimeout(() => { enforceScienceBrand(); window.renderScienceMasterTab1(); }, 120);
    setTimeout(() => { enforceScienceBrand(); window.renderScienceMasterTab1(); }, 450);
  });
})();
