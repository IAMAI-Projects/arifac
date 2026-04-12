import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Pages } from './collections/Pages'
import { RegulatoryUpdates } from './collections/RegulatoryUpdates'
import { Certifications } from './collections/Certifications'
import { NewsItems } from './collections/NewsItems'
import { Members } from './collections/Members'
import { Programmes } from './globals/Programmes'

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
        }

        return baseUrl
      },
      collections: ['pages', 'regulatory-updates', 'certifications', 'news-items', 'members'],
      globals: ['programmes'],
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
    RegulatoryUpdates,
    Certifications,
    NewsItems,
    Members,
  ],
  globals: [Programmes],
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
  sharp,
})
