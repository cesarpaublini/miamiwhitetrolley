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
  async headers() {
    return [
      {
        // Immutable static assets (hashed filenames — safe to cache forever)
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        // Public images — long cache, must-revalidate on deploy
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
    ]
  },
};

export default nextConfig;
