import type { NavLink, SiteConfig } from "@/types";

/**
 * THE one file to edit when business details change.
 * Items marked PLACEHOLDER must be replaced before launch (see PRD section 17).
 */
export const siteConfig: SiteConfig = {
  businessName: "AustineFrancis Electricals",
  ownerName: "Iwuji C.A. Francis",
  tagline: "Safe, reliable electrical work you can trust", // PLACEHOLDER
  description:
    "Professional electrical wiring, installations, repairs and Home Automation in Onitsha and Nation wide, Nigeria.",

  // From .env.local. The text after ?? is the fallback if the variable is missing.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  phone: "08149589938",
  phoneInternational: "+2348149589938",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348149589938",
  whatsappGreeting:
    "Hello AustineFrancis Electricals, I would like to make an enquiry.",
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
  serviceAreas: ["Onitsha", "Surrounding areas in Anambra State and Nigeria"],

  // Leave empty to hide an icon. Paste the full profile URL to show it.
  social: {
    facebook: "https://web.facebook.com/onyeka.iwuji",
    instagram: "https://www.instagram.com/akeyno_innocent/",
    tiktok: "",
    x: "",
    youtube: "",
    linkedin: "",
  },

  // PLACEHOLDER: Google Maps embed URL for No 60 Oguta Road, Onitsha
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.903758120468!2d6.788462173862284!3d6.143628227463609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1043930798f9672d%3A0xf09f7d808b5103a7!2sMammy%20Market%2C%2060%20Oguta%20Rd%2C%20City%20Centre%2C%20Isiokwe%20434106%2C%20Anambra!5e0!3m2!1sen!2sng!4v1795183272766!5m2!1sen!2sng",

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