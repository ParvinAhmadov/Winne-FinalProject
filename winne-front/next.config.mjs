/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ['winne-store-demo.myshopify.com',"localhost","your-api-domain.com"], 
      remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/uploads/**',
      },
    ],
      
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*', 
      },
    ];
  },
  
};

export default nextConfig;
