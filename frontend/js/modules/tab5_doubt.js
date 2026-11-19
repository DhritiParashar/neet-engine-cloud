window.renderTab5 = function (el) {
  el.innerHTML = `
    <div class="max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
      <h2 class="text-lg font-bold text-white">Socratic Aptitude & Higher Math Doubt Solver</h2>
      <p class="text-xs text-slate-400">Paste any Quant, Higher Math, DILR, or VARC question. The tutor breaks down traps, full derivations, and a 30-second exam shortcut.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs text-slate-400 mb-1">Topic / Pillar</label>
          <input id="doubt-topic" type="text" value="Logarithms & Inequalities / DILR" class="w-full rounded-xl bg-slate-950 border border-slate-700 p-2.5 text-xs text-white">
        </div>
        <div>
          <label class="block text-xs text-slate-400 mb-1">Target Exam</label>
          <input type="text" disabled value="${window.getActiveMode().label}" class="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-xs text-indigo-300">
        </div>
      </div>
      <div>
        <label class="block text-xs text-slate-400 mb-1">Question Text</label>
        <textarea id="doubt-question" rows="4" placeholder="Paste the full question here..." class="w-full rounded-xl bg-slate-950 border border-slate-700 p-3 text-xs text-white"></textarea>
      </div>
      <div>
        <label class="block text-xs text-slate-400 mb-1">Your Attempt / Where You Got Stuck (Optional)</label>
        <input id="doubt-attempt" type="text" placeholder="e.g., Got two roots x=4 and x=1, unsure which to reject..." class="w-full rounded-xl bg-slate-950 border border-slate-700 p-2.5 text-xs text-white">
      </div>
      <button onclick="window.submitDoubt()" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white">
        Solve Step-by-Step + 30s Shortcut
      </button>
      <div id="doubt-output" class="hidden p-4 rounded-xl bg-slate-950 border border-emerald-500/40 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed"></div>
    </div>
  `;
};

window.submitDoubt = async function () {
  const topic = document.getElementById("doubt-topic").value.trim();
  const question = document.getElementById("doubt-question").value.trim();
  const attempt = document.getElementById("doubt-attempt").value.trim();
  const out = document.getElementById("doubt-output");
  if (!question) {
    alert("Please enter a question first.");
    return;
  }
  out.classList.remove("hidden");
  out.textContent = "Generating step-by-step derivation & 30-second shortcut...";
  try {
    const r = await fetch("/api/doubt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        track: window.getActiveMode().label,
        topic: topic,
        question: question,
        student_attempt: attempt
      })
    });
    const data = await r.json();
    out.textContent = data.solution || JSON.stringify(data);
  } catch (e) {
    out.textContent = "Error: " + e.message;
  }
};