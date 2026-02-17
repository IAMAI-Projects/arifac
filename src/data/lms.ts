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
        title: "The ARIFAC Vision",
        description: "Understanding the first-of-its-kind private-private partnership model.",
        duration: "45 mins",
        lessons: [
            {
                id: "1.1",
                title: "Introduction to ARIFAC",
                duration: "15:00",
                content: `
# Alliance of Reporting Entities in India for AML/CFT (ARIFAC)

ARIFAC has been conceptualized as a **first-of-its-kind, private-private partnership initiative**.

## Core Identity
It unites reporting entities in India belonging to **multiple sectors**. Unlike traditional trade bodies that may focus on a single vertical (e.g., only banks), ARIFAC bridges the gap between diverse financial players.

## Key Objectives
- **Information Sharing**: Breaking silos between different reporting entities.
- **Knowledge Development**: Creating a unified repository of typologies and red flags.
        `
            },
            {
                id: "1.2",
                title: "The Role of IAMAI & FIU-IND",
                duration: "15:00",
                content: "ARIFAC operates under the aegis of the **Internet and Mobile Association of India (IAMAI)**, ensuring a strong digital-first approach. Crucially, it functions with **strategic guidance from the Financial Intelligence Unit - India (FIU-IND)**, ensuring that all initiatives are aligned with national security and regulatory priorities."
            },
            {
                id: "1.3",
                title: "Private-Private Partnership (PPP)",
                duration: "15:00",
                content: "The PPP model enables peer-to-peer collaboration without immediate regulatory intervention, fostering a culture of trust and proactive compliance. This module explores global PPP success stories and how ARIFAC adapts them for India."
            }
        ]
    },
    {
        id: 2,
        title: "Key Deliverables & Mechanisms",
        description: "Deep dive into information sharing, knowledge products, and training.",
        duration: "60 mins",
        lessons: [
            {
                id: "2.1",
                title: "Information Sharing Framework",
                duration: "20:00",
                content: "Facilitating secure, anonymized sharing of threat intelligence. How REs can collaborate to identify complex money laundering networks that span across banks, NBFCs, and VDA platforms."
            },
            {
                id: "2.2",
                title: "Knowledge Products",
                duration: "20:00",
                content: "Development of sector-specific guidance notes, typology reports, and risk assessment templates. These products are designed to standardize compliance maturity across the ecosystem."
            },
            {
                id: "2.3",
                title: "Training & Capacity Building",
                duration: "20:00",
                content: "Standardized training programmes and certifications to upskill the compliance workforce. This ensures that 'compliance' is not just a checkbox but a skilled profession."
            }
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
