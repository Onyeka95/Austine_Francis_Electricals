import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import SocialLinks from "@/components/contact/SocialLinks";
import { Suspense } from "react";
import QuoteFormWithPrefill from "@/components/forms/QuoteFormWithPrefill";
// import { services } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";
import { fullAddress, mailLink, telLink } from "@/lib/contactLinks";
import { whatsappLink } from "@/lib/whatsappLink";

export const metadata: Metadata = {
  title: "Contact Us and Request a Quote",
  description:
    "Request a free quotation, call or WhatsApp Austine Francis Electricals at No 60 Oguta Road, Onitsha, Anambra State.",
};

interface ContactPageProps {
  searchParams: Promise<{ service?: string | string[] }>;
}

export default function ContactPage({ searchParams }: ContactPageProps) {
  // /contact?service=lighting-installation pre-selects that service (SV-1).
  // const { service } = await searchParams;
  // const requested = Array.isArray(service) ? service[0] : service;
  // const initialService = services.find((item) => item.id === requested)?.id ?? "";

  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    fullAddress()
  )}`;

  return (
    <>
      {/* Page heading */}
      <section className="bg-brand-navy py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Contact Us</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Tell us about your project and we will get back to you with a
            quotation. You can also call or message us on WhatsApp.
          </p>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {/* Quote form (CT-1 to CT-5) */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-brand-navy">
              Request a quote
            </h2>
            <p className="mt-1 mb-6 text-brand-muted">
              Fields marked * are required.
            </p>
            <Suspense
              fallback={
                <div
                  role="status"
                  aria-label="Loading the quote form"
                  className="h-96 animate-pulse rounded-2xl bg-brand-light"
                />
              }
            >
              <QuoteFormWithPrefill searchParams={searchParams} />
            </Suspense>
          </div>

          {/* Contact details (CT-6, CT-7, CT-8) */}
          <aside className="space-y-6 rounded-2xl bg-brand-light p-6">
            <h2 className="text-xl font-bold text-brand-navy">
              Contact details
            </h2>

            <ul className="space-y-4 text-brand-ink">
              <li className="flex gap-3">
                <Phone
                  className="mt-1 h-5 w-5 shrink-0 text-brand-amber-dark"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm text-brand-muted">Phone</p>
                  <a
                    href={telLink()}
                    className="font-semibold text-brand-navy hover:text-brand-amber-dark"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail
                  className="mt-1 h-5 w-5 shrink-0 text-brand-amber-dark"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="text-sm text-brand-muted">Email</p>
                  <a
                    href={mailLink()}
                    className="break-words font-semibold text-brand-navy hover:text-brand-amber-dark"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <MapPin
                  className="mt-1 h-5 w-5 shrink-0 text-brand-amber-dark"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm text-brand-muted">Address</p>
                  <p className="font-semibold text-brand-navy">{fullAddress()}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock
                  className="mt-1 h-5 w-5 shrink-0 text-brand-amber-dark"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm text-brand-muted">Working hours</p>
                  <ul>
                    {siteConfig.workingHours.map((slot) => (
                      <li key={slot.days} className="text-sm">
                        <span className="font-semibold text-brand-navy">
                          {slot.days}:
                        </span>{" "}
                        {slot.hours}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>

            {/* Click-to-call and WhatsApp buttons (CT-7) */}
            <div className="flex flex-col gap-3">
              <a
                href={telLink()}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-amber px-5 py-3 text-base font-bold text-brand-navy transition hover:bg-brand-amber-dark"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call Now
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-brand-navy px-5 py-3 text-base font-semibold text-brand-navy transition hover:bg-brand-navy hover:text-white"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>

            <SocialLinks />
          </aside>
        </div>
      </section>

      {/* Map (CT-6) */}
      <section className="bg-brand-light py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-bold text-brand-navy">Find us</h2>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-brand-navy underline decoration-brand-amber decoration-2 underline-offset-4 hover:text-brand-amber-dark"
            >
              Get directions
            </a>
          </div>

          {siteConfig.mapEmbedUrl ? (
            <iframe
              src={siteConfig.mapEmbedUrl}
              title={`Map showing ${siteConfig.businessName} at ${fullAddress()}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-80 w-full rounded-xl border-0 sm:h-96"
            />
          ) : (
            // Shown until a map embed URL is added to siteConfig.ts
            <div className="flex h-60 flex-col items-center justify-center rounded-xl border border-dashed border-brand-navy/20 bg-white p-6 text-center">
              <MapPin
                className="h-8 w-8 text-brand-amber-dark"
                aria-hidden="true"
              />
              <p className="mt-2 font-semibold text-brand-navy">{fullAddress()}</p>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 rounded-lg border-2 border-brand-navy px-4 py-2 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy hover:text-white"
              >
                Open in Google Maps
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}