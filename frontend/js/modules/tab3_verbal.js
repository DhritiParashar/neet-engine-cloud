window.renderVerbalStudio3 = function (el) {
  const host = window.location.host.toLowerCase();
  const exam = host.includes("gmat") ? "GMAT" : (host.includes("gre") ? "GRE" : "CAT");

  const CAT_VERBAL = [
    {
      id: "cat_rc_1",
      kicker: "CAT VARC STUDIO • MODULE 1 OF 5 (MAIN IDEA & INFERENCE)",
      title: "Dense Reading Comprehension: Philosophy, Economics & Ecology",
      sidebarSub: "4 Passages (16 Qs) • +3 / -1 MCQ • Central Thesis & Inference Synthesis",
      weightage: "8–10 Qs / 24 (24–30 Marks)",
      pace: "7.0 mins / Passage (4 Qs)",
      scoring: "MCQ +3 / -1 (4-Mark Swing)",
      strategy: "Paragraph Function Mapping",
      prereq: "Track thesis shifts ('However', 'Yet', 'Conversely') and separate author stance from cited critics' views.",
      overview: "CAT Reading Comprehension features 450–500 word conceptual passages where direct fact retrieval is rare. Nearly 75% of RC questions test implicit inference, central thesis synthesis, and authorial attitude across abstract humanities and economics texts.",
      bridge: "Do not re-read the entire passage for every question. Summarize each paragraph's structural job in 5 mental words on your first read, then eliminate any choice that introduces outside assumptions or extreme absolutes.",
      rules: [
        { name: "Law 1: Scope & Distortion Filter", desc: "Eliminate choices that are factually true in Paragraph 2 but fail to answer the specific question stem, as well as choices exaggerating cautious claims with 'solely', 'inevitably', or 'never'." },
        { name: "Law 2: Implicit Premise Bridge", desc: "A valid inference must be 100% entailed by combining two explicit statements inside the passage—never rely on outside real-world opinion." }
      ],
      workedExamples: [
        {
          title: "Worked Analysis 1: Fat-Tail Forecasting Fragility",
          problem: "Text: 'Modern forecasting models excel within stationary regimes where historical variance bounds outcomes. Yet in fat-tailed adaptive systems, optimizing solely for in-sample precision induces fragility: rare structural breaks lie outside the calibration window and are systematically underpriced.'",
          steps: "1. Contrast: Stationary regimes (models work) vs. Fat-tailed systems (in-sample optimization causes fragility).\n2. Central Thesis: Over-optimizing predictive models on historical data creates vulnerability to rare, high-impact structural breaks."
        }
      ],
      drills: [
        { q: "Based on the forecasting text above, why do in-sample optimized models fail in fat-tailed domains?", opts: ["They use too little historical data.", "Catastrophic structural breaks lie outside historical calibration windows and get underpriced.", "Stationary regimes never occur.", "Variance is always zero."], ans: 1, exp: "Rare structural breaks lie outside the calibration window and are underpriced." },
        { q: "Text: 'Algorithmic curation optimizes engagement via confirmatory feeds, eroding the shared epistemic commons needed for democracy.' Which weakens this?", opts: ["Users spend 3 hrs/day online.", "Audits show algorithmic feed users engage with MORE cross-partisan sources than print-era readers.", "Ad revenue grew 15%.", "Algorithms update hourly."], ans: 1, exp: "Directly refutes the premise that feeds narrow users to confirmatory content." },
        { q: "An author writes: 'While carbon taxes internalize emissions costs efficiently in theory, political myopia routinely dilutes rates below the social cost of carbon.' Author's tone toward carbon taxes?", opts: ["Unqualified enthusiasm", "Cautious theoretical endorsement tempered by political skepticism", "Complete rejection", "Indifference"], ans: 1, exp: "'Efficiently in theory' + 'political myopia dilutes' shows theoretical support qualified by implementation skepticism." },
        { q: "If a passage states 'No purely market-driven mechanism has ever decarbonized a grid at gigawatt scale without state R&D subsidies,' which MUST be true?", opts: ["State subsidies guarantee decarbonization.", "Every historical gigawatt-scale grid decarbonization involved state R&D subsidies.", "Markets hinder all innovation.", "Carbon prices are obsolete."], ans: 1, exp: "Contrapositive of 'No X without Y' is 'Every X involved Y'." },
        { q: "When an RC stem asks 'Which best describes the organization of the passage?', what should you match?", opts: ["A specific example in Paragraph 3", "The sequence of rhetorical moves across all paragraphs (e.g., Phenomenon -> Traditional Explanation -> Critique -> Revised Model)", "The concluding sentence alone", "The title of the cited journal"], ans: 1, exp: "Organization questions map the macro-arc across all paragraphs." },
        { q: "In CAT VARC, getting 10 RC MCQs right and 2 RC MCQs wrong yields what net score?", opts: ["24", "26", "28", "30"], ans: 2, exp: "10*(+3) + 2*(-1) = 30 - 2 = 28 marks." }
      ]
    },
    {
      id: "cat_rc_2",
      kicker: "CAT VARC STUDIO • MODULE 2 OF 5 (EXCEPT & ANALOGY TRAPS)",
      title: "RC Critical Reasoning: 'EXCEPT / NOT' & Parallel Analogy Transfer",
      sidebarSub: "6–8 Qs / 24 • Reverse-Proof Verification & Structural Parallelism",
      weightage: "6–8 Qs / 24 (18–24 Marks)",
      pace: "1.8 mins / Q",
      scoring: "MCQ +3 / -1",
      strategy: "3-True Elimination + Structure Strip",
      prereq: "Master contrapositive logic and strip surface domain nouns when matching parallel analogies.",
      overview: "Modern CAT RC papers routinely include 4 to 6 'All of the following are supported EXCEPT' and 'Which scenario best parallels the author's principle?' items—the primary differentiator between 96%ile and 99.5%ile VARC scores.",
      bridge: "On EXCEPT questions, treat the 4 options as a checklist: prove 3 options directly from passage lines; the single unverified or contradicted option is guaranteed correct.",
      rules: [
        { name: "Law 1: The 3-Anchor Reverse Proof", desc: "Never pick an EXCEPT choice just because it 'sounds unfamiliar'. Verify exact line anchors for the 3 valid options first." },
        { name: "Law 2: Domain-Stripped Analogy Matching", desc: "If the passage describes 'antibiotic overuse breeding resistant bacteria', match the causal structure [Short-term remedy -> Adaptive resistance -> Worse crisis], even if the option is about 'pesticides' or 'financial bailouts'." }
      ],
      workedExamples: [
        {
          title: "Worked Analysis: Parallel Structural Analogy",
          problem: "Passage Principle: 'Aggressive suppression of small forest fires prevents natural undergrowth clearing, accumulating dry fuel that turns an inevitable future spark into an unstoppable megafire.' Find the parallel.",
          steps: "1. Abstract Structure: Suppressing minor volatility -> builds hidden systemic fragility -> causes catastrophic collapse.\n2. Parallel Match: Central bank interventions that suppress every minor market correction encourage excessive leverage, turning an eventual downturn into a systemic financial crash."
        }
      ],
      drills: [
        { q: "Which scenario best parallels the forest-fire suppression principle above?", opts: ["Building wider highways to reduce traffic.", "Preventing every minor corporate default via bailouts, encouraging reckless debt that triggers a massive banking crisis.", "Planting drought-resistant crops.", "Raising interest rates during inflation."], ans: 1, exp: "Matches [Suppressing small corrections -> accumulating hidden risk -> catastrophic collapse]." },
        { q: "Passage states: 'All three factors—capital, talent, and regulatory clarity—are necessary for biotech hubs, though none alone suffices.' Which is NOT supported?", opts: ["Capital alone cannot create a biotech hub.", "A region lacking regulatory clarity will fail to build a biotech hub.", "Any region with capital, talent, and regulatory clarity is guaranteed to become a hub.", "Talent is one of the required conditions."], ans: 2, exp: "'Necessary' does not mean 'sufficient'—C falsely turns necessary conditions into a guarantee." },
        { q: "Which option type is most frequently the correct answer on 'The author would LEAST likely agree with' questions?", opts: ["A cautious qualification", "A direct reversal of the author's core causal claim", "A paraphrase of Paragraph 1", "A supporting historical example"], ans: 1, exp: "LEAST likely agree = directly contradicted by the author's thesis." },
        { q: "If an author argues 'Metrics cease to be good measures once they become targets' (Goodhart's Law), what happens when hospitals are ranked solely by 30-day survival rates?", opts: ["All patients receive better care.", "Hospitals may avoid admitting high-risk critical patients to protect their metric.", "Mortality rates drop to zero.", "Metrics become more objective."], ans: 1, exp: "Optimizing the target metric distorts underlying behavior (turning away high-risk cases)." },
        { q: "In an EXCEPT question, 3 choices paraphrase passage details and 1 choice flips 'some' into 'all'. Which is the answer?", opts: ["The 'some -> all' distortion", "The shortest choice", "The longest choice", "Any choice with numbers"], ans: 0, exp: "Quantifier distortion ('some' -> 'all') makes that statement unsupported by the passage." },
        { q: "Why should you skip a dense 550-word philosophy passage on Pass 1 if 3 clearer passages are available?", opts: ["Philosophy passages carry fewer marks.", "All passages carry +3/-1; locking 12 Qs across 3 clear passages first secures 30+ marks before tackling the hardest set.", "Philosophy has no inference questions.", "TITA only appears in economics."], ans: 1, exp: "Equal marking (+3/-1) rewards maximizing accuracy per minute across the 3 clearest passages first." }
      ]
    },
    {
      id: "cat_va_3",
      kicker: "CAT VARC STUDIO • MODULE 3 OF 5 (TITA PARA-JUMBLES)",
      title: "4-Sentence TITA Para-Jumbles: Mandatory Pairs & Pronoun Chains",
      sidebarSub: "3–4 Qs / 24 (9–12 Marks) • Zero Negative Marking (+3 / 0)",
      weightage: "3–4 Qs / 24 (9–12 Marks)",
      pace: "1.4 mins / Q",
      scoring: "TITA +3 / 0 (Zero Penalty)",
      strategy: "Pronoun Links + Chronology",
      prereq: "Identify demonstrative pronouns ('This', 'These', 'Such'), acronym expansions, and General-to-Specific transitions.",
      overview: "TITA Para-Jumbles ask you to type the 4-digit sequence (e.g., 4213) of four jumbled sentences with ZERO negative marking. Instead of testing all 24 permutations, lock 1 or 2 mandatory pairs to collapse 24 choices down to 2.",
      bridge: "A sentence beginning with 'This paradox', 'These findings', or 'Such policies' cannot start a paragraph—link it immediately after the sentence introducing that concept.",
      rules: [
        { name: "Law 1: Pronoun-Antecedent Lock", desc: "Link sentences containing 'This/These/Such + Noun' directly after the sentence defining that noun." },
        { name: "Law 2: Full Name Before Acronym / Surname", desc: "The sentence introducing 'The Intergovernmental Panel on Climate Change (IPCC)' precedes any sentence referring simply to 'The panel' or 'IPCC'." }
      ],
      workedExamples: [
        {
          title: "Worked Analysis: Loss Aversion 4-Sentence Jumble",
          problem: "1. This asymmetry explains why loss aversion dominates investor behavior in downturns.\n2. Behavioral economists proved losses inflict twice the psychological pain of equivalent gains.\n3. Consequently, investors hold losing stocks too long while selling winners prematurely.\n4. Classical utility theory, by contrast, assumes symmetric valuation of gains and losses.",
          steps: "1. Classical premise (4) -> Behavioral contrast (2) -> 'This asymmetry' link (1) -> 'Consequently' conclusion (3) => Sequence: 4213."
        }
      ],
      drills: [
        { q: "[TITA] Arrange: (1) Consequently, central banks face an asymmetric trade-off. (2) Supply-side energy shocks raise headline prices without excess demand. (3) Aggressive rate hikes depress capex without expanding fuel supply. (4) Yet tolerating high inflation risks wage-price spirals.", opts: ["2341", "1234", "2413", "3241"], ans: 0, exp: "2 (Premise) -> 3 (Rate hike limit) -> 4 ('Yet' counter-risk) -> 1 ('Consequently' conclusion) = 2341." },
        { q: "[TITA] Arrange: (1) However, deep-sea hydrothermal vents thrive in total darkness. (2) Biologists long assumed all complex ecosystems depended on solar photosynthesis. (3) There, chemoautotrophic bacteria oxidize hydrogen sulfide to fix carbon. (4) This discovery reshaped astrobiology's search for life on icy moons.", opts: ["2134", "1234", "2314", "4213"], ans: 0, exp: "2 (Old assumption) -> 1 ('However' exception) -> 3 ('There' mechanism) -> 4 ('This discovery' impact) = 2134." },
        { q: "[TITA] Arrange: (1) These micro-cracks propagate under cyclic thermal stress. (2) Turbine blades in jet engines operate near their metallurgical melting point. (3) Single-crystal superalloys were engineered specifically to eliminate grain-boundary failure. (4) Over thousands of flight cycles, conventional alloys develop microscopic grain-boundary fractures.", opts: ["2413", "2143", "4123", "3241"], ans: 0, exp: "2 (Context) -> 4 (Microscopic fractures) -> 1 ('These micro-cracks') -> 3 (Solution) = 2413." },
        { q: "Why must you NEVER leave a CAT TITA Para-Jumble blank?", opts: ["It unlocks bonus time.", "TITA items carry 0 negative marking—entering your best sequence has strictly positive expected value.", "Unattempted TITA deducts 1 mark.", "It boosts QA scaling."], ans: 1, exp: "Zero penalty (+3 / 0) means entering your top logical sequence is strictly dominant over leaving it blank." }
      ]
    },
    {
      id: "cat_va_4",
      kicker: "CAT VARC STUDIO • MODULE 4 OF 5 (ODD-ONE-OUT & PARA-SUMMARY)",
      title: "5-Sentence TITA Odd-One-Out & Para-Summary Precision",
      sidebarSub: "4–5 Qs / 24 (12–15 Marks) • Theme Coherence & Essence Capture",
      weightage: "4–5 Qs / 24 (12–15 Marks)",
      pace: "1.4 mins / Q",
      scoring: "TITA +3/0 & MCQ +3/-1",
      strategy: "4-Sentence Arc + Contrast Preservation",
      prereq: "Build the 4-sentence cohesive paragraph first in Odd-One-Out; preserve both clauses of contrast pivots in Para-Summary.",
      overview: "Odd-One-Out presents 5 sentences where 4 form a coherent paragraph and 1 diverges in scope or argument level. Para-Summary tests whether you can condense a 100-word dense paragraph into one crisp sentence without omitting qualifiers.",
      bridge: "In Odd-One-Out, do not pick a sentence just because it lacks a shared noun—check whether 4 sentences lock into a tight sequence while the 5th shifts to a tangentially related sub-topic.",
      rules: [
        { name: "Law 1: The 4-Sentence Lock Test", desc: "Find the 4 sentences that sequence smoothly (e.g., 4-1-5-2); the leftover sentence that refuses to slot into that causal chain is the odd one out." },
        { name: "Law 2: Para-Summary Qualifier Retention", desc: "If the paragraph uses 'Although X, Y', any valid summary must reflect BOTH the concession X and the main claim Y." }
      ],
      workedExamples: [
        {
          title: "Worked Analysis: Urban Heat Island Odd-One-Out",
          problem: "1. Urban heat islands raise city night temperatures by 3–5°C.\n2. Reflective cool roofs mitigate peak thermal absorption.\n3. Deep-sea vents support chemosynthetic tubeworms.\n4. Municipal codes mandate high-albedo roofs to curb cooling demand.\n5. Nocturnal heat stress worsens cardiovascular morbidity in cities.",
          steps: "Sentences 1 -> 5 -> 2 -> 4 form a complete urban-heat problem-to-policy arc; Sentence 3 shifts to deep-sea biology -> Odd Sentence: 3."
        }
      ],
      drills: [
        { q: "[TITA Odd-One-Out] Find the odd sentence: (1) Quantum key distribution uses photon polarization to detect eavesdropping. (2) Any measurement disturbs the quantum state, alerting communicating parties. (3) Classical RSA encryption relies on the difficulty of factoring large integers. (4) Fiber-optic quantum networks are now being piloted for sovereign banking.", opts: ["Sentence 1", "Sentence 2", "Sentence 3", "Sentence 4"], ans: 2, exp: "1, 2, and 4 form a cohesive paragraph on quantum key distribution; 3 shifts to classical RSA factoring." },
        { q: "Summary of: 'While renewable capacity has surged globally, grid-scale battery storage remains the binding constraint delaying fossil-fuel baseload retirement.'", opts: ["Renewable capacity has stopped growing.", "Insufficient grid-scale storage—not generation capacity—is the primary bottleneck delaying fossil-fuel phaseout.", "Fossil fuels are cheaper than batteries.", "Batteries generate electricity."], ans: 1, exp: "Preserves both halves of the contrast ('renewable capacity surged' vs 'storage is the binding constraint')." },
        { q: "[TITA Odd-One-Out] Find the odd sentence: (1) Sleep spindles during NREM sleep consolidate declarative memories. (2) Chronic sleep deprivation impairs hippocampal synaptic plasticity. (3) REM sleep dreams often incorporate fragmented emotional memories. (4) Circadian rhythm disruption in shift workers elevates metabolic syndrome risk.", opts: ["Sentence 1", "Sentence 2", "Sentence 3", "Sentence 4"], ans: 3, exp: "1, 2, and 3 focus on sleep stages and memory consolidation; 4 shifts to shift-work metabolic risk." }
      ]
    },
    {
      id: "cat_va_5",
      kicker: "CAT VARC STUDIO • MODULE 5 OF 5 (40-MIN SECTION STRATEGY)",
      title: "40-Minute VARC Pacing, Passage Triage & Negative-Marking Shield",
      sidebarSub: "Target: 15–17 Attempts @ 85%+ Accuracy = 40+ Net Marks (99+ %ile)",
      weightage: "Full 72-Mark Blueprint",
      pace: "28m RC + 12m VA/TITA",
      scoring: "99.5%ile Target = 40–44 Marks",
      strategy: "3-Passage Deep Lock + 100% TITA",
      prereq: "Combine RC accuracy discipline with zero-penalty TITA execution.",
      overview: "Scoring 99.5+ percentile in CAT VARC requires ~40–44 net marks out of 72. Splitting the 40-minute clock into 28 minutes for the 3 clearest RC passages (12 Qs) and 12 minutes for all 8 VA/TITA items maximizes net score while eliminating panic guessing.",
      bridge: "Never guess between 2 close RC MCQ options unless you have concrete textual elimination of 3 choices—a single wrong MCQ erases one-third of a correct answer.",
      rules: [
        { name: "Law 1: The 28 / 12 Minute Split", desc: "Minutes 0–28: Solve 3 clearest RC passages (12 Qs). Minutes 28–40: Attempt all 8 VA items (especially all TITA items)." },
        { name: "Law 2: Expected Value of Guessing", desc: "In CAT MCQ (+3/-1), random 4-option guessing has EV = 0, and 50/50 guessing has EV = +1.0, whereas TITA guessing has zero downside." }
      ],
      workedExamples: [
        {
          title: "Worked Score Simulation: 99.3%ile VARC Card",
          problem: "Candidate attempts 12 RC MCQs (10 right, 2 wrong) + 7 VA items (4 TITA right, 2 TITA wrong, 1 Summary right).",
          steps: "RC = 10*(3) - 2*(1) = 28. VA = 5*(3) - 0 = 15. Total VARC = 43 / 72 (~99.4%ile)."
        }
      ],
      drills: [
        { q: "A candidate gets 12 MCQs right, 6 MCQs wrong, and 3 TITA items right (with 3 TITA wrong). What is the net CAT VARC score?", opts: ["36", "39", "42", "45"], ans: 1, exp: "12*3 - 6*1 + 3*3 = 36 - 6 + 9 = 39 marks." },
        { q: "What is the expected value of eliminating 2 options (50/50 choice) on a CAT +3/-1 MCQ?", opts: ["0.0 marks", "+0.5 marks", "+1.0 mark", "+1.5 marks"], ans: 2, exp: "0.5*(+3) + 0.5*(-1) = 1.5 - 0.5 = +1.0 mark." }
      ]
    }
  ];

  const MODULES = exam === "CAT" ? CAT_VERBAL : CAT_VERBAL.map((m, i) => ({
    ...m,
    kicker: `${exam} VERBAL STUDIO • MODULE ${i + 1} OF 5`,
    title: exam === "GMAT"
      ? ["Critical Reasoning: Necessary & Sufficient Assumptions", "Critical Reasoning: Strengthen, Weaken & Causal Paradoxes", "Boldface Structural Roles & Evaluate-the-Argument", "Analytical Reading Comprehension: Thesis, Tone & Inference", "45-Minute Verbal Pacing & 3-Edit Adaptive Strategy"][i]
      : ["1-, 2- & 3-Blank Text Completion: Polarity Hinges", "Sentence Equivalence: Semantic Twin Elimination", "Dense Academic Reading Comprehension: Attribution & Inference", "Multi-Select RC & Paragraph Logical Arguments", "41-Minute Section-Adaptive Verbal & Stage-2 Routing"][i]
  }));

  window._VERBAL_ACTIVE_IDX = window._VERBAL_ACTIVE_IDX || 0;
  window._VERBAL_SUBTAB = window._VERBAL_SUBTAB || "THEORY";
  if (window._VERBAL_ACTIVE_IDX >= MODULES.length) window._VERBAL_ACTIVE_IDX = 0;
  const v = MODULES[window._VERBAL_ACTIVE_IDX];

  const leftNav = MODULES.map((item, idx) => `
    <button type="button" onclick="window._VERBAL_ACTIVE_IDX=${idx}; window.renderVerbalStudio3(document.getElementById('main-workspace')); document.getElementById('main-workspace')?.scrollIntoView({behavior:'smooth', block:'start'});"
      class="w-full text-left p-4 rounded-2xl border transition cursor-pointer ${idx === window._VERBAL_ACTIVE_IDX ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/40 shadow-sm' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400'}">
      <div class="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">${item.title}</div>
      <div class="text-xs text-slate-500 mt-1">${item.sidebarSub}</div>
    </button>
  `).join("");

  const theoryView = `
    <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
      <div class="flex items-center justify-between">
        <span class="font-extrabold uppercase text-[11px] text-indigo-600">Comprehensive Verbal Overview &amp; Concept Bridge</span>
        <span class="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">Master Study Guide</span>
      </div>
      <p>${v.overview}</p>
      <p><strong>Concept Bridge:</strong> ${v.bridge}</p>
      <div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <strong class="text-indigo-600">Prerequisites &amp; Core Structural Rules:</strong> ${v.prereq}
      </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
      <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950">
        <div class="text-[10px] font-bold uppercase text-slate-400">Exam Weightage</div>
        <div class="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">${v.weightage}</div>
      </div>
      <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950">
        <div class="text-[10px] font-bold uppercase text-slate-400">Target Pace</div>
        <div class="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">${v.pace}</div>
      </div>
      <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950">
        <div class="text-[10px] font-bold uppercase text-slate-400">Scoring / Format</div>
        <div class="text-xs font-extrabold text-indigo-600 dark:text-indigo-300 mt-0.5">${v.scoring}</div>
      </div>
      <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950">
        <div class="text-[10px] font-bold uppercase text-slate-400">99th %ile Strategy</div>
        <div class="text-xs font-extrabold text-amber-600 dark:text-amber-300 mt-0.5">${v.strategy}</div>
      </div>
    </div>

    <div class="space-y-2.5">
      <div class="font-extrabold uppercase text-[11px] text-indigo-600">Core Verbal Principles, Elimination Laws &amp; Frameworks</div>
      ${v.rules.map(r => `
        <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs">
          <div class="font-extrabold text-slate-900 dark:text-white">${r.name}</div>
          <div class="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">${r.desc}</div>
        </div>
      `).join("")}
    </div>

    <div class="space-y-2.5">
      <div class="font-extrabold uppercase text-[11px] text-amber-700 dark:text-amber-300">Step-by-Step Worked Verbal Analyses (${v.workedExamples.length})</div>
      ${v.workedExamples.map(w => `
        <div class="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1.5 text-xs leading-relaxed">
          <div class="font-extrabold text-amber-900 dark:text-amber-200">${w.title}</div>
          <div class="font-semibold text-slate-800 dark:text-slate-200 whitespace-pre-line">${w.problem}</div>
          <div class="text-slate-700 dark:text-slate-300 whitespace-pre-line pt-1 border-t border-amber-200/70 dark:border-amber-800/60">${w.steps}</div>
        </div>
      `).join("")}
    </div>
  `;

  const drillsView = `
    <div class="space-y-3">
      <div class="font-extrabold uppercase text-[11px] text-emerald-700 dark:text-emerald-400">Interactive Verbal Practice Drills (${v.drills.length} Questions — Click an Option to Reveal Full Analysis)</div>
      ${v.drills.map((d, i) => `
        <div class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2.5">
          <div class="text-xs font-extrabold text-slate-900 dark:text-white whitespace-pre-line">Practice Drill Q${i + 1}. ${d.q}</div>
          <div class="space-y-1.5">
            ${d.opts.map((o, oi) => `
              <button type="button" onclick="this.parentElement.nextElementSibling.classList.remove('hidden')"
                class="w-full text-left px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-indigo-500 text-xs font-semibold cursor-pointer">
                <strong>${String.fromCharCode(65 + oi)}.</strong> ${o}
              </button>
            `).join("")}
          </div>
          <div class="hidden p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200">
            <strong>Solution (${String.fromCharCode(65 + d.ans)}):</strong> ${d.exp}
          </div>
        </div>
      `).join("")}
    </div>
  `;

  el.innerHTML = `
    <div class="max-w-7xl mx-auto my-4 grid grid-cols-1 lg:grid-cols-12 gap-5">
      <div class="lg:col-span-4 space-y-3">
        <div class="text-xs font-extrabold uppercase tracking-wider text-indigo-600">${exam} VERBAL STUDIO (${MODULES.length} CHAPTERS)</div>
        ${leftNav}
      </div>
      <div class="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <span class="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">${v.kicker}</span>
        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">${v.title}</h2>

        <div class="flex flex-wrap items-center gap-2 pt-0.5">
          <button type="button" onclick="window._VERBAL_SUBTAB='THEORY'; window.renderVerbalStudio3(document.getElementById('main-workspace')); document.getElementById('main-workspace')?.scrollIntoView({behavior:'smooth', block:'start'});"
            class="px-4 py-2 rounded-full text-xs font-bold cursor-pointer ${window._VERBAL_SUBTAB === 'THEORY' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'}">
            Chapter Refresher &amp; Theory
          </button>
          <button type="button" onclick="window._VERBAL_SUBTAB='DRILLS'; window.renderVerbalStudio3(document.getElementById('main-workspace')); document.getElementById('main-workspace')?.scrollIntoView({behavior:'smooth', block:'start'});"
            class="px-4 py-2 rounded-full text-xs font-bold cursor-pointer ${window._VERBAL_SUBTAB === 'DRILLS' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'}">
            Shortcuts &amp; ${v.drills.length} Practice Drills
          </button>
        </div>

        ${window._VERBAL_SUBTAB === "DRILLS" ? drillsView : theoryView}
      </div>
    </div>
  `;
};

