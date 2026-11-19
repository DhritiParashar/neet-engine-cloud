window.PYQ_EXAM_FILTER = "ALL";
window.PYQ_YEAR_FILTER = "ALL";
window.PYQ_REVEALED = {};
window.PYQ_DB_ITEMS = [];
window.PYQ_LAST_QUERY_KEY = "";

window.loadPyqFromPostgres = async function () {
  const qKey = `${window.PYQ_EXAM_FILTER}|${window.PYQ_YEAR_FILTER}`;
  window.PYQ_LAST_QUERY_KEY = qKey;
  try {
    const res = await fetch(`/api/pyq?exam=${encodeURIComponent(window.PYQ_EXAM_FILTER)}&year=${encodeURIComponent(window.PYQ_YEAR_FILTER)}`);
    const data = await res.json();
    if (Array.isArray(data.questions)) {
      window.PYQ_DB_ITEMS = data.questions;
      window.renderActiveTab();
    }
  } catch (e) {
    console.warn("PYQ DB fetch fallback:", e);
  }
};

window.setPyqExamFilter = function (ex) {
  window.PYQ_EXAM_FILTER = ex;
  if (ex === "IIM Bangalore" && (window.PYQ_YEAR_FILTER === "2022" || window.PYQ_YEAR_FILTER === "2023")) {
    window.PYQ_YEAR_FILTER = "ALL";
  }
  window.PYQ_LAST_QUERY_KEY = "";
  window.renderActiveTab();
};

window.setPyqYearFilter = function (yr) {
  window.PYQ_YEAR_FILTER = yr;
  window.PYQ_LAST_QUERY_KEY = "";
  window.renderActiveTab();
};

window.togglePyqSolution = function (qid) {
  window.PYQ_REVEALED[qid] = !window.PYQ_REVEALED[qid];
  window.renderActiveTab();
};

window.renderTab9 = function (el) {
  const qKey = `${window.PYQ_EXAM_FILTER}|${window.PYQ_YEAR_FILTER}`;
  if (window.PYQ_LAST_QUERY_KEY !== qKey) {
    window.loadPyqFromPostgres();
  }

  const exams = ["ALL", "GRE General", "GRE General Rohtak", "OMETs", "IIM Bangalore"];
  const years = ["ALL", "2026", "2025", "2024", "2023", "2022"];
  const filtered = window.PYQ_DB_ITEMS;
  const isIimb = window.PYQ_EXAM_FILTER === "IIM Bangalore";

  el.innerHTML = `
    <div class="space-y-4">
      <div class="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-lg font-bold text-white">Past 5-Year Solved PYQ Archive (2022 – 2026) &bull; ${filtered.length} Questions</h2>
              <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">PostgreSQL Live</span>
            </div>
            <p class="text-xs text-slate-400">
              Queried directly from Neon PostgreSQL (<code class="text-indigo-300">ipm_questions WHERE is_pyq = TRUE</code>).
            </p>
          </div>
          <div class="flex flex-wrap gap-1.5">
            ${years.map(yr => {
              const preIimb = isIimb && (yr === "2022" || yr === "2023");
              const active = window.PYQ_YEAR_FILTER === yr;
              return `<button type="button" ${preIimb ? "disabled" : ""} onclick="window.setPyqYearFilter('${yr}')"
                title="${preIimb ? "IIM Bangalore UG exams began in 2024 (no 2022/2023 paper)" : ""}"
                class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  preIimb
                    ? "bg-slate-950/40 text-slate-600 border border-slate-800/50 cursor-not-allowed line-through"
                    : active
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "bg-slate-950 text-slate-300 border border-slate-800 hover:border-amber-400"
                }">${yr === "ALL" ? "All Years" : yr}</button>`;
            }).join("")}
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          ${exams.map(ex => `
            <button type="button" onclick="window.setPyqExamFilter('${ex}')"
              class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                window.PYQ_EXAM_FILTER === ex
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-slate-950 text-slate-300 border border-slate-800 hover:border-indigo-500"
              }">${ex === "ALL" ? "All Exams" : ex}</button>
          `).join("")}
        </div>

        ${isIimb ? `
          <div class="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 text-xs text-sky-200">
            <strong>Historical Timeline Note (IIM Bangalore UG):</strong> IIM Bangalore launched its undergraduate entrance exams in <strong>2024</strong> (BBA in Digital Business &amp; Entrepreneurship) and <strong>2026</strong> (residential B.Sc. Hons in Economics &amp; Data Science). Pre-2024 years (2022–2023) did not exist for IIMB.
          </div>
        ` : ""}
      </div>

      <div class="space-y-3">
        ${filtered.map((q, idx) => `
          <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold">${q.exam} &bull; ${q.year}</span>
                <span class="text-xs text-slate-400 font-semibold">${q.section} (${q.topic})</span>
              </div>
              <span class="text-[11px] text-slate-500 font-mono">${q.id}</span>
            </div>

            <p class="text-xs md:text-sm text-slate-100 leading-relaxed whitespace-pre-line">${q.prompt}</p>

            ${Array.isArray(q.options) && q.options.length ? `
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                ${q.options.map((opt, oi) => `
                  <div class="p-2.5 rounded-xl bg-slate-950 border ${window.PYQ_REVEALED[q.id] && q.answer === oi ? "border-emerald-500 text-emerald-300 font-bold" : "border-slate-800 text-slate-300"}">
                    <span class="font-bold mr-1.5">${String.fromCharCode(65 + oi)}.</span> ${opt}
                  </div>
                `).join("")}
              </div>
            ` : ""}

            <div class="pt-1">
              <button type="button" onclick="window.togglePyqSolution('${q.id}')"
                class="px-3.5 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                ${window.PYQ_REVEALED[q.id] ? "Hide Official Solution" : "View Answer & Step-by-Step Solution"}
              </button>
            </div>

            ${window.PYQ_REVEALED[q.id] ? `
              <div class="p-3.5 rounded-xl bg-slate-950 border border-emerald-600/40 text-xs text-emerald-200 space-y-1">
                <div><strong>Correct Answer:</strong> ${Array.isArray(q.options) && q.options.length ? `${String.fromCharCode(65 + q.answer)} (${q.options[q.answer]})` : q.answer}</div>
                <div><strong>Step-by-Step Solution:</strong> ${q.explanation}</div>
              </div>
            ` : ""}
          </div>
        `).join("")}
      </div>
    </div>
  `;
};