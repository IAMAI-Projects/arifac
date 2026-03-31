'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Building2, CheckSquare, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSearchParams } from 'next/navigation';

function RegistrationFormBContent() {
  const searchParams = useSearchParams();
  const prefilledOrg = searchParams.get('org') || '';

  const [formData, setFormData] = useState({
    // Basic Details
    salutation: '',
    fullName: '',
    designation: '',
    mobile: '',
    countryCode: '+91',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSubmitted) return;
    setIsSubmitting(true);
    setError(null);

    try {
      // Map formData to new payload structure
      const payload = {
        email: formData.email.trim(),
        name: formData.fullName.trim(),
        organisationName: formData.orgName.trim(),
        details: {
          ...formData, // Store everything as JSON in details
          submittedAt: new Date().toISOString()
        }
      };

      const response = await fetch('/api/membership/form-b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      setIsSubmitted(true);
      // Optional: No redirect yet, show success popup
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex-grow pt-32 pb-20 px-4 sm:px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-3xl shadow-2xl border border-blue-50 max-w-lg text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckSquare size={40} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Submission Successful!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your Form has been submitted successfully and is under review. You will be notified once approved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[#0066cc] text-white px-8 py-3 rounded-full font-bold hover:bg-[#0077ed] transition-all"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
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
            Registration Form
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
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
          {/* 1. Basic Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50/80 px-6 py-5 border-b border-gray-200 flex items-center gap-3">
              <div className="p-2 bg-blue-100/50 rounded-lg text-blue-600">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">1. Basic Details</h2>
            </div>
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-6 gap-6">
              <div className="col-span-1 md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Salutation *</label>
                <select required name="salutation" value={formData.salutation} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white">
                  <option value="" disabled>Select</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Dr.">Dr.</option>
                  <option value="Prof.">Prof.</option>
                </select>
              </div>
              <div className="col-span-1 md:col-span-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input required name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="Enter full name" />
              </div>
              <div className="col-span-1 md:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Designation *</label>
                <input required name="designation" value={formData.designation} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="Enter designation" />
              </div>
              <div className="col-span-1 md:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                <div className="flex gap-2">
                  <select name="countryCode" value={formData.countryCode} onChange={handleInputChange} className="w-[100px] px-3 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-sm">
                    <option value="+91">+91 (IN)</option>
                    <option value="+1">+1 (US)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+971">+971 (UAE)</option>
                    <option value="+65">+65 (SG)</option>
                    <option value="+61">+61 (AU)</option>
                  </select>
                  <input required name="mobile" value={formData.mobile} onChange={handleInputChange} type="tel" className="flex-grow px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="Enter number" />
                </div>
              </div>
              <div className="col-span-1 md:col-span-6">
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
                  <input required name="orgName" value={formData.orgName} onChange={handleInputChange} readOnly={!!prefilledOrg} type="text" className={`w-full px-4 py-3 rounded-xl border border-gray-300 transition-all ${!!prefilledOrg ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200' : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}`} placeholder="Enter organisation name" />
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
              disabled={isSubmitting}
              className={`inline-flex items-center justify-center bg-[#0066cc] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#0077ed] hover:shadow-xl hover:shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Submitting...
                </>
              ) : (
                'Submit Form'
              )}
            </button>
          </div>

        </motion.form>
      </div>
    </div>
  );
}

export default function MembershipRegistrationFormB() {
  return (
    <main className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <Navbar />
      <Suspense fallback={<div className="flex-grow flex items-center justify-center pt-32 pb-20">Loading form...</div>}>
        <RegistrationFormBContent />
      </Suspense>
      <Footer />
    </main>
  );
}
