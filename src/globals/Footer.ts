import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    { name: 'tagline', type: 'textarea' },
    { name: 'initiativeLabel', type: 'text', defaultValue: 'An IAMAI Initiative' },
    {
      name: 'linkGroups',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'bottomLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    { name: 'copyrightText', type: 'text', defaultValue: 'ARIFAC | IAMAI. All rights reserved.' },
  ],
}
