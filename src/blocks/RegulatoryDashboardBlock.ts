import type { Block } from 'payload'

export const RegulatoryDashboardBlock: Block = {
  slug: 'regulatoryDashboard',
  labels: {
    singular: 'Regulatory Dashboard',
    plural: 'Regulatory Dashboards',
  },
  fields: [
    {
      name: 'sectionEyebrow',
      type: 'text',
      defaultValue: 'Regulatory Intelligence',
    },
    {
      name: 'sectionHeading',
      type: 'text',
      required: true,
    },
    {
      name: 'sectionDescription',
      type: 'textarea',
    },
    {
      name: 'ctaText',
      type: 'text',
      defaultValue: 'Access Full Archive',
    },
    {
      name: 'ctaLink',
      type: 'text',
      defaultValue: '/regulatory-updates',
    },
  ],
}
