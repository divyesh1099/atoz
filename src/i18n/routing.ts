import { defineRouting } from "next-intl/routing";

export const locales = ["en", "hi", "mr"] as const;
export const defaultLocale = "en" as const;

export type AppLocale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: true,
});

export const localeMeta: Record<
  AppLocale,
  {
    label: string;
    languageTag: string;
    openGraphLocale: string;
  }
> = {
  en: {
    label: "English",
    languageTag: "en-IN",
    openGraphLocale: "en_IN",
  },
  hi: {
    label: "हिंदी",
    languageTag: "hi-IN",
    openGraphLocale: "hi_IN",
  },
  mr: {
    label: "मराठी",
    languageTag: "mr-IN",
    openGraphLocale: "mr_IN",
  },
};

export function isAppLocale(value: string): value is AppLocale {
  return locales.includes(value as AppLocale);
}

export function getLocalizedPath(locale: AppLocale, path = "/") {
  if (path === "/") {
    return `/${locale}`;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalizedPath}`;
}

export function stripLocaleFromPath(pathname: string) {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];

  if (!maybeLocale || !isAppLocale(maybeLocale)) {
    return pathname || "/";
  }

  const nextPath = `/${segments.slice(2).join("/")}`.replace(/\/+$/, "");
  return nextPath === "" ? "/" : nextPath;
}

export function switchLocaleInPath(pathname: string, locale: AppLocale) {
  return getLocalizedPath(locale, stripLocaleFromPath(pathname));
}
