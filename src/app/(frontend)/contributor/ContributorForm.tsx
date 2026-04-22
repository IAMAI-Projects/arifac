"use client"

import { useState } from "react"

interface ContributorFormLabels {
  personalInfoHeader?: string | null
  contactDetailsHeader?: string | null
  professionalBgHeader?: string | null
  expertiseHeader?: string | null
  expertiseInstruction?: string | null
  contributionHeader?: string | null
  contributionLabel?: string | null
  contributionPlaceholder?: string | null
  linkedinLabel?: string | null
  linkedinPlaceholder?: string | null
  submitLabel?: string | null
  successHeading?: string | null
  successEyebrow?: string | null
  successDescription?: string | null
  whyContributeHeader?: string | null
  firstNameLabel?: string | null
  lastNameLabel?: string | null
  emailLabel?: string | null
  phoneLabel?: string | null
  organisationLabel?: string | null
  designationLabel?: string | null
  experienceLabel?: string | null
  experienceOptions?: Array<{ value: string; label: string }> | null
}

interface ContributorFormProps {
  expertiseAreas: string[]
  whyContribute?: { heading?: string | null; points?: Array<{ text: string }> | null } | null
  formLabels?: ContributorFormLabels | null
}

export default function ContributorForm({ expertiseAreas, whyContribute, formLabels }: ContributorFormProps) {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="py-6 lg:py-8">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* Form */}
          <div className="lg:col-span-8">
            {submitted ? (
              <div className="editorial-card p-6 lg:p-8 bg-brand/[0.03] border-brand/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-1 w-6 bg-brand" />
                  <span className="text-[11px] font-bold text-brand tracking-widest uppercase">{formLabels?.successEyebrow || 'Submitted'}</span>
                </div>
                <h2 className="text-xl lg:text-[28px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-2">
                  {formLabels?.successHeading || 'Thank you for your interest'}
                </h2>
                <p className="text-neutral-600 text-[15px] leading-[1.75] max-w-2xl">
                  {formLabels?.successDescription || 'We have received your application. Our team will review your profile and get back to you shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <div className="flex items-center gap-3 mb-4 pb-2 border-b border-neutral-100">
                    <div className="h-1 w-6 bg-brand" />
                    <span className="text-[11px] font-bold text-brand tracking-widest uppercase">{formLabels?.personalInfoHeader || 'Personal Information'}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-[12px] font-bold text-neutral-700 mb-1.5">{formLabels?.firstNameLabel || 'First Name'} <span className="text-brand">*</span></label>
                      <input type="text" id="firstName" name="firstName" required className="w-full border border-neutral-200 px-3 py-2.5 text-[14px] text-neutral-900 bg-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-[12px] font-bold text-neutral-700 mb-1.5">{formLabels?.lastNameLabel || 'Last Name'} <span className="text-brand">*</span></label>
                      <input type="text" id="lastName" name="lastName" required className="w-full border border-neutral-200 px-3 py-2.5 text-[14px] text-neutral-900 bg-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div>
                  <div className="flex items-center gap-3 mb-4 pb-2 border-b border-neutral-100">
                    <div className="h-1 w-6 bg-brand" />
                    <span className="text-[11px] font-bold text-brand tracking-widest uppercase">{formLabels?.contactDetailsHeader || 'Contact Details'}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-[12px] font-bold text-neutral-700 mb-1.5">{formLabels?.emailLabel || 'Email Address'} <span className="text-brand">*</span></label>
                      <input type="email" id="email" name="email" required className="w-full border border-neutral-200 px-3 py-2.5 text-[14px] text-neutral-900 bg-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-[12px] font-bold text-neutral-700 mb-1.5">{formLabels?.phoneLabel || 'Phone Number'} <span className="text-brand">*</span></label>
                      <input type="tel" id="phone" name="phone" required className="w-full border border-neutral-200 px-3 py-2.5 text-[14px] text-neutral-900 bg-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Professional Background */}
                <div>
                  <div className="flex items-center gap-3 mb-4 pb-2 border-b border-neutral-100">
                    <div className="h-1 w-6 bg-brand" />
                    <span className="text-[11px] font-bold text-brand tracking-widest uppercase">{formLabels?.professionalBgHeader || 'Professional Background'}</span>
                  </div>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="organisation" className="block text-[12px] font-bold text-neutral-700 mb-1.5">{formLabels?.organisationLabel || 'Organisation'} <span className="text-brand">*</span></label>
                        <input type="text" id="organisation" name="organisation" required className="w-full border border-neutral-200 px-3 py-2.5 text-[14px] text-neutral-900 bg-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors" />
                      </div>
                      <div>
                        <label htmlFor="designation" className="block text-[12px] font-bold text-neutral-700 mb-1.5">{formLabels?.designationLabel || 'Designation'} <span className="text-brand">*</span></label>
                        <input type="text" id="designation" name="designation" required className="w-full border border-neutral-200 px-3 py-2.5 text-[14px] text-neutral-900 bg-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="experience" className="block text-[12px] font-bold text-neutral-700 mb-1.5">{formLabels?.experienceLabel || 'Years of Experience'} <span className="text-brand">*</span></label>
                      <select id="experience" name="experience" required className="w-full border border-neutral-200 px-3 py-2.5 text-[14px] text-neutral-900 bg-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors">
                        <option value="">Select</option>
                        {formLabels?.experienceOptions && formLabels.experienceOptions.length > 0 ? (
                          formLabels.experienceOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))
                        ) : (
                          <>
                            <option value="0-2">0 - 2 years</option>
                            <option value="3-5">3 - 5 years</option>
                            <option value="6-10">6 - 10 years</option>
                            <option value="11-15">11 - 15 years</option>
                            <option value="15+">15+ years</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Area of Expertise */}
                <div>
                  <div className="flex items-center gap-3 mb-4 pb-2 border-b border-neutral-100">
                    <div className="h-1 w-6 bg-brand" />
                    <span className="text-[11px] font-bold text-brand tracking-widest uppercase">{formLabels?.expertiseHeader || 'Area of Expertise'}</span>
                  </div>
                  <p className="text-[13px] text-neutral-500 mb-3">{formLabels?.expertiseInstruction || 'Select all that apply'}</p>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {expertiseAreas.map((area) => (
                      <label key={area} className="flex items-center gap-2.5 px-3 py-2.5 border border-neutral-200 hover:border-brand/30 hover:bg-brand/[0.02] transition-colors cursor-pointer">
                        <input type="checkbox" name="expertise" value={area} className="w-3.5 h-3.5 accent-brand" />
                        <span className="text-[13px] text-neutral-700">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* How You Can Contribute */}
                <div>
                  <div className="flex items-center gap-3 mb-4 pb-2 border-b border-neutral-100">
                    <div className="h-1 w-6 bg-brand" />
                    <span className="text-[11px] font-bold text-brand tracking-widest uppercase">{formLabels?.contributionHeader || 'How You Can Contribute'}</span>
                  </div>
                  <div>
                    <label htmlFor="contribution" className="block text-[12px] font-bold text-neutral-700 mb-1.5">{formLabels?.contributionLabel || 'Tell us how you would like to contribute to ARIFAC'} <span className="text-brand">*</span></label>
                    <textarea id="contribution" name="contribution" required rows={4} className="w-full border border-neutral-200 px-3 py-2.5 text-[14px] text-neutral-900 bg-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors resize-vertical" placeholder={formLabels?.contributionPlaceholder || "E.g. training delivery, content authoring, research, speaking at events, policy consultation..."} />
                  </div>
                </div>

                {/* LinkedIn */}
                <div>
                  <label htmlFor="linkedin" className="block text-[12px] font-bold text-neutral-700 mb-1.5">{formLabels?.linkedinLabel || 'LinkedIn Profile'}</label>
                  <input type="url" id="linkedin" name="linkedin" className="w-full border border-neutral-200 px-3 py-2.5 text-[14px] text-neutral-900 bg-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors" placeholder={formLabels?.linkedinPlaceholder || "https://linkedin.com/in/..."} />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button type="submit" className="bg-brand text-white text-[13px] font-bold uppercase tracking-widest px-8 py-3 hover:bg-brand/90 transition-colors">
                    {formLabels?.submitLabel || 'Submit Application'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="editorial-card p-5 sticky top-28">
              <div className="flex items-center gap-3 mb-3 pb-2 border-b border-neutral-100">
                <div className="h-1 w-6 bg-brand" />
                <span className="text-[11px] font-bold text-brand tracking-widest uppercase">{formLabels?.whyContributeHeader || 'Why Contribute'}</span>
              </div>
              <ul className="space-y-3">
                {(whyContribute?.points ?? []).map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-[3px] bg-brand flex-shrink-0" />
                    <span className="text-[13px] text-neutral-700 leading-[1.6]">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
