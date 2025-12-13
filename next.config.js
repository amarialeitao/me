/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Remove basePath if using custom domain, keep if using username.github.io/repo
  // basePath: '/me',
  // assetPrefix: '/me/',
}

module.exports = nextConfig
