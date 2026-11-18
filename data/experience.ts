import type { ClientEntry, ExperienceProject } from "@/types";

/**
 * Timeline projects, newest first. To add a project, add one object at the top.
 * PLACEHOLDER: every entry below is a sample. Replace them with real projects.
 * Photos reuse the gallery folder: put the file in /public/images/gallery.
 */
export const experienceProjects: ExperienceProject[] = [
  {
    id: "project-1",
    name: "Placeholder: Residential building wiring",
    client: "Sample Client",
    year: 2025,
    description:
      "Replace with a short description of the work: what was installed, the size of the job and the result.",
    image: "/images/gallery/gallery-1.jpg",
    imageAlt: "Residential wiring project",
  },
  {
    id: "project-2",
    name: "Placeholder: Shop and office installation",
    client: "Sample Company",
    year: 2023,
    description:
      "Replace with a short description of the work: what was installed, the size of the job and the result.",
    image: "/images/gallery/gallery-3.jpg",
    imageAlt: "Distribution board installation project",
  },
  {
    id: "project-3",
    name: "Placeholder: Inverter and solar wiring",
    client: "Sample Client",
    year: 2021,
    description:
      "Replace with a short description of the work: what was installed, the size of the job and the result.",
    image: "/images/gallery/gallery-5.jpg",
    imageAlt: "Inverter and solar wiring project",
  },
];

/**
 * Companies and clients worked with (EX-2).
 * PLACEHOLDER: replace with real names. Add `logo: "/images/clients/client-1.png"`
 * to an entry once its logo file is in /public/images/clients.
 */
export const clients: ClientEntry[] = [
  { id: "client-1", name: "Sample Client 1" },
  { id: "client-2", name: "Sample Client 2" },
  { id: "client-3", name: "Sample Client 3" },
  { id: "client-4", name: "Sample Client 4" },
];