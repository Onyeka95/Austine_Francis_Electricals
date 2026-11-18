import type { GalleryItem } from "@/types";

/**
 * Gallery photos. To add a photo: copy the file into /public/images/gallery
 * and add one object below.
 *
 * Before and after: add `beforeImage` (see gallery-9 and gallery-16).
 * Put the "before" photo in /public/images/gallery too, for example before-1.jpg.
 *
 * Titles and alt text are PLACEHOLDERS until the real photos are supplied.
 */
export const galleryItems: GalleryItem[] = [
  // ---- First six are featured on the Home page ----
  {
    id: "gallery-1",
    image: "/images/gallery/gallery-1.jpg",
    alt: "Residential wiring installation",
    title: "Residential wiring",
    category: "Wiring",
    featured: true,
  },
  {
    id: "gallery-2",
    image: "/images/gallery/gallery-2.jpg",
    alt: "Conduit pipes fixed along a wall",
    title: "Conduit installation",
    category: "Conduit",
    featured: true,
  },
  {
    id: "gallery-3",
    image: "/images/gallery/gallery-3.jpg",
    alt: "Distribution board with labelled breakers",
    title: "Distribution board",
    category: "Panels",
    featured: true,
  },
  {
    id: "gallery-4",
    image: "/images/gallery/gallery-4.jpg",
    alt: "Ceiling lights installed in a living room",
    title: "Interior lighting",
    category: "Lighting",
    featured: true,
  },
  {
    id: "gallery-5",
    image: "/images/gallery/gallery-5.jpg",
    alt: "Solar and inverter wiring setup",
    title: "Inverter and solar wiring",
    category: "Solar",
    featured: true,
  },
  {
    id: "gallery-6",
    image: "/images/gallery/gallery-6.jpg",
    alt: "Electrical equipment installed on site",
    title: "Equipment installation",
    category: "Installations",
    featured: true,
  },

  // ---- More photos (placeholders) ----
  {
    id: "gallery-7",
    image: "/images/gallery/gallery-7.jpg",
    alt: "Wiring run through the ceiling of a building",
    title: "Ceiling wiring",
    category: "Wiring",
  },
  {
    id: "gallery-8",
    image: "/images/gallery/gallery-8.jpg",
    alt: "Concealed conduit before plastering",
    title: "Concealed conduit",
    category: "Conduit",
  },
  {
    id: "gallery-9",
    image: "/images/gallery/gallery-9.jpg",
    beforeImage: "/images/gallery/before-1.jpg",
    alt: "Neat distribution board after rewiring",
    title: "Distribution board makeover",
    category: "Panels",
  },
  {
    id: "gallery-10",
    image: "/images/gallery/gallery-10.jpg",
    alt: "Outdoor security lights on a compound wall",
    title: "Outdoor security lighting",
    category: "Lighting",
  },
  {
    id: "gallery-11",
    image: "/images/gallery/gallery-11.jpg",
    alt: "Inverter and battery bank installed in a utility room",
    title: "Inverter and battery setup",
    category: "Solar",
  },
  {
    id: "gallery-12",
    image: "/images/gallery/gallery-12.jpg",
    alt: "Water pump wired with a control switch",
    title: "Water pump installation",
    category: "Installations",
  },
  {
    id: "gallery-13",
    image: "/images/gallery/gallery-13.jpg",
    alt: "Socket and switch wiring in a bedroom",
    title: "Socket and switch wiring",
    category: "Wiring",
  },
  {
    id: "gallery-14",
    image: "/images/gallery/gallery-14.jpg",
    alt: "Surface conduit in a shop",
    title: "Shop conduit wiring",
    category: "Conduit",
  },
  {
    id: "gallery-15",
    image: "/images/gallery/gallery-15.jpg",
    alt: "Commercial panel board with multiple circuits",
    title: "Commercial panel board",
    category: "Panels",
  },
  {
    id: "gallery-16",
    image: "/images/gallery/gallery-16.jpg",
    beforeImage: "/images/gallery/before-2.jpg",
    alt: "Hall with new ceiling lights",
    title: "Hall lighting upgrade",
    category: "Lighting",
  },
  {
    id: "gallery-17",
    image: "/images/gallery/gallery-17.jpg",
    alt: "Solar panel wiring on a roof",
    title: "Roof solar wiring",
    category: "Solar",
  },
  {
    id: "gallery-18",
    image: "/images/gallery/gallery-18.jpg",
    alt: "Generator changeover switch installed",
    title: "Generator changeover",
    category: "Installations",
  },
  {
    id: "gallery-19",
    image: "/images/gallery/gallery-19.jpg",
    alt: "Wiring for a new building under construction",
    title: "New building wiring",
    category: "Wiring",
  },
  {
    id: "gallery-20",
    image: "/images/gallery/gallery-20.jpg",
    alt: "Conduit pipes bent and fixed around a corner",
    title: "Conduit bends and fixing",
    category: "Conduit",
  },
  {
    id: "gallery-21",
    image: "/images/gallery/gallery-21.jpg",
    alt: "Labelled breakers inside a DB box",
    title: "Labelled DB box",
    category: "Panels",
  },
  {
    id: "gallery-22",
    image: "/images/gallery/gallery-22.jpg",
    alt: "Decorative lighting in a restaurant",
    title: "Decorative lighting",
    category: "Lighting",
  },
  {
    id: "gallery-23",
    image: "/images/gallery/gallery-23.jpg",
    alt: "Hybrid inverter wired to the main panel",
    title: "Hybrid inverter wiring",
    category: "Solar",
  },
  {
    id: "gallery-24",
    image: "/images/gallery/gallery-24.jpg",
    alt: "Air conditioner circuit installed with its own breaker",
    title: "Air conditioner circuit",
    category: "Installations",
  },
];