(function () {
  const FALLBACK_MODULES = [
    {
      module_code: "BIO-12-GEN-MOD",
      subject: "BOTANY",
      ncert_class: 12,
      chapter_title: "Molecular Basis of Inheritance: DNA Replication, Transcription & Lac Operon",
      subtitle: "Highest Biology Yield • 5–7 Qs in NEET UG",
      weightage_label: "12–15% of Botany",
      target_pace: "35 secs / Question",
      strategy_tag: "NCERT Verbatim Polarity (5'->3') & Operon Regulation",
      overview: "Molecular Basis of Inheritance (NCERT Class 12, Chapter 6) routinely contributes 5 to 7 direct questions in NEET UG. Every question hinges on exact enzyme specificity (DNA-dependent DNA polymerase always polymerizes in 5' -> 3' direction) and Jacob & Monod's Lac Operon negative regulation.",
      concept_bridge: "In the Lac Operon, lactose (allolactose) acts as the inducer by binding and inactivating the repressor protein encoded by the i-gene, permitting RNA polymerase to transcribe z (beta-galactosidase), y (permease), and a (transacetylase).",
      laws: [
        { name: "Rule 1: Strict 5' -> 3' Polymerization Polarity", desc: "All DNA and RNA polymerases catalyze synthesis exclusively in the 5' -> 3' direction (reading template 3' -> 5')." },
        { name: "Rule 2: Basal Lac Operon Expression", desc: "A low basal level of lac operon expression is always present so permease exists on the membrane to import lactose." }
      ],
      worked_examples: [
        { tier: "FOUNDATION", p: "1. Which enzyme joins Okazaki fragments on the discontinuous lagging strand?", s: "1. DNA Ligase forms phosphodiester bonds between adjacent Okazaki fragments." },
        { tier: "CONTENDER_98_650", p: "2. What happens to lac operon transcription if a nonsense mutation occurs in the lacY gene?", s: "1. Beta-galactosidase (lacZ) is still synthesized, but lactose cannot enter the cell due to non-functional permease." }
      ]
    }
  ];
  const FALLBACK_QUESTIONS = [];
  window._NEET_MODULES = FALLBACK_MODULES;
  window._NEET_QUESTIONS = FALLBACK_QUESTIONS;
  window._NEET_HYDRATED = false;
  window._NEET_MOD_IDX = 0;
  window._NEET_SUB = "THEORY";
  window._NEET_QIDX = 0;
  window._NEET_ATT = {};

  async function hydrateNeetFromNeon() {
    if (window._NEET_HYDRATED) return;
    window._NEET_HYDRATED = true;
    try {
      const [mRes, qRes] = await Promise.all([
        fetch("/api/science/modules?exam=NEET"),
        fetch("/api/science/questions?exam=NEET&limit=500")
      ]);
      if (mRes.ok) {
        const md = await mRes.json();
        if (md.ok && Array.isArray(md.modules) && md.modules.length) {
          window._NEET_MODULES = md.modules.map(m => ({
            ...m,
            laws: typeof m.laws_json === "string" ? JSON.parse(m.laws_json) : (m.laws_json || []),
            worked_examples: typeof m.worked_examples_json === "string" ? JSON.parse(m.worked_examples_json) : (m.worked_examples_json || [])
          }));
        }
      }
      if (qRes.ok) {
        const qd = await qRes.json();
        if (qd.ok && Array.isArray(qd.questions) && qd.questions.length) {
          window._NEET_QUESTIONS = qd.questions.map(q => ({
            ...q,
            options_json: typeof q.options_json === "string" ? JSON.parse(q.options_json) : q.options_json
          }));
        }
      }
    } catch (_) {}
  }

  window.renderNeetMasterTab1 = async function (el) {
    const target = el || document.getElementById("main-workspace") || document.getElementById("tab-content");
    if (!target) return;
    await hydrateNeetFromNeon();

    const mods = window._NEET_MODULES;
    const modIdx = Math.min(mods.length - 1, Math.max(0, Number(window._NEET_MOD_IDX || 0)));
    const m = mods[modIdx];
    const subjQs = window._NEET_QUESTIONS.filter(q => q.subject === m.subject);
    const drills = subjQs.length ? subjQs : window._NEET_QUESTIONS;
    const qIdx = Math.min(Math.max(0, drills.length - 1), Math.max(0, Number(window._NEET_QIDX || 0)));
    const d = drills[qIdx];
    const attMap = window._NEET_ATT[modIdx] || {};

    target.innerHTML = `
      <div class="max-w-7xl mx-auto pt-4 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div class="lg:col-span-4 space-y-2.5">
          <div class="text-xs font-extrabold uppercase tracking-wider text-emerald-700">NEET PCB MODULES (NEON SHARED SCIENCE BANK)</div>
          ${mods.map((item, idx) => `
            <button type="button" onclick="window._NEET_MOD_IDX=${idx}; window._NEET_QIDX=0; window.renderNeetMasterTab1();"
              class="w-full text-left p-4 rounded-2xl border transition cursor-pointer ${idx === modIdx
                ? "bg-emerald-50/90 dark:bg-emerald-950/50 border-emerald-500 shadow-sm"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300"}">
              <div class="text-[10px] font-extrabold uppercase text-emerald-700">${item.subject} &bull; NCERT CLASS ${item.ncert_class}</div>
              <div class="font-extrabold text-sm text-slate-900 dark:text-white leading-snug mt-0.5">${item.chapter_title}</div>
              <div class="text-xs text-slate-500 mt-1">${item.subtitle}</div>
            </button>
          `).join("")}
        </div>
        <div class="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
          <span class="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">${m.subject} &bull; NCERT CLASS ${m.ncert_class}</span>
          <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">${m.chapter_title}</h2>
          <div class="flex flex-wrap items-center gap-2">
            <button type="button" onclick="window._NEET_SUB='THEORY'; window.renderNeetMasterTab1();"
              class="px-4 py-2 rounded-full text-xs font-bold cursor-pointer ${window._NEET_SUB === "THEORY" ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"}">
              NCERT Master Guide &amp; Worked Examples (${m.worked_examples.length})
            </button>
            <button type="button" onclick="window._NEET_SUB='DRILLS'; window.renderNeetMasterTab1();"
              class="px-4 py-2 rounded-full text-xs font-bold cursor-pointer ${window._NEET_SUB === "DRILLS" ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"}">
              NEET NCERT &amp; A-R Drills (${drills.length} Items • +4 / -1)
            </button>
          </div>
          ${window._NEET_SUB === "THEORY" ? `
            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <div class="font-extrabold uppercase text-[11px] text-emerald-700">NCERT LINE-BY-LINE OVERVIEW &amp; CONCEPT BRIDGE</div>
              <p>${m.overview}</p>
              <p><strong>Concept Bridge:</strong> ${m.concept_bridge}</p>
            </div>
            <div class="space-y-2">
              ${m.laws.map(r => `<div class="p-3.5 rounded-xl border bg-white dark:bg-slate-950 text-xs"><div class="font-extrabold">${r.name}</div><div class="text-slate-600 dark:text-slate-300 mt-0.5">${r.desc}</div></div>`).join("")}
            </div>
            <div class="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-3">
              <div class="text-xs font-extrabold uppercase text-emerald-800 dark:text-emerald-300">GRADED NEET WORKED EXAMPLES (${m.worked_examples.length} SOLVED)</div>
              ${m.worked_examples.map(w => `<div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5"><div class="font-extrabold text-slate-900 dark:text-white">${w.p}</div><div class="text-slate-600 dark:text-slate-300 whitespace-pre-line">${w.s}</div></div>`).join("")}
            </div>
          ` : (d ? `
            <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="text-xs font-extrabold uppercase tracking-wider text-emerald-700">INTERACTIVE NEET PRACTICE WORKBENCH (${drills.length} ITEMS)</div>
                <div class="flex flex-wrap gap-1.5">
                  ${drills.map((_, i) => `<button type="button" onclick="window._NEET_QIDX=${i}; window.renderNeetMasterTab1();" class="w-7 h-7 rounded-lg text-xs font-bold border cursor-pointer ${i === qIdx ? "bg-emerald-600 text-white border-emerald-600" : (attMap[i] ? "bg-emerald-500 text-white border-emerald-500" : "bg-white dark:bg-slate-900 border-slate-300")}">${i + 1}</button>`).join("")}
                </div>
              </div>
              <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div class="text-xs font-extrabold text-emerald-700">${d.question_code} &bull; ${d.question_type} (+4 / -1)</div>
                <div class="text-sm font-bold text-slate-900 dark:text-white leading-relaxed whitespace-pre-line">${d.prompt}</div>
                <div class="grid grid-cols-1 gap-2 text-xs">
                  ${(d.options_json || []).map((opt, oi) => `<button type="button" onclick="const ok=(String(${oi})==='${d.correct_answer}'); window._NEET_ATT[${modIdx}]=window._NEET_ATT[${modIdx}]||{}; window._NEET_ATT[${modIdx}][${qIdx}]=ok; document.getElementById('neet-t1-sol').classList.remove('hidden'); this.classList.add(ok ? 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold' : 'bg-rose-100 border-rose-400 text-rose-900');" class="text-left p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 font-medium cursor-pointer"><strong>(${String.fromCharCode(65 + oi)})</strong> ${opt}</button>`).join("")}
                </div>
                <div id="neet-t1-sol" class="hidden p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900"><strong>NCERT Official Solution:</strong> ${d.explanation}</div>
              </div>
            </div>
          ` : `<div class="text-xs text-slate-500">Loading NEET items from Neon...</div>`)}
        </div>
      </div>
    `;
  };

  window.renderQuantTab = window.renderNeetMasterTab1;
  window.renderTab1 = window.renderNeetMasterTab1;
  window.addEventListener("DOMContentLoaded", () => setTimeout(() => window.renderNeetMasterTab1(), 160));
})();
