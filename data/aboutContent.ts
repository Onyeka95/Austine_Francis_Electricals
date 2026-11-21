import type { AboutContent } from "@/types";

/**
 * About page content. Edit the words here, not inside the components.
 * Everything marked PLACEHOLDER must be replaced with his real details before launch.
 * Only list certifications and awards he really holds.
 */
export const aboutContent: AboutContent = {
  title: "The electrician behind the work",

  // PLACEHOLDER: replace with his real story, in his own words if possible
  story: [
    "Austine Francis Electricals is run by Iwuji C.A. Francis. The business serves homeowners, landlords, shop owners and contractors with wiring, installations, home automation and repairs.",
    "Every job, from a single socket to a full building, is done with safety and neat workmanship in mind. Clients get a clear quotation, honest advice and work that is finished properly.",
    "The business also supplies quality electrical materials such as cables, breakers and fittings, so customers can buy what they need from the same trusted place.",
  ],
  portrait: "/images/about/electrician-portrait.jpg",
  portraitAlt: "Portrait of Iwuji C.A. Francis, electrician",
  secondaryImage: "/images/connection_one.jpeg",
  secondaryImageAlt: "Iwuji C.A. Francis at work on an electrical installation",

  // PLACEHOLDER: confirm each skill is accurate
  skills: [
    "Residential and commercial wiring",
    "Conduit installation",
    "Distribution board and panel installation",
    "Lighting installation",
    "Fault finding and repairs",
    "Home automation and smart home systems",
    "Generator changeover wiring",
    "Inverter and solar wiring",
    "Routine maintenance and inspection",
    "Material estimating and quotations",
  ],

  // PLACEHOLDER: replace with real certificates, or remove this list until he has some
  certifications: [
    {
      title: "Placeholder: Electrical trade certificate",
      issuer: "Replace with the issuing school or body",
      year: "Year",
    },
    {
      title: "Placeholder: Professional licence or registration",
      issuer: "Replace with the licensing body",
      year: "Year",
    },
  ],

  // PLACEHOLDER: replace with real awards and recognitions, or remove
  awards: [
    {
      title: "Placeholder: Award or recognition",
      issuer: "Replace with who gave it",
      year: "Year",
    },
  ],

  values: [
    {
      title: "Safety",
      description:
        "Safe wiring practice protects your family, staff and property.",
      icon: "shield-check",
    },
    {
      title: "Quality",
      description:
        "Neat, tidy work and good materials that last.",
      icon: "badge-check",
    },
    {
      title: "Honesty",
      description:
        "Clear quotations and straight advice, with no hidden charges.",
      icon: "banknote",
    },
    {
      title: "Timeliness",
      description:
        "We respect your time and aim to finish on the day we agree.",
      icon: "clock",
    },
  ],
};