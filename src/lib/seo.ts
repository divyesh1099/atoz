import type { Metadata } from "next";

import type { Service } from "@/content/services";
import type { BusinessInfo, FaqItem } from "@/content/site";
import {
  getLocalizedPath,
  localeMeta,
  locales,
  type AppLocale,
} from "@/i18n/routing";
import { absoluteUrl, getSiteUrl, mapSearchUrl } from "@/lib/site";

type MetadataInput = {
  business: BusinessInfo;
  locale: AppLocale;
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  imageAlt: string;
};

function getLanguageAlternates(path: string) {
  return Object.fromEntries(
    locales.map((locale) => [
      localeMeta[locale].languageTag,
      absoluteUrl(getLocalizedPath(locale, path)),
    ]),
  );
}

export function createMetadata({
  business,
  locale,
  title,
  description,
  path,
  keywords = [],
  imageAlt,
}: MetadataInput): Metadata {
  const localizedPath = getLocalizedPath(locale, path);
  const image = absoluteUrl("/opengraph-image");

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    keywords,
    alternates: {
      canonical: localizedPath,
      languages: getLanguageAlternates(path),
    },
    openGraph: {
      title: `${title} | ${business.name}`,
      description,
      url: absoluteUrl(localizedPath),
      siteName: business.name,
      locale: localeMeta[locale].openGraphLocale,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${business.name}`,
      description,
      images: [image],
    },
  };
}

export function getLocalBusinessSchema(
  business: BusinessInfo,
  locale: AppLocale,
  {
    description,
    services,
  }: {
    description: string;
    services: Service[];
  },
) {
  const homePath = getLocalizedPath(locale, "/");

  const contactPoints = [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: business.primaryPhoneDisplay,
      email: business.email,
      availableLanguage: ["English", "Hindi", "Marathi"],
    },
    business.secondaryPhoneDisplay
      ? {
          "@type": "ContactPoint",
          contactType: "customer support",
          telephone: business.secondaryPhoneDisplay,
          availableLanguage: ["English", "Hindi", "Marathi"],
        }
      : null,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "ComputerStore",
    "@id": absoluteUrl(`${homePath}#local-business`),
    name: business.name,
    url: absoluteUrl(homePath),
    image: absoluteUrl("/opengraph-image"),
    description,
    telephone: business.primaryPhoneDisplay,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.streetAddress,
      addressLocality: business.city,
      addressRegion: business.region,
      postalCode: business.postalCode,
      addressCountry: business.countryCode,
    },
    areaServed: business.areaServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    contactPoint: contactPoints,
    hasMap: mapSearchUrl(business),
    knowsAbout: services.map((service) => service.title),
  };
}

export function getFaqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(
  locale: AppLocale,
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(getLocalizedPath(locale, item.path)),
    })),
  };
}

export function getServicesItemListSchema(
  locale: AppLocale,
  services: Service[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: absoluteUrl(getLocalizedPath(locale, `/services/${service.slug}`)),
    })),
  };
}

export function getServiceSchema(
  locale: AppLocale,
  service: Service,
  business: BusinessInfo,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    serviceType: service.shortLabel,
    provider: {
      "@id": absoluteUrl(`${getLocalizedPath(locale, "/")}#local-business`),
    },
    areaServed: business.areaServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    url: absoluteUrl(getLocalizedPath(locale, `/services/${service.slug}`)),
  };
}
