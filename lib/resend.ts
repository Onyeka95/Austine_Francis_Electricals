import { Resend } from "resend";
import { siteConfig } from "@/data/siteConfig";

export interface EmailSettings {
  client: Resend;
  to: string; // the inbox that receives requests (CONTACT_TO_EMAIL)
  from: string; // shown as the sender, e.g. Austine Francis Electricals Website <quotes@domain.com>
}

/** Reads the email settings from .env.local. Returns null if anything is missing. */
export function getEmailSettings(): EmailSettings | null {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) return null;

  return {
    client: new Resend(apiKey),
    to,
    from: `${siteConfig.businessName} Website <${from}>`,
  };
}