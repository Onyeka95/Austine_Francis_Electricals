"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/types";
import type { Product, ProductCategory } from "@/types";
import ProductCard from "./ProductCard";

/** "All" is a filter choice only; it is not a real product category. */
type Filter = "All" | ProductCategory;
const FILTERS: Filter[] = ["All", ...PRODUCT_CATEGORIES];

interface ProductsBrowserProps {
  products: Product[];
}

export default function ProductsBrowser({ products }: ProductsBrowserProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const searchText = query.trim().toLowerCase();

  // Keep a product only if it matches BOTH the category and the search text.
  const visibleProducts = products.filter((product) => {
    const matchesCategory =
      activeFilter === "All" || product.category === activeFilter;
    const matchesSearch =
      searchText === "" ||
      product.name.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText);
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Search box (PR-3) */}
      <div className="mb-5">
        <label htmlFor="product-search" className="sr-only">
          Search products
        </label>
        <div className="relative max-w-xl">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted"
            aria-hidden="true"
          />
          <input
            id="product-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products, for example cable or socket"
            className="w-full rounded-lg border border-brand-navy/20 bg-white py-3 pl-10 pr-4 text-base text-brand-ink placeholder:text-brand-muted"
          />
        </div>
      </div>

      {/* Category filter (PR-3) */}
      <div
        role="group"
        aria-label="Filter products by category"
        className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        {FILTERS.map((filter) => {
          const isActive = filter === activeFilter;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "border-brand-amber bg-brand-amber text-brand-navy"
                  : "border-brand-navy/20 bg-white text-brand-ink hover:border-brand-navy"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Result count. aria-live tells screen readers when it changes. */}
      <p className="mb-6 text-sm text-brand-muted" aria-live="polite">
        Showing {visibleProducts.length} of {products.length} products
      </p>

      {/* Product grid (PR-1) */}
      {visibleProducts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-brand-navy/20 bg-brand-light p-10 text-center">
          <p className="font-semibold text-brand-navy">No products found</p>
          <p className="mt-1 text-sm text-brand-muted">
            Try a different word, or choose another category.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveFilter("All");
            }}
            className="mt-4 rounded-lg border-2 border-brand-navy px-4 py-2 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy hover:text-white"
          >
            Clear search and filter
          </button>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}