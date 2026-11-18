import { siteConfig } from "@/data/siteConfig";

/** Builds a WhatsApp chat link with a pre-filled message. */
export function whatsappLink(message: string = siteConfig.whatsappGreeting): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}