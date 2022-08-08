/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/oauth/github/:path*",
        destination: "https://github.com/login/oauth/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
