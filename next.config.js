/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Required for GitHub Pages when using repo-name in URL
  basePath: isProd ? '/me' : '',
  assetPrefix: isProd ? '/me/' : '',
}

module.exports = nextConfig
