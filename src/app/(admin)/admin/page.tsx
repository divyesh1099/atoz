import { LockKeyhole, LogOut, Save, Settings2 } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin";
import {
  getBusinessSettings,
  listToText,
  settingsFilePath,
} from "@/lib/settings-store";

import {
  loginAction,
  logoutAction,
  updateBusinessSettingsAction,
} from "./actions";

const inputClassName = "field-control";

type AdminPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
    saved?: string;
  }>;
};

function getBannerCopy(params: {
  error?: string;
  message?: string;
  saved?: string;
}) {
  if (params.saved === "1") {
    return {
      tone: "success",
      text: "Contact details and business settings were saved. The public site will refresh with the new values.",
    };
  }

  if (params.error === "invalid-password") {
    return {
      tone: "error",
      text: "The admin password was incorrect.",
    };
  }

  if (params.error === "session-expired") {
    return {
      tone: "error",
      text: "Your admin session expired. Please unlock the admin panel again.",
    };
  }

  if (params.error === "admin-not-configured") {
    return {
      tone: "warning",
      text: "Set ADMIN_PASSWORD in your environment before using the admin panel.",
    };
  }

  if (params.message === "logged-out") {
    return {
      tone: "info",
      text: "You have been logged out of the admin panel.",
    };
  }

  return null;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const banner = getBannerCopy(params);
  const adminConfigured = isAdminConfigured();
  const authenticated = adminConfigured ? await isAdminAuthenticated() : false;
  const business = await getBusinessSettings();

  return (
    <section className="section-shell section-space">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/en" },
          { label: "Admin" },
        ]}
      />

      <div className="mt-6 grid gap-8">
        <div className="hero-panel px-6 py-8 sm:px-8 lg:px-10">
          <span className="eyebrow">Admin panel</span>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="font-display text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Edit contact details and business settings without touching code.
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                This panel updates the managed settings file used across the
                header, footer, booking form, contact page, schema, and metadata.
              </p>
            </div>
            <div className="surface-card rounded-[1.5rem] px-5 py-4 text-sm leading-6 text-slate-600">
              <p className="font-semibold text-slate-950">Storage path</p>
              <p>{settingsFilePath}</p>
            </div>
          </div>
        </div>

        {banner ? (
          <div
            className={[
              "rounded-[1.25rem] border px-5 py-4 text-sm leading-6",
              banner.tone === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : banner.tone === "error"
                  ? "border-red-200 bg-red-50 text-red-800"
                  : banner.tone === "warning"
                    ? "border-amber-200 bg-amber-50 text-amber-800"
                    : "border-slate-200 bg-slate-50 text-slate-700",
            ].join(" ")}
          >
            {banner.text}
          </div>
        ) : null}

        {!adminConfigured ? (
          <div className="surface-card rounded-[2rem] p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="icon-chip h-12 w-12">
                <Settings2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold text-slate-950">
                  Admin password is not configured yet
                </h2>
                <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                  Add `ADMIN_PASSWORD` to your local `.env` file or hosting
                  environment, then reload this page. The admin panel stays
                  protected until that password is present.
                </p>
                <div className="info-tile mt-6 p-5 text-sm leading-6 text-slate-700">
                  <p className="font-semibold text-slate-950">Example</p>
                  <code className="mt-2 block whitespace-pre-wrap">
                    ADMIN_PASSWORD=change-this-before-going-live
                  </code>
                </div>
              </div>
            </div>
          </div>
        ) : !authenticated ? (
          <div className="surface-card max-w-xl rounded-[2rem] p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="icon-chip h-12 w-12">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <div className="w-full">
                <h2 className="font-display text-2xl font-semibold text-slate-950">
                  Unlock admin
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  Enter the admin password to manage contact details and live
                  business settings.
                </p>
                <form action={loginAction} className="mt-6 grid gap-4">
                  <label className="text-sm font-semibold text-slate-700">
                    Admin password
                    <input
                      className={inputClassName}
                      type="password"
                      name="password"
                      placeholder="Enter admin password"
                      autoComplete="current-password"
                      required
                    />
                  </label>
                  <button type="submit" className="btn-primary w-fit">
                    <LockKeyhole className="h-4 w-4" />
                    Unlock panel
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl font-semibold text-slate-950">
                  Business settings
                </h2>
                <p className="mt-2 text-base leading-7 text-slate-600">
                  Save once and the public site will use these values everywhere.
                </p>
              </div>
              <form action={logoutAction}>
                <button type="submit" className="btn-ghost">
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </form>
            </div>

            <form action={updateBusinessSettingsAction} className="grid gap-8">
              <div className="surface-card rounded-[2rem] p-6 sm:p-8">
                <h3 className="font-display text-2xl font-semibold text-slate-950">
                  Business basics
                </h3>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Business name
                    <input
                      className={inputClassName}
                      name="name"
                      defaultValue={business.name}
                      required
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Short name
                    <input
                      className={inputClassName}
                      name="shortName"
                      defaultValue={business.shortName}
                      required
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Owner name
                    <input
                      className={inputClassName}
                      name="owner"
                      defaultValue={business.owner}
                      required
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Tagline
                    <input
                      className={inputClassName}
                      name="tagline"
                      defaultValue={business.tagline}
                      required
                    />
                  </label>
                </div>
                <label className="mt-5 block text-sm font-semibold text-slate-700">
                  Business description
                  <textarea
                    className={`${inputClassName} min-h-28 resize-y`}
                    name="description"
                    defaultValue={business.description}
                    required
                  />
                </label>
              </div>

              <div className="surface-card rounded-[2rem] p-6 sm:p-8">
                <h3 className="font-display text-2xl font-semibold text-slate-950">
                  Contact details
                </h3>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Primary phone
                    <input
                      className={inputClassName}
                      name="primaryPhoneDisplay"
                      defaultValue={business.primaryPhoneDisplay}
                      required
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Secondary phone
                    <input
                      className={inputClassName}
                      name="secondaryPhoneDisplay"
                      defaultValue={business.secondaryPhoneDisplay}
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    WhatsApp phone
                    <input
                      className={inputClassName}
                      name="whatsappPhoneDisplay"
                      defaultValue={business.whatsappPhoneDisplay}
                      required
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Email
                    <input
                      className={inputClassName}
                      type="email"
                      name="email"
                      defaultValue={business.email}
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="surface-card rounded-[2rem] p-6 sm:p-8">
                <h3 className="font-display text-2xl font-semibold text-slate-950">
                  Address and map
                </h3>
                <div className="mt-6 grid gap-5">
                  <label className="text-sm font-semibold text-slate-700">
                    Address line 1
                    <input
                      className={inputClassName}
                      name="addressLine1"
                      defaultValue={business.addressLine1}
                      required
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Address line 2
                    <input
                      className={inputClassName}
                      name="addressLine2"
                      defaultValue={business.addressLine2}
                      required
                    />
                  </label>
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Street address
                    <input
                      className={inputClassName}
                      name="streetAddress"
                      defaultValue={business.streetAddress}
                      required
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Locality
                    <input
                      className={inputClassName}
                      name="locality"
                      defaultValue={business.locality}
                      required
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    City
                    <input
                      className={inputClassName}
                      name="city"
                      defaultValue={business.city}
                      required
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Region
                    <input
                      className={inputClassName}
                      name="region"
                      defaultValue={business.region}
                      required
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Postal code
                    <input
                      className={inputClassName}
                      name="postalCode"
                      defaultValue={business.postalCode}
                      required
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Country code
                    <input
                      className={inputClassName}
                      name="countryCode"
                      defaultValue={business.countryCode}
                      required
                    />
                  </label>
                </div>
                <label className="mt-5 block text-sm font-semibold text-slate-700">
                  Google Maps URL
                  <input
                    className={inputClassName}
                    name="googleMapsUrl"
                    defaultValue={business.googleMapsUrl}
                    placeholder="Optional direct map link"
                  />
                </label>
              </div>

              <div className="surface-card rounded-[2rem] p-6 sm:p-8">
                <h3 className="font-display text-2xl font-semibold text-slate-950">
                  Coverage and brands
                </h3>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Areas served
                    <textarea
                      className={`${inputClassName} min-h-36 resize-y`}
                      name="areaServed"
                      defaultValue={listToText(business.areaServed)}
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Supported brands
                    <textarea
                      className={`${inputClassName} min-h-36 resize-y`}
                      name="brands"
                      defaultValue={listToText(business.brands)}
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn-primary">
                  <Save className="h-4 w-4" />
                  Save settings
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
