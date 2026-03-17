'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { finalExamQuestions } from '@/data/lms';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Award } from 'lucide-react';

export default function ExamPage() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [answers, setAnswers] = useState<number[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const handleNext = () => {
        if (selectedOption !== null) {
            const newAnswers = [...answers];
            newAnswers[currentQuestion] = selectedOption;
            setAnswers(newAnswers);
            setSelectedOption(null);

            if (currentQuestion < finalExamQuestions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                calculateScore(newAnswers);
            }
        }
    };

    const calculateScore = (finalAnswers: number[]) => {
        let correctCount = 0;
        finalAnswers.forEach((ans, index) => {
            if (ans === finalExamQuestions[index].correctAnswer) {
                correctCount++;
            }
        });

        const percentage = (correctCount / finalExamQuestions.length) * 100;
        setScore(percentage);
        setShowResult(true);
    };

    const question = finalExamQuestions[currentQuestion];
    const isPassed = score >= 70;

    if (showResult) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl p-10 text-center">
                    {isPassed ? (
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <Award className="w-10 h-10 text-green-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-primary mb-2">Congratulations!</h1>
                            <p className="text-gray-600 mb-6">You have passed the ARIFAC L1 Assessment.</p>

                            <div className="text-5xl font-bold text-accent mb-8">{score}%</div>

                            <button
                                onClick={() => router.push('/lms/certificate')}
                                className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                Download Certificate
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                                <XCircle className="w-10 h-10 text-red-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-primary mb-2">Assessment Failed</h1>
                            <p className="text-gray-600 mb-6">You need 70% to pass. Please review the course material.</p>

                            <div className="text-5xl font-bold text-red-500 mb-8">{score}%</div>

                            <button
                                onClick={() => {
                                    setShowResult(false);
                                    setCurrentQuestion(0);
                                    setAnswers([]);
                                    setSelectedOption(null);
                                }}
                                className="w-full bg-gray-200 text-primary font-bold py-4 rounded-xl hover:bg-gray-300 transition-all"
                            >
                                Retake Exam
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
            <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl p-10 border border-gray-100">
                <div className="flex justify-between items-center mb-8">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Question {currentQuestion + 1} of {finalExamQuestions.length}</span>
                    <span className="text-sm font-bold text-accent">L1 Assessment</span>
                </div>

                <h2 className="text-2xl font-bold text-primary mb-8 leading-relaxed">
                    {question.text}
                </h2>

                <div className="space-y-4 mb-10">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedOption(index)}
                            className={`w-full text-left p-5 rounded-xl border-2 transition-all flex justify-between items-center group ${selectedOption === index ? 'border-accent bg-accent/5' : 'border-gray-100 hover:border-gray-300'}`}
                        >
                            <span className={`font-medium ${selectedOption === index ? 'text-primary' : 'text-gray-600'}`}>{option}</span>
                            {selectedOption === index && <CheckCircle className="w-5 h-5 text-accent" />}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    disabled={selectedOption === null}
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                    {currentQuestion === finalExamQuestions.length - 1 ? 'Submit Assessment' : 'Next Question'}
                </button>
            </div>
        </div>
    );
}
