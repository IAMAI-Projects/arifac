'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { ArrowLeft, Lock, Mail } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate network delay
        setTimeout(() => {
            const validUsers: Record<string, string> = {
                's.avanish@iamai.in': 'S. Avanish',
                'satyendra@iamai.in': 'Satyendra',
                'sandeep@iamai.in': 'Sandeep'
            };

            if (validUsers[email] && password === '123456') {
                login(email, validUsers[email]);
                router.push('/lms/dashboard');
            } else {
                setError('Invalid credentials. Please use a valid demo account (e.g., s.avanish@iamai.in | 123456).');
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row text-primary overflow-hidden font-sans">
            {/* Visual Side */}
            <div className="hidden md:flex flex-col justify-between w-1/2 bg-gray-50 p-12 relative overflow-hidden border-r border-gray-200">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />

                <div className="relative z-10">
                    <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
                        <Logo />
                    </Link>
                </div>

                <div className="relative z-10 max-w-lg">
                    <h2 className="text-4xl font-heading font-bold mb-6 text-primary">
                        Institutional Access Portal
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        This secure gateway is restricted to authorized representatives of member institutions and certified professionals.
                    </p>
                    <div className="flex gap-4">
                        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm flex-1">
                            <h3 className="font-bold text-accent mb-1">LMS Access</h3>
                            <p className="text-xs text-gray-500">Continuing Professional Development modules and exams.</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm flex-1">
                            <h3 className="font-bold text-accent mb-1">Member Tools</h3>
                            <p className="text-xs text-gray-500">Typology database and regulatory reporting resources.</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-xs text-gray-400">
                    © ARIFAC. Authorized access only.
                </div>
            </div>

            {/* Form Side */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative bg-white">
                <Link
                    href="/"
                    className="absolute top-8 left-8 md:hidden text-gray-400 hover:text-primary flex items-center gap-2 text-sm"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                <Link
                    href="/"
                    className="absolute top-8 right-8 text-gray-400 hover:text-primary hidden md:flex items-center gap-2 text-sm transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Application
                </Link>

                <div className="w-full max-w-md">
                    <div className="md:hidden mb-12 text-center">
                        <Logo className="justify-center" />
                    </div>

                    <div className="text-center mb-10">
                        <h1 className="text-2xl font-bold font-heading mb-2 text-primary">Sign In to LMS</h1>
                        <p className="text-gray-500 text-sm">Enter your institutional credentials to proceed.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700" htmlFor="email">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white border border-gray-300 rounded-lg py-3 pl-10 pr-4 text-primary placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all invalid:border-red-500/50"
                                    placeholder="name@institution.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                                <Link href="#" className="text-xs text-accent hover:text-primary transition-colors">Forgot password?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white border border-gray-300 rounded-lg py-3 pl-10 pr-4 text-primary placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-white font-bold py-3.5 rounded-lg hover:bg-gray-800 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link href="/membership/register" className="text-primary hover:text-accent transition-colors font-medium">
                            Apply for Membership
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
