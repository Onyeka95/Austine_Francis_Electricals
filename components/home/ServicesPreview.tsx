import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/data/services";

export default function ServicesPreview() {
  // Show the first 6 services only (HP-3)
  const preview = services.slice(0, 6);

  return (
    <section className="bg-brand-light py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Electrical services for every need"
          subtitle="From a single socket to a full building, we handle the job safely and neatly."
        />

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((service, index) => (
            <li key={service.id}>
              <FadeIn delay={index * 80} className="h-full">
                <Link
                  href="/services"
                  className="group flex h-full flex-col rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-navy text-brand-amber">
                    <Icon name={service.icon} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-brand-navy">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-navy group-hover:text-brand-amber-dark">
                    Learn more
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </FadeIn>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <ButtonLink href="/services" variant="secondary">
            View All Services
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}