import Link from "next/link";
import { CalendarDays, MessageCircle, PhoneCall } from "lucide-react";

import type { BusinessInfo } from "@/content/site";
import type { AppLocale } from "@/i18n/routing";
import { getLocalizedPath } from "@/i18n/routing";
import { telHref, whatsappUrl } from "@/lib/site";

type QuickActionsProps = {
  business: BusinessInfo;
  locale: AppLocale;
  callLabel: string;
  whatsappLabel: string;
  bookLabel: string;
  whatsappOwnerPrefix: string;
  whatsappMessage?: string;
};

export function QuickActions({
  business,
  locale,
  callLabel,
  whatsappLabel,
  bookLabel,
  whatsappOwnerPrefix,
  whatsappMessage,
}: QuickActionsProps) {
  return (
    <>
      <a
        className="btn-primary fixed bottom-6 right-6 z-40 hidden lg:inline-flex"
        href={whatsappUrl(business, whatsappMessage)}
        target="_blank"
        rel="noreferrer"
      >
        <MessageCircle className="h-4 w-4" />
        {whatsappOwnerPrefix} {business.owner}
      </a>

      <div className="fixed inset-x-4 bottom-4 z-40 lg:hidden">
        <div className="surface-card grid grid-cols-3 gap-2 rounded-[1.4rem] p-2">
          <a
            className="flex min-h-14 items-center justify-center gap-2 rounded-[1rem] border border-slate-900/10 bg-white px-3 text-sm font-semibold text-slate-900"
            href={telHref(business.primaryPhoneDisplay)}
          >
            <PhoneCall className="h-4 w-4" />
            {callLabel}
          </a>
          <a
            className="flex min-h-14 items-center justify-center gap-2 rounded-[1rem] bg-slate-950 px-3 text-sm font-semibold text-white"
            href={whatsappUrl(business, whatsappMessage)}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle className="h-4 w-4" />
            {whatsappLabel}
          </a>
          <Link
            className="flex min-h-14 items-center justify-center gap-2 rounded-[1rem] border border-slate-900/10 bg-white px-3 text-sm font-semibold text-slate-900"
            href={getLocalizedPath(locale, "/book-service")}
          >
            <CalendarDays className="h-4 w-4" />
            {bookLabel}
          </Link>
        </div>
      </div>
    </>
  );
}
