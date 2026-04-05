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
                    
                    let validity = "Annual Membership";
                    if (mainApp.is_iba_member) {
                        validity = "For the duration of IBA Membership";
                    } else if (mainApp.is_iamai_member) {
                        validity = "For the duration of IAMAI Membership";
                    } else if (mainApp.fee_waived) {
                        validity = "Annual Complimentary Membership";
                    }

                    setMemberData({
                        id: mainApp.id,
                        name: mainApp.organisations?.name || "XYZ Bank",
                        membershipId: `ARF-M-26-BNK-${shortId}`,
                        issueDate: new Date(mainApp.created_at).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        }).replace(/ /g, '-'),
                        validUntil: validity
                    });
                } else {
                    // Fallback for demonstration if no data is found
                    setMemberData({
                        name: "XYZ Bank",
                        membershipId: "ARF-M-26-BNK-000145",
                        issueDate: "06-April-2026",
                        validUntil: "Annual Membership"
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
                {/* Top-Left Angular Red Shape with ARIFAC watermark */}
                <div className="absolute top-0 left-0 z-10 pointer-events-none">
                    <svg width="260" height="220" viewBox="0 0 260 220">
                        <polygon points="0,0 260,0 0,220" fill="#c62828" />
                        <polygon points="0,0 220,0 0,185" fill="#d32f2f" />
                    </svg>
                    {/* Embedded ARIFAC shield watermark */}
                    <div className="absolute top-6 left-5 opacity-30 w-[80px] h-[80px]">
                        <Image src="/logo.png" alt="" width={80} height={80} className="object-contain brightness-200 invert" />
                    </div>
                </div>

                {/* Top-Right Angular Red Shape */}
                <div className="absolute top-0 right-0 z-10 pointer-events-none">
                    <svg width="180" height="140" viewBox="0 0 180 140">
                        <polygon points="180,0 180,140 0,0" fill="#c62828" />
                        <polygon points="180,0 180,110 30,0" fill="#d32f2f" />
                    </svg>
                </div>

                {/* Main Content Area */}
                <div className="relative z-20 h-full w-full flex flex-col items-center pt-[14%] pb-[15%] px-[8%] text-center">

                    {/* ARIFAC Logo Section */}
                    <div className="mb-6 flex flex-col items-center">
                        <Image src="/logo.png" alt="ARIFAC Logo" width={240} height={100} className="object-contain" priority />
                    </div>

                    {/* Certificate Title */}
                    <h1 className="text-3xl md:text-[34px] font-bold text-black title-font mb-4 tracking-tight">
                        CERTIFICATE OF MEMBERSHIP
                    </h1>

                    <p className="text-xl text-gray-700 mb-4 leading-relaxed">This is to certify that</p>

                    {/* Member Name — Blue as per PNG */}
                    <div className="w-full mb-1">
                        <h2 className="text-5xl md:text-[60px] font-bold text-[#1a5276] py-3 leading-tight">
                            {memberData.name}
                        </h2>
                    </div>

                    {/* Horizontal Separator Line */}
                    <div className="w-[85%] h-[2px] bg-[#1a1a1a] mb-6 mx-auto"></div>

                    {/* Body Text */}
                    <div className="max-w-[90%] mx-auto mb-8 text-center">
                        <p className="text-[16px] leading-[1.65] text-gray-900 px-2">
                            is a member of <span className="font-bold">The Alliance of Reporting Entities in India for AML/CFT (ARIFAC)</span>{'\n'}and is recognized as part of the industry-led initiative supporting the strengthening of anti-money laundering (AML) and countering the financing of terrorism (CFT) frameworks in India.
                        </p>
                    </div>

                    {/* Membership Details & Signature — side by side */}
                    <div className="w-full flex justify-between items-start px-2 mb-6">
                        {/* Left: Date details */}
                        <div className="flex flex-col items-start space-y-1.5 text-[16px]">
                            <div className="flex">
                                <span className="font-bold inline-block w-[130px]">Date of Issue:</span>
                                <span className="text-gray-900">{memberData.issueDate}</span>
                            </div>
                            <div className="flex">
                                <span className="font-bold inline-block w-[130px]">Valid Until:</span>
                                <span className="text-gray-900">{memberData.validUntil}</span>
                            </div>
                        </div>

                        {/* Right: Signature */}
                        <div className="text-right">
                            <p className="text-xl font-bold text-gray-900 mb-0.5">Dr. Subho Ray</p>
                            <p className="text-base text-gray-700 leading-tight">President</p>
                            <p className="text-sm text-gray-600">Internet and Mobile Association of India</p>
                        </div>
                    </div>

                    {/* Organization Participation Quote */}
                    <div className="w-full px-4 mt-auto mb-12">
                        <p className="text-[13px] italic text-gray-700 leading-[1.7] max-w-3xl mx-auto">
                            This membership signifies the organisation&apos;s participation in ARIFAC for knowledge sharing, capacity building, and advancement of AML/CFT compliance practices in alignment with applicable regulatory frameworks.
                        </p>
                    </div>
                </div>

                {/* Bottom Decorative Waves */}
                <div className="absolute bottom-0 left-0 w-full z-10 pointer-events-none h-[160px]">
                    <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="w-full h-full">
                        <path d="M0,200 L0,120 C150,60 350,160 500,100 C650,40 800,120 1000,80 L1000,200 Z" fill="#d32f2f" />
                        <path d="M0,200 L0,140 C200,80 400,180 600,120 C750,80 850,140 1000,100 L1000,200 Z" fill="#c62828" />
                        <path d="M0,200 L0,165 C100,130 300,190 500,155 C700,120 850,170 1000,140 L1000,200 Z" fill="#b71c1c" />
                    </svg>
                </div>

                {/* Footer Content (Logo and Membership ID) */}
                <div className="absolute bottom-5 left-0 w-full px-12 z-30 flex justify-between items-end">
                    <div className="pb-1">
                        <Image 
                            src="/iamai-transparent.png" 
                            alt="IAMAI Logo" 
                            width={120} 
                            height={45} 
                            className="object-contain" 
                        />
                    </div>

                    <div className="text-right text-white">
                        <p className="text-[14px] font-bold tracking-wide">Membership ID: {memberData.membershipId}</p>
                        <p className="text-[13px] font-bold tracking-widest uppercase">Mumbai, India</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
