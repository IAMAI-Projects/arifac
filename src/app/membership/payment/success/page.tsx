'use client';

import { useSearchParams } from 'next/navigation';
import { CheckCircle, Download, Home } from 'lucide-react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { Suspense } from 'react';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'N/A';
  const trackingId = searchParams.get('trackingId') || 'N/A';

  return (
    <main className="bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen flex flex-col font-sans">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="flex justify-center mb-6"
          >
            <div className="p-4 bg-green-100 rounded-full">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </motion.div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-8">
            Your membership registration payment has been processed successfully.
          </p>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 text-left space-y-4"
          >
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Order ID</p>
              <p className="font-mono font-semibold text-gray-900 break-all">{orderId}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Tracking ID</p>
              <p className="font-mono font-semibold text-gray-900 break-all">{trackingId}</p>
            </div>
          </motion.div>

          {/* What's Next */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-left text-sm text-gray-700"
          >
            <p className="font-semibold text-blue-900 mb-2">What's next?</p>
            <ul className="list-disc list-inside space-y-1 text-blue-800">
              <li>Your membership is now active</li>
              <li>Download your membership certificate</li>
              <li>Access exclusive resources and trainings</li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/membership/dashboard"
              className="w-full inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <Home className="w-5 h-5" />
              Go to Dashboard
            </Link>
            <Link
              href="/lms/certificate"
              className="w-full inline-flex items-center justify-center gap-2 bg-white border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Certificate
            </Link>
          </div>

          {/* Support */}
          <p className="text-xs text-gray-500 mt-8">
            Need help? <a href="mailto:support@arifac.org" className="text-green-600 hover:underline font-semibold">Contact Support</a>
          </p>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="flex-grow flex items-center justify-center pt-32 pb-20">Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
