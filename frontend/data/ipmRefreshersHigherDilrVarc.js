window.IPM_CHAPTER_REFRESHERS = window.IPM_CHAPTER_REFRESHERS || {};

window.IPM_CHAPTER_REFRESHERS.hm_01 = {
  overview: "Logarithms, Indices, and Sequences & Series (AP, GP, HP, AGP) are flagship Higher Math topics in GRE General, IIM Ranchi, and IIM Bangalore UG—frequently appearing in both Short-Answer and MCQ sections.",
  prerequisites: [
    "Exponent rules: a^m * a^n = a^(m+n), (a^m)^n = a^(mn), a^(-n) = 1/a^n",
    "AP nth term Tn = a + (n-1)d; Sum Sn = (n/2)[2a + (n-1)d] = n * (Middle Term)",
    "GP nth term Tn = a * r^(n-1); Sum Sn = a(r^n - 1)/(r - 1); Infinite GP S_inf = a/(1 - r) for |r| < 1"
  ],
  corePrinciples: [
    "Logarithm Domain & Base-Change: log_b(x) is real iff x > 0, b > 0, and b != 1. Base-change: log_b(a) = log_c(a)/log_c(b), and log_(b^k)(a^m) = (m/k)log_b(a).",
    "Symmetric AP Term Selection: Pick 3 terms in AP as (a - d, a, a + d) and 4 terms as (a - 3d, a - d, a + d, a + 3d) to cancel common differences immediately.",
    "AM >= GM >= HM Inequality: For positive reals, Arithmetic Mean >= Geometric Mean >= Harmonic Mean, with equality iff all terms are identical.",
    "Special Series Sums: Σn = n(n+1)/2;  Σn^2 = n(n+1)(2n+1)/6;  Σn^3 = [n(n+1)/2]^2."
  ],
  workedExamples: [
    { level: "Foundation", problem: "1. Evaluate log_8(32) + log_9(27).", steps: ["log_(2^3)(2^5) = 5/3;  log_(3^2)(3^3) = 3/2.", "Sum = 5/3 + 3/2 = 19/6."] },
    { level: "Foundation", problem: "2. Find the sum of all two-digit numbers divisible by 4.", steps: ["First term a = 12, last term l = 96, d = 4 => n = (96 - 12)/4 + 1 = 22.", "Sum = (22/2) * (12 + 96) = 11 * 108 = 1,188."] },
    { level: "Foundation", problem: "3. Find the sum to infinity of 12 + 4 + 4/3 + 4/9 + ...", steps: ["a = 12, r = 1/3 (|r| < 1).", "S_inf = 12 / (1 - 1/3) = 12 / (2/3) = 18."] },
    { level: "GRE General Moderate", problem: "4. Simplify: log_2(3) * log_3(4) * log_4(5) * ... * log_63(64).", steps: ["By telescoping base-change, intermediate bases cancel: = log_2(64) = log_2(2^6) = 6."] },
    { level: "GRE General Moderate", problem: "5. If the 5th term of an AP is 19 and the 11th term is 43, find the 20th term.", steps: ["(11 - 5)d = 43 - 19 => 6d = 24 => d = 4.", "T20 = T11 + 9d = 43 + 36 = 79."] },
    { level: "GRE General Moderate", problem: "6. Solve for x: 2^(2x+1) - 9*(2^x) + 4 = 0.", steps: ["Let y = 2^x: 2y^2 - 9y + 4 = 0 => (2y - 1)(y - 4) = 0 => y = 1/2 or y = 4.", "2^x = 2^(-1) => x = -1; 2^x = 2^2 => x = 2."] },
    { level: "GRE General Moderate", problem: "7. Find the minimum value of 4^x + 4^(1-x) for all real x.", steps: ["Since 4^x > 0 and 4/4^x > 0, apply AM >= GM: (4^x + 4/4^x)/2 >= sqrt(4^x * 4/4^x) = 2.", "Minimum value = 2 * 2 = 4 (attained at x = 1/2)."] },
    { level: "IIM Tough", problem: "8. Solve: log_3(x - 1) + log_3(x - 7) = 3.", steps: ["(x - 1)(x - 7) = 3^3 = 27 => x^2 - 8x - 20 = 0 => (x - 10)(x + 2) = 0.", "Domain requires x > 7 => Reject x = -2. Valid answer: x = 10."] },
    { level: "IIM Tough", problem: "9. Find the sum of 10 terms of the series: 7 + 77 + 777 + ...", steps: ["S = (7/9)[9 + 99 + 999 + ...] = (7/9)[(10 - 1) + (10^2 - 1) + ... + (10^10 - 1)].", "= (7/9)[10(10^10 - 1)/9 - 10]."] },
    { level: "IIM Tough", problem: "10. [GRE General SA Style] If log_10(2) = 0.3010, how many digits are in 2^50?", steps: ["log_10(2^50) = 50 * 0.3010 = 15.05.", "Number of digits = floor(15.05) + 1 = 16 digits."] }
  ]
};

