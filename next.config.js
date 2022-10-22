/* eslint-disable @typescript-eslint/no-var-requires */
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/oauth/github/:path*',
        destination: 'https://github.com/login/oauth/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
