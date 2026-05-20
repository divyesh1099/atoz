import { Suspense } from "react";
import { CheckCircle2, Mail, MessageCircle, PhoneCall } from "lucide-react";
import { notFound } from "next/navigation";

import { BookingForm } from "@/components/booking-form";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { JsonLd } from "@/components/json-ld";
import { SitePhoto } from "@/components/site-photo";
import { getDefaultWhatsAppMessage, getLocalizedServices } from "@/lib/content";
import { getCurrentMessages } from "@/lib/i18n";
import { sitePhotos } from "@/lib/media";
import { createMetadata, getBreadcrumbSchema } from "@/lib/seo";
import { getLocalizedPath, isAppLocale } from "@/i18n/routing";
import { mailtoUrl, telHref, whatsappUrl } from "@/lib/site";
import { getBusinessSettings } from "@/lib/settings-store";
import { getMessagesForLocale } from "@/messages";

type BookServicePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: BookServicePageProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    return {};
  }

  const business = await getBusinessSettings();
  const messages = await getMessagesForLocale(locale);

  return createMetadata({
    business,
    locale,
    title: messages.bookingPage.meta.title,
    description: messages.bookingPage.meta.description,
    path: "/book-service",
    keywords: [...messages.site.localKeywords],
    imageAlt: messages.metadata.socialAlt,
  });
}

export default async function BookServicePage({ params }: BookServicePageProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  const business = await getBusinessSettings();
  const messages = await getCurrentMessages();
  const services = getLocalizedServices(messages);
  const whatsappMessage = getDefaultWhatsAppMessage(business, locale);

  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema(locale, [
          { name: messages.breadcrumbs.home, path: "/" },
          { name: messages.breadcrumbs.bookService, path: "/book-service" },
        ])}
      />

      <section className="section-shell pt-10 pb-14 lg:pt-14">
        <Breadcrumbs
          items={[
            { label: messages.breadcrumbs.home, href: getLocalizedPath(locale, "/") },
            { label: messages.breadcrumbs.bookService },
          ]}
        />
        <div
          data-hero-sequence
          className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]"
        >
          <div data-hero-item>
            <span className="eyebrow">{messages.bookingPage.hero.eyebrow}</span>
            <h1 className="font-display mt-5 text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {messages.bookingPage.hero.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {messages.bookingPage.hero.copy}
            </p>
            <div data-hero-item className="mt-8">
              <Suspense
                fallback={
                  <div className="surface-card rounded-[2rem] p-6 sm:p-8">
                    <h2 className="font-display text-2xl font-semibold text-slate-950">
                      {messages.bookingPage.loading.title}
                    </h2>
                    <p className="mt-3 text-base leading-7 text-slate-600">
                      {messages.bookingPage.loading.copy}
                    </p>
                  </div>
                }
              >
                <BookingForm
                  business={business}
                  services={services}
                  copy={{
                    title: messages.bookingForm.title,
                    description: messages.bookingForm.copy,
                    requiredError: messages.bookingForm.requiredError,
                    fields: { ...messages.bookingForm.fields },
                    placeholders: { ...messages.bookingForm.placeholders },
                    contactMethods: { ...messages.bookingForm.contactMethods },
                    actions: { ...messages.bookingForm.actions },
                    selectedService: { ...messages.bookingForm.selectedService },
                    nextStep: { ...messages.bookingForm.nextStep },
                    messageTemplate: { ...messages.bookingForm.messageTemplate },
                  }}
                />
              </Suspense>
            </div>
          </div>

          <aside data-stagger className="space-y-6">
            <div data-stagger-item className="surface-card rounded-[1.8rem] p-4">
              <SitePhoto
                src={sitePhotos.ownerDesk.src}
                alt={sitePhotos.ownerDesk.alt}
                className="aspect-[16/11] rounded-[1.4rem]"
                sizes="(max-width: 1024px) 100vw, 28vw"
              />
            </div>

            <div data-stagger-item className="surface-card rounded-[1.8rem] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                {messages.bookingPage.beforeSubmitting.eyebrow}
              </p>
              <div className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                {messages.bookingPage.beforeSubmitting.items.map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div data-stagger-item className="surface-card rounded-[1.8rem] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                {messages.bookingPage.directContact.eyebrow}
              </p>
              <div className="mt-5 grid gap-3">
                <a
                  className="btn-secondary justify-start"
                  href={telHref(business.primaryPhoneDisplay)}
                >
                  <PhoneCall className="h-4 w-4" />
                  {messages.bookingPage.directContact.phonePrefix}{" "}
                  {business.primaryPhoneDisplay}
                </a>
                <a
                  className="btn-primary justify-start"
                  href={whatsappUrl(business, whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  {messages.bookingPage.directContact.whatsapp}
                </a>
                <a className="btn-ghost justify-start" href={mailtoUrl(business)}>
                  <Mail className="h-4 w-4" />
                  {messages.bookingPage.directContact.email}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <CtaBanner
        eyebrow={messages.bookingPage.cta.eyebrow}
        title={messages.bookingPage.cta.title}
        copy={messages.bookingPage.cta.copy}
        primaryAction={{
          label: messages.bookingPage.cta.primaryAction,
          href: whatsappUrl(business, whatsappMessage),
          external: true,
        }}
        secondaryAction={{
          label: messages.bookingPage.cta.secondaryAction,
          href: getLocalizedPath(locale, "/services"),
          variant: "secondary",
        }}
      />
    </>
  );
}
