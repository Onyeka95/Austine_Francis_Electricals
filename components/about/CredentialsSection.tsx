import { Award, BadgeCheck, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { aboutContent } from "@/data/aboutContent";
import type { CredentialItem } from "@/types";

interface CredentialListProps {
  heading: string;
  icon: LucideIcon;
  items: CredentialItem[];
}

/** One card with a heading and a list of certificates or awards. */
function CredentialList({ heading, icon: ListIcon, items }: CredentialListProps) {
  return (
    <div className="h-full rounded-xl bg-brand-light p-6">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-brand-navy">
        <ListIcon className="h-5 w-5 text-brand-amber-dark" aria-hidden="true" />
        {heading}
      </h3>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.title} className="border-l-4 border-brand-amber pl-3">
            <p className="font-semibold text-brand-ink">{item.title}</p>
            <p className="text-sm text-brand-muted">
              {item.issuer}
              {item.year ? `, ${item.year}` : ""}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CredentialsSection() {
  const { certifications, awards } = aboutContent;

  // If both lists are empty, hide the whole section
  if (certifications.length === 0 && awards.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications and recognition"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {certifications.length > 0 && (
            <FadeIn className="h-full">
              <CredentialList
                heading="Certifications and licences"
                icon={BadgeCheck}
                items={certifications}
              />
            </FadeIn>
          )}
          {awards.length > 0 && (
            <FadeIn delay={100} className="h-full">
              <CredentialList
                heading="Awards and recognitions"
                icon={Award}
                items={awards}
              />
            </FadeIn>
          )}
        </div>
      </Container>
    </section>
  );
}