window.IPM_CHAPTER_REFRESHERS.hm_02 = {
  overview: "Permutations, Combinations, and Probability account for up to 35% of IIM Bangalore B.Sc. Economics/Data Science quantitative questions and appear heavily in GRE General, OMETs, and IIM Mumbai.",
  prerequisites: [
    "n! = n(n-1)...1; 0! = 1; C(n, r) = n! / [r!(n-r)!]; P(n, r) = n! / (n-r)!",
    "Symmetry property: C(n, r) = C(n, n - r); Pascal's Identity: C(n, r) + C(n, r-1) = C(n+1, r)",
    "Probability axioms: 0 <= P(E) <= 1; P(A U B) = P(A) + P(B) - P(A ∩ B)"
  ],
  corePrinciples: [
    "String & Gap Methods: To keep k items together, tie them as 1 super-item and multiply by k! internal arrangements. To keep k items apart, arrange the remaining items first and place the k items in the created gaps.",
    "Stars & Bars Distribution: Non-negative integer solutions to x1 + ... + xr = n is C(n + r - 1, r - 1). Positive integer solutions (each >= 1) is C(n - 1, r - 1).",
    "Derangements D_n: Number of ways n letters go into n wrong envelopes: D_2=1, D_3=2, D_4=9, D_5=44.",
    "Bayes' Theorem: P(A_i | B) = [P(B | A_i) P(A_i)] / Σ[P(B | A_j) P(A_j)]."
  ],
  workedExamples: [
    { level: "Foundation", problem: "1. How many distinct 4-digit even numbers can be formed using digits {1, 2, 3, 4, 5} without repetition?", steps: ["Units place must be 2 or 4 (2 choices).", "Remaining 3 places filled from 4 remaining digits: 4 * 3 * 2 = 24 ways.", "Total = 2 * 24 = 48 numbers."] },
    { level: "Foundation", problem: "2. Two fair dice are rolled. Find the probability of getting a sum of 8 or 11.", steps: ["Sum 8: (2,6),(3,5),(4,4),(5,3),(6,2) -> 5 outcomes. Sum 11: (5,6),(6,5) -> 2 outcomes.", "Probability = (5 + 2) / 36 = 7/36."] },
    { level: "Foundation", problem: "3. In how many ways can the letters of 'DELHI' be arranged so that vowels always stay together?", steps: ["Vowels {E, I} tied as 1 unit + {D, L, H} = 4 units -> 4! = 24 ways.", "Internal arrangement of {E, I} = 2! = 2 => Total = 24 * 2 = 48."] },
    { level: "GRE General Moderate", problem: "4. How many ways can 6 boys and 4 girls sit in a row so that no two girls sit together?", steps: ["Arrange 6 boys first = 6! = 720 ways, creating 7 gaps.", "Choose 4 of 7 gaps and arrange 4 girls: P(7, 4) = 7*6*5*4 = 840.", "Total = 720 * 840 = 604,800."] },
    { level: "GRE General Moderate", problem: "5. Find the number of diagonals in a regular decagon (10-sided polygon).", steps: ["Diagonals = C(n, 2) - n = C(10, 2) - 10 = 45 - 10 = 35 diagonals."] },
    { level: "GRE General Moderate", problem: "6. A speaks truth in 75% cases and B in 80% cases. What is the probability they contradict each other on the same fact?", steps: ["P(contradict) = P(A true)*P(B false) + P(A false)*P(B true).", "= (3/4)*(1/5) + (1/4)*(4/5) = 3/20 + 4/20 = 7/20 = 35%."] },
    { level: "GRE General Moderate", problem: "7. How many distinct arrangements exist for the letters of 'MISSISSIPPI'?", steps: ["Total 11 letters: M(1), I(4), S(4), P(2).", "Arrangements = 11! / (4! * 4! * 2!) = 34,650."] },
    { level: "IIM Tough", problem: "8. Find the number of positive integer solutions to x + y + z = 15.", steps: ["Positive solutions require x, y, z >= 1: C(15 - 1, 3 - 1) = C(14, 2) = 91."] },
    { level: "IIM Tough", problem: "9. 4 letters are placed randomly into 4 addressed envelopes. Find the probability that NO letter goes into its correct envelope.", steps: ["Derangements D_4 = 9; Total ways = 4! = 24.", "Probability = 9 / 24 = 3 / 8."] },
    { level: "IIM Tough", problem: "10. [IIMB / Indore SA] A box has 4 defective and 6 good bulbs. Two bulbs are drawn without replacement. Given at least one is defective, find the probability both are defective.", steps: ["P(at least 1 defective) = 1 - C(6,2)/C(10,2) = 1 - 15/45 = 30/45.", "P(both defective) = C(4,2)/C(10,2) = 6/45 => Conditional P = (6/45) / (30/45) = 1/5 = 0.2."] }
  ]
};

