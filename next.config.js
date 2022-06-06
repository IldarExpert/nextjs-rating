/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };
//
// module.exports = nextConfig;

module.exports = {
  images: {
    domains: ['courses-top.ru', 'cdn-bucket.hb.bizmrg.com']
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/courses',
        permanent: true,
      },
    ];
  },
};
