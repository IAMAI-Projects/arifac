'use client';

import Image from 'next/image';
import { useLanguage } from './LanguageContext';

export function LogoMark({ className = "" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <Image
                src="/logo.png"
                alt="ARIFAC Logo"
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
    variant = "light",
}: {
    className?: string;
    variant?: "light" | "dark";
}) {
    return (
        <div className={`flex items-center ${className}`}>
            <div className={`relative w-30 h-22 shrink-0 ${variant === 'dark' ? 'brightness-0 invert' : ''}`}>
                <Image
                    src="/logo.png"
                    alt="ARIFAC Logo"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
        </div>
    );
}
