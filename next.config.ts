import type { NextConfig } from "next";

const isExport = process.env.NEXT_OUTPUT_MODE === "export";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const config: NextConfig = {
  reactStrictMode: true,
  ...(isExport ? { output: "export" } : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
    // GitHub Pages can't run the Next image optimizer.
    unoptimized: isExport,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  ...(isExport
    ? {}
    : {
        async redirects() {
          return [
            { source: "/contacts", destination: "/contact", permanent: true },
            { source: "/works", destination: "/portfolio", permanent: true },
            { source: "/testimonials", destination: "/reviews", permanent: true },
          ];
        },
      }),
};

export default config;