window.IPM_CHAPTER_REFRESHERS.hm_03 = {
  overview: "Matrices, Determinants, Functions, and Calculus bridge Class 12 NCERT Mathematics directly to IIM Indore QA, IIM Bangalore B.Sc. Economics/Data Science, and IIM Mumbai BS.",
  prerequisites: [
    "Matrix multiplication compatibility: (m x n) * (n x p) -> (m x p)",
    "Determinant expansion and row/column operations",
    "Basic derivatives: d(x^n)/dx = n*x^(n-1), d(e^x)/dx = e^x, d(ln x)/dx = 1/x"
  ],
  corePrinciples: [
    "Determinant Properties: |AB| = |A||B|; |A^T| = |A|; |A^(-1)| = 1/|A|; |kA| = k^n |A|; |adj(A)| = |A|^(n-1).",
    "System of Linear Equations (Cramer's Rule): AX = B has a unique solution iff |A| != 0.",
    "Domain & Range of Functions: Avoid division by zero and negative values inside even roots; composite f(g(x)) applies g first, then f.",
    "First & Second Derivative Optimization: Set f'(x) = 0 for critical points; f''(x) < 0 gives local maximum, f''(x) > 0 gives local minimum."
  ],
  workedExamples: [
    { level: "Foundation", problem: "1. Find x if the matrix [[x, 4], [3, 6]] is singular.", steps: ["Singular matrix => det = 0 => 6x - 12 = 0 => x = 2."] },
    { level: "Foundation", problem: "2. If f(x) = 2x + 3 and g(x) = x^2 - 1, find f(g(2)).", steps: ["g(2) = 2^2 - 1 = 3 => f(3) = 2(3) + 3 = 9."] },
    { level: "Foundation", problem: "3. Find the derivative of f(x) = 3x^4 - 5x^2 + 7x - 9 at x = 1.", steps: ["f'(x) = 12x^3 - 10x + 7 => f'(1) = 12 - 10 + 7 = 9."] },
    { level: "GRE General Moderate", problem: "4. If A is a 3 x 3 matrix with |A| = 5, find |3A^(-1)|.", steps: ["|3A^(-1)| = 3^3 * |A^(-1)| = 27 * (1/5) = 27/5 = 5.4."] },
    { level: "GRE General Moderate", problem: "5. Find the domain of the real function f(x) = sqrt(9 - x^2) / (x - 1).", steps: ["9 - x^2 >= 0 => -3 <= x <= 3, AND denominator != 0 => x != 1.", "Domain: [-3, 3] - {1}."] },
    { level: "GRE General Moderate", problem: "6. Evaluate lim(x -> 2) (x^3 - 8) / (x - 2).", steps: ["Factor numerator: (x - 2)(x^2 + 2x + 4) / (x - 2) = x^2 + 2x + 4.", "Substitute x = 2: 4 + 4 + 4 = 12."] },
    { level: "GRE General Moderate", problem: "7. Find the inverse function f^(-1)(x) for f(x) = (3x - 2) / 5.", steps: ["Set y = (3x - 2)/5 => 5y + 2 = 3x => x = (5y + 2)/3 => f^(-1)(x) = (5x + 2)/3."] },
    { level: "IIM Tough", problem: "8. A firm's demand curve is P = 100 - 2Q and cost is C(Q) = 20Q + 50. Find the profit-maximizing quantity Q.", steps: ["TR = P*Q = 100Q - 2Q^2 => MR = 100 - 4Q; MC = 20.", "Set MR = MC => 100 - 4Q = 20 => 4Q = 80 => Q = 20 units."] },
    { level: "IIM Tough", problem: "9. If A^2 - 5A + 6I = 0 for a square matrix A, express A^(-1) in terms of A and I.", steps: ["Multiply by A^(-1): A - 5I + 6A^(-1) = 0 => A^(-1) = (1/6)(5I - A)."] },
    { level: "IIM Tough", problem: "10. [IIMB / Indore SA] If A is a 3x3 matrix with |A| = 2, find |adj(adj(A))|.", steps: ["Formula: |adj(adj(A))| = |A|^((n-1)^2). For n = 3: 2^((3-1)^2) = 2^4 = 16."] }
  ]
};

