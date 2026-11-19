window.IPM_QUANT_CORE = [
  {
    id: "qc_01",
    pillar: "quant_core",
    title: "Percentages, Successive Change & Profit-Loss",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "OMETs_BG_JAMMU", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"],
    weightage: "High (4-6 Qs)",
    concepts: [
      {
        heading: "Successive Percentage Change & Base Shifting",
        formula: "Net % Change = a + b + (ab / 100)",
        derivation: "If a quantity changes by a% and then b%, the multiplying factor is (1 + a/100)(1 + b/100). To reverse an x% increase back to the original value, reduce by [x / (100 + x)] * 100%.",
        shortcut: "Fraction Equivalent Method: +25% = +1/4 (4 -> 5), so to return from 5 to 4 is -1/5 = -20%. Never subtract 25% directly."
      },
      {
        heading: "Dishonest Dealer & Markup-Discount Trap",
        formula: "SP/CP = (1 + m/100)(1 - d/100) * (True Weight / False Weight)",
        derivation: "Profit is always computed on actual Cost Price (CP) incurred by the seller, whereas discount is always computed on Marked Price (MP).",
        shortcut: "Assume CP = Rs. 1 per gram. If a trader uses 800g instead of 1000g and sells at CP, actual CP = 800, SP = 1000 -> Profit = 200/800 = 25%."
      }
    ],
    traps: [
      {
        title: "Reversing Percentage Hike Without Changing Base",
        wrongStep: "Price rises by 20%, then falls by 20% -> Net change = 0%.",
        correction: "20 + (-20) + (20 * -20)/100 = -4% (always a net decrease of x^2/100%).",
        penalty: "-1 Mark in MCQ"
      }
    ],
    questions: [
      {
        id: "qc_q1",
        type: "MCQ",
        section: "quant_core",
        prompt: "A merchant marks his goods 40% above cost price and allows a discount of 25%. If he also uses a faulty weight of 900g instead of 1000g, what is his net profit percentage?",
        options: ["12.5%", "16.67%", "15%", "20%"],
        answer: 1,
        explanation: "SP/CP = (1.40) * (0.75) * (1000/900) = 1.05 * (10/9) = 7/6. Profit = (7-6)/6 = 1/6 = 16.67%."
      },
      {
        id: "qc_q2",
        type: "SA_NUMERIC",
        section: "qa_sa",
        prompt: "If the price of sugar increases by 25%, by what exact percentage must a household reduce its consumption so that expenditure increases by only 10%? (Enter numerical value only)",
        answer: "12",
        explanation: "New Expenditure / Old Expenditure = (1.25) * (1 - r/100) = 1.10 => 1 - r/100 = 110/125 = 0.88 => r = 12%."
      }
    ]
  },
  {
    id: "qc_02",
    pillar: "quant_core",
    title: "Ratios, Mixtures & Weighted Alligations",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "OMETs_BG_JAMMU", "IIMB_UG_ECON_DS_DBE"],
    weightage: "High (3-5 Qs)",
    concepts: [
      {
        heading: "Repeated Replacement Formula",
        formula: "Final Pure Quantity = Initial * (1 - V_replaced / V_total)^n",
        derivation: "Each operation removes a fixed fraction (V_replaced / V_total) of whatever pure component remains in the vessel.",
        shortcut: "Work with the concentration of the component NOT being added. After n operations, C_final = C_initial * (1 - removed/total)^n."
      }
    ],
    traps: [
      {
        title: "Alligation Ratio Inversion",
        wrongStep: "Mixing Rs. 40/kg and Rs. 70/kg rice to get Rs. 50/kg -> Ratio = (50-40):(70-50) = 1:2.",
        correction: "Cross-differences invert the weights: Cheaper : Dearer = (70 - 50) : (50 - 40) = 20 : 10 = 2 : 1.",
        penalty: "-1 Mark in MCQ"
      }
    ],
    questions: [
      {
        id: "qc_q3",
        type: "MCQ",
        section: "quant_core",
        prompt: "A vessel contains 60 litres of pure milk. 12 litres of milk is drawn out and replaced with water. This process is repeated once more. How much milk (in litres) is now left in the vessel?",
        options: ["36.0", "38.4", "40.2", "37.5"],
        answer: 1,
        explanation: "Fraction removed each time = 12/60 = 1/5. Remaining fraction = 4/5. After 2 operations: 60 * (4/5)^2 = 60 * 16/25 = 38.4 litres."
      }
    ]
  },
  {
    id: "qc_03",
    pillar: "quant_core",
    title: "Time-Speed-Distance, Relative Speed & Work",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "OMETs_BG_JAMMU", "IIMM_IIML_TECH_MGMT"],
    weightage: "High (4-5 Qs)",
    concepts: [
      {
        heading: "Constant Distance Inverse Ratio & Harmonic Mean",
        formula: "Average Speed (equal distances) = 2xy / (x + y)",
        derivation: "When distance D is constant, Speed is inversely proportional to Time (S1/S2 = T2/T1).",
        shortcut: "If speed changes by a/b, time changes by a/(b-a) for decrease or a/(b+a) for increase. No need to assume distance D!"
      }
    ],
    traps: [
      {
        title: "Arithmetic Mean Instead of Harmonic Mean for Average Speed",
        wrongStep: "Going at 40 km/h and returning at 60 km/h -> Average speed = (40+60)/2 = 50 km/h.",
        correction: "Equal distances require Harmonic Mean: 2(40)(60)/(40+60) = 4800/100 = 48 km/h.",
        penalty: "-1 Mark in MCQ"
      }
    ],
    questions: [
      {
        id: "qc_q4",
        type: "SA_NUMERIC",
        section: "qa_sa",
        prompt: "Walking at 3/4 of his usual speed, a student reaches his IIM interview centre 20 minutes late. What is his usual travel time in minutes?",
        answer: "60",
        explanation: "Speed becomes 3/4 => Time becomes 4/3 of usual time T. Extra time = (4/3 - 1)T = (1/3)T = 20 mins => T = 60 minutes."
      }
    ]
  },
  {
    id: "qc_04",
    pillar: "quant_core",
    title: "Number Systems, Remainders & Geometry",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "OMETs_BG_JAMMU", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"],
    weightage: "Medium-High (3-5 Qs)",
    concepts: [
      {
        heading: "Cyclicity of Unit Digits & Fermat's Little Theorem",
        formula: "a^(p-1) ≡ 1 (mod p) for prime p not dividing a",
        derivation: "Unit digits repeat in cycles of 1 (0,1,5,6), 2 (4,9), or 4 (2,3,7,8). Divide the exponent by 4 and inspect the remainder.",
        shortcut: "For remainder when a^n is divided by prime p, reduce the exponent modulo (p - 1)."
      }
    ],
    traps: [
      {
        title: "Exponent Divisible by 4 Mapped to Power 0",
        wrongStep: "Unit digit of 7^24 -> 24 mod 4 = 0 -> 7^0 = 1 (happens to work for 7, fails for 2^24!).",
        correction: "When remainder mod 4 is 0, raise the base to the 4th power (2^4 = 16 -> unit digit 6, NOT 2^0 = 1).",
        penalty: "-1 Mark in MCQ"
      }
    ],
    questions: [
      {
        id: "qc_q5",
        type: "MCQ",
        section: "quant_core",
        prompt: "What is the remainder when 3^42 is divided by 7?",
        options: ["1", "2", "4", "6"],
        answer: 0,
        explanation: "By Fermat's Little Theorem, 3^6 ≡ 1 (mod 7). Since 42 = 6 * 7, 3^42 = (3^6)^7 ≡ 1^7 = 1 (mod 7)."
      }
    ]
  }
];