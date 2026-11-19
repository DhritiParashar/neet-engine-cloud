window.IPM_CHAPTER_REFRESHERS = window.IPM_CHAPTER_REFRESHERS || {};

window.IPM_CHAPTER_REFRESHERS.qc_01 = {
  overview: "Percentages, Profit-Loss, Discounts, and Simple/Compound Interest form the single highest-yield arithmetic block across OMETs (IIM Bodh Gaya & Jammu), GRE General Rohtak, GRE General, and IIM Bangalore DBE. Mastering multiplicative scaling factors and base-shift discipline eliminates 90% of calculation errors and unlocks fast Data Interpretation.",
  prerequisites: [
    "Standard fraction-to-percentage equivalents: 1/2=50%, 1/3=33.33%, 1/4=25%, 1/5=20%, 1/6=16.67%, 1/7=14.28%, 1/8=12.5%, 1/9=11.11%, 1/11=9.09%, 1/12=8.33%, 1/15=6.67%, 1/16=6.25%",
    "Clear distinction between Cost Price (CP), Marked Price (MP), Selling Price (SP), Markup %, Discount %, and Margin % (Profit/SP vs Profit/CP)",
    "Compound Interest scaling factor: Amount A = P * (1 + R/100)^n"
  ],
  corePrinciples: [
    "Multiplicative Scaling & Reciprocal Reversal: Increasing a base by +a/b multiplies it by (b+a)/b. To restore the original value, multiply by b/(b+a), which is a decrease of a/(b+a). Example: +25% (+1/4) requires -20% (-1/5) to return to the original level.",
    "Successive Percentage Net Effect: Two successive changes of x% and y% produce a net percentage change of [x + y + (xy)/100]%. Equal percentage hike and drop (+x% followed by -x%) ALWAYS yields a net loss of (x^2 / 100)%.",
    "Profit-Markup-Discount Chain: SP = CP * (1 + m/100) * (1 - d/100). Profit % is strictly (SP - CP)/CP * 100, whereas Margin % (used in corporate DI tables) is (SP - CP)/SP * 100.",
    "Faulty Weights & Dishonest Trader Law: Profit % = [(True Weight Charged - Actual Weight Delivered) / Actual Weight Delivered] * 100 when sold at CP; multiply by (1 + m/100)(1 - d/100) when marked up or discounted.",
    "SI vs CI Difference Formula: For 2 years, CI - SI = P * (R/100)^2. For 3 years, CI - SI = P * (R/100)^2 * (3 + R/100)."
  ],
  workedExamples: [
    { level: "Foundation", problem: "1. A laptop's price is raised by 25% and then reduced by 20%. Find the net percentage change.", steps: ["Net change = +25 + (-20) + (25 * -20)/100 = 5 - 5 = 0%.", "Fraction check: 100 * (5/4) * (4/5) = 100 -> 0% change."] },
    { level: "Foundation", problem: "2. By selling 45 pens for Rs. 40, a vendor loses 20%. How many pens should he sell for Rs. 24 to gain 20%?", steps: ["SP of 1 pen = 40/45 = 8/9 at 20% loss (0.8 CP) => CP of 1 pen = (8/9) / 0.8 = 10/9.", "Desired SP for 20% gain = (10/9) * 1.2 = 4/3 per pen.", "Number of pens for Rs. 24 = 24 / (4/3) = 18 pens."] },
    { level: "Foundation", problem: "3. If A's income is 40% more than B's income, by what percentage is B's income less than A's?", steps: ["+40% = +2/5 (B = 5, A = 7).", "B is less than A by (7 - 5)/7 = 2/7 = 28.57%."] },
    { level: "GRE General Moderate", problem: "4. A shopkeeper marks goods 60% above CP and allows two successive discounts of 10% and 25%. Find his net profit or loss %.", steps: ["SP/CP = 1.60 * 0.90 * 0.75 = 1.60 * 0.675 = 1.08.", "Net Profit = (1.08 - 1) * 100 = 8%."] },
    { level: "GRE General Moderate", problem: "5. A dishonest grocer claims to sell rice at cost price but uses an 850g weight instead of 1kg. Find his exact profit percentage.", steps: ["Actual CP incurred = Rs. 850; Money collected = Rs. 1,000.", "Profit % = (150 / 850) * 100 = 300/17 = 17.65%."] },
    { level: "GRE General Moderate", problem: "6. The difference between Compound Interest and Simple Interest on a sum for 2 years at 12% p.a. is Rs. 72. Find the principal.", steps: ["CI - SI (2 yrs) = P * (R/100)^2 => 72 = P * (12/100)^2 = P * 144/10000.", "P = (72 * 10000) / 144 = Rs. 5,000."] },
    { level: "GRE General Moderate", problem: "7. Fresh grapes contain 80% water while dry grapes contain 10% water. How much dry grapes can be obtained from 90 kg of fresh grapes?", steps: ["Pulp (non-water mass) remains invariant: Fresh pulp = 20% of 90 kg = 18 kg.", "In dry grapes, pulp is 90% of total weight W => 0.90 * W = 18 => W = 20 kg."] },
    { level: "IIM Tough", problem: "8. A trader marks up his goods by 50%, gives a 20% discount, and uses a faulty balance that reads 1000g for 800g while buying AND 1000g for 900g while selling. Find his true profit %.", steps: ["While buying, he pays for 1000g but gets 1250g (or scales CP by 800/1000). While selling, he gives 900g for 1000g price.", "Combined SP/CP = (1.50 * 0.80) * (1000/800) * (1000/900) = 1.20 * (5/4) * (10/9) = 5/3.", "Profit % = (2/3) * 100 = 66.67%."] },
    { level: "IIM Tough", problem: "9. A sum invested at CI triples in 4 years. In how many years will it become 27 times itself, and what is the effective interest rate over 8 years?", steps: ["3x in 4 yrs => 3^3 = 27x in 3 * 4 = 12 years.", "In 8 years, sum becomes 3^2 = 9x => Effective 8-year growth = (9 - 1) * 100 = 800%."] },
    { level: "IIM Tough", problem: "10. [GRE General SA Style] A candidate scores 32% marks and fails by 18 marks, while another scores 44% and gets 30 marks above the pass mark. Find the maximum marks.", steps: ["Difference in % = 44% - 32% = 12% of Max Marks M.", "Difference in score = 30 - (-18) = 48 marks.", "0.12 * M = 48 => M = 400."] }
  ]
};

