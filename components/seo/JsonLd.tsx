import { buildBusinessSchema } from "@/lib/schema";

/** Adds the business structured data to the page (PRD 14.1). Used once, in the root layout. */
export default function JsonLd() {
  // Replacing "<" stops text from ever closing the script tag early.
  const json = JSON.stringify(buildBusinessSchema()).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}