import {
  createDefaultQuotation,
  createId,
  formatQuotationNumber,
  readSequence,
} from "@/lib/quotationMath";
import type { QuotationData, QuoteItem } from "@/types";

// Where the draft and the number counter are kept in the browser.
const DRAFT_KEY = "af-quotation-draft";
const COUNTER_KEY = "af-quotation-counter";

function readText(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/** Makes sure saved data has every field, even if it was saved by an older version. */
function normaliseDraft(raw: unknown): QuotationData | null {
  if (typeof raw !== "object" || raw === null) return null;

  const saved = raw as Partial<QuotationData>;
  const base = createDefaultQuotation(readText(saved.quotationNumber));

  const items: QuoteItem[] =
    Array.isArray(saved.items) && saved.items.length > 0
      ? (saved.items as Partial<QuoteItem>[]).map((item) => ({
          id: readText(item?.id) || createId(),
          description: readText(item?.description),
          quantity: readText(item?.quantity),
          unitPrice: readText(item?.unitPrice),
        }))
      : base.items;

  return {
    ...base,
    ...saved,
    letterhead: { ...base.letterhead, ...saved.letterhead },
    bank: { ...base.bank, ...saved.bank },
    items,
    discountType: saved.discountType === "percent" ? "percent" : "amount",
  };
}

/** The saved draft, or null if there is none. */
export function loadDraft(): QuotationData | null {
  try {
    const text = window.localStorage.getItem(DRAFT_KEY);
    if (!text) return null;
    return normaliseDraft(JSON.parse(text));
  } catch {
    return null; // storage blocked or the saved data was damaged
  }
}

/** Saves the draft. Fails quietly if the browser blocks storage. */
export function saveDraft(data: QuotationData): void {
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  } catch {
    // Storage is full or blocked (for example private browsing). Nothing else we can do.
  }
}

/** The last quotation number sequence we handed out. */
function getCounter(): number {
  try {
    const value = parseInt(window.localStorage.getItem(COUNTER_KEY) ?? "0", 10);
    return Number.isFinite(value) && value > 0 ? value : 0;
  } catch {
    return 0;
  }
}

function setCounter(value: number): void {
  try {
    window.localStorage.setItem(COUNTER_KEY, String(value));
  } catch {
    // ignore
  }
}

/**
 * Starts a new quotation with the next number, and saves it as the draft.
 * The next number is one more than the larger of: the counter, or the number on the
 * previous quotation. So if the number is edited to QT-2026-0050, the next one is 0051.
 */
export function createNewQuotation(previousNumber: string = ""): QuotationData {
  const next = Math.max(getCounter(), readSequence(previousNumber)) + 1;
  setCounter(next);

  const quotation = createDefaultQuotation(formatQuotationNumber(next));
  saveDraft(quotation);
  return quotation;
}

/** Opens the saved draft, or starts a new quotation the very first time. */
export function loadOrCreateDraft(): QuotationData {
  return loadDraft() ?? createNewQuotation();
}