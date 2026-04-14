'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, Building2, ShieldCheck, CheckSquare, Upload, Search, Briefcase, ChevronDown, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSearchParams } from 'next/navigation';
import { login as setClientAuth } from '@/lib/auth';
import { MembershipFormASchema } from '@/lib/validations/membership.schema';
import FormErrorMessage from '@/components/FormErrorMessage';
import OTPVerification from '@/components/OTPVerification';
import { z } from 'zod';
import { MAP_IDENTIFIER_TYPE } from '@/lib/constants';
import { COUNTRY_CODES } from '@/lib/countries';

// Data
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

const ENTITY_TYPES = [
  "Scheduled Commercial Bank (Public, Private & Foreign)",
  "Urban, Rural & Co-operative Bank",
  "Stock Exchange",
  "Clearing Corporation",
  "Depository",
  "Stock Broker",
  "AMC",
  "Mutual Fund",
  "AIF",
  "Portfolio Manager",
  "Investment Adviser",
  "Research Analyst",
  "Payment Aggregator",
  "Payment Gateway",
  "Payment Operator",
  "PPI Issuers",
  "Business Correspondent",
  "Cross-border remittance provider",
  "Authorised Dealer & Money Changer",
  "Life Insurer",
  "NBFCs",
  "Housing Finance Company",
  "Microfinance Institution",
  "Regulated fintech platform",
  "General Insurer",
  "Health Insurer",
  "Reinsurance Company",
  "Insurance Intermediary",
  "Insurance Broker & Corporate Agent",
  "Regulated Fintech Platforms",
  "Account Aggregators",
  "Regulated data-sharing intermediary",
  "Technology-enabled financial service provider",
  "DNFBP- Real estate developer, dealer or broker",
  "DNFBP- Dealer in precious metals, stones & bullion",
  "Trustee",
  "Fiduciary service providers",
  "Custodial & escrow service provider",
  "Credit Information Company",
  "Credit Bureau",
  "Virtual Digital Asset Service Provider (VDASP)",
  "Virtual asset exchange",
  "Custodial wallet provider",
  "AML/KYC, transaction monitoring or fraud-detection technology service providers",
  "RegTech",
  "SupTech",
  "Data Analytics firm",
  "Legal Firm",
  "Audit Firm",
  "Advisory firms specialising in AML/CFT",
];

const IDENTIFIER_TYPES = [
  "PAN — Permanent Account Number",
];

