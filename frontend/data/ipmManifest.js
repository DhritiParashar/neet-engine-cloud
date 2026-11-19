window.IPM_MANIFEST = {
  brand: "GOALisB GRE Master",
  tagline: "Section-Adaptive Prep for GRE General (260–340 Scale + AWA 6.0) • MS, PhD & MBA",

  examModes: {
    ALL_IIM_MASTER: {
      id: "ALL_IIM_MASTER",
      label: "GRE General Standard (54 Qs + AWA)",
      badge: "260–340 Scale",
      campuses: [
        "MIT", "Stanford", "UC Berkeley", "Carnegie Mellon",
        "ETH Zurich", "Oxford", "Cambridge", "Georgia Tech"
      ],
      programTypes: ["MS CS / AI / Data Science", "PhD", "GRE-to-MBA"],
      totalQuestions: 54,
      durationMinutes: 118,
      sectionalTimeLock: true,
      marking: { mcqCorrect: 1, mcqWrong: 0, saCorrect: 1, saWrong: 0 },
      sections: [
        { id: "varc", name: "Analytical Writing (1 Analyze an Issue Essay — 0.0 to 6.0)", questions: 1, minutes: 30, type: "ESSAY" },
        { id: "varc_s1", name: "Verbal Reasoning (Stage 1: 12 Qs • Stage 2 Adaptive: 15 Qs)", questions: 27, minutes: 41, type: "MCQ" },
        { id: "quant_core", name: "Quantitative Reasoning (Stage 1: 12 Qs • Stage 2 Adaptive: 15 Qs)", questions: 27, minutes: 47, type: "SA_AND_MCQ" }
      ],
      selectionWeights: { test: 50, piWat: 25, academics10_12: 25 },
      keyFocus: "Section-level adaptive routing (Easy/Medium/Hard Stage 2), Quantitative Comparison, Text Completion, Sentence Equivalence & AWA 5.0+."
    },
    GRE_QUANT_170: {
      id: "GRE_QUANT_170",
      label: "Quant 170 Perfection Sprint",
      badge: "130–170 Q",
      campuses: ["MIT EECS", "Stanford MSCS", "CMU SCS", "UC Berkeley"],
      programTypes: ["Quantitative Comparison", "Numeric Entry", "Data Analysis"],
      totalQuestions: 27,
      durationMinutes: 47,
      sectionalTimeLock: true,
      marking: { mcqCorrect: 1, mcqWrong: 0, saCorrect: 1, saWrong: 0 },
      sections: [
        { id: "quant_core", name: "Quant Stage 1 (12 Qs / 21m) + Stage 2 Hard (15 Qs / 26m)", questions: 27, minutes: 47, type: "SA_AND_MCQ" }
      ],
      selectionWeights: { test: 100, piWat: 0, academics10_12: 0 },
      keyFocus: "Zero careless errors in Quantitative Comparison (ABCD boundary traps) & multi-select Data Analysis."
    },
    GRE_VERBAL_165_AWA: {
      id: "GRE_VERBAL_165_AWA",
      label: "Verbal 165+ & AWA 5.5 Studio",
      badge: "TC / SE / RC",
      campuses: ["Ivy League PhD / MA", "Oxford", "Cambridge", "LSE"],
      programTypes: ["Text Completion", "Sentence Equivalence", "Issue Essay"],
      totalQuestions: 27,
      durationMinutes: 41,
      sectionalTimeLock: true,
      marking: { mcqCorrect: 1, mcqWrong: 0, saCorrect: 1, saWrong: 0 },
      sections: [
        { id: "varc", name: "Text Completion (1/2/3-Blank), Sentence Equivalence & Dense RC", questions: 27, minutes: 41, type: "MCQ" }
      ],
      selectionWeights: { test: 100, piWat: 0, academics10_12: 0 },
      keyFocus: "High-frequency GRE vocabulary pairs, contrast/support logic & structured 5-paragraph AWA Issue essays."
    }
  },

  curriculumPillars: [
    {
      id: "quant_core",
      title: "1. GRE Quantitative Reasoning (Arithmetic, Algebra, Geometry & Data Analysis)",
      relevance: "27 Qs • 47 Mins (130–170 Scale • Includes Geometry & Quantitative Comparison)",
      topics: ["Quantitative Comparison (ABCD Trap Protocol)", "Arithmetic: Primes, Remainders, Ratios & Percent Change", "Algebra: Inequalities, Functions, Coordinate Geometry & Exponents", "Geometry: Triangles, Circles, Polygons & 3D Solids", "Data Analysis: Normal Distribution, Standard Deviation, Quartiles & Combinatorics"]
    },
    {
      id: "varc",
      title: "2. GRE Verbal Reasoning (Text Completion, Sentence Equivalence & RC)",
      relevance: "27 Qs • 41 Mins (130–170 Scale)",
      topics: ["Sentence Equivalence (Synonym-Pair Elimination)", "Single, Double & Triple-Blank Text Completion", "Reading Comprehension: Argument Structure, Inference & Function", "1,000+ High-Frequency GRE Vocabulary Clusters"]
    },
    {
      id: "dilr",
      title: "3. GRE Data Interpretation & Analytical Writing (AWA 0.0–6.0)",
      relevance: "Quant Data Sets + 30-Min Analyze an Issue Essay",
      topics: ["Multi-Chart GRE Data Interpretation Sets", "AWA Issue Essay: Thesis Framing, Counter-Arguments & Concessions", "ETS 6-Point Holistic Rubric Calibration"]
    }
  ]
};