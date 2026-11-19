window.MOCK_ANSWERS = {};
window.MOCK_SUBMITTED = false;
window.MOCK_PAPER_TYPE = "FULL_DIAGNOSTIC";
window.MOCK_INCLUDE_NCERT = true;
window.MOCK_QUESTIONS_CACHE = [];
window.MOCK_HISTORY_CODES = JSON.parse(localStorage.getItem("ipm_attempted_q_codes") || "[]");
window.MOCK_DB_INFO = null;
window.MOCK_LOADING = false;
window.MOCK_ACTIVE_SESSION = false;
window.MOCK_ERROR_MSG = "";
window.MOCK_TIMER_SECONDS = null;
window.MOCK_TIMER_INTERVAL = null;

window.fetchNewRandomMock = async function () {
  if (window.MOCK_LOADING) return;
  window.MOCK_LOADING = true;
  window.MOCK_ERROR_MSG = "";
  window.renderActiveTab();

  try {
    const res = await fetch("/api/mock/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exam_mode: window.IPM_STATE.activeModeId,
        paper_type: window.MOCK_PAPER_TYPE,
        include_ncert: window.MOCK_INCLUDE_NCERT,
        exclude_codes: window.MOCK_HISTORY_CODES.slice(-180)
      })
    });
    const data = await res.json();
    if (data.error) window.MOCK_ERROR_MSG = data.error;
    if (Array.isArray(data.questions) && data.questions.length > 0) {
      window.MOCK_QUESTIONS_CACHE = data.questions;
      window.MOCK_DB_INFO = data.db || null;
    } else {
      window.MOCK_QUESTIONS_CACHE = (window.IPM_TAGGED_MOCK_QUESTIONS || []).slice(0, 20);
    }
  } catch (e) {
    window.MOCK_ERROR_MSG = e.message;
    window.MOCK_QUESTIONS_CACHE = (window.IPM_TAGGED_MOCK_QUESTIONS || []).slice(0, 20);
  } finally {
    window.MOCK_LOADING = false;
    window.MOCK_ACTIVE_SESSION = true;
    window.MOCK_ANSWERS = {};
    window.MOCK_SUBMITTED = false;
    const mins = window.MOCK_PAPER_TYPE === "FULL_DIAGNOSTIC" ? 118 : 35;
    window.startMockTimer(mins);
    window.renderActiveTab();
  }
};

window.startMockTimer = function (minutes) {
  if (window.MOCK_TIMER_INTERVAL) clearInterval(window.MOCK_TIMER_INTERVAL);
  window.MOCK_TIMER_SECONDS = minutes * 60;
  window.MOCK_TIMER_INTERVAL = setInterval(() => {
    if (window.MOCK_SUBMITTED || !window.MOCK_ACTIVE_SESSION) {
      clearInterval(window.MOCK_TIMER_INTERVAL);
      return;
    }
    window.MOCK_TIMER_SECONDS--;
    const disp = document.getElementById("mock-countdown-clock");
    if (disp) {
      const m = Math.floor(Math.max(0, window.MOCK_TIMER_SECONDS) / 60);
      const s = Math.max(0, window.MOCK_TIMER_SECONDS) % 60;
      disp.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }
    if (window.MOCK_TIMER_SECONDS <= 0) {
      clearInterval(window.MOCK_TIMER_INTERVAL);
      window.scoreMock();
    }
  }, 1000);
};

window.exitMockWithoutSubmission = function () {
  if (window.MOCK_TIMER_INTERVAL) {
    clearInterval(window.MOCK_TIMER_INTERVAL);
    window.MOCK_TIMER_INTERVAL = null;
  }
  window.MOCK_ACTIVE_SESSION = false;
  window.MOCK_ANSWERS = {};
  window.MOCK_SUBMITTED = false;
  window.MOCK_QUESTIONS_CACHE = [];
  window.MOCK_TIMER_SECONDS = null;
  window.renderActiveTab();
};

window.selectMockPaper = function (pid) {
  window.MOCK_PAPER_TYPE = pid;
  if (window.MOCK_ACTIVE_SESSION) {
    window.fetchNewRandomMock();
  } else {
    window.renderActiveTab();
  }
};

window.toggleMockNcert = function (flag) {
  window.MOCK_INCLUDE_NCERT = flag;
  if (window.MOCK_ACTIVE_SESSION) {
    window.fetchNewRandomMock();
  } else {
    window.renderActiveTab();
  }
};

