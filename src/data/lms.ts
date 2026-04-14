export interface Lesson {
    id: string;
    title: string;
    duration: string;
    content: string; // Markdown or text content
    videoUrl?: string; // Placeholder for video
}

export interface Module {
    id: number;
    title: string;
    description: string;
    duration: string;
    lessons: Lesson[];
}

export interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number; // Index of the correct option
}

export const lmsCourseData: Module[] = [
    {
        id: 1,
        title: "Foundations of AML, CFT & Sanctions",
        description: "Core principles of anti-money laundering, counter-terrorist financing, and sanctions — the bedrock of financial crime compliance.",
        duration: "210 mins",
        lessons: [
            { id: "1.1", title: "Origins and Purpose of AML & CFT Frameworks", duration: "15:00", content: "An exploration of why AML and CFT frameworks were created, the global events that shaped them, and the policy rationale behind requiring financial institutions to act as gatekeepers." },
            { id: "1.2", title: "Evolution of Global AML Standards", duration: "15:00", content: "From the FATF's founding in 1989 to the 40 Recommendations, Mutual Evaluations, and the ongoing updates to global standards — tracing the arc of international AML governance." },
            { id: "1.3", title: "India's AML Journey and Risk Landscape", duration: "15:00", content: "India's legislative history in AML/CFT, including PBPT Act, FEMA, and PMLA. Understanding India's specific risk profile — hawala, real estate, cash-intensive sectors, and VDA risks." },
            { id: "1.4", title: "Financial Systems as Enablers of Crime", duration: "15:00", content: "How formal and informal financial systems are exploited. The role of banks, NBFCs, payment intermediaries, and new-age fintechs in the movement of illicit funds." },
            { id: "1.5", title: "Defining Money Laundering (Legal & Practical)", duration: "15:00", content: "Legal definitions under PMLA vs. practical understanding. The concept of 'proceeds of crime' and how courts and regulators interpret money laundering conduct." },
            { id: "1.6", title: "Stages of Money Laundering (Deep Dive)", duration: "15:00", content: "Placement, Layering, and Integration — with real-world examples from Indian enforcement actions, typology reports, and global cases that illustrate each stage." },
            { id: "1.7", title: "Criminal Predicate Offences (India & Global)", duration: "15:00", content: "What constitutes a predicate offence under the PMLA Schedule. How different crimes — corruption, drug trafficking, tax evasion, cybercrime — connect to money laundering risk." },
            { id: "1.8", title: "Terrorist Financing: Concepts and Contrasts", duration: "15:00", content: "Why terrorist financing is different from money laundering: the origin of funds (often legal), and the direction of flow. Introduction to Financing of Proliferation (FoP) as a related risk." },
            { id: "1.9", title: "Terrorist Financing Typologies", duration: "15:00", content: "Methods used to finance terrorism: misuse of NPOs, hawala, new payment methods, crypto, and trade-based channels. India-specific threat vectors." },
            { id: "1.10", title: "Role of Financial Institutions in CFT", duration: "15:00", content: "Obligations of regulated entities in detecting, deterring, and reporting terrorist financing. Coordination with law enforcement and the intelligence community." },
            { id: "1.11", title: "Sanctions: Objectives and Policy Rationale", duration: "15:00", content: "Why sanctions exist as a foreign policy and national security tool. UN Security Council resolutions, India's obligations, and how sanctions are different from AML controls." },
            { id: "1.12", title: "Types of Sanctions (UN, National, Sectoral)", duration: "15:00", content: "Country sanctions, entity-based sanctions, sectoral sanctions, and secondary sanctions. Understanding designated persons and entities lists and how to screen against them." },
            { id: "1.13", title: "Financial Institutions' Sanctions Obligations", duration: "15:00", content: "Screening at onboarding and transaction level. Blocking, rejecting, and reporting obligations. Managing correspondent banking and cross-border payment risks." },
            { id: "1.14", title: "Sanctions Risk in a Globalised Ecosystem", duration: "15:00", content: "How sanctions exposure arises through counterparties, correspondent relationships, shell structures, and indirect exposure — and why financial institutions must look beyond the direct customer." }
        ]
    },
    {
        id: 2,
        title: "KYC, CDD & Onboarding Controls",
        description: "Risk-based customer due diligence, identity verification, beneficial ownership, and ongoing monitoring as the first line of AML defence.",
        duration: "210 mins",
        lessons: [
            { id: "2.1", title: "KYC as a Risk Management Control", duration: "15:00", content: "Understanding KYC not as a documentation exercise but as a risk management process — what we are trying to know about a customer and why." },
            { id: "2.2", title: "Regulatory Intent Behind KYC", duration: "15:00", content: "RBI Master Directions, SEBI guidelines, IRDAI and other sectoral KYC requirements. The common thread across regulators and the principle of 'Know Your Customer.'" },
            { id: "2.3", title: "Customer Identification and Verification", duration: "15:00", content: "Accepted identity documents, V-CIP, e-KYC, Aadhaar-based authentication, and the shift from paper-based to digital onboarding. Challenges and regulatory guardrails." },
            { id: "2.4", title: "Risk-Based Approach to CDD", duration: "15:00", content: "Not all customers are equal. How to calibrate CDD intensity based on assessed risk — from simplified due diligence to enhanced scrutiny." },
            { id: "2.5", title: "Customer Risk Factors Explained", duration: "15:00", content: "Geography, occupation, channel, product, transaction behaviour, and entity type as risk variables. Building a customer risk model." },
            { id: "2.6", title: "Individual vs Non-Individual Customers", duration: "15:00", content: "Additional complexity in onboarding companies, trusts, partnerships, and co-operatives. Understanding corporate structures and the need to verify beyond the named applicant." },
            { id: "2.7", title: "Beneficial Ownership: Concepts & Challenges", duration: "15:00", content: "Defining UBO — who ultimately controls or benefits? Regulatory thresholds, challenges in identifying UBOs in layered structures, nominee arrangements, and offshore entities." },
            { id: "2.8", title: "Enhanced Due Diligence (EDD)", duration: "15:00", content: "When and how to apply EDD. Senior management sign-off requirements, deeper financial profiling, source of funds documentation, and ongoing enhanced monitoring." },
            { id: "2.9", title: "Politically Exposed Persons (PEPs)", duration: "15:00", content: "Who qualifies as a PEP under Indian and global standards. Domestic vs. foreign PEPs. Family members and close associates. The lifecycle of PEP risk." },
            { id: "2.10", title: "High-Risk Jurisdictions & Products", duration: "15:00", content: "FATF grey/black lists, India's country risk assessment, and product-specific risks: private banking, correspondent banking, payable-through accounts, and trade finance." },
            { id: "2.11", title: "Source of Funds vs Source of Wealth", duration: "15:00", content: "Two distinct but complementary concepts. Why knowing where funds came from (SoF) and how wealth was accumulated (SoW) are both essential in high-risk customer relationships." },
            { id: "2.12", title: "Ongoing Due Diligence & Monitoring", duration: "15:00", content: "KYC is not a one-time event. Periodic reviews, event-driven refreshes, transaction monitoring, and keeping customer information current and accurate." },
            { id: "2.13", title: "KYC Failures and Supervisory Findings", duration: "15:00", content: "Case studies from RBI inspection reports, global regulatory actions, and enforcement orders. Common KYC deficiencies and lessons learned." },
            { id: "2.14", title: "Technology, Automation & Human Judgement", duration: "15:00", content: "The role of RegTech — identity verification tools, biometrics, AI-assisted risk scoring. Why technology enables but does not replace human judgement in compliance." }
        ]
    },
    {
        id: 3,
        title: "Financial Crime Typologies",
        description: "Recognising how financial crime is actually conducted — the patterns, structures, and behaviours that analysts and compliance professionals must detect.",
        duration: "210 mins",
        lessons: [
            { id: "3.1", title: "Understanding Typologies as Risk Signals", duration: "15:00", content: "What is a typology and how to use it. Typologies as codified intelligence — patterns extracted from past crimes to inform future detection." },
            { id: "3.2", title: "Mule Accounts and Proxy Activity", duration: "15:00", content: "How mule networks operate, the recruitment of witting and unwitting mules, signs in transaction data, and the regulatory and criminal implications for institutions that host mule accounts." },
            { id: "3.3", title: "Structuring and Threshold Avoidance", duration: "15:00", content: "Breaking transactions to avoid reporting thresholds — structuring, smurfing, micro-deposits, and round-tripping. Detection strategies and regulatory obligations." },
            { id: "3.4", title: "Shell Companies and Front Entities", duration: "15:00", content: "How shell companies are created and used for layering. Identifying shell companies through public registry data, behaviour analysis, and third-party intelligence." },
            { id: "3.5", title: "Ownership, Control, and Abuse of Corporate Structures", duration: "15:00", content: "Multi-layer ownership chains, circular ownership, nominee directors, and bearer share misuse. The challenges of piercing the corporate veil." },
            { id: "3.6", title: "Layering Through Corporate and Informal Structures", duration: "15:00", content: "How layering is achieved through a web of entities, loans-back, over/under invoicing, and hawala networks. Tracing funds through multi-jurisdictional structures." },
            { id: "3.7", title: "Digital Payments & Fintech Typologies", duration: "15:00", content: "UPI abuse, prepaid instruments, payment aggregators, and digital lending platforms as new vectors for financial crime. Emerging risks in India's digital payment ecosystem." },
            { id: "3.8", title: "Velocity, Volume, and Platform-Hopping Behaviour", duration: "15:00", content: "Unusual transaction velocity, high volumes relative to profile, and moving funds rapidly across multiple platforms and accounts as key indicators of layering activity." },
            { id: "3.9", title: "Misuse of Wallets, BNPL, and Emerging Instruments", duration: "15:00", content: "How newer financial products — digital wallets, Buy Now Pay Later, crypto-linked instruments — can be abused, and the compliance obligations for providers." },
            { id: "3.10", title: "Fraud–AML Overlaps and Convergence Risks", duration: "15:00", content: "Why fraud and money laundering are two sides of the same coin. Cyber-enabled fraud, investment scams, and the proceeds that flow into the financial system." },
            { id: "3.11", title: "Red Flags vs Suspicion", duration: "15:00", content: "Not every red flag means crime — but every STR should be grounded in documented suspicion. Understanding the threshold for reporting and the importance of context." },
            { id: "3.12", title: "Behavioural Indicators, Context and Escalation Discipline", duration: "15:00", content: "Beyond transaction data — using customer behaviour, relationship context, and change in profile to detect anomalies. When and how to escalate." },
            { id: "3.13", title: "Typologies in Indian Enforcement Actions", duration: "15:00", content: "Examination of real PMLA enforcement actions, ED press releases, and FIU orders — extracting typological insights from India's own enforcement record." },
            { id: "3.14", title: "Limits of Typology-Based Detection", duration: "15:00", content: "Why typologies alone are insufficient — the evolving nature of financial crime, adversarial adaptation, and the need for a dynamic, intelligence-led compliance approach." }
        ]
    },
    {
        id: 4,
        title: "Regulatory Landscape (India & Global)",
        description: "India's AML legal architecture, obligations of regulated entities, reporting regime, and cross-border regulatory dimensions.",
        duration: "120 mins",
        lessons: [
            { id: "4.1", title: "India's AML Legal Architecture", duration: "15:00", content: "An overview of India's AML/CFT legal framework: PMLA, PBPT Act, FEMA, the Unlawful Activities (Prevention) Act, and the interface between these statutes." },
            { id: "4.2", title: "Prevention of Money Laundering Act (PMLA)", duration: "15:00", content: "Structure of the PMLA — offences, definitions, attachment and confiscation powers, obligations on reporting entities, and adjudication mechanisms." },
            { id: "4.3", title: "Obligations of Regulated Entities", duration: "15:00", content: "The core obligations under PMLA Rules 2005: verification of identity, maintenance of records, reporting of transactions, and the appointment of a Principal Officer." },
            { id: "4.4", title: "Role and Function of FIU-IND", duration: "15:00", content: "What FIU-IND does: receiving, processing, analysing, and disseminating financial intelligence. The relationship between FIU-IND and law enforcement agencies and supervisors." },
            { id: "4.5", title: "STRs, CTRs & Reporting Quality", duration: "15:00", content: "Suspicious Transaction Reports vs. Cash Transaction Reports — when to file, how to file, and what makes a quality report. Common deficiencies and regulatory expectations." },
            { id: "4.6", title: "Supervisory Expectations & Inspections", duration: "15:00", content: "How AML supervisors (RBI, SEBI, IRDAI, etc.) assess compliance programmes. Inspection methodologies, common findings, and the consequences of supervisory deficiencies." },
            { id: "4.7", title: "Cross-Border Considerations", duration: "15:00", content: "Correspondent banking, wire transfer rules, travel rule obligations, and cross-border exposure management. FATF mutual evaluation implications for Indian financial institutions." },
            { id: "4.8", title: "Public–Private Cooperation in AML", duration: "15:00", content: "The role of PPPs like ARIFAC, information sharing platforms, joint typology development, and industry working groups in strengthening the national AML/CFT system." }
        ]
    },
    {
        id: 5,
        title: "AML Governance, Roles & Professional Journey",
        description: "Building effective AML governance structures, understanding professional responsibilities, and developing a career in financial crime compliance.",
        duration: "90 mins",
        lessons: [
            { id: "5.1", title: "AML Governance Structures", duration: "15:00", content: "Components of an effective AML programme: policies, procedures, controls, training, independent testing, and the role of the compliance function in governance." },
            { id: "5.2", title: "Three Lines of Defence", duration: "15:00", content: "How the Three Lines of Defence model applies in AML. Business lines as the first line, compliance as the second, and audit as the third — their respective roles and interfaces." },
            { id: "5.3", title: "Role of Frontline & Operations Teams", duration: "15:00", content: "Why frontline staff are the most important part of any AML programme. Customer-facing detection opportunities, escalation obligations, and how operations teams support compliance." },
            { id: "5.4", title: "Role of Compliance & MLRO", duration: "15:00", content: "The Money Laundering Reporting Officer (MLRO) / Principal Officer role under Indian law. AML compliance team structures, responsibilities, and the MLRO's accountability framework." },
            { id: "5.5", title: "Senior Management & Board Accountability", duration: "15:00", content: "Board-level oversight obligations, management information for AML governance, and the regulatory expectation of senior management accountability for compliance failures." },
            { id: "5.6", title: "Compliance Culture & Professional Judgement", duration: "15:00", content: "Values, ethics, and professional responsibility in financial crime compliance. Building a compliance culture and developing the independent judgement required of AML professionals." }
        ]
    }
];

