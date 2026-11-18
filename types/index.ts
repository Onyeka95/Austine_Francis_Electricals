// Shared types. More types (Product, GalleryItem, QuoteItem, BlogPost...) are added in later phases.

/** One link in the navbar or footer. */
export interface NavLink {
  label: string;
  href: string;
}

/** The social platforms we support. Add a name here to support a new one. */
export const SOCIAL_PLATFORMS = [
  "facebook",
  "instagram",
  "tiktok",
  "x",
  "youtube",
  "linkedin",
] as const;

/** "facebook" | "instagram" | ... (built from the list above) */
export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];

export interface WorkingHours {
  days: string;
  hours: string;
}

export interface BusinessAddress {
  street: string;
  city: string;
  state: string;
  country: string;
}

export interface BankDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

/** Defaults used by the quotation generator (Phase 7). */
export interface QuotationDefaults {
  prefix: string; // quotation number prefix, e.g. "QT" gives QT-2026-0001
  validityDays: number;
  vatRate: number; // 0.075 means 7.5%
  defaultNotes: string;
  defaultTerms: string[];
  bankDetails: BankDetails;
}

/** Everything the electrician may want to change lives in this shape. */
export interface SiteConfig {
  businessName: string;
  ownerName: string;
  tagline: string;
  description: string;
  siteUrl: string;
  phone: string; // as people write it: 08149589933
  phoneInternational: string; // for tel: links: +2348149589933
  whatsappNumber: string; // international, no plus sign
  whatsappGreeting: string;
  email: string;
  address: BusinessAddress;
  workingHours: WorkingHours[];
  emergencyAvailable: boolean;
  stats: {
    yearsOfExperience: number;
    projectsCompleted: number;
    happyClients: number;
  };
  serviceAreas: string[];
  social: Record<SocialPlatform, string>; // empty string means "hide this icon"
  mapEmbedUrl: string;
  quotation: QuotationDefaults;
}
/** Icon names we allow. Add a name here AND in components/ui/Icon.tsx to support a new icon. */
export type IconName =
  | "zap"
  | "cable"
  | "plug"
  | "lightbulb"
  | "wrench"
  | "sun"
  | "clipboard-check"
  | "siren"
  | "layout-grid"
  | "shield-check"
  | "badge-check"
  | "banknote"
  | "clock"
  | "hard-hat";

/** One electrical service (data/services.ts). */
export interface Service {
  id: string; // used later to pre-select the service on the contact form
  title: string;
  description: string;
  icon: IconName;
}

/** Gallery filter categories (PRD GA-2). */
export const GALLERY_CATEGORIES = [
  "Wiring",
  "Conduit",
  "Installations",
  "Lighting",
  "Panels",
  "Solar",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

/** One gallery photo (data/gallery.ts). */
export interface GalleryItem {
  id: string;
  image: string; // path inside /public, e.g. /images/gallery/gallery-1.jpg
  alt: string; // describes the photo for screen readers
  title: string;
  category: GalleryCategory;
  beforeImage?: string; // optional, for before and after layouts (Phase 4)
  featured?: boolean; // true = may appear in "Featured projects" on the Home page
}

/** One client testimonial (data/testimonials.ts). */
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

/** One "Why choose us" reason. */
export interface Reason {
  title: string;
  description: string;
  icon: IconName;
}

/** Text content for the Home page (data/homeContent.ts). */
export interface HomeContent {
  hero: {
    eyebrow: string;
    headline: string;
    backgroundImage: string;
    backgroundAlt: string;
  };
  aboutPreview: {
    title: string;
    text: string;
    image: string;
    imageAlt: string;
  };
  cta: {
    title: string;
    text: string;
  };
  reasons: Reason[];
}
/** One value or principle on the About page (AB-5). */
export interface ValueItem {
  title: string;
  description: string;
  icon: IconName;
}

/** One certification, licence or award (AB-3, AB-4). */
export interface CredentialItem {
  title: string;
  issuer: string;
  year?: string; // optional
}

/** Text content for the About page (data/aboutContent.ts). */
export interface AboutContent {
  title: string; // heading beside the portrait
  story: string[]; // one string per paragraph
  portrait: string;
  portraitAlt: string;
  secondaryImage: string;
  secondaryImageAlt: string;
  skills: string[];
  certifications: CredentialItem[];
  awards: CredentialItem[];
  values: ValueItem[];
}

/** One project on the experience timeline (data/experience.ts). */
export interface ExperienceProject {
  id: string;
  name: string;
  client: string; // person or company
  year: number;
  description: string;
  image: string; // path inside /public
  imageAlt: string;
}

/** One client in the "companies and clients" strip (EX-2). */
export interface ClientEntry {
  id: string;
  name: string;
  logo?: string; // optional, e.g. /images/clients/client-1.png
}
/** One FAQ entry on the Services page (data/faqs.ts). */
export interface Faq {
  id: string;
  question: string;
  answer: string;
}
/** Product filter categories (PRD PR-4). */
export const PRODUCT_CATEGORIES = [
  "Cables and wires",
  "Sockets and switches",
  "Breakers and DB boxes",
  "Conduit and fittings",
  "Lighting",
  "Tools and accessories",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

/** One product for sale (data/products.ts). */
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number | null; // price in Naira, or null to show "Call for price"
  image: string; // path inside /public, e.g. /images/products/product-copper-wire.jpg
}
/** One blog post, read from a Markdown file in /content/blog (lib/getPosts.ts). */
export interface BlogPost {
  slug: string; // the file name without .md, used in the URL: /blog/<slug>
  title: string;
  date: string; // written as YYYY-MM-DD, for example 2026-11-10
  coverImage: string; // path inside /public, e.g. /images/blog/blog-1.jpg
  excerpt: string; // short summary shown on the blog list and in search results
  category: string;
  content: string; // the Markdown body of the post
}
/** How the discount is entered: a fixed Naira amount or a percentage. */
export type DiscountType = "amount" | "percent";

/**
 * One row in the quotation items table.
 * quantity and unitPrice are kept as TEXT while the user types, so an empty box
 * never turns into NaN. They are converted to numbers only when we calculate.
 */
export interface QuoteItem {
  id: string;
  description: string;
  quantity: string;
  unitPrice: string;
}

/** The letterhead at the top of the quotation (editable for one-off changes). */
export interface QuotationLetterhead {
  businessName: string;
  address: string;
  phone: string;
  email: string;
}

/** Everything on one quotation. This whole object is saved as the draft. */
export interface QuotationData {
  quotationNumber: string;
  date: string; // YYYY-MM-DD
  validityDays: string;
  letterhead: QuotationLetterhead;
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  projectTitle: string;
  items: QuoteItem[];
  labour: string;
  discountType: DiscountType;
  discountValue: string;
  vatEnabled: boolean;
  notes: string;
  terms: string; // one term per line
  showBankDetails: boolean;
  bank: BankDetails;
  signatoryName: string;
}

/** All the money figures, worked out from a QuotationData. */
export interface QuotationTotals {
  rowTotals: number[]; // one per item, in the same order as items
  subtotal: number;
  labour: number;
  discount: number;
  vat: number;
  grandTotal: number;
}