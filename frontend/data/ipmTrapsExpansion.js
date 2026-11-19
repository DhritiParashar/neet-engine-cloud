window.IPM_TRAPS_CLINIC = window.IPM_TRAPS_CLINIC || [];

window.IPM_TRAPS_CLINIC.push(
  // +12 QUANT & HIGHER MATH TRAPS (Brings Quant & Higher Math from 8 -> 20 Traps)
  {
    id: "tc_q09", domain: "Quant & Higher Math", examTag: "GRE General / OMETs", penalty: "-1 Mark in MCQ",
    title: "Using Simple Interest Proportionality for Compound Interest Multipliers",
    trapScenario: "A sum doubles at CI in 6 years -> Student says it becomes 4x in 18 years (thinking +100% every 6 yrs).",
    whyItFails: "CI compounds multiplicatively (2x, 4x, 8x), not additively (2x, 3x, 4x).",
    fixRule: "In CI, equal time intervals multiply principal by a constant factor: 2x in 6 yrs => 2^2 = 4x in 2 * 6 = 12 years.",
    miniDrill: {
      prompt: "A sum of money triples itself at Compound Interest in 5 years. In how many years will it become 27 times itself?",
      options: ["15 years", "20 years", "45 years", "12 years"],
      answer: 0,
      explanation: "3x in 5 yrs => 3^3 = 27x in 3 * 5 = 15 years."
    }
  },
  {
    id: "tc_q10", domain: "Quant & Higher Math", examTag: "All 8 IIMs", penalty: "-1 Mark in MCQ",
    title: "Applying Alligation Directly to Selling Price Instead of Cost Price",
    trapScenario: "Mixing Rs. 40/kg and Rs. 60/kg rice to sell at Rs. 55/kg with 10% profit -> Student puts 55 in the center.",
    whyItFails: "40 and 60 are Cost Prices, while 55 is a Selling Price—mixing units breaks Alligation.",
    fixRule: "Convert Selling Price to Mixture CP first: M = 55 / 1.10 = Rs. 50/kg, then cross-subtract (60-50):(50-40) = 1:1.",
    miniDrill: {
      prompt: "In what ratio must Rs. 30/kg tea be mixed with Rs. 50/kg tea so that selling the blend at Rs. 48/kg yields a 20% profit?",
      options: ["1 : 1", "9 : 1", "1 : 9", "2 : 3"],
      answer: 0,
      explanation: "Mixture CP = 48 / 1.20 = Rs. 40/kg. Ratio = (50 - 40) : (40 - 30) = 10 : 10 = 1 : 1."
    }
  },
  {
    id: "tc_q11", domain: "Quant & Higher Math", examTag: "GRE General Rohtak / OMETs", penalty: "-1 Mark in MCQ",
    title: "Forgetting Train Length When Crossing a Platform vs. a Pole",
    trapScenario: "A 200m train at 20 m/s crosses a 300m platform -> Student computes 300 / 20 = 15 seconds.",
    whyItFails: "To clear the platform completely, the train must travel (Train Length + Platform Length).",
    fixRule: "Total Distance = 200 + 300 = 500m => Time = 500 / 20 = 25 seconds.",
    miniDrill: {
      prompt: "A 180m train running at 54 km/h crosses a 270m bridge. How many seconds does it take?",
      options: ["18 s", "25 s", "30 s", "12 s"],
      answer: 2,
      explanation: "Speed = 54 * 5/18 = 15 m/s. Distance = 180 + 270 = 450m => Time = 450 / 15 = 30 seconds."
    }
  },
  {
    id: "tc_q12", domain: "Quant & Higher Math", examTag: "GRE General SA", penalty: "Wrong SA Entry",
    title: "Treating Downstream & Upstream Boat Speeds as Directly Additive Without Halving",
    trapScenario: "Downstream = 14 km/h, Upstream = 6 km/h -> Student states Boat Speed = 14 + 6 = 20 km/h.",
    whyItFails: "(B + S) + (B - S) = 2B, not B.",
    fixRule: "Boat Speed B = (D + U) / 2 = 10 km/h; Stream Speed S = (D - U) / 2 = 4 km/h.",
    miniDrill: {
      prompt: "A boat rows 30 km downstream in 2 hours and 18 km upstream in 3 hours. Find the speed of the stream (km/h).",
      options: ["4.5 km/h", "9 km/h", "6 km/h", "3 km/h"],
      answer: 0,
      explanation: "D = 15 km/h, U = 6 km/h => Stream speed S = (15 - 6) / 2 = 4.5 km/h."
    }
  },
  {
    id: "tc_q13", domain: "Quant & Higher Math", examTag: "GRE General / OMETs", penalty: "-1 Mark in MCQ",
    title: "Assuming 1 is a Prime Number or Forgetting 2 is the Only Even Prime",
    trapScenario: "Listing primes under 10 as {1, 2, 3, 5, 7} -> Counting 5 primes instead of 4.",
    whyItFails: "By definition, a prime has EXACTLY two distinct positive factors; 1 has only one factor.",
    fixRule: "Smallest prime is 2 (the only even prime). Primes < 10 are {2, 3, 5, 7} (4 primes).",
    miniDrill: {
      prompt: "What is the product of the first four prime numbers?",
      options: ["30", "210", "105", "42"],
      answer: 1,
      explanation: "First four primes are 2, 3, 5, 7 => 2 * 3 * 5 * 7 = 210."
    }
  },
  {
    id: "tc_q14", domain: "Quant & Higher Math", examTag: "GRE General SA", penalty: "Wrong SA Entry",
    title: "Using Positive-Integer Stars & Bars When Zero is Allowed (or Vice Versa)",
    trapScenario: "Non-negative solutions to x + y + z = 10 -> Student uses C(10-1, 3-1) = C(9,2) = 36.",
    whyItFails: "C(n - 1, r - 1) requires strictly positive integers (x, y, z >= 1).",
    fixRule: "Non-negative (>= 0): C(n + r - 1, r - 1) = C(12, 2) = 66. Positive (>= 1): C(n - 1, r - 1) = C(9, 2) = 36.",
    miniDrill: {
      prompt: "How many non-negative integer solutions exist for x + y + z = 7?",
      options: ["15", "21", "36", "28"],
      answer: 2,
      explanation: "Non-negative (>= 0): C(7 + 3 - 1, 3 - 1) = C(9, 2) = 36."
    }
  },
  {
    id: "tc_q15", domain: "Quant & Higher Math", examTag: "GRE General / IIMB UG", penalty: "-1 Mark in MCQ",
    title: "Canceling Common Variable Factors on Both Sides of an Equation",
    trapScenario: "x^2 = 5x => Student divides both sides by x to get only x = 5.",
    whyItFails: "Dividing by x implicitly assumes x != 0, losing the valid root x = 0.",
    fixRule: "Always factorize instead of canceling variables: x(x - 5) = 0 => x = 0 or x = 5.",
    miniDrill: {
      prompt: "Find the sum of all real roots of the equation x^3 = 9x.",
      options: ["3", "6", "0", "9"],
      answer: 2,
      explanation: "x(x^2 - 9) = 0 => roots are 0, +3, -3. Sum = 0 + 3 - 3 = 0."
    }
  },
  {
    id: "tc_q16", domain: "Quant & Higher Math", examTag: "GRE General / IIMB UG", penalty: "-1 Mark in MCQ",
    title: "Forgetting +- Sign When Taking Square Root of x^2",
    trapScenario: "sqrt((x - 4)^2) = 5 => Student writes x - 4 = 5 => x = 9 only.",
    whyItFails: "sqrt(u^2) = |u|, NOT u.",
    fixRule: "|x - 4| = 5 => x - 4 = ±5 => x = 9 or x = -1.",
    miniDrill: {
      prompt: "How many real values of x satisfy sqrt((2x - 6)^2) = 10?",
      options: ["1", "2", "0", "4"],
      answer: 1,
      explanation: "|2x - 6| = 10 => 2x - 6 = 10 (x = 8) or 2x - 6 = -10 (x = -2) -> 2 real values."
    }
  },
  {
    id: "tc_q17", domain: "Quant & Higher Math", examTag: "GRE General Higher Math", penalty: "-1 Mark in MCQ",
    title: "Applying Infinite GP Formula S = a/(1 - r) When |r| >= 1",
    trapScenario: "1 + 2 + 4 + 8 + ... -> Student plugs a=1, r=2 into 1/(1 - 2) = -1.",
    whyItFails: "An infinite GP converges ONLY when common ratio satisfies -1 < r < 1.",
    fixRule: "Check |r| < 1 before using S_inf = a / (1 - r).",
    miniDrill: {
      prompt: "Find the sum to infinity of the series: 18 - 6 + 2 - 2/3 + ...",
      options: ["13.5", "27", "12", "9"],
      answer: 0,
      explanation: "a = 18, r = -1/3 (|r| < 1). S_inf = 18 / (1 - (-1/3)) = 18 / (4/3) = 13.5."
    }
  },
  {
    id: "tc_q18", domain: "Quant & Higher Math", examTag: "GRE General / IIMB UG", penalty: "-1 Mark in MCQ",
    title: "Assuming Matrix Multiplication Commutes: (A + B)^2 = A^2 + 2AB + B^2",
    trapScenario: "Expanding (A + B)^2 as A^2 + 2AB + B^2 for two square matrices A and B.",
    whyItFails: "In general, AB != BA for matrices.",
    fixRule: "(A + B)^2 = A^2 + AB + BA + B^2. It equals A^2 + 2AB + B^2 ONLY if AB = BA.",
    miniDrill: {
      prompt: "If A and B are square matrices such that AB = -BA, what does (A + B)^2 simplify to?",
      options: ["A^2 + B^2", "A^2 + 2AB + B^2", "A^2 - B^2", "0"],
      answer: 0,
      explanation: "(A + B)^2 = A^2 + AB + BA + B^2 = A^2 - BA + BA + B^2 = A^2 + B^2."
    }
  },
  {
    id: "tc_q19", domain: "Quant & Higher Math", examTag: "IIMB UG / GRE General", penalty: "-1 Mark in MCQ",
    title: "Confusing Mutually Exclusive Events with Independent Events",
    trapScenario: "P(A)=0.4, P(B)=0.5 are independent -> Student computes P(A ∩ B) = 0.",
    whyItFails: "Mutually exclusive means P(A ∩ B) = 0; Independent means P(A ∩ B) = P(A) * P(B).",
    fixRule: "For independent events, P(A ∩ B) = 0.4 * 0.5 = 0.20, so P(A U B) = 0.4 + 0.5 - 0.2 = 0.70.",
    miniDrill: {
      prompt: "Events A and B are independent with P(A) = 0.3 and P(B) = 0.4. Find P(neither A nor B occurs).",
      options: ["0.30", "0.42", "0.12", "0.70"],
      answer: 1,
      explanation: "P(A' ∩ B') = P(A') * P(B') = 0.7 * 0.6 = 0.42."
    }
  },
  {
    id: "tc_q20", domain: "Quant & Higher Math", examTag: "IIMB UG Statistics", penalty: "-1 Mark in MCQ",
    title: "Averaging Standard Deviations Directly When Combining Two Groups",
    trapScenario: "Group 1 has SD = 4, Group 2 has SD = 6 -> Student picks Combined SD = 5.",
    whyItFails: "Variances (SD^2) add under equal means—not Standard Deviations.",
    fixRule: "When group means are equal, Combined Variance = (n1*Var1 + n2*Var2)/(n1 + n2), then take square root.",
    miniDrill: {
      prompt: "Two samples of size 10 each have the same mean 50, with variances 16 and 34. Find the combined variance.",
      options: ["25", "50", "5", "20"],
      answer: 0,
      explanation: "Combined Variance = (10*16 + 10*34) / 20 = 500 / 20 = 25."
    }
  },

  // +12 DI & LR TRAPS (Brings DI & LR from 6 -> 18 Traps)
  {
    id: "tc_d07", domain: "DI & LR", examTag: "OMETs / GRE General DI", penalty: "-1 Mark in MCQ",
    title: "Comparing Pie Chart Percentage Shares Without Checking Total Pie Size",
    trapScenario: "Sector A is 30% in 2025 pie and 25% in 2026 pie -> Student concludes Sector A revenue fell.",
    whyItFails: "If the 2026 total pie grew from Rs. 100 Cr to Rs. 200 Cr, 25% of 200 (50 Cr) > 30% of 100 (30 Cr).",
    fixRule: "Always multiply (% share) * (Total Base Value) before comparing across years.",
    miniDrill: {
      prompt: "Firm X held 25% of a Rs. 400 Cr market in 2025 and 20% of a Rs. 600 Cr market in 2026. What happened to Firm X's revenue?",
      options: ["Fell by 5%", "Rose by Rs. 20 Cr (+20%)", "Remained unchanged", "Fell by Rs. 20 Cr"],
      answer: 1,
      explanation: "2025: 25% of 400 = Rs. 100 Cr. 2026: 20% of 600 = Rs. 120 Cr -> Rose by Rs. 20 Cr (+20%)."
    }
  },
  {
    id: "tc_d08", domain: "DI & LR", examTag: "OMETs / Indore DI", penalty: "-1 Mark in MCQ",
    title: "Converting Pie Chart Degrees to Percentage by Dividing by 100 Instead of 360",
    trapScenario: "A sector of 54° is read as 54% instead of (54/360)*100 = 15%.",
    whyItFails: "A full circle is 360°, so 1% = 3.6° and 10% = 36°.",
    fixRule: "Divide degrees by 3.6 to get percentage immediately (54 / 3.6 = 15%).",
    miniDrill: {
      prompt: "In a budget pie chart representing Rs. 900 Cr, Defense is allocated 108°. How many crores is Defense?",
      options: ["Rs. 108 Cr", "Rs. 270 Cr", "Rs. 300 Cr", "Rs. 250 Cr"],
      answer: 1,
      explanation: "108° / 360° = 3/10 = 30% of 900 Cr = Rs. 270 Cr."
    }
  },
  {
    id: "tc_d09", domain: "DI & LR", examTag: "GRE General Rohtak / OMETs", penalty: "-1 Mark in MCQ",
    title: "Using Straight-Line Average Instead of Compounded CAGR Across Multi-Year Tables",
    trapScenario: "Sales double (+100%) in 4 years -> Student divides 100% / 4 = 25% annual growth.",
    whyItFails: "Compounding makes actual annual CAGR (~18.9%) strictly lower than (Total % Growth / Years).",
    fixRule: "CAGR = (Ending / Beginning)^(1/n) - 1, which is always less than simple average growth.",
    miniDrill: {
      prompt: "If revenue grows from Rs. 100 Cr to Rs. 144 Cr over 2 years, what is the exact annual Compound Annual Growth Rate (CAGR)?",
      options: ["22%", "20%", "44%", "18%"],
      answer: 1,
      explanation: "(144 / 100)^(1/2) - 1 = 1.20 - 1 = 20% CAGR."
    }
  },
  {
    id: "tc_d10", domain: "DI & LR", examTag: "GRE General / OMETs", penalty: "-1 Mark in MCQ",
    title: "Double-Counting Pairwise Overlaps in 3-Set Venn Diagrams",
    trapScenario: "Using n(A) + n(B) + n(C) - n(A∩B) - n(B∩C) - n(C∩A) without adding back n(A∩B∩C).",
    whyItFails: "Subtracting all three pairwise intersections removes the center triple-overlap three times after adding it three times.",
    fixRule: "Total Union = A + B + C - (AB + BC + CA) + ABC.",
    miniDrill: {
      prompt: "In a club of 60, 30 play Tennis, 25 Badminton, 20 Squash; 10 play T&B, 8 B&S, 7 T&S, and 5 play all three. How many play at least one sport?",
      options: ["50", "55", "45", "60"],
      answer: 1,
      explanation: "30 + 25 + 20 - (10 + 8 + 7) + 5 = 75 - 25 + 5 = 55."
    }
  },
  {
    id: "tc_d11", domain: "DI & LR", examTag: "GRE General Rohtak / OMETs", penalty: "-1 Mark in MCQ",
    title: "Treating 'A is 2 places away from B' as 2 People Between A and B",
    trapScenario: "Placing two empty seats between A and B when a clue says 'A sits 2nd to the left of B'.",
    whyItFails: "'2nd to the left' means ONLY 1 person sits between them.",
    fixRule: "'nth to the left/right' always means (n - 1) people sitting between them.",
    miniDrill: {
      prompt: "In a linear row facing North, P is 4th to the left of Q. How many people sit strictly between P and Q?",
      options: ["4", "3", "5", "2"],
      answer: 1,
      explanation: "4th to the left means 4 - 1 = 3 people sit strictly between P and Q."
    }
  },
  {
    id: "tc_d12", domain: "DI & LR", examTag: "GRE General Rohtak / OMETs", penalty: "-1 Mark in MCQ",
    title: "Assuming Gender From Names in Blood Relation Puzzles",
    trapScenario: "Assuming 'Kiran' or 'Alex' is male/female without explicit relational proof.",
    whyItFails: "Exam setters deliberately use gender-neutral names to trap assumptions.",
    fixRule: "Assign + (male) or - (female) ONLY when stated via 'brother, sister, father, mother, son, daughter, husband, wife'.",
    miniDrill: {
      prompt: "P is the parent of Q, and Q is the sibling of R. R is the mother of S. How is Q related to S?",
      options: ["Uncle", "Aunt", "Uncle or Aunt (Gender of Q unknown)", "Father"],
      answer: 2,
      explanation: "Q's gender is never specified, so Q can be either S's maternal uncle or maternal aunt."
    }
  },
  {
    id: "tc_d13", domain: "DI & LR", examTag: "GRE General Rohtak / OMETs", penalty: "-1 Mark in MCQ",
    title: "Misreading 'Only A are B' in Syllogisms",
    trapScenario: "Translating 'Only managers are directors' as 'All managers are directors'.",
    whyItFails: "'Only A are B' reverses the universal quantifier to 'All B are A'.",
    fixRule: "'Only A are B' = 'All B are A' (and B cannot belong to any other category).",
    miniDrill: {
      prompt: "Statement: 'Only IIM graduates are eligible for this fellowship.' Which diagram relationship is valid?",
      options: ["All IIM graduates are eligible", "All eligible candidates are IIM graduates", "No IIM graduate is eligible", "Some eligible candidates are not IIM graduates"],
      answer: 1,
      explanation: "'Only A are B' translates strictly to 'All B are A'."
    }
  },
  {
    id: "tc_d14", domain: "DI & LR", examTag: "GRE General Rohtak / OMETs", penalty: "-1 Mark in MCQ",
    title: "Forgetting 1900 is NOT a Leap Year in Calendar Odd-Day Calculations",
    trapScenario: "Dividing 1900 by 4 and treating February 1900 as having 29 days.",
    whyItFails: "Century years (ending in 00) must be divisible by 400 to be leap years.",
    fixRule: "1600 and 2000 are leap years; 1700, 1800, and 1900 are ordinary years (365 days).",
    miniDrill: {
      prompt: "Which of the following years was NOT a leap year?",
      options: ["1600", "1800", "2000", "2024"],
      answer: 1,
      explanation: "1800 is a century year not divisible by 400, so it had 365 days."
    }
  },
  {
    id: "tc_d15", domain: "DI & LR", examTag: "GRE General Rohtak / OMETs", penalty: "-1 Mark in MCQ",
    title: "Using Straight Subtraction Instead of +1 in Rank-from-Both-Ends Problems",
    trapScenario: "Total 40 students, rank 15th from top -> Student computes 40 - 15 = 25th from bottom.",
    whyItFails: "Subtracting 15 removes the student themselves from the count.",
    fixRule: "Rank from other end = Total - Rank + 1 = 40 - 15 + 1 = 26th.",
    miniDrill: {
      prompt: "In a merit list of 60 candidates, Aarav ranks 22nd from the top. What is his rank from the bottom?",
      options: ["38th", "39th", "40th", "37th"],
      answer: 1,
      explanation: "60 - 22 + 1 = 39th."
    }
  },
  {
    id: "tc_d16", domain: "DI & LR", examTag: "GRE General Rohtak / OMETs", penalty: "-1 Mark in MCQ",
    title: "Forgetting Hour-Hand Drift in Clock Angle Calculations",
    trapScenario: "At 6:30, assuming the hour hand sits exactly on 6 and minute hand on 6 -> 0° angle.",
    whyItFails: "In 30 minutes, the hour hand advances 30 * 0.5° = 15° past 6.",
    fixRule: "Use exact formula: Angle = |30H - 5.5M| = |180 - 165| = 15°.",
    miniDrill: {
      prompt: "Find the angle between the hour hand and minute hand at 2:30 PM.",
      options: ["90°", "105°", "115°", "120°"],
      answer: 1,
      explanation: "|30(2) - 5.5(30)| = |60 - 165| = 105°."
    }
  },
  {
    id: "tc_d17", domain: "DI & LR", examTag: "GRE General Rohtak / OMETs", penalty: "-1 Mark in MCQ",
    title: "Stopping After Statement I Suffices in Data Sufficiency Without Testing Statement II",
    trapScenario: "Statement I alone works -> Student immediately picks 'Statement I alone' without checking if Statement II ALSO works alone.",
    whyItFails: "If both statements work independently, the correct option is 'Either Statement I alone OR Statement II alone'.",
    fixRule: "Always test Statement II independently even when Statement I is already sufficient.",
    miniDrill: {
      prompt: "What is the value of positive number x? (I) x^2 = 25. (II) 2x = 10.",
      options: ["I alone", "II alone", "Either Statement I alone or Statement II alone", "Both together"],
      answer: 2,
      explanation: "Since x > 0 is given, I gives x = 5 and II gives x = 5 -> Either alone suffices."
    }
  },
  {
    id: "tc_d18", domain: "DI & LR", examTag: "GRE General Rohtak / OMETs", penalty: "-1 Mark in MCQ",
    title: "Misinterpreting 'Neither Nor' vs 'Either Or' in Complementary Syllogism Pairs",
    trapScenario: "Marking 'Neither follows' when Conclusions I and II form a valid complementary pair ('Some A are B' + 'No A is B').",
    whyItFails: "In every Venn diagram, either some overlap exists or zero overlap exists—one of the two MUST hold.",
    fixRule: "When two individual conclusions are uncertain on their own but share the same subject/predicate as ('Some' + 'No') or ('All' + 'Some not'), pick 'Either I or II follows'.",
    miniDrill: {
      prompt: "Statements: Some books are novels. Some novels are poems. Conclusions: I. Some books are poems. II. No book is a poem.",
      options: ["Only I", "Only II", "Either I or II follows", "Both follow"],
      answer: 2,
      explanation: "'Some books are poems' and 'No book is a poem' form an exhaustive complementary pair -> Either I or II follows."
    }
  }
);
window.IPM_TRAPS_CLINIC.push(
  // +12 VARC & VOCAB TRAPS (Brings VARC & Vocab from 6 -> 18 Traps)
  {
    id: "tc_v07", domain: "VARC & Vocab", examTag: "GRE General / Rohtak", penalty: "-1 Mark in MCQ",
    title: "Using 'Less' Instead of 'Fewer' for Countable Plural Nouns",
    trapScenario: "'Less students appeared for the exam this year' / 'Fewer water was wasted.'",
    whyItFails: "'Fewer' modifies countable plurals (students, errors, questions); 'Less' modifies uncountable mass nouns (time, water, money).",
    fixRule: "If you can count it individually (1, 2, 3...), use FEWER; otherwise use LESS.",
    miniDrill: {
      prompt: "Select the grammatically accurate sentence:",
      options: ["There were less errors in the second mock.", "There were fewer errors in the second mock.", "We had fewer time to finish VARC.", "Fewer traffic was seen on Sunday."],
      answer: 1,
      explanation: "'Errors' is countable plural -> 'fewer errors'."
    }
  },
  {
    id: "tc_v08", domain: "VARC & Vocab", examTag: "GRE General / OMETs", penalty: "-1 Mark in MCQ",
    title: "Confusing 'Affect' (Verb) with 'Effect' (Noun)",
    trapScenario: "'How will the rate hike effect borrowers?' / 'The new policy had a positive affect.'",
    whyItFails: "Affect is almost always a verb (to influence); Effect is almost always a noun (result).",
    fixRule: "Remember RAVEN: Remember Affect Verb, Effect Noun.",
    miniDrill: {
      prompt: "Fill in: 'Supply chain disruptions will _______ margins, creating a lasting _______ on valuations.'",
      options: ["effect ... affect", "affect ... effect", "affect ... affect", "effect ... effect"],
      answer: 1,
      explanation: "Verb 'affect' (influence) + Noun 'effect' (result)."
    }
  },
  {
    id: "tc_v09", domain: "VARC & Vocab", examTag: "GRE General / Rohtak", penalty: "-1 Mark in MCQ",
    title: "Pronoun Case Error After Prepositions: 'Between You and I'",
    trapScenario: "'Between you and I, the DI set was tricky' / 'The prize was split between he and she.'",
    whyItFails: "Prepositions ('between, for, with, to') require objective pronouns ('me, him, her, us, them').",
    fixRule: "Always say 'Between you and ME' and 'for him and her'.",
    miniDrill: {
      prompt: "Identify the error: '(A) Just between / (B) you and I, / (C) the cutoff will rise / (D) by ten marks.'",
      options: ["(A)", "(B)", "(C)", "(D)"],
      answer: 1,
      explanation: "Change 'you and I' to objective case 'you and me' in (B)."
    }
  },
  {
    id: "tc_v10", domain: "VARC & Vocab", examTag: "GRE General VARC", penalty: "-1 Mark in MCQ",
    title: "Using Indicative 'Was' Instead of Subjunctive 'Were' in Hypothetical Wishes",
    trapScenario: "'If I was the RBI Governor, I would hold rates steady.'",
    whyItFails: "Contrary-to-fact wishes and hypothetical 'If' clauses require the subjunctive 'were'.",
    fixRule: "Use 'If I were...' / 'She spoke as though she were...' for unreal situations.",
    miniDrill: {
      prompt: "Choose the correct form: 'If the startup _______ profitable today, investors would double its valuation.'",
      options: ["was", "were", "is", "has been"],
      answer: 1,
      explanation: "Unreal present hypothetical requires subjunctive 'were'."
    }
  },
  {
    id: "tc_v11", domain: "VARC & Vocab", examTag: "GRE General 2026 Vocab", penalty: "-1 Mark in MCQ",
    title: "Homophone Confusion: 'Elicit' (Draw Out) vs. 'Illicit' (Illegal)",
    trapScenario: "'The survey failed to illicit honest feedback' / 'He was arrested for elicit trading.'",
    whyItFails: "Elicit is a verb meaning evoke/extract; Illicit is an adjective meaning unlawful.",
    fixRule: "Link 'ILlicit' with 'ILlegal'.",
    miniDrill: {
      prompt: "Fill in: 'The panel's probing questions were designed to _______ clear reasoning rather than _______ memorized definitions.'",
      options: ["illicit ... elicit", "elicit ... elicit", "elicit ... illicit", "illicit ... illicit"],
      answer: 1,
      explanation: "Both blanks require the verb 'elicit' (draw out)."
    }
  },
  {
    id: "tc_v12", domain: "VARC & Vocab", examTag: "GRE General 2026 Vocab", penalty: "-1 Mark in MCQ",
    title: "Confusing 'Complacent' (Smug) with 'Complaisant' (Eager to Please)",
    trapScenario: "'After topping one mock, he grew complaisant and stopped revising.'",
    whyItFails: "Smug self-satisfaction is 'complacent'; obliging/accommodating is 'complaisant'.",
    fixRule: "ComplaCent = Self-satisfied (think 'ConCeited').",
    miniDrill: {
      prompt: "Fill in: 'Market leaders often become _______ when they face no immediate startup competition.'",
      options: ["complaisant", "complacent", "credulous", "munificent"],
      answer: 1,
      explanation: "'Complacent' means smugly self-satisfied and uncritical."
    }
  },
  {
    id: "tc_v13", domain: "VARC & Vocab", examTag: "GRE General / Rohtak", penalty: "-1 Mark in MCQ",
    title: "Redundant Double Comparatives & Superlatives",
    trapScenario: "'This approach is more faster' / 'She is the most brightest candidate.'",
    whyItFails: "Adding 'more/most' before an '-er/-est' adjective creates grammatical redundancy.",
    fixRule: "Use either '-er/-est' OR 'more/most', never both together.",
    miniDrill: {
      prompt: "Spot the error: '(A) The revised algorithm / (B) is far more quicker / (C) at processing large tables / (D) than the legacy model.'",
      options: ["(A)", "(B)", "(C)", "(D)"],
      answer: 1,
      explanation: "Remove 'more' before 'quicker' in (B)."
    }
  },
  {
    id: "tc_v14", domain: "VARC & Vocab", examTag: "GRE General RC", penalty: "-1 Mark in MCQ",
    title: "Falling for Extreme Modifiers ('Always, Never, Only, Solely') in RC Options",
    trapScenario: "Passage says 'Tariffs often raise consumer prices' -> Student picks 'Tariffs ALWAYS cause hyperinflation.'",
    whyItFails: "Academic authors use hedged qualifiers ('often, tends to, may'); extreme options overstate the claim.",
    fixRule: "Eliminate options containing absolute absolutes ('always, never, completely, sole') unless explicitly proven in the text.",
    miniDrill: {
      prompt: "Passage: 'Sleep deprivation frequently impairs working memory.' Which option is safest?",
      options: ["Lack of sleep always destroys intelligence permanently.", "Insufficient sleep can negatively affect short-term cognitive recall.", "Only insomniacs suffer memory lapses.", "Sleep has no impact on analytical performance."],
      answer: 1,
      explanation: "Option B matches the hedged tone ('frequently impairs' -> 'can negatively affect')."
    }
  },
  {
    id: "tc_v15", domain: "VARC & Vocab", examTag: "GRE General Para-Jumbles", penalty: "-1 Mark in MCQ",
    title: "Starting a Para-Jumble with Demonstrative Pronouns ('This, These, Such, It')",
    trapScenario: "Placing 'This phenomenon has reshaped urban retail' as Sentence 1 of a Para-Jumble.",
    whyItFails: "A demonstrative pronoun requires an antecedent noun introduced in an earlier sentence.",
    fixRule: "Look for a standalone topic-introducing sentence with full nouns as your opening anchor.",
    miniDrill: {
      prompt: "Which sentence is the strongest OPENING sentence for a paragraph?",
      options: ["These reforms, however, faced stiff union resistance.", "Consequently, fiscal deficits narrowed by 1.2%.", "Quick-commerce platforms have transformed urban grocery delivery over the past three years.", "Such rapid expansion requires dense dark-store networks."],
      answer: 2,
      explanation: "Sentence C introduces the subject ('Quick-commerce platforms') without backward-referring pronouns."
    }
  },
  {
    id: "tc_v16", domain: "VARC & Vocab", examTag: "GRE General / OMETs", penalty: "-1 Mark in MCQ",
    title: "Using 'Despite of' Instead of 'Despite' or 'In Spite Of'",
    trapScenario: "'Despite of heavy rain, the candidates reached the test center on time.'",
    whyItFails: "'Despite' never takes 'of'; 'In spite' always takes 'of'.",
    fixRule: "Write 'Despite + Noun' OR 'In spite of + Noun'.",
    miniDrill: {
      prompt: "Select the grammatically correct sentence:",
      options: ["Despite of strict time limits, she solved all 20 questions.", "In spite strict time limits, she solved all 20 questions.", "Despite strict time limits, she solved all 20 questions.", "Despite of having strict time limits, she succeeded."],
      answer: 2,
      explanation: "'Despite' takes no preposition."
    }
  },
  {
    id: "tc_v17", domain: "VARC & Vocab", examTag: "GRE General / Rohtak", penalty: "-1 Mark in MCQ",
    title: "Verb Agreement with 'As Well As / Along With / Together With'",
    trapScenario: "'The CEO, along with the board members, were present at the AGM.'",
    whyItFails: "Parenthetical phrases introduced by 'along with / as well as' do NOT make a singular subject plural.",
    fixRule: "Match the verb strictly to the FIRST main subject ('The CEO ... was present').",
    miniDrill: {
      prompt: "Fill in: 'The professor, together with her research assistants, _____ publishing the findings next month.'",
      options: ["are", "is", "were", "have been"],
      answer: 1,
      explanation: "Main subject is singular 'The professor' -> 'is'."
    }
  },
  {
    id: "tc_v18", domain: "VARC & Vocab", examTag: "GRE General 2026 Vocab", penalty: "-1 Mark in MCQ",
    title: "Confusing 'Imminent' (About to Happen) with 'Eminent' (Famous) & 'Immanent' (Inherent)",
    trapScenario: "'An eminent recession is threatening export-driven economies.'",
    whyItFails: "Distinguished scholars are 'eminent'; an impending event is 'imminent'.",
    fixRule: "IMminent = IMpending; Eminent = Esteemed.",
    miniDrill: {
      prompt: "Fill in: 'The _______ economist warned that a sovereign debt default was _______ unless spending was curbed.'",
      options: ["imminent ... eminent", "eminent ... imminent", "immanent ... eminent", "eminent ... immanent"],
      answer: 1,
      explanation: "Distinguished ('eminent') economist warned default was impending ('imminent')."
    }
  }
);
