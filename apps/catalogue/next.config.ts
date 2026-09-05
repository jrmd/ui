import type { NextConfig } from "next";
const config: NextConfig = {
  reactStrictMode: true,
  experimental: { cpus: 2 },
  turbopack: { root: process.cwd() + "/../.." },
};
export default config;
