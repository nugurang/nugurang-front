module.exports = {
	async rewrites() {
		return [
			{
				source: "/api/dev-backend/:path*",
				destination: "http://localhost:8080/:path*",
			},
			{
				source: "/api/backend/:path*",
				destination: "https://www.nugurang.com:8000/:path*",
			},
      {
        source: '/api/oauth2/github/:path*',
        destination: 'https://github.com/login/oauth/:path*',
      },
		];
	},
  experimental: {
    serverActions: true,
  },
}
