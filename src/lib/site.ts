import { defaultBusiness, type BusinessInfo } from "@/content/site";
import type { AppLocale } from "@/i18n/routing";
import { getLocalizedPath } from "@/i18n/routing";

export type BookingRequest = {
  name: string;
  phone: string;
  email: string;
  service: string;
  device: string;
  location: string;
  preferredTime: string;
  contactMethod: string;
  message: string;
};

export type BookingMessageCopy = {
  greetingPrefix: string;
  intro: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  device: string;
  location: string;
  preferredTime: string;
  preferredContactMethod: string;
  issueDetails: string;
  emptyValue: string;
};

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function normalizeBaseUrl(value: string) {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `https://${value}`;
}

export function getSiteUrl() {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    "http://localhost:3000";

  return normalizeBaseUrl(configured).replace(/\/$/, "");
}

export function absoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString();
}

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function mapSearchUrl(business: Pick<BusinessInfo, "addressLine1" | "addressLine2" | "googleMapsUrl">) {
  if (business.googleMapsUrl) {
    return business.googleMapsUrl;
  }

  const address = `${business.addressLine1}, ${business.addressLine2}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function whatsappUrl(
  business: Pick<BusinessInfo, "whatsappPhoneDisplay" | "name">,
  message?: string,
) {
  const query = message
    ? `?text=${encodeURIComponent(message)}`
    : `?text=${encodeURIComponent(
        `Hello ${business.name}, I need computer service support.`,
      )}`;

  return `https://wa.me/${digitsOnly(business.whatsappPhoneDisplay)}${query}`;
}

export function mailtoUrl(
  business: Pick<BusinessInfo, "email">,
  subject?: string,
  body?: string,
) {
  const params = new URLSearchParams();

  if (subject) {
    params.set("subject", subject);
  }

  if (body) {
    params.set("body", body);
  }

  const query = params.toString();
  return `mailto:${business.email}${query ? `?${query}` : ""}`;
}

export function getServiceBookingUrl(locale: AppLocale, slug?: string) {
  const path = getLocalizedPath(locale, "/book-service");

  return slug ? `${path}?service=${encodeURIComponent(slug)}` : path;
}

export function buildBookingMessage(
  data: BookingRequest,
  {
    businessName = defaultBusiness.name,
    serviceTitle,
    copy,
  }: {
    businessName?: string;
    serviceTitle?: string;
    copy: BookingMessageCopy;
  },
) {
  const lines = [
    `${copy.greetingPrefix} ${businessName},`,
    "",
    copy.intro,
    "",
    `${copy.name}: ${data.name || copy.emptyValue}`,
    `${copy.phone}: ${data.phone || copy.emptyValue}`,
    `${copy.email}: ${data.email || copy.emptyValue}`,
    `${copy.service}: ${serviceTitle || data.service || copy.emptyValue}`,
    `${copy.device}: ${data.device || copy.emptyValue}`,
    `${copy.location}: ${data.location || copy.emptyValue}`,
    `${copy.preferredTime}: ${data.preferredTime || copy.emptyValue}`,
    `${copy.preferredContactMethod}: ${data.contactMethod || copy.emptyValue}`,
    "",
    `${copy.issueDetails}:`,
    data.message || copy.emptyValue,
  ];

  return lines.join("\n");
}
