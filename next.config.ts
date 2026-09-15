import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // cacheComponents: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
      },
    ],
  },
};

export default nextConfig;