window.renderTab8 = function (el) {
  const mode = window.getActiveMode();
  const papers = [
    { id: "FULL_DIAGNOSTIC", label: "Full 45-Q All-Section Random Mock (60m)", mins: 118, qs: 54 },
    { id: "QUANT_SPRINT", label: "Quant & Higher Math 30-Q Sprint (40m)", mins: 40, qs: 30 },
    { id: "NCERT_HIGHER_MATH_SPRINT", label: "Class 10/11/12 + Higher Math 30-Q Sprint (40m)", mins: 40, qs: 30 },
    { id: "DILR_SPRINT", label: "DI & LR 25-Q Sprint (40m)", mins: 40, qs: 25 },
    { id: "VARC_SPRINT", label: "VARC & Grammar 30-Q Sprint (40m)", mins: 40, qs: 30 }
  ];
  const selectedPaper = papers.find(p => p.id === window.MOCK_PAPER_TYPE) || papers[0];

  // STATE 1: MOCK LOBBY (Nothing starts until user explicitly clicks Start Random Mock)
  if (!window.MOCK_ACTIVE_SESSION && !window.MOCK_LOADING) {
    el.innerHTML = `
      <div class="max-w-4xl mx-auto my-4 bg-slate-900/95 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold uppercase">
              PostgreSQL Non-Repeating Mock Lobby
            </span>
            <h2 class="text-xl font-bold text-white mt-1.5">Configure Timed Mock — ${mode.label}</h2>
            <p class="text-xs text-slate-400 mt-0.5">
              Timer & question generation will <strong>not</strong> start until you click <strong>Start Random Mock</strong> below.
            </p>
          </div>
          <div class="text-right text-xs text-slate-300 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5">
            <div>Unseen History Tracked: <strong class="text-emerald-300">${window.MOCK_HISTORY_CODES.length} Qs</strong></div>
            <div>Marking: <strong>MCQ +${mode.marking.mcqCorrect}/${mode.marking.mcqWrong}</strong> | <strong>SA +${mode.marking.saCorrect}/${mode.marking.saWrong}</strong></div>
          </div>
        </div>

        <div class="space-y-2">
          <div class="text-xs font-bold text-slate-300 uppercase tracking-wide">1. Choose Paper Format</div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            ${papers.map(p => `
              <button type="button" onclick="window.selectMockPaper('${p.id}')"
                class="text-left p-3.5 rounded-xl border text-xs transition ${
                  window.MOCK_PAPER_TYPE === p.id
                    ? "bg-indigo-600/25 border-indigo-400 text-white font-bold shadow"
                    : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600"
                }">
                <div class="flex items-center justify-between">
                  <span>${p.label}</span>
                  <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-mono">${p.mins}m</span>
                </div>
              </button>
            `).join("")}
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800">
          <label class="flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
            <input type="checkbox" ${window.MOCK_INCLUDE_NCERT ? "checked" : ""} onchange="window.toggleMockNcert(this.checked)">
            <span>Blend Class 10/11/12 NCERT & Higher Math Question Bank</span>
          </label>

          <button type="button" onclick="window.fetchNewRandomMock()"
            class="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs md:text-sm font-extrabold text-white shadow-lg cursor-pointer">
            &#9654; Start Random Mock (${selectedPaper.qs} Qs &bull; ${selectedPaper.mins} Mins)
          </button>
        </div>
      </div>
    `;
    return;
  }

  // STATE 2: ACTIVE TIMED MOCK SESSION
  const questions = window.MOCK_QUESTIONS_CACHE;
  const minsLeft = Math.floor(Math.max(0, window.MOCK_TIMER_SECONDS || 0) / 60);
  const secsLeft = Math.max(0, window.MOCK_TIMER_SECONDS || 0) % 60;
  const answeredCount = questions.filter(q => window.MOCK_ANSWERS[q.id] !== undefined && String(window.MOCK_ANSWERS[q.id]).trim() !== "").length;

  el.innerHTML = `
    <div class="space-y-4">
      <div class="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 space-y-3 sticky top-28 z-20 shadow-lg">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-base font-bold text-white">Randomized DB Mock Engine — ${mode.label} (${questions.length} Qs)</h2>
              ${window.MOCK_DB_INFO ? `<span class="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">${window.MOCK_DB_INFO.engine} &bull; ${window.MOCK_DB_INFO.total_questions} Qs Pool</span>` : ""}
            </div>
            <p class="text-[11px] text-slate-400">
              Answered: <strong>${answeredCount}/${questions.length}</strong> &bull;
              Unseen History Tracked: <strong>${window.MOCK_HISTORY_CODES.length} Qs</strong> &bull;
              MCQ: <strong>+${mode.marking.mcqCorrect}/${mode.marking.mcqWrong}</strong> | SA: <strong>+${mode.marking.saCorrect}/${mode.marking.saWrong}</strong>
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <div class="px-3 py-1.5 rounded-xl bg-slate-950 border border-amber-500/40 font-mono text-sm font-bold text-amber-300">
              &#9201; <span id="mock-countdown-clock">${String(minsLeft).padStart(2, "0")}:${String(secsLeft).padStart(2, "0")}</span>
            </div>
            <button type="button" onclick="window.fetchNewRandomMock()" class="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow cursor-pointer">
              ${window.MOCK_LOADING ? "Generating..." : "&#127922; New Random Set"}
            </button>
            <button type="button" onclick="window.scoreMock()" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white cursor-pointer">
              Submit & Grade
            </button>
            <button type="button" onclick="window.exitMockWithoutSubmission()" class="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white cursor-pointer">
              Exit without Submission
            </button>
          </div>
        </div>

        ${window.MOCK_ERROR_MSG ? `<div class="p-2 rounded-lg bg-rose-950/60 border border-rose-500/40 text-[11px] text-rose-200">DB Notice: ${window.MOCK_ERROR_MSG}</div>` : ""}
      </div>

      <div id="mock-score-banner" class="hidden bg-indigo-950/80 border border-indigo-500 rounded-2xl p-4 text-sm text-white"></div>

      <div class="space-y-4">
        ${questions.map((q, idx) => `
          <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-xs font-bold text-indigo-400">Question ${idx + 1} of ${questions.length} &bull; ${q.section || "QUANT"} (${q.topic || ""})</span>
              <div class="flex gap-1.5">
                ${q.source_tag === "CLASS_10_11_12_IMPORT" ? `<span class="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold">Class 10/11/12 Bank</span>` : ""}
                <span class="text-[11px] px-2.5 py-0.5 rounded font-semibold ${
                  q.type === "SA_NUMERIC" ? "bg-amber-500/20 text-amber-300" : "bg-sky-500/20 text-sky-300"
                }">${q.type === "SA_NUMERIC" ? "Short Answer (Zero Negative)" : "MCQ (+4 / -1)"}</span>
              </div>
            </div>
            <p class="text-xs md:text-sm text-slate-100 whitespace-pre-line leading-relaxed">${q.prompt}</p>

            ${
              q.type === "SA_NUMERIC"
                ? `<div class="max-w-xs space-y-2">
                     <input id="sa-input-${q.id}" type="text" placeholder="Type exact numerical answer..." value="${window.MOCK_ANSWERS[q.id] || ""}"
                       oninput="window.MOCK_ANSWERS['${q.id}'] = this.value"
                       class="w-full rounded-xl bg-slate-950 border border-amber-500/50 p-2.5 text-sm font-mono text-amber-300">
                     <div class="grid grid-cols-5 gap-1">
                       ${["1","2","3","4","5","6","7","8","9","0","-",".","CLR"].map(k => `
                         <button type="button" onclick="window.pressSaKey('${q.id}', '${k}')"
                           class="py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-200 border border-slate-700">${k}</button>
                       `).join("")}
                     </div>
                   </div>`
                : `<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    ${(q.options || []).map((opt, oi) => {
                      const picked = window.MOCK_ANSWERS[q.id] === oi;
                      return `<button type="button" onclick="window.pickMcq('${q.id}', ${oi})"
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

window.pressSaKey = function (qid, key) {
  const cur = String(window.MOCK_ANSWERS[qid] || "");
  window.MOCK_ANSWERS[qid] = key === "CLR" ? "" : cur + key;
  const inp = document.getElementById("sa-input-" + qid);
  if (inp) inp.value = window.MOCK_ANSWERS[qid];
};
window.pickMcq = function (qid, optIdx) { window.MOCK_ANSWERS[qid] = optIdx; window.renderActiveTab(); };

window.scoreMock = async function () {
  if (window.MOCK_TIMER_INTERVAL) clearInterval(window.MOCK_TIMER_INTERVAL);
  const mode = window.getActiveMode();
  const questions = window.MOCK_QUESTIONS_CACHE;
  let total = 0, maxScore = 0, correct = 0, wrong = 0, unattempted = 0;

  questions.forEach(q => {
    const ans = window.MOCK_ANSWERS[q.id];
    if (q.type === "SA_NUMERIC") {
      maxScore += mode.marking.saCorrect;
      if (ans === undefined || String(ans).trim() === "") unattempted++;
      else if (String(ans).trim() === String(q.answer).trim()) { total += mode.marking.saCorrect; correct++; }
      else { total += mode.marking.saWrong; wrong++; }
    } else {
      maxScore += mode.marking.mcqCorrect;
      if (ans === undefined) unattempted++;
      else if (ans === q.answer) { total += mode.marking.mcqCorrect; correct++; }
      else { total += mode.marking.mcqWrong; wrong++; }
    }
  });

  const usedCodes = questions.map(q => q.id);
  window.MOCK_HISTORY_CODES = Array.from(new Set([...window.MOCK_HISTORY_CODES, ...usedCodes]));
  localStorage.setItem("ipm_attempted_q_codes", JSON.stringify(window.MOCK_HISTORY_CODES));

  const acc = (correct + wrong) ? Math.round((correct / (correct + wrong)) * 100) : 0;
  try {
    await fetch("/api/mock/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: localStorage.getItem("ipm_auth_token") || null,
        exam_track: mode.label,
        paper_type: window.MOCK_PAPER_TYPE,
        score: total,
        max_score: maxScore,
        accuracy_pct: acc,
        attempted_q_codes: usedCodes
      })
    });
  } catch (e) {}

  window.MOCK_SUBMITTED = true;
  window.renderActiveTab();
  const banner = document.getElementById("mock-score-banner");
  if (banner) {
    banner.classList.remove("hidden");
    banner.innerHTML = `
      <strong>Final Mock Score: ${total} / ${maxScore}</strong> &nbsp;|&nbsp;
      Accuracy: <span class="text-amber-300 font-bold">${acc}%</span> &nbsp;|&nbsp;
      Correct: <span class="text-emerald-300 font-bold">${correct}</span> &nbsp;|&nbsp;
      Wrong: <span class="text-rose-300 font-bold">${wrong}</span> &nbsp;|&nbsp;
      Skipped: <span class="text-slate-300">${unattempted}</span>
    `;
  }
};

