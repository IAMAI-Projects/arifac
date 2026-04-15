import type { CollectionConfig } from 'payload'

export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  admin: {
    useAsTitle: 'title',
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'contactEmail', type: 'text' },
    {
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'richText', required: true },
      ],
    },
    {
      name: 'acknowledgment',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'body', type: 'richText' },
      ],
    },
  ],
}
