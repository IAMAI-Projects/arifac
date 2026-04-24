import type { CollectionConfig } from 'payload'

export const GalleryItems: CollectionConfig = {
  slug: 'gallery-items',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order', 'createdAt'],
    description: 'Upload and manage gallery photos displayed on the Gallery page.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Caption shown below the image in the lightbox.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'industry-consultations',
      options: [
        { label: 'Industry Consultations', value: 'industry-consultations' },
        { label: 'Training & Capacity Building', value: 'training-capacity-building' },
        { label: 'Working Groups & Expert Engagements', value: 'working-groups' },
        { label: 'Flagship Programs & Events', value: 'flagship-programs' },
      ],
    },
    {
      name: 'description',
      type: 'text',
      admin: {
        description: 'Optional short description shown in the lightbox.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 100,
      admin: {
        description: 'Lower numbers appear first. Use to control display order.',
      },
    },
  ],
}
