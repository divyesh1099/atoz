import type { IconName } from "@/lib/icons";

export const serviceCatalog = [
  {
    slug: "laptop-desktop-repair",
    icon: "wrench",
  },
  {
    slug: "software-installation-and-setup",
    icon: "download",
  },
  {
    slug: "networking-and-wifi-setup",
    icon: "network",
  },
  {
    slug: "printer-and-peripheral-support",
    icon: "printer",
  },
  {
    slug: "hardware-upgrades-and-performance",
    icon: "cpu",
  },
  {
    slug: "business-and-onsite-support",
    icon: "briefcase",
  },
] as const satisfies ReadonlyArray<{
  slug: string;
  icon: IconName;
}>;

export type ServiceSlug = (typeof serviceCatalog)[number]["slug"];

export type Service = {
  slug: ServiceSlug;
  shortLabel: string;
  title: string;
  summary: string;
  metaDescription: string;
  icon: IconName;
  issues: string[];
  includes: string[];
  bestFor: string[];
  keywords: string[];
};
