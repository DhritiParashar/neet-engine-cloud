window.IPM_DOUBT_BANK = [
  // QUANT CORE (8 Doubts)
  {
    id: "db_q01", domain: "Quant Core", topic: "Percentages & Profit-Loss", examTag: "GRE General / OMETs",
    question: "Why does selling two items at the SAME Selling Price—one at +20% profit and one at -20% loss—always result in a 4% net loss instead of breaking even?",
    socraticNudge: "Assume SP = Rs. 120 for BOTH items. Calculate the individual Cost Price (CP1 and CP2) of each item separately—which item had the larger CP?",
    shortcutSolution: "CP1 = 120 / 1.20 = Rs. 100; CP2 = 120 / 0.80 = Rs. 150. Total CP = Rs. 250 vs. Total SP = Rs. 240 => Loss = 10 / 250 = 4% (always x^2 / 100 %)."
  },
  {
    id: "db_q02", domain: "Quant Core", topic: "Dishonest Dealer & Faulty Weights", examTag: "GRE General Rohtak / OMETs",
    question: "A shopkeeper marks up his goods by 25%, offers a 10% discount, AND uses an 800g weight instead of 1 kg. How do I combine all three changes in one line without getting confused?",
    socraticNudge: "Write every effect as a multiplicative ratio of (Money Collected / Actual Cost Incurred). What fraction represents collecting for 1000g while delivering 800g?",
    shortcutSolution: "Net SP/CP = (1000 / 800) * 1.25 * 0.90 = 1.25 * 1.25 * 0.90 = 1.40625 => +40.625% net profit."
  },
  {
    id: "db_q03", domain: "Quant Core", topic: "Alligation & Mixtures", examTag: "All 8 IIMs",
    question: "In repeated replacement (removing 10L from 50L pure milk and adding water 3 times), why can't I just subtract 30L of milk?",
    socraticNudge: "After the FIRST replacement, what percentage of the 10L you scoop out on the second draw is actually milk vs. water?",
    shortcutSolution: "Each step removes 10/50 = 1/5 of whatever milk remains, leaving 4/5 behind. After 3 steps: 50 * (4/5)^3 = 50 * 64/125 = 25.6L pure milk."
  },
  {
    id: "db_q04", domain: "Quant Core", topic: "Time, Speed & Circular Tracks", examTag: "GRE General",
    question: "How do I find the number of DISTINCT meeting points on a circular track vs. the time to meet at the STARTING point for the first time?",
    socraticNudge: "Reduce the speed ratio S1 : S2 to lowest integers a : b. How many times does the faster runner lap the slower runner before both finish whole numbers of laps?",
    shortcutSolution: "Distinct points = |a - b| (same direction) or (a + b) (opposite direction). Time to meet at start = LCM(Lap Time 1, Lap Time 2)."
  },
  {
    id: "db_q05", domain: "Quant Core", topic: "Number Systems — Remainders", examTag: "GRE General SA",
    question: "How do I find the remainder when 3^102 is divided by 101 without expanding huge powers?",
    socraticNudge: "Check if 101 is a prime number. What does Fermat's Little Theorem say about a^(p - 1) mod p when p is prime?",
    shortcutSolution: "101 is prime, so 3^100 ≡ 1 (mod 101). Thus 3^102 = 3^100 * 3^2 ≡ 1 * 9 = 9 (mod 101)."
  },
  {
    id: "db_q06", domain: "Quant Core", topic: "Number Systems — Factorials", examTag: "GRE General SA",
    question: "Why do we only divide by powers of 5 (and ignore 2s) when counting trailing zeros in 150! ?",
    socraticNudge: "A trailing zero comes from 10 = 2 * 5. In 150!, are there more multiples of 2 or multiples of 5?",
    shortcutSolution: "Powers of 2 far outnumber powers of 5, so 5 is the limiting reagent: floor(150/5) + floor(150/25) + floor(150/125) = 30 + 6 + 1 = 37 zeros."
  },
  {
    id: "db_q07", domain: "Quant Core", topic: "Quadratic Equations — Root Signs", examTag: "GRE General / IIMB UG",
    question: "How can I tell immediately from coefficients a, b, c whether a quadratic ax^2 + bx + c = 0 has two positive roots, two negative roots, or opposite-sign roots?",
    socraticNudge: "Look at the product of roots αβ = c/a and sum of roots α + β = -b/a once Discriminant D >= 0. What must c/a be if both roots have the same sign?",
    shortcutSolution: "If c/a < 0 => Opposite signs (D > 0 automatic). If c/a > 0 and D >= 0 => Same sign: both positive if -b/a > 0, both negative if -b/a < 0."
  },
  {
    id: "db_q08", domain: "Quant Core", topic: "Modulus & Inequalities", examTag: "GRE General",
    question: "Why does |x - 2| + |x - 5| + |x - 9| reach its minimum specifically at x = 5 and not at the average (2 + 5 + 9)/3 = 5.33?",
    socraticNudge: "Imagine moving x one unit right from x = 5 to x = 6: two distances (from 2 and 5) grow by +1 each (+2 total), while only one distance (from 9) shrinks by -1. What is the net slope?",
    shortcutSolution: "Piecewise linear V-shaped sum always minimizes at the MEDIAN of sorted critical points {2, 5, 9} -> at x = 5, value = 3 + 0 + 4 = 7."
  },

  // HIGHER MATH & STATS (8 Doubts)
  {
    id: "db_h01", domain: "Higher Math & Stats", topic: "Logarithms — Domain Traps", examTag: "GRE General / IIMB UG",
    question: "When solving log_2(x - 1) + log_2(x - 3) = 3, I got x = 5 and x = -1. Why is x = -1 invalid if (-1 - 1)(-1 - 3) = (-2)(-4) = +8?",
    socraticNudge: "Check the domain of the ORIGINAL equation before combining logs: is log_2(-2) defined in real numbers?",
    shortcutSolution: "Logarithm arguments must be strictly positive (> 0) in the original equation: x - 1 > 0 and x - 3 > 0 => x > 3. Reject x = -1; only x = 5 is valid."
  },
  {
    id: "db_h02", domain: "Higher Math & Stats", topic: "Sequences & AM-GM", examTag: "GRE General",
    question: "How do I find the minimum value of 4x + 9/x for x > 0 in 5 seconds without using calculus derivatives?",
    socraticNudge: "Recall the AM >= GM inequality for two positive numbers A and B: (A + B)/2 >= sqrt(A * B). Set A = 4x and B = 9/x!",
    shortcutSolution: "(4x + 9/x)/2 >= sqrt(4x * 9/x) = sqrt(36) = 6 => Minimum value = 2 * 6 = 12 (attained when 4x = 9/x => x = 1.5)."
  },
  {
    id: "db_h03", domain: "Higher Math & Stats", topic: "Permutations & Combinations", examTag: "GRE General SA",
    question: "When should I use Stars & Bars C(n + r - 1, r - 1) vs. r^n when distributing n balls into r boxes?",
    socraticNudge: "Ask two questions: Are the balls IDENTICAL or DISTINCT? And can a box receive ZERO balls?",
    shortcutSolution: "Distinct balls -> Distinct boxes = r^n. Identical balls -> Distinct boxes (empty allowed) = C(n + r - 1, r - 1); (at least 1 each) = C(n - 1, r - 1)."
  },
  {
    id: "db_h04", domain: "Higher Math & Stats", topic: "Probability — Bayes' Theorem", examTag: "IIMB UG / GRE General",
    question: "How do I avoid messy fraction algebra in Bayes' Theorem bag-selection problems?",
    socraticNudge: "Instead of multiplying tiny fractions, assume 100 or 1,000 total trials in a 2x2 tree!",
    shortcutSolution: "Build a natural-frequency count table: Target Conditional Prob = (Favorable Branch Count) / (Sum of All Branches Producing the Observed Event)."
  },
  {
    id: "db_h05", domain: "Higher Math & Stats", topic: "Matrices & Determinants", examTag: "GRE General / IIMB UG",
    question: "Why is the determinant of every 3x3 skew-symmetric matrix (A^T = -A) always equal to zero?",
    socraticNudge: "Take determinants on both sides of A^T = -A: we know det(A^T) = det(A), and for a 3x3 matrix, det(-A) = (-1)^3 * det(A)!",
    shortcutSolution: "det(A) = -det(A) => 2 * det(A) = 0 => det(A) = 0 for every odd-order skew-symmetric matrix."
  },
  {
    id: "db_h06", domain: "Higher Math & Stats", topic: "Functions — Counting Mappings", examTag: "GRE General / IIMB UG",
    question: "If Set A has 3 elements and Set B has 4 elements, how many total functions, one-one functions, and onto functions exist from A to B?",
    socraticNudge: "For each of the 3 elements in A, how many choices exist in B? And can 3 elements in A ever cover all 4 elements of B?",
    shortcutSolution: "Total = 4^3 = 64. One-one = P(4, 3) = 4 * 3 * 2 = 24. Onto = 0 (since domain size 3 < codomain size 4)."
  },
  {
    id: "db_h07", domain: "Higher Math & Stats", topic: "Calculus — Maxima & Minima", examTag: "IIMB UG / GRE General",
    question: "In business optimization (maximizing Profit = Revenue - Cost), why do we check f''(x) < 0 after setting f'(x) = 0?",
    socraticNudge: "Setting f'(x) = 0 only tells you the slope is flat—it could be a hilltop (maximum), a valley (minimum), or a flat inflection shelf.",
    shortcutSolution: "f''(x) < 0 confirms concave-down curvature (local maximum); f''(x) > 0 confirms concave-up curvature (local minimum)."
  },
  {
    id: "db_h08", domain: "Higher Math & Stats", topic: "Statistics — Linear Rescaling", examTag: "IIMB B.Sc. Econ/DS",
    question: "If every observation X in a dataset is transformed to Y = -3X + 10, why is the new Standard Deviation +3 * SD(X) instead of -3 * SD(X)?",
    socraticNudge: "Standard Deviation measures distance/spread around the mean—can a distance ever be negative?",
    shortcutSolution: "SD(aX + b) = |a| * SD(X) = |-3| * SD(X) = 3 * SD(X), while Variance scales by a^2 = 9."
  },

  // DI & LOGICAL REASONING (6 Doubts)
  {
    id: "db_d01", domain: "DI & Logical Reasoning", topic: "Data Interpretation — Ratio Comparison", examTag: "OMETs / Indore DI",
    question: "How can I compare four ugly fractions like 17/23, 21/29, 25/34, and 31/42 in under 15 seconds without long division?",
    socraticNudge: "Compare two fractions at a time using cross-multiplication: a/b vs c/d <=> a*d vs b*c!",
    shortcutSolution: "Cross-multiply pairs (17*29 = 493 vs 21*23 = 483 => 17/23 > 21/29) or check gap-to-numerator ratio."
  },
  {
    id: "db_d02", domain: "DI & Logical Reasoning", topic: "3-Set Venn Optimization", examTag: "GRE General / OMETs",
    question: "How do I find the MINIMUM and MAXIMUM possible intersection of all three sets when only individual totals (80%, 75%, 70%) are given?",
    socraticNudge: "To minimize the triple overlap, spread the 'failures/non-participants' (20%, 25%, 30%) so they don't overlap at all!",
    shortcutSolution: "Max(A∩B∩C) = min(A, B, C) = 70%. Min(A∩B∩C) = max(0, A + B + C - 2*Total) = 80 + 75 + 70 - 200 = 25%."
  },
  {
    id: "db_d03", domain: "DI & Logical Reasoning", topic: "Syllogisms — Possibility Cases", examTag: "GRE General Rohtak / OMETs",
    question: "Why is 'All A being B is a possibility' TRUE when the statement only says 'Some A are B'?",
    socraticNudge: "Draw a Venn diagram where circle A sits completely inside circle B: does that diagram violate 'Some A are B'?",
    shortcutSolution: "No! 'Some' means 'at least one, possibly all'. Anything consistent with at least one valid Venn diagram is a valid possibility."
  },
  {
    id: "db_d04", domain: "DI & Logical Reasoning", topic: "Data Sufficiency — Yes/No Traps", examTag: "GRE General Rohtak / OMETs",
    question: "In Data Sufficiency, if Statement I proves 'x = -5' for the question 'Is x > 0?', why is Statement I marked SUFFICIENT?",
    socraticNudge: "Does Statement I leave any doubt about whether x > 0 is true or false?",
    shortcutSolution: "Sufficiency means having enough data to answer definitively—a 100% certain 'NO' is just as sufficient as a 100% certain 'YES'."
  },
  {
    id: "db_d05", domain: "DI & Logical Reasoning", topic: "Clocks & Calendars", examTag: "GRE General Rohtak / OMETs",
    question: "Why do the hands of a clock coincide only 11 times in 12 hours (and 22 times in 24 hours) instead of 12 times?",
    socraticNudge: "Track the hands between 11:00 and 1:00: when does the minute hand catch the hour hand after 11:00?",
    shortcutSolution: "The coincidence between 11 and 1 happens right at 12:00, merging two hourly slots into one -> 11 coincidences per 12 hours."
  },
  {
    id: "db_d06", domain: "DI & Logical Reasoning", topic: "Binary Logic (Truth-Tellers & Liars)", examTag: "GRE General Rohtak / OMETs",
    question: "What is the fastest entry point to crack a 3-person Truth-Teller / Liar / Alternator puzzle without testing 6 cases?",
    socraticNudge: "Look for a statement where someone says 'I am the liar' or 'I am the alternator'—can a Truth-Teller or a Liar EVER say 'I am the liar'?",
    shortcutSolution: "Nobody can truthfully say 'I am a liar' (paradox). If someone says 'I am the alternator', they cannot be the Truth-Teller—eliminating cases immediately."
  },

  // VARC & GRAMMAR (6 Doubts)
  {
    id: "db_v01", domain: "VARC & Grammar", topic: "RC Inference vs. Assumption", examTag: "GRE General VARC",
    question: "What is the exact difference between an Inference and an Assumption in Reading Comprehension and Critical Reasoning?",
    socraticNudge: "Think of an argument as Premise + Unstated Bridge -> Conclusion. Which one sits BEFORE the conclusion as a hidden requirement, and which flows AFTER?",
    shortcutSolution: "Assumption = unstated premise required for the author's logic to hold (test via Negation). Inference = logical consequence forced to be true by the stated text."
  },
  {
    id: "db_v02", domain: "VARC & Grammar", topic: "Para-Jumbles — Mandatory Pairs", examTag: "GRE General VARC",
    question: "How do I solve 4-sentence Para-Jumbles when there are no options (TITA / SA format in GRE General)?",
    socraticNudge: "Scan for pronoun-antecedent links (Noun -> He/They/This), chronological time markers, and contrast pivots ('However, Yet').",
    shortcutSolution: "Build 2-sentence mandatory blocks first (e.g., Full Name -> Surname; Problem -> Contrast Pivot), then place the broad topic-introducer first and synthesis sentence last."
  },
  {
    id: "db_v03", domain: "VARC & Grammar", topic: "Grammar — Subjunctive Mood", examTag: "GRE General / Rohtak",
    question: "Why do we say 'The board insisted that the CFO resign' (without -s) and 'If I were you' (instead of 'was')?",
    socraticNudge: "Notice that neither sentence describes a factual reality—one is a formal demand/mandate and the other is a hypothetical wish.",
    shortcutSolution: "Mandative subjunctive ('insist/recommend/demand that + base verb') and counterfactual subjunctive ('If I were') drop standard indicative verb endings."
  },
  {
    id: "db_v04", domain: "VARC & Grammar", topic: "Grammar — Dangling Modifiers", examTag: "GRE General VARC",
    question: "Why is 'Walking down the street, the trees looked green' grammatically incorrect even though everyone understands it?",
    socraticNudge: "Who is performing the action 'Walking down the street' according to the noun immediately after the comma?",
    shortcutSolution: "An introductory participial phrase MUST modify the grammatical subject immediately following the comma ('Walking down the street, I saw green trees')."
  },
  {
    id: "db_v05", domain: "VARC & Grammar", topic: "Vocabulary — Tone & Connotation", examTag: "GRE General 2026",
    question: "In double-blank sentence completion, how do I eliminate 3 options in 10 seconds before checking exact dictionary definitions?",
    socraticNudge: "Look at the structural connector ('Although, Despite' = opposite polarity; 'Because, Moreover' = same polarity) and assign (+) or (-) charges to each blank!",
    shortcutSolution: "Charge-matching (+ / - polarity) eliminates 60-75% of distractor pairs immediately before fine-grained synonym nuance is even needed."
  },
  {
    id: "db_v06", domain: "VARC & Grammar", topic: "Grammar — Who vs. Whom", examTag: "GRE General / OMETs",
    question: "What is the foolproof 3-second trick to never confuse 'who' and 'whom' in error-spotting questions?",
    socraticNudge: "Mentally answer the clause using 'he/she' versus 'him/her'!",
    shortcutSolution: "If 'he/she' fits -> use WHO (subject). If 'him/her' fits -> use WHOM (object, especially after prepositions like 'to whom, by whom')."
  }
];
(window.IPM_DOUBT_BANK || []).forEach(d => {
  if (!d.fullDerivation) {
    d.fullDerivation = `Step 1 (Identify Structure): ${d.socraticNudge}\nStep 2 (Apply Core Formula): ${d.shortcutSolution}`;
  }
  if (!d.trapWarning) {
    d.trapWarning = `Examiner Trap in ${d.topic} (${d.examTag}): Do not apply linear/additive intuition when multiplicative scaling, domain restrictions, or formal quantifier rules apply.`;
  }
});

