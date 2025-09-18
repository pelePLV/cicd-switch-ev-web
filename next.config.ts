import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  reactStrictMode: false, // make it render ui only one time
  output: 'standalone', // Enable standalone output for Docker
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['switchoss.oss-ap-southeast-7.aliyuncs.com'],
  },
  /* config options here */
};

export default withNextIntl(nextConfig);
