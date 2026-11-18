import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import { aboutContent } from "@/data/aboutContent";

export default function ValuesSection() {
  return (
    <section className="bg-brand-light py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Our values"
          title="How we work"
          subtitle="Four principles guide every job we do."
        />

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aboutContent.values.map((value, index) => (
            <li key={value.title}>
              <FadeIn delay={index * 80} className="h-full">
                <div className="h-full rounded-xl bg-white p-6 text-center shadow-sm">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-brand-navy text-brand-amber">
                    <Icon name={value.icon} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-brand-navy">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                    {value.description}
                  </p>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}