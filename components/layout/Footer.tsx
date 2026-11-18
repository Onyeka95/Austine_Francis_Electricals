import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import SocialIcon, { socialLabels } from "@/components/ui/SocialIcon";
import LeadForm from "@/components/forms/LeadForm";
import { navLinks, siteConfig } from "@/data/siteConfig";
import { fullAddress, mailLink, telLink } from "@/lib/contactLinks";
import { SOCIAL_PLATFORMS } from "@/types";

export default function Footer() {
  // Only show social icons that have a link filled in siteConfig (CT-8)
  const activeSocials = SOCIAL_PLATFORMS.filter(
    (platform) => siteConfig.social[platform].trim() !== ""
  );

  return (
    // print:hidden hides the footer when printing (GL-5)
    <footer className="bg-brand-navy-dark text-white/80 print:hidden">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Business summary */}
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-relaxed">
            {siteConfig.description}
          </p>

          {activeSocials.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-3">
              {activeSocials.map((platform) => (
                <li key={platform}>
                  <a
                    href={siteConfig.social[platform]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={socialLabels[platform]}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-amber hover:text-brand-navy"
                  >
                    <SocialIcon platform={platform} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick links */}
        <nav aria-label="Footer">
          <h2 className="text-base font-semibold text-white">Quick Links</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-brand-amber">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/quotation" className="hover:text-brand-amber">
                Quotation Generator
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact details */}
        <div>
          <h2 className="text-base font-semibold text-white">Contact Us</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-amber" aria-hidden="true" />
              <span>{fullAddress()}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-amber" aria-hidden="true" />
              <a href={telLink()} className="hover:text-brand-amber">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-amber" aria-hidden="true" />
              <a href={mailLink()} className="break-all hover:text-brand-amber">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-amber" aria-hidden="true" />
              <span>
                {siteConfig.workingHours.map((item) => (
                  <span key={item.days} className="block">
                    {item.days}: {item.hours}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>

        {/* Lead capture (GL-2) */}
        <div>
          <h2 className="text-base font-semibold text-white">Stay in Touch</h2>
          <p className="mb-4 mt-4 text-sm">
            Leave your details and we will send you updates and offers.
          </p>
          <LeadForm />
        </div>
      </Container>

      <div className="border-t border-white/10 py-5 text-center text-xs">
        <Container>
          &copy; 2026 {siteConfig.businessName}. All rights
          reserved.
        </Container>
      </div>
    </footer>
  );
}