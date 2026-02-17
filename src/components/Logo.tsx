import { Shield } from 'lucide-react';

export default function Logo({ className = "", textClassName = "" }: { className?: string, textClassName?: string }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className="relative">
                <Shield className="w-8 h-8 text-primary fill-accent/20 stroke-[1.5]" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1 h-3 bg-accent/80 rounded-full"></div>
                </div>
            </div>
            <div className={`flex flex-col ${textClassName}`}>
                <span className="font-heading font-bold text-lg leading-none tracking-tight text-primary">ARIFAC</span>
                <span className="text-[0.6rem] uppercase tracking-widest text-gray-500">Alliance of Reporting Entities</span>
            </div>
        </div>
    );
}
