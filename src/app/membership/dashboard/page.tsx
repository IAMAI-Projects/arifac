'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Building2, 
  Download, 
  ShieldCheck, 
  ExternalLink,
  Award,
  Clock,
  ArrowRight,
  LogOut,
  Mail,
  Phone
} from 'lucide-react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MembershipDashboard() {
  const [memberData, setMemberData] = useState({
    name: "Avanish Singh",
    organisation: "ICICI Bank",
    email: "avanish@example.com",
    mobile: "+91 98765 43210",
    designation: "Compliance Officer",
    membershipId: "ARI-2024-0892",
    memberSince: "March 23, 2026",
    expiryDate: "March 22, 2027",
    status: "Active",
    type: "Industry Member (Pre-approved)"
  });

  useEffect(() => {
    const data = sessionStorage.getItem('membershipPaymentData');
    if (data) {
      const parsed = JSON.parse(data);
      setMemberData(prev => ({
        ...prev,
        name: parsed.fullName || prev.name,
        organisation: parsed.orgName || prev.organisation,
        email: parsed.email || prev.email,
        mobile: `${parsed.countryCode} ${parsed.mobile}` || prev.mobile,
        designation: parsed.designation || prev.designation,
        memberSince: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      }));
    }
  }, []);

  return (
    <main className="bg-[#050505] min-h-screen font-sans text-white overflow-x-hidden">
      <Navbar />

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Welcome Header */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4"
            >
              <ShieldCheck className="w-4 h-4" />
              Verified ARIFAC Member
            </motion.div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                  Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{memberData.name.split(' ')[0]}</span>
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl">
                  Manage your ARIFAC membership, access certificates, and stay updated with the latest AML/CFT standards.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex gap-4"
              >
                <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2 text-sm font-semibold">
                  <ExternalLink className="w-4 h-4" />
                  View Public Profile
                </button>
                <Link href="/login" className="px-6 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-colors flex items-center gap-2 text-sm font-semibold">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-2">{memberData.name}</h2>
                  <p className="text-blue-400 font-medium mb-8">{memberData.designation}</p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Organisation</p>
                        <p className="font-semibold">{memberData.organisation}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Email Address</p>
                        <p className="font-semibold">{memberData.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Mobile Number</p>
                        <p className="font-semibold">{memberData.mobile}</p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group">
                    Edit Profile Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Certificate & Info */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Certificate Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 px-10 relative overflow-hidden group"
              >
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />
                
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                  {/* Certificate Preview Mockup */}
                  <div className="w-full md:w-1/3 aspect-[1.41] bg-white text-black rounded-lg shadow-2xl p-4 flex flex-col items-center justify-center text-center border-4 border-[#c5a059]">
                    <div className="w-12 h-12 bg-[#c5a059]/20 rounded-full flex items-center justify-center mb-3">
                      <Award className="w-6 h-6 text-[#c5a059]" />
                    </div>
                    <div className="text-[8px] font-bold uppercase tracking-widest text-[#c5a059] mb-1">ARIFAC Membership</div>
                    <div className="text-[12px] font-serif font-bold mb-1">{memberData.name}</div>
                    <div className="text-[6px] text-gray-400 mb-2">Has successfully registered as an <br/> Industry Member for the year 2024-25</div>
                    <div className="w-full h-px bg-gray-100 mb-2" />
                    <div className="text-[5px] text-gray-500 uppercase">{memberData.membershipId}</div>
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                        <Award className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold">Membership Certificate</h2>
                    </div>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                      Download your official ARIFAC membership certificate. This document verifies your institution's commitment to AML/CFT standards.
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      <button className="px-8 py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-100 transition-colors flex items-center gap-2">
                        <Download className="w-5 h-5" />
                        Download PDF
                      </button>
                      <button className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2">
                        <ExternalLink className="w-5 h-5" />
                        Verification Link
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Status & Expiry Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Expiry Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                      <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">Renewal & Expiry</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-gray-400">Renewal Progress</span>
                      <span className="text-sm font-bold text-blue-400">365 Days Left</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Registered On</p>
                        <p className="font-semibold text-gray-300">{memberData.memberSince}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Valid Until</p>
                        <p className="font-semibold text-gray-300">{memberData.expiryDate}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Membership Status */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">Account Status</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Current Membership Type</p>
                      <p className="font-semibold text-lg">{memberData.type}</p>
                    </div>
                    
                    <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="font-bold text-green-500">Active Membership</span>
                      </div>
                      <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-md border border-green-500/20">VERIFIED</span>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
