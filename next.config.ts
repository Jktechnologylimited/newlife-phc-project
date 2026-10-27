import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects() {
    return [{ source: "/school", destination: "/", permanent: true }];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
