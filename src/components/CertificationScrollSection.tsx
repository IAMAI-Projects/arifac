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
        <section id="certification" className="py-24 bg-white">
            <div className="container mx-auto px-6">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
                            {t('cert.title')} <br />
                            <span className="text-accent">{t('cert.title_framework')}</span>
                        </h2>
                        <p className="text-lg text-gray-500">
                            {t('cert.description')}
                        </p>
                    </div>
                    <Link
                        href="/certifications"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-accent transition-all shadow-sm hover:shadow-md shrink-0"
                    >
                        {t('cert.all')} <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Course Cards */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {certificationLevels.map((level, index) => (
                        <div
                            key={level.level}
                            className="bg-white border border-gray-200 rounded-2xl p-7 flex flex-col hover:shadow-lg hover:border-gray-300 transition-all duration-200"
                        >
                            {/* Level Badge + Meta */}
                            <div className="flex items-center justify-between mb-5">
                                <span className="text-xs font-bold tracking-widest uppercase text-accent bg-accent/8 border border-accent/20 px-3 py-1 rounded-full">
                                    {t('cert.level')} {index + 1}
                                </span>
                                <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                                    <Clock size={12} />
                                    <span>{level.validity} {t('cert.validity')}</span>
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-primary mb-1 leading-snug">
                                {level.title === "Foundations of AML, CFT & Sanctions" ? t('data.cert.title1') :
                                    level.title === "Intermediate Compliance & Regulatory Oversight" ? t('data.cert.title2') :
                                        level.title === "Advanced AML Strategy & Institutional Design" ? t('data.cert.title3') : level.title}
                            </h3>
                            <p className="text-sm text-gray-400 mb-5">
                                {level.title.includes("AML & Financial Crime") ? t('data.cert.course1.desc') : level.targetAudience}
                            </p>

                            {/* Feature list */}
                            <ul className="space-y-2.5 mb-7 flex-1">
                                {level.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-600">
                                        <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                                <button
                                    onClick={() => setSelectedLevel(level)}
                                    className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                                >
                                    <BookOpen size={14} />
                                    {t('cert.syllabus')}
                                </button>

                                {isLoggedIn() && hasPaidForCourse(level.level) ? (
                                    <Link
                                        href="/lms/dashboard"
                                        className="flex items-center gap-1 text-sm font-bold text-accent hover:text-primary transition-colors"
                                    >
                                        {t('cert.go_to_course')} <ChevronRight size={14} />
                                    </Link>
                                ) : level.enrollUrl ? (
                                    <a
                                        href={level.enrollUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-sm font-bold text-primary hover:text-accent transition-colors"
                                    >
                                        {t('cert.enroll')} <ChevronRight size={14} />
                                    </a>
                                ) : (
                                    <button
                                        onClick={() => setSelectedLevel(level)}
                                        className="flex items-center gap-1 text-sm font-bold text-primary hover:text-accent transition-colors"
                                    >
                                        {t('cert.enroll')} <ChevronRight size={14} />
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
