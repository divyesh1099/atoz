"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let gsapRegistered = false;

if (!gsapRegistered) {
  gsap.registerPlugin(ScrollTrigger);
  gsapRegistered = true;
}

const revealPresets = {
  up: { y: 28 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
  zoom: { y: 20, scale: 0.96 },
} as const;

export function MotionProvider() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const matchMedia = gsap.matchMedia();

    matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const heroGroups = gsap.utils.toArray<HTMLElement>("[data-hero-sequence]");

        heroGroups.forEach((group) => {
          const items = group.querySelectorAll<HTMLElement>("[data-hero-item]");

          if (!items.length) {
            return;
          }

          gsap.from(items, {
            autoAlpha: 0,
            y: 28,
            duration: 0.82,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "opacity,visibility,transform",
          });
        });

        const staggerGroups = gsap.utils.toArray<HTMLElement>("[data-stagger]");

        staggerGroups.forEach((group) => {
          const items = group.querySelectorAll<HTMLElement>("[data-stagger-item]");

          if (!items.length) {
            return;
          }

          gsap.from(items, {
            autoAlpha: 0,
            y: 26,
            duration: 0.75,
            stagger: 0.09,
            ease: "power2.out",
            clearProps: "opacity,visibility,transform",
            scrollTrigger: {
              trigger: group,
              start: "top 82%",
              once: true,
            },
          });
        });

        const revealTargets = gsap.utils.toArray<HTMLElement>("[data-reveal]");

        revealTargets.forEach((element) => {
          const preset =
            revealPresets[element.dataset.reveal as keyof typeof revealPresets] ||
            revealPresets.up;

          gsap.from(element, {
            autoAlpha: 0,
            duration: 0.86,
            ease: "power2.out",
            clearProps: "opacity,visibility,transform",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
            },
            ...preset,
          });
        });

        const parallaxTargets = gsap.utils.toArray<HTMLElement>("[data-parallax]");

        parallaxTargets.forEach((element) => {
          const amount = Number(element.dataset.parallax ?? 12);

          gsap.to(element, {
            yPercent: amount * -1,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });

        const floatTargets = gsap.utils.toArray<HTMLElement | SVGElement>("[data-float]");

        floatTargets.forEach((element, index) => {
          gsap.to(element, {
            x: index % 2 === 0 ? 5 : -5,
            y: index % 2 === 0 ? -10 : 10,
            rotation: index % 2 === 0 ? 1.2 : -1.2,
            transformOrigin: "50% 50%",
            duration: 3.4 + (index % 3) * 0.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });

        ScrollTrigger.refresh();
      }, document.body);

      return () => context.revert();
    });

    return () => matchMedia.revert();
  }, [pathname]);

  return null;
}
