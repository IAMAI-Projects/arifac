'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'EN' | 'HI';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    EN: {
        // Navbar
        'nav.certifications': 'Certifications & Training',
        'nav.events': 'Industry Engagement',
        'nav.explore': 'Explore',
        'nav.resources': 'Resources',
        'nav.help': 'Help',
        'nav.top_aegis': 'Operating under the aegis of IAMAI',
        'nav.top_guidance': 'with strategic guidance from FIU-IND and collaboration with regulators.',
        'nav.nodal': 'Sectoral Nodal Officers',
        'nav.training_leads': 'Training Leads',
        'nav.volunteers': 'Training Volunteers',
        'nav.topics': 'Training Topics Request',
        'nav.gallery': 'Media',
        'nav.chapters': 'Regional Chapters',
        'nav.about': 'About ARIFAC',
        'nav.members': 'Members',
        'nav.benefits': 'Member Benefits',
        'nav.partnerships': 'Partnerships',
        'nav.updates': 'Regulatory Updates',
        'nav.research': 'Research & Reports',
        'nav.enterprise': 'Enterprise Solutions',
        'nav.tools': 'Compliance Tools',
        'nav.webinars': 'Webinars',
        'nav.press': 'Press Room',
        'nav.insights': 'News & Insights',
        'nav.papers': 'White Papers',
        'nav.contact': 'Contact Us',
        'nav.exam': 'Exam Framework',
        'nav.materials': 'Study Materials',
        'nav.verify': 'Verify a Certificate',
        'nav.directory': 'Member Directory',
        'nav.join': 'Join Now',
        'nav.platform_access': 'Platform Access',
        'nav.learning_platform': 'ARIFAC Certification',
        'nav.member_platform': 'ARIFAC Membership',
        'nav.team_login': 'ARIFAC Team Login',
        'nav.logout': 'Logout',
        'nav.search_placeholder': 'Search for courses, certifications, or news...',
        'nav.search_title': 'What are you looking for?',
        'nav.search_quick': 'Quick results',
        'nav.training': 'Training',
        'logo.tagline': 'Building Partnerships in AML/CFT',
        'logo.badge': 'Professional Framework',
        'res.cat_report': 'Report',
        'res.cat_guidance': 'Guidance',
        'res.cat_whitepaper': 'Whitepaper',
        'res.vis_public': 'Public',
        'res.vis_member': 'Member',
        'common.oct': 'Oct',
        'common.nov': 'Nov',
        'common.dec': 'Dec',
        'data.cert.title1': 'Foundations of AML, CFT & Sanctions',
        'data.cert.title2': 'Intermediate Compliance & Regulatory Oversight',
        'data.cert.title3': 'India’s AML/CFT capability platform supported by FIU India',

        // Data: Meetings (Revised from file)
        'data.meeting.consult.title_short': '5th Multilateral Consultation',
        'data.meeting.consult.loc': 'FIU-IND, New Delhi',
        'data.meeting.consult.type_short': 'High-Level Briefing',
        'data.meeting.regional.title': 'North India Regional Meet',
        'data.meeting.regional.loc': 'IAMAI Office, Gurugram',
        'data.meeting.regional.type': 'Operational Workshop',

        // Data: About
        'data.about.title': 'About ARIFAC',
        'data.about.desc': 'The Alliance of Reporting Entities in India for AML/CFT (ARIFAC) is a national, industry-led initiative operating under the aegis of IAMAI, with strategic guidance from the Financial Intelligence Unit - India (FIU-IND). We bridge the gap between regulatory expectation and operational execution.',
        'data.about.feat.nat.title': 'National Coordination',
        'data.about.feat.nat.desc': 'Unifying diverse reporting entities under a common compliance framework.',
        'data.about.feat.cap.title': 'Capability Development',
        'data.about.feat.cap.desc': 'Standardizing competency through tiered professional certifications.',
        'data.about.feat.dialogue.title': 'Industry-Regulator Dialogue',
        'data.about.feat.dialogue.desc': 'Facilitating constructive feedback loops between industry and regulators.',
        'data.about.feat.know.title': 'Collaborative Knowledge',
        'data.about.feat.know.desc': 'Sharing typologies, red flags, and best practices across sectors.',

        // Hero Section
        'hero.badge': "India's National AML/CFT Compliance Platform",
        'hero.title': 'India’s AML/CFT',
        'hero.title_integrity': 'Capability Platform',
        'hero.title_architecture': 'Supported by FIU India',
        'hero.description': "\nARIFAC is an industry collaboration platform established to strengthen AML/CFT compliance capacity, knowledge sharing, and professional training across India’s financial and non-financial reporting entities.\nThe initiative operates with guidance from the Financial Intelligence Unit – India (FIU-IND) and aims to build a structured ecosystem for training, certification, policy dialogue, and industry collaboration on financial crime prevention.",
        'hero.btn_explore': 'Explore Certification',
        'hero.btn_join': 'Become a Member',
        'hero.stats_entities': 'Reporting Entities',
        'hero.stats_professionals': 'Certified Professionals',
        'hero.stats_modules': 'Regulatory Modules',
        'hero.scroll': 'Scroll',

        // Meetings Section
        'meetings.engagements': 'Engagements',
        'meetings.title': 'Latest Consultations',
        'meetings.description': "Tracking strategic dialogues and regional workshops strengthening India's financial integrity.",
        'meetings.all': 'All Meetings',

        // Certifications Section
        'cert.title': 'Professional',
        'cert.title_framework': 'Certification Framework',
        'cert.description': 'A tiered competency model designed to standardize financial integrity expertise across the national ecosystem.',
        'cert.all': 'View All Courses',
        'cert.level': 'Level',
        'cert.validity': 'validity',
        'cert.syllabus': 'View Syllabus',
        'cert.enroll': 'Enroll Now',
        'cert.go_to_course': 'Go to Course',

        // Membership Section
        'member.network': 'Our Network',
        'member.title': 'Institutional Membership',
        'member.description': 'ARIFAC unites the entire ecosystem of reporting entities under a common governance framework.',
        'member.benefits_title': 'Membership Benefits',
        'member.benefits_desc': 'Access exclusive working groups, typology reports, and direct regulatory feedback channels.',
        'member.fee_btn': 'View Membership Benefits',

        // Engagement Section
        'engage.collab': 'Collaboration',
        'engage.title': 'Engagement Models',
        'engage.description': 'Structured platforms for industry-wide dialogue, policy formulation, and operational problem-solving.',
        'engage.calendar': 'View Calendar',
        'engage.participate': 'Participate',

        // Partners Section
        'partners.title': 'Strategic Ecosystem',
        'partners.description': 'Operating under the aegis of IAMAI, with strategic guidance from FIU-IND and collaboration with key regulators.',
        'partners.disclaimer': '"ARIFAC certifications are professional development credentials and do not substitute statutory compliance obligations."',

        // Resources Section
        'resources.title': 'Knowledge Hub',
        'resources.description': 'Latest research, guidance, and regulatory updates.',
        'resources.all': 'View All Resources',
        'resources.download': 'Download',
        'resources.signin': 'Sign In',
        'resources.pdf': 'PDF',

        // Footer
        'footer.desc': "Empowering India's financial ecosystem through unified compliance standards, expert certification, and strategic regulatory dialogue.",
        'footer.iamai_aegis': 'Operating under the aegis of',
        'footer.iamai_full': 'Internet & Mobile Association of India',
        'footer.iamai_desc': "ARIFAC is developed and maintained by IAMAI as part of India's commitment to strengthening financial integrity frameworks.",
        'footer.rights': 'All rights reserved.',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Use',
        'footer.cookie': 'Cookie Policy',

        // Data: Membership
        'data.member.banking.title': 'Banking Institutions',
        'data.member.banking.desc': 'Public, Private, and Foreign Banks operating in India.',
        'data.member.nbfc.title': 'NBFCs',
        'data.member.nbfc.desc': 'Non-Banking Financial Companies across all tiers.',
        'data.member.ins.title': 'Insurance',
        'data.member.ins.desc': 'Life and General Insurance companies.',
        'data.member.sec.title': 'Securities Markets',
        'data.member.sec.desc': 'Brokerages, Depositories, and Mutual Funds.',
        'data.member.vda.title': 'VDA Ecosystem',
        'data.member.vda.desc': 'Virtual Digital Asset exchanges and custodians.',
        'data.member.dnfbp.title': 'DNFBP',
        'data.member.dnfbp.desc': 'Designated Non-Financial Businesses and Professions.',
        'data.member.tech.title': 'Technology Providers',
        'data.member.tech.desc': 'RegTech and FinTech solution providers.',

        // Data: Engagement
        'data.engage.round.title': 'Sectoral Roundtables',
        'data.engage.round.desc': 'Focused discussions on sector-specific compliance challenges.',
        'data.engage.work.title': 'Workshops',
        'data.engage.work.desc': 'Hands-on training sessions on operational procedures.',
        'data.engage.policy.title': 'Policy Consultations',
        'data.engage.policy.desc': 'Consolidated industry feedback on draft regulations.',
        'data.engage.typology.title': 'Typology Briefings',
        'data.engage.typology.desc': 'Updates on emerging financial crime trends and methods.',
        'data.engage.group.title': 'Working Groups',
        'data.engage.group.desc': 'Task forces dedicated to solving specific industry issues.',

        // Data: Partners
        'data.partner.strategic': 'Strategic Guidance',
        'data.partner.knowledge': 'Knowledge Partners',
        'data.partner.fiu': 'Financial Intelligence Unit - India (FIU-IND)',
        'data.partner.law': 'Leading Law Firms',
        'data.partner.global': 'Global Consultancies',
        'data.partner.acad': 'Academic Institutions',

        // Data: Meetings
        'data.meeting.briefing.title': "High-Level Briefing on India's 2024 Mutual Evaluation",
        'data.meeting.briefing.type': 'Strategic Briefing',
        'data.meeting.consult.title': '5th Multilateral Consultation on Regulatory Frameworks',
        'data.meeting.consult.type': 'Regulatory Dialogue',
        'data.meeting.workshop.title': 'Regional Workshop: Enhanced Due Diligence for High-Risk Sectors',
        'data.meeting.workshop.type': 'Technical Workshop',

        // Data: Certifications
        'data.cert.course1.title': 'Certified AML & Financial Crime Professional',
        'data.cert.course1.desc': 'Specialized certification for reporting entities in the Indian financial sector.',

        // Generic
        'common.no_results': 'No results found',
        'common.search': 'Search...',
    },
    HI: {
        // Navbar
        'nav.certifications': 'प्रमाणीकरण और प्रशिक्षण',
        'nav.events': 'कार्यक्रम और बैठकें',
        'nav.explore': 'एक्सप्लोर करें',
        'nav.resources': 'संसाधन',
        'nav.help': 'सहायता',
        'nav.top_aegis': 'IAMAI के तत्वावधान में संचालित',
        'nav.top_guidance': 'FIU-IND के रणनीतिक मार्गदर्शन और नियामकों के सहयोग से।',
        'nav.nodal': 'क्षेत्रीय नोडल अधिकारी',
        'nav.training_leads': 'प्रशिक्षण प्रमुख',
        'nav.volunteers': 'प्रशिक्षण स्वयंसेवक',
        'nav.topics': 'प्रशिक्षण विषय अनुरोध',
        'nav.gallery': 'मीडिया',
        'nav.chapters': 'क्षेत्रीय इकाइयाँ',
        'nav.about': 'ARIFAC के बारे में',
        'nav.members': 'सदस्य',
        'nav.benefits': 'सदस्यता लाभ',
        'nav.partnerships': 'साझेदारी',
        'nav.updates': 'नियामक अपडेट',
        'nav.research': 'शोध और रिपोर्ट',
        'nav.enterprise': 'एंटरप्राइज समाधान',
        'nav.tools': 'अनुपालन उपकरण',
        'nav.webinars': 'वेबिनार',
        'nav.press': 'प्रेस रूम',
        'nav.insights': 'समाचार और अंतर्दृष्टि',
        'nav.papers': 'श्वेत पत्र',
        'nav.contact': 'संपर्क करें',
        'nav.exam': 'परीक्षा ढांचा',
        'nav.materials': 'अध्ययन सामग्री',
        'nav.verify': 'प्रमाणपत्र सत्यापित करें',
        'nav.directory': 'सदस्य निर्देशिका',
        'nav.join': 'अभी जुड़ें',
        'nav.platform_access': 'प्लैटफॉर्म एक्सेस',
        'nav.learning_platform': 'लर्निंग प्लैटफॉर्म',
        'nav.member_platform': 'मेंबर प्लैटफॉर्म',
        'nav.team_login': 'ARIFAC टीम लॉगिन',
        'nav.logout': 'लॉगआउट',
        'nav.search_placeholder': 'कोर्स, प्रमाणन या समाचार खोजें...',
        'nav.search_title': 'आप क्या खोज रहे हैं?',
        'nav.search_quick': 'त्वरित परिणाम',
        'nav.training': 'प्रशिक्षण',
        'logo.tagline': 'AML/CFT में साझेदारी बनाना',
        'logo.badge': 'व्यावसायिक ढांचा',
        'res.cat_report': 'रिपोर्ट',
        'res.cat_guidance': 'मार्गदर्शन',
        'res.cat_whitepaper': 'श्वेतपत्र',
        'res.vis_public': 'सार्वजनिक',
        'res.vis_member': 'सदस्य',
        'common.oct': 'अक्टूबर',
        'common.nov': 'नवंबर',
        'common.dec': 'दिसंबर',
        'data.cert.title1': 'AML, CFT और प्रतिबंधों की नींव',
        'data.cert.title2': 'मध्यवर्ती अनुपालन और नियामक निरीक्षण',
        'data.cert.title3': 'उन्नत AML रणनीति और संस्थागत डिजाइन',

        // Data: Meetings (Revised from file)
        'data.meeting.consult.title_short': '5वां बहुपक्षीय परामर्श',
        'data.meeting.consult.loc': 'FIU-IND, नई दिल्ली',
        'data.meeting.consult.type_short': 'उच्च स्तरीय ब्रीफिंग',
        'data.meeting.regional.title': 'उत्तर भारत क्षेत्रीय बैठक',
        'data.meeting.regional.loc': 'IAMAI कार्यालय, गुरुग्राम',
        'data.meeting.regional.type': 'परिचालन कार्यशाला',

        // Data: About
        'data.about.title': 'ARIFAC के बारे में',
        'data.about.desc': 'भारत में रिपोर्टिंग संस्थाओं के लिए AML/CFT (ARIFAC) IAMAI के तत्वावधान में संचालित एक राष्ट्रीय, उद्योग-नेतृत्व वाली पहल है, जिसे वित्तीय खुफिया इकाई - भारत (FIU-IND) से रणनीतिक मार्गदर्शन प्राप्त है। हम विनियामक अपेक्षा और परिचालन निष्पादन के बीच के अंतर को पाटते हैं।',
        'data.about.feat.nat.title': 'राष्ट्रीय समन्वय',
        'data.about.feat.nat.desc': 'एक साझा अनुपालन ढांचे के तहत विविध रिपोर्टिंग संस्थाओं को एकजुट करना।',
        'data.about.feat.cap.title': 'क्षमता विकास',
        'data.about.feat.cap.desc': 'स्तरीय पेशेवर प्रमाणपत्रों के माध्यम से दक्षता का मानकीकरण करना।',
        'data.about.feat.dialogue.title': 'उद्योग-नियामक संवाद',
        'data.about.feat.dialogue.desc': 'उद्योग और नियामकों के बीच रचनात्मक फीडबैक लूप की सुविधा प्रदान करना।',
        'data.about.feat.know.title': 'सहयोगात्मक ज्ञान',
        'data.about.feat.know.desc': 'क्षेत्रों में टाइपोलॉजी, रेड फ्लैग और सर्वोत्तम प्रथाओं को साझा करना।',

        // Hero Section
        'hero.badge': "भारत का राष्ट्रीय AML/CFT अनुपालन मंच",
        'hero.title': 'भारत का AML/CFT',
        'hero.title_integrity': 'क्षमता मंच',
        'hero.title_architecture': 'FIU-IND द्वारा समर्थित',
        'hero.description': "ARIFAC एक उद्योग सहयोग मंच है जिसे भारत की वित्तीय और गैर-वित्तीय रिपोर्टिंग संस्थाओं में AML/CFT अनुपालन क्षमता, ज्ञान साझाकरण और पेशेवर प्रशिक्षण को मजबूत करने के लिए स्थापित किया गया है।\n\nयह पहल वित्तीय खुफिया इकाई - भारत (FIU-IND) के मार्गदर्शन में संचालित होती है और प्रशिक्षण, प्रमाणन, नीति संवाद और वित्तीय अपराध रोकथाम पर उद्योग सहयोग के लिए एक संरचित पारिस्थितिकी तंत्र बनाने का लक्ष्य रखती है।",
        'hero.btn_explore': 'प्रमाणन एक्सप्लोर करें',
        'hero.btn_join': 'सदस्य बनें',
        'hero.stats_entities': 'रिपोर्टिंग संस्थाएं',
        'hero.stats_professionals': 'प्रमाणित पेशेवर',
        'hero.stats_modules': 'नियामक मॉड्यूल',
        'hero.scroll': 'नीचे स्क्रॉल करें',

        // Meetings Section
        'meetings.engagements': 'सहभागिता',
        'meetings.title': 'नवीनतम परामर्श',
        'meetings.description': "भारत की वित्तीय अखंडता को मजबूत करने वाली रणनीतिक संवादों और क्षेत्रीय कार्यशालाओं पर नज़र रखना।",
        'meetings.all': 'सभी बैठकें',

        // Certifications Section
        'cert.title': 'पेशेवर',
        'cert.title_framework': 'प्रमाणन ढांचा',
        'cert.description': 'राष्ट्रीय पारिस्थितिकी तंत्र में वित्तीय अखंडता विशेषज्ञता को मानकीकृत करने के लिए डिज़ाइन किया गया एक स्तरीय क्षमता मॉडल।',
        'cert.all': 'सभी कोर्स देखें',
        'cert.level': 'स्तर',
        'cert.validity': 'वैधता',
        'cert.syllabus': 'पाठ्यक्रम देखें',
        'cert.enroll': 'अभी नामांकन करें',
        'cert.go_to_course': 'कोर्स पर जाएं',

        // Membership Section
        'member.network': 'हमारा नेटवर्क',
        'member.title': 'संस्थागत सदस्यता',
        'member.description': 'ARIFAC रिपोर्टिंग संस्थाओं के पूरे पारिस्थितिकी तंत्र को एक साझा शासन ढांचे के तहत एकजुट करता है।',
        'member.benefits_title': 'सदस्यता के लाभ',
        'member.benefits_desc': 'विशेष कार्य समूहों, टाइपोलॉजी रिपोर्ट और प्रत्यक्ष नियामक फीडबैक चैनलों तक पहुंच।',
        'member.fee_btn': 'शुल्क संरचना देखें',

        // Engagement Section
        'engage.collab': 'सहयोग',
        'engage.title': 'जुड़ाव मॉडल',
        'engage.description': 'उद्योग-व्यापी संवाद, नीति निर्माण और परिचालन समस्या-समाधान के लिए संरचित मंच।',
        'engage.calendar': 'कैलेंडर देखें',
        'engage.participate': 'भाग लें',

        // Partners Section
        'partners.title': 'रणनीतिक पारिस्थितिकी तंत्र',
        'partners.description': 'IAMAI के तत्वावधान में संचालित, FIU-IND के रणनीतिक मार्गदर्शन और प्रमुख नियामकों के सहयोग से।',
        'partners.disclaimer': '"ARIFAC प्रमाणपत्र पेशेवर विकास क्रेडेंशियल हैं और वैधानिक अनुपालन दायित्वों का विकल्प नहीं हैं।"',

        // Resources Section
        'resources.title': 'ज्ञान केंद्र',
        'resources.description': 'नवीनतम शोध, मार्गदर्शन और नियामक अपडेट।',
        'resources.all': 'सभी संसाधन देखें',
        'resources.download': 'डाउनलोड करें',
        'resources.signin': 'साइन-इन करें',
        'resources.pdf': 'पीडीएफ',

        // Footer
        'footer.desc': "एकीकृत अनुपालन मानकों, विशेषज्ञ प्रमाणन और रणनीतिक नियामक संवाद के माध्यम से भारत के वित्तीय पारिस्थितिकी तंत्र को सशक्त बनाना।",
        'footer.iamai_aegis': 'तत्वावधान में संचालित',
        'footer.iamai_full': 'इंटरनेट एंड मोबाइल एसोसिएशन ऑफ इंडिया',
        'footer.iamai_desc': "ARIFAC को भारत के वित्तीय अखंडता ढांचे को मजबूत करने की प्रतिबद्धता के हिस्से के रूप में IAMAI द्वारा विकसित और बनाए रखा गया है।",
        'footer.rights': 'सर्वाधिकार सुरक्षित।',
        'footer.privacy': 'गोपनीयता नीति',
        'footer.terms': 'उपयोग की शर्तें',
        'footer.cookie': 'कुकी नीति',

        // Data: Membership
        'data.member.banking.title': 'बैंकिंग संस्थान',
        'data.member.banking.desc': 'भारत में संचालित सार्वजनिक, निजी और विदेशी बैंक।',
        'data.member.nbfc.title': 'NBFCs',
        'data.member.nbfc.desc': 'सभी स्तरों पर गैर-बैंकिंग वित्तीय कंपनियां।',
        'data.member.ins.title': 'बीमा',
        'data.member.ins.desc': 'जीवन और सामान्य बीमा कंपनियां।',
        'data.member.sec.title': 'प्रतिभूति बाजार',
        'data.member.sec.desc': 'ब्रोकरेज, डिपॉजिटरी और म्यूचुअल फंड।',
        'data.member.vda.title': 'VDA पारिस्थितिकी तंत्र',
        'data.member.vda.desc': 'वर्चुअल डिजिटल एसेट एक्सचेंज और कस्टोडियन।',
        'data.member.dnfbp.title': 'DNFBP',
        'data.member.dnfbp.desc': 'नामित गैर-वित्तीय व्यवसाय और पेशे।',
        'data.member.tech.title': 'प्रौद्योगिकी प्रदाता',
        'data.member.tech.desc': 'RegTech और FinTech समाधान प्रदाता।',

        // Data: Engagement
        'data.engage.round.title': 'क्षेत्रीय गोलमेज सम्मेलन',
        'data.engage.round.desc': 'क्षेत्र-विशिष्ट अनुपालन चुनौतियों पर केंद्रित चर्चा।',
        'data.engage.work.title': 'कार्यशालाएं',
        'data.engage.work.desc': 'परिचालन प्रक्रियाओं पर व्यावहारिक प्रशिक्षण सत्र।',
        'data.engage.policy.title': 'नीति परामर्श',
        'data.engage.policy.desc': 'मसौदा विनियमों पर उद्योग की समेकित प्रतिक्रिया।',
        'data.engage.typology.title': 'टाइपोलॉजी ब्रीफिंग',
        'data.engage.typology.desc': 'उभरते वित्तीय अपराध रुझानों और विधियों पर अपडेट।',
        'data.engage.group.title': 'कार्य समूह',
        'data.engage.group.desc': 'विशिष्ट उद्योग समस्याओं को हल करने के लिए समर्पित टास्क फोर्स।',

        // Data: Partners
        'data.partner.strategic': 'रणनीतिक मार्गदर्शन',
        'data.partner.knowledge': 'ज्ञान भागीदार',
        'data.partner.fiu': 'वित्तीय खुफिया इकाई - भारत (FIU-IND)',
        'data.partner.law': 'अग्रणी कानून फर्में',
        'data.partner.global': 'वैश्विक परामर्शदात्री',
        'data.partner.acad': 'शैक्षणिक संस्थान',

        // Data: Meetings
        'data.meeting.briefing.title': 'भारत के 2024 पारस्परिक मूल्यांकन पर उच्च स्तरीय ब्रीफिंग',
        'data.meeting.briefing.type': 'रणनीतिक ब्रीफिंग',
        'data.meeting.consult.title': 'नियामक ढांचे पर 5वां बहुपक्षीय परामर्श',
        'data.meeting.consult.type': 'नियामक संवाद',
        'data.meeting.workshop.title': 'क्षेत्रीय कार्यशाला: उच्च जोखिम वाले क्षेत्रों के लिए उन्नत उचित परिश्रम',
        'data.meeting.workshop.type': 'तकनीकी कार्यशाला',

        // Data: Certifications
        'data.cert.course1.title': 'प्रमाणित AML और वित्तीय अपराध पेशेवर',
        'data.cert.course1.desc': 'भारतीय वित्तीय क्षेत्र में रिपोर्टिंग संस्थाओं के लिए विशेष प्रमाणन।',

        // Generic
        'common.no_results': 'कोई परिणाम नहीं मिला',
        'common.search': 'खोजें...',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('EN');

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
