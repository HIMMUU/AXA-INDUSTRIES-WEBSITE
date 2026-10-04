/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@axa/types', '@axa/utils', '@axa/db'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      { source: '/sanitary-pad-vending-machine', destination: '/sanitary-napkin-vending-machine', permanent: true },
      { source: '/sanitary-pad-disposal-machine', destination: '/sanitary-napkin-incinerator', permanent: true },
      { source: '/sanitary-napkin-disposal-machine', destination: '/sanitary-napkin-incinerator', permanent: true },
      { source: '/sanitary-napkin-incinerator-machine-price', destination: '/sanitary-napkin-incinerator-price', permanent: true },
      { source: '/sanitary-napkin-disposal-machine-price', destination: '/sanitary-napkin-incinerator-price', permanent: true },
      { source: '/sanitary-pad-incinerator-price', destination: '/sanitary-napkin-incinerator-price', permanent: true },
      { source: '/products/sanitary-napkin-incinerator-machine-ecoburn-100', destination: '/products/axa-ecoburn-100-sanitary-napkin-disposal-machine', permanent: true },
      { source: '/products/automatic-sanitary-napkin-vending-machine-avnd50', destination: '/products/axa-autovend-50-sanitary-napkin-vending-machine', permanent: true },
      { source: '/products/swachh-toilet-feedback-machine', destination: '/products/axa-sense-10-1-touch-feedback-machine-kiosk', permanent: true },
      { source: '/products/automatic-cloth-bag-vending-machine', destination: '/products/axa-cloth-bag-vending-machine-eco-dispenser', permanent: true },
    ];
  },
};

module.exports = nextConfig;
