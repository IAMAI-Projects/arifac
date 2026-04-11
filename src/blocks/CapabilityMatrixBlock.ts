import type { Block } from 'payload'

export const CapabilityMatrixBlock: Block = {
  slug: 'capabilityMatrix',
  labels: {
    singular: 'Capability Matrix',
    plural: 'Capability Matrices',
  },
  fields: [
    {
      name: 'sectionHeading',
      type: 'text',
      required: true,
    },
    {
      name: 'sectionHeadingHighlight',
      type: 'text',
    },
    {
      name: 'sectionDescription',
      type: 'textarea',
    },
    {
      name: 'mandates',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'linkText', type: 'text', required: true },
        { name: 'linkRef', type: 'text', required: true },
      ],
    },
  ],
}
