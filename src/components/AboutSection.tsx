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
        <section id="about" className="py-24 relative overflow-hidden bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-heading font-bold mb-6 text-primary">
                        {t('data.about.title')}
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-xl text-gray-600 leading-relaxed">
                        {t('data.about.desc')}
                    </motion.p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {aboutData.features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="group p-6 rounded-xl bg-gray-50 border border-gray-100 hover:border-accent/40 hover:bg-white hover:shadow-lg transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-lg bg-gray-200/50 flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                                    <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                                </div>
                                <h3 className="text-lg font-semibold text-primary mb-2">
                                    {aboutFeatKeys[feature.title] ? t(`${aboutFeatKeys[feature.title]}.title`) : feature.title}
                                </h3>
                                <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
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
