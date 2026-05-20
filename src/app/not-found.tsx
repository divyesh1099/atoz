import type { Metadata } from "next";
import Link from "next/link";

import { defaultBusiness } from "@/content/site";
import { absoluteUrl, getSiteUrl } from "@/lib/site";

const title = `Page not found | ${defaultBusiness.name}`;
const description = "The page you are looking for could not be found.";
const image = absoluteUrl("/opengraph-image");

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title,
  description,
  openGraph: {
    title,
    description,
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: `${defaultBusiness.name} social preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
};

export default function RootNotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-start justify-center px-6 py-20 sm:px-8">
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
        404
      </span>
      <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
        This page does not exist.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
        The link may be outdated, or the page may have moved. Head back to the
        main site to continue.
      </p>
      <Link
        href="/en"
        className="mt-8 inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Go to home
      </Link>
    </main>
  );
}
