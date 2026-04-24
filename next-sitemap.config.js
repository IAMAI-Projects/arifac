/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SERVER_URL || 'https://arifac.in',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: './public',
  // Exclude Payload admin, API routes, and dynamic [slug] catch-all (handled manually)
  exclude: [
    '/admin',
    '/admin/*',
    '/api/*',
    '/actions/*',
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/api'] },
    ],
  },
}
