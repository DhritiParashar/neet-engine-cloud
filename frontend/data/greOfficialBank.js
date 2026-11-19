// Official ETS GRE General Question Bank (Text Completion, Sentence Equivalence, Academic RC, Quantitative Comparison, Problem Solving & Numeric Entry)
window.GRE_OFFICIAL_BANK = {
  verbal: {
    textCompletion: [
      {
        id: "GRE-TC-101",
        subtype: "1-Blank Text Completion",
        difficulty: "Hard (162–168 Level)",
        stem: "Although the biographer's exhaustive archival research was widely praised for its empirical rigor, her reluctance to adjudicate between conflicting eyewitness accounts rendered the final narrative frustratingly ________.",
        blanks: [
          ["noncommittal", "tendentious", "panegyrical", "aphoristic", "pellucid"]
        ],
        correct: [0],
        explanation: "Pivot 'Although' contrasts 'empirical rigor' with 'reluctance to adjudicate between conflicting accounts'. Avoiding taking a stand makes a narrative 'noncommittal' (evasive/neutral). 'Tendentious' (biased) is the exact opposite trap."
      },
      {
        id: "GRE-TC-102",
        subtype: "2-Blank Text Completion",
        difficulty: "Hard (164–170 Level)",
        stem: "Early critics dismissed the composer's late string quartets as (i) ________ exercises in abstract formalism, yet subsequent musicologists have demonstrated that beneath their austere surface lies a deeply (ii) ________ emotional architecture.",
        blanks: [
          ["arid", "maudlin", "eclectic"],
          ["affecting", "jejune", "derivative"]
        ],
        correct: [0, 0],
        explanation: "Blank (i) pairs with 'abstract formalism' and 'austere surface' -> 'arid' (dry, lacking warmth). Pivot 'yet' reverses this in Blank (ii) -> 'affecting' (deeply moving)."
      },
      {
        id: "GRE-TC-103",
        subtype: "3-Blank Text Completion",
        difficulty: "Very Hard (166–170 Level)",
        stem: "Far from (i) ________ the debate over urban zoning reform, the commission's report actually (ii) ________ existing divisions, largely because its recommendations were so (iii) ________ that both developers and preservationists claimed vindication.",
        blanks: [
          ["settling", "igniting", "obfuscating"],
          ["exacerbated", "ameliorated", "circumvented"],
          ["equivocal", "draconian", "unambiguous"]
        ],
        correct: [0, 0, 0],
        explanation: "'Far from (i)' sets up a contrast with (ii): instead of 'settling' the debate, it 'exacerbated' divisions. Why could both opposing sides claim vindication? Because the recommendations were 'equivocal' (open to two opposing interpretations)."
      },
      {
        id: "GRE-TC-104",
        subtype: "2-Blank Text Completion",
        difficulty: "Medium-Hard (158–164 Level)",
        stem: "While proponents of algorithmic hiring argue that automated screening (i) ________ human prejudice, empirical audits reveal that models trained on historical employment data frequently (ii) ________ the very inequities they were designed to eliminate.",
        blanks: [
          ["mitigates", "instantiates", "magnifies"],
          ["entrench", "dissipate", "forestall"]
        ],
        correct: [0, 0],
        explanation: "'While proponents argue X, empirical audits reveal Y': proponents claim it 'mitigates' (reduces) prejudice, whereas audits show models 'entrench' (cement/reinforce) existing inequities."
      }
    ],
    sentenceEquivalence: [
      {
        id: "GRE-SE-201",
        subtype: "Sentence Equivalence (Select Exact 2)",
        difficulty: "Hard (163–169 Level)",
        stem: "Despite the CEO's public assurances that the merger would proceed seamlessly, internal memos revealed a culture of ________ among senior vice presidents regarding incompatible software infrastructures.",
        options: ["trepidation", "nonchalance", "apprehension", "alacrity", "complicity", "hubris"],
        correct: [0, 2],
        explanation: "'Despite public assurances' signals internal worry/unease. 'Trepidation' and 'apprehension' both mean anxiety or fearful anticipation, producing two equivalent sentences."
      },
      {
        id: "GRE-SE-202",
        subtype: "Sentence Equivalence (Select Exact 2)",
        difficulty: "Hard (164–170 Level)",
        stem: "Historians have long noted that revolutions rarely unfold according to the ________ blueprints drafted by their intellectual architects; instead, contingent street-level pressures continually reshape ideological goals.",
        options: ["schematic", "capricious", "doctrinaire", "improvisational", "dogmatic", "ephemeral"],
        correct: [2, 4],
        explanation: "Contrasted with 'contingent street-level pressures' that 'continually reshape' goals, the initial blueprints were rigid and inflexible: 'doctrinaire' and 'dogmatic' form the exact synonym pair."
      },
      {
        id: "GRE-SE-203",
        subtype: "Sentence Equivalence (Select Exact 2)",
        difficulty: "Medium-Hard (158–163 Level)",
        stem: "Because the geological strata in the basin had been repeatedly overturned by tectonic folding, dating the fossilized pollen required ________ paleobotanical detective work.",
        options: ["perfunctory", "painstaking", "assiduous", "desultory", "specious", "trenchant"],
        correct: [1, 2],
        explanation: "Overturned geological strata make dating difficult, requiring thorough, diligent effort: 'painstaking' and 'assiduous' both mean meticulous and diligent."
      }
    ],
    readingComprehension: [
      {
        id: "GRE-RC-301",
        subtype: "Academic RC • Inference & Select-in-Passage",
        difficulty: "Hard (164–170 Level)",
        passageSentences: [
          "For decades, marine biologists attributed the vibrant coloration of deep-reef corals primarily to photoprotection against ultraviolet radiation.",
          "However, recent spectroscopic surveys at depths exceeding sixty meters—where UV irradiance is negligible—have documented intense red and orange fluorescence among several scleractinian species.",
          "Researchers now hypothesize that these long-wavelength pigments convert scarce blue light into wavelengths capable of penetrating deeper into coral tissue, thereby sustaining photosynthetic endosymbionts in light-starved habitats.",
          "Paradoxically, the very pigments that shield shallow-water corals from solar excess appear to function as photon-harvesting amplifiers in the mesophotic twilight zone."
        ],
        questions: [
          {
            qid: "GRE-RC-301A",
            format: "Single-Answer MCQ",
            prompt: "The passage suggests which of the following about the photoprotection hypothesis?",
            options: [
              "It has been entirely invalidated for shallow-water scleractinian corals.",
              "It cannot fully account for the presence of fluorescent pigments in corals inhabiting depths beyond sixty meters.",
              "It correctly predicted that blue light penetrates deeper into coral tissue than red light.",
              "It was formulated after spectroscopic surveys of mesophotic reefs were completed.",
              "It overestimates the number of photosynthetic endosymbionts present in shallow reefs."
            ],
            correct: [1],
            explanation: "Sentence 2 notes that UV irradiance is negligible below 60m yet fluorescence persists, showing photoprotection alone cannot explain deep-reef pigmentation while Sentence 4 confirms its role in shallow water."
          },
          {
            qid: "GRE-RC-301B",
            format: "Select-in-Passage",
            prompt: "Select the sentence in the passage that states the proposed physiological mechanism by which deep-reef pigments assist symbiotic organisms.",
            correctSentenceIndex: 2,
            explanation: "Sentence 3 ('Researchers now hypothesize that these long-wavelength pigments convert scarce blue light...') explicitly describes the mechanism."
          }
        ]
      }
    ]
  },
  quant: [
    {
      id: "GRE-QC-401",
      subtype: "Quantitative Comparison",
      difficulty: "Hard (164–170 Level)",
      stem: "x and y are integers such that x^2 + y^2 = 25 and x > y.",
      quantityA: "x + y",
      quantityB: "5",
      options: [
        "Quantity A is greater.",
        "Quantity B is greater.",
        "The two quantities are equal.",
        "The relationship cannot be determined from the information given."
      ],
      correct: [3],
      explanation: "Integer pairs (x, y) with x^2 + y^2 = 25 and x > y include (4, 3) -> x + y = 7 (> 5), and (3, -4) -> x + y = -1 (< 5). Since Quantity A can be greater or less than 5, choose (D)."
    },
    {
      id: "GRE-QC-402",
      subtype: "Quantitative Comparison",
      difficulty: "Medium-Hard (159–164 Level)",
      stem: "Set S consists of 7 consecutive odd integers whose median is m, where m > 10.",
      quantityA: "The standard deviation of Set S",
      quantityB: "The standard deviation of the set obtained by multiplying each element of S by -1",
      options: [
        "Quantity A is greater.",
        "Quantity B is greater.",
        "The two quantities are equal.",
        "The relationship cannot be determined from the information given."
      ],
      correct: [2],
      explanation: "Multiplying every element of a dataset by -1 reflects all values across 0 without changing pairwise distances from the mean. Thus both standard deviations are identical -> (C)."
    },
    {
      id: "GRE-PS-403",
      subtype: "Numeric Entry (Exact Value)",
      difficulty: "Hard (165–170 Level)",
      stem: "If 3^(2x - 1) + 3^(2x) = 324, what is the value of x?",
      numericAnswer: "2.5",
      options: ["2.5", "2", "3", "3.5", "1.5"],
      correct: [0],
      explanation: "Factor out 3^(2x - 1): 3^(2x - 1) * (1 + 3) = 324 -> 4 * 3^(2x - 1) = 324 -> 3^(2x - 1) = 81 = 3^4. Hence 2x - 1 = 4 -> x = 2.5."
    },
    {
      id: "GRE-PS-404",
      subtype: "Multiple-Answer Problem Solving (Select All That Apply)",
      difficulty: "Hard (163–169 Level)",
      stem: "If n is a positive integer not divisible by 3, which of the following MUST be divisible by 3? (Select all that apply.)",
      multiSelect: true,
      options: [
        "n^2 - 1",
        "n^2 + 2",
        "2n^2 + 1",
        "n^3 - n",
        "n^2 + n"
      ],
      correct: [0, 1, 2, 3],
      explanation: "Since n is not divisible by 3, n = 3k ± 1, so n^2 ≡ 1 (mod 3). Thus n^2 - 1 ≡ 0, n^2 + 2 ≡ 0, 2n^2 + 1 ≡ 0, and n^3 - n = n(n^2 - 1) ≡ 0 (mod 3). Only n^2 + n fails when n = 1 (gives 2)."
    }
  ]
};

