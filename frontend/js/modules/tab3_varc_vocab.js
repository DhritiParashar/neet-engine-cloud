window.renderTab3VarcVocab = function () {
  const container = document.getElementById("tab-content") || document.getElementById("main-tab-container");
  if (!container || !window.GRE_OFFICIAL_BANK) return;
  const bank = window.GRE_OFFICIAL_BANK.verbal;

  let tcHtml = bank.textCompletion.map((q, idx) => {
    const blankSelectors = q.blanks.map((opts, bIdx) => `
      <div class="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
        <div class="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-2">Blank (${["i","ii","iii"][bIdx]})</div>
        ${opts.map((opt, oIdx) => `
          <label class="flex items-center gap-2 py-1 text-sm cursor-pointer">
            <input type="radio" name="tc_${q.id}_b${bIdx}" value="${oIdx}" class="accent-indigo-600">
            <span>${opt}</span>
          </label>
        `).join("")}
      </div>
    `).join("");

    return `
      <div class="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <div class="flex justify-between items-center">
          <span class="px-2.5 py-1 text-xs font-bold rounded-full bg-indigo-100 text-indigo-800">${q.subtype}</span>
          <span class="text-xs font-medium text-slate-500">${q.difficulty}</span>
        </div>
        <p class="text-base leading-relaxed font-medium">${q.stem}</p>
        <div class="grid grid-cols-1 md:grid-cols-${q.blanks.length} gap-3">${blankSelectors}</div>
        <div class="flex items-center gap-3">
          <button onclick="checkGreTc('${q.id}', ${idx})" class="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold">Check All Blanks (No Partial Credit)</button>
          <span id="res_${q.id}" class="text-sm font-semibold"></span>
        </div>
        <div id="exp_${q.id}" class="hidden p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-sm text-emerald-900 dark:text-emerald-200">${q.explanation}</div>
      </div>
    `;
  }).join("");

  let seHtml = bank.sentenceEquivalence.map((q, idx) => `
    <div class="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm space-y-4">
      <div class="flex justify-between items-center">
        <span class="px-2.5 py-1 text-xs font-bold rounded-full bg-purple-100 text-purple-800">${q.subtype}</span>
        <span class="text-xs font-medium text-slate-500">${q.difficulty}</span>
      </div>
      <p class="text-base leading-relaxed font-medium">${q.stem}</p>
      <p class="text-xs text-slate-500">Select <strong>exactly two</strong> answer choices that produce coherent sentences with equivalent meaning:</p>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-2.5">
        ${q.options.map((opt, oIdx) => `
          <label class="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
            <input type="checkbox" name="se_${q.id}" value="${oIdx}" class="accent-purple-600">
            <span class="text-sm font-medium">${opt}</span>
          </label>
        `).join("")}
      </div>
      <div class="flex items-center gap-3">
        <button onclick="checkGreSe('${q.id}', ${idx})" class="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold">Verify Synonym Pair</button>
        <span id="res_${q.id}" class="text-sm font-semibold"></span>
      </div>
      <div id="exp_${q.id}" class="hidden p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-sm text-emerald-900 dark:text-emerald-200">${q.explanation}</div>
    </div>
  `).join("");

  let rcHtml = bank.readingComprehension.map((rc) => `
    <div class="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm space-y-4">
      <div class="flex justify-between items-center">
        <span class="px-2.5 py-1 text-xs font-bold rounded-full bg-teal-100 text-teal-800">${rc.subtype}</span>
        <span class="text-xs font-medium text-slate-500">${rc.difficulty}</span>
      </div>
      <div class="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-sm leading-relaxed space-y-1">
        <div class="text-xs font-semibold text-teal-700 mb-2">Click any sentence below when answering a Select-in-Passage prompt:</div>
        ${rc.passageSentences.map((s, sIdx) => `
          <span onclick="selectGrePassageSentence('${rc.id}', ${sIdx})" id="sent_${rc.id}_${sIdx}" class="cursor-pointer rounded px-1 transition hover:bg-amber-200/70 dark:hover:bg-amber-700/40">${s} </span>
        `).join("")}
      </div>
      ${rc.questions.map((rq) => `
        <div class="pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
          <div class="text-xs font-bold uppercase text-teal-600">${rq.format}</div>
          <p class="text-sm font-semibold">${rq.prompt}</p>
          ${rq.options ? rq.options.map((opt, oIdx) => `
            <label class="flex items-start gap-2 text-sm py-1 cursor-pointer">
              <input type="radio" name="rc_${rq.qid}" value="${oIdx}" class="mt-1 accent-teal-600">
              <span>${opt}</span>
            </label>
          `).join("") : `<div class="text-xs text-slate-500">Selected sentence index: <span id="sel_sent_${rc.id}" class="font-bold">None</span></div>`}
          <button onclick="checkGreRc('${rc.id}', '${rq.qid}')" class="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold">Check Answer</button>
          <span id="res_${rq.qid}" class="ml-2 text-xs font-bold"></span>
          <div id="exp_${rq.qid}" class="hidden p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-xs text-emerald-900 dark:text-emerald-200">${rq.explanation}</div>
        </div>
      `).join("")}
    </div>
  `).join("");

  container.innerHTML = `
    <div class="space-y-8">
      <div class="p-4 rounded-xl bg-indigo-950 text-white flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 class="text-xl font-bold">ETS GRE General — Verbal Reasoning Studio (130–170 Scale)</h2>
          <p class="text-xs text-slate-300 mt-1">Authentic ETS formats only: Text Completion (1/2/3 Blanks), Sentence Equivalence (Exact-2 Synonym Pairs) &amp; Academic Reading Comprehension. Zero grammar, parajumbles, or rote flashcards.</p>
        </div>
      </div>
      <section class="space-y-4"><h3 class="text-lg font-bold">1. Text Completion (1-, 2-, and 3-Blank Contextual Logic)</h3>${tcHtml}</section>
      <section class="space-y-4"><h3 class="text-lg font-bold">2. Sentence Equivalence (6-Choice Exact Synonym Pairs)</h3>${seHtml}</section>
      <section class="space-y-4"><h3 class="text-lg font-bold">3. Academic Reading Comprehension &amp; Select-in-Passage</h3>${rcHtml}</section>
    </div>
  `;
};

