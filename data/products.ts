import type { Product } from "@/types";

/**
 * Products for sale. To add one: copy the photo into /public/images/products
 * and add one object below.
 *
 * price: a number in Naira (for example 4500), or null to show "Call for price".
 *
 * Everything here is a PLACEHOLDER until the real product list and prices are supplied.
 * The two prices marked SAMPLE are only there so you can see how prices look.
 */
export const products: Product[] = [
  {
    id: "copper-wire",
    name: "Copper Wire (roll)",
    category: "Cables and wires",
    description:
      "Insulated copper wire for house and building wiring. Ask which sizes are in stock.",
    price: null,
    image: "/images/products/product-copper-wire.jpg",
  },
  {
    id: "armoured-cable",
    name: "Armoured Cable",
    category: "Cables and wires",
    description:
      "Heavy-duty armoured cable for underground runs, outdoor supply and main feeders.",
    price: null,
    image: "/images/products/product-armoured-cable.jpg",
  },
  {
    id: "double-socket",
    name: "13A Double Socket",
    category: "Sockets and switches",
    description: "Double socket outlet for homes, shops and offices.",
    price: null,
    image: "/images/products/product-socket.jpg",
  },
  {
    id: "light-switch",
    name: "Light Switch",
    category: "Sockets and switches",
    description: "Wall switch for lighting circuits. One-way and two-way types available.",
    price: null,
    image: "/images/products/product-switch.jpg",
  },
  {
    id: "circuit-breaker",
    name: "Circuit Breaker (MCB)",
    category: "Breakers and DB boxes",
    description:
      "Miniature circuit breaker that protects your wiring from overload. Various amp ratings.",
    price: null,
    image: "/images/products/product-circuit-breaker.jpg",
  },
  {
    id: "db-box",
    name: "Distribution (DB) Box",
    category: "Breakers and DB boxes",
    description:
      "Distribution box for housing breakers. Available in different numbers of ways.",
    price: null,
    image: "/images/products/product-db-box.jpg",
  },
  {
    id: "conduit-pipe",
    name: "Conduit Pipe",
    category: "Conduit and fittings",
    description: "PVC conduit pipe that protects cables in concealed and surface wiring.",
    price: null,
    image: "/images/products/product-conduit-pipe.jpg",
  },
  {
    id: "conduit-fittings",
    name: "Conduit Bends and Junction Boxes",
    category: "Conduit and fittings",
    description: "Bends, couplers, clips and junction boxes to complete a conduit job.",
    price: null,
    image: "/images/products/product-conduit-fittings.jpg",
  },
  {
    id: "led-bulb",
    name: "LED Bulb",
    category: "Lighting",
    description: "Energy-saving LED bulb for rooms, shops and outdoor fittings.",
    price: 1500, // SAMPLE price: replace with the real price
    image: "/images/products/product-led-bulb.jpg",
  },
  {
    id: "led-panel",
    name: "LED Panel Light",
    category: "Lighting",
    description: "Slim ceiling panel light for offices, shops and living rooms.",
    price: null,
    image: "/images/products/product-led-panel.jpg",
  },
  {
    id: "multimeter",
    name: "Digital Multimeter",
    category: "Tools and accessories",
    description: "For testing voltage, current and continuity safely and accurately.",
    price: null,
    image: "/images/products/product-multimeter.jpg",
  },
  {
    id: "insulation-tape",
    name: "Insulation Tape",
    category: "Tools and accessories",
    description: "Electrical insulation tape for neat, safe joints and cable marking.",
    price: 500, // SAMPLE price: replace with the real price
    image: "/images/products/product-insulation-tape.jpg",
  },
];