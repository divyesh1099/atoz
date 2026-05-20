import Link from "next/link";

import { getLocale } from "next-intl/server";

import { getCurrentMessages } from "@/lib/i18n";

export default async function LocalizedNotFound() {
  const locale = await getLocale();
  const messages = await getCurrentMessages();

  return (
    <section className="section-shell section-space">
      <div className="hero-panel px-6 py-10 text-center sm:px-8 lg:px-10">
        <span className="eyebrow">{messages.notFound.eyebrow}</span>
        <h1 className="font-display mt-6 text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          {messages.notFound.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          {messages.notFound.copy}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link className="btn-primary" href={`/${locale}/services`}>
            {messages.notFound.services}
          </Link>
          <Link className="btn-secondary" href={`/${locale}/book-service`}>
            {messages.notFound.booking}
          </Link>
          <Link className="btn-ghost" href={`/${locale}/contact`}>
            {messages.notFound.contact}
          </Link>
        </div>
      </div>
    </section>
  );
}