export const finalExamQuestions: Question[] = [
    {
        id: 1,
        text: "ARIFAC is conceptualized as what type of initiative?",
        options: [
            "A government regulatory body",
            "A private-private partnership (PPP)",
            "An international NGO",
            "A public sector undertaking"
        ],
        correctAnswer: 1
    },
    {
        id: 2,
        text: "Which organization provides strategic guidance to ARIFAC?",
        options: [
            "RBI",
            "SEBI",
            "FIU-IND",
            "Ministry of Finance"
        ],
        correctAnswer: 2
    },
    {
        id: 3,
        text: "ARIFAC facilitates information sharing amongst entities belonging to:",
        options: [
            "Only the Banking sector",
            "Only the VDA sector",
            "Multiple sectors",
            "Government agencies only"
        ],
        correctAnswer: 2
    },
    {
        id: 4,
        text: "Under whose aegis does ARIFAC operate?",
        options: [
            "NASSCOM",
            "IAMAI",
            "FICCI",
            "CII"
        ],
        correctAnswer: 1
    },
    {
        id: 5,
        text: "Which of the following is NOT a key objective of ARIFAC?",
        options: [
            "Information Sharing",
            "Development of Knowledge Products",
            "Training Programmes",
            "Issuing Monetary Penalties"
        ],
        correctAnswer: 3
    }
];
