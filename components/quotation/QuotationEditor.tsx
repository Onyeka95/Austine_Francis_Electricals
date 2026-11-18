import type { ReactNode } from "react";
import { siteConfig } from "@/data/siteConfig";
import { formatNaira } from "@/lib/formatNaira";
import { parseAmount } from "@/lib/quotationMath";
import type {
  BankDetails,
  QuotationData,
  QuotationLetterhead,
  QuotationTotals,
} from "@/types";
import { inputClass, NumberField, TextAreaField, TextField } from "./Field";
import ItemsEditor from "./ItemsEditor";

interface SectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

/** A white card that groups related fields. */
function Section({ title, description, children }: SectionProps) {
  return (
    <section className="rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-brand-navy">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-brand-muted">{description}</p>
      )}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

interface SummaryRowProps {
  label: string;
  value: string;
  strong?: boolean;
}

function SummaryRow({ label, value, strong = false }: SummaryRowProps) {
  return (
    <div
      className={`flex items-center justify-between gap-4 ${
        strong
          ? "border-t border-brand-navy/20 pt-3 text-base font-bold text-brand-navy"
          : "text-sm text-brand-ink"
      }`}
    >
      <dt>{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}

interface QuotationEditorProps {
  data: QuotationData;
  totals: QuotationTotals;
  /** Changes one field of the quotation. */
  onUpdate: <K extends keyof QuotationData>(
    key: K,
    value: QuotationData[K]
  ) => void;
}

export default function QuotationEditor({
  data,
  totals,
  onUpdate,
}: QuotationEditorProps) {
  const vatPercent = (siteConfig.quotation.vatRate * 100).toFixed(1);

  function updateLetterhead(field: keyof QuotationLetterhead, value: string) {
    onUpdate("letterhead", { ...data.letterhead, [field]: value });
  }

  function updateBank(field: keyof BankDetails, value: string) {
    onUpdate("bank", { ...data.bank, [field]: value });
  }

  const discountLabel =
    data.discountType === "percent"
      ? `Discount (${Math.min(parseAmount(data.discountValue), 100)}%)`
      : "Discount";

  return (
    <div className="space-y-6">
      {/* 9.1 Letterhead */}
      <Section
        title="Letterhead"
        description="Filled from your business details. Change anything here for this quotation only."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            id="lh-name"
            label="Business name"
            value={data.letterhead.businessName}
            onChange={(value) => updateLetterhead("businessName", value)}
          />
          <TextField
            id="lh-phone"
            label="Phone"
            type="tel"
            value={data.letterhead.phone}
            onChange={(value) => updateLetterhead("phone", value)}
          />
          <TextField
            id="lh-email"
            label="Email"
            type="email"
            value={data.letterhead.email}
            onChange={(value) => updateLetterhead("email", value)}
          />
          <TextField
            id="lh-address"
            label="Address"
            value={data.letterhead.address}
            onChange={(value) => updateLetterhead("address", value)}
          />
        </div>
      </Section>

      {/* Quotation number, date, validity */}
      <Section title="Quotation details">
        <div className="grid gap-4 sm:grid-cols-3">
          <TextField
            id="q-number"
            label="Quotation number"
            value={data.quotationNumber}
            onChange={(value) => onUpdate("quotationNumber", value)}
            hint="Edit it to continue from an older sequence."
          />
          <TextField
            id="q-date"
            label="Date"
            type="date"
            value={data.date}
            onChange={(value) => onUpdate("date", value)}
          />
          <NumberField
            id="q-validity"
            label="Valid for (days)"
            value={data.validityDays}
            onChange={(value) => onUpdate("validityDays", value)}
            placeholder="30"
          />
        </div>
      </Section>

      {/* 9.2 Client and project */}
      <Section title="Client and project">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            id="client-name"
            label="Client name"
            value={data.clientName}
            onChange={(value) => onUpdate("clientName", value)}
          />
          <TextField
            id="client-phone"
            label="Client phone (optional)"
            type="tel"
            value={data.clientPhone}
            onChange={(value) => onUpdate("clientPhone", value)}
          />
        </div>
        <TextField
          id="client-address"
          label="Client address"
          value={data.clientAddress}
          onChange={(value) => onUpdate("clientAddress", value)}
        />
        <TextField
          id="project-title"
          label="Project title"
          value={data.projectTitle}
          onChange={(value) => onUpdate("projectTitle", value)}
          placeholder="e.g. Electrical wiring for a 3-bedroom flat"
        />
      </Section>

      {/* 9.3 Items table */}
      <Section
        title="Items"
        description="Materials, tools and equipment. Totals are worked out for you."
      >
        <ItemsEditor
          items={data.items}
          rowTotals={totals.rowTotals}
          onChange={(items) => onUpdate("items", items)}
        />
      </Section>

      {/* 9.4 Labour, discount, VAT, totals */}
      <Section title="Labour, discount and VAT">
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            id="labour"
            label="Labour / workmanship (₦)"
            value={data.labour}
            onChange={(value) => onUpdate("labour", value)}
          />
          <div>
            <label
              htmlFor="discount-type"
              className="mb-1 block text-sm font-semibold text-brand-ink"
            >
              Discount type
            </label>
            <select
              id="discount-type"
              value={data.discountType}
              onChange={(event) =>
                onUpdate(
                  "discountType",
                  event.target.value === "percent" ? "percent" : "amount"
                )
              }
              className={inputClass}
            >
              <option value="amount">Fixed amount (₦)</option>
              <option value="percent">Percentage (%)</option>
            </select>
          </div>
          <NumberField
            id="discount-value"
            label={
              data.discountType === "percent"
                ? "Discount (%)"
                : "Discount amount (₦)"
            }
            value={data.discountValue}
            onChange={(value) => onUpdate("discountValue", value)}
          />
        </div>

        <label className="flex items-center gap-3 text-sm font-semibold text-brand-ink">
          <input
            type="checkbox"
            checked={data.vatEnabled}
            onChange={(event) => onUpdate("vatEnabled", event.target.checked)}
            className="h-5 w-5 accent-brand-navy"
          />
          Add VAT ({vatPercent}%)
        </label>

        {/* Live totals */}
        <dl className="space-y-2 rounded-xl bg-brand-light p-4">
          <SummaryRow label="Subtotal" value={formatNaira(totals.subtotal)} />
          <SummaryRow label="Labour / workmanship" value={formatNaira(totals.labour)} />
          <SummaryRow
            label={discountLabel}
            value={`- ${formatNaira(totals.discount)}`}
          />
          <SummaryRow
            label={`VAT (${vatPercent}%)`}
            value={formatNaira(totals.vat)}
          />
          <SummaryRow
            label="Grand total"
            value={formatNaira(totals.grandTotal)}
            strong
          />
        </dl>
      </Section>

      {/* 9.5 Notes, terms */}
      <Section title="Notes and terms">
        <TextAreaField
          id="notes"
          label="Notes"
          rows={3}
          value={data.notes}
          onChange={(value) => onUpdate("notes", value)}
        />
        <TextAreaField
          id="terms"
          label="Terms and conditions"
          rows={5}
          value={data.terms}
          onChange={(value) => onUpdate("terms", value)}
          hint="One term per line. Each line becomes a numbered point."
        />
      </Section>

      {/* 9.5 Payment details and signature */}
      <Section title="Payment details and signature">
        <label className="flex items-center gap-3 text-sm font-semibold text-brand-ink">
          <input
            type="checkbox"
            checked={data.showBankDetails}
            onChange={(event) => onUpdate("showBankDetails", event.target.checked)}
            className="h-5 w-5 accent-brand-navy"
          />
          Show account details on this quotation
        </label>

        {data.showBankDetails && (
          <div className="grid gap-4 sm:grid-cols-3">
            <TextField
              id="bank-name"
              label="Bank name"
              value={data.bank.bankName}
              onChange={(value) => updateBank("bankName", value)}
            />
            <TextField
              id="bank-account-name"
              label="Account name"
              value={data.bank.accountName}
              onChange={(value) => updateBank("accountName", value)}
            />
            <TextField
              id="bank-account-number"
              label="Account number"
              value={data.bank.accountNumber}
              onChange={(value) => updateBank("accountNumber", value)}
            />
          </div>
        )}

        <TextField
          id="signatory"
          label="Name under the signature line"
          value={data.signatoryName}
          onChange={(value) => onUpdate("signatoryName", value)}
        />
      </Section>
    </div>
  );
}