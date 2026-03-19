'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { ArrowLeft, Lock, Mail, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
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
            if (email.endsWith('@iamai.in') || email === 'admin@arifac.org') {
                router.push('/v1/admin/dashboard'); // Mock redirect
            } else {
                setError('Unauthorized access. Only official team members can access this portal.');
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900 overflow-hidden font-sans">
            {/* Visual Side */}
            <div className="hidden md:flex flex-col justify-between w-1/2 bg-slate-900 text-white p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />

                <div className="relative z-10">
                    <Link href="/" className="inline-block hover:opacity-80 transition-opacity bg-white p-3 rounded-xl">
                        <Logo />
                    </Link>
                </div>

                <div className="relative z-10 max-w-lg">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-6">
                        <ShieldAlert className="w-4 h-4" />
                        Admin Secured Area
                    </div>
                    <h2 className="text-4xl font-heading font-bold mb-6 text-white leading-tight">
                        Arifac Team Portal
                    </h2>
                    <p className="text-slate-300 text-lg leading-relaxed mb-8">
                        Centralized management interface for ARIFAC administrative staff. Strictly restricted to authorized team members.
                    </p>
                    <div className="flex gap-4">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700 shadow-sm flex-1">
                            <h3 className="font-bold text-blue-400 mb-1">Approval Workflows</h3>
                            <p className="text-xs text-slate-400">Manage member applications and regulatory reporting submissions.</p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700 shadow-sm flex-1">
                            <h3 className="font-bold text-blue-400 mb-1">System Control</h3>
                            <p className="text-xs text-slate-400">Configure system parameters and view audit logs.</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-xs text-slate-500 flex justify-between items-center">
                    <span>© {new Date().getFullYear()} ARIFAC. All rights reserved.</span>
                    <span>System v1.0.4</span>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative bg-white">
                <Link
                    href="/"
                    className="absolute top-8 left-8 md:hidden text-slate-400 hover:text-slate-900 flex items-center gap-2 text-sm"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Site
                </Link>

                <div className="w-full max-w-md">
                    <div className="md:hidden mb-12 flex justify-center bg-slate-900 p-4 rounded-xl">
                        <Logo />
                    </div>

                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 mb-4">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold font-heading mb-2 text-slate-900">Team Login</h1>
                        <p className="text-slate-500 text-sm">Sign in with your organizational email to continue.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-start gap-3">
                            <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                            <p className="font-medium">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700" htmlFor="email">Work Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    placeholder="name@iamai.in"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-slate-700" htmlFor="password">Password</label>
                                <button type="button" className="text-xs text-blue-600 hover:text-blue-700 transition-colors font-medium">Forgot password?</button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-lg hover:bg-slate-800 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                'Access Dashboard'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-100 text-center text-xs text-slate-400">
                        <p>This system is for the use of authorized ARIFAC personnel only.</p>
                        <p className="mt-1">All activities are monitored and logged.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
