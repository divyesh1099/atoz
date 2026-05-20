import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/site";

type Action = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
};

type CtaBannerProps = {
  eyebrow: string;
  title: string;
  copy: string;
  primaryAction: Action;
  secondaryAction?: Action;
};

function ActionLink({ action }: { action: Action }) {
  const className = cn(
    action.variant === "secondary" ? "btn-secondary" : "btn-primary",
    "min-w-[12rem]",
  );

  if (action.external) {
    return (
      <a
        className={className}
        href={action.href}
        target="_blank"
        rel="noreferrer"
      >
        {action.label}
        <ArrowRight className="h-4 w-4" />
      </a>
    );
  }

  return (
    <Link className={className} href={action.href}>
      {action.label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

export function CtaBanner({
  eyebrow,
  title,
  copy,
  primaryAction,
  secondaryAction,
}: CtaBannerProps) {
  return (
    <section className="section-space">
      <div className="section-shell">
        <div
          data-reveal="up"
          className="hero-panel px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-10"
        >
          <span className="eyebrow">{eyebrow}</span>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="font-display text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.9rem]">
                {title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">{copy}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ActionLink action={primaryAction} />
              {secondaryAction ? <ActionLink action={secondaryAction} /> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
