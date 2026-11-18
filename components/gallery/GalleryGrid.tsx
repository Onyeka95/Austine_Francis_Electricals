"use client";

import { useState } from "react";
import { GALLERY_CATEGORIES } from "@/types";
import type { GalleryCategory, GalleryItem } from "@/types";
import GalleryImage from "./GalleryImage";
import Lightbox from "./Lightbox";

/** "All" is a filter choice only; it is not a real photo category. */
type Filter = "All" | GalleryCategory;
const FILTERS: Filter[] = ["All", ...GALLERY_CATEGORIES];

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  // null = lightbox closed. A number = index inside the FILTERED list.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visibleItems =
    activeFilter === "All"
      ? items
      : items.filter((item) => item.category === activeFilter);

  return (
    <div>
      {/* Category filter (GA-2) */}
      <div
        role="group"
        aria-label="Filter photos by category"
        className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
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

      {/* Photo grid (GA-1) */}
      {visibleItems.length === 0 ? (
        <p className="py-12 text-center text-brand-muted">
          No photos in this category yet.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`View photo: ${item.title}`}
                className="group relative block aspect-[3/2] w-full overflow-hidden rounded-xl bg-brand-light"
              >
                <GalleryImage
                  src={item.image}
                  alt={item.alt}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                {/* Caption bar */}
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy-dark/85 to-transparent p-3 text-left">
                  <span className="block text-sm font-semibold text-white">
                    {item.title}
                  </span>
                  <span className="block text-xs text-white/80">
                    {item.category}
                  </span>
                </span>
                {item.beforeImage && (
                  <span className="absolute right-2 top-2 rounded bg-brand-amber px-2 py-0.5 text-xs font-bold text-brand-navy">
                    Before &amp; After
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Lightbox (GA-3) */}
      {openIndex !== null && (
        <Lightbox
          items={visibleItems}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      )}
    </div>
  );
}