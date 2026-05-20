import { ChevronDown } from "lucide-react";

import type { FaqItem } from "@/content/site";

type FaqListProps = {
  items: FaqItem[];
};

export function FaqList({ items }: FaqListProps) {
  return (
    <div data-stagger className="grid gap-4">
      {items.map((item) => (
        <details
          key={item.question}
          data-stagger-item
          className="surface-card group rounded-[1.5rem] p-1"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[1.25rem] px-5 py-5 text-left">
            <span className="font-display text-lg font-semibold text-slate-950">
              {item.question}
            </span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition group-open:bg-slate-900 group-open:text-white">
              <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
            </span>
          </summary>
          <div className="px-5 pb-5 pt-1 text-base leading-7 text-slate-600">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
