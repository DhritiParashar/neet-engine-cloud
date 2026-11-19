window.IPM_DILR = [
  {
    id: "dilr_01",
    pillar: "dilr",
    title: "GRE General 2026 Embedded Data Interpretation Sets (SA & MCQ)",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "OMETs_BG_JAMMU", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"],
    weightage: "Appears inside BOTH QA-SA & QA-MCQ in CAT (6-10 Qs) + OMETs (15-18 Qs)",
    concepts: [
      {
        heading: "Embedded QA-SA & QA-MCQ Table/Caselet Strategy",
        formula: "Weighted Avg = (w1*x1 + w2*x2) / (w1 + w2);  Net Margin = (Revenue - Cost) / Revenue",
        derivation: "In GRE General 2025 & 2026, a 3-to-5 question Data Interpretation table or caselet appeared inside QA-SA (zero negative marking) and another calculation-heavy DI set inside QA-MCQ.",
        shortcut: "In QA-SA DI sets, attempt ALL questions since there is no -1 penalty. In QA-MCQ DI sets, skip 4-step division traps if less than 4 minutes remain."
      }
    ],
    traps: [
      {
        title: "Percentage Points vs Relative Percentage Growth in DI Tables",
        wrongStep: "Operating margin rises from 20% in FY25 to 25% in FY26 -> Growth = 5%.",
        correction: "Margin expanded by 5 percentage points, which is a (5 / 20) * 100 = 25% relative increase.",
        penalty: "-1 Mark in MCQ"
      },
      {
        title: "Missing Denominator Base in Market-Share vs Revenue Tables",
        wrongStep: "Comparing % share directly across two years when total market size changed.",
        correction: "Always multiply (% share) * (Total Market Size for that year) before computing absolute differences.",
        penalty: "-1 Mark in MCQ"
      }
    ],
    questions: [
      {
        id: "dilr_q1",
        type: "SA_NUMERIC",
        section: "qa_sa",
        prompt: "[GRE General SA-Style DI Caselet]\nFour IIMs (A, B, C, D) recorded the following UG applicant counts and conversion ratios:\n• Campus A: 4,000 applicants | 5% final offers\n• Campus B: 5,000 applicants | 6% final offers\n• Campus C: 3,000 applicants | 8% final offers\n• Campus D: 6,000 applicants | 4% final offers\nWhat is the total number of final offers made across all four campuses combined? (Enter exact integer)",
        answer: "980",
        explanation: "A = 5% of 4000 = 200; B = 6% of 5000 = 300; C = 8% of 3000 = 240; D = 4% of 6000 = 240. Total offers = 200 + 300 + 240 + 240 = 980."
      },
      {
        id: "dilr_q2",
        type: "MCQ",
        section: "dilr",
        prompt: "[GRE General 2026 Table DI Set]\nUsing the same data (A: 200 offers / 4000 apps; B: 300 / 5000; C: 240 / 3000; D: 240 / 6000), if Campus C's applications rise by 25% next year while its final offers remain constant at 240, by how many percentage points does Campus C's selection rate drop?",
        options: ["1.2 percentage points", "1.6 percentage points", "2.0 percentage points", "2.4 percentage points"],
        answer: 1,
        explanation: "Original rate = 240/3000 = 8.0%. New applications = 3000 * 1.25 = 3750. New rate = 240/3750 = 6.4%. Drop = 8.0% - 6.4% = 1.6 percentage points."
      },
      {
        id: "dilr_q3",
        type: "MCQ",
        section: "dilr",
        prompt: "In a survey of 500 students applying to IIMs, 60% applied to IIM Indore, 50% applied to IIM Bodh Gaya, and 20% applied to neither. How many students applied to BOTH IIM Indore and IIM Bodh Gaya?",
        options: ["100", "150", "200", "250"],
        answer: 1,
        explanation: "Total applying to at least one = 100% - 20% = 80%. Both = 60% + 50% - 80% = 30% of 500 = 150 students."
      }
    ]
  },
  {
    id: "dilr_02",
    pillar: "dilr",
    title: "Logical Reasoning: Seating Arrangements, Coding & Syllogisms",
    exams: ["ALL_IIM_MASTER", "GRE General_ROHTAK", "OMETs_BG_JAMMU", "IIMM_IIML_TECH_MGMT"],
    weightage: "40 Qs in GRE General Rohtak • 15-18 Qs in OMETs",
    concepts: [
      {
        heading: "Linear & Circular Arrangement Anchoring",
        formula: "Fix negative/definite constraints first; track 2 parallel cases rather than erasing.",
        derivation: "In GRE General Rohtak (40 LR Qs in 40 mins), arrangements and coding-decoding reward locking high-certainty clues first.",
        shortcut: "In circular seating facing center: 'Left' = Clockwise, 'Right' = Anti-clockwise. Always place the person with the most direct neighbors first."
      },
      {
        heading: "Syllogisms & Deductive Venn Logic",
        formula: "A definite conclusion holds ONLY if valid across ALL minimal & maximal Venn diagrams.",
        derivation: "Two 'Some' statements never produce a definite link between extreme terms.",
        shortcut: "'Some A are B' does NOT imply 'Some A are not B'. Test 'Possibility' conclusions using maximal overlap."
      }
    ],
    traps: [
      {
        title: "Treating 'Some A are B' as 'Some A are NOT B'",
        wrongStep: "Statement: Some analysts are coders. Conclusion: Some analysts are not coders -> True.",
        correction: "In formal logic, 'Some' means 'at least one, possibly all'. Thus 'Some A are not B' does not definitely follow.",
        penalty: "-1 Mark in MCQ"
      }
    ],
    questions: [
      {
        id: "dilr_q4",
        type: "MCQ",
        section: "dilr",
        prompt: "[GRE General Rohtak / OMETs Arrangement]\nSix aspirants—P, Q, R, S, T, and U—sit in a row facing North. P sits third to the left of S. Neither P nor S sits at an extreme end. Q sits immediately to the right of S. R sits second to the left of T. Who sits at the extreme right end?",
        options: ["Q", "T", "U", "R"],
        answer: 0,
        explanation: "Slots 1 to 6: Neither P nor S is at an end, and P is 3rd left of S => P = 2, S = 5. Q sits immediately right of S => Q = 6 (extreme right end). Remaining slots {1, 3, 4} fit R (2nd left of T) at R = 1, T = 3, and U = 4."
      },
      {
        id: "dilr_q5",
        type: "MCQ",
        section: "dilr",
        prompt: "Statements: (1) All analysts are graduates. (2) Some graduates are entrepreneurs. Conclusions: I. Some analysts are entrepreneurs. II. All entrepreneurs being graduates is a possibility.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither follows"],
        answer: 1,
        explanation: "Analysts and entrepreneurs need not overlap (I is false). However, the entrepreneur circle can lie completely inside graduates without violating 'Some graduates are entrepreneurs' (II is true)."
      }
    ]
  }
];