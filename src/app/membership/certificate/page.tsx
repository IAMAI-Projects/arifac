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
                        membershipId: mainApp.memberships?.membership_id_ref || `ARF-M-26-BNK-${mainApp.id.substring(0, 6).toUpperCase()}`,
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
                        name: "",
                        membershipId: "",
                        issueDate: "",
                        validUntil: ""
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
                scale: 1.5, // Reduced for better stability while maintaining quality
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                onclone: (clonedDoc) => {
                    try {
                        // More robust way to clean up modern CSS color functions from style tags
                        const styleTags = Array.from(clonedDoc.getElementsByTagName('style'));
                        styleTags.forEach(style => {
                            if (style.textContent && (style.textContent.includes('lab(') || style.textContent.includes('oklch('))) {
                                style.textContent = style.textContent
                                    .replace(/lab\([^)]*\)/g, 'rgb(0,0,0)')
                                    .replace(/oklch\([^)]*\)/g, 'rgb(0,0,0)');
                            }
                        });
                        
                        // Clean up inline styles
                        const elements = Array.from(clonedDoc.querySelectorAll('[style]'));
                        elements.forEach(el => {
                            const styleAttr = (el as HTMLElement).getAttribute('style');
                            if (styleAttr && (styleAttr.includes('lab(') || styleAttr.includes('oklch('))) {
                                (el as HTMLElement).setAttribute('style', styleAttr
                                    .replace(/lab\([^)]*\)/g, 'rgb(0,0,0)')
                                    .replace(/oklch\([^)]*\)/g, 'rgb(0,0,0)')
                                );
                            }
                        });
                    } catch (e) {
                        console.error('onclone cleanup failed:', e);
                    }
                }
            });

            // Use JPEG for optimal compression and size
            const imgData = canvas.toDataURL('image/jpeg', 0.9);

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
                compress: true
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Add image with explicit size and compression
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
            
            // Generate a clean filename and ensure .pdf extension
            const rawName = memberData?.name || 'Certificate';
            const cleanName = rawName.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-').substring(0, 30);
            pdf.save(`ARIFAC-Membership-Certificate-${cleanName || 'ARIFAC'}.pdf`);
        } catch (error: any) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Error: ' + (error.message || 'Unknown error'));
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
                {/* Full-width Curved Header Banner */}
                <div className="absolute top-0 left-0 w-full h-[140px] z-10 pointer-events-none">
                    <svg viewBox="0 0 842 140" preserveAspectRatio="none" className="w-full h-full">
                        {/* Main Red Banner with Curve */}
                        <path d="M0,0 L842,0 L842,100 C700,130 142,130 0,100 Z" fill="#c62828" />
                        {/* Dark Red Accent Line */}
                        <path d="M0,100 C142,130 700,130 842,100 L842,110 C700,140 142,140 0,110 Z" fill="#8e1c1c" />
                    </svg>

                    {/* Logo Watermarks in Header */}
                    <div className="absolute top-0 left-0 w-full h-full px-10 flex justify-between items-center pb-8">
                        {/* Left: ARIFAC Logo Watermark */}
                        <div className="opacity-20 flex flex-col items-start translate-y-[-10px]">
                            <div className="w-[60px] h-[60px] relative">
                                <Image src="/logo.png" alt="" fill className="object-contain brightness-200 invert" />
                            </div>
                            <span className="text-white text-[10px] font-bold tracking-[0.2em] mt-1 ml-1 uppercase">ARIFAC</span>
                        </div>

                        {/* Right: Triple-Wing Decorative Logo */}
                        <div className="opacity-30 translate-y-[-10px]">
                            <svg width="70" height="70" viewBox="0 0 100 100" fill="none">
                                <path d="M90 20 C70 20 50 40 40 80 M80 30 C65 30 50 45 45 75 M70 40 C60 40 50 50 48 65" stroke="white" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
                                <path d="M90 20 C75 25 65 35 60 50 M80 30 C70 35 65 40 62 50 M70 40 C65 42 62 45 61 50" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="relative z-20 h-full w-full flex flex-col items-center pt-[18%] pb-[15%] px-[8%] text-center">

                    {/* ARIFAC Logo Section (Positioned below the new header banner) */}
                    <div className="mb-8 flex flex-col items-center">
                        <Image src="/logo.png" alt="ARIFAC Logo" width={220} height={90} className="object-contain" priority />
                    </div>

                    {/* Certificate Title */}
                    <h1 className="text-3xl md:text-[34px] font-bold text-black title-font mb-4 tracking-tight">
                        CERTIFICATE OF MEMBERSHIP
                    </h1>

                    <p className="text-xl text-[#374151] mb-4 leading-relaxed">This is to certify that</p>

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
                        <p className="text-[16px] leading-[1.65] text-[#111827] px-2">
                            is a member of <span className="font-bold">The Alliance of Reporting Entities in India for AML/CFT (ARIFAC)</span>{'\n'}and is recognized as part of the industry-led initiative supporting the strengthening of anti-money laundering (AML) and countering the financing of terrorism (CFT) frameworks in India.
                        </p>
                    </div>

                    {/* Membership Details & Signature — side by side */}
                    <div className="w-full flex justify-between items-start px-2 mb-6">
                        {/* Left: Date details */}
                        <div className="flex flex-col items-start space-y-1.5 text-[16px]">
                            <div className="flex">
                                <span className="font-bold inline-block w-[130px]">Date of Issue:</span>
                                <span className="text-[#111827]">{memberData.issueDate}</span>
                            </div>
                            <div className="flex">
                                <span className="font-bold inline-block w-[130px]">Valid Until:</span>
                                <span className="text-[#111827]">{memberData.validUntil}</span>
                            </div>
                        </div>

                        {/* Right: Signature */}
                        <div className="text-right">
                            <p className="text-xl font-bold text-[#111827] mb-0.5">Dr. Subho Ray</p>
                            <p className="text-base text-[#374151] leading-tight">President</p>
                            <p className="text-sm text-[#4b5563]">Internet and Mobile Association of India</p>
                        </div>
                    </div>

                    {/* Organization Participation Quote */}
                    <div className="w-full px-4 mt-auto mb-12">
                        <p className="text-[13px] italic text-[#374151] leading-[1.7] max-w-3xl mx-auto">
                            This membership signifies the organisation&apos;s participation in ARIFAC for knowledge sharing, capacity building, and advancement of AML/CFT compliance practices in alignment with applicable regulatory frameworks.
                        </p>
                    </div>
                </div>

                {/* Bottom Decorative Curved Banner */}
                <div className="absolute bottom-0 left-0 w-full h-[120px] z-10 pointer-events-none">
                    <svg viewBox="0 0 842 120" preserveAspectRatio="none" className="w-full h-full">
                        {/* Dark Red Accent Line (Top) */}
                        <path d="M0,30 C142,0 700,0 842,30 L842,20 C700,-10 142,-10 0,20 Z" fill="#8e1c1c" />
                        {/* Main Red Banner with Curve */}
                        <path d="M0,30 C142,0 700,0 842,30 L842,120 L0,120 Z" fill="#c62828" />
                    </svg>
                </div>

                {/* Footer Content (Logo and Membership ID) */}
                <div className="absolute bottom-6 left-0 w-full px-12 z-30 flex justify-between items-end text-white">


                    <div className="pb-1">
                        <Image
                            src="/iamai-transparent.png"
                            alt="IAMAI Logo"
                            width={110}
                            height={40}
                            className="object-contain"
                        />
                    </div>

                    <div className="text-left">
                        <p className="text-[13px] font-bold tracking-wide opacity-90">Membership ID: {memberData.membershipId}</p>
                        <p className="text-[11px] font-bold tracking-[0.2em] uppercase opacity-80">Mumbai, India</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
