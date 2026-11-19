window.IPM_TAGGED_PI_PROMPTS = window.IPM_TAGGED_PI_PROMPTS || [];

window.IPM_TAGGED_PI_PROMPTS.push(
  // IIM INDORE & RANCHI (5-Yr IPM)
  {
    id: "pi_ind_02",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI"],
    group: "Campus Fit & Vision",
    campus: "IIM Indore (5-Yr IPM)",
    category: "Liberal Arts + Management Interdisciplinary Edge",
    prompt: "Why do you want to spend three years studying Microeconomics, Calculus, Political Science, and Sociology at IIM Indore before core MBA courses, rather than pursuing a specialized B.Com (Hons) or B.Tech degree?",
    rubricHints: [
      "Show how complex business decisions sit at the intersection of quantitative modeling, human behavior, and regulatory policy.",
      "Avoid generic 'IIM brand' answers; cite specific interdisciplinary courses in CAT's BA Foundations curriculum."
    ]
  },
  {
    id: "pi_ran_02",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI"],
    group: "Campus Fit & Vision",
    campus: "IIM Ranchi (5-Yr IPM)",
    category: "Social Impact, Tribal Economy & Sustainable Business",
    prompt: "IIM Ranchi places strong emphasis on social sensitivity and holistic management in a resource-rich state like Jharkhand. How can a mining-and-manufacturing-led regional economy transition toward high-value green manufacturing without displacing local livelihoods?",
    rubricHints: [
      "Discuss downstream value addition, vocational reskilling, and ESG-compliant supply chains.",
      "Balance economic growth with community stakeholder inclusion."
    ]
  },
  {
    id: "pi_ind_03",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI"],
    group: "Class 12 Academics",
    campus: "IIM Indore & Ranchi (Academic Panel)",
    category: "Class 12 Mathematics — Calculus & Functions",
    prompt: "Explain geometrically and intuitively what the first derivative f'(x) and second derivative f''(x) represent, and how a retail e-commerce company uses them to find the optimal discount percentage.",
    rubricHints: [
      "Define f'(x) as instantaneous rate of change (slope of tangent) and f''(x) as curvature/concavity.",
      "Show that Profit P(d) peaks where Marginal Profit P'(d) = 0 and P''(d) < 0."
    ]
  },

  // IIM ROHTAK (5-Yr IPM)
  {
    id: "pi_roh_02",
    exams: ["ALL_IIM_MASTER", "GRE General_ROHTAK"],
    group: "Extempore & WAT",
    campus: "IIM Rohtak (1-Min Prep Extempore)",
    category: "Extempore — Digital Economy & Regulation",
    prompt: "1-Minute Extempore Topic: 'India's Quick-Commerce Boom (10-Minute Delivery): Genuine Supply-Chain Innovation or Unsustainable Gig-Worker Exploitation?'",
    rubricHints: [
      "15s Hook & Thesis -> 30s Dark-Store Inventory & Unit Economics -> 30s Gig-Worker Safety & Churn -> 15s Balanced Regulatory Path.",
      "Maintain steady pacing and clear signposting ('First...', 'On the flip side...', 'To conclude...')."
    ]
  },
  {
    id: "pi_roh_03",
    exams: ["ALL_IIM_MASTER", "GRE General_ROHTAK"],
    group: "Campus Fit & Vision",
    campus: "IIM Rohtak (5-Yr IPM)",
    category: "Governance, Public Policy & Management",
    prompt: "IIM Rohtak offers a strong grounding in both Business Management and Public Policy/Law. If you were advising the Ministry of MSMEs, what two policy reforms would you prioritize to help Indian small businesses scale exports?",
    rubricHints: [
      "Address working-capital credit access (TReDS/fintech underwriting) and export compliance/quality certification.",
      "Back your points with concrete MSME bottlenecks."
    ]
  },
  {
    id: "pi_roh_04",
    exams: ["ALL_IIM_MASTER", "GRE General_ROHTAK"],
    group: "Extempore & WAT",
    campus: "IIM Rohtak (1-Min Prep Extempore)",
    category: "Extempore — Leadership & Ethics",
    prompt: "1-Minute Extempore Topic: 'In a hyper-competitive startup culture, is blitzscaling at the cost of short-term governance acceptable if it captures market monopoly?'",
    rubricHints: [
      "Contrast aggressive market capture against long-term shareholder trust and regulatory scrutiny.",
      "Cite real-world Indian fintech/edtech governance lessons."
    ]
  },

  // IIM BANGALORE (B.Sc. Econ/DS & BBA DBE)
  {
    id: "pi_iimb_02",
    exams: ["ALL_IIM_MASTER", "IIMB_UG_ECON_DS_DBE"],
    group: "Class 12 Academics",
    campus: "IIM Bangalore (B.Sc. Economics / Data Science)",
    category: "Econometrics, Bias & Causal Inference",
    prompt: "An edtech company observes that students who watch 80%+ of recorded lectures score 25% higher in mocks, and concludes the videos caused the score jump. As a Data Science & Economics undergrad, identify two statistical biases in this claim and how you would test true causality.",
    rubricHints: [
      "Identify Selection Bias / Omitted Variable Bias (motivated students both watch videos and study harder).",
      "Propose a Randomized Controlled Trial (A/B test) or Difference-in-Differences design."
    ]
  },
  {
    id: "pi_iimb_03",
    exams: ["ALL_IIM_MASTER", "IIMB_UG_ECON_DS_DBE"],
    group: "Campus Fit & Vision",
    campus: "IIM Bangalore (BBA Digital Business & Entrepreneurship)",
    category: "Digital Venture Building & Platform Economics",
    prompt: "How do network effects differ between a food-delivery marketplace (two-sided) and a cloud-based accounting SaaS tool, and which business model has stronger long-term pricing power?",
    rubricHints: [
      "Contrast cross-side network effects (more restaurants attract more diners) vs. SaaS switching costs.",
      "Analyze multi-homing risks in food delivery vs. high retention in workflow SaaS."
    ]
  },
  {
    id: "pi_iimb_04",
    exams: ["ALL_IIM_MASTER", "IIMB_UG_ECON_DS_DBE"],
    group: "Current Affairs & Policy",
    campus: "IIM Bangalore (Economics & Policy Panel)",
    category: "Indian Macroeconomics & Trade",
    prompt: "India's services exports (IT, GCCs, consulting) have cushioned its Current Account Deficit even as merchandise trade deficits widened. What structural risks does over-reliance on Global Capability Centers (GCCs) pose over the next decade?",
    rubricHints: [
      "Discuss AI automation of routine coding/back-office tasks, global recession sensitivity, and need to move up the R&D value chain.",
      "Keep tone analytical and forward-looking."
    ]
  },

  // IIM MUMBAI & IIM LUCKNOW (4-Yr BS / Tech-Mgmt UG)
  {
    id: "pi_iimm_02",
    exams: ["ALL_IIM_MASTER", "IIMM_IIML_TECH_MGMT"],
    group: "Campus Fit & Vision",
    campus: "IIM Mumbai (4-Yr BS Digital Science & Business Mgmt)",
    category: "Operations, Semiconductor & Manufacturing Supply Chains",
    prompt: "As global firms adopt a 'China+1' manufacturing strategy, India faces higher logistics costs (~13-14% of GDP vs. ~8% in developed economies). How can operations research and multimodal infrastructure cut this gap?",
    rubricHints: [
      "Connect Dedicated Freight Corridors, port turnaround automation, and warehouse hub-and-spoke optimization.",
      "Show how lower logistics cost directly boosts Indian export competitiveness."
    ]
  },
  {
    id: "pi_iiml_02",
    exams: ["ALL_IIM_MASTER", "IIMM_IIML_TECH_MGMT"],
    group: "Current Affairs & Policy",
    campus: "IIM Lucknow (4-Yr Tech-Management UG)",
    category: "Agri-Tech, Cold Chains & Rural Supply Management",
    prompt: "Nearly 15-20% of India's perishable horticulture produce is lost post-harvest due to cold-chain fragmentation. Design a financially viable FPO (Farmer Producer Organization) + cold-storage business model.",
    rubricHints: [
      "Address asset utilization (solar-powered modular cold rooms), aggregation at farm-gate, and direct B2B retail off-take.",
      "Demonstrate practical unit-economics thinking."
    ]
  },

  // OMETs CAMPUSES (IIM Bodh Gaya & IIM Jammu — Optional WAT & Leadership Prep)
  {
    id: "pi_jip_03",
    exams: ["ALL_IIM_MASTER", "OMETs_BG_JAMMU"],
    group: "Extempore & WAT",
    campus: "IIM Bodh Gaya & IIM Jammu (Optional WAT Prep)",
    category: "Written Ability Test (WAT) — Tourism & Regional Growth",
    prompt: "WAT Topic: 'Sustainable Spiritual and Eco-Tourism in regions like Bodh Gaya and Jammu & Kashmir can become a multi-billion-dollar employment engine only if infrastructure expansion respects ecological carrying capacity.'",
    rubricHints: [
      "Balance hospitality/airport connectivity gains against waste management, water stress, and cultural preservation.",
      "Provide concrete policy mechanisms (green certification, visitor caps, local homestay micro-credit)."
    ]
  },

  // CROSS-CAMPUS CLASS 12 ACADEMICS & BEHAVIOURAL (All 8 IIMs)
  {
    id: "pi_acad_comm",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"],
    group: "Class 12 Academics",
    campus: "Class 12 Accountancy & Finance Rapid-Fire",
    category: "Financial Statements — Profit vs. Cash Flow",
    prompt: "A fast-growing D2C brand reports Rs. 10 Crore in Net Profit on its Income Statement, yet runs out of cash and cannot pay salaries next month. Explain how this happens using Working Capital concepts.",
    rubricHints: [
      "Explain accrual accounting vs. cash accounting: high Accounts Receivable (uncollected credit sales) and unsold Inventory tie up cash.",
      "Conclude with 'Revenue is vanity, profit is sanity, cash flow is reality.'"
    ]
  },
  {
    id: "pi_acad_hum",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK"],
    group: "Class 12 Academics",
    campus: "Class 12 Humanities / Political Science Rapid-Fire",
    category: "Constitutional Federalism & Fiscal Policy",
    prompt: "How does the Goods and Services Tax (GST) Council balance cooperative federalism between the Union Government and State Governments when states demand higher revenue compensation?",
    rubricHints: [
      "Explain the voting structure (1/3 Centre, 2/3 States, 3/4 majority required) and consensus-driven decision-making.",
      "Highlight the trade-off between tax rate rationalization and state fiscal autonomy."
    ]
  },
  {
    id: "pi_acad_sci",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"],
    group: "Class 12 Academics",
    campus: "Class 12 Physics / Science Stream Switcher",
    category: "Why Switch from Science/Engineering to Management at 18?",
    prompt: "You scored 95%+ in Physics, Chemistry, and Mathematics. Why are you pivoting to an Integrated Management / Economics program at 18 instead of pursuing B.Tech from an IIT or NIT?",
    rubricHints: [
      "Frame STEM training as an analytical asset (first-principles problem solving, data fluency) applied to business and economic systems.",
      "Never disparage engineering; emphasize wanting to own both product/data logic AND customer/market strategy."
    ]
  },
  {
    id: "pi_curr_01",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"],
    group: "Current Affairs & Policy",
    campus: "Current Affairs & Geoeconomics (All 8 IIMs)",
    category: "Energy Transition & Critical Minerals",
    prompt: "India aims for 500 GW of non-fossil fuel capacity by 2030, yet depends heavily on imported lithium, cobalt, and solar wafers. What supply-chain and industrial-policy steps can mitigate this vulnerability?",
    rubricHints: [
      "Discuss PLI schemes for domestic cell manufacturing, urban battery recycling, sodium-ion R&D, and bilateral mineral partnerships.",
      "Connect energy security to long-term macroeconomic stability."
    ]
  },
  {
    id: "pi_curr_02",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"],
    group: "Current Affairs & Policy",
    campus: "Digital Public Infrastructure (DPI) Panel",
    category: "UPI, ONDC & Account Aggregator Ecosystem",
    prompt: "UPI processed over 16 billion monthly transactions, yet payment apps struggle to monetize zero-MDR P2M payments. How can fintech platforms build profitable business models atop India's Digital Public Infrastructure?",
    rubricHints: [
      "Highlight credit underwriting via Account Aggregator data, wealth-tech distribution, merchant SaaS, and cross-border UPI linkages.",
      "Distinguish public utility rails from private value-added financial services."
    ]
  },
  {
    id: "pi_beh_02",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"],
    group: "Behavioral & Ethics",
    campus: "Ethical Dilemma & Integrity Panel",
    category: "Short-Term Targets vs. Ethical Compliance",
    prompt: "You are leading your school/college fest sponsorship team. A major sponsor offers Rs. 2 Lakhs—enough to cover your entire deficit—provided you quietly drop a competing student startup from the exhibition floor despite a signed commitment. How do you handle this?",
    rubricHints: [
      "Uphold contractual integrity immediately—breaking a signed commitment destroys institutional credibility.",
      "Propose creative win-win alternatives (dedicated prime pavilion or title branding for the big sponsor) without breaching ethics."
    ]
  },
  {
    id: "pi_beh_03",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"],
    group: "Behavioral & Ethics",
    campus: "Self-Reflection & Personal SWOT Panel",
    category: "Greatest Weakness & Concrete Mitigation",
    prompt: "Tell us one genuine intellectual or behavioral weakness you discovered during your Class 12 / GRE General preparation—not a disguised strength like 'I work too hard'—and how you measurably fixed it.",
    rubricHints: [
      "Share an authentic flaw (e.g., over-attempting risky MCQs under time pressure or over-polishing slides before testing core logic).",
      "Quantify the improvement using before/after mock accuracy or project outcomes."
    ]
  },
  {
    id: "pi_wat_02",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "OMETs_BG_JAMMU", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"],
    group: "Extempore & WAT",
    campus: "WAT / Essay Studio (All 8 IIMs)",
    category: "Written Ability Test — Demographic Dividend",
    prompt: "WAT Topic: 'India's demographic dividend is a time-bound window, not an automatic guarantee: without foundational employability and female labor-force participation, a youth bulge risks becoming a demographic burden.'",
    rubricHints: [
      "Structure clearly: Thesis -> Skil-to-Industry Mismatch -> Unlocking Female Workforce Participation (childcare, safe transit, flexible work) -> Conclusion.",
      "Use crisp, persuasive prose within 200-250 words."
    ]
  },
  {
    id: "pi_wat_03",
    exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "OMETs_BG_JAMMU", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"],
    group: "Extempore & WAT",
    campus: "WAT / Essay Studio (All 8 IIMs)",
    category: "Written Ability Test — Data Privacy vs. Hyper-Personalization",
    prompt: "WAT Topic: 'In an era of algorithmic pricing and hyper-targeted advertising, where should regulators draw the line between consumer convenience and behavioral manipulation?'",
    rubricHints: [
      "Compare consumer welfare gains (relevant discovery) against dark patterns and surge-pricing opacity.",
      "Reference India's DPDP Act principles (informed consent, data minimization)."
    ]
  }
);