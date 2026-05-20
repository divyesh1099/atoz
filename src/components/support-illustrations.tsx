import { cn } from "@/lib/site";

type IllustrationProps = {
  className?: string;
};

export function HeroSupportIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 640 480"
      className={cn("h-auto w-full", className)}
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id="hero-screen" x1="160" y1="140" x2="360" y2="280">
          <stop stopColor="#E0F2FE" />
          <stop offset="0.48" stopColor="#BFDBFE" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
        <linearGradient id="hero-laptop" x1="210" y1="250" x2="410" y2="360">
          <stop stopColor="#F8FAFC" />
          <stop offset="1" stopColor="#E2E8F0" />
        </linearGradient>
        <linearGradient id="hero-card" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F59E0B" stopOpacity="0.18" />
          <stop offset="1" stopColor="#2563EB" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      <rect x="92" y="80" width="456" height="320" rx="40" fill="url(#hero-card)" />

      <g data-float>
        <circle cx="136" cy="116" r="18" fill="#60A5FA" fillOpacity="0.3" />
      </g>
      <g data-float>
        <circle cx="500" cy="130" r="24" fill="#FBBF24" fillOpacity="0.26" />
      </g>
      <g data-float>
        <circle cx="518" cy="340" r="16" fill="#38BDF8" fillOpacity="0.22" />
      </g>

      <g>
        <rect x="128" y="126" width="248" height="162" rx="26" fill="#0F172A" />
        <rect x="142" y="140" width="220" height="132" rx="18" fill="url(#hero-screen)" />
        <rect x="224" y="290" width="56" height="18" rx="9" fill="#94A3B8" />
        <rect x="196" y="306" width="112" height="12" rx="6" fill="#CBD5E1" />
      </g>

      <g>
        <path
          d="M228 302H392C402.5 302 411.1 309.4 412.9 319.7L419 354H201L207.1 319.7C208.9 309.4 217.5 302 228 302Z"
          fill="url(#hero-laptop)"
        />
        <path d="M254 316H366L370 338H250L254 316Z" fill="#DDE7F3" />
        <rect x="274" y="342" width="72" height="6" rx="3" fill="#94A3B8" />
      </g>

      <g>
        <rect x="420" y="162" width="108" height="96" rx="24" fill="#F8FAFC" />
        <rect x="438" y="180" width="72" height="46" rx="10" fill="#E0F2FE" />
        <rect x="434" y="232" width="80" height="12" rx="6" fill="#CBD5E1" />
        <rect x="452" y="246" width="44" height="8" rx="4" fill="#94A3B8" />
      </g>

      <g data-float>
        <rect x="106" y="330" width="118" height="50" rx="18" fill="#FFFFFF" fillOpacity="0.88" />
        <circle cx="136" cy="355" r="11" fill="#2563EB" fillOpacity="0.18" />
        <path d="M132 355L135 358L141 351" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="156" y="345" width="50" height="8" rx="4" fill="#334155" fillOpacity="0.8" />
        <rect x="156" y="359" width="36" height="6" rx="3" fill="#64748B" fillOpacity="0.7" />
      </g>

      <g data-float>
        <rect x="392" y="92" width="132" height="54" rx="18" fill="#FFFFFF" fillOpacity="0.88" />
        <rect x="414" y="110" width="42" height="8" rx="4" fill="#0F172A" fillOpacity="0.82" />
        <rect x="414" y="124" width="88" height="6" rx="3" fill="#64748B" fillOpacity="0.65" />
        <circle cx="482" cy="107" r="8" fill="#F59E0B" fillOpacity="0.26" />
      </g>

      <g data-float>
        <rect x="436" y="286" width="88" height="58" rx="18" fill="#FFFFFF" fillOpacity="0.88" />
        <rect x="454" y="304" width="50" height="8" rx="4" fill="#0F172A" fillOpacity="0.82" />
        <rect x="448" y="320" width="62" height="6" rx="3" fill="#64748B" fillOpacity="0.65" />
      </g>
    </svg>
  );
}

export function ServiceVisitIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 640 480"
      className={cn("h-auto w-full", className)}
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id="visit-card" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#2563EB" stopOpacity="0.16" />
          <stop offset="1" stopColor="#F59E0B" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="visit-screen" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#DBEAFE" />
          <stop offset="1" stopColor="#E0F2FE" />
        </linearGradient>
      </defs>

      <rect x="88" y="84" width="464" height="312" rx="42" fill="url(#visit-card)" />

      <g data-float>
        <circle cx="144" cy="128" r="18" fill="#60A5FA" fillOpacity="0.28" />
      </g>
      <g data-float>
        <circle cx="512" cy="120" r="22" fill="#FBBF24" fillOpacity="0.22" />
      </g>

      <g>
        <rect x="122" y="168" width="174" height="154" rx="28" fill="#FFFFFF" fillOpacity="0.9" />
        <rect x="138" y="184" width="142" height="24" rx="12" fill="#0F172A" />
        <path d="M138 208H280V228C280 236.837 272.837 244 264 244H154C145.163 244 138 236.837 138 228V208Z" fill="#F97316" fillOpacity="0.16" />
        <rect x="156" y="252" width="104" height="52" rx="16" fill="url(#visit-screen)" />
        <rect x="170" y="266" width="74" height="8" rx="4" fill="#1E3A8A" fillOpacity="0.82" />
        <rect x="170" y="282" width="54" height="6" rx="3" fill="#64748B" fillOpacity="0.72" />
      </g>

      <g>
        <rect x="326" y="130" width="196" height="240" rx="34" fill="#FFFFFF" fillOpacity="0.92" />
        <rect x="358" y="160" width="132" height="182" rx="30" fill="#E2E8F0" />
        <rect x="370" y="174" width="108" height="154" rx="22" fill="url(#visit-screen)" />
        <rect x="392" y="192" width="64" height="8" rx="4" fill="#1E3A8A" fillOpacity="0.86" />
        <rect x="392" y="208" width="48" height="6" rx="3" fill="#475569" fillOpacity="0.72" />
        <path
          d="M424 254C424 279.9 390 302.5 390 302.5C390 302.5 356 279.9 356 254C356 234.118 371.118 220 390 220C408.882 220 424 234.118 424 254Z"
          fill="#2563EB"
          fillOpacity="0.18"
        />
        <circle cx="390" cy="254" r="14" fill="#2563EB" fillOpacity="0.42" />
      </g>

      <g data-float>
        <rect x="118" y="104" width="124" height="44" rx="16" fill="#FFFFFF" fillOpacity="0.88" />
        <rect x="140" y="120" width="58" height="8" rx="4" fill="#0F172A" fillOpacity="0.82" />
        <rect x="140" y="134" width="82" height="6" rx="3" fill="#64748B" fillOpacity="0.68" />
      </g>

      <g data-float>
        <rect x="430" y="348" width="106" height="40" rx="16" fill="#FFFFFF" fillOpacity="0.88" />
        <circle cx="454" cy="368" r="8" fill="#F59E0B" fillOpacity="0.28" />
        <rect x="472" y="362" width="42" height="6" rx="3" fill="#0F172A" fillOpacity="0.82" />
        <rect x="472" y="374" width="28" height="5" rx="2.5" fill="#64748B" fillOpacity="0.66" />
      </g>
    </svg>
  );
}
