import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**', // TMDb uses /t/p/ in their image paths
      },
    ],
  },
};

export default nextConfig;
