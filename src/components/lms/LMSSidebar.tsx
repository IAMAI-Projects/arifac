// src/components/lms/LMSSidebar.tsx
'use client';

import { useState } from 'react';
import { CheckCircle2, PlayCircle, ChevronDown, Lock } from 'lucide-react';
import { Module } from '@/data/lms';

interface Props {
  modules: Module[];
  activeModule: number;
  activeLesson: number;
  completedLessons: string[];
  onSelectLesson: (mIdx: number, lIdx: number) => void;
}

export default function LMSSidebar({
  modules, activeModule, activeLesson, completedLessons, onSelectLesson
}: Props) {
  const [expanded, setExpanded] = useState<number[]>([activeModule]);

  const toggle = (idx: number) =>
    setExpanded(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);

  // A module is accessible if all previous modules have ≥1 complete lesson
  const isModuleUnlocked = (mIdx: number) => {
    if (mIdx === 0) return true;
    const prev = modules[mIdx - 1];
    return prev.lessons.some(l => completedLessons.includes(l.id));
  };

  return (
    <aside className="w-72 bg-white border-r border-gray-200 overflow-y-auto shrink-0 hidden md:block">
      <div className="p-4 border-b border-gray-100">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Course Content</p>
        <p className="text-xs text-gray-500 mt-1">{modules.reduce((s, m) => s + m.lessons.length, 0)} lessons</p>
      </div>

      {modules.map((mod, mIdx) => {
        const isOpen = expanded.includes(mIdx);
        const isActive = mIdx === activeModule;
        const unlocked = isModuleUnlocked(mIdx);
        const moduleComplete = mod.lessons.every(l => completedLessons.includes(l.id));

        return (
          <div key={mod.id} className="border-b border-gray-50">
            <button
              onClick={() => { if (unlocked) toggle(mIdx); }}
              className={`w-full text-left px-4 py-4 flex items-start gap-3 transition-colors ${
                isActive ? 'bg-blue-50/50' : 'hover:bg-gray-50'
              } ${!unlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold ${
                moduleComplete ? 'bg-green-100 text-green-600' :
                isActive ? 'bg-accent text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {moduleComplete ? '✓' : mIdx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-primary leading-tight">{mod.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{mod.duration}</p>
              </div>
              {unlocked ? (
                <ChevronDown size={16} className={`text-gray-400 transition-transform shrink-0 mt-1 ${isOpen ? 'rotate-180' : ''}`} />
              ) : (
                <Lock size={14} className="text-gray-300 shrink-0 mt-1" />
              )}
            </button>

            {isOpen && unlocked && (
              <div className="pb-2">
                {mod.lessons.map((lesson, lIdx) => {
                  const done = completedLessons.includes(lesson.id);
                  const isCurrent = mIdx === activeModule && lIdx === activeLesson;
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onSelectLesson(mIdx, lIdx)}
                      className={`w-full text-left flex items-center gap-3 px-4 py-3 transition-all text-sm ${
                        isCurrent
                          ? 'bg-accent text-primary font-semibold'
                          : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      {done
                        ? <CheckCircle2 size={16} className={isCurrent ? 'text-primary' : 'text-green-500'} />
                        : <PlayCircle size={16} className={isCurrent ? 'text-primary/80' : 'text-gray-300'} />
                      }
                      <span className="flex-1 truncate">{lesson.title}</span>
                      <span className={`text-[11px] shrink-0 ${isCurrent ? 'text-primary/70' : 'text-gray-400'}`}>
                        {lesson.duration}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}
