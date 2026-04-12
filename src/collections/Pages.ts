import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/HeroBlock'
import { StatsBlock } from '../blocks/StatsBlock'
import { CapabilityMatrixBlock } from '../blocks/CapabilityMatrixBlock'
import { RegulatoryDashboardBlock } from '../blocks/RegulatoryDashboardBlock'
import { FeaturedProgramsBlock } from '../blocks/FeaturedProgramsBlock'
import { CTABlock } from '../blocks/CTABlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'pageType',
      type: 'select',
      required: true,
      defaultValue: 'simple',
      options: [
        { label: 'Simple', value: 'simple' },
        { label: 'Home', value: 'home' },
        { label: 'About', value: 'about' },
        { label: 'Contact', value: 'contact' },
      ],
    },
    {
      name: 'banner',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'body',
      type: 'richText',
      admin: {
        condition: (data) => data?.pageType === 'simple',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        StatsBlock,
        CapabilityMatrixBlock,
        RegulatoryDashboardBlock,
        FeaturedProgramsBlock,
        CTABlock,
      ],
      admin: {
        condition: (data) => data?.pageType === 'home',
      },
    },
    {
      name: 'whySection',
      type: 'group',
      admin: { condition: (data) => data?.pageType === 'about' },
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'The Challenge' },
        { name: 'heading', type: 'text', defaultValue: 'Why ARIFAC' },
        { name: 'description', type: 'textarea' },
        {
          name: 'threats',
          type: 'array',
          fields: [{ name: 'label', type: 'text', required: true }],
        },
        {
          name: 'alignedWith',
          type: 'group',
          fields: [
            { name: 'description', type: 'textarea' },
            {
              name: 'items',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'value', type: 'text', required: true },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'whatSection',
      type: 'group',
      admin: { condition: (data) => data?.pageType === 'about' },
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Operational Focus' },
        { name: 'heading', type: 'text', defaultValue: 'What ARIFAC Does' },
        { name: 'description', type: 'textarea' },
        {
          name: 'focusAreas',
          type: 'array',
          fields: [
            { name: 'number', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            {
              name: 'points',
              type: 'array',
              fields: [{ name: 'text', type: 'text', required: true }],
            },
          ],
        },
      ],
    },
    {
      name: 'whoSection',
      type: 'group',
      admin: { condition: (data) => data?.pageType === 'about' },
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Membership' },
        { name: 'heading', type: 'text', defaultValue: 'Who Should Engage' },
        { name: 'description', type: 'textarea' },
        { name: 'ctaLabel', type: 'text', defaultValue: 'Explore Membership' },
        { name: 'ctaLink', type: 'text', defaultValue: '/membership' },
        {
          name: 'audiences',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'subtitle', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}
