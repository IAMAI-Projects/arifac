'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, Search } from 'lucide-react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Dummy data for pre-approved organizations
const PRE_APPROVED_ORGS = [
  "ICICI Bank", "HDFC Bank", "Axis Bank"
];

export default function MembershipRegistrationStep1() {
  const [accepted, setAccepted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [newOrgConsent, setNewOrgConsent] = useState(false);

  const filteredOrgs = PRE_APPROVED_ORGS.filter(org =>
    org.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProceed = () => {
    if (!accepted) return;

    // If selected from list, go to Form A (or /form), else go to Form B (or /form-b)
    if (selectedOrg && PRE_APPROVED_ORGS.includes(selectedOrg)) {
      window.location.href = `/membership/register/form?org=${encodeURIComponent(selectedOrg)}`;
    } else {
      window.location.href = "/membership/register/form-b";
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <Navbar />

      <div className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <br />
          <div className="mb-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-medium text-sm mb-6"
            >
              Step 1 of 4
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Membership Registration
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Please review the programme overview and eligibility criteria before proceeding.
            </motion.p>
          </div>

          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
          >
            {/* Programme Overview */}
            <div className="p-8 md:p-10 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                Programme Overview
              </h2>
              <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed space-y-4">
                <p>
                  ARIFAC is India’s premier AML/CFT capability platform, conceptualized to strengthen
                  the compliance ecosystem. Our membership programme is designed for institutions and
                  professionals committed to upholding the highest standards of financial integrity.
                </p>
                <p>
                  Members gain exclusive access to specialized training modules, certification
                  programs, policy dialogue forums, and a vast network of industry experts. By joining
                  ARIFAC, you contribute to a collective effort against money laundering and the
                  financing of terrorism.
                </p>
              </div>
            </div>

            {/* Eligibility Note & Organisation Search */}
            <div className="p-8 md:p-10 bg-gray-50/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                  <AlertCircle className="w-6 h-6" />
                </div>
                Eligibility Note & Organisation Details
              </h2>

              <div className="bg-white p-6 rounded-xl border border-gray-200 text-gray-600 leading-relaxed mb-8">
                <ul className="list-disc pl-5 space-y-2 mb-6">
                  <li>Must be a registered entity or an authorized professional in the financial sector.</li>
                  <li>Must adhere to the guidelines set forth by FIU-India and other regulatory bodies.</li>
                  <li>Requires commitment to continuous learning and sharing of best practices in AML/CFT.</li>
                  <li>The registration must be completed by an Authorised Representative of the entity.</li>
                </ul>

                <hr className="my-6 border-gray-100" />

                {/* Organisation Search */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Search your Organisation *</label>
                  <p className="text-sm text-gray-500 mb-4">Select your organisation if it appears in the list. If not, type your organisation name to proceed as a new entry.</p>

                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setSelectedOrg(e.target.value); // Keep track of manually entered names
                        setNewOrgConsent(false); // Reset consent when typing changes
                        setShowDropdown(true);
                      }}
                      onFocus={() => setShowDropdown(true)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-gray-900"
                      placeholder="Type organisation name..."
                    />

                    {/* Dropdown Results */}
                    {showDropdown && searchQuery.length > 0 && (
                      <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                        {filteredOrgs.length > 0 ? (
                          filteredOrgs.map((org, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setSearchQuery(org);
                                setSelectedOrg(org);
                                setShowDropdown(false);
                              }}
                              className="w-full text-left px-4 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors border-b border-gray-100 last:border-0"
                            >
                              {org}
                            </button>
                          ))
                        ) : (
                          <div className="px-5 py-4 bg-gray-50 flex flex-col gap-3">
                            <div className="text-sm text-gray-600">
                              Organisation not found in pre-approved list.
                            </div>
                            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-gray-200 bg-white hover:border-gray-300 transition-colors">
                              <div className="flex-shrink-0 pt-0.5">
                                <input
                                  type="checkbox"
                                  checked={newOrgConsent}
                                  onChange={(e) => {
                                    setNewOrgConsent(e.target.checked);
                                    if (e.target.checked) setShowDropdown(false);
                                  }}
                                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                              </div>
                              <span className="text-sm font-semibold text-gray-700 leading-tight">
                                I confirm my organisation is not listed. Proceed to register "{searchQuery}" as a new organisation.
                              </span>
                            </label>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Acknowledgment */}
              <div className="flex items-start gap-4 mb-8">
                <div className="flex-shrink-0 pt-1">
                  <input
                    type="checkbox"
                    id="eligibility-check"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </div>
                <label htmlFor="eligibility-check" className="text-gray-700 cursor-pointer select-none">
                  I confirm that I have read and understood the programme overview and eligibility criteria. I am the <strong>Authorised Representative</strong> proceeding to registration on behalf of my entity.
                </label>
              </div>

              {/* Action */}
              <div className="flex justify-end">
                <button
                  disabled={!accepted || !searchQuery.trim() || (filteredOrgs.length === 0 && !newOrgConsent)}
                  className={`inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-base transition-all ${accepted && searchQuery.trim() && (filteredOrgs.length > 0 || newOrgConsent)
                      ? "bg-[#0066cc] text-white hover:bg-[#0077ed] hover:shadow-lg hover:shadow-blue-500/20"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  onClick={handleProceed}
                >
                  Proceed to Registration
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
