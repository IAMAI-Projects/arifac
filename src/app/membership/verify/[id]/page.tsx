'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ShieldCheck, XCircle, Building2, User, Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function VerificationPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [membership, setMembership] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function verifyMembership() {
      try {
        const res = await fetch(`/api/membership/verify/${id}`);
        const data = await res.json();

        if (data.success) {
          setMembership(data.membership);
        } else {
          setError(data.error || 'Verification failed');
        }
      } catch (err) {
        setError('Connection error. Please try again.');
        console.error('Verification error:', err);
      } finally {
        setLoading(false);
      }
    }

    if (id) verifyMembership();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#050505] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-gray-400">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#050505] min-h-screen font-sans text-white overflow-x-hidden">
      <Navbar />

      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {error ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-3xl p-12 text-center"
            >
              <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-4">Invalid Credential</h1>
              <p className="text-gray-400 mb-8">{error}</p>
              <a href="/" className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold">
                Return to Home
              </a>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-10 relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-3xl opacity-50" />
               
               <div className="relative z-10 text-center mb-10">
                 <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                   <ShieldCheck className="w-12 h-12 text-green-500" />
                 </div>
                 <h1 className="text-3xl font-bold mb-2">Verified ARIFAC Member</h1>
                 <p className="text-gray-400">Official Membership Verification Record</p>
                 <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wider">
                   {membership.status}
                 </div>
               </div>

               <div className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 group">
                        <User className="w-6 h-6 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Member Name</p>
                        <p className="text-lg font-bold">{membership.memberName}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 group">
                        <Building2 className="w-6 h-6 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Organisation</p>
                        <p className="text-lg font-bold">{membership.organisation}</p>
                    </div>
                 </div>

                 <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                            <Award className="w-6 h-6 text-yellow-500" />
                            <h3 className="font-bold">Credential Details</h3>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm py-2 border-b border-white/5">
                            <span className="text-gray-400">Designation</span>
                            <span>{membership.designation}</span>
                        </div>
                        <div className="flex justify-between text-sm py-2 border-b border-white/5">
                            <span className="text-gray-400">Membership ID</span>
                            <span className="font-mono text-blue-400">{membership.membershipId}</span>
                        </div>
                        <div className="flex justify-between text-sm py-2 border-b border-white/5">
                            <span className="text-gray-400">Registration Date</span>
                            <span>{new Date(membership.registeredOn).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                    </div>
                 </div>

                 <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-xl flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <p className="text-xs text-green-500/80 leading-relaxed font-medium">
                      This digital credential is authenticated by ARIFAC and identifies the holder as an authorized Industry Member in good standing.
                    </p>
                 </div>
               </div>

               <div className="mt-12 text-center text-gray-500 text-xs">
                 &copy; {new Date().getFullYear()} ARIFAC. All rights reserved.
               </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
