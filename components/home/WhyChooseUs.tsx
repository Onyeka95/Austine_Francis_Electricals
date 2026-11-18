import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import { homeContent } from "@/data/homeContent";

export default function WhyChooseUs() {
  return (
    <section className="bg-brand-navy py-16 sm:py-20">
      <Container>
        {/* Heading colours are set here because this section has a dark background */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-amber">
            Why choose us
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Work you can rely on
          </h2>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeContent.reasons.map((reason, index) => (
            <li key={reason.title}>
              <FadeIn delay={index * 80} className="h-full">
                <div className="h-full rounded-xl bg-brand-navy-light p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-amber text-brand-navy">
                    <Icon name={reason.icon} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-white">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">
                    {reason.description}
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