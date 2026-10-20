import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static: `next build` writes plain HTML/CSS/PNG to `out/`.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
