import type { NavLink, SiteConfig } from "@/types";

/**
 * THE one file to edit when business details change.
 * Items marked PLACEHOLDER must be replaced before launch (see PRD section 17).
 */
export const siteConfig: SiteConfig = {
  businessName: "Austine Francis Electricals",
  ownerName: "Iwuji C.A. Francis",
  tagline: "Safe, reliable electrical work you can trust", // PLACEHOLDER
  description:
    "Professional electrical wiring, installations, repairs and electrical materials in Onitsha and surrounding areas in Anambra State, Nigeria.",

  // From .env.local. The text after ?? is the fallback if the variable is missing.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  phone: "08149589933",
  phoneInternational: "+2348149589933",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348149589933",
  whatsappGreeting:
    "Hello Austine Francis Electricals, I would like to make an enquiry.",
  email: "iwujiebuka519@gmail.com",

  address: {
    street: "No 60 Oguta Road",
    city: "Onitsha",
    state: "Anambra State",
    country: "Nigeria",
  },

  // PLACEHOLDER: confirm real working hours
  workingHours: [
    { days: "Monday to Saturday", hours: "8:00 AM to 6:00 PM" },
    { days: "Sunday", hours: "Emergency call-outs only" },
  ],
  emergencyAvailable: true,

  // PLACEHOLDER: replace with real numbers
  stats: {
    yearsOfExperience: 10,
    projectsCompleted: 100,
    happyClients: 80,
  },

  // Confirm other towns he serves later
  serviceAreas: ["Onitsha", "Surrounding areas in Anambra State"],

  // Leave empty to hide an icon. Paste the full profile URL to show it.
  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
    x: "",
    youtube: "",
    linkedin: "",
  },

  // PLACEHOLDER: Google Maps embed URL for No 60 Oguta Road, Onitsha
  mapEmbedUrl: "",

  quotation: {
    prefix: "QT",
    validityDays: 30,
    vatRate: 0.075,
    defaultNotes: "Thank you for the opportunity to quote for this project.",
    defaultTerms: [
      "This quotation is valid for 30 days from the date above.",
      "A mobilisation payment is required before work starts.",
      "Balance is payable on completion of the work.",
      "Workmanship is covered by a limited warranty.",
    ],
    // PLACEHOLDER: bank details still to be supplied
    bankDetails: {
      bankName: "",
      accountName: "",
      accountNumber: "",
    },
  },
};

/** Links shown in the navbar and footer. */
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];