import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  fields: [
    {
      name: 'navigation',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'link', type: 'text', required: true },
        { name: 'hasDropdown', type: 'checkbox', defaultValue: false },
        { name: 'dropdownLabel', type: 'text' },
        {
          name: 'dropdownItems',
          type: 'array',
          admin: { condition: (data, siblingData) => siblingData?.hasDropdown },
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'description', type: 'text' },
            { name: 'link', type: 'text', required: true },
          ],
        },
      ],
    },
    { name: 'memberPortalLabel', type: 'text', defaultValue: 'Member' },
    { name: 'memberPortalUrl', type: 'text' },
    { name: 'learnerPortalLabel', type: 'text', defaultValue: 'Learner' },
    { name: 'learnerPortalUrl', type: 'text' },
    { name: 'fiuLogoLink', type: 'text', defaultValue: 'https://fiuindia.gov.in/' },
    { name: 'linkedinUrl', type: 'text', defaultValue: 'https://www.linkedin.com/company/arifac/' },
  ],
}
