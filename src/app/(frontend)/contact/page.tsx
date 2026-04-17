import { Metadata } from 'next';
import StaticPageLayout from '@/components/StaticPageLayout';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | ARIFAC',
  description: 'We would love to hear from you. Get in touch with us anytime regarding our services and offerings.',
};

export default function ContactPage() {
  return (
    <StaticPageLayout
      label="Get in Touch"
      title="Contact Us"
      description="Reach out to the ARIFAC team for membership inquiries, partnership opportunities, or general information."
    >
      <section className="py-12 lg:py-16 bg-white border-b border-neutral-100">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">

            {/* Left Column: Form */}
            <div className="lg:col-span-7">
              <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-3 block">Send a Message</span>
              <h2 className="text-2xl lg:text-[28px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-6">
                How can we help you?
              </h2>
              <ContactForm />
            </div>

            {/* Right Column: Contact Info & Map */}
            <div className="lg:col-span-5 space-y-10">
              {/* Contact details */}
              <div>
                <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-3 block">Contact Information</span>
                <ul className="space-y-6 mt-6">

                  <li className="flex items-start gap-4 text-neutral-600 text-[15px] leading-relaxed">
                    <div className="w-10 h-10 bg-brand/5 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <strong className="block text-neutral-900 mb-1">Email Us</strong>
                      <a href="mailto:help.arifac@iamai.in" className="hover:text-brand transition-colors">help.arifac@iamai.in</a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4 text-neutral-600 text-[15px] leading-relaxed">
                    <div className="w-10 h-10 bg-brand/5 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>



                    <div>
                      <strong className="block text-neutral-900 mb-1">Call Us</strong>
                      <a href="tel:+919920120875" className="hover:text-brand transition-colors">+91 99201 20875</a>
                      <br /><a href="tel:+918850754237" className="hover:text-brand transition-colors">+91 88507 54237</a>
                    </div>
                  </li>


                </ul>
              </div>

            </div>

          </div>
        </div>
      </section>
    </StaticPageLayout>
  )
}
