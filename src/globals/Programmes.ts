import type { GlobalConfig } from 'payload'

export const Programmes: GlobalConfig = {
  slug: 'programmes',
  versions: {
    drafts: true,
    max: 20,
  },
  fields: [
    {
      name: 'banner',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Programmes' },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'sectionHeadings',
      type: 'group',
      fields: [
        { name: 'engagementStrategy', type: 'text', defaultValue: 'Engagement Strategy' },
        { name: 'programmeSchedule', type: 'text', defaultValue: 'Programme Schedule' },
        { name: 'recentConsultations', type: 'text', defaultValue: 'Recent Consultations' },
        { name: 'annualMeetings', type: 'text', defaultValue: 'Annual Meetings & Regulatory Fora' },
      ],
    },
    {
      name: 'engagementFormats',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        {
          name: 'points',
          type: 'array',
          fields: [
            { name: 'text', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'programmeSchedule',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'type', type: 'text', required: true },
        { name: 'date', type: 'text', required: true },
      ],
    },
    {
      name: 'recentConsultations',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'type', type: 'text', required: true },
        { name: 'date', type: 'text', required: true },
      ],
    },
    {
      name: 'annualMeetings',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'date', type: 'text', required: true },
        { name: 'location', type: 'text', required: true },
      ],
    },
  ],
}
