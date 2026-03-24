'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from './Logo';
import { useLanguage } from './LanguageContext';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
    const { t } = useLanguage();
    const footerLinks: { title: string; links: { name: string; href: string }[] }[] = [
        {
            title: t('nav.explore'),
            links: [
                { name: t('nav.events'), href: '/meetings' },
                { name: 'Sectoral Nodal Officers', href: '/sectoral-nodal-officers' },
                { name: 'Training Leads', href: '/training-leads' },
                { name: 'Contact Us', href: '/contact' },
            ],
        },
        {
            title: 'Membership',
            links: [
                { name: 'Member Directory', href: '/members' },
            ],
        },
        {
            title: t('Others'),
            links: [
                { name: 'Resources', href: '/resources' },
                { name: 'Gallery', href: '/gallery' },
                { name: 'Terms & Conditions', href: '#' },
                { name: 'Privacy Policy', href: '#' },

            ],
        },
    ];

    return (
        <footer className="bg-[#f5f5f7] pt-20 pb-10 border-t border-gray-200">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
                    <div className="lg:col-span-2">
                        <Logo className="mb-1" variant="light" />
                        <p className="text-secondary text-[13px] leading-relaxed max-w-sm">
                            {t('footer.desc')}
                        </p>
                        <div className="flex items-center gap-4 mt-8">
                            {[
                                { icon: Linkedin, href: "https://www.linkedin.com/company/arifacpanindia/", label: "LinkedIn" },
                                { icon: Twitter, href: "/", label: "X" },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white hover:border-[#1d1d1f] transition-all duration-300 shadow-sm group"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {footerLinks.map((column, index) => (
                        <div key={index}>
                            <h4 className="text-[#1d1d1f] text-[12px] font-bold mb-4 uppercase tracking-wider">{column.title}</h4>
                            <ul className="space-y-2">
                                {column.links.map((link, idx) => (
                                    <li key={idx}>
                                        <Link
                                            href={link.href}
                                            className="text-[12px] text-secondary hover:text-[#1d1d1f] transition-colors block"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* IAMAI Technology Partner Strip */}
                <div className="mb-10 p-4 rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm flex flex-col sm:flex-row items-center gap-6 justify-between">
                    <div className="flex items-center gap-4">
                        <a
                            href="https://iamai.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 hover:opacity-80 transition-opacity"
                        >
                            <div className="relative w-24 h-15 bg-white border border-gray-100 rounded-lg overflow-hidden p-1 shadow-sm">
                                <Image
                                    src="/iamai-logo.png"
                                    alt="IAMAI"
                                    fill
                                    className="object-contain p-1"
                                />
                            </div>
                            <div className="hidden md:flex flex-col">
                                <span className="text-[#1d1d1f] text-[12px] font-semibold">{t('footer.iamai_aegis')}</span>
                                <span className="text-secondary text-[11px]">{t('footer.iamai_full')}</span>
                            </div>
                        </a>
                    </div>
                    <p className="text-secondary text-[11px] leading-relaxed text-center sm:text-right max-w-xs">
                        {t('footer.iamai_desc')}
                    </p>
                </div>

                <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[11px] text-secondary">
                        © {new Date().getFullYear()} ARIFAC | IAMAI. {t('footer.rights')}
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="text-[11px] text-secondary hover:text-[#1d1d1f] transition-colors">
                            {t('footer.privacy')}
                        </Link>
                        <Link href="#" className="text-[11px] text-secondary hover:text-[#1d1d1f] transition-colors">
                            {t('footer.terms')}
                        </Link>
                        <Link href="#" className="text-[11px] text-secondary hover:text-[#1d1d1f] transition-colors">
                            {t('footer.cookie')}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
