window.TRAP_SUBTAB = "clinic";       // "clinic" | "ev_calc"
window.TRAP_DOMAIN_FILTER = "ALL";
window.TRAP_FOCUS_IDX = 0;
window.TRAP_VIEW_MODE = "single";    // "single" | "all"
window.TRAP_DRILL_STATE = {};
window.EV_ACCURACY_PCT = 40;

window.getFilteredTraps = function () {
  const all = window.IPM_TRAPS_CLINIC || [];
  return window.TRAP_DOMAIN_FILTER === "ALL"
    ? all
    : all.filter(t => t.domain === window.TRAP_DOMAIN_FILTER);
};

window.renderTrapCard = function (t, idx, total) {
  const st = window.TRAP_DRILL_STATE[t.id];
  return `
    <div class="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="text-xs font-bold text-indigo-400">Trap #${idx + 1} of ${total} &bull; ${t.domain} (${t.examTag})</span>
        <span class="text-[10px] px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold">${t.penalty}</span>
      </div>
      <h3 class="text-base font-bold text-white">${t.title}</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="p-3 rounded-xl bg-rose-950/35 border border-rose-800/40 text-xs text-rose-200 space-y-1">
          <div class="font-bold uppercase text-[10px] tracking-wider text-rose-300">1. Common Student Trap</div>
          <div>${t.trapScenario}</div>
          <div class="text-slate-300 pt-1"><strong>Why It Fails:</strong> ${t.whyItFails}</div>
        </div>
        <div class="p-3 rounded-xl bg-emerald-950/35 border border-emerald-800/40 text-xs text-emerald-200 space-y-1">
          <div class="font-bold uppercase text-[10px] tracking-wider text-emerald-300">2. Examiner-Proof Fix Rule</div>
          <div>${t.fixRule}</div>
        </div>
      </div>

      <div class="p-3.5 rounded-xl bg-slate-900 border border-indigo-500/30 space-y-2.5">
        <div class="text-[11px] font-bold uppercase tracking-wider text-amber-300">3. Spot & Defuse Mini-Drill</div>
        <p class="text-xs md:text-sm text-slate-100">${t.miniDrill.prompt}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          ${t.miniDrill.options.map((opt, oi) => {
            let cls = "bg-slate-950 border-slate-800 text-slate-300 hover:border-rose-500";
            if (st) {
              if (oi === t.miniDrill.answer) cls = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold";
              else if (oi === st.picked && !st.correct) cls = "bg-rose-950/60 border-rose-500 text-rose-200";
            }
            return `<button onclick="window.answerTrapDrill('${t.id}', ${oi}, ${t.miniDrill.answer})"
              class="text-left p-2.5 rounded-xl border text-xs transition ${cls}">
              <strong>${String.fromCharCode(65 + oi)}.</strong> ${opt}
            </button>`;
          }).join("")}
        </div>
        <div class="${st ? "" : "hidden"} p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-700/40 text-xs text-emerald-200">
          ${st ? `<strong>${st.banner}</strong><br>${t.miniDrill.explanation}` : ""}
        </div>
      </div>
    </div>
  `;
};

