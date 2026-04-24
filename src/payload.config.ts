import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { seed } from './seed'
import { Pages } from './collections/Pages'
import { Media } from './collections/Media'
import { RegulatoryUpdates } from './collections/RegulatoryUpdates'
import { Certifications } from './collections/Certifications'
import { NewsItems } from './collections/NewsItems'
import { Members } from './collections/Members'
import { LegalPages } from './collections/LegalPages'
import { NodalOfficers } from './collections/NodalOfficers'
import { TrainingLeadsDirectory } from './collections/TrainingLeadsDirectory'
import { GalleryItems } from './collections/GalleryItems'
import { Programmes } from './globals/Programmes'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { SiteSettings } from './globals/SiteSettings'
import { GalleryPage } from './globals/GalleryPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const payloadSecret = process.env.PAYLOAD_SECRET
if (!payloadSecret) {
  throw new Error('PAYLOAD_SECRET environment variable is required')
}

const databaseUri = process.env.DATABASE_URI
if (!databaseUri) {
  throw new Error('DATABASE_URI environment variable is required')
}

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname, '..'),
      importMapFile: path.resolve(dirname, 'app/(payload)/admin/importMap.js'),
    },
    meta: {
      titleSuffix: '— ARIFAC',
    },
    components: {
      graphics: {
        Logo: '/src/components/admin/Logo',
        Icon: '/src/components/admin/Icon',
      },
    },
    livePreview: {
      url: ({ data, collectionConfig, globalConfig }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

        if (globalConfig) {
          if (globalConfig.slug === 'programmes') return `${baseUrl}/programmes`
        }

        if (collectionConfig) {
          if (collectionConfig.slug === 'pages') {
            const slug = data?.slug
            return slug === 'home' ? baseUrl : `${baseUrl}/${slug}`
          }
          if (collectionConfig.slug === 'regulatory-updates') return `${baseUrl}/updates`
          if (collectionConfig.slug === 'certifications') return `${baseUrl}/certifications`
          if (collectionConfig.slug === 'news-items') return `${baseUrl}`
          if (collectionConfig.slug === 'members') return `${baseUrl}/members`
          if (collectionConfig.slug === 'legal-pages') return `${baseUrl}/legal/${data?.slug || ''}`
          if (collectionConfig.slug === 'nodal-officers') return `${baseUrl}/sectoral-nodal-officers`
          if (collectionConfig.slug === 'training-leads-directory') return `${baseUrl}/training-leads`
          if (collectionConfig.slug === 'gallery-items') return `${baseUrl}/gallery`
        }

        return baseUrl
      },
      collections: ['pages', 'regulatory-updates', 'certifications', 'news-items', 'members', 'legal-pages', 'nodal-officers', 'training-leads-directory', 'gallery-items'],
      globals: ['programmes', 'header', 'footer', 'site-settings'],
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'select',
          options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Editor', value: 'editor' },
          ],
          defaultValue: 'editor',
          required: true,
        },
      ],
    },
    Pages,
    Media,
    RegulatoryUpdates,
    Certifications,
    NewsItems,
    Members,
    LegalPages,
    NodalOfficers,
    TrainingLeadsDirectory,
    GalleryItems,
  ],
  globals: [Programmes, Header, Footer, SiteSettings, GalleryPage],
  onInit: async (payload) => {
    const forceSeed = process.env.PAYLOAD_SEED === 'true'
    const { totalDocs } = await payload.count({ collection: 'pages' })
    if (totalDocs === 0 || forceSeed) {
      await seed(payload)
    }
  },
  editor: lexicalEditor(),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUri,
      ...(process.env.NODE_ENV === 'production' && {
        ssl: { rejectUnauthorized: false },
      }),
    },
  }),
  plugins: [
    s3Storage({
      collections: {
        media: {
          disableLocalStorage: true,
          prefix: 'media',
        },
      },
      bucket: process.env.S3_BUCKET || 'arifac-cms-media',
      config: {
        region: process.env.AWS_REGION || 'ap-south-1',
        ...(process.env.AWS_ACCESS_KEY_ID &&
          process.env.AWS_SECRET_ACCESS_KEY && {
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
          }),
      },
    }),
  ],
  sharp,
})
