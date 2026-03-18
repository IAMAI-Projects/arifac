'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, HelpCircle, Search, User, ShoppingCart, Linkedin } from 'lucide-react';
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
            name: t('nav.events'),
            href: '/meetings',
            dropdown: [
                { name: t('Events & Meetings'), href: '/meetings' },
                { name: t('nav.gallery'), href: '/gallery' },
                { name: t('nav.chapters'), href: '#' },
            ]
        },
        {
            name: t('nav.resources'),
            href: '#',
            dropdown: [
                { name: t('nav.updates'), href: '/regulatory-updates' },
                { name: t('nav.research'), href: '#' },
                { name: t('nav.enterprise'), href: '#' },
                { name: t('nav.tools'), href: '#' },
                { name: t('nav.webinars'), href: '#' },
                { name: t('nav.press'), href: '#' },
                { name: t('nav.insights'), href: '#' },
                { name: t('nav.papers'), href: '#' },
            ]
        },
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
    ];

    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <>
            {/* IAMAI Partnership Top Bar */}
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: isScrolled ? -32 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed top-0 left-0 right-0 z-[60] h-8 bg-[#1d1d1f]/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6"
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
                                "ARIFAC successfully launches the 2025 AML/CFT Certification program.",
                                "New regulatory guidelines for Fintech reporting released for Q1 2025.",
                                "Join our upcoming national level webinar on Virtual Digital Asset (VDA) compliance.",
                                "Developing best practices papers and typology reports for member institutions.",
                                "Collaborative efforts to leverage expertise of the private sector in financial integrity."
                            ].map((headline, i) => (
                                <span key={i} className="text-white/80 text-[11px] font-medium tracking-wide flex items-center gap-3">
                                    <div className="w-1 h-1 rounded-full bg-accent" />
                                    {headline}
                                </span>
                            ))}
                        </motion.div>
                        {/* Fade mask for smooth entry/exit */}
                        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#1d1d1f] to-transparent z-10" />
                        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#1d1d1f] to-transparent z-10" />
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
            </motion.div>

            <nav
                className={`fixed left-0 right-0 z-50 transition-all duration-500 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 ${isScrolled
                    ? 'top-0 py-2 shadow-sm'
                    : 'top-8 py-3'
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-6 shrink-0">
                        <a
                            href="https://fiuindia.gov.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-22 bg-white shrink-0 flex items-center justify-center hover:opacity-90 transition-opacity"
                        >
                            <Image
                                src="/images/fiu-logo.png"
                                alt="FIU-IND"
                                width={100}
                                height={44}
                                className="object-contain h-full w-auto"
                            />
                        </a>
                        <div className="w-px h-10 bg-gray-200 shrink-0" />
                        <Link href="/" className="group flex items-center">
                            <Logo variant="light" className="scale-105 origin-left" />
                        </Link>

                        <div className="w-px h-10 bg-gray-200 shrink-0 ml-2" />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1 flex-1 ml-4 justify-between">
                        <div className="flex items-center">
                            {navLinks.map((link, index) => (
                                <div
                                    key={link.name}
                                    className="relative flex items-center"
                                    onMouseEnter={() => setActiveDropdown(link.name)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <button
                                        className={`relative group px-5 py-1 text-[13px] font-bold tracking-tight transition-colors duration-200 flex items-center gap-1.5 text-[#1d1d1f]/80 hover:text-accent`}
                                    >
                                        {link.name}
                                        <ChevronDown size={12} className={`mt-0.5 opacity-40 transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {activeDropdown === link.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                                                transition={{ duration: 0.18, ease: 'easeOut' }}
                                                className={`absolute top-full left-0 mt-3 bg-white border border-gray-100 rounded-3xl shadow-2xl overflow-hidden z-50 ${link.sections ? 'w-[520px]' : 'w-72'}`}
                                            >
                                                <div className={`p-5 ${link.sections ? 'grid grid-cols-2 gap-8' : 'flex flex-col gap-1'}`}>
                                                    {link.sections ? (
                                                        link.sections.map((section) => (
                                                            <div key={section.title} className="flex flex-col gap-4">
                                                                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] px-3 mb-1">
                                                                    {section.title}
                                                                </h3>
                                                                <div className="flex flex-col gap-1.5">
                                                                    {section.links.map((subItem) => (
                                                                        <Link
                                                                            key={subItem.name}
                                                                            href={subItem.href}
                                                                            className="flex items-center gap-3 px-3 py-3 text-[14px] font-bold text-[#1d1d1f]/70 hover:text-accent hover:bg-[#f5f5f7] rounded-xl transition-all duration-200 group/item"
                                                                        >
                                                                            <span className="w-1 h-4 rounded-full bg-gray-200 group-hover/item:bg-accent transition-colors duration-200" />
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
                                                                className="flex items-center gap-3 px-4 py-3.5 text-[14px] font-bold text-[#1d1d1f]/70 hover:text-accent hover:bg-[#f5f5f7] rounded-xl transition-all duration-200 group/item"
                                                            >
                                                                <span className="w-1 h-4 rounded-full bg-gray-200 group-hover/item:bg-accent transition-colors duration-200" />
                                                                {subItem.name}
                                                            </Link>
                                                        ))
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
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

                        <button
                            className="p-2 relative transition-colors duration-200 text-[#1d1d1f]/60 hover:text-accent"
                        >
                            <ShoppingCart size={20} />
                            <span className="absolute -top-0 -right-0 w-4 h-4 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center">0</span>
                        </button>

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
                                            <a
                                                href="https://arifac.iamai.in/courses"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 px-4 py-3.5 text-[14px] font-bold text-[#1d1d1f]/80 hover:bg-[#f5f5f7] hover:text-accent rounded-xl transition-all"
                                            >
                                                {t('nav.learning_platform')}
                                            </a>
                                            <Link
                                                href="/membership/register"
                                                className="flex items-center gap-3 px-4 py-3.5 text-[14px] font-bold text-[#1d1d1f]/80 hover:bg-[#f5f5f7] hover:text-accent rounded-xl transition-all"
                                            >
                                                {t('nav.member_platform')}
                                            </Link>
                                            <hr className="my-1.5 border-gray-100" />
                                            <Link
                                                href="/"
                                                className="flex items-center gap-3 px-4 py-3.5 text-[14px] font-bold text-[#1d1d1f]/80 hover:bg-[#f5f5f7] hover:text-accent rounded-xl transition-all"
                                            >
                                                {t('nav.team_login')}
                                            </Link>
                                            {getUser() && (
                                                <button
                                                    onClick={() => {
                                                        logout();
                                                        setActiveDropdown(null);
                                                        window.location.href = '/';
                                                    }}
                                                    className="flex items-center gap-3 px-4 py-3.5 text-[14px] font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all text-left w-full"
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
                        className="lg:hidden p-2 transition-colors text-[#1d1d1f]"
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

                        <div className="w-full max-w-3xl flex flex-col gap-10">
                            <div className="space-y-4 text-center">
                                <p className="text-4xl md:text-6xl font-bold text-[#1d1d1f] tracking-tight leading-tight">{t('nav.search_title')}</p>
                            </div>

                            <div className="relative group">
                                <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-accent" size={32} />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder={t('nav.search_placeholder')}
                                    className="w-full bg-[#f5f5f7] border-none rounded-[32px] py-8 pl-24 pr-10 text-3xl text-[#1d1d1f] font-bold placeholder:text-gray-300 focus:outline-none focus:bg-white transition-all shadow-sm focus:shadow-2xl"
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
                                    <p className="text-secondary text-2xl font-bold">No results found for "<span className="text-accent">{searchQuery}</span>"</p>
                                    <p className="text-secondary font-medium mt-4">Try searching for "AML/CFT", "Compliance", or "Membership"</p>
                                </motion.div>
                            )}

                            <div className="flex flex-wrap gap-4 justify-center">
                                <span className="text-secondary text-base font-bold pt-2">{t('nav.search_quick')}:</span>
                                {[t('cert.title'), t('nav.events'), t('member.benefits_title'), t('nav.insights')].map(tag => (
                                    <button key={tag} className="px-8 py-3 rounded-2xl bg-[#f5f5f7] text-[#1d1d1f] text-[15px] font-bold hover:bg-accent hover:text-white transition-all">
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
                        className="fixed inset-x-0 top-0 bottom-0 z-[90] lg:hidden bg-white pt-32 px-8 overflow-y-auto"
                    >
                        <div className="container mx-auto py-8 flex flex-col gap-12">
                            {/* Mobile Search Trigger */}
                            <button
                                onClick={() => {
                                    setIsSearchOpen(true);
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center gap-6 px-8 py-6 bg-[#f5f5f7] rounded-[32px] text-gray-400 hover:bg-gray-100 transition-all text-left group"
                            >
                                <Search size={28} className="text-accent" />
                                <span className="text-xl font-bold">{t('nav.search_placeholder')}</span>
                            </button>

                            {/* Mobile Links */}
                            <div className="flex flex-col gap-10">
                                {navLinks.map((link) => (
                                    <div key={link.name} className="flex flex-col gap-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-[#1d1d1f] tracking-tight">
                                                {link.name}
                                            </span>
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
                                                                    className="text-lg font-bold text-secondary hover:text-accent transition-colors"
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
                                                        className="text-xl font-bold text-secondary hover:text-accent transition-colors"
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

                            <div className="h-px bg-[#f5f5f7] w-full" />

                            <div className="flex flex-col gap-6 pb-20">
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] pl-1">Platform Access</p>
                                <a
                                    href="https://arifac.iamai.in/courses"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-center font-bold text-white px-8 py-6 bg-accent rounded-[24px] shadow-2xl shadow-accent/20 hover:scale-[1.02] transition-all text-xl"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t('nav.learning_platform')}
                                </a>
                                <Link
                                    href="/membership/register"
                                    className="text-center font-bold text-[#1d1d1f] px-8 py-6 bg-white rounded-[24px] border-2 border-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white transition-all text-xl"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t('nav.member_platform')}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </>
    );
}
