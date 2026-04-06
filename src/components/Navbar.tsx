'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, HelpCircle, Search, User, ShoppingCart, Linkedin, LogOut, Info, Users, Star, Handshake, Calendar, Image as ImageIcon, MapPin, Bell, FileText, Building, Wrench, Video, Newspaper, Lightbulb, BookOpen, Award, BookMarked, CheckCircle, GraduationCap, Users2, Layers } from 'lucide-react';
import Logo from './Logo';
import { getUser, logout } from '@/lib/auth';
import { useLanguage } from './LanguageContext';
import { LucideIcon } from 'lucide-react';

interface NavLink {
    name: string;
    href: string;
    dropdown?: { name: string; href: string; icon?: LucideIcon }[];
    sections?: { title: string; links: { name: string; href: string; icon?: LucideIcon }[] }[];
}

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const { language: currentLang, setLanguage: setCurrentLang, t } = useLanguage();

    useEffect(() => {
        // Initial user check
        setUser(getUser());
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen || isSearchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen, isSearchOpen]);

    const navLinks: NavLink[] = [
        {
            name: t('About'),
            href: '/about',
        },

        {
            name: t('Engage'),
            href: '/member-benefits',
            dropdown: [
                {
                    name: t('ARIFAC Membership'),
                    href: user ? '/membership/dashboard' : '/member-benefits',
                    icon: Award
                },
                { name: t('Register with ARIFAC'), href: '/register-with-arifac', icon: GraduationCap }
            ]

        },
        {
            name: t('Certification'),
            href: '/certifications',
            dropdown: [
                { name: t('Training & Certification'), href: '/certifications', icon: Award },
                { name: t('nav.training_leads'), href: '/training-leads', icon: GraduationCap },
                { name: t('Become a Trainer'), href: '/training-volunteers', icon: Users2 },
                { name: t('nav.topics'), href: '/training-topics', icon: Layers },
            ]
        },
        {
            name: 'Programmes',
            href: '/meetings',

        },
        {
            name: t('Updates'),
            href: '/regulatory-updates',
        },
    ];

    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <>
            {/* IAMAI Partnership Top Bar */}
            <div
                className="fixed top-0 left-0 right-0 z-[110] h-8 bg-[#1d1d1f]/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6"
            >
                {/* Left side area to balance the news ticker */}
                <div className="flex-1 flex items-center justify-start min-w-[20px] md:min-w-[140px]" />

                {/* News Ticker Container - Centered */}
                <div className="flex-[10] overflow-hidden relative h-full flex items-center min-w-0 max-w-6xl mx-auto px-4">
                    <div className="flex items-center shrink-0 pr-4">
                        <span className="text-accent text-[9px] font-black uppercase tracking-tighter bg-accent/10 border border-accent/20 px-1.5 py-0.5 rounded-sm whitespace-nowrap">
                            {'NEWS'}
                        </span>
                    </div>

                    <div className="relative flex-1 overflow-hidden h-full">
                        <motion.div
                            animate={{ x: ["5%", "-100%"] }}
                            transition={{
                                duration: 40,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="flex items-center gap-16 whitespace-nowrap pr-20 h-full"
                        >
                            {[
                                "N-SAFE National Summit on Anti-Financial Crime Enforcement- 6th April 2026, New Delhi",
                                "Launch of ARIFAC Core Certification – Level 1 (L1): Foundational AML/CFT Compliance- 17th April, 2025",
                            ].map((headline, i) => (
                                <span key={i} className="text-white/80 text-[11px] font-medium tracking-wide flex items-center gap-3">
                                    <div className="w-1 h-1 rounded-full bg-accent" />
                                    {headline}
                                </span>
                            ))}
                        </motion.div>
                        {/* Fade mask for smooth entry/exit */}
                        <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-[#1d1d1f] to-transparent z-10" />
                        <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-[#1d1d1f] to-transparent z-10" />
                    </div>
                </div>

                {/* Right side area for Help and Language */}
                <div className="flex-1 flex items-center justify-end gap-4 min-w-[140px]">
                    <Link href="/help" className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors group">
                        <HelpCircle size={14} className="group-hover:scale-110 transition-transform" />
                        <span className="text-[11px] font-bold hidden sm:block uppercase tracking-wider">{t('nav.help')}</span>
                    </Link>
                    <div className="w-px h-3 bg-white/10" />
                    <div className="relative">
                        <button
                            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                            className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors group"
                        >
                            <span className="text-[10px] font-bold uppercase tracking-wider">{currentLang}</span>
                            <ChevronDown size={10} className={`transition-transform duration-300 ${isLanguageOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} />
                        </button>

                        <AnimatePresence>
                            {isLanguageOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsLanguageOpen(false)}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-2 w-32 bg-white/95 backdrop-blur-2xl rounded-xl border border-gray-100 shadow-xl z-50 overflow-hidden"
                                    >
                                        <div className="py-1">
                                            {[
                                                { code: 'EN', name: 'English' },
                                                { code: 'HI', name: 'Hindi' }
                                            ].map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => {
                                                        setCurrentLang(lang.code as 'EN' | 'HI');
                                                        setIsLanguageOpen(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${currentLang === lang.code
                                                        ? 'text-accent bg-gray-50'
                                                        : 'text-gray-600 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {lang.name}
                                                    {currentLang === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-accent" />}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <nav
                className={`fixed left-0 right-0 z-[120] transition-all duration-500 border-b border-gray-100/50 ${activeDropdown || isMobileMenuOpen ? 'bg-white' : 'bg-white/90 backdrop-blur-xl'
                    } ${isScrolled ? 'top-0' : 'top-8'} py-3`}
                onMouseLeave={() => {
                    if (activeDropdown !== 'account') setActiveDropdown(null);
                }}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 md:gap-6 shrink-0">
                        <a
                            href="https://fiuindia.gov.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-16 md:h-22 bg-white shrink-0 flex items-center justify-center hover:opacity-90 transition-opacity"
                        >
                            <Image
                                src="/images/fiu-logo.png"
                                alt="FIU-IND"
                                width={80}
                                height={35}
                                className="object-contain h-full w-auto md:w-[100px]"
                            />
                        </a>
                        <div className="w-px h-8 md:h-10 bg-gray-200 shrink-0" />
                        <Link href="/" className="group flex items-center">
                            <Logo variant="light" className="scale-95 md:scale-105 origin-left" />
                        </Link>

                        <div className="w-px h-8 md:h-10 bg-gray-200 shrink-0 ml-1 md:ml-2" />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-2 flex-1 ml-4 justify-center">
                        <div className="flex items-center h-full gap-2">
                            {navLinks.map((link) => (
                                <div
                                    key={link.name}
                                    className="flex items-center h-full relative"
                                    onMouseEnter={() => {
                                        if (link.dropdown || link.sections) {
                                            setActiveDropdown(link.name);
                                        } else {
                                            setActiveDropdown(null);
                                        }
                                    }}
                                >
                                    {link.href && !link.dropdown && !link.sections ? (
                                        <Link
                                            href={link.href}
                                            className={`relative group px-5 py-4 text-[15px] font-medium tracking-tight transition-colors duration-200 flex items-center gap-1.5 ${activeDropdown === link.name ? 'text-accent' : 'text-[#1d1d1f]/80 hover:text-accent'}`}
                                        >
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <button
                                            className={`relative group px-5 py-4 text-[15px] font-medium tracking-tight transition-colors duration-200 flex items-center gap-1.5 ${activeDropdown === link.name ? 'text-accent' : 'text-[#1d1d1f]/80 hover:text-accent'}`}
                                        >
                                            {link.name}
                                            {activeDropdown === link.name && (
                                                <motion.div
                                                    layoutId="active-nav-indicator"
                                                    className="absolute bottom-0 left-5 right-5 h-[3px] bg-accent rounded-t-full"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                            )}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Desktop Action Icons */}
                    <div className="hidden lg:flex items-center gap-5">
                        <a
                            href="https://www.linkedin.com/company/arifacpanindia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 transition-colors duration-200 text-[#1d1d1f]/60 hover:text-accent"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={20} />
                        </a>
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 transition-colors duration-200 text-[#1d1d1f]/60 hover:text-accent"
                        >
                            <Search size={20} />
                        </button>

                        {/* <button
                            className="p-2 relative transition-colors duration-200 text-[#1d1d1f]/60 hover:text-accent"
                        >
                            <ShoppingCart size={20} />
                            <span className="absolute -top-0 -right-0 w-4 h-4 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center">0</span>
                        </button> */}

                        <div className="relative">
                            <button
                                onClick={() => setActiveDropdown(activeDropdown === 'account' ? null : 'account')}
                                className="p-2 transition-colors duration-200 text-[#1d1d1f]/60 hover:text-accent"
                            >
                                <User size={20} />
                            </button>

                            <AnimatePresence>
                                {activeDropdown === 'account' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                        className="absolute right-0 mt-3 w-72 bg-white border border-gray-100 rounded-3xl shadow-2xl overflow-hidden z-50 text-left"
                                    >
                                        <div className="p-4 bg-[#f5f5f7] border-b border-gray-100">
                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] pl-2">{t('nav.platform_access')}</p>
                                        </div>
                                        <div className="p-3 flex flex-col gap-1.5">
                                            <Link
                                                href="https://arifac.iamai.in/courses"
                                                className="flex items-center gap-3 px-4 py-3.5 text-[14px] font-bold text-[#1d1d1f]/80 hover:bg-[#f5f5f7] hover:text-accent rounded-xl transition-all"
                                                onClick={() => setActiveDropdown(null)}
                                            >
                                                ARIFAC Certification
                                            </Link>
                                            <Link
                                                href={user ? "/membership/dashboard" : "/membership/login"}
                                                className="flex items-center gap-3 px-4 py-3.5 text-[14px] font-bold text-[#1d1d1f]/80 hover:bg-[#f5f5f7] hover:text-accent rounded-xl transition-all"
                                                onClick={() => setActiveDropdown(null)}
                                            >
                                                {t('nav.member_platform')}
                                            </Link>

                                            {user && (
                                                <button
                                                    onClick={async () => {
                                                        await logout();
                                                        setUser(null);
                                                        setActiveDropdown(null);
                                                        window.location.href = '/';
                                                    }}
                                                    className="flex items-center gap-3 px-4 py-3.5 text-[14px] font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all text-left w-full"
                                                >
                                                    <LogOut size={16} />
                                                    {t('nav.logout')}
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <button
                        className="lg:hidden p-2 transition-colors text-[#1d1d1f]"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                    {activeDropdown && activeDropdown !== 'account' && (() => {
                        const link = navLinks.find(l => l.name === activeDropdown);
                        return link && (link.dropdown || link.sections);
                    })() && (
                            <motion.div
                                key="mega-menu"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2, ease: 'easeInOut' }}
                                className="absolute top-full left-0 right-0 bg-white border-t border-b border-gray-100 overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]"
                            >
                                <div className="container mx-auto px-6 py-10">
                                    {(() => {
                                        const link = navLinks.find(l => l.name === activeDropdown);
                                        if (!link) return null;

                                        return (
                                            <div className="flex justify-center flex-wrap gap-8 lg:gap-16">
                                                {link.sections ? (
                                                    link.sections.map((section) => (
                                                        <div key={section.title} className="flex flex-col items-center gap-6">
                                                            <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest px-3">
                                                                {section.title}
                                                            </h3>
                                                            <div className="flex justify-center flex-wrap gap-8 lg:gap-12 max-w-2xl">
                                                                {section.links.map((subItem) => (
                                                                    <Link key={subItem.name} href={subItem.href} className="flex flex-col items-center gap-4 w-[100px] group" onClick={() => setActiveDropdown(null)}>
                                                                        <div className="w-16 h-16 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all text-[#1d1d1f]/60 duration-300">
                                                                            {subItem.icon && <subItem.icon size={26} strokeWidth={1.5} />}
                                                                            {!subItem.icon && <span className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-white transition-colors duration-300" />}
                                                                        </div>
                                                                        <span className="text-[14px] font-medium text-center leading-tight text-[#1d1d1f]/80 group-hover:text-accent transition-colors">
                                                                            {subItem.name}
                                                                        </span>
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="flex justify-center flex-wrap gap-8 lg:gap-12 max-w-4xl">
                                                        {link.dropdown?.map((subItem) => (
                                                            <Link key={subItem.name} href={subItem.href} className="flex flex-col items-center gap-4 w-[100px] group" onClick={() => setActiveDropdown(null)}>
                                                                <div className="w-16 h-16 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all text-[#1d1d1f]/60 duration-300">
                                                                    {subItem.icon && <subItem.icon size={26} strokeWidth={1.5} />}
                                                                    {!subItem.icon && <span className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-white transition-colors duration-300" />}
                                                                </div>
                                                                <span className="text-[14px] font-medium text-center leading-tight text-[#1d1d1f]/80 group-hover:text-accent transition-colors">
                                                                    {subItem.name}
                                                                </span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })()}
                                </div>
                            </motion.div>
                        )}
                </AnimatePresence>
            </nav>

            {/* Global Overlays */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-white/98 backdrop-blur-3xl flex items-start justify-center pt-20 px-6"
                    >
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute top-10 right-10 text-gray-400 hover:text-gray-900 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="w-full max-w-3xl flex flex-col gap-8">
                            <div className="space-y-4 text-center">
                                <p className="text-2xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight leading-tight">{t('nav.search_title')}</p>
                            </div>

                            <div className="relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-accent" size={24} />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder={t('nav.search_placeholder')}
                                    className="w-full bg-[#f5f5f7] border-none rounded-[24px] py-5 pl-16 pr-10 text-xl text-[#1d1d1f] font-bold placeholder:text-gray-300 focus:outline-none focus:bg-white transition-all shadow-sm focus:shadow-2xl"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {searchQuery && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-20 bg-[#f5f5f7] rounded-[48px]"
                                >
                                    <p className="text-secondary text-xl font-bold">No results found for "<span className="text-accent">{searchQuery}</span>"</p>
                                    <p className="text-secondary font-medium mt-4">Try searching for "AML/CFT", "Compliance", or "Membership"</p>
                                </motion.div>
                            )}

                            <div className="flex flex-wrap gap-4 justify-center">
                                <span className="text-secondary text-base font-bold pt-2">{t('nav.search_quick')}:</span>
                                {[t('cert.title'), t('nav.events'), t('member.benefits_title'), t('nav.insights')].map(tag => (
                                    <button key={tag} className="px-6 py-2.5 rounded-xl bg-[#f5f5f7] text-[#1d1d1f] text-sm font-bold hover:bg-accent hover:text-white transition-all">
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed inset-0 z-[100] lg:hidden bg-white pt-32 px-8 overflow-y-auto"
                    >
                        <div className="container mx-auto py-8 flex flex-col gap-12">
                            {/* Mobile Search Trigger */}
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => {
                                        setIsSearchOpen(true);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="flex-1 flex items-center gap-6 px-8 py-6 bg-[#f5f5f7] rounded-[32px] text-gray-400 hover:bg-gray-100 transition-all text-left group"
                                >
                                    <Search size={28} className="text-accent" />
                                    <span className="text-xl font-bold">{t('nav.search_placeholder')}</span>
                                </button>
                                <a
                                    href="https://www.linkedin.com/company/arifacpanindia/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-6 bg-[#f5f5f7] rounded-[32px] text-accent"
                                >
                                    <Linkedin size={28} />
                                </a>
                                {/* <button className="p-6 bg-[#f5f5f7] rounded-[32px] text-[#1d1d1f]/60 relative">
                                    <ShoppingCart size={28} />
                                    <span className="absolute top-4 right-4 w-5 h-5 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">0</span>
                                </button> */}
                            </div>

                            {/* Mobile Links */}
                            <div className="flex flex-col gap-10">
                                {navLinks.map((link) => (
                                    <div key={link.name} className="flex flex-col gap-6">
                                        <div className="flex items-center justify-between">
                                            {link.href ? (
                                                <Link
                                                    href={link.href}
                                                    className="text-2xl font-bold text-[#1d1d1f] tracking-tight hover:text-accent transition-colors"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    {link.name}
                                                </Link>
                                            ) : (
                                                <span className="text-2xl font-bold text-[#1d1d1f] tracking-tight">
                                                    {link.name}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-6 pl-6 border-l-2 border-[#f5f5f7]">
                                            {link.sections ? (
                                                link.sections.map((section) => (
                                                    <div key={section.title} className="flex flex-col gap-4">
                                                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">{section.title}</p>
                                                        <div className="flex flex-col gap-4">
                                                            {section.links.map((subItem) => (
                                                                <Link
                                                                    key={subItem.name}
                                                                    href={subItem.href}
                                                                    className="flex items-center gap-3 text-lg font-bold text-secondary hover:text-accent transition-colors group"
                                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                                >
                                                                    <div className="w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                                                                        {subItem.icon && <subItem.icon size={20} />}
                                                                        {!subItem.icon && <div className="w-2 h-2 rounded-full bg-gray-300" />}
                                                                    </div>
                                                                    {subItem.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                link.dropdown?.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        className="flex items-center gap-4 text-xl font-bold text-secondary hover:text-accent transition-colors group"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        <div className="w-12 h-12 rounded-full bg-[#f5f5f7] flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                                                            {subItem.icon && <subItem.icon size={24} />}
                                                            {!subItem.icon && <div className="w-2 h-2 rounded-full bg-gray-300" />}
                                                        </div>
                                                        {subItem.name}
                                                    </Link>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="h-px bg-[#f5f5f7] w-full" />

                            <div className="flex flex-col gap-6 pb-20">
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] pl-1">{t('nav.platform_access')}</p>
                                <div className="flex items-center gap-4 px-8 py-6 bg-accent/20 rounded-[24px] text-xl">
                                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                        <GraduationCap size={24} />
                                    </div>
                                    <a
                                        href="https://arifac.iamai.in/courses"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {t('nav.learning_platform')}
                                    </a>
                                </div>
                                <Link
                                    href={user ? "/membership/dashboard" : "/membership/login"}
                                    className="flex items-center gap-4 font-bold text-[#1d1d1f] px-8 py-6 bg-white rounded-[24px] border-2 border-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white transition-all text-xl"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <div className="w-12 h-12 rounded-full bg-[#1d1d1f]/5 flex items-center justify-center">
                                        <Users size={24} />
                                    </div>
                                    {t('nav.member_platform')}
                                </Link>

                                {user && (
                                    <button
                                        onClick={async () => {
                                            await logout();
                                            setUser(null);
                                            setIsMobileMenuOpen(false);
                                            window.location.href = '/';
                                        }}
                                        className="text-center font-bold text-red-600 px-8 py-6 bg-red-50 rounded-[24px] hover:bg-red-100 transition-all text-xl"
                                    >
                                        <div className="flex items-center gap-3 justify-center">
                                            <LogOut size={24} />
                                            {t('nav.logout')}
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </>
    );
}
