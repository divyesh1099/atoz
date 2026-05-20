import type { ServiceSlug } from "@/content/services";

export const sitePhotos = {
  hero: {
    src: "/images/hero/shop-hero.webp",
    alt: "Computer service workspace with laptops and repair tools",
  },
  shopFront: {
    src: "/images/shop/shop-front.webp",
    alt: "Front view of the computer service shop",
  },
  shopInterior: {
    src: "/images/shop/shop-interior.webp",
    alt: "Interior of the computer service shop",
  },
  ownerDesk: {
    src: "/images/team/owner-desk.webp",
    alt: "Technician at the service desk helping customers",
  },
} as const;

const servicePhotoMap: Record<
  ServiceSlug,
  {
    src: string;
    alt: string;
  }
> = {
  "laptop-desktop-repair": {
    src: "/images/services/laptop-repair.webp",
    alt: "Laptop repair workbench with open system and technician tools",
  },
  "software-installation-and-setup": {
    src: "/images/team/owner-desk.webp",
    alt: "Technician setting up software on a customer system",
  },
  "networking-and-wifi-setup": {
    src: "/images/services/wifi-setup.webp",
    alt: "Router and networking setup for home or office support",
  },
  "printer-and-peripheral-support": {
    src: "/images/services/printer-setup.webp",
    alt: "Printer setup and office peripheral support",
  },
  "hardware-upgrades-and-performance": {
    src: "/images/services/desktop-repair.webp",
    alt: "Desktop hardware upgrade and performance tuning setup",
  },
  "business-and-onsite-support": {
    src: "/images/shop/shop-interior.webp",
    alt: "On-site business support and workstation assistance",
  },
};

export function getServicePhoto(slug: ServiceSlug) {
  return servicePhotoMap[slug];
}
