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
        <section id="partners" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                        {t('partners.title')}
                    </h2>
                    <p className="text-lg text-gray-600">
                        {t('partners.description')}
                    </p>
                </div>

                <div className="space-y-16">
                    {partnersData.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">
                                {partnerKeys[category.title] ? t(partnerKeys[category.title]) : category.title}
                            </h3>
                            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
                                {category.partners.map((partner, idx) => (
                                    <div
                                        key={idx}
                                        className="text-xl md:text-2xl font-bold text-primary opacity-60 hover:opacity-100 transition-opacity cursor-default"
                                    >
                                        {partnerItems[partner] ? t(partnerItems[partner]) : partner}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 pt-10 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-500 max-w-2xl mx-auto italic">
                        {t('partners.disclaimer')}
                    </p>
                </div>
            </div>
        </section>
    );
}
