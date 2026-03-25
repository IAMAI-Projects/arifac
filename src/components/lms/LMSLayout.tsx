// src/components/lms/LMSLayout.tsx
'use client';

import { useState, useEffect } from 'react';
import { lmsCourseData, getProgress, markLessonComplete } from '@/data/lms';
import LMSSidebar from './LMSSidebar';
import LMSContent from './LMSContent';
import LMSHeader from './LMSHeader';

export default function LMSLayout({ courseId }: { courseId: string }) {
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const p = getProgress(courseId);
    if (p) {
      setCompletedLessons(p.completedLessons);
      // restore last position
      const { moduleId, lessonId } = p.lastAccessed;
      const mIdx = lmsCourseData.findIndex(m => m.id === moduleId);
      if (mIdx > -1) {
        const lIdx = lmsCourseData[mIdx].lessons.findIndex(l => l.id === lessonId);
        setActiveModule(mIdx);
        setActiveLesson(Math.max(lIdx, 0));
      }
    }
  }, [courseId]);

  const currentModule = lmsCourseData[activeModule];
  const currentLesson = currentModule?.lessons[activeLesson];

  // Total progress %
  const total = lmsCourseData.reduce((s, m) => s + m.lessons.length, 0);
  const pct = Math.round((completedLessons.length / total) * 100);

  const handleMarkComplete = () => {
    if (!currentLesson) return;
    markLessonComplete(courseId, currentLesson.id);
    setCompletedLessons(prev =>
      prev.includes(currentLesson.id) ? prev : [...prev, currentLesson.id]
    );

    // Auto-advance
    if (activeLesson < currentModule.lessons.length - 1) {
      setActiveLesson(activeLesson + 1);
    } else if (activeModule < lmsCourseData.length - 1) {
      setActiveModule(activeModule + 1);
      setActiveLesson(0);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans overflow-hidden">
      <LMSHeader
        courseTitle="Certified AML & Financial Crime Professional"
        progress={pct}
        currentLesson={currentLesson?.title}
      />
      <div className="flex flex-1 overflow-hidden">
        <LMSSidebar
          modules={lmsCourseData}
          activeModule={activeModule}
          activeLesson={activeLesson}
          completedLessons={completedLessons}
          onSelectLesson={(mIdx, lIdx) => {
            setActiveModule(mIdx);
            setActiveLesson(lIdx);
          }}
        />
        <LMSContent
          lesson={currentLesson}
          module={currentModule}
          isCompleted={completedLessons.includes(currentLesson?.id || '')}
          onMarkComplete={handleMarkComplete}
          progress={pct}
        />
      </div>
    </div>
  );
}
