import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { JsonLd } from "@/components/json-ld";
import { MotionProvider } from "@/components/motion-provider";
import { QuickActions } from "@/components/quick-actions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getDefaultWhatsAppMessage,
  getLocalizedServices,
  getNavigation,
} from "@/lib/content";
import { bodyFont } from "@/lib/fonts";
import { getCurrentMessages } from "@/lib/i18n";
import { getLocalBusinessSchema } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";
import { getBusinessSettings } from "@/lib/settings-store";
import {
  getLocalizedPath,
  isAppLocale,
  localeMeta,
  locales,
} from "@/i18n/routing";
import { getMessagesForLocale } from "@/messages";
import "@/app/globals.css";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    return {};
  }

  const business = await getBusinessSettings();
  const messages = await getMessagesForLocale(locale);

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: `${business.name} | ${messages.metadata.siteTitleSuffix}`,
      template: `%s | ${business.name}`,
    },
    applicationName: business.name,
    category: "technology",
    authors: [{ name: business.owner }],
    openGraph: {
      siteName: business.name,
      locale: localeMeta[locale].openGraphLocale,
    },
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      shortcut: "/icon.svg",
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? undefined,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const business = await getBusinessSettings();
  const messages = await getCurrentMessages();
  const services = getLocalizedServices(messages);
  const navigation = getNavigation(messages, locale);
  const whatsappMessage = getDefaultWhatsAppMessage(business, locale);

  return (
    <html
      lang={localeMeta[locale].languageTag}
      className={`${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <JsonLd
          data={getLocalBusinessSchema(business, locale, {
            description: messages.home.hero.description,
            services,
          })}
        />
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader
            business={business}
            navigation={navigation}
            homeHref={getLocalizedPath(locale, "/")}
            tagline={messages.header.tagline}
            callNowLabel={messages.common.callNow}
            callLabel={messages.common.call}
            whatsappLabel={messages.common.whatsapp}
            toggleMenuLabel={messages.common.toggleMenu}
            whatsappMessage={whatsappMessage}
          />
          <main className="relative z-10 flex-1">{children}</main>
          <MotionProvider />
          <SiteFooter
            business={business}
            locale={locale}
            navigation={navigation}
            services={services}
            eyebrow={messages.footer.eyebrow}
            description={messages.footer.description}
            navigationTitle={messages.footer.navigationTitle}
            servicesTitle={messages.footer.servicesTitle}
            contactTitle={messages.footer.contactTitle}
            ownerLabel={messages.common.ownerLabel}
            languageLabel={messages.languages.label}
            whatsappLabel={messages.common.whatsapp}
            directionsLabel={messages.common.getDirections}
            copyright={messages.footer.copyright}
            whatsappMessage={whatsappMessage}
          />
          <QuickActions
            business={business}
            locale={locale}
            callLabel={messages.common.call}
            whatsappLabel={messages.common.whatsapp}
            bookLabel={messages.common.book}
            whatsappOwnerPrefix={messages.quickActions.whatsappOwnerPrefix}
            whatsappMessage={whatsappMessage}
          />
        </div>
      </body>
    </html>
  );
}
