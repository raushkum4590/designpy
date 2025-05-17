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
  
  // Configure image domains
  images: {
    domains: ['ik.imagekit.io'],
  },
  
  // experimental settings if needed
  experimental: {
    // Remove any experimental settings that cause issues
  },
}

module.exports = nextConfig
