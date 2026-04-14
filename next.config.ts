import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
  serverExternalPackages: ['@prisma/client', 'pg', '@prisma/adapter-pg'],
};

export default nextConfig;
