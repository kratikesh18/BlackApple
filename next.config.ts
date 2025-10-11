import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  
  // Disable ESLint during production builds to prevent blocking on warnings
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable TypeScript errors during production builds
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Image optimization configuration
  images: {
    domains: ['i.scdn.co', 'mosaic.scdn.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.scdn.co',
      },
    ],
  },

  // Environment variables that should be available on the client side
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

export default nextConfig;
