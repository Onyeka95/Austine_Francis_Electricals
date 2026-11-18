"use client";

import { useEffect, useState } from "react";
import { FilePlus, FileDown, Printer } from "lucide-react";
import { calculateTotals } from "@/lib/quotationMath";
import {
  createNewQuotation,
  loadOrCreateDraft,
  saveDraft,
} from "@/lib/quotationStorage";
import type { QuotationData } from "@/types";
import QuotationDocument from "./QuotationDocument";
import QuotationEditor from "./QuotationEditor";

export default function QuotationBuilder() {
  // Opens the saved draft, or starts quotation number 1 the very first time.
  // This runs in the browser only (see QuotationLoader), so localStorage is available.
  const [data, setData] = useState<QuotationData>(() => loadOrCreateDraft());

  // Autosave: every change is saved to the browser (PRD 9.6).
  useEffect(() => {
    saveDraft(data);
  }, [data]);

  const totals = calculateTotals(data);

  /** Changes one field of the quotation. */
  function update<K extends keyof QuotationData>(
    key: K,
    value: QuotationData[K]
  ) {
    setData((previous) => ({ ...previous, [key]: value }));
  }

  /** Opens the print window. The file name suggested for "Save as PDF" is the quotation number. */
  function handlePrint() {
    const originalTitle = document.title;
    const clientPart = data.clientName.trim();
    document.title = clientPart
      ? `${data.quotationNumber} - ${clientPart}`
      : data.quotationNumber;

    function restoreTitle() {
      document.title = originalTitle;
      window.removeEventListener("afterprint", restoreTitle);
    }
    window.addEventListener("afterprint", restoreTitle);

    window.print();
  }

  function handleNewQuotation() {
    const confirmed = window.confirm(
      "Start a new quotation? The current draft will be cleared."
    );
    if (confirmed) {
      setData(createNewQuotation(data.quotationNumber));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const buttons = (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-2 rounded-lg bg-brand-amber px-5 py-3 text-base font-bold text-brand-navy transition hover:bg-brand-amber-dark"
      >
        <Printer className="h-5 w-5" aria-hidden="true" />
        Print
      </button>
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-navy px-5 py-3 text-base font-semibold text-brand-navy transition hover:bg-brand-navy hover:text-white"
      >
        <FileDown className="h-5 w-5" aria-hidden="true" />
        Download PDF
      </button>
      <button
        type="button"
        onClick={handleNewQuotation}
        className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-navy/30 px-5 py-3 text-base font-semibold text-brand-ink transition hover:border-brand-navy"
      >
        <FilePlus className="h-5 w-5" aria-hidden="true" />
        New quotation
      </button>
    </div>
  );

  return (
    <>
      {/* The form: hidden when printing */}
      <div className="print:hidden">
        <div className="mb-6 rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-sm">
          {buttons}
          <p className="mt-3 text-sm text-brand-muted">
            Your draft saves automatically on this device. To get a PDF, press{" "}
            <strong>Download PDF</strong>, then choose <strong>Save as PDF</strong>{" "}
            as the destination and set the paper size to A4.
          </p>
        </div>

        <QuotationEditor data={data} totals={totals} onUpdate={update} />

        <div className="mt-6 rounded-2xl border border-brand-navy/10 bg-white p-5 shadow-sm">
          {buttons}
        </div>
      </div>

      {/* The printable document: visible only when printing */}
      <QuotationDocument data={data} totals={totals} />
    </>
  );
}