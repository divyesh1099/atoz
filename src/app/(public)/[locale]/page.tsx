import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPinned,
  MessageCircle,
  PhoneCall,
} from "lucide-react";
import { notFound } from "next/navigation";

import { CtaBanner } from "@/components/cta-banner";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { SitePhoto } from "@/components/site-photo";
import {
  getDefaultWhatsAppMessage,
  getLocalizedCards,
  getLocalizedFaqs,
  getLocalizedServices,
} from "@/lib/content";
import { AppIcon } from "@/lib/icons";
import { getCurrentMessages } from "@/lib/i18n";
import { sitePhotos } from "@/lib/media";
import { createMetadata, getFaqSchema } from "@/lib/seo";
import { getLocalizedPath, isAppLocale } from "@/i18n/routing";
import { mailtoUrl, mapSearchUrl, telHref, whatsappUrl } from "@/lib/site";
import { getBusinessSettings } from "@/lib/settings-store";
import { getMessagesForLocale } from "@/messages";

type HomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    return {};
  }

  const business = await getBusinessSettings();
  const messages = await getMessagesForLocale(locale);

  return createMetadata({
    business,
    locale,
    title: messages.metadata.siteTitleSuffix,
    description: messages.home.hero.description,
    path: "/",
    keywords: [...messages.site.localKeywords],
    imageAlt: messages.metadata.socialAlt,
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  const business = await getBusinessSettings();
  const messages = await getCurrentMessages();
  const services = getLocalizedServices(messages);
  const faqs = getLocalizedFaqs(messages);
  const heroFacts = getLocalizedCards(messages, "heroFacts");
  const credibilityCards = getLocalizedCards(messages, "credibilityCards");
  const customerSegments = getLocalizedCards(messages, "customerSegments");
  const supportProcess = getLocalizedCards(messages, "supportProcess");
  const whatsappMessage = getDefaultWhatsAppMessage(business, locale);

  return (
    <>
      <JsonLd data={getFaqSchema(faqs)} />

      <section className="section-shell pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div
            data-hero-sequence
            className="hero-panel px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12"
          >
            <span className="eyebrow" data-hero-item>
              {messages.home.hero.eyebrow}
            </span>
            <h1
              data-hero-item
              className="font-display mt-6 text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-[4.3rem] lg:leading-[1.03]"
            >
              {messages.home.hero.title}
            </h1>
            <p data-hero-item className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              {business.name} {messages.home.hero.description}
            </p>
            <div data-hero-item className="mt-8 flex flex-wrap gap-4">
              <a
                className="btn-primary"
                href={whatsappUrl(business, whatsappMessage)}
                target="_blank"
                rel="noreferrer"
              >
                {messages.home.hero.primaryAction}
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link className="btn-secondary" href={getLocalizedPath(locale, "/book-service")}>
                {messages.home.hero.secondaryAction}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div data-hero-item className="mt-10 grid gap-4 sm:grid-cols-3">
              {heroFacts.map((fact) => {
                return (
                  <article
                    key={fact.title}
                    className="surface-card rounded-[1.5rem] p-5"
                  >
                    <div className="icon-chip h-11 w-11">
                      <AppIcon name={fact.icon} className="h-5 w-5" />
                    </div>
                    <h2 className="font-display mt-4 text-lg font-semibold text-slate-950">
                      {fact.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {fact.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          <aside data-stagger className="flex flex-col gap-6">
            <div data-stagger-item className="visual-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {messages.home.visualCard.eyebrow}
                  </p>
                  <h2 className="font-display mt-3 text-2xl font-semibold text-slate-950">
                    {messages.home.visualCard.title}
                  </h2>
                </div>
                <span className="feature-chip">{messages.home.visualCard.badge}</span>
              </div>
              <div className="mt-6" data-parallax="8">
                <SitePhoto
                  src={sitePhotos.hero.src}
                  alt={sitePhotos.hero.alt}
                  className="aspect-[4/3] rounded-[1.6rem]"
                  imageClassName="object-cover"
                  sizes="(max-width: 1024px) 100vw, 32vw"
                  priority
                />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {messages.home.visualCard.tags.map((tag) => (
                  <span key={tag} className="feature-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div data-stagger-item className="surface-card rounded-[1.8rem] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                {messages.home.directContact.eyebrow}
              </p>
              <h2 className="font-display mt-4 text-2xl font-semibold text-slate-950">
                {messages.home.directContact.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                {messages.home.directContact.copy}
              </p>
              <div className="mt-6 grid gap-3">
                <a
                  className="rounded-[1.3rem] border border-slate-900/10 bg-white px-4 py-4 transition-colors duration-200 hover:border-slate-900/15 hover:bg-slate-50"
                  href={telHref(business.primaryPhoneDisplay)}
                >
                  <div className="flex items-center gap-3">
                    <PhoneCall className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-500">
                        {messages.common.primaryPhone}
                      </p>
                      <p className="font-display mt-1 text-lg font-semibold text-slate-950">
                        {business.primaryPhoneDisplay}
                      </p>
                    </div>
                  </div>
                </a>
                <a
                  className="rounded-[1.3rem] border border-slate-900/10 bg-white px-4 py-4 transition-colors duration-200 hover:border-slate-900/15 hover:bg-slate-50"
                  href={whatsappUrl(business, whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-500">
                        {messages.common.whatsappBooking}
                      </p>
                      <p className="font-display mt-1 text-lg font-semibold text-slate-950">
                        {messages.home.directContact.whatsappValue}
                      </p>
                    </div>
                  </div>
                </a>
                <a
                  className="rounded-[1.3rem] border border-slate-900/10 bg-white px-4 py-4 transition-colors duration-200 hover:border-slate-900/15 hover:bg-slate-50"
                  href={mailtoUrl(business)}
                >
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-500">
                        {messages.common.email}
                      </p>
                      <p className="font-display mt-1 text-lg font-semibold text-slate-950">
                        {business.email}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div data-stagger-item className="surface-card rounded-[1.8rem] p-6">
              <div className="flex items-start gap-3">
                <div className="icon-chip h-11 w-11">
                  <MapPinned className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {messages.home.walkIn.eyebrow}
                  </p>
                  <p className="mt-3 text-base leading-7 text-slate-700">
                    {business.addressLine1}
                    <br />
                    {business.addressLine2}
                  </p>
                </div>
              </div>
              <a
                className="btn-ghost mt-6"
                href={mapSearchUrl(business)}
                target="_blank"
                rel="noreferrer"
              >
                {messages.common.getDirections}
              </a>
              <div className="mt-6 space-y-3 text-sm leading-6 text-slate-600">
                {messages.home.walkIn.checklist.map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="services" className="section-space">
        <div className="section-shell">
          <SectionHeading
            eyebrow={messages.home.services.eyebrow}
            title={messages.home.services.title}
            copy={messages.home.services.copy}
            centered
          />
          <div data-stagger className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div data-reveal="left" className="grid gap-4">
            <SitePhoto
              src={sitePhotos.shopInterior.src}
              alt={sitePhotos.shopInterior.alt}
              className="aspect-[16/11]"
              sizes="(max-width: 1024px) 100vw, 46vw"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <SitePhoto
                src={sitePhotos.shopFront.src}
                alt={sitePhotos.shopFront.alt}
                className="aspect-[4/3] rounded-[1.6rem]"
                sizes="(max-width: 640px) 100vw, 23vw"
              />
              <SitePhoto
                src={sitePhotos.ownerDesk.src}
                alt={sitePhotos.ownerDesk.alt}
                className="aspect-[4/3] rounded-[1.6rem]"
                sizes="(max-width: 640px) 100vw, 23vw"
              />
            </div>
          </div>

          <div data-reveal="right" className="section-highlight p-6 sm:p-8">
            <span className="eyebrow">{messages.home.support.eyebrow}</span>
            <h2 className="font-display mt-5 text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              {messages.home.support.title}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              {messages.home.support.copy}
            </p>
            <div className="mt-8 space-y-4 text-base leading-7 text-slate-600">
              {messages.home.support.bullets.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-slate-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="btn-primary"
                href={whatsappUrl(business, whatsappMessage)}
                target="_blank"
                rel="noreferrer"
              >
                {messages.home.support.primaryAction}
              </a>
              <a
                className="btn-secondary"
                href={mapSearchUrl(business)}
                target="_blank"
                rel="noreferrer"
              >
                {messages.home.support.secondaryAction}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow={messages.home.whyChoose.eyebrow}
              title={messages.home.whyChoose.title}
              copy={messages.home.whyChoose.copy}
            />
          </div>
          <div data-stagger className="grid gap-5 sm:grid-cols-2">
            {credibilityCards.map((card) => {
              return (
                <article
                  key={card.title}
                  data-stagger-item
                  className="surface-card rounded-[1.6rem] p-6"
                >
                  <div className="icon-chip h-12 w-12">
                    <AppIcon name={card.icon} className="h-5 w-5" />
                  </div>
                  <h2 className="font-display mt-5 text-xl font-semibold text-slate-950">
                    {card.title}
                  </h2>
                  <p className="mt-3 text-base leading-7 text-slate-600">
                    {card.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell grid gap-6 xl:grid-cols-[1.03fr_0.97fr]">
          <div className="surface-card rounded-[2rem] p-6 sm:p-8">
            <span className="eyebrow">{messages.home.whoWeHelp.eyebrow}</span>
            <div data-stagger className="mt-6 grid gap-5">
              {customerSegments.map((segment) => {
                return (
                  <article
                    key={segment.title}
                    data-stagger-item
                    className="info-tile px-5 py-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="icon-chip h-11 w-11">
                        <AppIcon name={segment.icon} className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="font-display text-xl font-semibold text-slate-950">
                          {segment.title}
                        </h2>
                        <p className="mt-2 text-base leading-7 text-slate-600">
                          {segment.text}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="surface-card rounded-[2rem] p-6 sm:p-8">
            <span className="eyebrow">{messages.home.howItWorks.eyebrow}</span>
            <h2 className="font-display mt-5 text-3xl font-semibold text-slate-950">
              {messages.home.howItWorks.title}
            </h2>
            <div data-stagger className="mt-8 grid gap-5">
              {supportProcess.map((step, index) => {
                return (
                  <article
                    key={step.title}
                    data-stagger-item
                    className="info-tile px-5 py-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="icon-chip h-12 w-12">
                        <AppIcon name={step.icon} className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                          {messages.home.howItWorks.stepLabel} {index + 1}
                        </p>
                        <h3 className="font-display mt-2 text-xl font-semibold text-slate-950">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-base leading-7 text-slate-600">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow={messages.home.faq.eyebrow}
              title={messages.home.faq.title}
              copy={messages.home.faq.copy}
            />
          </div>
          <FaqList items={faqs} />
        </div>
      </section>

      <CtaBanner
        eyebrow={messages.home.cta.eyebrow}
        title={messages.home.cta.title}
        copy={messages.home.cta.copy}
        primaryAction={{
          label: messages.home.cta.primaryAction,
          href: getLocalizedPath(locale, "/book-service"),
        }}
        secondaryAction={{
          label: messages.home.cta.secondaryAction,
          href: whatsappUrl(business, whatsappMessage),
          variant: "secondary",
          external: true,
        }}
      />
    </>
  );
}
