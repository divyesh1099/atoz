import type { MetadataRoute } from "next";

import { getLocalizedPath, defaultLocale } from "@/i18n/routing";
import { getBusinessSettings } from "@/lib/settings-store";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const business = await getBusinessSettings();

  return {
    name: business.name,
    short_name: business.shortName,
    description: business.description,
    start_url: getLocalizedPath(defaultLocale, "/"),
    display: "standalone",
    background_color: "#f4f8fb",
    theme_color: "#0f4066",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
