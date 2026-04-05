'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Building2, ShieldCheck, CheckSquare, Upload, Briefcase, ChevronDown, AlertCircle, Loader2, Search } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from 'next/navigation';
import { PostApprovalFormSchema } from '@/lib/validations/membership.schema';
import FormErrorMessage from '@/components/FormErrorMessage';
import { z } from 'zod';
import { MAP_IDENTIFIER_TYPE } from '@/lib/constants';

// Data
const PRIMARY_SECTORS = [
  "Banking", "NBFC", "Payments & Forex", "Insurance", "Securities & Capital Markets",
  "Virtual Digital Assets", "Fintech & Digital Financial Services",
  "DNFBP — Real Estate", "DNFBP — Precious Metals & Stones",
  "DNFBP — Legal & Accounting Professionals", "DNFBP — Trust & Company Services",
  "DNFBP — Casinos", "RegTech / Technology", "Other"
];

const ENTITY_TYPES = [
  "Public Limited Company", "Private Limited Company", "Limited Liability Partnership (LLP)",
  "Partnership Firm", "Proprietorship", "Trust", "Society", "Co-operative Society", "Others"
];

const IDENTIFIER_TYPES = [
  "CIN — Company Identification Number (MCA)",
  "LLP Identification Number",
  "TAN — Tax Deduction Account Number",
  "GST Registration Number (GSTIN)",
  "PAN — Permanent Account Number",
  "Trust Registration Number",
  "Society Registration Number",
  "Co-operative Society Registration Number",
  "IRDAI Registration Number",
  "SEBI Registration Number",
  "RBI Registration / Licence Number",
  "IFSCA Registration Number",
  "Other Regulatory Licence / Registration Number"
];

