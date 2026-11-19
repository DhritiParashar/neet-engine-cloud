window.DOUBT_DOMAIN_FILTER = "ALL";
window.DOUBT_SELECTED_IDX = 0;
window.DOUBT_MODE = "SOCRATIC_HINT"; // "SOCRATIC_HINT" | "SHORTCUT_30S" | "FULL_STEP_BY_STEP"
window.DOUBT_CHAT_HISTORY = [];

window.getFilteredDoubts = function () {
  const all = window.IPM_DOUBT_BANK || [];
  return window.DOUBT_DOMAIN_FILTER === "ALL"
    ? all
    : all.filter(d => d.domain === window.DOUBT_DOMAIN_FILTER);
};

window.renderModeSpecificBox = function (d) {
  if (!d) return "";
  if (window.DOUBT_MODE === "SOCRATIC_HINT") {
    return `
      <div class="p-4 rounded-xl bg-indigo-950/35 border border-indigo-500/40 text-xs space-y-2">
        <div class="font-bold text-indigo-300 uppercase text-[10px] tracking-wider">Mode 1 Active: Socratic Guiding Hint (Think Before Peeking)</div>
        <div class="text-slate-100 leading-relaxed"><strong>Guiding Question:</strong> ${d.socraticNudge}</div>
        <div class="text-[11px] text-slate-400 italic">Try working out the next line on scrap paper, or click "2. 30-Second Exam Shortcut" above once ready.</div>
      </div>
    `;
  }
  if (window.DOUBT_MODE === "SHORTCUT_30S") {
    return `
      <div class="p-4 rounded-xl bg-emerald-950/35 border border-emerald-500/40 text-xs space-y-2">
        <div class="font-bold text-emerald-300 uppercase text-[10px] tracking-wider">Mode 2 Active: 30-Second Exam Shortcut & Mental Math</div>
        <div class="text-emerald-100 font-medium leading-relaxed">${d.shortcutSolution}</div>
      </div>
    `;
  }
  return `
    <div class="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs space-y-2.5">
      <div class="font-bold text-amber-300 uppercase text-[10px] tracking-wider">Mode 3 Active: Full Step-by-Step Derivation + Examiner Trap Check</div>
      <div class="text-slate-100 whitespace-pre-line leading-relaxed font-mono text-[11px] bg-slate-950/80 p-3 rounded-lg border border-slate-800">${d.fullDerivation}</div>
      <div class="p-2.5 rounded-lg bg-rose-950/40 border border-rose-700/40 text-rose-200">
        <strong>Examiner Trap Warning:</strong> ${d.trapWarning}
      </div>
    </div>
  `;
};

