import Link from "next/link";
import { Zap } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

interface LogoProps {
  className?: string;
}

/** Text-based logo placeholder. Swap for an <Image> when logo.png is supplied. */
export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.businessName} home`}
      className={`flex items-center gap-2.5 ${className}`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-amber text-brand-navy">
        <Zap className="h-6 w-6" aria-hidden="true" />
      </span>
      <span className="font-heading text-sm font-bold leading-tight text-white">
        {siteConfig.businessName}
      </span>
    </Link>
  );
}