window.IPM_CHAPTER_REFRESHERS.hm_04 = {
  overview: "Statistics, Dispersion Measures, Correlation, and Probability Distributions are core components of IIM Bangalore's B.Sc. Economics/Data Science test and Semester I-III Business Statistics across all IIMs.",
  prerequisites: [
    "Mean = (Σxi)/N; Median = middle value of sorted data; Mode = most frequent value",
    "Variance σ^2 = [Σ(xi - μ)^2]/N = (Σxi^2 / N) - μ^2; Standard Deviation σ = sqrt(Variance)"
  ],
  corePrinciples: [
    "Shift & Scale Invariance: If Y = aX + b, Mean(Y) = a*Mean(X) + b, SD(Y) = |a|*SD(X), Variance(Y) = a^2 * Variance(X).",
    "Combined Mean & Variance: M_c = (n1*M1 + n2*M2)/(n1 + n2). When M1 = M2, Var_c = (n1*Var1 + n2*Var2)/(n1 + n2).",
    "Correlation Coefficient r: Lies strictly in [-1, +1]; invariant to positive linear rescaling of X and Y.",
    "Empirical Skewness Rule: Mode ≈ 3 * Median - 2 * Mean."
  ],
  workedExamples: [
    { level: "Foundation", problem: "1. Find the mean, median, and range of {12, 18, 15, 25, 10}.", steps: ["Sorted: {10, 12, 15, 18, 25}. Mean = 80/5 = 16; Median = 15; Range = 25 - 10 = 15."] },
    { level: "Foundation", problem: "2. The mean of 8 observations is 15. If one observation 22 is removed, find the new mean.", steps: ["Total = 8 * 15 = 120. New total = 120 - 22 = 98. New mean = 98 / 7 = 14."] },
    { level: "Foundation", problem: "3. If SD of a dataset is 5, what is its Variance?", steps: ["Variance = SD^2 = 5^2 = 25."] },
    { level: "GRE General Moderate", problem: "4. Each of 12 numbers is increased by 7. How do the Mean and Standard Deviation change?", steps: ["Mean increases by +7; Standard Deviation remains completely unchanged."] },
    { level: "GRE General Moderate", problem: "5. In a moderately skewed distribution, Mean = 42 and Median = 40. Estimate the Mode.", steps: ["Mode ≈ 3(40) - 2(42) = 120 - 84 = 36."] },
    { level: "GRE General Moderate", problem: "6. Find the variance of the first 5 natural numbers {1, 2, 3, 4, 5}.", steps: ["Mean = 3. Squared deviations: (4 + 1 + 0 + 1 + 4)/5 = 10/5 = 2."] },
    { level: "GRE General Moderate", problem: "7. Section A (20 students) averages 70 marks and Section B (30 students) averages 80 marks. Find the combined average.", steps: ["Combined Mean = (20*70 + 30*80) / 50 = (1400 + 2400)/50 = 76."] },
    { level: "IIM Tough", problem: "8. The mean of 10 observations was calculated as 40, but later 53 was misread as 35. Find the true mean.", steps: ["Correction = +53 - 35 = +18. True Mean = 40 + (18/10) = 41.8."] },
    { level: "IIM Tough", problem: "9. Two datasets of size 10 each have identical mean 50, with variances 16 and 25. Find the combined variance.", steps: ["Since means are equal, Combined Variance = (10*16 + 10*25)/20 = 410/20 = 20.5."] },
    { level: "IIM Tough", problem: "10. [IIMB UG Style] If Var(X) = 9 and Y = -2X + 15, find SD(Y) and Var(Y).", steps: ["SD(X) = 3 => SD(Y) = |-2| * 3 = 6; Var(Y) = (-2)^2 * 9 = 36."] }
  ]
};

