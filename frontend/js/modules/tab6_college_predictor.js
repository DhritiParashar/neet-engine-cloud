window.GRE_PREP_STATE = window.GRE_PREP_STATE || {
  quant: 166, verbal: 160, awa: 4.5,
  syncNote: "Synced with Tab 4 Mock Ledger (Adjust sliders or click Sync Mock)"
};

window.syncGrePrepFromMock = function () {
  let hist = [];
  try { hist = JSON.parse(localStorage.getItem("ipm_mock_history_v1") || "[]"); } catch (e) {}
  if (!hist.length) {
    alert("Complete and submit a Section-Adaptive Mock in Tab 4 first to load your live GRE telemetry.");
    return;
  }
  const latest = hist[0];
  const ratio = Math.max(0, Math.min(1, Number(latest.score || 0) / Math.max(1, Number(latest.maxScore || 54))));
  window.GRE_PREP_STATE.quant = Math.min(170, Math.max(130, Math.round(130 + ratio * 40)));
  window.GRE_PREP_STATE.verbal = Math.min(170, Math.max(130, Math.round(130 + ratio * 38)));
  window.GRE_PREP_STATE.syncNote = `Synced from Mock #${hist.length} (${latest.score}/${latest.maxScore}) → Est. ${window.GRE_PREP_STATE.quant + window.GRE_PREP_STATE.verbal}/340`;
  window.renderTab6(window._LAST_TAB6_EL || document.getElementById("tab-content"));
};

window.updateGrePrepField = function (field, val) {
  window.GRE_PREP_STATE[field] = Number(val);
  window.renderTab6(window._LAST_TAB6_EL || document.getElementById("tab-content"));
};

window.renderTab6 = function (el) {
  if (!el) return;
  window._LAST_TAB6_EL = el;
  const s = window.GRE_PREP_STATE;
  const totalGre = Number(s.quant) + Number(s.verbal);

  const bands = [
    { label: "334+ (99th %ile) Perfection Zone", target: 334, split: "Q 169–170 • V 164+ • AWA 5.0+", routing: "Stage 1 ≥11/12 (Quant) & ≥10/12 (Verbal) → Hard Stage-2 Unlocked", focus: "Zero careless slips on Numeric Entry & 3-blank Text Completion logic pivots." },
    { label: "330+ (97th %ile) Benchmark", target: 330, split: "Q 167–168 • V 162+ • AWA 4.5+", routing: "Hard Stage-2 Routing Active in Both Sections", focus: "Apply FROZEN boundary testing on every Quantitative Comparison item to eliminate Choice-D misses." },
    { label: "325+ (92nd %ile) Benchmark", target: 325, split: "Q 165+ • V 160+ • AWA 4.5+", routing: "Hard Stage-2 Quant • Medium/Hard Stage-2 Verbal", focus: "Drill Tab 3 Sentence Equivalence semantic pairs and multi-paragraph RC inference." },
    { label: "320+ (85th %ile) Foundation Band", target: 320, split: "Q 162+ • V 158+ • AWA 4.0+", routing: "Zero unanswered questions (GRE has zero negative marking)", focus: "Complete all 18 GRE Traps in Tab 5 + Tab 2 Data Interpretation drills." }
  ];

  const qRouting = s.quant >= 163 ? "Hard Stage-2 Unlocked (170 Ceiling Active)" : "Medium Stage-2 Risk (Need ≥9/12 in Stage 1)";
  const vRouting = s.verbal >= 158 ? "Hard Stage-2 Unlocked (170 Ceiling Active)" : "Medium Stage-2 Risk (Need ≥8/12 in Stage 1)";

  const cardsHtml = bands.map(b => {
    const diff = totalGre - b.target;
    const status = diff >= 0
      ? `<span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold">Achieved (+${diff} pts)</span>`
      : `<span class="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[11px] font-bold">Need +${Math.abs(diff)} GRE Points</span>`;
    return `
      <div class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 space-y-1.5 shadow-sm">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="font-extrabold text-sm text-slate-900 dark:text-white">${b.label}</div>
          <div>${status}</div>
        </div>
        <div class="text-[11px] font-mono text-indigo-600 dark:text-indigo-300 font-semibold">Required Split: ${b.split}</div>
        <div class="text-xs text-slate-600 dark:text-slate-300"><strong>Section-Adaptive Gate:</strong> ${b.routing}</div>
        <div class="text-[11px] text-slate-500 dark:text-slate-400"><strong>Prep Prescription:</strong> ${b.focus}</div>
      </div>
    `;
  }).join("");

  el.innerHTML = `
    <div class="max-w-6xl mx-auto my-4 grid grid-cols-1 lg:grid-cols-12 gap-5">
      <div class="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div class="flex items-start justify-between gap-2">
          <div>
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">GRE General 260–340 Diagnostic Engine</span>
            <h2 class="text-lg font-extrabold text-slate-900 dark:text-white">Section-Adaptive Score &amp; Routing Forecaster</h2>
          </div>
          <button type="button" onclick="window.syncGrePrepFromMock()" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold cursor-pointer">&#8635; Sync Mock</button>
        </div>
        <div class="text-[11px] text-emerald-600 font-semibold">${s.syncNote}</div>

        <div class="space-y-3">
          <div><div class="flex justify-between text-xs"><span>Quantitative Reasoning (130–170 • 27 Qs)</span><strong>${s.quant} / 170</strong></div><input type="range" min="130" max="170" value="${s.quant}" oninput="window.updateGrePrepField('quant', this.value)" class="w-full accent-indigo-600"></div>
          <div><div class="flex justify-between text-xs"><span>Verbal Reasoning (130–170 • 27 Qs)</span><strong>${s.verbal} / 170</strong></div><input type="range" min="130" max="170" value="${s.verbal}" oninput="window.updateGrePrepField('verbal', this.value)" class="w-full accent-indigo-600"></div>
          <div><div class="flex justify-between text-xs"><span>Analytical Writing (AWA 0.0–6.0 • 30m)</span><strong>${s.awa.toFixed(1)} / 6.0</strong></div><input type="range" min="3.0" max="6.0" step="0.5" value="${s.awa}" oninput="window.updateGrePrepField('awa', this.value)" class="w-full accent-indigo-600"></div>
        </div>

        <div class="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1 text-xs">
          <div class="flex justify-between"><span class="font-bold">Projected Composite GRE:</span><strong class="text-indigo-700 dark:text-indigo-300 text-sm">${totalGre} / 340 (Q${s.quant} V${s.verbal})</strong></div>
          <div class="text-[11px] text-slate-600 dark:text-slate-300"><strong>Quant Routing:</strong> ${qRouting}</div>
          <div class="text-[11px] text-slate-600 dark:text-slate-300"><strong>Verbal Routing:</strong> ${vRouting}</div>
        </div>
      </div>
      <div class="lg:col-span-7 space-y-2.5">${cardsHtml}</div>
    </div>
  `;
};
window.renderCollegePredictor = window.renderTab6;