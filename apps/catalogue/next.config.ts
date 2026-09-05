import type { NextConfig } from "next";
const config: NextConfig = {
  reactStrictMode: true,
  distDir: process.env.JEZ_BUILD_DIR ?? ".next",
  experimental: { cpus: 2 },
  turbopack: { root: process.cwd() + "/../.." },
};
export default config;
