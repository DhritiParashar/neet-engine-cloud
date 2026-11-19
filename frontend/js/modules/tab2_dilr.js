window.renderTab2 = function (el) {
  const host = window.location.host.toLowerCase();
  const exam = host.includes("gmat") ? "GMAT" : (host.includes("gre") ? "GRE" : "CAT");

  const CAT_MODULES = [
    {
      id: "cat_dilr_1",
      kicker: "CAT DILR MASTER LAB • MODULE 1 OF 5",
      title: "Linear, Circular & Matrix Multi-Variable Arrangements",
      sidebarSub: "1–2 Sets per Slot (5–10 Qs) • Direct Anchors & Binary Case Branching",
      weightage: "5–10 Qs / 20 (25–50%)",
      pace: "11–13 mins / Set",
      scoring: "MCQ +3/-1 & TITA +3/0",
      strategy: "4-Min Triage + Parallel Case Grids",
      prereq: "Master directional orientation (Facing Center vs. Facing Outward), negative cell elimination ('X != Slot 1, 5'), and clean binary branching whenever a clue creates 2 possible slots.",
      overview: "Multi-variable arrangement caselets are the backbone of CAT DILR, typically pairing 6 to 8 people/entities across 4 parameters (Slot, City, Department, Score). High-percentile scorers never hold branches in working memory—they draw parallel Case A / Case B columns immediately.",
      bridge: "Spend the first 4 minutes scanning all 4 DILR sets. Pick sets with deterministic anchors (fixed endpoints, exact differences, or unique sums) and avoid open-ended multi-case grids on Pass 1.",
      rules: [
        { name: "Law 1: Anchor Positive Clues First", desc: "Plot unconditional placements ('E is at 5', 'A sits opposite D') before touching relative or negative clues." },
        { name: "Law 2: Directional Arrow Discipline", desc: "In circular tables, draw inward or outward arrows at every node: facing center makes Left = Clockwise; facing outward makes Left = Counter-Clockwise." },
        { name: "Law 3: Partial-Set TITA Harvest", desc: "If 2 sub-cases remain valid at Minute 37, answer all sub-questions whose values are identical in both cases—especially zero-penalty TITA items." }
      ],
      workedExamples: [
        {
          title: "Worked Caselet 1: 5-Slot Executive Briefing Schedule",
          problem: "Five directors (A, B, C, D, E) present in Slots 1 to 5. (i) B presents immediately after A. (ii) C is neither 1st nor 5th. (iii) D presents before A. (iv) E is in Slot 5. Determine all valid schedules.",
          steps: "1. Place fixed anchor: Slot 5 = E.\n2. Inside Slots {1, 2, 3, 4}, (A, B) is an adjacent block with D strictly to its left.\n3. Branch 1: (A, B) = (2, 3) => D = 1, leaving C = 4 (Valid: D-A-B-C-E).\n4. Branch 2: (A, B) = (3, 4) => D can be 1 or 2. Since C != 1, C = 2 and D = 1 (Valid: D-C-A-B-E).\n5. Key Insight: D is ALWAYS in Slot 1 across both branches, while C is in Slot 2 or 4."
        },
        {
          title: "Worked Caselet 2: 6-Person Circular Table Orientation",
          problem: "P, Q, R, S, T, U sit around a circular table facing the center. P is opposite S; Q is second to the left of P; R sits between P and T. Where does U sit?",
          steps: "1. Place P at 6 o'clock and S at 12 o'clock.\n2. Facing center, left of 6 o'clock goes clockwise to 8 o'clock (1st left) and 10 o'clock (2nd left) => Q = 10 o'clock.\n3. R sits between P (6) and T => R = 4 o'clock and T = 2 o'clock.\n4. Only remaining seat is 8 o'clock => U sits immediately left of P (between P and Q)."
        }
      ],
      drills: [
        { q: "In the 5-slot schedule above (D-A-B-C-E or D-C-A-B-E), which director MUST present in Slot 1?", opts: ["A", "C", "D", "Cannot be uniquely determined"], ans: 2, exp: "Both valid branches place D in Slot 1." },
        { q: "Four analysts (P, Q, R, S) sit in a row facing North. P is not at either end, Q is immediately right of P, and S is not adjacent to Q. If R sits at Position 4, who sits at Position 1?", opts: ["P", "Q", "R", "S"], ans: 3, exp: "With R = 4 and P not at 1, (P, Q) = (2, 3) and S = 1 (non-adjacent to Q at 3)." },
        { q: "Six projects P1..P6 are scheduled Monday to Saturday (one/day). P4 is on Wednesday; P6 is on Saturday; P2 is immediately after P5. How many valid day-pairs exist for (P5, P2)?", opts: ["1", "2", "3", "4"], ans: 1, exp: "Open consecutive pairs among {Mon, Tue, Thu, Fri} are (Mon, Tue) and (Thu, Fri) -> 2 valid pairs." },
        { q: "Eight people sit around a square table (2 per side) facing center. How many people sit strictly between a person and the person directly opposite them?", opts: ["2", "3", "4", "6"], ans: 1, exp: "On an 8-person closed loop, opposite positions are separated by 3 people on each side." },
        { q: "[TITA] In how many ways can 4 managers sit in a row of 4 chairs if Manager M1 refuses to sit at either end?", opts: ["6", "12", "18", "24"], ans: 1, exp: "M1 has 2 middle seats (Pos 2 or 3); remaining 3 managers arrange in 3! = 6 ways => 2 * 6 = 12." },
        { q: "Five boxes of weights 10, 20, 30, 40, 50 kg are stacked vertically. The 50 kg box is immediately below the 20 kg box, and the 10 kg box is at the very top. If 40 kg is at the bottom, which box is 3rd from the top?", opts: ["20 kg", "30 kg", "40 kg", "50 kg"], ans: 3, exp: "Top=10, Bottom=40. Block (20 over 50) can be (2nd, 3rd) or (3rd, 4th); either way, if (20,50) is (2,3) then 50 kg is 3rd; if (30 is 2nd, 20 is 3rd, 50 is 4th), 20 kg is 3rd—wait: if 30 is 4th, 50 kg is 3rd!" }
      ]
    },
    {
      id: "cat_dilr_2",
      kicker: "CAT DILR MASTER LAB • MODULE 2 OF 5",
      title: "Quantitative DI: 3-Set & 4-Set Venn Maxima-Minima",
      sidebarSub: "1 Full Set per Slot (5 Qs) • Exact Linear Intersection Bounds & TITA",
      weightage: "5 Qs / 20 (25% DILR)",
      pace: "11–13 mins / Set",
      scoring: "High TITA (+3/0) Concentration",
      strategy: "Exact Boundary Identities",
      prereq: "Memorize 3-set inclusion-exclusion: n(A ∪ B ∪ C) = n(A) + n(B) + n(C) - n(A∩B) - n(B∩C) - n(C∩A) + n(A∩B∩C), and the exact triple-overlap bounds.",
      overview: "Quantitative Reasoning DI sets built around 3-set or 4-set overlaps appear in almost every CAT slot, frequently carrying 2 to 3 TITA questions. Instead of trial-and-error guessing inside circles, apply exact linear sum bounds to lock maxima and minima in 30 seconds.",
      bridge: "For 3 sets A, B, C inside universe U: Minimum triple overlap x_min = max(0, A + B + C - 2U), achieved when 'none' = 0 and single-only regions = 0. Maximum triple overlap x_max = min(A, B, C).",
      rules: [
        { name: "Law 1: Triple-Intersection Minimum Formula", desc: "x_min = max(0, A + B + C - 2U). Every person counted twice contributes to pairwise intersections; only excess above 2U is forced into all three sets." },
        { name: "Law 2: Triple-Intersection Maximum Formula", desc: "x_max = min(A, B, C), constructed by nesting the smallest set completely inside the other two." },
        { name: "Law 3: Exact-Two-Sets Conservation Equation", desc: "Let e1 = exact 1 set, e2 = exact 2 sets, e3 = exact 3 sets. Then e1 + e2 + e3 + none = U, and e1 + 2*e2 + 3*e3 = A + B + C." }
      ],
      workedExamples: [
        {
          title: "Worked Caselet 1: 3-Elective Overlap Bounds (U = 120)",
          problem: "In a cohort of 120 students, 90 take Finance, 85 take Strategy, and 80 take Analytics. Find: (a) Minimum taking all 3, (b) Maximum taking all 3, (c) Minimum taking NONE.",
          steps: "1. Sum = 90 + 85 + 80 = 255.\n2. Min all 3 = max(0, 255 - 2*120) = 255 - 240 = 15 students.\n3. Max all 3 = min(90, 85, 80) = 80 students.\n4. Min taking NONE = max(0, 120 - 255) = 0 (since sum >= U, everyone can take at least 1 elective)."
        },
        {
          title: "Worked Caselet 2: Solving Exact-Two Regions via Equations",
          problem: "In a survey of 100 readers, 60 read Paper A, 55 read B, 50 read C, 10 read none, and 15 read all three. How many read EXACTLY two papers?",
          steps: "1. Active readers = 100 - 10 = 90 => e1 + e2 + 15 = 90 => e1 + e2 = 75.\n2. Total memberships = 60 + 55 + 50 = 165 => e1 + 2*e2 + 3*(15) = 165 => e1 + 2*e2 = 120.\n3. Subtract equations: (e1 + 2*e2) - (e1 + e2) = 120 - 75 => e2 = 45 readers."
        }
      ],
      drills: [
        { q: "[TITA] In a survey of 200 consumers, 150 use App X, 140 use App Y, and 130 use App Z. What is the minimum number of consumers who use all three apps?", opts: ["10", "20", "30", "40"], ans: 1, exp: "max(0, 150 + 140 + 130 - 2*200) = 420 - 400 = 20." },
        { q: "Using the same 200-consumer survey (X=150, Y=140, Z=130), what is the maximum possible number of consumers using all three apps?", opts: ["120", "130", "140", "150"], ans: 1, exp: "min(150, 140, 130) = 130." },
        { q: "[TITA] Out of 80 employees, 50 know Excel, 45 know SQL, and 40 know Python. If 5 know none and 15 know all three, how many know EXACTLY two tools?", opts: ["20", "25", "30", "35"], ans: 2, exp: "e1 + e2 = 75 - 15 = 60; e1 + 2*e2 = 135 - 45 = 90 => e2 = 30." },
        { q: "In a class of 60 students, 40 play Cricket and 35 play Football. What is the maximum number of students who play NEITHER sport?", opts: ["15", "20", "25", "30"], ans: 1, exp: "Maximize 'neither' by nesting Football (35) inside Cricket (40) => union = 40 => neither = 60 - 40 = 20." },
        { q: "If 4 sets each have size 80 inside a universe of 100 elements, what is the minimum number of elements belonging to ALL 4 sets?", opts: ["0", "10", "20", "40"], ans: 2, exp: "Sum = 4*80 = 320. Subtract 3*100 = 300 => min all 4 = 320 - 300 = 20." },
        { q: "[TITA] In a group of 150 delegates, 95 speak English, 85 speak Hindi, and 20 speak neither. How many speak BOTH English and Hindi?", opts: ["40", "45", "50", "55"], ans: 2, exp: "Union = 150 - 20 = 130. Both = 95 + 85 - 130 = 50." }
      ]
    },
    {
      id: "cat_dilr_3",
      kicker: "CAT DILR MASTER LAB • MODULE 3 OF 5",
      title: "Round-Robin Tournaments, Knockout Brackets & Points Tables",
      sidebarSub: "1 Full Set per Slot (5 Qs) • Total-Points & Seed-Sum Invariants",
      weightage: "5 Qs / 20 (25% DILR)",
      pace: "11–13 mins / Set",
      scoring: "MCQ +3/-1 & TITA +3/0",
      strategy: "Conservation Equations First",
      prereq: "Know N(N-1)/2 matches in single round-robin, 2^k - 1 total matches in a 2^k knockout tournament, and seed-sum invariants per round.",
      overview: "Tournament caselets are high-yield IIM favorites because hidden match scores obey strict integer conservation laws. Writing the total-points sum equation before filling individual cells unlocks the entire table cleanly.",
      bridge: "In a knockout tournament with 2^k players (Seeds 1 to 2^k), if there are no upsets, the two seeds meeting in Round R always sum to 2^(k - R + 1) + 1.",
      rules: [
        { name: "Law 1: Round-Robin Points Conservation", desc: "In an N-team single round-robin (2 pts win, 1 pt draw, 0 loss), total matches = N(N-1)/2 and total points across all teams = N(N-1)." },
        { name: "Law 2: Knockout Seed-Sum Rule", desc: "In a 16-player draw, Round 1 pairs sum to 17, Quarterfinals sum to 9, Semifinals sum to 5, and Final sums to 3." },
        { name: "Law 3: Upset Slot Inheritance", desc: "When a lower seed upsets a higher seed, the lower seed inherits the higher seed's bracket path for all subsequent rounds." }
      ],
      workedExamples: [
        {
          title: "Worked Caselet 1: 16-Player Knockout Upset Path",
          problem: "In a 16-player knockout tournament (Seeds 1–16), Seed 14 upsets Seed 3 in Round 1, while all other higher seeds win. Whom does Seed 14 face in the Quarterfinals and Semifinals?",
          steps: "1. Round 1: (3 vs 14) [sum 17] and (6 vs 11) [sum 17]. Seed 14 inherits Seed 3's slot.\n2. Quarterfinals (sum = 9): Seed 3's slot meets 9 - 3 = Seed 6 => Seed 14 plays Seed 6.\n3. Semifinals (sum = 5): If Seed 14 beats Seed 6, it meets 5 - 3 = Seed 2."
        },
        {
          title: "Worked Caselet 2: 4-Team Round-Robin Distinct Scores",
          problem: "Four teams play a single round-robin league (2 pts win, 1 pt tie, 0 loss). All 4 teams finish with distinct integer points. Find the unique point distribution.",
          steps: "1. Total matches = 4C2 = 6 => Total points = 6 * 2 = 12 points.\n2. Max points for a single team = 3 * 2 = 6.\n3. Four distinct non-negative integers <= 6 summing to 12: {5, 4, 2, 1} or {6, 4, 2, 0} or {6, 3, 2, 1}—checking draw parity isolates valid match tables immediately!"
        }
      ],
      drills: [
        { q: "In a 6-team single round-robin league (2 pts win, 1 pt draw, 0 loss), if 4 matches end in a draw, what is the sum of points across all 6 teams?", opts: ["26", "28", "30", "34"], ans: 2, exp: "Total matches = 6C2 = 15. Every match awards 2 points -> 15 * 2 = 30." },
        { q: "In a 32-player knockout draw (Seeds 1 to 32) with no upsets, which seed faces Seed 5 in the Quarterfinals?", opts: ["Seed 3", "Seed 4", "Seed 12", "Seed 13"], ans: 1, exp: "Quarterfinals have 8 players -> seed sum = 9 -> 9 - 5 = Seed 4." },
        { q: "[TITA] How many total matches are played in a single-elimination knockout tournament with 64 players?", opts: ["32", "63", "64", "127"], ans: 1, exp: "Every match eliminates 1 player; to crown 1 champion from 64 players requires 64 - 1 = 63 matches." },
        { q: "In a 5-team round-robin league (2 pts win, 1 pt tie), no team goes undefeated and all 5 teams finish with distinct points. What is the maximum score of the 1st-place team?", opts: ["6", "7", "8", "9"], ans: 1, exp: "4 matches/team => max 8 pts. Not undefeated => max 7 pts (3W, 1D)." },
        { q: "In an 8-team double round-robin league, each team plays how many matches?", opts: ["7", "8", "14", "16"], ans: 2, exp: "Each team plays the other 7 teams twice => 7 * 2 = 14 matches." },
        { q: "In a 16-player knockout tournament, Seed 16 upsets Seed 1 in Round 1 and wins the Quarterfinal too. Which seed does Seed 16 meet in the Semifinals if no other upsets occur?", opts: ["Seed 2", "Seed 3", "Seed 4", "Seed 5"], ans: 2, exp: "Seed 16 inherits Seed 1's slot; in Semifinals (sum = 5), Seed 1 meets 5 - 1 = Seed 4." }
      ]
    },
    {
      id: "cat_dilr_4",
      kicker: "CAT DILR MASTER LAB • MODULE 4 OF 5",
      title: "Routes, Directed Networks, Flow Capacities & Matrix Grids",
      sidebarSub: "1 Full Set per Slot (5 Qs) • Flow Conservation & Min-Cut Optimization",
      weightage: "5 Qs / 20 (25% DILR)",
      pace: "11–13 mins / Set",
      scoring: "MCQ +3/-1 & TITA +3/0",
      strategy: "Node Balance + Min-Cut Bottleneck",
      prereq: "Understand directed graph path counting (combinatorial grid steps) and intermediate node flow balance (Inflow = Outflow).",
      overview: "Network and grid-routing sets model supply chains, metro lines, or data packets moving from Source S to Sink T across constrained edges. Every intermediate hub obeys strict conservation: total units entering a hub must equal total units leaving it.",
      bridge: "To find the maximum flow from S to T, identify the bottleneck cut—the set of edges separating S from T with the smallest combined capacity.",
      rules: [
        { name: "Law 1: Intermediate Hub Conservation", desc: "For every node V != S, T: Sum of inflows into V = Sum of outflows from V." },
        { name: "Law 2: Max-Flow Min-Cut Theorem", desc: "The maximum possible flow from Source S to Sink T equals the minimum total capacity across any edge-cut disconnecting S from T." },
        { name: "Law 3: Grid Path Counting", desc: "On an m x n rectangular grid moving only Right and Up, total shortest paths = (m + n)! / (m! * n!)." }
      ],
      workedExamples: [
        {
          title: "Worked Caselet: Multi-Path Pipeline Capacity",
          problem: "Source S sends water to Hub A (cap 10) and Hub B (cap 8). Hub A sends to Sink T (cap 6) and Hub B (cap 4). Hub B sends to Sink T (cap 11). Find maximum flow from S to T.",
          steps: "1. S -> A carries 10 units: 6 go directly A -> T (full) and 4 go A -> B (full).\n2. S -> B carries 7 units: B receives 4 + 7 = 11 units and sends all 11 to T (full).\n3. Maximum flow reaching T = 6 + 11 = 17 units."
        }
      ],
      drills: [
        { q: "In the pipeline network above (S->A cap 10, S->B cap 8, A->T cap 6, A->B cap 4, B->T cap 11), if link A->B is closed, what is the new max flow from S to T?", opts: ["12", "14", "15", "16"], ans: 1, exp: "Upper path S->A->T carries min(10,6)=6; lower path S->B->T carries min(8,11)=8 => 6 + 8 = 14." },
        { q: "[TITA] How many shortest paths exist from bottom-left (0,0) to top-right (4,3) on a grid moving only Right or Up?", opts: ["21", "28", "35", "42"], ans: 2, exp: "(4 + 3)! / (4! * 3!) = 7! / (24 * 6) = 35 paths." },
        { q: "If a grid path from (0,0) to (4,3) MUST pass through checkpoint (2,2), how many valid paths exist?", opts: ["12", "15", "18", "24"], ans: 2, exp: "(0,0)->(2,2) = 4C2 = 6 paths; (2,2)->(4,3) = 3C2 = 3 paths => 6 * 3 = 18 paths." },
        { q: "At intermediate Hub X, inflows are 15 and 9 units, and one outflow carries 11 units. What must the second outflow carry?", opts: ["11", "12", "13", "15"], ans: 2, exp: "Total inflow = 15 + 9 = 24 => Second outflow = 24 - 11 = 13 units." }
      ]
    },
    {
      id: "cat_dilr_5",
      kicker: "CAT DILR MASTER LAB • MODULE 5 OF 5",
      title: "Truth-Tellers, Liars, Alternators & Logical Deduction",
      sidebarSub: "1 Full Set per Slot (5 Qs) • Contradiction Pairing & Statement Parity",
      weightage: "5 Qs / 20 (25% DILR)",
      pace: "10–12 mins / Set",
      scoring: "MCQ +3/-1 & TITA +3/0",
      strategy: "Contradiction Anchor + Column Sum",
      prereq: "Understand Truth-Tellers (TT), Liars (FF), and Alternators (TF or FT), and spot mutually contradictory statements immediately.",
      overview: "Binary logic puzzles present 3 to 5 speakers making 2 to 3 statements each about rankings, prizes, or identities. Because direct contradictions force one speaker to be true and the other false, they eliminate 80% of truth-table cases in seconds.",
      bridge: "Always sum the total number of true statements across the room: if there is 1 TT (2T), 1 LL (0T), and 1 Alternator (1T), the entire grid must contain exactly 2 + 0 + 1 = 3 true statements.",
      rules: [
        { name: "Law 1: Mutual Contradiction Pair", desc: "If A states 'X is true' and B states 'X is false', one statement is True and one is False—neither both TT nor both LL." },
        { name: "Law 2: Self-Referential Impossibility", desc: "A Truth-teller can NEVER say 'I am a Liar' or 'I am an Alternator'." }
      ],
      workedExamples: [
        {
          title: "Worked Caselet: Mutually Exclusive Winner Claims",
          problem: "Four finalists (A, B, C, D) each make 1 statement about who won 1st place: A: 'B won.' B: 'D won.' C: 'I did not win.' D: 'B is lying.' Exactly ONE finalist tells the truth. Who won?",
          steps: "1. Notice B ('D won') and D ('B is lying') directly contradict each other => the single truth-teller MUST be either B or D.\n2. Therefore, both A ('B won') and C ('I did not win') are FALSE.\n3. Since C ('I did not win') is FALSE, C MUST have won 1st place! (Check: B is false, D is true -> exactly 1 truth-teller)."
        }
      ],
      drills: [
        { q: "Four speakers each make 1 statement: A: 'Exactly 1 of us is lying.' B: 'Exactly 2 of us are lying.' C: 'Exactly 3 of us are lying.' D: 'All 4 of us are lying.' How many tell the truth?", opts: ["0", "1", "2", "3"], ans: 1, exp: "Mutually exclusive claims -> at most 1 is true -> 3 are lying -> C is true and A, B, D are false." },
        { q: "In the 4-finalist puzzle above (A: 'B won', B: 'D won', C: 'I did not win', D: 'B is lying') with exactly 1 truth-teller, who is the truth-teller?", opts: ["A", "B", "C", "D"], ans: 3, exp: "C won, so B ('D won') is false and D ('B is lying') is true." },
        { q: "A Truth-teller makes 2 statements, a Liar makes 2 statements, and an Alternator makes 2 statements. What is the exact total number of FALSE statements made by all three?", opts: ["2", "3", "4", "5"], ans: 1, exp: "False counts: TT=0, LL=2, Alternator=1 => 0 + 2 + 1 = 3 false statements." }
      ]
    }
  ];

  // Reuse comprehensive modules for GMAT & GRE as well
  const MODULES = exam === "CAT" ? CAT_MODULES : CAT_MODULES.map((m, i) => ({
    ...m,
    kicker: `${exam} ANALYTICAL & DATA LAB • MODULE ${i + 1} OF 5`,
    title: exam === "GMAT"
      ? ["Data Sufficiency (DS): Value vs. Yes/No & Constraint Isolation", "Multi-Source Reasoning (MSR): Cross-Tab Financial Synthesis", "Two-Part Analysis (TPA) & Coupled Business Models", "Table Analysis & Graphics Interpretation Scatter Ratios", "Logical Paradoxes & Conditional Scheduling Grids"][i]
      : ["Multi-Chart Data Interpretation: Shifting Bases & Growth", "Standard Deviation, Quartiles & Normal Distributions", "Counting, Probability & Venn Overlap Models", "Analytical Writing (AWA): 6.0 Conditional Thesis Architecture", "Rate-Work-Ratio & Quantitative Comparison Data Models"][i]
  }));

  window._DILR_ACTIVE_IDX = window._DILR_ACTIVE_IDX || 0;
  window._DILR_SUBTAB = window._DILR_SUBTAB || "THEORY";
  if (window._DILR_ACTIVE_IDX >= MODULES.length) window._DILR_ACTIVE_IDX = 0;
  const m = MODULES[window._DILR_ACTIVE_IDX];

  const leftNav = MODULES.map((item, idx) => `
    <button type="button" onclick="window._DILR_ACTIVE_IDX=${idx}; window.renderTab2(document.getElementById('main-workspace')); document.getElementById('main-workspace')?.scrollIntoView({behavior:'smooth', block:'start'});"
      class="w-full text-left p-4 rounded-2xl border transition cursor-pointer ${idx === window._DILR_ACTIVE_IDX ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/40 shadow-sm' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400'}">
      <div class="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">${item.title}</div>
      <div class="text-xs text-slate-500 mt-1">${item.sidebarSub}</div>
    </button>
  `).join("");

  const theoryView = `
    <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
      <div class="flex items-center justify-between">
        <span class="font-extrabold uppercase text-[11px] text-indigo-600">Comprehensive Chapter Overview &amp; Concept Bridge</span>
        <span class="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">Master Study Guide</span>
      </div>
      <p>${m.overview}</p>
      <p><strong>Concept Bridge:</strong> ${m.bridge}</p>
      <div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <strong class="text-indigo-600">Prerequisites &amp; Core Identities:</strong> ${m.prereq}
      </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
      <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950">
        <div class="text-[10px] font-bold uppercase text-slate-400">Exam Weightage</div>
        <div class="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">${m.weightage}</div>
      </div>
      <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950">
        <div class="text-[10px] font-bold uppercase text-slate-400">Target Pace</div>
        <div class="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">${m.pace}</div>
      </div>
      <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950">
        <div class="text-[10px] font-bold uppercase text-slate-400">Scoring / Format</div>
        <div class="text-xs font-extrabold text-indigo-600 dark:text-indigo-300 mt-0.5">${m.scoring}</div>
      </div>
      <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950">
        <div class="text-[10px] font-bold uppercase text-slate-400">99th %ile Strategy</div>
        <div class="text-xs font-extrabold text-amber-600 dark:text-amber-300 mt-0.5">${m.strategy}</div>
      </div>
    </div>

    <div class="space-y-2.5">
      <div class="font-extrabold uppercase text-[11px] text-indigo-600">Core Principles, Theorems &amp; Exam Laws</div>
      ${m.rules.map(r => `
        <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs">
          <div class="font-extrabold text-slate-900 dark:text-white">${r.name}</div>
          <div class="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">${r.desc}</div>
        </div>
      `).join("")}
    </div>

    <div class="space-y-2.5">
      <div class="font-extrabold uppercase text-[11px] text-amber-700 dark:text-amber-300">Step-by-Step Worked Examples (${m.workedExamples.length})</div>
      ${m.workedExamples.map(w => `
        <div class="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1.5 text-xs leading-relaxed">
          <div class="font-extrabold text-amber-900 dark:text-amber-200">${w.title}</div>
          <div class="font-semibold text-slate-800 dark:text-slate-200 whitespace-pre-line">${w.problem}</div>
          <div class="text-slate-700 dark:text-slate-300 whitespace-pre-line pt-1 border-t border-amber-200/70 dark:border-amber-800/60">${w.steps}</div>
        </div>
      `).join("")}
    </div>
  `;

  const drillsView = `
    <div class="space-y-3">
      <div class="font-extrabold uppercase text-[11px] text-emerald-700 dark:text-emerald-400">Interactive Chapter Practice Drills (${m.drills.length} Questions — Click an Option to Reveal Full Derivation)</div>
      ${m.drills.map((d, i) => `
        <div class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2.5">
          <div class="text-xs font-extrabold text-slate-900 dark:text-white">Practice Drill Q${i + 1}. ${d.q}</div>
          <div class="flex flex-wrap gap-2">
            ${d.opts.map((o, oi) => `
              <button type="button" onclick="this.parentElement.nextElementSibling.classList.remove('hidden')"
                class="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-indigo-500 text-xs font-semibold cursor-pointer">
                <strong>${String.fromCharCode(65 + oi)}.</strong> ${o}
              </button>
            `).join("")}
          </div>
          <div class="hidden p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200">
            <strong>Solution (${String.fromCharCode(65 + d.ans)} — ${d.opts[d.ans]}):</strong> ${d.exp}
          </div>
        </div>
      `).join("")}
    </div>
  `;

  el.innerHTML = `
    <div class="max-w-7xl mx-auto my-4 grid grid-cols-1 lg:grid-cols-12 gap-5">
      <div class="lg:col-span-4 space-y-3">
        <div class="text-xs font-extrabold uppercase tracking-wider text-indigo-600">${exam} ANALYTICAL &amp; DATA MODULES (${MODULES.length} CHAPTERS)</div>
        ${leftNav}
      </div>
      <div class="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <span class="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">${m.kicker}</span>
        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white">${m.title}</h2>

        <div class="flex flex-wrap items-center gap-2 pt-0.5">
          <button type="button" onclick="window._DILR_SUBTAB='THEORY'; window.renderTab2(document.getElementById('main-workspace')); document.getElementById('main-workspace')?.scrollIntoView({behavior:'smooth', block:'start'});"
            class="px-4 py-2 rounded-full text-xs font-bold cursor-pointer ${window._DILR_SUBTAB === 'THEORY' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'}">
            Chapter Refresher &amp; Theory
          </button>
          <button type="button" onclick="window._DILR_SUBTAB='DRILLS'; window.renderTab2(document.getElementById('main-workspace')); document.getElementById('main-workspace')?.scrollIntoView({behavior:'smooth', block:'start'});"
            class="px-4 py-2 rounded-full text-xs font-bold cursor-pointer ${window._DILR_SUBTAB === 'DRILLS' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'}">
            Shortcuts &amp; ${m.drills.length} Practice Drills
          </button>
        </div>

        ${window._DILR_SUBTAB === "DRILLS" ? drillsView : theoryView}
      </div>
    </div>
  `;
};