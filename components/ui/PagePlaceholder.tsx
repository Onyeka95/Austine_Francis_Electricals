import Container from "@/components/ui/Container";

interface PagePlaceholderProps {
  title: string;
  phase: number;
}

/** Temporary page body. Each later phase replaces this with the real page. */
export default function PagePlaceholder({ title, phase }: PagePlaceholderProps) {
  return (
    <section className="bg-brand-light py-20">
      <Container>
        <h1 className="text-3xl font-bold text-brand-navy sm:text-4xl">{title}</h1>
        <p className="mt-3 text-brand-muted">
          This page will be built in Phase {phase}.
        </p>
      </Container>
    </section>
  );
}