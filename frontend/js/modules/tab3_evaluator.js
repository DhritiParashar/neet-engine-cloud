window.renderTab3 = function (el) {
  const prompts = window.IPM_INTERVIEW_PI || [];
  el.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <div class="lg:col-span-5 space-y-3">
        <h2 class="text-base font-bold text-white">8-IIM Panel PI, Extempore & WAT Prompts</h2>
        ${prompts.map((p, i) => `
          <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
            <div class="text-[11px] font-bold text-amber-300">${p.campus} • ${p.category}</div>
            <p class="text-xs text-slate-200 leading-relaxed">${p.prompt}</p>
            <ul class="list-disc list-inside text-[11px] text-slate-400 space-y-1">
              ${p.rubricHints.map(h => `<li>${h}</li>`).join("")}
            </ul>
            <button onclick="window.loadPiPrompt(${i})" class="mt-2 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white">
              Load into AI Panel Grader
            </button>
          </div>
        `).join("")}
      </div>

      <div class="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 class="text-lg font-bold text-indigo-300">Live IIM Admissions Panel AI Evaluator</h3>
        <div>
          <label class="block text-xs text-slate-400 mb-1">Interview / WAT Prompt</label>
          <textarea id="pi-prompt-input" rows="3" class="w-full rounded-xl bg-slate-950 border border-slate-700 p-3 text-xs text-white">${prompts[0] ? prompts[0].prompt : ""}</textarea>
        </div>
        <div>
          <label class="block text-xs text-slate-400 mb-1">Your Structured Response (120–250 words)</label>
          <textarea id="pi-student-response" rows="6" placeholder="Write your structured answer here (Opening stand -> Analytical/Economic reasoning -> Concrete example -> Balanced conclusion)..." class="w-full rounded-xl bg-slate-950 border border-slate-700 p-3 text-xs text-white"></textarea>
        </div>
        <button onclick="window.submitPiEvaluation()" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white">
          Evaluate with IIM Panel AI
        </button>
        <div id="pi-eval-output" class="hidden p-4 rounded-xl bg-slate-950 border border-indigo-500/40 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed"></div>
      </div>
    </div>
  `;
};

window.loadPiPrompt = function (idx) {
  const p = (window.IPM_INTERVIEW_PI || [])[idx];
  if (p) document.getElementById("pi-prompt-input").value = p.prompt;
};

window.submitPiEvaluation = async function () {
  const prompt = document.getElementById("pi-prompt-input").value.trim();
  const resp = document.getElementById("pi-student-response").value.trim();
  const out = document.getElementById("pi-eval-output");
  if (!resp) {
    alert("Please enter your response first.");
    return;
  }
  out.classList.remove("hidden");
  out.textContent = "Evaluating response against IIM Admissions Panel rubric...";
  try {
    const r = await fetch("/api/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        track: window.getActiveMode().label,
        prompt: prompt,
        student_response: resp,
        mode: "PI_OR_WAT"
      })
    });
    const data = await r.json();
    out.textContent = data.feedback || JSON.stringify(data);
  } catch (e) {
    out.textContent = "Error reaching /api/evaluate: " + e.message;
  }
};