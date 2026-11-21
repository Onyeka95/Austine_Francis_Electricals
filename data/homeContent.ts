import type { HomeContent } from "@/types";

/**
 * Home page text. Edit the words here, not inside the components.
 * Everything marked PLACEHOLDER should be replaced with his real words.
 */
export const homeContent: HomeContent = {
  hero: {
    eyebrow: "Electrician in Onitsha, Anambra State",
    headline: "Reliable Electrical Installation, Home Automation and Repairs",
    backgroundImage: "/images/hero/hero.jpg",
    backgroundAlt: "Electrician working on a wiring installation",
  },

  // PLACEHOLDER: replace with his real story
  aboutPreview: {
    title: "Meet Iwuji C.A. Francis",
    text: "Austine Francis Electricals is run by Iwuji C.A. Francis from No 60 Oguta Road, Onitsha. From house wiring and distribution boards to fault finding, generator changeovers and solar wiring, every job is done with safety and neat workmanship in mind. We also supply quality electrical materials, so you can get your cables, breakers and fittings from the same trusted place.",
    image: "/images/about/electrician-portrait.jpg",
    imageAlt: "Portrait of Iwuji C.A. Francis, electrician",
  },

  cta: {
    title: "Need an electrician you can trust?",
    text: "Tell us about your project and get a clear, fair quotation. We will get back to you quickly.",
  },

  // PLACEHOLDER: confirm these reasons are true for him before launch
  reasons: [
    {
      title: "Safety first",
      description:
        "Every installation follows safe wiring practice to protect your family, staff and property.",
      icon: "shield-check",
    },
    {
      title: "Quality workmanship",
      description:
        "Neat, tidy work that is built to last, from the first cable to the final switch.",
      icon: "badge-check",
    },
    {
      title: "Honest pricing",
      description:
        "Clear quotations with materials and labour listed, so there are no surprises.",
      icon: "banknote",
    },
    {
      title: "On-time delivery",
      description:
        "We respect your time and aim to finish jobs on the day we agree.",
      icon: "clock",
    },
    {
      title: "Emergency response",
      description:
        "Faults do not wait. Call us for urgent electrical problems at any hour.",
      icon: "siren",
    },
    {
      title: "Materials supplied",
      description:
        "Buy cables, breakers and fittings from us and order easily on WhatsApp.",
      icon: "plug",
    },
  ],
};