/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Required for GitHub Pages - always use /me since this deploys to username.github.io/me
  basePath: '/me',
  assetPrefix: '/me/',
}

module.exports = nextConfig
