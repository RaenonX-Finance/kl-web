/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@project/kl-web-common'],
  images: {
    domains: ['twemoji.maxcdn.com'],
  },
};

module.exports = nextConfig;
