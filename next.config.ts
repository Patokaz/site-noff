import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `npm run build` gera o site estático em `out/` (é essa pasta que sobe na Netlify).
  output: "export",
  // Export estático não tem servidor para otimizar imagens: elas já vão otimizadas (WebP) em src/assets.
  images: { unoptimized: true },
};

export default nextConfig;
