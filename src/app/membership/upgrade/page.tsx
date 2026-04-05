'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  ShieldCheck,
  Building2,
  TrendingUp,
  FileCheck,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Loader2,
  Upload,
  Info,
  ChevronDown,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PostApprovalFormSchema } from '@/lib/validations/membership.schema';
import FormErrorMessage from '@/components/FormErrorMessage';
import { z } from 'zod';

const PRIMARY_SECTORS = [
  "Banking",
  "Securities & Capital Markets",
  "Payments, Remittance & Foreign Exchange",
  "Insurance",
  "Non-Banking",
  "Fintech & Digital Finance",
  "Designated Non-Financial Businesses and Professions - DNFBP",
  "Fiduciary, Custodial & Data Infrastructure",
  "VDA Ecosystem",
  "AML/CFT Tech & Advisory",
];

const TURNOVER_RANGES = [
  "Below ₹1 Crore",
  "₹1 Crore - ₹50 Crores",
  "₹50 Crores - ₹250 Crores",
  "₹250 Crores - ₹500 Crores",
  "₹500 Crores - ₹1000 Crores",
  "Above ₹1000 Crores",
];

export default function UpgradeMembership() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    primarySector: '',
    entityType: '',
    registeredWithFiu: '',
    fiuRegNumber: '',
    identifierType: '',
    identifierNumber: '',
    industryMemberships: [] as string[],
    ibaMembershipId: '',
    turnoverOrAum: '',
    declarationAccepted: false,
    // Store user/org info needed for payment review
    orgName: '',
    registeredAddress: '',
    orgWebsite: '',
    fullName: '',
    email: '',
    designation: '',
    countryCode: '+91',
    mobile: '',
  });

  const [iamaiFile, setIamaiFile] = useState<File | null>(null);
  const iamaiFileRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMembershipMenuOpen, setIsMembershipMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchCurrentData() {
      try {
        const res = await fetch('/api/membership/applications');
        const data = await res.json();

        if (data.success && data.applications && data.applications.length > 0) {
          const app = data.applications[0];
          const user = app.users || {};
          const org = app.organisations || {};
          const details = app.application_details?.[0] || {};
          const memberships: string[] = [];
          if (app.is_iamai_member) memberships.push('IAMAI');
          if (app.is_iba_member) memberships.push('IBA');
          if (memberships.length === 0) memberships.push('None');

          setFormData(prev => ({
            ...prev,
            orgName: org.name || '',
            registeredAddress: org.registered_address || '',
            orgWebsite: org.website || '',
            fullName: user.full_name || '',
            email: user.email || '',
            designation: user.designation || '',
            mobile: user.mobile || '',
            primarySector: details.sector || org.sector || '',
            entityType: details.entity_type || org.entity_type || '',
            registeredWithFiu: details.fiu_registration_number ? 'Yes' : 'No',
            fiuRegNumber: details.fiu_registration_number || '',
            identifierType: details.identifier_type || org.identifier_type || '',
            identifierNumber: details.identifier_value || org.identifier_value || '',
            industryMemberships: memberships,
            ibaMembershipId: details.iba_membership_id || '',
            turnoverOrAum: details.turnover_range || '',
          }));
        }
      } catch (err) {
        console.error("Failed to fetch current application data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCurrentData();
  }, []);

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
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData(prev => ({ ...prev, [name]: finalValue }));

    if (formErrors[name]) {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleMembershipToggle = (member: string) => {
    setFormData(prev => {
      let current = [...prev.industryMemberships];
      if (member === 'None') {
        current = ['None'];
      } else {
        current = current.filter(m => m !== 'None');
        if (current.includes(member)) {
          current = current.filter(m => m !== member);
        } else {
          current.push(member);
        }
      }
      if (current.length === 0) current = ['None'];
      return { ...prev, industryMemberships: current };
    });

    if (formErrors.industryMemberships) {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next.industryMemberships;
        return next;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      setIamaiFile(file);
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Upload failed');
    return result.url;
  };

  const calculateAmount = () => {
    const isBankOrNBFC = formData.primarySector === 'Banking' || formData.primarySector === 'Non-Banking';
    const range = formData.turnoverOrAum;

    if (isBankOrNBFC) {
      if (range === "Below ₹1 Crore") return 25000;
      if (range === "₹1 Crore - ₹50 Crores") return 50000;
      if (range === "₹50 Crores - ₹250 Crores") return 100000;
      if (range === "₹250 Crores - ₹500 Crores") return 150000;
      if (range === "₹500 Crores - ₹1000 Crores") return 300000;
      if (range === "Above ₹1000 Crores") return 500000;
    } else {
      if (range === "Below ₹1 Crore") return 25000;
      if (range === "₹1 Crore - ₹50 Crores") return 50000;
      if (range === "₹50 Crores - ₹250 Crores") return 100000;
      if (range === "₹250 Crores - ₹500 Crores") return 150000;
      if (range === "₹500 Crores - ₹1000 Crores") return 300000;
      if (range === "Above ₹1000 Crores") return 500000;
    }
    return 25000;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFormErrors({});

    const isIamai = formData.industryMemberships.includes('IAMAI');
    const isIba = formData.industryMemberships.includes('IBA');
    const isMembershipSelected = isIamai || isIba;

    if (isIamai && !iamaiFile) {
      setFormErrors(prev => ({ ...prev, iamaiFile: "Please upload IAMAI Membership Certificate" }));
      setError("Please upload required documents.");
      setIsSubmitting(false);
      return;
    }

    try {
      PostApprovalFormSchema.parse(formData);

      let iamaiUrl = '';
      if (iamaiFile) iamaiUrl = await uploadFile(iamaiFile);

      const amount = calculateAmount();
      const payload = {
        ...formData,
        iamaiCertificateUrl: iamaiUrl,
        baseAmount: amount,
        taxAmount: amount * 0.18,
        totalAmount: amount * 1.18,
      };

      const res = await fetch('/api/membership/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        if (isMembershipSelected) {
          setIsSuccess(true);
          setTimeout(() => router.push('/membership/dashboard'), 3000);
        } else {
          // Redirect to payment
          sessionStorage.setItem('membershipPaymentData', JSON.stringify({
            ...payload,
            applicationId: data.applicationId,
            backUrl: '/membership/upgrade'
          }));
          window.location.href = '/membership/register/payment';
        }
      } else {
        setError(data.error || 'Failed to submit upgrade application');
      }
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        err.issues.forEach(issue => {
          if (issue.path[0]) errors[issue.path[0].toString()] = issue.message;
        });
        setFormErrors(errors);
        setError("Please correct the highlighted fields.");
      } else {
        setError(err.message || 'An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#050505] min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="bg-[#050505] min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-12 rounded-[2.5rem] text-center max-w-lg shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full translate-y-1/2" />
          <div className="relative z-10">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/30">
              <CheckCircle2 className="w-12 h-12 text-green-400" />
            </div>
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Application Submitted!</h2>
            <p className="text-gray-400 mb-10 text-lg leading-relaxed">
              Your upgrade application for **Premium Industry Membership** has been received. Our secretariat team will review your details and you will be notified soon.
            </p>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3 }}
                className="h-full bg-blue-500"
              />
            </div>
            <p className="text-xs text-gray-500">Redirecting to dashboard in 3 seconds...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  const isAnyMembershipSelected = formData.industryMemberships.includes('IAMAI') || formData.industryMemberships.includes('IBA');

  return (
    <main className="bg-[#050505] min-h-screen font-sans text-white overflow-hidden selection:bg-blue-500/30">
      <Navbar />

      {/* Decorative Glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full opacity-50" />
      </div>

      <div className="relative pt-32 pb-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <Link href="/membership/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
              >
                <Award className="w-3.5 h-3.5" />
                Premium Upgrade
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
                Upgrade to<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">Full Membership</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-xl">
                Unlock exclusive institutional benefits, voting rights, and premium certifications by upgrading your membership tier.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </motion.div>
            )}

            {/* Step 1: Industry Selection */}
            <section className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Industry & Sector</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Primary Sector *</label>
                    <select
                      name="primarySector"
                      value={formData.primarySector}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer text-gray-300"
                    >
                      <option value="" className="bg-[#121212]">Select Sector</option>
                      {PRIMARY_SECTORS.map(s => <option key={s} value={s} className="bg-[#121212]">{s}</option>)}
                    </select>
                    <FormErrorMessage message={formErrors.primarySector} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Type of Entity *</label>
                    <input
                      type="text"
                      name="entityType"
                      value={formData.entityType}
                      onChange={handleInputChange}
                      placeholder="e.g. Private Bank, NBFC, Fintech"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all text-gray-300"
                    />
                    <FormErrorMessage message={formErrors.entityType} />
                  </div>
                </div>
              </div>
            </section>

            {/* Step 2: Existing Memberships */}
            <section className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative group z-20">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Existing Industry Memberships</h3>
                </div>

                <div className="space-y-6">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Are you a member of IAMAI or IBA ? *</label>
                  <div className="relative" ref={dropdownRef}>
                    <div
                      className={`w-full px-6 py-4 rounded-2xl bg-white/5 border ${isMembershipMenuOpen ? 'border-blue-500/50 ring-2 ring-blue-500/20' : 'border-white/10'} transition-all cursor-pointer flex justify-between items-center group`}
                      onClick={() => setIsMembershipMenuOpen(!isMembershipMenuOpen)}
                    >
                      <span className={formData.industryMemberships.length > 0 ? "text-gray-300" : "text-gray-500"}>
                        {formData.industryMemberships.length > 0 ? formData.industryMemberships.join(', ') : "Select memberships..."}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isMembershipMenuOpen ? 'rotate-180' : ''}`} />
                    </div>

                    <AnimatePresence>
                      {isMembershipMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-[100] w-full mt-3 bg-[#1a1a1a] border border-white/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-2xl"
                        >
                          {['IAMAI', 'IBA', 'None'].map(option => (
                            <label key={option} className="flex items-center px-6 py-4 hover:bg-white/10 cursor-pointer border-b border-white/5 last:border-0 transition-colors group/item">
                              <div className="relative flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.industryMemberships.includes(option)}
                                  onChange={() => handleMembershipToggle(option)}
                                  className="peer w-6 h-6 opacity-0 absolute cursor-pointer"
                                />
                                <div className={`w-6 h-6 border-2 rounded-lg transition-all flex items-center justify-center ${formData.industryMemberships.includes(option) ? 'bg-blue-600 border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-white/5 border-white/20 group-hover/item:border-white/40'}`}>
                                  {formData.industryMemberships.includes(option) && <CheckCircle2 className="w-4 h-4 text-white" />}
                                </div>
                              </div>
                              <span className={`ml-4 text-base font-semibold ${formData.industryMemberships.includes(option) ? 'text-white' : 'text-gray-400 group-hover/item:text-gray-200'}`}>{option}</span>
                            </label>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <FormErrorMessage message={formErrors.industryMemberships} />
                  </div>

                  <AnimatePresence>
                    {formData.industryMemberships.includes('IAMAI') && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-6">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1 block mb-4 text-blue-400">Upload IAMAI Membership Certificate *</label>
                        <div
                          onClick={() => iamaiFileRef.current?.click()}
                          className={`w-full border-2 border-dashed ${iamaiFile ? 'border-blue-500/50 bg-blue-500/5' : 'border-white/10 bg-white/5'} rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors cursor-pointer group`}
                        >
                          {iamaiFile ? (
                            <>
                              <FileCheck className="w-10 h-10 text-blue-400 mb-4" />
                              <span className="text-sm font-bold text-white">{iamaiFile.name}</span>
                              <span className="text-xs text-gray-500 mt-2">{(iamaiFile.size / 1024).toFixed(1)} KB</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-10 h-10 text-gray-500 group-hover:text-blue-400 mb-4 transition-colors" />
                              <span className="text-sm font-bold text-gray-300">Click to upload or drag & drop</span>
                              <span className="text-xs text-gray-500 mt-2 tracking-wide font-mono uppercase">PDF, JPG, PNG (Max 5MB)</span>
                            </>
                          )}
                          <input
                            type="file"
                            ref={iamaiFileRef}
                            className="hidden"
                            accept=".pdf,.png,.jpg,.jpeg"
                            onChange={handleFileChange}
                          />
                        </div>
                        <FormErrorMessage message={formErrors.iamaiFile} />
                      </motion.div>
                    )}
                    {formData.industryMemberships.includes('IBA') && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-6">
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1 text-blue-400">IBA Membership ID *</label>
                          <input
                            type="text"
                            name="ibaMembershipId"
                            value={formData.ibaMembershipId}
                            onChange={handleInputChange}
                            className="w-full md:w-1/2 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono text-gray-300"
                            placeholder="Enter IBA Membership ID"
                          />
                          <FormErrorMessage message={formErrors.ibaMembershipId} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            {/* Step 3: Financial Scale (Turnover) - Only if NONE of (IAMAI/IBA) are selected */}
            <AnimatePresence>
              {!isAnyMembershipSelected && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group"
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold">Financial Scale</h3>
                    </div>

                    <div className="space-y-6">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1 block mb-4">Turnover or AUM Category *</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {TURNOVER_RANGES.map(range => (
                          <label
                            key={range}
                            className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col gap-3 group relative overflow-hidden ${formData.turnoverOrAum === range
                              ? 'bg-blue-600/20 border-blue-500/50 shadow-lg shadow-blue-500/10'
                              : 'bg-white/5 border-white/10 hover:border-white/20'
                              }`}
                          >
                            <input
                              type="radio"
                              name="turnoverOrAum"
                              value={range}
                              checked={formData.turnoverOrAum === range}
                              onChange={handleInputChange}
                              className="hidden"
                            />
                            <div className="flex justify-between items-center relative z-10">
                              <span className={`text-sm font-bold ${formData.turnoverOrAum === range ? 'text-blue-400' : 'text-gray-300'}`}>{range}</span>
                              {formData.turnoverOrAum === range && <CheckCircle2 className="w-5 h-5 text-blue-400" />}
                            </div>
                          </label>
                        ))}
                      </div>
                      <FormErrorMessage message={formErrors.turnoverOrAum} />
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* Step 4: Regulatory Details */}
            <section className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Regulatory Compliance</h3>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Registered with FIU-IND? *</label>
                    <div className="flex gap-4">
                      {['Yes', 'No'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, registeredWithFiu: opt }))}
                          className={`px-8 py-3 rounded-2xl border transition-all font-bold text-sm ${formData.registeredWithFiu === opt
                            ? 'bg-blue-500 text-white border-blue-400 shadow-lg shadow-blue-500/20'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                            }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {formData.registeredWithFiu === 'Yes' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6"
                      >
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1 block mb-3">FIU Registration Number *</label>
                        <input
                          type="text"
                          name="fiuRegNumber"
                          value={formData.fiuRegNumber}
                          onChange={handleInputChange}
                          className="w-full md:w-1/2 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all font-mono text-sm text-gray-300"
                          placeholder="e.g. FINGate-XXXXXXXX"
                        />
                        <FormErrorMessage message={formErrors.registeredWithFiu} />
                      </motion.div>
                    )}
                  </div>

                  <div className="h-px bg-white/5" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Legal Identifier Type *</label>
                      <select
                        name="identifierType"
                        value={formData.identifierType}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer text-gray-300"
                      >
                        <option value="" className="bg-[#121212]">Select Type</option>
                        <option value="CIN" className="bg-[#121212]">CIN - Corporate Identity Number</option>
                        <option value="LLPIN" className="bg-[#121212]">LLPIN - Limited Liability Partnership Number</option>
                        <option value="GST" className="bg-[#121212]">GSTIN - Goods & Services Tax Number</option>
                        <option value="PAN" className="bg-[#121212]">PAN - Permanent Account Number</option>
                      </select>
                      <FormErrorMessage message={formErrors.identifierType} />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Identifier Number *</label>
                      <input
                        type="text"
                        name="identifierNumber"
                        value={formData.identifierNumber}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono text-gray-300"
                        placeholder="Enter identification number"
                      />
                      <FormErrorMessage message={formErrors.identifierNumber} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Declaration & Submission */}
            <div className="space-y-12">
              <label className="flex items-start gap-4 p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20 cursor-pointer group hover:bg-blue-600/20 transition-all">
                <input
                  type="checkbox"
                  name="declarationAccepted"
                  checked={formData.declarationAccepted}
                  onChange={handleInputChange}
                  className="mt-1 w-6 h-6 rounded-lg border-white/20 bg-white/5 text-blue-500"
                />
                <span className="text-sm text-gray-300 leading-relaxed font-medium">
                  I hereby confirm that I wish to upgrade our current limited registration to a <strong>Full Institutional Membership</strong> of ARIFAC. I understand that this upgrade is subject to verification of the documents and details provided above. I declare that the information provided is accurate and complete.
                </span>
              </label>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-4 text-gray-500">
                  <Info className="w-5 h-5 shrink-0" />
                  <p className="text-sm italic">
                    {isAnyMembershipSelected
                      ? "Verification within 3-5 business days."
                      : "Complete payment to proceed with verification."}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.declarationAccepted}
                  className="w-full sm:w-auto px-12 py-5 rounded-[2rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-black text-lg tracking-tight hover:shadow-2xl hover:shadow-blue-500/40 active:scale-[0.98] disabled:opacity-50 disabled:grayscale transition-all flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      SUBMITTING...
                    </>
                  ) : (
                    <>
                      {isAnyMembershipSelected ? 'COMPLETE UPGRADE' : 'PROCEED TO PAYMENT'}
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