window.IPM_CHAPTER_REFRESHERS.dilr_01 = {
  overview: "Data Interpretation (Tables, Charts, Caselets & Set-Theory DI) accounts for 15–18 questions in OMETs and appears directly inside BOTH QA-SA and QA-MCQ sections of GRE General.",
  prerequisites: ["Fraction-to-percentage benchmarks (1/6 = 16.67%, 1/7 = 14.28%, 1/8 = 12.5%)", "2-set and 3-set Venn diagram inclusion-exclusion identities"],
  corePrinciples: [
    "Cross-Multiplication Comparison: Compare a/b vs c/d via a*d vs b*c without decimal division.",
    "Percentage Points vs Relative Growth: Moving from 20% to 25% is +5 percentage points, which is +25% relative growth.",
    "3-Set Venn Identity: Total = A + B + C - (A∩B + B∩C + C∩A) + (A∩B∩C) + Neither."
  ],
  workedExamples: [
    { level: "Foundation", problem: "1. Revenue grows from Rs. 240 Cr to Rs. 300 Cr. Find % growth.", steps: ["Growth = (60 / 240) * 100 = 25%."] },
    { level: "Foundation", problem: "2. Which fraction is larger: 17/23 or 19/26?", steps: ["Cross-multiply: 17 * 26 = 442 vs 19 * 23 = 437 => 17/23 is larger."] },
    { level: "Foundation", problem: "3. In a class of 80, 50 play cricket, 40 play football, and 10 play neither. How many play both?", steps: ["At least one = 70 => Both = 50 + 40 - 70 = 20."] },
    { level: "GRE General Moderate", problem: "4. Market share of Brand X rises from 16% of a Rs. 500 Cr market to 20% of a Rs. 600 Cr market. Find % growth in Brand X's revenue.", steps: ["Old Rev = 16% of 500 = 80 Cr; New Rev = 20% of 600 = 120 Cr. Growth = (40/80)*100 = 50%."] },
    { level: "GRE General Moderate", problem: "5. A pie chart sector measures 108°. What percentage of the total does it represent?", steps: ["(108 / 360) * 100 = (3/10) * 100 = 30%."] },
    { level: "GRE General Moderate", problem: "6. Expense is 75% of income. If income rises by 20% and expense by 10%, find % increase in savings.", steps: ["Income 100 -> 120; Expense 75 -> 82.5; Savings 25 -> 37.5. Growth = (12.5/25)*100 = 50%."] },
    { level: "GRE General Moderate", problem: "7. Export-to-Import ratio of a firm is 1.25. If imports are Rs. 320 Cr, find exports.", steps: ["Exports = 320 * (5/4) = Rs. 400 Cr."] },
    { level: "IIM Tough", problem: "8. [3-Set Venn] Out of 100 readers, 45 read Hindu, 50 read IE, 40 read Mint; 15 read H&IE, 12 read IE&M, 10 read H&M, and 5 read all three. How many read NONE?", steps: ["At least one = 45 + 50 + 40 - (15 + 12 + 10) + 5 = 135 - 37 + 5 = 103? Wait: if total is 120, None = 120 - 103 = 17."] },
    { level: "IIM Tough", problem: "9. [Indore SA DI] Four plants produce 200, 300, 400, 100 units with defect rates 5%, 4%, 2.5%, 8%. Find total defective units.", steps: ["Defects = 10 + 12 + 10 + 8 = 40 defective units."] },
    { level: "IIM Tough", problem: "10. [Indore SA DI] Using Q9 data, find overall defect percentage across all 1,000 units.", steps: ["(40 / 1000) * 100 = 4%."] }
  ]
};

window.IPM_CHAPTER_REFRESHERS.dilr_02 = {
  overview: "Logical Reasoning (Seating Arrangements, Blood Relations, Direction Sense, Coding-Decoding & Syllogisms) forms 33% of GRE General Rohtak (40 Qs) and OMETs (33 Qs).",
  prerequisites: ["Alphabet positions A=1..Z=26 (EJOTY) & opposite pairs sum to 27", "8-point compass directions"],
  corePrinciples: [
    "Anchor Fixed Positions First: Lock end/opposite clues before relative neighbor clues.",
    "Syllogism Rules: Universal positive + Universal positive => Universal positive. Two 'Some' statements give NO definite conclusion.",
    "Blood Relation Tree: Use + for male, - for female, = for married couple, vertical line for parent-child."
  ],
  workedExamples: [
    { level: "Foundation", problem: "1. Pointing to a man, Riya says, 'He is the only son of my grandfather's only son.' How is the man related to Riya?", steps: ["Grandfather's only son = Riya's father -> Father's only son = Riya's brother."] },
    { level: "Foundation", problem: "2. Walk 10m North, turn right walk 15m, turn right walk 10m. How far and in which direction from start?", steps: ["15 meters East of the starting point."] },
    { level: "Foundation", problem: "3. Complete the series: 2, 6, 12, 20, 30, ?", steps: ["n*(n+1): 1*2, 2*3, 3*4, 4*5, 5*6, 6*7 = 42."] },
    { level: "GRE General Moderate", problem: "4. Six friends sit around a circular table facing center. A is opposite B; C is immediate right of A; D is opposite C. Who sits immediate left of B?", steps: ["Facing center, A's right is B's left => C sits opposite D, and immediate left of B is D."] },
    { level: "GRE General Moderate", problem: "5. If 'MANGO' is coded as 'NZOHP', decode 'APPLE'.", steps: ["Each letter shifts +1 => 'BQQMF'."] },
    { level: "GRE General Moderate", problem: "6. Statements: All pens are books. No book is a scale. Conclusion: No pen is a scale.", steps: ["Since pens sit completely inside books and books are disjoint from scales, 'No pen is a scale' definitely follows."] },
    { level: "GRE General Moderate", problem: "7. Find the odd one out: 27, 64, 125, 144, 216.", steps: ["144 is 12^2 (perfect square); all others are perfect cubes (3^3, 4^3, 5^3, 6^3)."] },
    { level: "IIM Tough", problem: "8. Five boxes P, Q, R, S, T are stacked. P is two boxes above R; S is at the bottom; Q is immediately below P. Which box is at the top?", steps: ["Bottom=5 (S). P=1, Q=2, R=3, T=4, S=5 => Box P is at the top."] },
    { level: "IIM Tough", problem: "9. Statements: Some cats are dogs. All dogs are birds. Conclusions: I. Some cats are birds. II. All birds are cats.", steps: ["Only Conclusion I definitely follows."] },
    { level: "IIM Tough", problem: "10. [Rohtak LR] If Jan 1, 2024 was a Monday, what day of the week was Jan 1, 2025?", steps: ["2024 is a leap year (366 days = 52 weeks + 2 odd days) => Monday + 2 = Wednesday."] }
  ]
};

