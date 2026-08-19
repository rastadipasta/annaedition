import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.100.23"],
  async redirects() {
    return ["calm-light", "quiet-kitchen", "after-dark"].map((slug) => ({
      source: `/projekte/${slug}`,
      destination: "/projekte",
      permanent: true,
    }));
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
