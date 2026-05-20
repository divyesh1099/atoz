import { CheckCircle2, MapPinned, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { SitePhoto } from "@/components/site-photo";
import {
  getDefaultWhatsAppMessage,
  getLocalizedFaqs,
  getLocalizedServices,
} from "@/lib/content";
import { getCurrentMessages } from "@/lib/i18n";
import { sitePhotos } from "@/lib/media";
import {
  createMetadata,
  getBreadcrumbSchema,
  getFaqSchema,
  getServicesItemListSchema,
} from "@/lib/seo";
import { getLocalizedPath, isAppLocale } from "@/i18n/routing";
import { mapSearchUrl, whatsappUrl } from "@/lib/site";
import { getBusinessSettings } from "@/lib/settings-store";
import { getMessagesForLocale } from "@/messages";

type ServicesPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: ServicesPageProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    return {};
  }

  const business = await getBusinessSettings();
  const messages = await getMessagesForLocale(locale);

  return createMetadata({
    business,
    locale,
    title: messages.servicesPage.meta.title,
    description: messages.servicesPage.meta.description,
    path: "/services",
    keywords: [...messages.site.localKeywords],
    imageAlt: messages.metadata.socialAlt,
  });
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  const business = await getBusinessSettings();
  const messages = await getCurrentMessages();
  const services = getLocalizedServices(messages);
  const faqs = getLocalizedFaqs(messages);
  const whatsappMessage = getDefaultWhatsAppMessage(business, locale);

  return (
    <>
      <JsonLd
        data={[
          getBreadcrumbSchema(locale, [
            { name: messages.breadcrumbs.home, path: "/" },
            { name: messages.breadcrumbs.services, path: "/services" },
          ]),
          getServicesItemListSchema(locale, services),
          getFaqSchema(faqs),
        ]}
      />

      <section className="section-shell pt-10 pb-12 lg:pt-14">
        <Breadcrumbs
          items={[
            { label: messages.breadcrumbs.home, href: getLocalizedPath(locale, "/") },
            { label: messages.breadcrumbs.services },
          ]}
        />
        <div
          data-hero-sequence
          className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_340px]"
        >
          <div data-hero-item>
            <span className="eyebrow">{messages.servicesPage.hero.eyebrow}</span>
            <h1 className="font-display mt-5 text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {messages.servicesPage.hero.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {messages.servicesPage.hero.copy}
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
              {messages.servicesPage.aside.eyebrow}
            </p>
            <div className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
              {messages.servicesPage.aside.items.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <a
              className="btn-secondary mt-6"
              href={whatsappUrl(business, whatsappMessage)}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              {messages.servicesPage.aside.action}
            </a>
          </aside>
        </div>
      </section>

      <section className="section-shell pb-16">
        <div data-stagger className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              locale={locale}
              detailsLabel={messages.common.viewDetails}
              bookLabel={messages.common.bookThisService}
            />
          ))}
        </div>
      </section>

      <section className="section-space">
        <div data-stagger className="section-shell grid gap-6 lg:grid-cols-3">
          {messages.servicesPage.supportCards.map((item, index) => (
            <article
              key={item.title}
              data-stagger-item
              className="surface-card rounded-[1.7rem] p-6"
            >
              <div className="icon-chip h-11 w-11">
                {index === 2 ? (
                  <MapPinned className="h-5 w-5" />
                ) : (
                  <CheckCircle2 className="h-5 w-5" />
                )}
              </div>
              <h2 className="font-display mt-5 text-xl font-semibold text-slate-950">
                {item.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                {item.text}
              </p>
              {index === 2 ? (
                <a
                  className="btn-ghost mt-6"
                  href={mapSearchUrl(business)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {messages.common.openDirections}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow={messages.servicesPage.faq.eyebrow}
              title={messages.servicesPage.faq.title}
              copy={messages.servicesPage.faq.copy}
            />
          </div>
          <FaqList items={faqs} />
        </div>
      </section>

      <CtaBanner
        eyebrow={messages.servicesPage.cta.eyebrow}
        title={messages.servicesPage.cta.title}
        copy={messages.servicesPage.cta.copy}
        primaryAction={{
          label: messages.servicesPage.cta.primaryAction,
          href: getLocalizedPath(locale, "/book-service"),
        }}
        secondaryAction={{
          label: messages.servicesPage.cta.secondaryAction,
          href: whatsappUrl(business, whatsappMessage),
          variant: "secondary",
          external: true,
        }}
      />
    </>
  );
}
