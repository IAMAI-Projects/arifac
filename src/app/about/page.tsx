'use client';

import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { Quote, Target, Award, Users, Shield, Globe } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-48 pb-32 bg-white overflow-hidden">
                <div className="container relative mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="text-accent text-[12px] font-bold tracking-[0.2em] uppercase mb-6 block">Our Mission</span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#1d1d1f] tracking-tight mb-10 leading-[1.05]">
                            About <span className="text-secondary">ARIFAC</span>
                        </h1>
                        <p className="text-2xl md:text-3xl text-secondary max-w-3xl mx-auto font-medium leading-relaxed">
                            Alliance of Reporting Entities in India for AML/CFT — A collective force for financial integrity.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* The Mandate Section */}
            <section className="py-32 bg-[#f5f5f7] relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="mb-16"
                        >
                            <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-[0.2em] text-[12px] mb-12">
                                <Quote size={18} /> THE MANDATE
                            </div>

                            <div className="space-y-20">
                                <div className="relative">
                                    <p className="text-3xl md:text-5xl font-bold text-[#1d1d1f] leading-tight tracking-tight">
                                        "The advent of unparalleled technological, geopolitical and socio-economic change is the distinguishing hallmark of our times."
                                    </p>
                                    <div className="mt-12 text-xl text-secondary leading-relaxed max-w-5xl font-medium">
                                        While this environment creates tremendous opportunity for the financial services industry to provide faster and more affordable services to larger and more diverse populations – it also creates systemic risks of financial crimes that are increasingly sophisticated, rapid and global in nature which need to be addressed with the alignment of the capabilities of the national AML/CFT ecosystem and the speed and technological sophistication which is driving this innovation.
                                    </div>
                                    <div className="mt-10 p-8 md:p-12 rounded-[32px] bg-white border border-gray-100 shadow-sm text-xl font-bold text-[#1d1d1f] leading-relaxed">
                                        An effective national AML/CFT regime must look to successfully combat these risks through coordinated and collaborative efforts by leveraging the expertise and capabilities of its private sector and ARIFAC is expected to play a momentous role toward said goal.
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-20 items-start pt-10">
                                    <div className="space-y-6">
                                        <h3 className="text-[12px] font-bold text-secondary uppercase tracking-[0.2em]">Foundation</h3>
                                        <p className="text-lg text-secondary leading-relaxed font-normal">
                                            The inaugural conference of ARIFAC was held on August 04, 2023, in New Delhi. A number of organisations have joined the initiative as members and the membership is expected to expand with the organization of regional (north, south, east and west) and sectoral chapters (Banks, Payment Banks, Co-operative Banks, Payment Aggregators, VDA-SPs etc).
                                        </p>
                                    </div>
                                    <div className="space-y-6">
                                        <h3 className="text-[12px] font-bold text-secondary uppercase tracking-[0.2em]">Strategic Vision</h3>
                                        <div className="p-8 rounded-3xl bg-white/50 border border-gray-200">
                                            <p className="text-lg text-[#1d1d1f] leading-relaxed font-bold italic">
                                                ARIFAC is envisaged to meet under the aegis of national and regional chapters. The primary objectives of the platform include information sharing, development of knowledge products and assistance by way of training and certification.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-20">
                                    <h3 className="text-[12px] font-bold text-secondary uppercase tracking-[0.2em] mb-12 text-center">Operational Pillars</h3>
                                    <div className="grid md:grid-cols-3 gap-10">
                                        <div className="bg-white p-10 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-500 group">
                                            <div className="w-16 h-16 bg-[#f5f5f7] rounded-2xl flex items-center justify-center mb-8 shadow-sm text-accent group-hover:scale-110 transition-transform duration-500">
                                                <Target size={32} />
                                            </div>
                                            <h4 className="font-bold text-[#1d1d1f] text-2xl mb-4">Knowledge Products</h4>
                                            <p className="text-secondary text-base leading-relaxed font-medium">
                                                Developing best practices papers, typology reports, and strategic guidance for member institutions.
                                            </p>
                                        </div>
                                        <div className="bg-white p-10 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-500 group">
                                            <div className="w-16 h-16 bg-[#f5f5f7] rounded-2xl flex items-center justify-center mb-8 shadow-sm text-accent group-hover:scale-110 transition-transform duration-500">
                                                <Award size={32} />
                                            </div>
                                            <h4 className="font-bold text-[#1d1d1f] text-2xl mb-4">Capacity Building</h4>
                                            <p className="text-secondary text-base leading-relaxed font-medium">
                                                Undertaking training programmes for reporting entities and specialized personnel within the AML/CFT domain.
                                            </p>
                                        </div>
                                        <div className="bg-white p-10 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-500 group">
                                            <div className="w-16 h-16 bg-[#f5f5f7] rounded-2xl flex items-center justify-center mb-8 shadow-sm text-accent group-hover:scale-110 transition-transform duration-500">
                                                <Shield size={32} />
                                            </div>
                                            <h4 className="font-bold text-[#1d1d1f] text-2xl mb-4">Standardization</h4>
                                            <p className="text-secondary text-base leading-relaxed font-medium">
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

            <Footer />
        </main>
    );
}
