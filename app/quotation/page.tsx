import type { Metadata } from "next";
import QuotationLoader from "@/components/quotation/QuotationLoader";

export const metadata: Metadata = {
  title: "Quotation Generator",
  description:
    "Create a branded, printable quotation with Naira totals for Austine Francis Electricals.",
  // This is a private working tool, so keep it out of Google.
  robots: { index: false, follow: false },
};

export default function QuotationPage() {
  return (
    <>
      <section className="bg-brand-navy py-12 text-white sm:py-16 print:hidden">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Quotation Generator</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Fill in the details, check the totals, then print or save as PDF.
          </p>
        </div>
      </section>

      <section className="bg-brand-light py-8 sm:py-12 print:bg-white print:py-0">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 print:max-w-none print:px-0">
          <QuotationLoader />
        </div>
      </section>
    </>
  );
}