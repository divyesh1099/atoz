import { cn } from "@/lib/site";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy: string;
  centered?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  copy,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div
      data-reveal="up"
      className={cn(
        "max-w-3xl",
        centered && "mx-auto text-center",
      )}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="font-display mt-5 text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.85rem]">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-slate-600">{copy}</p>
    </div>
  );
}