window.IPM_CHAPTER_REFRESHERS.qc_02 = {
  overview: "Ratios, Proportions, Partnerships, and Weighted Alligations appear in virtually every quantitative section across all 8 IIMs. Alligation is a visual weighted-average shortcut that converts complex two-component mixture, speed, and interest problems into a 10-second subtraction.",
  prerequisites: [
    "Ratio scaling: If a:b = 2:3 and b:c = 4:5, equalize b to LCM(3,4)=12 => a:b:c = 8:12:15",
    "Componendo-Dividendo: If a/b = c/d, then (a+b)/(a-b) = (c+d)/(c-d)",
    "Partnership profit sharing: Profit ratio = (Capital_1 * Time_1) : (Capital_2 * Time_2)"
  ],
  corePrinciples: [
    "Alligation Cross-Rule: Place cheaper unit value C (top-left), dearer unit value D (bottom-left), and mean mixture value M (center). Ratio of Cheaper quantity to Dearer quantity = (D - M) : (M - C). Note: C, M, and D must share identical units (e.g., all Cost Prices or all % milk).",
    "Repeated Removal & Replacement: From V liters of pure liquid A, if x liters are drawn and replaced with B repeatedly n times, Final Quantity of A = V * (1 - x/V)^n.",
    "Direct & Inverse Variation: If A varies directly as B and inversely as C, then (A1 * C1) / B1 = (A2 * C2) / B2."
  ],
  workedExamples: [
    { level: "Foundation", problem: "1. Divide Rs. 1,300 among A, B, and C such that A:B = 2:3 and B:C = 4:5.", steps: ["Equalize B: A:B = 8:12, B:C = 12:15 => A:B:C = 8:12:15 (Total = 35 parts).", "Wait: 1300/35 is non-integer; if total is Rs. 1,400, 1 part = 40 => A=320, B=480, C=600. For 1300, A = 1300*(8/35) = Rs. 297.14."] },
    { level: "Foundation", problem: "2. Two numbers are in ratio 3:5. If 9 is subtracted from each, the new ratio becomes 12:23. Find the smaller number.", steps: ["(3x - 9)/(5x - 9) = 12/23 => 69x - 207 = 60x - 108 => 9x = 99 => x = 11.", "Smaller number = 3 * 11 = 33."] },
    { level: "Foundation", problem: "3. A invests Rs. 40,000 for 12 months and B invests Rs. 60,000 for 8 months. Find B's share in a profit of Rs. 25,000.", steps: ["Profit ratio A:B = (40,000 * 12) : (60,000 * 8) = 480,000 : 480,000 = 1 : 1.", "B's share = Rs. 12,500."] },
    { level: "GRE General Moderate", problem: "4. In what ratio must water be mixed with milk costing Rs. 60/liter so that selling the mixture at Rs. 50/liter yields a 25% profit?", steps: ["Convert SP to Mixture CP: M = 50 / 1.25 = Rs. 40/liter.", "Water CP = Rs. 0/liter, Milk CP = Rs. 60/liter.", "By Alligation: Water : Milk = (60 - 40) : (40 - 0) = 20 : 40 = 1 : 2."] },
    { level: "GRE General Moderate", problem: "5. Alloy A contains copper and zinc in ratio 4:3, and Alloy B in ratio 5:2. Equal weights of A and B are melted together. Find the new ratio.", steps: ["Total parts in A = 7 (4/7 Cu, 3/7 Zn); Total parts in B = 7 (5/7 Cu, 2/7 Zn).", "Since total parts are already equal (7), add directly: Cu : Zn = (4+5) : (3+2) = 9 : 5."] },
    { level: "GRE General Moderate", problem: "6. A sum of Rs. 10,000 is lent partly at 8% SI and partly at 12% SI. If total annual interest is Rs. 920 (9.2% average), find the amount lent at 12%.", steps: ["By Alligation: (8% part) : (12% part) = (12 - 9.2) : (9.2 - 8) = 2.8 : 1.2 = 7 : 3.", "Amount at 12% = (3/10) * 10,000 = Rs. 3,000."] },
    { level: "GRE General Moderate", problem: "7. A 50-liter cask is full of wine. 5 liters are drawn and replaced with water, and the process is repeated twice more (3 times total). How much wine remains?", steps: ["Remaining wine = 50 * (1 - 5/50)^3 = 50 * (0.9)^3 = 50 * 0.729 = 36.45 liters."] },
    { level: "IIM Tough", problem: "8. A container has 80L of milk. 8L is replaced by water, then 10L of the mixture is replaced by water, then 16L of mixture is replaced by water. Find final milk volume.", steps: ["Apply step-by-step removal fractions: Final milk = 80 * (1 - 8/80) * (1 - 10/80) * (1 - 16/80).", "= 80 * (9/10) * (7/8) * (4/5) = 50.4 liters."] },
    { level: "IIM Tough", problem: "9. Two vessels contain milk and water in ratios 3:2 and 7:3. In what ratio should their contents be mixed to get a 2:1 milk-to-water ratio?", steps: ["Work strictly with Milk fraction: Vessel 1 = 3/5 (60%), Vessel 2 = 7/10 (70%), Target = 2/3 (66.67%).", "Ratio = (7/10 - 2/3) : (2/3 - 3/5) = (1/30) : (1/15) = 1 : 2."] },
    { level: "IIM Tough", problem: "10. [GRE General SA Style] From a solution of 40L acid-water (60% acid), how many liters of pure acid must be added to raise concentration to 75%?", steps: ["Water stays constant! Initial water = 40% of 40L = 16L.", "In final mixture (75% acid => 25% water), 25% of Final Volume V = 16L => V = 64L.", "Pure acid added = 64 - 40 = 24 liters."] }
  ]
};

