window.renderTab2 = function (el) {
  const mods = window.getAllModulesForMode();
  const traps = mods.flatMap(m => (m.traps || []).map(t => ({ ...t, moduleTitle: m.title })));

  el.innerHTML = `
    <div class="space-y-4">
      <div class="bg-rose-950/30 border border-rose-800/50 rounded-2xl p-4">
        <h2 class="text-lg font-bold text-rose-300">Aptitude Trap Doctor & Negative-Marking Shield</h2>
        <p class="text-xs text-slate-300 mt-1">
          Unlike CBSE board exams, MCQ errors in GRE General, OMETs & IIMB UG deduct <strong>-1 mark</strong> (a 5-mark swing from +4).
          In <strong>GRE General Section 1 (Short Answer)</strong>, wrong answers carry <strong>0 penalty</strong>—attempt 100% of SA questions!
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${traps.map((t, idx) => `
          <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-semibold text-indigo-400">${t.moduleTitle}</span>
              <span class="text-[11px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold">${t.penalty}</span>
            </div>
            <h3 class="font-bold text-white text-sm">#${idx + 1}. ${t.title}</h3>
            <div class="p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/40 text-xs text-rose-200">
              <strong>Common Trap:</strong> ${t.wrongStep}
            </div>
            <div class="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-200">
              <strong>Examiner Fix:</strong> ${t.correction}
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
};