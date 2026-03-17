'use client';

import { motion } from 'framer-motion';
import { partnersData } from '@/data/arifac';
import { useLanguage } from './LanguageContext';

export default function PartnersSection() {
    const { t } = useLanguage();

    const partnerKeys: Record<string, string> = {
        "Strategic Guidance": "data.partner.strategic",
        "Knowledge Partners": "data.partner.knowledge"
    };

    const partnerItems: Record<string, string> = {
        "Financial Intelligence Unit - India (FIU-IND)": "data.partner.fiu",
        "Leading Law Firms": "data.partner.law",
        "Global Consultancies": "data.partner.global",
        "Academic Institutions": "data.partner.acad"
    };

    return (
        <section id="partners" className="py-32 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center text-center mb-24">
                    <span className="text-secondary text-[12px] font-bold tracking-[0.2em] uppercase mb-4 block">{t('nav.partnerships')}</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] tracking-tight mb-8">
                        {t('partners.title')}
                    </h2>
                    <p className="text-xl text-secondary max-w-3xl font-medium leading-relaxed">
                        {t('partners.description')}
                    </p>
                </div>

                <div className="space-y-24">
                    {partnersData.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center"
                        >
                            <h3 className="text-[12px] font-bold text-[#1d1d1f]/60 uppercase tracking-[0.2em] mb-12">
                                {partnerKeys[category.title] ? t(partnerKeys[category.title]) : category.title}
                            </h3>
                            <div className="flex flex-wrap justify-center gap-x-16 gap-y-12">
                                {category.partners.map((partner, idx) => (
                                    <div
                                        key={idx}
                                        className="text-2xl md:text-3xl font-bold text-[#1d1d1f] opacity-50 hover:opacity-100 transition-all duration-500 cursor-default tracking-tight"
                                    >
                                        {partnerItems[partner] ? t(partnerItems[partner]) : partner}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
