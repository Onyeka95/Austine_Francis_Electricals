import { MessageCircle } from "lucide-react";
import GalleryImage from "@/components/gallery/GalleryImage";
import { formatProductPrice, productOrderLink } from "@/lib/productOrder";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasPrice = product.price !== null;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-brand-navy/10 bg-white shadow-sm transition hover:shadow-md">
      {/* Product photo: square, as recommended in the PRD (800 x 800) */}
      <div className="relative aspect-square w-full bg-brand-light">
        <GalleryImage
          src={product.image}
          alt={product.name}
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-amber-dark">
          {product.category}
        </p>
        <h2 className="mt-1 text-lg font-semibold text-brand-navy">
          {product.name}
        </h2>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">
          {product.description}
        </p>

        <p
          className={`mt-4 text-lg font-bold ${
            hasPrice ? "text-brand-navy" : "text-brand-muted"
          }`}
        >
          {formatProductPrice(product.price)}
        </p>

        {/* Opens WhatsApp with the product name and price already typed (PR-2) */}
        <a
          href={productOrderLink(product)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Order ${product.name} on WhatsApp`}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-amber px-4 py-3 text-sm font-bold text-brand-navy transition hover:bg-brand-amber-dark"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          Order on WhatsApp
        </a>
      </div>
    </article>
  );
}