// Add tailored derivations & trap alerts for the flagship doubts
const customDetails = {
  db_q01: {
    fullDerivation: "Step 1: Let common Selling Price SP = Rs. 120.\nStep 2: For Item 1 (+20% profit), 1.20 * CP1 = 120 => CP1 = Rs. 100.\nStep 3: For Item 2 (-20% loss), 0.80 * CP2 = 120 => CP2 = Rs. 150.\nStep 4: Total CP = 100 + 150 = Rs. 250; Total SP = 120 + 120 = Rs. 240.\nStep 5: Net Loss % = (10 / 250) * 100 = 4%.",
    trapWarning: "Students see '+20%' and '-20%' and pick '0% No Profit No Loss'. Equal SP + equal % gain/loss ALWAYS produces (x^2 / 100)% net loss."
  },
  db_q02: {
    fullDerivation: "Step 1: Markup of 25% scales price by 5/4.\nStep 2: Discount of 10% scales price by 9/10.\nStep 3: Giving 800g while charging for 1000g scales realization by 1000/800 = 5/4.\nStep 4: Multiply all three factors: (5/4) * (9/10) * (5/4) = 225 / 160 = 1.40625 => +40.625% profit.",
    trapWarning: "Never add +25% - 10% + 20% = 35%. Faulty weight profit is 200/800 = 25% (not 20%), and successive factors must be multiplied."
  },
  db_h01: {
    fullDerivation: "Step 1: Combine logs: log_2[(x - 1)(x - 3)] = 3 => (x - 1)(x - 3) = 2^3 = 8.\nStep 2: Expand quadratic: x^2 - 4x + 3 = 8 => x^2 - 4x - 5 = 0 => (x - 5)(x + 1) = 0.\nStep 3: Check domain of original logs: x - 1 > 0 AND x - 3 > 0 => x > 3.\nStep 4: Reject x = -1; unique valid root is x = 5.",
    trapWarning: "In GRE General SA, entering '5, -1' or '2 solutions' is the #1 algebra trap. Always verify roots in the uncombined equation."
  },
  db_d02: {
    fullDerivation: "Step 1: Total = 100%. Non-passers: 20% (Q), 25% (V), 30% (LR).\nStep 2: To minimize triple overlap, make non-passers mutually disjoint: max non-passers = 20 + 25 + 30 = 75%.\nStep 3: Remaining 100% - 75% = 25% MUST pass all three subjects.\nStep 4: Maximum triple overlap cannot exceed the smallest group = min(80%, 75%, 70%) = 70%.",
    trapWarning: "Students often subtract from 100% only once (80 + 75 + 70 - 100 = 125 -> stuck) instead of subtracting 2 * Total (200%)."
  },
  db_v01: {
    fullDerivation: "Step 1 (Assumption Test): Negate the candidate statement. If the author's conclusion collapses, it is a required Assumption.\nStep 2 (Inference Test): Ask whether the passage text logically forces the statement to be 100% true without outside facts.\nStep 3: Eliminate options introducing unstated comparisons or extreme words ('always, never, solely').",
    trapWarning: "Do not pick real-world true statements that the passage never mentions—RC Inference treats the passage as the entire universe."
  }
};

(window.IPM_DOUBT_BANK || []).forEach(d => {
  if (customDetails[d.id]) {
    d.fullDerivation = customDetails[d.id].fullDerivation;
    d.trapWarning = customDetails[d.id].trapWarning;
  }
});
