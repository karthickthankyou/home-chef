/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
  images: {
    domains: ['firebasestorage.googleapis.com', 'images.unsplash.com'],
  },
}

module.exports = nextConfig
