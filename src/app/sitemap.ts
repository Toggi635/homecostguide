import { MetadataRoute } from "next";
import { pillars, articles } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const staticPages = [
    "/",
    "/about/",
    "/methodology/",
    "/editorial-guidelines/",
    "/contact/",
    "/privacy-policy/",
    "/terms/",
    "/calculators/",
  ];

  const staticEntries = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date("2026-01-15"),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1.0 : 0.8,
  }));

  const pillarEntries = pillars.map((p) => ({
    url: `${baseUrl}/${p.slug}/`,
    lastModified: new Date("2026-01-15"),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const articleEntries = articles.map((a) => ({
    url: `${baseUrl}/${a.pillar}/${a.slug}/`,
    lastModified: new Date(a.dateModified),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...pillarEntries, ...articleEntries];
}
