window.IPM_TAGGED_PI_PROMPTS = window.IPM_TAGGED_PI_PROMPTS || [];

window.IPM_TAGGED_PI_PROMPTS.push(
  // =========================================================================
  // 1. CAMPUS FIT & VISION (+10 Prompts -> 16 Total)
  // =========================================================================
  {
    id: "cf_07", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI"], group: "Campus Fit & Vision",
    campus: "IIM Indore (5-Yr IPM)", category: "5-Year Commitment & Exit Option Analysis",
    prompt: "At 18, committing to a 5-year integrated program locks in your undergraduate and MBA path simultaneously. Under NEP 2020, IPM offers a 3-year BA exit—under what circumstances would you take the 3-year exit versus staying for Years 4 and 5?",
    rubricHints: ["Show long-term commitment to completing the 5-year MBA while demonstrating informed awareness of NEP flexibility.", "Highlight how Years 1-3 build quantitative/social science depth that compounds during the PGP years."]
  },
  {
    id: "cf_08", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI"], group: "Campus Fit & Vision",
    campus: "IIM Ranchi (5-Yr IPM)", category: "Experiential Learning & Social Immersion",
    prompt: "IIM Ranchi's IPM curriculum integrates a mandatory Social Immersion Project alongside liberal arts and management. What specific grassroots problem in India would you investigate during your immersion term and what metric would define project success?",
    rubricHints: ["Pick a concrete domain (SHG micro-credit, rural healthcare last-mile, or farm-gate aggregation).", "Define a measurable KPI (e.g., cost reduction %, adoption rate, or turnaround time)."]
  },
  {
    id: "cf_09", exams: ["ALL_IIM_MASTER", "GRE General_ROHTAK"], group: "Campus Fit & Vision",
    campus: "IIM Rohtak (5-Yr IPM)", category: "NCR Proximity & Corporate Interface",
    prompt: "How does IIM Rohtak's strategic proximity to the Delhi-NCR corporate and policy hub create distinct advantages for an undergraduate management student compared to campuses located in smaller towns?",
    rubricHints: ["Cite live industry projects, policy think-tank interactions, startup ecosystems in Gurugram/Noida, and guest faculty access.", "Balance corporate access with focused residential campus rigor."]
  },
  {
    id: "cf_10", exams: ["ALL_IIM_MASTER", "IIMB_UG_ECON_DS_DBE"], group: "Campus Fit & Vision",
    campus: "IIM Bangalore (B.Sc. Economics & Data Science)", category: "Quantitative Economics vs. Pure CS",
    prompt: "Why choose IIM Bangalore's 4-year B.Sc. (Hons) in Economics with Data Science over a traditional B.Tech in Computer Science or a pure B.A. (Hons) Economics from DU?",
    rubricHints: ["Contrast pure CS (building software systems) and pure BA Econ (theoretical policy) with IIMB's synthesis: causal econometrics + machine learning + managerial decision-making."]
  },
  {
    id: "cf_11", exams: ["ALL_IIM_MASTER", "IIMB_UG_ECON_DS_DBE"], group: "Campus Fit & Vision",
    campus: "IIM Bangalore (BBA Digital Business & Entrepreneurship)", category: "Digital Venture Architecture",
    prompt: "In IIM Bangalore's BBA in Digital Business & Entrepreneurship, students build real digital ventures. If given Rs. 50,000 seed capital in Semester 2, what problem would your MVP solve and how would you acquire your first 500 paying users?",
    rubricHints: ["Outline a lean, low-CAC digital distribution channel (campus communities, WhatsApp workflows, B2B micro-SaaS).", "Show unit-economics awareness from Day 1."]
  },
  {
    id: "cf_12", exams: ["ALL_IIM_MASTER", "IIMM_IIML_TECH_MGMT"], group: "Campus Fit & Vision",
    campus: "IIM Mumbai (4-Yr BS Digital Science & Business Mgmt)", category: "Industrial Engineering Heritage",
    prompt: "IIM Mumbai (formerly NITIE) is India's premier hub for supply chain, operations, and industrial engineering. Why is pairing digital science with operations management critical for India's manufacturing ambition?",
    rubricHints: ["Connect Industry 4.0, predictive maintenance, inventory optimization, and ERP analytics to global competitiveness."]
  },
  {
    id: "cf_13", exams: ["ALL_IIM_MASTER", "IIMM_IIML_TECH_MGMT"], group: "Campus Fit & Vision",
    campus: "IIM Lucknow (4-Yr Tech-Management UG)", category: "Agri-Business & Sustainability DNA",
    prompt: "IIM Lucknow is renowned for both corporate strategy and Agri-Business Management. How can undergraduate tech-management training modernize India's rural value chains?",
    rubricHints: ["Link precision agriculture, satellite crop analytics, and digital mandi price discovery."]
  },
  {
    id: "cf_14", exams: ["ALL_IIM_MASTER", "OMETs_BG_JAMMU"], group: "Campus Fit & Vision",
    campus: "IIM Bodh Gaya (5-Yr IPM)", category: "Mindful Leadership & Stakeholder Capitalism",
    prompt: "Critics argue that 'mindfulness' in business education is soft and secondary to hard financial metrics. How would you defend IIM Bodh Gaya's DhiSNya mindfulness framework to a skeptical CFO?",
    rubricHints: ["Cite cognitive clarity under pressure, lower burnout/attrition, and ethical risk mitigation."]
  },
  {
    id: "cf_15", exams: ["ALL_IIM_MASTER", "OMETs_BG_JAMMU"], group: "Campus Fit & Vision",
    campus: "IIM Jammu (5-Yr IPM)", category: "New-Generation IIM Agility",
    prompt: "What unique opportunities and responsibilities come with joining a fast-growing third-generation IIM like IIM Jammu compared to a 60-year-old legacy institution?",
    rubricHints: ["Highlight student-driven club building, agile curriculum updates, close faculty mentorship, and entrepreneurial ownership."]
  },
  {
    id: "cf_16", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"], group: "Campus Fit & Vision",
    campus: "All 8 IIMs (Panel Fit)", category: "Peer Diversity & Campus Contribution",
    prompt: "Every shortlisted candidate here has strong academic scores. What specific skill, perspective, or extracurricular track record will you bring to enrich your cohort's peer learning?",
    rubricHints: ["Anchor on 1-2 verifiable strengths (debating, coding/data projects, sports captaincy, music, or community volunteering) with concrete outcomes."]
  },

  // =========================================================================
  // 2. CLASS 12 ACADEMICS (+11 Prompts -> 16 Total)
  // =========================================================================
  {
    id: "ac_06", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"], group: "Class 12 Academics",
    campus: "Class 12 Mathematics (Probability & Bayes)", category: "Conditional Probability in Medical/Fraud Testing",
    prompt: "A fraud-detection algorithm is 99% accurate on fraudulent transactions and has a 1% false-positive rate on legitimate ones. If only 0.1% of all UPI transactions are fraudulent, why is a flagged transaction still more likely to be legitimate than fraudulent?",
    rubricHints: ["Explain Base Rate Fallacy using Bayes' Theorem: true positives (0.099%) are outnumbered by false positives (~0.999%)."]
  },
  {
    id: "ac_07", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"], group: "Class 12 Academics",
    campus: "Class 12 Mathematics (Matrices & Linear Algebra)", category: "Matrices in Data Science & Input-Output Models",
    prompt: "Beyond solving simultaneous linear equations in Class 12, how are matrices and determinants used in modern recommendation engines, computer graphics, or Leontief economic input-output tables?",
    rubricHints: ["Explain user-item rating matrices, linear transformations, and why non-zero determinant guarantees a unique equilibrium solution."]
  },
  {
    id: "ac_08", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"], group: "Class 12 Academics",
    campus: "Class 12 Microeconomics", category: "Price Elasticity of Demand & Pricing Strategy",
    prompt: "Why do airlines raise ticket prices sharply 24 hours before departure (inelastic business travelers), whereas movie theaters offer cheaper Tuesday tickets (elastic leisure viewers)? Explain using Price Elasticity of Demand.",
    rubricHints: ["Define PED = (% change in Qty) / (% change in Price); explain price discrimination based on urgency and substitute availability."]
  },
  {
    id: "ac_09", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"], group: "Class 12 Academics",
    campus: "Class 12 Macroeconomics", category: "Fiscal Deficit vs. Revenue Deficit",
    prompt: "Distinguish between Fiscal Deficit and Revenue Deficit in the Union Budget. Why do economists tolerate a moderate Fiscal Deficit when it funds capital expenditure (highways, rail) rather than revenue expenditure?",
    rubricHints: ["Capex creates productive assets with a higher fiscal multiplier (>1), boosting future GDP and tax revenues."]
  },
  {
    id: "ac_10", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"], group: "Class 12 Academics",
    campus: "Class 12 Accountancy", category: "Depreciation, EBITDA & Debt-Equity Ratio",
    prompt: "Why do financial analysts evaluate startups and telecom firms using EBITDA rather than Net Profit, and what risks arise if a company's Debt-to-Equity ratio climbs above 3:1?",
    rubricHints: ["EBITDA isolates core operating cash generation before non-cash depreciation and financing structure; high leverage magnifies interest-coverage risk."]
  },
  {
    id: "ac_11", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK"], group: "Class 12 Academics",
    campus: "Class 12 Business Studies", category: "Fayol's Principles vs. Agile Startups",
    prompt: "Henri Fayol emphasized Unity of Command (one boss per employee). How do modern matrix organizations and cross-functional agile tech teams adapt or challenge this classical management principle?",
    rubricHints: ["Compare clear accountability in hierarchical operations vs. speed and dual-reporting trade-offs in product-led tech firms."]
  },
  {
    id: "ac_12", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "IIMM_IIML_TECH_MGMT"], group: "Class 12 Academics",
    campus: "Class 12 Physics & Operations", category: "Thermodynamics, Entropy & Supply-Chain Efficiency",
    prompt: "How does the concept of efficiency and friction/losses in Class 12 Physics translate into an analogy for minimizing bottlenecks and waste in a manufacturing assembly line?",
    rubricHints: ["Connect input-output energy conservation, friction losses, and parallel vs. series circuit reliability to factory throughput."]
  },
  {
    id: "ac_13", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"], group: "Class 12 Academics",
    campus: "Class 12 Computer Science / Python", category: "Algorithmic Complexity & Scalability",
    prompt: "In Class 12 Computer Science, why does an O(n log n) sorting algorithm outperform an O(n^2) algorithm when an e-commerce platform scales from 1,000 SKUs to 10 million SKUs?",
    rubricHints: ["Quantify growth: n^2 explodes to 10^14 operations whereas n log n stays ~2.3 * 10^8, determining cloud server costs and latency."]
  },
  {
    id: "ac_14", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK"], group: "Class 12 Academics",
    campus: "Class 12 History / Sociology", category: "Industrial Revolutions & Labor Markets",
    prompt: "Compare the social and urban displacement caused by the 19th-century Industrial Revolution with today's AI-driven white-collar automation. What historical lessons apply to modern policy?",
    rubricHints: ["Note short-term wage disruption vs. long-term productivity expansion, mediated by public education and social safety nets."]
  },
  {
    id: "ac_15", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "IIMB_UG_ECON_DS_DBE"], group: "Class 12 Academics",
    campus: "Class 12 Statistics", category: "Mean vs. Median in Income Inequality",
    prompt: "Why does the Government or World Bank report Median Household Income alongside Mean (Per Capita) GDP when assessing middle-class living standards?",
    rubricHints: ["Right-skewed income distributions pull the Arithmetic Mean upward due to ultra-high earners, whereas Median reflects the true 50th-percentile household."]
  },
  {
    id: "ac_16", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"], group: "Class 12 Academics",
    campus: "Class 12 Geography & Supply Chains", category: "Chokepoints & Maritime Geopolitics",
    prompt: "How do maritime chokepoints like the Strait of Malacca, Suez Canal, and Strait of Hormuz directly impact India's import inflation and container freight rates?",
    rubricHints: ["Connect crude oil transit, longer Cape of Good Hope rerouting times, higher shipping insurance, and landed import costs."]
  },

  // =========================================================================
  // 3. EXTEMPORE & WAT (+11 Prompts -> 16 Total)
  // =========================================================================
  {
    id: "ew_06", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "OMETs_BG_JAMMU", "IIMB_UG_ECON_DS_DBE"], group: "Extempore & WAT",
    campus: "Extempore / WAT Studio (All 8 IIMs)", category: "Sports & Management",
    prompt: "Extempore / WAT Topic: 'The Indian Premier League (IPL) is less a cricket tournament and more a masterclass in media-rights valuation, franchise branding, and data-driven talent auctions.' Discuss.",
    rubricHints: ["Analyze broadcast media economics, salary-cap auction game theory, and regional fan-base monetization."]
  },
  {
    id: "ew_07", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "OMETs_BG_JAMMU"], group: "Extempore & WAT",
    campus: "Extempore / WAT Studio (All 8 IIMs)", category: "Education & EdTech",
    prompt: "Extempore / WAT Topic: 'Hybrid classrooms combining AI tutors with peer-group discussion will replace one-size-fits-all lecture halls by 2030.' Argue for or against.",
    rubricHints: ["Balance personalized adaptive pacing against irreplaceable human mentorship, socialization, and lab/case-method debate."]
  },
  {
    id: "ew_08", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"], group: "Extempore & WAT",
    campus: "Extempore / WAT Studio (All 8 IIMs)", category: "Consumer Behavior & FinTech",
    prompt: "Extempore / WAT Topic: 'Frictionless one-click UPI payments and Buy-Now-Pay-Later (BNPL) apps are quietly eroding the savings habit of Gen-Z Indians.' Take a stand.",
    rubricHints: ["Contrast financial inclusion and formal credit history building against behavioral overspending and household debt risks."]
  },
  {
    id: "ew_09", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMM_IIML_TECH_MGMT"], group: "Extempore & WAT",
    campus: "Extempore / WAT Studio (All 8 IIMs)", category: "Climate & Corporate Strategy",
    prompt: "Extempore / WAT Topic: 'Greenwashing is the biggest threat to genuine corporate sustainability: why mandatory third-party ESG audits matter more than voluntary net-zero pledges.'",
    rubricHints: ["Distinguish verifiable Scope 1/2/3 emissions disclosures from marketing PR."]
  },
  {
    id: "ew_10", exams: ["ALL_IIM_MASTER", "GRE General_ROHTAK", "GRE General_INDORE_RANCHI"], group: "Extempore & WAT",
    campus: "Extempore — Abstract / Philosophical (Rohtak & Indore)", category: "Abstract Topic",
    prompt: "Abstract Extempore Topic: 'Speed without direction is merely expensive noise.' Interpret this statement in the context of startups and career planning.",
    rubricHints: ["Unpack the metaphor immediately -> Apply to product-market fit before scaling -> Apply to deliberate skill-building -> Conclude crisply."]
  },
  {
    id: "ew_11", exams: ["ALL_IIM_MASTER", "GRE General_ROHTAK", "GRE General_INDORE_RANCHI"], group: "Extempore & WAT",
    campus: "Extempore — Abstract / Philosophical (Rohtak & Indore)", category: "Abstract Topic",
    prompt: "Abstract Extempore Topic: 'Good metrics become bad targets the moment people game them.' Discuss with examples from business or education.",
    rubricHints: ["Reference Goodhart's Law: exam rote-memorization vs. true conceptual mastery; clickbait vs. journalism quality."]
  },
  {
    id: "ew_12", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"], group: "Extempore & WAT",
    campus: "WAT / Essay Studio (All 8 IIMs)", category: "Urbanization & Infrastructure",
    prompt: "WAT Topic: 'India's next decade of economic growth will be driven not by its top six metros, but by the rise of 50 Tier-2 and Tier-3 consumption and manufacturing hubs.'",
    rubricHints: ["Cite lower real-estate/living costs, digital connectivity, regional airports, and aspirational middle-class demand."]
  },
  {
    id: "ew_13", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "OMETs_BG_JAMMU"], group: "Extempore & WAT",
    campus: "WAT / Essay Studio (All 8 IIMs)", category: "Creator Economy & Media",
    prompt: "WAT Topic: 'In the attention economy, individual creators are building media brands larger than legacy studios—yet platform algorithm dependency leaves their businesses fragile.'",
    rubricHints: ["Analyze zero-marginal-cost distribution vs. platform risk and the shift toward owned D2C products/communities."]
  },
  {
    id: "ew_14", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK"], group: "Extempore & WAT",
    campus: "WAT / Essay Studio (All 8 IIMs)", category: "Corporate Governance",
    prompt: "WAT Topic: 'Founder-led startups thrive on bold intuition, while mature public companies survive on institutional checks and balances. When should a founder step back for a professional CEO?'",
    rubricHints: ["Contrast 0-to-1 visionary speed with 1-to-100 operational governance and board accountability."]
  },
  {
    id: "ew_15", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"], group: "Extempore & WAT",
    campus: "WAT / Essay Studio (All 8 IIMs)", category: "Healthcare & Public Policy",
    prompt: "WAT Topic: 'Preventive primary healthcare and nutrition yield a far higher economic return for India than subsidizing tertiary hospital care alone.'",
    rubricHints: ["Connect human capital productivity, out-of-pocket medical impoverishment, and Ayushman Arogya Mandirs."]
  },
  {
    id: "ew_16", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "OMETs_BG_JAMMU"], group: "Extempore & WAT",
    campus: "Extempore — Abstract (Rohtak & Indore)", category: "Abstract Topic",
    prompt: "Abstract Extempore Topic: 'Constraints are often the sharpest catalyst for frugal innovation.' Illustrate using Indian business or space-tech examples.",
    rubricHints: ["Cite ISRO's low-cost Mars/Chandrayaan missions, UPI's interoperable rails, and Indian sachet/frugal engineering."]
  }
);
window.IPM_TAGGED_PI_PROMPTS.push(
  // =========================================================================
  // 4. CURRENT AFFAIRS & POLICY (+13 Prompts -> 16 Total)
  // =========================================================================
  {
    id: "ca_04", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"], group: "Current Affairs & Policy",
    campus: "Semiconductor & Industrial Policy Panel", category: "India Semiconductor Mission & Capex",
    prompt: "India has committed over Rs. 76,000 Crore in subsidies to build domestic semiconductor fabrication and ATMP packaging plants. Why focus initially on mature nodes (28nm-65nm) and packaging rather than cutting-edge 2nm logic chips?",
    rubricHints: ["28nm-65nm chips serve 70%+ of automotive, EV, power-electronics, and telecom demand with lower capex risk and faster ecosystem maturity."]
  },
  {
    id: "ca_05", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"], group: "Current Affairs & Policy",
    campus: "Capital Markets & Financialization Panel", category: "Retail SIP Surge & F&O Speculation",
    prompt: "Domestic Mutual Fund SIP inflows in India have hit record highs, stabilizing equity markets against FPI outflows, while SEBI has tightened rules on retail Futures & Options (F&O) trading. Evaluate both trends.",
    rubricHints: ["Contrast disciplined long-term wealth creation via SIPs against SEBI's finding that 90%+ of retail F&O traders lose money."]
  },
  {
    id: "ca_06", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"], group: "Current Affairs & Policy",
    campus: "International Trade & Geopolitics Panel", category: "Free Trade Agreements (FTAs) & Supply Chains",
    prompt: "India has actively negotiated bilateral FTAs with the UAE, Australia, EFTA, and the UK while staying out of RCEP. What strategic criteria should govern whether India signs an FTA with a major trading bloc?",
    rubricHints: ["Evaluate tariff asymmetry, Rules of Origin protection against third-country dumping, services visa mobility, and domestic MSME competitiveness."]
  },
  {
    id: "ca_07", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"], group: "Current Affairs & Policy",
    campus: "Digital Public Infrastructure Panel", category: "ONDC & E-Commerce Democratization",
    prompt: "How does the Open Network for Digital Commerce (ONDC) unbundle buyer apps, seller apps, and logistics providers, and can it meaningfully challenge duopoly dominance in Indian e-commerce?",
    rubricHints: ["Explain open protocol interoperability (like UPI/HTTP) vs. closed walled-garden marketplaces, while noting customer-support and trust standardization challenges."]
  },
  {
    id: "ca_08", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"], group: "Current Affairs & Policy",
    campus: "Monetary Policy & Digital Currency Panel", category: "CBDC (e-Rupee) vs. UPI",
    prompt: "Given that UPI already enables instant, zero-cost bank-to-bank transfers, what distinct economic use cases justify the RBI's Central Bank Digital Currency (e-Rupee)?",
    rubricHints: ["Highlight programmable subsidies (purpose-bound money for fertilizers/education), offline payments, and instant cross-border wholesale settlement."]
  },
  {
    id: "ca_09", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMM_IIML_TECH_MGMT"], group: "Current Affairs & Policy",
    campus: "Mobility & Energy Transition Panel", category: "Electric Vehicles vs. Hybrid & Biofuel Pathways",
    prompt: "Should India's clean-mobility policy focus exclusively on battery-electric vehicles (BEVs), or adopt a technology-neutral mix including strong hybrids, CNG, and ethanol-flex fuels?",
    rubricHints: ["Consider grid coal intensity, charging infrastructure gaps in Tier-2/3 cities, and transitional emissions reduction."]
  },
  {
    id: "ca_10", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"], group: "Current Affairs & Policy",
    campus: "AI Governance & Sovereign Compute Panel", category: "IndiaAI Mission & Indic Language Models",
    prompt: "Why is building sovereign GPU compute clusters and Indic-language foundation models under the IndiaAI Mission strategically important for governance, agriculture, and healthcare?",
    rubricHints: ["Voice-first vernacular interfaces unlock digital services for non-English speakers and prevent foreign data/model dependency."]
  },
  {
    id: "ca_11", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"], group: "Current Affairs & Policy",
    campus: "Macroeconomics & Fiscal Consolidation Panel", category: "Fiscal Glide Path & Sovereign Credit Rating",
    prompt: "How does sticking to a credible fiscal deficit glide path (below 4.5% of GDP) lower the Government's bond yields and reduce borrowing costs for private Indian corporations?",
    rubricHints: ["Explain reduced government crowding-out in bond markets, lower 10-year G-Sec benchmark yields, and sovereign rating upgrades."]
  },
  {
    id: "ca_12", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMM_IIML_TECH_MGMT"], group: "Current Affairs & Policy",
    campus: "Space Economy & Deep-Tech Panel", category: "Privatization of Space Sector (IN-SPACe)",
    prompt: "Opening India's space sector to private launch startups and satellite operators has spurred rapid innovation. How can Indian space-tech startups monetize commercial Earth-observation data globally?",
    rubricHints: ["Cite precision crop insurance, maritime tracking, disaster response, and urban infrastructure monitoring."]
  },
  {
    id: "ca_13", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"], group: "Current Affairs & Policy",
    campus: "Labor & Future of Work Panel", category: "Gig Economy Social Security & Labor Codes",
    prompt: "India's Code on Social Security formally recognizes gig and platform workers for the first time. How should welfare contributions be shared among platforms, consumers, and the state without killing flexible job creation?",
    rubricHints: ["Propose portable, transaction-linked micro-contributions across multiple apps (since riders multi-home across platforms)."]
  },
  {
    id: "ca_14", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK"], group: "Current Affairs & Policy",
    campus: "Education & Skill Reform Panel", category: "NEP 2020 & Multidisciplinary Undergraduate Degrees",
    prompt: "How does NEP 2020's Academic Bank of Credits (ABC) and 4-year multidisciplinary honors degree align Indian higher education with global research and management standards?",
    rubricHints: ["Highlight flexible entry/exit, research dissertation in Year 4, and breaking rigid Science-Commerce-Arts silos."]
  },
  {
    id: "ca_15", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"], group: "Current Affairs & Policy",
    campus: "Agricultural Reform & Inflation Panel", category: "Tackling Volatile Food Inflation (TOP Crops)",
    prompt: "Tomato, Onion, and Potato (TOP) price spikes frequently push India's headline CPI above the RBI's comfort zone. What supply-side market reforms can stabilize prices without hurting farmer incomes?",
    rubricHints: ["Discuss dehydrated/processed food buffer stocks, e-NAM direct farm-to-retail linkages, and predictable export policies."]
  },
  {
    id: "ca_16", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMM_IIML_TECH_MGMT"], group: "Current Affairs & Policy",
    campus: "Aviation & Tourism Infrastructure Panel", category: "UDAN Regional Connectivity & Airport Privatization",
    prompt: "India is one of the world's fastest-growing aviation markets, yet airlines face razor-thin margins due to Aviation Turbine Fuel (ATF) taxes and dollar-denominated aircraft leases. How can Indian carriers build sustainable profitability?",
    rubricHints: ["Analyze ancillary revenue streams, MRO (Maintenance, Repair & Overhaul) localization, and fleet fuel efficiency."]
  },

  // =========================================================================
  // 5. BEHAVIORAL & ETHICS (+13 Prompts -> 16 Total)
  // =========================================================================
  {
    id: "be_04", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"], group: "Behavioral & Ethics",
    campus: "Conflict Resolution & Teamwork Panel", category: "Handling a Non-Contributing Teammate",
    prompt: "Two days before an inter-school business case final, one teammate has not completed their financial analysis and stops replying to messages. How do you handle the immediate deadline and the post-event conversation?",
    rubricHints: ["Step 1: Triage & redistribute work calmly so the team delivers on time. Step 2: Hold an empathetic 1-on-1 check-in afterward before escalating."]
  },
  {
    id: "be_05", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"], group: "Behavioral & Ethics",
    campus: "Academic Integrity & Ethics Panel", category: "Whistleblowing vs. Peer Loyalty",
    prompt: "You discover that a close friend in your student council inflated attendance/expense receipts by Rs. 5,000 to cover an unapproved event cost. What action do you take?",
    rubricHints: ["Draw a clear ethical boundary on financial misreporting; urge your friend to self-disclose immediately or report transparently to the faculty advisor."]
  },
  {
    id: "be_06", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"], group: "Behavioral & Ethics",
    campus: "Decision-Making Under Ambiguity Panel", category: "Making High-Stakes Calls with Incomplete Data",
    prompt: "Tell us about a situation where you had to make an important decision without having all the information you wanted. How did you structure your judgment and manage downside risk?",
    rubricHints: ["Demonstrate structured hypothesis testing, reversible vs. irreversible decision framing, and contingency planning."]
  },
  {
    id: "be_07", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"], group: "Behavioral & Ethics",
    campus: "Stress Panel / Counter-Questioning", category: "Defending an Unpopular but Evidence-Backed View",
    prompt: "Describe a time you disagreed with a teacher, coach, or team leader on a strategy. How did you present your counter-evidence respectfully without undermining authority?",
    rubricHints: ["Focus on objective data/logic rather than ego; show openness to being proven wrong if new facts emerged."]
  },
  {
    id: "be_08", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK"], group: "Behavioral & Ethics",
    campus: "Values & Role Models Panel", category: "Leadership Role Model & Concrete Traits",
    prompt: "Name one business, public-policy, or social leader you admire—and identify one decision of theirs you critically disagree with.",
    rubricHints: ["Panels love balanced judgment over hero-worship: praise a specific strategic execution and critique a clear governance or strategic misstep."]
  },
  {
    id: "be_09", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"], group: "Behavioral & Ethics",
    campus: "Algorithmic & Data Ethics Panel", category: "Pricing Fairness & Dark Patterns",
    prompt: "As product manager of a travel app, your data team shows that charging iOS users 12% more than Android users for the exact same hotel room boosts quarterly profit by Rs. 15 Crore. Do you approve the feature?",
    rubricHints: ["Reject discriminatory dark-pattern pricing; cite reputational backlash, consumer trust erosion, and regulatory scrutiny."]
  },
  {
    id: "be_10", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK"], group: "Behavioral & Ethics",
    campus: "Time Management & Prioritization Panel", category: "Balancing Class 12 Boards with GRE General Prep",
    prompt: "How did you allocate your weekly hours between Class 12 board exam preparation, GRE General quantitative/verbal drills, and personal well-being without burning out?",
    rubricHints: ["Share a concrete, disciplined system (e.g., syllabus overlap mapping, mock error logs, and fixed sleep/exercise blocks)."]
  },
  {
    id: "be_11", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK"], group: "Behavioral & Ethics",
    campus: "Adaptability & Feedback Panel", category: "Acting on Harsh Constructive Criticism",
    prompt: "Recall a piece of blunt or uncomfortable feedback you received from a mentor or peer. What was your initial reaction, and what specific habit changed as a result?",
    rubricHints: ["Show emotional maturity: moving from initial defensiveness to objective reflection and measurable behavioral change."]
  },
  {
    id: "be_12", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"], group: "Behavioral & Ethics",
    campus: "Resourcefulness & Initiative Panel", category: "Creating Impact Without Formal Authority",
    prompt: "Tell us about a time you spotted an inefficiency in your school, club, or community and fixed it even though nobody assigned it to you.",
    rubricHints: ["Use STAR format (Situation, Task, Action, Result) with a clear before/after impact metric."]
  },
  {
    id: "be_13", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK"], group: "Behavioral & Ethics",
    campus: "Empathy & Inclusion Panel", category: "Working Across Diverse Backgrounds",
    prompt: "IIM cohorts bring together students from every Indian state and socioeconomic background. Tell us about a time working with someone very different from you changed how you approached a problem.",
    rubricHints: ["Highlight active listening, challenging your own blind spots, and synthesizing diverse viewpoints."]
  },
  {
    id: "be_14", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE"], group: "Behavioral & Ethics",
    campus: "Long-Term Vision Panel", category: "10-Year Career Trajectory & Social Impact",
    prompt: "Fast-forward 10 years to 2036 after graduating from this IIM. What sector or problem are you working on, and how will you measure whether your career is meaningful?",
    rubricHints: ["Connect immediate post-MBA domain learning (consulting/product/finance/policy) to long-term leadership and value creation."]
  },
  {
    id: "be_15", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK"], group: "Behavioral & Ethics",
    campus: "Ethical Trade-Offs in Advertising Panel", category: "Surrogate Advertising & Youth Marketing",
    prompt: "A high-paying FMCG client asks your student marketing club to promote a surrogate brand for an age-restricted product during your annual youth festival. How do you respond?",
    rubricHints: ["Decline surrogate promotion aimed at underage/youth audiences; demonstrate principled judgment over short-term sponsorship revenue."]
  },
  {
    id: "be_16", exams: ["ALL_IIM_MASTER", "GRE General_INDORE_RANCHI", "GRE General_ROHTAK", "IIMB_UG_ECON_DS_DBE", "IIMM_IIML_TECH_MGMT"], group: "Behavioral & Ethics",
    campus: "Closing Panel Question (All 8 IIMs)", category: "The 'Why Should We Select You?' Pitch",
    prompt: "We have interviewed 25 strong candidates today and have only 4 seats left in this slot. In 60 seconds, give us three concrete reasons why we should offer one of those seats to you.",
    rubricHints: ["Summarize: (1) Proven analytical & academic consistency, (2) Demonstrated leadership/initiative under pressure, and (3) Clear alignment with the campus's unique pedagogy."]
  }
);
