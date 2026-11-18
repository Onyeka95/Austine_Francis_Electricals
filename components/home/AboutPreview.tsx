import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import SafeImage from "@/components/ui/SafeImage";
import { ButtonLink } from "@/components/ui/Button";
import { homeContent } from "@/data/homeContent";

export default function AboutPreview() {
  const { aboutPreview } = homeContent;

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <FadeIn>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-brand-light">
            <SafeImage
              src={aboutPreview.image}
              alt={aboutPreview.imageAlt}
              fill
              sizes="(min-width: 1024px) 40vw, (min-width: 448px) 448px, 100vw"
              className="object-cover"
            />
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-amber-dark">
            About us
          </p>
          <h2 className="mt-2 text-2xl font-bold text-brand-navy sm:text-3xl">
            {aboutPreview.title}
          </h2>
          <p className="mt-4 leading-relaxed text-brand-muted">{aboutPreview.text}</p>
          <div className="mt-6">
            <ButtonLink href="/about" variant="secondary">
              Read Our Story
            </ButtonLink>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}