import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { clients } from "@/data/experience";

export default function ClientsStrip() {
  // Hide the whole section if there are no clients yet
  if (clients.length === 0) return null;

  return (
    <section className="bg-brand-light py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Trusted by"
          title="Companies and clients we have worked with"
        />

        <FadeIn>
          <ul className="mt-10 flex flex-wrap justify-center gap-4">
            {clients.map((client) => (
              <li
                key={client.id}
                className="flex min-w-40 flex-col items-center justify-center gap-2 rounded-xl bg-white px-5 py-4 text-center shadow-sm"
              >
                {/* Show the logo only if the entry has one */}
                {client.logo && (
                  <div className="relative h-12 w-28">
                    <SafeImage
                      src={client.logo}
                      alt={`${client.name} logo`}
                      fill
                      sizes="112px"
                      className="object-contain"
                    />
                  </div>
                )}
                <span className="text-sm font-semibold text-brand-navy">
                  {client.name}
                </span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </Container>
    </section>
  );
}