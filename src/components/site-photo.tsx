import Image from "next/image";

import { cn } from "@/lib/site";

type SitePhotoProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
};

export function SitePhoto({
  src,
  alt,
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: SitePhotoProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.8rem] border border-slate-900/8 bg-slate-100 shadow-[0_18px_44px_rgba(15,23,42,0.08)]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
