// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'rickandmortyapi.com',
        pathname: '/api/character/avatar/**',
      },
      {
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
