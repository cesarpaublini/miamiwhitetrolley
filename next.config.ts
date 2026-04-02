import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Redirect all legacy /post/* URLs → /blog/* (301 permanent, SEO-safe)
      {
        source: '/post/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
