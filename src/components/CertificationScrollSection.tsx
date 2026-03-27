"use client";

import { useState } from 'react';
import { CheckCircle2, Clock, BookOpen, ChevronRight, ArrowRight } from 'lucide-react';
import { certificationLevels, CertificationLevel } from '@/data/arifac';
import Link from 'next/link';
import { isLoggedIn, hasPaidForCourse } from '@/lib/auth';
import SyllabusModal from './SyllabusModal';
import { useLanguage } from './LanguageContext';

export default function CertificationScrollSection() {
    const { t } = useLanguage();
    const [selectedLevel, setSelectedLevel] = useState<CertificationLevel | null>(null);

    return (
        <section id="certification" className="py-32 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-3xl">
                        <span className="text-accent text-[12px] font-bold tracking-[0.2em] uppercase mb-4 block">{t('cert.level')} 1-3</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] tracking-tight mb-8">
                            {t('cert.title')} <br />
                            <span className="text-secondary">{t('cert.title_framework')}</span>
                        </h2>
                        <p className="text-xl text-secondary max-w-2xl font-medium leading-relaxed">
                            {t('cert.description')}
                        </p>
                    </div>
                    <Link
                        href="/certifications"
                        className="group inline-flex items-center gap-2 text-[#0066cc] font-semibold text-lg hover:underline decoration-2 underline-offset-4"
                    >
                        {t('cert.all')} <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Course Cards */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
                    {certificationLevels.map((level, index) => (
                        <div
                            key={level.level}
                            className="bg-[#f5f5f7] rounded-[32px] p-8 flex flex-col hover:bg-[#ebebed] transition-all duration-500 group"
                        >
                            {/* Level Badge + Meta */}
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-accent bg-white px-4 py-1.5 rounded-full shadow-sm">
                                    {t('cert.level')} {index + 1}
                                </span>
                                <div className="flex items-center gap-1.5 text-secondary text-[12px] font-medium">
                                    <Clock size={14} />
                                    <span>{level.validity} {t('cert.validity')}</span>
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4 leading-tight">
                                {level.title === "Foundations of AML, CFT & Sanctions" ? t('data.cert.title1') :
                                    level.title === "Intermediate Compliance & Regulatory Oversight" ? t('data.cert.title2') :
                                        level.title === "Advanced AML Strategy & Institutional Design" ? t('data.cert.title3') : level.title}
                            </h3>
                            <p className="text-[15px] text-secondary mb-8 font-medium leading-relaxed">
                                {level.title.includes("AML & Financial Crime") ? t('data.cert.course1.desc') : level.targetAudience}
                            </p>

                            {/* Feature list */}
                            <ul className="space-y-4 mb-10 flex-1">
                                {level.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-[14px] text-secondary font-medium">
                                        <CheckCircle2 size={18} className="text-[#0066cc] shrink-0 mt-0.5" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                <button
                                    onClick={() => setSelectedLevel(level)}
                                    className="flex items-center gap-2 text-[14px] font-semibold text-secondary hover:text-[#1d1d1f] transition-colors"
                                >
                                    <BookOpen size={16} />
                                    {t('cert.syllabus')}
                                </button>

                                {isLoggedIn() && hasPaidForCourse(level.level) ? (
                                    <Link
                                        href="/lms/dashboard"
                                        className="flex items-center gap-1 text-[14px] font-bold text-[#0066cc] hover:underline"
                                    >
                                        {t('cert.go_to_course')} <ChevronRight size={16} />
                                    </Link>
                                ) : level.enrollUrl ? (
                                    <a
                                        href={level.enrollUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-[14px] font-bold text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors"
                                    >
                                        {t('cert.enroll')} <ChevronRight size={16} />
                                    </a>
                                ) : (
                                    <button
                                        onClick={() => setSelectedLevel(level)}
                                        className="flex items-center gap-1 text-[14px] font-bold text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors"
                                    >
                                        {t('cert.enroll')} <ChevronRight size={16} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Syllabus Modal */}
            <SyllabusModal
                course={selectedLevel}
                onClose={() => setSelectedLevel(null)}
            />
        </section>
    );
}
