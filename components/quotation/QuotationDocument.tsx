import { Zap } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { formatPostDate } from "@/lib/formatDate";
import { formatNaira } from "@/lib/formatNaira";
import { addDays, parseAmount } from "@/lib/quotationMath";
import type { QuotationData, QuotationTotals } from "@/types";

interface QuotationDocumentProps {
  data: QuotationData;
  totals: QuotationTotals;
}

/** Small label above a block of text. */
function Label({ children }: { children: string }) {
  return (
    <p className="text-[8pt] font-bold uppercase tracking-wide text-brand-muted">
      {children}
    </p>
  );
}

/** One line in the totals block. */
function TotalLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 py-1">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

/** The printable A4 quotation. Hidden on screen, visible only when printing. */
export default function QuotationDocument({
  data,
  totals,
}: QuotationDocumentProps) {
  const { letterhead } = data;
  const vatPercent = (siteConfig.quotation.vatRate * 100).toFixed(1);
  const validityDays = Math.floor(parseAmount(data.validityDays));

  // Skip rows that were left completely empty.
  const rows = data.items
    .map((item, index) => ({ item, total: totals.rowTotals[index] ?? 0 }))
    .filter(
      ({ item }) =>
        item.description.trim() !== "" ||
        parseAmount(item.quantity) > 0 ||
        parseAmount(item.unitPrice) > 0
    );

  const terms = data.terms
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  const showBank =
    data.showBankDetails &&
    (data.bank.bankName || data.bank.accountName || data.bank.accountNumber);

  const discountLabel =
    data.discountType === "percent"
      ? `Discount (${Math.min(parseAmount(data.discountValue), 100)}%)`
      : "Discount";

  return (
    <div className="hidden text-[10pt] leading-snug text-black print:block">
      {/* Letterhead */}
      <div className="flex items-start justify-between gap-6 border-b-4 border-brand-amber pb-4">
        <div className="flex items-start gap-3">
          {/* Text logo placeholder. Replace with the real logo once it is supplied. */}
          <div className="print-exact flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-brand-navy text-brand-amber">
            <Zap className="h-8 w-8" aria-hidden="true" />
          </div>
          <div>
            <p className="text-[16pt] font-bold text-brand-navy">
              {letterhead.businessName}
            </p>
            {letterhead.address && <p>{letterhead.address}</p>}
            {letterhead.phone && <p>Tel: {letterhead.phone}</p>}
            {letterhead.email && <p>Email: {letterhead.email}</p>}
          </div>
        </div>

        <div className="text-right">
          <p className="text-[20pt] font-bold tracking-wide text-brand-navy">
            QUOTATION
          </p>
          <p>
            No: <span className="font-bold">{data.quotationNumber}</span>
          </p>
          <p>Date: {formatPostDate(data.date)}</p>
          {validityDays > 0 && (
            <p>Valid until: {formatPostDate(addDays(data.date, validityDays))}</p>
          )}
        </div>
      </div>

      {/* Client and project */}
      <div className="mt-5 grid grid-cols-2 gap-6">
        <div>
          <Label>Quotation for</Label>
          <p className="font-semibold">{data.clientName || "-"}</p>
          {data.clientAddress && (
            <p className="whitespace-pre-line">{data.clientAddress}</p>
          )}
          {data.clientPhone && <p>Tel: {data.clientPhone}</p>}
        </div>
        <div>
          <Label>Project</Label>
          <p className="font-semibold">{data.projectTitle || "-"}</p>
        </div>
      </div>

      {/* Items table. The header row repeats on every page; rows never split across pages. */}
      <table className="print-table mt-5 w-full border-collapse text-[9.5pt]">
        <thead>
          <tr className="print-exact bg-brand-navy text-white">
            <th className="w-10 px-2 py-2 text-center font-semibold">S/N</th>
            <th className="px-2 py-2 text-left font-semibold">
              Materials / Tools / Equipment
            </th>
            <th className="w-16 px-2 py-2 text-center font-semibold">Quantity</th>
            <th className="w-28 px-2 py-2 text-right font-semibold">
              Unit Price (₦)
            </th>
            <th className="w-28 px-2 py-2 text-right font-semibold">Total (₦)</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="border-b border-gray-300 px-2 py-3 text-center text-brand-muted"
              >
                No items added
              </td>
            </tr>
          ) : (
            rows.map(({ item, total }, index) => (
              <tr key={item.id}>
                <td className="border-b border-gray-300 px-2 py-2 text-center align-top">
                  {index + 1}
                </td>
                <td className="whitespace-pre-line border-b border-gray-300 px-2 py-2 align-top">
                  {item.description}
                </td>
                <td className="border-b border-gray-300 px-2 py-2 text-center align-top">
                  {parseAmount(item.quantity)}
                </td>
                <td className="border-b border-gray-300 px-2 py-2 text-right align-top">
                  {formatNaira(parseAmount(item.unitPrice))}
                </td>
                <td className="border-b border-gray-300 px-2 py-2 text-right align-top font-semibold">
                  {formatNaira(total)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Totals */}
      <div className="mt-4 break-inside-avoid">
        <div className="ml-auto w-72">
          <TotalLine label="Subtotal" value={formatNaira(totals.subtotal)} />
          {totals.labour > 0 && (
            <TotalLine
              label="Labour / workmanship"
              value={formatNaira(totals.labour)}
            />
          )}
          {totals.discount > 0 && (
            <TotalLine
              label={discountLabel}
              value={`- ${formatNaira(totals.discount)}`}
            />
          )}
          {data.vatEnabled && (
            <TotalLine label={`VAT (${vatPercent}%)`} value={formatNaira(totals.vat)} />
          )}
          <div className="print-exact mt-1 flex justify-between gap-6 bg-brand-amber px-2 py-2 text-[11pt] font-bold text-brand-navy">
            <span>GRAND TOTAL</span>
            <span>{formatNaira(totals.grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {data.notes.trim() !== "" && (
        <div className="mt-6 break-inside-avoid">
          <Label>Notes</Label>
          <p className="whitespace-pre-line">{data.notes}</p>
        </div>
      )}

      {/* Terms */}
      {terms.length > 0 && (
        <div className="mt-4 break-inside-avoid">
          <Label>Terms and conditions</Label>
          <ol className="list-decimal pl-5">
            {terms.map((term, index) => (
              <li key={index}>{term}</li>
            ))}
          </ol>
        </div>
      )}

      {/* Account details */}
      {showBank && (
        <div className="mt-4 break-inside-avoid">
          <Label>Payment details</Label>
          <p>Bank: {data.bank.bankName}</p>
          <p>Account name: {data.bank.accountName}</p>
          <p>Account number: {data.bank.accountNumber}</p>
        </div>
      )}

      {/* Signature */}
      <div className="mt-10 grid grid-cols-2 gap-10 break-inside-avoid">
        <div>
          <div className="h-12 border-b border-black" />
          <p className="mt-1 font-semibold">{data.signatoryName}</p>
          <p className="text-[8.5pt] text-brand-muted">Authorised signature</p>
          <div className="mt-4 h-6 border-b border-black" />
          <p className="text-[8.5pt] text-brand-muted">Date</p>
        </div>
        <div>
          <div className="h-12 border-b border-black" />
          <p className="mt-1 font-semibold">&nbsp;</p>
          <p className="text-[8.5pt] text-brand-muted">
            Client acceptance (signature)
          </p>
          <div className="mt-4 h-6 border-b border-black" />
          <p className="text-[8.5pt] text-brand-muted">Date</p>
        </div>
      </div>
    </div>
  );
}