// ==============================================================================
// DOWNLOAD & EXPORT ENGINE (CSV HISTORY LEDGER + SCORECARD & SOLUTIONS EXPORT)
// ==============================================================================
window.downloadMockHistoryCsv = function () {
  const attempts = (typeof window.getLocalMockHistory === "function") ? window.getLocalMockHistory() : [];
  if (!attempts.length) {
    alert("No mock attempts logged yet. Submit a mock first to export your ledger.");
    return;
  }
  const headers = ["Attempt_No", "Date_Time", "Exam_Track", "Paper_Format", "Net_Score", "Max_Score", "Accuracy_Pct", "Correct", "Wrong", "Unattempted"];
  const rows = attempts.map((a, i) => [
    attempts.length - i,
    `"${String(a.timestamp || "").replace(/"/g, '""')}"`,
    `"${String(a.examTrack || "").replace(/"/g, '""')}"`,
    `"${String(a.paperType || "").replace(/"/g, '""')}"`,
    a.score,
    a.maxScore,
    a.accuracyPct,
    a.correct,
    a.wrong,
    a.unattempted
  ].join(","));
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `GOALisB_Mock_History_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

window.downloadActiveMockSolutionsCsv = function () {
  const qs = window.MOCK_QUESTIONS_CACHE || window.IPM_TAGGED_MOCK_QUESTIONS || [];
  if (!qs.length) {
    alert("Start or complete a mock session first to export questions and solutions.");
    return;
  }
  const headers = ["Q_No", "Question_ID", "Section", "Topic", "Prompt", "Options", "Correct_Answer", "Step_By_Step_Explanation"];
  const rows = qs.map((q, idx) => {
    const opts = Array.isArray(q.options) ? q.options : [];
    const ansText = (typeof q.answer === "number" && opts[q.answer] !== undefined)
      ? `(${String.fromCharCode(65 + q.answer)}) ${opts[q.answer]}`
      : String(q.answer ?? "");
    return [
      idx + 1,
      `"${String(q.id || "").replace(/"/g, '""')}"`,
      `"${String(q.section || "").replace(/"/g, '""')}"`,
      `"${String(q.topic || "").replace(/"/g, '""')}"`,
      `"${String(q.prompt || q.stem || "").replace(/\r?\n/g, " ").replace(/"/g, '""')}"`,
      `"${opts.map((o, oi) => `${String.fromCharCode(65 + oi)}. ${o}`).join(" | ").replace(/"/g, '""')}"`,
      `"${ansText.replace(/"/g, '""')}"`,
      `"${String(q.explanation || "").replace(/\r?\n/g, " ").replace(/"/g, '""')}"`
    ].join(",");
  });
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `GOALisB_Mock_Solutions_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Inject Export CSV & Print PDF buttons into Mock History Card and Graded Result Banner
(function attachExportButtonsObserver() {
  setInterval(() => {
    const histCard = document.getElementById("mock-history-log-card");
    if (histCard && !histCard.querySelector("#btn-export-history-csv")) {
      const resetBtn = histCard.querySelector("button[onclick*='resetAllMockLogsAndSeenPool']");
      if (resetBtn && resetBtn.parentElement) {
        const csvBtn = document.createElement("button");
        csvBtn.id = "btn-export-history-csv";
        csvBtn.type = "button";
        csvBtn.onclick = window.downloadMockHistoryCsv;
        csvBtn.className = "px-3.5 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/35 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition cursor-pointer";
        csvBtn.innerHTML = "&#8681; Export Ledger CSV";
        resetBtn.parentElement.insertBefore(csvBtn, resetBtn);
      }
    }

    const tabEl = document.getElementById("tab-content");
    if (tabEl && (window.IPM_STATE && window.IPM_STATE.activeTab === "tab8")) {
      const txt = tabEl.innerText || "";
      if (/Net Score|Submitted|Exit without Submission/i.test(txt) && !document.getElementById("btn-export-mock-sheet")) {
        const bar = document.createElement("div");
        bar.id = "btn-export-mock-sheet";
        bar.className = "mt-4 p-3.5 rounded-xl bg-slate-950 border border-indigo-500/30 flex flex-wrap items-center justify-between gap-2";
        bar.innerHTML = `
          <span class="text-xs font-semibold text-indigo-300">Offline Review &amp; Error-Log Export:</span>
          <div class="flex flex-wrap gap-2">
            <button type="button" onclick="window.downloadActiveMockSolutionsCsv()" class="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer">
              &#8681; Download Questions &amp; Solutions (CSV)
            </button>
            <button type="button" onclick="window.print()" class="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold cursor-pointer">
              &#128424; Print / Save PDF Scorecard
            </button>
          </div>
        `;
        tabEl.insertBefore(bar, tabEl.firstChild);
      }
    }
  }, 500);
})();

// ==============================================================================
// SERIAL ASSESSMENT ID, CLEAN DIAGNOSTIC PDF MARKSHEET & TITA BADGE SANITIZER
// ==============================================================================
window.generateAssessmentSerialId = function (prefix) {
  const yr = new Date().getFullYear();
  const rnd = Math.floor(1000 + Math.random() * 9000);
  const tag = (prefix || "MOCK").replace(/[^A-Z0-9]/gi, "").toUpperCase().slice(0, 6) || "TEST";
  return `${tag}-${yr}-${rnd}`;
};

window.cleanMathText = function (str) {
  return String(str || "")
    .replace(/\$([^$]+)\$/g, "$1")
    .replace(/\\_/g, "_")
    .replace(/\\times/g, "×")
    .replace(/\\equiv/g, "≡")
    .replace(/\\ge/g, "≥")
    .replace(/\\le/g, "≤")
    .replace(/\\alpha/g, "α")
    .replace(/\\beta/g, "β")
    .replace(/\\sqrt\{([^}]+)\}/g, "√($1)")
    .replace(/\^2/g, "²")
    .replace(/\^3/g, "³");
};

window.printOfficialDiagnosticMarksheet = function () {
  const qs = window.MOCK_QUESTIONS_CACHE || [];
  if (!qs.length) {
    alert("Start and submit a mock first to generate your Official Diagnostic Marksheet.");
    return;
  }
  const hostTag = window.location.host.includes("gmat") ? "GMAT" : (window.location.host.includes("gre") ? "GRE" : "CAT");
  const serialId = window.ACTIVE_MOCK_SERIAL_ID || window.generateAssessmentSerialId(hostTag);
  window.ACTIVE_MOCK_SERIAL_ID = serialId;

  const userEl = document.querySelector("header, nav");
  const candMatch = (userEl ? userEl.innerText : "").match(/([A-Z][a-z]+ [A-Z][a-z]+)/);
  const candidateName = candMatch ? candMatch[1] : "Aspirant";
  const safeCand = candidateName.replace(/\s+/g, "_");
  const dateStr = new Date().toLocaleDateString("en-GB");

  // Compute per-question evaluation
  const answers = window.MOCK_ANSWERS || {};
  let correct = 0, wrong = 0, skipped = 0, netScore = 0;
  const posMark = hostTag === "CAT" ? 3 : 1;
  const negMark = hostTag === "CAT" ? -1 : 0;

  const qRowsHtml = qs.map((q, idx) => {
    const isTita = !q.options || q.options.length === 0 || q.q_type === "SA_NUMERIC";
    const badgeText = isTita ? `TITA (+${posMark} / 0)` : `MCQ (+${posMark} / ${negMark})`;
    const userAns = answers[q.id];
    const hasAns = userAns !== undefined && String(userAns).trim() !== "";
    let statusLabel = "Unattempted (0 Marks)";
    let statusColor = "#64748b";
    let userDisplay = "(No response submitted)";

    if (hasAns) {
      if (isTita) {
        userDisplay = String(userAns).trim();
        const isRight = userDisplay.toLowerCase() === String(q.answer).trim().toLowerCase();
        if (isRight) { correct++; netScore += posMark; statusLabel = `Correct (+${posMark} Marks)`; statusColor = "#059669"; }
        else { wrong++; statusLabel = "Incorrect TITA (0 Marks — Zero Negative)"; statusColor = "#d97706"; }
      } else {
        const uIdx = Number(userAns);
        userDisplay = `(${String.fromCharCode(65 + uIdx)}) ${q.options[uIdx] ?? userAns}`;
        if (uIdx === Number(q.answer)) { correct++; netScore += posMark; statusLabel = `Correct (+${posMark} Marks)`; statusColor = "#059669"; }
        else { wrong++; netScore += negMark; statusLabel = `Incorrect (${negMark} Mark Negative Penalty)`; statusColor = "#dc2626"; }
      }
    } else {
      skipped++;
    }

    const officialAns = isTita
      ? String(q.answer)
      : `(${String.fromCharCode(65 + Number(q.answer))}) ${q.options[Number(q.answer)] ?? q.answer}`;

    return `
      <div style="border:1px solid #cbd5e1; border-radius:8px; padding:12px 14px; margin-bottom:12px; page-break-inside:avoid;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; border-bottom:1px solid #e2e8f0; padding-bottom:4px;">
          <strong style="font-size:12px; color:#1e1b4b;">Question ${idx + 1} of ${qs.length} &bull; ${window.cleanMathText(q.section || "")} (${window.cleanMathText(q.topic || "")})</strong>
          <span style="font-size:11px; font-weight:700; color:${statusColor};">${badgeText} &bull; ${statusLabel}</span>
        </div>
        <div style="font-size:12px; color:#0f172a; margin-bottom:8px; white-space:pre-line;">${window.cleanMathText(q.prompt || q.stem || "")}</div>
        <div style="font-size:11px; background:#f8fafc; padding:6px 10px; border-radius:6px; margin-bottom:4px;">
          <strong>Your Submitted Response:</strong> <span style="color:${statusColor}; font-weight:600;">${window.cleanMathText(userDisplay)}</span>
        </div>
        <div style="font-size:11px; background:#ecfdf5; padding:6px 10px; border-radius:6px; color:#065f46;">
          <strong>Official Answer:</strong> ${window.cleanMathText(officialAns)}<br/>
          <strong>Solution:</strong> ${window.cleanMathText(q.explanation || "")}
        </div>
      </div>
    `;
  }).join("");

  const maxScore = qs.length * posMark;
  const attempted = correct + wrong;
  const accPct = attempted > 0 ? ((correct / attempted) * 100).toFixed(1) : "0.0";
  const totalMins = window.MOCK_PAPER_TYPE === "FULL_DIAGNOSTIC" ? 120 : 40;
  const elapsedSecs = Math.max(1, (totalMins * 60) - (window.MOCK_TIMER_SECONDS || 0));
  const paceSec = (elapsedSecs / Math.max(1, qs.length)).toFixed(1);
  const paceVerdict = elapsedSecs < qs.length * 15 ? "Rushed (High Risk of Operational Slips)" : (elapsedSecs <= totalMins * 60 ? "Balanced Exam Pacing" : "Over-Time");

  let printRoot = document.getElementById("official-print-marksheet");
  if (!printRoot) {
    printRoot = document.createElement("div");
    printRoot.id = "official-print-marksheet";
    document.body.appendChild(printRoot);
  }

  printRoot.innerHTML = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; color:#0f172a; padding:16px;">
      <div style="border-bottom:2px solid #1e1b4b; padding-bottom:10px; margin-bottom:14px; display:flex; justify-content:space-between; align-items:flex-end;">
        <div>
          <div style="font-size:10px; font-weight:700; letter-spacing:1px; color:#4338ca; text-transform:uppercase;">GOALisB ${hostTag} Evaluation Engine</div>
          <h1 style="font-size:18px; font-weight:800; margin:2px 0; color:#0f172a;">OFFICIAL ${hostTag} DIAGNOSTIC MARKSHEET</h1>
          <div style="font-size:11px; color:#334155;">
            <strong>Candidate:</strong> ${candidateName} &nbsp;|&nbsp;
            <strong>Assessment Serial ID:</strong> <span style="font-family:monospace; font-weight:700; color:#1e1b4b;">${serialId}</span> &nbsp;|&nbsp;
            <strong>Date:</strong> ${dateStr}
          </div>
        </div>
        <div style="text-align:right; font-size:11px;">
          <div><strong>SCORE AWARDED:</strong> <span style="font-size:15px; font-weight:800; color:#1e1b4b;">${netScore} / ${maxScore}</span></div>
          <div><strong>ACCURACY:</strong> ${accPct}% (${correct}C / ${wrong}W / ${skipped}U)</div>
          <div><strong>PACE PER Q:</strong> ${paceSec}s/Q &bull; <strong>VERDICT:</strong> ${paceVerdict}</div>
        </div>
      </div>
      ${qRowsHtml}
    </div>
  `;

  const origTitle = document.title;
  document.title = `${hostTag}_Marksheet_${serialId}_${safeCand}`;
  window.print();
  setTimeout(() => { document.title = origTitle; }, 1000);
};

