import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Enables static export
  // basePath: process.env.NODE_ENV === 'production' ? '/soeng-portfolio' : '',
};

export default nextConfig;
