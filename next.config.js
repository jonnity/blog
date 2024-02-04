/** @type {import('next').NextConfig} */
const withMDX = require("@next/mdx")();
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  pageExtensions: ["mdx", "ts", "tsx"],
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = withMDX(nextConfig);
