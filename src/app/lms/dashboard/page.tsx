'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn, getPaidCourses, getUser } from '@/lib/auth';
import LMSLayout from '@/components/lms/LMSLayout';
import CourseCatalog from '@/components/lms/CourseCatalog';

export default function LMSDashboard() {
  const router = useRouter();
  const [activeCourse, setActiveCourse] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [paidCourses, setPaidCourses] = useState<string[]>([]);

  useEffect(() => {
    if (!isLoggedIn()) { 
      router.push('/login'); 
      return; 
    }
    const userObj = getUser();
    const paid = getPaidCourses();
    setUser(userObj);
    setPaidCourses(paid);

    if (paid.length === 1) {
      setActiveCourse(paid[0]);
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (activeCourse) {
    return <LMSLayout courseId={activeCourse} />;
  }

  return (
    <CourseCatalog 
      user={user} 
      paidCourses={paidCourses} 
      onSelectCourse={setActiveCourse} 
    />
  );
}
