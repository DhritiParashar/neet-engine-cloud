window.IPM_PYQ_ARCHIVE = [
  {
    id: "pyq_2026_ind_1",
    year: "2026",
    exam: "GRE General (QA-SA)",
    section: "Higher Math — Logarithms & Series",
    type: "SA_NUMERIC",
    question: "If log_2(x) + log_4(x) + log_16(x) = 21/4, what is the exact value of x?",
    answer: "8",
    shortcut: "Convert all bases to base 2: log_2(x) + (1/2)log_2(x) + (1/4)log_2(x) = (7/4)log_2(x) = 21/4 => log_2(x) = 3 => x = 2^3 = 8.",
    trapNote: "Zero negative marking in GRE General QA-SA—always verify x > 0 and enter exact integer."
  },
  {
    id: "pyq_2026_ind_2",
    year: "2026",
    exam: "GRE General (VARC)",
    section: "Vocabulary & Confusable Usage",
    type: "MCQ",
    question: "Select the word pair that best completes the sentence: 'Although the committee remained _______ about the timeline, the chairperson promised to _______ members as soon as regulatory clearance arrived.'",
    options: ["reticent ... apprise", "loquacious ... appraise", "garrulous ... censor", "candid ... obfuscate"],
    answer: 0,
    shortcut: "'Although' signals contrast: reserved/silent ('reticent') vs. inform/notify ('apprise'). Watch out for the homophone trap 'appraise' (evaluate).",
    trapNote: "-1 mark penalty in MCQ for confusing 'apprise' (inform) with 'appraise' (value)."
  },
  {
    id: "pyq_2025_ind_1",
    year: "2025",
    exam: "GRE General (QA-MCQ)",
    section: "Matrices & Determinants",
    type: "MCQ",
    question: "Let A be a 3 x 3 invertible matrix such that det(A) = 3. What is the value of det(3 * adj(A))?",
    options: ["27", "81", "243", "729"],
    answer: 2,
    shortcut: "det(k * M) = k^n * det(M) for n=3 => 3^3 * det(adj(A)) = 27 * det(A)^(3-1) = 27 * 3^2 = 27 * 9 = 243.",
    trapNote: "Students frequently forget to cube the scalar 3 before multiplying by |adj(A)|."
  },
  {
    id: "pyq_2025_jip_1",
    year: "2025",
    exam: "OMETs (IIM Bodh Gaya & Jammu)",
    section: "Quantitative Aptitude — Arithmetic",
    type: "MCQ",
    question: "A sum of money doubles itself at compound interest in 5 years. In how many years will it become 16 times itself at the same annual rate?",
    options: ["15 years", "20 years", "25 years", "40 years"],
    answer: 1,
    shortcut: "In Compound Interest, equal time intervals multiply the principal by a constant factor: 2x in 5 yrs => 2^4 = 16x in 4 * 5 = 20 years.",
    trapNote: "Do not use Simple Interest logic (which would give 15 * 5 = 75 years)."
  },
  {
    id: "pyq_2024_roh_1",
    year: "2024",
    exam: "GRE General Rohtak (LR)",
    section: "Logical Reasoning — Clocks & Calendars",
    type: "MCQ",
    question: "What is the acute angle (in degrees) between the hour hand and the minute hand of a clock at 3:40 PM?",
    options: ["120°", "130°", "140°", "150°"],
    answer: 1,
    shortcut: "Angle = |30H - (11/2)M| = |30(3) - 5.5(40)| = |90 - 220| = 130°.",
    trapNote: "Remember the hour hand moves 0.5° every minute (20° in 40 mins), not staying fixed at 3."
  },
  {
    id: "pyq_2023_ind_1",
    year: "2023",
    exam: "GRE General (QA-SA)",
    section: "Combinatorics — Distribution",
    type: "SA_NUMERIC",
    question: "How many non-negative integer solutions exist for the equation x + y + z = 12?",
    answer: "91",
    shortcut: "Stars & Bars for non-negative integers: C(n + r - 1, r - 1) = C(12 + 3 - 1, 3 - 1) = C(14, 2) = (14 * 13) / 2 = 91.",
    trapNote: "Use C(n - 1, r - 1) = C(11, 2) = 55 ONLY when positive integers (x, y, z >= 1) are specified."
  },
  {
    id: "pyq_2022_jip_1",
    year: "2022",
    exam: "OMETs (DILR)",
    section: "Data Interpretation — Profit & Margin",
    type: "MCQ",
    question: "If a company's revenue increases by 20% while its total expenditure increases by 10%, and initial revenue was Rs. 100 crore against initial expenditure of Rs. 80 crore, by what percentage does its profit increase?",
    options: ["50%", "60%", "40%", "25%"],
    answer: 1,
    shortcut: "Initial Profit = 100 - 80 = 20 Cr. New Revenue = 120 Cr; New Expenditure = 80 * 1.1 = 88 Cr; New Profit = 120 - 88 = 32 Cr. Profit growth = (12 / 20) * 100 = 60%.",
    trapNote: "Profit growth is NOT (20% - 10%) = 10% because revenue and cost have different bases."
  },
  {
    id: "pyq_2026_iimb_1",
    year: "2026",
    exam: "IIM Bangalore (B.Sc. Econ/DS)",
    section: "Probability & Bayes' Theorem",
    type: "MCQ",
    question: "Bag A contains 3 red and 2 blue balls; Bag B contains 2 red and 4 blue balls. One bag is chosen at random and a ball drawn is found to be red. What is the probability it came from Bag A?",
    options: ["3/5", "9/14", "1/2", "5/9"],
    answer: 1,
    shortcut: "P(R|A) = 3/5 = 0.60; P(R|B) = 2/6 = 1/3. By Bayes' Theorem: P(A|R) = (3/5) / (3/5 + 1/3) = (9/15) / (14/15) = 9/14.",
    trapNote: "Do not forget to normalize by the total probability of drawing a red ball across both bags."
  }
];
window.IPM_PYQ_ARCHIVE.push(
  {
    id: "pyq_2026_roh_2",
    year: "2026",
    exam: "GRE General Rohtak (QA)",
    section: "Arithmetic — Profit & Discount",
    type: "MCQ",
    question: "A merchant marks his goods 40% above cost price and allows a 15% discount for cash payment. What is his net profit percentage?",
    options: ["19%", "21%", "25%", "17.5%"],
    answer: 0,
    shortcut: "Net % = +40 - 15 + (40 * -15)/100 = 25 - 6 = 19%.",
    trapNote: "Do not subtract 15% from 40% directly to get 25%."
  },
  {
    id: "pyq_2025_ind_2",
    year: "2025",
    exam: "GRE General (QA-SA)",
    section: "Higher Math — Sequences & Series",
    type: "SA_NUMERIC",
    question: "If the sum of the first 15 terms of an Arithmetic Progression is 600, what is the 8th term of the progression?",
    answer: "40",
    shortcut: "For 15 terms, the 8th term is the exact middle term: T8 = S15 / 15 = 600 / 15 = 40.",
    trapNote: "No need to set up two equations in a and d when odd-term sum is given."
  },
  {
    id: "pyq_2025_ind_3",
    year: "2025",
    exam: "GRE General (VARC)",
    section: "Grammar — Parallelism & Modifiers",
    type: "MCQ",
    question: "Identify the grammatically correct sentence:",
    options: [
      "Having analyzed the quarterly cash flows, the dividend was raised by the board.",
      "Having analyzed the quarterly cash flows, the board raised the dividend.",
      "The dividend, having analyzed the quarterly cash flows, was raised.",
      "Analyzing the quarterly cash flows, approval was given for raising the dividend."
    ],
    answer: 1,
    shortcut: "Opening participial phrase 'Having analyzed...' must immediately precede its logical subject ('the board').",
    trapNote: "Classic dangling modifier trap tested repeatedly in GRE General VARC."
  },
  {
    id: "pyq_2024_ind_1",
    year: "2024",
    exam: "GRE General (QA-MCQ)",
    section: "Algebra — Modulus & Inequalities",
    type: "MCQ",
    question: "What is the minimum value of f(x) = |x - 2| + |x - 5| + |x - 11| for all real numbers x?",
    options: ["6", "7", "9", "11"],
    answer: 2,
    shortcut: "Minimum of sum of moduli occurs at the median critical point x = 5: |5-2| + |5-5| + |5-11| = 3 + 0 + 6 = 9.",
    trapNote: "Testing endpoints x=2 or x=11 gives 12 instead of the true minimum 9."
  },
  {
    id: "pyq_2024_jip_2",
    year: "2024",
    exam: "OMETs (IIM Bodh Gaya & Jammu)",
    section: "Quantitative Aptitude — Time & Work",
    type: "MCQ",
    question: "A and B together can complete a task in 12 days, B and C in 15 days, and C and A in 20 days. In how many days can A alone complete the task?",
    options: ["20 days", "24 days", "30 days", "40 days"],
    answer: 2,
    shortcut: "Total Work = LCM(12, 15, 20) = 60 units. 2(A+B+C) = 5 + 4 + 3 = 12 => A+B+C = 6/day. A = 6 - (B+C) = 6 - 4 = 2/day => 60/2 = 30 days.",
    trapNote: "Remember to divide the summed pair efficiencies by 2 to get (A + B + C)."
  },
  {
    id: "pyq_2023_roh_2",
    year: "2023",
    exam: "GRE General Rohtak (VA)",
    section: "Vocabulary — Idioms & Usage",
    type: "MCQ",
    question: "Choose the correct meaning of the idiom 'to burn the midnight oil':",
    options: [
      "To waste precious resources recklessly",
      "To work or study late into the night",
      "To ignite an unnecessary conflict",
      "To retire early from a venture"
    ],
    answer: 1,
    shortcut: "Standard academic/business idiom meaning studying or working late into the night.",
    trapNote: "Do not confuse with 'burn the candle at both ends' (overworking day and night to exhaustion)."
  },
  {
    id: "pyq_2023_jip_2",
    year: "2023",
    exam: "OMETs (DILR)",
    section: "Logical Reasoning — Syllogisms",
    type: "MCQ",
    question: "Statements: All laptops are devices. Some devices are tablets. Conclusions: I. Some laptops are tablets. II. All tablets being devices is a possibility.",
    options: ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
    answer: 1,
    shortcut: "Middle term 'devices' is undistributed in both premises -> no definite link between laptops and tablets (I false). Possibility II holds cleanly.",
    trapNote: "Never assume overlap between outer circles unless forced by a 'All' premise."
  },
  {
    id: "pyq_2022_ind_2",
    year: "2022",
    exam: "GRE General (QA-SA)",
    section: "Number System — Remainders",
    type: "SA_NUMERIC",
    question: "What is the remainder when 5^36 is divided by 13?",
    answer: "1",
    shortcut: "By Fermat's Little Theorem, 5^12 ≡ 1 (mod 13). Since 36 = 12 * 3, (5^12)^3 ≡ 1^3 = 1 (mod 13).",
    trapNote: "13 is prime and gcd(5, 13) = 1, so exponent reduces modulo (13 - 1) = 12."
  }
);