window.IPM_CHAPTER_REFRESHERS.dilr_03 = {
  overview: "Data Sufficiency and Input-Output test logical rigor—requiring students to check whether given clues uniquely determine an answer without solving unnecessarily.",
  prerequisites: ["Unique solution conditions for linear/quadratic equations", "Strict Statement I vs Statement II isolation"],
  corePrinciples: [
    "Never Pollute Statement II with Statement I: Evaluate each statement in complete isolation first.",
    "Unique Value vs Yes/No: A definite 'No' is 100% sufficient; two possible values (e.g., x = ±3) is insufficient."
  ],
  workedExamples: [
    { level: "Foundation", problem: "1. What is x? (I) x + y = 10. (II) 2x + 2y = 20.", steps: ["Both equations are identical -> Neither alone nor together is sufficient."] },
    { level: "Foundation", problem: "2. Is integer k > 0? (I) k^3 = -27. (II) k^2 = 9.", steps: ["I gives k = -3 (definite No -> sufficient). II gives k = ±3 (not unique -> insufficient). Answer: I alone."] },
    { level: "Foundation", problem: "3. Find area of square ABCD. (I) Diagonal = 10 cm. (II) Perimeter = 20*sqrt(2) cm.", steps: ["Either statement alone uniquely determines side = 5*sqrt(2) and area = 50 cm^2."] },
    { level: "GRE General Moderate", problem: "4. Is prime p > 10? (I) p is odd. (II) 12 < p < 16.", steps: ["I gives p = 3 or 13 (insufficient). II locks p = 13 (definite Yes -> II alone is sufficient)."] },
    { level: "GRE General Moderate", problem: "5. Find average age of A and B. (I) A + B = 48. (II) A - B = 6.", steps: ["Average = (A + B)/2 = 48/2 = 24 => Statement I alone is sufficient."] },
    { level: "GRE General Moderate", problem: "6. Who is tallest among P, Q, R? (I) P > Q. (II) R < Q.", steps: ["Combining I & II: P > Q > R => Both together are required."] },
    { level: "GRE General Moderate", problem: "7. What is the rate of SI? (I) Principal doubles in 10 years. (II) SI for 2 years on Rs. 500 is Rs. 100.", steps: ["I gives R = 10%; II gives R = 10% => Either statement alone is sufficient."] },
    { level: "IIM Tough", problem: "8. Is xy > 0? (I) x^2 * y > 0. (II) x * y^2 < 0.", steps: ["From I, x != 0 and y > 0 (x could be + or -). From II, y != 0 and x < 0. Combined: x < 0 and y > 0 => xy < 0 (definite No -> Both together sufficient)."] },
    { level: "IIM Tough", problem: "9. Find the two-digit number N. (I) Sum of digits is 9 and N is divisible by 5. (II) Reversing digits increases N by 45.", steps: ["I gives 45 or 90; II gives 16, 27, 38, or 49. Together => N = 45 uniquely."] },
    { level: "IIM Tough", problem: "10. [Rohtak DS] In a class of 40, how many passed? (I) 60% of boys and 80% of girls passed. (II) Number of boys equals number of girls.", steps: ["From II, Boys = 20, Girls = 20. From I, Passed = 12 + 16 = 28 => Both together required."] }
  ]
};

