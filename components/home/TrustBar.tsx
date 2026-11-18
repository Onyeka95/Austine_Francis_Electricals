import { Award, Briefcase, Clock, Users, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import { siteConfig } from "@/data/siteConfig";

interface TrustItem {
  icon: LucideIcon;
  value: string;
  label: string;
}

export default function TrustBar() {
  const { stats, emergencyAvailable } = siteConfig;

  const items: TrustItem[] = [
    { icon: Award, value: `${stats.yearsOfExperience}+`, label: "Years of Experience" },
    { icon: Briefcase, value: `${stats.projectsCompleted}+`, label: "Projects Completed" },
    { icon: Users, value: `${stats.happyClients}+`, label: "Happy Clients" },
  ];

  // Only show the 24/7 item if siteConfig says emergency service is available
  if (emergencyAvailable) {
    items.push({ icon: Clock, value: "24/7", label: "Emergency Service" });
  }

  return (
    <section aria-label="Why clients trust us" className="border-b border-gray-200 bg-white">
      <Container>
        <FadeIn>
          <ul className="grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
            {items.map(({ icon: ItemIcon, value, label }) => (
              <li key={label} className="flex flex-col items-center text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-navy text-brand-amber">
                  <ItemIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="mt-3 font-heading text-2xl font-bold text-brand-navy">
                  {value}
                </span>
                <span className="text-sm text-brand-muted">{label}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </Container>
    </section>
  );
}