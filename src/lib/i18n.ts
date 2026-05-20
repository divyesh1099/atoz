import { getMessages } from "next-intl/server";

import { getTypedMessages } from "@/lib/content";

export async function getCurrentMessages() {
  return getTypedMessages(await getMessages());
}
