'use client';

import { motion } from 'framer-motion';
import { membershipCategories } from '@/data/arifac';
import { Users, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function MembershipSection() {
    const { t } = useLanguage();

    // Mapping keys for translated content
    const memberKeys: Record<string, string> = {
        "Banking Institutions": "data.member.banking",
        "NBFCs": "data.member.nbfc",
        "Insurance": "data.member.ins",
        "Securities Markets": "data.member.sec",
        "VDA Ecosystem": "data.member.vda",
        "DNFBP": "data.member.dnfbp",
        "Technology Providers": "data.member.tech"
    };

    return (
        <section id="membership" className="py-24 bg-gray-50 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.03),transparent_40%)]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl mb-16">
                    <span className="text-accent font-semibold tracking-wider uppercase text-sm">{t('member.network')}</span>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mt-2 mb-6">
                        {t('member.title')}
                    </h2>
                    <p className="text-lg text-gray-600">
                        {t('member.description')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {membershipCategories.map((category, index) => {
                        const Icon = category.icon || Users;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="group p-6 rounded-xl bg-white border border-gray-200 hover:border-accent/30 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" />
                                </div>
                                <h3 className="text-lg font-bold text-primary mb-2">
                                    {memberKeys[category.title] ? t(`${memberKeys[category.title]}.title`) : category.title}
                                </h3>
                                <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                                    {memberKeys[category.title] ? t(`${memberKeys[category.title]}.desc`) : category.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-16 bg-primary rounded-2xl p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">{t('member.benefits_title')}</h3>
                        <p className="text-gray-300 text-sm max-w-xl">
                            {t('member.benefits_desc')}
                        </p>
                    </div>
                    <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 shrink-0">
                        {t('member.fee_btn')}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
