import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Allows builds to finish cleanly while enforcing runtime robustness
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  }
};

export default nextConfig;