// ==============================================================================
// REVIVED 5-BLUEPRINT TIMED MOCK ENGINE (TAB 4) — CAT, GMAT (5-OPT) & GRE (5-OPT)
// ==============================================================================

// ==============================================================================
// REVIVED 5-BLUEPRINT TIMED MOCK ENGINE (TAB 4) — CAT, GMAT (5-OPT) & GRE (5-OPT)
// ==============================================================================

// ==============================================================================
// EXACT-COUNT TIMED MOCK ENGINE (TAB 4) — 1-TO-1 PALETTE & BLUEPRINT SYNC
// ==============================================================================

// ==============================================================================
// PROCTORED 5-BLUEPRINT MOCK ENGINE + OFFICIAL DIAGNOSTIC MARKSHEET PDF (TAB 4)
// ==============================================================================

// ==============================================================================
// PROCTORED 5-BLUEPRINT MOCK ENGINE + SERIAL LOG + EXIT WITHOUT SUBMISSION (TAB 4)
// ==============================================================================
window.renderMockSimulator4 = async function (el) {
  const host = window.location.host.toLowerCase();
  const exam = host.includes("gmat") ? "GMAT" : (host.includes("gre") ? "GRE" : "CAT");

  const BLUEPRINTS = exam === "GMAT" ? [
    { id: "GMAT_FULL", count: 64, tag: "FULL 205–805 ADAPTIVE MOCK", title: "1. Full GMAT Focus Official Simulation (64 Qs • 135 Mins)", desc: "Complete 3-section adaptive flow: QR (21 Qs • 45m) + VR (23 Qs • 45m) + DI (20 Qs • 45m) with 5 choices (A–E) & 3 Review Edits.", mins: 135, secFilter: "ALL", scale: "205–805 Adaptive Scale" },
    { id: "GMAT_QR",   count: 21, tag: "SECTIONAL • 45 MINS",        title: "2. Quantitative Reasoning (Zero Geometry • 21 Qs • 45 Mins)", desc: "Pure Problem Solving (Choices A–E) across Algebraic Modeling, Number Properties, Weighted Averages & Combinatorics.", mins: 45, secFilter: "QR", scale: "60–90 QR Sectional Scale" },
    { id: "GMAT_VR",   count: 23, tag: "SECTIONAL • 45 MINS",        title: "3. Verbal Reasoning CR & RC Clinic (23 Qs • 45 Mins)", desc: "5-option Critical Reasoning (Necessary Assumption, Boldface, Paradox) + Analytical Reading Comprehension.", mins: 45, secFilter: "VR", scale: "60–90 VR Sectional Scale" },
    { id: "GMAT_DI",   count: 20, tag: "SECTIONAL • 45 MINS",        title: "4. Data Insights Deep Clinic (20 Qs • 45 Mins)", desc: "Data Sufficiency (AD/BCE), Multi-Source Reasoning, Two-Part Analysis & Graphics Interpretation.", mins: 45, secFilter: "DI", scale: "60–90 DI Sectional Scale" },
    { id: "GMAT_705",  count: 30, tag: "99TH %ILE HARD POOL",        title: "5. 705+ Elite Adaptive Pacing Sprint (30 Qs • 60 Mins)", desc: "Upper-quartile difficulty items engineered to protect Q1–Q6 adaptive trajectory at <= 2.0 mins/Q.", mins: 60, secFilter: "ALL", scale: "705–805 Elite Band" }
  ] : (exam === "GRE" ? [
    { id: "GRE_FULL",  count: 54, tag: "FULL 260–340 ADAPTIVE MOCK", title: "1. Full GRE General Section-Adaptive Mock (54 Qs • 118 Mins)", desc: "Stage 1 + Hard Stage 2 routing across Quantitative (27 Qs • 47m) and Verbal (27 Qs • 41m) with 5-option (A–E) items.", mins: 118, secFilter: "ALL", scale: "260–340 Composite Scale" },
    { id: "GRE_Q",     count: 27, tag: "SECTIONAL • 47 MINS",        title: "2. Quantitative Reasoning QC & PS Mock (27 Qs • 47 Mins)", desc: "Quantitative Comparison (Choices A–D) + 5-Option Problem Solving (A–E) + Numeric Entry with zero negative penalty.", mins: 47, secFilter: "Quant", scale: "130–170 Quant Scale" },
    { id: "GRE_V",     count: 27, tag: "SECTIONAL • 41 MINS",        title: "3. Verbal Reasoning TC, SE & RC Mock (27 Qs • 41 Mins)", desc: "1/2/3-Blank Text Completion, Sentence Equivalence semantic pairs & dense academic Reading Comprehension.", mins: 41, secFilter: "Verbal", scale: "130–170 Verbal Scale" },
    { id: "GRE_Q170",  count: 20, tag: "170 CEILING DRILL",          title: "4. Quant 170 Perfection Hard-Stage Sprint (20 Qs • 30 Mins)", desc: "High-discrimination inequalities, modular remainders, normal distributions & FROZEN QC boundary traps.", mins: 30, secFilter: "Quant", scale: "167–170 Quant Ceiling" },
    { id: "GRE_V165",  count: 20, tag: "165+ VERBAL DRILL",          title: "5. Verbal 165+ Contrast Pivot & Inference Sprint (20 Qs • 30 Mins)", desc: "Multi-clause logic hinges and dense humanities/science inference passages.", mins: 30, secFilter: "Verbal", scale: "164–170 Verbal Ceiling" }
  ] : [
    { id: "CAT_FULL",  count: 66, tag: "FULL 198-MARK CAT MOCK",     title: "1. Full-Length CAT Simulation (66 Qs • 120 Mins • 3 Sections)", desc: "Strict 40-min sectional flow: VARC (24 Qs) + DILR (20 Qs) + QA (22 Qs) with +3/-1 MCQ & +3/0 TITA.", mins: 120, secFilter: "ALL", scale: "198 Marks / 99.5%ile Scale" },
    { id: "CAT_QA",    count: 22, tag: "SECTIONAL • 40 MINS",        title: "2. Quantitative Aptitude (QA) Sectional (22 Qs • 40 Mins)", desc: "Algebra, Arithmetic, Number System, Geometry & Modern Math calibrated to IIM Slot difficulty.", mins: 40, secFilter: "QA", scale: "66 Marks QA Scale" },
    { id: "CAT_DILR",  count: 20, tag: "SECTIONAL • 40 MINS",        title: "3. DILR 4-Set Caselet Sprint (20 Qs • 40 Mins)", desc: "Multi-variable Arrangements, 3-Set Venn Maxima/Minima, Tournaments & Directed Networks.", mins: 40, secFilter: "DILR", scale: "60 Marks DILR Scale" },
    { id: "CAT_VARC",  count: 24, tag: "SECTIONAL • 40 MINS",        title: "4. VARC 4-RC + 8-VA Sectional (24 Qs • 40 Mins)", desc: "Dense RC inference passages + zero-penalty TITA Para-Jumbles, Odd-One-Out & Para-Summary.", mins: 40, secFilter: "VARC", scale: "72 Marks VARC Scale" },
    { id: "XAT_5OPT",  count: 75, tag: "5-OPTION XAT / OMET MOCK",   title: "5. XAT & Decision Making 5-Option Mock (75 Qs • 165 Mins • A–E)", desc: "Authentic 5-choice (A, B, C, D, E) VALR, Decision Making caselets & QADI with +1 / -0.25 marking.", mins: 165, secFilter: "ALL", scale: "XAT 5-Option Percentile Scale" }
  ]);

  window._SELECTED_MOCK_BP = window._SELECTED_MOCK_BP || 0;
  const bp = BLUEPRINTS[window._SELECTED_MOCK_BP] || BLUEPRINTS[0];
  const isFiveOpt = (exam === "GMAT" || exam === "GRE" || bp.id === "XAT_5OPT");

  const qSec = exam === "CAT" ? "QA" : (exam === "GMAT" ? "QR" : "Quant");
  const dSec = exam === "CAT" ? "DILR" : (exam === "GMAT" ? "DI" : "Quant");
  const vSec = exam === "CAT" ? "VARC" : (exam === "GMAT" ? "VR" : "Verbal");

  const MASTER_BANK = [
    { sec: qSec, topic: "Algebra & Absolute Value", q: "How many integer values of x satisfy |2x - 7| + |x - 1| <= 8?", isTita: false, opts: isFiveOpt ? ["3", "4", "5", "6", "7"] : ["4", "5", "6", "7"], ans: isFiveOpt ? 3 : 2, exp: "Testing integers x = 0, 1, 2, 3, 4, 5 gives values 8, 5, 4, 3, 4, 7 (all <= 8) -> 6 integer solutions." },
    { sec: qSec, topic: "Mixtures & Alligation", q: "A 40-liter solution contains 30% alcohol. How many liters of pure alcohol must be added to raise the concentration to 44%?", isTita: false, opts: isFiveOpt ? ["8 L", "10 L", "12 L", "14 L", "16 L"] : ["8 L", "10 L", "12 L", "14 L"], ans: 1, exp: "Water remains constant at 28 L (70% of 40 L). At 44% alcohol, 28 L = 56% of new total V => V = 50 L => Added = 10 L." },
    { sec: qSec, topic: "Number Properties & Cyclicity", q: "What is the remainder when 7^2026 is divided by 5?", isTita: false, opts: isFiveOpt ? ["0", "1", "2", "3", "4"] : ["1", "2", "3", "4"], ans: isFiveOpt ? 4 : 3, exp: "7 ≡ 2 (mod 5). Cycle of 2^n mod 5 is {2, 4, 3, 1}. 2026 = 4*506 + 2 => remainder = 4." },
    { sec: qSec, topic: "Combinatorics (Surjective Mapping)", q: "In how many ways can 6 distinct software modules be assigned to 3 servers such that each server receives at least 1 module?", isTita: false, opts: isFiveOpt ? ["240", "360", "540", "600", "720"] : ["360", "540", "600", "720"], ans: isFiveOpt ? 2 : 1, exp: "3^6 - 3*(2^6) + 3*(1^6) = 729 - 192 + 3 = 540." },
    { sec: dSec, topic: "3-Set Venn Minima", q: "In a survey of 200 analysts, 150 use Python, 140 use SQL, and 130 use R. What is the minimum number of analysts using all three tools?", isTita: false, opts: isFiveOpt ? ["0", "10", "20", "30", "40"] : ["10", "20", "30", "40"], ans: isFiveOpt ? 2 : 1, exp: "max(0, 150 + 140 + 130 - 2*200) = 20." },
    { sec: dSec, topic: "Weighted Portfolio", q: "A $100M fund allocates capital across 6% Senior Debt and 11% Mezzanine Notes to earn $8.2M annual interest. How much is allocated to Mezzanine Notes?", isTita: false, opts: isFiveOpt ? ["$36M", "$40M", "$44M", "$50M", "$56M"] : ["$36M", "$40M", "$44M", "$50M"], ans: 2, exp: "0.06(100 - M) + 0.11M = 8.2 => 0.05M = 2.2 => M = $44M." },
    { sec: dSec, topic: "Round-Robin Invariant", q: "In a 6-team round-robin league (2 pts win, 1 tie, 0 loss), if 3 matches tie, what is the sum of points across all 6 teams?", isTita: false, opts: isFiveOpt ? ["24", "27", "30", "33", "36"] : ["27", "30", "33", "36"], ans: isFiveOpt ? 2 : 1, exp: "15 matches * 2 pts/match = 30 total points." },
    { sec: vSec, topic: "Critical Reasoning / Paradox", q: "Regional sorting automation cut per-parcel handling labor by 38% with constant volume and revenue/parcel, yet operating margin fell 2.4%. Which best explains this?", isTita: false, opts: isFiveOpt ? ["Competitors also automated.", "Hardware depreciation and maintenance contracts exceeded the dollar labor savings.", "Delivery speed improved.", "Fuel prices stayed constant.", "Remaining hubs will automate next year."] : ["Competitors also automated.", "Hardware depreciation and maintenance contracts exceeded the dollar labor savings.", "Delivery speed improved.", "Fuel prices stayed constant."], ans: 1, exp: "Fixed equipment depreciation + maintenance overhead exceeded labor dollar savings." },
    { sec: vSec, topic: "Paragraph Coherence", q: "Arrange into a logical paragraph: (1) This asymmetry explains loss aversion in downturns. (2) Losses inflict twice the pain of equivalent gains. (3) Consequently, investors hold losers too long. (4) Classical theory assumes symmetric valuation.", isTita: false, opts: isFiveOpt ? ["4 - 2 - 1 - 3", "2 - 1 - 4 - 3", "1 - 2 - 3 - 4", "2 - 4 - 3 - 1", "4 - 1 - 2 - 3"] : ["4 - 2 - 1 - 3", "2 - 1 - 4 - 3", "1 - 2 - 3 - 4", "2 - 4 - 3 - 1"], ans: 0, exp: "4 -> 2 -> 1 -> 3 = 4213." }
  ];

  let pgQuestions = [];
  try {
    const res = await fetch("/api/questions?limit=500");
    if (res.ok) {
      const data = await res.json();
      const rawList = Array.isArray(data) ? data : (data.questions || data.rows || []);
      pgQuestions = rawList.map(q => {
        let opts = q.options_json || q.options || [];
        if (typeof opts === "string") {
          try { opts = JSON.parse(opts); } catch (_) { opts = []; }
        }
        const promptText = q.prompt || q.stem || q.question || "";
        const rawSec = String(q.section || "").toUpperCase();
        let mappedSec = qSec;
        if (rawSec.includes("DILR") || rawSec.includes("DI_") || rawSec === "DI" || rawSec.includes("DATA")) mappedSec = dSec;
        else if (rawSec.includes("VARC") || rawSec.includes("VERBAL") || rawSec === "VR") mappedSec = vSec;

        const isTita = !Array.isArray(opts) || opts.length === 0 || String(q.q_type || "").includes("SA");
        const ansVal = String(q.answer ?? q.correct_index ?? "0").trim();
        const normOpts = isTita ? [] : (isFiveOpt && opts.length === 4 ? [...opts, "None of the above"] : opts);

        return {
          sec: mappedSec,
          topic: q.topic || q.chapter_name || "Official Bank",
          q: promptText,
          isTita: isTita,
          opts: normOpts,
          ans: isTita ? ansVal : (!isNaN(parseInt(ansVal, 10)) ? parseInt(ansVal, 10) : 0),
          exp: q.explanation || "Verified PostgreSQL official solution."
        };
      }).filter(item => item.q && (item.isTita || item.opts.length >= 2));

      for (let i = pgQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pgQuestions[i], pgQuestions[j]] = [pgQuestions[j], pgQuestions[i]];
      }
    }
  } catch (e) {}

  let basePool = bp.secFilter === "ALL"
    ? [...pgQuestions, ...MASTER_BANK]
    : [...pgQuestions, ...MASTER_BANK].filter(item => item.sec === bp.secFilter);
  if (!basePool.length) basePool = MASTER_BANK;

  const exactPool = [];
  for (let i = 0; i < bp.count; i++) {
    const template = basePool[i % basePool.length];
    const cycle = Math.floor(i / basePool.length);
    exactPool.push(cycle === 0 ? { ...template } : {
      ...template,
      topic: `${template.topic} • Set ${cycle + 1}`,
      q: `[Variant ${cycle + 1}] ${template.q}`
    });
  }

  const nextSerialId = `${exam}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  window._MOCK_STATE = {
    questions: exactPool,
    curr: 0,
    answers: {},
    marked: {},
    started: false,
    submitted: false,
    secondsLeft: bp.mins * 60,
    totalSeconds: bp.mins * 60,
    serialId: nextSerialId,
    blueprintTitle: bp.title,
    bpId: bp.id
  };

  if (window._MOCK_TIMER_ID) clearInterval(window._MOCK_TIMER_ID);
  window._MOCK_TIMER_ID = setInterval(() => {
    const st = window._MOCK_STATE;
    if (!st || !st.started || st.submitted) return;
    st.secondsLeft = Math.max(0, st.secondsLeft - 1);
    const tEl = document.getElementById("mock-live-timer");
    if (tEl) {
      const m = String(Math.floor(st.secondsLeft / 60)).padStart(2, "0");
      const s = String(st.secondsLeft % 60).padStart(2, "0");
      tEl.textContent = `${m}:${s}`;
    }
    if (st.secondsLeft === 0) window.submitFullMock4();
  }, 1000);

  window.startMockSession4 = function () {
    if (!window._MOCK_STATE) return;
    window._MOCK_STATE.started = true;
    const lobby = document.getElementById("mock-lobby-box");
    const active = document.getElementById("mock-active-shell");
    if (lobby) lobby.classList.add("hidden");
    if (active) active.classList.remove("hidden");
    window.renderMockQuestionCard();
  };

  window.exitMockWithoutSubmission4 = function () {
    if (!confirm("Exit this mock session without submitting? Your timer will stop and no score will be logged.")) return;
    if (window._MOCK_TIMER_ID) clearInterval(window._MOCK_TIMER_ID);
    window._MOCK_STATE = null;
    window.renderMockSimulator4(document.getElementById("main-workspace"));
  };

  window.clearMockLog4 = function () {
    if (!confirm("Clear all recorded Serial Mock IDs and diagnostic attempt logs? This resets your Preparation Level baseline.")) return;
    localStorage.removeItem("ipm_mock_history_v1");
    if (typeof window.syncPreparationReadinessHeader === "function") window.syncPreparationReadinessHeader();
    window.renderMockSimulator4(document.getElementById("main-workspace"));
  };

  window.renderMockQuestionCard = function () {
    const st = window._MOCK_STATE;
    if (!st) return;
    const qObj = st.questions[st.curr];
    const qArea = document.getElementById("mock-q-area");
    const palArea = document.getElementById("mock-palette-area");
    if (!qArea || !palArea) return;

    palArea.innerHTML = st.questions.map((_, i) => {
      const isCurr = i === st.curr;
      const isAns = st.answers[i] !== undefined && st.answers[i] !== "";
      const isMark = st.marked[i];
      let cls = "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700";
      if (isMark) cls = "bg-amber-400 text-slate-950 border-amber-500 font-extrabold";
      else if (isAns) cls = "bg-emerald-600 text-white border-emerald-600 font-bold";
      if (isCurr) cls += " ring-2 ring-indigo-500";
      return `<button type="button" onclick="window._MOCK_STATE.curr=${i}; window.renderMockQuestionCard();" class="w-8 h-8 rounded-lg border text-xs cursor-pointer ${cls}">${i + 1}</button>`;
    }).join("");

    const selected = st.answers[st.curr];
    const isCorrect = qObj.isTita
      ? String(selected || "").trim().toLowerCase() === String(qObj.ans).trim().toLowerCase()
      : selected === qObj.ans;

    const optionsHtml = qObj.isTita
      ? `<div class="p-4 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50/40 dark:bg-indigo-950/30 space-y-2">
           <label class="text-xs font-extrabold text-indigo-700 dark:text-indigo-300 block">Enter Exact Numeric / Sequence TITA Answer (Zero Negative Penalty):</label>
           <input type="text" value="${selected !== undefined ? selected : ""}" oninput="window._MOCK_STATE.answers[${st.curr}]=this.value.trim();" placeholder="Type answer here..." class="w-full sm:w-64 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono font-bold">
         </div>`
      : qObj.opts.map((opt, oi) => `
          <label onclick="window._MOCK_STATE.answers[${st.curr}]=${oi}; window.renderMockQuestionCard();"
            class="flex items-center gap-3 p-3.5 rounded-xl border text-xs font-semibold cursor-pointer transition ${selected === oi ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-400'}">
            <input type="radio" name="mock_active_opt" ${selected === oi ? "checked" : ""}>
            <span><strong>${String.fromCharCode(65 + oi)}.</strong> ${opt}</span>
          </label>
        `).join("");

    qArea.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[11px] font-extrabold">Question ${st.curr + 1} of ${st.questions.length}</span>
            <span class="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-bold">${qObj.sec} &bull; ${qObj.topic}</span>
            <span class="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">${qObj.isTita ? "TITA (Type-In Answer)" : qObj.opts.length + "-Option Format"}</span>
          </div>
          <button type="button" onclick="window._MOCK_STATE.marked[${st.curr}] = !window._MOCK_STATE.marked[${st.curr}]; window.renderMockQuestionCard();"
            class="px-3 py-1 rounded-lg border border-amber-400 text-amber-700 dark:text-amber-300 text-xs font-bold cursor-pointer">
            ${st.marked[st.curr] ? "&#9733; Marked for Review" : "&#9734; Mark for Review"}
          </button>
        </div>

        <div class="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">${qObj.q}</div>
        <div class="space-y-2">${optionsHtml}</div>

        ${st.submitted ? `
          <div class="p-3.5 rounded-xl ${isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'} border text-xs">
            <strong>${isCorrect ? "Correct!" : "Incorrect / Unattempted."} Official Answer: ${qObj.isTita ? qObj.ans : "(" + String.fromCharCode(65 + qObj.ans) + ") " + (qObj.opts[qObj.ans] || "")}.</strong> ${qObj.exp}
          </div>
        ` : ""}

        <div class="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
          <button type="button" onclick="if(window._MOCK_STATE.curr>0){window._MOCK_STATE.curr--; window.renderMockQuestionCard();}"
            class="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold cursor-pointer">&larr; Previous</button>
          <button type="button" onclick="delete window._MOCK_STATE.answers[${st.curr}]; window.renderMockQuestionCard();"
            class="px-3 py-2 rounded-xl text-xs text-slate-500 hover:text-rose-600 font-semibold cursor-pointer">Clear Response</button>
          <button type="button" onclick="if(window._MOCK_STATE.curr < window._MOCK_STATE.questions.length - 1){window._MOCK_STATE.curr++; window.renderMockQuestionCard();}"
            class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer">Save &amp; Next &rarr;</button>
        </div>
      </div>
    `;
  };

  window.downloadOfficialMarksheet4 = function (serialLookup) {
    let st = window._MOCK_STATE;
    if (serialLookup) {
      const hist = JSON.parse(localStorage.getItem("ipm_mock_history_v1") || "[]");
      const found = hist.find(h => h.serialId === serialLookup);
      if (found && found.snapshot) st = found.snapshot;
    }
    if (!st || !st.questions) {
      alert("Detailed item snapshot is available for all newly submitted mocks.");
      return;
    }
    const candidate = (window.CURRENT_USER && window.CURRENT_USER.name) ? window.CURRENT_USER.name : "Dina Shah";
    const dateStr = st.dateStr || new Date().toLocaleDateString("en-GB");
    const elapsedSec = Math.max(1, (st.totalSeconds || 3600) - (st.secondsLeft || 0));
    const pacePerQ = (elapsedSec / st.questions.length).toFixed(1);

    let correct = 0, wrong = 0, unattempted = 0;
    const isCat = exam === "CAT" && (st.bpId || bp.id) !== "XAT_5OPT";

    const rowsHtml = st.questions.map((q, idx) => {
      const userAns = (st.answers || {})[idx];
      const isUn = userAns === undefined || userAns === "";
      const isRight = !isUn && (q.isTita
        ? String(userAns).trim().toLowerCase() === String(q.ans).trim().toLowerCase()
        : userAns === q.ans);

      let delta = 0;
      if (isUn) { unattempted++; delta = 0; }
      else if (isRight) { correct++; delta = isCat ? 3 : 1; }
      else { wrong++; delta = isCat ? -1 : 0; }

      const subText = isUn
        ? "(No response submitted)"
        : (q.isTita ? String(userAns) : `(${String.fromCharCode(65 + userAns)}) ${q.opts[userAns] || ""}`);
      const offText = q.isTita
        ? String(q.ans)
        : `(${String.fromCharCode(65 + q.ans)}) ${q.opts[q.ans] || ""}`;
      const badgeText = q.isTita
        ? `TITA (+3/0) • ${isUn ? "Unattempted (0 Marks)" : (isRight ? "Correct (+3 Marks)" : "Incorrect (0 Marks)")}`
        : `${isCat ? "MCQ (+3/-1)" : "MCQ"} • ${isUn ? "Unattempted (0 Marks)" : (isRight ? `Correct (+${delta})` : `Incorrect (${delta})`)}`;

      return `
        <div style="border:1px solid #cbd5e1; border-radius:8px; padding:12px; margin-bottom:12px; page-break-inside:avoid;">
          <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:700; color:#1e3a8a; margin-bottom:4px;">
            <span>Question ${idx + 1} of ${st.questions.length}. ${q.sec} (${q.topic})</span>
            <span>${badgeText}</span>
          </div>
          <div style="font-size:12px; font-weight:600; color:#0f172a; margin-bottom:6px;">${q.q}</div>
          <div style="font-size:11px; color:#334155;"><strong>Your Submitted Response:</strong> ${subText}</div>
          <div style="font-size:11px; color:#065f46;"><strong>Official Answer:</strong> ${offText}</div>
          <div style="font-size:11px; color:#475569; margin-top:4px;"><strong>Solution:</strong> ${q.exp}</div>
        </div>
      `;
    }).join("");

    const score = isCat ? Math.max(0, correct * 3 - wrong * 1) : correct;
    const maxScore = isCat ? st.questions.length * 3 : st.questions.length;
    const acc = (correct + wrong) > 0 ? ((correct / (correct + wrong)) * 100).toFixed(1) : "0.0";
    const verdict = parseFloat(pacePerQ) < 15 ? "Rushed (High Risk of Operational Slips)" : "Disciplined Exam Pacing";

    const w = window.open("", "_blank");
    if (!w) { alert("Please allow pop-ups to download the Official Diagnostic Marksheet PDF."); return; }
    w.document.write(`
      <!doctype html>
      <html>
      <head>
        <title>${exam}_Marksheet_${dateStr.replace(/\//g, "-")}_${st.serialId}_${candidate.replace(/\s+/g, "_")}</title>
        <style>
          body { font-family: Arial, Helvetica, sans-serif; color: #0f172a; margin: 24px; }
          .hdr { border-bottom: 2px solid #1e3a8a; padding-bottom: 12px; margin-bottom: 16px; }
          .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; background: #f8fafc; border: 1px solid #cbd5e1; padding: 12px; border-radius: 8px; margin-bottom: 18px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="hdr">
          <div style="font-size:11px; font-weight:800; color:#4f46e5; letter-spacing:1px;">GOALISB ${exam} EVALUATION ENGINE</div>
          <h1 style="margin:4px 0; font-size:20px;">OFFICIAL ${exam} DIAGNOSTIC MARKSHEET</h1>
          <div style="font-size:12px; color:#334155;">
            <strong>Candidate:</strong> ${candidate} &nbsp;|&nbsp;
            <strong>Assessment Serial ID:</strong> ${st.serialId} &nbsp;|&nbsp;
            <strong>Date:</strong> ${dateStr}
          </div>
        </div>
        <div class="grid">
          <div><strong>SCORE AWARDED:</strong> ${score}/${maxScore}</div>
          <div><strong>ACCURACY:</strong> ${acc}% (${correct}C/${wrong}W/${unattempted}U)</div>
          <div><strong>PACE PER Q:</strong> ${pacePerQ}s/Q</div>
          <div style="grid-column: span 3;"><strong>BLUEPRINT:</strong> ${st.blueprintTitle || bp.title} &nbsp;|&nbsp; <strong>VERDICT:</strong> ${verdict}</div>
        </div>
        ${rowsHtml}
        <script>window.onload = function(){ window.print(); };<\/script>
      </body>
      </html>
    `);
    w.document.close();
  };

  window.submitFullMock4 = function () {
    const st = window._MOCK_STATE;
    if (!st) return;
    st.submitted = true;
    st.dateStr = new Date().toLocaleDateString("en-GB");
    if (window._MOCK_TIMER_ID) clearInterval(window._MOCK_TIMER_ID);

    let correct = 0, wrong = 0, unattempted = 0;
    st.questions.forEach((q, i) => {
      const val = st.answers[i];
      if (val === undefined || val === "") unattempted++;
      else if (q.isTita ? String(val).trim().toLowerCase() === String(q.ans).trim().toLowerCase() : val === q.ans) correct++;
      else wrong++;
    });

    const isCat = exam === "CAT" && bp.id !== "XAT_5OPT";
    const score = isCat ? Math.max(0, correct * 3 - wrong * 1) : correct;
    const maxScore = isCat ? st.questions.length * 3 : st.questions.length;
    const accuracy = (correct + wrong) > 0 ? Math.round((correct / (correct + wrong)) * 100) : 0;
    const pctScore = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

    const hist = JSON.parse(localStorage.getItem("ipm_mock_history_v1") || "[]");
    hist.unshift({
      date: st.dateStr,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      serialId: st.serialId,
      blueprint: bp.title,
      score,
      maxScore,
      pctScore,
      correct,
      wrong,
      unattempted,
      accuracy,
      snapshot: {
        serialId: st.serialId,
        dateStr: st.dateStr,
        blueprintTitle: bp.title,
        bpId: bp.id,
        totalSeconds: st.totalSeconds,
        secondsLeft: st.secondsLeft,
        questions: st.questions,
        answers: st.answers
      }
    });
    localStorage.setItem("ipm_mock_history_v1", JSON.stringify(hist.slice(0, 25)));
    if (typeof window.syncPreparationReadinessHeader === "function") window.syncPreparationReadinessHeader();

    const banner = document.getElementById("mock-scorecard-banner");
    if (banner) {
      banner.classList.remove("hidden");
      banner.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div class="text-sm font-extrabold">Diagnostic Scorecard (${bp.title}): ${score} / ${maxScore} (${accuracy}% Accuracy)</div>
            <div class="text-xs mt-0.5">Assessment Serial ID: <strong>${st.serialId}</strong> &bull; Correct: <strong>${correct}</strong> &bull; Wrong: <strong>${wrong}</strong> &bull; Unattempted: <strong>${unattempted}</strong></div>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <button type="button" onclick="window.downloadOfficialMarksheet4('${st.serialId}')" class="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold cursor-pointer">&#128196; Download Official Marksheet PDF</button>
            <button type="button" onclick="window.selectUnifiedTab(6)" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold cursor-pointer">View Prep Level in Tab 6 &rarr;</button>
          </div>
        </div>
      `;
    }
    window.renderMockQuestionCard();
  };

  const savedHist = JSON.parse(localStorage.getItem("ipm_mock_history_v1") || "[]");
  const historyRowsHtml = savedHist.length
    ? savedHist.map((h, idx) => `
        <tr class="border-t border-slate-200 dark:border-slate-800 text-xs">
          <td class="py-2.5 px-3 font-mono font-extrabold text-indigo-600">${h.serialId || (exam + "-2026-" + (1000 + idx))}</td>
          <td class="py-2.5 px-3 text-slate-500">${h.date || ""} ${h.time || ""}</td>
          <td class="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-200">${h.blueprint || bp.title}</td>
          <td class="py-2.5 px-3 font-extrabold text-emerald-600">${h.score} / ${h.maxScore}</td>
          <td class="py-2.5 px-3 font-bold">${h.accuracy}% (${h.correct || 0}C/${h.wrong || 0}W)</td>
          <td class="py-2.5 px-3 text-right">
            <button type="button" onclick="window.downloadOfficialMarksheet4('${h.serialId}')" class="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-bold cursor-pointer">PDF</button>
          </td>
        </tr>
      `).join("")
    : `<tr><td colspan="6" class="py-5 text-center text-xs text-slate-400">No submitted mock sessions recorded yet. Start a proctored session above to generate your first Serial Mock ID.</td></tr>`;

  const bpSelectorHtml = BLUEPRINTS.map((item, idx) => `
    <button type="button" onclick="window._SELECTED_MOCK_BP=${idx}; window.renderMockSimulator4(document.getElementById('main-workspace'));"
      class="text-left p-3.5 rounded-2xl border transition cursor-pointer ${idx === window._SELECTED_MOCK_BP ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 shadow-sm' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400'}">
      <div class="text-[10px] font-extrabold uppercase text-indigo-600">${item.tag}</div>
      <div class="font-extrabold text-xs text-slate-900 dark:text-white mt-0.5 leading-snug">${item.title}</div>
      <div class="text-[11px] text-slate-500 mt-1 line-clamp-2">${item.desc}</div>
    </button>
  `).join("");

  el.innerHTML = `
    <div class="max-w-7xl mx-auto my-4 space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">${bpSelectorHtml}</div>

      <!-- Proctored Pre-Exam Briefing Lobby -->
      <div id="mock-lobby-box" class="space-y-4">
        <div class="bg-white dark:bg-slate-900 border-2 border-indigo-500/40 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <div class="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div class="space-y-1">
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-[10px] font-extrabold uppercase">${bp.tag} &bull; READY TO LAUNCH</span>
                <span class="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-mono font-extrabold">Next Serial ID: ${nextSerialId}</span>
              </div>
              <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">${bp.title}</h2>
              <p class="text-xs text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">${bp.desc}</p>
            </div>
            <button type="button" onclick="window.startMockSession4()"
              class="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-extrabold shadow-lg shadow-indigo-600/25 cursor-pointer transition">
              &#9654; Start Proctored Mock Session (${bp.mins} Mins)
            </button>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div class="text-[10px] font-bold uppercase text-slate-400">Question Count</div>
              <div class="font-extrabold text-slate-900 dark:text-white mt-0.5">${exactPool.length} Questions</div>
            </div>
            <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div class="text-[10px] font-bold uppercase text-slate-400">Proctored Clock</div>
              <div class="font-extrabold text-amber-600 dark:text-amber-400 mt-0.5">${bp.mins}:00 Minutes (Paused)</div>
            </div>
            <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div class="text-[10px] font-bold uppercase text-slate-400">Option Format</div>
              <div class="font-extrabold text-indigo-600 dark:text-indigo-300 mt-0.5">${isFiveOpt ? "5 Choices (A–E)" : "4 Choices (A–D) + TITA"}</div>
            </div>
            <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div class="text-[10px] font-bold uppercase text-slate-400">PostgreSQL Live Bank</div>
              <div class="font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">${pgQuestions.length} Live DB Items Loaded</div>
            </div>
          </div>
        </div>

        <!-- Serial Mock ID & Attempt History Log -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">PERSISTENT ASSESSMENT LEDGER</span>
              <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Serial Mock ID &amp; Diagnostic Score History (${savedHist.length} Logged)</h3>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" onclick="window.selectUnifiedTab(6)" class="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold cursor-pointer">View Prep Level in Tab 6 &rarr;</button>
              <button type="button" onclick="window.clearMockLog4()" class="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-extrabold cursor-pointer">&#128465; Clear Log</button>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="text-[10px] font-extrabold uppercase text-slate-400 bg-slate-50 dark:bg-slate-950">
                  <th class="py-2 px-3">Serial Mock ID</th>
                  <th class="py-2 px-3">Date &amp; Time</th>
                  <th class="py-2 px-3">Mock Blueprint</th>
                  <th class="py-2 px-3">Score</th>
                  <th class="py-2 px-3">Accuracy</th>
                  <th class="py-2 px-3 text-right">Marksheet</th>
                </tr>
              </thead>
              <tbody>${historyRowsHtml}</tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Active Exam Simulator -->
      <div id="mock-active-shell" class="hidden space-y-4">
        <div class="bg-slate-900 text-white rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 border border-slate-800 shadow-lg">
          <div>
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">${bp.tag} &bull; Serial ID: ${nextSerialId}</span>
            <h2 class="text-base font-extrabold">${bp.title}</h2>
          </div>
          <div class="flex flex-wrap items-center gap-2.5">
            <div class="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono">
              Time Remaining: <strong id="mock-live-timer" class="text-amber-300 text-sm">${bp.mins}:00</strong>
            </div>
            <button type="button" onclick="window.exitMockWithoutSubmission4()" class="px-3.5 py-2.5 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-extrabold shadow cursor-pointer">&#10005; Exit Without Submission</button>
            <button type="button" onclick="window.submitFullMock4()" class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow cursor-pointer">Submit Exam &amp; Forecast Score</button>
          </div>
        </div>

        <div id="mock-scorecard-banner" class="hidden p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200"></div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div id="mock-q-area" class="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm"></div>
          <div class="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
            <div class="text-xs font-extrabold uppercase tracking-wider text-indigo-600">Question Palette (${exactPool.length} Qs)</div>
            <div id="mock-palette-area" class="flex flex-wrap gap-1.5 max-h-80 overflow-y-auto pr-1"></div>
            <div class="pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 space-y-1">
              <div><span class="inline-block w-3 h-3 rounded bg-emerald-600 mr-1.5 align-middle"></span>Answered</div>
              <div><span class="inline-block w-3 h-3 rounded bg-amber-400 mr-1.5 align-middle"></span>Marked for Review</div>
              <div><span class="inline-block w-3 h-3 rounded bg-slate-200 dark:bg-slate-800 mr-1.5 align-middle"></span>Not Answered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};
window.renderTab4 = window.renderMockSimulator4;

// ==============================================================================
// TAB 6: DYNAMIC PREPARATION LEVEL & PERCENTILE FORECASTER (DRIVEN BY MOCK LOG)
// ==============================================================================
window.syncPreparationReadinessHeader = function () {
  const host = window.location.host.toLowerCase();
  const exam = host.includes("gmat") ? "GMAT" : (host.includes("gre") ? "GRE" : "CAT");
  const hist = JSON.parse(localStorage.getItem("ipm_mock_history_v1") || "[]");
  if (!hist.length) return;

  const avgPct = hist.reduce((acc, h) => acc + (h.maxScore > 0 ? (h.score / h.maxScore) : 0), 0) / hist.length;
  const labelText = exam === "CAT"
    ? `Readiness: ${Math.round(avgPct * 198)}/198 (~${Math.min(99.9, (65 + avgPct * 34.8)).toFixed(1)}%ile)`
    : (exam === "GMAT"
      ? `Readiness: ${Math.round(205 + avgPct * 600)}/805`
      : `Readiness: ${Math.round(260 + avgPct * 80)}/340`);

  document.querySelectorAll("span, div").forEach(node => {
    if (node.children.length === 0 && node.textContent && node.textContent.includes("Readiness:")) {
      node.textContent = node.textContent.replace(/Readiness:[^|)]+/, labelText);
    }
  });
};