window.renderTab4 = function (el) {
  const list = window.getFilteredTraps();
  if (window.TRAP_FOCUS_IDX >= list.length) window.TRAP_FOCUS_IDX = 0;
  const domains = ["ALL", "Quant & Higher Math", "DI & LR", "VARC & Vocab"];
  const defusedCount = list.filter(t => window.TRAP_DRILL_STATE[t.id]?.correct).length;

  const p = window.EV_ACCURACY_PCT / 100;
  const evMcq = (p * 4 + (1 - p) * -1).toFixed(2);
  const evSa = (p * 4 + (1 - p) * 0).toFixed(2);

  el.innerHTML = `
    <div class="space-y-4">
      <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-lg font-bold text-white">Aptitude Trap Doctor & Negative-Marking Clinic (${list.length} Traps)</h2>
          <p class="text-xs text-slate-400 mt-0.5">
            Traps Defused: <strong class="text-emerald-300">${defusedCount}/${list.length}</strong> &bull;
            Every MCQ trap costs a <strong>5-mark swing</strong> (+4 vs -1), while Indore SA carries <strong>0 penalty</strong>.
          </p>
        </div>
        <div class="flex gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button onclick="window.setTrapSubTab('clinic')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${window.TRAP_SUBTAB === 'clinic' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'}">
            Interactive Trap Clinic (${list.length})
          </button>
          <button onclick="window.setTrapSubTab('ev_calc')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${window.TRAP_SUBTAB === 'ev_calc' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'}">
            +4 / -1 / 0 Guess & Skip Simulator
          </button>
        </div>
      </div>

      ${
        window.TRAP_SUBTAB === "ev_calc"
          ? `<div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
               <h3 class="text-base font-bold text-amber-300">Expected Value (EV) Decision Simulator: When to Attempt vs. Skip</h3>
               <p class="text-xs text-slate-300">Slide your estimated confidence/elimination probability on a tough question to compare Expected Marks in <strong>MCQ (+4 / -1)</strong> vs. <strong>GRE General SA (+4 / 0)</strong>:</p>
               <div class="space-y-2 max-w-xl">
                 <div class="flex justify-between text-xs font-bold">
                   <span>Your Estimated Probability of Being Correct:</span>
                   <span class="text-indigo-400">${window.EV_ACCURACY_PCT}%</span>
                 </div>
                 <input type="range" min="0" max="100" step="5" value="${window.EV_ACCURACY_PCT}"
                   oninput="window.updateEvCalc(this.value)" class="w-full cursor-pointer">
               </div>
               <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                 <div class="p-4 rounded-xl bg-slate-950 border border-sky-500/40 space-y-1.5">
                   <div class="text-xs font-bold uppercase text-sky-400">Standard MCQ (+4 / -1) — All 8 IIMs</div>
                   <div class="text-2xl font-extrabold ${Number(evMcq) > 0 ? 'text-emerald-400' : 'text-rose-400'}">EV = ${evMcq} marks / question</div>
                   <div class="text-xs text-slate-300">${Number(evMcq) > 0 ? "ATTEMPT: Positive expected value (break-even threshold is strictly > 20%, i.e., eliminate at least 1 option)." : "SKIP: Negative or zero expected value—do not blind-guess."}</div>
                 </div>
                 <div class="p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-1.5">
                   <div class="text-xs font-bold uppercase text-amber-300">GRE General Section 1 Short Answer (+4 / 0)</div>
                   <div class="text-2xl font-extrabold text-emerald-400">EV = +${evSa} marks / question</div>
                   <div class="text-xs text-slate-300">ALWAYS ATTEMPT: Zero negative marking means ANY positive probability (> 0%) yields strictly positive expected marks.</div>
                 </div>
               </div>
             </div>`
          : `<div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
               <div class="flex flex-wrap items-center justify-between gap-2">
                 <div class="flex flex-wrap gap-1.5">
                   ${domains.map(d => `
                     <button onclick="window.setTrapDomain('${d}')"
                       class="px-3 py-1 rounded-lg text-xs font-bold transition ${
                         window.TRAP_DOMAIN_FILTER === d ? "bg-rose-600 text-white" : "bg-slate-950 text-slate-300 border border-slate-800 hover:border-rose-500"
                       }">${d}</button>
                   `).join("")}
                 </div>
                 <div class="flex gap-1.5">
                   <button onclick="window.setTrapViewMode('single')" class="px-2.5 py-1 rounded-lg text-[11px] font-bold ${window.TRAP_VIEW_MODE === 'single' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-300 border border-slate-800'}">Focus Mode (Prev / Next)</button>
                   <button onclick="window.setTrapViewMode('all')" class="px-2.5 py-1 rounded-lg text-[11px] font-bold ${window.TRAP_VIEW_MODE === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-300 border border-slate-800'}">View All ${list.length}</button>
                 </div>
               </div>

               ${
                 window.TRAP_VIEW_MODE === "single"
                   ? `<div class="flex flex-wrap gap-1">
                        ${list.map((item, i) => {
                          const st = window.TRAP_DRILL_STATE[item.id];
                          const cur = i === window.TRAP_FOCUS_IDX;
                          let cls = "bg-slate-950 text-slate-400 border-slate-800";
                          if (st) cls = st.correct ? "bg-emerald-600/30 text-emerald-200 border-emerald-500" : "bg-rose-600/30 text-rose-200 border-rose-500";
                          if (cur) cls += " ring-2 ring-rose-400 text-white font-bold";
                          return `<button onclick="window.jumpTrap(${i})" class="w-7 h-7 rounded-lg border text-[11px] transition ${cls}">${i + 1}</button>`;
                        }).join("")}
                      </div>
                      ${list.length ? window.renderTrapCard(list[window.TRAP_FOCUS_IDX], window.TRAP_FOCUS_IDX, list.length) : ""}
                      <div class="flex items-center justify-between pt-1">
                        <button onclick="window.stepTrap(-1)" ${window.TRAP_FOCUS_IDX === 0 ? "disabled" : ""} class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-white">&larr; Previous Trap</button>
                        <span class="text-xs text-slate-400 font-semibold">${window.TRAP_FOCUS_IDX + 1} / ${list.length}</span>
                        <button onclick="window.stepTrap(1)" ${window.TRAP_FOCUS_IDX >= list.length - 1 ? "disabled" : ""} class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-xs font-bold text-white">Next Trap &rarr;</button>
                      </div>`
                   : `<div class="space-y-3">${list.map((t, i) => window.renderTrapCard(t, i, list.length)).join("")}</div>`
               }
             </div>`
      }
    </div>
  `;
};

window.setTrapSubTab = function (s) { window.TRAP_SUBTAB = s; window.renderActiveTab(); };
window.setTrapDomain = function (d) { window.TRAP_DOMAIN_FILTER = d; window.TRAP_FOCUS_IDX = 0; window.renderActiveTab(); };
window.setTrapViewMode = function (v) { window.TRAP_VIEW_MODE = v; window.renderActiveTab(); };
window.jumpTrap = function (i) { window.TRAP_FOCUS_IDX = i; window.renderActiveTab(); };
window.stepTrap = function (delta) {
  const total = window.getFilteredTraps().length;
  window.TRAP_FOCUS_IDX = Math.max(0, Math.min(total - 1, window.TRAP_FOCUS_IDX + delta));
  window.renderActiveTab();
};
window.updateEvCalc = function (val) { window.EV_ACCURACY_PCT = Number(val); window.renderActiveTab(); };
window.answerTrapDrill = function (tid, picked, correct) {
  const ok = picked === correct;
  window.TRAP_DRILL_STATE[tid] = {
    picked: picked,
    correct: ok,
    banner: ok ? "Trap Defused! (+4 Marks Saved)" : `Fell into the Trap! (-1 Mark) — Correct Option: ${String.fromCharCode(65 + correct)}`
  };
  window.renderActiveTab();
};