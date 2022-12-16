const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: false, // 일부 useEffect가 2번씩 호출되는 문제가 있어 off 처리
  swcMinify: true,
  images: {
    unoptimized: true
  },
  rewrites() {
    return [
      {
        source: '/api/oauth2/github/:path*',
        destination: 'https://github.com/login/oauth/:path*',
      },
    ];
  },
  experimental: {
    // appDir: true
  },
}

module.exports = nextConfig
