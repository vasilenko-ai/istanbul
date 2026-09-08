import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: 'export',
      assetPrefix: basePath,
      trailingSlash: true,
    }
  : {};

export default nextConfig;
