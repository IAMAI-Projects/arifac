import type { CollectionConfig } from 'payload'

export const NodalOfficers: CollectionConfig = {
  slug: 'nodal-officers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'organization', 'sector', 'order'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'designation', type: 'text', required: true },
    { name: 'organization', type: 'text', required: true },
    { name: 'sector', type: 'text', required: true },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
