import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [new URL(`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/**`)]
  },
  async redirects() {
    return [
      { source: "/my-shirts", destination: "/profile/my-shirts", permanent: true },
      { source: "/orders", destination: "/profile/orders", permanent: true },
      { source: "/orders/:id", destination: "/profile/orders/:id", permanent: true },
      { source: "/sell-tshirt", destination: "/profile/sell-tshirt", permanent: true },
    ]
  },
  experimental: {
    globalNotFound: true,
    serverActions: {
      bodySizeLimit: "10mb"
    }
  }
};

export default nextConfig;
