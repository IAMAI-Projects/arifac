'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from './Logo';
import { useLanguage } from './LanguageContext';

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
            title: t('nav.certifications'),
            links: [
                { name: 'Exam Framework', href: '#' },
                { name: 'Study Materials', href: '#' },
                { name: 'Continuing Education', href: '#' },
                { name: 'Verify a Certificate', href: '#' },
            ],
        },
        {
            title: 'Membership',
            links: [
                { name: 'Member Directory', href: '/members' },
                { name: 'Benefits', href: '#' },
                { name: 'Fee Structure', href: '#' },
                { name: 'Join Now', href: '/join' },
            ],
        },
        {
            title: t('nav.resources'),
            links: [
                { name: 'Regulatory Updates', href: '#' },
                { name: 'Research & Reports', href: '#' },
                { name: 'Webinars', href: '#' },
                { name: 'Press Room', href: '#' },
            ],
        },
    ];

    return (
        <footer className="bg-primary pt-20 pb-10 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
                    <div className="lg:col-span-2">
                        <Logo className="mb-6" variant="dark" />
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            {t('footer.desc')}
                        </p>
                    </div>

                    {footerLinks.map((column, index) => (
                        <div key={index}>
                            <h4 className="text-white font-bold mb-6">{column.title}</h4>
                            <ul className="space-y-3">
                                {column.links.map((link, idx) => (
                                    <li key={idx}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-400 hover:text-accent transition-colors block"
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
                <div className="mb-10 p-6 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm flex flex-col sm:flex-row items-center gap-6 justify-between">
                    <div className="flex items-center gap-4">

                        <a
                            href="https://iamai.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 hover:opacity-80 transition-opacity"
                            title="Internet And Mobile Association of India"
                        >
                            <div className="relative w-40 h-22 bg-white rounded-xl overflow-hidden shadow-md p-1.5 transition-transform group-hover:scale-105">
                                <Image
                                    src="/iamai-logo.png"
                                    alt="IAMAI - Internet And Mobile Association of India"
                                    fill
                                    className="object-contain p-1"
                                />
                            </div>
                            <div className="hidden md:flex flex-col">
                                <span className="text-gray-400 text-[15px] font-medium">{t('footer.iamai_aegis')}</span>
                                <span className="text-gray-400 text-[15px] font-medium">{t('footer.iamai_full')}</span>
                            </div>
                        </a>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed text-center sm:text-right max-w-xs">
                        {t('footer.iamai_desc')}
                    </p>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} ARIFAC | IAMAI. {t('footer.rights')}
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
                            {t('footer.privacy')}
                        </Link>
                        <Link href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
                            {t('footer.terms')}
                        </Link>
                        <Link href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
                            {t('footer.cookie')}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
