'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, HelpCircle, Search, User, ShoppingCart } from 'lucide-react';
import Logo from './Logo';
import { getUser, logout } from '@/lib/auth';
import { useLanguage } from './LanguageContext';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const { language: currentLang, setLanguage: setCurrentLang, t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        {
            name: t('nav.certifications'),
            href: '/certifications',
            sections: [
                {
                    title: t('nav.certifications'),
                    links: [
                        { name: t('cert.all'), href: '/certifications' },
                        { name: t('nav.exam'), href: '#' },
                        { name: t('nav.materials'), href: '#' },
                        { name: t('nav.verify'), href: '#' },
                    ]
                },
                {
                    title: t('nav.training'),
                    links: [
                        { name: t('nav.training_leads'), href: '/training-leads' },
                        { name: t('nav.volunteers'), href: '/training-volunteers' },
                        { name: t('nav.topics'), href: '/training-topics' },
                    ]
                }
            ]
        },
        {
            name: t('nav.events'),
            href: '/meetings',
            dropdown: [
                { name: t('nav.events'), href: '/meetings' },
                { name: t('nav.gallery'), href: '/gallery' },
                { name: t('nav.chapters'), href: '#' },
            ]
        },
        {
            name: t('nav.explore'),
            href: '#',
            dropdown: [
                { name: t('nav.about'), href: '/about' },
                { name: t('nav.members'), href: '/members' },
                { name: t('nav.benefits'), href: '/member-benefits' },
                { name: t('nav.partnerships'), href: '#' },
            ]
        },
        {
            name: t('nav.resources'),
            href: '#',
            dropdown: [
                { name: t('nav.updates'), href: '#' },
                { name: t('nav.research'), href: '#' },
                { name: t('nav.enterprise'), href: '#' },
                { name: t('nav.tools'), href: '#' },
                { name: t('nav.webinars'), href: '#' },
                { name: t('nav.press'), href: '#' },
                { name: t('nav.insights'), href: '#' },
                { name: t('nav.papers'), href: '#' },
            ]
        },
    ];

    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <>
            {/* IAMAI Partnership Top Bar */}
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: isScrolled ? -40 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed top-0 left-0 right-0 z-[60] h-10 bg-gray-900 border-b border-white/5 flex items-center justify-between px-6"
            >
                {/* Spacer for centering or left content if needed */}
                <div className="hidden lg:block w-32" />

                <div className="flex items-center gap-3">
                    <span className="text-white/60 group-hover:text-white text-[11px] font-medium transition-colors hidden md:block">
                        {t('nav.top_aegis')}
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
                        {t('nav.top_guidance')}
                    </span>
                </div>

                <div className="flex items-center gap-4">
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
                            <span className="text-[11px] font-bold uppercase tracking-wider">{currentLang}</span>
                            <ChevronDown size={12} className={`transition-transform duration-300 ${isLanguageOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} />
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
                                                        ? 'text-[#4b00d1] bg-gray-50'
                                                        : 'text-gray-600 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {lang.name}
                                                    {currentLang === lang.code && <div className="w-1 h-1 rounded-full bg-[#4b00d1]" />}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>

            <nav
                className={`fixed left-0 right-0 z-50 transition-all duration-500 bg-white/95 backdrop-blur-2xl border-b border-gray-100 ${isScrolled
                    ? 'top-0 py-3 shadow-md'
                    : 'top-10 py-5'
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="group">
                        <Logo variant="light" showBadge={false} />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center">
                        {navLinks.map((link, index) => (
                            <div
                                key={link.name}
                                className="relative flex items-center"
                                onMouseEnter={() => setActiveDropdown(link.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <button
                                    className={`relative group px-4 py-1 text-sm font-semibold transition-colors duration-200 flex items-center gap-1.5 text-gray-700 hover:text-[#4b00d1]`}
                                >
                                    {link.name}
                                    <ChevronDown size={14} className={`mt-0.5 transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180 text-[#c1d82f]' : 'text-gray-400'}`} />
                                    <span className={`absolute bottom-[-8px] left-1/2 -translate-x-1/2 h-0.5 w-0 bg-[#c1d82f] rounded-full transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#c1d82f]`} />
                                </button>

                                <AnimatePresence>
                                    {activeDropdown === link.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                                            transition={{ duration: 0.18, ease: 'easeOut' }}
                                            className={`absolute top-full left-0 mt-3 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden z-50 ${link.sections ? 'w-[520px]' : 'w-64'}`}
                                        >
                                            <div className={`p-4 ${link.sections ? 'grid grid-cols-2 gap-6' : 'flex flex-col gap-1'}`}>
                                                {link.sections ? (
                                                    link.sections.map((section) => (
                                                        <div key={section.title} className="flex flex-col gap-3">
                                                            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] px-2 mb-1">
                                                                {section.title}
                                                            </h3>
                                                            <div className="flex flex-col gap-1">
                                                                {section.links.map((subItem) => (
                                                                    <Link
                                                                        key={subItem.name}
                                                                        href={subItem.href}
                                                                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-[#4b00d1] hover:bg-gray-50 rounded-xl transition-all duration-150 group"
                                                                    >
                                                                        <span className="w-1 h-3 rounded-full bg-gray-200 group-hover:bg-[#4b00d1] transition-colors duration-200" />
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
                                                            className="flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-gray-600 hover:text-[#4b00d1] hover:bg-gray-50 rounded-xl transition-all duration-150 group"
                                                        >
                                                            <span className="w-1 h-4 rounded-full bg-gray-200 group-hover:bg-[#4b00d1] transition-colors duration-200" />
                                                            {subItem.name}
                                                        </Link>
                                                    ))
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                {index < navLinks.length - 1 && (
                                    <span className="w-1 h-1 rounded-full mx-1 bg-gray-200/20" />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Desktop Action Icons */}
                    <div className="hidden lg:flex items-center gap-4">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 transition-colors duration-200 text-gray-700 hover:text-[#4b00d1]"
                        >
                            <Search size={20} />
                        </button>

                        <button
                            className="p-2 relative transition-colors duration-200 text-gray-700 hover:text-[#4b00d1]"
                        >
                            <ShoppingCart size={20} />
                            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#c1d82f] text-[#1a1a1a] text-[10px] font-bold rounded-full flex items-center justify-center">0</span>
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setActiveDropdown(activeDropdown === 'account' ? null : 'account')}
                                className="p-2 transition-colors duration-200 text-gray-700 hover:text-[#4b00d1]"
                            >
                                <User size={20} />
                            </button>

                            <AnimatePresence>
                                {activeDropdown === 'account' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                        className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden z-50 text-left"
                                    >
                                        <div className="p-3 bg-gray-50 border-b border-gray-100">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">{t('nav.platform_access')}</p>
                                        </div>
                                        <div className="p-2 flex flex-col gap-1">
                                            <a
                                                href="https://iamai.edmingle.com/courses"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#4b00d1] rounded-xl transition-all"
                                            >
                                                {t('nav.learning_platform')}
                                            </a>
                                            <Link
                                                href="/join"
                                                className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#4b00d1] rounded-xl transition-all"
                                            >
                                                {t('nav.member_platform')}
                                            </Link>
                                            <hr className="my-1 border-gray-100" />
                                            <Link
                                                href="/"
                                                className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#4b00d1] rounded-xl transition-all"
                                            >
                                                {t('nav.team_login')}
                                            </Link>
                                            {getUser() && (
                                                <button
                                                    onClick={() => {
                                                        logout();
                                                        setActiveDropdown(null); // Close dropdown after logout
                                                        window.location.href = '/'; // Redirect to home
                                                    }}
                                                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all text-left w-full"
                                                >
                                                    {t('nav.logout')}
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 transition-colors text-gray-700 hover:text-[#4b00d1]"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

            </nav>

            {/* Global Overlays */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-white/98 backdrop-blur-3xl flex items-start justify-center pt-32 px-6"
                    >
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 transition-colors"
                        >
                            <X size={32} />
                        </button>

                        <div className="w-full max-w-3xl flex flex-col gap-8">
                            <div className="space-y-2 text-center">
                                {/* <h2 className="text-[#4b00d1] text-sm font-bold uppercase tracking-[0.2em]">{t('nav.about')}</h2> */}
                                <p className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">{t('nav.search_title')}</p>
                            </div>

                            <div className="relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#4b00d1]" size={28} />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder={t('nav.search_placeholder')}
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-3xl py-6 pl-20 pr-8 text-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#4b00d1] focus:bg-white transition-all shadow-sm focus:shadow-md"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {searchQuery && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-12 border-2 border-dashed border-gray-100 rounded-3xl"
                                >
                                    <p className="text-gray-400 text-lg">No results found for "<span className="text-[#4b00d1] font-semibold">{searchQuery}</span>"</p>
                                    <p className="text-sm text-gray-400 mt-2">Try searching for "AML/CFT", "Compliance", or "Membership"</p>
                                </motion.div>
                            )}

                            <div className="flex flex-wrap gap-3 justify-center">
                                <span className="text-gray-400 text-sm font-medium pt-2">{t('nav.search_quick')}:</span>
                                {[t('cert.title'), t('nav.events'), t('member.benefits_title'), t('nav.insights')].map(tag => (
                                    <button key={tag} className="px-5 py-2 rounded-full border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 hover:border-[#4b00d1] hover:text-[#4b00d1] transition-all">
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
                        className="fixed inset-x-0 top-[100px] z-[90] lg:hidden bg-white border-t border-gray-100 shadow-2xl max-h-[80vh] overflow-y-auto"
                    >
                        <div className="container mx-auto px-6 py-8 flex flex-col gap-8">
                            {/* Mobile Search Trigger */}
                            <button
                                onClick={() => {
                                    setIsSearchOpen(true);
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center gap-4 px-5 py-4 bg-gray-50 rounded-2xl text-gray-600 hover:bg-gray-100 transition-all text-left group"
                            >
                                <Search size={22} className="text-[#4b00d1]" />
                                <span className="font-semibold">{t('nav.search_placeholder')}</span>
                            </button>

                            {/* Mobile Links */}
                            <div className="flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <div key={link.name} className="flex flex-col gap-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-[#4b00d1] uppercase tracking-tight">
                                                {link.name}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-4 pl-4 border-l-2 border-gray-100">
                                            {link.sections ? (
                                                link.sections.map((section) => (
                                                    <div key={section.title} className="flex flex-col gap-3">
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{section.title}</p>
                                                        <div className="flex flex-col gap-2">
                                                            {section.links.map((subItem) => (
                                                                <Link
                                                                    key={subItem.name}
                                                                    href={subItem.href}
                                                                    className="text-sm font-medium text-gray-600 hover:text-[#4b00d1] transition-colors py-1"
                                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                                >
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
                                                        className="text-base font-medium text-gray-600 hover:text-[#4b00d1] transition-colors py-1"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="h-px bg-gray-100 w-full" />

                            <div className="flex flex-col gap-4">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Platform Access</p>
                                <a
                                    href="https://iamai.edmingle.com/courses"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-center font-bold text-white px-6 py-4 bg-[#4b00d1] rounded-2xl shadow-lg shadow-[#4b00d1]/10 hover:bg-[#3e00b0] transition-all"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t('nav.learning_platform')}
                                </a>
                                <Link
                                    href="/join"
                                    className="text-center font-bold text-[#1a1a1a] px-6 py-4 bg-[#c1d82f] rounded-2xl shadow-lg shadow-[#c1d82f]/10 hover:bg-white border-2 border-[#c1d82f] transition-all"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t('nav.member_platform')}
                                </Link>

                                {getUser() ? (
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsMobileMenuOpen(false);
                                            window.location.href = '/';
                                        }}
                                        className="text-center font-bold text-red-600 px-6 py-4 bg-red-50 rounded-2xl hover:bg-red-100 transition-all"
                                    >
                                        {t('nav.logout')}
                                    </button>
                                ) : (
                                    <Link
                                        href="/"
                                        className="text-center font-bold text-gray-600 px-6 py-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all border border-gray-200"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {t('nav.team_login')}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
