window.renderTab4 = function (el) {
  el.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <div class="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h2 class="text-lg font-bold text-white">8-IIM Composite Call & Eligibility Predictor</h2>
        <p class="text-xs text-slate-400">Enter your Class 10/12 marks and target mock scores to check shortlist readiness across Indore, Ranchi, Rohtak, Bodh Gaya, Jammu, Bangalore, Mumbai & Lucknow.</p>
        <div class="grid grid-cols-2 gap-3 text-xs">
          <div>
            <label class="text-slate-400">Class 10 %</label>
            <input id="cp-10" type="number" value="9.25" class="w-full mt-1 rounded-lg bg-slate-950 border border-slate-700 p-2 text-white">
          </div>
          <div>
            <label class="text-slate-400">Class 12 %</label>
            <input id="cp-12" type="number" value="24" class="w-full mt-1 rounded-lg bg-slate-950 border border-slate-700 p-2 text-white">
          </div>
          <div class="col-span-2 flex items-center gap-2">
            <input id="cp-math" type="checkbox" checked class="rounded">
            <label for="cp-math" class="text-slate-300">Studied Mathematics in Class 12 (Required for IIMB B.Sc. & IIM Mumbai BS)</label>
          </div>
          <div>
            <label class="text-slate-400">GRE General QA-SA (/60)</label>
            <input id="cp-ind-sa" type="number" value="24" class="w-full mt-1 rounded-lg bg-slate-950 border border-slate-700 p-2 text-white">
          </div>
          <div>
            <label class="text-slate-400">GRE General QA-MCQ (/120)</label>
            <input id="cp-ind-mcq" type="number" value="44" class="w-full mt-1 rounded-lg bg-slate-950 border border-slate-700 p-2 text-white">
          </div>
          <div>
            <label class="text-slate-400">GRE General VA (/180)</label>
            <input id="cp-ind-va" type="number" value="124" class="w-full mt-1 rounded-lg bg-slate-950 border border-slate-700 p-2 text-white">
          </div>
          <div>
            <label class="text-slate-400">GRE General Rohtak (/480)</label>
            <input id="cp-roh" type="number" value="390" class="w-full mt-1 rounded-lg bg-slate-950 border border-slate-700 p-2 text-white">
          </div>
          <div>
            <label class="text-slate-400">OMETs Score (/400)</label>
            <input id="cp-jip" type="number" value="320" class="w-full mt-1 rounded-lg bg-slate-950 border border-slate-700 p-2 text-white">
          </div>
          <div>
            <label class="text-slate-400">JEE Main %ile (IIM Mumbai)</label>
            <input id="cp-jee" type="number" step="0.1" value="96.5" class="w-full mt-1 rounded-lg bg-slate-950 border border-slate-700 p-2 text-white">
          </div>
        </div>
        <button onclick="window.runCallPredictor()" class="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white">
          Run 8-IIM Shortlist Prediction
        </button>
      </div>

      <div id="cp-results" class="lg:col-span-7 space-y-3">
        <div class="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 text-xs text-slate-400">
          Click <strong>Run 8-IIM Shortlist Prediction</strong> to view campus-by-campus eligibility, sectional cutoff checks, and academic weightage projections.
        </div>
      </div>
    </div>
  `;
};

window.runCallPredictor = async function () {
  const payload = {
    class10_pct: parseFloat(document.getElementById("cp-10").value) || 0,
    class12_pct: parseFloat(document.getElementById("cp-12").value) || 0,
    has_class12_math: document.getElementById("cp-math").checked,
    ipmat_indore_sa: parseInt(document.getElementById("cp-ind-sa").value) || 0,
    ipmat_indore_mcq: parseInt(document.getElementById("cp-ind-mcq").value) || 0,
    ipmat_indore_va: parseInt(document.getElementById("cp-ind-va").value) || 0,
    ipmat_rohtak_score: parseInt(document.getElementById("cp-roh").value) || 0,
    jipmat_score: parseInt(document.getElementById("cp-jip").value) || 0,
    iimb_ug_score: 240,
    jee_main_percentile: parseFloat(document.getElementById("cp-jee").value) || 0
  };
  const box = document.getElementById("cp-results");
  box.innerHTML = `<div class="p-4 text-xs text-indigo-300">Calculating 8-IIM shortlist probabilities...</div>`;
  try {
    const r = await fetch("/api/call-predictor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await r.json();
    box.innerHTML = (data.predictions || []).map(p => `
      <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-white text-sm">${p.campus}</h3>
          <span class="text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${
            p.eligible ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
          }">${p.status}</span>
        </div>
        <p class="text-xs text-slate-300 mt-1.5">${p.note}</p>
      </div>
    `).join("");
  } catch (e) {
    box.innerHTML = `<div class="p-4 text-xs text-rose-400">Error: ${e.message}</div>`;
  }
};