function PostApprovalFormContent() {
  const router = useRouter();
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  const [formData, setFormData] = useState({
    primarySector: '',
    entityType: '',
    registeredWithFiu: 'No',
    fiuRegNumber: '',
    identifierType: '',
    identifierNumber: '',
    industryMemberships: [] as string[],
    ibaMembershipId: '',
    turnoverOrAum: '',
    declarationAccepted: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMembershipMenuOpen, setIsMembershipMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUserData(data.user);
        } else {
          router.push('/membership/login');
        }
      } catch (err) {
        setError("Failed to load session details.");
      } finally {
        setIsLoadingSession(false);
      }
    }
    fetchSession();
  }, [router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMembershipMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    // Auto-uppercase PAN number
    if (name === 'identifierNumber' && MAP_IDENTIFIER_TYPE[formData.identifierType] === 'PAN') {
      finalValue = (finalValue as string).toUpperCase();
    }

    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const calculateAmount = () => {
    const isBankOrNBFC = formData.primarySector === 'Banking' || formData.primarySector === 'NBFC';
    const range = formData.turnoverOrAum;

    if (isBankOrNBFC) {
      if (range === "Up to ₹500 Cr") return 25000;
      if (range === "₹500 Cr – ₹1,000 Cr") return 50000;
      if (range === "₹1,000 Cr – ₹10,000 Cr") return 100000;
      if (range === "₹10,000 Cr – ₹50,000 Cr") return 150000;
      if (range === "₹50,000 Cr – ₹1,00,000 Cr") return 300000;
      if (range === "Above ₹1,0,000 Cr") return 500000;
    } else {
      if (range === "Up to ₹5 Cr") return 25000;
      if (range === "₹5 Cr – ₹25 Cr") return 50000;
      if (range === "₹25 Cr – ₹100 Cr") return 100000;
      if (range === "₹100 Cr – ₹500 Cr") return 150000;
      if (range === "₹500 Cr – ₹2,000 Cr") return 300000;
      if (range === "Above ₹2,000 Cr") return 500000;
    }
    return 25000;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setErrors({});

    // Validate with Zod
    try {
      PostApprovalFormSchema.parse(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          if (issue.path && issue.path.length > 0) {
            fieldErrors[issue.path[0].toString()] = issue.message;
          }
        });
        setErrors(fieldErrors);
        setError("Please fix the errors in the form.");
        setIsSubmitting(false);
        return;
      }
    }

    const isIamaiSelected = formData.industryMemberships.includes('IAMAI');
    const isIbaSelected = formData.industryMemberships.includes('IBA');
    const isMembershipSelected = isIamaiSelected || isIbaSelected;

    try {
      const amount = calculateAmount();

      // Combine basic details from session and new details
      const postApprovalDetails = {
        ...formData,
        iamaiCertificateUrl: '',
        baseAmount: amount,
        taxAmount: amount * 0.18,
        totalAmount: amount * 1.18,
      };

      const response = await fetch('/api/membership/post-approval-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ additionalDetails: postApprovalDetails }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      if (isMembershipSelected) {
        // Success! Redirect to dashboard (which should now show "Under Review")
        window.location.href = '/membership/dashboard?status=pending_final';
      } else {
        // Prepare data for the payment page (matching the interface in payment/page.tsx)
        const formBDetails = userData.formB?.details || {};

        const paymentData = {
          orgName: userData.formB?.organisationName || 'Your Organisation',
          registeredAddress: formBDetails.registeredAddress || 'Pending',
          orgWebsite: formBDetails.orgWebsite || '',
          primarySector: formData.primarySector,
          entityType: formData.entityType,
          email: userData.email,
          fullName: userData.name,
          designation: formBDetails.designation || '',
          countryCode: formBDetails.countryCode || '+91',
          mobile: formBDetails.mobile || '',
          baseAmount: amount,
          taxAmount: amount * 0.18,
          totalAmount: amount * 1.18,
          applicationId: result.application?.id || 'pending'
        };

        // Store non-sensitive display data in sessionStorage
        sessionStorage.setItem('membershipPaymentData', JSON.stringify(paymentData));

        // Redirect to payment page
        window.location.href = '/membership/register/payment';
      }
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  if (isLoadingSession) {
    return (
      <div className="flex-grow flex items-center justify-center pt-32 pb-20 mt-10">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="text-gray-500 font-medium">Loading your profile info...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <br />
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-medium text-sm mb-4">
            Post-Approval Phase
          </div>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Complete Organisational Profile
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-gray-600">
            Welcome back, <strong>{userData.name}</strong>. Your initial request for <strong>{userData.formB?.organisationName}</strong> was approved. Please complete the remaining details to finalize your membership.
          </motion.p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center gap-3 font-medium">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          {/* 1. Organisation Profile */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50/80 px-6 py-5 border-b border-gray-200 flex items-center gap-3">
              <div className="p-2 bg-indigo-100/50 rounded-lg text-indigo-600">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">1. Organisational Profile</h2>
            </div>
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Sector / Industry *</label>
                  <div className="relative">
                    <select required name="primarySector" value={formData.primarySector} onChange={handleInputChange} className={`w-full pl-4 pr-10 py-3 rounded-xl border ${errors.primarySector ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white appearance-none`}>
                      <option value="" disabled>Select Sector</option>
                      {PRIMARY_SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  <FormErrorMessage message={errors.primarySector} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Type of Entity *</label>
                  <div className="relative">
                    <select required name="entityType" value={formData.entityType} onChange={handleInputChange} className={`w-full pl-4 pr-10 py-3 rounded-xl border ${errors.entityType ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white appearance-none`}>
                      <option value="" disabled>Select Entity Type</option>
                      {ENTITY_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  <FormErrorMessage message={errors.entityType} />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Regulatory & Tax Identifiers */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50/80 px-6 py-5 border-b border-gray-200 flex items-center gap-3">
              <div className="p-2 bg-purple-100/50 rounded-lg text-purple-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">2. Regulatory & Company Identifier</h2>
            </div>
            <div className="p-6 sm:p-8 space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Identifier Type *</label>
                  <div className="relative">
                    <select required name="identifierType" value={formData.identifierType} onChange={handleInputChange} className={`w-full pl-4 pr-10 py-3 rounded-xl border ${errors.identifierType ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white appearance-none`}>
                      <option value="" disabled>Select applicable type</option>
                      {IDENTIFIER_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  <FormErrorMessage message={errors.identifierType} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Identifier Number *</label>
                  <input required name="identifierNumber" value={formData.identifierNumber} onChange={handleInputChange} type="text" className={`w-full px-4 py-3 rounded-xl border ${errors.identifierNumber ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono`} placeholder="Enter Registration/Tax ID number" />
                  <FormErrorMessage message={errors.identifierNumber} />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Existing Industry Memberships */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="bg-gray-50/80 px-6 py-5 border-b border-gray-200 rounded-t-2xl flex items-center gap-3">
              <div className="p-2 bg-amber-100/50 rounded-lg text-amber-600">
                <Briefcase className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">3. Existing Industry Memberships</h2>
            </div>
            <div className="p-6 sm:p-8 space-y-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Are you a member of IAMAI or IBA ? *</label>
              <div className="relative mb-6" ref={dropdownRef}>
                <div
                  className={`w-full px-4 py-3 rounded-xl border ${isMembershipMenuOpen ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300'} transition-all bg-white cursor-pointer flex justify-between items-center`}
                  onClick={() => setIsMembershipMenuOpen(!isMembershipMenuOpen)}
                >
                  <span className={formData.industryMemberships.length > 0 ? "text-gray-900" : "text-gray-500"}>
                    {formData.industryMemberships.length > 0 ? formData.industryMemberships.join(', ') : "Select memberships..."}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isMembershipMenuOpen ? 'rotate-180' : ''}`} />
                </div>

                <AnimatePresence>
                  {isMembershipMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                    >
                      {['IAMAI', 'IBA', 'None'].map(option => (
                        <label key={option} className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0">
                          <input
                            type="checkbox"
                            checked={formData.industryMemberships.includes(option)}
                            onChange={() => {
                              let current = [...formData.industryMemberships];
                              if (option === 'None') {
                                current = ['None'];
                              } else {
                                current = current.filter(item => item !== 'None');
                                if (current.includes(option)) {
                                  current = current.filter(item => item !== option);
                                } else {
                                  current.push(option);
                                }
                              }
                              setFormData(prev => ({ ...prev, industryMemberships: current }));
                              // Clear error
                              if (errors.industryMemberships) {
                                setErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.industryMemberships;
                                  return newErrors;
                                });
                              }
                            }}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                          />
                          <span className="ml-3 text-gray-700 font-medium">{option}</span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                <FormErrorMessage message={errors.industryMemberships} />
              </div>

              <AnimatePresence>
                {formData.industryMemberships.includes('None') && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    {(() => {
                      const isBankOrNBFC = formData.primarySector === 'Banking' || formData.primarySector === 'NBFC';
                      return (
                        <div className="p-1">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {isBankOrNBFC
                              ? "What is your organisation's total Assets Under Management (AUM)? *"
                              : "What is your organisation's Annual Turnover? *"}
                          </label>
                          <div className="relative">
                            <select
                              required
                              name="turnoverOrAum"
                              value={formData.turnoverOrAum}
                              onChange={handleInputChange}
                              className={`w-full pl-4 pr-10 py-3 rounded-xl border ${errors.turnoverOrAum ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white appearance-none`}
                            >
                              <option value="" disabled>Select applicable range</option>
                              {isBankOrNBFC ? (
                                <>
                                  <option value="Up to ₹500 Cr">Up to ₹500 Cr</option>
                                  <option value="₹500 Cr – ₹1,000 Cr">₹500 Cr – ₹1,000 Cr</option>
                                  <option value="₹1,000 Cr – ₹10,000 Cr">₹1,000 Cr – ₹10,000 Cr</option>
                                  <option value="₹10,000 Cr – ₹50,000 Cr">₹10,000 Cr – ₹50,000 Cr</option>
                                  <option value="₹50,000 Cr – ₹1,00,000 Cr">₹50,000 Cr – ₹1,00,000 Cr</option>
                                  <option value="Above ₹1,0,000 Cr">Above ₹1,0,000 Cr</option>
                                </>
                              ) : (
                                <>
                                  <option value="Up to ₹5 Cr">Up to ₹5 Cr</option>
                                  <option value="₹5 Cr – ₹25 Cr">₹5 Cr – ₹25 Cr</option>
                                  <option value="₹25 Cr – ₹100 Cr">₹25 Cr – ₹100 Cr</option>
                                  <option value="₹100 Cr – ₹500 Cr">₹100 Cr – ₹500 Cr</option>
                                  <option value="₹500 Cr – ₹2,000 Cr">₹500 Cr – ₹2,000 Cr</option>
                                  <option value="Above ₹2,000 Cr">Above ₹2,000 Cr</option>
                                </>
                              )}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                          <FormErrorMessage message={errors.turnoverOrAum} />
                        </div>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
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
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-4 cursor-pointer p-4 rounded-xl border border-gray-200 bg-white hover:border-green-300 transition-colors">
                  <div className="pt-1">
                    <input required name="declarationAccepted" checked={formData.declarationAccepted} onChange={handleInputChange} type="checkbox" className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer" />
                  </div>
                  <div className="text-sm text-gray-700 leading-relaxed font-medium">
                    I hereby declare that all information provided in this form is true, accurate, and complete to the best of my knowledge. I consent to ARIFAC collecting, storing, and processing the information submitted herein for the purposes of membership activation.
                  </div>
                </div>
                <FormErrorMessage message={errors.declarationAccepted} />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center justify-center bg-[#0066cc] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#0077ed] hover:shadow-xl hover:shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Submitting Profile...
                </>
              ) : (
                formData.industryMemberships.includes('IAMAI') || formData.industryMemberships.includes('IBA')
                  ? 'Activate Membership Flow'
                  : 'Proceed to Payment'
              )}
            </button>
          </div>

        </motion.form>
      </div>
    </div>
  );
}

export default function PostApprovalPage() {
  return (
    <main className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <Navbar />
      <Suspense fallback={<div className="flex-grow flex items-center justify-center pt-32 pb-20">Loading form...</div>}>
        <PostApprovalFormContent />
      </Suspense>
      <Footer />
    </main>
  );
}