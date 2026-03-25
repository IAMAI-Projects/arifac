// src/components/lms/LessonQuiz.tsx
'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export interface QuizQuestion {
  text: string;
  options: string[];
  correct: number;
}

interface Props {
  questions: QuizQuestion[];
  onPass: () => void;
}

export default function LessonQuiz({ questions, onPass }: Props) {
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const score = submitted
    ? answers.filter((a, i) => a === questions[i].correct).length
    : 0;
  const passed = score / questions.length >= 0.7;

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 mt-8">
      <h3 className="font-bold text-primary text-xl mb-6">Quick Check</h3>
      <div className="space-y-8">
        {questions.map((q, qi) => (
          <div key={qi}>
            <p className="font-semibold text-gray-800 mb-4">{q.text}</p>
            <div className="space-y-3">
              {q.options.map((opt, oi) => {
                const selected = answers[qi] === oi;
                const isCorrect = oi === q.correct;
                let style = 'border-gray-200 bg-white hover:border-accent';
                if (submitted) {
                  style = isCorrect ? 'border-green-400 bg-green-50' :
                    selected ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white opacity-60';
                } else if (selected) {
                  style = 'border-accent bg-blue-50';
                }
                return (
                  <button
                    key={oi}
                    disabled={submitted}
                    onClick={() => setAnswers(prev => { const n = [...prev]; n[qi] = oi; return n; })}
                    className={`w-full text-left px-5 py-3 rounded-xl border-2 transition-all flex items-center gap-3 text-sm font-medium ${style}`}
                  >
                    {submitted && isCorrect && <CheckCircle2 size={16} className="text-green-600 shrink-0" />}
                    {submitted && selected && !isCorrect && <XCircle size={16} className="text-red-500 shrink-0" />}
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {!submitted ? (
        <button
          disabled={answers.some(a => a === null)}
          onClick={() => { setSubmitted(true); if (passed) onPass(); }}
          className="mt-8 px-8 py-3 bg-primary text-white rounded-xl font-bold disabled:opacity-50"
        >
          Submit Answers
        </button>
      ) : (
        <div className={`mt-6 p-4 rounded-xl font-bold ${passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {passed ? `✓ Passed! ${score}/${questions.length} correct.` : `✗ ${score}/${questions.length} correct — review the lesson and retry.`}
          {!passed && (
            <button onClick={() => { setSubmitted(false); setAnswers(new Array(questions.length).fill(null)); }} className="ml-4 underline">
              Retry
            </button>
          )}
        </div>
      )}
    </div>
  );
}
