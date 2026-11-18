import type { Metadata } from "next";
import EmergencyNotice from "@/components/services/EmergencyNotice";
import FaqAccordion from "@/components/services/FaqAccordion";
import ServiceCard from "@/components/services/ServiceCard";
import { faqs } from "@/data/faqs";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Electrical Services in Onitsha",
  description:
    "Electrical wiring, conduit wiring, DB board installation, lighting, fault finding, generator changeover, inverter and solar wiring, maintenance and emergency call-out in Onitsha and Anambra State.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Page heading */}
      <section className="bg-brand-navy py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Our Services</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Safe, neat and reliable electrical work for homes, shops, offices and
            commercial buildings in Onitsha and surrounding areas.
          </p>
        </div>
      </section>

      {/* Service cards (SV-1) */}
      <section className="bg-brand-light py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Emergency notice (SV-3) */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <EmergencyNotice />
        </div>
      </section>

      {/* FAQ (SV-2) */}
      <section className="bg-brand-light py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-brand-navy">
            Frequently asked questions
          </h2>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>
    </>
  );
}