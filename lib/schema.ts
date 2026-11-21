import { siteConfig } from "@/data/siteConfig";

/** Builds the LocalBusiness and Electrician structured data that Google reads. */
export function buildBusinessSchema() {
  const baseUrl = siteConfig.siteUrl.replace(/\/$/, "");

  // Only social links that are filled in siteConfig.
  const sameAs = Object.values(siteConfig.social).filter(
    (url) => url.trim() !== ""
  );

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Electrician"],
    "@id": `${baseUrl}/#business`,
    name: siteConfig.businessName,
    description: siteConfig.description,
    url: baseUrl,
    telephone: siteConfig.phoneInternational,
    email: siteConfig.email,
    image: `${baseUrl}/images/hero/hero.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      addressCountry: "NG",
    },
    areaServed: siteConfig.serviceAreas.map((name) => ({
      "@type": "Place",
      name,
    })),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}