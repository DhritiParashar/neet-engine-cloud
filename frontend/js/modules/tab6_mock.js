window.MOCK_ANSWERS = {};
window.MOCK_SUBMITTED = false;

window.renderTab6 = function (el) {
  const mode = window.getActiveMode();
  const mods = window.getAllModulesForMode();
  const questions = mods.flatMap(m => (m.questions || []).map(q => ({ ...q, moduleTitle: m.title })));

  el.innerHTML = `
    <div class="space-y-4">
      <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-lg font-bold text-white">Diagnostic Mock Simulator — ${mode.label}</h2>
          <p class="text-xs text-slate-400">
            Marking Scheme: MCQ <strong>+${mode.marking.mcqCorrect} / ${mode.marking.mcqWrong}</strong> •
            Short Answer (SA) <strong>+${mode.marking.saCorrect} / ${mode.marking.saWrong}</strong>
          </p>
        </div>
        <div class="flex gap-2">
          <button onclick="window.resetMock()" class="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200">Reset</button>
          <button onclick="window.scoreMock()" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white">Submit & Calculate Score</button>
        </div>
      </div>

      <div id="mock-score-banner" class="hidden bg-indigo-950/70 border border-indigo-500 rounded-2xl p-4 text-sm text-white"></div>

      <div class="space-y-4">
        ${questions.map((q, idx) => `
          <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-indigo-400">Q${idx + 1} • ${q.moduleTitle}</span>
              <span class="text-[11px] px-2.5 py-0.5 rounded font-semibold ${
                q.type === "SA_NUMERIC" ? "bg-amber-500/20 text-amber-300" : "bg-sky-500/20 text-sky-300"
              }">${q.type === "SA_NUMERIC" ? "Short Answer (Zero Negative Marking)" : "MCQ (+4 / -1)"}</span>
            </div>
            <p class="text-sm text-slate-100 whitespace-pre-line">${q.prompt}</p>

            ${
              q.type === "SA_NUMERIC"
                ? `<div class="max-w-xs">
                     <input type="text" placeholder="Type exact numerical answer..." value="${window.MOCK_ANSWERS[q.id] || ""}"
                       oninput="window.MOCK_ANSWERS['${q.id}'] = this.value"
                       class="w-full rounded-xl bg-slate-950 border border-amber-500/50 p-2.5 text-sm font-mono text-amber-300">
                   </div>`
                : `<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    ${q.options.map((opt, oi) => {
                      const picked = window.MOCK_ANSWERS[q.id] === oi;
                      return `<button onclick="window.pickMcq('${q.id}', ${oi})"
                        class="text-left p-3 rounded-xl border text-xs transition ${
                          picked
                            ? "bg-indigo-600/30 border-indigo-400 text-white font-semibold"
                            : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600"
                        }">
                        <span class="font-bold mr-2">${String.fromCharCode(65 + oi)}.</span> ${opt}
                      </button>`;
                    }).join("")}
                   </div>`
            }

            <div id="exp-${q.id}" class="${window.MOCK_SUBMITTED ? "" : "hidden"} p-3 rounded-xl bg-slate-950 border border-emerald-700/40 text-xs text-emerald-200">
              <strong>Solution:</strong> ${q.explanation}
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
};

window.pickMcq = function (qid, optIdx) {
  window.MOCK_ANSWERS[qid] = optIdx;
  window.renderActiveTab();
};

window.resetMock = function () {
  window.MOCK_ANSWERS = {};
  window.MOCK_SUBMITTED = false;
  window.renderActiveTab();
};

window.scoreMock = function () {
  const mode = window.getActiveMode();
  const questions = window.getAllModulesForMode().flatMap(m => m.questions || []);
  let total = 0, maxScore = 0, correct = 0, wrong = 0, unattempted = 0;

  questions.forEach(q => {
    const ans = window.MOCK_ANSWERS[q.id];
    if (q.type === "SA_NUMERIC") {
      maxScore += mode.marking.saCorrect;
      if (ans === undefined || String(ans).trim() === "") {
        unattempted++;
      } else if (String(ans).trim() === String(q.answer).trim()) {
        total += mode.marking.saCorrect;
        correct++;
      } else {
        total += mode.marking.saWrong;
        wrong++;
      }
    } else {
      maxScore += mode.marking.mcqCorrect;
      if (ans === undefined) {
        unattempted++;
      } else if (ans === q.answer) {
        total += mode.marking.mcqCorrect;
        correct++;
      } else {
        total += mode.marking.mcqWrong;
        wrong++;
      }
    }
  });

  window.MOCK_SUBMITTED = true;
  window.renderActiveTab();
  const banner = document.getElementById("mock-score-banner");
  if (banner) {
    banner.classList.remove("hidden");
    banner.innerHTML = `
      <strong>Score: ${total} / ${maxScore}</strong> &nbsp;|&nbsp;
      Correct: <span class="text-emerald-300 font-bold">${correct}</span> &nbsp;|&nbsp;
      Wrong: <span class="text-rose-300 font-bold">${wrong}</span> &nbsp;|&nbsp;
      Skipped: <span class="text-slate-300">${unattempted}</span>
    `;
  }
};