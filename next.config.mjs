/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'samah.deltawy.com',
        pathname: '/imagess/**', // Adjust the pathname if necessary
      },
      {
        protocol: 'http',
        hostname: '192.168.0.201',
        port: '8080',
        pathname: '/samahSite/imagess/**',
      },
    ],
  },
};

export default nextConfig;
