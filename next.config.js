/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  eslint: {
    dirs: ['app', 'lib']
  }
  // To deploy it via container image
  // Not supported yet
  // output: 'standalone',
}

module.exports = nextConfig
