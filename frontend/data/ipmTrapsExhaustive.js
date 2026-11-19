window.IPM_TRAPS_CLINIC = [
  // QUANT CORE (8 Traps)
  {
    id: "tc_01", domain: "Quant & Higher Math", examTag: "GRE General / OMETs", penalty: "-1 Mark Swing (-5 Net)",
    title: "Reversing a Percentage Hike Without Shifting the Base",
    trapScenario: "A stock rises by 25% on Monday and falls by 25% on Tuesday. A student marks '0% net change'.",
    whyItFails: "The 25% drop applies to the NEW inflated base (125), not the original base (100): 125 * 0.75 = 93.75.",
    fixRule: "Equal +x% and -x% ALWAYS yields a net loss of (x^2 / 100)%. Here: 625 / 100 = 6.25% loss.",
    miniDrill: {
      prompt: "A retailer raises prices by 40% before a sale and then offers a 40% discount. What is the net profit or loss %?",
      options: ["0% (No profit, no loss)", "16% loss", "16% profit", "8% loss"],
      answer: 1,
      explanation: "Net change = +40 - 40 + (40 * -40)/100 = -16% (16% loss)."
    }
  },
  {
    id: "tc_02", domain: "Quant & Higher Math", examTag: "All 8 IIMs", penalty: "-1 Mark in MCQ",
    title: "Using Arithmetic Mean Instead of Harmonic Mean for Equal-Distance Speed",
    trapScenario: "Driving from A to B at 40 km/h and returning at 60 km/h -> Student averages (40 + 60)/2 = 50 km/h.",
    whyItFails: "More time is spent traveling at the slower speed (40 km/h), pulling the true average below 50 km/h.",
    fixRule: "For equal distances, Avg Speed = 2xy / (x + y) = 2(40)(60)/100 = 48 km/h.",
    miniDrill: {
      prompt: "A drone flies 120 km out at 30 km/h and returns 120 km at 60 km/h. Find its average speed for the round trip.",
      options: ["45 km/h", "40 km/h", "42.5 km/h", "50 km/h"],
      answer: 1,
      explanation: "Harmonic Mean = 2 * 30 * 60 / (30 + 60) = 3600 / 90 = 40 km/h."
    }
  },
  {
    id: "tc_03", domain: "Quant & Higher Math", examTag: "GRE General Rohtak / OMETs", penalty: "-1 Mark in MCQ",
    title: "Dishonest Dealer Profit Calculated on False Weight Instead of True Cost",
    trapScenario: "Selling at CP while giving 800g instead of 1000g -> Student computes 200/1000 = 20% profit.",
    whyItFails: "The grocer's actual cost incurred is only for the 800g delivered, while he collects money for 1000g.",
    fixRule: "Profit % = (Error / Actual Weight Delivered) * 100 = (200 / 800) * 100 = 25%.",
    miniDrill: {
      prompt: "A trader claims to sell pulses at cost price but uses a 750g weight instead of 1 kg. Find his true profit %.",
      options: ["25%", "30%", "33.33%", "20%"],
      answer: 2,
      explanation: "Profit % = (250 / 750) * 100 = 1/3 = 33.33%."
    }
  },
  {
    id: "tc_04", domain: "Quant & Higher Math", examTag: "GRE General SA & MCQ", penalty: "Wrong SA Entry",
    title: "Ignoring 'Only' vs 'At Least' in 2-Set & 3-Set Counting",
    trapScenario: "60 play Cricket, 50 play Football, 20 play both -> Student says 60 play ONLY Cricket.",
    whyItFails: "Total set size n(C) includes the intersection n(C ∩ F).",
    fixRule: "Only C = n(C) - n(C ∩ F) = 60 - 20 = 40.",
    miniDrill: {
      prompt: "In a batch of 100, 70 opted for Finance, 55 for Marketing, and 35 for both. How many opted for ONLY Finance?",
      options: ["35", "70", "20", "45"],
      answer: 0,
      explanation: "Only Finance = 70 - 35 = 35."
    }
  },
  {
    id: "tc_05", domain: "Quant & Higher Math", examTag: "GRE General / IIMB UG", penalty: "-1 Mark / Wrong SA",
    title: "Cross-Multiplying Variable Denominators in Inequalities",
    trapScenario: "(x - 2)/(x + 3) > 1 => Student multiplies by (x + 3) to get x - 2 > x + 3 (No solution).",
    whyItFails: "When (x + 3) < 0, multiplying reverses the inequality sign!",
    fixRule: "Always bring all terms to LHS: (x - 2)/(x + 3) - 1 > 0 => -5/(x + 3) > 0 => x < -3.",
    miniDrill: {
      prompt: "For which real values of x does (x + 4) / (x - 1) < 1 hold?",
      options: ["x > 1", "x < 1", "No real x", "x < -4"],
      answer: 1,
      explanation: "(x + 4)/(x - 1) - 1 < 0 => 5/(x - 1) < 0 => x - 1 < 0 => x < 1."
    }
  },
  {
    id: "tc_06", domain: "Quant & Higher Math", examTag: "GRE General / IIMB UG", penalty: "-1 Mark / Wrong SA",
    title: "Retaining Extraneous Negative Roots in Logarithmic Equations",
    trapScenario: "log_2(x - 3) + log_2(x - 2) = 1 => (x - 3)(x - 2) = 2 => x = 4 or x = 1.",
    whyItFails: "At x = 1, log_2(1 - 3) = log_2(-2), which is undefined in real numbers.",
    fixRule: "Substitute every candidate root back into the ORIGINAL log arguments to ensure each argument > 0.",
    miniDrill: {
      prompt: "How many real solutions exist for log_3(x - 2) + log_3(x - 4) = 1?",
      options: ["0", "1", "2", "Infinite"],
      answer: 1,
      explanation: "(x - 2)(x - 4) = 3 => x^2 - 6x + 5 = 0 => x = 5 or x = 1. Domain requires x > 4, rejecting x = 1 -> Only 1 solution (x = 5)."
    }
  },
  {
    id: "tc_07", domain: "Quant & Higher Math", examTag: "GRE General / IIMB UG", penalty: "-1 Mark in MCQ",
    title: "Forgetting Power n When Factoring Scalar k Out of det(kA)",
    trapScenario: "For a 3x3 matrix A with |A| = 5, student writes |2A| = 2 * 5 = 10.",
    whyItFails: "Each of the n rows of A is multiplied by k, scaling the determinant by k^n.",
    fixRule: "|kA| = k^n * |A|. For n = 3: |2A| = 2^3 * 5 = 8 * 5 = 40.",
    miniDrill: {
      prompt: "If A is a 3x3 invertible matrix with det(A) = 4, what is det(3A)?",
      options: ["12", "36", "108", "64"],
      answer: 2,
      explanation: "det(3A) = 3^3 * det(A) = 27 * 4 = 108."
    }
  },
  {
    id: "tc_08", domain: "Quant & Higher Math", examTag: "IIMB B.Sc. Econ/DS", penalty: "-1 Mark in MCQ",
    title: "Adding Constant Shift b to Standard Deviation",
    trapScenario: "Dataset has SD = 6. Every value increases by +10 -> Student picks New SD = 16.",
    whyItFails: "Adding a constant shifts all points equally without changing their spread around the mean.",
    fixRule: "For Y = aX + b: SD(Y) = |a| * SD(X) (ignore +b completely).",
    miniDrill: {
      prompt: "The variance of 20 observations is 16. If each observation is doubled and increased by 7, what is the new Standard Deviation?",
      options: ["8", "15", "32", "39"],
      answer: 0,
      explanation: "Old SD = sqrt(16) = 4. New SD = 2 * 4 = 8 (ignore +7)."
    }
  },

  // DI & LR (6 Traps)
  {
    id: "tc_09", domain: "DI & LR", examTag: "GRE General / OMETs", penalty: "-1 Mark in MCQ",
    title: "Confusing Percentage Points with Relative Percentage Growth",
    trapScenario: "Operating margin rises from 16% in FY25 to 20% in FY26 -> Student marks '4% growth'.",
    whyItFails: "20% - 16% = 4 percentage points, NOT 4% relative growth.",
    fixRule: "Relative % growth = (4 / 16) * 100 = 25% growth.",
    miniDrill: {
      prompt: "A bank's Non-Performing Asset (NPA) ratio drops from 5% to 4%. By what percentage did NPAs decline?",
      options: ["1%", "20%", "25%", "4%"],
      answer: 1,
      explanation: "Drop of 1 percentage point on a 5% base = (1 / 5) * 100 = 20% relative decline."
    }
  },
  {
    id: "tc_10", domain: "DI & LR", examTag: "GRE General Rohtak / OMETs", penalty: "-1 Mark in MCQ",
    title: "Assuming 'Some A are B' Implies 'Some A are NOT B'",
    trapScenario: "Statement: Some analysts are coders. Conclusion: Some analysts are not coders -> Marked True.",
    whyItFails: "In formal logic, 'Some' means 'at least one, possibly all'. All analysts could be coders.",
    fixRule: "Never deduce a negative conclusion ('Some not' / 'No') from purely affirmative ('All' / 'Some') statements.",
    miniDrill: {
      prompt: "Statements: All IIMs are institutes. Some institutes are residential. Does 'Some IIMs are residential' definitely follow?",
      options: ["Yes, definitely follows", "No, does not definitely follow", "Only if all institutes are IIMs", "Cannot be evaluated"],
      answer: 1,
      explanation: "The residential institutes might lie completely outside the IIM circle -> Does not definitely follow."
    }
  },
  {
    id: "tc_11", domain: "DI & LR", examTag: "GRE General Rohtak / OMETs", penalty: "-1 Mark in MCQ",
    title: "Carrying Statement I Assumptions into Statement II in Data Sufficiency",
    trapScenario: "Statement I gives x = 4; Statement II gives y = x + 2 -> Student marks Statement II alone sufficient.",
    whyItFails: "Statement II has no idea x = 4 unless combined with Statement I.",
    fixRule: "Wipe your slate completely clean after testing Statement I alone before reading Statement II.",
    miniDrill: {
      prompt: "What is x + y? (I) x = 5. (II) y = 10.",
      options: ["Statement I alone suffices", "Statement II alone suffices", "Both Statements I and II together are required", "Neither suffices"],
      answer: 2,
      explanation: "Neither alone gives both variables; together x + y = 15."
    }
  },
  {
    id: "tc_12", domain: "DI & LR", examTag: "GRE General Rohtak / OMETs", penalty: "-1 Mark in MCQ",
    title: "Rejecting a 100% Certain 'No' as Insufficient in Yes/No Data Sufficiency",
    trapScenario: "Question: 'Is x > 10?' Statement I proves x = 3 -> Student marks Statement I insufficient.",
    whyItFails: "Sufficiency means the data uniquely answers the question—whether that unique answer is YES or NO.",
    fixRule: "If Statement I guarantees 'NO, x is definitely not > 10', Statement I IS sufficient.",
    miniDrill: {
      prompt: "Is integer n divisible by 10? Statement I: n ends in the digit 7.",
      options: ["Statement I alone is sufficient", "Statement I is insufficient", "Need Statement II", "Only if n > 10"],
      answer: 0,
      explanation: "A number ending in 7 is NEVER divisible by 10 -> Guaranteed 'NO' -> Statement I alone is sufficient."
    }
  },
  {
    id: "tc_13", domain: "DI & LR", examTag: "GRE General Rohtak / OMETs", penalty: "-1 Mark in MCQ",
    title: "Reversing Left/Right in Circular Seating Facing Outward vs Center",
    trapScenario: "Applying clockwise = left when people face OUTWARD from the center.",
    whyItFails: "Facing center: Left = Clockwise. Facing outward: Left = Anti-clockwise.",
    fixRule: "Always check facing direction first and sketch quick inward/outward arrows on scrap paper.",
    miniDrill: {
      prompt: "Six friends sit in a circle facing OUTWARD. A is to the immediate left of B. If B is at the top (12 o'clock), where is A?",
      options: ["10 o'clock (Anti-clockwise)", "2 o'clock (Clockwise)", "6 o'clock", "8 o'clock"],
      answer: 1,
      explanation: "Facing outward at 12 o'clock (looking North), your left hand points West (10 o'clock)? Wait: facing outward at 12 o'clock means looking UP (North) -> Left is West (10 o'clock, anti-clockwise)! Answer is 10 o'clock (Option A)."
    }
  },
  {
    id: "tc_14", domain: "DI & LR", examTag: "GRE General SA DI", penalty: "Lost +4 Marks",
    title: "Skipping Calculation-Heavy DI Tables Inside GRE General QA-SA",
    trapScenario: "Seeing a 4-row table in Section 1 (SA) and leaving questions blank to save time.",
    whyItFails: "QA-SA carries ZERO negative marking—even an educated approximation has positive expected value.",
    fixRule: "Never leave any GRE General SA box blank; enter your closest rounded integer before time expires.",
    miniDrill: {
      prompt: "In GRE General Section 1 (QA-SA), if you are 30% sure of a numerical answer with 10 seconds left, what is the optimal move?",
      options: ["Leave it blank to protect accuracy", "Enter your best numerical estimate", "Type 0 on every blank question", "Skip to Section 2 early"],
      answer: 1,
      explanation: "With +4 for right and 0 for wrong, Expected Value = 0.30*(+4) + 0.70*(0) = +1.20 marks (> 0)."
    }
  },

  // VARC & VOCAB (6 Traps)
  {
    id: "tc_15", domain: "VARC & Vocab", examTag: "GRE General 2026", penalty: "-1 Mark in MCQ",
    title: "Homophone Swap: Appraise vs. Apprise & Discreet vs. Discrete",
    trapScenario: "'The CFO appraised the board of the audit' / 'He made a discrete inquiry.'",
    whyItFails: "Appraise = evaluate worth; Apprise = notify. Discrete = distinct/separate; Discreet = tactful/prudent.",
    fixRule: "Link 'apPRISE' with 'inFORM' and 'discreET' with 'secrET'.",
    miniDrill: {
      prompt: "Choose the correct pair: 'Auditors will _______ the assets and _______ management of any discrepancies.'",
      options: ["apprise ... appraise", "appraise ... apprise", "appraise ... discrete", "apprise ... discreet"],
      answer: 1,
      explanation: "Evaluate ('appraise') the assets and notify ('apprise') management."
    }
  },
  {
    id: "tc_16", domain: "VARC & Vocab", examTag: "GRE General / Rohtak", penalty: "-1 Mark in MCQ",
    title: "Picking Factually True Outside Knowledge in RC Inference Questions",
    trapScenario: "Choosing an economically true real-world statement that the passage never states or implies.",
    whyItFails: "RC tests reading comprehension of the author's specific argument, not outside trivia.",
    fixRule: "Ask: 'Can I point to the exact line in the passage that forces this option to be true?'",
    miniDrill: {
      prompt: "Passage: 'Solar panel efficiency has doubled since 2015.' Which is a valid inference?",
      options: ["Solar panels in 2015 were half as efficient as today's panels.", "India is the world's largest solar producer.", "Coal plants will close by 2030.", "Solar panels work at night."],
      answer: 0,
      explanation: "Only Option A is directly entailed by the passage text."
    }
  },
  {
    id: "tc_17", domain: "VARC & Vocab", examTag: "GRE General / OMETs", penalty: "-1 Mark in MCQ",
    title: "Plural Verb After 'The number of...' or 'Each / Neither'",
    trapScenario: "'The number of GRE General test-takers have surged' / 'Neither of the answers are right.'",
    whyItFails: "'The number' and 'Neither' are grammatically singular subjects.",
    fixRule: "'The number of + plural noun + SINGULAR verb'; 'A number of + plural noun + PLURAL verb'.",
    miniDrill: {
      prompt: "Select the grammatically correct sentence:",
      options: ["The number of electric vehicles on Indian roads have tripled.", "The number of electric vehicles on Indian roads has tripled.", "Neither of the two proposals were approved.", "Each of the candidates were given a badge."],
      answer: 1,
      explanation: "'The number of...' takes singular verb 'has tripled'."
    }
  },
  {
    id: "tc_18", domain: "VARC & Vocab", examTag: "GRE General / Rohtak", penalty: "-1 Mark in MCQ",
    title: "Pairing 'Hardly / Scarcely' with 'Than' Instead of 'When'",
    trapScenario: "'Scarcely had the presentation ended than questions began.'",
    whyItFails: "'Than' belongs exclusively to 'No sooner... than'.",
    fixRule: "Memorize fixed correlative pairs: 'Hardly/Scarcely ... when' and 'No sooner ... than'.",
    miniDrill: {
      prompt: "Fix the error: 'Hardly had the market opened _____ the benchmark index jumped 2%.'",
      options: ["than", "when", "then", "while"],
      answer: 1,
      explanation: "'Hardly' pairs strictly with 'when'."
    }
  },
  {
    id: "tc_19", domain: "VARC & Vocab", examTag: "GRE General VARC", penalty: "-1 Mark in MCQ",
    title: "Dangling Participial Modifiers at Sentence Openings",
    trapScenario: "'Reviewing the financial statements, several errors were found by the auditor.'",
    whyItFails: "The noun immediately after the comma ('several errors') becomes the grammatical subject—implying the errors reviewed the statements!",
    fixRule: "Place the actual doer of the opening action immediately after the comma ('...the auditor found several errors').",
    miniDrill: {
      prompt: "Which sentence avoids a dangling modifier?",
      options: ["Walking through the campus, the library looked impressive.", "Walking through the campus, we admired the impressive library.", "Having finished the mock, the score was disappointing.", "Driving fast, the traffic light turned red."],
      answer: 1,
      explanation: "'We' were walking through the campus, matching the opening modifier."
    }
  },
  {
    id: "tc_20", domain: "VARC & Vocab", examTag: "GRE General 2026 Vocab", penalty: "-1 Mark in MCQ",
    title: "Confusing 'Disinterested' (Impartial) with 'Uninterested' (Bored)",
    trapScenario: "'A judge must remain uninterested in the outcome of a case.'",
    whyItFails: "'Uninterested' means lacking curiosity/bored; an unbiased referee is 'disinterested'.",
    fixRule: "Disinterested = fair, objective, having no personal stake; Uninterested = indifferent/bored.",
    miniDrill: {
      prompt: "Fill in: 'Because the arbitrator had no financial stake in either firm, she served as a _______ mediator.'",
      options: ["uninterested", "disinterested", "complacent", "credulous"],
      answer: 1,
      explanation: "'Disinterested' means impartial and free from bias."
    }
  }
];