window.renderTab7 = function (el) {
  const list = window.getFilteredDoubts();
  if (window.DOUBT_SELECTED_IDX >= list.length) window.DOUBT_SELECTED_IDX = 0;
  const activeDoubt = list[window.DOUBT_SELECTED_IDX] || list[0];
  const domains = ["ALL", "Quant Core", "Higher Math & Stats", "DI & Logical Reasoning", "VARC & Grammar"];
  const modes = [
    { id: "SOCRATIC_HINT", label: "1. Socratic Guiding Hint (Think First)", activeCls: "bg-indigo-600 text-white" },
    { id: "SHORTCUT_30S", label: "2. 30-Second Exam Shortcut", activeCls: "bg-emerald-600 text-white" },
    { id: "FULL_STEP_BY_STEP", label: "3. Full Derivation + Trap Check", activeCls: "bg-amber-500 text-slate-950" }
  ];
  const symbols = ["√", "π", "∑", "∫", "log_", "≡", "≠", "≤", "≥", "∞", "α", "β"];

  el.innerHTML = `
    <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 mb-4 flex flex-wrap items-center justify-between gap-2">
      <div class="flex flex-wrap gap-1.5">
        ${domains.map(d => `
          <button onclick="window.setDoubtDomain('${d}')"
            class="px-3 py-1 rounded-lg text-xs font-bold transition ${
              window.DOUBT_DOMAIN_FILTER === d
                ? "bg-indigo-600 text-white"
                : "bg-slate-950 text-slate-300 border border-slate-800 hover:border-indigo-500"
            }">${d === "ALL" ? "All Domains (" + (window.IPM_DOUBT_BANK || []).length + ")" : d}</button>
        `).join("")}
      </div>
      <button onclick="window.pickRandomDoubt()" class="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-sm">
        &#127922; Random Stuck-Point
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <div class="lg:col-span-5 space-y-3 lg:h-[calc(100vh-275px)] lg:overflow-y-auto lg:pr-2 pane-scroll">
        <div class="text-xs font-bold uppercase tracking-wider text-indigo-400">
          Curated Conceptual Stuck-Points (${list.length} Doubts)
        </div>
        ${list.map((d, i) => {
          const cardPreview = window.DOUBT_MODE === "SOCRATIC_HINT"
            ? `<div class="p-2.5 rounded-lg bg-slate-950/80 border border-indigo-500/20 text-[11px] text-indigo-200"><strong>Socratic Hint:</strong> ${d.socraticNudge}</div>`
            : window.DOUBT_MODE === "SHORTCUT_30S"
            ? `<div class="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-[11px] text-emerald-200"><strong>30s Shortcut:</strong> ${d.shortcutSolution}</div>`
            : `<div class="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/30 text-[11px] text-rose-200"><strong>Trap Alert:</strong> ${d.trapWarning}</div>`;

          return `
            <div onclick="window.loadDoubtCard(${i})"
              class="cursor-pointer rounded-xl p-4 border transition space-y-2 ${
                i === window.DOUBT_SELECTED_IDX
                  ? "bg-indigo-950/70 border-indigo-500"
                  : "bg-slate-900/90 border-slate-800 hover:border-slate-600"
              }">
              <div class="flex items-center justify-between gap-2">
                <span class="text-[11px] font-bold text-amber-300">${d.domain} &bull; ${d.topic}</span>
                <span class="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-700 text-slate-300">${d.examTag}</span>
              </div>
              <p class="text-xs text-slate-200 leading-relaxed font-medium">#${i + 1}. ${d.question}</p>
              ${cardPreview}
            </div>
          `;
        }).join("")}
      </div>

      <div class="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 lg:h-[calc(100vh-275px)] lg:overflow-y-auto pane-scroll">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h2 class="text-lg font-bold text-indigo-300">Socratic Concept & Doubt Solver</h2>
            <p class="text-[11px] text-slate-400">
              Stuck-Point ${window.DOUBT_SELECTED_IDX + 1} of ${list.length} &bull; Switch modes below to inspect Hint, Shortcut, or Full Proof
            </p>
          </div>
          <div class="flex items-center gap-1.5">
            <button onclick="window.stepDoubt(-1)" ${window.DOUBT_SELECTED_IDX === 0 ? "disabled" : ""} class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-white">&larr; Prev</button>
            <button onclick="window.stepDoubt(1)" ${window.DOUBT_SELECTED_IDX >= list.length - 1 ? "disabled" : ""} class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-white">Next &rarr;</button>
          </div>
        </div>

        <div class="flex flex-wrap gap-1.5">
          ${modes.map(m => `
            <button onclick="window.setDoubtMode('${m.id}')"
              class="px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                window.DOUBT_MODE === m.id
                  ? m.activeCls
                  : "bg-slate-950 text-slate-300 border border-slate-800 hover:border-indigo-500"
              }">${m.label}</button>
          `).join("")}
        </div>

        ${window.renderModeSpecificBox(activeDoubt)}

        <div class="space-y-2">
          <div class="flex flex-wrap items-center justify-between gap-1">
            <label class="text-xs font-bold text-slate-300">Ask Custom Doubt or Follow-Up Question:</label>
            <div class="flex flex-wrap gap-1">
              ${symbols.map(sym => `
                <button type="button" onclick="window.insertDoubtSymbol('${sym}')"
                  class="px-2 py-0.5 rounded bg-slate-950 border border-slate-700 hover:border-indigo-500 font-mono text-[11px] text-amber-300">${sym}</button>
              `).join("")}
            </div>
          </div>
          <textarea id="doubt-question-input" rows="3" class="w-full rounded-xl bg-slate-950 border border-slate-700 p-3 text-xs md:text-sm text-white leading-relaxed">${activeDoubt ? activeDoubt.question : ""}</textarea>
        </div>

        <div class="flex flex-wrap gap-2">
          <button onclick="window.askSocraticTutor()" class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow">
            Ask AI Tutor (${modes.find(x => x.id === window.DOUBT_MODE).label.split(". ")[1]})
          </button>
          <button onclick="window.clearDoubtHistory()" class="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300">
            Clear Thread
          </button>
        </div>

        <div id="doubt-tutor-output" class="hidden p-4 rounded-xl bg-slate-950 border border-indigo-500/40 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed"></div>

        ${window.DOUBT_CHAT_HISTORY.length ? `
          <div class="space-y-2 pt-2 border-t border-slate-800">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Session Doubt Log (${window.DOUBT_CHAT_HISTORY.length})</div>
            ${window.DOUBT_CHAT_HISTORY.map(item => `
              <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                <div class="font-bold text-amber-300">[${item.modeLabel}] Q: ${item.q}</div>
                <div class="text-slate-300 whitespace-pre-wrap">${item.a}</div>
              </div>
            `).join("")}
          </div>
        ` : ""}
      </div>
    </div>
  `;
};

