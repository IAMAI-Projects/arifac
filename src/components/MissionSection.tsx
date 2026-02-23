'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function MissionSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50/50 skew-x-12 translate-x-20 -z-10" />

            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-[10px] mb-8">
                            <Quote size={14} /> The Mandate
                        </div>

                        <div className="space-y-12">
                            {/* Paragraph 1: Hallmark of our times */}
                            <div className="relative">
                                <p className="text-2xl md:text-3xl font-heading font-medium text-primary leading-tight">
                                    "The advent of unparalleled technological, geopolitical and socio-economic change is the distinguishing hallmark of our times."
                                </p>
                                <div className="mt-8 text-lg text-gray-600 leading-relaxed max-w-4xl">
                                    While this environment creates tremendous opportunity for the financial services industry to provide faster and more affordable services to larger and more diverse populations – it also creates systemic risks of financial crimes that are increasingly sophisticated, rapid and global in nature which need to be addressed with the alignment of the capabilities of the national AML/CFT ecosystem and the speed and technological sophistication which is driving this innovation.
                                </div>
                                <div className="mt-6 text-lg font-bold text-primary">
                                    An effective national AML/CFT regime must look to successfully combat these risks through coordinated and collaborative efforts by leveraging the expertise and capabilities of its private sector and ARIFAC is expected to play a momentous role toward said goal.
                                </div>
                            </div>

                            {/* Divider Line */}
                            <div className="w-24 h-px bg-gray-200" />

                            {/* Section 2: Inaugural and Membership */}
                            <div className="grid md:grid-cols-2 gap-12 items-start">
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Foundation</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        The inaugural conference of ARIFAC was held on August 04, 2023, in New Delhi. A number of organisations have joined the initiative as members and the membership is expected to expand with the organization of regional (north, south, east and west) and sectoral chapters (Banks, Payment Banks, Co-operative Banks, Payment Aggregators, VDA-SPs etc).
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Strategic Vision</h3>
                                    <p className="text-gray-600 leading-relaxed italic border-l-2 border-accent pl-6">
                                        ARIFAC is envisaged to meet under the aegis of national and regional chapters. The primary objectives of the platform include information sharing, development of knowledge products and assistance by way of training and certification.
                                    </p>
                                </div>
                            </div>

                            {/* Section 3: Knowledge and Standardization */}
                            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">Operational Pillars</h3>
                                <div className="grid md:grid-cols-3 gap-8 text-sm">
                                    <div className="space-y-3">
                                        <div className="font-bold text-primary">Knowledge Products</div>
                                        <p className="text-gray-500 leading-relaxed">
                                            Developing best practices papers, typology reports, and strategic guidance for member institutions.
                                        </p>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="font-bold text-primary">Capacity Building</div>
                                        <p className="text-gray-500 leading-relaxed">
                                            Undertaking training programmes for reporting entities and specialized personnel within the AML/CFT domain.
                                        </p>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="font-bold text-primary">Standardization</div>
                                        <p className="text-gray-500 leading-relaxed">
                                            Bringing national awareness and global standardization to certifications in the AML/CFT ecosystem.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
