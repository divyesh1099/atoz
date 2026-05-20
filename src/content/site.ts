import type { IconName } from "@/lib/icons";

export type BusinessInfo = {
  name: string;
  shortName: string;
  owner: string;
  tagline: string;
  description: string;
  primaryPhoneDisplay: string;
  secondaryPhoneDisplay: string;
  whatsappPhoneDisplay: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  streetAddress: string;
  locality: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
  googleMapsUrl: string;
  areaServed: string[];
  brands: string[];
};

export type NavigationItem = {
  label: string;
  href: string;
};

export type ContentCard = {
  icon: IconName;
  title: string;
  text: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const defaultBusiness: BusinessInfo = {
  name: "A To Z Computer Solution",
  shortName: "A To Z",
  owner: "Durga Kumar Jha",
  tagline: "Repair, install, and keep every system running smoothly.",
  description:
    "Computer repair, installation assistance, networking, printer setup, upgrades, and troubleshooting support from Vashi, Navi Mumbai.",
  primaryPhoneDisplay: "+91 9892030197",
  secondaryPhoneDisplay: "+91 9004334923",
  whatsappPhoneDisplay: "+91 9892030197",
  email: "atozcs135@gamil.com",
  addressLine1:
    "Shop No. C-136, Ground Floor, Vashi Plaza, Plot No. 80-81, Sector-17",
  addressLine2: "Near HDFC Bank, Vashi, Navi Mumbai - 400703",
  streetAddress:
    "Shop No. C-136, Ground Floor, Vashi Plaza, Plot No. 80-81, Sector-17",
  locality: "Vashi",
  city: "Navi Mumbai",
  region: "Maharashtra",
  postalCode: "400703",
  countryCode: "IN",
  googleMapsUrl: "",
  areaServed: ["Vashi", "Navi Mumbai", "Nearby homes and offices"],
  brands: [
    "HP",
    "Dell",
    "AMD",
    "ASUS",
    "Acer",
    "Sony",
    "BenQ",
    "Compaq",
    "Intel",
    "Fujitsu",
    "Epson",
    "Toshiba",
  ],
};

export const business = defaultBusiness;