window.setDoubtDomain = function (d) { window.DOUBT_DOMAIN_FILTER = d; window.DOUBT_SELECTED_IDX = 0; window.renderActiveTab(); };
window.setDoubtMode = function (m) { window.DOUBT_MODE = m; window.renderActiveTab(); };
window.loadDoubtCard = function (idx) { window.DOUBT_SELECTED_IDX = idx; window.renderActiveTab(); };
window.stepDoubt = function (delta) {
  const total = window.getFilteredDoubts().length;
  window.DOUBT_SELECTED_IDX = Math.max(0, Math.min(total - 1, window.DOUBT_SELECTED_IDX + delta));
  window.renderActiveTab();
};
window.pickRandomDoubt = function () {
  const total = window.getFilteredDoubts().length;
  if (total > 1) {
    let next = Math.floor(Math.random() * total);
    if (next === window.DOUBT_SELECTED_IDX) next = (next + 1) % total;
    window.DOUBT_SELECTED_IDX = next;
    window.renderActiveTab();
  }
};
window.insertDoubtSymbol = function (sym) {
  const ta = document.getElementById("doubt-question-input");
  if (!ta) return;
  const start = ta.selectionStart || ta.value.length;
  ta.value = ta.value.slice(0, start) + sym + ta.value.slice(start);
  ta.focus();
};
window.clearDoubtHistory = function () { window.DOUBT_CHAT_HISTORY = []; window.renderActiveTab(); };

window.askSocraticTutor = async function () {
  const q = document.getElementById("doubt-question-input").value.trim();
  const out = document.getElementById("doubt-tutor-output");
  if (!q) { alert("Enter a math, DILR, or verbal question first."); return; }
  out.classList.remove("hidden");
  out.textContent = "Generating response...";
  const modeLabel = window.DOUBT_MODE === "SOCRATIC_HINT" ? "Socratic Hint"
                  : window.DOUBT_MODE === "SHORTCUT_30S" ? "30s Shortcut"
                  : "Full Derivation + Trap";
  const modeInstruction = window.DOUBT_MODE === "SOCRATIC_HINT"
    ? "[STRICT MODE: SOCRATIC HINT ONLY — Do NOT reveal the final numeric/option answer yet. Ask 2 targeted guiding questions to help the student solve it.]"
    : window.DOUBT_MODE === "SHORTCUT_30S"
    ? "[STRICT MODE: 30-SECOND EXAM SHORTCUT — Show ONLY the fastest mental-math/elimination shortcut for GRE General/OMETs in 3-4 crisp lines.]"
    : "[STRICT MODE: FULL DERIVATION + TRAP CHECK — Provide the complete step-by-step mathematical/logical proof followed by the #1 examiner trap warning.]";

  try {
    const r = await fetch("/api/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        track: window.getActiveMode().label,
        prompt: `${modeInstruction}\nQuestion: ${q}`,
        student_response: "Respond strictly in the requested pedagogical mode.",
        mode: "DOUBT_SOLVER"
      })
    });
    const data = await r.json();
    const reply = data.feedback || JSON.stringify(data);
    out.textContent = reply;
    window.DOUBT_CHAT_HISTORY.unshift({ modeLabel: modeLabel, q: q, a: reply });
  } catch (e) {
    out.textContent = "Error reaching /api/evaluate: " + e.message;
  }
};