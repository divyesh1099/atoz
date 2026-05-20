import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { JsonLd } from "@/components/json-ld";
import { ServiceCard } from "@/components/service-card";
import { SitePhoto } from "@/components/site-photo";
import {
  getLocalizedService,
  getLocalizedServices,
  getServiceInquiryMessage,
} from "@/lib/content";
import { getCurrentMessages } from "@/lib/i18n";
import { getServicePhoto } from "@/lib/media";
import {
  createMetadata,
  getBreadcrumbSchema,
  getServiceSchema,
} from "@/lib/seo";
import { getLocalizedPath, isAppLocale } from "@/i18n/routing";
import { getServiceBookingUrl, whatsappUrl } from "@/lib/site";
import { getBusinessSettings } from "@/lib/settings-store";
import { serviceCatalog } from "@/content/services";
import { getMessagesForLocale } from "@/messages";

export const dynamicParams = false;

type ServiceDetailPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return serviceCatalog.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const { locale, slug } = await params;

  if (!isAppLocale(locale)) {
    return {};
  }

  const business = await getBusinessSettings();
  const messages = await getMessagesForLocale(locale);
  const service = getLocalizedService(messages, slug);

  if (!service) {
    return {};
  }

  return createMetadata({
    business,
    locale,
    title: service.title,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    keywords: [...service.keywords],
    imageAlt: messages.metadata.socialAlt,
  });
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { locale, slug } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  const messages = await getCurrentMessages();
  const service = getLocalizedService(messages, slug);

  if (!service) {
    notFound();
  }

  const business = await getBusinessSettings();
  const services = getLocalizedServices(messages);
  const relatedServices = services
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);
  const servicePhoto = getServicePhoto(service.slug);
  const whatsappMessage = getServiceInquiryMessage(
    business,
    service.title,
    locale,
  );

  return (
    <>
      <JsonLd
        data={[
          getBreadcrumbSchema(locale, [
            { name: messages.breadcrumbs.home, path: "/" },
            { name: messages.breadcrumbs.services, path: "/services" },
            {
              name: service.title,
              path: `/services/${service.slug}`,
            },
          ]),
          getServiceSchema(locale, service, business),
        ]}
      />

      <section className="section-shell pt-10 pb-12 lg:pt-14">
        <Breadcrumbs
          items={[
            { label: messages.breadcrumbs.home, href: getLocalizedPath(locale, "/") },
            {
              label: messages.breadcrumbs.services,
              href: getLocalizedPath(locale, "/services"),
            },
            { label: service.title },
          ]}
        />
        <div
          data-hero-sequence
          className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_340px]"
        >
          <div data-hero-item>
            <span className="eyebrow">{service.shortLabel}</span>
            <h1 className="font-display mt-5 text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {service.title} {messages.servicePage.heroTitleSuffix}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {service.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link className="btn-primary" href={getServiceBookingUrl(locale, service.slug)}>
                {messages.common.bookThisService}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                className="btn-secondary"
                href={whatsappUrl(business, whatsappMessage)}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                {messages.common.askOnWhatsApp}
              </a>
            </div>
          </div>

          <aside data-hero-item className="surface-card rounded-[1.8rem] p-6">
            <SitePhoto
              src={servicePhoto.src}
              alt={servicePhoto.alt}
              className="mb-6 aspect-[16/11] rounded-[1.4rem]"
              sizes="(max-width: 1024px) 100vw, 28vw"
            />
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {messages.servicePage.highlightsEyebrow}
            </p>
            <div className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
              {service.keywords.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section-shell pb-16">
        <div data-stagger className="grid gap-6 lg:grid-cols-3">
          <article data-stagger-item className="surface-card rounded-[1.8rem] p-6 sm:p-7">
            <h2 className="font-display text-2xl font-semibold text-slate-950">
              {messages.servicePage.commonIssues}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
              {service.issues.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-slate-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>

          <article data-stagger-item className="surface-card rounded-[1.8rem] p-6 sm:p-7">
            <h2 className="font-display text-2xl font-semibold text-slate-950">
              {messages.servicePage.included}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
              {service.includes.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-slate-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>

          <article data-stagger-item className="surface-card rounded-[1.8rem] p-6 sm:p-7">
            <h2 className="font-display text-2xl font-semibold text-slate-950">
              {messages.servicePage.bestFor}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
              {service.bestFor.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-slate-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell">
          <div data-reveal="up" className="max-w-3xl">
            <span className="eyebrow">{messages.servicePage.relatedEyebrow}</span>
            <h2 className="font-display mt-5 text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              {messages.servicePage.relatedTitle}
            </h2>
          </div>
          <div data-stagger className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedServices.map((item) => (
              <ServiceCard
                key={item.slug}
                service={item}
                locale={locale}
                detailsLabel={messages.common.viewDetails}
                bookLabel={messages.common.bookThisService}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow={messages.servicePage.cta.eyebrow}
        title={messages.servicePage.cta.title}
        copy={messages.servicePage.cta.copy}
        primaryAction={{
          label: messages.servicePage.cta.primaryAction,
          href: getServiceBookingUrl(locale, service.slug),
        }}
        secondaryAction={{
          label: messages.servicePage.cta.secondaryAction,
          href: getLocalizedPath(locale, "/services"),
          variant: "secondary",
        }}
      />
    </>
  );
}
