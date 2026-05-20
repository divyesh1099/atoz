import { Mail, MapPinned, MessageCircle, PhoneCall } from "lucide-react";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { JsonLd } from "@/components/json-ld";
import { SitePhoto } from "@/components/site-photo";
import { getDefaultWhatsAppMessage } from "@/lib/content";
import { getCurrentMessages } from "@/lib/i18n";
import { sitePhotos } from "@/lib/media";
import { createMetadata, getBreadcrumbSchema } from "@/lib/seo";
import { getLocalizedPath, isAppLocale } from "@/i18n/routing";
import { mailtoUrl, mapSearchUrl, telHref, whatsappUrl } from "@/lib/site";
import { getBusinessSettings } from "@/lib/settings-store";
import { getMessagesForLocale } from "@/messages";

type ContactPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: ContactPageProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    return {};
  }

  const business = await getBusinessSettings();
  const messages = await getMessagesForLocale(locale);

  return createMetadata({
    business,
    locale,
    title: messages.contactPage.meta.title,
    description: messages.contactPage.meta.description,
    path: "/contact",
    keywords: [...messages.site.localKeywords],
    imageAlt: messages.metadata.socialAlt,
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  const business = await getBusinessSettings();
  const messages = await getCurrentMessages();
  const whatsappMessage = getDefaultWhatsAppMessage(business, locale);

  const contactMethods = [
    {
      title: messages.contactPage.methods.primaryPhone.title,
      value: business.primaryPhoneDisplay,
      helper: messages.contactPage.methods.primaryPhone.helper,
      href: telHref(business.primaryPhoneDisplay),
      icon: PhoneCall,
    },
    {
      title: messages.contactPage.methods.secondaryPhone.title,
      value: business.secondaryPhoneDisplay,
      helper: messages.contactPage.methods.secondaryPhone.helper,
      href: telHref(business.secondaryPhoneDisplay),
      icon: PhoneCall,
    },
    {
      title: messages.contactPage.methods.whatsapp.title,
      value: messages.contactPage.methods.whatsapp.value,
      helper: messages.contactPage.methods.whatsapp.helper,
      href: whatsappUrl(business, whatsappMessage),
      icon: MessageCircle,
      external: true,
    },
    {
      title: messages.contactPage.methods.email.title,
      value: business.email,
      helper: messages.contactPage.methods.email.helper,
      href: mailtoUrl(business),
      icon: Mail,
    },
  ].filter((method) => method.value);

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema(locale, [
          { name: messages.breadcrumbs.home, path: "/" },
          { name: messages.breadcrumbs.contact, path: "/contact" },
        ])}
      />

      <section className="section-shell pt-10 pb-12 lg:pt-14">
        <Breadcrumbs
          items={[
            { label: messages.breadcrumbs.home, href: getLocalizedPath(locale, "/") },
            { label: messages.breadcrumbs.contact },
          ]}
        />
        <div
          data-hero-sequence
          className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_340px]"
        >
          <div data-hero-item>
            <span className="eyebrow">{messages.contactPage.hero.eyebrow}</span>
            <h1 className="font-display mt-5 text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {messages.contactPage.hero.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {messages.contactPage.hero.copy}
            </p>
          </div>

          <aside data-hero-item className="surface-card rounded-[1.8rem] p-6">
            <SitePhoto
              src={sitePhotos.shopFront.src}
              alt={sitePhotos.shopFront.alt}
              className="mb-6 aspect-[16/11] rounded-[1.4rem]"
              sizes="(max-width: 1024px) 100vw, 28vw"
            />
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {messages.common.location}
            </p>
            <div className="mt-5 flex items-start gap-3 text-base leading-7 text-slate-600">
              <MapPinned className="mt-1 h-5 w-5 shrink-0 text-slate-500" />
              <p>
                {business.addressLine1}
                <br />
                {business.addressLine2}
              </p>
            </div>
            <a
              className="btn-secondary mt-6"
              href={mapSearchUrl(business)}
              target="_blank"
              rel="noreferrer"
            >
              {messages.common.openDirections}
            </a>
          </aside>
        </div>
      </section>

      <section className="section-shell pb-16">
        <div data-stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {contactMethods.map((method) => {
            const Icon = method.icon;

            return (
              <a
                key={method.title}
                data-stagger-item
                className="surface-card rounded-[1.7rem] p-6 transition-colors duration-200 hover:border-slate-900/15 hover:bg-slate-50/60"
                href={method.href}
                target={method.external ? "_blank" : undefined}
                rel={method.external ? "noreferrer" : undefined}
              >
                <div className="icon-chip h-12 w-12">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="font-display mt-5 text-xl font-semibold text-slate-950">
                  {method.title}
                </h2>
                <p className="mt-2 text-base leading-7 text-slate-600">
                  {method.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {method.helper}
                </p>
              </a>
            );
          })}
        </div>
      </section>

      <section className="section-space">
        <div data-stagger className="section-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article data-stagger-item className="surface-card rounded-[1.8rem] p-6 sm:p-8">
            <span className="eyebrow">{messages.contactPage.visit.eyebrow}</span>
            <h2 className="font-display mt-5 text-3xl font-semibold text-slate-950">
              {messages.contactPage.visit.title}
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              {messages.contactPage.visit.copy}
            </p>
            <div className="info-tile mt-6 p-5 text-base leading-7 text-slate-700">
              <p>{business.addressLine1}</p>
              <p>{business.addressLine2}</p>
            </div>
            <a
              className="btn-ghost mt-6"
              href={mapSearchUrl(business)}
              target="_blank"
              rel="noreferrer"
            >
              {messages.contactPage.visit.action}
            </a>
          </article>

          <article data-stagger-item className="surface-card rounded-[1.8rem] p-6 sm:p-8">
            <span className="eyebrow">{messages.contactPage.beforeContact.eyebrow}</span>
            <h2 className="font-display mt-5 text-3xl font-semibold text-slate-950">
              {messages.contactPage.beforeContact.title}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
              {messages.contactPage.beforeContact.items.map((item) => (
                <div key={item} className="flex gap-3">
                  <MessageCircle className="mt-1 h-5 w-5 shrink-0 text-slate-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
              {business.brands.map((brand) => (
                <span
                  key={brand}
                  className="rounded-full border border-slate-900/10 bg-slate-50 px-3 py-1"
                >
                  {brand}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <CtaBanner
        eyebrow={messages.contactPage.cta.eyebrow}
        title={messages.contactPage.cta.title}
        copy={messages.contactPage.cta.copy}
        primaryAction={{
          label: messages.contactPage.cta.primaryAction,
          href: whatsappUrl(business, whatsappMessage),
          external: true,
        }}
        secondaryAction={{
          label: messages.contactPage.cta.secondaryAction,
          href: getLocalizedPath(locale, "/book-service"),
          variant: "secondary",
        }}
      />
    </>
  );
}
