/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/14847208',
      },
      {
        protocol: "https",
        hostname: "www.notion.so",
        pathname: "/image/**",
      },
    ],
  },
};

module.exports = nextConfig;
