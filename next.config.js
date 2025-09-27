/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.pixabay.com' }
    ]
  },
  experimental: {
    typedRoutes: true
  }
};
module.exports = nextConfig;
