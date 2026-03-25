// src/components/lms/CourseCatalog.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PlayCircle, CheckCircle2 } from 'lucide-react';
import { certificationLevels, CertificationLevel } from '@/data/arifac';
import Logo from '@/components/Logo';
import { LogOut } from 'lucide-react';
import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SyllabusModal from '@/components/SyllabusModal';

interface Props {
  user: { name: string; email: string } | null;
  paidCourses: string[];
  onSelectCourse: (level: string) => void;
}

export default function CourseCatalog({ user, paidCourses, onSelectCourse }: Props) {
  const router = useRouter();
  const [syllabusCourse, setSyllabusCourse] = useState<CertificationLevel | null>(null);
  const [mounted, setMounted] = useState(false);

  useState(() => {
    setMounted(true);
  });

  if (!mounted) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Logo />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-primary hidden md:block">{user?.name}</span>
          <button onClick={handleLogout} className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors text-gray-400">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-primary mb-3">Certification Catalog</h1>
            <p className="text-gray-500">Select a course to begin your professional journey.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificationLevels.map((level, idx) => {
              const isPaid = paidCourses.includes(level.level);
              return (
                <motion.div
                  key={level.level}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col"
                >
                  <div className="p-6 flex-1">
                    <div className="text-xs font-bold text-accent mb-2 uppercase tracking-widest">{level.level}</div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-primary">{level.title}</h3>
                      {!isPaid && (
                        <span className="text-sm font-bold text-primary">₹{level.price.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                    <ul className="space-y-2 mb-6 text-sm text-gray-500">
                      {level.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 pt-0 flex flex-col gap-3">
                    <button
                      onClick={() => setSyllabusCourse(level)}
                      className="w-full bg-gray-50 text-gray-600 py-2 rounded-xl font-semibold text-xs hover:bg-gray-100 transition-colors"
                    >
                      View Syllabus
                    </button>

                    {isPaid ? (
                      <button
                        onClick={() => onSelectCourse(level.level)}
                        className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/10"
                      >
                        <PlayCircle className="w-4 h-4" /> Go to Course
                      </button>
                    ) : (
                      <Link
                        href={`/membership/register/form-a?org=${encodeURIComponent(level.title)}`}
                        className="w-full bg-accent text-primary py-3 rounded-xl font-bold text-sm hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
                      >
                        Enroll Now
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      <SyllabusModal
        course={syllabusCourse}
        onClose={() => setSyllabusCourse(null)}
      />
    </div>
  );
}