window.IPM_CHAPTER_REFRESHERS.qc_03 = {
  overview: "Time-Speed-Distance (TSD), Relative Speed, Boats & Streams, Circular Tracks, and Time & Work (including Pipes & Cisterns) are unified by the fundamental rate equation: Output = Rate * Time.",
  prerequisites: [
    "Speed unit conversion: km/h * (5/18) = m/s; m/s * (18/5) = km/h",
    "Downstream speed = B + S; Upstream speed = B - S => Boat speed B = (D + U)/2, Stream speed S = (D - U)/2",
    "LCM Efficiency Method: Set Total Work = LCM of days taken by all workers"
  ],
  corePrinciples: [
    "Constant Distance Ratio Law: When distance D is fixed, S1 / S2 = T2 / T1. If speed changes by a/b, time changes inversely.",
    "Average Speed Laws: For equal distances at speeds x and y, Avg Speed = 2xy/(x+y) (Harmonic Mean). For equal time intervals, Avg Speed = (x+y)/2 (Arithmetic Mean).",
    "Meeting Point Theorem: If two bodies start simultaneously from A and B toward each other, meet at M, and take t1 and t2 hours after meeting to reach B and A respectively, then S1 / S2 = sqrt(t2 / t1).",
    "Circular Track First Meeting: Time to meet anywhere on track of length L = L / Relative Speed. Time to meet at Starting Point = LCM of individual lap times.",
    "MDH Chain Rule: (M1 * D1 * H1) / W1 = (M2 * D2 * H2) / W2."
  ],
  workedExamples: [
    { level: "Foundation", problem: "1. A train 150m long crosses a pole in 9 seconds. What is its speed in km/h?", steps: ["Speed = 150 / 9 m/s = (50/3) * (18/5) km/h = 60 km/h."] },
    { level: "Foundation", problem: "2. A boat travels 24 km downstream in 2 hours and 16 km upstream in 4 hours. Find the speed of the stream.", steps: ["D = 24/2 = 12 km/h; U = 16/4 = 4 km/h.", "Stream speed S = (12 - 4)/2 = 4 km/h."] },
    { level: "Foundation", problem: "3. Pipe A fills a tank in 15 hrs, Pipe B in 20 hrs, and drain Pipe C empties it in 30 hrs. If all three open together, when does the tank fill?", steps: ["Total capacity = LCM(15, 20, 30) = 60 units.", "Net hourly rate = +4 + 3 - 2 = +5 units/hr => Time = 60 / 5 = 12 hours."] },
    { level: "GRE General Moderate", problem: "4. Excluding stoppages, a bus travels at 54 km/h, and including stoppages it travels at 45 km/h. For how many minutes does the bus stop per hour?", steps: ["Stoppage mins/hr = [(Fast Speed - Slow Speed) / Fast Speed] * 60.", "= [(54 - 45) / 54] * 60 = (9 / 54) * 60 = 10 minutes per hour."] },
    { level: "GRE General Moderate", problem: "5. Two trains start simultaneously from Delhi and Jaipur toward each other. After crossing, they take 4 hours and 9 hours respectively to reach their destinations. Find the ratio of their speeds.", steps: ["By Meeting Point Theorem: S1 / S2 = sqrt(t2 / t1) = sqrt(9 / 4) = 3 : 2."] },
    { level: "GRE General Moderate", problem: "6. A is twice as efficient as B and finishes a task 18 days faster than B. How many days do they take working together?", steps: ["Efficiency A:B = 2:1 => Time A:B = 1:2. Difference = 1 part = 18 days => A = 18 days, B = 36 days.", "Together = (18 * 36) / (18 + 36) = 648 / 54 = 12 days."] },
    { level: "GRE General Moderate", problem: "7. In a 1000m race, A beats B by 100m and B beats C by 100m. By how many meters does A beat C?", steps: ["When A runs 1000m, B runs 900m (A:B = 10:9). When B runs 1000m, C runs 900m (B:C = 10:9).", "Combined A:B:C = 100 : 90 : 81 => When A runs 1000m, C runs 810m -> A beats C by 190m."] },
    { level: "IIM Tough", problem: "8. On a 600m circular track, A and B run in opposite directions at 6 m/s and 4 m/s starting from the same point. How many distinct points on the track do they meet at?", steps: ["Ratio of speeds in lowest terms = 6 : 4 = 3 : 2.", "For opposite directions, number of distinct meeting points = 3 + 2 = 5 distinct points."] },
    { level: "IIM Tough", problem: "9. A and B can build a wall in 10 and 15 days. They work on alternate days starting with A. In how many days is the wall completed?", steps: ["Total Work = LCM(10, 15) = 30 units (A = 3/day, B = 2/day).", "1 cycle of 2 days = 3 + 2 = 5 units. 6 cycles (12 days) = 30 units exact -> 12 days."] },
    { level: "IIM Tough", problem: "10. [GRE General SA Style] Driving at 5/6 of his usual speed, Rahul reaches office 15 minutes late. Find his usual commute time in minutes.", steps: ["Speed becomes 5/6 => Time becomes 6/5 of usual time T.", "Extra time = (1/5)T = 15 mins => T = 75 minutes."] }
  ]
};

