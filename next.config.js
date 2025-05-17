/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable server-side rendering for components that use client-only libraries
  reactStrictMode: false,
  
  // Use a simpler webpack configuration that doesn't require additional dependencies
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Avoid resolving server-side dependencies in client-side code
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false
      };
    }
    
    return config;
  },
  
  // Configure image domains - add unsplash domains to support image search
  images: {
    domains: [
      'ik.imagekit.io',
      'images.unsplash.com',
      'plus.unsplash.com',
      'api.unsplash.com',
    ],
    // Add remotePatterns to support all domains with https
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Output as standalone for better deployment compatibility
  output: 'standalone',
  
  // Ensure we have proper environment variables in production
  env: {
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    NEXT_PUBLIC_STACK_PROJECT_ID: process.env.NEXT_PUBLIC_STACK_PROJECT_ID,
    NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
    NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
    NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    NEXT_PUBLIC_UNSPLASH_ACCESS_KEY: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  },
}

module.exports = nextConfig
