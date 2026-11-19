window.QUANT_DRILL_IDX = 0;
window.QUANT_DRILL_VIEW = "single"; // "single" | "all"
window.QUANT_DRILL_STATE = {};      // { [qid]: { answered: bool, correct: bool, picked: any } }

window.getQuantDrillsForModule = function (mod) {
  const pack = (window.IPM_QUANT_SHORTCUTS || {})[mod.id] || { extraDrills: [] };
  const bank = (window.IPM_QUANT_DRILL_BANK || {})[mod.id] || [];
  return [...(mod.questions || []), ...(pack.extraDrills || []), ...bank];
};

window.renderSingleDrillCard = function (q, idx, total) {
  const st = window.QUANT_DRILL_STATE[q.id];
  return `
    <div class="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-indigo-400">Practice Question ${idx + 1} of ${total}</span>
        <span class="text-[10px] px-2.5 py-0.5 rounded font-semibold ${
          q.type === "SA_NUMERIC" ? "bg-amber-500/20 text-amber-300" : "bg-sky-500/20 text-sky-300"
        }">${q.type === "SA_NUMERIC" ? "Indore QA-SA (Zero Negative)" : "MCQ (+4 / -1)"}</span>
      </div>
      <p class="text-xs md:text-sm text-slate-100 leading-relaxed">${q.prompt}</p>
      ${
        q.type === "SA_NUMERIC"
          ? `<div class="flex flex-wrap gap-2 items-center">
               <input id="qdrill-in-${q.id}" type="text" value="${st?.picked || ""}" placeholder="Enter exact number..."
                 class="rounded-lg bg-slate-900 border border-amber-500/50 px-3 py-1.5 text-xs text-amber-300 font-mono">
               <button onclick="window.revealQuantDrill('${q.id}')" class="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white">Check Answer</button>
             </div>`
          : `<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              ${q.options.map((opt, oi) => {
                let cls = "bg-slate-900 border-slate-800 text-slate-300 hover:border-indigo-500";
                if (st) {
                  if (oi === q.answer) cls = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold";
                  else if (oi === st.picked && !st.correct) cls = "bg-rose-950/60 border-rose-500 text-rose-200";
                }
                return `<button onclick="window.revealQuantDrill('${q.id}', ${oi}, ${q.answer})"
                  class="text-left p-2.5 rounded-xl border text-xs transition ${cls}">
                  <strong>${String.fromCharCode(65 + oi)}.</strong> ${opt}
                </button>`;
              }).join("")}
             </div>`
      }
      <div id="qdrill-exp-${q.id}" class="${st ? "" : "hidden"} p-3 rounded-xl bg-emerald-950/40 border border-emerald-700/40 text-xs text-emerald-200">
        ${st ? `<strong>${st.banner}</strong><br>${q.explanation}` : ""}
      </div>
    </div>
  `;
};

