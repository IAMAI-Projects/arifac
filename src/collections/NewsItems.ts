import type { CollectionConfig } from 'payload'

export const NewsItems: CollectionConfig = {
  slug: 'news-items',
  admin: {
    useAsTitle: 'text',
    defaultColumns: ['text', 'published', 'createdAt'],
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
      required: true,
    },
  ],
}
