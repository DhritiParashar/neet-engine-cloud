window.IPM_VARC = [
  {
    id: "varc_01",
    pillar: "varc",
    title: "Reading Comprehension (Conceptual, Business & Policy Passages)",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "OMETs_BG_JAMMU", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"],
    weightage: "3 Full Passages (15-18 Qs) in GRE General 2026 + OMETs/Rohtak",
    concepts: [
      {
        heading: "Conceptual & Opinion-Based RC Mapping (GRE General 2026 Trend)",
        formula: "Main Idea = Author's Central Claim + Scope Boundaries (Tone: Analytical / Skeptical / Nuanced)",
        derivation: "GRE General 2025 and 2026 featured 3 RCs spanning behavioral psychology ('rage bait'), socio-economics, and abstract philosophy where questions test author attitude and subtle inference rather than word-matching.",
        shortcut: "Read the first and last sentences of every paragraph to map structural shifts ('However', 'Yet', 'Paradoxically') before looking at the questions."
      }
    ],
    traps: [
      {
        title: "Picking Factually True Outside Statements Not Supported by Passage",
        wrongStep: "Choosing an economically true statement that the author never actually mentioned or implied.",
        correction: "Treat the passage as the entire universe—eliminate any option requiring external assumptions or extreme words ('always', 'solely', 'never').",
        penalty: "-1 Mark in MCQ"
      }
    ],
    questions: [
      {
        id: "varc_rc1",
        type: "MCQ",
        section: "varc",
        prompt: "[Reading Comprehension Passage — GRE General 2026 Style]\nPASSAGE: 'Algorithmic curation on digital platforms increasingly rewards \"rage bait\"—content engineered not to persuade or inform, but to provoke immediate moral outrage. Because high-arousal negative emotions generate rapid clicks and replies, engagement-maximizing models inadvertently amplify fringe provocations over nuanced analysis. Ironically, while users report heightened fatigue and distrust toward public discourse, their reflexive interactions continue to train recommendation engines to surface even more polarizing material.'\n\nQ1. Which of the following best captures the central paradox highlighted in the passage?",
        options: [
          "Digital platforms intentionally suppress informative journalism to reduce server costs.",
          "Users' instinctive engagement with infuriating content reinforces algorithms that produce the very discourse users claim to distrust.",
          "Moral outrage is the only emotion capable of generating advertising revenue online.",
          "Nuanced analysis is inherently unpopular among educated internet readers."
        ],
        answer: 1,
        explanation: "The passage explicitly states that users report fatigue/distrust yet their reflexive clicks train recommendation models to amplify polarizing 'rage bait' (Option B)."
      },
      {
        id: "varc_rc2",
        type: "MCQ",
        section: "varc",
        prompt: "[Based on the 'Rage Bait' Passage Above]\nQ2. The author's tone toward engagement-maximizing recommendation models can best be described as:",
        options: [
          "Celebratory and optimistic",
          "Critically analytical",
          "Dismissively sarcastic",
          "Indifferent and detached"
        ],
        answer: 1,
        explanation: "The author diagnoses the causal mechanism ('inadvertently amplify', 'Ironically') objectively without sarcasm or praise -> Critically analytical."
      },
      {
        id: "varc_rc3",
        type: "MCQ",
        section: "varc",
        prompt: "[Based on the 'Rage Bait' Passage Above]\nQ3. Which intervention would most directly disrupt the feedback loop described in the passage?",
        options: [
          "Increasing the character limit on user comments.",
          "Weighting recommendation algorithms toward sustained reading depth rather than immediate click-and-reply velocity.",
          "Banning all political commentary from social media platforms.",
          "Requiring users to verify their real identities before posting."
        ],
        answer: 1,
        explanation: "Since rapid clicks/replies drive the loop, shifting algorithmic weights away from immediate high-arousal velocity directly breaks the cycle."
      }
    ]
  },
  {
    id: "varc_02",
    pillar: "varc",
    title: "Vocabulary, Confusable Words & Double/Triple Fill in the Blanks",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "OMETs_BG_JAMMU", "IIMB_UG_ECON_DS_DBE"],
    weightage: "High Spike in GRE General 2026 (10-14 Qs across Vocab, Fillers & Idioms)",
    concepts: [
      {
        heading: "Context-Clue & Polarity Elimination for Double/Triple Fillers",
        formula: "Blank Polarity (+ / -) + Tone Connectors ('despite', 'consequently', 'albeit') + Collocation Fit",
        derivation: "GRE General 2026 heavily tested nuanced word pairs (e.g., appraise vs. apprise, reticent vs. reluctant, mitigating vs. militating, ephemeral vs. perennial).",
        shortcut: "Solve the SECOND or THIRD blank first! Often one blank has a strict preposition or collocation requirement that eliminates 3 of the 4 options instantly."
      },
      {
        heading: "High-Frequency GRE General Confusable Pairs & Root Families",
        formula: "Appraise (evaluate value) vs. Apprise (inform);  Discreet (prudent/tactful) vs. Discrete (separate)",
        derivation: "Root families like 'equi-' (equanimity, equivocal), 'pan-' (panacea, pandemic), and 'ob-/ab-' (obdurate, abstemious) recur frequently in CAT and Rohtak.",
        shortcut: "Check prepositions: 'apprise OF', 'acquiesce IN', 'averse TO', 'immune TO/FROM'."
      }
    ],
    traps: [
      {
        title: "Homophone / Near-Synonym Substitution Trap",
        wrongStep: "'The CFO appraised the board of the liquidity crunch.'",
        correction: "'Appraise' means to assess value; 'apprise' means to inform/notify. Correct verb: 'apprised'.",
        penalty: "-1 Mark in MCQ"
      }
    ],
    questions: [
      {
        id: "varc_v1",
        type: "MCQ",
        section: "varc",
        prompt: "[Double Fill-in-the-Blanks — GRE General 2026 Pattern]\nAlthough the startup's initial revenue projections appeared overly _______, the founders managed to _______ skeptical venture capitalists with disciplined unit economics.\nSelect the pair that best completes the sentence:",
        options: [
          "sanguine ... mollify",
          "lugubrious ... exacerbate",
          "parsimonious ... alienate",
          "ephemeral ... obfuscate"
        ],
        answer: 0,
        explanation: "'Although' signals contrast: overly optimistic ('sanguine') projections vs. calming/winning over ('mollify') skeptical investors."
      },
      {
        id: "varc_v2",
        type: "MCQ",
        section: "varc",
        prompt: "[Triple Fill-in-the-Blanks — GRE General Pattern]\nFar from being a _______ solution, the new regulatory framework proved _______ in practice, often _______ the very market inefficiencies it sought to eliminate.",
        options: [
          "panacea ... counterproductive ... exacerbating",
          "catalyst ... seamless ... mitigating",
          "stopgap ... infallible ... curbing",
          "harbinger ... redundant ... forestalling"
        ],
        answer: 0,
        explanation: "'Far from being a cure-all (panacea), it proved counterproductive, worsening (exacerbating) inefficiencies.'"
      },
      {
        id: "varc_v3",
        type: "MCQ",
        section: "varc",
        prompt: "[Vocabulary & Word Usage — GRE General 2026 Spike]\nWhich sentence uses the underlined word INCORRECTLY?",
        options: [
          "The committee must apprise all stakeholders of the revised admission timeline.",
          "Independent auditors were hired to appraise the distressed company's real estate assets.",
          "Because the data sets were stored in discrete silos, cross-departmental analytics was delayed.",
          "The diplomat made a discrete remark to avoid embarrassing the visiting delegation."
        ],
        answer: 3,
        explanation: "Option D confuses 'discrete' (separate/distinct) with 'discreet' (tactful/prudent)."
      }
    ]
  },
  {
    id: "varc_03",
    pillar: "varc",
    title: "Grammar (Error Spotting), Para-Jumbles, Para-Completion & Conversation Analysis",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "OMETs_BG_JAMMU"],
    weightage: "15-18 Qs in GRE General & Rohtak",
    concepts: [
      {
        heading: "Mandatory Pairs in Para-Jumbles & Para-Completion",
        formula: "General Premise -> Specific Evidence -> Contrast ('However') -> Synthesis ('Thus')",
        derivation: "Para-completions require matching the scope and tone of the preceding sentence without introducing an abrupt new topic.",
        shortcut: "In Error Spotting, check in exact order: (1) Subject-Verb Agreement, (2) Pronoun Antecedent, (3) Modifier Placement, (4) Parallelism, (5) Conditional Tense."
      }
    ],
    traps: [
      {
        title: "Dangling Modifiers & Correlative Conjunction Parallelism",
        wrongStep: "'Not only did the policy reduce inflation, but also boosted rural consumption.'",
        correction: "'Not only did the policy reduce..., but it also boosted...' (parallel verb clauses after 'Not only... but also').",
        penalty: "-1 Mark in MCQ"
      }
    ],
    questions: [
      {
        id: "varc_g1",
        type: "MCQ",
        section: "varc",
        prompt: "[Grammar — Spotting the Error (GRE General 2026)]\nIdentify the segment containing a grammatical error:\n(A) Neither the Chief Economist / (B) nor the senior policy advisors / (C) was able to anticipate / (D) the sudden surge in bond yields.",
        options: ["Segment (A)", "Segment (B)", "Segment (C)", "Segment (D)"],
        answer: 2,
        explanation: "With 'Neither... nor...', the verb agrees with the nearer subject ('senior policy advisors' — plural), so 'was' in Segment (C) must be 'were'."
      },
      {
        id: "varc_g2",
        type: "MCQ",
        section: "varc",
        prompt: "[Conversation Analysis — GRE General 2026 Format]\nManager: 'Our customer acquisition cost jumped 30% last quarter, yet repeat retention remained flat at 42%.'\nAnalyst: 'That suggests our new referral discounts are attracting bargain-hunters rather than high-lifetime-value users.'\nWhich assumption underlies the Analyst's response?",
        options: [
          "Customer acquisition costs should never exceed 10% of gross revenue.",
          "High-lifetime-value users typically exhibit higher repeat retention rates than bargain-hunters.",
          "Referral discounts are illegal under current digital commerce guidelines.",
          "Retention rates cannot be measured within a single quarter."
        ],
        answer: 1,
        explanation: "The analyst infers that new users are bargain-hunters specifically because retention stayed flat—assuming genuinely high-LTV users would have boosted retention."
      },
      {
        id: "varc_g3",
        type: "MCQ",
        section: "varc",
        prompt: "[Para-Jumble — Mandatory Pair Logic]\nArrange sentences A, B, C, D into a coherent paragraph:\nA. Consequently, early exposure to data analytics and economics is vital for undergraduate management students.\nB. Modern corporate strategy increasingly relies on empirical evidence rather than intuition alone.\nC. This shift has transformed entry-level expectations across consulting and financial services.\nD. Traditional undergraduate degrees, however, often delay quantitative modeling until postgraduate study.",
        options: ["BCDA", "BDCA", "CBDA", "DBCA"],
        answer: 0,
        explanation: "B introduces the empirical shift; C refers to 'This shift'; D introduces the contrast ('however') in traditional degrees; A concludes with 'Consequently'."
      }
    ]
  }
];