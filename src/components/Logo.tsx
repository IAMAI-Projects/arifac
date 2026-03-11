'use client';

import Image from 'next/image';
import { useLanguage } from './LanguageContext';

export function LogoMark({ className = "" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <Image
                src="/logo.png"
                alt="ARIFAC Logo Mark"
                fill
                className="object-contain"
                priority
            />
        </div>
    );
}

/**
 * Full ARIFAC logo.
 * - "ARIFAC"                          → always black (#111827)
 * - "Building Partnerships in AML/CFT" → always brand blue (#3a7ca5)
 *
 * variant="light"  → light/white backgrounds (header)
 * variant="dark"   → dark backgrounds (footer)
 */
export default function Logo({
    className = "",
    textClassName = "",
    variant = "light",
    showBadge = false,
}: {
    className?: string;
    textClassName?: string;
    variant?: "light" | "dark";
    showBadge?: boolean;
}) {
    const { t } = useLanguage();
    const nameColor = variant === "dark" ? "text-white" : "text-[#111827]";
    const subColor = variant === "dark" ? "text-[#0066cc]/80" : "text-[#0066cc]";

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className={`w-10 h-10 shrink-0 relative ${variant === 'dark' ? 'bg-white/10 ring-1 ring-white/20' : 'bg-white shadow-sm'} rounded-lg p-1`}>
                <Image
                    src="/logo.png"
                    alt="ARIFAC Logo"
                    fill
                    className="object-contain p-0.5"
                    priority
                />
            </div>
            <div className={`flex flex-col ${textClassName}`}>
                <span className={`font-heading font-bold text-lg leading-none tracking-tight ${nameColor}`}>
                    ARIFAC
                </span>
                <span className={`text-[0.6rem] uppercase tracking-widest font-semibold whitespace-nowrap ${subColor} mt-0.5`}>
                    {t('logo.tagline')}
                </span>
                {showBadge && (
                    <div className="mt-1.5">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-accent/20 border border-accent/30 text-accent text-[0.55rem] font-bold tracking-widest uppercase">
                            {t('logo.badge')}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
