'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Download, Printer, Loader2, ChevronLeft } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Link from 'next/link';

export default function MembershipCertificatePage() {
    const certificateRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [memberData, setMemberData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                // In a real scenario, we'd fetch the specific user's application.
                // For this page, we'll fetch the current user's membership details.
                const res = await fetch('/api/membership/applications');
                const data = await res.json();

                if (data.success && data.applications && data.applications.length > 0) {
                    const mainApp = data.applications[0];
                    // Using the first 6 characters of UUID for a more human-friendly ID
                    const shortId = mainApp.id.substring(0, 6).toUpperCase();
                    setMemberData({
                        id: mainApp.id,
                        name: mainApp.organisations?.name || "XYZ Bank",
                        membershipId: `ARF-M-26-BNK-${shortId}`,
                        issueDate: "06-April-2026", // As per user request/image
                        validUntil: "For the duration of IBA Membership"
                    });
                } else {
                    // Fallback for demonstration if no data is found
                    setMemberData({
                        name: "XYZ Bank",
                        membershipId: "ARF-M-26-BNK-000145",
                        issueDate: "06-April-2026",
                        validUntil: "For the duration of IBA Membership"
                    });
                }
            } catch (err) {
                console.error("Failed to fetch certificate data:", err);
                setMemberData({
                    name: "XYZ Bank",
                    membershipId: "ARF-M-26-BNK-000145",
                    issueDate: "06-April-2026",
                    validUntil: "For the duration of IBA Membership"
                });
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = async () => {
        if (!certificateRef.current) return;

        try {
            setIsDownloading(true);
            const certificateElement = certificateRef.current;

            const canvas = await html2canvas(certificateElement, {
                scale: 3,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                windowWidth: 1200,
            });

            const imgData = canvas.toDataURL('image/png', 1.0);

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`ARIFAC-Membership-Certificate-${memberData?.name.replace(/\s+/g, '-')}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try using the Print option.');
        } finally {
            setIsDownloading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!memberData) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-2xl font-bold mb-4">No Membership Found</h1>
                <Link href="/membership/dashboard" className="text-blue-600 hover:underline">Return to Dashboard</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-300 py-12 px-6 flex flex-col items-center font-sans print:p-0 print:bg-white transition-all">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@400;600;700&display=swap');
                
                #membership-certificate {
                    font-family: 'Crimson Pro', serif;
                }
                .title-font {
                    font-family: 'Crimson Pro', serif;
                    font-weight: 700;
                    letter-spacing: 0.05em;
                }
                .body-font {
                    font-family: 'Crimson Pro', serif;
                }
                .red-text {
                    color: #c92127;
                }
                @media print {
                    @page {
                        size: A4 portrait;
                        margin: 0;
                    }
                    body {
                        margin: 0;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    .print-hidden {
                        display: none !important;
                    }
                }
            `}</style>

            {/* Actions Bar - Hidden in print */}
            <div className="max-w-[842px] w-full flex justify-between items-center mb-8 print:hidden">
                <Link href="/membership/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors font-bold">
                    <ChevronLeft className="w-4 h-4" /> Back to Dashboard
                </Link>
                <div className="flex gap-4">
                    <button onClick={handlePrint} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 rounded-full text-sm font-bold hover:bg-gray-50 transition-all shadow-sm">
                        <Printer className="w-4 h-4" /> Print Certificate
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#c62828] text-white rounded-full text-sm font-bold hover:bg-[#b71c1c] transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isDownloading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin text-white" /> Generating...
                            </>
                        ) : (
                            <>
                                <Download className="w-4 h-4" /> Download PDF
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Certificate Container (A4 Portrait aspect ratio) */}
            <div
                ref={certificateRef}
                className="bg-white shadow-2xl w-full max-w-[842px] aspect-[210/297] relative overflow-hidden print:shadow-none print:w-full print:max-w-none m-auto"
                id="membership-certificate"
            >
                {/* Background Subtle Watermarks */}
                <div className="absolute top-10 left-10 opacity-[0.05] w-24 h-24 pointer-events-none grayscale">
                    <Image src="/logo.png" alt="" width={100} height={100} />
                </div>
                <div className="absolute top-10 right-10 opacity-[0.05] w-24 h-24 pointer-events-none grayscale">
                    <Image src="/logo.png" alt="" width={100} height={100} />
                </div>

                {/* Top Decorative Waves */}
                <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">
                    <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="w-full h-[140px]">
                        <path d="M0,0 L1000,0 L1000,60 C800,120 400,20 0,80 Z" fill="#b71c1c" />
                        <path d="M0,0 L1000,0 L1000,40 C750,100 350,10 0,60 Z" fill="#d32f2f" />
                    </svg>
                </div>

                {/* Main Content Area */}
                <div className="relative z-20 h-full w-full flex flex-col items-center pt-[120px] pb-[100px] px-[10%] text-center">
                    
                    {/* ARIFAC Logo Section */}
                    <div className="mb-10 flex flex-col items-center">
                        <Image src="/logo.png" alt="ARIFAC Logo" width={280} height={120} className="object-contain" priority />
                    </div>

                    {/* Certificate Title */}
                    <h1 className="text-3xl md:text-[36px] font-bold text-black title-font mb-6 tracking-tight">
                        CERTIFICATE OF MEMBERSHIP
                    </h1>

                    <p className="text-2xl text-gray-800 mb-6 italic leading-relaxed">This is to certify that</p>
                    
                    {/* Member Name */}
                    <div className="w-full mb-2">
                        <h2 className="text-5xl md:text-[68px] font-bold text-[#c62828] py-4 leading-tight">
                            {memberData.name}
                        </h2>
                    </div>

                    {/* Horizontal Separator Line */}
                    <div className="w-full h-[1.5px] bg-black mb-10"></div>
                    
                    {/* Body Text */}
                    <div className="max-w-4xl mx-auto mb-16 text-center">
                        <p className="text-[19px] leading-[1.6] text-gray-950 font-semibold px-4">
                            is a member of <span className="font-bold">The Alliance of Reporting Entities in India for AML/CFT (ARIFAC)</span> and is recognized as part of the industry-led initiative supporting the strengthening of anti-money laundering (AML) and countering the financing of terrorism (CFT) frameworks in India.
                        </p>
                    </div>

                    {/* Membership Details (Left aligned) */}
                    <div className="w-full flex flex-col items-start space-y-2 mb-20 ml-6 text-[18px]">
                        <div className="flex">
                            <span className="font-bold inline-block w-[130px]">Date of Issue:</span>
                            <span className="text-gray-900">{memberData.issueDate}</span>
                        </div>
                        <div className="flex">
                            <span className="font-bold inline-block w-[130px]">Valid Until:</span>
                            <span className="text-gray-900">{memberData.validUntil}</span>
                        </div>
                    </div>

                    {/* Signature Section (Right aligned) */}
                    <div className="w-full flex flex-col items-end pr-6 mb-16">
                        <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900 mb-1">Dr. Subho Ray</p>
                            <p className="text-lg font-bold text-gray-700 leading-tight">President</p>
                            <p className="text-md text-gray-600">Internet and Mobile Association of India</p>
                        </div>
                    </div>

                    {/* Organization Participation Quote */}
                    <div className="w-full px-6 mb-10 mt-auto">
                        <p className="text-[15px] italic text-gray-800 leading-[1.7] max-w-3xl mx-auto">
                            This membership signifies the organisation's participation in ARIFAC for knowledge sharing, capacity building, and advancement of AML/CFT compliance practices in alignment with applicable regulatory frameworks.
                        </p>
                    </div>
                </div>

                {/* Bottom Decorative Waves with Footer Content */}
                <div className="absolute bottom-0 left-0 w-full z-10 pointer-events-none h-[180px]">
                    <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="w-full h-full rotate-180">
                        <path d="M0,0 L1000,0 L1000,80 C800,160 400,40 0,100 Z" fill="#b71c1c" />
                        <path d="M0,0 L1000,0 L1000,60 C750,140 350,30 0,80 Z" fill="#d32f2f" />
                    </svg>
                </div>

                {/* Footer Content (Logo and Membership ID) */}
                <div className="absolute bottom-8 left-0 w-full px-16 z-30 flex justify-between items-end">
                    <div className="pb-2">
                        <Image src="/iamai-logo.png" alt="IAMAI Logo" width={140} height={50} className="object-contain brightness-[100] invert-[0]" />
                    </div>
                    
                    <div className="text-right text-white">
                        <p className="text-[15px] font-bold tracking-wide">Membership ID: {memberData.membershipId}</p>
                        <p className="text-[14px] font-bold tracking-widest uppercase">MUMBAI, INDIA</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
