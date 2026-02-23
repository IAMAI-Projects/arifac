import { LucideIcon, ShieldCheck, FileText, Users, Globe, BookOpen, Award, Building2, Landmark, GraduationCap, Scale, Briefcase } from 'lucide-react';
import { lmsCourseData, Module } from './lms';

export interface Section {
    id: string;
    title: string;
    subtitle: string;
    description: string;
}

export interface CertificationLevel {
    level: string;
    title: string;
    targetAudience: string;
    features: string[];
    validity: string;
    isProctored: boolean;
    price: number;              // Price in INR
    syllabus?: Module[];
}

export interface MembershipCategory {
    title: string;
    description: string;
    icon?: LucideIcon;
}

export interface EngagementFormat {
    title: string;
    description: string;
    icon?: LucideIcon;
}

export interface PartnerCategory {
    title: string;
    partners: string[];
}

export interface ResourceItem {
    title: string;
    type: 'Report' | 'Whitepaper' | 'Guidance' | 'Case Study' | 'Webinar' | 'Newsletter';
    accessLevel: 'Public' | 'Member' | 'Certified Professional';
    date: string;
}

export const heroData = {
    title: "Advancing India’s Financial Integrity Architecture",
    subtitle: "National, industry-led platform strengthening AML, CFT and Sanctions capability.",
    ctaPrimary: "Become a Member",
    ctaSecondary: "Explore Certification"
};

export const aboutData = {
    title: "About ARIFAC",
    subtitle: "A Strategic Alliance for Financial Integrity",
    description: "The Alliance of Reporting Entities in India for AML/CFT (ARIFAC) is a national, industry-led initiative operating under the aegis of IAMAI, with strategic guidance from the Financial Intelligence Unit - India (FIU-IND). We bridge the gap between regulatory expectation and operational execution.",
    features: [
        {
            title: "National Coordination",
            description: "Unifying diverse reporting entities under a common compliance framework.",
            icon: Globe
        },
        {
            title: "Capability Development",
            description: "Standardizing competency through tiered professional certifications.",
            icon: GraduationCap
        },
        {
            title: "Industry-Regulator Dialogue",
            description: "Facilitating constructive feedback loops between industry and regulators.",
            icon: Scale
        },
        {
            title: "Collaborative Knowledge",
            description: "Sharing typologies, red flags, and best practices across sectors.",
            icon: BookOpen
        }
    ]
};

export const certificationLevels: CertificationLevel[] = [
    {
        level: "L1",
        title: "Foundations of Financial Integrity",
        targetAudience: "Entry-level professionals, students, and support staff.",
        features: [
            "Core AML/CFT concepts",
            "Regulatory landscape overview",
            "Basic due diligence principles",
            "Ethical compliance standards"
        ],
        validity: "Lifetime",
        isProctored: false,
        price: 5000,
        syllabus: lmsCourseData
    },
    {
        level: "L2",
        title: "Certified AML/CFT Practitioner",
        targetAudience: "Compliance officers, analysts, and operations staff.",
        features: [
            "KYC/CDD operational procedures",
            "Transaction monitoring techniques",
            "STR filing mechanisms",
            "Risk assessment methodologies"
        ],
        validity: "3 Years",
        isProctored: true,
        price: 10000,
        syllabus: [
            {
                id: 1,
                title: "Advanced KYC/CDD",
                description: "Deep dive into customer due diligence for complex entities.",
                duration: "2 hours",
                lessons: [
                    { id: "1.1", title: "Beneficial Ownership Identification", duration: "40:00", content: "Techniques for unraveling complex corporate structures." },
                    { id: "1.2", title: "Enhanced Due Diligence (EDD) for High Risk", duration: "40:00", content: "Protocols for PEPs and high-risk jurisdictions." },
                    { id: "1.3", title: "Ongoing Monitoring Requirements", duration: "40:00", content: "Dynamic risk profiling and review cycles." }
                ]
            },
            {
                id: 2,
                title: "Transaction Monitoring & STR",
                description: "Operationalizing alert management and reporting.",
                duration: "2.5 hours",
                lessons: [
                    { id: "2.1", title: "Red Flag Typologies", duration: "45:00", content: "Common and emerging alert scenarios across sectors." },
                    { id: "2.2", title: "Alert Investigation Workflow", duration: "45:00", content: "From alert triggers to investigation closure." },
                    { id: "2.3", title: "Filing Quality STRs/SARs", duration: "60:00", content: "Narrative writing and FIU reporting standards." }
                ]
            }
        ]
    },
    {
        level: "L3",
        title: "Certified Financial Integrity Specialist",
        targetAudience: "Senior analysts, team leads, and subject matter experts.",
        features: [
            "Advanced complex investigations",
            "Sanctions screening & calibration",
            "Trade-based money laundering",
            "Crypto-asset compliance"
        ],
        validity: "3 Years",
        isProctored: true,
        price: 15000,
        syllabus: [
            {
                id: 1,
                title: "Sanctions & TBML",
                description: "Advanced screening and trade compliance.",
                duration: "3 hours",
                lessons: [
                    { id: "1.1", title: "Sanctions List Management", duration: "60:00", content: "Calibration, fuzzy matching, and false positive reduction." },
                    { id: "1.2", title: "Trade Based Money Laundering (TBML)", duration: "60:00", content: "Under-invoicing, over-invoicing, and ghost shipping." },
                    { id: "1.3", title: "Dual-Use Goods & Proliferation Fin", duration: "60:00", content: "Tracking strategic trade and export controls." }
                ]
            },
            {
                id: 2,
                title: "Digital Assets & Investigations",
                description: "Crypto compliance and forensic techniques.",
                duration: "3 hours",
                lessons: [
                    { id: "2.1", title: "VDA Risk & Compliance", duration: "60:00", content: "Travel rule implementation and wallet screening." },
                    { id: "2.2", title: "On-chain Investigation Basics", duration: "60:00", content: "Blockchain forensic tools and tracing methodologies." },
                    { id: "2.3", title: "Advanced Investigative Interviewing", duration: "60:00", content: "Psychology of fraud and elicitation techniques." }
                ]
            }
        ]
    },
    {
        level: "L4",
        title: "Executive Master in Financial Governance",
        targetAudience: "Chief Compliance Officers, MLROs, and Heads of Risk.",
        features: [
            "Strategic compliance leadership",
            "Regulatory diplomacy",
            "Governance & board reporting",
            "Cross-border regulatory frameworks"
        ],
        validity: "5 Years",
        isProctored: true,
        price: 20000,  // L4 Executive level pricing
        syllabus: [
            {
                id: 1,
                title: "Strategic Compliance Management",
                description: "Building a culture of integrity at the board level.",
                duration: "4 hours",
                lessons: [
                    { id: "1.1", title: "Board Reporting & Governance", duration: "60:00", content: "Communicating residual risk to non-executive directors." },
                    { id: "1.2", title: "Regulatory Diplomacy", duration: "60:00", content: "Managing inspections and constructive engagement." },
                    { id: "1.3", title: "Ethics & Compliance Culture", duration: "120:00", content: "Tone from the top and whistleblower management." }
                ]
            },
            {
                id: 2,
                title: "Global Standards & Future Trends",
                description: "Navigating the international regulatory landscape.",
                duration: "4 hours",
                lessons: [
                    { id: "2.1", title: "FATF Recommendations & Mutual Eval", duration: "60:00", content: "Understanding national and institutional impact." },
                    { id: "2.2", title: "AI/ML in Compliance Governance", duration: "120:00", content: "Governing algorithmic decision-making." },
                    { id: "2.3", title: "ESG & Financial Crime Linkage", duration: "60:00", content: "Environmental crime and social governance risks." }
                ]
            }
        ]
    }
];

