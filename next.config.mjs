import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  // GitHub Pages project-site deployment (https://toggi635.github.io/HomeCostGuide/):
  // static export, no server, and a base path matching the repo name.
  output: "export",
  trailingSlash: true,
  basePath: isProd ? "/HomeCostGuide" : "",
  assetPrefix: isProd ? "/HomeCostGuide/" : "",
  images: { unoptimized: true },
};

export default withMDX(nextConfig);