// Inject @media print rule so printing ONLY renders #official-print-marksheet (hiding web nav/buttons)
(function injectCleanPrintCss() {
  if (document.getElementById("clean-marksheet-print-css")) return;
  const st = document.createElement("style");
  st.id = "clean-marksheet-print-css";
  st.textContent = `
    #official-print-marksheet { display: none; }
    @media print {
      body > *:not(#official-print-marksheet) { display: none !important; }
      #official-print-marksheet { display: block !important; background: #ffffff !important; color: #000000 !important; }
    }
  `;
  document.head.appendChild(st);
})();

// Fix TITA badges in live DOM & wire Print button to printOfficialDiagnosticMarksheet() + assign Serial ID on every mock
(function patchLiveMockUiAndSerialId() {
  setInterval(() => {
    const printBtn = document.querySelector("#btn-export-mock-sheet button[onclick*='print']");
    if (printBtn) {
      printBtn.setAttribute("onclick", "window.printOfficialDiagnosticMarksheet()");
    }
    // Fix MCQ (+3 / -1) badge on TITA cards in live view
    document.querySelectorAll("#tab-content > div > div").forEach(card => {
      const txt = card.innerText || "";
      if (/\[TITA|TITA Parajumble|TITA Odd-One-Out|TITA Para-Completion|TITA Tournament|TITA Caselet/i.test(txt)) {
        card.querySelectorAll("span").forEach(sp => {
          if (sp.textContent.trim() === "MCQ (+3 / -1)") {
            sp.textContent = "TITA (+3 / 0)";
            sp.className = "px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold";
          }
        });
      }
    });
  }, 400);

  const origSave = window.saveMockAttemptRecord;
  if (typeof origSave === "function") {
    window.saveMockAttemptRecord = function (rec) {
      const hostTag = window.location.host.includes("gmat") ? "GMAT" : (window.location.host.includes("gre") ? "GRE" : "CAT");
      const serialId = window.ACTIVE_MOCK_SERIAL_ID || window.generateAssessmentSerialId(hostTag);
      window.ACTIVE_MOCK_SERIAL_ID = serialId;
      rec.serialId = serialId;
      rec.paperType = `[${serialId}] ${rec.paperType}`;
      return origSave.call(this, rec);
    };
  }
})();

// ==============================================================================
// MARKSHEET V2: REAL CANDIDATE NAME, YYYY-MM-DD FILENAME, SECTIONAL SUMMARY & CLEAN MATH
// ==============================================================================
window.cleanMathText = function (str) {
  return String(str || "")
    .replace(/\$/g, "")
    .replace(/\\_/g, "_")
    .replace(/E_1/g, "E₁").replace(/E_2/g, "E₂").replace(/E_3/g, "E₃")
    .replace(/D_4/g, "D₄")
    .replace(/v_A/g, "vₐ").replace(/v_B/g, "vᵦ")
    .replace(/log_2/g, "log₂").replace(/log_4/g, "log₄").replace(/log_8/g, "log₈")
    .replace(/\\times/g, "×").replace(/\*/g, "×")
    .replace(/\\equiv/g, "≡").replace(/\\ge/g, "≥").replace(/\\le/g, "≤")
    .replace(/\\alpha/g, "α").replace(/\\beta/g, "β")
    .replace(/\\mathcal\{O\}raw/g, "Draw")
    .replace(/\\sqrt\{([^}]+)\}/g, "√($1)")
    .replace(/\^\{2\}/g, "²").replace(/\^2/g, "²")
    .replace(/\^\{3\}/g, "³").replace(/\^3/g, "³")
    .replace(/\^\{19\}/g, "¹⁹").replace(/\^\{5\}/g, "⁵");
};

