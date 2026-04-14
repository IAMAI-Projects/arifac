
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, Loader2, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all">
        <div className="bg-blue-600 p-8 text-white flex flex-col items-center">
          <div className="bg-white/20 p-4 rounded-full mb-4">
             <ShieldCheck size={48} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-center">ARIFAC Admin</h1>
          <p className="text-blue-100 mt-2 text-sm uppercase font-bold tracking-widest">Secretariat Portal</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700 text-sm animate-pulse">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 ml-1" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="admin@arifac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2 ml-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200 mt-4"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <LogIn size={20} />}
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
          </button>
          
          <p className="text-center text-xs text-gray-400 mt-6 font-medium">
             ARIFAC Internal Use Only • Authorized Access Required
          </p>
        </form>
      </div>
    </div>
  );
}
