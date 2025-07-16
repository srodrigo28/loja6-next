/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // permite qualquer domínio com HTTPS
      },
    ],
  },
};

export default nextConfig;
