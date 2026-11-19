window.IPM_CHAPTER_REFRESHERS = {
  qc_01: {
    overview: "Percentages form the backbone of Commercial Arithmetic and Data Interpretation across all 8 IIMs. Rather than treating percentages as isolated formulas, view every percentage as a multiplicative scaling factor on a clearly defined base.",
    prerequisites: ["Fraction-to-percentage table (1/2 = 50% down to 1/16 = 6.25%)", "Distinction between Cost Price (CP), Marked Price (MP), and Selling Price (SP)"],
    corePrinciples: [
      "Base Integrity: A 25% increase multiplies a quantity by 5/4 (1.25). Returning to the original value requires multiplying by the reciprocal 4/5 (0.80), which is a 20% decrease—never 25%.",
      "Markup & Discount Chain: Retailers first mark up CP by m% to reach MP = CP(1 + m/100), then apply discount d% on MP to reach SP = MP(1 - d/100).",
      "Faulty Weight Accounting: Profit is strictly (True Money Collected - Actual Cost Incurred) / Actual Cost Incurred. If a seller delivers 900g while charging for 1000g, their cost is only for 900g."
    ],
    workedExample: {
      problem: "A trader marks up goods by 50% and offers a 20% discount, but uses an 800g weight instead of 1kg. Find his exact profit percentage.",
      steps: [
        "Assume true cost price = Rs. 1 per gram. For 800g actually delivered, Actual CP = Rs. 800.",
        "Marked Price for 1000g = 1000 * 1.50 = Rs. 1,500.",
        "Selling Price after 20% discount = 1500 * 0.80 = Rs. 1,200.",
        "Net Profit % = [(1200 - 800) / 800] * 100 = (400 / 800) * 100 = 50%."
      ]
    }
  },
  qc_02: {
    overview: "Ratios express relative magnitude without units, while Alligation is a weighted-average visual technique used whenever two groups of different concentrations, prices, or speeds are blended.",
    prerequisites: ["Properties of proportion (Componendo-Dividendo)", "Weighted mean definition: W_avg = (n1*x1 + n2*x2) / (n1 + n2)"],
    corePrinciples: [
      "Common Multiplier Rule: If A : B = 3 : 4, set A = 3k and B = 4k. Never add or subtract raw ratio numbers directly with actual quantities.",
      "Alligation Cross-Rule: Place cheaper value (C) on top-left, dearer value (D) on bottom-left, and mixture mean (M) in the center. The ratio of quantities is strictly (D - M) : (M - C).",
      "Replacement Dilution: Removing V liters from a total volume T and replacing with pure water scales the original solute concentration by (1 - V/T) in every step."
    ],
    workedExample: {
      problem: "In what ratio must Rs. 42/kg tea be mixed with Rs. 60/kg tea so that selling the mixture at Rs. 55/kg yields a 10% profit?",
      steps: [
        "First convert Selling Price (Rs. 55) to Mixture Cost Price (M): M = 55 / 1.10 = Rs. 50/kg.",
        "Apply Alligation between C = 42, D = 60, and M = 50.",
        "Quantity of Rs. 42 tea : Quantity of Rs. 60 tea = (60 - 50) : (50 - 42) = 10 : 8 = 5 : 4."
      ]
    }
  },
  qc_03: {
    overview: "Time-Speed-Distance (TSD) and Time & Work are governed by the single inverse-proportionality law: Product = Rate * Time. Holding any one variable constant locks the other two into direct or inverse ratios.",
    prerequisites: ["Unit conversions: 1 km/h = 5/18 m/s", "LCM method for Time & Work efficiency"],
    corePrinciples: [
      "Constant Distance Inverse Law: When two journeys cover the exact same distance, the ratio of times taken is the exact reciprocal of their speeds (T1 : T2 = S2 : S1).",
      "Relative Speed: Objects moving in opposite directions close distance at (S1 + S2); objects moving in the same direction close distance at |S1 - S2|.",
      "LCM Work Efficiency: Assign Total Work = LCM of individual days so daily work rates become clean integers without fractions."
    ],
    workedExample: {
      problem: "A and B can complete a project in 12 days and 18 days respectively. They work together for 4 days, after which A leaves. How many days does B take to finish the rest?",
      steps: [
        "Set Total Work = LCM(12, 18) = 36 units.",
        "Daily efficiency: A = 36/12 = 3 units/day; B = 36/18 = 2 units/day.",
        "Work done together in 4 days = 4 * (3 + 2) = 20 units. Remaining work = 36 - 20 = 16 units.",
        "Time for B alone = 16 / 2 = 8 days."
      ]
    }
  },
  qc_04: {
    overview: "Number Systems and Geometry test structural reasoning rather than heavy computation—appearing heavily in GRE General Short-Answer (SA) questions and OMETs.",
    prerequisites: ["Prime factorization & divisor counting", "Euclidean triangle similarity, Pythagoras & circle tangent-chord theorems"],
    corePrinciples: [
      "Number of Factors: If N = p^a * q^b * r^c, total positive factors = (a + 1)(b + 1)(c + 1).",
      "Modular Remainder Preservation: Remainder of (A * B) mod d equals [(A mod d) * (B mod d)] mod d, allowing large powers to be reduced step-by-step.",
      "Area Scaling in Similar Triangles: If two triangles are similar with side ratio k, their areas scale by k^2."
    ],
    workedExample: {
      problem: "Find the total number of positive factors of 360.",
      steps: [
        "Prime factorize 360 = 36 * 10 = (2^2 * 3^2) * (2 * 5) = 2^3 * 3^2 * 5^1.",
        "Add 1 to each exponent and multiply: (3 + 1) * (2 + 1) * (1 + 1) = 4 * 3 * 2 = 24 factors."
      ]
    }
  },
  hm_01: {
    overview: "Logarithms and Sequences form the core bridge between Class 10 algebra and Class 11–12 Higher Mathematics—critical for GRE General, IIM Ranchi, and IIM Bangalore B.Sc. Economics/Data Science.",
    prerequisites: ["Laws of exponents (a^m * a^n = a^(m+n))", "Arithmetic & Geometric Progression nth term and sum formulas"],
    corePrinciples: [
      "Logarithm Definition: log_b(x) = y is equivalent to b^y = x, valid strictly when x > 0, b > 0, and b != 1.",
      "Base Change & Product Collapse: log_b(a) = ln(a)/ln(b), so telescoping chains like log_2(3) * log_3(4) * log_4(8) simplify immediately to log_2(8) = 3.",
      "Infinite GP Convergence: When common ratio |r| < 1, S_infinity = a / (1 - r)."
    ],
    workedExample: {
      problem: "Solve for x: log_2(x - 1) + log_2(x + 1) = 3.",
      steps: [
        "Combine logs using product rule: log_2[(x - 1)(x + 1)] = 3 => x^2 - 1 = 2^3 = 8.",
        "Solve quadratic: x^2 = 9 => x = 3 or x = -3.",
        "Check domain (x - 1 > 0 => x > 1): Reject x = -3. Valid solution: x = 3."
      ]
    }
  },
  hm_02: {
    overview: "Permutations, Combinations, and Probability measure structured counting and uncertainty—forming 35–40% of IIM Bangalore's B.Sc. Data Science/Economics quantitative syllabus.",
    prerequisites: ["Factorial notation (n!)", "Fundamental Counting Principle (AND = multiply, OR = add)"],
    corePrinciples: [
      "Selection vs Arrangement: Choose r items first using C(n, r), then arrange them by multiplying by r! to get P(n, r).",
      "Complementary Counting ('At Least One'): P(at least one) = 1 - P(none), avoiding tedious multi-case addition.",
      "Conditional Probability: P(A | B) = P(A ∩ B) / P(B) shrinks the sample space strictly to event B."
    ],
    workedExample: {
      problem: "A committee of 3 is formed from 4 men and 3 women. What is the probability that it includes at least 1 woman?",
      steps: [
        "Total committees possible = C(7, 3) = (7 * 6 * 5) / 6 = 35.",
        "Committees with ZERO women (all 3 men) = C(4, 3) = 4.",
        "Probability(at least 1 woman) = 1 - (4 / 35) = 31 / 35."
      ]
    }
  },
  hm_03: {
    overview: "Matrices, Determinants, and Differential Calculus connect Class 12 NCERT Mathematics directly to IIM Indore QA and IIM Bangalore quantitative economics.",
    prerequisites: ["Class 12 Matrix multiplication & determinant expansion", "Basic polynomial differentiation d(x^n)/dx = n*x^(n-1)"],
    corePrinciples: [
      "Determinant Scaling: Scaling an n x n matrix A by constant k multiplies every row by k, yielding det(kA) = k^n * det(A).",
      "Invertibility Condition: A square matrix A is invertible if and only if det(A) != 0 (non-singular).",
      "Marginal Optimization in Economics: Total Revenue TR = Price * Quantity; Maximum revenue or profit occurs where first derivative = 0 and second derivative < 0."
    ],
    workedExample: {
      problem: "A firm's profit function is P(x) = -2x^2 + 40x - 120, where x is output in thousands. Find the output x that maximizes profit.",
      steps: [
        "Differentiate P(x) with respect to x: P'(x) = -4x + 40.",
        "Set P'(x) = 0 => -4x + 40 = 0 => x = 10 (thousand units).",
        "Verify maximum: P''(x) = -4 < 0, confirming a global maximum at x = 10."
      ]
    }
  },
  dilr_01: {
    overview: "Data Interpretation in GRE General (embedded inside QA-SA and QA-MCQ) and OMETs tests speed-reading of tables, multi-year growth rates, and set-theory caselets.",
    prerequisites: ["Percentage-to-fraction conversion", "Two-set & three-set Venn diagram inclusion-exclusion formulas"],
    corePrinciples: [
      "Scan Before Calculating: Read table footnotes, units (crores vs lakhs), and row/column totals before touching a single question.",
      "Inclusion-Exclusion Law: n(A ∪ B) = n(A) + n(B) - n(A ∩ B). Always subtract overlap once so shared elements aren't double-counted.",
      "Zero-Penalty SA DI Priority: In GRE General, if a 4-question DI table appears in Section 1 (SA), solve every question since wrong answers incur 0 penalty."
    ],
    workedExample: {
      problem: "In a batch of 200 students, 130 opted for Finance, 110 opted for Marketing, and 20 opted for neither. How many opted for ONLY Finance?",
      steps: [
        "Students opting for at least one specialization = 200 - 20 = 180.",
        "Students opting for BOTH = 130 + 110 - 180 = 60.",
        "Students opting for ONLY Finance = 130 - 60 = 70."
      ]
    }
  },
  dilr_02: {
    overview: "Logical Reasoning forms one-third of GRE General Rohtak (40 questions) and OMETs (33 questions), testing structured constraint satisfaction and formal syllogistic deduction.",
    prerequisites: ["Standard directional compass (N, S, E, W)", "Venn diagram representation of All, Some, No, and Some Not"],
    corePrinciples: [
      "Anchor Definite Clues First: In linear/circular seating, place fixed positions ('A sits at an extreme end' or 'B sits opposite C') before relative clues.",
      "Syllogism Validity Rule: A 'Definitely True' conclusion must hold in 100% of possible Venn diagrams; a 'Possibility' conclusion needs just 1 valid diagram.",
      "Coding-Decoding Positions: Memorize EJOTY (5, 10, 15, 20, 25) and opposite letter pairs (A-Z, B-Y, M-N sum to 27)."
    ],
    workedExample: {
      problem: "In a certain code, 'INDORE' is written as 'JOEPSF'. How is 'ROHTAK' written in that code?",
      steps: [
        "Compare each letter position: I(+1)->J, N(+1)->O, D(+1)->E, O(+1)->P, R(+1)->S, E(+1)->F.",
        "Rule: Every letter shifts forward by +1.",
        "Apply +1 to ROHTAK: R->S, O->P, H->I, T->U, A->B, K->L => 'SPIUBL'."
      ]
    }
  },
  varc_01: {
    overview: "Reading Comprehension accounts for 35–40% of Verbal marks in GRE General, Rohtak, OMETs, and IIM Bangalore UG, emphasizing conceptual synthesis over literal keyword hunting.",
    prerequisites: ["Active paragraph-mapping habit", "Distinguishing author's voice from cited counter-arguments"],
    corePrinciples: [
      "Structural Signposts: Words like 'However', 'Yet', 'Notwithstanding', and 'Paradoxically' almost always introduce the author's main thesis.",
      "Scope & Tone Filter: Eliminate options that are too broad, too narrow, emotionally extreme, or factually true outside the passage.",
      "Inference Discipline: An inference must be 100% logically entailed by the text—never a speculative leap."
    ],
    workedExample: {
      problem: "Passage excerpt: 'While automation displaces routine clerical tasks, historical industrial transitions show it simultaneously creates higher-value analytical roles—provided educational institutions adapt curricula rapidly.' What is the author's primary claim?",
      steps: [
        "Identify the conditional contrast ('While... simultaneously... provided').",
        "The author argues automation's net labor benefit depends on timely educational adaptation.",
        "Any option claiming automation 'unconditionally eliminates all jobs' is eliminated as an extreme distortion."
      ]
    }
  },
  varc_02: {
    overview: "Vocabulary and Double/Triple Fill-in-the-Blanks saw a major surge in GRE General 2025–2026, testing contextual precision, word polarity, and commonly confused pairs.",
    prerequisites: ["Common Greek/Latin roots (mal-, bene-, circum-, anti-, pan-)", "Fixed prepositional collocations"],
    corePrinciples: [
      "Conjunction Polarity Check: 'Although / Despite / Albeit' require opposite tones across blanks; 'Moreover / Consequently / Similarly' require matching tones.",
      "Second-Blank Anchor: In double/triple fillers, test the blank with the strongest grammatical or prepositional constraint first to eliminate 3 options rapidly.",
      "Confusable Precision: Distinguish spelling and usage pairs (affect/effect, elicit/illicit, appraise/apprise, discreet/discrete)."
    ],
    workedExample: {
      problem: "Select the right pair: 'The committee remained _______ regarding the merger, refusing to _______ its final decision until the audit concluded.' (equivocal / divulge)",
      steps: [
        "First blank describes refusing to commit -> 'equivocal' (ambiguous/non-committal).",
        "Second blank describes revealing a decision -> 'divulge' (disclose confidential info).",
        "Verify full sentence coherence and tone."
      ]
    }
  },
  varc_03: {
    overview: "Grammar (Error Spotting), Para-Jumbles, and Conversation Analysis test syntactic accuracy and logical paragraph flow across all IIM entrance exams.",
    prerequisites: ["Subject-verb agreement rules", "Pronoun-antecedent clarity and modifier placement"],
    corePrinciples: [
      "Neither/Nor & Either/Or Rule: The verb agrees strictly with the noun/pronoun closest to it.",
      "Para-Jumble Opening & Closing: Openings introduce a standalone noun/theme without demonstrative pronouns ('This', 'These', 'Such'); closings summarize with 'Thus', 'Hence', or 'Consequently'.",
      "Conversation Analysis: Identify the hidden assumption bridging Speaker A's observation to Speaker B's conclusion."
    ],
    workedExample: {
      problem: "Spot the error: 'Each of the shortlisted candidates (A) / were asked to submit (B) / their academic transcripts (C) / before Friday. (D)'",
      steps: [
        "The grammatical subject is 'Each' (singular), not 'candidates'.",
        "Therefore, Segment (B) 'were asked' must be singular: 'was asked'."
      ]
    }
  }
};
window.IPM_CHAPTER_REFRESHERS.qc_05 = {
  overview: "Quadratic Equations and Inequalities appear across every IIM entrance test—from finding symmetric root expressions in OMETs/Rohtak to polynomial/rational wavy-curve inequalities in GRE General SA and IIM Bangalore.",
  prerequisites: ["Factorization & Quadratic Formula x = [-b ± sqrt(b^2 - 4ac)] / 2a", "Discriminant nature of roots (D > 0 real distinct, D = 0 equal, D < 0 imaginary)"],
  corePrinciples: [
    "Vieta's Identities: Express any symmetric function of roots (α^2 + β^2, α^3 + β^3, 1/α + 1/β) purely in terms of sum (-b/a) and product (c/a).",
    "Sign of Quadratic Expression: For a > 0 and D < 0, ax^2 + bx + c > 0 for ALL real x.",
    "Wavy-Curve Inequality Discipline: Factor numerator and denominator into (x - r) form, exclude denominator zeros, and alternate signs from right to left across odd-multiplicity roots."
  ],
  workedExample: {
    problem: "Find the range of real values of k for which x^2 + kx + 9 > 0 holds for all real x.",
    steps: [
      "Here leading coefficient a = 1 > 0, so the parabola opens upward.",
      "For the expression to remain strictly positive for all real x, it must never touch or cross the x-axis => Discriminant D < 0.",
      "D = k^2 - 4(1)(9) < 0 => k^2 < 36 => -6 < k < 6."
    ]
  }
};

