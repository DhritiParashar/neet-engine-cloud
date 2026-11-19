window.IPM_EXHAUSTIVE_TRAPS = [
  { id: "tr_1", domain: "Quant & Higher Math", title: "Reversing Percentage Hike Without Shifting Base", wrongStep: "Price rises 25%, then drops 25% -> Net change = 0%.", correction: "+25 + (-25) + (25 * -25)/100 = -6.25% net loss (always -x^2/100%).", penalty: "-1 Mark in MCQ" },
  { id: "tr_2", domain: "Quant & Higher Math", title: "Arithmetic Mean Instead of Harmonic Mean for Equal-Distance Speed", wrongStep: "40 km/h going and 60 km/h returning -> Avg speed = (40+60)/2 = 50 km/h.", correction: "Equal distances require Harmonic Mean: 2(40)(60)/(40+60) = 48 km/h.", penalty: "-1 Mark in MCQ" },
  { id: "tr_3", domain: "Quant & Higher Math", title: "Extraneous Negative Roots in Logarithmic Equations", wrongStep: "log_2(x-3) + log_2(x-2) = 1 => (x-3)(x-2)=2 => x = 4 or x = 1.", correction: "x = 1 makes (x-3) = -2 < 0 (undefined domain!). Reject x = 1; only x = 4 is valid.", penalty: "-1 Mark / Wrong SA" },
  { id: "tr_4", domain: "Quant & Higher Math", title: "Pulling Scalar k Out of Determinant Without Power n", wrongStep: "For 3x3 matrix A with |A| = 4, |2A| = 2 * 4 = 8.", correction: "Each of the 3 rows scales by 2: |2A| = 2^3 * 4 = 8 * 4 = 32.", penalty: "-1 Mark in MCQ" },
  { id: "tr_5", domain: "Quant & Higher Math", title: "Confusing Distinct vs Identical Object Distribution", wrongStep: "Distributing 6 identical coins among 3 kids = 3^6 = 729.", correction: "3^6 applies to DISTINCT coins. For IDENTICAL coins use Stars & Bars: C(6+3-1, 3-1) = C(8,2) = 28.", penalty: "-1 Mark / Wrong SA" },
  { id: "tr_6", domain: "Quant & Higher Math", title: "Cross-Multiplying Variable Denominators in Inequalities", wrongStep: "(x - 1)/(x + 2) > 1 => x - 1 > x + 2 => No solution.", correction: "Bring 1 to LHS: -3/(x + 2) > 0 => x + 2 < 0 => x < -2.", penalty: "-1 Mark in MCQ" },
  { id: "tr_7", domain: "Quant & Higher Math", title: "Adding Constant Origin Shift b to Standard Deviation", wrongStep: "Dataset with SD = 5 has every value increased by 10 -> New SD = 15.", correction: "Spread is invariant to shift of origin (+10); New SD stays 5.", penalty: "-1 Mark in MCQ" },
  { id: "tr_8", domain: "Quant & Higher Math", title: "Skipping Zero-Penalty GRE General SA Questions", wrongStep: "Leaving 4 tough SA numerical questions blank out of fear of negative marks.", correction: "GRE General Section 1 (SA) has ZERO negative marking—always enter your best estimate!", penalty: "Lost +4 Opportunity" },
  { id: "tr_9", domain: "DI & LR", title: "Percentage Points vs Relative Percentage Growth", wrongStep: "Market share moves from 20% to 25% -> Growth = 5%.", correction: "That is a 5 percentage-point rise, equal to (5/20)*100 = 25% relative growth.", penalty: "-1 Mark in MCQ" },
  { id: "tr_10", domain: "DI & LR", title: "Treating 'Some A are B' as 'Some A are NOT B'", wrongStep: "Statement: Some managers are leaders -> Conclusion: Some managers are not leaders (True).", correction: "In formal syllogisms, 'Some' means 'at least one, possibly all'. 'Some not' never follows.", penalty: "-1 Mark in MCQ" },
  { id: "tr_11", domain: "DI & LR", title: "Carrying Statement I Data into Statement II in Data Sufficiency", wrongStep: "Using x = 5 found in Statement I while evaluating Statement II independently.", correction: "Reset memory completely before testing Statement II alone.", penalty: "-1 Mark in MCQ" },
  { id: "tr_12", domain: "DI & LR", title: "Rejecting a Guaranteed 'No' as Insufficient in DS", wrongStep: "Question: 'Is n > 10?' Statement I proves n = 3 -> Marked Insufficient.", correction: "A 100% certain 'No' uniquely answers the question and IS sufficient.", penalty: "-1 Mark in MCQ" },
  { id: "tr_13", domain: "VARC & Vocab", title: "Homophone Confusion: Appraise vs Apprise / Discreet vs Discrete", wrongStep: "'The CFO appraised the board of the audit' / 'He made a discrete remark.'", correction: "'Apprised' = informed; 'Discreet' = tactful/prudent ('discrete' = separate).", penalty: "-1 Mark in MCQ" },
  { id: "tr_14", domain: "VARC & Vocab", title: "Selecting Factually True Outside Knowledge in RC Inference", wrongStep: "Choosing an economically true statement never supported by the passage.", correction: "Treat the passage as the entire universe; eliminate out-of-scope truths.", penalty: "-1 Mark in MCQ" },
  { id: "tr_15", domain: "VARC & Vocab", title: "Plural Verb After 'Each / Every / Neither / The number of'", wrongStep: "'The number of GRE General applicants have doubled.'", correction: "'The number of...' is singular -> 'has doubled' ('A number of...' is plural).", penalty: "-1 Mark in MCQ" },
  { id: "tr_16", domain: "VARC & Vocab", title: "Using 'Than' Instead of 'When' After 'Hardly / Scarcely'", wrongStep: "'Hardly had the exam begun than the server lagged.'", correction: "'Hardly/Scarcely' pairs strictly with 'when'; 'No sooner' pairs with 'than'.", penalty: "-1 Mark in MCQ" }
];

