'use client';

import Image from 'next/image';

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

export default function Logo({ className = "", textClassName = "" }: { className?: string, textClassName?: string }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className="w-10 h-10 shrink-0 relative">
                <Image
                    src="/logo.png"
                    alt="ARIFAC Logo"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
            <div className={`flex flex-col ${textClassName}`}>
                <span className="font-heading font-bold text-lg leading-none tracking-tight text-primary">ARIFAC</span>
                <span className="text-[0.6rem] uppercase tracking-widest text-gray-500 font-medium whitespace-nowrap">Alliance of Reporting Entities</span>
            </div>
        </div>
    );
}