function RegistrationFormContent() {
  const searchParams = useSearchParams();
  const prefilledOrg = searchParams.get('org') || '';

  const [formData, setFormData] = useState({
    // Section 1
    salutation: '', fullName: '', designation: '', countryCode: '+91', mobile: '', email: '', username: '', password: '', confirmPassword: '',
    // Section 2
    orgName: prefilledOrg, registeredAddress: '', orgWebsite: '', primarySector: '', entityType: '',
    isRegulated: '',
    // Section 3
    registeredWithFiu: 'No', fiuRegNumber: '',
    identifierType: '', identifierNumber: '',
    // Section 4
    industryMemberships: [] as string[], ibaMembershipId: '', turnoverOrAum: '',
    // Section 5
    declarationAccepted: false, remarks: ''
  });

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      if (range === "Above ₹1,00,000 Cr") return 500000;
    } else {
      if (range === "Up to ₹5 Cr") return 25000;
      if (range === "₹5 Cr – ₹25 Cr") return 50000;
      if (range === "₹25 Cr – ₹100 Cr") return 100000;
      if (range === "₹100 Cr – ₹500 Cr") return 150000;
      if (range === "₹500 Cr – ₹2,000 Cr") return 300000;
      if (range === "Above ₹2,000 Cr") return 500000;
    }
    return 25000; // Default fallback
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setErrors({});

    let hasErrors = false;

    // Validate with Zod
    try {
      MembershipFormASchema.parse(formData);
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
        hasErrors = true;
      }
    }

    // Ensure email is verified
    if (!isEmailVerified) {
      setError(prev => prev ? prev + " Also, please verify your email address via OTP." : "Please verify your email address via OTP.");
      hasErrors = true;
    }

    if (hasErrors) {
      setIsSubmitting(false);
      return;
    }

    const isIamai = formData.industryMemberships.includes('IAMAI');
    const isIba = formData.industryMemberships.includes('IBA');
    const isMembershipSelected = isIamai || isIba;

    try {
      const amount = calculateAmount();
      const registrationData = {
        ...formData,
        formType: 'A',
        baseAmount: amount,
        taxAmount: amount * 0.18,
        totalAmount: amount * 1.18,
        iamaiCertificateUrl: '',
      };

      const response = await fetch('/api/membership/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      // Sync client-side auth state (local storage/UI)
      setClientAuth(formData.email, formData.fullName);

      if (isMembershipSelected) {
        // Special case: Skip payment for IAMAI/IBA members
        // Redirect directly to dashboard or success page
        window.location.href = '/membership/dashboard';
        return;
      }

      // Store non-sensitive display data in sessionStorage
      sessionStorage.setItem('membershipPaymentData', JSON.stringify({
        orgName: formData.orgName,
        registeredAddress: formData.registeredAddress,
        orgWebsite: formData.orgWebsite,
        primarySector: formData.primarySector,
        entityType: formData.entityType,
        identifierType: formData.identifierType,
        identifierNumber: formData.identifierNumber,
        email: formData.email,
        fullName: formData.fullName,
        designation: formData.designation,
        countryCode: formData.countryCode,
        mobile: formData.mobile,
        baseAmount: amount,
        taxAmount: amount * 0.18,
        totalAmount: amount * 1.18,
        applicationId: result.applicationId
      }));

      // Redirect to payment page
      window.location.href = '/membership/register/payment';
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-grow pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <br />
        <div className="mb-8">
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
                <div className="relative">
                  <select required name="salutation" value={formData.salutation} onChange={handleInputChange} className={`w-full pl-4 pr-10 py-3 rounded-xl border ${errors.salutation ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white appearance-none`}>
                    <option value="" disabled>Select</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Prof.">Prof.</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <FormErrorMessage message={errors.salutation} />
              </div>
              <div className="col-span-1 md:col-span-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input required name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`} placeholder="Enter full name" />
                <FormErrorMessage message={errors.fullName} />
              </div>
              <div className="col-span-1 md:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Designation *</label>
                <input required name="designation" value={formData.designation} onChange={handleInputChange} type="text" className={`w-full px-4 py-3 rounded-xl border ${errors.designation ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`} placeholder="Enter designation" />
                <FormErrorMessage message={errors.designation} />
              </div>
              <div className="col-span-1 md:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2">
                    <div className="relative">
                      <select name="countryCode" value={formData.countryCode} onChange={handleInputChange} className="w-[115px] pl-3 pr-8 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-sm appearance-none">
                        {COUNTRY_CODES.map((country) => (
                          <option key={country.code} value={country.dial_code}>
                            {country.dial_code} ({country.code})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    <input required name="mobile" value={formData.mobile} onChange={handleInputChange} type="tel" className={`flex-grow px-4 py-3 rounded-xl border ${errors.mobile ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`} placeholder="Enter number" />
                  </div>
                  <FormErrorMessage message={errors.mobile} />
                </div>
              </div>
              <div className="col-span-1 md:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  required
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    handleInputChange(e);
                    if (isEmailVerified) setIsEmailVerified(false);
                  }}
                  type="email"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${isEmailVerified ? 'bg-green-50/30' : ''}`}
                  placeholder="Enter official email"
                />
                <FormErrorMessage message={errors.email} />

                {formData.email && !errors.email && (
                  <OTPVerification
                    email={formData.email}
                    onVerify={setIsEmailVerified}
                    className="mt-3"
                  />
                )}
              </div>
              <div className="col-span-1 md:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Username *</label>
                <input required name="username" value={formData.username} onChange={handleInputChange} type="text" className={`w-full px-4 py-3 rounded-xl border ${errors.username ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`} placeholder="Choose a username" />
                <FormErrorMessage message={errors.username} />
              </div>
              <div className="col-span-1 md:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Password *</label>
                <input required name="password" value={formData.password} onChange={handleInputChange} type="password" className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`} placeholder="Create a strong password" />
                <FormErrorMessage message={errors.password} />
              </div>
              <div className="col-span-1 md:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password *</label>
                <input required name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} type="password" className={`w-full px-4 py-3 rounded-xl border ${errors.confirmPassword ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`} placeholder="Confirm your password" />
                <FormErrorMessage message={errors.confirmPassword} />
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
                  <input required name="orgName" value={formData.orgName} onChange={handleInputChange} readOnly={!!prefilledOrg} type="text" className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.orgName ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} transition-all ${!!prefilledOrg ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200' : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}`} placeholder="enter organisations..." />
                </div>
                <FormErrorMessage message={errors.orgName} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Registered Office Address *</label>
                  <textarea required name="registeredAddress" value={formData.registeredAddress} onChange={handleInputChange} minLength={5} rows={3} className={`w-full px-4 py-3 rounded-xl border ${errors.registeredAddress ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none`} placeholder="Enter complete registered address"></textarea>
                  <FormErrorMessage message={errors.registeredAddress} />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Organisation Website</label>
                  <input name="orgWebsite" value={formData.orgWebsite} onChange={handleInputChange} type="url" className={`w-full px-4 py-3 rounded-xl border ${errors.orgWebsite ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`} placeholder="https://example.com" />
                  <FormErrorMessage message={errors.orgWebsite} />
                </div>
                <div>
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
                  <div className="relative">
                    <select required name="entityType" value={formData.entityType} onChange={handleInputChange} className={`w-full pl-4 pr-10 py-3 rounded-xl border ${errors.entityType ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white appearance-none`}>
                      <option value="" disabled>Select Entity Type</option>
                      {ENTITY_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  <FormErrorMessage message={errors.entityType} />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Are you a Regulated Entity? *</label>
                  <div className="flex flex-col gap-3">
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
                    <FormErrorMessage message={errors.isRegulated} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Regulatory & Tax Identifiers */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-white px-6 py-5 border-b border-gray-100 flex items-center gap-3">
              <div className="p-2 bg-[#F9F5FF] rounded-lg text-[#7F56D9]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-[#101828]">3. Regulatory & Company Identifier</h2>
            </div>
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div className="space-y-2">
                  <div className="relative">
                    <select required name="identifierType" value={formData.identifierType} onChange={handleInputChange} className={`w-full pl-4 pr-10 py-3 rounded-xl border ${errors.identifierType ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white appearance-none`}>
                      <option value="" disabled>Select applicable type</option>
                      {IDENTIFIER_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  <FormErrorMessage message={errors.identifierType} />
                </div>
                <div className="space-y-2">
                  <input required name="identifierNumber" value={formData.identifierNumber} onChange={handleInputChange} type="text" className={`w-full px-4 py-3 rounded-xl border ${errors.identifierNumber ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono`} placeholder="Enter Identifier Number" />
                  <FormErrorMessage message={errors.identifierNumber} />
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

          {/* 5. Declaration */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50/80 px-6 py-5 border-b border-gray-200 flex items-center gap-3">
              <div className="p-2 bg-green-100/50 rounded-lg text-green-600">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">5. Declaration</h2>
            </div>
            <div className="p-6 sm:p-8 space-y-6 bg-green-50/30">
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-4 cursor-pointer p-4 rounded-xl border border-gray-200 bg-white hover:border-green-300 transition-colors">
                  <div className="pt-1">
                    <input required name="declarationAccepted" checked={formData.declarationAccepted} onChange={handleInputChange} type="checkbox" className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer" />
                  </div>
                  <div className="text-sm text-gray-700 leading-relaxed font-medium">
                    I hereby declare that I am duly authorised to represent the organisation  and that all information provided in this form is true, accurate, and complete to the best of my knowledge. I consent to ARIFAC collecting, storing, and processing the information submitted herein for the purposes of membership registration and related communications.
                  </div>
                </div>
                <FormErrorMessage message={errors.declarationAccepted} />
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
                  Processing...
                </>
              ) : (
                formData.industryMemberships.includes('IAMAI') || formData.industryMemberships.includes('IBA')
                  ? 'Complete Registration'
                  : 'Proceed to Payment'
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