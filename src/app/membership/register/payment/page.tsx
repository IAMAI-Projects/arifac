'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Building2, User, Globe, MapPin, CheckCircle2, Lock, ShieldCheck, Mail, Phone, ExternalLink, AlertCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PaymentPage() {
  const [paymentData, setPaymentData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const ccavenueFormRef = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();

  // Check for CCAvenue callback status
  useEffect(() => {
    const status = searchParams.get('status');
    const message = searchParams.get('message');
    const orderId = searchParams.get('order');
    const trackingId = searchParams.get('tracking');

    if (status === 'success') {
      setIsSuccess(true);
      setTimeout(() => {
        window.location.href = '/membership/dashboard';
      }, 3000);
    } else if (status === 'failed' || status === 'error') {
      setPaymentError(message || 'Payment failed. Please try again.');
    } else if (status === 'cancelled') {
      setPaymentError('Payment was cancelled. You can try again.');
    }
  }, [searchParams]);

  useEffect(() => {
    const data = sessionStorage.getItem('membershipPaymentData');
    if (data) {
      setPaymentData(JSON.parse(data));
    } else {
      // Fallback for demo if someone navigates directly
      setPaymentData({
        orgName: 'Demo Organisation',
        registeredAddress: '123, Business Hub, Mumbai, Maharashtra 400001',
        orgWebsite: 'https://example.com',
        primarySector: 'Fintech & Digital Financial Services',
        entityType: 'Private Limited Company',
        identifierType: 'GST Registration Number (GSTIN)',
        identifierNumber: '27AABCU1234F1Z5',
        email: 'representative@example.com',
        fullName: 'John Doe',
        designation: 'Director',
        countryCode: '+91',
        mobile: '9876543210',
        baseAmount: 50000,
        taxAmount: 9000,
        totalAmount: 59000
      });
    }
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentError(null);

    try {
      // Call our API to get encrypted CCAvenue request
      const response = await fetch('/api/payment/ccavenue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: paymentData.totalAmount,
          customerName: paymentData.fullName || paymentData.orgName,
          customerEmail: paymentData.email,
          customerPhone: paymentData.mobile,
          billingAddress: paymentData.registeredAddress,
          billingCity: paymentData.billingCity || '',
          billingState: paymentData.billingState || '',
          billingZip: paymentData.billingZip || '',
          applicationId: paymentData.applicationId || '',
          paymentType: 'membership',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to initiate payment');
      }

      const { encRequest, accessCode, postUrl } = await response.json();

      // Create and submit the CCAvenue form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = postUrl;

      const encRequestInput = document.createElement('input');
      encRequestInput.type = 'hidden';
      encRequestInput.name = 'encRequest';
      encRequestInput.value = encRequest;
      form.appendChild(encRequestInput);

      const accessCodeInput = document.createElement('input');
      accessCodeInput.type = 'hidden';
      accessCodeInput.name = 'access_code';
      accessCodeInput.value = accessCode;
      form.appendChild(accessCodeInput);

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error('Payment initiation error:', error);
      setPaymentError('Failed to initiate payment. Please try again.');
      setIsProcessing(false);
    }
  };

  if (!paymentData) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <main className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <Navbar />

      <div className="flex-grow pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">

          {/* Left Side: Review Details */}
          <div className="flex-grow lg:w-2/3">
            <br />
            <Link href="/membership/register/form-a" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Form
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
            >
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-3xl font-bold text-gray-900">Review & Pay</h1>
                  <div className="flex gap-2">
                    <div className="h-2 w-8 rounded-full bg-blue-600"></div>
                    <div className="h-2 w-8 rounded-full bg-blue-600"></div>
                    <div className="h-2 w-8 rounded-full bg-gray-200"></div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Organisation Details Section */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Building2 className="w-4 h-4" /> Organisation Details
                    </h3>
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 border border-gray-100">
                          <Building2 size={24} />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{paymentData.orgName}</h4>
                          {paymentData.orgWebsite && (
                            <a href={paymentData.orgWebsite} target="_blank" className="text-blue-600 text-sm flex items-center gap-1 hover:underline mt-1">
                              {paymentData.orgWebsite} <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">Address</p>
                            <p className="text-sm text-gray-700 leading-relaxed font-medium">{paymentData.registeredAddress}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Globe className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">Industry & Entity</p>
                            <p className="text-sm text-gray-700 font-medium">{paymentData.primarySector}</p>
                            <p className="text-xs text-gray-500">{paymentData.entityType}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Representative Details Section */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <User className="w-4 h-4" /> Representative Details
                    </h3>
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                          <User className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">Authorized Person</p>
                            <p className="text-base font-bold text-gray-900">{paymentData.fullName}</p>
                            <p className="text-sm text-gray-600">{paymentData.designation}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">Contact Information</p>
                            <p className="text-sm text-gray-700 font-medium">{paymentData.email}</p>
                            <p className="text-sm text-gray-700 font-medium">{paymentData.countryCode} {paymentData.mobile}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 sticky top-32"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-900">{paymentData.orgName}</p>
                    <p className="text-sm text-gray-500">Membership Fee</p>
                  </div>
                  <p className="font-bold">₹{paymentData.baseAmount.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="border-t border-dashed border-gray-200 py-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{paymentData.baseAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes (18% GST)</span>
                  <span>₹{paymentData.taxAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold text-gray-900">Total Amount</span>
                </div>
                <div className="text-3xl font-black text-blue-600">
                  ₹{paymentData.totalAmount.toLocaleString('en-IN')}
                </div>
              </div>



              {/* Payment Error Display */}
              {paymentError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-800">Payment Issue</p>
                    <p className="text-sm text-red-600 mt-1">{paymentError}</p>
                  </div>
                  <button onClick={() => setPaymentError(null)} className="ml-auto shrink-0">
                    <XCircle className="w-4 h-4 text-red-400 hover:text-red-600" />
                  </button>
                </div>
              )}

              <form onSubmit={handlePayment} className="pt-4">
                <button
                  disabled={isProcessing || isSuccess}
                  type="submit"
                  className="w-full bg-[#0066cc] text-white py-5 rounded-2xl font-bold text-xl hover:bg-[#0077ed] hover:shadow-2xl hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      Redirecting to CCAvenue...
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="w-6 h-6" />
                      Payment Successful
                    </>
                  ) : (
                    `Pay ₹${paymentData.totalAmount.toLocaleString('en-IN')}`
                  )}
                </button>

                <div className="flex items-center justify-center gap-6 pt-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-widest font-bold">Secure SSL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-widest font-bold">CCAvenue</span>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/40 backdrop-blur-md px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[40px] p-10 md:p-16 max-w-lg w-full text-center shadow-2xl relative overflow-hidden"
            >
              {/* Confetti-like decoration */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"></div>

              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>

              <h2 className="text-4xl font-black text-gray-900 mb-4">Payment Successful!</h2>
              <p className="text-lg text-gray-600 mb-10">
                Welcome to ARIFAC. Your membership has been confirmed. Redirecting you to your dashboard...
              </p>

              <div className="flex flex-col gap-4">
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3 }}
                    className="h-full bg-blue-600"
                  />
                </div>
                <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">
                  Loading Experience
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
