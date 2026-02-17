'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PlayCircle, CheckCircle, FileText, Download, LogOut, Menu, Lock, Award, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { lmsCourseData, Module, Lesson } from '@/data/lms';

export default function LMSDashboard() {
    const router = useRouter();
    const [activeModuleIndex, setActiveModuleIndex] = useState(0);
    const [activeLessonIndex, setActiveLessonIndex] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Track completion status: moduleIndex -> lessonIndex -> boolean
    const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});

    const currentModule = lmsCourseData[activeModuleIndex];
    const currentLesson = currentModule.lessons[activeLessonIndex];

    // Calculate overall progress
    const totalLessons = lmsCourseData.reduce((acc, module) => acc + module.lessons.length, 0);
    const completedCount = Object.keys(completedLessons).filter(k => completedLessons[k]).length;
    const progressPercentage = Math.round((completedCount / totalLessons) * 100);
    const isCourseCompleted = progressPercentage === 100;

    const markLessonComplete = () => {
        const key = `${activeModuleIndex}-${activeLessonIndex}`;
        setCompletedLessons(prev => ({ ...prev, [key]: true }));

        // Auto-advance logic could go here
        if (activeLessonIndex < currentModule.lessons.length - 1) {
            setActiveLessonIndex(prev => prev + 1);
        } else if (activeModuleIndex < lmsCourseData.length - 1) {
            setActiveModuleIndex(prev => prev + 1);
            setActiveLessonIndex(0);
        }
    };

    const isLessonCompleted = (mIdx: number, lIdx: number) => {
        return !!completedLessons[`${mIdx}-${lIdx}`];
    };

    const handleTakeExam = () => {
        if (isCourseCompleted) {
            router.push('/lms/exam');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-primary font-sans">

            {/* Sidebar - Module Navigation */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? '320px' : '0px', opacity: isSidebarOpen ? 1 : 0 }}
                className="bg-white border-r border-gray-200 h-screen overflow-hidden sticky top-0 hidden md:block"
            >
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="font-heading font-bold text-xl text-primary">Course Content</div>
                    <div className="text-xs font-bold text-accent">{progressPercentage}% Complete</div>
                </div>

                <div className="overflow-y-auto h-[calc(100vh-80px)]">
                    {lmsCourseData.map((module, mIdx) => (
                        <div key={module.id} className="border-b border-gray-50">
                            <button
                                onClick={() => setActiveModuleIndex(mIdx)}
                                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors flex justify-between items-start group ${activeModuleIndex === mIdx ? 'bg-accent/5 border-l-4 border-accent' : 'border-l-4 border-transparent'}`}
                            >
                                <div>
                                    <div className="text-xs text-gray-400 font-semibold uppercase mb-1">Module {module.id}</div>
                                    <h3 className={`font-semibold ${activeModuleIndex === mIdx ? 'text-accent' : 'text-gray-700'}`}>{module.title}</h3>
                                    <div className="text-xs text-gray-400 mt-1">{module.duration}</div>
                                </div>
                            </button>

                            {activeModuleIndex === mIdx && (
                                <div className="bg-gray-50/50 py-2">
                                    {module.lessons.map((lesson, lIdx) => (
                                        <button
                                            key={lesson.id}
                                            onClick={() => setActiveLessonIndex(lIdx)}
                                            className={`w-full text-left px-8 py-3 flex items-center gap-3 text-sm transition-colors ${activeLessonIndex === lIdx ? 'text-primary font-medium bg-white shadow-sm' : 'text-gray-600 hover:text-primary'}`}
                                        >
                                            {isLessonCompleted(mIdx, lIdx) ? (
                                                <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                                            ) : (
                                                <PlayCircle className="w-4 h-4 text-gray-400 shrink-0" />
                                            )}
                                            <span className="truncate">{lesson.title}</span>
                                            <span className="text-xs text-gray-400 ml-auto">{lesson.duration}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen">

                {/* Header */}
                <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="font-semibold text-gray-700 truncate max-w-xs md:max-w-none">
                            {currentModule.title}: <span className="text-primary">{currentLesson.title}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end hidden md:flex">
                            <span className="text-sm font-bold text-primary">S. Avanish</span>
                            <span className="text-xs text-gray-500">IAMAI Member</span>
                        </div>
                        <Link href="/" className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors text-gray-400" title="Logout">
                            <LogOut className="w-5 h-5" />
                        </Link>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 p-6 md:p-10 overflow-y-auto">
                    <div className="max-w-4xl mx-auto">

                        {/* Video Player Placeholder */}
                        <div className="aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden relative group mb-8 border border-gray-800">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 bg-accent/90 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-accent/20">
                                    <PlayCircle className="w-8 h-8 text-white fill-current" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8 border-b border-gray-100 pb-8">
                            <div>
                                <h1 className="text-2xl font-bold text-primary mb-2">{currentLesson.title}</h1>
                                <p className="text-gray-500">{currentModule.title} • {currentLesson.duration}</p>
                            </div>

                            {!isCourseCompleted ? (
                                <button
                                    onClick={markLessonComplete}
                                    disabled={isLessonCompleted(activeModuleIndex, activeLessonIndex)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all shadow-lg ${isLessonCompleted(activeModuleIndex, activeLessonIndex) ? 'bg-green-100 text-green-700 cursor-default shadow-none' : 'bg-primary text-white hover:bg-gray-800'}`}
                                >
                                    {isLessonCompleted(activeModuleIndex, activeLessonIndex) ? (
                                        <>
                                            <CheckCircle className="w-5 h-5" /> Completed
                                        </>
                                    ) : (
                                        <>
                                            Mark as Complete <ChevronRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            ) : (
                                <button
                                    onClick={handleTakeExam}
                                    className="flex items-center gap-2 px-6 py-3 bg-accent text-primary rounded-lg font-bold hover:bg-yellow-400 transition-all shadow-lg animate-pulse"
                                >
                                    <Award className="w-5 h-5" />
                                    Take Final Exam
                                </button>
                            )}
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 prose prose-gray max-w-none">
                            <h2 className="font-bold text-xl mb-4 text-primary">Lesson Content</h2>
                            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed font-light">
                                {currentLesson.content}
                            </div>
                        </div>

                        {isCourseCompleted && (
                            <div className="mt-8 p-6 bg-accent/10 rounded-xl border border-accent/20 flex items-center gap-4">
                                <div className="p-3 bg-accent/20 rounded-full">
                                    <Award className="w-6 h-6 text-accent-dark" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary">Course Completed!</h3>
                                    <p className="text-sm text-gray-600">You have completed all modules. You are now eligible to take the final certification exam.</p>
                                </div>
                                <button
                                    onClick={handleTakeExam}
                                    className="ml-auto bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-900"
                                >
                                    Start Exam
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
