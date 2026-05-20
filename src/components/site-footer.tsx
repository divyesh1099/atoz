import Link from "next/link";

import { LanguageSwitcher } from "@/components/language-switcher";
import type { Service } from "@/content/services";
import type { BusinessInfo, NavigationItem } from "@/content/site";
import type { AppLocale } from "@/i18n/routing";
import { getLocalizedPath } from "@/i18n/routing";
import { mailtoUrl, mapSearchUrl, telHref, whatsappUrl } from "@/lib/site";

type SiteFooterProps = {
  business: BusinessInfo;
  locale: AppLocale;
  navigation: NavigationItem[];
  services: Service[];
  eyebrow: string;
  description: string;
  navigationTitle: string;
  servicesTitle: string;
  contactTitle: string;
  ownerLabel: string;
  languageLabel: string;
  whatsappLabel: string;
  directionsLabel: string;
  copyright: string;
  whatsappMessage?: string;
};

export function SiteFooter({
  business,
  locale,
  navigation,
  services,
  eyebrow,
  description,
  navigationTitle,
  servicesTitle,
  contactTitle,
  ownerLabel,
  languageLabel,
  whatsappLabel,
  directionsLabel,
  copyright,
  whatsappMessage,
}: SiteFooterProps) {
  return (
    <footer className="border-t border-slate-900/8 bg-white">
      <div className="section-shell py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.9fr_1fr]">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="font-display mt-5 text-2xl font-semibold text-slate-950">
              {business.name}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              {description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
              {business.brands.map((brand) => (
                <span
                  key={brand}
                  className="rounded-full border border-slate-900/10 bg-slate-50 px-3 py-1"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-slate-950">
              {navigationTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-base text-slate-600">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link className="transition hover:text-slate-950" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-display mt-8 text-lg font-semibold text-slate-950">
              {servicesTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-base text-slate-600">
              {services.slice(0, 4).map((service) => (
                <li key={service.slug}>
                  <Link
                    className="transition hover:text-slate-950"
                    href={getLocalizedPath(locale, `/services/${service.slug}`)}
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-slate-950">
              {contactTitle}
            </h3>
            <div className="mt-4 space-y-4 text-base leading-7 text-slate-600">
              <p>
                <strong className="text-slate-950">{ownerLabel}:</strong>{" "}
                {business.owner}
              </p>
              <p>
                <a
                  className="transition hover:text-slate-950"
                  href={telHref(business.primaryPhoneDisplay)}
                >
                  {business.primaryPhoneDisplay}
                </a>
                {business.secondaryPhoneDisplay ? (
                  <>
                    <br />
                    <a
                      className="transition hover:text-slate-950"
                      href={telHref(business.secondaryPhoneDisplay)}
                    >
                      {business.secondaryPhoneDisplay}
                    </a>
                  </>
                ) : null}
              </p>
              <p>
                <a
                  className="transition hover:text-slate-950"
                  href={mailtoUrl(business)}
                >
                  {business.email}
                </a>
              </p>
              <p>
                {business.addressLine1}
                <br />
                {business.addressLine2}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  className="btn-secondary"
                  href={whatsappUrl(business, whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {whatsappLabel}
                </a>
                <a
                  className="btn-ghost"
                  href={mapSearchUrl(business)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {directionsLabel}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-900/10 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} {business.name}. {copyright}
          </p>
          <LanguageSwitcher
            locale={locale}
            label={languageLabel}
            variant="subtle"
          />
        </div>
      </div>
    </footer>
  );
}
