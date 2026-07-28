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
  async redirects() {
    return [
      // /whispr kept as a redirect for old links; /openwispr is served in-place (rewrite below).
      {
        source: "/whispr",
        destination: "/openwispr",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      // OpenWispr landing served in-place at charandeepkapoor.com/openwispr (its own root-served
      // Vercel project; the page uses absolute asset URLs so no basePath is needed).
      {
        source: "/openwispr",
        destination: "https://openwispr.vercel.app/",
      },
      {
        source: "/openwispr/:path*",
        destination: "https://openwispr.vercel.app/:path*",
      },
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
      // second-brain Multi-Zone (SirCharan/second-brain site-final, basePath /second-brain)
      {
        source: "/second-brain",
        destination: "https://second-brain-final-psi.vercel.app/second-brain",
      },
      {
        source: "/second-brain/:path*",
        destination: "https://second-brain-final-psi.vercel.app/second-brain/:path*",
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
