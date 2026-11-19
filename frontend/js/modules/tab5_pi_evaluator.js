window.PI_PREP_SECONDS = 60;
window.PI_PREP_INTERVAL = null;
window.PI_GROUP_FILTER = "ALL";
window.PI_SUBDOMAIN_FILTER = "ALL"; window.PI_HORIZON_FILTER = "ALL";
window.PI_SELECTED_IDX = 0;
window.LIVE_CA_PROMPTS = [];
window.LIVE_CA_LOADING = false;

window.fetchLiveCurrentAffairs = async function (forceRefresh = false) {
  if (window.LIVE_CA_LOADING) return;
  window.LIVE_CA_LOADING = true;
  if (forceRefresh) window.renderActiveTab();
  try {
    const endpoint = forceRefresh ? "/api/current-affairs/refresh" : "/api/current-affairs";
    const res = await fetch(endpoint, { method: forceRefresh ? "POST" : "GET" });
    const data = await res.json();
    if (Array.isArray(data.items)) {
      window.LIVE_CA_PROMPTS = data.items;
    }
  } catch (e) {
    console.warn("Live CA sync skipped:", e);
  } finally {
    window.LIVE_CA_LOADING = false;
    if (window.IPM_STATE.activeTab === "tab5") window.renderActiveTab();
  }
};

window.getFilteredPiPrompts = function () {
  const staticAll = window.IPM_TAGGED_PI_PROMPTS || [];
  const recentPast = window.IPM_RECENT_PAST_CA || []; const all = [...window.LIVE_CA_PROMPTS, ...recentPast, ...staticAll];
  const modeId = window.IPM_STATE.activeModeId;
  return all.filter(p => {
    const modeOk = modeId === "ALL_IIM_MASTER" || !p.exams || p.exams.includes(modeId);
    const grpOk = window.PI_GROUP_FILTER === "ALL" || (p.group || "Campus Fit & Vision") === window.PI_GROUP_FILTER;
    const subOk = window.PI_GROUP_FILTER !== "Current Affairs & Policy" ||
                  window.PI_SUBDOMAIN_FILTER === "ALL" ||
                  (p.subDomain || "Economic") === window.PI_SUBDOMAIN_FILTER;
    const horOk = window.PI_GROUP_FILTER !== "Current Affairs & Policy" || window.PI_HORIZON_FILTER === "ALL" || (p.horizon || "Live Weekly") === window.PI_HORIZON_FILTER; return modeOk && grpOk && subOk && horOk;
  });
};

window.startExtemporeTimer = function () {
  if (window.PI_PREP_INTERVAL) clearInterval(window.PI_PREP_INTERVAL);
  window.PI_PREP_SECONDS = 60;
  window.PI_PREP_INTERVAL = setInterval(() => {
    window.PI_PREP_SECONDS--;
    const el = document.getElementById("pi-prep-clock");
    if (el) el.textContent = Math.max(0, window.PI_PREP_SECONDS) + "s";
    if (window.PI_PREP_SECONDS <= 0) clearInterval(window.PI_PREP_INTERVAL);
  }, 1000);
};

