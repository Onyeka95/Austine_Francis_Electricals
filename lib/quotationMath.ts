import { siteConfig } from "@/data/siteConfig";
import { fullAddress } from "@/lib/contactLinks";
import { roundTo2 } from "@/lib/formatNaira";
import type { QuotationData, QuotationTotals, QuoteItem } from "@/types";

/** Keeps only digits and one decimal point, so number boxes accept numbers only. */
export function sanitizeDecimal(raw: string): string {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  const firstDot = cleaned.indexOf(".");
  if (firstDot === -1) return cleaned;
  return (
    cleaned.slice(0, firstDot + 1) +
    cleaned.slice(firstDot + 1).replace(/\./g, "")
  );
}

/** Text to number. Empty, "." or anything invalid becomes 0 (never NaN). */
export function parseAmount(value: string): number {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

/** A short unique id for a table row. */
export function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createEmptyItem(): QuoteItem {
  return { id: createId(), description: "", quantity: "", unitPrice: "" };
}

/** Date as YYYY-MM-DD using the local clock (so the day never shifts by timezone). */
function toIsoDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function todayIso(): string {
  return toIsoDate(new Date());
}

/** "2026-11-18" plus 30 days gives "2026-12-18". */
export function addDays(isoDate: string, days: number): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return toIsoDate(new Date(year, month - 1, day + days));
}

/** Builds "QT-2026-0001" from a sequence number. */
export function formatQuotationNumber(
  sequence: number,
  year: number = new Date().getFullYear()
): string {
  const padded = String(sequence).padStart(4, "0");
  return `${siteConfig.quotation.prefix}-${year}-${padded}`;
}

/** Reads the trailing digits of a number: "QT-2026-0050" gives 50. No digits gives 0. */
export function readSequence(quotationNumber: string): number {
  const match = quotationNumber.match(/(\d+)\s*$/);
  return match ? parseInt(match[1], 10) : 0;
}

/** A fresh quotation filled from siteConfig (letterhead, terms, bank details). */
export function createDefaultQuotation(quotationNumber: string): QuotationData {
  const config = siteConfig.quotation;
  return {
    quotationNumber,
    date: todayIso(),
    validityDays: String(config.validityDays),
    letterhead: {
      businessName: siteConfig.businessName,
      address: fullAddress(),
      phone: siteConfig.phone,
      email: siteConfig.email,
    },
    clientName: "",
    clientAddress: "",
    clientPhone: "",
    projectTitle: "",
    items: [createEmptyItem()],
    labour: "",
    discountType: "amount",
    discountValue: "",
    vatEnabled: false,
    notes: config.defaultNotes,
    terms: config.defaultTerms.join("\n"),
    // Bank details show on the quotation only if they have been filled in siteConfig.
    showBankDetails: Boolean(config.bankDetails.accountNumber),
    bank: { ...config.bankDetails },
    signatoryName: siteConfig.ownerName,
  };
}

/**
 * Works out every money figure (PRD section 9.4).
 * Each step is rounded to 2 decimal places to avoid floating-point errors.
 */
export function calculateTotals(data: QuotationData): QuotationTotals {
  const rowTotals = data.items.map((item) =>
    roundTo2(parseAmount(item.quantity) * parseAmount(item.unitPrice))
  );

  const subtotal = roundTo2(rowTotals.reduce((sum, total) => sum + total, 0));
  const labour = roundTo2(parseAmount(data.labour));
  const beforeDiscount = roundTo2(subtotal + labour);

  const enteredDiscount = parseAmount(data.discountValue);
  const rawDiscount =
    data.discountType === "percent"
      ? roundTo2((beforeDiscount * Math.min(enteredDiscount, 100)) / 100)
      : roundTo2(enteredDiscount);
  // A discount can never be bigger than what is being discounted.
  const discount = Math.min(rawDiscount, beforeDiscount);

  const taxable = roundTo2(beforeDiscount - discount);
  const vat = data.vatEnabled
    ? roundTo2(taxable * siteConfig.quotation.vatRate)
    : 0;
  const grandTotal = roundTo2(taxable + vat);

  return { rowTotals, subtotal, labour, discount, vat, grandTotal };
}