// Override inherited IPM/CAT arrays so no grammar, parajumbles, or synonym flashcards appear anywhere
window.IPM_VARC_BANK = window.GRE_OFFICIAL_BANK.verbal.textCompletion.map(q => ({
  id: q.id, topic: q.subtype, difficulty: q.difficulty, question: q.stem,
  options: q.blanks[0], answer: q.correct[0], explanation: q.explanation
}));
window.IPM_DILR_VARC_BANK = window.IPM_VARC_BANK;
window.IPM_QUANT_CORE = [
  {
    id: "GRE-MOD-QC",
    title: "Quantitative Comparison (Quantity A vs. Quantity B)",
    weightage: "High Yield • ~10–11 Qs across 2 GRE Quant Sections",
    refresher: "Always test boundary cases: negative numbers, fractions between 0 and 1, zero, and extreme values. If substituting two valid test cases reverses which quantity is larger, immediately select (D) The relationship cannot be determined.",
    shortcuts: [
      "Subtract or add identical terms from both Quantity A and Quantity B to simplify algebraic expressions.",
      "Never assume geometric figures are drawn to scale unless explicitly stated."
    ],
    drills: window.GRE_OFFICIAL_BANK.quant.filter(q => q.subtype.includes("Quantitative Comparison")).map(q => ({
      id: q.id, question: `${q.stem}\n\nQuantity A: ${q.quantityA}\nQuantity B: ${q.quantityB}`,
      options: q.options, answer: q.correct[0], explanation: q.explanation
    }))
  },
  {
    id: "GRE-MOD-PS",
    title: "Problem Solving, Multi-Select & Numeric Entry",
    weightage: "Core Quant • ~16–17 Qs (Algebra, Number Properties, Data Analysis)",
    refresher: "GRE Problem Solving includes standard 5-choice MCQs, Multiple-Answer ('Select all that apply' — zero partial credit), and exact Numeric Entry boxes.",
    shortcuts: [
      "For remainders and divisibility (e.g., n not divisible by 3), test n = 1 and n = 2 or write n = 3k ± 1.",
      "In Numeric Entry, convert fractions or radicals cleanly to exact decimals when prompted."
    ],
    drills: window.GRE_OFFICIAL_BANK.quant.filter(q => !q.subtype.includes("Quantitative Comparison")).map(q => ({
      id: q.id, question: q.stem, options: q.options, answer: q.correct[0], explanation: q.explanation
    }))
  }
];
// Exhaustive GRE General Chapter Refresher, Concepts, Traps & Practice Drills (Eliminates UNDEFINED & 0 Drills)
window.IPM_REFRESHERS = window.IPM_REFRESHERS || {};
window.IPM_REFRESHERS["GRE-MOD-QC"] = {
  title: "Quantitative Comparison (QC) — ETS 165–170 Mastery Guide",
  summary: "Quantitative Comparison comprises ~40% of GRE Quant (10–11 of 27 questions). Rather than computing exact values, compare Quantity A and Quantity B via algebraic cancellation and boundary-value testing (FROZEN: Fractions, Roots, One, Zero, Extremes, Negatives).",
  keyFormulas: [
    "Allowed Operations: Add/subtract any expression to both quantities; multiply/divide both by a strictly POSITIVE constant.",
    "Forbidden Operations: Multiplying/dividing by a variable whose sign is unknown, or squaring when quantities can be negative.",
    "Choice (D) Rule: If two valid substitutions yield different comparison directions (e.g., A > B once and A < B once), the answer is immediately (D)."
  ],
  workedExample: "Compare x^2 vs. x^3 given x != 0. Test x = 2 -> 4 < 8 (B). Test x = -2 -> 4 > -8 (A). Different outcomes -> (D)."
};
window.IPM_REFRESHERS["GRE-MOD-PS"] = {
  title: "GRE Problem Solving, Multi-Select & Numeric Entry — Complete Blueprint",
  summary: "Covers standard 5-option MCQs, 'Select all that apply' (zero partial credit), and exact Numeric Entry boxes across Algebra, Number Properties, Coordinate Geometry, Combinatorics, and Data Analysis (Normal Distribution & Quartiles).",
  keyFormulas: [
    "Normal Distribution 68-95-99.7 Rule: ~34% between mean and +1 SD; ~13.5% between +1 SD and +2 SD; ~2.5% above +2 SD.",
    "Remainder Identity: If n is not divisible by 3, n = 3k ± 1 => n^2 ≡ 1 (mod 3).",
    "Quadratic Vieta's Formulas: Sum of roots = -b/a; Product of roots = c/a."
  ],
  workedExample: "If 3^(2x - 1) + 3^(2x) = 324, factor out 3^(2x - 1) * (1 + 3) = 324 => 3^(2x - 1) = 81 = 3^4 => 2x - 1 = 4 => x = 2.5."
};

