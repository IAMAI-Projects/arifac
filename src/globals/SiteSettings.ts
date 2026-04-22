import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  fields: [
    {
      name: 'siteTitle',
      type: 'text',
      defaultValue: 'ARIFAC — Alliance of Reporting Entities in India for AML/CFT',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      defaultValue: "ARIFAC enables collaboration, capacity building, and coordinated action to strengthen India's financial crime prevention ecosystem under the guidance of FIU-IND.",
    },
    {
      name: 'categoryLabels',
      type: 'array',
      admin: { description: 'Display labels for regulatory update categories (used on Updates and Home pages)' },
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'Internal slug e.g. aml-cft' } },
        { name: 'label', type: 'text', required: true, admin: { description: 'Display label e.g. AML / CFT' } },
      ],
    },
    {
      name: 'issuingBodyLabels',
      type: 'array',
      admin: { description: 'Display labels for issuing bodies (used on Updates and Home pages)' },
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}
