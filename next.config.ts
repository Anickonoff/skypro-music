import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',

  async redirects() {
    return [
      {
        source: '/',
        destination: '/music/main',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
