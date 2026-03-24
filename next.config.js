/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tmaltizo.github.io',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig
