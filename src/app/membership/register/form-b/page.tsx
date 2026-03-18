'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Building2, CheckSquare } from 'lucide-react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSearchParams } from 'next/navigation';

export default function MembershipRegistrationFormB() {
  const searchParams = useSearchParams();
  const prefilledOrg = searchParams.get('org') || '';

  const [formData, setFormData] = useState({
    // Basic Details
    fullName: '',
    designation: '',
    mobile: '',
    email: '',
    orgName: prefilledOrg,
    orgWebsite: '',
    registeredAddress: '',
    isRegulated: '',
    username: '',
    password: '',
    remarks: '',
    declarationAccepted: false
  });

  // Update orgName if searchParams change after initial render
  useEffect(() => {
    if (prefilledOrg && !formData.orgName) {
      setFormData(prev => ({ ...prev, orgName: prefilledOrg }));
    }
  }, [prefilledOrg]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form B Submitted:", formData);
    alert("Application submitted successfully. It will be reviewed by the Secretariat.");
  };

  return (
    <main className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <Navbar />

      <div className="flex-grow pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <br />
          <div className="mb-8">
            <Link href="/membership/register" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Programme Overview
            </Link>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-medium text-sm mb-4">
              Step 2 of 4 (New Organisation)
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Registration Form - B
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-600">
              Please provide the details below. All fields marked with an asterisk (*) are mandatory.
            </motion.p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* 1. Basic Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50/80 px-6 py-5 border-b border-gray-200 flex items-center gap-3">
                <div className="p-2 bg-blue-100/50 rounded-lg text-blue-600">
                  <User className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">1. Basic Details</h2>
              </div>
              <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input required name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="Enter full name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Designation *</label>
                  <input required name="designation" value={formData.designation} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="Enter designation" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile *</label>
                  <input required name="mobile" value={formData.mobile} onChange={handleInputChange} type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="Enter mobile number" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="Enter official email" />
                </div>
              </div>
            </div>

            {/* 2. Organisation Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50/80 px-6 py-5 border-b border-gray-200 flex items-center gap-3">
                <div className="p-2 bg-indigo-100/50 rounded-lg text-indigo-600">
                  <Building2 className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">2. Organisation Details</h2>
              </div>
              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name of Organisation *</label>
                    <input required name="orgName" value={formData.orgName} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="Enter organisation name" />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Registered Office Address *</label>
                    <textarea required name="registeredAddress" value={formData.registeredAddress} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none" placeholder="Enter complete registered address"></textarea>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Organisation Website</label>
                    <input name="orgWebsite" value={formData.orgWebsite} onChange={handleInputChange} type="url" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="https://example.com" />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Are you a Regulated Entity? *</label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="isRegulated" value="Yes" checked={formData.isRegulated === 'Yes'} onChange={handleInputChange} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" required />
                        <span className="text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="isRegulated" value="No" checked={formData.isRegulated === 'No'} onChange={handleInputChange} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" required />
                        <span className="text-gray-700">No</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Account Settings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50/80 px-6 py-5 border-b border-gray-200 flex items-center gap-3">
                <div className="p-2 bg-purple-100/50 rounded-lg text-purple-600">
                  <User className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">3. Account Credentials</h2>
              </div>
              <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Username *</label>
                  <input required name="username" value={formData.username} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="Choose a username" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Password *</label>
                  <input required name="password" value={formData.password} onChange={handleInputChange} type="password" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="Create a strong password" />
                </div>
              </div>
            </div>

            {/* 4. Declaration */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50/80 px-6 py-5 border-b border-gray-200 flex items-center gap-3">
                <div className="p-2 bg-green-100/50 rounded-lg text-green-600">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">4. Declaration</h2>
              </div>
              <div className="p-6 sm:p-8 space-y-6 bg-green-50/30">
                <label className="flex items-start gap-4 cursor-pointer p-4 rounded-xl border border-gray-200 bg-white hover:border-green-300 transition-colors">
                  <div className="pt-1">
                    <input required name="declarationAccepted" checked={formData.declarationAccepted} onChange={handleInputChange} type="checkbox" className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer" />
                  </div>
                  <div className="text-sm text-gray-700 leading-relaxed font-medium">
                    I hereby declare that I am duly authorised to represent the organisation named above and that all information provided in this form is true, accurate, and complete to the best of my knowledge. I consent to ARIFAC collecting, storing, and processing the information submitted herein for the purposes of membership registration and related communications.
                  </div>
                </label>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Remarks (if any)</label>
                  <textarea name="remarks" value={formData.remarks} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none" placeholder="Any additional comments or questions..."></textarea>
                </div>

                <div className="bg-blue-50 rounded-xl p-5 text-blue-800 text-sm border border-blue-100">
                  <strong>Note:</strong> Upon submission, your application will be reviewed by the Secretariat. If approved, credentials will be shared and you will be directed to complete your full organisational profile via the Post-Approval Form.
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="inline-flex items-center justify-center bg-[#0066cc] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#0077ed] hover:shadow-xl hover:shadow-blue-500/20 transition-all transform hover:-translate-y-0.5"
              >
                Submit Form
              </button>
            </div>

          </motion.form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
