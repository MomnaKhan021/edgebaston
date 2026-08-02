import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Admin forms can submit uploaded images inline (as data URIs), so allow
    // a larger Server Action request body than the 1MB default.
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
  // CMS pages used to live under /p/<slug>; they now live at the root (/<slug>).
  // Keep old links working with a permanent redirect.
  async redirects() {
    return [
      {
        source: "/p/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
