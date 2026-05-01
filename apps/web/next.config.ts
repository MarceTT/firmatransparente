import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@ft/types', '@ft/utils'],
};

export default nextConfig;
