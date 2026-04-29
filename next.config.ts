import type { NextConfig } from "next";

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://arifac-cms-media.s3.ap-south-1.amazonaws.com",
      "connect-src 'self'",
      "frame-ancestors 'self'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  images: {
    localPatterns: [
      { pathname: '/api/media/file/**' },
      { pathname: '/**' },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'arifac-cms-media.s3.ap-south-1.amazonaws.com',
        pathname: '/media/**',
      },
    ],
  },
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { withPayload } = require('@payloadcms/next/withPayload')

export default withPayload(nextConfig);
