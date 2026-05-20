import { promises as fs } from "fs";
import path from "path";

import { defaultBusiness, type BusinessInfo } from "@/content/site";

const configuredDataDirectory = process.env.DATA_DIRECTORY?.trim();
const settingsDirectoryPath = configuredDataDirectory
  ? path.isAbsolute(configuredDataDirectory)
    ? configuredDataDirectory
    : path.join(
        /* turbopackIgnore: true */ process.cwd(),
        configuredDataDirectory,
      )
  : path.join(process.cwd(), "data");
const settingsFilePath = path.join(settingsDirectoryPath, "site-settings.json");

function normalizeList(values: string[]) {
  return Array.from(
    new Set(
      values
        .map((value) => value.trim())
        .filter(Boolean),
    ),
  );
}

function normalizeText(value: string | undefined, fallback: string) {
  return typeof value === "string" ? value.trim() : fallback;
}

export function textToList(value: string) {
  return normalizeList(value.split(/\r?\n|,/));
}

export function listToText(values: string[]) {
  return values.join("\n");
}

function sanitizeBusinessSettings(input: Partial<BusinessInfo>): BusinessInfo {
  return {
    ...defaultBusiness,
    ...input,
    name: normalizeText(input.name, defaultBusiness.name),
    shortName: normalizeText(input.shortName, defaultBusiness.shortName),
    owner: normalizeText(input.owner, defaultBusiness.owner),
    tagline: normalizeText(input.tagline, defaultBusiness.tagline),
    description: normalizeText(input.description, defaultBusiness.description),
    primaryPhoneDisplay: normalizeText(
      input.primaryPhoneDisplay,
      defaultBusiness.primaryPhoneDisplay,
    ),
    secondaryPhoneDisplay:
      typeof input.secondaryPhoneDisplay === "string"
        ? input.secondaryPhoneDisplay.trim()
        : defaultBusiness.secondaryPhoneDisplay,
    whatsappPhoneDisplay: normalizeText(
      input.whatsappPhoneDisplay,
      defaultBusiness.whatsappPhoneDisplay,
    ),
    email: normalizeText(input.email, defaultBusiness.email),
    addressLine1: normalizeText(input.addressLine1, defaultBusiness.addressLine1),
    addressLine2: normalizeText(input.addressLine2, defaultBusiness.addressLine2),
    streetAddress: normalizeText(
      input.streetAddress,
      defaultBusiness.streetAddress,
    ),
    locality: normalizeText(input.locality, defaultBusiness.locality),
    city: normalizeText(input.city, defaultBusiness.city),
    region: normalizeText(input.region, defaultBusiness.region),
    postalCode: normalizeText(input.postalCode, defaultBusiness.postalCode),
    countryCode: normalizeText(
      input.countryCode,
      defaultBusiness.countryCode,
    ).toUpperCase(),
    googleMapsUrl:
      typeof input.googleMapsUrl === "string" ? input.googleMapsUrl.trim() : "",
    areaServed: normalizeList(input.areaServed ?? defaultBusiness.areaServed),
    brands: normalizeList(input.brands ?? defaultBusiness.brands),
  };
}

async function ensureSettingsFile() {
  await fs.mkdir(settingsDirectoryPath, { recursive: true });

  try {
    await fs.access(settingsFilePath);
  } catch {
    await fs.writeFile(
      settingsFilePath,
      `${JSON.stringify(defaultBusiness, null, 2)}\n`,
      "utf8",
    );
  }
}

export async function getBusinessSettings() {
  await ensureSettingsFile();

  try {
    const raw = await fs.readFile(settingsFilePath, "utf8");
    const parsed = JSON.parse(raw) as Partial<BusinessInfo>;
    return sanitizeBusinessSettings(parsed);
  } catch {
    return sanitizeBusinessSettings(defaultBusiness);
  }
}

export async function saveBusinessSettings(input: Partial<BusinessInfo>) {
  const settings = sanitizeBusinessSettings(input);

  await ensureSettingsFile();
  await fs.writeFile(
    settingsFilePath,
    `${JSON.stringify(settings, null, 2)}\n`,
    "utf8",
  );

  return settings;
}

export { settingsFilePath };
