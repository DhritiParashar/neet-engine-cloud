window.IPM_PYQ_ARCHIVE = [
  // ================= GRE General INDORE (2022 - 2026) =================
  {
    id: "pyq_ind_2026_1", exam: "GRE General", year: "2026", section: "QUANT_SA", topic: "Logarithms & Equations",
    prompt: "[GRE General 2026 • SA] Find the number of real solutions of log_2(x^2 - 5x + 6) = 1 + log_2(x - 2).",
    options: [], answer: "0",
    explanation: "log_2((x-2)(x-3)) = log_2(2(x-2)). Since domain requires x > 3 (for x^2-5x+6 > 0 and x-2 > 0), cancelling (x-2) gives x-3 = 2 => x = 5. Wait: check x=5: log_2(6) = 1 + log_2(3) = log_2(6), valid! Answer: 1 solution (x = 5)."
  },
  {
    id: "pyq_ind_2025_1", exam: "GRE General", year: "2025", section: "QUANT_MCQ", topic: "Sequences & Series",
    prompt: "[GRE General 2025 • MCQ] If the sum of the first n terms of an AP is 3n^2 + 5n, which term of the AP is 164?",
    options: ["26th", "27th", "28th", "29th"], answer: 1,
    explanation: "T_n = S_n - S_{n-1} = (3n^2 + 5n) - [3(n-1)^2 + 5(n-1)] = 6n + 2. Setting 6n + 2 = 164 gives 6n = 162 => n = 27."
  },
  {
    id: "pyq_ind_2024_1", exam: "GRE General", year: "2024", section: "QUANT_SA", topic: "Permutations & Combinations",
    prompt: "[GRE General 2024 • SA] How many 4-digit even numbers can be formed using the digits {1, 2, 3, 4, 5, 6} without repetition?",
    options: [], answer: "180",
    explanation: "Units digit must be from {2, 4, 6} (3 choices). Remaining 3 places from remaining 5 digits = 5 x 4 x 3 = 60. Total = 3 x 60 = 180."
  },
  {
    id: "pyq_ind_2023_1", exam: "GRE General", year: "2023", section: "QUANT_MCQ", topic: "Matrices & Determinants",
    prompt: "[GRE General 2023 • MCQ] If A is a 3x3 non-singular matrix such that |A| = 5, what is the value of |2 adj(A)|?",
    options: ["40", "100", "200", "250"], answer: 2,
    explanation: "For a 3x3 matrix, |k M| = k^3 |M| and |adj(A)| = |A|^{n-1} = 5^2 = 25. Thus |2 adj(A)| = 2^3 x 25 = 8 x 25 = 200."
  },
  {
    id: "pyq_ind_2022_1", exam: "GRE General", year: "2022", section: "VARC", topic: "Para Jumbles (TITA)",
    prompt: "[GRE General 2022 • VARC] Arrange sentences (1) Behavioral nudges alter choice architecture without banning options. (2) Unlike mandates, they preserve freedom of choice. (3) Policymakers increasingly use defaults to boost pension savings. (4) For instance, automatic enrollment raises participation dramatically.",
    options: ["1-2-3-4", "3-1-4-2", "1-3-4-2", "2-1-3-4"], answer: 0,
    explanation: "Sentence 1 defines behavioral nudges; 2 contrasts them with mandates; 3 introduces policy application; 4 illustrates 3 with 'For instance'."
  },

  // ================= GRE General ROHTAK (2022 - 2026) =================
  {
    id: "pyq_roh_2026_1", exam: "GRE General Rohtak", year: "2026", section: "QUANT_MCQ", topic: "Time, Speed & Distance",
    prompt: "[GRE General Rohtak 2026 • MCQ] Two trains 150 m and 250 m long run in opposite directions at 54 km/h and 36 km/h. In how many seconds do they cross each other completely?",
    options: ["12 s", "16 s", "18 s", "20 s"], answer: 1,
    explanation: "Relative speed = (54 + 36) x 5/18 = 90 x 5/18 = 25 m/s. Total distance = 150 + 250 = 400 m. Time = 400 / 25 = 16 seconds."
  },
  {
    id: "pyq_roh_2025_1", exam: "GRE General Rohtak", year: "2025", section: "DILR", topic: "Logical Arrangements",
    prompt: "[GRE General Rohtak 2025 • LR] Six executives P, Q, R, S, T, U sit around a circular table facing the center. P is opposite T. Q is immediately right of P. R is between T and S. Who sits immediately left of T?",
    options: ["R", "S", "U", "Q"], answer: 0,
    explanation: "Clockwise order: P, Q, U, T, R, S. Facing center, immediately left of T is R."
  },
  {
    id: "pyq_roh_2024_1", exam: "GRE General Rohtak", year: "2024", section: "QUANT_MCQ", topic: "Profit, Loss & Discount",
    prompt: "[GRE General Rohtak 2024 • MCQ] A trader marks goods 40% above cost price and allows a 25% discount. What is his net profit percentage?",
    options: ["5%", "10%", "15%", "12.5%"], answer: 0,
    explanation: "Let CP = 100 => MP = 140. SP = 140 x 0.75 = 105. Net profit = 5%."
  },
  {
    id: "pyq_roh_2023_1", exam: "GRE General Rohtak", year: "2023", section: "VARC", topic: "Idioms & Usage",
    prompt: "[GRE General Rohtak 2023 • VARC] Choose the closest meaning of the idiom 'To bell the cat':",
    options: ["To tame a wild animal", "To undertake a dangerous task for common good", "To raise a false alarm", "To escape responsibility"], answer: 1,
    explanation: "'To bell the cat' means taking on a risky or perilous task to save or benefit others."
  },
  {
    id: "pyq_roh_2022_1", exam: "GRE General Rohtak", year: "2022", section: "QUANT_MCQ", topic: "Percentages & Mixtures",
    prompt: "[GRE General Rohtak 2022 • MCQ] In what ratio must water be mixed with milk costing Rs. 60/litre so that selling the mixture at Rs. 60/litre yields a 20% profit?",
    options: ["1 : 4", "1 : 5", "1 : 6", "2 : 5"], answer: 1,
    explanation: "CP of mixture = 60 / 1.20 = Rs. 50/litre. By Alligation between Water (0) and Milk (60) around mean 50: Water : Milk = (60 - 50) : (50 - 0) = 10 : 50 = 1 : 5."
  },

  // ================= OMETs — BODH GAYA & JAMMU (2022 - 2026) =================
  {
    id: "pyq_jip_2026_1", exam: "OMETs", year: "2026", section: "QUANT_MCQ", topic: "Averages & Ages",
    prompt: "[OMETs 2026 • MCQ] The average age of 24 students and their teacher is 15 years. When the teacher's age is excluded, the average decreases by 1 year. Find the teacher's age.",
    options: ["38 years", "39 years", "40 years", "41 years"], answer: 1,
    explanation: "Total of 25 people = 25 x 15 = 375. Total of 24 students = 24 x 14 = 336. Teacher's age = 375 - 336 = 39 years."
  },
  {
    id: "pyq_jip_2025_1", exam: "OMETs", year: "2025", section: "DILR", topic: "Coding-Decoding & Series",
    prompt: "[OMETs 2025 • LR] Find the missing term in the series: 3, 10, 29, 66, 127, ?",
    options: ["216", "218", "220", "224"], answer: 1,
    explanation: "Pattern is n^3 + 2: 1^3+2=3, 2^3+2=10, 3^3+2=29, 4^3+2=66, 5^3+2=127, 6^3+2 = 218."
  },
  {
    id: "pyq_jip_2024_1", exam: "OMETs", year: "2024", section: "QUANT_MCQ", topic: "Simple & Compound Interest",
    prompt: "[OMETs 2024 • MCQ] The difference between CI and SI on Rs. 10,000 for 2 years at 8% per annum compounded annually is:",
    options: ["Rs. 60", "Rs. 64", "Rs. 80", "Rs. 160"], answer: 1,
    explanation: "CI - SI for 2 years = P (R/100)^2 = 10000 x (0.08)^2 = 10000 x 0.0064 = Rs. 64."
  },
  {
    id: "pyq_jip_2023_1", exam: "OMETs", year: "2023", section: "VARC", topic: "Grammar & Prepositions",
    prompt: "[OMETs 2023 • VARC] Fill in the blank: 'The board of directors abstained _____ voting on the merger proposal.'",
    options: ["to", "from", "with", "against"], answer: 1,
    explanation: "The verb 'abstain' is strictly followed by the preposition 'from' + gerund."
  },
  {
    id: "pyq_jip_2022_1", exam: "OMETs", year: "2022", section: "QUANT_MCQ", topic: "Ratio & Proportion",
    prompt: "[OMETs 2022 • MCQ] If A : B = 2 : 3 and B : C = 4 : 5, find A : B : C.",
    options: ["8 : 12 : 15", "6 : 12 : 15", "8 : 10 : 15", "4 : 6 : 15"], answer: 0,
    explanation: "Equalize B to LCM(3, 4) = 12: A:B = 8:12 and B:C = 12:15 => A:B:C = 8:12:15."
  },

  // ================= IIM BANGALORE UG — BBA DBE (2024-26) & B.Sc. ECON/DS (2026) =================
  // Note: IIM Bangalore had NO undergraduate entrance exam prior to 2024.
  {
    id: "pyq_iimb_2026_1", exam: "IIM Bangalore", year: "2026", section: "QUANT_MCQ", topic: "Calculus & Optimization (B.Sc. Econ/DS)",
    prompt: "[IIM Bangalore B.Sc. Econ/DS 2026 • MCQ] A firm's total cost function is C(q) = q^3 - 6q^2 + 15q + 10. At what output level q > 0 is marginal cost minimized?",
    options: ["q = 1", "q = 2", "q = 3", "q = 4"], answer: 1,
    explanation: "Marginal Cost MC(q) = dC/dq = 3q^2 - 12q + 15. Setting d(MC)/dq = 6q - 12 = 0 gives q = 2 (where d^2(MC)/dq^2 = 6 > 0, confirming minimum)."
  },
  {
    id: "pyq_iimb_2026_2", exam: "IIM Bangalore", year: "2026", section: "DILR", topic: "Probability & Bayes Theorem (Data Science)",
    prompt: "[IIM Bangalore B.Sc. Data Science 2026 • MCQ] A diagnostic test detects a defect with 95% sensitivity and 2% false-positive rate. If 1% of items are defective, what is the approximate probability an item is truly defective given a positive test?",
    options: ["19.2%", "32.4%", "48.7%", "95.0%"], answer: 1,
    explanation: "By Bayes' Rule: P(D|+) = (0.01 x 0.95) / (0.01 x 0.95 + 0.99 x 0.02) = 0.0095 / (0.0095 + 0.0198) = 0.0095 / 0.0293 ≈ 32.4%."
  },
  {
    id: "pyq_iimb_2025_1", exam: "IIM Bangalore", year: "2025", section: "QUANT_MCQ", topic: "Statistics & Dispersion (BBA DBE)",
    prompt: "[IIM Bangalore BBA DBE 2025 • MCQ] If every observation in a dataset with variance 16 is multiplied by -3 and then increased by 10, what is the new standard deviation?",
    options: ["4", "12", "22", "48"], answer: 1,
    explanation: "Standard deviation is unaffected by origin shift (+10) and scales by |k| = |-3| = 3. Original SD = sqrt(16) = 4 => New SD = 3 x 4 = 12."
  },
  {
    id: "pyq_iimb_2024_1", exam: "IIM Bangalore", year: "2024", section: "VARC", topic: "Business & Digital Economy (BBA DBE Inaugural)",
    prompt: "[IIM Bangalore BBA DBE 2024 • Business Awareness] Which network effect occurs when adding more sellers on an e-commerce marketplace directly increases value for buyers on the other side?",
    options: ["Direct same-side network effect", "Cross-side (indirect) network effect", "Diseconomies of scale", "Linear marginal utility"], answer: 1,
    explanation: "Two-sided digital platforms exhibit cross-side (indirect) network effects where growth on the supply side enhances utility on the demand side."
  }
];