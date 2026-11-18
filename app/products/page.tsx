import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import ProductsBrowser from "@/components/products/ProductsBrowser";
import { products } from "@/data/products";
import { productEnquiryLink } from "@/lib/productOrder";

export const metadata: Metadata = {
  title: "Electrical Materials for Sale in Onitsha",
  description:
    "Buy copper wire, armoured cable, sockets, switches, circuit breakers, DB boxes, conduit pipes and bulbs from Austine Francis Electricals. Order on WhatsApp.",
};

export default function ProductsPage() {
  return (
    <>
      {/* Page heading */}
      <section className="bg-brand-navy py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Electrical Materials</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Quality cables, breakers, sockets, switches, conduit and lighting.
            Tap Order on WhatsApp and we will confirm availability and price.
          </p>
        </div>
      </section>

      {/* Search, filter and product grid */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ProductsBrowser is a client component; the data is passed in from the server. */}
          <ProductsBrowser products={products} />
        </div>
      </section>

      {/* Can't find it? */}
      <section className="bg-brand-light py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-navy">
            Cannot find what you need?
          </h2>
          <p className="mt-2 text-brand-muted">
            We can often get other electrical materials. Send us a message and tell
            us what you are looking for.
          </p>
          <a
            href={productEnquiryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-amber px-5 py-3 text-base font-bold text-brand-navy transition hover:bg-brand-amber-dark"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Ask on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}