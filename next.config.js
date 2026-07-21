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
      // andrea-world Multi-Zone (aindrila-travels repo, WORLD_HOME=1, basePath /andrea-world)
      {
        source: "/andrea-world",
        destination: "https://andrea-world.vercel.app/andrea-world/world",
      },
      {
        source: "/andrea-world/:path*",
        destination: "https://andrea-world.vercel.app/andrea-world/:path*",
      },
    ];
  },
  async headers() {
    // Baseline security headers (no CSP — avoided to not break R3F/GA/remark42
    // without browser testing). Applied to every route.
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