window.IPM_CHAPTER_REFRESHERS.qc_04 = {
  overview: "Number Systems and Euclidean Geometry are high-scoring conceptual pillars in GRE General Short-Answer (SA), OMETs, and IIM Bangalore UG—testing prime factorization, modular remainders, highest power in factorials, and triangle/circle theorems.",
  prerequisites: [
    "Prime numbers up to 100 and divisibility tests for 2, 3, 4, 5, 6, 8, 9, 11",
    "Pythagorean triplets: (3,4,5), (5,12,13), (7,24,25), (8,15,17), (9,40,41)",
    "Area of equilateral triangle = (sqrt(3)/4) * a^2; Circle area = pi * r^2"
  ],
  corePrinciples: [
    "Divisor Count & Sum: For N = p^a * q^b, Total Factors = (a+1)(b+1). Sum of Factors = [(p^(a+1)-1)/(p-1)] * [(q^(b+1)-1)/(q-1)].",
    "Legendre's Formula (Highest Power in n!): Highest power of prime p dividing n! is floor(n/p) + floor(n/p^2) + floor(n/p^3) + ...",
    "Fermat's & Euler's Remainder Theorems: If p is prime and gcd(a,p)=1, a^(p-1) ≡ 1 (mod p). More generally, a^phi(n) ≡ 1 (mod n).",
    "Triangle Centers & Similarity: Centroid divides median in 2:1; Inradius r = Area / Semi-perimeter (s); Circumradius R = abc / (4 * Area).",
    "Circle Power-of-a-Point: For intersecting chords AB & CD at P, PA * PB = PC * PD. For secant PAB and tangent PT, PT^2 = PA * PB."
  ],
  workedExamples: [
    { level: "Foundation", problem: "1. Find the number of trailing zeros in 100!", steps: ["Trailing zeros = highest power of 5 in 100! = floor(100/5) + floor(100/25) = 20 + 4 = 24 zeros."] },
    { level: "Foundation", problem: "2. Find the unit digit of 7^105 + 3^64.", steps: ["7 has cyclicity 4: 105 mod 4 = 1 => 7^1 = 7.", "3 has cyclicity 4: 64 mod 4 = 0 => 3^4 = 81 (unit digit 1).", "Unit digit = 7 + 1 = 8."] },
    { level: "Foundation", problem: "3. Two similar triangles have perimeters 24 cm and 36 cm. If the smaller triangle has area 32 cm^2, find the larger triangle's area.", steps: ["Side ratio = 24 : 36 = 2 : 3 => Area ratio = 4 : 9.", "Larger Area = 32 * (9/4) = 72 cm^2."] },
    { level: "GRE General Moderate", problem: "4. How many positive factors of 720 are even?", steps: ["720 = 2^4 * 3^2 * 5^1. Total factors = 5 * 3 * 2 = 30.", "Odd factors (exclude 2) = 3 * 2 = 6 => Even factors = 30 - 6 = 24."] },
    { level: "GRE General Moderate", problem: "5. Find the remainder when 2^50 is divided by 7.", steps: ["2^3 = 8 ≡ 1 (mod 7). Write 2^50 = (2^3)^16 * 2^2 ≡ 1^16 * 4 = 4 (mod 7)."] },
    { level: "GRE General Moderate", problem: "6. A tangent PT from external point P touches a circle at T, and a secant PAB cuts the circle at A and B. If PA = 4 cm and AB = 12 cm, find PT.", steps: ["PB = PA + AB = 4 + 12 = 16 cm.", "PT^2 = PA * PB = 4 * 16 = 64 => PT = 8 cm."] },
    { level: "GRE General Moderate", problem: "7. Find the inradius of a right-angled triangle with legs 9 cm and 12 cm.", steps: ["Hypotenuse = sqrt(9^2 + 12^2) = 15 cm.", "For right triangle, r = (a + b - c)/2 = (9 + 12 - 15)/2 = 3 cm."] },
    { level: "IIM Tough", problem: "8. Find the smallest positive integer N which leaves remainders 2, 3, and 4 when divided by 3, 4, and 5 respectively.", steps: ["Notice constant difference (Divisor - Remainder) = 1 in every case.", "N = LCM(3, 4, 5) - 1 = 60 - 1 = 59."] },
    { level: "IIM Tough", problem: "9. Find the remainder when 1! + 2! + 3! + ... + 100! is divided by 12.", steps: ["4! = 24 is divisible by 12, so all terms from 4! to 100! leave remainder 0.", "Remainder = (1 + 2 + 6) mod 12 = 9."] },
    { level: "IIM Tough", problem: "10. [GRE General SA Style] How many integers between 1 and 500 are divisible by 3 or 5, but NOT by 15?", steps: ["Divisible by 3: floor(500/3) = 166. Divisible by 5: floor(500/5) = 100. Divisible by 15: floor(500/15) = 33.", "Divisible by 3 or 5 = 166 + 100 - 33 = 233. Exclude multiples of 15: 233 - 33 = 200."] }
  ]
};

