'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, Building2, ShieldCheck, CheckSquare, Upload, Search, Briefcase, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSearchParams } from 'next/navigation';

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
  "FIU-IND Registration Number",
  "Other Regulatory Licence / Registration Number"
];

function RegistrationFormContent() {
  const searchParams = useSearchParams();
  const prefilledOrg = searchParams.get('org') || '';
  const [formData, setFormData] = useState({
    // Section 1
    salutation: '', fullName: '', designation: '', countryCode: '+91', mobile: '', email: '', username: '', password: '',
    // Section 2
    orgName: prefilledOrg, registeredAddress: '', orgWebsite: '', primarySector: '', entityType: '',
    isRegulated: '',
    // Section 3
    registeredWithFiu: '', fiuRegNumber: '',
    identifierType: '', identifierNumber: '',
    // Section 4
    industryMemberships: [] as string[], ibaMembershipId: '', turnoverOrAum: '',
    // Section 5
    declarationAccepted: false, remarks: ''
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMembershipMenuOpen, setIsMembershipMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMembershipMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: '5000.00',
          billingName: formData.fullName,
          billingAddress: formData.registeredAddress,
          billingEmail: formData.email,
          billingTel: formData.mobile,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to initiate payment');
      }

      // Server returns a self-submitting HTML form that redirects the browser
      // to the CCAvenue hosted payment page — write it into the current document.
      const html = await res.text();
      document.open();
      document.write(html);
      document.close();

    } catch (err) {
      console.error('Payment initiation error:', err);
      alert('Error initiating payment. Please try again.');
      setIsSubmitting(false);
    }
  };

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
            Step 2 of 4
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
          {/* 1. Authorised Representative Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50/80 px-6 py-5 border-b border-gray-200 flex items-center gap-3">
              <div className="p-2 bg-blue-100/50 rounded-lg text-blue-600">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">1. Authorised Representative Details</h2>
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
              <div className="col-span-1 md:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="Enter official email" />
              </div>
              <div className="col-span-1 md:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Username *</label>
                <input required name="username" value={formData.username} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="Choose a username" />
              </div>
              <div className="col-span-1 md:col-span-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Password *</label>
                <input required name="password" value={formData.password} onChange={handleInputChange} type="password" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="Create a strong password" />
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
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name of Organisation *</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input required name="orgName" value={formData.orgName} onChange={handleInputChange} readOnly={!!prefilledOrg} type="text" className={`w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 transition-all ${!!prefilledOrg ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200' : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}`} placeholder="Search pre-approved organisations..." />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Registered Office Address *</label>
                  <textarea required name="registeredAddress" value={formData.registeredAddress} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none" placeholder="Enter complete registered address"></textarea>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Organisation Website</label>
                  <input name="orgWebsite" value={formData.orgWebsite} onChange={handleInputChange} type="url" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="https://example.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Sector / Industry *</label>
                  <select required name="primarySector" value={formData.primarySector} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white">
                    <option value="" disabled>Select Sector</option>
                    {PRIMARY_SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Type of Entity *</label>
                  <select required name="entityType" value={formData.entityType} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white">
                    <option value="" disabled>Select Entity Type</option>
                    {ENTITY_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
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

          {/* 3. Regulatory & Tax Identifiers */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50/80 px-6 py-5 border-b border-gray-200 flex items-center gap-3">
              <div className="p-2 bg-purple-100/50 rounded-lg text-purple-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">3. Regulatory & Company Identifier</h2>
            </div>
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Are you registered with FIU-IND? *</label>
                <div className="flex gap-6 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="registeredWithFiu" value="Yes" checked={formData.registeredWithFiu === 'Yes'} onChange={handleInputChange} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" required />
                    <span className="text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="registeredWithFiu" value="No" checked={formData.registeredWithFiu === 'No'} onChange={handleInputChange} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" required />
                    <span className="text-gray-700">No</span>
                  </label>
                </div>

                {formData.registeredWithFiu === 'Yes' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">FIU-IND Registration Number (FINGate 2.0) *</label>
                    <input required name="fiuRegNumber" value={formData.fiuRegNumber} onChange={handleInputChange} type="text" className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50" placeholder="Enter FINGate 2.0 Reg No." />
                  </motion.div>
                )}
              </div>

              <div className="h-px bg-gray-100 my-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Identifier Type *</label>
                  <select required name="identifierType" value={formData.identifierType} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white">
                    <option value="" disabled>Select applicable type</option>
                    {IDENTIFIER_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Identifier Number *</label>
                  <input required name="identifierNumber" value={formData.identifierNumber} onChange={handleInputChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono" placeholder="Enter Registration/Tax ID number" />
                </div>
              </div>
            </div>
          </div>

          {/* 4. Existing Industry Memberships */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="bg-gray-50/80 px-6 py-5 border-b border-gray-200 rounded-t-2xl flex items-center gap-3">
              <div className="p-2 bg-amber-100/50 rounded-lg text-amber-600">
                <Briefcase className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">4. Existing Industry Memberships</h2>
            </div>
            <div className="p-6 sm:p-8 space-y-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Is your organisation a current member of IAMAI or IBA? *</label>
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
                            }}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                          />
                          <span className="ml-3 text-gray-700 font-medium">{option}</span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {formData.industryMemberships.includes('IAMAI') && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Upload IAMAI Membership Certificate *</label>
                    <div className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                      <Upload className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mb-3" />
                      <span className="text-sm font-medium text-gray-600">Click to upload or drag & drop</span>
                      <span className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</span>
                      <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" />
                    </div>
                  </motion.div>
                )}
                {formData.industryMemberships.includes('IBA') && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">IBA Membership ID *</label>
                    <input required name="ibaMembershipId" value={formData.ibaMembershipId} onChange={handleInputChange} type="text" className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono" placeholder="Enter IBA Membership ID" />
                  </motion.div>
                )}
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
                          <select
                            required
                            name="turnoverOrAum"
                            value={formData.turnoverOrAum}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                          >
                            <option value="" disabled>Select applicable range</option>
                            {isBankOrNBFC ? (
                              <>
                                <option value="Up to ₹500 Cr">Up to ₹500 Cr</option>
                                <option value="₹500 Cr – ₹1,000 Cr">₹500 Cr – ₹1,000 Cr</option>
                                <option value="₹1,000 Cr – ₹10,000 Cr">₹1,000 Cr – ₹10,000 Cr</option>
                                <option value="₹10,000 Cr – ₹50,000 Cr">₹10,000 Cr – ₹50,000 Cr</option>
                                <option value="₹50,000 Cr – ₹1,00,000 Cr">₹50,000 Cr – ₹1,00,000 Cr</option>
                                <option value="Above ₹1,00,000 Cr">Above ₹1,00,000 Cr</option>
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
                        </div>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 5. Declaration */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50/80 px-6 py-5 border-b border-gray-200 flex items-center gap-3">
              <div className="p-2 bg-green-100/50 rounded-lg text-green-600">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">5. Declaration</h2>
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


            </div>
          </div>

          {/* Submit Action */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center bg-[#0066cc] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#0077ed] hover:shadow-xl hover:shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                  Processing...
                </>
              ) : (
                'Proceed to Payment'
              )}
            </button>
          </div>

        </motion.form>
      </div>
    </div>
  );
}

export default function MembershipRegistrationForm() {
  return (
    <main className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <Navbar />
      <Suspense fallback={<div className="flex-grow flex items-center justify-center pt-32 pb-20">Loading form...</div>}>
        <RegistrationFormContent />
      </Suspense>
      <Footer />
    </main>
  );
}
