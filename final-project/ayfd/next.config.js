/** @type {import('next').NextConfig} */

const config = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 's1.ticketm.net',
          port: '',
        },
      ],
    },
    experiments: {
      topLevelAwait: true,
    },
    reactStrictMode: true,
    swcMinify: true,
  }