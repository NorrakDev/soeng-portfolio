import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Enables static export
  // Optional: Add basePath if deploying to a subpath (e.g., /repo-name/)
  basePath: process.env.NODE_ENV === 'production' ? '/soeng-portfolio' : '',
  // Optional: Add assetPrefix for assets (CSS/JS)
  assetPrefix: process.env.NODE_ENV === 'production' ? '/soeng-portfolio/' : '',
};

export default nextConfig;
