'use client';

import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { Search, Filter, Mail, Globe, MapPin } from 'lucide-react';

const membersData = [
    "1Pay Mobileware Private Limited", "Abhibha Technologies Private Limited", "Adyen India Tech Hub Private Limited",
    "Airpay Payment Services Private Limited", "Airtel Payments Bank", "Ajcon Edufin Private Limited",
    "Ajcon Global Services Limited", "Amazon Pay India Private Limited", "American Express Banking Corporation",
    "Angelic Infotech Pvt Ltd", "ANQ Digital Finserv", "Axis Bank Limited", "Axis Securities Limited",
    "Bajaj Finserv", "Balancehero India Private Limited", "Bandhan Bank Ltd.", "Bank of America",
    "Bank of Baroda", "Bank of China India Branch", "Bank of India", "Bank of Maharashtra",
    "Barclays Bank PLC", "Bharat Co operative Bank (Mumbai) Ltd.", "Bitcipher Labs LLP", "BNP Paribas",
    "Canara Bank", "Canara HSBC Life Insurance Company Limited", "Capstocks and Securities India Pvt Ltd",
    "Cashfree", "CCAvenue", "Central Bank of India", "Chatterjee & Tripathi Consultancy Private Limited",
    "Citibank", "City Union Bank", "CoinSwitch - Bitcipher Labs", "Computer Age Management Services Ltd",
    "Cosmos Cooperative Bank", "CSB Bank Ltd", "Cushman Wakefield", "DBS Bank", "DCB Bank",
    "Deutsche Bank", "Dhanlaxmi Bank Limited", "Digiotech Solutions Private Limited",
    "Dow Jones Consulting India Pvt Limited", "Dreamplug PayTech Solutions Private Limited",
    "E Meditek Global Pvt Ltd", "Easebuzz Private Limited", "Emirates NBD Bank (P.J.S.C)",
    "Equitas Small Finance Bank", "Excelium Technologies Pvt Ltd", "Federal Bank Ltd",
    "Facctum IT Solutions India Pvt Ltd", "Fincare Small Finance Bank", "Fincrypt LLP",
    "Finlogic Technologies India Private Limited", "Fino Payments Bank Limited",
    "Fintelekt Advisory Services Private Limited", "Fios Compliance Private Limited",
    "FirstRand Bank", "Freecharge Payment Technologies Private Limited", "Fullerton India",
    "Futuretek Commerce Pvt Ltd", "Giottus Technologies Pvt Ltd", "Global Payments Asia Pacific Pvt Ltd",
    "Gobrisk Technologies Pvt Ltd", "Google India Digital Services Private Limited",
    "GP Parsik Sahakari Bank Ltd", "HDFC Asset Management Co Ltd.", "HDFC Bank Ltd",
    "HDFC Mutual Fund", "Hiveloop Internet Private Limited", "HSBC Bank", "ICICI Bank",
    "IDBI Bank Ltd", "IDFC First Bank Ltd", "Indiaforensic Center of Studies",
    "IndiaIdeas.com Limited (BillDesk)", "Indian Overseas Bank", "IndusInd Bank",
    "Infibeam Avenues Limited", "Innoviti Technologies Private Limited", "Ixsight Technologies Private Limited",
    "Jalgaon Janata Sahakari Bank", "Jammu & Kashmir Bank", "Jana Small Finance Bank Ltd",
    "Jio Financial Services Ltd", "Jio Payments Bank Ltd", "Jio Finance Ltd", "JLL",
    "JP Morgan Chase Bank", "Karad Urban Co-Operative Bank", "Karnataka Bank Ltd",
    "Karur Vysya Bank Ltd", "Kotak Mahindra Bank Ltd", "Letzpay Solution Pvt Ltd",
    "LexisNexis Risk Solutions Inc", "London Stock Exchange Group (World-Check)",
    "Lightningnodes Technologies Pvt Ltd", "LivQuik Technology (India) Private Limited",
    "Lyra Network Private Limited", "Mahanagar Cooperative Bank Ltd", "Mashreq Bank PSC",
    "Mindless Pandora Tech Solutions Private Limited", "Mizuho Bank", "MUFG", "Nainital Bank",
    "Neblio Technologies P Ltd", "New India Cooperative Bank Ltd", "Nextgendev Solutions Pvt. Ltd",
    "NKGSB Co-op. Bank Ltd", "Nomura Fixed Income Securities Private Limited (NFIS)",
    "Nomura Capital (India) Private Limited (NCIPL)", "NPCI", "NSDL Database Management Ltd",
    "NSE", "NTT Data Payment Services India Ltd", "Ola Financial Services Pvt Ltd",
    "One Mobikwik Systems Limited", "One97 Communications", "Paygate India Private Limited",
    "Paymate India Ltd", "Payments Council of India", "Paypal Payments Pvt Ltd", "Payglocal",
    "Payoneer India Private Limited", "Paysharp Private Limited", "PayTM Payments Bank",
    "PayU Payments Private Limited", "Phi Commerce Private Limited", "PhonePe Private Limited",
    "PhonePe Insurance Broking Services Private Limited", "PhonePe Wealth Broking Private Limited",
    "Punjab National Bank", "Rabobank", "Razorpay Software Private Limited", "RBL Bank Ltd",
    "Reliance Payment Solutions Limited", "Quantum Data Engines India Private Limited",
    "SabPaisa", "Saraswat Bank", "SBI Life Insurance", "SBM Bank", "Scotiabank, India",
    "South Indian Bank Ltd", "SRS Live Technologies Pvt Ltd", "Standard Chartered Bank",
    "State Bank of India", "Stripe India Private Limited", "Suncrypto", "Suryoday Small Finance Bank Ltd",
    "Tapits Technologies Private Limited", "Tata AIG Life", "The Kalupur Commercial Co Op Bank Limited",
    "Transak Technology India Pvt Ltd", "Tri O Tech Solutions Private Limited",
    "Tyche Payment Solutions Private Limited", "UBS AG, India", "UBS Securities India Private Limited",
    "UCO Bank", "Ujjivan Small Finance Bank", "Unimoni Enterprise Solutions Pvt Ltd",
    "Unimoni Financial Services Ltd", "Union Bank of India Ltd", "Unocoin Technologies Pvt Ltd",
    "WazirX - Zanmai Labs Pvt Ltd", "Western Union Services India Pvt. Ltd.",
    "Worldline ePayments India Private Limited", "Wunderbaked Technologies Private Limited",
    "Xsilica Software Solutions Private Limited", "Yes Bank", "Zaak Epayment Services Private Limited",
    "Zebpay - Awlencan Innovations", "Zerodha Broking Limited", "ZIGRAM"
].sort();

export default function MembersPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMembers = membersData.filter(member =>
        member.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />

            <div className="flex-1 pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-bold text-primary mb-4">Our Members</h1>
                            <p className="text-gray-600">Representing over {membersData.length} leading organizations in the ecosystem.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search organizations..."
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent w-full md:w-80 bg-white"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredMembers.map((name, idx) => (
                            <motion.div
                                key={name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.min((idx % 20) * 0.02, 0.4) }}
                                className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
                            >
                                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent shrink-0 font-bold text-sm">
                                    {name.charAt(0).match(/[0-9]/) ? '#' : name.charAt(0)}
                                </div>
                                <h3 className="text-sm font-bold text-primary line-clamp-2 leading-snug">{name}</h3>
                            </motion.div>
                        ))}
                    </div>

                    {filteredMembers.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-400">No organizations found matching "{searchQuery}"</p>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}
