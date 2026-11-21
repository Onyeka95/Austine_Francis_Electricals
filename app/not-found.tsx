import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { telLink } from "@/lib/contactLinks";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="bg-brand-light py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <p className="text-sm font-bold uppercase tracking-wide text-brand-amber-deep">
          Error 404
        </p>
        <h1 className="mt-2 text-3xl font-bold text-brand-navy sm:text-4xl">
          We could not find that page
        </h1>
        <p className="mt-3 text-brand-muted">
          The page may have moved or the address may be wrong. Here are some
          places to go instead.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-brand-amber px-5 py-3 text-base font-bold text-brand-navy transition hover:bg-brand-amber-dark"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border-2 border-brand-navy px-5 py-3 text-base font-semibold text-brand-navy transition hover:bg-brand-navy hover:text-white"
          >
            Get a Quote
          </Link>
          <a
            href={telLink()}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-navy px-5 py-3 text-base font-semibold text-brand-navy transition hover:bg-brand-navy hover:text-white"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call {siteConfig.phone}
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-brand-navy">
          <li>
            <Link href="/services" className="underline underline-offset-4">
              Services
            </Link>
          </li>
          <li>
            <Link href="/products" className="underline underline-offset-4">
              Products
            </Link>
          </li>
          <li>
            <Link href="/gallery" className="underline underline-offset-4">
              Gallery
            </Link>
          </li>
          <li>
            <Link href="/blog" className="underline underline-offset-4">
              Blog
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}