/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'images.unsplash.com'],
  },
  experimental: {
    externalDir: true,
  },
}

module.exports = nextConfig
