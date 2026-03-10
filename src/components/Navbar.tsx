'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { getUser, logout } from '@/lib/auth';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Meetings', href: '/meetings' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Members', href: '/members' },
    ];

    const teamLinks = [

        { name: 'Training Leads', href: '/training-leads' },
        { name: 'Training Volunteers', href: '/training-volunteers' },
        { name: 'Training Topic Request', href: '/training-topics' },
    ];

    const [isTeamOpen, setIsTeamOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <>
            {/* IAMAI Partnership Top Bar */}
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: isScrolled ? -40 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed top-0 left-0 right-0 z-[60] h-10 bg-gray-900 border-b border-white/5 flex items-center justify-center px-4"
            >
                <div className="flex items-center gap-3">
                    <span className="text-white/60 group-hover:text-white text-[11px] font-medium transition-colors hidden md:block">
                        Operating under the aegis of IAMAI
                    </span>
                    <a
                        href="https://iamai.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 group"
                    >
                        <div className="relative w-16 h-10 rounded overflow-hidden bg-white">
                            <Image
                                src="/iamai-logo.png"
                                alt="IAMAI"
                                fill
                                className="object-contain p-0.5"
                            />
                        </div>
                    </a>
                    <span className="text-white/60 group-hover:text-white text-[11px] font-medium transition-colors hidden md:block">
                        with strategic guidance from FIU-IND and collaboration with key regulators.
                    </span>
                </div>
            </motion.div>

            <nav
                className={`fixed left-0 right-0 z-50 transition-all duration-500 border-b bg-white/95 backdrop-blur-2xl border-gray-200/80 ${isScrolled
                    ? 'top-0 py-4 shadow-md'
                    : 'top-10 py-6'
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="group">
                        <Logo variant="light" showBadge={false} />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center">
                        {navLinks.map((link, index) => (
                            <div key={link.name} className="flex items-center">
                                <Link
                                    href={link.href}
                                    className="relative group px-4 py-1 text-sm font-semibold text-gray-600 hover:text-primary transition-colors duration-200"
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-accent rounded-full transition-all duration-300 group-hover:w-4/5" />
                                </Link>
                                {index < navLinks.length - 1 && (
                                    <span className="w-1 h-1 rounded-full mx-1 bg-gray-200" />
                                )}
                            </div>
                        ))}

                        {/* Team Dropdown */}
                        <div
                            className="relative flex items-center"
                            onMouseEnter={() => setIsTeamOpen(true)}
                            onMouseLeave={() => setIsTeamOpen(false)}
                        >
                            <button className="relative group px-4 py-1 text-sm font-semibold text-gray-600 hover:text-primary transition-colors duration-200 flex items-center gap-1.5">
                                Training
                                <ChevronDown size={14} className={`mt-0.5 transition-transform duration-300 ${isTeamOpen ? 'rotate-180 text-accent' : ''}`} />
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-accent rounded-full transition-all duration-300 group-hover:w-4/5" />
                            </button>

                            <AnimatePresence>
                                {isTeamOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                                        transition={{ duration: 0.18, ease: 'easeOut' }}
                                        className="absolute top-full left-0 mt-3 w-68 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden"
                                    >
                                        <div className="p-2">
                                            {teamLinks.map((link) => (
                                                <Link
                                                    key={link.name}
                                                    href={link.href}
                                                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-xl transition-all duration-150 group"
                                                >
                                                    <span className="w-1 h-4 rounded-full bg-gray-200 group-hover:bg-primary transition-colors duration-200" />
                                                    {link.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Desktop Action Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        {/* Vertical divider separating nav from actions */}
                        <span className="w-px h-6 bg-gray-200 mr-1" />

                        {getUser() ? (
                            <>
                                <Link
                                    href="/lms/dashboard"
                                    className="text-sm font-semibold text-primary hover:text-accent transition-colors px-4 py-2 border border-gray-200 rounded-lg hover:border-primary hover:bg-gray-50 flex items-center gap-2"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        window.location.href = '/';
                                    }}
                                    className="text-sm font-bold bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 transition-all px-5 py-2.5 rounded-xl"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <a
                                    href="https://iamai.edmingle.com/courses"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-bold bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-primary transition-all px-5 py-2.5 rounded-xl border"
                                >
                                    Learning Platform
                                </a>
                                <Link
                                    href="/join"
                                    className="text-sm font-bold bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-primary transition-all px-5 py-2.5 rounded-xl border"
                                >
                                    Member Platform
                                </Link>
                                <Link
                                    href="/"
                                    className="text-sm font-bold bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-primary transition-all px-5 py-2.5 rounded-xl border"
                                >
                                    Arifac Team Login
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-gray-600 hover:text-primary transition-colors"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation Drawer */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
                        >
                            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}

                                <div className="flex flex-col gap-3">
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Training</div>
                                    {teamLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className="text-lg font-medium text-gray-700 hover:text-primary transition-colors pl-4 border-l-2 border-gray-100"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>

                                <div className="h-px bg-gray-100 w-full" />
                                <div className="flex flex-col gap-4">
                                    {getUser() ? (
                                        <>
                                            <Link
                                                href="/lms/dashboard"
                                                className="text-center font-semibold text-primary px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Dashboard
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setIsMobileMenuOpen(false);
                                                    window.location.href = '/';
                                                }}
                                                className="text-center font-semibold text-red-500 px-4 py-3 border border-red-100 rounded-md hover:bg-red-50 transition-colors"
                                            >
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href="/login"
                                                className="text-center font-semibold text-primary px-4 py-3 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Learning Platform
                                            </Link>
                                            <Link
                                                href="/join"
                                                className="text-center font-semibold text-primary px-4 py-3 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Member Platform
                                            </Link>
                                            <Link
                                                href=""
                                                className="text-center font-semibold text-primary px-4 py-3 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors"
                                            >
                                                Arifac Team Login
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}
