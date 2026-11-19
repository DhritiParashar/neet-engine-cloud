window.IPM_HIGHER_MATH = [
  {
    id: "hm_01",
    pillar: "higher_math_stats",
    title: "Logarithms, Indices & Sequences/Series",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"],
    weightage: "Very High in CAT & IIMB (4-6 Qs)",
    concepts: [
      {
        heading: "Base-Change Theorem & Domain Restrictions",
        formula: "log_b(a) = log_c(a) / log_c(b);  Domain: a > 0, b > 0, b != 1",
        derivation: "Every logarithmic equation must be checked against strict positivity of the argument and non-unity of the base.",
        shortcut: "log_(b^k)(a^m) = (m/k) * log_b(a). Pull powers out immediately to collapse nested products."
      },
      {
        heading: "AM-GM-HM Inequality for Optimization",
        formula: "AM >= GM >= HM  (for positive real numbers)",
        derivation: "Equality holds if and only if all terms are equal. Used heavily to find minimum values of x + k/x.",
        shortcut: "Minimum value of a*x + b/x (for x > 0) is immediately 2 * sqrt(a * b)."
      }
    ],
    traps: [
      {
        title: "Forgetting Extraneous Roots in Log Equations",
        wrongStep: "log_2(x - 3) + log_2(x - 2) = 1 => (x-3)(x-2) = 2 => x^2 - 5x + 4 = 0 => x = 4 or x = 1.",
        correction: "x = 1 makes (x - 3) = -2 < 0 (undefined!). Only x = 4 is valid.",
        penalty: "-1 Mark in MCQ / Wrong SA Entry"
      }
    ],
    questions: [
      {
        id: "hm_q1",
        type: "SA_NUMERIC",
        section: "qa_sa",
        prompt: "Find the minimum value of 9x + (4/x) for all x > 0. (Enter numerical value)",
        answer: "12",
        explanation: "By AM >= GM: (9x + 4/x)/2 >= sqrt(9x * 4/x) = sqrt(36) = 6 => Minimum value = 2 * 6 = 12."
      },
      {
        id: "hm_q2",
        type: "MCQ",
        section: "higher_math_stats",
        prompt: "If log_3(2), log_3(2^x - 5), and log_3(2^x - 7/2) are in Arithmetic Progression, what is the value of x?",
        options: ["2", "3", "4", "1"],
        answer: 1,
        explanation: "2 * log_3(2^x - 5) = log_3(2) + log_3(2^x - 7/2) => (2^x - 5)^2 = 2(2^x - 7/2). Let y = 2^x: y^2 - 12y + 32 = 0 => y = 8 or 4. Since y > 5, y = 8 => x = 3."
      }
    ]
  },
  {
    id: "hm_02",
    pillar: "higher_math_stats",
    title: "Permutations, Combinations & Probability",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"],
    weightage: "Very High in IIMB & Indore (4-6 Qs)",
    concepts: [
      {
        heading: "Beggar's / Stars-and-Bars Distribution Theorem",
        formula: "Non-negative integer solutions to x1 + x2 + ... + xr = n is C(n + r - 1, r - 1)",
        derivation: "Distributing n identical items into r distinct boxes with empty boxes allowed uses (r - 1) dividers among (n + r - 1) slots.",
        shortcut: "If each box must get at least 1 item (positive integers), pre-assign 1 to each box: C(n - 1, r - 1)."
      },
      {
        heading: "Bayes' Theorem & Conditional Probability",
        formula: "P(A|B) = [P(B|A) * P(A)] / P(B)",
        derivation: "Restricts the sample space to event B and computes the share contributed by branch A.",
        shortcut: "Draw a 2-branch probability tree; divide the target branch product by the sum of all paths leading to the observed outcome."
      }
    ],
    traps: [
      {
        title: "Confusing Identical vs Distinct Objects",
        wrongStep: "Distributing 5 identical chocolates among 3 children = 3^5 = 243.",
        correction: "3^5 applies to 5 DISTINCT chocolates. For IDENTICAL chocolates, use Stars & Bars: C(5 + 3 - 1, 3 - 1) = C(7, 2) = 21.",
        penalty: "-1 Mark in MCQ"
      }
    ],
    questions: [
      {
        id: "hm_q3",
        type: "SA_NUMERIC",
        section: "qa_sa",
        prompt: "In how many ways can 10 identical coins be distributed among 4 students such that each student receives at least 1 coin?",
        answer: "84",
        explanation: "Positive integer solutions to x1 + x2 + x3 + x4 = 10 is C(10 - 1, 4 - 1) = C(9, 3) = (9 * 8 * 7) / 6 = 84."
      }
    ]
  },
  {
    id: "hm_03",
    pillar: "higher_math_stats",
    title: "Matrices, Determinants, Functions & Calculus",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"],
    weightage: "High in IIMB B.Sc., Indore & IIMM (3-5 Qs)",
    concepts: [
      {
        heading: "Adjoint & Determinant Scaling Laws (Class 12 Bridge)",
        formula: "|kA| = k^n |A|;  |adj(A)| = |A|^(n-1);  A * adj(A) = |A| I_n",
        derivation: "For an n x n invertible matrix A, scalar k multiplies every row, contributing k^n to the determinant.",
        shortcut: "Always check matrix order n first! For a 3x3 matrix, |2A| = 8|A| and |adj(A)| = |A|^2."
      },
      {
        heading: "First & Second Derivative Marginal Optimization (Economics)",
        formula: "Marginal Revenue MR = d(TR)/dx;  Max Profit at MR = MC and d^2(Profit)/dx^2 < 0",
        derivation: "Core bridge to Semester I Managerial Economics & IIM Bangalore B.Sc. Economics entrance questions.",
        shortcut: "Set first derivative = 0 for critical points, then verify sign change or second derivative."
      }
    ],
    traps: [
      {
        title: "Pulling Scalar k Out of Determinant Without Power n",
        wrongStep: "If A is a 3x3 matrix with |A| = 5, then |3A| = 3 * 5 = 15.",
        correction: "Each of the 3 rows is scaled by 3: |3A| = 3^3 * 5 = 27 * 5 = 135.",
        penalty: "-1 Mark in MCQ"
      }
    ],
    questions: [
      {
        id: "hm_q4",
        type: "MCQ",
        section: "higher_math_stats",
        prompt: "If A is a 3 x 3 matrix with det(A) = 4, what is the value of det(2 * adj(A))?",
        options: ["32", "64", "128", "256"],
        answer: 2,
        explanation: "det(2 * adj(A)) = 2^3 * det(adj(A)) = 8 * (det(A))^(3-1) = 8 * 4^2 = 8 * 16 = 128."
      }
    ]
  }
];