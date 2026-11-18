"use client"; // needs state and effects to detect a missing file

import { useEffect, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";

/** Shown whenever a photo file is missing from /public/images. */
export const PLACEHOLDER_SRC = "/images/placeholder.svg";

/**
 * Works exactly like next/image, but swaps in the placeholder if the file is missing.
 * Use it instead of <Image> for every photo the electrician will supply.
 */
export default function SafeImage({ src, alt, ...rest }: Omit<ImageProps, "onError">) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // If the image already failed before React woke up, onError never fires. Check once on load.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setFailed(true);
    }
  }, []);

  return (
    <Image
      {...rest}
      ref={imgRef}
      src={failed ? PLACEHOLDER_SRC : src}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}