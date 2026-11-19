window.PYQ_YEAR_FILTER = "ALL";
window.PYQ_EXAM_FILTER = "ALL";

window.renderTab9 = function (el) {
  const allPyqs = window.IPM_PYQ_ARCHIVE || [];
  const years = ["ALL", "2026", "2025", "2024", "2023", "2022"];
  const exams = ["ALL", "GRE General", "GRE General Rohtak", "OMETs", "IIM Bangalore"];

  const list = allPyqs.filter(p => {
    const yOk = window.PYQ_YEAR_FILTER === "ALL" || p.year === window.PYQ_YEAR_FILTER;
    const eOk = window.PYQ_EXAM_FILTER === "ALL" || p.exam.toLowerCase().includes(window.PYQ_EXAM_FILTER.toLowerCase());
    return yOk && eOk;
  });

  el.innerHTML = `
    <div class="space-y-4">
      <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 class="text-lg font-bold text-white">Past 5-Year Solved PYQ Archive (2022 – 2026) • ${list.length} Questions</h2>
            <p class="text-xs text-slate-400">Official-pattern & memory-based questions from GRE General (SA & MCQ), GRE General Rohtak, OMETs & IIM Bangalore UG.</p>
          </div>
          <div class="flex flex-wrap gap-1.5">
            ${years.map(y => `
              <button onclick="window.setPyqYear('${y}')"
                class="px-3 py-1 rounded-lg text-xs font-bold transition ${
                  window.PYQ_YEAR_FILTER === y
                    ? "bg-amber-500 text-slate-950"
                    : "bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-600"
                }">${y === "ALL" ? "All Years" : y}</button>
            `).join("")}
          </div>
        </div>
        <div class="flex flex-wrap gap-1.5">
          ${exams.map(ex => `
            <button onclick="window.setPyqExam('${ex}')"
              class="px-3 py-1 rounded-lg text-[11px] font-bold transition ${
                window.PYQ_EXAM_FILTER === ex
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-950 text-slate-300 border border-slate-800 hover:border-indigo-500"
              }">${ex === "ALL" ? "All Exams" : ex}</button>
          `).join("")}
        </div>
      </div>

      <div class="space-y-3">
        ${list.map((p, idx) => `
          <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2.5">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-xs font-bold text-amber-300">#${idx + 1} &bull; ${p.exam} (${p.year}) &bull; ${p.section}</span>
              <span class="text-[11px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">${p.type === "SA_NUMERIC" ? "Short Answer (Zero Negative)" : "MCQ (+4 / -1)"}</span>
            </div>
            <p class="text-xs md:text-sm text-white leading-relaxed">${p.question}</p>
            ${
              p.options
                ? `<div class="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                    ${p.options.map((o, oi) => `
                      <div class="p-2.5 rounded-lg bg-slate-950 border ${oi === p.answer ? "border-emerald-500/60 text-emerald-200 font-semibold" : "border-slate-800 text-slate-300"} text-xs">
                        <strong>${String.fromCharCode(65 + oi)}.</strong> ${o} ${oi === p.answer ? "&#10003;" : ""}
                      </div>
                    `).join("")}
                   </div>`
                : `<div class="text-xs font-mono text-emerald-300 bg-slate-950 border border-emerald-700/40 px-3 py-2 rounded-lg inline-block">Exact Answer: ${p.answer}</div>`
            }
            <div class="p-3 rounded-xl bg-emerald-950/30 border border-emerald-700/40 text-xs text-emerald-100">
              <strong>30-Second PYQ Shortcut:</strong> ${p.shortcut}
            </div>
            <div class="text-[11px] text-rose-300"><strong>Examiner Trap Warning:</strong> ${p.trapNote}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
};

window.setPyqYear = function (yr) { window.PYQ_YEAR_FILTER = yr; window.renderActiveTab(); };
window.setPyqExam = function (ex) { window.PYQ_EXAM_FILTER = ex; window.renderActiveTab(); };