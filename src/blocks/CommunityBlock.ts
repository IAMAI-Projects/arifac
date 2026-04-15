import type { Block } from 'payload'

export const CommunityBlock: Block = {
  slug: 'community',
  fields: [
    { name: 'label', type: 'text', defaultValue: 'National Network' },
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'eyebrow', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    {
      name: 'stat',
      type: 'group',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
      ],
    },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Join the Network' },
    { name: 'ctaLink', type: 'text', defaultValue: '/membership' },
  ],
}
