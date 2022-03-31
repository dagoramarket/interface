/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dagora.infura-ipfs.io'],
  },
  async redirects() {
    return [
      // {
      //   source: '/listing/new',
      //   destination: '/account',
      //   has: [
      //     {
      //       type: 'cookie',
      //       key: 'x-has-minimum-stake',
      //     },
      //   ],
      //   permanent: false,
      // },
    ]
  }
}

module.exports = nextConfig
