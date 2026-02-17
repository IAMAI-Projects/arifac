'use client';

import { motion } from 'framer-motion';
import { resourcesData } from '@/data/arifac';
import { FileText, Lock, Download, ExternalLink } from 'lucide-react';

export default function ResourcesSection() {
    const getAccessColor = (level: string) => {
        switch (level) {
            case 'Public': return 'bg-green-100 text-green-700 border-green-200';
            case 'Member': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Certified Professional': return 'bg-amber-100 text-amber-700 border-amber-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <section id="resources" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
                            Knowledge Hub
                        </h2>
                        <p className="text-gray-600">Latest research, guidance, and regulatory updates.</p>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors">
                        View All Resources <ExternalLink className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resourcesData.map((resource, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`text-xs font-semibold px-2 py-1 rounded border ${getAccessColor(resource.accessLevel)}`}>
                                    {resource.accessLevel}
                                </div>
                                <div className="text-gray-400 text-sm">{resource.date}</div>
                            </div>

                            <div className="mb-4">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{resource.type}</span>
                                <h3 className="text-lg font-bold text-primary mt-1 line-clamp-2 leading-tight group-hover:text-secondary transition-colors">
                                    {resource.title}
                                </h3>
                            </div>

                            <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <FileText className="w-4 h-4" />
                                    <span>PDF</span>
                                </div>

                                {resource.accessLevel === 'Public' ? (
                                    <button className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors">
                                        <Download className="w-4 h-4" />
                                        Download
                                    </button>
                                ) : (
                                    <button className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-primary transition-colors">
                                        <Lock className="w-4 h-4" />
                                        Sign In
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <button className="flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors mx-auto">
                        View All Resources <ExternalLink className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
