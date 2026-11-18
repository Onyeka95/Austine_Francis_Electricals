import Link from "next/link";
import Icon from "@/components/ui/Icon";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-brand-navy/10 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-amber/10 text-brand-amber-dark">
        <Icon name={service.icon} className="h-6 w-6" />
      </div>

      <h2 className="mt-4 text-lg font-semibold text-brand-navy">
        {service.title}
      </h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">
        {service.description}
      </p>

      {/* Pre-selects this service on the contact form (the form reads ?service= in Phase 8). */}
      <Link
        href={`/contact?service=${service.id}`}
        className="mt-5 inline-flex items-center justify-center rounded-lg border-2 border-brand-navy px-4 py-2 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy hover:text-white"
      >
        Request this service
      </Link>
    </article>
  );
}