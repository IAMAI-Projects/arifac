'use client';

import { motion } from 'framer-motion';
import { engagementFormats } from '@/data/arifac';
import { ArrowRight, MessageSquare, Users, FileText, TrendingUp, Briefcase } from 'lucide-react';

export default function EngagementSection() {
    const getIcon = (index: number) => {
        const icons = [MessageSquare, Users, FileText, TrendingUp, Briefcase];
        return icons[index % icons.length];
    };

    return (
        <section id="engagement" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-accent font-semibold tracking-wider uppercase text-sm">Collaboration</span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mt-2">
                            Engagement Models
                        </h2>
                        <p className="text-lg text-gray-600 mt-4">
                            Structured platforms for industry-wide dialogue, policy formulation, and operational problem-solving.
                        </p>
                    </div>
                    <button className="text-accent border-b border-accent/30 pb-1 hover:text-primary hover:border-primary transition-colors flex items-center gap-2">
                        View Calendar
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {engagementFormats.map((format, index) => {
                        const Icon = getIcon(index);
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative overflow-hidden bg-gray-50 border border-gray-100 rounded-xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors" />

                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-lg bg-gray-200 border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>

                                    <h3 className="text-xl font-bold text-primary mb-3">{format.title}</h3>
                                    <p className="text-gray-500 group-hover:text-gray-700 transition-colors mb-6">
                                        {format.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-sm text-accent font-medium opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                        <span>Participate</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
