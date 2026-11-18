import type { Service } from "@/types";

/** All services. The Home page shows the first 6; the Services page (Phase 4) shows all. */
export const services: Service[] = [
  {
    id: "electrical-wiring",
    title: "Electrical Wiring",
    description:
      "Complete wiring for homes, shops, offices and commercial buildings, done neatly and safely.",
    icon: "zap",
  },
  {
    id: "conduit-wiring",
    title: "Conduit Wiring",
    description:
      "Concealed and surface conduit wiring that protects cables and gives a clean finish.",
    icon: "cable",
  },
  {
    id: "equipment-installation",
    title: "Installation of Electrical Equipment",
    description:
      "Safe installation of sockets, switches, fans, air conditioners, water pumps and other equipment.",
    icon: "plug",
  },
  {
    id: "db-board-panel",
    title: "Distribution Board and Panel Installation",
    description:
      "Properly sized DB boards and panels with correct breakers, labelled for easy use.",
    icon: "layout-grid",
  },
  {
    id: "lighting-installation",
    title: "Lighting Installation",
    description:
      "Indoor, outdoor, security and decorative lighting installed to suit your space.",
    icon: "lightbulb",
  },
  {
    id: "fault-finding-repairs",
    title: "Fault Finding and Repairs",
    description:
      "Quick diagnosis and repair of tripping breakers, power loss, burnt cables and other faults.",
    icon: "wrench",
  },
  {
    id: "generator-inverter-solar",
    title: "Generator Changeover, Inverter and Solar Wiring",
    description:
      "Changeover switches, inverter systems and solar wiring so your power backup works reliably.",
    icon: "sun",
  },
  {
    id: "maintenance-inspection",
    title: "Routine Maintenance and Inspection",
    description:
      "Regular checks that catch problems early and keep your electrical system safe.",
    icon: "clipboard-check",
  },
  {
    id: "emergency-call-out",
    title: "Emergency Call-out",
    description:
      "Urgent help for dangerous or sudden electrical faults. Call us right away.",
    icon: "siren",
  },
];