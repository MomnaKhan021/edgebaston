import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Admin forms can submit uploaded images inline (as data URIs), so allow
    // a larger Server Action request body than the 1MB default.
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
};

export default nextConfig;
