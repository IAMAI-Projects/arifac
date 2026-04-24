import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
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
