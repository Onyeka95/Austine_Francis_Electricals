import QuoteForm from "@/components/forms/QuoteForm";
import { services } from "@/data/services";

interface QuoteFormWithPrefillProps {
  searchParams: Promise<{ service?: string | string[] }>;
}

/** Reads /contact?service=... and pre-selects that service in the form (SV-1). */
export default async function QuoteFormWithPrefill({
  searchParams,
}: QuoteFormWithPrefillProps) {
  const { service } = await searchParams;
  const requested = Array.isArray(service) ? service[0] : service;
  const initialService = services.find((item) => item.id === requested)?.id ?? "";

  return <QuoteForm initialService={initialService} />;
}