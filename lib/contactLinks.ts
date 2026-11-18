import { siteConfig } from "@/data/siteConfig";

/** Click-to-call link, e.g. tel:+2348149589933 */
export function telLink(): string {
  return `tel:${siteConfig.phoneInternational}`;
}

/** Click-to-email link */
export function mailLink(): string {
  return `mailto:${siteConfig.email}`;
}

/** One-line address for display */
export function fullAddress(): string {
  const { street, city, state, country } = siteConfig.address;
  return `${street}, ${city}, ${state}, ${country}`;
}