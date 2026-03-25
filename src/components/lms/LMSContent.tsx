// src/components/lms/LMSContent.tsx
'use client';

import { useState } from 'react';
import { CheckCircle2, PlayCircle, Award, ChevronRight } from 'lucide-react';
import { Module, Lesson } from '@/data/lms';
import { useRouter } from 'next/navigation';

interface Props {
  lesson?: Lesson;
  module?: Module;
  isCompleted: boolean;
  onMarkComplete: () => void;
  progress: number;
}

export default function LMSContent({ lesson, module, isCompleted, onMarkComplete, progress }: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<'content' | 'notes'>('content');

  if (!lesson || !module) return null;

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50">
      {/* Video Player */}
      <div className="bg-black aspect-video w-full max-h-[55vh] flex items-center justify-center relative">
        {lesson.videoUrl ? (
          <iframe
            src={lesson.videoUrl}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <div className="flex flex-col items-center gap-4 text-white/40">
            <PlayCircle size={64} />
            <p className="text-sm">Video coming soon</p>
          </div>
        )}

        {/* Progress overlay on completion */}
        {progress === 100 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center">
              <Award size={48} className="text-accent mx-auto mb-3" />
              <p className="text-white font-bold text-xl">Course Complete!</p>
              <button
                onClick={() => router.push('/lms/exam')}
                className="mt-4 px-6 py-3 bg-accent text-primary rounded-xl font-bold hover:bg-yellow-400 transition-all shadow-lg"
              >
                Take Final Exam
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <span>Module {module.id}</span>
          <ChevronRight size={12} />
          <span className="text-primary font-medium">{lesson.title}</span>
        </div>

        {/* Title + action */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-primary mb-2">{lesson.title}</h1>
            <p className="text-gray-500 text-sm">{module.title} · {lesson.duration}</p>
          </div>
          <button
            onClick={onMarkComplete}
            disabled={isCompleted}
            className={`shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              isCompleted
                ? 'bg-green-100 text-green-700 cursor-default'
                : 'bg-primary text-white hover:bg-gray-800 shadow-lg'
            }`}
          >
            <CheckCircle2 size={18} />
            {isCompleted ? 'Completed' : 'Mark Complete'}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-8">
          {(['content', 'notes'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 text-sm font-bold capitalize border-b-2 transition-colors -mb-px ${
                tab === t ? 'border-accent text-primary' : 'border-transparent text-gray-400'
              }`}
            >
              {t === 'content' ? 'Lesson Content' : 'My Notes'}
            </button>
          ))}
        </div>

        {tab === 'content' && (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{lesson.content}</p>
          </div>
        )}

        {tab === 'notes' && (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <textarea
              className="w-full min-h-[200px] resize-none focus:outline-none text-gray-700 placeholder:text-gray-300"
              placeholder="Write your notes for this lesson here…"
            />
          </div>
        )}
      </div>
    </main>
  );
}
