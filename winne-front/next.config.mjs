/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "winne-store-demo.myshopify.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "your-api-domain.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.API_URL || "http://localhost:3001/api/:path*", // Çevresel değişkenle dinamik hale getirildi
      },
    ];
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      config.devtool = false; // Üretim ortamında source map devre dışı
    }
    return config;
  },
  env: {
    API_URL: process.env.API_URL, // Tarayıcı için API URL'sini geçiriyoruz
  },
};

export default nextConfig;
