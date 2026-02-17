import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
    const footerLinks: { title: string; links: { name: string; href: string }[] }[] = [
        {
            title: 'About ARIFAC',
            links: [
                { name: 'Mission & Governance', href: '#' },
                { name: 'Leadership', href: '#' },
                { name: 'Contact Us', href: '#' },
                { name: 'Careers', href: '#' },
            ],
        },
        {
            title: 'Certification',
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
                { name: 'Member Directory', href: '#' },
                { name: 'Benefits', href: '#' },
                { name: 'Fee Structure', href: '#' },
                { name: 'Join Now', href: '#' },
            ],
        },
        {
            title: 'Resources',
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
                        <Logo className="mb-6" />
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            Empowering India’s financial ecosystem through unified compliance standards, expert certification, and strategic regulatory dialogue.
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

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} ARIFAC. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
                            Terms of Use
                        </Link>
                        <Link href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
