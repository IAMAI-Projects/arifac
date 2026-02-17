'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Logo from '@/components/Logo';
import { Download, Printer, Share2 } from 'lucide-react';

export default function CertificatePage() {
    const certificateRef = useRef(null);
    const date = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-6 flex flex-col items-center">

            {/* Actions Bar */}
            <div className="max-w-4xl w-full flex justify-between items-center mb-8 print:hidden">
                <h1 className="text-2xl font-bold text-primary">My Certificates</h1>
                <div className="flex gap-4">
                    <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm text-primary">
                        <Printer className="w-4 h-4" /> Print
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors shadow-lg">
                        <Download className="w-4 h-4" /> Download PDF
                    </button>
                </div>
            </div>

            {/* Certificate Frame */}
            <div className="bg-white p-2 shadow-2xl max-w-[1000px] w-full aspect-[1.414/1] relative print:shadow-none print:w-full">
                <div className="h-full w-full border-[20px] border-double border-primary/10 relative p-12 flex flex-col items-center text-center justify-between bg-[radial-gradient(#f8f8f8_1px,transparent_1px)] bg-[size:20px_20px]">

                    {/* Background Seal */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                        <Logo className="scale-[5]" />
                    </div>

                    {/* Header */}
                    <div className="relative z-10 w-full">
                        <div className="flex justify-between items-start mb-12">
                            <div className="text-left">
                                <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-1">Certificate ID</h2>
                                <p className="font-mono text-sm text-primary">ARIFAC-L1-2024-8839</p>
                            </div>
                            <div className="text-right">
                                <Logo />
                            </div>
                        </div>

                        <h1 className="font-heading text-5xl md:text-6xl font-bold text-primary mb-4 uppercase tracking-tight">
                            Certificate of Competency
                        </h1>
                        <p className="text-xl text-accent font-medium uppercase tracking-widest mb-16">
                            Financial Integrity Architecture
                        </p>

                        <p className="text-lg text-gray-500 italic mb-4">This is to certify that</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-primary border-b border-gray-300 pb-2 inline-block px-12 mb-4 font-serif">
                            S. Avanish
                        </h2>
                        <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-12">IAMAI Member Institution</div>

                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Has successfully demonstrated proficiency in the <strong className="text-primary">Foundations of AML/CFT</strong>, comprehending the private-private partnership model conceptualized under ARIFAC for the Indian financial ecosystem.
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="relative z-10 w-full flex justify-between items-end mt-12">
                        <div className="text-center">
                            <div className="w-48 border-b border-gray-400 mb-2"></div>
                            <p className="text-sm font-bold text-primary uppercase">Director, ARIFAC</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center border-4 border-accent mb-2">
                                <div className="w-20 h-20 border border-dashed border-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-darker text-center p-2 uppercase tracking-tighter">
                                    Official Seal
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-lg font-bold text-primary mb-2">{date}</p>
                            <div className="w-48 border-b border-gray-400 mb-2"></div>
                            <p className="text-sm font-bold text-primary uppercase">Date of Issue</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
