import Link from "next/link";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { galleryItems } from "@/data/gallery";

export default function FeaturedProjects() {
  // Only items marked featured, maximum 6 (HP-4)
  const featured = galleryItems.filter((item) => item.featured).slice(0, 6);

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Our work"
          title="Featured projects"
          subtitle="A look at some of the jobs we have completed."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item, index) => (
            <li key={item.id}>
              <FadeIn delay={index * 80}>
                <Link
                  href="/gallery"
                  className="group relative block aspect-[3/2] overflow-hidden rounded-xl bg-brand-light"
                >
                  <SafeImage
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Caption strip */}
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy-dark/90 to-transparent px-4 pb-3 pt-10 text-sm font-semibold text-white">
                    {item.title}
                  </span>
                </Link>
              </FadeIn>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <ButtonLink href="/gallery" variant="secondary">
            View Full Gallery
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}