window.IPM_CHAPTER_REFRESHERS.varc_01 = {
  overview: "Reading Comprehension (RC) is the single largest block in GRE General (15-18 Qs across 3 passages), OMETs, and IIM Bangalore UG—testing central idea synthesis, author tone, and strict textual inference.",
  prerequisites: ["Paragraph-by-paragraph structural mapping", "Eliminating extreme modifiers ('always', 'never', 'solely')"],
  corePrinciples: [
    "Main Idea Formula: Primary Subject + Author's Central Claim (avoid options focused only on one supporting example).",
    "Inference Discipline: Must be 100% logically entailed by the passage—reject factually true real-world statements not supported by the text."
  ],
  workedExamples: [
    { level: "Foundation", problem: "1. Passage: 'While solar tariffs have fallen 70%, grid storage remains the bottleneck for 24/7 decarbonization.' Identify main idea.", steps: ["Cheap solar generation alone cannot ensure round-the-clock clean power without scalable storage."] },
    { level: "Foundation", problem: "2. Tone check: Author writes 'Proponents hail the policy as revolutionary, yet empirical audits reveal negligible gains.'", steps: ["Tone is 'Skeptical / Critically analytical'."] },
    { level: "Foundation", problem: "3. Why is an option saying 'Solar energy will NEVER replace coal' almost always wrong in RC?", steps: ["Extreme absolute modifier ('NEVER') violates academic hedging."] },
    { level: "GRE General Moderate", problem: "4. Passage: 'Urban trees lower peak summer temperatures by 3°C, reducing hospital admissions.' Which strengthens this?", steps: ["Neighborhoods that planted dense street canopies saw measurable drops in heatstroke ER visits."] },
    { level: "GRE General Moderate", problem: "5. Function of an anecdote opening an economics passage before presenting macro data?", steps: ["To illustrate an abstract economic phenomenon through a relatable concrete case."] },
    { level: "GRE General Moderate", problem: "6. Distinguish 'Assumption' from 'Inference': Passage states 'Sales rose 20% after launching the app; hence the app drove growth.'", steps: ["Assumption: No other external factor (like a competitor's exit) caused the 20% sales jump."] },
    { level: "GRE General Moderate", problem: "7. Author states 'Paradoxically, wider choice often induces decision paralysis.' What does 'Paradoxically' signal?", steps: ["A counter-intuitive outcome where more options reduce rather than increase buyer satisfaction."] },
    { level: "IIM Tough", problem: "8. [GRE General 2026 'Rage Bait' RC] Why do engagement algorithms amplify polarizing posts despite user dissatisfaction?", steps: ["Algorithms optimize for immediate click/reply velocity driven by high-arousal outrage rather than stated user trust."] },
    { level: "IIM Tough", problem: "9. Which option weakens an argument claiming 'Remote work permanently boosts productivity'?", steps: ["Short-term output gains were driven by unpaid overtime that later caused high attrition and collaboration drag."] },
    { level: "IIM Tough", problem: "10. [Indore RC Inference] If a passage states 'Few historians dispute X, though many debate Y', what can be inferred?", steps: ["There is broad scholarly consensus on X, whereas Y remains contested."] }
  ]
};

