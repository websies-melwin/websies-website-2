/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/index.html',
      },
      {
        source: '/pricing',
        destination: '/pricing.html',
      },
    ];
  },
};

module.exports = nextConfig;