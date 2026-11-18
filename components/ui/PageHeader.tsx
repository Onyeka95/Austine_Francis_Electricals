import Container from "@/components/ui/Container";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

/** Navy title banner for inner pages. This holds the page's only <h1>. */
export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-brand-navy py-14 sm:py-16">
      <Container>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-white/85">{subtitle}</p>}
      </Container>
    </section>
  );
}