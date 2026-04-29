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
        { label: 'Members', value: 'members' },
        { label: 'Training Leads', value: 'training-leads' },
        { label: 'Nodal Officers', value: 'nodal-officers' },
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
    {
      name: 'membershipSections',
      type: 'group',
      admin: { condition: (data) => data?.pageType === 'membership' },
      fields: [
        { name: 'benefitsEyebrow', type: 'text', defaultValue: 'What ARIFAC Engagement Enables' },
        { name: 'benefitsHeading', type: 'text', defaultValue: 'Capacity building and collaboration benefits for the financial intelligence ecosystem.' },
        { name: 'benefitsDescription', type: 'text', defaultValue: 'Benefits differ by engagement tier, with enhanced access for Members.' },
        { name: 'responsibilitiesEyebrow', type: 'text', defaultValue: 'Obligations' },
        { name: 'responsibilitiesHeading', type: 'text', defaultValue: 'Member / Affiliate Responsibilities' },
        { name: 'responsibilitiesDescription', type: 'textarea', defaultValue: 'Members are expected to maintain the highest standards of integrity, professionalism, and compliance.' },
        { name: 'responsibilitiesDisclaimer', type: 'textarea', defaultValue: 'Members must not disclose sensitive regulatory or transaction-related information, including Suspicious Transaction Reporting (STR)-related discussions or any confidential compliance data.' },
        { name: 'validityEyebrow', type: 'text', defaultValue: 'Terms' },
        { name: 'validityHeading', type: 'text', defaultValue: 'Validity & Renewal' },
        { name: 'feesEyebrow', type: 'text', defaultValue: 'Pricing' },
        { name: 'feesHeading', type: 'text', defaultValue: 'Fees' },
        { name: 'feesDescription', type: 'textarea', defaultValue: "Membership fees are determined by your organisation's self-declared annual turnover or Assets Under Management (AUM), as applicable. All fees are exclusive of taxes and subject to revision." },
        { name: 'feeScheduleLabel', type: 'text', defaultValue: 'To view the schedule, click here' },
        { name: 'turnoverLabel', type: 'text', defaultValue: 'Turnover-Based' },
        { name: 'aumLabel', type: 'text', defaultValue: 'AUM-Based' },
        { name: 'feeSuffix', type: 'text', defaultValue: '+ taxes' },
        { name: 'turnoverColumnHeader', type: 'text', defaultValue: 'Turnover ₹' },
        { name: 'aumColumnHeader', type: 'text', defaultValue: 'AUM ₹' },
        { name: 'feeColumnHeader', type: 'text', defaultValue: 'Annual Fee' },
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
    {
      name: 'learnersSection',
      type: 'group',
      admin: { condition: (data) => data?.pageType === 'learners' },
      fields: [
        { name: 'accessEyebrow', type: 'text', defaultValue: 'Access' },
        { name: 'accessHeading', type: 'text', defaultValue: 'Building a foundation for you to learn, engage, and grow' },
        { name: 'accessDescription', type: 'text', defaultValue: 'Via access to:' },
        { name: 'ctaEyebrow', type: 'text', defaultValue: 'Open & Free' },
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
    {
      name: 'contributorFormLabels',
      type: 'group',
      admin: { condition: (data) => data?.pageType === 'contributor' },
      fields: [
        { name: 'personalInfoHeader', type: 'text', defaultValue: 'Personal Information' },
        { name: 'contactDetailsHeader', type: 'text', defaultValue: 'Contact Details' },
        { name: 'professionalBgHeader', type: 'text', defaultValue: 'Professional Background' },
        { name: 'expertiseHeader', type: 'text', defaultValue: 'Area of Expertise' },
        { name: 'expertiseInstruction', type: 'text', defaultValue: 'Select all that apply' },
        { name: 'contributionHeader', type: 'text', defaultValue: 'How You Can Contribute' },
        { name: 'contributionLabel', type: 'text', defaultValue: 'Tell us how you would like to contribute to ARIFAC' },
        { name: 'contributionPlaceholder', type: 'text', defaultValue: 'E.g. training delivery, content authoring, research, speaking at events, policy consultation...' },
        { name: 'linkedinLabel', type: 'text', defaultValue: 'LinkedIn Profile' },
        { name: 'linkedinPlaceholder', type: 'text', defaultValue: 'https://linkedin.com/in/...' },
        { name: 'submitLabel', type: 'text', defaultValue: 'Submit Application' },
        { name: 'successHeading', type: 'text', defaultValue: 'Thank you for your interest' },
        { name: 'successEyebrow', type: 'text', defaultValue: 'Submitted' },
        { name: 'successDescription', type: 'textarea', defaultValue: 'We have received your application. Our team will review your profile and get back to you shortly.' },
        { name: 'whyContributeHeader', type: 'text', defaultValue: 'Why Contribute' },
        { name: 'firstNameLabel', type: 'text', defaultValue: 'First Name' },
        { name: 'lastNameLabel', type: 'text', defaultValue: 'Last Name' },
        { name: 'emailLabel', type: 'text', defaultValue: 'Email Address' },
        { name: 'phoneLabel', type: 'text', defaultValue: 'Phone Number' },
        { name: 'organisationLabel', type: 'text', defaultValue: 'Organisation' },
        { name: 'designationLabel', type: 'text', defaultValue: 'Designation' },
        { name: 'experienceLabel', type: 'text', defaultValue: 'Years of Experience' },
        {
          name: 'experienceOptions',
          type: 'array',
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
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
    {
      name: 'certificationsUI',
      type: 'group',
      admin: { condition: (data) => data?.pageType === 'certifications' },
      fields: [
        { name: 'filterTitle', type: 'text', defaultValue: 'Filter Programmes' },
        { name: 'searchLabel', type: 'text', defaultValue: 'Search' },
        { name: 'searchPlaceholder', type: 'text', defaultValue: 'Title, focus, topic...' },
        { name: 'levelLabel', type: 'text', defaultValue: 'Level' },
        { name: 'formatLabel', type: 'text', defaultValue: 'Format' },
        { name: 'clearFiltersLabel', type: 'text', defaultValue: 'Clear Filters' },
        { name: 'curriculumLabel', type: 'text', defaultValue: 'Curriculum' },
        { name: 'liveLabel', type: 'text', defaultValue: 'Live' },
        { name: 'liveDescription', type: 'textarea', defaultValue: 'This course is now live for employees of reporting entities, based on nominations received from their respective organisations.' },
        { name: 'comingSoonLabel', type: 'text', defaultValue: 'Coming Soon' },
        { name: 'noResultsMessage', type: 'text', defaultValue: 'No courses match the selected filters. Try adjusting your search or filter selections.' },
      ],
    },
    // Contact fields
    {
      name: 'formSection',
      type: 'group',
      admin: { condition: (data) => data?.pageType === 'contact' },
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Send a Message' },
        { name: 'heading', type: 'text', defaultValue: 'How can we help you?' },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      admin: { condition: (data) => data?.pageType === 'contact' },
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Contact Information' },
        {
          name: 'entries',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            {
              name: 'links',
              type: 'array',
              fields: [
                { name: 'text', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'contactFormLabels',
      type: 'group',
      admin: { condition: (data) => data?.pageType === 'contact' },
      fields: [
        { name: 'successMessage', type: 'text', defaultValue: 'Thank you! Your message has been sent successfully. We will get back to you shortly.' },
        { name: 'errorMessage', type: 'text', defaultValue: 'Oops! Something went wrong. Please try again later.' },
        { name: 'nameLabel', type: 'text', defaultValue: 'Full Name' },
        { name: 'namePlaceholder', type: 'text', defaultValue: 'Enter your full name' },
        { name: 'emailLabel', type: 'text', defaultValue: 'Email Address' },
        { name: 'emailPlaceholder', type: 'text', defaultValue: 'Enter your email address' },
        { name: 'phoneLabel', type: 'text', defaultValue: 'Phone Number' },
        { name: 'phonePlaceholder', type: 'text', defaultValue: 'Enter your phone number' },
        { name: 'subjectLabel', type: 'text', defaultValue: 'Subject' },
        { name: 'subjectPlaceholder', type: 'text', defaultValue: 'How can we help?' },
        { name: 'messageLabel', type: 'text', defaultValue: 'Message' },
        { name: 'messagePlaceholder', type: 'text', defaultValue: 'Write your message here...' },
        { name: 'submitLabel', type: 'text', defaultValue: 'Send Message' },
        { name: 'submittingLabel', type: 'text', defaultValue: 'Sending...' },
      ],
    },
    {
      name: 'membersLabels',
      type: 'group',
      admin: { condition: (data) => data?.pageType === 'members' },
      fields: [
        { name: 'directoryEyebrow', type: 'text', defaultValue: 'Member Directory' },
        { name: 'countLabel', type: 'text', defaultValue: 'Organisations' },
        { name: 'footerLabel', type: 'text', defaultValue: 'Member Organisations' },
      ],
    },
    {
      name: 'trainingLeadsContent',
      type: 'group',
      admin: { condition: (data) => data?.pageType === 'training-leads' },
      fields: [
        { name: 'sectionEyebrow', type: 'text', defaultValue: 'Expert Network' },
        { name: 'sectionHeading', type: 'text', defaultValue: 'ARIFAC Training Lead Directory' },
        { name: 'sectionDescription', type: 'textarea', defaultValue: "Domain specialists appointed across India's financial ecosystem to lead certification, capacity building, and AML/CFT training initiatives." },
        { name: 'numberHeader', type: 'text', defaultValue: 'No.' },
        { name: 'nameHeader', type: 'text', defaultValue: 'Name' },
        { name: 'organizationHeader', type: 'text', defaultValue: 'Organization' },
        { name: 'specialisationHeader', type: 'text', defaultValue: 'Specialisation' },
        { name: 'leadsCountLabel', type: 'text', defaultValue: 'Leads' },
        { name: 'specialisationsCountLabel', type: 'text', defaultValue: 'Specialisations' },
        { name: 'lastUpdated', type: 'text', defaultValue: 'Updated April 2026' },
      ],
    },
    {
      name: 'nodalOfficersContent',
      type: 'group',
      admin: { condition: (data) => data?.pageType === 'nodal-officers' },
      fields: [
        { name: 'nodalOfficerLabel', type: 'text', defaultValue: 'Nodal Officer' },
        { name: 'fallbackDesignation', type: 'text', defaultValue: 'Principal Officer' },
        { name: 'sectorsCountLabel', type: 'text', defaultValue: 'Sectors' },
        { name: 'officersCountLabel', type: 'text', defaultValue: 'Officers' },
        { name: 'lastUpdated', type: 'text', defaultValue: 'Updated April 2026' },
      ],
    },
    {
      name: 'updatesUI',
      type: 'group',
      admin: { condition: (data) => data?.pageType === 'updates' },
      fields: [
        { name: 'noResultsMessage', type: 'text', defaultValue: 'No circulars match your selected filters.' },
        { name: 'emptyMessage', type: 'text', defaultValue: 'No regulatory updates available at this time.' },
        { name: 'viewCircularLabel', type: 'text', defaultValue: 'View Circular' },
      ],
    },
  ],
}
