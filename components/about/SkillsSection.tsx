import { CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { aboutContent } from "@/data/aboutContent";

export default function SkillsSection() {
  return (
    <section className="bg-brand-light py-16 sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <FadeIn>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-white">
            <SafeImage
              src={aboutContent.secondaryImage}
              alt={aboutContent.secondaryImageAlt}
              fill
              sizes="(min-width: 1024px) 40vw, (min-width: 448px) 448px, 100vw"
              className="object-cover"
            />
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <SectionHeading
            align="left"
            eyebrow="Skills"
            title="What we are skilled at"
          />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {aboutContent.skills.map((skill) => (
              <li key={skill} className="flex gap-2.5 text-sm text-brand-ink">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-amber-dark"
                  aria-hidden="true"
                />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </Container>
    </section>
  );
}