'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Clock, PlayCircle } from 'lucide-react';
import { CertificationLevel } from '@/data/arifac';
import { isLoggedIn } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface SyllabusModalProps {
    course: CertificationLevel | null;
    onClose: () => void;
}

export default function SyllabusModal({ course, onClose }: SyllabusModalProps) {
    const router = useRouter();

    if (!course) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 pt-20 md:p-6 md:pt-24">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-primary/40 backdrop-blur-md"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Modal Header */}
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <div>
                            <div className="text-xs font-bold text-accent uppercase tracking-widest mb-1">{course.level} Syllabus</div>
                            <h3 className="text-2xl font-bold text-primary">{course.title}</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        >
                            <X size={24} className="text-gray-500" />
                        </button>
                    </div>

                    {/* Modal Content */}
                    <div className="p-6 overflow-y-auto">
                        {course.syllabus && course.syllabus.length > 0 ? (
                            <div className="space-y-8">
                                {course.syllabus.map((module) => (
                                    <div key={module.id} className="space-y-4">
                                        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                            <h4 className="font-bold text-lg text-primary flex items-center gap-2">
                                                <BookOpen size={20} className="text-accent" />
                                                Module {module.id}: {module.title}
                                            </h4>
                                            <span className="text-sm text-gray-500 font-medium flex items-center gap-1">
                                                <Clock size={16} />
                                                {module.duration}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm italic">{module.description}</p>
                                        <div className="grid gap-3">
                                            {module.lessons.map((lesson) => (
                                                <div key={lesson.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100 group hover:border-accent/30 transition-colors">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h5 className="font-semibold text-gray-800 text-sm group-hover:text-primary">{lesson.title}</h5>
                                                        <span className="text-xs text-gray-400 font-mono">{lesson.duration}</span>
                                                    </div>
                                                    <p className="text-gray-600 text-xs leading-relaxed">{lesson.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center">
                                <div className="text-gray-400 mb-2">Syllabus details coming soon...</div>
                            </div>
                        )}
                    </div>

                    {/* Modal Footer */}
                    <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-4">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                            Close
                        </button>

                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
