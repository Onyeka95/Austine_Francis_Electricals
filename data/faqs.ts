import type { Faq } from "@/types";

/**
 * Frequently asked questions (Services page, SV-2).
 * To add one, add an object below. Answers are general; edit them to match
 * how Mr Francis actually works (for example, his real inspection fee policy).
 */
export const faqs: Faq[] = [
  {
    id: "quote-cost",
    question: "How much does a quotation cost?",
    answer:
      "Requesting a quotation is free. Send us the details of your project through the contact form or WhatsApp and we will tell you what we need to see before giving you a price.",
  },
  {
    id: "site-visit",
    question: "Do you visit the site before giving a price?",
    answer:
      "For most wiring and installation jobs, yes. A short site visit lets us measure, check the existing system and give you an accurate quotation with no surprises.",
  },
  {
    id: "materials",
    question: "Do you supply the materials or must I buy them?",
    answer:
      "Both options are available. We can supply quality cables, breakers, sockets and fittings and list them clearly in your quotation, or you can buy your own and we supply the labour only.",
  },
  {
    id: "areas",
    question: "Which areas do you cover?",
    answer:
      "We work in Onitsha and surrounding areas in Anambra State. For jobs further away, please call or message us to confirm.",
  },
  {
    id: "emergency",
    question: "Do you handle emergencies?",
    answer:
      "Yes. If you smell burning, see sparks, or lose power suddenly, switch off at the main breaker if it is safe to do so and call us straight away.",
  },
  {
    id: "safety",
    question: "How do you make sure the work is safe?",
    answer:
      "We use correctly sized cables and breakers, proper earthing, and label distribution boards clearly. We test the system before handing it over.",
  },
  {
    id: "payment",
    question: "How do I pay for a job?",
    answer:
      "Payment terms are written on every quotation. Typically a deposit is paid to start the job and the balance is paid when the work is completed to your satisfaction.",
  },
  {
    id: "maintenance",
    question: "Can you inspect my existing wiring?",
    answer:
      "Yes. Routine inspection finds loose connections, overloaded circuits and ageing cables before they become dangerous or expensive to fix.",
  },
];