window.IPM_CHAPTER_REFRESHERS.qc_05 = {
  overview: "Quadratic Equations, Theory of Polynomials, Modulus Equations, and Wavy-Curve Inequalities form the algebraic core of GRE General (SA & MCQ) and IIM Bangalore B.Sc. Economics/Data Science.",
  prerequisites: [
    "Quadratic formula x = [-b ± sqrt(b^2 - 4ac)] / (2a) and Discriminant D = b^2 - 4ac",
    "Modulus definition: |x| = x if x >= 0, and -x if x < 0",
    "Interval notation: (a, b) open vs [a, b] closed"
  ],
  corePrinciples: [
    "Vieta's Root Identities: For ax^2 + bx + c = 0, α + β = -b/a and αβ = c/a. For cubic ax^3 + bx^2 + cx + d = 0, Σα = -b/a, Σαβ = c/a, αβγ = -d/a.",
    "Definite Quadratic Sign: ax^2 + bx + c > 0 for ALL real x iff a > 0 and D < 0; ax^2 + bx + c < 0 for ALL real x iff a < 0 and D < 0.",
    "Vertex Optimization: A quadratic f(x) = ax^2 + bx + c attains its extreme value (4ac - b^2)/(4a) at x = -b/(2a).",
    "Wavy-Curve Rational Inequalities: Factor into linear (x - r) terms with positive x-coefficients, mark zeros and poles on the number line, and alternate +, - from right to left across odd powers.",
    "Triangle Inequality for Modulus: |x - a| + |x - b| >= |a - b|, with minimum achieved for all x between a and b."
  ],
  workedExamples: [
    { level: "Foundation", problem: "1. If α and β are roots of 2x^2 - 6x + 3 = 0, find α^2 + β^2.", steps: ["S = 6/2 = 3, P = 3/2.", "α^2 + β^2 = S^2 - 2P = 9 - 2(3/2) = 6."] },
    { level: "Foundation", problem: "2. Find the minimum value of f(x) = x^2 - 8x + 21 for real x.", steps: ["Minimum occurs at x = -(-8)/2 = 4.", "f(4) = 16 - 32 + 21 = 5."] },
    { level: "Foundation", problem: "3. Solve |2x - 5| = 9.", steps: ["2x - 5 = 9 => x = 7; OR 2x - 5 = -9 => x = -2. Solutions: {7, -2}."] },
    { level: "GRE General Moderate", problem: "4. Form the quadratic equation whose roots are reciprocals of the roots of 3x^2 - 5x + 7 = 0.", steps: ["Replace x with 1/x: 3(1/x)^2 - 5(1/x) + 7 = 0 => 7x^2 - 5x + 3 = 0."] },
    { level: "GRE General Moderate", problem: "5. For what values of k does x^2 - (k - 2)x + 4 = 0 have equal real roots?", steps: ["Set D = 0: (k - 2)^2 - 16 = 0 => k - 2 = ±4 => k = 6 or k = -2."] },
    { level: "GRE General Moderate", problem: "6. Solve the inequality: x^2 - 7x + 12 < 0.", steps: ["(x - 3)(x - 4) < 0 => By wavy curve, negative between roots: 3 < x < 4, i.e., x in (3, 4)."] },
    { level: "GRE General Moderate", problem: "7. Find the minimum value of |x - 2| + |x - 9| for all real x.", steps: ["Minimum occurs for any x in [2, 9], equal to distance |9 - 2| = 7."] },
    { level: "IIM Tough", problem: "8. How many integer values of x satisfy (x^2 - 9) / (x^2 - 4) <= 0?", steps: ["[(x-3)(x+3)] / [(x-2)(x+2)] <= 0. Critical points: -3, -2, 2, 3 (exclude x = ±2).", "Valid intervals: [-3, -2) U (2, 3]. Integers: -3 and 3 -> 2 integers."] },
    { level: "IIM Tough", problem: "9. If one root of x^2 + px + 12 = 0 is 4, and x^2 + px + q = 0 has equal roots, find q.", steps: ["Sub x=4: 16 + 4p + 12 = 0 => p = -7.", "For x^2 - 7x + q = 0 to have equal roots, D = 49 - 4q = 0 => q = 49/4 = 12.25."] },
    { level: "IIM Tough", problem: "10. [GRE General SA Style] Find the number of real roots of the equation x^2 - 5|x| + 6 = 0.", steps: ["Write as |x|^2 - 5|x| + 6 = 0 => (|x| - 2)(|x| - 3) = 0.", "|x| = 2 => x = ±2; |x| = 3 => x = ±3. Total = 4 real roots."] }
  ]
};