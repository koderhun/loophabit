/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

let envImageUnoptimize = process.env.NODE_ENV !== 'production' ? false : true
const nextConfig = withPWA({
  output: process.env.NODE_ENV !== 'production' ? undefined : 'export',
  images: {
    unoptimized: envImageUnoptimize,
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
})

module.exports = nextConfig
