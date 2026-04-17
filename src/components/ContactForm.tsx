'use client';

import { useState } from 'react';
import { submitContactForm } from '@/app/actions/contact';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    setIsSubmitting(true);
    setSuccess(false);
    setError(false);

    try {
      const formData = new FormData(form);
      const result = await submitContactForm(formData);
      
      if (result.success) {
        setSuccess(true);
        form.reset();
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <p className="text-green-700 text-sm font-bold">Thank you! Your message has been sent successfully. We will get back to you shortly.</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700 text-sm font-bold">Oops! Something went wrong. Please try again later.</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-[13px] font-bold text-neutral-900 tracking-wide uppercase">Full Name <span className="text-brand">*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3 text-[15px] focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
            placeholder="Enter your full name"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-[13px] font-bold text-neutral-900 tracking-wide uppercase">Email Address <span className="text-brand">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3 text-[15px] focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
            placeholder="Enter your email address"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-[13px] font-bold text-neutral-900 tracking-wide uppercase">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3 text-[15px] focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="subject" className="block text-[13px] font-bold text-neutral-900 tracking-wide uppercase">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3 text-[15px] focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
            placeholder="How can we help?"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-[13px] font-bold text-neutral-900 tracking-wide uppercase">Message <span className="text-brand">*</span></label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3 text-[15px] focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all resize-y"
          placeholder="Write your message here..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-brand text-white text-[13px] font-bold uppercase tracking-widest px-8 py-3.5 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        style={{ transition: 'all 0.3s ease' }}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span className="group-hover:opacity-90">Send Message</span>
            <svg className="w-4 h-4 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  )
}
