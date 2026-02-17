'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

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
        { name: 'About', href: '#about' },
        { name: 'Certification', href: '#certification' },
        { name: 'Membership', href: '#membership' },
        { name: 'Partners', href: '#partners' },
        { name: 'Resources', href: '#resources' },
    ];

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
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200 uppercase tracking-wide"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Action Buttons */}
                <div className="hidden md:flex items-center gap-4">
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
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
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
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
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
                            <div className="h-px bg-gray-100 w-full" />
                            <div className="flex flex-col gap-4">
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
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
