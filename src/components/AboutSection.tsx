'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { aboutData } from '@/data/arifac';
import { useLanguage } from './LanguageContext';

export default function AboutSection() {
    const { t } = useLanguage();
    const ref = useRef(null);

    const aboutFeatKeys: Record<string, string> = {
        "National Coordination": "data.about.feat.nat",
        "Capability Development": "data.about.feat.cap",
        "Industry-Regulator Dialogue": "data.about.feat.dialogue",
        "Collaborative Knowledge": "data.about.feat.know"
    };

    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section id="about" className="py-32 relative overflow-hidden bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="max-w-5xl mx-auto text-center mb-24"
                >
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] tracking-tight mb-8">
                        {t('data.about.title')}
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-xl text-secondary max-w-3xl mx-auto font-medium leading-relaxed">
                        {t('data.about.desc')}
                    </motion.p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {aboutData.features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="group p-8 rounded-[32px] bg-[#f5f5f7] hover:bg-[#ebebed] transition-all duration-500"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                    <Icon className="w-7 h-7 text-accent" />
                                </div>
                                <h3 className="text-xl font-bold text-[#1d1d1f] mb-4">
                                    {aboutFeatKeys[feature.title] ? t(`${aboutFeatKeys[feature.title]}.title`) : feature.title}
                                </h3>
                                <p className="text-[15px] text-secondary font-medium leading-relaxed">
                                    {aboutFeatKeys[feature.title] ? t(`${aboutFeatKeys[feature.title]}.desc`) : feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
