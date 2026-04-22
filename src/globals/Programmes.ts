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
      name: 'labels',
      type: 'group',
      fields: [
        { name: 'activeChannelsLabel', type: 'text', defaultValue: 'Active Channels' },
        { name: 'sessionsLabel', type: 'text', defaultValue: 'Sessions' },
        { name: 'institutionalDialogueEyebrow', type: 'text', defaultValue: 'Institutional Dialogue' },
        { name: 'annualMeetingsDescription', type: 'textarea', defaultValue: 'Structured convergence platforms facilitating knowledge exchange and strategic alignment between ecosystem stakeholders.' },
        { name: 'programmeTableHeader', type: 'text', defaultValue: 'Programme' },
        { name: 'formatTableHeader', type: 'text', defaultValue: 'Format' },
        { name: 'timelineTableHeader', type: 'text', defaultValue: 'Timeline' },
        { name: 'yearTableHeader', type: 'text', defaultValue: 'Year' },
        { name: 'meetingTableHeader', type: 'text', defaultValue: 'Meeting' },
        { name: 'dateTableHeader', type: 'text', defaultValue: 'Date' },
        { name: 'locationTableHeader', type: 'text', defaultValue: 'Location' },
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
