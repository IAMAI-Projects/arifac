import type { CollectionConfig } from 'payload'

export const TrainingLeadsDirectory: CollectionConfig = {
  slug: 'training-leads-directory',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'organization', 'specialization', 'order'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'designation', type: 'text' },
    { name: 'organization', type: 'text', required: true },
    { name: 'specialization', type: 'text' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
