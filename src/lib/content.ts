import type { AppLocale } from "@/i18n/routing";
import type { Service } from "@/content/services";
import { serviceCatalog } from "@/content/services";
import type {
  BusinessInfo,
  ContentCard,
  FaqItem,
  NavigationItem,
} from "@/content/site";
import type { IconName } from "@/lib/icons";
import type { AppMessages } from "@/messages";

type MessageCard = {
  icon: string;
  title: string;
  text: string;
};

export function getTypedMessages(messages: unknown) {
  return messages as AppMessages;
}

function mapCards(cards: readonly MessageCard[]): ContentCard[] {
  return cards.map((card) => ({
    icon: card.icon as IconName,
    title: card.title,
    text: card.text,
  }));
}

export function getNavigation(
  messages: AppMessages,
  locale: AppLocale,
): NavigationItem[] {
  return [
    {
      label: messages.navigation.home,
      href: `/${locale}`,
    },
    {
      label: messages.navigation.services,
      href: `/${locale}/services`,
    },
    {
      label: messages.navigation.bookService,
      href: `/${locale}/book-service`,
    },
    {
      label: messages.navigation.contact,
      href: `/${locale}/contact`,
    },
  ];
}

export function getLocalizedServices(messages: AppMessages): Service[] {
  return serviceCatalog.map((catalogService) => {
    const copy = messages.services.items[catalogService.slug];

    return {
      slug: catalogService.slug,
      icon: catalogService.icon,
      shortLabel: copy.shortLabel,
      title: copy.title,
      summary: copy.summary,
      metaDescription: copy.metaDescription,
      issues: [...copy.issues],
      includes: [...copy.includes],
      bestFor: [...copy.bestFor],
      keywords: [...copy.keywords],
    };
  });
}

export function getLocalizedService(
  messages: AppMessages,
  slug: string,
): Service | undefined {
  return getLocalizedServices(messages).find((service) => service.slug === slug);
}

export function getLocalizedFaqs(messages: AppMessages): FaqItem[] {
  return messages.site.faqs.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));
}

export function getLocalizedCards(
  messages: AppMessages,
  key:
    | "heroFacts"
    | "credibilityCards"
    | "customerSegments"
    | "supportProcess",
) {
  return mapCards(messages.site[key] as readonly MessageCard[]);
}

export function getDefaultWhatsAppMessage(
  business: Pick<BusinessInfo, "name">,
  locale: AppLocale,
) {
  switch (locale) {
    case "hi":
      return `नमस्ते ${business.name}, मुझे कंप्यूटर सर्विस सहायता चाहिए।`;
    case "mr":
      return `नमस्कार ${business.name}, मला कॉम्प्युटर सर्विस मदत हवी आहे.`;
    default:
      return `Hello ${business.name}, I need computer service support.`;
  }
}

export function getServiceInquiryMessage(
  business: Pick<BusinessInfo, "name">,
  serviceTitle: string,
  locale: AppLocale,
) {
  switch (locale) {
    case "hi":
      return `नमस्ते ${business.name}, मुझे ${serviceTitle} के लिए सहायता चाहिए।`;
    case "mr":
      return `नमस्कार ${business.name}, मला ${serviceTitle} साठी मदत हवी आहे.`;
    default:
      return `Hello ${business.name}, I need help with ${serviceTitle}.`;
  }
}

export function getServiceAreaLabel(locale: AppLocale) {
  switch (locale) {
    case "hi":
      return "वाशी और आसपास के नवी मुंबई ग्राहक";
    case "mr":
      return "वाशी आणि जवळचे नवी मुंबई ग्राहक";
    default:
      return "Vashi and nearby Navi Mumbai customers";
  }
}
