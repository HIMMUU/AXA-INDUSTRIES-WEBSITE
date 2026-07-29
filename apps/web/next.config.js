/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@axa/types', '@axa/utils', '@axa/db']
};

module.exports = nextConfig;
