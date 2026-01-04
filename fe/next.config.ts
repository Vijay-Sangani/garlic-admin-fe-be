import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    domains: [],
  },

  output: "standalone",
};

export default nextConfig;
