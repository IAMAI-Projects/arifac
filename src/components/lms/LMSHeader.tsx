// src/components/lms/LMSHeader.tsx
'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import { LogOut, ChevronLeft } from 'lucide-react';
import { logout, getUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface Props {
  courseTitle: string;
  progress: number;
  currentLesson?: string;
}

export default function LMSHeader({ courseTitle, progress, currentLesson }: Props) {
  const router = useRouter();

  const user = getUser();

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-4 shrink-0 z-10">
      <Link href="/lms/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-[#FFD700] transition-colors">
        <ChevronLeft size={18} />
        <Logo />
      </Link>

      <div className="flex-1 min-w-0 mx-4">
        <p className="text-xs text-gray-400 truncate">{courseTitle}</p>
        <p className="text-sm font-bold text-primary truncate">{currentLesson}</p>
      </div>

      {user && (
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg border border-gray-100 mr-4">
          <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold text-white">
            {user.name.charAt(0)}
          </div>
          <span className="text-xs font-semibold text-gray-600">{user.name}</span>
        </div>
      )}

      {/* Progress bar */}
      <div className="hidden md:flex items-center gap-3 w-48">
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-bold text-gray-500 w-10 text-right">{progress}%</span>
      </div>

      <button
        onClick={() => { logout(); router.push('/'); }}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
      >
        <LogOut size={18} />
      </button>
    </header>
  );
}
