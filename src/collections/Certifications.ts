import type { CollectionConfig } from 'payload'

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  admin: {
    useAsTitle: 'title',
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'level',
      type: 'text',
      required: true,
    },
    {
      name: 'focus',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      required: true,
    },
    {
      name: 'format',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'curriculum',
      type: 'array',
      fields: [
        { name: 'item', type: 'text', required: true },
      ],
    },
    {
      name: 'duration',
      type: 'text',
      required: true,
    },
    {
      name: 'launchStatus',
      type: 'select',
      required: true,
      defaultValue: 'coming-soon',
      options: [
        { label: 'Live', value: 'live' },
        { label: 'Coming Soon', value: 'coming-soon' },
      ],
      admin: {
        description: 'Shown as a badge on the certification card.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 100,
      admin: {
        description: 'Lower numbers appear first on the certifications page.',
      },
    },
  ],
}
