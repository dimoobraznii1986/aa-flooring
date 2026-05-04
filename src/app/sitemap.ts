import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllCombos } from "@/lib/service-city-matrix";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    "/",
    "/services",
    "/portfolio",
    "/service-areas",
    "/reviews",
    "/about",
    "/contact",
  ];

  const services = siteConfig.services.map((s) => `/services/${s.slug}`);
  const cities = siteConfig.serviceAreas
    .filter((c) => c.launch)
    .map((c) => `/service-areas/${c.slug}`);
  const combos = getAllCombos().map((c) => `/${c.combo}`);

  return [...staticPaths, ...services, ...cities, ...combos].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "weekly",
    priority:
      path === "/"
        ? 1.0
        : path.startsWith("/services/") || /^\/[a-z-]+-[a-z-]+$/.test(path)
          ? 0.8
          : 0.6,
  }));
}
