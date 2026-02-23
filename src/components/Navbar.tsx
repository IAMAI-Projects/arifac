'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
        { name: 'About', href: '/#about' },
        { name: 'Certification', href: '/#certification' },
        { name: 'Meetings', href: '/meetings' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Members', href: '/members' },
    ];

    const teamLinks = [
        { name: 'Sectoral Nodal Officers', href: '/sectoral-nodal-officers' },
        { name: 'Training Leads', href: '/training-leads' },
        { name: 'Training Volunteers', href: '/training-volunteers' },
        { name: 'Training Topic Request', href: '/training-topics' },
    ];

    const [isTeamOpen, setIsTeamOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
                ? 'bg-white/90 backdrop-blur-xl border-gray-200 py-3 shadow-sm'
                : 'bg-transparent border-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="group">
                    <Logo />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-xs font-bold text-gray-600 hover:text-primary transition-colors duration-200 uppercase tracking-wide"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Team Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsTeamOpen(true)}
                        onMouseLeave={() => setIsTeamOpen(false)}
                    >
                        <button className="text-xs font-bold text-gray-600 hover:text-primary transition-colors duration-200 uppercase tracking-wide flex items-center gap-1">
                            Our Team <ChevronDown size={14} className={`transition-transform duration-200 ${isTeamOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isTeamOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden"
                                >
                                    <div className="py-2">
                                        {teamLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                className="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
                                            >
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
                <div className="hidden lg:flex items-center gap-4">
                    {getUser() ? (
                        <>
                            <Link
                                href="/lms/dashboard"
                                className="text-sm font-semibold text-primary hover:text-accent transition-colors px-4 py-2 border border-gray-200 rounded-md hover:border-primary hover:bg-gray-50 flex items-center gap-2"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={() => {
                                    logout();
                                    window.location.href = '/';
                                }}
                                className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors px-4 py-2 border border-red-100 rounded-md hover:border-red-500 hover:bg-red-50"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-sm font-semibold text-primary hover:text-accent transition-colors px-4 py-2 border border-gray-200 rounded-md hover:border-primary hover:bg-gray-50"
                            >
                                Login to LMS
                            </Link>
                            <Link
                                href="/join"
                                className="text-sm font-semibold text-white bg-primary hover:bg-gray-800 transition-all px-5 py-2 rounded-md shadow-lg hover:shadow-xl"
                            >
                                Become a Member
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
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Our Team</div>
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
                                            className="text-center font-semibold text-primary px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Login to LMS
                                        </Link>
                                        <Link
                                            href="/join"
                                            className="text-center font-semibold text-white bg-primary px-5 py-3 rounded-md shadow-lg"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Become a Member
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
