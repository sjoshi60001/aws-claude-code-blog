/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/proxy/3000/:path*',
        destination: '/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
