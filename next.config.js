/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Base path for GitHub Pages
  basePath: '/me',
  assetPrefix: '/me/',
}

module.exports = nextConfig
