'use client';

import { motion } from 'framer-motion';
import { membershipCategories } from '@/data/arifac';
import { Users, ArrowRight } from 'lucide-react';

export default function MembershipSection() {
    return (
        <section id="membership" className="py-24 bg-gray-50 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.03),transparent_40%)]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl mb-16">
                    <span className="text-accent font-semibold tracking-wider uppercase text-sm">Our Network</span>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mt-2 mb-6">
                        Institutional Membership
                    </h2>
                    <p className="text-lg text-gray-600">
                        ARIFAC unites the entire ecosystem of reporting entities under a common governance framework.
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
                                <h3 className="text-lg font-bold text-primary mb-2">{category.title}</h3>
                                <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                                    {category.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-16 bg-primary rounded-2xl p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Membership Benefits</h3>
                        <p className="text-gray-300 text-sm max-w-xl">
                            Access exclusive working groups, typology reports, and direct regulatory feedback channels.
                        </p>
                    </div>
                    <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 shrink-0">
                        View Fee Structure
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
