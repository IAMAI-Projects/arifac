'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, AlertCircle, ArrowRight, UserCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { login as setClientAuth } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 404) {
          setError('User not found. Please register yourself first.');
        } else if (res.status === 401) {
          setError('Invalid email or password');
        } else {
          setError(data.error || 'Something went wrong. Please try again.');
        }
        return;
      }

      // Success
      setClientAuth(data.user.email, data.user.name);
      
      // Redirect to dashboard
      router.push('/membership/dashboard');
      router.refresh();
    } catch (err) {
      setError('Failed to connect to the server. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-white min-h-screen flex flex-col font-jakarta">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-6 py-24 sm:py-32">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[32px] border border-gray-100 shadow-2xl p-8 md:p-10 relative overflow-hidden"
          >
            {/* Background Decorative Element */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="mb-8">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6"
                >
                  <UserCheck className="text-accent" size={32} />
                </motion.div>
                <h1 className="text-3xl font-extrabold text-[#1d1d1f] tracking-tight mb-2">
                  Member Login
                </h1>
                <p className="text-gray-500 font-medium">
                  Welcome back to India's AML/CFT capability platform.
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600"
                >
                  <AlertCircle className="shrink-0 mt-0.5" size={18} />
                  <p className="text-sm font-semibold leading-relaxed">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={20} />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-[#f5f5f7] border-none rounded-2xl py-4 pl-12 pr-4 text-[#1d1d1f] font-semibold placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <label htmlFor="password" className="text-sm font-bold text-gray-700">
                      Password
                    </label>
                    <Link href="/membership/forgot-password" title="Go to forgot password page" className="text-xs font-bold text-accent hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={20} />
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#f5f5f7] border-none rounded-2xl py-4 pl-12 pr-4 text-[#1d1d1f] font-semibold placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#1d1d1f] text-white rounded-2xl py-4 font-bold flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 shadow-xl shadow-gray-200"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                <p className="text-gray-500 font-medium">
                  Not a member yet?{' '}
                  <Link href="/membership/launching-soon" className="text-accent font-bold hover:underline">
                    Apply for Membership
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-xs text-gray-400 font-medium leading-relaxed">
              Protected by ARIFAC Security Systems. <br />
              Supported by Financial Intelligence Unit - India (FIU-IND) <br />
              <Link href="/membership-terms" className="text-accent/80 hover:text-accent font-bold mt-1 inline-block">
                Membership Terms & Conditions
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
