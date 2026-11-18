interface SectionHeadingProps {
  eyebrow?: string; // small amber label above the title
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

/** Consistent heading block for every section. Renders an h2 (the page's h1 is in the hero). */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-amber-dark">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-2xl font-bold text-brand-navy sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-3 text-brand-muted">{subtitle}</p>}
    </div>
  );
}