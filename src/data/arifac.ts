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
    enrollUrl?: string;         // External enrollment URL
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
    title: "India’s AML/CFT capability platform supported by FIU India",
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
        title: "Certified AML & Financial Crime Professional – India (Level 1)",
        targetAudience: "Entry-level professionals, and support staff.",
        features: [
            "Foundations of AML, CFT & Sanctions",
            "KYC, CDD & Onboarding Controls",
            "Financial Crime Typologies",
            "Regulatory Landscape (India & Global)",
            "AML Governance, Roles & Professional Journey"
        ],
        validity: "Lifetime",
        isProctored: false,
        price: 5000,
        syllabus: lmsCourseData,
        enrollUrl: "https://arifac.iamai.in/course/CertifiedAMLFinancialCrimeProfessionalIndia-105418"
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
