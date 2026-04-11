import type { CollectionConfig } from 'payload'

export const RegulatoryUpdates: CollectionConfig = {
  slug: 'regulatory-updates',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'issuingBody', 'category', 'date'],
  },
  versions: {
    drafts: false,
    maxPerDoc: 20,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'referenceNumber',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'AML/CFT', value: 'aml-cft' },
        { label: 'KYC/CDD', value: 'kyc-cdd' },
        { label: 'Reporting', value: 'reporting' },
        { label: 'Digital Onboarding', value: 'digital-onboarding' },
        { label: 'Fraud & Cyber', value: 'fraud-cyber' },
        { label: 'Sanctions', value: 'sanctions' },
        { label: 'Compliance Governance', value: 'compliance-governance' },
      ],
    },
    {
      name: 'issuingBody',
      type: 'select',
      required: true,
      options: [
        { label: 'RBI', value: 'rbi' },
        { label: 'FIU-IND', value: 'fiu-ind' },
        { label: 'SEBI', value: 'sebi' },
        { label: 'IRDAI', value: 'irdai' },
      ],
    },
    {
      name: 'link',
      type: 'text',
    },
  ],
}