window.renderTab5 = function (el) { if (typeof window.GMAT_TRAPS_18 !== "undefined" || typeof window.GRE_TRAPS_18 !== "undefined" || typeof window.CAT_TRAPS_18 !== "undefined") { return window.renderTrapClinic5(el); }
  if (!window.LIVE_CA_PROMPTS.length && !window.LIVE_CA_LOADING) {
    window.fetchLiveCurrentAffairs(false);
  }
  const mode = window.getActiveMode();
  const prompts = window.getFilteredPiPrompts();
  if (window.PI_SELECTED_IDX >= prompts.length) window.PI_SELECTED_IDX = 0;
  const activePrompt = prompts[window.PI_SELECTED_IDX] || prompts[0];
  const isJipmat = window.IPM_STATE.activeModeId === "OMETs_BG_JAMMU";
  const groups = ["ALL", "Campus Fit & Vision", "Class 12 Academics", "Extempore & WAT", "Current Affairs & Policy", "Behavioral & Ethics"];
  const subDomains = ["ALL", "Economic", "Social", "Civic", "Domestic", "International"];

  el.innerHTML = `
    ${isJipmat ? `
      <div class="mb-4 p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-xs text-amber-300">
        <strong>Admission Note for IIM Bodh Gaya & IIM Jammu (OMETs):</strong> Both campuses admit 100% based on OMETs CBT score with <strong>no Personal Interview (PI) round</strong>. Use this query bank for optional WAT, leadership, and future internship interview prep.
      </div>
    ` : ""}

    <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 mb-4 space-y-2.5">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="flex flex-wrap gap-1.5">
          ${groups.map(g => `
            <button onclick="window.setPiGroup('${g}')"
              class="px-3 py-1 rounded-lg text-xs font-bold transition ${
                window.PI_GROUP_FILTER === g
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-950 text-slate-300 border border-slate-800 hover:border-indigo-500"
              }">${g === "ALL" ? "All Categories" : g}</button>
          `).join("")}
        </div>
        <div class="flex flex-wrap gap-2">
          <button onclick="window.fetchLiveCurrentAffairs(true)" class="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm">
            ${window.LIVE_CA_LOADING ? "Syncing Live News..." : "&#128260; Sync Live Weekly News"}
          </button>
          <button onclick="window.pickRandomPiPrompt()" class="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-sm">
            &#127922; Random Rapid-Fire
          </button>
        </div>
      </div>

      ${window.PI_GROUP_FILTER === "Current Affairs & Policy" ? `
        <div class="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-800">
          <span class="text-[11px] font-bold text-amber-300 mr-1">Horizon:</span>${["ALL", "Live Weekly", "Recent Past (6-12 Months)"].map(h => `<button onclick="window.setPiHorizon('${h}')" class="px-2.5 py-0.5 rounded-md text-[11px] font-bold transition ${window.PI_HORIZON_FILTER === h ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-300 border border-slate-800'}">${h === 'ALL' ? 'All Horizons' : h}</button>`).join("")}<span class="text-[11px] font-bold text-slate-400 ml-2 mr-1">Pillar:</span>
          ${subDomains.map(sd => `
            <button onclick="window.setPiSubDomain('${sd}')"
              class="px-2.5 py-0.5 rounded-md text-[11px] font-bold transition ${
                window.PI_SUBDOMAIN_FILTER === sd
                  ? "bg-cyan-600 text-white"
                  : "bg-slate-950 text-slate-300 border border-slate-800 hover:border-cyan-500"
              }">${sd}</button>
          `).join("")}
        </div>
      ` : ""}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <div class="lg:col-span-5 space-y-3 lg:h-[calc(100vh-285px)] lg:overflow-y-auto lg:pr-2 pane-scroll">
        <h2 class="text-sm font-bold uppercase tracking-wider text-indigo-400">${mode.label} Query Bank (${prompts.length} Prompts)</h2>
        ${prompts.map((p, i) => `
          <div onclick="window.loadPiPrompt(${i})"
            class="cursor-pointer rounded-xl p-4 border transition space-y-2 ${
              i === window.PI_SELECTED_IDX
                ? "bg-indigo-950/70 border-indigo-500"
                : "bg-slate-900/90 border-slate-800 hover:border-slate-600"
            }">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-[11px] font-bold text-amber-300">${p.campus}</span>
              <div class="flex gap-1">
                ${p.subDomain ? `<span class="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold">${p.subDomain}</span>` : ""}
                <span class="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-700 text-slate-300">${p.dateTag || p.group || "PI"}</span>
              </div>
            </div>
            <p class="text-xs text-slate-200 leading-relaxed font-medium">#${i + 1}. ${p.prompt}</p>
            <ul class="list-disc list-inside text-[11px] text-slate-400 space-y-1">
              ${(p.rubricHints || []).map(h => `<li>${h}</li>`).join("")}
            </ul>
          </div>
        `).join("")}
      </div>

      <div class="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 lg:h-[calc(100vh-285px)] lg:overflow-y-auto pane-scroll">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 class="text-lg font-bold text-indigo-300">Live IIM Admissions Panel AI Evaluator</h3>
            <p class="text-[11px] text-slate-400">Prompt ${window.PI_SELECTED_IDX + 1} of ${prompts.length} &bull; ${activePrompt ? activePrompt.category : ""}</p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="window.stepPiPrompt(-1)" ${window.PI_SELECTED_IDX === 0 ? "disabled" : ""} class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-white">&larr; Prev</button>
            <button onclick="window.stepPiPrompt(1)" ${window.PI_SELECTED_IDX >= prompts.length - 1 ? "disabled" : ""} class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-white">Next &rarr;</button>
            <button onclick="window.startExtemporeTimer()" class="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-bold">
              &#9201; 1-Min Prep: <span id="pi-prep-clock">${window.PI_PREP_SECONDS}s</span>
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-300 mb-1">Active Prompt (${activePrompt ? activePrompt.campus : mode.label})</label>
          <textarea id="pi-prompt-input" rows="3" class="w-full rounded-xl bg-slate-950 border border-slate-700 p-3 text-xs md:text-sm text-white leading-relaxed">${activePrompt ? activePrompt.prompt : ""}</textarea>
        </div>

        ${activePrompt ? `
          <div class="p-3 rounded-xl bg-slate-950/90 border border-indigo-500/30 text-xs space-y-1">
            <div class="font-bold text-indigo-300 text-[11px] uppercase tracking-wider">Panel Evaluation Rubric & Key Angles to Hit:</div>
            <ul class="list-disc list-inside text-slate-300 space-y-0.5">
              ${(activePrompt.rubricHints || []).map(h => `<li>${h}</li>`).join("")}
            </ul>
          </div>
        ` : ""}

        <div>
          <label class="block text-xs font-bold text-slate-300 mb-1">Your Structured Response (120–250 words)</label>
          <textarea id="pi-student-response" rows="6" placeholder="Structure: (1) Direct opening thesis -> (2) Quantitative/Economic reasoning -> (3) Concrete example -> (4) Balanced managerial conclusion..." class="w-full rounded-xl bg-slate-950 border border-slate-700 p-3 text-xs text-white"></textarea>
        </div>

        <button onclick="window.submitPiEvaluation()" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow">
          Evaluate Response with IIM Panel AI
        </button>

        <div id="pi-eval-output" class="hidden p-4 rounded-xl bg-slate-950 border border-indigo-500/40 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed"></div>
      </div>
    </div>
  `;
};

