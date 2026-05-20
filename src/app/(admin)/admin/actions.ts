"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  clearAdminSession,
  createAdminSession,
  isAdminAuthenticated,
  isAdminConfigured,
  verifyAdminPassword,
} from "@/lib/admin";
import { locales } from "@/i18n/routing";
import { saveBusinessSettings, textToList } from "@/lib/settings-store";

function getField(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

export async function loginAction(formData: FormData) {
  if (!isAdminConfigured()) {
    redirect("/admin?error=admin-not-configured");
  }

  if (!verifyAdminPassword(getField(formData, "password"))) {
    redirect("/admin?error=invalid-password");
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin?message=logged-out");
}

export async function updateBusinessSettingsAction(formData: FormData) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin?error=session-expired");
  }

  await saveBusinessSettings({
    name: getField(formData, "name"),
    shortName: getField(formData, "shortName"),
    owner: getField(formData, "owner"),
    tagline: getField(formData, "tagline"),
    description: getField(formData, "description"),
    primaryPhoneDisplay: getField(formData, "primaryPhoneDisplay"),
    secondaryPhoneDisplay: getField(formData, "secondaryPhoneDisplay"),
    whatsappPhoneDisplay: getField(formData, "whatsappPhoneDisplay"),
    email: getField(formData, "email"),
    addressLine1: getField(formData, "addressLine1"),
    addressLine2: getField(formData, "addressLine2"),
    streetAddress: getField(formData, "streetAddress"),
    locality: getField(formData, "locality"),
    city: getField(formData, "city"),
    region: getField(formData, "region"),
    postalCode: getField(formData, "postalCode"),
    countryCode: getField(formData, "countryCode"),
    googleMapsUrl: getField(formData, "googleMapsUrl"),
    areaServed: textToList(getField(formData, "areaServed")),
    brands: textToList(getField(formData, "brands")),
  });

  for (const locale of locales) {
    revalidatePath(`/${locale}`, "layout");
  }

  revalidatePath("/opengraph-image");
  revalidatePath("/manifest.webmanifest");
  revalidatePath("/robots.txt");
  revalidatePath("/sitemap.xml");

  redirect("/admin?saved=1");
}
