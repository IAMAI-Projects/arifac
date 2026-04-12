import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { withPayload } = require('@payloadcms/next/withPayload')

export default withPayload(nextConfig);
