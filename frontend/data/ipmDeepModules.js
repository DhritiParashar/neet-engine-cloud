window.IPM_DEEP_MODULES = [
  {
    id: "qc_05",
    pillar: "quant_core",
    title: "Quadratic Equations, Roots & Wavy-Curve Inequalities",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "OMETs_BG_JAMMU", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"],
    weightage: "Very High in CAT & IIMB (3-5 Qs)",
    concepts: [
      {
        heading: "Vieta's Root Relations & Symmetric Expressions",
        formula: "α + β = -b/a;   αβ = c/a;   |α - β| = sqrt(b^2 - 4ac) / |a|",
        derivation: "For ax^2 + bx + c = 0 (a != 0), express symmetric expressions (α^2 + β^2, α^3 + β^3, 1/α + 1/β) directly via sum (S) and product (P) without solving for irrational roots.",
        shortcut: "α^2 + β^2 = S^2 - 2P;  α^3 + β^3 = S^3 - 3SP. For reciprocal roots, swap coefficients a and c: cx^2 + bx + a = 0."
      },
      {
        heading: "Wavy-Curve Method for Rational & Polynomial Inequalities",
        formula: "(x - r1)(x - r2)... / (x - p1)... > 0  =>  Alternate signs from right (+, -, +, -)",
        derivation: "Arrange all linear factors in standard (x - r) form with positive x-coefficients. Plot critical points on the number line; flip sign across odd-power roots and retain sign across even-power roots.",
        shortcut: "Never cross-multiply an inequality containing a variable in the denominator unless you know its sign—multiply both sides by (denominator)^2 instead."
      }
    ],
    traps: [
      {
        title: "Cross-Multiplying Variable Denominators in Inequalities",
        wrongStep: "(x - 2)/(x + 3) > 1  =>  x - 2 > x + 3  =>  -2 > 3 (No solution).",
        correction: "Bring 1 to LHS: (x - 2)/(x + 3) - 1 > 0 => -5/(x + 3) > 0 => x + 3 < 0 => x < -3.",
        penalty: "-1 Mark in MCQ / Wrong SA"
      }
    ],
    questions: [
      {
        id: "qc_q6",
        type: "SA_NUMERIC",
        section: "qa_sa",
        prompt: "If α and β are the roots of x^2 - 7x + 10 = 0, find the exact value of α^3 + β^3.",
        answer: "133",
        explanation: "S = α + β = 7, P = αβ = 10. α^3 + β^3 = S^3 - 3SP = 7^3 - 3(7)(10) = 343 - 210 = 133."
      },
      {
        id: "qc_q7",
        type: "MCQ",
        section: "quant_core",
        prompt: "How many integer values of x satisfy the inequality (x^2 - 5x + 6) / (x^2 - 1) <= 0?",
        options: ["1", "2", "3", "4"],
        answer: 2,
        explanation: "Factorize: [(x - 2)(x - 3)] / [(x - 1)(x + 1)] <= 0. Valid intervals: (-1, 1) U [2, 3]. Integer solutions are x = 0, 2, 3 (total = 3 integers)."
      }
    ]
  },
  {
    id: "hm_04",
    pillar: "higher_math_stats",
    title: "Statistics, Variance, Correlation & Distributions",
    exams: ["ALL_IIM_MASTER", "IIMB_UG_ECON_DS_DBE", "GRE General_INDORE_RANCHI", "IIMM_IIML_TECH_MGMT"],
    weightage: "Core Pillar in IIM Bangalore B.Sc. Econ/DS (6-10 Qs)",
    concepts: [
      {
        heading: "Effect of Origin & Scale Shift on Mean, SD & Variance",
        formula: "If Y = aX + b:  Mean(Y) = a*Mean(X) + b;  SD(Y) = |a|*SD(X);  Var(Y) = a^2 * Var(X)",
        derivation: "Adding a constant b shifts all data points equally without changing spread, so Standard Deviation (SD) and Variance are invariant to shift of origin (+b) and scale strictly by |a| and a^2.",
        shortcut: "If every observation is doubled and increased by 10, multiply old SD by 2 (ignore +10) and multiply old Variance by 4."
      },
      {
        heading: "Empirical Skewness & Median-Mode Relation",
        formula: "Mode ≈ 3 * Median - 2 * Mean  (for moderately skewed distributions)",
        derivation: "In a symmetric distribution, Mean = Median = Mode. Positive (right) skew pulls Mean > Median > Mode.",
        shortcut: "Combine two groups of sizes n1, n2 with identical means M: Combined Variance = (n1*Var1 + n2*Var2) / (n1 + n2)."
      }
    ],
    traps: [
      {
        title: "Adding Constant Shift b to Standard Deviation",
        wrongStep: "Each observation in a dataset with SD = 6 is increased by 5 => New SD = 6 + 5 = 11.",
        correction: "Spread does not change when every number shifts by +5; New SD remains 6.",
        penalty: "-1 Mark in MCQ"
      }
    ],
    questions: [
      {
        id: "hm_q5",
        type: "SA_NUMERIC",
        section: "qa_sa",
        prompt: "The variance of 10 observations is 9. If each observation is multiplied by 3 and then reduced by 4, what is the new variance?",
        answer: "81",
        explanation: "Variance scales by a^2 and is unaffected by subtracting 4: New Variance = 3^2 * 9 = 9 * 9 = 81."
      }
    ]
  },
  {
    id: "dilr_03",
    pillar: "dilr",
    title: "Data Sufficiency, Input-Output & Multi-Variable Grids",
    exams: ["ALL_IIM_MASTER", "GRE General_ROHTAK", "OMETs_BG_JAMMU", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"],
    weightage: "High in GRE General Rohtak & OMETs (8-12 Qs)",
    concepts: [
      {
        heading: "Strict Data Sufficiency Isolation Protocol",
        formula: "Test Statement I ALONE -> Test Statement II ALONE -> Combine ONLY if neither suffices alone",
        derivation: "A statement is sufficient if it yields a UNIQUE value or a definitive YES/NO answer. 'No' is just as sufficient as 'Yes'.",
        shortcut: "Never carry numerical assumptions from Statement I into Statement II when testing Statement II independently!"
      }
    ],
    traps: [
      {
        title: "Rejecting a Definite 'No' as Insufficient in Data Sufficiency",
        wrongStep: "Question: 'Is x > 10?' Statement I proves x = 4 -> Student marks Statement I insufficient.",
        correction: "Because x = 4 answers 'Is x > 10?' with a 100% certain 'NO', Statement I IS sufficient.",
        penalty: "-1 Mark in MCQ"
      }
    ],
    questions: [
      {
        id: "dilr_q6",
        type: "MCQ",
        section: "dilr",
        prompt: "[Data Sufficiency — GRE General Rohtak / OMETs]\nQuestion: What is the two-digit positive integer N?\nStatement I: The sum of the digits of N is 9, and N is divisible by 5.\nStatement II: When the digits of N are reversed, the new number exceeds N by 45.",
        options: [
          "Statement I alone is sufficient, while II alone is not.",
          "Statement II alone is sufficient, while I alone is not.",
          "Either Statement I alone or Statement II alone is sufficient.",
          "Both Statements I and II together are required."
        ],
        answer: 3,
        explanation: "From I alone, N can be 45 or 90 (not unique). From II alone, y - x = 5 gives 16, 27, 38, or 49 (not unique). Combining I & II uniquely locks N = 45."
      }
    ]
  }
];