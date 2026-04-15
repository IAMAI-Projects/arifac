import type { Block } from 'payload'

export const PartnershipsBlock: Block = {
  slug: 'partnerships',
  fields: [
    { name: 'label', type: 'text', defaultValue: 'Partnerships' },
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'guidanceCard',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Strategic Guidance' },
        { name: 'title', type: 'text', required: true },
        { name: 'logoUrl', type: 'text' },
      ],
    },
    { name: 'disclaimer', type: 'text' },
  ],
}
