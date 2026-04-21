import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'mimeType', 'filesize'],
  },
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ['application/pdf', 'image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
}
