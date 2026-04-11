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
    drafts: false,
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
  ],
}
