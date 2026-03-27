import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
