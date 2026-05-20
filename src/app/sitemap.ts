import type { MetadataRoute } from "next";

import { serviceCatalog } from "@/content/services";
import { getLocalizedPath, locales } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/services", "/book-service", "/contact"] as const;

  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((path, index) => ({
      url: absoluteUrl(getLocalizedPath(locale, path)),
      lastModified: new Date(),
      changeFrequency: index === 0 ? "weekly" : "monthly",
      priority: index === 0 ? 1 : 0.8,
    })),
  );

  const servicePages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    serviceCatalog.map((service) => ({
      url: absoluteUrl(getLocalizedPath(locale, `/services/${service.slug}`)),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    })),
  );

  return [...staticPages, ...servicePages];
}
