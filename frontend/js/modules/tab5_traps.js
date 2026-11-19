// ==============================================================================
// TAB 5: 36-TRAP DIAGNOSTIC CLINIC (12 PER SECTION) + LIVE SOCRATIC AI DOUBT SOLVER
// ==============================================================================
window.renderTrapClinic5 = function (el) {
  const host = window.location.host.toLowerCase();
  const exam = host.includes("gmat") ? "GMAT" : (host.includes("gre") ? "GRE" : "CAT");

  const SECS = exam === "GMAT" ? ["QR", "VR", "DI"] : (exam === "GRE" ? ["Quant", "Verbal", "Adaptive Strategy"] : ["QA", "DILR", "VARC"]);

  const CAT_36 = [
    // 12 QA TRAPS
    { sec: "QA", title: "1. Dividing by a Variable Without Checking x = 0", trap: "Canceling x from x^2 = 5x to conclude x = 5.", why: "Drops the valid root x = 0, causing undercounting in TITA integer-solution questions.", fix: "Always factor: x(x - 5) = 0 => x in {0, 5}. Never divide an equation by an unknown that can be zero." },
    { sec: "QA", title: "2. Squaring Both Sides & Keeping Extraneous Roots", trap: "Squaring sqrt(x + 6) = x to get x^2 - x - 6 = 0 and accepting both x = 3 and x = -2.", why: "Principal square root is always >= 0, so x = -2 fails LHS = 2 != RHS = -2.", fix: "Enforce domain constraints (RHS >= 0) BEFORE squaring and plug every root back into the original equation." },
    { sec: "QA", title: "3. Applying AM >= GM to Negative or Zero Variables", trap: "Using AM >= GM on x + 1/x when x < 0 to claim minimum is 2.", why: "AM >= GM strictly requires positive real numbers (x > 0).", fix: "For x < 0, substitute y = -x > 0 so x + 1/x = -(y + 1/y) <= -2 (maximum is -2)." },
    { sec: "QA", title: "4. Non-Distinct vs. Distinct Objects in Stars & Bars", trap: "Using C(n+r-1, r-1) when distributing distinct gifts into distinct boxes.", why: "Stars & Bars counts identical objects; distinct objects map via r^n (or inclusion-exclusion).", fix: "Check 'identical' vs 'distinct' in sentence 1 before choosing C(n+r-1, r-1) vs r^n." },
    { sec: "QA", title: "5. Base-Change Domain Trap in Logarithms", trap: "Converting log_x(16) = 2 to x^2 = 16 and keeping x = -4.", why: "Logarithm base must satisfy x > 0 and x != 1.", fix: "Write domain filter (x > 0, x != 1, argument > 0) at the top of every log problem." },
    { sec: "QA", title: "6. Trailing Zeros in Non-Factorial Products", trap: "Counting only powers of 5 in products like 25 * 35 * 45 * 65.", why: "When factors of 2 are scarce, trailing zeros equal min(power of 2, power of 5).", fix: "Count BOTH v_2(N) and v_5(N) separately whenever the expression is not n!." },
    { sec: "QA", title: "7. Euler Totient Coprime Pre-Condition Missed", trap: "Applying a^phi(n) ≡ 1 (mod n) when gcd(a, n) > 1 (e.g., 6^100 mod 15).", why: "Euler's theorem fails if a and n share a common factor.", fix: "Factor out gcd(a, n) first, compute modulo n/gcd, then multiply back." },
    { sec: "QA", title: "8. Harmonic Mean vs. Arithmetic Mean Speed Trap", trap: "Averaging 40 km/h and 60 km/h as 50 km/h for equal-distance legs.", why: "Equal-distance legs spend MORE time at the slower speed.", fix: "Equal distance => Harmonic Mean 2uv/(u+v) = 48 km/h; Equal time => Arithmetic Mean (u+v)/2." },
    { sec: "QA", title: "9. Successive Percentage Change Symmetry Illusion", trap: "Assuming +25% followed by -25% returns to the original base.", why: "The -25% applies to the larger 1.25x base: 1.25 * 0.75 = 0.9375 (-6.25%).", fix: "Use multiplicative factors (1 + a)(1 - b) = 1 - x^2 for symmetric +/-x% shifts." },
    { sec: "QA", title: "10. 3D Cone Frustum Volume vs. Height Ratio", trap: "Assuming height cut 1:2 splits cone volume in 1:8 instead of 1:7.", why: "Top cone is 1/8 of total volume, so bottom frustum is 8 - 1 = 7 parts.", fix: "Always subtract top-cone ratio from total cone ratio to get the frustum." },
    { sec: "QA", title: "11. Modulus Triangle Inequality Equality Boundary", trap: "Solving |x - 3| + |x - 8| = 5 as only x = 3 and x = 8.", why: "For |x - a| + |x - b| = |b - a|, EVERY real x in the closed interval [3, 8] satisfies it.", fix: "Recognize closed-interval solutions [a, b] whenever RHS equals |b - a|." },
    { sec: "QA", title: "12. Ignoring TITA Zero-Penalty Advantage", trap: "Leaving TITA (SA_NUMERIC) questions blank out of fear of negative marks.", why: "CAT TITA carries +3 / 0 marking—zero penalty for wrong entries.", fix: "Never leave a TITA box empty; enter your best calibrated integer estimate." },

    // 12 DILR TRAPS
    { sec: "DILR", title: "1. 'At Least k' vs. 'Exactly k' in Venn Diagrams", trap: "Plugging '70 play Cricket' into the 'Only Cricket' region.", why: "'70 play Cricket' is the entire circle (Only + 2-set + 3-set), not the exclusive outer crescent.", fix: "Label circle totals outside the boundary and assign variables (a, b, c, x, y, z, k) inside." },
    { sec: "DILR", title: "2. Circular Arrangement Mirror-Reflection Overcount", trap: "Using n! instead of (n - 1)! for circular seating with distinct seats.", why: "Without numbered chairs, rotational shifts are identical.", fix: "Fix Person 1 at North to break rotational symmetry, then arrange remaining (n - 1)!" },
    { sec: "DILR", title: "3. 'Adjacent' vs. 'Immediate Left/Right' Ambiguity", trap: "Locking B to the right of A when the clue only says 'A and B sit next to each other'.", why: "'Adjacent' allows two symmetric cases (AB and BA).", fix: "Branch two parallel grids immediately whenever adjacency lacks direction." },
    { sec: "DILR", title: "4. Round-Robin Total Points Formula With Draws", trap: "Assuming total points in an N-team league is always 3 * C(N, 2).", why: "Every drawn match awards 1 + 1 = 2 points instead of 3, reducing the total by 1 per draw.", fix: "Use Total Points = 3*M - D (where M = matches, D = draws)." },
    { sec: "DILR", title: "5. Knockout Seeding Sum Off-by-One Error", trap: "Assuming Seed 1 plays Seed 16 in a 16-player Quarterfinal.", why: "In Round of k players, paired seeds sum to (k + 1): QF (8 players) sum = 9 => Seed 1 vs Seed 8.", fix: "Verify Round Size k first, then use opponent = (k + 1) - seed." },
    { sec: "DILR", title: "6. Percentage Share vs. Absolute Value Fallacy in DI", trap: "Concluding Company A sold more units because its market share rose from 20% to 25%.", why: "If the total market shrank by 30%, 25% of 70 (17.5) is LESS than 20% of 100 (20).", fix: "Check whether the pie/bar shows relative % or absolute volume before comparing across years." },
    { sec: "DILR", title: "7. Directed vs. Undirected Network Flow Assumption", trap: "Assuming pipes/roads allow two-way flow when arrows are one-way.", why: "One-way edges restrict inflow = outflow conservation at intermediate nodes.", fix: "Trace node in-degree and out-degree arrows before computing min-cut or max-flow." },
    { sec: "DILR", title: "8. 'Can Be True' vs. 'Must Be True' Logical Quantifier", trap: "Selecting an option that works in ONE valid case for a 'Must Be True' question.", why: "'Must Be True' requires truth across 100% of valid arrangements.", fix: "Actively try to falsify the option using your alternate branch grid." },
    { sec: "DILR", title: "9. 4-Set Venn Maxima/Minima With 'None' Allowed", trap: "Forgetting that 'None = 0' is only true when stated ('every student passed >= 1').", why: "Allowing unplaced elements shifts E_1 + E_2 + E_3 + E_4 <= N.", fix: "Underline whether 'at least one' is guaranteed in the caselet stem." },
    { sec: "DILR", title: "10. Sunk-Cost Set Lock-In Past Minute 11", trap: "Spending 18 minutes on a dead-end DILR set and leaving two solvable sets unread.", why: "DILR 99%ile requires solving 2.5 to 3 sets cleanly, not stubbornly wrestling Set 1.", fix: "Enforce a hard 4-minute scan + 10-minute bailout gate per set." },
    { sec: "DILR", title: "11. Cumulative vs. Incremental Bar Chart Misread", trap: "Reading 2024 bar height as annual sales when the y-axis says 'Cumulative Revenue'.", why: "Annual 2024 revenue equals Bar(2024) - Bar(2023).", fix: "Circle the y-axis unit and check for 'Cumulative' before calculating growth rates." },
    { sec: "DILR", title: "12. Unstated Tie-Breaker Assumption in Rankings", trap: "Assuming distinct scores when two candidates tie on primary criteria.", why: "Unless 'distinct integers' is stated, equal scores can share ranks.", fix: "Check for 'distinct' or 'no two items have the same value' in the rules." },

    // 12 VARC TRAPS
    { sec: "VARC", title: "1. Extreme Language ('Always', 'Never', 'Solely') in RC", trap: "Picking an option that echoes passage keywords but adds 'exclusively' or 'inevitably'.", why: "Academic RC passages use hedged claims ('tends to', 'often'); extreme absolutes are easily falsified.", fix: "Eliminate any inference choice containing unsubstantiated absolutes unless explicitly stated." },
    { sec: "VARC", title: "2. True Fact From Wrong Paragraph (Scope Shift)", trap: "Choosing an accurate statement from Paragraph 1 when the question asks about Paragraph 3.", why: "CAT distractors weaponize true facts that fail to answer the specific question stem.", fix: "Match the question stem's exact anchor noun/paragraph before evaluating truth." },
    { sec: "VARC", title: "3. Reversed Causal Direction Trap", trap: "Selecting 'A causes B' when the passage states 'B triggers A'.", why: "Both variables appear together in memory, tricking fast readers.", fix: "Draw a quick arrow (B -> A) next to causal verbs ('induces', 'stems from', 'precipitates')." },
    { sec: "VARC", title: "4. Outside Knowledge Intrusion", trap: "Choosing an answer that is factually true in real-world economics/science but unsupported by the text.", why: "RC tests strict textual entailment, not external domain trivia.", fix: "Ask: 'Can I point my finger to the exact sentence in the passage that proves this?'" },
    { sec: "VARC", title: "5. Para-Summary Dropping the Contrast Pivot ('Yet/However')", trap: "Picking a summary that captures the first half of the paragraph but omits the 'However' rebuttal.", why: "In CAT summaries, the author's main thesis sits AFTER the contrast pivot.", fix: "Ensure the winning summary preserves both the concession and the post-pivot claim." },
    { sec: "VARC", title: "6. TITA Para-Jumble Starting With Pronoun/Demonstrative", trap: "Placing a sentence starting with 'This asymmetry...' or 'Such mechanisms...' at Position 1.", why: "Demonstrative pronouns require an explicit antecedent noun in the preceding sentence.", fix: "Lock pronoun-antecedent pairs first (e.g., 4 -> 1) before ordering the remaining sentences." },
    { sec: "VARC", title: "7. Odd-One-Out Topic Match vs. Functional Shift", trap: "Keeping a sentence because it shares the same keyword (e.g., 'coral reefs') even though 4 sentences form a cohesive causal chain.", why: "Odd-One-Out tests paragraph unity, not mere keyword overlap.", fix: "Form the tightest 4-sentence coherent paragraph first; the leftover sentence is the Odd-One-Out." },
    { sec: "VARC", title: "8. Author's Tone vs. Cited Critic's Tone Confusion", trap: "Labeling the author's tone 'dismissive' when the author merely quotes a critic before refuting them.", why: "Passages frequently stage a 'Critics argue X... Yet evidence shows Y' dialectic.", fix: "Separate attribution tags ('Proponents claim') from the author's own voice." },
    { sec: "VARC", title: "9. Half-Right / Half-Wrong Compound Option", trap: "Selecting a two-clause option because the first clause is brilliantly phrased.", why: "CAT hides a subtle distortion in the second clause after a comma or 'while'.", fix: "Verify BOTH halves of every compound answer choice independently." },
    { sec: "VARC", title: "10. Para-Completion Missing Forward Link", trap: "Choosing a sentence that fits the preceding sentence smoothly but breaks the transition into the NEXT sentence.", why: "Blank-insertion items require bi-directional cohesion (Before -> Blank -> After).", fix: "Read Sentence(Before) + Candidate + Sentence(After) as a continuous 3-sentence bridge." },
    { sec: "VARC", title: "11. Analogy Purpose Misinterpretation", trap: "Thinking an analogy (e.g., 'aspirin in pharmacology') is the main topic of the passage.", why: "Examples and analogies are rhetorical evidence used to support a broader theoretical claim.", fix: "Ask 'WHY did the author bring up this example?' rather than 'WHAT is the example about?'" },
    { sec: "VARC", title: "12. Time Sink on Dense Philosophy Passages at Q1", trap: "Spending 14 minutes on an abstract epistemology RC and rushing the final 8 VA questions.", why: "Every MCQ carries +3 marks regardless of passage density.", fix: "Triage RCs in 30 seconds; bank high-accuracy VA & readable RCs first." }
  ];

  // Build GMAT & GRE 36-trap sets using the exact same 12-per-section architecture
  const makeExamTraps = () => {
    if (exam === "CAT") return CAT_36;
    const prefix = exam === "GMAT"
      ? [
          ["QR", "Zero Geometry & Number Properties: Testing only positive integers when 'x is a number' allows fractions (0 < x < 1) and negatives."],
          ["QR", "Inequality Sign Flip: Multiplying/dividing an inequality by variable y without knowing whether y > 0 or y < 0."],
          ["QR", "Quadratic Root Counting: Assuming x^2 = 16 means x = 4 in Data Sufficiency when x = -4 is also valid."],
          ["QR", "Percent Change Base Confusion: Confusing 'A is 25% greater than B' (A = 1.25B) with 'B is 25% less than A' (B = 0.75A)."],
          ["QR", "Prime Number 2 & 1 Trap: Forgetting 2 is the only even prime and 1 is NOT prime."],
          ["QR", "Remainder With Negative Dividends: Computing -17 mod 5 as -2 instead of +3."],
          ["QR", "Combinatorics Overcounting Identical Swaps: Dividing by k! when choosing teams of equal size."],
          ["QR", "Weighted Average Proximity: Forgetting the combined mean always lies closer to the group with larger weight."],
          ["QR", "Absolute Value Distance Definition: Missing that |x - a| = |x - b| places x at the exact midpoint (a + b)/2."],
          ["QR", "Divisibility by LCM vs. Product: Assuming divisibility by 4 and 6 implies divisibility by 24 instead of lcm(4,6) = 12."],
          ["QR", "Standard Deviation Shift Invariance: Adding a constant +10 to every data point leaves SD unchanged."],
          ["QR", "Work-Rate Reciprocal Trap: Adding times (t_1 + t_2) instead of adding rates (1/t_1 + 1/t_2)."],
          ["VR", "CR Necessary Assumption Negation Fail: Picking a Strengthener that helps the argument rather than a Necessary Assumption whose negation destroys it."],
          ["VR", "CR Reverse Causality Blindness: Failing to test whether Y caused X instead of X causing Y."],
          ["VR", "CR Correlation-to-Causation Leap: Accepting survey correlation as proof of policy efficacy without ruling out confounders."],
          ["VR", "CR Sampling Bias Blindness: Generalizing from a self-selected vocal subgroup to the entire population."],
          ["VR", "CR Boldface Role Misclassification: Confusing an intermediate sub-conclusion with the author's main conclusion."],
          ["VR", "CR Paradox Resolution Single-Side Trap: Choosing an option that explains only one half of the discrepancy instead of reconciling both."],
          ["VR", "RC Inference Overreach: Selecting a plausible real-world prediction that goes beyond strict logical entailment."],
          ["VR", "RC Detail vs. Primary Purpose: Picking a specific paragraph detail as the passage's overarching main idea."],
          ["VR", "RC Extreme Quantifier Distortion: Falling for 'all', 'never', or 'solely' when the text says 'some' or 'typically'."],
          ["VR", "CR Evaluate Question Variance: Picking an answer that has zero impact on the conclusion whether answered 'Yes' or 'No'."],
          ["VR", "CR Flaw Description Mismatch: Mislabeling a 'circular reasoning' flaw as an 'ad hominem' or 'false dilemma'."],
          ["VR", "Adaptive Q1–Q6 Rush Penalty: Rushing the opening 6 questions and depressing the GMAT Focus adaptive trajectory."],
          ["DI", "Data Sufficiency C-Trap: Jumping to Choice C (Both Together) when Statement (1) or (2) ALONE was already sufficient."],
          ["DI", "Data Sufficiency Value vs. Yes/No Confusion: Treating 'No, x is definitely not > 5' as insufficient in a Yes/No question (a definite 'No' IS sufficient!)."],
          ["DI", "Data Sufficiency Carryover Contamination: Importing numbers from Statement (1) while evaluating Statement (2) alone."],
          ["DI", "DS Single-Value Requirement: Accepting a statement that yields two possible values (x = 2 or x = -2) in a 'What is the value of x?' prompt."],
          ["DI", "Multi-Source Reasoning Tab Cross-Check Missed: Answering from Tab 1 without checking the footnote exception in Tab 3."],
          ["DI", "Graphics Interpretation Axis Scale Trap: Misreading logarithmic or non-zero-baseline y-axes."],
          ["DI", "Two-Part Analysis Coupled Constraint: Optimizing Column 1 independently without satisfying the joint equation linking Column 1 and Column 2."],
          ["DI", "Table Analysis Sort-Order Oversight: Failing to sort by the target ratio column before checking median/quartile thresholds."],
          ["DI", "Percent Points vs. Percentage Change: Confusing a rise from 10% to 12% (+2 percentage points) with a +2% relative increase (+20% relative)."],
          ["DI", "Unstated Integer Constraint in DS: Assuming 'x + y = 10' restricts x and y to positive integers when decimals/negatives are allowed."],
          ["DI", "Review-and-Edit Budget Blowout: Spending 5 minutes at the end re-solving a question you already solved cleanly."],
          ["DI", "Leaving Final DI Questions Blank: GMAT Focus imposes a severe score penalty for unanswered questions at time expiry."]
        ]
      : [
          ["Quant", "QC Boundary Trap (0, 1, Negatives, Fractions): Testing only x = 2 and x = 3 in Quantitative Comparison."],
          ["Quant", "QC Variable Relationship D-Trap: Picking A or B when plugging x = 0.5 flips the inequality relative to x = 2."],
          ["Quant", "Geometry Diagram Not Drawn to Scale: Assuming an angle is 90° or sides are equal just from visual appearance."],
          ["Quant", "Standard Deviation Spread Misconception: Assuming larger mean implies larger standard deviation."],
          ["Quant", "Normal Distribution Tail Symmetry: Confusing 'above +1 SD' (~16%) with 'between mean and +1 SD' (~34%)."],
          ["Quant", "Inclusive Counting Off-by-One: Counting integers from 12 to 45 as 45 - 12 = 33 instead of 45 - 12 + 1 = 34."],
          ["Quant", "Percent Increase vs. Multiplier: Confusing 'increased by 200%' (3x) with '200% of original' (2x)."],
          ["Quant", "Multiple-Answer All-That-Apply Partial Credit Trap: Stopping after finding 1 valid choice when 2 or 3 choices satisfy the inequality."],
          ["Quant", "Numeric Entry Rounding Specification: Entering 0.333 when the prompt asks for 'nearest hundredth' (0.33) or 'as a fraction'."],
          ["Quant", "Divisor vs. Prime Factor Confusion: Counting prime factors of 36 (2) instead of total positive divisors (9)."],
          ["Quant", "Probability Without Replacement: Failing to decrement the denominator on the second draw."],
          ["Quant", "Exponent Sign & Parentheses: Confusing -3^2 (-9) with (-3)^2 (+9)."],
          ["Verbal", "Text Completion Contrast Hinge Missed: Ignoring 'although', 'belie', 'notwithstanding', or 'far from' that reverse blank polarity."],
          ["Verbal", "Multi-Blank TC Sequential Guessing: Solving Blank 1 in isolation instead of anchoring on the unambiguous Blank 2/3 clue first."],
          ["Verbal", "Sentence Equivalence Synonym-Pair Trap: Picking two words that fit the sentence individually but are NOT synonyms of each other."],
          ["Verbal", "SE False Synonym Pair: Selecting a synonym pair whose tone/intensity mismatches the sentence's second clause."],
          ["Verbal", "RC Select-In-Passage Sentence Mismatch: Highlighting a supporting example instead of the sentence that directly states the premise."],
          ["Verbal", "RC Multi-Select 'Consider Each Choice Independently': Eliminating Choice B just because Choice A looks good."],
          ["Verbal", "Vocabulary Secondary-Meaning Trap: Missing academic meanings (e.g., 'pedestrian' = dull, 'plastic' = malleable, 'check' = restrain)."],
          ["Verbal", "Double-Negative Logic Flip: Misreading 'not implausible' or 'hardly unprecedented'."],
          ["Verbal", "Scope Creep in Strengthen/Weaken RC: Picking an outside factor unrelated to the author's causal mechanism."],
          ["Verbal", "Author vs. Subject Attribution: Attributing a historical thinker's view to the passage author."],
          ["Verbal", "Colon/Semicolon Equivalence Blindness: Missing that text after ':' or ';' directly defines or elaborates the blank."],
          ["Verbal", "Over-Spending Time on 3-Blank TC: Burning 3.5 minutes on one 3-blank TC while starving 4 high-accuracy SE items."],
          ["Adaptive Strategy", "Stage 1 Accuracy Slippage: Missing easy/medium items in Stage 1 and getting routed to Medium instead of Hard Stage 2."],
          ["Adaptive Strategy", "Hard Stage 2 Score Ceiling Bonus: Not realizing Hard Stage 2 unlocks the 165–170 ceiling even with a few misses."],
          ["Adaptive Strategy", "Blank Answer Penalty Illusion: GRE has ZERO negative marking—never leave any question blank."],
          ["Adaptive Strategy", "Calculator Over-Reliance on Simple Fractions: Using the on-screen calculator for 25% of 80 instead of mental math."],
          ["Adaptive Strategy", "QC 'Mark & Return' Discipline: Spending 4 minutes on one stubborn QC instead of marking and returning."],
          ["Adaptive Strategy", "Verbal Pacing Split (15m TC/SE + 26m RC): Letting dense RC passages squeeze Sentence Equivalence."],
          ["Adaptive Strategy", "Elimination-First in Sentence Equivalence: Crossing out non-paired words immediately to isolate exact semantic twins."],
          ["Adaptive Strategy", "Plugging Zero & Negatives First in QC: Testing x = 0, -1, 1/2 before concluding any algebraic comparison."],
          ["Adaptive Strategy", "Reading Comprehension Structural Map: Summarizing each paragraph's function in 5 words before looking at questions."],
          ["Adaptive Strategy", "Numeric Entry Fraction vs. Decimal Check: Checking whether two boxes (numerator/denominator) or one decimal box is shown."],
          ["Adaptive Strategy", "Scratchpad Organization: Dividing scratchpad into numbered boxes to prevent misreading your own algebra."],
          ["Adaptive Strategy", "Final 60-Second Guess Sweep: Filling every unmarked question before the section clock hits 00:00."]
        ];
    return prefix.map((item, idx) => {
      const parts = item[1].split(": ");
      return {
        sec: item[0],
        title: `${(idx % 12) + 1}. ${parts[0]}`,
        trap: parts[1] || item[1],
        why: `High-frequency ${exam} ${item[0]} distractor engineered to trigger impulsive pattern matching.`,
        fix: `Pause for a 3-second boundary & logic audit before locking your ${exam} response.`
      };
    });
  };

  const ALL_TRAPS = makeExamTraps();
  window._TRAP_SEC_FILTER = window._TRAP_SEC_FILTER || "ALL";
  window._DEFUSED_TRAPS = JSON.parse(localStorage.getItem("ipm_defused_traps_v1") || "{}");

  const filtered = window._TRAP_SEC_FILTER === "ALL"
    ? ALL_TRAPS
    : ALL_TRAPS.filter(t => t.sec === window._TRAP_SEC_FILTER);

  const defusedCount = ALL_TRAPS.filter((_, i) => window._DEFUSED_TRAPS[`${exam}_${i}`]).length;

  window.resetDefusedTraps5 = function () {
    if (!confirm(`Reset all defused trap checkmarks for ${exam} and return filter to All Sections?`)) return;
    Object.keys(window._DEFUSED_TRAPS).forEach(k => {
      if (k.startsWith(`${exam}_`)) delete window._DEFUSED_TRAPS[k];
    });
    localStorage.setItem("ipm_defused_traps_v1", JSON.stringify(window._DEFUSED_TRAPS));
    window._TRAP_SEC_FILTER = "ALL";
    window.renderTrapClinic5(document.getElementById("main-workspace"));
  };
  window.toggleTrapDefused5 = function (globalIdx) {
    const key = `${exam}_${globalIdx}`;
    window._DEFUSED_TRAPS[key] = !window._DEFUSED_TRAPS[key];
    localStorage.setItem("ipm_defused_traps_v1", JSON.stringify(window._DEFUSED_TRAPS));
    window.renderTrapClinic5(document.getElementById("main-workspace"));
  };

  window.sendTrapToDoubt5 = function (title, trapText, fixText) {
    const tIn = document.getElementById("trap-doubt-topic");
    const qIn = document.getElementById("trap-doubt-prompt");
    if (tIn) tIn.value = title;
    if (qIn) {
      qIn.value = `Explain this ${exam} trap with a worked example and show how to avoid it under exam pressure:\nTrap: ${trapText}\nAntidote: ${fixText}`;
      qIn.focus();
    }
  };

    window.solveTrapDoubt5 = async function () {
    const topic = (document.getElementById("trap-doubt-topic")?.value || `${exam} Trap Analysis`).trim();
    const prompt = (document.getElementById("trap-doubt-prompt")?.value || "").trim();
    const out = document.getElementById("trap-doubt-output");
    if (!out) return;

    const words = prompt.split(/\s+/).filter(w => /[a-zA-Z0-9]{2,}/.test(w));
    const hasVowels = /[aeiouAEIOU]/.test(prompt);
    if (prompt.length < 10 || words.length < 2 || !hasVowels) {
      out.classList.remove("hidden");
      out.innerHTML = `<div class="text-xs font-bold text-rose-600">Please enter a valid ${exam} question, mathematical expression, or click <strong>"⚡ Ask AI Doubt Doctor About This Trap"</strong> on any trap card above.</div>`;
      return;
    }

    out.classList.remove("hidden");
    out.innerHTML = `<div class="text-xs font-bold text-indigo-500 animate-pulse">Connecting to ${exam} Socratic AI Tutor (/api/doubt)...</div>`;

    try {
      const res = await fetch("/api/doubt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ track: exam, topic: topic, question: prompt, student_attempt: "" })
      });
      if (res.ok) {
        const data = await res.json();
        const ans = data.solution || data.explanation || data.feedback || "";
        if (ans) {
          out.innerHTML = `<div class="text-xs leading-relaxed whitespace-pre-wrap text-slate-800 dark:text-slate-200">${ans}</div>`;
          return;
        }
      }
    } catch (e) {}

    out.innerHTML = `<div class="text-xs text-rose-600 font-bold">Unable to reach /api/doubt right now. Check Render service status and retry.</div>`;
  };

  const secButtons = ["ALL", ...SECS].map(s => {
    const count = s === "ALL" ? ALL_TRAPS.length : ALL_TRAPS.filter(t => t.sec === s).length;
    const active = window._TRAP_SEC_FILTER === s;
    return `<button type="button" onclick="window._TRAP_SEC_FILTER='${s}'; window.renderTrapClinic5(document.getElementById('main-workspace'));"
      class="px-3.5 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition ${active ? 'bg-rose-600 text-white shadow' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50'}">
      ${s === "ALL" ? "All Sections" : s} (${count} Traps)
    </button>`;
  }).join("");

  const cardsHtml = filtered.map(t => {
    const globalIdx = ALL_TRAPS.indexOf(t);
    const isDefused = !!window._DEFUSED_TRAPS[`${exam}_${globalIdx}`];
    const safeTitle = t.title.replace(/'/g, "\\'");
    const safeTrap = t.trap.replace(/'/g, "\\'");
    const safeFix = t.fix.replace(/'/g, "\\'");

    return `
      <div class="p-4 rounded-2xl border transition space-y-2.5 ${isDefused ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'}">
        <div class="flex items-start justify-between gap-2">
          <div>
            <span class="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-[10px] font-extrabold uppercase">${t.sec}</span>
            <h4 class="text-xs font-extrabold text-slate-900 dark:text-white mt-1">${t.title}</h4>
          </div>
          <button type="button" onclick="window.toggleTrapDefused5(${globalIdx})"
            class="px-2.5 py-1 rounded-lg text-[10px] font-extrabold cursor-pointer ${isDefused ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}">
            ${isDefused ? "&#10003; Defused" : "Mark Defused"}
          </button>
        </div>
        <div class="text-[11px] text-rose-700 dark:text-rose-300 font-semibold"><strong>Trap:</strong> ${t.trap}</div>
        <div class="text-[11px] text-slate-600 dark:text-slate-400"><strong>Why It Happens:</strong> ${t.why}</div>
        <div class="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold"><strong>99%ile Antidote:</strong> ${t.fix}</div>
        <div class="pt-1">
          <button type="button" onclick="window.sendTrapToDoubt5('${safeTitle}', '${safeTrap}', '${safeFix}')"
            class="text-[11px] font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
            &#9889; Ask AI Doubt Doctor About This Trap &rarr;
          </button>
        </div>
      </div>
    `;
  }).join("");

  el.innerHTML = `
    <div class="max-w-7xl mx-auto my-4 space-y-5">
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-rose-600">${exam} NEGATIVE-MARKING &amp; DISTRACTOR SHIELD</span>
            <h2 class="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">Trap Doctor Clinic (${ALL_TRAPS.length} High-Frequency Traps &bull; 12 Per Section)</h2>
            <p class="text-xs text-slate-500 mt-0.5">Mastered &amp; Defused: <strong class="text-emerald-600">${defusedCount} / ${ALL_TRAPS.length}</strong> traps across ${SECS.join(", ")}.</p>
          </div>
          <div class="flex flex-wrap items-center gap-2">${secButtons}<button type="button" onclick="window.resetDefusedTraps5()" class="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-rose-50 hover:text-rose-700 text-slate-700 dark:text-slate-200 text-xs font-extrabold cursor-pointer transition">&#8634; Reset Traps</button></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[720px] overflow-y-auto pr-1">
            ${cardsHtml}
          </div>

          <div class="lg:col-span-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 h-fit sticky top-4">
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">SOCRATIC AI TUTOR</span>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white">AI Doubt &amp; Trap Breakdown</h3>
            <p class="text-xs text-slate-500">Click any trap card's <strong>Ask AI Doubt Doctor</strong> link or paste your own ${exam} question below.</p>
            <div>
              <label class="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">Topic / Trap Focus</label>
              <input id="trap-doubt-topic" type="text" value="${SECS[0]} • Boundary & Distractor Check" class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold">
            </div>
            <div>
              <label class="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">Question or Trap to Analyze</label>
              <textarea id="trap-doubt-prompt" rows="4" placeholder="Paste any ${exam} question or click 'Ask AI Doubt Doctor' on a trap card..." class="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"></textarea>
            </div>
            <button type="button" onclick="window.solveTrapDoubt5()" class="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow cursor-pointer">
              &#10024; Analyze Trap &amp; Generate 30s Shortcut
            </button>
            <div id="trap-doubt-output" class="hidden p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800"></div>
          </div>
        </div>
      </div>
    </div>
  `;
};
window.renderTab5 = window.renderTrapClinic5;