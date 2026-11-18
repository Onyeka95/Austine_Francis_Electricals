"use client";

import Image from "next/image";
import { useState } from "react";

/** A simple grey placeholder drawn as an inline SVG, so no extra file is needed. */
const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <rect width="1200" height="800" fill="#e2e8f0"/>
      <path d="M560 300h80l-30 120h60L580 560l20-110h-60z" fill="#94a3b8"/>
      <text x="600" y="640" font-family="Arial, sans-serif" font-size="32" text-anchor="middle" fill="#64748b">Photo coming soon</text>
    </svg>`
  );

interface GalleryImageProps {
  src: string;
  alt: string;
  sizes: string; // tells the browser how wide the image will be, so it downloads a small file
  priority?: boolean;
  className?: string;
}

/** Fills its parent (the parent must be `relative` and have a height or aspect ratio). */
export default function GalleryImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
}: GalleryImageProps) {
  // We remember WHICH src failed, so changing to a new photo tries again.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showPlaceholder = failedSrc === src;

  return (
    <Image
      src={showPlaceholder ? PLACEHOLDER : src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setFailedSrc(src)}
    />
  );
}