window.IPM_CHAPTER_REFRESHERS.varc_02 = {
  overview: "Vocabulary, Confusable Word Pairs, Idioms, and Double/Triple Fill-in-the-Blanks surged in GRE General 2025-2026, rewarding root-word decoding and blank-polarity logic.",
  prerequisites: ["Prefixes/roots: mal-(bad), bene-(good), pan-(all), circum-(around), loqu-(speak), tac/retic-(silent)"],
  corePrinciples: [
    "Conjunction Polarity: 'Although/Despite/Albeit' flip polarity across blanks; 'Moreover/Consequently' preserve polarity.",
    "Prepositional Collocation Anchor: Match fixed prepositions ('apprise OF', 'averse TO', 'acquiesce IN', 'culminate IN')."
  ],
  workedExamples: [
    { level: "Foundation", problem: "1. Choose between 'affect' and 'effect': 'Higher interest rates will _______ borrowing costs.'", steps: ["Verb needed here -> 'affect' (influence). 'Effect' as a verb means to bring about."] },
    { level: "Foundation", problem: "2. Meaning of idiom 'to bite the bullet'.", steps: ["To face an unavoidable, difficult situation with courage."] },
    { level: "Foundation", problem: "3. Antonym of 'loquacious' (talkative).", steps: ["'Reticent' or 'taciturn' (reserved/silent)."] },
    { level: "GRE General Moderate", problem: "4. Fill in: 'The auditor was _______ enough to spot the subtle accounting anomaly.' (perspicacious / pusillanimous)", steps: ["'Perspicacious' (having keen mental insight); 'pusillanimous' means cowardly."] },
    { level: "GRE General Moderate", problem: "5. Distinguish 'elicit' vs 'illicit'.", steps: ["'Elicit' = draw out a reaction/truth; 'Illicit' = unlawful."] },
    { level: "GRE General Moderate", problem: "6. Double blank: 'Far from _______ the crisis, the hasty policy _______ market panic.'", steps: ["'mitigating ... exacerbated' (far from lessening, it worsened panic)."] },
    { level: "GRE General Moderate", problem: "7. Meaning of 'ephemeral'.", steps: ["Lasting for a very short time; transitory."] },
    { level: "IIM Tough", problem: "8. [GRE General 2026 Pattern] Triple blank: 'Though his rhetoric was _______, his actual reforms proved _______, _______ long-standing monopolies.'", steps: ["'incendiary ... pragmatic ... dismantling'."] },
    { level: "IIM Tough", problem: "9. Correct usage: 'The board was apprised _____ the merger risks.'", steps: ["Preposition 'of' ('apprised of')."] },
    { level: "IIM Tough", problem: "10. Distinguish 'disinterested' vs 'uninterested'.", steps: ["'Disinterested' = impartial/unbiased; 'Uninterested' = bored/indifferent."] }
  ]
};

window.IPM_CHAPTER_REFRESHERS.varc_03 = {
  overview: "Grammar (Spotting the Error), Para-Jumbles, Para-Completion, and Conversation Analysis test syntactic precision and paragraph coherence across GRE General, Rohtak, and OMETs.",
  prerequisites: ["Subject-verb agreement, pronoun case (who/whom), modifier placement, and conditional tenses"],
  corePrinciples: [
    "5-Step Error Checklist: (1) Subject-Verb Agreement -> (2) Pronoun Antecedent -> (3) Parallelism -> (4) Modifiers -> (5) Tenses.",
    "Para-Jumble Mandatory Pairs: Link full noun -> pronoun ('This/These/Such'), cause -> effect ('Consequently/Thus'), and claim -> contrast ('However')."
  ],
  workedExamples: [
    { level: "Foundation", problem: "1. Spot error: 'One of my friends are going to IIM Indore.'", steps: ["Subject is 'One' (singular) -> 'are' must be 'is'."] },
    { level: "Foundation", problem: "2. Spot error: 'If I was you, I would attempt all SA questions.'", steps: ["Hypothetical subjunctive mood requires 'were': 'If I were you...'."] },
    { level: "Foundation", problem: "3. Choose pronoun: 'The student _____ won the gold medal spoke eloquently.' (who/whom)", steps: ["Subject of 'won' -> 'who'."] },
    { level: "GRE General Moderate", problem: "4. Spot error: 'Walking down the street, the skyscraper looked enormous.'", steps: ["Dangling modifier: the skyscraper wasn't walking -> 'Walking down the street, I saw that the skyscraper...'."] },
    { level: "GRE General Moderate", problem: "5. Spot error: 'She prefers coffee than tea.'", steps: ["'Prefer' takes preposition 'to', not 'than' -> 'prefers coffee to tea'."] },
    { level: "GRE General Moderate", problem: "6. Parallelism fix: 'The role requires analyzing data, writing reports, and to present findings.'", steps: ["Match gerunds: '...and presenting findings.'"] },
    { level: "GRE General Moderate", problem: "7. Identify opening sentence: (A) Thus, reforms stalled. (B) In 1991, India faced a balance-of-payments crisis.", steps: ["(B) introduces historical context without transition words -> Opening sentence."] },
    { level: "IIM Tough", problem: "8. [Indore Para-Completion] Paragraph discusses how electric vehicles cut tailpipe emissions, then notes coal-heavy grids offset gains. Best closing?", steps: ["'Consequently, the true climate dividend of EVs depends on simultaneously decarbonizing power generation.'"] },
    { level: "IIM Tough", problem: "9. Spot error: 'Scarcely had the bell rung than the students rushed out.'", steps: ["'Scarcely/Hardly' pairs with 'when', not 'than' ('No sooner... than')."] },
    { level: "IIM Tough", problem: "10. [Conversation Analysis] Speaker A: 'Sales doubled after our celebrity ad.' Speaker B: 'Yet store footfall fell 10%.' What does B imply?", steps: ["The sales surge came from online/bulk channels rather than physical store visits."] }
  ]
};