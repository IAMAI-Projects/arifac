import type { CollectionConfig } from 'payload'

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  admin: {
    useAsTitle: 'title',
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
      type: 'select',
      required: true,
      options: [
        { label: 'Foundation', value: 'Foundation' },
        { label: 'Professional', value: 'Professional' },
        { label: 'Specialist', value: 'Specialist' },
        { label: 'Strategic', value: 'Strategic' },
      ],
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
  ],
}
