/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://mty-test.icetea-software.com/:path*'
      }
    ]
  }
}

module.exports = nextConfig
