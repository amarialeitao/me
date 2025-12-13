/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Required for GitHub Pages when repo is not username.github.io
  basePath: '/me',
  assetPrefix: '/me/',
}

module.exports = nextConfig
