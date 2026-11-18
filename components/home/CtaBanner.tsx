import { Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { homeContent } from "@/data/homeContent";
import { siteConfig } from "@/data/siteConfig";
import { telLink } from "@/lib/contactLinks";

export default function CtaBanner() {
  const { cta } = homeContent;

  return (
    <section className="bg-white pb-16 sm:pb-20">
      <Container>
        <div className="rounded-2xl bg-brand-navy px-6 py-10 text-center sm:px-12 sm:py-14">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{cta.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">{cta.text}</p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Request a Quote
            </ButtonLink>
            <ButtonLink href={telLink()} variant="secondaryLight" size="lg">
              <Phone className="h-5 w-5" aria-hidden="true" />
              {siteConfig.phone}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}