window.GRE_SELECTED_SENTENCE = {};
window.selectGrePassageSentence = function (rcId, sIdx) {
  window.GRE_SELECTED_SENTENCE[rcId] = sIdx;
  document.querySelectorAll(`[id^="sent_${rcId}_"]`).forEach(el => el.classList.remove("bg-amber-300", "text-slate-900"));
  const target = document.getElementById(`sent_${rcId}_${sIdx}`);
  if (target) target.classList.add("bg-amber-300", "text-slate-900");
  const badge = document.getElementById(`sel_sent_${rcId}`);
  if (badge) badge.textContent = `Sentence #${sIdx + 1}`;
};

window.checkGreTc = function (id, idx) {
  const q = window.GRE_OFFICIAL_BANK.verbal.textCompletion[idx];
  const chosen = q.blanks.map((_, bIdx) => {
    const el = document.querySelector(`input[name="tc_${id}_b${bIdx}"]:checked`);
    return el ? parseInt(el.value, 10) : -1;
  });
  const res = document.getElementById(`res_${id}`);
  const exp = document.getElementById(`exp_${id}`);
  if (chosen.includes(-1)) { res.textContent = "Select an option for every blank first."; res.className = "text-sm font-semibold text-amber-600"; return; }
  const ok = chosen.every((v, i) => v === q.correct[i]);
  res.textContent = ok ? "Correct! All blanks matched." : "Incorrect — ETS awards zero partial credit on multi-blank TC.";
  res.className = ok ? "text-sm font-semibold text-emerald-600" : "text-sm font-semibold text-rose-600";
  exp.classList.remove("hidden");
};

window.checkGreSe = function (id, idx) {
  const q = window.GRE_OFFICIAL_BANK.verbal.sentenceEquivalence[idx];
  const checked = Array.from(document.querySelectorAll(`input[name="se_${id}"]:checked`)).map(el => parseInt(el.value, 10)).sort();
  const res = document.getElementById(`res_${id}`);
  const exp = document.getElementById(`exp_${id}`);
  if (checked.length !== 2) { res.textContent = "Select exact 2 options."; res.className = "text-sm font-semibold text-amber-600"; return; }
  const ok = checked[0] === q.correct[0] && checked[1] === q.correct[1];
  res.textContent = ok ? "Correct! Equivalent pair matched." : `Incorrect. Correct pair: ${q.options[q.correct[0]]} & ${q.options[q.correct[1]]}.`;
  res.className = ok ? "text-sm font-semibold text-emerald-600" : "text-sm font-semibold text-rose-600";
  exp.classList.remove("hidden");
};

window.checkGreRc = function (rcId, qid) {
  const rc = window.GRE_OFFICIAL_BANK.verbal.readingComprehension.find(r => r.id === rcId);
  const rq = rc.questions.find(q => q.qid === qid);
  const res = document.getElementById(`res_${qid}`);
  const exp = document.getElementById(`exp_${qid}`);
  let ok = false;
  if (rq.format === "Select-in-Passage") {
    ok = window.GRE_SELECTED_SENTENCE[rcId] === rq.correctSentenceIndex;
  } else {
    const el = document.querySelector(`input[name="rc_${qid}"]:checked`);
    if (!el) { res.textContent = "Choose an option."; return; }
    ok = parseInt(el.value, 10) === rq.correct[0];
  }
  res.textContent = ok ? "Correct!" : "Incorrect — review passage logic below.";
  res.className = ok ? "ml-2 text-xs font-bold text-emerald-600" : "ml-2 text-xs font-bold text-rose-600";
  exp.classList.remove("hidden");
};