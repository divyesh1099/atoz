import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import { SitePhoto } from "@/components/site-photo";
import type { Service } from "@/content/services";
import type { AppLocale } from "@/i18n/routing";
import { getLocalizedPath } from "@/i18n/routing";
import { AppIcon } from "@/lib/icons";
import { getServicePhoto } from "@/lib/media";
import { getServiceBookingUrl } from "@/lib/site";

type ServiceCardProps = {
  service: Service;
  locale: AppLocale;
  detailsLabel: string;
  bookLabel: string;
  showBookLink?: boolean;
};

export function ServiceCard({
  service,
  locale,
  detailsLabel,
  bookLabel,
  showBookLink = true,
}: ServiceCardProps) {
  const servicePhoto = getServicePhoto(service.slug);

  return (
    <article
      data-stagger-item
      className="group surface-card rounded-[1.75rem] p-6 transition-colors duration-200 hover:border-slate-900/15 hover:bg-slate-50/60 sm:p-7"
    >
      <SitePhoto
        src={servicePhoto.src}
        alt={servicePhoto.alt}
        className="mb-6 aspect-[16/10] rounded-[1.4rem]"
        imageClassName="transition-transform duration-500 group-hover:scale-[1.02]"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      />
      <div className="flex items-start justify-between gap-4">
        <div className="icon-chip h-14 w-14 rounded-[1.25rem]">
          <AppIcon name={service.icon} className="h-6 w-6" />
        </div>
        <span className="rounded-full border border-slate-900/8 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
          {service.shortLabel}
        </span>
      </div>
      <h3 className="font-display mt-6 text-2xl font-semibold text-slate-950">
        {service.title}
      </h3>
      <p className="mt-3 text-base leading-7 text-slate-600">
        {service.summary}
      </p>
      <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
        {service.issues.slice(0, 3).map((issue) => (
          <li key={issue} className="flex gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
            <span>{issue}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={getLocalizedPath(locale, `/services/${service.slug}`)}
          className="btn-secondary"
        >
          {detailsLabel}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
        {showBookLink ? (
          <Link
            href={getServiceBookingUrl(locale, service.slug)}
            className="btn-ghost"
          >
            {bookLabel}
          </Link>
        ) : null}
      </div>
    </article>
  );
}
