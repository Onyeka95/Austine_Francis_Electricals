"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/types";
import GalleryImage from "./GalleryImage";

interface LightboxProps {
  items: GalleryItem[]; // the currently filtered list
  index: number; // which item is open
  onClose: () => void;
  onIndexChange: (newIndex: number) => void;
}

export default function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const item = items[index];
  const total = items.length;

  // Wrap around: after the last photo comes the first.
  const goPrev = () => onIndexChange((index - 1 + total) % total);
  const goNext = () => onIndexChange((index + 1) % total);

  // On open: remember the focused element, move focus into the dialog, lock page scroll.
  // On close: undo all of that.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  // Keyboard controls. Re-attached when `index` changes so goPrev/goNext are fresh.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        goPrev();
      } else if (event.key === "ArrowRight") {
        goNext();
      } else if (event.key === "Tab") {
        // Keep Tab inside the dialog (simple focus trap).
        const buttons = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!buttons || buttons.length === 0) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total]);

  if (!item) return null;

  const navButtonClass =
    "absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/25 sm:p-3";

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title}, photo ${index + 1} of ${total}`}
      className="fixed inset-0 z-[60] flex flex-col bg-brand-navy-dark/95 p-4"
      // Clicking the dark background closes the lightbox.
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between pb-3 text-white">
        <p className="text-sm text-white/70">
          {index + 1} / {total}
        </p>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer"
          className="rounded-full bg-white/10 p-2 transition hover:bg-white/25"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Photo area */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-y-auto"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        {total > 1 && (
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous photo"
            className={`${navButtonClass} left-0`}
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
        )}

        <div className="w-full max-w-5xl px-10 sm:px-14">
          {item.beforeImage ? (
            // Before and after layout (GA-4): stacked on phones, side by side on tablets and up.
            <div className="grid gap-3 md:grid-cols-2">
              <figure>
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-brand-navy-light">
                  <GalleryImage
                    key={item.beforeImage}
                    src={item.beforeImage}
                    alt={`Before: ${item.alt}`}
                    sizes="(min-width: 768px) 45vw, 90vw"
                    className="object-contain"
                  />
                </div>
                <figcaption className="mt-1 text-center text-xs font-semibold uppercase tracking-wide text-white/70">
                  Before
                </figcaption>
              </figure>
              <figure>
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-brand-navy-light">
                  <GalleryImage
                    key={item.image}
                    src={item.image}
                    alt={`After: ${item.alt}`}
                    sizes="(min-width: 768px) 45vw, 90vw"
                    className="object-contain"
                  />
                </div>
                <figcaption className="mt-1 text-center text-xs font-semibold uppercase tracking-wide text-brand-amber">
                  After
                </figcaption>
              </figure>
            </div>
          ) : (
            <div className="relative mx-auto aspect-[3/2] w-full overflow-hidden rounded-lg bg-brand-navy-light">
              <GalleryImage
                key={item.image}
                src={item.image}
                alt={item.alt}
                sizes="90vw"
                priority
                className="object-contain"
              />
            </div>
          )}

          <p className="mt-4 text-center text-base font-semibold text-white">
            {item.title}
          </p>
          <p className="text-center text-sm text-white/70">{item.category}</p>
        </div>

        {total > 1 && (
          <button
            type="button"
            onClick={goNext}
            aria-label="Next photo"
            className={`${navButtonClass} right-0`}
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}