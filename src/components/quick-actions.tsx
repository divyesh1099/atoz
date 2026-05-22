import Link from "next/link";
import { CalendarDays, MessageCircle, PhoneCall } from "lucide-react";

import type { BusinessInfo } from "@/content/site";
import type { AppLocale } from "@/i18n/routing";
import { getLocalizedPath } from "@/i18n/routing";
import { cn } from "@/lib/site";
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
  const mobileActionClass =
    "flex min-h-14 items-center justify-center gap-2 rounded-[1rem] px-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300";

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
            className={cn(
              mobileActionClass,
              "border border-slate-900/10 bg-white text-slate-900 shadow-sm hover:bg-slate-50 active:bg-slate-100 active:text-slate-950",
            )}
            href={telHref(business.primaryPhoneDisplay)}
          >
            <PhoneCall className="h-4 w-4 shrink-0" />
            {callLabel}
          </a>
          <a
            className={cn(
              mobileActionClass,
              "border border-emerald-600 bg-emerald-500 text-white shadow-sm hover:border-emerald-600 hover:bg-emerald-600 active:border-emerald-700 active:bg-emerald-700 active:text-white visited:text-white",
            )}
            href={whatsappUrl(business, whatsappMessage)}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle className="h-4 w-4 shrink-0" />
            {whatsappLabel}
          </a>
          <Link
            className={cn(
              mobileActionClass,
              "border border-slate-900/10 bg-white text-slate-900 shadow-sm hover:bg-slate-50 active:bg-slate-100 active:text-slate-950",
            )}
            href={getLocalizedPath(locale, "/book-service")}
          >
            <CalendarDays className="h-4 w-4 shrink-0" />
            {bookLabel}
          </Link>
        </div>
      </div>
    </>
  );
}
