/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async rewrites() {
    return [
      {
        source: "/remark42/:path*",
        destination:
          "https://remark42-production-fcfc.up.railway.app/:path*",
      },
    ];
  },
};

export default nextConfig;