window.resolveCandidateName = function () {
  if (window.IPM_USER && window.IPM_USER.name) return String(window.IPM_USER.name).trim();
  try {
    const u = JSON.parse(localStorage.getItem("ipm_user") || localStorage.getItem("goalisb_user") || "{}");
    if (u && u.name) return String(u.name).trim();
  } catch (e) {}
  const hdrTxt = (document.querySelector("header")?.innerText || "").replace(/Master Engine/g, "");
  const m = hdrTxt.match(/([A-Z][a-z]{1,15}\s+[A-Z][a-z]{1,15})/);
  if (m && !/Target Campuses|Dark Mode|Free Demo|Standard|Speed Track/i.test(m[1])) return m[1];
  return "Dina Shah";
};

window.printOfficialDiagnosticMarksheet = function () {
  const qs = window.MOCK_QUESTIONS_CACHE || [];
  if (!qs.length) {
    alert("Start and submit a mock first to generate your Official Diagnostic Marksheet.");
    return;
  }
  const hostTag = window.location.host.includes("gmat") ? "GMAT" : (window.location.host.includes("gre") ? "GRE" : "CAT");
  const serialId = window.ACTIVE_MOCK_SERIAL_ID || window.generateAssessmentSerialId(hostTag);
  window.ACTIVE_MOCK_SERIAL_ID = serialId;

  const candidateName = window.resolveCandidateName();
  const safeCand = candidateName.replace(/\s+/g, "_");
  const isoDate = new Date().toISOString().slice(0, 10);
  const dateStr = new Date().toLocaleDateString("en-GB");

  const answers = window.MOCK_ANSWERS || {};
  let correct = 0, wrong = 0, skipped = 0, netScore = 0;
  const posMark = hostTag === "CAT" ? 3 : 1;
  const negMark = hostTag === "CAT" ? -1 : 0;
  const secStats = {};

  const qRowsHtml = qs.map((q, idx) => {
    const secKey = String(q.section || "GENERAL").toUpperCase();
    if (!secStats[secKey]) secStats[secKey] = { score: 0, max: 0, c: 0, w: 0, u: 0 };
    secStats[secKey].max += posMark;

    const isTita = !q.options || q.options.length === 0 || q.q_type === "SA_NUMERIC";
    const badgeText = isTita ? `TITA (+${posMark} / 0)` : `MCQ (+${posMark} / ${negMark})`;
    const userAns = answers[q.id];
    const hasAns = userAns !== undefined && String(userAns).trim() !== "";
    let statusLabel = "Unattempted (0 Marks)";
    let statusColor = "#64748b";
    let userDisplay = "(No response submitted)";

    if (hasAns) {
      if (isTita) {
        userDisplay = String(userAns).trim();
        const isRight = userDisplay.toLowerCase() === String(q.answer).trim().toLowerCase();
        if (isRight) {
          correct++; netScore += posMark; secStats[secKey].score += posMark; secStats[secKey].c++;
          statusLabel = `Correct (+${posMark} Marks)`; statusColor = "#059669";
        } else {
          wrong++; secStats[secKey].w++;
          statusLabel = "Incorrect TITA (0 Marks — Zero Penalty)"; statusColor = "#d97706";
        }
      } else {
        const uIdx = Number(userAns);
        userDisplay = `(${String.fromCharCode(65 + uIdx)}) ${q.options[uIdx] ?? userAns}`;
        if (uIdx === Number(q.answer)) {
          correct++; netScore += posMark; secStats[secKey].score += posMark; secStats[secKey].c++;
          statusLabel = `Correct (+${posMark} Marks)`; statusColor = "#059669";
        } else {
          wrong++; netScore += negMark; secStats[secKey].score += negMark; secStats[secKey].w++;
          statusLabel = `Incorrect (${negMark} Mark Negative Penalty)`; statusColor = "#dc2626";
        }
      }
    } else {
      skipped++; secStats[secKey].u++;
    }

    const officialAns = isTita
      ? String(q.answer)
      : `(${String.fromCharCode(65 + Number(q.answer))}) ${q.options[Number(q.answer)] ?? q.answer}`;

    return `
      <div style="border:1px solid #cbd5e1; border-radius:8px; padding:11px 14px; margin-bottom:10px; page-break-inside:avoid;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px; border-bottom:1px solid #e2e8f0; padding-bottom:4px;">
          <strong style="font-size:12px; color:#1e1b4b;">Question ${idx + 1} of ${qs.length} &bull; ${window.cleanMathText(q.section || "")} (${window.cleanMathText(q.topic || "")})</strong>
          <span style="font-size:11px; font-weight:700; color:${statusColor};">${badgeText} &bull; ${statusLabel}</span>
        </div>
        <div style="font-size:12px; color:#0f172a; margin-bottom:7px; white-space:pre-line;">${window.cleanMathText(q.prompt || q.stem || "")}</div>
        <div style="font-size:11px; background:#f8fafc; padding:5px 10px; border-radius:6px; margin-bottom:4px;">
          <strong>Your Submitted Response:</strong> <span style="color:${statusColor}; font-weight:600;">${window.cleanMathText(userDisplay)}</span>
        </div>
        <div style="font-size:11px; background:#ecfdf5; padding:5px 10px; border-radius:6px; color:#065f46;">
          <strong>Official Answer:</strong> ${window.cleanMathText(officialAns)}<br/>
          <strong>Solution:</strong> ${window.cleanMathText(q.explanation || "")}
        </div>
      </div>
    `;
  }).join("");

  const secStripHtml = Object.entries(secStats).map(([sec, st]) =>
    `<span style="display:inline-block; background:#f1f5f9; border:1px solid #cbd5e1; border-radius:6px; padding:3px 8px; margin-right:6px; font-size:10px;">
      <strong>${sec}:</strong> ${st.score}/${st.max} (${st.c}C/${st.w}W/${st.u}U)
    </span>`
  ).join("");

  const maxScore = qs.length * posMark;
  const attempted = correct + wrong;
  const accPct = attempted > 0 ? ((correct / attempted) * 100).toFixed(1) : "0.0";
  const totalMins = window.MOCK_PAPER_TYPE === "FULL_DIAGNOSTIC" ? 120 : 40;
  const elapsedSecs = Math.max(1, (totalMins * 60) - (window.MOCK_TIMER_SECONDS || 0));
  const paceSec = (elapsedSecs / Math.max(1, qs.length)).toFixed(1);
  const paceVerdict = elapsedSecs < qs.length * 15 ? "Rushed (High Risk of Operational Slips)" : (elapsedSecs <= totalMins * 60 ? "Balanced Exam Pacing" : "Over-Time");

  let printRoot = document.getElementById("official-print-marksheet");
  if (!printRoot) {
    printRoot = document.createElement("div");
    printRoot.id = "official-print-marksheet";
    document.body.appendChild(printRoot);
  }

  printRoot.innerHTML = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; color:#0f172a; padding:14px;">
      <div style="border-bottom:2px solid #1e1b4b; padding-bottom:10px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:flex-end;">
        <div>
          <div style="font-size:10px; font-weight:700; letter-spacing:1px; color:#4338ca; text-transform:uppercase;">GOALisB ${hostTag} Evaluation Engine</div>
          <h1 style="font-size:18px; font-weight:800; margin:2px 0; color:#0f172a;">OFFICIAL ${hostTag} DIAGNOSTIC MARKSHEET</h1>
          <div style="font-size:11px; color:#334155; margin-bottom:6px;">
            <strong>Candidate:</strong> ${candidateName} &nbsp;|&nbsp;
            <strong>Assessment Serial ID:</strong> <span style="font-family:monospace; font-weight:700; color:#1e1b4b;">${serialId}</span> &nbsp;|&nbsp;
            <strong>Date:</strong> ${dateStr}
          </div>
          <div>${secStripHtml}</div>
        </div>
        <div style="text-align:right; font-size:11px;">
          <div><strong>SCORE AWARDED:</strong> <span style="font-size:15px; font-weight:800; color:#1e1b4b;">${netScore} / ${maxScore}</span></div>
          <div><strong>ACCURACY:</strong> ${accPct}% (${correct}C / ${wrong}W / ${skipped}U)</div>
          <div><strong>PACE PER Q:</strong> ${paceSec}s/Q &bull; <strong>VERDICT:</strong> ${paceVerdict}</div>
        </div>
      </div>
      ${qRowsHtml}
    </div>
  `;

  const origTitle = document.title;
  document.title = `${hostTag}_Marksheet_${isoDate}_${serialId}_${safeCand}`;
  window.print();
  setTimeout(() => { document.title = origTitle; }, 1000);
};