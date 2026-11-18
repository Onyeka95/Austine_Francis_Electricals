import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "secondaryLight";
type Size = "md" | "lg";

/**
 * primary        = amber button (main action)
 * secondary      = navy outline (use on light backgrounds)
 * secondaryLight = white outline (use on dark backgrounds)
 */
export function buttonClasses(
  variant: Variant = "primary",
  size: Size = "md",
  extra = ""
): string {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200 whitespace-nowrap";

  const sizes: Record<Size, string> = {
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };

  const variants: Record<Variant, string> = {
    primary: "bg-brand-amber text-brand-navy hover:bg-brand-amber-dark",
    secondary:
      "border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white",
    secondaryLight:
      "border-2 border-white text-white hover:bg-white hover:text-brand-navy",
  };

  return `${base} ${sizes[size]} ${variants[variant]} ${extra}`.trim();
}

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
}

/** A link styled as a button. Handles internal pages, tel:, mailto: and external links. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
}: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);

  // Internal page links use Next.js <Link> for fast navigation
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  const isWeb = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      onClick={onClick}
      {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}