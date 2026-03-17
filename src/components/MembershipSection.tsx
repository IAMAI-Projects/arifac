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
        <section id="membership" className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center mb-20">
                    <span className="text-accent text-[12px] font-bold tracking-[0.2em] uppercase mb-4">{t('member.network')}</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight mb-6">
                        {t('member.title')}
                    </h2>
                    <p className="text-xl text-secondary max-w-3xl font-medium leading-relaxed">
                        {t('member.description')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {membershipCategories.map((category, index) => {
                        const Icon = category.icon || Users;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-8 rounded-3xl bg-[#f5f5f7] hover:bg-[#ebebed] transition-all duration-500"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                    <Icon className="w-6 h-6 text-accent" />
                                </div>
                                <h3 className="text-xl font-bold text-[#1d1d1f] mb-3">
                                    {memberKeys[category.title] ? t(`${memberKeys[category.title]}.title`) : category.title}
                                </h3>
                                <p className="text-[14px] text-secondary leading-relaxed font-medium">
                                    {memberKeys[category.title] ? t(`${memberKeys[category.title]}.desc`) : category.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-20 bg-[#1d1d1f] rounded-[32px] p-10 md:p-16 flex flex-col items-center text-center gap-8">
                    <div className="max-w-2xl">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('ARIFAC Membership')}</h3>
                        <p className="text-gray-400 text-lg font-medium leading-relaxed">
                            {t('member.benefits_desc')}
                        </p>
                    </div>
                    <button className="bg-white text-[#1d1d1f] px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all flex items-center gap-2">
                        {t('member.fee_btn')}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}
