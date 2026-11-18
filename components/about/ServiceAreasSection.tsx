import { MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/data/siteConfig";

export default function ServiceAreasSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Where we work"
          title="Areas we serve"
          subtitle="Not sure if we cover your location? Call or message us and we will confirm."
        />

        {/* The list comes from siteConfig.serviceAreas */}
        <FadeIn>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {siteConfig.serviceAreas.map((area) => (
              <li
                key={area}
                className="flex items-center gap-2 rounded-full bg-brand-light px-4 py-2 text-sm font-medium text-brand-navy"
              >
                <MapPin className="h-4 w-4 text-brand-amber-dark" aria-hidden="true" />
                {area}
              </li>
            ))}
          </ul>
        </FadeIn>

        <div className="mt-8 text-center">
          <ButtonLink href="/contact" variant="secondary">
            Ask About Your Area
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}