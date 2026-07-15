import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  // GitHub Pages project-site deployment (https://toggi635.github.io/homecostguide/):
  // static export, no server, and a base path matching the ACTUAL lowercase GitHub Pages
  // URL segment. GitHub Pages serves project sites at a lowercased version of the repo
  // name regardless of the repo's display-name casing on GitHub itself — verified by
  // direct fetch: /homecostguide/... returns 200, /HomeCostGuide/... returns 404.
  output: "export",
  trailingSlash: true,
  basePath: isProd ? "/homecostguide" : "",
  assetPrefix: isProd ? "/homecostguide/" : "",
  images: { unoptimized: true },
};

export default withMDX(nextConfig);
