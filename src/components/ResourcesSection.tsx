'use client';

import { motion } from 'framer-motion';
import { resourcesData } from '@/data/arifac';
import { FileText, Lock, Download, ExternalLink, ChevronRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function ResourcesSection() {
    const { t } = useLanguage();
    const getAccessColor = (level: string) => {
        switch (level) {
            case 'Public': return 'bg-green-100 text-green-700 border-green-200';
            case 'Member': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Certified Professional': return 'bg-amber-100 text-amber-700 border-amber-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <section id="resources" className="py-32 bg-[#f5f5f7]">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-3xl">
                        <span className="text-secondary text-[12px] font-bold tracking-[0.2em] uppercase mb-4 block">{t('nav.resources')}</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] tracking-tight mb-8">
                            {t('resources.title')}
                        </h2>
                        <p className="text-xl text-secondary max-w-2xl font-medium leading-relaxed">
                            {t('resources.description')}
                        </p>
                    </div>
                    <button className="group inline-flex items-center gap-2 text-[#0066cc] font-semibold text-lg hover:underline decoration-2 underline-offset-4">
                        {t('resources.all')} <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resourcesData.map((resource, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group bg-white rounded-[32px] p-8 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <div className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-sm ${getAccessColor(resource.accessLevel)}`}>
                                    {resource.accessLevel === 'Public' ? t('res.vis_public') : t('res.vis_member')}
                                </div>
                                <div className="text-secondary text-[12px] font-medium">
                                    {resource.date.includes('Oct') ? resource.date.replace('Oct', t('common.oct')) :
                                        resource.date.includes('Nov') ? resource.date.replace('Nov', t('common.nov')) :
                                            resource.date.includes('Dec') ? resource.date.replace('Dec', t('common.dec')) : resource.date}
                                </div>
                            </div>

                            <div className="mb-8">
                                <span className="text-[11px] font-bold text-accent uppercase tracking-[0.15em]">
                                    {resource.type === 'Report' ? t('res.cat_report') :
                                        resource.type === 'Guidance' ? t('res.cat_guidance') :
                                            resource.type === 'Whitepaper' ? t('res.cat_whitepaper') : resource.type}
                                </span>
                                <h3 className="text-2xl font-bold text-[#1d1d1f] mt-3 line-clamp-2 leading-tight group-hover:text-[#0066cc] transition-colors duration-500">
                                    {resource.title}
                                </h3>
                            </div>

                            <div className="pt-6 border-t border-gray-100 flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-2 text-[13px] text-secondary font-semibold">
                                    <FileText className="w-5 h-5 text-[#0066cc]" />
                                    <span>{t('resources.pdf')}</span>
                                </div>

                                {resource.accessLevel === 'Public' ? (
                                    <button className="flex items-center gap-2 text-[14px] font-bold text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors duration-500">
                                        <Download className="w-5 h-5" />
                                        {t('resources.download')}
                                    </button>
                                ) : (
                                    <button className="flex items-center gap-2 text-[14px] font-bold text-secondary hover:text-[#1d1d1f] transition-colors duration-500">
                                        <Lock className="w-5 h-5" />
                                        {t('resources.signin')}
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
