import { Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  // HP-6 asks for 3 to 5 testimonials
  const items = testimonials.slice(0, 5);

  return (
    <section className="bg-brand-light py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="What our clients say"
        />

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <li key={item.id}>
              <FadeIn delay={index * 80} className="h-full">
                <figure className="flex h-full flex-col rounded-xl bg-white p-6 shadow-sm">
                  <Quote className="h-8 w-8 text-brand-amber" aria-hidden="true" />
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-brand-ink">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-5 border-t border-gray-100 pt-4">
                    <span className="block font-semibold text-brand-navy">{item.name}</span>
                    <span className="block text-sm text-brand-muted">{item.role}</span>
                  </figcaption>
                </figure>
              </FadeIn>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}