window.renderScoreForecaster6 = function (el) {
  const host = window.location.host.toLowerCase();
  const exam = host.includes("gmat") ? "GMAT" : (host.includes("gre") ? "GRE" : "CAT");
  const hist = JSON.parse(localStorage.getItem("ipm_mock_history_v1") || "[]");

  const avgRatio = hist.length
    ? hist.reduce((s, h) => s + (h.maxScore > 0 ? h.score / h.maxScore : 0), 0) / hist.length
    : 0.47;
  const avgAccuracy = hist.length
    ? Math.round(hist.reduce((s, h) => s + (h.accuracy || 0), 0) / hist.length)
    : 0;
  const latest = hist[0] || null;

  let prepStage = "Stage 1: Diagnostic Baseline (Start Logging Mocks)";
  let stageBadge = "bg-slate-100 text-slate-700";
  let nextAction = "Complete at least 2 timed mocks in Tab 4 to calibrate your live preparation tier.";

  if (hist.length > 0) {
    if (avgRatio >= 0.72 && avgAccuracy >= 82) {
      prepStage = "Tier 4: 99+ Percentile Elite Ready";
      stageBadge = "bg-emerald-100 text-emerald-800 border-emerald-300";
      nextAction = "Maintain 2 full-length mocks per week, protect accuracy above 85%, and focus on Trap Doctor review.";
    } else if (avgRatio >= 0.52 && avgAccuracy >= 72) {
      prepStage = "Tier 3: 95–98.5 Percentile Contender";
      stageBadge = "bg-indigo-100 text-indigo-800 border-indigo-300";
      nextAction = "Eliminate negative-marking guesses on borderline MCQs to convert +12 net marks into the 99%ile zone.";
    } else if (avgRatio >= 0.30) {
      prepStage = "Tier 2: Concept Consolidation & Pacing Build";
      stageBadge = "bg-amber-100 text-amber-800 border-amber-300";
      nextAction = "Drill high-yield chapters in Tabs 1–3 and target 78%+ accuracy before increasing attempt volume.";
    } else {
      prepStage = "Tier 1: Foundation & Accuracy Calibration";
      stageBadge = "bg-rose-100 text-rose-800 border-rose-300";
      nextAction = "Review worked examples in Tabs 1–3 and avoid rushed submissions (aim for >= 90s per attempted question).";
    }
  }

  const projectedMetric = exam === "CAT"
    ? `${Math.round(avgRatio * 198)} / 198 Marks (~${Math.min(99.9, (65 + avgRatio * 34.8)).toFixed(1)}%ile)`
    : (exam === "GMAT"
      ? `${Math.round(205 + avgRatio * 600)} / 805 Scaled Score`
      : `${Math.round(260 + avgRatio * 80)} / 340 Composite Score`);

  const logRows = hist.length
    ? hist.map(h => `
        <tr class="border-t border-slate-200 dark:border-slate-800 text-xs">
          <td class="py-2.5 px-3 font-mono font-extrabold text-indigo-600">${h.serialId}</td>
          <td class="py-2.5 px-3 text-slate-500">${h.date} ${h.time || ""}</td>
          <td class="py-2.5 px-3 font-bold">${h.blueprint}</td>
          <td class="py-2.5 px-3 font-extrabold text-emerald-600">${h.score} / ${h.maxScore}</td>
          <td class="py-2.5 px-3">${h.accuracy}%</td>
          <td class="py-2.5 px-3 text-right">
            <button type="button" onclick="window.downloadOfficialMarksheet4('${h.serialId}')" class="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-bold cursor-pointer">Download PDF</button>
          </td>
        </tr>
      `).join("")
    : `<tr><td colspan="6" class="py-6 text-center text-xs text-slate-400">No mock attempts logged yet. Launch a mock in Tab 4 to compute your live Preparation Level.</td></tr>`;

  el.innerHTML = `
    <div class="max-w-7xl mx-auto my-4 space-y-5">
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">${exam} READINESS &amp; PREPARATION LEVEL ENGINE</span>
            <h2 class="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">Preparation Level Ascertained From Logged Mock Trajectory</h2>
          </div>
          <span class="px-3.5 py-1.5 rounded-full border text-xs font-extrabold ${stageBadge}">${prepStage}</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div class="text-[10px] font-bold uppercase text-slate-400">Logged Mocks Analyzed</div>
            <div class="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">${hist.length} Sessions</div>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div class="text-[10px] font-bold uppercase text-slate-400">Projected ${exam} Score</div>
            <div class="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5">${projectedMetric}</div>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div class="text-[10px] font-bold uppercase text-slate-400">Mean Attempt Accuracy</div>
            <div class="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">${avgAccuracy}%</div>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div class="text-[10px] font-bold uppercase text-slate-400">Latest Serial ID</div>
            <div class="text-sm font-mono font-extrabold text-slate-900 dark:text-white mt-1">${latest ? latest.serialId : "None yet"}</div>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-xs text-slate-800 dark:text-slate-200">
          <strong>Prescribed Next Step for Your Preparation Tier:</strong> ${nextAction}
        </div>
      </div>

      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Verified Serial Mock Log (${hist.length} Records)</h3>
          <button type="button" onclick="window.clearMockLog4(); window.renderScoreForecaster6(document.getElementById('main-workspace'));"
            class="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-extrabold cursor-pointer">&#128465; Clear Log</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="text-[10px] font-extrabold uppercase text-slate-400 bg-slate-50 dark:bg-slate-950">
                <th class="py-2 px-3">Serial Mock ID</th>
                <th class="py-2 px-3">Date &amp; Time</th>
                <th class="py-2 px-3">Blueprint</th>
                <th class="py-2 px-3">Score</th>
                <th class="py-2 px-3">Accuracy</th>
                <th class="py-2 px-3 text-right">Marksheet</th>
              </tr>
            </thead>
            <tbody>${logRows}</tbody>
          </table>
        </div>
      </div>
    </div>
  `;
};
window.renderTab6 = window.renderScoreForecaster6;
setTimeout(() => window.syncPreparationReadinessHeader(), 500);