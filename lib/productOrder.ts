import { siteConfig } from "@/data/siteConfig";
import { formatNaira } from "@/lib/formatNaira";
import { whatsappLink } from "@/lib/whatsappLink";
import type { Product } from "@/types";

/** Shows a product price. A null price becomes "Call for price" (PR-1). */
export function formatProductPrice(price: number | null): string {
  if (price === null) return "Call for price";
  return formatNaira(price);
}

/** "Order on WhatsApp" link with the product name and price pre-filled (PR-2). */
export function productOrderLink(product: Product): string {
  const priceText =
    product.price === null
      ? "price to be confirmed"
      : formatProductPrice(product.price);

  const message =
    `Hello ${siteConfig.businessName}, I would like to order:\n` +
    `Product: ${product.name}\n` +
    `Price: ${priceText}\n` +
    `Please confirm availability.`;

  return whatsappLink(message);
}

/** General enquiry link, for "I can't find what I need". Uses the default greeting. */
export function productEnquiryLink(): string {
  return whatsappLink();
}