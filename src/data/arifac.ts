import { LucideIcon, Shield, FileText, Users, Globe, BookOpen, Award, Building2, Landmark, GraduationCap, Scale, Briefcase } from 'lucide-react';

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
        isProctored: false
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
        isProctored: true
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
        isProctored: true
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
        isProctored: true
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
        icon: Shield
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
