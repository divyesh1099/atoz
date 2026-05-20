"use client";

import Link from "next/link";
import { Menu, MessageCircle, PhoneCall, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

import type { BusinessInfo, NavigationItem } from "@/content/site";
import { cn, telHref, whatsappUrl } from "@/lib/site";

type SiteHeaderProps = {
  business: BusinessInfo;
  navigation: NavigationItem[];
  homeHref: string;
  tagline: string;
  callNowLabel: string;
  callLabel: string;
  whatsappLabel: string;
  toggleMenuLabel: string;
  whatsappMessage?: string;
};

export function SiteHeader({
  business,
  navigation,
  homeHref,
  tagline,
  callNowLabel,
  callLabel,
  whatsappLabel,
  toggleMenuLabel,
  whatsappMessage,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-900/8 bg-white/90 backdrop-blur-md">
      <div className="section-shell flex items-center justify-between gap-6 py-4">
        <Link href={homeHref} className="min-w-0" onClick={() => setIsOpen(false)}>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-900/10 bg-slate-50 text-sm font-black tracking-[0.24em] text-slate-950">
              AZ
            </div>
            <div className="min-w-0">
              <p className="font-display truncate text-lg font-semibold text-slate-950">
                {business.name}
              </p>
              <p className="truncate text-sm text-slate-500">
                {tagline}
              </p>
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  isActive
                    ? "bg-slate-100 text-slate-950"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a className="btn-ghost" href={telHref(business.primaryPhoneDisplay)}>
            <PhoneCall className="h-4 w-4" />
            {callNowLabel}
          </a>
          <a
            className="btn-primary"
            href={whatsappUrl(business, whatsappMessage)}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle className="h-4 w-4" />
            {whatsappLabel}
          </a>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-900/10 bg-white text-slate-900 lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          aria-label={toggleMenuLabel}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="section-shell pb-4 lg:hidden">
          <div className="surface-card rounded-3xl p-4">
            <nav className="grid gap-2">
              {navigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(`${item.href}/`));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-base font-semibold transition",
                      isActive
                        ? "bg-slate-100 text-slate-950"
                        : "bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-950",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a className="btn-secondary" href={telHref(business.primaryPhoneDisplay)}>
                <PhoneCall className="h-4 w-4" />
                {callLabel}
              </a>
              <a
                className="btn-primary"
                href={whatsappUrl(business, whatsappMessage)}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                {whatsappLabel}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