window.IPM_QUANT_CORE = [
  {
    id: "GRE-MOD-QC",
    pillar: "ETS QUANTITATIVE COMPARISON",
    title: "Quantitative Comparison (Quantity A vs. Quantity B)",
    weightage: "High Yield • 10–11 Qs across 2 Adaptive Sections",
    concepts: [
      {
        heading: "The FROZEN Boundary-Testing Protocol",
        formula: "Test: Fractions (1/2), Roots (√2), One (1), Zero (0), Extremes (100), Negatives (-2)",
        derivation: "ETS designs QC traps where positive integers satisfy Quantity A > Quantity B, while negative numbers or fractions in (0, 1) reverse the inequality.",
        shortcut: "Always test x = 1/2 and x = -2 whenever variables lack explicit domain restrictions."
      },
      {
        heading: "Standard Deviation Invariance Under Shifts & Reflections",
        formula: "SD(X + c) = SD(X)  |  SD(-X) = SD(X)  |  SD(kX) = |k| * SD(X)",
        derivation: "Adding a constant translates all points equally without altering spread; multiplying by -1 reflects points across 0 without altering pairwise distances.",
        shortcut: "Never compute explicit square roots when comparing standard deviations of shifted or negated datasets."
      }
    ],
    traps: [
      {
        title: "Assuming Geometric Figures Are Drawn to Scale",
        wrongStep: "Visually judging an acute angle or side length from a GRE diagram.",
        correction: "Stretch or compress unmarked angles/sides to extreme limits while obeying given constraints.",
        penalty: "Lost 170 Quant Ceiling"
      }
    ],
    questions: [
      {
        id: "GRE-QC-Q1",
        stem: "x and y are integers such that x^2 + y^2 = 25 and x > y.\n\nQuantity A: x + y\nQuantity B: 5",
        options: ["Quantity A is greater.", "Quantity B is greater.", "The two quantities are equal.", "The relationship cannot be determined from the information given."],
        answer: 3,
        explanation: "(4, 3) gives x + y = 7 > 5, whereas (3, -4) gives x + y = -1 < 5. Choose (D)."
      },
      {
        id: "GRE-QC-Q2",
        stem: "Set S consists of 7 consecutive odd integers with median m > 10.\n\nQuantity A: Standard deviation of S\nQuantity B: Standard deviation of {-x : x in S}",
        options: ["Quantity A is greater.", "Quantity B is greater.", "The two quantities are equal.", "The relationship cannot be determined from the information given."],
        answer: 2,
        explanation: "Negating every element preserves all pairwise distances from the mean, so both standard deviations are equal -> (C)."
      },
      {
        id: "GRE-QC-Q3",
        stem: "0 < x < 1\n\nQuantity A: x^2 + x^3\nQuantity B: x + x^4",
        options: ["Quantity A is greater.", "Quantity B is greater.", "The two quantities are equal.", "The relationship cannot be determined from the information given."],
        answer: 1,
        explanation: "Subtract Quantity A from Quantity B: (x - x^2) - (x^3 - x^4) = x(1 - x) - x^3(1 - x) = x(1 - x)(1 - x^2) > 0 for 0 < x < 1. Thus Quantity B is greater -> (B)."
      }
    ]
  },
  {
    id: "GRE-MOD-PS",
    pillar: "ETS PROBLEM SOLVING & DATA ANALYSIS",
    title: "Algebra, Number Properties, Combinatorics & Normal Distributions",
    weightage: "Core Quant • 16–17 Qs (MCQ, Multi-Select & Numeric Entry)",
    concepts: [
      {
        heading: "Exponential Equation Factoring",
        formula: "a^(x+k) ± a^x = a^x * (a^k ± 1)",
        derivation: "Factor out the smallest power of the common base to collapse sums of exponentials into a single prime-factor product.",
        shortcut: "Factor out 3^(2x - 1) immediately when powers differ by 1."
      },
      {
        heading: "Normal Distribution Percentile Benchmarks",
        formula: "Mean ± 1 SD = 68%  |  Mean ± 2 SD = 95%  |  Above Mean + 1 SD ≈ 16%",
        derivation: "Symmetry around the mean splits the tails cleanly into 34% / 13.5% / 2.5%.",
        shortcut: "A score at +1 SD corresponds to the 84th percentile (50% + 34%)."
      }
    ],
    traps: [
      {
        title: "Partial Credit Fallacy on GRE Multi-Select",
        wrongStep: "Selecting 3 out of 4 true statements on 'Select all that apply'.",
        correction: "ETS awards 0 points unless EVERY true option and NO false option is selected.",
        penalty: "0 Points Awarded"
      }
    ],
    questions: [
      {
        id: "GRE-PS-Q1",
        stem: "If 3^(2x - 1) + 3^(2x) = 324, what is the exact value of x?",
        options: ["2.5", "2.0", "3.0", "3.5"],
        answer: 0,
        explanation: "3^(2x - 1) * (1 + 3) = 324 => 3^(2x - 1) = 81 = 3^4 => 2x - 1 = 4 => x = 2.5."
      },
      {
        id: "GRE-PS-Q2",
        stem: "In a normally distributed dataset with mean 500 and standard deviation 80, approximately what percent of observations lie between 420 and 660?",
        options: ["81.5%", "68.0%", "84.0%", "95.0%"],
        answer: 0,
        explanation: "420 is -1 SD (34% below mean) and 660 is +2 SD (34% + 13.5% = 47.5% above mean). Total = 34% + 47.5% = 81.5%."
      },
      {
        id: "GRE-PS-Q3",
        stem: "How many positive integers less than 100 are divisible by neither 2 nor 3?",
        options: ["33", "32", "34", "17"],
        answer: 0,
        explanation: "From 1 to 99 (99 integers): multiples of 2 = 49, multiples of 3 = 33, multiples of 6 = 16. Divisible by 2 or 3 = 49 + 33 - 16 = 66. Neither = 99 - 66 = 33."
      }
    ]
  }
];
window.IPM_HIGHER_MATH = [];

