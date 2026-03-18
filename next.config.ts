import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  // Turbopack (default in Next.js 16) — empty config to silence the webpack-conflict error
  turbopack: {},
  // @react-pdf/renderer needs canvas alias (used when webpack fallback is active)
  webpack: (config) => {
    config.resolve.alias.canvas = false
    return config
  },
}

export default nextConfig
