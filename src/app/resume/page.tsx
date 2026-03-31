
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function ResumeTokenHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setError('Token is missing in the URL.');
      return;
    }

    async function validateToken() {
       try {
         const res = await fetch(`/api/membership/resume?token=${token}`);
         if (res.ok) {
           // Successfully validated and cookie etc set.
           const data = await res.json();
           // The API redirects but if it doesn't we handle it:
           router.push('/membership/register/post-approval');
         } else {
           const errData = await res.json();
           setError(errData.error || 'Failed to validate token.');
         }
       } catch (err) {
         setError('An error occurred. Please try again later.');
       }
    }

    validateToken();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Validation Error</h1>
        <p className="text-gray-600">{error}</p>
        <button 
           onClick={() => router.push('/')}
           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      <p className="mt-4 text-gray-600 font-medium tracking-wide">Validating your secure token...</p>
    </div>
  );
}

export default function ResumePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResumeTokenHandler />
    </Suspense>
  );
}
