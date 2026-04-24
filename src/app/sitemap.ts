import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://arifac.com'

const staticRoutes = [
  '',
  '/about',
  '/certifications',
  '/contact',
  '/contributor',
  '/gallery',
  '/learners',
  '/members',
  '/membership',
  '/programmes',
  '/sectoral-nodal-officers',
  '/training-leads',
  '/updates',
  '/legal/terms-of-use',
  '/legal/privacy-policy',
  '/legal/disclaimer',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