window.IPM_DEEP_MODULES = [];
window.IPM_HIGHER_MATH = [];
window.IPM_CHAPTER_REFRESHERS = {};
window.IPM_CHAPTER_REFRESHERS["GRE-MOD-QC"] = {
  "overview": "Quantitative Comparison (QC) comprises ~40% of ETS GRE Quant (10–11 questions out of 27 across two section-adaptive stages). Rather than solving for exact numeric outputs, compare Quantity A and Quantity B via symmetric algebraic cancellation and systematic FROZEN boundary testing (Fractions in (0,1), Roots, One, Zero, Extremes, Negatives). Whenever two valid test cases reverse which quantity is larger, Choice (D) is guaranteed.",
  "prerequisites": [
    "Allowed Operations: Add or subtract any expression on both sides; multiply or divide both sides by strictly POSITIVE constants.",
    "Forbidden Operations: Never multiply/divide by a variable of unknown sign or square both quantities when either can be negative.",
    "Choice (D) Trigger: Finding one valid substitution where A > B and another where A < B immediately proves (D).",
    "Diagram Non-Scale Rule: ETS geometry diagrams are NOT drawn to scale unless explicitly noted; stretch unmarked angles/lengths to extremes."
  ],
  "corePrinciples": [
    "FROZEN Substitution Law: Systematically test x = 1/2, x = -2, x = 0, x = 1, and x = 100 whenever variables lack domain bounds.",
    "Polynomial Comparison Law: Subtract Quantity A from Quantity B and factor to inspect sign behavior over the given interval.",
    "Standard Deviation Shift/Reflection Law: SD(X + c) = SD(X) and SD(-X) = SD(X); multiplying by k scales SD by |k|."
  ],
  "workedExamples": [
    {
      "level": "Foundation",
      "problem": "Given x > 0, compare Quantity A: (x + 2)^2 vs. Quantity B: x^2 + 4.",
      "steps": [
        "Expand Quantity A = x^2 + 4x + 4.",
        "Subtract (x^2 + 4) from both quantities -> Compare 4x vs. 0.",
        "Since x > 0, 4x > 0 => Quantity A is greater (Choice A)."
      ]
    },
    {
      "level": "CAT 95%ile",
      "problem": "Given 0 < x < 1, compare Quantity A: x^2 + x^3 vs. Quantity B: x + x^4.",
      "steps": [
        "Compute Quantity B - Quantity A = (x - x^2) - (x^3 - x^4) = x(1 - x)(1 - x^2).",
        "For 0 < x < 1, x > 0, (1 - x) > 0, and (1 - x^2) > 0 => Quantity B is greater (Choice B)."
      ]
    },
    {
      "level": "CAT 99.5%ile",
      "problem": "x and y are integers with x^2 + y^2 = 25 and x > y. Compare Quantity A: x + y vs. Quantity B: 5.",
      "steps": [
        "Test (4, 3): x + y = 7 (> 5). Test (3, -4): x + y = -1 (< 5).",
        "Opposite comparison directions occur => Relationship cannot be determined (Choice D)."
      ]
    }
  ]
};
window.IPM_CHAPTER_REFRESHERS["GRE-MOD-ALG"] = {
  "overview": "ETS GRE Algebra tests exponential equation factoring, quadratic roots, linear systems, absolute value inequalities, and coordinate-plane slopes/intercepts across 5-choice MCQs, Multi-Select ('Select all that apply'), and exact Numeric Entry boxes.",
  "prerequisites": [
    "Exponent Identities: a^(m+n) = a^m * a^n; (a^m)^n = a^(mn); a^(-n) = 1/a^n.",
    "Line Slope & Intercepts: Slope m = (y_2 - y_1)/(x_2 - x_1); perpendicular lines satisfy m_1 * m_2 = -1.",
    "Quadratic Formula & Vieta: Sum of roots = -b/a; Product of roots = c/a."
  ],
  "corePrinciples": [
    "Lowest-Power Exponential Factoring Law: Factor out a^x from a^(x+k) ± a^x to isolate prime-power constants.",
    "Zero-Partial-Credit Multi-Select Law: Evaluate each answer choice independently as True/False on 'Select all that apply' questions."
  ],
  "workedExamples": [
    {
      "level": "Foundation",
      "problem": "[Numeric Entry] Solve for exact x: 3^(2x - 1) + 3^(2x) = 324.",
      "steps": [
        "Factor out 3^(2x - 1) * (1 + 3) = 324 => 3^(2x - 1) = 81 = 3^4 => 2x - 1 = 4 => x = 2.5."
      ]
    },
    {
      "level": "CAT 99.5%ile",
      "problem": "Line L passes through (2, -3) and is perpendicular to 3x - 4y = 12. Find the x-intercept of Line L.",
      "steps": [
        "Slope of 3x - 4y = 12 is 3/4 => perpendicular slope m = -4/3.",
        "Equation of L: y + 3 = (-4/3)(x - 2). Set y = 0 => 3 = (-4/3)(x - 2) => x - 2 = -9/4 => x = -0.25."
      ]
    }
  ]
};
window.IPM_CHAPTER_REFRESHERS["GRE-MOD-NUM"] = {
  "overview": "High-scoring GRE Quant sections heavily test prime factorization, divisor counts, remainder arithmetic, and inclusion-exclusion counting principles.",
  "prerequisites": [
    "Divisor Count Formula: N = p^a * q^b has (a + 1)(b + 1) positive factors.",
    "Inclusion-Exclusion: |A U B| = |A| + |B| - |A ∩ B|.",
    "Modular Parity: If n is not divisible by 3, n = 3k ± 1 => n^2 ≡ 1 (mod 3)."
  ],
  "corePrinciples": [
    "Residue Class Substitution Law: For divisibility modulo m, test all possible remainders r in {0, 1, ..., m - 1}.",
    "Complementary Counting Law: Count(At least one) = Total - Count(None)."
  ],
  "workedExamples": [
    {
      "level": "Foundation",
      "problem": "How many positive integers less than 100 are divisible by neither 2 nor 3?",
      "steps": [
        "From 1 to 99 (99 integers): multiples of 2 = 49, multiples of 3 = 33, multiples of 6 = 16.",
        "Divisible by 2 or 3 = 49 + 33 - 16 = 66 => Neither = 99 - 66 = 33."
      ]
    }
  ]
};
window.IPM_CHAPTER_REFRESHERS["GRE-MOD-GEO"] = {
  "overview": "Unlike the GMAT Focus Edition, the ETS GRE General Test continues to test Euclidean geometry: special right triangles (30-60-90 and 45-45-90), inscribed angles, arc lengths, sector areas, and cylinders/rectangular solids.",
  "prerequisites": [
    "Special Right Triangles: 45-45-90 has sides 1 : 1 : sqrt(2); 30-60-90 has sides 1 : sqrt(3) : 2.",
    "Polygon Interior Angle Sum: (n - 2) * 180 degrees.",
    "Circle Arc & Sector: Arc = (theta/360) * 2*pi*r; Sector = (theta/360) * pi*r^2."
  ],
  "corePrinciples": [
    "Triangle Inequality Law: For any triangle with sides a, b, c: |a - b| < c < a + b.",
    "Inscribed Angle Law: An inscribed angle subtending an arc measures half the central angle."
  ],
  "workedExamples": [
    {
      "level": "Foundation",
      "problem": "Two sides of a triangle have lengths 5 and 12. If the third side is an integer x, how many values of x are possible?",
      "steps": [
        "By Triangle Inequality: 12 - 5 < x < 12 + 5 => 7 < x < 17.",
        "Integer values x in {8, 9, 10, 11, 12, 13, 14, 15, 16} => 9 possible triangles."
      ]
    }
  ]
};
window.IPM_CHAPTER_REFRESHERS["GRE-MOD-DATA"] = {
  "overview": "GRE Data Analysis evaluates multi-chart interpretation sets alongside Normal Distribution 68-95-99.7 benchmarks, interquartile range (IQR = Q3 - Q1), and percentile comparisons.",
  "prerequisites": [
    "Normal Distribution Benchmarks: Mean ± 1 SD = 68% (34% each side); Mean ± 2 SD = 95% (47.5% each side).",
    "Interquartile Range: IQR = Q3 - Q1 (middle 50% of data)."
  ],
  "corePrinciples": [
    "Normal Tail Symmetry Law: Values above Mean + 1 SD represent 50% - 34% = 16% of observations.",
    "Percentile-to-SD Conversion Law: 84th percentile ≈ Mean + 1 SD; 97.5th percentile ≈ Mean + 2 SD."
  ],
  "workedExamples": [
    {
      "level": "CAT 95%ile",
      "problem": "In a normal distribution with mean 500 and SD 80, what percentage of values lie between 420 and 660?",
      "steps": [
        "420 = Mean - 1 SD (34% below mean); 660 = Mean + 2 SD (47.5% above mean).",
        "Total = 34% + 47.5% = 81.5%."
      ]
    }
  ]
};
window.IPM_QUANT_CORE = [
  {
    "id": "GRE-MOD-QC",
    "pillar": "ETS QUANTITATIVE COMPARISON • PILLAR 1",
    "title": "Quantitative Comparison (QC): Boundary Testing & Algebraic Cancellation",
    "weightage": "High Yield • 10–11 Qs across 2 Adaptive Sections (130–170 Scale)",
    "concepts": [
      {
        "heading": "FROZEN Substitution Law",
        "formula": "Systematically test x = 1/2, x = -2, x = 0, x = 1, and x = 100 whenever variables lack domain bounds.",
        "derivation": "Allowed Operations: Add or subtract any expression on both sides; multiply or divide both sides by strictly POSITIVE constants.",
        "shortcut": ""
      },
      {
        "heading": "Polynomial Comparison Law",
        "formula": "Subtract Quantity A from Quantity B and factor to inspect sign behavior over the given interval.",
        "derivation": "Forbidden Operations: Never multiply/divide by a variable of unknown sign or square both quantities when either can be negative.",
        "shortcut": ""
      },
      {
        "heading": "Standard Deviation Shift/Reflection Law",
        "formula": "SD(X + c) = SD(X) and SD(-X) = SD(X); multiplying by k scales SD by |k|.",
        "derivation": "Choice (D) Trigger: Finding one valid substitution where A > B and another where A < B immediately proves (D).",
        "shortcut": ""
      }
    ],
    "traps": [
      {
        "title": "ETS GRE Quant Trap in Quantitative Comparison (QC)",
        "wrongStep": "Overlooking boundary cases or zero-partial-credit rules.",
        "correction": "Allowed Operations: Add or subtract any expression on both sides; multiply or divide both sides by strictly POSITIVE constants.",
        "penalty": "Lost 170 Ceiling"
      }
    ],
    "questions": [
      {
        "id": "GRE-QR-QC-001",
        "stem": "x, y integers with x^2 + y^2 = 25 and x > y.\n\nQuantity A: x + y\nQuantity B: 5",
        "options": [
          "Quantity A is greater.",
          "Quantity B is greater.",
          "The two quantities are equal.",
          "The relationship cannot be determined from the information given."
        ],
        "answer": 3,
        "explanation": "(4,3)->7 > 5 and (3,-4)->-1 < 5 => (D)."
      },
      {
        "id": "GRE-QR-QC-002",
        "stem": "Set S: 7 consecutive odd integers with median m > 10.\n\nQuantity A: SD of S\nQuantity B: SD of -S",
        "options": [
          "Quantity A is greater.",
          "Quantity B is greater.",
          "The two quantities are equal.",
          "The relationship cannot be determined from the information given."
        ],
        "answer": 2,
        "explanation": "Reflection preserves spread => (C)."
      },
      {
        "id": "GRE-QR-QC-003",
        "stem": "0 < x < 1\n\nQuantity A: x^2 + x^3\nQuantity B: x + x^4",
        "options": [
          "Quantity A is greater.",
          "Quantity B is greater.",
          "The two quantities are equal.",
          "The relationship cannot be determined from the information given."
        ],
        "answer": 1,
        "explanation": "B - A = x(1 - x)(1 - x^2) > 0 => (B)."
      }
    ]
  },
  {
    "id": "GRE-MOD-ALG",
    "pillar": "ETS QUANTITATIVE REASONING • PILLAR 2",
    "title": "Algebra, Exponents, Inequalities & Functions (PS & Numeric Entry)",
    "weightage": "Core Quant • ~5–6 Qs across 2 Adaptive Sections",
    "concepts": [
      {
        "heading": "Lowest-Power Exponential Factoring Law",
        "formula": "Factor out a^x from a^(x+k) ± a^x to isolate prime-power constants.",
        "derivation": "Exponent Identities: a^(m+n) = a^m * a^n; (a^m)^n = a^(mn); a^(-n) = 1/a^n.",
        "shortcut": ""
      },
      {
        "heading": "Zero-Partial-Credit Multi-Select Law",
        "formula": "Evaluate each answer choice independently as True/False on 'Select all that apply' questions.",
        "derivation": "Line Slope & Intercepts: Slope m = (y_2 - y_1)/(x_2 - x_1); perpendicular lines satisfy m_1 * m_2 = -1.",
        "shortcut": ""
      }
    ],
    "traps": [
      {
        "title": "ETS GRE Quant Trap in Algebra, Exponents, Inequalities & Functions (PS & Numeric Entry)",
        "wrongStep": "Overlooking boundary cases or zero-partial-credit rules.",
        "correction": "Exponent Identities: a^(m+n) = a^m * a^n; (a^m)^n = a^(mn); a^(-n) = 1/a^n.",
        "penalty": "Lost 170 Ceiling"
      }
    ],
    "questions": [
      {
        "id": "GRE-QR-PS-001",
        "stem": "[Numeric Entry] If 3^(2x - 1) + 3^(2x) = 324, what is the exact decimal value of x?",
        "options": [
          "2.5",
          "2.0",
          "3.0",
          "3.5"
        ],
        "answer": 0,
        "explanation": "3^(2x - 1)*4 = 324 => 2x - 1 = 4 => x = 2.5."
      }
    ]
  },
  {
    "id": "GRE-MOD-NUM",
    "pillar": "ETS QUANTITATIVE REASONING • PILLAR 3",
    "title": "Number Properties, Divisibility, Remainders & Counting",
    "weightage": "165–170 Differentiator • ~4–5 Qs per Test",
    "concepts": [
      {
        "heading": "Residue Class Substitution Law",
        "formula": "For divisibility modulo m, test all possible remainders r in {0, 1, ..., m - 1}.",
        "derivation": "Divisor Count Formula: N = p^a * q^b has (a + 1)(b + 1) positive factors.",
        "shortcut": ""
      },
      {
        "heading": "Complementary Counting Law",
        "formula": "Count(At least one) = Total - Count(None).",
        "derivation": "Inclusion-Exclusion: |A U B| = |A| + |B| - |A ∩ B|.",
        "shortcut": ""
      }
    ],
    "traps": [
      {
        "title": "ETS GRE Quant Trap in Number Properties, Divisibility, Remainders & Counting",
        "wrongStep": "Overlooking boundary cases or zero-partial-credit rules.",
        "correction": "Divisor Count Formula: N = p^a * q^b has (a + 1)(b + 1) positive factors.",
        "penalty": "Lost 170 Ceiling"
      }
    ],
    "questions": [
      {
        "id": "GRE-QR-NUM-001",
        "stem": "How many positive integers less than 100 are divisible by neither 2 nor 3?",
        "options": [
          "32",
          "33",
          "34",
          "35",
          "36"
        ],
        "answer": 1,
        "explanation": "99 - (49 + 33 - 16) = 33."
      }
    ]
  },
  {
    "id": "GRE-MOD-GEO",
    "pillar": "ETS QUANTITATIVE REASONING • PILLAR 4",
    "title": "Geometry: Triangles, Circles, Polygons & 3D Solids",
    "weightage": "Core Quant • ~3–4 Qs per Test (Unlike GMAT Focus, GRE Retains Geometry)",
    "concepts": [
      {
        "heading": "Triangle Inequality Law",
        "formula": "For any triangle with sides a, b, c: |a - b| < c < a + b.",
        "derivation": "Special Right Triangles: 45-45-90 has sides 1 : 1 : sqrt(2); 30-60-90 has sides 1 : sqrt(3) : 2.",
        "shortcut": ""
      },
      {
        "heading": "Inscribed Angle Law",
        "formula": "An inscribed angle subtending an arc measures half the central angle.",
        "derivation": "Polygon Interior Angle Sum: (n - 2) * 180 degrees.",
        "shortcut": ""
      }
    ],
    "traps": [
      {
        "title": "ETS GRE Quant Trap in Geometry",
        "wrongStep": "Overlooking boundary cases or zero-partial-credit rules.",
        "correction": "Special Right Triangles: 45-45-90 has sides 1 : 1 : sqrt(2); 30-60-90 has sides 1 : sqrt(3) : 2.",
        "penalty": "Lost 170 Ceiling"
      }
    ],
    "questions": [
      {
        "id": "GRE-QR-GEO-001",
        "stem": "Two sides of a triangle are 5 and 12. How many integer values are possible for the third side?",
        "options": [
          "7",
          "8",
          "9",
          "10",
          "11"
        ],
        "answer": 2,
        "explanation": "7 < x < 17 => 9 integers."
      }
    ]
  },
  {
    "id": "GRE-MOD-DATA",
    "pillar": "ETS QUANTITATIVE REASONING • PILLAR 5",
    "title": "Data Analysis: Normal Distributions, Quartiles, Boxplots & Percentiles",
    "weightage": "High Yield • ~4–5 Qs per Test (Includes Data Interpretation Set)",
    "concepts": [
      {
        "heading": "Normal Tail Symmetry Law",
        "formula": "Values above Mean + 1 SD represent 50% - 34% = 16% of observations.",
        "derivation": "Normal Distribution Benchmarks: Mean ± 1 SD = 68% (34% each side); Mean ± 2 SD = 95% (47.5% each side).",
        "shortcut": ""
      },
      {
        "heading": "Percentile-to-SD Conversion Law",
        "formula": "84th percentile ≈ Mean + 1 SD; 97.5th percentile ≈ Mean + 2 SD.",
        "derivation": "Interquartile Range: IQR = Q3 - Q1 (middle 50% of data).",
        "shortcut": ""
      }
    ],
    "traps": [
      {
        "title": "ETS GRE Quant Trap in Data Analysis",
        "wrongStep": "Overlooking boundary cases or zero-partial-credit rules.",
        "correction": "Normal Distribution Benchmarks: Mean ± 1 SD = 68% (34% each side); Mean ± 2 SD = 95% (47.5% each side).",
        "penalty": "Lost 170 Ceiling"
      }
    ],
    "questions": [
      {
        "id": "GRE-QR-PS-002",
        "stem": "Normal distribution mean 500, SD 80. Percent between 420 and 660?",
        "options": [
          "68.0%",
          "81.5%",
          "84.0%",
          "95.0%",
          "97.5%"
        ],
        "answer": 1,
        "explanation": "34% + 47.5% = 81.5%."
      }
    ]
  }
];

