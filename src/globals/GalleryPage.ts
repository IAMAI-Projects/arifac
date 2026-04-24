import type { GlobalConfig } from 'payload'

export const GalleryPage: GlobalConfig = {
  slug: 'gallery-page',
  admin: {
    description: 'Content for the bottom sections of the Gallery page.',
  },
  fields: [
    {
      name: 'aboutSection',
      type: 'group',
      label: 'About Section (left card)',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'About These Engagements' },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: "ARIFAC engagements are designed to support industry collaboration and capability building across AML/CFT domains. Participation includes stakeholders from financial institutions, fintech platforms, technology providers, and allied sectors.",
        },
        {
          name: 'features',
          type: 'array',
          maxRows: 4,
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'description', type: 'text' },
          ],
          defaultValue: [
            { label: 'Compliance', description: 'Strengthening regulatory adherence.' },
            { label: 'Collaboration', description: 'Structured dialogue across sectors.' },
          ],
        },
      ],
    },
    {
      name: 'ctaSection',
      type: 'group',
      label: 'CTA Section (right dark card)',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Explore ARIFAC Programs' },
        {
          name: 'description',
          type: 'text',
          defaultValue: "To learn more about ARIFAC's structured initiatives and apply for participation in our upcoming programs.",
        },
        { name: 'primaryButtonLabel', type: 'text', defaultValue: 'Explore Programs' },
        { name: 'primaryButtonLink', type: 'text', defaultValue: '/programmes' },
        { name: 'secondaryButtonLabel', type: 'text', defaultValue: 'Membership' },
        { name: 'secondaryButtonLink', type: 'text', defaultValue: '/membership' },
      ],
    },
    {
      name: 'importantNote',
      type: 'group',
      label: 'Important Note (below cards)',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Important Note' },
        {
          name: 'text',
          type: 'textarea',
          defaultValue: 'Access to specific consultations, working groups, and training programs may be subject to eligibility, participation criteria, and availability.',
        },
      ],
    },
  ],
}
