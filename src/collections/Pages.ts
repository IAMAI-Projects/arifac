import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/HeroBlock'
import { StatsBlock } from '../blocks/StatsBlock'
import { CapabilityMatrixBlock } from '../blocks/CapabilityMatrixBlock'
import { RegulatoryDashboardBlock } from '../blocks/RegulatoryDashboardBlock'
import { FeaturedProgramsBlock } from '../blocks/FeaturedProgramsBlock'
import { CTABlock } from '../blocks/CTABlock'
import { PartnershipsBlock } from '../blocks/PartnershipsBlock'

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
        { label: 'Membership', value: 'membership' },
        { label: 'Learners', value: 'learners' },
        { label: 'Contributor', value: 'contributor' },
        { label: 'Certifications', value: 'certifications' },
        { label: 'Updates', value: 'updates' },
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
        PartnershipsBlock,
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
    // Membership fields
    {
      name: 'membershipIntro',
      type: 'group',
      admin: { condition: (data) => data?.pageType === 'membership' },
      fields: [
        { name: 'subheading', type: 'textarea' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      admin: { condition: (data) => data?.pageType === 'membership' },
      fields: [
        { name: 'category', type: 'text', required: true },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'responsibilities',
      type: 'array',
      admin: { condition: (data) => data?.pageType === 'membership' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
      ],
    },
    {
      name: 'validityTerms',
      type: 'array',
      admin: { condition: (data) => data?.pageType === 'membership' },
      fields: [
        { name: 'text', type: 'text', required: true },
      ],
    },
    {
      name: 'feeTables',
      type: 'group',
      admin: { condition: (data) => data?.pageType === 'membership' },
      fields: [
        {
          name: 'turnoverBased',
          type: 'array',
          fields: [
            { name: 'tier', type: 'text', required: true },
            { name: 'fee', type: 'text', required: true },
          ],
        },
        {
          name: 'aumBased',
          type: 'array',
          fields: [
            { name: 'tier', type: 'text', required: true },
            { name: 'fee', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'membershipCta',
      type: 'group',
      admin: { condition: (data) => data?.pageType === 'membership' },
      fields: [
        { name: 'label', type: 'text' },
        { name: 'link', type: 'text' },
      ],
    },
    // Learners fields
    {
      name: 'accessItems',
      type: 'array',
      admin: { condition: (data) => data?.pageType === 'learners' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
      ],
    },
    {
      name: 'learnersCta',
      type: 'group',
      admin: { condition: (data) => data?.pageType === 'learners' },
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'buttonLabel', type: 'text' },
        { name: 'buttonLink', type: 'text' },
      ],
    },
    // Contributor fields
    {
      name: 'expertiseAreas',
      type: 'array',
      admin: { condition: (data) => data?.pageType === 'contributor' },
      fields: [
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'whyContribute',
      type: 'group',
      admin: { condition: (data) => data?.pageType === 'contributor' },
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Why Contribute to ARIFAC?' },
        {
          name: 'points',
          type: 'array',
          fields: [
            { name: 'text', type: 'text', required: true },
          ],
        },
      ],
    },
    // Certifications fields
    {
      name: 'pathwayTiers',
      type: 'array',
      admin: { condition: (data) => data?.pageType === 'certifications' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
      ],
    },
  ],
}