window.setPiGroup = function (g) { window.PI_GROUP_FILTER = g; window.PI_SUBDOMAIN_FILTER = "ALL"; window.PI_HORIZON_FILTER = "ALL"; window.PI_SELECTED_IDX = 0; window.renderActiveTab(); };
window.setPiSubDomain = function (sd) { window.PI_SUBDOMAIN_FILTER = sd; window.PI_SELECTED_IDX = 0; window.renderActiveTab(); }; window.setPiHorizon = function (h) { window.PI_HORIZON_FILTER = h; window.PI_SELECTED_IDX = 0; window.renderActiveTab(); };
window.loadPiPrompt = function (idx) { window.PI_SELECTED_IDX = idx; window.renderActiveTab(); };
window.stepPiPrompt = function (delta) {
  const total = window.getFilteredPiPrompts().length;
  window.PI_SELECTED_IDX = Math.max(0, Math.min(total - 1, window.PI_SELECTED_IDX + delta));
  window.renderActiveTab();
};
window.pickRandomPiPrompt = function () {
  const total = window.getFilteredPiPrompts().length;
  if (total > 1) {
    let next = Math.floor(Math.random() * total);
    if (next === window.PI_SELECTED_IDX) next = (next + 1) % total;
    window.PI_SELECTED_IDX = next;
    window.renderActiveTab();
  }
};

window.submitPiEvaluation = async function () {
  const prompt = document.getElementById("pi-prompt-input").value.trim();
  const resp = document.getElementById("pi-student-response").value.trim();
  const out = document.getElementById("pi-eval-output");
  if (!resp) { alert("Please enter your response first."); return; }
  out.classList.remove("hidden");
  out.textContent = "Evaluating response against IIM Admissions Panel rubric...";
  try {
    const r = await fetch("/api/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ track: window.getActiveMode().label, prompt: prompt, student_response: resp, mode: "PI_OR_WAT" })
    });
    const data = await r.json();
    out.textContent = data.feedback || JSON.stringify(data);
  } catch (e) {
    out.textContent = "Error reaching /api/evaluate: " + e.message;
  }
};