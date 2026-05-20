import en from "@/messages/en";
import hi from "@/messages/hi";
import mr from "@/messages/mr";
import type { AppLocale } from "@/i18n/routing";

type DeepWiden<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly DeepWiden<U>[]
    : T extends object
      ? { [K in keyof T]: DeepWiden<T[K]> }
      : T;

export type AppMessages = DeepWiden<typeof en>;

const messagesByLocale = {
  en,
  hi,
  mr,
} satisfies Record<AppLocale, AppMessages>;

export async function getMessagesForLocale(locale: AppLocale) {
  return messagesByLocale[locale];
}