window.IPM_CHAPTER_REFRESHERS.hm_04 = {
  overview: "Statistics and Probability Distributions are heavily weighted in IIM Bangalore's B.Sc. (Hons) Economics & Data Science entrance test and directly prepare students for Semester I-III Business Statistics across all IIMs.",
  prerequisites: ["Arithmetic Mean, Median, Mode definitions", "Variance σ^2 = [Σ(xi - μ)^2] / N = (Σxi^2 / N) - μ^2"],
  corePrinciples: [
    "Origin & Scale Transformation: Adding constant b shifts Mean by +b but leaves SD and Variance unchanged; multiplying by a scales SD by |a| and Variance by a^2.",
    "Coefficient of Variation (CV): CV = (SD / Mean) * 100 measures relative dispersion independent of units.",
    "Standard Normal Z-Score: Z = (X - μ) / σ standardizes any normal variable to mean 0 and variance 1."
  ],
  workedExample: {
    problem: "The mean and SD of 5 numbers are 20 and 4 respectively. If each number is multiplied by 2 and then 3 is added, find the new mean and new SD.",
    steps: [
      "New Mean = 2 * (Old Mean) + 3 = 2(20) + 3 = 43.",
      "New SD = |2| * (Old SD) = 2 * 4 = 8 (adding 3 does not alter spread)."
    ]
  }
};

window.IPM_CHAPTER_REFRESHERS.dilr_03 = {
  overview: "Data Sufficiency (DS) and Input-Output test logical discipline rather than raw calculation—a staple of GRE General Rohtak and OMETs.",
  prerequisites: ["Linear equations solvability rules", "Strict separation of Statement I and Statement II"],
  corePrinciples: [
    "Golden Rule of DS: Evaluate Statement I completely on its own first, forget what you learned, then evaluate Statement II completely on its own.",
    "Unique Answer Requirement: If a statement yields two possible values (e.g., x = +5 or -5 when asked 'What is x?'), it is NOT sufficient.",
    "Yes/No Sufficiency: A guaranteed 'No' is 100% sufficient."
  ],
  workedExample: {
    problem: "Is integer n even? (I) n^2 is divisible by 4. (II) n + 3 is odd.",
    steps: [
      "Test I alone: If n^2 is divisible by 4, since n is an integer, n must be divisible by 2 (even) -> Statement I alone is sufficient.",
      "Test II alone: If n + 3 is odd, since 3 is odd, n must be even -> Statement II alone is sufficient.",
      "Conclusion: Either Statement I alone or Statement II alone is sufficient."
    ]
  }
};
