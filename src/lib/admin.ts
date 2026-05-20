import { createHash } from "crypto";

import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "atoz-admin-session";

function hashValue(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD?.trim());
}

export function verifyAdminPassword(submittedPassword: string) {
  const configuredPassword = process.env.ADMIN_PASSWORD?.trim();

  return Boolean(configuredPassword) && submittedPassword === configuredPassword;
}

export async function isAdminAuthenticated() {
  const configuredPassword = process.env.ADMIN_PASSWORD?.trim();

  if (!configuredPassword) {
    return false;
  }

  const cookieStore = await cookies();
  return (
    cookieStore.get(ADMIN_COOKIE_NAME)?.value === hashValue(configuredPassword)
  );
}

export async function createAdminSession() {
  const configuredPassword = process.env.ADMIN_PASSWORD?.trim();

  if (!configuredPassword) {
    return;
  }

  const cookieStore = await cookies();
  cookieStore.set({
    name: ADMIN_COOKIE_NAME,
    value: hashValue(configuredPassword),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
