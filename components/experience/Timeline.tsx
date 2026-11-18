import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { experienceProjects } from "@/data/experience";

export default function Timeline() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Project history"
          title="Our professional experience"
          subtitle="A timeline of some of the work we have done, newest first."
        />

        {/* The amber line on the left is the timeline. Each <li> is one project. */}
        <ol className="relative mx-auto ml-3 mt-12 max-w-4xl space-y-10 border-l-2 border-brand-amber/60 sm:ml-4 md:mx-auto">
          {experienceProjects.map((project) => (
            <li key={project.id} className="relative pl-6 sm:pl-10">
              {/* Dot on the line */}
              <span
                className="absolute -left-[9px] top-2 h-4 w-4 rounded-full border-4 border-white bg-brand-amber"
                aria-hidden="true"
              />

              <FadeIn>
                <article className="grid gap-4 rounded-xl bg-brand-light p-4 sm:grid-cols-[220px_1fr] sm:p-5">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-white">
                    <SafeImage
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes="(min-width: 640px) 220px, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <span className="inline-block rounded-full bg-brand-navy px-3 py-1 text-xs font-semibold text-brand-amber">
                      {project.year}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-brand-navy">
                      {project.name}
                    </h3>
                    <p className="text-sm font-medium text-brand-muted">
                      Client: {project.client}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-brand-ink">
                      {project.description}
                    </p>
                  </div>
                </article>
              </FadeIn>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}