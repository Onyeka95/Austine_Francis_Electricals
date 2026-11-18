"use client";

import dynamic from "next/dynamic";

const QuotationBuilder = dynamic(() => import("./QuotationBuilder"), {
  ssr: false,
  loading: () => (
    <p className="py-16 text-center text-brand-muted">
      Loading the quotation tool...
    </p>
  ),
});

export default function QuotationLoader() {
  return <QuotationBuilder />;
}