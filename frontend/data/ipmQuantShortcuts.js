window.IPM_QUANT_SHORTCUTS = {
  qc_01: {
    formulas: [
      { name: "Successive % Change", formula: "Net % = x + y + (xy / 100)", trick: "Equal +x% and -x% ALWAYS gives a net loss of (x^2 / 100)%." },
      { name: "Base-Shift Reversal", formula: "If A is +a/b more than B, B is -a/(b+a) less than A", trick: "+25% (+1/4) -> -20% (-1/5); +33.33% (+1/3) -> -25% (-1/4)." },
      { name: "Markup-Discount Chain", formula: "SP / CP = (1 + m/100) * (1 - d/100)", trick: "Profit % = [(1 + m/100)(1 - d/100) - 1] * 100. Never subtract d% from m% directly!" },
      { name: "Faulty Weight Profit", formula: "SP / CP = (True Weight / False Weight) * (1 + m/100)(1 - d/100)", trick: "Assume CP = Rs. 1/gram. Profit % = (Error / Delivered Weight) * 100." },
      { name: "2-Yr & 3-Yr CI - SI Gap", formula: "2-Yr: P(R/100)^2  |  3-Yr: P(R/100)^2 * (3 + R/100)", trick: "Use ratio (CI_2 - SI_2) / SI_1 = R / 200 to find rate R in 5 seconds." }
    ],
    extraDrills: [
      { id: "qc01_d1", type: "SA_NUMERIC", prompt: "[Speed Drill] If the price of petrol rises by 20%, by what exact percentage must a driver cut consumption so fuel spend increases by only 8%? (Enter number only)", answer: "10", explanation: "1.20 * (1 - r/100) = 1.08 => 1 - r/100 = 1.08/1.20 = 0.90 => r = 10%." },
      { id: "qc01_d2", type: "MCQ", prompt: "[Speed Drill] A shopkeeper sells two laptops at Rs. 48,000 each—gaining 20% on one and losing 20% on the other. What is his overall profit or loss percentage?", options: ["No profit, no loss", "4% loss", "4% profit", "2% loss"], answer: 1, explanation: "When SP is identical and gain % = loss % = x%, there is ALWAYS a net loss of (x^2 / 100)% = 400/100 = 4% loss." }
    ]
  },
  qc_02: {
    formulas: [
      { name: "Alligation Cross-Ratio", formula: "Qty(Cheaper) : Qty(Dearer) = (Dearer - Mean) : (Mean - Cheaper)", trick: "Ensure all three values are in identical units (all CP or all % solute) before cross-subtracting." },
      { name: "Repeated Replacement", formula: "Final Pure = Initial * (1 - Removed / Total)^n", trick: "Always track the component NOT being added in each replacement step." },
      { name: "Partnership Profit Split", formula: "Profit Ratio = (C1 * T1) : (C2 * T2) : (C3 * T3)", trick: "Divide capitals by 1,000 and months by GCD first to avoid large multiplications." },
      { name: "Componendo-Dividendo", formula: "If a/b = c/d, then (a + b)/(a - b) = (c + d)/(c - d)", trick: "Applies instantly whenever an equation has identical numerator/denominator terms with + and - signs." }
    ],
    extraDrills: [
      { id: "qc02_d1", type: "SA_NUMERIC", prompt: "[Speed Drill] Pure milk costs Rs. 50/liter. How many liters of water must be mixed with 24 liters of pure milk so the mixture is worth Rs. 40/liter?", answer: "6", explanation: "Water (Rs. 0) : Milk (Rs. 50) for Mean Rs. 40 = (50 - 40) : (40 - 0) = 10 : 40 = 1 : 4. For 24L milk, water = 24 / 4 = 6 liters." },
      { id: "qc02_d2", type: "MCQ", prompt: "[Speed Drill] A, B, and C enter a partnership with capitals in ratio 1/2 : 1/3 : 1/4. After 4 months, A doubles his capital. What is A's share in a total annual profit of Rs. 51,000?", options: ["Rs. 24,000", "Rs. 30,000", "Rs. 20,000", "Rs. 27,000"], answer: 1, explanation: "Initial ratio 6:4:3. Annual weights: A = 6*4 + 12*8 = 120; B = 4*12 = 48; C = 3*12 = 36 => Ratio = 10 : 4 : 3 (sum = 17). A's share = (10/17) * 51,000 = Rs. 30,000." }
    ]
  },
  qc_03: {
    formulas: [
      { name: "Harmonic Mean Avg Speed", formula: "Avg Speed (equal distances) = 2xy / (x + y)", trick: "For 3 equal distances at x, y, z: Avg Speed = 3xyz / (xy + yz + zx)." },
      { name: "Meeting Point Theorem", formula: "S1 / S2 = sqrt(t2 / t1)", trick: "Applies when two bodies start together, cross each other, and take t1, t2 hours thereafter." },
      { name: "Stoppage Time Per Hour", formula: "Stoppage Mins/Hr = [(S_fast - S_slow) / S_fast] * 60", trick: "Direct 5-second formula—no need to assume route distance." },
      { name: "Circular Track Meetings", formula: "Distinct Points = |a - b| (same dir) or (a + b) (opposite dir)", trick: "Reduce speed ratio S1 : S2 to lowest integer ratio a : b first." },
      { name: "Boats & Streams Shortcut", formula: "Time Ratio (Up : Down) = (B + S) : (B - S)", trick: "If downstream time is half of upstream time, B : S = 3 : 1 immediately." }
    ],
    extraDrills: [
      { id: "qc03_d1", type: "SA_NUMERIC", prompt: "[Speed Drill] A car travels from A to B at 60 km/h and returns from B to A at 90 km/h. What is its average speed (in km/h) for the entire round trip?", answer: "72", explanation: "Harmonic Mean = 2 * 60 * 90 / (60 + 90) = 10800 / 150 = 72 km/h." },
      { id: "qc03_d2", type: "MCQ", prompt: "[Speed Drill] 12 men or 18 women can complete a field harvest in 14 days. In how many days will 8 men and 16 women finish the same work?", options: ["8 days", "9 days", "10 days", "12 days"], answer: 1, explanation: "12M = 18W => 2M = 3W => 8M = 12W. Total workforce = 12W + 16W = 28W. Days = (18 * 14) / 28 = 9 days." }
    ]
  },
  qc_04: {
    formulas: [
      { name: "Factor Count & Product", formula: "Factors of p^a * q^b = (a+1)(b+1);  Product of all factors = N^(Total Factors / 2)", trick: "Odd total factors happens ONLY when N is a perfect square!" },
      { name: "Legendre's Factorial Power", formula: "Power of prime p in n! = floor(n/p) + floor(n/p^2) + floor(n/p^3) + ...", trick: "For trailing zeros in n!, only count powers of 5 (since 2s are always abundant)." },
      { name: "Fermat's Remainder Rule", formula: "a^(p-1) ≡ 1 (mod p) for prime p not dividing a", trick: "Divide the exponent by (p - 1) and keep only the remainder." },
      { name: "Right-Triangle Inradius", formula: "r = (a + b - c) / 2;   Circumradius R = c / 2", trick: "Applies exclusively to right triangles with legs a, b and hypotenuse c." }
    ],
    extraDrills: [
      { id: "qc04_d1", type: "SA_NUMERIC", prompt: "[Speed Drill] What is the highest power of 3 that divides 85! completely?", answer: "41", explanation: "floor(85/3) + floor(85/9) + floor(85/27) + floor(85/81) = 28 + 9 + 3 + 1 = 41." },
      { id: "qc04_d2", type: "MCQ", prompt: "[Speed Drill] How many positive factors of 360 are perfect squares?", options: ["3", "4", "6", "8"], answer: 1, explanation: "360 = 2^3 * 3^2 * 5^1. Even powers of 2: {2^0, 2^2} (2 choices); even powers of 3: {3^0, 3^2} (2 choices); 5: {5^0} (1 choice). Total = 2 * 2 * 1 = 4." }
    ]
  },
  qc_05: {
    formulas: [
      { name: "Symmetric Root Identities", formula: "α^2 + β^2 = S^2 - 2P;   α^3 + β^3 = S^3 - 3SP;   |α - β| = sqrt(D)/|a|", trick: "Here S = -b/a and P = c/a. Never solve for irrational roots!" },
      { name: "Reciprocal & Shifted Roots", formula: "Roots 1/α, 1/β => cx^2 + bx + a = 0;  Roots (α+k), (β+k) => a(x-k)^2 + b(x-k) + c = 0", trick: "For reciprocal roots, simply reverse the order of coefficients a, b, c." },
      { name: "Quadratic Extrema", formula: "Vertex x = -b / (2a);   Extreme Value = (4ac - b^2) / (4a)", trick: "Minimum if a > 0; Maximum if a < 0." },
      { name: "Modulus Sum Minimum", formula: "Min of |x - a1| + |x - a2| + ... + |x - an| occurs at the MEDIAN of {a1, ..., an}", trick: "Sort the critical points a1 <= a2 <= ... <= an and substitute x = median immediately." }
    ],
    extraDrills: [
      { id: "qc05_d1", type: "SA_NUMERIC", prompt: "[Speed Drill] Find the minimum value of f(x) = |x - 1| + |x - 4| + |x - 10| for all real values of x.", answer: "9", explanation: "Sorted points: 1, 4, 10. Minimum occurs at median x = 4: |4-1| + |4-4| + |4-10| = 3 + 0 + 6 = 9." },
      { id: "qc05_d2", type: "MCQ", prompt: "[Speed Drill] If the roots of x^2 - px + 8 = 0 differ by 2, what is the value of p^2?", options: ["32", "36", "40", "48"], answer: 1, explanation: "|α - β| = sqrt(p^2 - 32) = 2 => p^2 - 32 = 4 => p^2 = 36." }
    ]
  },
  hm_01: {
    formulas: [
      { name: "Log Base-Change & Power Pull", formula: "log_(b^k)(a^m) = (m / k) * log_b(a)", trick: "Telescoping product: log_a(b) * log_b(c) * log_c(d) = log_a(d)." },
      { name: "Characteristic & Digits", formula: "Digits in a^n = floor(n * log_10(a)) + 1", trick: "Memorize log_10(2) ≈ 0.3010 and log_10(3) ≈ 0.4771 for GRE General SA." },
      { name: "AM >= GM Minimization", formula: "Min of a*x + b/x (x > 0) = 2 * sqrt(a * b)", trick: "Attained when both terms are equal: a*x = b/x." },
      { name: "AP Middle-Term Sum", formula: "Sum of n terms of AP (odd n) = n * (Middle Term)", trick: "If sum of 9 terms of an AP is 180, the 5th term is immediately 180/9 = 20." }
    ],
    extraDrills: [
      { id: "hm01_d1", type: "SA_NUMERIC", prompt: "[Speed Drill] If the sum of the first 11 terms of an Arithmetic Progression is 275, what is the 6th term of the progression?", answer: "25", explanation: "For 11 terms, the 6th term is the exact middle term: T6 = S11 / 11 = 275 / 11 = 25." },
      { id: "hm01_d2", type: "MCQ", prompt: "[Speed Drill] What is the value of 1/log_2(60) + 1/log_3(60) + 1/log_10(60)?", options: ["0", "1", "2", "60"], answer: 1, explanation: "Using 1/log_b(60) = log_60(b): log_60(2) + log_60(3) + log_60(10) = log_60(2 * 3 * 10) = log_60(60) = 1." }
    ]
  },
  hm_02: {
    formulas: [
      { name: "Stars & Bars Distribution", formula: "Non-negative: C(n + r - 1, r - 1)  |  Positive (>=1): C(n - 1, r - 1)", trick: "Applies to distributing n IDENTICAL objects into r DISTINCT boxes." },
      { name: "Circular Arrangements", formula: "Distinct persons: (n - 1)!  |  Necklace/Garland (clockwise = anti): (n - 1)! / 2", trick: "Fix 1 person to break rotational symmetry, then arrange remaining (n-1) linearly." },
      { name: "Total Selections from n Items", formula: "At least 1 from n distinct = 2^n - 1  |  From identical p, q, r = (p+1)(q+1)(r+1) - 1", trick: "Identical item selection mirrors the divisor-counting formula!" },
      { name: "Derangements D_n", formula: "D_2 = 1,  D_3 = 2,  D_4 = 9,  D_5 = 44", trick: "Memorize D_3=2 and D_4=9—saves 60 seconds in GRE General." }
    ],
    extraDrills: [
      { id: "hm02_d1", type: "SA_NUMERIC", prompt: "[Speed Drill] How many positive integer solutions exist for x + y + z + w = 10?", answer: "84", explanation: "Positive solutions: C(10 - 1, 4 - 1) = C(9, 3) = (9 * 8 * 7) / 6 = 84." },
      { id: "hm02_d2", type: "MCQ", prompt: "[Speed Drill] A bag has 5 identical red balls and 4 identical blue balls. In how many ways can a student select AT LEAST ONE ball?", options: ["19", "20", "29", "30"], answer: 2, explanation: "(5 + 1)(4 + 1) - 1 = 6 * 5 - 1 = 29 ways." }
    ]
  },
  hm_03: {
    formulas: [
      { name: "Determinant & Adjoint Laws", formula: "|kA| = k^n |A|;   |adj(A)| = |A|^(n-1);   |adj(adj(A))| = |A|^((n-1)^2)", trick: "Always check matrix order n (usually 3) before raising to powers!" },
      { name: "Skew-Symmetric Determinant", formula: "Determinant of any ODD-order skew-symmetric matrix is ALWAYS 0", trick: "Instant 2-second answer whenever A^T = -A and n = 3 or 5." },
      { name: "Number of Functions", formula: "Total functions A -> B = n(B)^n(A);   One-one functions = P(n(B), n(A))", trick: "For n(A) = n(B) = n, number of bijective (one-one & onto) functions is n!." },
      { name: "L'Hopital's Limit Shortcut", formula: "For 0/0 or inf/inf forms: lim f(x)/g(x) = lim f'(x)/g'(x)", trick: "Differentiate numerator and denominator separately until indeterminate form clears." }
    ],
    extraDrills: [
      { id: "hm03_d1", type: "SA_NUMERIC", prompt: "[Speed Drill] If A is a 3 x 3 matrix with det(A) = 5, what is the value of det(adj(A))?", answer: "25", explanation: "det(adj(A)) = det(A)^(3-1) = 5^2 = 25." },
      { id: "hm03_d2", type: "MCQ", prompt: "[Speed Drill] Set A has 3 elements and Set B has 4 elements. How many total functions can be defined from A to B?", options: ["12", "24", "64", "81"], answer: 2, explanation: "Each of the 3 elements in A has 4 choices in B => 4^3 = 64 functions." }
    ]
  },
  hm_04: {
    formulas: [
      { name: "Linear Rescaling Y = aX + b", formula: "Mean(Y) = a*Mean(X) + b;   SD(Y) = |a|*SD(X);   Var(Y) = a^2 * Var(X)", trick: "Origin shift (+b) NEVER changes SD, Variance, Range, or IQR." },
      { name: "Empirical Skewness Relation", formula: "Mode ≈ 3 * Median - 2 * Mean", trick: "Useful in IIMB UG Economics/Data Science descriptive statistics questions." },
      { name: "First n Natural Numbers", formula: "Mean = (n + 1) / 2;   Variance = (n^2 - 1) / 12", trick: "For {1..7}, Mean = 4 and Variance = (49 - 1)/12 = 4 (SD = 2)." },
      { name: "Coefficient of Variation", formula: "CV = (SD / Mean) * 100", trick: "Lower CV means higher consistency/stability across two datasets." }
    ],
    extraDrills: [
      { id: "hm04_d1", type: "SA_NUMERIC", prompt: "[Speed Drill] What is the variance of the first 7 natural numbers {1, 2, 3, 4, 5, 6, 7}?", answer: "4", explanation: "Variance of first n natural numbers = (n^2 - 1) / 12 = (49 - 1) / 12 = 48 / 12 = 4." },
      { id: "hm04_d2", type: "MCQ", prompt: "[Speed Drill] If every value in a dataset with Standard Deviation 8 is divided by 2 and increased by 15, what is the new Standard Deviation?", options: ["4", "19", "11", "2"], answer: 0, explanation: "SD scales by |1/2| = 0.5 and ignores +15 => New SD = 8 / 2 = 4." }
    ]
  }
};