window.renderTab1 = function (el) {
  const mods = window.getQuantModules();
  if (!window.IPM_STATE.selectedQuantId || !mods.some(m => m.id === window.IPM_STATE.selectedQuantId)) {
    window.IPM_STATE.selectedQuantId = mods[0].id;
    window.QUANT_DRILL_IDX = 0;
  }
  const activeMod = mods.find(m => m.id === window.IPM_STATE.selectedQuantId);
  const sub = window.IPM_STATE.quantSubTab;
  const pack = (window.IPM_QUANT_SHORTCUTS || {})[activeMod.id] || { formulas: [] };
  const allDrills = window.getQuantDrillsForModule(activeMod);
  if (window.QUANT_DRILL_IDX >= allDrills.length) window.QUANT_DRILL_IDX = 0;

  const solvedCount = allDrills.filter(q => window.QUANT_DRILL_STATE[q.id]).length;
  const correctCount = allDrills.filter(q => window.QUANT_DRILL_STATE[q.id]?.correct).length;

  el.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <div class="lg:col-span-4 space-y-2 lg:h-[calc(100vh-225px)] lg:overflow-y-auto lg:pr-2 pane-scroll">
        <div class="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Quant & Higher Math (${mods.length} Modules)</div>
        ${mods.map(m => `
          <button onclick="window.selectQuantModule('${m.id}')"
            class="w-full text-left p-3 rounded-xl border transition ${
              m.id === activeMod.id
                ? "bg-indigo-950/80 border-indigo-500 text-white"
                : "bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-600"
            }">
            <div class="font-semibold text-sm">${m.title}</div>
            <div class="text-[11px] text-slate-400 mt-1">${m.weightage}</div>
          </button>
        `).join("")}
      </div>

      <div class="lg:col-span-8 space-y-4 lg:h-[calc(100vh-225px)] lg:overflow-y-auto lg:pr-2 pane-scroll">
        <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span class="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">${activeMod.pillar}</span>
              <h2 class="text-xl font-bold text-white mt-1">${activeMod.title}</h2>
            </div>
            <div class="flex gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button onclick="window.setQuantSubTab('refresher')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${sub === 'refresher' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}">
                Chapter Refresher & Theory
              </button>
              <button onclick="window.setQuantSubTab('shortcuts')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${sub === 'shortcuts' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}">
                Shortcuts & ${allDrills.length} Practice Drills
              </button>
            </div>
          </div>

          ${
            sub === "refresher"
              ? window.renderRefresherCard(activeMod.id, "indigo")
              : `<div class="space-y-5">
                  <div class="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/40 space-y-3">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div class="text-xs font-bold uppercase tracking-wider text-emerald-300">
                          Interactive Practice Workbench (${allDrills.length} Questions)
                        </div>
                        <div class="text-[11px] text-slate-300 mt-0.5">
                          Attempted: <strong>${solvedCount}/${allDrills.length}</strong> &bull; Correct: <strong class="text-emerald-300">${correctCount}</strong>
                        </div>
                      </div>
                      <div class="flex gap-1.5">
                        <button onclick="window.setQuantDrillView('single')" class="px-2.5 py-1 rounded-lg text-[11px] font-bold ${window.QUANT_DRILL_VIEW === 'single' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-700'}">
                          Focus Mode (Prev / Next)
                        </button>
                        <button onclick="window.setQuantDrillView('all')" class="px-2.5 py-1 rounded-lg text-[11px] font-bold ${window.QUANT_DRILL_VIEW === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-700'}">
                          View All ${allDrills.length}
                        </button>
                      </div>
                    </div>

                    ${
                      window.QUANT_DRILL_VIEW === "single"
                        ? `<div class="flex flex-wrap gap-1 pt-1">
                             ${allDrills.map((item, i) => {
                               const st = window.QUANT_DRILL_STATE[item.id];
                               const cur = i === window.QUANT_DRILL_IDX;
                               let pillCls = "bg-slate-900 text-slate-400 border-slate-700";
                               if (st) pillCls = st.correct ? "bg-emerald-600/30 text-emerald-200 border-emerald-500" : "bg-rose-600/30 text-rose-200 border-rose-500";
                               if (cur) pillCls += " ring-2 ring-indigo-400 text-white font-bold";
                               return `<button onclick="window.jumpQuantDrill(${i})" class="w-7 h-7 rounded-lg border text-[11px] transition ${pillCls}">${i + 1}</button>`;
                             }).join("")}
                           </div>
                           ${allDrills.length ? window.renderSingleDrillCard(allDrills[window.QUANT_DRILL_IDX], window.QUANT_DRILL_IDX, allDrills.length) : ""}
                           <div class="flex items-center justify-between pt-1">
                             <button onclick="window.stepQuantDrill(-1)" ${window.QUANT_DRILL_IDX === 0 ? "disabled" : ""}
                               class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-white">
                               &larr; Previous Question
                             </button>
                             <span class="text-xs text-slate-400 font-semibold">${window.QUANT_DRILL_IDX + 1} / ${allDrills.length}</span>
                             <button onclick="window.stepQuantDrill(1)" ${window.QUANT_DRILL_IDX >= allDrills.length - 1 ? "disabled" : ""}
                               class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-xs font-bold text-white">
                               Next Question &rarr;
                             </button>
                           </div>`
                        : `<div class="space-y-3">
                             ${allDrills.map((q, i) => window.renderSingleDrillCard(q, i, allDrills.length)).join("")}
                           </div>`
                    }
                  </div>

                  <div class="p-4 rounded-xl bg-slate-950/90 border border-amber-500/30 space-y-3">
                    <div class="text-xs font-bold uppercase tracking-wider text-amber-300">Complete Formula & 30-Second Shortcut Ledger</div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                      ${pack.formulas.map(f => `
                        <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                          <div class="text-xs font-bold text-indigo-300">${f.name}</div>
                          <div class="px-2.5 py-1.5 rounded bg-slate-950 border border-indigo-500/30 font-mono text-[11px] text-amber-300">${f.formula}</div>
                          <div class="text-[11px] text-emerald-200"><strong>30s Trick:</strong> ${f.trick}</div>
                        </div>
                      `).join("")}
                    </div>
                  </div>
                </div>`
          }
        </div>
      </div>
    </div>
  `;
};

window.selectQuantModule = function (id) {
  window.IPM_STATE.selectedQuantId = id;
  window.QUANT_DRILL_IDX = 0;
  window.renderActiveTab();
};

window.setQuantSubTab = function (sub) {
  window.IPM_STATE.quantSubTab = sub;
  window.renderActiveTab();
};

window.setQuantDrillView = function (v) {
  window.QUANT_DRILL_VIEW = v;
  window.renderActiveTab();
};

window.stepQuantDrill = function (delta) {
  const mods = window.getQuantModules();
  const activeMod = mods.find(m => m.id === window.IPM_STATE.selectedQuantId);
  const total = window.getQuantDrillsForModule(activeMod).length;
  window.QUANT_DRILL_IDX = Math.max(0, Math.min(total - 1, window.QUANT_DRILL_IDX + delta));
  window.renderActiveTab();
};

window.jumpQuantDrill = function (idx) {
  window.QUANT_DRILL_IDX = idx;
  window.renderActiveTab();
};

window.revealQuantDrill = function (qid, picked, correct) {
  const mods = window.getQuantModules();
  const activeMod = mods.find(m => m.id === window.IPM_STATE.selectedQuantId);
  const q = window.getQuantDrillsForModule(activeMod).find(item => item.id === qid);
  if (!q) return;

  if (picked === undefined) {
    const typed = (document.getElementById("qdrill-in-" + qid)?.value || "").trim();
    const isRight = typed === String(q.answer).trim();
    window.QUANT_DRILL_STATE[qid] = {
      picked: typed,
      correct: isRight,
      banner: isRight
        ? `Exact Match! (+4 Marks) — Answer: ${q.answer}`
        : `Target SA Answer: ${q.answer} (Zero negative marking in CAT SA)`
    };
  } else {
    const isRight = picked === correct;
    window.QUANT_DRILL_STATE[qid] = {
      picked: picked,
      correct: isRight,
      banner: isRight
        ? "Correct (+4 Marks)"
        : `Incorrect (-1 Mark) — Correct Option: ${String.fromCharCode(65 + correct)}`
    };
  }
  window.renderActiveTab();
};