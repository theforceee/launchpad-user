/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${[process.env.NEXT_PUBLIC_BASE_API]}:path*`
      }
    ]
  }
}

module.exports = nextConfig