window.IPM_EXPANDED_PI_PROMPTS = [
  ...(window.IPM_INTERVIEW_PI || []),
  {
    id: "pi_jammu",
    campus: "IIM Jammu (5-Yr IPM & Dual Degree)",
    category: "Leadership, Resilience & Infrastructure Growth",
    prompt: "IIM Jammu has rapidly scaled its permanent Jagti campus and international collaborations while operating in a strategically sensitive region. How do institutional resilience and regional ecosystem development reinforce each other?",
    rubricHints: [
      "Highlight how premier educational hubs anchor local entrepreneurship, tourism, and talent retention.",
      "Connect adaptability and crisis-resilience to modern management leadership."
    ]
  },
  {
    id: "pi_acad_econ",
    campus: "Class 12 Academic Rapid-Fire (Economics & Commerce)",
    category: "Macroeconomics & Monetary Policy",
    prompt: "If the Reserve Bank of India (RBI) hikes the Repo Rate by 50 basis points to curb food-driven CPI inflation, walk us through the transmission mechanism to GDP growth, EMI borrowers, and the Indian Rupee.",
    rubricHints: [
      "Explain cost of borrowing -> lower private capex & consumption -> moderated demand-pull inflation.",
      "Note that higher domestic yields attract FPI inflows, supporting INR appreciation, though supply-side food inflation responds with a lag."
    ]
  },
  {
    id: "pi_acad_math",
    campus: "Class 12 Academic Rapid-Fire (Mathematics & Science)",
    category: "Applied Statistics & Calculus in Business",
    prompt: "Explain to a non-technical board member what Standard Deviation, Correlation vs. Causation, and Marginal Cost (first derivative) mean for pricing a new consumer app.",
    rubricHints: [
      "Use intuitive plain-English analogies before stating mathematical definitions.",
      "Show how correlation between app notifications and retention does not prove causation without A/B testing."
    ]
  },
  {
    id: "pi_wat_ai",
    campus: "WAT / 2-Minute Extempore (All 8 IIMs)",
    category: "Technology, Ethics & Future of Work",
    prompt: "WAT / Extempore Topic: 'Generative AI will not replace Indian white-collar graduates, but graduates who master analytical thinking and AI workflows will replace those who do not.' Take a nuanced stand.",
    rubricHints: [
      "Structure in 4 crisp blocks: Thesis Statement -> Productivity & Skill-Shift Evidence -> Risks of Over-Reliance/Bias -> Actionable Conclusion.",
      "Keep tone balanced, analytical, and concrete."
    ]
  },
  {
    id: "pi_hr_gap",
    campus: "Personal Fit & Behavioural Panel (Indore / Rohtak / Ranchi)",
    category: "Self-Awareness & Failure Recovery",
    prompt: "Tell us about a time a team project or academic goal failed because of a miscalculation you made. What data did you miss, and what system did you build afterward so it never repeated?",
    rubricHints: [
      "Own the mistake candidly without blaming teammates or teachers.",
      "Emphasize the concrete feedback loop or checklist you institutionalized afterward."
    ]
  }
];
window.IPM_TAGGED_PI_PROMPTS = [
  {
    id: "pi_indore",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI"],
    campus: "IIM Indore & IIM Ranchi (5-Yr IPM)",
    category: "Academic Rigor, Macroeconomics & Ethical Trade-offs",
    prompt: "Suppose India's retail inflation (CPI) stays at 5.8% while GDP growth moderates to 6.1%. As a member of the RBI Monetary Policy Committee, would you vote for a repo rate cut or hold rates steady? Defend your stance using both macroeconomics and Class 12 mathematics/statistics.",
    rubricHints: [
      "Balance inflation targeting (4% ± 2% mandate) against private investment/borrowing costs.",
      "Cite transmission lags, real interest rates, and supply-side vs. demand-pull drivers."
    ]
  },
  {
    id: "pi_rohtak",
    exams: ["ALL_IIM_MASTER", "GRE General_ROHTAK"],
    campus: "IIM Rohtak (5-Yr IPM)",
    category: "Extempore (1-Min Prep) & Policy Leadership",
    prompt: "Extempore / PI Topic: 'Should India mandate a minimum 1-year rural or public-sector immersion for all undergraduate management graduates before corporate placements?' Argue both sides and take a clear stand.",
    rubricHints: [
      "Open with a crisp 15-second thesis statement.",
      "Present 2 structured arguments for grassroots empathy/governance insight and 2 counter-arguments on opportunity cost/scalability."
    ]
  },
  {
    id: "pi_iimb",
    exams: ["ALL_IIM_MASTER", "IIMB_UG_ECON_DS_DBE"],
    campus: "IIM Bangalore (B.Sc. Econ/DS & BBA DBE)",
    category: "Quantitative Economics, Data Ethics & Digital Ventures",
    prompt: "A quick-commerce startup burns Rs. 45 per order to acquire urban customers, claiming customer lifetime value (LTV) will turn positive in 18 months. What three cohort-level data metrics would you audit before investing?",
    rubricHints: [
      "Audit Month-3/Month-6 repeat retention curves, contribution margin per order, and CAC payback period.",
      "Distinguish vanity GMV growth from sustainable unit economics."
    ]
  },
  {
    id: "pi_iimm_iiml",
    exams: ["ALL_IIM_MASTER", "IIMM_IIML_TECH_MGMT"],
    campus: "IIM Mumbai & IIM Lucknow (4-Yr BS / Tech-Mgmt UG)",
    category: "Supply Chain Analytics, Sustainability & Operations",
    prompt: "How can predictive machine learning and green-logistics optimization simultaneously reduce last-mile e-commerce delivery costs and Scope-3 carbon emissions in Tier-2 Indian cities?",
    rubricHints: [
      "Connect route optimization, dark-store inventory forecasting, and EV fleet utilization.",
      "Quantify trade-offs between delivery speed (10-min vs. next-day) and load consolidation."
    ]
  },
  {
    id: "pi_bg",
    exams: ["ALL_IIM_MASTER", "OMETs_BG_JAMMU"],
    campus: "IIM Bodh Gaya (5-Yr IPM — Optional WAT/Leadership Prep)",
    category: "Mindfulness, Social Immersion & Management DNA",
    prompt: "IIM Bodh Gaya's mission emphasizes developing 'mindful business leaders with social responsibility,' backed by its mandatory DhiSNya retreat and 8-week Rural Immersion (RISE). How do mindfulness and rural grassroots exposure make a corporate manager more effective in a profit-driven economy?",
    rubricHints: [
      "Connect emotional intelligence & stress resilience (DhiSNya) to high-stakes decision-making.",
      "Explain how rural immersion (RISE) reveals last-mile supply chain, fintech, and bottom-of-the-pyramid market realities."
    ]
  },
  {
    id: "pi_jammu",
    exams: ["ALL_IIM_MASTER", "OMETs_BG_JAMMU"],
    campus: "IIM Jammu (5-Yr IPM — Optional WAT/Leadership Prep)",
    category: "Leadership, Resilience & Infrastructure Growth",
    prompt: "IIM Jammu has rapidly scaled its permanent Jagti campus and international collaborations while operating in a strategically sensitive region. How do institutional resilience and regional ecosystem development reinforce each other?",
    rubricHints: [
      "Highlight how premier educational hubs anchor local entrepreneurship and talent retention.",
      "Connect adaptability and crisis-resilience to modern management leadership."
    ]
  },
  {
    id: "pi_acad_econ",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"],
    campus: "Class 12 Academic Rapid-Fire (Economics & Commerce)",
    category: "Macroeconomics & Monetary Policy",
    prompt: "If the Reserve Bank of India (RBI) hikes the Repo Rate by 50 basis points to curb food-driven CPI inflation, walk us through the transmission mechanism to GDP growth, EMI borrowers, and the Indian Rupee.",
    rubricHints: [
      "Explain cost of borrowing -> lower private capex & consumption -> moderated demand-pull inflation.",
      "Note that higher domestic yields attract FPI inflows, supporting INR appreciation."
    ]
  },
  {
    id: "pi_acad_math",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"],
    campus: "Class 12 Academic Rapid-Fire (Mathematics & Statistics)",
    category: "Applied Statistics & Calculus in Business",
    prompt: "Explain to a non-technical board member what Standard Deviation, Correlation vs. Causation, and Marginal Cost (first derivative) mean for pricing a new consumer app.",
    rubricHints: [
      "Use intuitive plain-English analogies before stating mathematical definitions.",
      "Show how correlation between app notifications and retention does not prove causation without A/B testing."
    ]
  },
  {
    id: "pi_wat_ai",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "OMETs_BG_JAMMU", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"],
    campus: "WAT / 2-Minute Extempore (All 8 IIMs)",
    category: "Technology, Ethics & Future of Work",
    prompt: "WAT / Extempore Topic: 'Generative AI will not replace Indian white-collar graduates, but graduates who master analytical thinking and AI workflows will replace those who do not.' Take a nuanced stand.",
    rubricHints: [
      "Structure in 4 crisp blocks: Thesis Statement -> Productivity & Skill-Shift Evidence -> Risks of Over-Reliance -> Actionable Conclusion.",
      "Keep tone balanced, analytical, and concrete."
    ]
  }
];