(function enrichGreOverviews() {
  const R = window.IPM_CHAPTER_REFRESHERS || {};
  const specs = {
    "GRE-MOD-QC": {
      p2: "Concept Bridge: Most test-takers lose 170-level points on Quantitative Comparison by plugging in only positive integers like x = 2 or x = 3. ETS specifically constructs QC items where positive integers make Quantity A > Quantity B, while fractions in (0, 1), zero, or negative numbers reverse the relationship—making Choice (D) the true answer.",
      metrics: { weightage: "10–11 Qs / 27 (~40% Quant)", targetPace: "1.3 – 1.5 mins / Q", format: "4-Choice QC (A / B / C / D)", strategy: "FROZEN Boundary Testing" },
      traps: [
        { pitfall: "Testing Only Positive Integers", bridge: "Always test x = 1/2, x = 0, x = -2, and x = 100 before committing to A, B, or C." },
        { pitfall: "Trusting Visual Proportions in ETS Figures", bridge: "Unmarked angles and segments are not drawn to scale; stretch figures to extreme valid limits." }
      ]
    },
    "GRE-MOD-ALG": {
      p2: "Concept Bridge: GRE Problem Solving combines classic 5-choice MCQs with Multiple-Answer ('Select all that apply' — zero partial credit) and exact Numeric Entry boxes. Factor out common exponential powers and check every candidate choice independently on multi-select items.",
      metrics: { weightage: "5–6 Qs / 27 (~20% Quant)", targetPace: "1.6 – 1.9 mins / Q", format: "MCQ, Multi-Select & Numeric Entry", strategy: "Common-Base Factoring" },
      traps: [
        { pitfall: "Missing One True Choice on Multi-Select", bridge: "ETS awards zero partial credit; verify all 5–6 statements individually." },
        { pitfall: "Sign Errors on Perpendicular Line Slopes", bridge: "Perpendicular lines satisfy m_1 * m_2 = -1 (negative reciprocal)." }
      ]
    },
    "GRE-MOD-NUM": {
      p2: "Concept Bridge: High-scoring Stage 2 Hard GRE Quant sections test remainder cycles, divisor counts, and inclusion-exclusion sets. Always check boundary inclusivity ('between 1 and 100 inclusive' vs. 'less than 100').",
      metrics: { weightage: "4–5 Qs / 27 (~17% Quant)", targetPace: "1.6 mins / Q", format: "QC, PS & Numeric Entry", strategy: "Residue Classes & Divisors" },
      traps: [
        { pitfall: "Inclusive vs Exclusive Endpoint Counting", bridge: "'Less than 100' positive integers means 1 to 99 (99 numbers), not 100." },
        { pitfall: "Forgetting 1 Is Neither Prime Nor Composite", bridge: "The smallest prime number is 2 (the only even prime)." }
      ]
    },
    "GRE-MOD-GEO": {
      p2: "Concept Bridge: Unlike GMAT Focus, the ETS GRE retains Euclidean geometry—triangles, circles, polygons, and 3D solids. Memorize 30-60-90 and 45-45-90 special right-triangle ratios and central-vs-inscribed arc rules to solve geometry items without trigonometry.",
      metrics: { weightage: "3–4 Qs / 27 (~14% Quant)", targetPace: "1.7 mins / Q", format: "QC & Problem Solving", strategy: "Special Triangles & Arc Ratios" },
      traps: [
        { pitfall: "Assuming a Triangle Is Right-Angled", bridge: "Never assume a 90-degree angle unless marked with a right-angle box or proven via side lengths." },
        { pitfall: "Violating the Triangle Inequality", bridge: "Third side c must strictly satisfy |a - b| < c < a + b." }
      ]
    },
    "GRE-MOD-DATA": {
      p2: "Concept Bridge: GRE Data Analysis includes a dedicated multi-question Data Interpretation chart set plus standalone Normal Distribution and Quartile/Boxplot questions. Anchor 68% (±1 SD) and 95% (±2 SD) to compute tail percentages in seconds.",
      metrics: { weightage: "4–5 Qs / 27 (~17% Quant)", targetPace: "1.8 mins / Q", format: "DI Chart Set + Normal Curve", strategy: "68-95-99.7 Tail Symmetry" },
      traps: [
        { pitfall: "Confusing Percent Change with Percentage-Point Change", bridge: "Moving from 20% to 25% is a +5 percentage-point increase, but a +25% relative increase." },
        { pitfall: "Assuming Equal Counts in Boxplot Whiskers", bridge: "Each quartile segment holds 25% of observations regardless of visual whisker length." }
      ]
    }
  };
  for (const [id, cfg] of Object.entries(specs)) {
    if (R[id]) {
      R[id].overviewParagraphs = [R[id].overview, cfg.p2];
      R[id].examMetrics = cfg.metrics;
      R[id].conceptBridgeTraps = cfg.traps;
    }
  }
})();