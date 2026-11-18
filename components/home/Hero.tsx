import { Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import SafeImage from "@/components/ui/SafeImage";
import { ButtonLink } from "@/components/ui/Button";
import { homeContent } from "@/data/homeContent";
import { siteConfig } from "@/data/siteConfig";
import { telLink } from "@/lib/contactLinks";

export default function Hero() {
  const { hero } = homeContent;

  return (
    <section className="relative isolate overflow-hidden bg-brand-navy">
      {/* Background photo (placeholder shows if hero.jpg is missing) */}
      <SafeImage
        src={hero.backgroundImage}
        alt={hero.backgroundAlt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* Dark overlay keeps the white text readable on any photo */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-navy-dark/95 via-brand-navy/85 to-brand-navy/60"
        aria-hidden="true"
      />

      <Container className="py-20 sm:py-28 lg:py-36">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-amber">
            {hero.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {hero.headline}
          </h1>
          <p className="mt-4 text-lg text-white/85">{siteConfig.tagline}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Get a Quote
            </ButtonLink>
            <ButtonLink href={telLink()} variant="secondaryLight" size="lg">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call Now
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}