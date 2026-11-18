import { ChevronDown } from "lucide-react";
import type { Faq } from "@/types";

interface FaqAccordionProps {
  faqs: Faq[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  return (
    <div className="divide-y divide-brand-navy/10 rounded-xl border border-brand-navy/10 bg-white">
      {faqs.map((faq) => (
        <details key={faq.id} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-brand-navy [&::-webkit-details-marker]:hidden">
            {faq.question}
            <ChevronDown
              className="h-5 w-5 shrink-0 text-brand-muted transition group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-brand-muted">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}