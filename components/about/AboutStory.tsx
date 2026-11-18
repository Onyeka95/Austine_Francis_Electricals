import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import SafeImage from "@/components/ui/SafeImage";
import { aboutContent } from "@/data/aboutContent";
import { siteConfig } from "@/data/siteConfig";

export default function AboutStory() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <FadeIn>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-brand-light">
            <SafeImage
              src={aboutContent.portrait}
              alt={aboutContent.portraitAlt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, (min-width: 448px) 448px, 100vw"
              className="object-cover"
            />
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-amber-dark">
            Our story
          </p>
          <h2 className="mt-2 text-2xl font-bold text-brand-navy sm:text-3xl">
            {aboutContent.title}
          </h2>

          <div className="mt-4 space-y-4 leading-relaxed text-brand-muted">
            {aboutContent.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {/* Years of experience comes from siteConfig, so it is edited in one place */}
          <div className="mt-6 flex items-center gap-4 rounded-xl bg-brand-light p-4">
            <span className="font-heading text-4xl font-bold text-brand-navy">
              {siteConfig.stats.yearsOfExperience}+
            </span>
            <span className="text-sm text-brand-muted">
              years of hands-on electrical experience
            </span>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}