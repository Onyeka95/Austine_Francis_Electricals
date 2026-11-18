import { Phone } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

/** Emergency call-out notice (SV-3). Hidden if emergencyAvailable is false in siteConfig. */
export default function EmergencyNotice() {
  if (!siteConfig.emergencyAvailable) return null;

  return (
    <section
      aria-labelledby="emergency-heading"
      className="rounded-2xl border-2 border-brand-amber bg-brand-amber/10 p-6 sm:p-8"
    >
      <h2
        id="emergency-heading"
        className="text-xl font-bold text-brand-navy sm:text-2xl"
      >
        Electrical emergency?
      </h2>
      <p className="mt-2 max-w-2xl text-brand-ink">
        If you see sparks, smell burning or lose power suddenly, switch off at the
        main breaker if it is safe to do so, keep away from the fault and call us
        right away. We offer emergency call-out.
      </p>
      <a
        href={`tel:${siteConfig.phoneInternational}`}
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-amber px-5 py-3 text-base font-bold text-brand-navy transition hover:bg-brand-amber-dark"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        Call {siteConfig.phone}
      </a>
    </section>
  );
}