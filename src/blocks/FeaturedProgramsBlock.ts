import type { Block } from 'payload'

export const FeaturedProgramsBlock: Block = {
  slug: 'featuredPrograms',
  labels: {
    singular: 'Featured Programs',
    plural: 'Featured Programs',
  },
  fields: [
    {
      name: 'sectionEyebrow',
      type: 'text',
      defaultValue: 'Capability Building',
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
      name: 'viewAllText',
      type: 'text',
      defaultValue: 'View Certifications',
    },
    {
      name: 'viewAllLink',
      type: 'text',
      defaultValue: '/certifications',
    },
    {
      name: 'programs',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'category', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'link', type: 'text', required: true },
        { name: 'image', type: 'text' },
      ],
    },
    { name: 'courseDetailsLabel', type: 'text', defaultValue: 'Course Details' },
  ],
}
