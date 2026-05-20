"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  localeMeta,
  type AppLocale,
  switchLocaleInPath,
} from "@/i18n/routing";
import { cn } from "@/lib/site";

type LanguageSwitcherProps = {
  locale: AppLocale;
  label: string;
  variant?: "default" | "subtle";
};

export function LanguageSwitcher({
  locale,
  label,
  variant = "default",
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <div className={cn("flex items-center gap-2", variant === "subtle" && "gap-2")}>
      <span
        className={cn(
          "hidden text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 xl:inline",
          variant === "subtle" && "sr-only",
        )}
      >
        {label}
      </span>
      <div
        className={cn(
          "flex items-center gap-1 rounded-full border border-slate-900/10 bg-slate-50 p-1",
          variant === "subtle" &&
            "rounded-none border-0 bg-transparent p-0 text-slate-400",
        )}
      >
        {Object.entries(localeMeta).map(([key, value]) => {
          const nextLocale = key as AppLocale;
          const href = switchLocaleInPath(pathname, nextLocale);
          const isActive = locale === nextLocale;

          return (
            <Link
              key={nextLocale}
              href={href}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                variant === "default" &&
                  (isActive
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-600 hover:text-slate-950"),
                variant === "subtle" &&
                  (isActive
                    ? "bg-transparent px-1.5 py-0.5 text-[0.68rem] tracking-[0.22em] text-slate-950"
                    : "bg-transparent px-1.5 py-0.5 text-[0.68rem] tracking-[0.22em] text-slate-400 hover:text-slate-700"),
              )}
              aria-label={value.label}
              aria-current={isActive ? "page" : undefined}
            >
              {variant === "subtle" ? nextLocale.toUpperCase() : value.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