export const membershipCategories: MembershipCategory[] = [
    {
        title: "Banking Institutions",
        description: "Public, Private, and Foreign Banks operating in India.",
        icon: Landmark
    },
    {
        title: "NBFCs",
        description: "Non-Banking Financial Companies across all tiers.",
        icon: Building2
    },
    {
        title: "Insurance",
        description: "Life and General Insurance companies.",
        icon: ShieldCheck
    },
    {
        title: "Securities Markets",
        description: "Brokerages, Depositories, and Mutual Funds.",
        icon: Briefcase
    },
    {
        title: "VDA Ecosystem",
        description: "Virtual Digital Asset exchanges and custodians.",
        icon: Globe
    },
    {
        title: "DNFBP",
        description: "Designated Non-Financial Businesses and Professions.",
        icon: FileText
    },
    {
        title: "Technology Providers",
        description: "RegTech and FinTech solution providers.",
        icon: Users
    }
];

export const engagementFormats: EngagementFormat[] = [
    {
        title: "Sectoral Roundtables",
        description: "Focused discussions on sector-specific compliance challenges."
    },
    {
        title: "Workshops",
        description: "Hands-on training sessions on operational procedures."
    },
    {
        title: "Policy Consultations",
        description: "Consolidated industry feedback on draft regulations."
    },
    {
        title: "Typology Briefings",
        description: "Updates on emerging financial crime trends and methods."
    },
    {
        title: "Working Groups",
        description: "Task forces dedicated to solving specific industry issues."
    }
];

export const partnersData: PartnerCategory[] = [
    {
        title: "Strategic Guidance",
        partners: ["Financial Intelligence Unit - India (FIU-IND)"]
    },
    {
        title: "Regulatory Engagement",
        partners: ["Reserve Bank of India (RBI)", "SEBI", "IRDAI", "IFSCA"]
    },
    {
        title: "Knowledge Partners",
        partners: ["Leading Law Firms", "Global Consultancies", "Academic Institutions"]
    }
];

export const resourcesData: ResourceItem[] = [
    {
        title: "Annual State of Compliance Report 2025",
        type: "Report",
        accessLevel: "Public",
        date: "Jan 2025"
    },
    {
        title: "Guidance Note on VDA Travel Rule Implementation",
        type: "Guidance",
        accessLevel: "Member",
        date: "Dec 2024"
    },
    {
        title: "Typologies of Trade-Based Money Laundering",
        type: "Whitepaper",
        accessLevel: "Certified Professional",
        date: "Nov 2024"
    },
    {
        title: "Case Study: Mule Account Networks",
        type: "Case Study",
        accessLevel: "Certified Professional",
        date: "Oct 2024"
    },
    {
        title: "RBI Master Direction Updates Webinar",
        type: "Webinar",
        accessLevel: "Member",
        date: "Sep 2024"
    },
    {
        title: "ARIFAC Monthly Newsletter - August",
        type: "Newsletter",
        accessLevel: "Public",
        date: "Aug 2024"
    }
];
